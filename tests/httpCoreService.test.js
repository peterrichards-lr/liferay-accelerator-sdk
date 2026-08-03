import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');

const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');
const { logger } = require('../src/utils/logger.cjs');

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
