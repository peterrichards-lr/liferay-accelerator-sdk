import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LiferayService } from '../src/liferay/index.cjs';

describe('index.cjs Domain Method Delegations', () => {
  let liferayService;
  let mockCtx;

  beforeEach(() => {
    mockCtx = {
      logger: {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
      },
    };
    liferayService = new LiferayService(mockCtx);
  });

  it('delegates getPrimaryAccountId to rest service', async () => {
    vi.spyOn(liferayService.rest, 'getPrimaryAccountId').mockResolvedValue(
      20124
    );

    const config = { liferayUrl: 'http://localhost:8080' };
    const res = await liferayService.getPrimaryAccountId(config);

    expect(liferayService.rest.getPrimaryAccountId).toHaveBeenCalledWith(
      config
    );
    expect(res).toBe(20124);
  });

  it('delegates getAccountCount to rest service', async () => {
    vi.spyOn(liferayService.rest, 'getAccountCount').mockResolvedValue(12);

    const config = { liferayUrl: 'http://localhost:8080' };
    const res = await liferayService.getAccountCount(config);

    expect(liferayService.rest.getAccountCount).toHaveBeenCalledWith(config);
    expect(res).toBe(12);
  });

  it('delegates getImportTask to rest service', async () => {
    const mockTask = { id: 99, executeStatus: 'COMPLETED' };
    vi.spyOn(liferayService.rest, 'getImportTask').mockResolvedValue(mockTask);

    const config = { liferayUrl: 'http://localhost:8080' };
    const res = await liferayService.getImportTask(config, 99);

    expect(liferayService.rest.getImportTask).toHaveBeenCalledWith(config, 99);
    expect(res).toEqual(mockTask);
  });

  it('delegates getImportTaskFailedItemReport to rest service', async () => {
    const mockReport = [{ item: 'fail' }];
    vi.spyOn(
      liferayService.rest,
      'getImportTaskFailedItemReport'
    ).mockResolvedValue(mockReport);

    const config = { liferayUrl: 'http://localhost:8080' };
    const res = await liferayService.getImportTaskFailedItemReport(config, 99);

    expect(
      liferayService.rest.getImportTaskFailedItemReport
    ).toHaveBeenCalledWith(config, 99);
    expect(res).toEqual(mockReport);
  });
});
