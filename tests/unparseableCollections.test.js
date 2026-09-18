import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const { LiferayService } = require('../src/liferay/index.cjs');
const {
  collectAllPages,
  describePage,
  warnIfTruncated,
} = require('../src/utils/paging.cjs');
const {
  UNPARSEABLE_COLLECTION,
  isUnparseableCollection,
} = require('../src/utils/liferayUtils.cjs');

const CHANNELS_URL = '*/o/headless-commerce-admin-channel/v1.0/channels';
const OPTION_CATEGORIES_URL =
  '*/o/headless-commerce-admin-catalog/v1.0/optionCategories';
const WAREHOUSES_URL = '*/o/headless-commerce-admin-inventory/v1.0/warehouses';
const SPECIFICATIONS_URL =
  '*/o/headless-commerce-admin-catalog/v1.0/specifications';
const COUNTRY_REGIONS_URL =
  '*/o/headless-admin-address/v1.0/countries/:countryId/regions';

const CONFIG = {
  liferayUrl: 'http://liferay:8080',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
};

/**
 * A response Liferay can and does answer 200 with: a body that is not a
 * collection. An error envelope is the shape this defect was found behind, but
 * a collection served under a different field name reads the same way from
 * here - neither is an empty page.
 */
const NOT_A_COLLECTION = {
  status: 'INTERNAL_SERVER_ERROR',
  title: 'Unexpected error',
};

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
    config: {},
  };
  ctx.oauth = {
    getAccessToken: vi.fn().mockResolvedValue('test-token'),
    clearTokenCache: vi.fn(),
    applyConfig: vi.fn(),
  };
  return { service: new LiferayService(ctx), ctx, logger };
}

/**
 * Serves `totalCount` rows, except for one page which answers with something
 * that is not a collection at all.
 */
function pagedHandlerBreakingOn(
  url,
  { totalCount, brokenPage, brokenBody = NOT_A_COLLECTION, requestLog }
) {
  return http.get(url, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 20);
    requestLog?.push({ page, pageSize });

    if (page === brokenPage) {
      return HttpResponse.json(brokenBody);
    }

    const start = (page - 1) * pageSize;
    return HttpResponse.json({
      items: Array.from(
        { length: Math.max(0, Math.min(pageSize, totalCount - start)) },
        (_unused, index) => ({
          id: start + index,
          externalReferenceCode: `ROW-${start + index}`,
        })
      ),
      page,
      pageSize,
      totalCount,
      lastPage: Math.ceil(totalCount / pageSize),
    });
  });
}

async function captureError(run) {
  try {
    await run();
  } catch (error) {
    return error;
  }
  return null;
}

describe('an unparseable response is not an empty collection (#277)', () => {
  let service;
  let logger;
  let ctx;

  beforeEach(() => {
    ({ service, logger, ctx } = createLiferayService());
  });

  describe('collectAllPages', () => {
    it('refuses to return the pages it did read as the whole collection', async () => {
      const pages = [
        { items: [{ id: 1 }, { id: 2 }], totalCount: 6 },
        NOT_A_COLLECTION,
        { items: [{ id: 5 }, { id: 6 }], totalCount: 6 },
      ];

      const error = await captureError(() =>
        collectAllPages(({ page }) => Promise.resolve(pages[page - 1]), {
          pageSize: 2,
          op: 'collect-rows',
          logger,
        })
      );

      // Before #277 this resolved to two of the six rows, `truncated` false,
      // and nothing logged: a partial collection presented as a complete one.
      expect(error).not.toBeNull();
      expect(error.code).toBe(UNPARSEABLE_COLLECTION);
      expect(error.op).toBe('collect-rows');
      expect(error.message).toContain('collect-rows');
    });

    it('still ends on a genuinely empty page', async () => {
      const pages = [
        { items: [{ id: 1 }, { id: 2 }], totalCount: 2 },
        { items: [], totalCount: 2 },
      ];

      const result = await collectAllPages(
        ({ page }) => Promise.resolve(pages[page - 1] ?? pages[1]),
        { pageSize: 2, op: 'collect-rows', logger }
      );

      expect(result).toEqual({ items: [{ id: 1 }, { id: 2 }], totalCount: 2 });
    });
  });

  describe('describePage and warnIfTruncated', () => {
    it('will not describe an unreadable response as a complete empty read', () => {
      // `{ returned: 0, totalCount: 0, truncated: false }` was the old answer,
      // which is indistinguishable from a collection that really is empty.
      expect(() => describePage(NOT_A_COLLECTION)).toThrow(
        /Unparseable collection response/
      );
      expect(() => describePage(undefined)).toThrow(
        /Unparseable collection response/
      );

      const error = (() => {
        try {
          warnIfTruncated(NOT_A_COLLECTION, {
            op: 'get-catalogs-bulk',
            logger,
          });
        } catch (caught) {
          return caught;
        }
        return null;
      })();

      expect(isUnparseableCollection(error)).toBe(true);
      expect(error.op).toBe('get-catalogs-bulk');
    });

    it('still describes an empty page as a complete read', () => {
      expect(describePage({ items: [], totalCount: 0 })).toEqual({
        returned: 0,
        totalCount: 0,
        truncated: false,
      });
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });

  describe('_collectAllItems and the pager underneath it', () => {
    it('fails the read rather than truncating it at the unreadable page', async () => {
      const requestLog = [];
      server.use(
        pagedHandlerBreakingOn(WAREHOUSES_URL, {
          totalCount: 500,
          brokenPage: 2,
          requestLog,
        })
      );

      const error = await captureError(() =>
        service._collectAllItems(
          CONFIG,
          (cfg, page, pageSize) =>
            service.rest._get(cfg, WAREHOUSES_URL, 'test-op', 'Test Op', {
              params: { page, pageSize },
            }),
          null,
          200,
          { op: 'get-warehouses-bulk' }
        )
      );

      expect(isUnparseableCollection(error)).toBe(true);
      expect(requestLog.map((entry) => entry.page)).toEqual([1, 2]);
    });

    it('raises on an envelope that counts rows it did not serve', async () => {
      // `totalCount` without `items` is the case a count alone cannot catch:
      // asCount answers 500 happily, so only the items read can tell that this
      // page held nothing readable.
      server.use(
        pagedHandlerBreakingOn(WAREHOUSES_URL, {
          totalCount: 500,
          brokenPage: 2,
          brokenBody: { page: 2, pageSize: 200, totalCount: 500, lastPage: 3 },
        })
      );

      const error = await captureError(() =>
        service._collectAllItems(
          CONFIG,
          (cfg, page, pageSize) =>
            service.rest._get(cfg, WAREHOUSES_URL, 'test-op', 'Test Op', {
              params: { page, pageSize },
            }),
          null,
          200,
          { op: 'get-warehouses-bulk' }
        )
      );

      expect(isUnparseableCollection(error)).toBe(true);
      expect(error.op).toBe('get-warehouses-bulk');
    });

    it('will not end the page walk on a page it could not read', async () => {
      const yielded = [];
      server.use(
        pagedHandlerBreakingOn(WAREHOUSES_URL, {
          totalCount: 500,
          brokenPage: 2,
        })
      );

      const error = await captureError(async () => {
        for await (const pageRes of service.rest.iteratePages(
          CONFIG,
          WAREHOUSES_URL,
          'warehouses:walk',
          'Walk warehouses',
          { pageSize: 200 }
        )) {
          yielded.push(pageRes);
        }
      });

      // The generator used to simply stop here, and a caller reading it as
      // "that was the last page" would keep 200 of the 500 rows.
      expect(isUnparseableCollection(error)).toBe(true);
      expect(error.op).toBe('warehouses:walk');
      expect(yielded).toHaveLength(2);
    });

    it('reads a tolerated 404 as the empty collection it is', async () => {
      server.use(
        http.get(WAREHOUSES_URL, () =>
          HttpResponse.json({ title: 'Not Found' }, { status: 404 })
        )
      );

      const result = await service._collectAllItems(
        CONFIG,
        (cfg, page, pageSize) =>
          service.rest._get(cfg, WAREHOUSES_URL, 'products:list', 'Products', {
            params: { page, pageSize },
          }),
        null,
        200,
        { op: 'get-warehouses-bulk' }
      );

      expect(result).toEqual({ items: [], totalCount: 0, truncated: false });
    });
  });

  describe('single-page readers', () => {
    it('raises instead of answering "no channels"', async () => {
      server.use(http.get(CHANNELS_URL, () => HttpResponse.json({})));

      const error = await captureError(() => service.rest.getChannels(CONFIG));

      expect(isUnparseableCollection(error)).toBe(true);
      expect(error.op).toBe('get-channels');
    });

    it('raises instead of answering "no option category with that key"', async () => {
      server.use(
        http.get(OPTION_CATEGORIES_URL, () =>
          HttpResponse.json(NOT_A_COLLECTION)
        )
      );

      const error = await captureError(() =>
        service.rest.getOptionCategoryByKey(CONFIG, 'COLOUR')
      );

      // The reader wraps its failures in its own message, so the code is only
      // reachable through the cause - which is why isUnparseableCollection
      // walks it.
      expect(error).not.toBeNull();
      expect(isUnparseableCollection(error)).toBe(true);
    });

    it('raises instead of answering "no specification with that key"', async () => {
      server.use(
        http.get(SPECIFICATIONS_URL, () => HttpResponse.json(NOT_A_COLLECTION))
      );

      const error = await captureError(() =>
        service.rest.getSpecificationByKey(CONFIG, 'MATERIAL')
      );

      expect(error).not.toBeNull();
      expect(isUnparseableCollection(error)).toBe(true);
    });

    it('will not cache an unreadable response as "this country has no regions"', async () => {
      server.use(
        http.get(COUNTRY_REGIONS_URL, () => HttpResponse.json(NOT_A_COLLECTION))
      );

      const error = await captureError(() =>
        service.rest.getCountryRegions(CONFIG, 1)
      );

      expect(isUnparseableCollection(error)).toBe(true);
      // The read is cached for fifteen minutes, so the empty array it used to
      // return outlived the failure that produced it.
      expect(ctx.cache.get('LIFERAY_REGIONS_1')).toBeUndefined();
    });

    it('still answers "none" for a collection that is genuinely empty', async () => {
      server.use(
        http.get(CHANNELS_URL, () =>
          HttpResponse.json({ items: [], totalCount: 0 })
        )
      );

      await expect(service.rest.getChannels(CONFIG)).resolves.toEqual([]);
    });
  });
});
