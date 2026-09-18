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

  describe('history purge', () => {
    const seedHistory = async () => {
      await persistence.createSession({
        sessionId: 'purge-session',
        flowType: 'products',
        status: 'COMPLETED',
      });
      await persistence.createBatch({
        erc: 'BATCH-1',
        sessionId: 'purge-session',
        stepKey: 'create-products',
        status: 'COMPLETED',
        totalCount: 1,
      });
      await persistence.logWorkflowEvent({
        sessionId: 'purge-session',
        status: 'COMPLETED',
        message: 'done',
      });
    };

    it('clears history without rejecting when events reference a session', async () => {
      await seedHistory();

      // workflow_events and workflow_batches reference workflow_sessions, so
      // deleting the parents in parallel with the children raised
      // "FOREIGN KEY constraint failed" - and because Promise.all abandons the
      // rest after the first rejection, the second failure went unhandled and
      // shut the whole service down.
      await expect(persistence.clearAll()).resolves.toBeUndefined();

      expect(await persistence.getSession('purge-session')).toBeNull();
      expect(await persistence.getEventsForSession('purge-session')).toEqual(
        []
      );
      expect(await persistence.getBatchesForSession('purge-session')).toEqual(
        []
      );
    });

    it('clears history in a single transaction', async () => {
      await seedHistory();

      const posted = [];
      const original = persistence.worker.postMessage.bind(persistence.worker);
      persistence.worker.postMessage = (msg) => {
        posted.push(msg);
        return original(msg);
      };

      await persistence.clearAll();
      persistence.worker.postMessage = original;

      // One atomic request, not four racing deletes.
      expect(posted).toHaveLength(1);
      expect(posted[0].action).toBe('transaction');
      expect(posted[0].queries.map((q) => q.sql)).toEqual([
        'DELETE FROM workflow_events',
        'DELETE FROM workflow_batches',
        'DELETE FROM workflow_sessions',
        'DELETE FROM queue_jobs',
      ]);
    });

    it('cleanup removes history older than the cutoff and keeps the rest', async () => {
      await persistence.createSession({
        sessionId: 'recent-session',
        flowType: 'products',
        status: 'COMPLETED',
      });

      const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      await expect(persistence.cleanup(future)).resolves.toBeUndefined();
      expect(await persistence.getSession('recent-session')).toBeNull();

      await persistence.createSession({
        sessionId: 'kept-session',
        flowType: 'products',
        status: 'COMPLETED',
      });

      const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      await persistence.cleanup(past);
      expect(await persistence.getSession('kept-session')).not.toBeNull();
    });
  });

  describe('re-entering a failed session', () => {
    const seedSession = (sessionId, status = 'STARTED') =>
      persistence.createSession({
        sessionId,
        flowType: 'products',
        status,
        context: { options: { dryRun: false } },
        currentSteps: [],
      });

    const seedBatch = (sessionId, stepKey, status, erc) =>
      persistence.createBatch({ erc, sessionId, stepKey, status });

    describe('clearFailedBatchesForStep', () => {
      it('removes the failed rows of the named step and returns how many', async () => {
        await seedSession('s1');
        await seedBatch('s1', 'create-products', 'COMPLETED', 'A');
        await seedBatch('s1', 'link-product-options', 'FAILED', 'B');
        await seedBatch('s1', 'link-product-options', 'SYNCHRONOUS', 'C');

        expect(
          await persistence.clearFailedBatchesForStep(
            's1',
            'link-product-options'
          )
        ).toBe(1);

        const remaining = await persistence.getBatchesForSession('s1');
        expect(remaining.map((row) => row.erc).sort()).toEqual(['A', 'C']);
      });

      it('counts every row it removed, not just that it removed some', async () => {
        // A step fans out into a batch per chunk, so more than one of them can
        // end FAILED. The count is what the resume route reports back.
        await seedSession('s1');
        await seedBatch('s1', 'create-products', 'FAILED', 'CHUNK-1');
        await seedBatch('s1', 'create-products', 'FAILED', 'CHUNK-2');
        await seedBatch('s1', 'create-products', 'COMPLETED', 'CHUNK-3');

        expect(
          await persistence.clearFailedBatchesForStep('s1', 'create-products')
        ).toBe(2);

        expect(
          (await persistence.getBatchesForSession('s1')).map((row) => row.erc)
        ).toEqual(['CHUNK-3']);
      });

      it('leaves another failed step of the same session alone', async () => {
        // Scoped to one step, not to the session. Two branches of a parallel
        // can both end FAILED while a caller has decided only one of them may
        // be re-entered.
        await seedSession('s1');
        await seedBatch('s1', 'link-product-options', 'FAILED', 'LINK');
        await seedBatch('s1', 'create-images', 'FAILED', 'IMAGES');

        expect(
          await persistence.clearFailedBatchesForStep(
            's1',
            'link-product-options'
          )
        ).toBe(1);

        expect(
          (await persistence.getBatchesForSession('s1')).map((row) => row.erc)
        ).toEqual(['IMAGES']);
      });

      it('leaves the same step of another session alone', async () => {
        await seedSession('s1');
        await seedSession('s2');
        await seedBatch('s2', 'link-product-options', 'FAILED', 'OTHER');

        expect(
          await persistence.clearFailedBatchesForStep(
            's1',
            'link-product-options'
          )
        ).toBe(0);

        expect(await persistence.getBatchesForSession('s2')).toHaveLength(1);
      });

      it('reports nothing removed when the step holds no failed rows', async () => {
        await seedSession('s1');
        await seedBatch('s1', 'create-products', 'COMPLETED', 'A');

        expect(
          await persistence.clearFailedBatchesForStep('s1', 'create-products')
        ).toBe(0);
        expect(await persistence.getBatchesForSession('s1')).toHaveLength(1);
      });

      it('evicts both caches, so the step does not read FAILED straight back', async () => {
        await seedSession('s1');
        await seedBatch('s1', 'link-product-options', 'FAILED', 'B');

        // Both reads populate a cache, and both are what executeNextStep
        // consults when it derives a step's state.
        await persistence.getBatchesForSession('s1');
        await persistence.getBatch('B');

        await persistence.clearFailedBatchesForStep(
          's1',
          'link-product-options'
        );

        expect(await persistence.getBatchesForSession('s1')).toEqual([]);
        expect(await persistence.getBatch('B')).toBeNull();
      });

      it('reads and deletes in a single transaction', async () => {
        await seedSession('s1');
        await seedBatch('s1', 'link-product-options', 'FAILED', 'B');

        const posted = [];
        const original = persistence.worker.postMessage.bind(
          persistence.worker
        );
        persistence.worker.postMessage = (msg) => {
          posted.push(msg);
          return original(msg);
        };

        await persistence.clearFailedBatchesForStep(
          's1',
          'link-product-options'
        );
        persistence.worker.postMessage = original;

        // One atomic request, not a SELECT and then a DELETE. A row that turns
        // FAILED between the two would be deleted without its `batch-<erc>`
        // cache entry being evicted, and getBatch would keep serving it.
        expect(posted).toHaveLength(1);
        expect(posted[0].action).toBe('transaction');
        expect(posted[0].queries.map((query) => query.action)).toEqual([
          'all',
          'run',
        ]);
      });
    });

    describe('tryReviveSession', () => {
      it('revives a failed session and drops the error it was carrying', async () => {
        await seedSession('s1');
        await persistence.tryFailSession(
          's1',
          'channel unresolvable',
          'ERR-1',
          'at handler'
        );

        expect(await persistence.tryReviveSession('s1')).toBe(true);

        const revived = await persistence.getSession('s1');
        expect(revived.status).toBe('STARTED');
        expect(revived.error_message).toBeNull();
        expect(revived.errorReferenceCode).toBeNull();
        expect(revived.error_stack).toBeNull();
        expect(revived.currentSteps).toEqual([]);
      });

      it('clears the steps the failed session was still pointing at', async () => {
        // `tryFailSession` empties current_steps_json on its way past, but it
        // is not the only route into FAILED - `updateSession` and
        // `updateSessionStatus` both set the status and leave the column. A
        // session revived still naming a current step has the engine advancing
        // against a step list from before the failure.
        await persistence.createSession({
          sessionId: 'stale',
          flowType: 'products',
          status: 'FAILED',
          context: {},
          currentSteps: ['link-product-options'],
        });

        expect(await persistence.tryReviveSession('stale')).toBe(true);
        expect((await persistence.getSession('stale')).currentSteps).toEqual(
          []
        );
      });

      it('keeps the session context across the revive', async () => {
        await seedSession('s1');
        await persistence.tryFailSession('s1', 'boom');

        await persistence.tryReviveSession('s1');

        expect((await persistence.getSession('s1')).context).toEqual({
          options: { dryRun: false },
        });
      });

      it('revives nothing that is not failed', async () => {
        // Narrower than its one-way counterparts' NOT IN on purpose: a
        // COMPLETED session has nothing to resume and a running one is already
        // being advanced, so reviving either would race the orchestrator.
        await seedSession('running');
        await seedSession('done', 'COMPLETED');
        await seedSession('cancelled', 'CANCELLED');

        expect(await persistence.tryReviveSession('running')).toBe(false);
        expect(await persistence.tryReviveSession('done')).toBe(false);
        expect(await persistence.tryReviveSession('cancelled')).toBe(false);

        expect((await persistence.getSession('running')).status).toBe(
          'STARTED'
        );
        expect((await persistence.getSession('done')).status).toBe('COMPLETED');
        expect((await persistence.getSession('cancelled')).status).toBe(
          'CANCELLED'
        );
      });

      it('reports false for a session that does not exist', async () => {
        expect(await persistence.tryReviveSession('nobody')).toBe(false);
      });

      it('evicts the cached session, so the revived status is the one read back', async () => {
        await seedSession('s1');
        await persistence.tryFailSession('s1', 'boom');

        // Populates the `<sessionId>` cache entry with the FAILED row.
        expect((await persistence.getSession('s1')).status).toBe('FAILED');

        await persistence.tryReviveSession('s1');

        expect((await persistence.getSession('s1')).status).toBe('STARTED');
      });
    });
  });
});
