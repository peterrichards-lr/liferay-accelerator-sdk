import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

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

  describe('getCurrencies name resolution', () => {
    const currencies = (name) => {
      restService.httpCore._get = vi
        .fn()
        .mockResolvedValue({ items: [{ code: 'USD', name }] });
      return restService;
    };

    it('prefers the requested language', async () => {
      currencies({ en_US: 'US Dollar', hr_HR: 'Americki dolar' });

      await expect(
        restService.getCurrencies({ ...config, languageId: 'hr_HR' })
      ).resolves.toEqual([{ code: 'USD', name: 'Americki dolar' }]);
    });

    it('falls back to en_US when the requested language is missing', async () => {
      currencies({ en_US: 'US Dollar' });

      await expect(
        restService.getCurrencies({ ...config, languageId: 'fr_FR' })
      ).resolves.toEqual([{ code: 'USD', name: 'US Dollar' }]);
    });

    it('falls back to any available translation when en_US is missing too', async () => {
      currencies({ hr_HR: 'Americki dolar' });

      await expect(
        restService.getCurrencies({ ...config, languageId: 'fr_FR' })
      ).resolves.toEqual([{ code: 'USD', name: 'Americki dolar' }]);
    });

    it('falls back to the currency code when there is no name at all', async () => {
      currencies(undefined);

      await expect(restService.getCurrencies(config)).resolves.toEqual([
        { code: 'USD', name: 'USD' },
      ]);
    });
  });

  describe('getImportTask resilience', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    const run = async (impl) => {
      restService.httpCore._get = vi.fn(impl);
      // Settle-capture up front: advancing the timers below lets the call
      // reject before the assertion attaches, which would surface as an
      // unhandled rejection rather than a test failure.
      const settled = restService.getImportTask(config, 9001).then(
        (value) => ({ ok: true, value }),
        (reason) => ({ ok: false, reason })
      );

      // Retries back off by one second per attempt.
      await vi.advanceTimersByTimeAsync(5000);

      const outcome = await settled;
      if (!outcome.ok) throw outcome.reason;
      return outcome.value;
    };

    it('returns the task when the batch engine answers', async () => {
      await expect(
        run(async () => ({ executeStatus: 'COMPLETED', totalItemsCount: 3 }))
      ).resolves.toMatchObject({ executeStatus: 'COMPLETED' });
    });

    it('retries an intermittent 400 and returns the eventual answer', async () => {
      let calls = 0;
      const result = await run(async () => {
        calls += 1;
        if (calls < 3)
          throw Object.assign(new Error('bad request'), { status: 400 });
        return { executeStatus: 'COMPLETED' };
      });

      expect(result).toMatchObject({ executeStatus: 'COMPLETED' });
      expect(calls).toBe(3);
    });

    it('assumes a 404 batch completed rather than deadlocking the orchestrator', async () => {
      // The orchestrator waits on this call; a thrown 404 would strand the
      // session forever, so a missing task is reported as complete.
      for (const notFound of [
        Object.assign(new Error('nope'), { status: 404 }),
        Object.assign(new Error('request failed with 404')),
        Object.assign(new Error('nope'), { response: { status: 404 } }),
        Object.assign(new Error('nope'), { problem: { status: 'NOT_FOUND' } }),
      ]) {
        const result = await run(async () => {
          throw notFound;
        });

        expect(result).toEqual({
          executeStatus: 'COMPLETED',
          totalItemsCount: 1,
          processedItemsCount: 1,
        });
      }
    });

    it('treats a soft-empty response the same way', async () => {
      await expect(run(async () => ({ softEmpty: true }))).resolves.toEqual({
        executeStatus: 'COMPLETED',
        totalItemsCount: 1,
        processedItemsCount: 1,
      });
    });

    it('propagates a failure that is neither 400 nor 404', async () => {
      await expect(
        run(async () => {
          throw Object.assign(new Error('server exploded'), { status: 500 });
        })
      ).rejects.toThrow('server exploded');
    });
  });

  describe('getImportTaskFailedItemReport', () => {
    it('parses the CSV report into records keyed by column', async () => {
      restService.httpCore._get = vi
        .fn()
        .mockResolvedValue(
          'externalReferenceCode,errorMessage\nERC-1,Invalid product\nERC-2,Missing catalog\n'
        );

      await expect(
        restService.getImportTaskFailedItemReport(config, 9001)
      ).resolves.toEqual([
        { externalReferenceCode: 'ERC-1', errorMessage: 'Invalid product' },
        { externalReferenceCode: 'ERC-2', errorMessage: 'Missing catalog' },
      ]);
    });

    it('returns nothing for a header-only report', async () => {
      restService.httpCore._get = vi
        .fn()
        .mockResolvedValue('externalReferenceCode,errorMessage\n');

      await expect(
        restService.getImportTaskFailedItemReport(config, 9001)
      ).resolves.toEqual([]);
    });
  });

  describe('iteratePages', () => {
    const collect = async (iterator) => {
      const pages = [];
      for await (const page of iterator) pages.push(page);
      return pages;
    };

    it('stops on a short page and threads paging params through', async () => {
      const get = vi
        .fn()
        .mockResolvedValueOnce({ items: [1, 2] })
        .mockResolvedValueOnce({ items: [3] });
      restService.httpCore._get = get;

      const pages = await collect(
        restService.iteratePages(config, '/o/x', 'op', 'friendly', {
          pageSize: 2,
        })
      );

      expect(pages).toEqual([{ items: [1, 2] }, { items: [3] }]);
      expect(get.mock.calls.map(([, , , , opts]) => opts.params)).toEqual([
        { page: 1, pageSize: 2 },
        { page: 2, pageSize: 2 },
      ]);
    });

    it('stops immediately on an empty first page', async () => {
      const get = vi.fn().mockResolvedValue({ items: [] });
      restService.httpCore._get = get;

      const pages = await collect(
        restService.iteratePages(config, '/o/x', 'op', 'friendly')
      );

      expect(pages).toEqual([{ items: [] }]);
      expect(get).toHaveBeenCalledTimes(1);
    });

    it('accepts a fetcher function instead of a URL', async () => {
      const fetcher = vi
        .fn()
        .mockResolvedValueOnce({ items: [1, 2] })
        .mockResolvedValueOnce({ items: [] });
      restService.httpCore._get = vi.fn();

      const pages = await collect(
        restService.iteratePages(config, fetcher, 'op', 'friendly', {
          pageSize: 2,
        })
      );

      expect(pages).toHaveLength(2);
      expect(fetcher).toHaveBeenCalledWith(config, 1, 2);
      expect(fetcher).toHaveBeenCalledWith(config, 2, 2);
      expect(restService.httpCore._get).not.toHaveBeenCalled();
    });
  });
});

describe('soft status configuration', () => {
  const fs = require('fs');
  const path = require('path');
  const { SOFT_STATUS_BY_OP } = require('../src/liferay/rest/config.cjs');

  const sourceText = (() => {
    const root = path.join(__dirname, '..', 'src');
    const read = (dir) =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return /logs|generated/.test(entry.name) ? [] : read(full);
        }
        if (!/\.(cjs|js)$/.test(entry.name)) return [];
        if (full.endsWith(path.join('rest', 'config.cjs'))) return [];
        return [fs.readFileSync(full, 'utf8')];
      });
    return read(root).join('\n');
  })();

  it('tolerates statuses only for operations that something actually emits', () => {
    // A key naming an op no call site passes is dead configuration: it reads
    // as 404 tolerance while providing none. Two such entries existed for
    // product and warehouse ERC lookups, which moved to GraphQL.
    const unreachable = Object.keys(SOFT_STATUS_BY_OP).filter((op) => {
      // `${entityName}:list` is built dynamically in liferay/index.cjs.
      if (op.endsWith(':list')) return false;
      return !sourceText.includes(`'${op}'`);
    });

    expect(unreachable).toEqual([]);
  });

  it('declares plausible HTTP statuses', () => {
    for (const [op, statuses] of Object.entries(SOFT_STATUS_BY_OP)) {
      expect(Array.isArray(statuses), op).toBe(true);
      expect(statuses.length, op).toBeGreaterThan(0);
      for (const status of statuses) {
        expect(status, op).toBeGreaterThanOrEqual(400);
        expect(status, op).toBeLessThan(500);
      }
    }
  });
});
