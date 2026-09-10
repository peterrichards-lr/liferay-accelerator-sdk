import { describe, it, expect, vi, beforeEach } from 'vitest';
import LiferayRestService from '../src/liferay/rest.cjs';
import CommerceService from '../src/liferay/services/CommerceService.cjs';

/**
 * getProductsWithSkus named PATH.SKUS, which no profile defined, so the URL
 * argument was undefined, `new URL(undefined, liferayUrl)` coerced it, and
 * every call requested `<liferay>/undefined`. The catch turned the 404 into an
 * empty SKU list, so the method answered with products carrying no SKUs and
 * reported success (#199).
 *
 * These assert the URL the method actually requests, because a path that only
 * exists as the string "undefined" is precisely what a mocked-out call site
 * cannot catch.
 */
describe('CommerceService.getProductsWithSkus (#199)', () => {
  // _resolveUrl resolves the whole connection, so the credentials have to be
  // present even though nothing is dialled here.
  const config = {
    liferayUrl: 'http://localhost:8080',
    clientId: 'test-client',
    clientSecret: 'test-secret',
  };
  const SKUS_URL = '/o/headless-commerce-admin-catalog/v1.0/skus';

  let rest;
  let getSpy;
  let liferay;
  let commerce;

  beforeEach(() => {
    rest = new LiferayRestService({});
    getSpy = vi.spyOn(rest.httpCore, '_get');
    liferay = {
      rest,
      ctx: { logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn() } },
      getProducts: vi.fn().mockResolvedValue({
        items: [{ productId: 1 }, { productId: 2 }],
        totalCount: 2,
      }),
    };
    commerce = new CommerceService(liferay);
  });

  /** Every SKU read the method made, as the URL it would have dialled. */
  const requestedUrls = () =>
    getSpy.mock.calls.map(([cfg, url]) => rest.httpCore._resolveUrl(cfg, url));

  it('requests the catalogue-wide SKU collection, not /undefined', async () => {
    getSpy.mockResolvedValue({ items: [], totalCount: 0 });

    await commerce.getProductsWithSkus(config, { catalogId: 40123 });

    expect(getSpy).toHaveBeenCalled();
    expect(getSpy.mock.calls[0][1]).toBe(SKUS_URL);
    expect(requestedUrls()).toEqual([`http://localhost:8080${SKUS_URL}`]);
  });

  it('scopes the read to the catalogue when one is given', async () => {
    getSpy.mockResolvedValue({ items: [], totalCount: 0 });

    await commerce.getProductsWithSkus(config, { catalogId: 40123 });

    expect(getSpy.mock.calls[0][4].params).toMatchObject({
      page: 1,
      pageSize: 250,
      filter: 'catalogId eq 40123',
    });
  });

  it('reads every page rather than truncating at the first', async () => {
    // pageSize 250 was passed straight to _get, so a catalogue with more than
    // 250 SKUs lost the rest silently even once the path was right (#199).
    const page1 = Array.from({ length: 250 }, (_, i) => ({
      productId: 1,
      sku: `SKU-${i}`,
    }));
    const page2 = [{ productId: 2, sku: 'SKU-250' }];
    getSpy
      .mockResolvedValueOnce({ items: page1, totalCount: 251 })
      .mockResolvedValueOnce({ items: page2, totalCount: 251 });

    const { items } = await commerce.getProductsWithSkus(config, {});

    expect(getSpy).toHaveBeenCalledTimes(2);
    expect(getSpy.mock.calls[0][4].params.page).toBe(1);
    expect(getSpy.mock.calls[1][4].params.page).toBe(2);
    expect(items.find((p) => p.productId === 1).skus).toHaveLength(250);
    expect(items.find((p) => p.productId === 2).skus).toEqual([
      {
        sku: 'SKU-250',
        purchasable: undefined,
        price: undefined,
        externalReferenceCode: undefined,
      },
    ]);
  });

  it('throws when the SKUs cannot be read instead of reporting success', async () => {
    getSpy.mockRejectedValue(new Error('Request failed with status code 404'));

    await expect(
      commerce.getProductsWithSkus(config, { catalogId: 40123 })
    ).rejects.toThrow(/Failed to fetch SKUs for products/);
  });

  it('keeps the underlying failure as the cause', async () => {
    const underlying = new Error('Request failed with status code 404');
    getSpy.mockRejectedValue(underlying);

    await expect(
      commerce.getProductsWithSkus(config, {})
    ).rejects.toMatchObject({ cause: underlying });
  });
});
