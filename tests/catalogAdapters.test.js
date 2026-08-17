import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const LiferayCatalogAdapter = require('../src/liferay/adapters/LiferayCatalogAdapter.cjs');
const LegacyProductFirstAdapter = require('../src/liferay/adapters/LegacyProductFirstAdapter.cjs');
const PimSkuFirstAdapter = require('../src/liferay/adapters/PimSkuFirstAdapter.cjs');
const paths = require('../src/utils/liferayPaths.cjs');

const CATALOG = '/o/headless-commerce-admin-catalog/v1.0';
const config = { liferayUrl: 'http://localhost:8080' };

const createRest = () => ({
  _get: vi.fn().mockResolvedValue({ items: [] }),
  _post: vi.fn().mockResolvedValue({ id: 1 }),
  _delete: vi.fn().mockResolvedValue({}),
  _postBatch: vi.fn().mockResolvedValue({ count: 0 }),
  ctx: {
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      trace: vi.fn(),
    },
  },
});

describe('LiferayCatalogAdapter (base contract)', () => {
  const methods = [
    ['createProductsBatch', [config, [], {}]],
    ['deleteProductsBatch', [config, {}]],
    ['createProductSkusBatch', [config, [], {}]],
    ['createProductSku', [config, 1, {}]],
    ['getSkusByERC', [config, ['E']]],
    ['getProductOptions', [config, 1]],
    ['deleteProductOption', [config, 1, 2]],
    ['addProductOptions', [config, 1, [], 'ERC']],
    ['getProductSpecifications', [config, 1]],
    ['deleteProductSpecification', [config, 1, 2]],
  ];

  it.each(methods)('refuses to silently no-op for %s', async (method, args) => {
    // A new adapter (e.g. the PIM SKU-first one tracked in #3) that forgets to
    // override a method must fail loudly rather than quietly returning
    // undefined and looking like a successful call.
    const adapter = new LiferayCatalogAdapter(createRest(), paths);
    await expect(adapter[method](...args)).rejects.toThrow('Not Implemented');
  });

  it('retains the rest service and paths profile it was constructed with', () => {
    const rest = createRest();
    const adapter = new LiferayCatalogAdapter(rest, paths);

    expect(adapter.rest).toBe(rest);
    expect(adapter.paths).toBe(paths);
  });
});

describe('LegacyProductFirstAdapter', () => {
  let rest;
  let adapter;

  beforeEach(() => {
    vi.clearAllMocks();
    rest = createRest();
    adapter = new LegacyProductFirstAdapter(rest, paths);
  });

  describe('reads', () => {
    it('passes paging and field selection through to the products collection', async () => {
      await adapter.getProductsRaw(config, "name eq 'saw'", 2, 50, 'id,name');

      expect(rest._get).toHaveBeenCalledWith(
        config,
        `${CATALOG}/products`,
        'get-products-bulk',
        'Get Products Bulk',
        {
          params: {
            filter: "name eq 'saw'",
            page: 2,
            pageSize: 50,
            fields: 'id,name',
          },
        }
      );
    });

    it('unwraps product options and specifications to plain arrays', async () => {
      rest._get.mockResolvedValue({ items: [{ id: 7 }], totalCount: 1 });

      await expect(adapter.getProductOptions(config, 42)).resolves.toEqual([
        { id: 7 },
      ]);
      expect(rest._get).toHaveBeenCalledWith(
        config,
        `${CATALOG}/products/42/productOptions`,
        'get-product-options'
      );

      await expect(
        adapter.getProductSpecifications(config, 42)
      ).resolves.toEqual([{ id: 7 }]);
      expect(rest._get).toHaveBeenLastCalledWith(
        config,
        `${CATALOG}/products/42/productSpecifications`,
        'get-product-specs'
      );
    });
  });

  describe('getSkusByERC', () => {
    it('makes no request for an empty ERC list', async () => {
      await expect(adapter.getSkusByERC(config, [])).resolves.toEqual([]);
      await expect(adapter.getSkusByERC(config, null)).resolves.toEqual([]);
      expect(rest._get).not.toHaveBeenCalled();
    });

    it('returns the SKUs it could fetch and drops the ones it could not', async () => {
      // Settled-not-all: one missing ERC must not lose the others.
      rest._get
        .mockResolvedValueOnce({ id: 1, externalReferenceCode: 'A' })
        .mockRejectedValueOnce(new Error('404 not found'))
        .mockResolvedValueOnce({ id: 3, externalReferenceCode: 'C' });

      await expect(
        adapter.getSkusByERC(config, ['A', 'B', 'C'])
      ).resolves.toEqual([
        { id: 1, externalReferenceCode: 'A' },
        { id: 3, externalReferenceCode: 'C' },
      ]);
      expect(rest._get).toHaveBeenCalledTimes(3);
      expect(rest._get).toHaveBeenCalledWith(
        config,
        `${CATALOG}/skus/by-externalReferenceCode/A`,
        'get-sku-by-erc',
        'Get SKU by ERC'
      );
    });
  });

  describe('batch submissions', () => {
    it('submits products to the products batch endpoint', async () => {
      await adapter.createProductsBatch(config, [{ name: 'x' }], {
        externalReferenceCode: 'BATCH-1',
        sessionId: 'sid',
      });

      expect(rest._postBatch).toHaveBeenCalledWith(
        config,
        expect.objectContaining({
          entityName: 'product',
          op: 'products:batch',
          externalReferenceCode: 'BATCH-1',
          sessionId: 'sid',
          path: paths.PATH.PRODUCTS_BATCH,
        })
      );
    });

    it('sends an empty item list rather than undefined when deleting nothing', async () => {
      await adapter.deleteProductsBatch(config, {});

      expect(rest._postBatch).toHaveBeenCalledWith(
        config,
        expect.objectContaining({ op: 'products:batch-delete', items: [] })
      );
    });

    it('scopes the SKU batch path to a product when one is identified', async () => {
      await adapter.createProductSkusBatch(config, [{ sku: 'S' }], {
        productId: 99,
      });

      // The path is passed as a callback, so assert on what it emits.
      const { path } = rest._postBatch.mock.calls[0][1];
      expect(path('http://cb')).toContain(`${CATALOG}/products/skus/batch`);
      expect(path('http://cb')).toContain('productId=99');
    });

    it('falls back to the unscoped SKU batch path when no product is identified', async () => {
      await adapter.createProductSkusBatch(config, [{ sku: 'S' }], {});

      const { path } = rest._postBatch.mock.calls[0][1];
      expect(path('http://cb')).toContain(`${CATALOG}/products/skus/batch`);
      expect(path('http://cb')).not.toContain('productId');
    });
  });

  describe('addProductOptions', () => {
    // The retry path waits 2s then 4s. These tests drive the real backoff with
    // fake timers rather than stubbing it, so the wait itself is asserted.
    afterEach(() => {
      vi.useRealTimers();
    });

    it('addresses the product by ERC when one is supplied', async () => {
      await adapter.addProductOptions(config, 42, [{ key: 'k' }], 'PROD-1');

      expect(rest._post).toHaveBeenCalledWith(
        config,
        `${CATALOG}/products/by-externalReferenceCode/PROD-1/productOptions`,
        [{ key: 'k' }],
        'add-product-options',
        'Failed to add product options'
      );
    });

    it('falls back to the product id when no ERC is supplied', async () => {
      await adapter.addProductOptions(config, 42, [{ key: 'k' }]);

      expect(rest._post).toHaveBeenCalledWith(
        config,
        `${CATALOG}/products/42/productOptions`,
        [{ key: 'k' }],
        'add-product-options',
        'Failed to add product options'
      );
    });

    it('retries a 404 while Liferay catches up, then succeeds', async () => {
      // Products are not always visible immediately after a batch import.
      vi.useFakeTimers();
      const notFound = Object.assign(new Error('not found'), { status: 404 });
      rest._post
        .mockRejectedValueOnce(notFound)
        .mockResolvedValueOnce({ ok: true });

      const pending = adapter.addProductOptions(config, 42, [], 'PROD-1');

      // It must wait rather than hammering the endpoint immediately.
      await vi.advanceTimersByTimeAsync(0);
      expect(rest._post).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(2000);
      await expect(pending).resolves.toEqual({ ok: true });

      expect(rest._post).toHaveBeenCalledTimes(2);
      expect(rest.ctx.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('retrying'),
        expect.objectContaining({ attempt: 1 })
      );
    });

    it('gives up after three 404s, backing off further each time', async () => {
      vi.useFakeTimers();
      const notFound = Object.assign(new Error('not found'), {
        problem: { status: 404 },
      });
      rest._post.mockRejectedValue(notFound);

      const pending = adapter.addProductOptions(config, 42, [], 'PROD-1');
      const settled = expect(pending).rejects.toThrow('not found');

      await vi.advanceTimersByTimeAsync(2000);
      expect(rest._post).toHaveBeenCalledTimes(2);

      // The second wait is longer; 2s is not enough to release the third try.
      await vi.advanceTimersByTimeAsync(2000);
      expect(rest._post).toHaveBeenCalledTimes(2);

      await vi.advanceTimersByTimeAsync(2000);
      await settled;
      expect(rest._post).toHaveBeenCalledTimes(3);
    });

    it('does not retry a failure that is not a 404', async () => {
      rest._post.mockRejectedValue(
        Object.assign(new Error('bad request'), { status: 400 })
      );

      await expect(
        adapter.addProductOptions(config, 42, [], 'PROD-1')
      ).rejects.toThrow('bad request');

      // No retry, and therefore no backoff: it fails on the first attempt.
      expect(rest._post).toHaveBeenCalledTimes(1);
    });
  });

  describe('deletes', () => {
    it('deletes a product option by its own id, not the product id', async () => {
      await adapter.deleteProductOption(config, 42, 5501);

      expect(rest._delete).toHaveBeenCalledWith(
        config,
        `${CATALOG}/productOptions/5501`,
        null,
        'delete-product-option',
        'Failed to delete product option'
      );
    });

    it('deletes a product specification by its own id', async () => {
      await adapter.deleteProductSpecification(config, 42, 8801);

      expect(rest._delete).toHaveBeenCalledWith(
        config,
        `${CATALOG}/productSpecifications/8801`,
        null,
        'delete-product-specification',
        'Failed to delete product specification'
      );
    });
  });
});

describe('PimSkuFirstAdapter', () => {
  it('behaves as the legacy adapter until the PIM spec lands (#3)', async () => {
    // Documents the placeholder: it inherits product-first behaviour rather
    // than implementing a SKU-first tree, so a caller selecting it today gets
    // working legacy behaviour, not a silent no-op.
    const rest = createRest();
    const adapter = new PimSkuFirstAdapter(rest, paths);

    expect(adapter).toBeInstanceOf(LegacyProductFirstAdapter);
    expect(adapter).toBeInstanceOf(LiferayCatalogAdapter);

    await adapter.createProductSku(config, 42, { sku: 'S' });
    expect(rest._post).toHaveBeenCalledWith(
      config,
      `${CATALOG}/products/42/skus`,
      { sku: 'S' },
      'create-sku',
      'Failed to create SKU'
    );
  });
});
