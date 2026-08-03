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
      expect.stringContaining('Failed to auto-advance simulated batch')
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
