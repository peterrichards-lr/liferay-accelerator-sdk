const Database = require('better-sqlite3');
const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');

const dbPath = workerData.dbPath;

// Ensure target directory exists for file-based DBs
if (dbPath !== ':memory:') {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// Run migrations on start
try {
  _initSchema(db);
  parentPort.postMessage({ id: 'init', success: true });
} catch (err) {
  parentPort.postMessage({ id: 'init', success: false, error: err.message });
}

const statementCache = new Map();

function getPreparedStatement(sql) {
  let stmt = statementCache.get(sql);
  if (!stmt) {
    stmt = db.prepare(sql);
    statementCache.set(sql, stmt);
  }
  return stmt;
}

const runTransaction = db.transaction((queries) => {
  const results = [];
  for (const q of queries) {
    const stmt = getPreparedStatement(q.sql);
    let res;
    if (q.action === 'all') {
      res = stmt.all(q.params || []);
    } else if (q.action === 'get') {
      res = stmt.get(q.params || []);
    } else {
      res = stmt.run(q.params || []);
    }
    results.push(res);
  }
  return results;
});

parentPort.on('message', ({ id, action, sql, params, queries }) => {
  try {
    if (action === 'transaction') {
      const result = runTransaction(queries);
      parentPort.postMessage({ id, result });
    } else if (action === 'exec') {
      db.exec(sql);
      parentPort.postMessage({ id });
    } else if (action === 'close') {
      db.close();
      parentPort.postMessage({ id });
    } else {
      const stmt = getPreparedStatement(sql);
      let result;
      if (action === 'all') {
        result = stmt.all(params || []);
      } else if (action === 'get') {
        result = stmt.get(params || []);
      } else {
        result = stmt.run(params || []);
      }
      parentPort.postMessage({ id, result });
    }
  } catch (err) {
    parentPort.postMessage({ id, error: err.message });
  }
});

function _initSchema(conn) {
  conn.exec(`
    CREATE TABLE IF NOT EXISTS workflow_sessions (
      session_id TEXT PRIMARY KEY,
      flow_type TEXT NOT NULL,
      status TEXT NOT NULL,
      context_json TEXT NOT NULL,
      current_steps_json TEXT NOT NULL,
      correlation_id TEXT,
      session_name TEXT,
      version INTEGER DEFAULT 1,
      error_message TEXT,
      error_reference_code TEXT,
      error_stack TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Migrations for existing databases
  const columns = conn.prepare('PRAGMA table_info(workflow_sessions)').all();

  if (!columns.find((c) => c.name === 'error_stack')) {
    try {
      conn.exec('ALTER TABLE workflow_sessions ADD COLUMN error_stack TEXT;');
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  if (!columns.find((c) => c.name === 'error_reference_code')) {
    try {
      conn.exec(
        'ALTER TABLE workflow_sessions ADD COLUMN error_reference_code TEXT;'
      );
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  if (!columns.find((c) => c.name === 'correlation_id')) {
    try {
      conn.exec(
        'ALTER TABLE workflow_sessions ADD COLUMN correlation_id TEXT;'
      );
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  if (!columns.find((c) => c.name === 'session_name')) {
    try {
      conn.exec('ALTER TABLE workflow_sessions ADD COLUMN session_name TEXT;');
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  if (!columns.find((c) => c.name === 'error_message')) {
    try {
      conn.exec('ALTER TABLE workflow_sessions ADD COLUMN error_message TEXT;');
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  conn.exec(`
    CREATE TABLE IF NOT EXISTS workflow_batches (
      erc TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      step_key TEXT NOT NULL,
      status TEXT NOT NULL,
      downstream_batch_id TEXT,
      processed_count INTEGER DEFAULT 0,
      total_count INTEGER DEFAULT 0,
      error_count INTEGER DEFAULT 0,
      error_message TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (session_id) REFERENCES workflow_sessions(session_id) ON DELETE CASCADE
    );
  `);

  // Migration for workflow_batches
  const batchColumns = conn
    .prepare('PRAGMA table_info(workflow_batches)')
    .all();

  if (!batchColumns.find((c) => c.name === 'error_message')) {
    try {
      conn.exec('ALTER TABLE workflow_batches ADD COLUMN error_message TEXT;');
    } catch (err) {
      if (!err.message.includes('duplicate column name')) throw err;
    }
  }

  conn.exec(`
    CREATE TABLE IF NOT EXISTS workflow_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      session_id TEXT NOT NULL,
      batch_id TEXT,
      status TEXT NOT NULL,
      message TEXT,
      details_json TEXT,
      FOREIGN KEY (session_id) REFERENCES workflow_sessions(session_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_batches_session ON workflow_batches(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_session ON workflow_events(session_id);

    CREATE TABLE IF NOT EXISTS system_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS queue_jobs (
      job_id TEXT PRIMARY KEY,
      queue_name TEXT NOT NULL,
      job_type TEXT NOT NULL,
      data_json TEXT NOT NULL,
      status TEXT NOT NULL,
      priority INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      max_attempts INTEGER DEFAULT 3,
      run_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      result_json TEXT,
      error_message TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_queue_jobs_status ON queue_jobs(status, run_at);
  `);
}
