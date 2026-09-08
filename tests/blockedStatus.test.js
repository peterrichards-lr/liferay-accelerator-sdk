const PersistenceService = require('../src/services/persistenceService.cjs');

/**
 * A step has three ways to end without doing its work, and until #172 the
 * vocabulary had two words for them:
 *
 * - FAILED    - an error was thrown while performing the action
 * - BYPASSED  - there was nothing to do, confirmed by a live query
 * - BLOCKED   - the action was asked for and could not be attempted
 *
 * The third used to report as the second, so a run could announce success over
 * work an operator had explicitly requested and never received.
 */
describe('BLOCKED status and status reasons', () => {
  let persistence;

  beforeEach(() => {
    persistence = new PersistenceService(null, ':memory:');
  });

  afterEach(async () => {
    await persistence.close();
  });

  const seedSession = () =>
    persistence.createSession({
      sessionId: 'session-1',
      flowType: 'products',
      status: 'STARTED',
      context: {},
      currentSteps: [],
    });

  describe('status_reason', () => {
    it('round-trips a reason so a step can say why it ended that way', async () => {
      await seedSession();

      await persistence.createBatch({
        erc: 'batch-blocked',
        sessionId: 'session-1',
        stepKey: 'update-inventory',
        status: 'BLOCKED',
        totalCount: 0,
        statusReason:
          'no warehouse exists in this instance and the run was configured not to create one',
      });

      const batch = await persistence.getBatch('batch-blocked');

      expect(batch.status).toBe('BLOCKED');
      expect(batch.status_reason).toContain('no warehouse exists');
    });

    it('stores null when no reason is given, so absence is not an empty string', async () => {
      await seedSession();

      await persistence.createBatch({
        erc: 'batch-plain',
        sessionId: 'session-1',
        stepKey: 'create-products',
        status: 'COMPLETED',
        totalCount: 5,
      });

      const batch = await persistence.getBatch('batch-plain');

      expect(batch.status_reason).toBeNull();
    });

    it('carries a reason on any status, not only on a block', async () => {
      await seedSession();

      await persistence.createBatch({
        erc: 'batch-bypassed',
        sessionId: 'session-1',
        stepKey: 'create-promotions',
        status: 'BYPASSED',
        totalCount: 0,
        statusReason: 'promotions were not requested for this run',
      });

      const batch = await persistence.getBatch('batch-bypassed');

      expect(batch.status).toBe('BYPASSED');
      expect(batch.status_reason).toBe(
        'promotions were not requested for this run'
      );
    });
  });

  describe('processed_count', () => {
    // The column was written as a literal 0 while completeSyncStep passed a
    // count in, so every synchronous step recorded having processed nothing.
    it('records the count it was given rather than zero', async () => {
      await seedSession();

      await persistence.createBatch({
        erc: 'batch-counted',
        sessionId: 'session-1',
        stepKey: 'update-inventory',
        status: 'COMPLETED',
        processedCount: 25,
        totalCount: 50,
      });

      const batch = await persistence.getBatch('batch-counted');

      expect(batch.processed_count).toBe(25);
      expect(batch.total_count).toBe(50);
    });

    it('still defaults to zero when the caller says nothing', async () => {
      await seedSession();

      await persistence.createBatch({
        erc: 'batch-uncounted',
        sessionId: 'session-1',
        stepKey: 'create-products',
        status: 'COMPLETED',
        totalCount: 3,
      });

      expect(
        (await persistence.getBatch('batch-uncounted')).processed_count
      ).toBe(0);
    });
  });

  describe('a blocked step never reads as satisfied', () => {
    const seedDependency = async (status, statusReason = null) => {
      await seedSession();
      await persistence.createBatch({
        erc: `batch-${status}`,
        sessionId: 'session-1',
        stepKey: 'create-warehouses',
        status,
        totalCount: 1,
        statusReason,
      });
    };

    it.each(['COMPLETED', 'BYPASSED', 'SYNCHRONOUS'])(
      'treats %s as satisfied',
      async (status) => {
        await seedDependency(status);

        expect(
          await persistence.verifyDependencyReady(
            'session-1',
            'create-warehouses'
          )
        ).toBe(true);
      }
    );

    it.each(['BLOCKED', 'FAILED'])(
      'does not treat %s as satisfied',
      async (status) => {
        // Nothing downstream should proceed on the assumption that a step it
        // depends on did its work.
        await seedDependency(status);

        expect(
          await persistence.verifyDependencyReady(
            'session-1',
            'create-warehouses'
          )
        ).toBe(false);
      }
    );
  });

  describe('getDependencyBlocker tells "never" apart from "not yet"', () => {
    const seed = async (status, statusReason = null) => {
      await seedSession();
      await persistence.createBatch({
        erc: `batch-${status}`,
        sessionId: 'session-1',
        stepKey: 'create-warehouses',
        status,
        totalCount: 1,
        statusReason,
      });
    };

    it('reports nothing while the dependency may still get there', async () => {
      await seed('PENDING');

      expect(
        await persistence.getDependencyBlocker('session-1', 'create-warehouses')
      ).toBeNull();
    });

    it('reports nothing when the dependency succeeded', async () => {
      await seed('COMPLETED');

      expect(
        await persistence.getDependencyBlocker('session-1', 'create-warehouses')
      ).toBeNull();
    });

    it('reports the block, with its reason, when it can never be satisfied', async () => {
      await seed('BLOCKED', 'no warehouse exists in this instance');

      const blocker = await persistence.getDependencyBlocker(
        'session-1',
        'create-warehouses'
      );

      expect(blocker).toEqual({
        status: 'BLOCKED',
        reason: 'no warehouse exists in this instance',
      });
    });

    it('reports a failure the same way, so a dependent step is not stalled by one either', async () => {
      await seed('FAILED');

      expect(
        (
          await persistence.getDependencyBlocker(
            'session-1',
            'create-warehouses'
          )
        ).status
      ).toBe('FAILED');
    });

    it('reports nothing for a step that never ran, which is not a block', async () => {
      await seedSession();

      expect(
        await persistence.getDependencyBlocker('session-1', 'create-warehouses')
      ).toBeNull();
    });
  });

  describe('the migration is additive for a database that predates the column', () => {
    it('adds status_reason to an existing workflow_batches table', async () => {
      // The schema runs on every construction, so opening a second service
      // against the same in-memory handle exercises the ALTER TABLE path the
      // same way a live database upgrade would.
      await seedSession();
      await persistence.createBatch({
        erc: 'batch-pre',
        sessionId: 'session-1',
        stepKey: 'create-products',
        status: 'COMPLETED',
        totalCount: 1,
      });

      const columns = await persistence._all(
        'PRAGMA table_info(workflow_batches)'
      );

      expect(columns.map((column) => column.name)).toContain('status_reason');
      expect(columns.map((column) => column.name)).toContain('error_message');
    });
  });
});
