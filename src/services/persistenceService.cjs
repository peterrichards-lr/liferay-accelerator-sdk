const { Worker } = require('worker_threads');
const crypto = require('crypto');
const { Cache } = require('memory-cache');
const path = require('path');

const { ENV } = require('../utils/constants.cjs');

class PersistenceService {
  constructor(ctx, dbPath) {
    this.ctx = ctx;
    this.logger = ctx?.logger;

    const rawPath = dbPath || ENV.PERSISTENCE_DB_PATH || './data/workflows.db';
    const isMemory = rawPath === ':memory:';
    const finalPath = isMemory
      ? ':memory:'
      : path.resolve(__dirname, '..', rawPath);

    this.cache = new Cache();
    this.pendingRequests = new Map();

    try {
      const workerPath = path.resolve(__dirname, 'persistenceWorker.cjs');
      this.worker = new Worker(workerPath, {
        workerData: { dbPath: finalPath },
      });

      this.worker.on('message', ({ id, result, error }) => {
        const pending = this.pendingRequests.get(id);
        if (pending) {
          this.pendingRequests.delete(id);
          if (error) pending.reject(new Error(error));
          else pending.resolve(result);
        }
      });

      this.worker.on('error', (err) => {
        this.logger?.error(
          `[PersistenceService] Worker thread error: ${err.message}`
        );
      });

      this.logger?.info(
        `[PersistenceService] SUCCESS: Spawning background SQLite worker thread for: ${finalPath}`
      );
    } catch (err) {
      if (this.logger) {
        this.logger.error(
          `[PersistenceService] FATAL ERROR during worker spawn: ${err.message}`
        );
      } else {
        console.error(
          `[PersistenceService] FATAL ERROR during worker spawn: ${err.message}`
        );
      }
      throw err;
    }
  }

  _postMessage(action, sql, params) {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.worker.postMessage({ id, action, sql, params });
    });
  }

  async _run(sql, ...params) {
    return this._postMessage('run', sql, params);
  }

  async _get(sql, ...params) {
    return this._postMessage('get', sql, params);
  }

  async _all(sql, ...params) {
    return this._postMessage('all', sql, params);
  }

  async _exec(sql) {
    return this._postMessage('exec', sql);
  }

  _initSchema() {
    // Schema initialized inside the worker thread on startup
  }

  // --- Queue Job Management ---

  async saveQueueJob(job) {
    await this._run(
      `
      INSERT OR REPLACE INTO queue_jobs (
        job_id, queue_name, job_type, data_json, status, priority, 
        attempts, max_attempts, run_at, created_at, updated_at, 
        result_json, error_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      job.id,
      job.queue,
      job.type,
      JSON.stringify(job.data),
      job.status,
      job.priority,
      job.attempts,
      job.maxAttempts,
      job.runAt ? job.runAt.toISOString() : null,
      job.createdAt.toISOString(),
      job.updatedAt.toISOString(),
      job.result ? JSON.stringify(job.result) : null,
      job.error
    );
  }

  async getPendingQueueJobs() {
    const rows = await this._all(
      "SELECT * FROM queue_jobs WHERE status = 'waiting' AND (run_at IS NULL OR run_at <= CURRENT_TIMESTAMP) ORDER BY priority DESC, created_at ASC"
    );

    return rows.map((row) => ({
      id: row.job_id,
      queue: row.queue_name,
      type: row.job_type,
      data: JSON.parse(row.data_json),
      status: row.status,
      priority: row.priority,
      attempts: row.attempts,
      maxAttempts: row.max_attempts,
      runAt: row.run_at ? new Date(row.run_at) : null,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      result: row.result_json ? JSON.parse(row.result_json) : null,
      error: row.error_message,
    }));
  }

  async deleteQueueJob(jobId) {
    await this._run('DELETE FROM queue_jobs WHERE job_id = ?', jobId);
  }

  async getSystemSetting(key) {
    const row = await this._get(
      'SELECT setting_value FROM system_settings WHERE setting_key = ?',
      key
    );
    return row ? row.setting_value : null;
  }

  async saveSystemSetting(key, value) {
    await this._run(
      'INSERT OR REPLACE INTO system_settings (setting_key, setting_value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
      key,
      value
    );
  }

  async createSession({
    sessionId,
    flowType,
    status,
    context,
    currentSteps,
    correlationId,
    sessionName,
  }) {
    const now = new Date().toISOString();
    await this._run(
      `
      INSERT OR REPLACE INTO workflow_sessions (
        session_id, flow_type, status, context_json, current_steps_json, correlation_id, session_name, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      sessionId,
      flowType,
      status,
      JSON.stringify(context || {}),
      JSON.stringify(currentSteps || []),
      correlationId || null,
      sessionName || null,
      now,
      now
    );

    this.cache.del(sessionId);
    return this.getSession(sessionId);
  }

  async getCompletedSessions() {
    const rows = await this._all(
      "SELECT * FROM workflow_sessions WHERE status = 'COMPLETED' AND flow_type != 'delete' ORDER BY created_at DESC"
    );
    return rows.map((row) => this._parseSession(row));
  }

  async getIncompleteSessions() {
    const rows = await this._all(
      "SELECT * FROM workflow_sessions WHERE status NOT IN ('COMPLETED', 'FAILED', 'CANCELLED') ORDER BY created_at DESC"
    );
    return rows.map((row) => this._parseSession(row));
  }

  async getSession(sessionId) {
    const cachedSession = this.cache.get(sessionId);
    if (cachedSession) return cachedSession;

    const row = await this._get(
      'SELECT * FROM workflow_sessions WHERE session_id = ?',
      sessionId
    );

    return row ? this._parseSession(row) : null;
  }

  async getLatestSession() {
    const row = await this._get(
      'SELECT * FROM workflow_sessions ORDER BY created_at DESC LIMIT 1'
    );

    return row ? this._parseSession(row) : null;
  }

  async getLatestCompletedSession() {
    const row = await this._get(
      "SELECT * FROM workflow_sessions WHERE status = 'COMPLETED' ORDER BY created_at DESC LIMIT 1"
    );

    return row ? this._parseSession(row) : null;
  }

  _parseSession(row) {
    const session = {
      session_id: row.session_id,
      flow_type: row.flow_type,
      status: row.status,
      session_name: row.session_name,
      error_message: row.error_message,
      error_stack: row.error_stack,
      errorReferenceCode: row.error_reference_code,
      context: JSON.parse(row.context_json),
      currentSteps: JSON.parse(row.current_steps_json),
      correlationId: row.correlation_id,
      version: row.version,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    this.cache.put(session.session_id, session, 60000); // 1 minute cache
    return session;
  }

  async getAllSessions() {
    const rows = await this._all(
      'SELECT * FROM workflow_sessions ORDER BY created_at DESC'
    );
    return rows.map((row) => ({
      session_id: row.session_id,
      flow_type: row.flow_type,
      status: row.status,
      session_name: row.session_name,
      error_message: row.error_message,
      error_stack: row.error_stack,
      errorReferenceCode: row.error_reference_code,
      context: JSON.parse(row.context_json),
      currentSteps: JSON.parse(row.current_steps_json),
      correlationId: row.correlation_id,
      version: row.version,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  }

  async updateSessionStatus(sessionId, status) {
    const now = new Date().toISOString();
    await this._run(
      'UPDATE workflow_sessions SET status = ?, updated_at = ? WHERE session_id = ?',
      status,
      now,
      sessionId
    );
    this.cache.del(sessionId);
    return this.getSession(sessionId);
  }

  async updateSessionCurrentSteps(sessionId, currentSteps) {
    const now = new Date().toISOString();
    await this._run(
      'UPDATE workflow_sessions SET current_steps_json = ?, updated_at = ? WHERE session_id = ?',
      JSON.stringify(currentSteps),
      now,
      sessionId
    );
    this.cache.del(sessionId);
    return this.getSession(sessionId);
  }

  async updateSessionContext(sessionId, newContext) {
    const now = new Date().toISOString();
    const session = await this.getSession(sessionId);
    if (!session) return null;

    const mergedContext = { ...session.context, ...newContext };

    await this._run(
      'UPDATE workflow_sessions SET context_json = ?, updated_at = ? WHERE session_id = ?',
      JSON.stringify(mergedContext),
      now,
      sessionId
    );
    this.cache.del(sessionId);
    return this.getSession(sessionId);
  }

  async updateSession(
    sessionId,
    { status, context, currentSteps, correlationId }
  ) {
    const now = new Date().toISOString();
    const sets = ['updated_at = ?'];
    const params = [now];

    const currentSession = await this.getSession(sessionId);
    if (!currentSession) return null;

    if (status) {
      sets.push('status = ?');
      params.push(status);
    }
    if (context) {
      const mergedContext = { ...currentSession.context, ...context };
      sets.push('context_json = ?');
      params.push(JSON.stringify(mergedContext));
    }
    if (currentSteps) {
      sets.push('current_steps_json = ?');
      params.push(JSON.stringify(currentSteps));
    }
    if (correlationId) {
      sets.push('correlation_id = ?');
      params.push(correlationId);
    }

    params.push(sessionId);
    await this._run(
      `UPDATE workflow_sessions SET ${sets.join(', ')} WHERE session_id = ?`,
      ...params
    );
    this.cache.del(sessionId);
    return this.getSession(sessionId);
  }

  async verifyDependencyReady(sessionId, dependencyStepKey) {
    const batches = await this.getBatchesForSession(sessionId);
    if (!batches || batches.length === 0) return false;

    const dependencyBatches = batches.filter(
      (b) => b.step_key === dependencyStepKey
    );
    if (dependencyBatches.length === 0) return false;

    return dependencyBatches.every((b) =>
      ['COMPLETED', 'BYPASSED', 'SYNCHRONOUS'].includes(b.status)
    );
  }

  async tryFinalizeSession(sessionId) {
    const now = new Date().toISOString();
    const result = await this._run(
      `
      UPDATE workflow_sessions 
      SET status = 'COMPLETED', current_steps_json = '[]', updated_at = ?
      WHERE session_id = ? AND status NOT IN ('COMPLETED', 'FAILED')
      `,
      now,
      sessionId
    );

    if (result && result.changes > 0) {
      this.cache.del(sessionId);
      return true;
    }
    return false;
  }

  async tryFailSession(
    sessionId,
    errorMessage = null,
    errorReferenceCode = null,
    errorStack = null
  ) {
    const now = new Date().toISOString();
    const result = await this._run(
      `
      UPDATE workflow_sessions 
      SET status = 'FAILED', error_message = ?, error_reference_code = ?, error_stack = ?, current_steps_json = '[]', updated_at = ?
      WHERE session_id = ? AND status NOT IN ('COMPLETED', 'FAILED')
      `,
      errorMessage,
      errorReferenceCode,
      errorStack,
      now,
      sessionId
    );

    if (result && result.changes > 0) {
      this.cache.del(sessionId);
      return true;
    }
    return false;
  }

  async tryCancelSession(sessionId) {
    const now = new Date().toISOString();
    const result = await this._run(
      `
      UPDATE workflow_sessions 
      SET status = 'CANCELLED', current_steps_json = '[]', updated_at = ?
      WHERE session_id = ? AND status NOT IN ('COMPLETED', 'FAILED', 'CANCELLED')
      `,
      now,
      sessionId
    );

    if (result && result.changes > 0) {
      this.cache.del(sessionId);
      return true;
    }
    return false;
  }

  async createBatch({ erc, sessionId, stepKey, status, totalCount }) {
    const now = new Date().toISOString();
    await this._run(
      `
      INSERT INTO workflow_batches (
        erc, session_id, step_key, status, processed_count, total_count, error_count, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      erc,
      sessionId,
      stepKey,
      status,
      0,
      totalCount || 0,
      0,
      now,
      now
    );

    this.cache.del(`batches-${sessionId}`);
    return this.getBatch(erc);
  }

  async getBatch(erc) {
    const cacheKey = `batch-${erc}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const row = await this._get(
      'SELECT * FROM workflow_batches WHERE erc = ?',
      erc
    );
    if (row) {
      this.cache.put(cacheKey, row, 60000);
      return row;
    }
    return null;
  }

  async getBatchesForSession(sessionId) {
    const cacheKey = `batches-${sessionId}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const rows = await this._all(
      'SELECT * FROM workflow_batches WHERE session_id = ?',
      sessionId
    );
    this.cache.put(cacheKey, rows, 30000);
    return rows;
  }

  async updateBatch(
    erc,
    {
      status,
      downstreamBatchId,
      processedCount,
      totalCount,
      errorCount,
      errorMessage,
    }
  ) {
    const now = new Date().toISOString();
    const sets = ['updated_at = ?'];
    const params = [now];

    if (status) {
      sets.push('status = ?');
      params.push(status);
    }
    if (downstreamBatchId !== undefined) {
      sets.push('downstream_batch_id = ?');
      params.push(downstreamBatchId);
    }
    if (processedCount !== undefined) {
      sets.push('processed_count = ?');
      params.push(processedCount);
    }
    if (totalCount !== undefined) {
      sets.push('total_count = ?');
      params.push(totalCount);
    }
    if (errorCount !== undefined) {
      sets.push('error_count = ?');
      params.push(errorCount);
    }
    if (errorMessage !== undefined) {
      sets.push('error_message = ?');
      params.push(errorMessage);
    }

    params.push(erc);
    await this._run(
      `UPDATE workflow_batches SET ${sets.join(', ')} WHERE erc = ?`,
      ...params
    );

    const batch = await this.getBatch(erc);
    if (batch) {
      this.cache.del(`batches-${batch.session_id}`);
      this.cache.del(`batch-${erc}`);
    }
    return this.getBatch(erc);
  }

  async getBatchByDownstreamId(downstreamBatchId) {
    return this._get(
      'SELECT * FROM workflow_batches WHERE downstream_batch_id = ?',
      downstreamBatchId
    );
  }

  async getEventsForSession(sessionId) {
    const rows = await this._all(
      'SELECT * FROM workflow_events WHERE session_id = ? ORDER BY timestamp ASC',
      sessionId
    );
    return rows.map((row) => ({
      ...row,
      details: row.details_json ? JSON.parse(row.details_json) : null,
    }));
  }

  async logWorkflowEvent({ sessionId, batchId, status, message, details }) {
    const now = new Date().toISOString();
    await this._run(
      `
      INSERT INTO workflow_events (timestamp, session_id, batch_id, status, message, details_json)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      now,
      sessionId,
      batchId || null,
      status,
      message,
      JSON.stringify(details || {})
    );
  }

  async getWorkflowKPIs() {
    const [totalRes, completedRes, failedRes, cancelledRes] = await Promise.all(
      [
        this._get('SELECT COUNT(*) as count FROM workflow_sessions'),
        this._get(
          "SELECT COUNT(*) as count FROM workflow_sessions WHERE status = 'COMPLETED'"
        ),
        this._get(
          "SELECT COUNT(*) as count FROM workflow_sessions WHERE status = 'FAILED'"
        ),
        this._get(
          "SELECT COUNT(*) as count FROM workflow_sessions WHERE status = 'CANCELLED'"
        ),
      ]
    );

    const totalSessions = totalRes?.count || 0;
    const completedSessions = completedRes?.count || 0;
    const failedSessions = failedRes?.count || 0;
    const cancelledSessions = cancelledRes?.count || 0;

    return {
      totalSessions,
      completedSessions,
      failedSessions,
      cancelledSessions,
      successRate:
        totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
    };
  }

  async clearAll() {
    await Promise.all([
      this._run('DELETE FROM workflow_events'),
      this._run('DELETE FROM workflow_batches'),
      this._run('DELETE FROM workflow_sessions'),
      this._run('DELETE FROM queue_jobs'),
    ]);
    this.cache.clear();
  }

  async cleanup(cutoffTimestamp) {
    await Promise.all([
      this._run(
        'DELETE FROM workflow_events WHERE timestamp < ?',
        cutoffTimestamp
      ),
      this._run(
        'DELETE FROM workflow_batches WHERE created_at < ?',
        cutoffTimestamp
      ),
      this._run(
        'DELETE FROM workflow_sessions WHERE created_at < ?',
        cutoffTimestamp
      ),
      this._run('DELETE FROM queue_jobs WHERE created_at < ?', cutoffTimestamp),
    ]);
    this.cache.clear();
  }

  async ping() {
    try {
      await this._get('SELECT 1');
      return true;
    } catch (err) {
      this.logger?.error(
        `[PersistenceService] Database ping failed: ${err.message}`
      );
      return false;
    }
  }

  async close() {
    if (this.worker) {
      await this.worker.terminate();
    }
  }
}

module.exports = PersistenceService;
