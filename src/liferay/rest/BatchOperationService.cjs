const { ERC_PREFIX, ENV } = require('../../utils/constants.cjs');
const { createERC, delay } = require('../../utils/misc.cjs');
const { sanitizedERC } = require('../../utils/normalize.cjs');
const { findContract } = require('../../utils/contractMappings.cjs');
const { getBatchCacheTTLms } = require('../../utils/ttl.cjs');
const { ErrorHandler } = require('../../utils/expressErrorHandler.cjs');
const { asItems, asCount } = require('../../utils/liferayUtils.cjs');

class BatchOperationService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async _postBatch(
    config,
    {
      entityName,
      items,
      externalReferenceCode,
      itemERCKey,
      op,
      friendly,
      path,
      sessionId,
      session = null,
      createStrategy = 'UPSERT',
      skipItemERC = false,
      method = 'POST',
    }
  ) {
    const { logger, cache, config: configService } = this.ctx;

    const prefixKey = `${entityName.toUpperCase()}_BATCH`;
    const erc =
      externalReferenceCode ??
      createERC(ERC_PREFIX[prefixKey] || ERC_PREFIX.BATCH);

    const processedItems = (items || []).map((item) => {
      if (skipItemERC) {
        return { ...item };
      }
      const extERC = sanitizedERC(
        item.externalReferenceCode || item[itemERCKey] || crypto.randomUUID()
      );
      return { ...item, externalReferenceCode: extERC };
    });

    const itemERCs = processedItems.map((i) => i.externalReferenceCode);

    this._cacheItemERCs(erc, null, itemERCs, sessionId);

    // RUNTIME CONTRACT VALIDATION (BATCH)
    if (
      processedItems &&
      processedItems.length > 0 &&
      this.ctx.contractValidator &&
      (ENV.NODE_ENV === 'development' || ENV.NODE_ENV === 'test')
    ) {
      const sampleUrl =
        typeof path === 'function' ? path('http://sample') : path;
      const contract = findContract(sampleUrl, 'POST');
      if (contract && contract.isBatch) {
        try {
          // Validate first 3 items to avoid excessive overhead while still catching patterns
          const sample = processedItems.slice(0, 3);
          for (const item of sample) {
            this.ctx.contractValidator.validate(
              contract.spec,
              contract.schema,
              item
            );
          }
        } catch (err) {
          if (err.name === 'ContractViolationError') {
            this.ctx.logger.error(
              `Batch item for ${entityName} violates Liferay OpenAPI contract`,
              {
                op,
                schema: contract.schema,
                errors: err.errors,
              }
            );
            throw err;
          }
        }
      }
    }

    const batchPayload = {
      batchExternalReferenceCode: erc,
      createStrategy,
      items: processedItems,
    };

    let currentERC = erc;
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    while (attempts < maxAttempts) {
      const callbackUrl = this._buildCallbackURL(
        this._getBaseCallbackUrl(config, session),
        {
          batchERC: currentERC,
          sessionId: sessionId,
          correlationId: config?.correlationId || session?.correlationId,
          op: 'create',
        }
      );

      const url = path(callbackUrl, currentERC);
      const currentBatchPayload = {
        ...batchPayload,
        batchExternalReferenceCode: currentERC,
      };

      logger.debug(`Sending batch ${entityName} creation request`, {
        operation: op,
        count: processedItems.length,
        callbackUrl: url,
        batchExternalReferenceCode: currentERC,
        correlationId: config?.correlationId || session?.correlationId,
      });

      try {
        const data = await this._request(config, {
          method,
          url,
          data: currentBatchPayload,
          op,
          friendly,
          maxRetries: 1,
        });

        this._cacheItemERCs(currentERC, data?.id, itemERCs, sessionId);

        if (cache && data?.id) {
          cache.set(
            `batch:${data.id}:submission`,
            {
              op: op,
              erc: currentERC,
              itemERCs,
              count: processedItems.length,
              createdAt: new Date().toISOString(),
            },
            getBatchCacheTTLms(configService)
          );
        }

        logger?.trace?.('cache:itemERCs:stored', {
          scopeERC: currentERC,
          sessionId: sessionId || null,
          batchId: data?.id || null,
          count: itemERCs.length,
        });

        logger.debug(`Batch ${entityName} creation initiated`, {
          operation: op,
          batchId: data.id || 'unknown',
          status: data.status || 'submitted',
          batchExternalReferenceCode: currentERC,
          correlationId: config?.correlationId || session?.correlationId,
        });

        return {
          batchId: data.id || `batch-${Date.now()}`,
          status: data.status || 'submitted',
          count: processedItems.length,
          batchExternalReferenceCode: currentERC,
          batchRefs: [
            { taskId: data.id, count: processedItems.length, erc: currentERC },
          ],
        };
      } catch (error) {
        lastError = error;

        const errorTitle = error.problem?.title || '';
        const errorMessage = error.message || '';

        const isDuplicateERC =
          error.status === 400 &&
          (errorTitle.toLowerCase().includes('already in use') ||
            errorMessage.toLowerCase().includes('already in use'));

        const isRetryable = ErrorHandler.isRetryableError(error);

        if (isDuplicateERC || isRetryable) {
          // Check if DXP already has this batch task active by querying by ERC
          try {
            const getUrl = `/o/headless-batch-engine/v1.0/import-task/by-external-reference-code/${encodeURIComponent(currentERC)}`;
            const existingTask = await this._get(
              config,
              getUrl,
              'get-import-task-by-erc',
              'Failed to fetch import task by ERC'
            );

            if (existingTask && existingTask.id) {
              logger.warn(
                `Batch ${entityName} with ERC ${currentERC} was already received by Liferay (recovery from transient error/duplicate). Resuming tracking...`,
                {
                  batchId: existingTask.id,
                  status: existingTask.status,
                  correlationId:
                    config?.correlationId || session?.correlationId,
                }
              );

              this._cacheItemERCs(
                currentERC,
                existingTask.id,
                itemERCs,
                sessionId
              );

              if (cache) {
                cache.set(
                  `batch:${existingTask.id}:submission`,
                  {
                    op,
                    erc: currentERC,
                    itemERCs,
                    count: processedItems.length,
                    createdAt: new Date().toISOString(),
                  },
                  getBatchCacheTTLms(configService)
                );
              }

              return {
                batchId: existingTask.id,
                status: existingTask.status || 'submitted',
                count: processedItems.length,
                batchExternalReferenceCode: currentERC,
                batchRefs: [
                  {
                    taskId: existingTask.id,
                    count: processedItems.length,
                    erc: currentERC,
                  },
                ],
              };
            }
          } catch (getErr) {
            logger.debug(
              `Batch task for ERC ${currentERC} not found or query failed (expected if it hasn't reached Liferay yet): ${getErr.message}`
            );
          }

          if (isDuplicateERC) {
            const isBatchERCCollision =
              errorTitle.includes(currentERC) ||
              errorMessage.includes(currentERC);

            if (isBatchERCCollision && attempts < maxAttempts - 1) {
              const oldERC = currentERC;
              currentERC = createERC(ERC_PREFIX[prefixKey] || ERC_PREFIX.BATCH);
              logger.warn(
                `Batch ERC collision detected for ${entityName}. Regenerating batch ERC and retrying.`,
                {
                  oldERC,
                  newERC: currentERC,
                  sessionId,
                  correlationId: config?.correlationId,
                }
              );
              attempts++;
              await delay(500 * attempts);
              continue;
            }

            logger.error(
              `Fatal ERC collision in batch ${op}. One or more items already exist in Liferay.`,
              {
                batchERC: currentERC,
                isBatchCollision: isBatchERCCollision,
                title: errorTitle,
                message: errorMessage,
                correlationId: config?.correlationId,
              }
            );
          } else if (isRetryable && attempts < maxAttempts - 1) {
            attempts++;
            const backoffDelay = 1000 * Math.pow(2, attempts);
            logger.warn(
              `Transient error in batch POST for ${entityName}. Retrying (${attempts}/${maxAttempts}) in ${backoffDelay}ms: ${errorMessage}`,
              {
                batchERC: currentERC,
                correlationId: config?.correlationId,
              }
            );
            await delay(backoffDelay);
            continue;
          }
        }

        throw error;
      }
    }

    throw lastError;
  }

  async _collectPagedItems(
    config,
    { listUrl, pageSize, filter, search, fields, op, friendly }
  ) {
    let allItems = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await this._get(config, listUrl, op, friendly, {
        params: {
          page,
          pageSize,
          filter,
          search,
          fields,
        },
      });

      const items = asItems(res);
      allItems = allItems.concat(items);

      const totalCount = asCount(res);
      hasMore = allItems.length < totalCount && items.length > 0;
      page++;
    }

    return allItems;
  }

  async _collectPagedIds(
    config,
    { listUrl, pageSize, filter, search, fields, op, friendly, idKey = 'id' }
  ) {
    let allIds = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await this._get(config, listUrl, op, friendly, {
        params: {
          page,
          pageSize,
          filter,
          search,
          fields,
        },
      });

      const items = asItems(res);
      const ids = items
        .map((it) => it[idKey])
        .filter((id) => id !== undefined && id !== null);
      allIds = allIds.concat(ids);

      const totalCount = asCount(res);
      hasMore = allIds.length < totalCount && items.length > 0;
      page++;
    }

    return allIds;
  }

  _chunkArray(arr, size) {
    if (!size || size <= 0) size = 100;
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
}
module.exports = BatchOperationService;
