const BatchDeleteService = require('../src/liferay/rest/BatchDeleteService.cjs');

function mockLogger() {
  return { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() };
}

describe('liferay/rest/BatchDeleteService', () => {
  let http;
  let ctx;
  let service;

  beforeEach(() => {
    http = {
      _delete: vi.fn(),
    };
    ctx = { logger: mockLogger() };
    service = new BatchDeleteService(ctx, http, {});
  });

  describe('_chunkArray', () => {
    it('splits ids into chunks of the requested size', () => {
      expect(service._chunkArray([1, 2, 3, 4, 5], 3)).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);
    });
  });

  describe('_getBaseCallbackUrl / _buildCallbackURL', () => {
    it('builds a tagged callback URL from a microserviceUrl', () => {
      const base = service._getBaseCallbackUrl({
        microserviceUrl: 'http://svc:3001',
      });
      const tagged = service._buildCallbackURL(base, {
        batchERC: 'AICA-DEL-BATCH-1',
      });

      expect(base).toBe('http://svc:3001/api/v1/batch/callback');
      expect(tagged).toContain('batchERC=AICA-DEL-BATCH-1');
    });
  });

  describe('_deleteByBatch', () => {
    it('returns immediately with count 0 for an empty id list', async () => {
      const result = await service._deleteByBatch(
        {},
        { batchUrl: '/x', ids: [] }
      );
      expect(result).toEqual({ success: true, count: 0 });
      expect(http._delete).not.toHaveBeenCalled();
    });

    it('chunks ids and issues one delete request per chunk', async () => {
      http._delete
        .mockResolvedValueOnce({ id: 'task-1' })
        .mockResolvedValueOnce({ id: 'task-2' });

      const result = await service._deleteByBatch(
        {},
        {
          batchUrl: '/o/products/batch',
          ids: [1, 2, 3],
          batchSize: 2,
          op: 'products:batch-delete',
          friendly: 'friendly',
        }
      );

      expect(http._delete).toHaveBeenCalledTimes(2);
      expect(http._delete.mock.calls[0][1]).toBe('/o/products/batch');
      expect(http._delete.mock.calls[0][2]).toEqual([{ id: 1 }, { id: 2 }]);
      expect(http._delete.mock.calls[1][2]).toEqual([{ id: 3 }]);

      expect(result).toEqual({
        success: true,
        count: 3,
        batchRefs: [
          { taskId: 'task-1', count: 2 },
          { taskId: 'task-2', count: 1 },
        ],
      });
    });

    it('does not call http._delete in dry-run mode', async () => {
      const result = await service._deleteByBatch(
        {},
        { batchUrl: '/o/products/batch', ids: [1, 2], dryRun: true }
      );

      expect(http._delete).not.toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.count).toBe(2);
      expect(result.batchRefs).toHaveLength(1);
    });
  });

  describe('_deleteBatchNative', () => {
    it('delegates to _deleteByBatch and tags batchRefs with the batch ERC', async () => {
      http._delete.mockResolvedValue({ id: 'task-9' });

      const result = await service._deleteBatchNative(
        { batchSize: 100 },
        {
          entityName: 'products',
          ids: [1, 2],
          path: (callbackUrl) => `/o/products/batch?cb=${callbackUrl || ''}`,
          op: 'products:batch-delete',
          friendly: 'friendly',
        }
      );

      expect(result.success).toBe(true);
      // 'products'.toUpperCase() + '_BATCH' has no dedicated ERC_PREFIX entry,
      // so it falls back to the generic ERC_PREFIX.BATCH prefix.
      expect(result.batchRefs[0].erc).toEqual(
        expect.stringMatching(/^AICA-BATCH-/)
      );
    });
  });

  describe('_deleteByIds', () => {
    it('returns immediately with count 0 for an empty id list', async () => {
      const result = await service._deleteByIds(
        {},
        { baseDeletePath: '/x', ids: [] }
      );
      expect(result).toEqual({ success: true, count: 0 });
    });

    it('deletes each id individually and reports success with no errors', async () => {
      http._delete.mockResolvedValue({});

      const result = await service._deleteByIds(
        {},
        {
          baseDeletePath: '/o/products',
          ids: [1, 2, 3],
          concurrency: 2,
          op: 'products:delete',
          friendly: 'friendly',
        }
      );

      expect(result).toEqual({ success: true, count: 3, errors: undefined });
      expect(http._delete).toHaveBeenCalledTimes(3);
    });

    it('treats ids in retryOn as already-processed instead of errors', async () => {
      const notFound = Object.assign(new Error('not found'), { status: 404 });
      http._delete.mockRejectedValue(notFound);

      const result = await service._deleteByIds(
        {},
        {
          baseDeletePath: '/o/products',
          ids: [1],
          retryOn: [404],
          op: 'products:delete',
          friendly: 'friendly',
        }
      );

      expect(result.success).toBe(true);
      expect(result.count).toBe(1);
    });

    it('collects real errors and stops once the error threshold is reached', async () => {
      const serverError = Object.assign(new Error('server error'), {
        status: 500,
      });
      http._delete.mockRejectedValue(serverError);

      await expect(
        service._deleteByIds(
          {},
          {
            baseDeletePath: '/o/products',
            ids: [1, 2, 3],
            concurrency: 3,
            op: 'products:delete',
            friendly: 'friendly',
          }
        )
      ).rejects.toThrow(/Deletion failed/);
    });

    it('does not call http._delete in dry-run mode', async () => {
      const result = await service._deleteByIds(
        {},
        { baseDeletePath: '/o/products', ids: [1, 2], dryRun: true }
      );

      expect(http._delete).not.toHaveBeenCalled();
      expect(result).toEqual({ success: true, count: 2, errors: undefined });
    });
  });

  describe('_deleteBatchSimulated', () => {
    it('delegates to _deleteByIds using the provided basePath', async () => {
      http._delete.mockResolvedValue({});

      const result = await service._deleteBatchSimulated(
        {},
        {
          entityName: 'warehouses',
          ids: [1, 2],
          basePath: '/o/warehouses',
          op: 'warehouses:delete',
          friendly: 'friendly',
          concurrency: 5,
          retryOn: [404],
        }
      );

      expect(result.success).toBe(true);
      expect(result.count).toBe(2);
      expect(http._delete).toHaveBeenCalledTimes(2);
    });
  });
});
