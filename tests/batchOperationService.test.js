const BatchOperationService = require('../src/liferay/rest/BatchOperationService.cjs');
const { ENV } = require('../src/utils/constants.cjs');

function mockLogger() {
  return {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
  };
}

describe('liferay/rest/BatchOperationService', () => {
  let http;
  let ctx;
  let service;

  beforeEach(() => {
    http = {
      _request: vi.fn(),
      _get: vi.fn(),
    };
    ctx = { logger: mockLogger(), cache: undefined, config: undefined };
    service = new BatchOperationService(ctx, http);
  });

  describe('_chunkArray', () => {
    it('splits an array into chunks of the given size', () => {
      expect(service._chunkArray([1, 2, 3, 4, 5], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5],
      ]);
    });

    it('returns an empty array for an empty input', () => {
      expect(service._chunkArray([], 5)).toEqual([]);
    });
  });

  describe('_getBaseCallbackUrl', () => {
    const originalEnvUrl = process.env.LIFERAY_BATCH_CALLBACK_URL;

    afterEach(() => {
      if (originalEnvUrl === undefined) {
        delete process.env.LIFERAY_BATCH_CALLBACK_URL;
      } else {
        process.env.LIFERAY_BATCH_CALLBACK_URL = originalEnvUrl;
      }
    });

    it('prefers the LIFERAY_BATCH_CALLBACK_URL env var when set', () => {
      process.env.LIFERAY_BATCH_CALLBACK_URL = 'http://env-override/callback';
      expect(service._getBaseCallbackUrl({ microserviceUrl: 'http://x' })).toBe(
        'http://env-override/callback'
      );
    });

    it('falls back to config.microserviceUrl and appends the callback path', () => {
      delete process.env.LIFERAY_BATCH_CALLBACK_URL;
      const result = service._getBaseCallbackUrl({
        microserviceUrl: 'http://svc:3001',
      });
      expect(result).toBe('http://svc:3001/api/v1/batch/callback');
    });

    it('warns and returns null when no url can be resolved', () => {
      delete process.env.LIFERAY_BATCH_CALLBACK_URL;
      const originalMicroserviceUrl = ENV.MICROSERVICE_URL;
      ENV.MICROSERVICE_URL = '';

      const result = service._getBaseCallbackUrl({});

      expect(result).toBeNull();
      expect(ctx.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('microserviceUrl is not configured')
      );

      ENV.MICROSERVICE_URL = originalMicroserviceUrl;
    });
  });

  describe('_buildCallbackURL', () => {
    it('returns null when no baseUrl is given', () => {
      expect(service._buildCallbackURL(null)).toBeNull();
    });

    it('appends the batchERC as a query param', () => {
      const url = service._buildCallbackURL(
        'http://svc/api/v1/batch/callback',
        {
          batchERC: 'AICA-BATCH-1',
        }
      );
      expect(url).toContain('batchERC=AICA-BATCH-1');
    });

    it('returns the raw baseUrl unchanged if it cannot be parsed as a URL', () => {
      expect(service._buildCallbackURL('not-a-valid-url', {})).toBe(
        'not-a-valid-url'
      );
    });
  });

  describe('_postBatch', () => {
    const basePath = (callbackUrl, _erc) =>
      `/o/headless-commerce-admin-catalog/v1.0/products/batch?callback=${encodeURIComponent(callbackUrl || '')}`;

    it('submits a batch and returns batchId/status on success', async () => {
      http._request.mockResolvedValue({ id: 'batch-777', status: 'submitted' });

      const result = await service._postBatch(
        { microserviceUrl: 'http://svc:3001' },
        {
          entityName: 'products',
          items: [{ name: 'Widget' }],
          op: 'products:create',
          friendly: 'Failed to create products',
          path: basePath,
        }
      );

      expect(result.batchId).toBe('batch-777');
      expect(result.status).toBe('submitted');
      expect(result.count).toBe(1);
      expect(result.batchExternalReferenceCode).toEqual(
        expect.stringMatching(/^AICA-BATCH-/)
      );

      const [, opts] = http._request.mock.calls[0];
      expect(opts.method).toBe('POST');
      expect(opts.data.items[0]).toHaveProperty('externalReferenceCode');
      expect(opts.data.items[0].name).toBe('Widget');
      expect(opts.data.createStrategy).toBe('UPSERT');
    });

    it('preserves an item-supplied externalReferenceCode instead of generating one', async () => {
      http._request.mockResolvedValue({ id: 'batch-1', status: 'submitted' });

      await service._postBatch(
        {},
        {
          entityName: 'accounts',
          items: [{ name: 'Acme', externalReferenceCode: 'ACC-CUSTOM-1' }],
          op: 'accounts:create',
          friendly: 'friendly',
          path: basePath,
        }
      );

      const [, opts] = http._request.mock.calls[0];
      expect(opts.data.items[0].externalReferenceCode).toBe('ACC-CUSTOM-1');
    });

    it('recovers by resuming tracking when Liferay reports the batch ERC already in use', async () => {
      const duplicateError = Object.assign(new Error('Batch ERC in use'), {
        status: 400,
        problem: { title: 'externalReferenceCode already in use' },
      });
      http._request.mockRejectedValue(duplicateError);
      http._get.mockResolvedValue({
        id: 'existing-task-1',
        status: 'submitted',
      });

      const result = await service._postBatch(
        {},
        {
          entityName: 'products',
          items: [{ name: 'Widget' }],
          op: 'products:create',
          friendly: 'friendly',
          path: basePath,
        }
      );

      expect(result.batchId).toBe('existing-task-1');
      expect(http._get).toHaveBeenCalledTimes(1);
    });

    it('propagates non-retryable, non-duplicate errors', async () => {
      const fatalError = Object.assign(new Error('validation failed'), {
        status: 422,
        response: { status: 422, data: {} },
      });
      http._request.mockRejectedValue(fatalError);

      await expect(
        service._postBatch(
          {},
          {
            entityName: 'products',
            items: [{ name: 'Widget' }],
            op: 'products:create',
            friendly: 'friendly',
            path: basePath,
          }
        )
      ).rejects.toThrow('validation failed');
    });
  });

  describe('_collectPagedItems', () => {
    it('accumulates items across pages until totalCount is reached', async () => {
      http._get
        .mockResolvedValueOnce({ items: [{ id: 1 }, { id: 2 }], totalCount: 3 })
        .mockResolvedValueOnce({ items: [{ id: 3 }], totalCount: 3 });

      const items = await service._collectPagedItems(
        {},
        {
          listUrl: '/o/products',
          pageSize: 2,
          op: 'products:list',
          friendly: 'x',
        }
      );

      expect(items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
      expect(http._get).toHaveBeenCalledTimes(2);
    });

    it('stops after a single empty page', async () => {
      http._get.mockResolvedValueOnce({ items: [], totalCount: 0 });

      const items = await service._collectPagedItems(
        {},
        {
          listUrl: '/o/products',
          pageSize: 10,
          op: 'products:list',
          friendly: 'x',
        }
      );

      expect(items).toEqual([]);
      expect(http._get).toHaveBeenCalledTimes(1);
    });
  });

  describe('_collectPagedIds', () => {
    it('extracts and accumulates the id field across pages', async () => {
      http._get
        .mockResolvedValueOnce({
          items: [{ id: 10 }, { id: 20 }],
          totalCount: 3,
        })
        .mockResolvedValueOnce({ items: [{ id: 30 }], totalCount: 3 });

      const ids = await service._collectPagedIds(
        {},
        {
          listUrl: '/o/products',
          pageSize: 2,
          op: 'products:list',
          friendly: 'x',
        }
      );

      expect(ids).toEqual([10, 20, 30]);
    });

    it('filters out items missing the id field', async () => {
      http._get.mockResolvedValueOnce({
        items: [{ id: 1 }, {}, { id: null }],
        totalCount: 1,
      });

      const ids = await service._collectPagedIds(
        {},
        {
          listUrl: '/o/products',
          pageSize: 10,
          op: 'products:list',
          friendly: 'x',
        }
      );

      expect(ids).toEqual([1]);
    });
  });
});
