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

  describe('Steady-state worker failure draining (post-init)', () => {
    // These tests exercise the worker's 'error'/'exit' handlers once the
    // instance is already past init - awaiting initPromise first keeps
    // rejectInit()'s unconditional call in those handlers a guaranteed
    // no-op here, isolating the steady-state draining behavior under test.
    beforeEach(async () => {
      await persistence.initPromise;
    });

    it('should reject all pending requests via _rejectAllPending and clear the map', () => {
      let rejectedWith1;
      let rejectedWith2;
      persistence.pendingRequests.set('req-1', {
        resolve: vi.fn(),
        reject: (err) => {
          rejectedWith1 = err;
        },
      });
      persistence.pendingRequests.set('req-2', {
        resolve: vi.fn(),
        reject: (err) => {
          rejectedWith2 = err;
        },
      });

      persistence._rejectAllPending('worker died');

      expect(rejectedWith1).toBeInstanceOf(Error);
      expect(rejectedWith1.message).toBe('worker died');
      expect(rejectedWith2).toBeInstanceOf(Error);
      expect(persistence.pendingRequests.size).toBe(0);
    });

    it('should reject in-flight requests when the worker emits an unexpected error event', async () => {
      let capturedError;
      persistence.pendingRequests.set('in-flight-id', {
        resolve: vi.fn(),
        reject: (err) => {
          capturedError = err;
        },
      });

      persistence.worker.emit('error', new Error('worker crashed'));

      expect(capturedError).toBeInstanceOf(Error);
      expect(persistence.pendingRequests.size).toBe(0);
    });

    it('should reject in-flight requests when the worker exits unexpectedly', async () => {
      let capturedError;
      persistence.pendingRequests.set('in-flight-id', {
        resolve: vi.fn(),
        reject: (err) => {
          capturedError = err;
        },
      });

      persistence.worker.emit('exit', 1);

      expect(capturedError).toBeInstanceOf(Error);
      expect(persistence.pendingRequests.size).toBe(0);
    });

    it('should reject any still-pending requests when close() is called', async () => {
      let capturedError;
      persistence.pendingRequests.set('closing-id', {
        resolve: vi.fn(),
        reject: (err) => {
          capturedError = err;
        },
      });

      await persistence.close();

      expect(capturedError).toBeInstanceOf(Error);
      expect(persistence.pendingRequests.size).toBe(0);
    });

    it('should leave a genuinely in-flight request hanging without the fix (regression guard)', async () => {
      // This is a behavioral sanity check: a real in-flight request should
      // actually get rejected (not just resolved as a no-op) when the
      // worker errors out, proving the caller's await would have unblocked.
      const pending = new Promise((resolve, reject) => {
        persistence.pendingRequests.set('real-await', { resolve, reject });
      });

      persistence.worker.emit('error', new Error('boom'));

      await expect(pending).rejects.toThrow('boom');
    });
  });

  it('should not lose data from concurrent updateSessionContext calls on the same session', async () => {
    const sessionId = 'race-session';
    await persistence.createSession({
      sessionId,
      flowType: 'products',
      status: 'STARTED',
      context: { base: true },
    });

    // Two concurrent context updates touching different keys. Without
    // per-session serialization, both read the same pre-update context,
    // merge in their own key, and the later write silently clobbers the
    // earlier one's key.
    await Promise.all([
      persistence.updateSessionContext(sessionId, { keyA: 'a' }),
      persistence.updateSessionContext(sessionId, { keyB: 'b' }),
    ]);

    const session = await persistence.getSession(sessionId);
    expect(session.context.base).toBe(true);
    expect(session.context.keyA).toBe('a');
    expect(session.context.keyB).toBe('b');
  });

  it('should not lose data when updateSession and updateSessionContext race on the same session', async () => {
    const sessionId = 'race-session-mixed';
    await persistence.createSession({
      sessionId,
      flowType: 'products',
      status: 'STARTED',
      context: { base: true },
    });

    await Promise.all([
      persistence.updateSessionContext(sessionId, { keyA: 'a' }),
      persistence.updateSession(sessionId, { context: { keyB: 'b' } }),
    ]);

    const session = await persistence.getSession(sessionId);
    expect(session.context.base).toBe(true);
    expect(session.context.keyA).toBe('a');
    expect(session.context.keyB).toBe('b');
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
      // Draining now goes through the shared _rejectAllPending helper (used
      // by the init-crash, steady-state error, exit, and close() paths
      // alike), which wraps with a descriptive prefix rather than
      // rethrowing the original error object as-is.
      expect(pendingReject).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining(crashError.message),
        })
      );
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

    it('does not re-reject an already-resolved initPromise for a later runtime error after a successful init, but still drains in-flight requests', async () => {
      const persistenceOk = new PersistenceService(null, ':memory:');
      await persistenceOk.initPromise;

      const pendingReject = vi.fn();
      persistenceOk.pendingRequests.set('in-flight', {
        resolve: vi.fn(),
        reject: pendingReject,
      });

      persistenceOk.worker.emit('error', new Error('unrelated runtime error'));

      // initPromise was already resolved; rejectInit()'s settled-guard must
      // make this call a no-op rather than rejecting an already-resolved
      // promise's downstream awaiters.
      await expect(persistenceOk.initPromise).resolves.toBeUndefined();
      // Steady-state draining (see the sibling describe block above) now
      // covers any post-init worker error, so the in-flight request must
      // still be rejected and cleared - this is the intended combined
      // behavior of #70 (initPromise settling) and #71 (pendingRequests
      // draining), not a gap.
      expect(pendingReject).toHaveBeenCalled();
      expect(persistenceOk.pendingRequests.size).toBe(0);

      await persistenceOk.close();
    });
  });
});
