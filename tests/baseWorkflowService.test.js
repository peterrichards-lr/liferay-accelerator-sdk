const { BaseGenerator, PersistenceService, utils } = require('../src/index.js');
const { WORKFLOW_STEPS } = utils.constants;

describe('BaseWorkflowService.submitBatch', () => {
  let generator;
  let mockCtx;
  let persistence;
  const sessionId = 'batch-session';

  beforeEach(async () => {
    persistence = new PersistenceService(
      { logger: { info: vi.fn() } },
      ':memory:'
    );

    mockCtx = {
      persistence,
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
      },
      progress: {
        batchStarted: vi.fn(),
        batchCompleted: vi.fn(),
        stepCompleted: vi.fn(),
      },
      batchCallback: {
        _checkSessionCompletion: vi.fn().mockResolvedValue(),
      },
    };

    generator = new BaseGenerator(mockCtx);

    await persistence.createSession({
      sessionId,
      flowType: 'test',
      status: 'STARTED',
      currentSteps: [],
      correlationId: 'cid-1',
      context: { config: {} },
    });
  });

  afterEach(async () => {
    vi.useRealTimers();
    await persistence.close();
  });

  it('rejects unregistered step keys before touching persistence', async () => {
    await expect(
      generator.submitBatch(
        sessionId,
        'not-a-real-step',
        'products',
        'create',
        vi.fn(),
        5
      )
    ).rejects.toThrow(/Unregistered workflow step key/);
  });

  it('transitions PREPARED -> SUBMITTED when submitFn resolves with a batchId', async () => {
    const submitFn = vi.fn().mockResolvedValue({ batchId: 'downstream-123' });

    const result = await generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.CREATE_PRODUCTS,
      'products',
      'create',
      submitFn,
      10
    );

    expect(submitFn).toHaveBeenCalledWith(
      expect.stringMatching(/^AICA-BATCH-/),
      expect.objectContaining({ session_id: sessionId })
    );

    expect(result.batchId).toBe('downstream-123');
    expect(result.batchERC).toEqual(expect.stringMatching(/^AICA-BATCH-/));

    const batch = await persistence.getBatch(result.batchERC);
    expect(batch.status).toBe('SUBMITTED');

    expect(mockCtx.progress.batchStarted).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId,
        batchERC: result.batchERC,
        batchId: 'downstream-123',
        totalItems: 10,
        entityType: 'products',
        operation: 'create',
      })
    );
    expect(mockCtx.progress.batchCompleted).not.toHaveBeenCalled();
  });

  it('falls back to a simulated batchId when a completed result omits one', async () => {
    vi.useFakeTimers();
    vi.spyOn(generator, 'completeSyncStep').mockResolvedValue(true);

    const submitFn = vi.fn().mockResolvedValue({ status: 'completed' });

    const result = await generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.CREATE_ACCOUNTS,
      'accounts',
      'create',
      submitFn,
      3
    );

    expect(result.batchId).toBe('simulated-batch');
  });

  it('marks the batch COMPLETED and auto-advances via completeSyncStep + batchCallback when submitFn reports completion', async () => {
    vi.useFakeTimers();

    const submitFn = vi
      .fn()
      .mockResolvedValue({ status: 'COMPLETED', batchId: 'sync-batch-1' });
    const completeSyncSpy = vi
      .spyOn(generator, 'completeSyncStep')
      .mockResolvedValue(true);

    const result = await generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.LOAD_COUNTRIES,
      'metadata',
      'load',
      submitFn,
      1
    );

    const batch = await persistence.getBatch(result.batchERC);
    expect(batch.status).toBe('COMPLETED');
    expect(batch.processed_count).toBeDefined();

    expect(mockCtx.progress.batchStarted).toHaveBeenCalled();
    expect(mockCtx.progress.batchCompleted).toHaveBeenCalledWith(
      expect.objectContaining({ sessionId, batchERC: result.batchERC })
    );

    // The auto-advance is scheduled via setTimeout(..., 500)
    expect(completeSyncSpy).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(500);

    expect(completeSyncSpy).toHaveBeenCalledWith(
      sessionId,
      WORKFLOW_STEPS.LOAD_COUNTRIES,
      'COMPLETED'
    );
    expect(mockCtx.batchCallback._checkSessionCompletion).toHaveBeenCalledWith(
      sessionId,
      'cid-1'
    );
  });

  // A batch Liferay reports as already completed has processed every one of
  // its items. Recording it against the wrong field left the report showing
  // rows like `create-price-lists COMPLETED 0/90` (#763).
  it('records the full item count as processed when submitFn reports completion', async () => {
    vi.useFakeTimers();
    vi.spyOn(generator, 'completeSyncStep').mockResolvedValue(true);

    const submitFn = vi.fn().mockResolvedValue({ status: 'completed' });

    const result = await generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.GENERATE_PRICE_LISTS,
      'priceLists',
      'generate',
      submitFn,
      90
    );

    const batch = await persistence.getBatch(result.batchERC);
    expect(batch.processed_count).toBe(90);
    expect(batch.total_count).toBe(90);
  });

  it('logs and swallows errors raised while auto-advancing the simulated batch', async () => {
    vi.useFakeTimers();

    const submitFn = vi
      .fn()
      .mockResolvedValue({ status: 'COMPLETED', batchId: 'sync-batch-2' });
    vi.spyOn(generator, 'completeSyncStep').mockRejectedValue(
      new Error('advance failed')
    );

    await generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.LOAD_LANGUAGES,
      'metadata',
      'load',
      submitFn,
      1
    );

    await vi.advanceTimersByTimeAsync(500);
    // flush the rejected-promise microtask chain
    await Promise.resolve();
    await Promise.resolve();

    expect(mockCtx.logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to auto-advance simulated batch'),
      expect.objectContaining({
        sessionId,
        stepKey: WORKFLOW_STEPS.LOAD_LANGUAGES,
      })
    );

    // The failed advance must not take the completion check down with it. The
    // batch itself is already done; skipping the check leaves the session
    // waiting on it with nothing left to arrive (#763).
    expect(mockCtx.batchCallback._checkSessionCompletion).toHaveBeenCalledWith(
      sessionId,
      'cid-1'
    );
  });

  it('marks the batch FAILED and rethrows when submitFn rejects', async () => {
    const submitError = new Error('downstream exploded');
    const submitFn = vi.fn().mockRejectedValue(submitError);

    await expect(
      generator.submitBatch(
        sessionId,
        WORKFLOW_STEPS.CREATE_ORDERS,
        'orders',
        'create',
        submitFn,
        2
      )
    ).rejects.toThrow('downstream exploded');

    const batches = await persistence.getBatchesForSession(sessionId);
    const failedBatch = batches.find(
      (b) => b.step_key === WORKFLOW_STEPS.CREATE_ORDERS
    );
    expect(failedBatch.status).toBe('FAILED');
    expect(mockCtx.logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Batch submission failed'),
      expect.objectContaining({ sessionId })
    );
  });

  it('marks the batch FAILED and throws when submitFn resolves without batchId/completion', async () => {
    const submitFn = vi.fn().mockResolvedValue({});

    await expect(
      generator.submitBatch(
        sessionId,
        WORKFLOW_STEPS.CREATE_WAREHOUSES,
        'warehouses',
        'create',
        submitFn,
        4
      )
    ).rejects.toThrow(/Failed to obtain batchId/);

    const batches = await persistence.getBatchesForSession(sessionId);
    const failedBatch = batches.find(
      (b) => b.step_key === WORKFLOW_STEPS.CREATE_WAREHOUSES
    );
    expect(failedBatch.status).toBe('FAILED');
  });
});

// A live run on 2026-09-09 placed 139 inventory items over five batches and
// reported `Inventory 1 / 139, Done, short`. The marker `submitBatch`
// schedules when Liferay says a batch already completed took the SDK's
// default count of 1, and #776 had taught the client to believe a reported
// count over its own batch sum.
describe('an auto-advance marker reports no work (#799)', () => {
  let generator;
  let mockCtx;
  let persistence;
  const sessionId = 'marker-session';

  beforeEach(async () => {
    persistence = new PersistenceService(
      { logger: { info: vi.fn() } },
      ':memory:'
    );

    mockCtx = {
      persistence,
      logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
      progress: {
        batchStarted: vi.fn(),
        batchCompleted: vi.fn(),
        stepCompleted: vi.fn(),
      },
      batchCallback: { _checkSessionCompletion: vi.fn().mockResolvedValue() },
    };

    generator = new BaseGenerator(mockCtx);

    await persistence.createSession({
      sessionId,
      flowType: 'generate',
      status: 'STARTED',
      currentSteps: [],
      correlationId: 'cid-marker',
      context: { config: {} },
    });
  });

  afterEach(async () => {
    await persistence.close();
  });

  // The auto-advance is a real setTimeout whose callback then waits on the
  // persistence worker, so the assertions wait for the marker rather than
  // driving a fake clock past the timer and arriving before the writes land.
  const waitFor = async (condition) => {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (condition()) return;
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    throw new Error('condition never held');
  };

  const submitAlreadyCompletedInventoryBatch = (itemsCount) =>
    generator.submitBatch(
      sessionId,
      WORKFLOW_STEPS.UPDATE_INVENTORY,
      'inventory',
      'update',
      vi.fn().mockResolvedValue({ status: 'completed' }),
      itemsCount
    );

  it('puts no count on the wire for the step it only advances', async () => {
    await submitAlreadyCompletedInventoryBatch(28);
    await waitFor(() => mockCtx.progress.stepCompleted.mock.calls.length > 0);

    const markerBroadcasts = mockCtx.progress.stepCompleted.mock.calls.map(
      ([call]) => call
    );

    expect(markerBroadcasts).toHaveLength(1);
    expect(markerBroadcasts[0]).not.toHaveProperty('processedCount');
    expect(markerBroadcasts[0]).not.toHaveProperty('totalCount');
    expect(markerBroadcasts[0]).toMatchObject({
      step: WORKFLOW_STEPS.UPDATE_INVENTORY,
      entityType: 'inventory',
    });
  });

  it('leaves the step total to the batches that did the work', async () => {
    for (const size of [28, 31, 26, 24, 30]) {
      await submitAlreadyCompletedInventoryBatch(size);
    }
    await waitFor(() => mockCtx.progress.stepCompleted.mock.calls.length === 5);

    const batches = await persistence.getBatchesForSession(sessionId);
    const markers = batches.filter((b) => b.erc.startsWith('SYNC-'));
    const work = batches.filter((b) => !b.erc.startsWith('SYNC-'));

    expect(markers).toHaveLength(5);
    expect(markers.every((m) => m.total_count === 0)).toBe(true);
    expect(work.reduce((sum, b) => sum + b.processed_count, 0)).toBe(139);
    expect(batches.reduce((sum, b) => sum + b.total_count, 0)).toBe(139);
  });
});

describe('_normalizeEntityType', () => {
  const generator = new BaseGenerator({});

  // The step deletes nothing and reports the single unit it processed, so
  // reporting it against products showed "Products 1 Deleted, Done" while
  // delete-products was still PREPARED at 0 of 50 (#786).
  it('does not report a catalog configuration reset against products', () => {
    expect(
      generator._normalizeEntityType(WORKFLOW_STEPS.RESET_CATALOG_CONFIG)
    ).toBe('config');
    expect(
      generator._normalizeEntityType(WORKFLOW_STEPS.UPDATE_CATALOG_CONFIG)
    ).toBe('config');
  });

  it('still reports the product deletion step against products', () => {
    expect(generator._normalizeEntityType(WORKFLOW_STEPS.DELETE_PRODUCTS)).toBe(
      'products'
    );
  });
});
