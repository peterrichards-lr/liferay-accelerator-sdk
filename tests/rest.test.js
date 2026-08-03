import { vi, describe, it, expect, beforeEach } from 'vitest';

const LiferayRestService = require('../src/liferay/rest.cjs');

describe('LiferayRestService', () => {
  let restService;
  let mockCtx;

  const config = {
    liferayUrl: 'http://localhost:8080',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  beforeEach(() => {
    mockCtx = {
      logger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
      },
    };

    restService = new LiferayRestService(mockCtx);
  });

  describe('_escapeODataString', () => {
    it('doubles embedded single quotes per the OData escaping convention', () => {
      expect(restService._escapeODataString("O'Brien")).toBe("O''Brien");
      expect(restService._escapeODataString("a'b'c")).toBe("a''b''c");
      expect(restService._escapeODataString('plain')).toBe('plain');
      expect(restService._escapeODataString(null)).toBe('');
      expect(restService._escapeODataString(undefined)).toBe('');
    });
  });

  describe('getOptionCategoryByKey', () => {
    it('escapes single quotes in the key so the OData filter structure cannot be altered', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValue({ items: [] });

      const maliciousKey = "size' or key ne '";

      await restService.getOptionCategoryByKey(config, maliciousKey);

      expect(getSpy).toHaveBeenCalledTimes(1);
      const opts = getSpy.mock.calls[0][4];
      expect(opts.params.filter).toBe("key eq 'size'' or key ne '''");
      // Sanity check: the escaped filter has balanced quotes, unlike the raw
      // interpolation which would have produced `key eq 'size' or key ne ''`
      // (a syntactically different, attacker-controlled filter expression).
      const quoteCount = (opts.params.filter.match(/'/g) || []).length;
      expect(quoteCount % 2).toBe(0);
    });

    it('still builds the expected filter for a normal key', async () => {
      const getSpy = vi
        .spyOn(restService.httpCore, '_get')
        .mockResolvedValue({ items: [{ id: 1, key: 'size' }] });

      const result = await restService.getOptionCategoryByKey(config, 'size');

      const opts = getSpy.mock.calls[0][4];
      expect(opts.params.filter).toBe("key eq 'size'");
      expect(result).toEqual({ id: 1, key: 'size' });
    });

    it('propagates a wrapped error when the underlying request fails', async () => {
      vi.spyOn(restService.httpCore, '_get').mockRejectedValue(
        new Error('boom')
      );

      await expect(
        restService.getOptionCategoryByKey(config, 'size')
      ).rejects.toThrow('Failed to get option category by key: boom');
    });
  });
});
