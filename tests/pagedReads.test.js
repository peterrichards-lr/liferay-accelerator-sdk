import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const { LiferayService } = require('../src/liferay/index.cjs');
const ExtractionFacade = require('../src/services/extractionFacade.cjs');
const {
  collectAllPages,
  describePage,
  warnIfTruncated,
} = require('../src/utils/paging.cjs');

const CATALOGS_URL = '*/o/headless-commerce-admin-catalog/v1.0/catalogs';

/**
 * A catalog set large enough that one page cannot hold it (#200).
 *
 * 340 is the number the issue uses for the read that returns 100 and says
 * nothing; it is also past Liferay's own default page size of 20, so the same
 * fixture exercises both silent caps.
 */
const TOTAL_CATALOGS = 340;

const allCatalogs = Array.from(
  { length: TOTAL_CATALOGS },
  (_unused, index) => ({
    id: 1000 + index,
    externalReferenceCode: `CAT-${index}`,
    name: { en_US: `Catalog ${index}` },
    currencyCode: 'USD',
  })
);

/**
 * Stand in for Liferay's paging: defaults to a page size of 20 when the caller
 * sends none, which is exactly what made the un-parameterised read cap at 20.
 */
function pagedCatalogsHandler(requestLog = []) {
  return http.get(CATALOGS_URL, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = Number(url.searchParams.get('pageSize') || 20);
    requestLog.push({ page, pageSize });

    const start = (page - 1) * pageSize;
    return HttpResponse.json({
      items: allCatalogs.slice(start, start + pageSize),
      page,
      pageSize,
      totalCount: TOTAL_CATALOGS,
      lastPage: Math.ceil(TOTAL_CATALOGS / pageSize),
    });
  });
}

function createLiferayService() {
  const mockCache = new Map();
  const ctx = {
    cache: {
      get: (key) => mockCache.get(key),
      set: (key, value) => mockCache.set(key, value),
      clear: () => mockCache.clear(),
    },
    logger: {
      info: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
    },
    config: {},
  };
  ctx.oauth = {
    getAccessToken: vi.fn().mockResolvedValue('test-token'),
    clearTokenCache: vi.fn(),
    applyConfig: vi.fn(),
  };
  return { service: new LiferayService(ctx), ctx };
}

describe('paging utilities (#200)', () => {
  let logger;

  beforeEach(() => {
    logger = { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() };
  });

  it('describes a page against the total the server reported', () => {
    expect(describePage({ items: [{}, {}], totalCount: 7 })).toEqual({
      returned: 2,
      totalCount: 7,
      truncated: true,
    });
    expect(describePage({ items: [{}, {}], totalCount: 2 })).toEqual({
      returned: 2,
      totalCount: 2,
      truncated: false,
    });
  });

  it('warns when a single-page read is short of totalCount', () => {
    const description = warnIfTruncated(
      { items: new Array(100).fill({}), totalCount: 340 },
      { op: 'get-catalogs-bulk', logger }
    );

    expect(description.truncated).toBe(true);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    const [message, meta] = logger.warn.mock.calls[0];
    expect(message).toContain('100 of 340');
    expect(meta).toMatchObject({
      op: 'get-catalogs-bulk',
      returned: 100,
      totalCount: 340,
      truncated: true,
    });
  });

  it('stays silent when the page holds everything', () => {
    warnIfTruncated({ items: [{}], totalCount: 1 }, { op: 'x', logger });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('collects every page until totalCount is reached', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ items: [1, 2], totalCount: 5 })
      .mockResolvedValueOnce({ items: [3, 4], totalCount: 5 })
      .mockResolvedValueOnce({ items: [5], totalCount: 5 });

    const result = await collectAllPages(fetchPage, { pageSize: 2, logger });

    expect(result).toEqual({ items: [1, 2, 3, 4, 5], totalCount: 5 });
    expect(fetchPage.mock.calls.map(([params]) => params.page)).toEqual([
      1, 2, 3,
    ]);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('stops on an empty page rather than trusting totalCount', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ items: [1], totalCount: 99 })
      .mockResolvedValueOnce({ items: [], totalCount: 99 });

    const result = await collectAllPages(fetchPage, { pageSize: 1, logger });

    expect(result.items).toEqual([1]);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it('stops and warns when the instance ignores the page parameter', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValue({ items: [1], totalCount: 1000 });

    const result = await collectAllPages(fetchPage, {
      pageSize: 1,
      maxPages: 5,
      op: 'stuck:list',
      logger,
    });

    expect(result.items).toHaveLength(5);
    expect(fetchPage).toHaveBeenCalledTimes(5);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn.mock.calls[0][0]).toContain('stopped after 5 pages');
  });
});

describe('catalog readers page to the end (#200)', () => {
  it('rest.getCatalogs returns every catalog, not Liferay default page of 20', async () => {
    const requestLog = [];
    server.use(pagedCatalogsHandler(requestLog));
    const { service } = createLiferayService();

    const catalogs = await service.rest.getCatalogs({
      liferayUrl: 'http://liferay:8080',
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });

    expect(catalogs).toHaveLength(TOTAL_CATALOGS);
    expect(catalogs[TOTAL_CATALOGS - 1].externalReferenceCode).toBe(
      `CAT-${TOTAL_CATALOGS - 1}`
    );
    expect(requestLog.length).toBeGreaterThan(1);
    expect(requestLog[0].pageSize).toBeGreaterThan(20);
  });

  it('commerce getCatalogs returns every catalog with names flattened, not the first 100', async () => {
    const requestLog = [];
    server.use(pagedCatalogsHandler(requestLog));
    const { service } = createLiferayService();

    const catalogs = await service.getCatalogs({
      liferayUrl: 'http://liferay:8080',
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });

    expect(catalogs).toHaveLength(TOTAL_CATALOGS);
    expect(catalogs[0].name).toBe('Catalog 0');
    expect(catalogs[TOTAL_CATALOGS - 1].name).toBe(
      `Catalog ${TOTAL_CATALOGS - 1}`
    );
    expect(requestLog.map(({ page }) => page)).toEqual([1, 2, 3, 4]);
  });
});

describe('ExtractionFacade single-page reads are detectable (#200)', () => {
  let facade;
  let logger;
  let getCatalogsPage;
  const config = { liferayUrl: 'http://liferay:8080' };

  beforeEach(() => {
    logger = { warn: vi.fn(), info: vi.fn(), error: vi.fn(), debug: vi.fn() };
    getCatalogsPage = vi.fn(async (_config, _data, opts) => {
      const page = opts?.params?.page || 1;
      const pageSize = opts?.params?.pageSize || 100;
      const start = (page - 1) * pageSize;
      return {
        items: allCatalogs.slice(start, start + pageSize),
        page,
        pageSize,
        totalCount: TOTAL_CATALOGS,
      };
    });

    facade = new ExtractionFacade({
      ctx: { logger },
      client: {
        headlessCommerceAdminCatalog: { v1_0: { getCatalogsPage } },
      },
      rest: {},
    });
  });

  it('warns when the page returned is short of totalCount', async () => {
    const result = await facade.getCommerceCatalogsPage(config, {
      pageSize: 100,
    });

    expect(result.items).toHaveLength(100);
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.warn.mock.calls[0][0]).toContain('100 of 340');
  });

  it('keeps the deprecated un-suffixed name working', async () => {
    const result = await facade.getCommerceCatalogs(config, { pageSize: 100 });

    expect(result.items).toHaveLength(100);
    expect(getCatalogsPage).toHaveBeenCalledTimes(1);
  });

  it('does not nag a caller who is paging deliberately', async () => {
    await facade.getCommerceCatalogsPage(config, { page: 2, pageSize: 100 });

    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('collectAll reads every page without a warning per page', async () => {
    const { items, totalCount } = await facade.collectAll(
      (params) => facade.getCommerceCatalogsPage(config, params),
      { pageSize: 100 }
    );

    expect(items).toHaveLength(TOTAL_CATALOGS);
    expect(totalCount).toBe(TOTAL_CATALOGS);
    expect(getCatalogsPage).toHaveBeenCalledTimes(4);
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
