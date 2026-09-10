import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const { LiferayService } = require('../src/liferay/index.cjs');
const { DEFAULT_MAX_ITEMS } = require('../src/utils/paging.cjs');

const WAREHOUSES_URL = '*/o/headless-commerce-admin-inventory/v1.0/warehouses';

const CONFIG = {
  liferayUrl: 'http://liferay:8080',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
};

/**
 * A collection larger than any ceiling the test sets, served the way Liferay
 * serves one: every page carries the whole collection's `totalCount` (#203).
 */
function pagedHandler(url, totalCount, requestLog = []) {
  return http.get(url, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 20);
    requestLog.push({ page, pageSize });

    const start = (page - 1) * pageSize;
    const items = Array.from(
      { length: Math.max(0, Math.min(pageSize, totalCount - start)) },
      (_unused, index) => ({
        id: start + index,
        externalReferenceCode: `ROW-${start + index}`,
        name: { en_US: `Row ${start + index}` },
      })
    );

    return HttpResponse.json({
      items,
      page,
      pageSize,
      totalCount,
      lastPage: Math.ceil(totalCount / pageSize),
    });
  });
}

function createLiferayService() {
  const mockCache = new Map();
  const logger = {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  };
  const ctx = {
    cache: {
      get: (key) => mockCache.get(key),
      set: (key, value) => mockCache.set(key, value),
      clear: () => mockCache.clear(),
    },
    logger,
    config: {
      getExcludeLists: vi.fn().mockResolvedValue({}),
    },
  };
  ctx.oauth = {
    getAccessToken: vi.fn().mockResolvedValue('test-token'),
    clearTokenCache: vi.fn(),
    applyConfig: vi.fn(),
  };
  return { service: new LiferayService(ctx), ctx, logger };
}

/** Fetch straight from a stubbed collection, the shape every call site uses. */
function fetcherFor(service, url) {
  return (cfg, page, pageSize) =>
    service.rest._get(cfg, url, 'test-op', 'Test Op', {
      params: { page, pageSize },
    });
}

describe('_collectAllItems reports Liferay total, not its own cap (#203)', () => {
  let service;
  let logger;

  beforeEach(() => {
    ({ service, logger } = createLiferayService());
  });

  it('reports the collection total when the row ceiling stops the read', async () => {
    server.use(pagedHandler(WAREHOUSES_URL, 40000));

    const result = await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL),
      5000,
      200,
      { op: 'get-warehouses-bulk' }
    );

    // The defect: this used to be 5000, so a caller could not tell a
    // collection of exactly 5000 from one of 40,000.
    expect(result.totalCount).toBe(40000);
    expect(result.items).toHaveLength(5000);
    expect(result.truncated).toBe(true);
  });

  it('logs the truncation with the structured fields #200 established', async () => {
    server.use(pagedHandler(WAREHOUSES_URL, 40000));

    await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL),
      1000,
      200,
      { op: 'get-warehouses-bulk' }
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
    const [message, meta] = logger.warn.mock.calls[0];
    expect(message).toContain('Truncated read (get-warehouses-bulk)');
    expect(message).toContain('1000 of 40000');
    expect(meta).toMatchObject({
      op: 'get-warehouses-bulk',
      returned: 1000,
      totalCount: 40000,
      truncated: true,
      maxItems: 1000,
    });
  });

  it('reads and reports a complete collection without warning', async () => {
    server.use(pagedHandler(WAREHOUSES_URL, 340));

    const result = await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL),
      5000,
      200,
      { op: 'get-warehouses-bulk' }
    );

    expect(result.items).toHaveLength(340);
    expect(result.totalCount).toBe(340);
    expect(result.truncated).toBe(false);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('reads past the old 5000 default, which real collections reach', async () => {
    const requestLog = [];
    server.use(pagedHandler(WAREHOUSES_URL, 6000, requestLog));

    const result = await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL)
    );

    expect(result.items).toHaveLength(6000);
    expect(result.totalCount).toBe(6000);
    expect(result.truncated).toBe(false);
    // 30 full pages, then the empty page that ends the loop.
    expect(requestLog).toHaveLength(31);
    expect(DEFAULT_MAX_ITEMS).toBeGreaterThan(6000);
  });

  it('throws instead of warning when the caller requires the whole set', async () => {
    server.use(pagedHandler(WAREHOUSES_URL, 40000));

    await expect(
      service._collectAllItems(
        CONFIG,
        fetcherFor(service, WAREHOUSES_URL),
        1000,
        200,
        { op: 'get-warehouses-bulk', onTruncate: 'throw' }
      )
    ).rejects.toMatchObject({
      code: 'TRUNCATED_READ',
      returned: 1000,
      totalCount: 40000,
    });
  });

  it('accepts an options object in the third position', async () => {
    server.use(pagedHandler(WAREHOUSES_URL, 40000));

    const result = await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL),
      { maxItems: 400, pageSize: 200, op: 'get-entries' }
    );

    expect(result.items).toHaveLength(400);
    expect(result.totalCount).toBe(40000);
    expect(logger.warn.mock.calls[0][1]).toMatchObject({ op: 'get-entries' });
  });

  it('bounds an opted-out ceiling by the page ceiling rather than looping forever', async () => {
    // An instance that ignores `page` answers every request with page one.
    let requests = 0;
    server.use(
      http.get(WAREHOUSES_URL, () => {
        requests += 1;
        return HttpResponse.json({
          items: [{ id: 1 }, { id: 2 }],
          page: 1,
          pageSize: 2,
          totalCount: 999999,
        });
      })
    );

    const result = await service._collectAllItems(
      CONFIG,
      fetcherFor(service, WAREHOUSES_URL),
      { maxItems: null, pageSize: 2, maxPages: 5, op: 'stuck-op' }
    );

    expect(requests).toBe(5);
    expect(result.items).toHaveLength(10);
    expect(result.totalCount).toBe(999999);
    expect(result.truncated).toBe(true);
    expect(logger.warn.mock.calls[0][0]).toContain('after 5 pages');
  });

  it('never claims a collection is smaller than the rows already read', async () => {
    // A fetcher answering with a bare array carries no envelope, so asCount
    // falls back to the page length; the total must not end up below what the
    // reader is holding.
    const pages = [[1, 2], [3, 4], [5]];
    const result = await service._collectAllItems(
      CONFIG,
      async (_cfg, page) => pages[page - 1] || [],
      { pageSize: 2, op: 'bare-array' }
    );

    expect(result.items).toEqual([1, 2, 3, 4, 5]);
    expect(result.totalCount).toBe(5);
    expect(result.truncated).toBe(false);
    expect(logger.warn).not.toHaveBeenCalled();
  });
});

describe('collecting readers pass truncation on to their callers (#203)', () => {
  /**
   * Liferay serving a page shorter than the one asked for ends the paging loop,
   * so the read stops well short of `totalCount` without any ceiling being
   * involved - the cheapest way to produce a genuinely partial read.
   */
  function shortPageHandler(url, totalCount, served) {
    return http.get(url, () =>
      HttpResponse.json({
        items: Array.from({ length: served }, (_unused, index) => ({
          id: index,
          externalReferenceCode: `ROW-${index}`,
          name: { en_US: `Row ${index}` },
        })),
        page: 1,
        pageSize: served,
        totalCount,
      })
    );
  }

  it('getWarehouses says its answer is partial', async () => {
    const { service, logger } = createLiferayService();
    server.use(shortPageHandler(WAREHOUSES_URL, 40000, 50));

    const result = await service.getWarehouses(CONFIG, { pageSize: 200 });

    expect(result.items).toHaveLength(50);
    expect(result.truncated).toBe(true);
    expect(logger.warn.mock.calls[0][1]).toMatchObject({
      op: 'get-warehouses-bulk',
      returned: 50,
      totalCount: 40000,
      truncated: true,
    });
  });

  it('getWarehouses reports a complete read as complete', async () => {
    const { service, logger } = createLiferayService();
    server.use(pagedHandler(WAREHOUSES_URL, 340));

    const result = await service.getWarehouses(CONFIG, { pageSize: 200 });

    expect(result.items).toHaveLength(340);
    expect(result.truncated).toBe(false);
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
