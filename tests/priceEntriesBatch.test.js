import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LiferayService } from '../src/liferay/index.cjs';

describe('createPriceEntriesBatch', () => {
  let liferayService;

  beforeEach(() => {
    liferayService = new LiferayService({
      logger: { info: vi.fn(), debug: vi.fn(), error: vi.fn() },
    });
    liferayService.rest._postBatch = vi
      .fn()
      .mockResolvedValue({ status: 'completed' });
    liferayService.rest.createPriceEntry = vi.fn().mockResolvedValue({});
  });

  it('should use native batch when simulateBatch is false', async () => {
    const config = {};
    const entries = [{ sku: 'A', price: 10 }];
    await liferayService.rest.createPriceEntriesBatch(config, entries, {
      simulateBatch: false,
    });

    expect(liferayService.rest._postBatch).toHaveBeenCalled();
    expect(liferayService.rest._postBatch).toHaveBeenCalledWith(
      config,
      expect.objectContaining({
        path: expect.stringContaining('/price-entries/batch'),
        items: entries,
      })
    );
    expect(liferayService.rest.createPriceEntry).not.toHaveBeenCalled();
  });

  it('should simulate batch by default (simulateBatch !== false)', async () => {
    const config = {};
    const entries = [{ sku: 'A', price: 10 }];
    await liferayService.rest.createPriceEntriesBatch(config, entries, {});

    expect(liferayService.rest._postBatch).not.toHaveBeenCalled();
    expect(liferayService.rest.createPriceEntry).toHaveBeenCalled();
  });
});
