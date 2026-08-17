const { BaseGenerator, PersistenceService, utils } = require('../src/index.js');
const { WORKFLOW_STEPS } = utils.constants;

describe('BaseGenerator', () => {
  let generator;
  let mockCtx;
  let persistence;

  beforeEach(() => {
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
      config: {
        getExcludeLists: vi.fn().mockResolvedValue([]),
        getLiferaySyncDelayMs: vi.fn().mockReturnValue(0),
        getWorkflowResilienceConfigCached: vi.fn().mockReturnValue({
          initialDelayMs: 5,
          maxRetries: 3,
          multiplier: 2,
        }),
      },
      liferay: {
        getCountries: vi.fn().mockResolvedValue([{ id: 1, name: 'US' }]),
        getLanguages: vi
          .fn()
          .mockResolvedValue([{ id: 'en-US', markedAsDefault: true }]),
        getTaxonomyVocabularies: vi.fn().mockResolvedValue([]),
      },
      progress: {
        sessionStarted: vi.fn(),
        stepStarted: vi.fn(),
        stepCompleted: vi.fn(),
        sessionCompleted: vi.fn(),
        sessionFailed: vi.fn(),
      },
      batchCallback: {
        _checkSessionCompletion: vi.fn().mockResolvedValue(),
      },
    };

    generator = new BaseGenerator(mockCtx);
  });

  afterEach(async () => {
    await persistence.close();
  });

  describe('runWorkflow', () => {
    it('should initialize a session and report progress', async () => {
      const config = { catalogId: 123 };
      const options = { productCount: 10 };
      const totals = { products: 5 };

      const result = await generator.runWorkflow(
        config,
        options,
        'test-flow',
        [],
        { totals }
      );

      expect(result).toBeDefined();
      expect(result.sessionId).toBeDefined();
      expect(mockCtx.progress.sessionStarted).toHaveBeenCalled();
    });

    it('should fall back to default language if none provided', async () => {
      const config = {};
      const options = {};
      const steps = [];

      await generator.runWorkflow(config, options, 'test-flow', steps, {});

      // SDK uses hyphenated locales by default
      expect(options.selectedLanguages).toEqual(['en-US']);
    });
  });

  describe('Metadata Steps', () => {
    it('_runLoadCountriesStep should fetch and persist countries', async () => {
      const sessionId = 'test-session';
      await persistence.createSession({
        sessionId,
        flowType: 'test',
        status: 'STARTED',
        currentSteps: [],
        correlationId: 'cid',
        context: { config: {} },
      });

      await generator._runLoadCountriesStep(sessionId);

      const session = await persistence.getSession(sessionId);
      expect(session.context.countries).toBeDefined();
      expect(session.context.countries).toHaveLength(1);
    });

    it('_runLoadLanguagesStep should fetch and persist languages', async () => {
      const sessionId = 'lang-session';
      await persistence.createSession({
        sessionId,
        flowType: 'test',
        status: 'STARTED',
        currentSteps: [],
        correlationId: 'cid',
        context: { config: {} },
      });

      await generator._runLoadLanguagesStep(sessionId);

      const session = await persistence.getSession(sessionId);
      expect(session.context.languages).toBeDefined();
      expect(session.context.languages[0].id).toBe('en-US');
    });
  });

  describe('Sync Delay', () => {
    it('_runInterServiceSyncDelayStep should complete after delay', async () => {
      const sessionId = 'test-session';
      await persistence.createSession({
        sessionId,
        flowType: 'test',
        status: 'STARTED',
        currentSteps: [],
        correlationId: 'cid',
        context: { config: {} },
      });

      // Spy on completeSyncStep
      const spy = vi.spyOn(generator, 'completeSyncStep').mockResolvedValue();

      await generator._runInterServiceSyncDelayStep(
        sessionId,
        WORKFLOW_STEPS.SYNC_DELAY
      );

      expect(spy).toHaveBeenCalledWith(sessionId, WORKFLOW_STEPS.SYNC_DELAY);
    });

    it('_runAdaptiveSyncDelayStep should retry with backoff and complete on success', async () => {
      const sessionId = 'adaptive-session';
      await persistence.createSession({
        sessionId,
        flowType: 'test',
        status: 'STARTED',
        currentSteps: [],
        correlationId: 'cid',
        context: { config: {} },
      });

      const spy = vi.spyOn(generator, 'completeSyncStep').mockResolvedValue();

      let attempts = 0;
      const checkFn = vi.fn().mockImplementation(() => {
        attempts++;
        return attempts === 2; // Succeed on second attempt
      });

      await generator._runAdaptiveSyncDelayStep(
        sessionId,
        'test-step',
        checkFn
      );

      expect(checkFn).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(
        sessionId,
        'test-step',
        'SYNCHRONOUS',
        1,
        1
      );
    });

    it('_runAdaptiveSyncDelayStep should proceed even if max retries reached without success', async () => {
      const sessionId = 'fail-session';
      await persistence.createSession({
        sessionId,
        flowType: 'test',
        status: 'STARTED',
        currentSteps: [],
        correlationId: 'cid',
        context: { config: {} },
      });

      const spy = vi.spyOn(generator, 'completeSyncStep').mockResolvedValue();
      const checkFn = vi.fn().mockResolvedValue(false); // Never succeeds

      await generator._runAdaptiveSyncDelayStep(
        sessionId,
        'fail-step',
        checkFn
      );

      expect(checkFn).toHaveBeenCalledTimes(3); // Based on mock resilience config
      expect(spy).toHaveBeenCalledWith(
        sessionId,
        'fail-step',
        'SYNCHRONOUS',
        0,
        1
      );
    });
  });

  describe('executeStep hardening', () => {
    const seedSession = async (sessionId, steps) => {
      await persistence.createSession({
        sessionId,
        flowType: 'test-flow',
        status: 'RUNNING',
        context: { steps, config: {} },
        currentSteps: [],
        correlationId: 'cid-1',
        sessionName: sessionId,
      });
    };

    it('does nothing when the session no longer exists', async () => {
      await expect(
        generator.executeStep('missing-session', 'anything')
      ).resolves.toBeUndefined();
      expect(mockCtx.progress.stepStarted).not.toHaveBeenCalled();
    });

    it('refuses to bypass a step with no registered handler', async () => {
      // A "ghost step" that silently does nothing corrupts everything
      // downstream, which is why this is fatal rather than a warning.
      await seedSession('sid-ghost', ['unregistered-step']);

      await expect(
        generator.executeStep('sid-ghost', 'unregistered-step')
      ).rejects.toThrow(/No handler found for workflow step/);
    });

    it('passes over structural steps, which are orchestrated elsewhere', async () => {
      // parallel/sequence steps legitimately have no handler.
      await seedSession('sid-structural', [
        { name: 'fan-out', type: 'parallel' },
      ]);

      await expect(
        generator.executeStep('sid-structural', 'fan-out')
      ).resolves.toBeUndefined();
      expect(mockCtx.progress.stepStarted).not.toHaveBeenCalled();
    });

    it('runs a registered handler and reports the step as started', async () => {
      const handler = vi.fn().mockResolvedValue('handler-result');
      generator.steps = { 'do-work': handler };
      await seedSession('sid-ok', ['do-work']);

      await expect(generator.executeStep('sid-ok', 'do-work')).resolves.toBe(
        'handler-result'
      );
      expect(handler).toHaveBeenCalledWith('sid-ok', expect.any(Object));
      expect(mockCtx.progress.stepStarted).toHaveBeenCalledWith(
        expect.objectContaining({ sessionId: 'sid-ok', step: 'do-work' })
      );
    });

    it('fails a step whose handler returned while leaving a FAILED batch', async () => {
      // The handler swallowed the error; the batch record is the evidence.
      generator.steps = { 'do-work': vi.fn().mockResolvedValue('ignored') };
      await seedSession('sid-swallowed', ['do-work']);
      await persistence.createBatch({
        erc: 'BATCH-1',
        sessionId: 'sid-swallowed',
        stepKey: 'do-work',
        status: 'FAILED',
        totalCount: 1,
      });

      await expect(
        generator.executeStep('sid-swallowed', 'do-work')
      ).rejects.toThrow(/produced a FAILED batch/);
    });

    it('propagates a handler failure after logging it', async () => {
      const boom = new Error('handler exploded');
      generator.steps = { 'do-work': vi.fn().mockRejectedValue(boom) };
      await seedSession('sid-throw', ['do-work']);

      await expect(generator.executeStep('sid-throw', 'do-work')).rejects.toBe(
        boom
      );
      expect(mockCtx.logger.error).toHaveBeenCalledWith(
        expect.stringContaining('handler exploded'),
        expect.objectContaining({ sessionId: 'sid-throw' })
      );
    });

    it('holds a step back until its dependencies are satisfied', async () => {
      const handler = vi.fn();
      generator.steps = { 'do-work': handler };
      await seedSession('sid-blocked', ['do-work']);
      vi.spyOn(generator, 'verifyStepDependencies').mockResolvedValue(false);

      await expect(
        generator.executeStep('sid-blocked', 'do-work')
      ).resolves.toBeUndefined();
      expect(handler).not.toHaveBeenCalled();
      expect(mockCtx.progress.stepStarted).not.toHaveBeenCalled();
    });
  });

  describe('deepClean', () => {
    it('strips server-assigned identifiers so payloads can be re-sent', () => {
      const cleaned = generator.deepClean({
        id: 1,
        productId: 2,
        accountId: 3,
        skuId: 4,
        externalReferenceCode: 'KEEP-ME',
        name: { en_US: 'Keep' },
      });

      expect(cleaned).toEqual({
        externalReferenceCode: 'KEEP-ME',
        name: { en_US: 'Keep' },
      });
    });

    it('strips them at every depth, including inside arrays', () => {
      const cleaned = generator.deepClean({
        skus: [
          { id: 9, sku: 'A' },
          { id: 10, sku: 'B', options: [{ productId: 11, key: 'colour' }] },
        ],
      });

      expect(cleaned).toEqual({
        skus: [{ sku: 'A' }, { sku: 'B', options: [{ key: 'colour' }] }],
      });
    });

    it("leaves the caller's object untouched", () => {
      const original = { id: 1, nested: { productId: 2 } };
      generator.deepClean(original);

      expect(original).toEqual({ id: 1, nested: { productId: 2 } });
    });

    it('passes non-objects straight through', () => {
      expect(generator.deepClean(null)).toBeNull();
      expect(generator.deepClean('text')).toBe('text');
      expect(generator.deepClean(42)).toBe(42);
    });
  });

  describe('executeNextStep advancement', () => {
    const seed = async (sessionId, steps, flowType = 'test-flow') => {
      await persistence.createSession({
        sessionId,
        flowType,
        status: 'RUNNING',
        context: { steps, config: {} },
        currentSteps: [],
        correlationId: 'cid-adv',
        sessionName: sessionId,
      });
    };

    const batch = (sessionId, stepKey, status, erc = `${stepKey}-b1`) =>
      persistence.createBatch({
        erc,
        sessionId,
        stepKey,
        status,
        totalCount: 1,
      });

    /**
     * Stands in for a step handler that completes synchronously: it records a
     * terminal batch, which is what stops the advancement loop re-running the
     * same step forever.
     */
    const completingStep = (sessionId) =>
      vi
        .spyOn(generator, 'executeStep')
        .mockImplementation(async (_sid, step) =>
          batch(sessionId, step, 'SYNCHRONOUS', `${step}-sync`)
        );

    it('does not advance a session that is already finished', async () => {
      await seed('sid-done', ['do-work']);
      await persistence.tryFinalizeSession('sid-done');
      const spy = vi.spyOn(generator, 'executeStep');

      await generator.executeNextStep('sid-done');

      expect(spy).not.toHaveBeenCalled();
      expect(mockCtx.progress.sessionCompleted).not.toHaveBeenCalled();
    });

    it('does not advance a session that does not exist', async () => {
      const spy = vi.spyOn(generator, 'executeStep');
      await generator.executeNextStep('sid-nonexistent');
      expect(spy).not.toHaveBeenCalled();
    });

    it('runs a pending synchronous step, then finalizes once everything is complete', async () => {
      await seed('sid-run', ['step-one']);
      const spy = completingStep('sid-run');

      await generator.executeNextStep('sid-run');

      expect(spy).toHaveBeenCalledWith('sid-run', 'step-one');
      expect(mockCtx.progress.sessionCompleted).toHaveBeenCalledWith(
        expect.objectContaining({ sessionId: 'sid-run' })
      );
      const session = await persistence.getSession('sid-run');
      expect(session.status).toBe('COMPLETED');
    });

    it('walks consecutive synchronous steps in one pass rather than stalling', async () => {
      // The loop exists so a chain of sync steps does not need an external
      // nudge per step.
      await seed('sid-chain', ['step-one', 'step-two', 'step-three']);
      const spy = completingStep('sid-chain');

      await generator.executeNextStep('sid-chain');

      expect(spy.mock.calls.map(([, step]) => step)).toEqual([
        'step-one',
        'step-two',
        'step-three',
      ]);
      expect((await persistence.getSession('sid-chain')).status).toBe(
        'COMPLETED'
      );
    });

    it('stops advancing and fails the session when a step has failed', async () => {
      await seed('sid-failed', ['step-one', 'step-two']);
      await batch('sid-failed', 'step-one', 'FAILED');
      const spy = vi.spyOn(generator, 'executeStep');

      await generator.executeNextStep('sid-failed');

      // The later step must not run on top of a failure.
      expect(spy).not.toHaveBeenCalled();
      expect((await persistence.getSession('sid-failed')).status).toBe(
        'FAILED'
      );
      expect(mockCtx.progress.sessionFailed).toHaveBeenCalledWith(
        expect.objectContaining({
          sessionId: 'sid-failed',
          error: expect.objectContaining({
            message: expect.stringContaining('step-one'),
          }),
        })
      );
    });

    it('keeps going after a failed step in a delete flow', async () => {
      // Deletion runs try-every-step: one entity that will not delete must not
      // strand the rest of the cleanup.
      await seed('sid-delete', ['step-one', 'step-two'], 'delete');
      await batch('sid-delete', 'step-one', 'FAILED');
      const spy = completingStep('sid-delete');

      await generator.executeNextStep('sid-delete');

      expect(spy).toHaveBeenCalledWith('sid-delete', 'step-two');
      expect(mockCtx.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('Try-Every-Step'),
        expect.objectContaining({ sessionId: 'sid-delete' })
      );
    });

    it('stops the workflow when a parallel block already contains a failure, naming the sub-step', async () => {
      // NOTE: the code carries a comment saying a parallel block finishes so
      // "the master sequence can move on" after a sub-step failure. That only
      // applies when a sub-step fails *during* this pass: getStepState reports
      // the whole block as FAILED, and the FAILED branch is checked before the
      // parallel branch. Batch failures arrive by callback between passes, so
      // this - a stop - is what actually happens in production.
      await seed('sid-parallel', [
        { name: 'fan-out', type: 'parallel', steps: ['left', 'right'] },
        'after',
      ]);
      await batch('sid-parallel', 'left', 'FAILED');
      await batch('sid-parallel', 'right', 'COMPLETED');
      const spy = completingStep('sid-parallel');

      await generator.executeNextStep('sid-parallel');

      expect(spy).not.toHaveBeenCalled();
      expect((await persistence.getSession('sid-parallel')).status).toBe(
        'FAILED'
      );
      // Observability: the log has to identify which sub-step failed, not just
      // that the block did.
      expect(mockCtx.logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed sub-steps: left'),
        expect.objectContaining({ sessionId: 'sid-parallel', type: 'parallel' })
      );
    });

    it('fails the session rather than hanging when advancement itself throws', async () => {
      // Otherwise the UI sits on "Generating..." with nothing coming.
      await seed('sid-fatal', ['step-one']);
      vi.spyOn(persistence, 'getBatchesForSession').mockRejectedValueOnce(
        new Error('database went away')
      );

      await generator.executeNextStep('sid-fatal');

      expect((await persistence.getSession('sid-fatal')).status).toBe('FAILED');
      expect(mockCtx.progress.sessionFailed).toHaveBeenCalledWith(
        expect.objectContaining({ sessionId: 'sid-fatal' })
      );
      expect(mockCtx.logger.error).toHaveBeenCalledWith(
        expect.stringContaining('database went away'),
        expect.objectContaining({ sessionId: 'sid-fatal' })
      );
    });
  });

  describe('_finalizeSession', () => {
    it('names the failing step and its error in the session failure', async () => {
      await persistence.createSession({
        sessionId: 'sid-detail',
        flowType: 'test-flow',
        status: 'RUNNING',
        context: { steps: ['step-one'], config: {} },
        currentSteps: [],
        correlationId: 'cid-detail',
        sessionName: 'sid-detail',
      });
      await persistence.createBatch({
        erc: 'B-1',
        sessionId: 'sid-detail',
        stepKey: 'step-one',
        status: 'FAILED',
        totalCount: 5,
      });
      await persistence.updateBatch('B-1', {
        status: 'FAILED',
        errorMessage: 'Liferay rejected the payload',
      });

      await generator._finalizeSession('sid-detail', 'cid-detail');

      expect(mockCtx.progress.sessionFailed).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            message: expect.stringMatching(
              /step-one.*Liferay rejected the payload/
            ),
          }),
        })
      );
    });
  });

  describe('Verification', () => {
    it('verifySteps should throw if a handler is missing', () => {
      generator.steps = {
        'invalid-step': null,
      };

      expect(() => generator.verifySteps()).toThrow(
        "FATAL: Workflow Step 'invalid-step' in BaseGenerator has no valid method handler."
      );
    });

    it('verifySteps should pass if all handlers exist', () => {
      generator.steps = {
        'valid-step': () => {},
      };

      expect(() => generator.verifySteps()).not.toThrow();
    });
  });
});
