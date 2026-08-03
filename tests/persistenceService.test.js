const PersistenceService = require('../src/services/persistenceService.cjs');

describe('PersistenceService', () => {
  let persistence;

  beforeEach(() => {
    // Use an in-memory database for testing
    persistence = new PersistenceService(null, ':memory:');
  });

  afterEach(async () => {
    await persistence.close();
  });

  it('should initialize the schema correctly', async () => {
    // If we can insert a session, the schema is working
    const session = await persistence.createSession({
      sessionId: 'test-session',
      flowType: 'products',
      status: 'STARTED',
      context: { foo: 'bar' },
      currentSteps: ['step1'],
    });

    expect(session.session_id).toBe('test-session');
    expect(session.status).toBe('STARTED');
    expect(session.context.foo).toBe('bar');
  });

  it('should retrieve a session by ID', async () => {
    await persistence.createSession({
      sessionId: 'test-session',
      flowType: 'products',
      status: 'STARTED',
    });

    const session = await persistence.getSession('test-session');
    expect(session).not.toBeNull();
    expect(session.session_id).toBe('test-session');
  });

  it('should update session status', async () => {
    await persistence.createSession({
      sessionId: 'test-session',
      flowType: 'products',
      status: 'STARTED',
    });

    await persistence.updateSessionStatus('test-session', 'COMPLETED');
    const session = await persistence.getSession('test-session');
    expect(session.status).toBe('COMPLETED');
  });

  it('should create and retrieve batches for a session', async () => {
    await persistence.createSession({
      sessionId: 'test-session',
      flowType: 'products',
      status: 'STARTED',
    });

    await persistence.createBatch({
      erc: 'batch-1',
      sessionId: 'test-session',
      stepKey: 'create-products',
      status: 'PREPARED',
      totalCount: 10,
    });

    const batches = await persistence.getBatchesForSession('test-session');
    expect(batches).toHaveLength(1);
    expect(batches[0].erc).toBe('batch-1');
    expect(batches[0].total_count).toBe(10);
  });

  it('should update batch details', async () => {
    await persistence.createSession({
      sessionId: 'test-session',
      flowType: 'products',
      status: 'STARTED',
    });

    await persistence.createBatch({
      erc: 'batch-1',
      sessionId: 'test-session',
      stepKey: 'create-products',
      status: 'PREPARED',
    });

    await persistence.updateBatch('batch-1', {
      status: 'COMPLETED',
      processedCount: 5,
    });

    const batch = await persistence.getBatch('batch-1');
    expect(batch.status).toBe('COMPLETED');
    expect(batch.processed_count).toBe(5);
  });

  it('should verify dependency readiness', async () => {
    const sessionId = 'test-session';
    await persistence.createSession({
      sessionId,
      flowType: 'products',
      status: 'STARTED',
    });

    await persistence.createBatch({
      erc: 'batch-1',
      sessionId,
      stepKey: 'step-1',
      status: 'COMPLETED',
    });

    const ready = await persistence.verifyDependencyReady(sessionId, 'step-1');
    expect(ready).toBe(true);

    await persistence.createBatch({
      erc: 'batch-2',
      sessionId,
      stepKey: 'step-2',
      status: 'PREPARED',
    });

    const notReady = await persistence.verifyDependencyReady(
      sessionId,
      'step-2'
    );
    expect(notReady).toBe(false);
  });

  it('should log workflow events', async () => {
    const sessionId = 'test-session';
    await persistence.createSession({
      sessionId,
      flowType: 'products',
      status: 'STARTED',
    });

    await persistence.logWorkflowEvent({
      sessionId,
      status: 'INFO',
      message: 'Testing event log',
      details: { key: 'value' },
    });

    const events = await persistence.getEventsForSession(sessionId);
    expect(events).toHaveLength(1);
    expect(events[0].message).toBe('Testing event log');
    expect(events[0].details.key).toBe('value');
  });

  it('should filter completed sessions to exclude deletion flows', async () => {
    await persistence.createSession({
      sessionId: 'gen-1',
      flowType: 'generate',
      status: 'COMPLETED',
    });
    await persistence.createSession({
      sessionId: 'acc-1',
      flowType: 'accounts',
      status: 'COMPLETED',
    });
    await persistence.createSession({
      sessionId: 'del-1',
      flowType: 'delete',
      status: 'COMPLETED',
    });

    const completed = await persistence.getCompletedSessions();
    expect(completed).toHaveLength(2);
    expect(completed.some((s) => s.session_id === 'gen-1')).toBe(true);
    expect(completed.some((s) => s.session_id === 'acc-1')).toBe(true);
    expect(completed.some((s) => s.session_id === 'del-1')).toBe(false);
  });

  describe('worker crash before init', () => {
    let crashedPersistence;

    afterEach(async () => {
      if (crashedPersistence) {
        await crashedPersistence.close();
        crashedPersistence = null;
      }
    });

    it('rejects initPromise instead of hanging forever when the worker crashes before init succeeds', async () => {
      crashedPersistence = new PersistenceService(null, ':memory:');
      const crashError = new Error('native module load failure');

      // Simulate the worker crashing (e.g. failing to load, syntax error,
      // uncaught exception) before it ever sends the init success message.
      crashedPersistence.worker.emit('error', crashError);

      await expect(crashedPersistence.initPromise).rejects.toThrow(
        'native module load failure'
      );
    });

    it('rejects any requests already queued behind the crashed init instead of hanging', async () => {
      crashedPersistence = new PersistenceService(null, ':memory:');
      const crashError = new Error('worker crashed on startup');

      const pendingReject = vi.fn();
      crashedPersistence.pendingRequests.set('fake-request-id', {
        resolve: vi.fn(),
        reject: pendingReject,
      });

      crashedPersistence.worker.emit('error', crashError);

      await expect(crashedPersistence.initPromise).rejects.toThrow(
        'worker crashed on startup'
      );
      expect(pendingReject).toHaveBeenCalledWith(crashError);
      expect(crashedPersistence.pendingRequests.size).toBe(0);
    });

    it('fails fast on operations like createSession instead of hanging when the worker crashes before init', async () => {
      crashedPersistence = new PersistenceService(null, ':memory:');
      const crashError = new Error('worker crashed before init');

      crashedPersistence.worker.emit('error', crashError);

      await expect(
        crashedPersistence.createSession({
          sessionId: 'test-session',
          flowType: 'products',
          status: 'STARTED',
        })
      ).rejects.toThrow('worker crashed before init');
    });

    it('does not reject initPromise or drain pending requests for a later runtime error after a successful init', async () => {
      const persistenceOk = new PersistenceService(null, ':memory:');
      await persistenceOk.initPromise;

      const pendingReject = vi.fn();
      persistenceOk.pendingRequests.set('in-flight', {
        resolve: vi.fn(),
        reject: pendingReject,
      });

      persistenceOk.worker.emit('error', new Error('unrelated runtime error'));

      // initPromise was already resolved; the guard must make this a no-op.
      await expect(persistenceOk.initPromise).resolves.toBeUndefined();
      // Steady-state pending-request draining on later errors is out of
      // scope for this fix (tracked separately) — the in-flight request
      // registered above must be left untouched here.
      expect(pendingReject).not.toHaveBeenCalled();
      expect(persistenceOk.pendingRequests.size).toBe(1);

      await persistenceOk.close();
    });
  });
});
