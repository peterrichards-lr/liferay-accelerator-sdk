const SchemaCorrelationService = require('./schemaCorrelationService.cjs');

class BatchCallbackService {
  constructor(ctx) {
    this.ctx = ctx;
    this.generators = {}; // Registry for BaseGenerator instances
    this.sessionLocks = new Map(); // sessionId -> Promise (the current processing chain)
    this.sessionDirtyFlags = new Set();
    this.schemaCorrelator = new SchemaCorrelationService(ctx);
  }

  /**
   * Correlates Liferay's failed item report with the submitted payload and the
   * SDK's own ContractValidator assessment, so a batch failure explains itself
   * ("Liferay error vs local assessment vs failed payload item") instead of
   * leaving the developer to reconstruct it by hand.
   *
   * Purely diagnostic: never allowed to disturb callback processing.
   */
  async buildSchemaCorrelationReport(options) {
    try {
      const report = await this.schemaCorrelator.correlate(options);
      return {
        report,
        formatted: this.schemaCorrelator.formatReport(report),
      };
    } catch (error) {
      this.ctx.logger.warn(
        `Could not build schema correlation report for batch ${options?.batchId}: ${error.message}`,
        { batchId: options?.batchId, error: error.message }
      );
      return null;
    }
  }

  /**
   * Registers a generator instance into the dispatcher.
   */
  registerGenerator(name, instance) {
    this.generators[name] = instance;
  }

  /**
   * Identifies the owner generator for a given session.
   */
  _getOwnerGenerator(session) {
    const { flow_type: flowType, context } = session;

    // 1. Explicit generator key (new standard)
    if (context?.generator && this.generators[context.generator]) {
      return this.generators[context.generator];
    }

    // 2. Fallback to flow_type mapping
    const map = {
      generate: 'product',
      accounts: 'account',
      orders: 'order',
      warehouses: 'warehouse',
      delete: 'delete',
    };

    const key = map[flowType] || flowType;
    return this.generators[key];
  }

  async getBatchStatus(batchId) {
    const { persistence } = this.ctx;
    const batch = await persistence.getBatchByDownstreamId(batchId);
    if (!batch) return { status: 'UNKNOWN' };
    return {
      status: batch.status,
      processedCount: batch.processed_count,
      totalCount: batch.total_count,
      errorCount: batch.error_count,
      stepKey: batch.step_key,
      sessionId: batch.session_id,
    };
  }

  /**
   * Probes Liferay for active batches of incomplete sessions and resumes workflows.
   * Useful for recovery after microservice restarts.
   */
  async recoverOrphanedSessions() {
    const { logger, persistence, liferay } = this.ctx;
    const incomplete = await persistence.getIncompleteSessions();

    if (incomplete.length === 0) return;

    logger.info(`Starting recovery probe for ${incomplete.length} sessions...`);

    for (const session of incomplete) {
      const { session_id: sessionId, correlationId } = session;
      const batches = await persistence.getBatchesForSession(sessionId);

      // 1. Find batches that might have finished while we were down
      const activeBatches = batches.filter(
        (b) =>
          ['SUBMITTED', 'PENDING', 'PROCESSING'].includes(b.status) &&
          b.downstream_batch_id
      );

      for (const b of activeBatches) {
        try {
          logger.info(`Probing Liferay status for batch ${b.erc}...`, {
            batchId: b.downstream_batch_id,
            sessionId,
          });

          const task = await liferay.getImportTask(
            session.context.config,
            b.downstream_batch_id
          );

          if (
            task &&
            ['COMPLETED', 'FAILED'].includes(task.executeStatus || task.status)
          ) {
            logger.success(
              `Batch ${b.erc} completed while offline. Reconciling...`
            );

            // Map Liferay executeStatus to our status
            let status =
              (task.executeStatus || task.status) === 'COMPLETED'
                ? 'COMPLETED'
                : 'FAILED';

            // HARDENING: Check for partial failures during recovery
            if (
              status === 'COMPLETED' &&
              (task.failedItems?.length > 0 ||
                (task.processedItemsCount < task.totalItemsCount &&
                  task.totalItemsCount > 0))
            ) {
              logger.warn(
                `Recovered batch ${b.erc} has partial failures. Marking as FAILED.`
              );
              status = 'FAILED';
            }

            await this.processCallbackInternal(
              b.erc,
              {
                id: b.downstream_batch_id,
                status,
                processedItemsCount: task.processedItemsCount,
                totalItemsCount: task.totalItemsCount,
              },
              correlationId,
              sessionId
            );
          }
        } catch (err) {
          logger.warn(`Failed to probe batch ${b.erc}: ${err.message}`, {
            sessionId,
          });
        }
      }

      // 2. Regardless of batch updates, trigger a completion check
      // to wake up the orchestration loop for this session.
      // This handles cases where batches were already finished or no batches were pending.
      await this._checkSessionCompletion(sessionId, correlationId);
    }

    logger.info('Orphaned session recovery complete.');
  }

  /**
   * Main entry point for session advancement checks.
   * Uses a session-scoped promise chain to ensure atomic execution per session.
   */
  async _checkSessionCompletion(sessionId, correlationId) {
    this.ctx.logger.info(`Checking session completion for ${sessionId}...`);
    // 1. Get or create the lock for this session
    const existingLock = this.sessionLocks.get(sessionId) || Promise.resolve();

    // 2. Chain the new check to the end of the existing processing
    const newLock = existingLock
      .then(async () => {
        await this._executeCheckWithLock(sessionId, correlationId);
      })
      .catch(async (err) => {
        // Errors in the chain shouldn't kill the service, but they must not
        // leave the session silently stuck in a non-terminal status forever
        // either. Fail the session so anything awaiting completion unblocks.
        this.ctx.logger.error(
          `Error in session lock chain for ${sessionId}: ${err.message}`,
          { sessionId, error: err.message, stack: err.stack }
        );

        try {
          await this.ctx.persistence.tryFailSession(
            sessionId,
            err.message,
            null,
            err.stack
          );
        } catch (failErr) {
          this.ctx.logger.error(
            `Failed to mark session ${sessionId} as FAILED after lock chain error: ${failErr.message}`,
            { sessionId }
          );
        }
      })
      .finally(() => {
        // Cleanup: if this was the last link in the chain, remove the entry from the map
        if (this.sessionLocks.get(sessionId) === newLock) {
          this.sessionLocks.delete(sessionId);
        }
      });

    this.sessionLocks.set(sessionId, newLock);
    return newLock;
  }

  /**
   * Internal implementation of the session check, guaranteed to be called
   * only once at a time per sessionId via the promise chain.
   */
  async _executeCheckWithLock(sessionId, correlationId) {
    const { logger, persistence } = this.ctx;

    try {
      let continueLoop = true;
      while (continueLoop) {
        this.sessionDirtyFlags.delete(sessionId);

        const session = await persistence.getSession(sessionId);
        if (!session) {
          logger.warn(
            `No session found for ID ${sessionId}. Orchestrator cannot proceed.`,
            { sessionId }
          );
          break;
        }
        if (session.status === 'COMPLETED' || session.status === 'FAILED') {
          break;
        }

        const generator = this._getOwnerGenerator(session);
        if (!generator) {
          logger.error(
            `No generator registered for flow type '${session.flow_type}'`,
            { sessionId }
          );
          await persistence.updateSession(sessionId, { status: 'FAILED' });
          break;
        }

        try {
          this.ctx.logger.info(
            `Advancing session ${sessionId} via ${generator.constructor.name}...`
          );
          // Delegate step advancement to the specialized generator
          await generator.executeNextStep(sessionId);
        } catch (stepErr) {
          logger.error(
            `Critical error advancing workflow for session ${sessionId}: ${stepErr.message}`,
            {
              sessionId,
              error: stepErr.message,
              stack: stepErr.stack,
            }
          );

          // Propagate failure to the database
          if (
            await persistence.tryFailSession(
              sessionId,
              stepErr.message,
              null,
              stepErr.stack
            )
          ) {
            const { correlationId: sessionCid } = session;
            await this.ctx.progress.sessionFailed({
              sessionId,
              correlationId: correlationId || sessionCid,
              error: {
                message: stepErr.message,
                stack: stepErr.stack,
              },
            });
          }

          // Avoid tight loop on failure
          continueLoop = false;
          break;
        }

        // If something else marked this session as dirty during our run, loop again
        if (!this.sessionDirtyFlags.has(sessionId)) {
          continueLoop = false;
        }
      }
    } catch (err) {
      logger.error(
        `Fatal error in _executeCheckWithLock for ${sessionId}: ${err.message}`,
        { sessionId, error: err.message, stack: err.stack }
      );

      // HARDENING: An unexpected error here (e.g. persistence.getSession
      // throwing a real DB error before the inner expected-failure try/catch)
      // must not leave the session stuck in a non-terminal status forever.
      // Fail the session so the orchestrator (and anything awaiting
      // completion) is unblocked instead of hanging indefinitely.
      try {
        await persistence.tryFailSession(
          sessionId,
          err.message,
          null,
          err.stack
        );
      } catch (failErr) {
        logger.error(
          `Failed to mark session ${sessionId} as FAILED after fatal error: ${failErr.message}`,
          { sessionId }
        );
      }
    }
  }

  /**
   * Public entry point for callbacks.
   * Enqueues the callback for processing via the QueueService to handle race conditions.
   */
  async processCallback(
    batchERC,
    payload,
    correlationId = null,
    sessionId = null
  ) {
    const { logger, queue } = this.ctx;
    const { JOB_TYPES, QUEUE_CONFIG } = require('../utils/constants.cjs');

    logger.info('Enqueuing batch callback for processing', {
      batchERC,
      correlationId,
      sessionId,
      targetQueue: 'batch-callback',
    });

    try {
      await queue.add(
        'batch-callback',
        JOB_TYPES.BATCH_CALLBACK_PROCESSING,
        {
          batchERC,
          payload,
          correlationId,
          sessionId,
        },
        {
          retries: QUEUE_CONFIG.CALLBACK_MAX_RETRIES,
          retryDelay: QUEUE_CONFIG.CALLBACK_RETRY_DELAY,
          correlationId,
        }
      );
    } catch (error) {
      logger.error('Failed to enqueue batch callback', {
        batchERC,
        correlationId,
        sessionId,
        error: error.message,
      });
      // Fallback to immediate processing if queue fails
      await this.processCallbackInternal(
        batchERC,
        payload,
        correlationId,
        sessionId
      );
    }
  }

  /**
   * Internal implementation of callback processing.
   * Throws an error if the batch record is not found to trigger queue retries.
   */
  async processCallbackInternal(
    batchERC,
    payload,
    correlationId = null,
    providedSessionId = null
  ) {
    const { logger, liferay, persistence, progress } = this.ctx;

    // 1. Resolve Batch and Session
    const dbBatch = await persistence.getBatch(batchERC);

    if (!dbBatch) {
      // Throwing a specific message helps with log filtering and triggers queue retry
      throw new Error(
        `[RETRYABLE] Batch record not yet persisted for ERC: ${batchERC}. Callback arrived too fast.`
      );
    }

    const sessionId = providedSessionId || dbBatch.session_id;
    const session = await persistence.getSession(sessionId);
    if (!session) {
      logger.error('Orphaned batch detected - no session found', {
        batchERC,
        sessionId: dbBatch.session_id,
      });
      return;
    }

    const generator = this._getOwnerGenerator(session);
    const { config } = session.context;
    const effectiveCorrelationId = correlationId || session.correlationId;

    const batchId = Object.keys(payload)[0];
    if (!batchId) {
      logger.error('Could not extract batchId from callback payload', {
        batchERC,
      });
      return;
    }

    // Hoisted so they remain accessible to the non-critical follow-on work
    // below, which runs in its own try/catch after the critical DB write.
    let data, errorCount, processedCount, totalCount, finalStatus;

    try {
      // 2. Retrieve final state from Liferay REST API
      const importTask = await liferay.getImportTask(config, batchId);
      data = importTask?.data || importTask;

      // 3. Update Batch State
      errorCount = data.failedItems?.length || 0;
      processedCount = data.processedItemsCount || 0;
      totalCount = data.totalItemsCount || 0;
      finalStatus = (data.executeStatus || payload[batchId]).toUpperCase();

      // --- HARDENING: Strict Error Detection ---

      // Case A: Liferay says COMPLETED but processed 0 items out of N (Global Failure)
      if (
        finalStatus === 'COMPLETED' &&
        processedCount === 0 &&
        totalCount > 0
      ) {
        logger.error(
          'Batch completed with 0 items processed - marking as FAILED',
          {
            batchERC,
            batchId,
            totalCount,
            errorMessage: data.errorMessage,
            sessionId,
          }
        );
        finalStatus = 'FAILED';
      }

      // Case B: Liferay says COMPLETED but there are partial failures
      if (finalStatus === 'COMPLETED' && errorCount > 0) {
        logger.error(
          'Batch completed with partial failures - marking as FAILED for strict reliability',
          {
            batchERC,
            batchId,
            errorCount,
            totalCount,
            sessionId,
          }
        );
        finalStatus = 'FAILED';
      }

      // Fetch detailed errors if there are any failures or if processed < total
      if (processedCount < totalCount || errorCount > 0) {
        try {
          const failureReport = await liferay.getImportTaskFailedItemReport(
            config,
            batchId
          );
          if (failureReport && failureReport.length > 0) {
            const firstFailure = failureReport[0];
            const errorMessage =
              firstFailure.errorMessage ||
              firstFailure.error ||
              'Unknown error';

            logger.info('Detailed batch failure detected', {
              batchId,
              firstError: errorMessage,
              sessionId,
            });

            const entityType = generator
              ? generator._normalizeEntityType(dbBatch.step_key)
              : dbBatch.step_key;

            // SCHEMA CORRELATION: pair each Liferay rejection with the payload
            // item that caused it and with our local contract assessment.
            const correlation = await this.buildSchemaCorrelationReport({
              config,
              batchId,
              batchERC,
              stepKey: dbBatch.step_key,
              entityType,
              failureReport,
            });

            if (correlation) {
              logger.error(
                `Schema Correlation Report for failed batch ${batchId}\n${correlation.formatted}`,
                {
                  batchId,
                  batchERC,
                  sessionId,
                  summary: correlation.report.summary,
                  contract: correlation.report.contract,
                }
              );
            }

            // CRITICAL: Log full raw content if error is unknown to help schema mapping
            if (errorMessage.toLowerCase().includes('unknown error')) {
              logger.error('Full failed item content for investigation:', {
                batchId,
                rawContent: firstFailure.content || firstFailure,
                sessionId,
              });
            }

            // Broadcast detailed errors to UI
            progress.emitBatchItemsFailed({
              sessionId: session.session_id,
              batchERC,
              batchId,
              entityType,
              operation: session.flow_type,
              failedItems: failureReport,
              schemaCorrelation: correlation ? correlation.report : null,
              correlationId: effectiveCorrelationId,
            });

            // PERSISTENCE: Log detailed failure as a workflow event for audit history
            persistence.logWorkflowEvent({
              sessionId: session.session_id,
              batchId,
              status: 'FAILED',
              message: `Batch ${batchId} for ${dbBatch.step_key} had ${errorCount} failures. First error: ${errorMessage}`,
              details: {
                batchERC,
                stepKey: dbBatch.step_key,
                errorCount,
                totalCount,
                failedItems: failureReport.slice(0, 50), // Cap details to prevent DB bloat
                schemaCorrelation: correlation
                  ? {
                      contract: correlation.report.contract,
                      payloadSource: correlation.report.payloadSource,
                      summary: correlation.report.summary,
                      report: correlation.formatted,
                    }
                  : null,
              },
            });
          } else {
            // HARDENING: If report is empty but processed < total, log a specific warning
            persistence.logWorkflowEvent({
              sessionId: session.session_id,
              batchId,
              status: 'FAILED',
              message: `Batch ${batchId} for ${dbBatch.step_key} is incomplete: processed ${processedCount} of ${totalCount} items, but no individual errors were reported by Liferay.`,
              details: {
                batchERC,
                stepKey: dbBatch.step_key,
                processedCount,
                totalCount,
                liferayStatus: data.executeStatus || 'UNKNOWN',
              },
            });
          }
        } catch (reportErr) {
          logger.warn(
            'Failed to fetch detailed batch failure report for broadcast',
            { batchId, error: reportErr.message }
          );
        }
      }

      await persistence.updateBatch(batchERC, {
        status: finalStatus,
        processedCount: processedCount,
        totalCount: totalCount,
        errorCount: errorCount,
        errorMessage: data.errorMessage,
        downstreamBatchId: batchId,
      });
    } catch (error) {
      // CRITICAL PATH: nothing has been persisted yet for this callback, so
      // it's correct to mark the batch FAILED here.
      logger.error('Error processing batch callback', {
        batchERC,
        error: error.message,
      });
      await persistence.updateBatch(batchERC, { status: 'FAILED' });
      progress.batchFailed({
        sessionId: session.session_id,
        batchERC,
        batchId,
        error,
        correlationId: effectiveCorrelationId,
      });
      return;
    }

    // NON-CRITICAL FOLLOW-ON WORK: the batch state above was already
    // persisted successfully. Failures here (progress broadcasts, the
    // generator hook) must be logged but must NOT overwrite that correct
    // state as FAILED - doing so would silently discard a successful DB
    // write and desync the persisted state from reality.
    try {
      // 4. Delegate Step-Specific Logic (Verification, etc.)
      if (generator && finalStatus === 'COMPLETED') {
        await generator.handleBatchCallback(session.session_id, batchERC);
      }

      // 5. Broadcast Progress
      if (finalStatus === 'FAILED') {
        progress.batchFailed({
          entityType: generator
            ? generator._normalizeEntityType(dbBatch.step_key)
            : dbBatch.step_key,
          operation: session.flow_type,
          batchId,
          batchERC,
          sessionId: session.session_id,
          error: {
            message:
              data.errorMessage ||
              `Batch is incomplete: processed ${processedCount} of ${totalCount} items.`,
          },
          correlationId: effectiveCorrelationId,
        });
      } else if (finalStatus === 'COMPLETED') {
        progress.batchCompleted({
          entityType: generator
            ? generator._normalizeEntityType(dbBatch.step_key)
            : dbBatch.step_key,
          operation: session.flow_type,
          batchId,
          batchERC,
          sessionId: session.session_id,
          successCount: data.processedItemsCount || 0,
          failureCount: errorCount,
          correlationId: effectiveCorrelationId,
        });
      }

      // 5.5 Broadcast Step Completed if all batches for this step are done
      const sessionBatches = await persistence.getBatchesForSession(
        session.session_id
      );
      const stepBatches = sessionBatches.filter(
        (b) => b.step_key === dbBatch.step_key
      );
      const isTerminal = (b) =>
        ['COMPLETED', 'FAILED', 'BYPASSED', 'SYNCHRONOUS'].includes(b.status);

      if (
        stepBatches.length > 0 &&
        stepBatches.every(isTerminal) &&
        !stepBatches.some((b) => b.status === 'FAILED')
      ) {
        const totalStepCount = stepBatches.reduce(
          (sum, b) => sum + (b.total_count || 0),
          0
        );
        progress.stepCompleted({
          sessionId: session.session_id,
          step: dbBatch.step_key,
          entityType: generator
            ? generator._normalizeEntityType(dbBatch.step_key)
            : dbBatch.step_key,
          operation: session.flow_type,
          totalCount: totalStepCount,
          correlationId: effectiveCorrelationId,
        });
      }
    } catch (followOnError) {
      logger.error(
        'Error in non-critical batch callback follow-on work (broadcasts/generator hook); batch state was already persisted successfully',
        {
          batchERC,
          batchId,
          sessionId: session.session_id,
          error: followOnError.message,
          stack: followOnError.stack,
        }
      );
    }

    // 6. Trigger Advancement - always run once the critical DB write has
    // succeeded, regardless of whether the non-critical follow-on work above
    // failed. Otherwise the orchestrator is left waiting on a callback
    // Liferay will never send again.
    await this._checkSessionCompletion(
      session.session_id,
      effectiveCorrelationId
    );
  }
}

module.exports = BatchCallbackService;
