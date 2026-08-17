import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');

const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');
const { ENV } = require('../src/utils/constants.cjs');
const { logger } = require('../src/utils/logger.cjs');

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

describe('HttpCoreService - Contract Validation Error Handling', () => {
  let httpCore;
  let mockCtx;
  let mockContractValidator;

  const config = {
    liferayUrl: 'http://localhost:8080',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  beforeEach(() => {
    mockContractValidator = {
      validate: vi.fn(),
      validateArray: vi.fn(),
    };

    mockCtx = {
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        trace: vi.fn(),
      },
      oauth: {
        getAccessToken: vi.fn().mockResolvedValue('mock-oauth-token'),
      },
      contractValidator: mockContractValidator,
    };

    httpCore = new HttpCoreService(mockCtx);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('validation policy gating', () => {
    let originalEnv;

    beforeEach(() => {
      originalEnv = {
        nodeEnv: ENV.NODE_ENV,
        validation: ENV.LIFERAY_CONTRACT_VALIDATION,
      };
    });

    afterEach(() => {
      ENV.NODE_ENV = originalEnv.nodeEnv;
      ENV.LIFERAY_CONTRACT_VALIDATION = originalEnv.validation;
    });

    const priceList = {
      externalReferenceCode: 'PL-1',
      name: 'PL 1',
      currencyCode: 'USD',
      type: 'price-list',
      catalogId: 10,
    };

    const post = () =>
      httpCore._request(config, {
        method: 'POST',
        url: '/o/headless-commerce-admin-pricing/v2.0/price-lists',
        data: priceList,
        op: 'create-price-list',
      });

    beforeEach(() => {
      server.use(
        http.post('*/o/headless-commerce-admin-pricing/v2.0/price-lists', () =>
          HttpResponse.json({ id: 1 })
        )
      );
    });

    it('validates outbound payloads in production when validation is switched on', async () => {
      // The point of #132: the safety net was unavailable in production, which
      // is where a malformed payload actually costs a failed batch.
      ENV.NODE_ENV = 'production';
      ENV.LIFERAY_CONTRACT_VALIDATION = 'on';

      await post();

      expect(mockContractValidator.validate).toHaveBeenCalledWith(
        'headless-commerce-admin-pricing-v2.0-openapi.json',
        'PriceList',
        priceList
      );
    });

    it('skips validation in development when switched off', async () => {
      ENV.NODE_ENV = 'development';
      ENV.LIFERAY_CONTRACT_VALIDATION = 'off';

      await post();

      expect(mockContractValidator.validate).not.toHaveBeenCalled();
    });

    it('leaves the historical development behaviour intact by default', async () => {
      ENV.NODE_ENV = 'development';
      ENV.LIFERAY_CONTRACT_VALIDATION = 'auto';

      await post();

      expect(mockContractValidator.validate).toHaveBeenCalled();
    });
  });

  it('rethrows and logs when outbound validation throws a non-ContractViolationError', async () => {
    // A bug in the validator itself (e.g. a TypeError) is a different failure
    // mode than a real ContractViolationError. Previously the catch block
    // only handled ContractViolationError and silently did nothing otherwise,
    // letting the request proceed as if validation had passed.
    const validatorBug = new TypeError('validator exploded unexpectedly');
    mockContractValidator.validate.mockImplementation(() => {
      throw validatorBug;
    });

    server.use(
      http.post('*/o/headless-commerce-admin-pricing/v2.0/price-lists', () => {
        // Should never be reached - validation must fail fast before the
        // real request is attempted.
        return HttpResponse.json({ id: 1 });
      })
    );

    await expect(
      httpCore._request(config, {
        method: 'POST',
        url: '/o/headless-commerce-admin-pricing/v2.0/price-lists',
        data: { name: 'Test Price List' },
        op: 'create-price-list',
      })
    ).rejects.toThrow('validator exploded unexpectedly');

    expect(mockCtx.logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Unexpected error during outbound contract validation'
      ),
      expect.objectContaining({ error: validatorBug.message })
    );
  });

  it('rethrows and logs when inbound validation throws a non-ContractViolationError', async () => {
    const validatorBug = new Error('inbound validator exploded unexpectedly');
    mockContractValidator.validate.mockImplementation(() => {
      throw validatorBug;
    });

    server.use(
      http.get(
        '*/o/headless-commerce-admin-pricing/v2.0/price-lists/PL-123',
        () => {
          return HttpResponse.json({
            id: 1,
            externalReferenceCode: 'PL-123',
            name: 'Test Price List',
            catalogId: 1,
            currencyCode: 'USD',
            type: 'price-list',
          });
        }
      )
    );

    const loggerErrorSpy = vi.spyOn(logger, 'error');

    await expect(
      httpCore._request(
        { ...config, validateInboundResponse: true },
        {
          method: 'GET',
          url: '/o/headless-commerce-admin-pricing/v2.0/price-lists/PL-123',
          op: 'get-price-list',
          // Force a single attempt so we don't wait through retry backoff.
          maxRetries: 1,
        }
      )
    ).rejects.toThrow();

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Unexpected error during inbound contract validation'
      ),
      expect.objectContaining({ error: validatorBug.message })
    );
  });

  it('still rethrows ContractViolationError as before (no regression)', async () => {
    const contractError = new Error('Data does not match contract');
    contractError.name = 'ContractViolationError';
    contractError.errors = [{ message: 'missing field' }];
    mockContractValidator.validate.mockImplementation(() => {
      throw contractError;
    });

    await expect(
      httpCore._request(config, {
        method: 'POST',
        url: '/o/headless-commerce-admin-pricing/v2.0/price-lists',
        data: { name: 'Test Price List' },
        op: 'create-price-list',
      })
    ).rejects.toThrow('Data does not match contract');

    expect(mockCtx.logger.error).toHaveBeenCalledWith(
      expect.stringContaining('violates Liferay OpenAPI contract'),
      expect.any(Object)
    );
  });
});

describe('HttpCoreService._downloadFile', () => {
  let httpCore;
  let destination;

  beforeEach(() => {
    const mockCtx = {
      logger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        trace: vi.fn(),
      },
    };
    httpCore = new HttpCoreService(mockCtx);
    destination = path.join(
      os.tmpdir(),
      `http-core-service-download-test-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.tmp`
    );
  });

  afterEach(() => {
    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
  });

  it('does not create a partial file or leak a write stream when the GET fails', async () => {
    const getError = new Error('Request failed');
    httpCore._get = vi.fn().mockRejectedValue(getError);

    await expect(
      httpCore._downloadFile({}, '/some/url', destination)
    ).rejects.toThrow('Request failed');

    // Because the write stream is only opened once the GET succeeds, a
    // failed GET must never create (or leave behind) a destination file,
    // and therefore never leaks an open file descriptor for it.
    expect(fs.existsSync(destination)).toBe(false);
  });

  it('writes the downloaded content to disk when the GET succeeds', async () => {
    const fakeStream = Readable.from(['hello ', 'world']);
    httpCore._get = vi.fn().mockResolvedValue({ data: fakeStream });

    await httpCore._downloadFile({}, '/some/url', destination);

    expect(fs.existsSync(destination)).toBe(true);
    expect(fs.readFileSync(destination, 'utf8')).toBe('hello world');
  });

  it('closes the write stream and removes the partial file if the response stream errors mid-download', async () => {
    const fakeStream = new Readable({
      read() {
        this.push('partial-data');
        process.nextTick(() => this.emit('error', new Error('stream boom')));
      },
    });
    httpCore._get = vi.fn().mockResolvedValue({ data: fakeStream });

    await expect(
      httpCore._downloadFile({}, '/some/url', destination)
    ).rejects.toThrow('stream boom');

    expect(fs.existsSync(destination)).toBe(false);
  });
});
