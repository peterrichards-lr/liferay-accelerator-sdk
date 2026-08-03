import { describe, it, expect, vi, beforeEach } from 'vitest';
const BatchOperationService = require('../src/liferay/rest/BatchOperationService.cjs');

describe('BatchOperationService._cacheItemERCs', () => {
  let service;
  let mockCache;
  let mockLogger;
  let mockCtx;

  beforeEach(() => {
    mockCache = {
      set: vi.fn(),
      get: vi.fn(),
    };
    mockLogger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      trace: vi.fn(),
    };
    mockCtx = {
      logger: mockLogger,
      cache: mockCache,
      config: {
        getCacheConfigCached: () => ({}),
        getBatchPollingConfigCached: () => ({}),
      },
    };
    service = new BatchOperationService(mockCtx, {});
  });

  it('stores item ERCs under the batch ERC, batch id, and session keys via ctx.cache', () => {
    const itemERCs = ['erc-1', 'erc-2'];

    service._cacheItemERCs(
      'batch-erc-123',
      'batch-id-456',
      itemERCs,
      'session-789'
    );

    expect(mockCache.set).toHaveBeenCalledWith(
      'erc:batch-erc-123:itemERCs',
      itemERCs,
      expect.any(Number)
    );
    expect(mockCache.set).toHaveBeenCalledWith(
      'batch:batch-id-456:itemERCs',
      itemERCs,
      expect.any(Number)
    );
    expect(mockCache.set).toHaveBeenCalledWith(
      'session:session-789:itemERCsByBatch:batch-erc-123',
      itemERCs,
      expect.any(Number)
    );
    expect(mockLogger.trace).toHaveBeenCalledWith(
      'cache:itemERCs:stored',
      expect.objectContaining({
        scopeERC: 'batch-erc-123',
        batchId: 'batch-id-456',
        sessionId: 'session-789',
        count: 2,
      })
    );
    // No error should ever be logged for a successful cache write.
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('caches by batch ERC only when no batch id or session id is available yet', () => {
    const itemERCs = ['erc-a'];

    service._cacheItemERCs('batch-erc-only', null, itemERCs);

    expect(mockCache.set).toHaveBeenCalledWith(
      'erc:batch-erc-only:itemERCs',
      itemERCs,
      expect.any(Number)
    );
    expect(mockCache.set).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when there are no item ERCs to cache', () => {
    service._cacheItemERCs('batch-erc-123', 'batch-id-456', [], 'session-789');
    service._cacheItemERCs(
      'batch-erc-123',
      'batch-id-456',
      null,
      'session-789'
    );

    expect(mockCache.set).not.toHaveBeenCalled();
  });

  it('warns (rather than throwing or silently swallowing) when ctx.cache is not configured', () => {
    const ctxWithoutCache = { logger: mockLogger, config: mockCtx.config };
    const serviceWithoutCache = new BatchOperationService(ctxWithoutCache, {});

    expect(() =>
      serviceWithoutCache._cacheItemERCs('batch-erc-123', null, ['erc-1'])
    ).not.toThrow();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('ctx.cache is not configured')
    );
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('does not reference a nonexistent PersistenceService.getInstance() API', () => {
    // Regression guard for #111: previously this method called
    // PersistenceService.getInstance() and methods that don't exist on
    // PersistenceService, which always threw and was silently swallowed.
    const PersistenceService = require('../src/services/persistenceService.cjs');
    expect(typeof PersistenceService.getInstance).toBe('undefined');

    // Calling _cacheItemERCs should never throw now that it uses ctx.cache
    // directly instead of the nonexistent PersistenceService singleton.
    expect(() =>
      service._cacheItemERCs(
        'batch-erc-123',
        'batch-id-456',
        ['erc-1'],
        'session-789'
      )
    ).not.toThrow();
  });
});
