const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');

function makeCtx(overrides = {}) {
  return {
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      trace: vi.fn(),
    },
    oauth: {
      getAccessToken: vi.fn().mockResolvedValue('test-access-token'),
    },
    persistence: {},
    ...overrides,
  };
}

describe('liferay/rest/HttpCoreService', () => {
  let ctx;
  let service;

  beforeEach(() => {
    ctx = makeCtx();
    service = new HttpCoreService(ctx);
  });

  describe('_stringifySafe', () => {
    it('serializes plain objects', () => {
      expect(service._stringifySafe({ a: 1 })).toBe(
        JSON.stringify({ a: 1 }, null, 2)
      );
    });

    it('falls back to a placeholder for circular structures', () => {
      const circular = {};
      circular.self = circular;
      expect(service._stringifySafe(circular)).toBe('[Unserializable object]');
    });
  });

  describe('_buildSoftFallback', () => {
    it('builds an empty paged result marked as soft-empty', () => {
      const fallback = service._buildSoftFallback('products:list', 404);
      expect(fallback).toEqual({
        items: [],
        page: 1,
        pageSize: 0,
        lastPage: 1,
        totalCount: 0,
        status: 404,
        softEmpty: true,
        op: 'products:list',
      });
    });
  });

  describe('_request success path', () => {
    it('returns res.data on success and logs request/response', async () => {
      const client = {
        request: vi.fn().mockResolvedValue({
          status: 200,
          statusText: 'OK',
          data: { items: [{ id: 1 }], totalCount: 1 },
          headers: {},
        }),
      };
      service._client = vi.fn().mockResolvedValue(client);

      const result = await service._get({}, '/o/foo', 'foo:list', 'friendly');

      expect(result).toEqual({ items: [{ id: 1 }], totalCount: 1 });
      expect(client.request).toHaveBeenCalledTimes(1);
      expect(client.request.mock.calls[0][0]).toMatchObject({
        method: 'GET',
        url: '/o/foo',
      });
    });

    it('returns the full response envelope when fullResponse is requested', async () => {
      const client = {
        request: vi.fn().mockResolvedValue({
          status: 201,
          statusText: 'Created',
          data: { id: 5 },
          headers: { 'x-test': '1' },
        }),
      };
      service._client = vi.fn().mockResolvedValue(client);

      const result = await service._post(
        {},
        '/o/foo',
        { name: 'x' },
        'foo:create',
        'friendly',
        'throw',
        true
      );

      expect(result).toEqual({
        data: { id: 5 },
        headers: { 'x-test': '1' },
        status: 201,
        statusText: 'Created',
      });
    });

    it('serializes query params, skipping empty/undefined values', async () => {
      const client = {
        request: vi.fn().mockResolvedValue({ status: 200, data: {} }),
      };
      service._client = vi.fn().mockResolvedValue(client);

      await service._get({}, '/o/foo', 'op', 'friendly', {
        params: { a: '1', b: undefined, c: '', d: null },
      });

      expect(client.request.mock.calls[0][0].url).toBe('/o/foo?a=1');
    });
  });

  describe('_request retry behavior', () => {
    const originalRetryDelay = process.env.LIFERAY_RETRY_DELAY_MS;

    beforeEach(() => {
      process.env.LIFERAY_RETRY_DELAY_MS = '5';
    });

    afterEach(() => {
      if (originalRetryDelay === undefined) {
        delete process.env.LIFERAY_RETRY_DELAY_MS;
      } else {
        process.env.LIFERAY_RETRY_DELAY_MS = originalRetryDelay;
      }
    });

    it('retries on a 5xx error and succeeds on the next attempt', async () => {
      const serverError = Object.assign(new Error('server exploded'), {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: {},
        },
      });

      const client = {
        request: vi
          .fn()
          .mockRejectedValueOnce(serverError)
          .mockResolvedValueOnce({ status: 200, data: { ok: true } }),
      };
      service._client = vi.fn().mockResolvedValue(client);

      const result = await service._get({}, '/o/flaky', 'flaky:op', 'friendly');

      expect(result).toEqual({ ok: true });
      expect(client.request).toHaveBeenCalledTimes(2);
    });

    it('does not retry non-retryable 4xx errors', async () => {
      const badRequest = Object.assign(new Error('bad request'), {
        response: {
          status: 400,
          statusText: 'Bad Request',
          data: { title: 'Invalid' },
        },
      });

      const client = { request: vi.fn().mockRejectedValue(badRequest) };
      service._client = vi.fn().mockResolvedValue(client);

      await expect(
        service._get({}, '/o/bad', 'bad:op', 'friendly')
      ).rejects.toThrow();

      expect(client.request).toHaveBeenCalledTimes(1);
    });
  });

  describe('_request error mapping', () => {
    it('maps HTTP errors into a LiferayRequestError with status/userMessage', async () => {
      const httpError = Object.assign(new Error('nope'), {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { title: 'Product not found' },
          headers: {},
        },
      });
      const client = { request: vi.fn().mockRejectedValue(httpError) };
      service._client = vi.fn().mockResolvedValue(client);

      try {
        await service._get({}, '/o/missing', 'missing:op', 'Failed to fetch');
        throw new Error('expected _get to throw');
      } catch (err) {
        expect(err.name).toBe('LiferayRequestError');
        expect(err.status).toBe(404);
        expect(err.userMessage).toBe('Product not found');
        expect(err.errorReference).toBeDefined();
      }
    });

    it('applies the soft-status fallback for configured ops (e.g. products:list -> 404)', async () => {
      const notFound = Object.assign(new Error('missing'), {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: {},
          headers: {},
        },
      });
      const client = { request: vi.fn().mockRejectedValue(notFound) };
      service._client = vi.fn().mockResolvedValue(client);

      const result = await service._get(
        {},
        '/o/products',
        'products:list',
        'friendly'
      );

      expect(result.softEmpty).toBe(true);
      expect(result.items).toEqual([]);
      expect(result.status).toBe(404);
    });

    it('surfaces network errors (no HTTP response) with a networkCode', async () => {
      const networkError = Object.assign(new Error('connect ECONNREFUSED'), {
        code: 'ECONNREFUSED',
      });
      const client = { request: vi.fn().mockRejectedValue(networkError) };
      service._client = vi.fn().mockResolvedValue(client);

      try {
        await service._get({}, '/o/x', 'x:op', 'friendly', { maxRetries: 1 });
        throw new Error('expected to throw');
      } catch (err) {
        expect(err.name).toBe('LiferayRequestError');
        expect(err.networkCode).toBe('ECONNREFUSED');
        expect(err.response).toBeNull();
      }
    });
  });

  describe('createAxiosInstance', () => {
    it('uses Basic Auth when authMethod is basic', async () => {
      const instance = await service.createAxiosInstance({
        authMethod: 'basic',
        username: 'admin',
        password: 'secret',
        liferayUrl: 'http://liferay:8080',
      });

      expect(instance.defaults.baseURL).toBe('http://liferay:8080');
      const expectedToken = Buffer.from('admin:secret').toString('base64');
      expect(instance.defaults.headers.Authorization).toBe(
        `Basic ${expectedToken}`
      );
    });

    it('uses OAuth bearer tokens when not using basic auth', async () => {
      const instance = await service.createAxiosInstance({
        clientId: 'client-1',
        clientSecret: 'secret-1',
        liferayUrl: 'http://liferay:8080',
      });

      expect(ctx.oauth.getAccessToken).toHaveBeenCalledWith(
        'http://liferay:8080',
        'client-1',
        'secret-1'
      );
      expect(instance.defaults.headers.Authorization).toBe(
        'Bearer test-access-token'
      );
    });
  });

  describe('getConfig', () => {
    it('returns the direct-match result when found by configKey', async () => {
      const directMatch = { items: [{ configKey: 'FOO' }] };
      service._get = vi.fn().mockResolvedValueOnce(directMatch);

      const result = await service.getConfig({}, 'FOO');

      expect(result).toBe(directMatch);
      expect(service._get).toHaveBeenCalledTimes(1);
    });

    it('falls back to querying by ERC when no direct match is found', async () => {
      const ercMatch = { items: [{ externalReferenceCode: 'FOO' }] };
      service._get = vi
        .fn()
        .mockResolvedValueOnce({ items: [] })
        .mockResolvedValueOnce(ercMatch);

      const result = await service.getConfig({}, 'foo');

      expect(result).toBe(ercMatch);
      expect(service._get).toHaveBeenCalledTimes(2);
    });

    it('returns an empty items array when the object definition is missing (404)', async () => {
      const notFoundErr = Object.assign(new Error('not found'), {
        response: { status: 404 },
      });
      service._get = vi.fn().mockRejectedValue(notFoundErr);

      const result = await service.getConfig({}, 'FOO');

      expect(result).toEqual({ items: [] });
    });

    it('rethrows unrelated errors', async () => {
      const otherErr = new Error('boom');
      service._get = vi.fn().mockRejectedValue(otherErr);

      await expect(service.getConfig({}, 'FOO')).rejects.toThrow('boom');
    });
  });
});
