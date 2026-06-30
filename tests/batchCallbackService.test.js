import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const BatchCallbackService = require('../src/services/batchCallbackService.cjs');

describe('BatchCallbackService', () => {
  let service;
  let mockCtx;
  let mockGenerator;
  let mockPersistence;
  let mockLiferay;
  let mockProgress;
  let mockQueue;

  beforeEach(() => {
    mockGenerator = {
      constructor: { name: 'MockProductGenerator' },
      executeNextStep: vi.fn().mockResolvedValue(true),
      _normalizeEntityType: vi.fn().mockReturnValue('product'),
    };

    mockPersistence = {
      getBatchByDownstreamId: vi.fn(),
      getIncompleteSessions: vi.fn().mockResolvedValue([]),
      getBatchesForSession: vi.fn().mockResolvedValue([]),
      getSession: vi.fn(),
      updateSession: vi.fn().mockResolvedValue(true),
      tryFailSession: vi.fn().mockResolvedValue(true),
      getBatch: vi.fn(),
      updateBatch: vi.fn().mockResolvedValue(true),
      updateBatchByERC: vi.fn().mockResolvedValue(true),
      logWorkflowEvent: vi.fn().mockResolvedValue(true),
    };

    mockLiferay = {
      getImportTask: vi.fn(),
      getImportTaskFailedItemReport: vi.fn().mockResolvedValue([]),
    };

    mockProgress = {
      sessionFailed: vi.fn().mockResolvedValue(true),
      batchCompleted: vi.fn().mockResolvedValue(true),
      batchFailed: vi.fn().mockResolvedValue(true),
      emitBatchItemsFailed: vi.fn().mockResolvedValue(true),
    };

    mockQueue = {
      add: vi.fn().mockResolvedValue(true),
    };

    mockCtx = {
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        success: vi.fn(),
        trace: vi.fn(),
      },
      persistence: mockPersistence,
      liferay: mockLiferay,
      progress: mockProgress,
      queue: mockQueue,
    };

    service = new BatchCallbackService(mockCtx);
  });

  describe('Generator Registry & Resolution', () => {
    it('should register and resolve generators correctly', () => {
      service.registerGenerator('product', mockGenerator);

      const session = {
        flow_type: 'generate',
        context: { generator: 'product' },
      };

      const resolved = service._getOwnerGenerator(session);
      expect(resolved).toBe(mockGenerator);
    });

    it('should fall back to flow_type mapping if explicit generator key is missing', () => {
      service.registerGenerator('product', mockGenerator);

      const session = {
        flow_type: 'generate',
        context: {},
      };

      const resolved = service._getOwnerGenerator(session);
      expect(resolved).toBe(mockGenerator);
    });

    it('should support other flow mappings like accounts and warehouses', () => {
      const mockAccountGen = { name: 'account-gen' };
      const mockWarehouseGen = { name: 'warehouse-gen' };

      service.registerGenerator('account', mockAccountGen);
      service.registerGenerator('warehouse', mockWarehouseGen);

      expect(service._getOwnerGenerator({ flow_type: 'accounts' })).toBe(
        mockAccountGen
      );
      expect(service._getOwnerGenerator({ flow_type: 'warehouses' })).toBe(
        mockWarehouseGen
      );
    });
  });

  describe('Status Querying', () => {
    it('should return UNKNOWN status if batch record is not found', async () => {
      mockPersistence.getBatchByDownstreamId.mockResolvedValue(null);
      const status = await service.getBatchStatus(12345);
      expect(status).toEqual({ status: 'UNKNOWN' });
    });

    it('should return batch status details if found in database', async () => {
      const mockBatch = {
        status: 'COMPLETED',
        processed_count: 10,
        total_count: 10,
        error_count: 0,
        step_key: 'price-lists',
        session_id: 'test-session',
      };
      mockPersistence.getBatchByDownstreamId.mockResolvedValue(mockBatch);

      const status = await service.getBatchStatus(12345);
      expect(status).toEqual({
        status: 'COMPLETED',
        processedCount: 10,
        totalCount: 10,
        errorCount: 0,
        stepKey: 'price-lists',
        sessionId: 'test-session',
      });
    });
  });

  describe('Callback Enqueuing', () => {
    it('should enqueue batch callback successfully into the queue service', async () => {
      await service.processCallback(
        'BATCH-ERC',
        { 9001: 'COMPLETED' },
        'cid-123',
        'sid-123'
      );

      expect(mockQueue.add).toHaveBeenCalledWith(
        'batch-callback',
        'batch-callback-processing',
        expect.objectContaining({
          batchERC: 'BATCH-ERC',
          payload: { 9001: 'COMPLETED' },
          correlationId: 'cid-123',
          sessionId: 'sid-123',
        }),
        expect.objectContaining({
          retries: 5,
          retryDelay: 2000,
          correlationId: 'cid-123',
        })
      );
    });

    it('should fall back to immediate callback processing if queue enqueuing fails', async () => {
      mockQueue.add.mockRejectedValue(new Error('Queue failure'));

      // Mock processCallbackInternal behavior
      vi.spyOn(service, 'processCallbackInternal').mockResolvedValue(true);

      await service.processCallback(
        'BATCH-ERC',
        { 9001: 'COMPLETED' },
        'cid-123',
        'sid-123'
      );

      expect(mockCtx.logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to enqueue batch callback'),
        expect.any(Object)
      );
      expect(service.processCallbackInternal).toHaveBeenCalledWith(
        'BATCH-ERC',
        { 9001: 'COMPLETED' },
        'cid-123',
        'sid-123'
      );
    });
  });

  describe('Orphaned Sessions Recovery', () => {
    it('should complete silently if no incomplete sessions exist', async () => {
      mockPersistence.getIncompleteSessions.mockResolvedValue([]);
      await service.recoverOrphanedSessions();
      // Verify no recovery probe starts if there are no incomplete sessions
      expect(mockCtx.logger.info).not.toHaveBeenCalledWith(expect.stringContaining('Starting recovery probe'));
    });

    it('should probe active batches and reconcile them if Liferay says they completed', async () => {
      const mockSession = {
        session_id: 'sid-recover',
        correlationId: 'cid-recover',
        context: { config: {} },
      };
      const mockBatch = {
        status: 'PROCESSING',
        downstream_batch_id: 12345,
        erc: 'BATCH-REC-ERC',
      };

      mockPersistence.getIncompleteSessions.mockResolvedValue([mockSession]);
      mockPersistence.getBatchesForSession.mockResolvedValue([mockBatch]);
      mockLiferay.getImportTask.mockResolvedValue({
        status: 'COMPLETED',
        processedItemsCount: 5,
        totalItemsCount: 5,
      });

      vi.spyOn(service, 'processCallbackInternal').mockResolvedValue(true);
      vi.spyOn(service, '_checkSessionCompletion').mockResolvedValue(true);

      await service.recoverOrphanedSessions();

      expect(mockLiferay.getImportTask).toHaveBeenCalledWith(
        expect.any(Object),
        12345
      );
      expect(service.processCallbackInternal).toHaveBeenCalledWith(
        'BATCH-REC-ERC',
        expect.objectContaining({
          id: 12345,
          status: 'COMPLETED',
        }),
        'cid-recover',
        'sid-recover'
      );
    });
  });

  describe('Callback Internal Processing & Hardening', () => {
    it('should throw retryable error if batch is not yet persisted in database', async () => {
      mockPersistence.getBatch.mockResolvedValue(null);

      await expect(
        service.processCallbackInternal('BATCH-FAST', { 9001: 'COMPLETED' })
      ).rejects.toThrow(/\[RETRYABLE\]/);
    });

    it('should process successful batch callback cleanly', async () => {
      const mockBatch = {
        session_id: 'sid-1',
        step_key: 'price-lists',
      };
      const mockSession = {
        flow_type: 'generate',
        context: { config: {} },
        correlationId: 'cid-1',
      };

      mockPersistence.getBatch.mockResolvedValue(mockBatch);
      mockPersistence.getSession.mockResolvedValue(mockSession);
      service.registerGenerator('product', mockGenerator);

      mockLiferay.getImportTask.mockResolvedValue({
        executeStatus: 'COMPLETED',
        processedItemsCount: 10,
        totalItemsCount: 10,
        failedItems: [],
      });

      await service.processCallbackInternal('BATCH-OK', { 9001: 'COMPLETED' });

      expect(mockPersistence.updateBatch).toHaveBeenCalledWith(
        'BATCH-OK',
        expect.objectContaining({
          status: 'COMPLETED',
          processedCount: 10,
          totalCount: 10,
        })
      );
    });

    it('should mark batch as FAILED if Liferay says COMPLETED but processed 0 items (Global Failure)', async () => {
      const mockBatch = { session_id: 'sid-1', step_key: 'price-lists' };
      const mockSession = { flow_type: 'generate', context: { config: {} } };

      mockPersistence.getBatch.mockResolvedValue(mockBatch);
      mockPersistence.getSession.mockResolvedValue(mockSession);
      service.registerGenerator('product', mockGenerator);

      mockLiferay.getImportTask.mockResolvedValue({
        executeStatus: 'COMPLETED',
        processedItemsCount: 0,
        totalItemsCount: 5,
        failedItems: [],
      });

      await service.processCallbackInternal('BATCH-FAIL-GLOBAL', {
        9001: 'COMPLETED',
      });

      expect(mockPersistence.updateBatch).toHaveBeenCalledWith(
        'BATCH-FAIL-GLOBAL',
        expect.objectContaining({
          status: 'FAILED',
        })
      );
    });

    it('should mark batch as FAILED if Liferay says COMPLETED but has partial failures', async () => {
      const mockBatch = { session_id: 'sid-1', step_key: 'price-lists' };
      const mockSession = { flow_type: 'generate', context: { config: {} } };

      mockPersistence.getBatch.mockResolvedValue(mockBatch);
      mockPersistence.getSession.mockResolvedValue(mockSession);
      service.registerGenerator('product', mockGenerator);

      mockLiferay.getImportTask.mockResolvedValue({
        executeStatus: 'COMPLETED',
        processedItemsCount: 8,
        totalItemsCount: 10,
        failedItems: [{ error: 'Bad Price' }],
      });

      await service.processCallbackInternal('BATCH-FAIL-PARTIAL', {
        9001: 'COMPLETED',
      });

      expect(mockPersistence.updateBatch).toHaveBeenCalledWith(
        'BATCH-FAIL-PARTIAL',
        expect.objectContaining({
          status: 'FAILED',
        })
      );
    });
  });

  describe('Session advancement & Promise lock chain', () => {
    it('should advancing step advance progression on check', async () => {
      const mockSession = {
        session_id: 'sid-adv',
        status: 'PROCESSING',
        flow_type: 'generate',
        context: { config: {} },
      };

      mockPersistence.getSession.mockResolvedValue(mockSession);
      service.registerGenerator('product', mockGenerator);

      await service._checkSessionCompletion('sid-adv', 'cid-adv');

      expect(mockGenerator.executeNextStep).toHaveBeenCalledWith('sid-adv');
    });

    it('should try fail session and report if executeNextStep throws', async () => {
      const mockSession = {
        session_id: 'sid-err',
        status: 'PROCESSING',
        flow_type: 'generate',
        context: { config: {} },
      };

      mockPersistence.getSession.mockResolvedValue(mockSession);
      service.registerGenerator('product', mockGenerator);
      mockGenerator.executeNextStep.mockRejectedValue(
        new Error('Step Advancing Crash')
      );

      await service._checkSessionCompletion('sid-err', 'cid-err');

      expect(mockPersistence.tryFailSession).toHaveBeenCalledWith(
        'sid-err',
        'Step Advancing Crash',
        null,
        expect.any(String)
      );
      expect(mockProgress.sessionFailed).toHaveBeenCalled();
    });
  });
});
