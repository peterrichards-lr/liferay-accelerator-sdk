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
});
