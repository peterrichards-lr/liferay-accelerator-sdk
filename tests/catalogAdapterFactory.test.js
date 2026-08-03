import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const CatalogAdapterFactory = require('../src/liferay/adapters/CatalogAdapterFactory.cjs');
const PimSkuFirstAdapter = require('../src/liferay/adapters/PimSkuFirstAdapter.cjs');
const LegacyProductFirstAdapter = require('../src/liferay/adapters/LegacyProductFirstAdapter.cjs');

describe('CatalogAdapterFactory', () => {
  let factory;
  let restService;
  const config = { liferayUrl: 'http://liferay-test:8080' };

  beforeEach(() => {
    factory = new CatalogAdapterFactory();
    restService = { _get: vi.fn() };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retries the probe with the configured maxRetries before falling back', async () => {
    restService._get.mockResolvedValue({ openapi: '3.0.0' });

    await factory.getAdapter(restService, config);

    expect(restService._get).toHaveBeenCalledTimes(1);
    const opts = restService._get.mock.calls[0][4];
    expect(opts.maxRetries).toBeGreaterThanOrEqual(3);
  });

  it('caches a successful PIM probe result indefinitely without re-probing', async () => {
    restService._get.mockResolvedValue({ openapi: '3.0.0' });

    const first = await factory.getAdapter(restService, config);
    const second = await factory.getAdapter(restService, config);

    expect(first).toBeInstanceOf(PimSkuFirstAdapter);
    expect(second).toBe(first);
    expect(restService._get).toHaveBeenCalledTimes(1);
  });

  it('does not permanently cache a transient probe failure: the tenant self-heals after the TTL', async () => {
    vi.useFakeTimers();

    // First probe fails (simulating a transient network blip) -> falls back to Legacy.
    restService._get.mockRejectedValueOnce(new Error('network blip'));

    const adapter1 = await factory.getAdapter(restService, config);
    expect(adapter1).toBeInstanceOf(LegacyProductFirstAdapter);
    expect(restService._get).toHaveBeenCalledTimes(1);

    // Immediately after, the failure result is still cached (short TTL, not expired yet).
    const adapter2 = await factory.getAdapter(restService, config);
    expect(adapter2).toBe(adapter1);
    expect(restService._get).toHaveBeenCalledTimes(1);

    // The transient issue clears; once the short failure TTL elapses, the
    // tenant should be re-probed rather than being stuck on Legacy forever.
    restService._get.mockResolvedValueOnce({ openapi: '3.0.0' });
    vi.advanceTimersByTime(6 * 60 * 1000); // > 5 minute failure TTL

    const adapter3 = await factory.getAdapter(restService, config);
    expect(restService._get).toHaveBeenCalledTimes(2);
    expect(adapter3).toBeInstanceOf(PimSkuFirstAdapter);
  });

  it('uses a separate cache entry per liferayUrl', async () => {
    restService._get.mockResolvedValue({ openapi: '3.0.0' });

    const adapterA = await factory.getAdapter(restService, {
      liferayUrl: 'http://tenant-a:8080',
    });
    restService._get.mockRejectedValueOnce(new Error('down'));
    const adapterB = await factory.getAdapter(restService, {
      liferayUrl: 'http://tenant-b:8080',
    });

    expect(adapterA).toBeInstanceOf(PimSkuFirstAdapter);
    expect(adapterB).toBeInstanceOf(LegacyProductFirstAdapter);
  });
});
