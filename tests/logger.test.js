import { describe, it, expect, beforeEach, vi } from 'vitest';
const { logger } = require('../src/utils/logger.cjs');

describe('utils/logger', () => {
  beforeEach(() => {
    // Avoid noisy console/file output and file system side effects
    // while asserting on meta object mutation behavior.
    vi.spyOn(logger, '_writeToFile').mockImplementation(() => {});
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  describe('_asJsonLine', () => {
    it('does not mutate the caller-supplied meta object (GH #83)', () => {
      const meta = {
        correlationId: 'corr-123',
        userId: 'user-456',
        operation: 'doThing',
        extra: 'value',
      };
      const metaSnapshot = { ...meta };

      logger._asJsonLine('INFO', 'test message', logger._nowIso(), meta);

      expect(meta).toEqual(metaSnapshot);
    });

    it('still promotes correlationId/userId/operation to the top-level JSON', () => {
      const meta = {
        correlationId: 'corr-123',
        userId: 'user-456',
        operation: 'doThing',
        extra: 'value',
      };

      const json = logger._asJsonLine(
        'INFO',
        'test message',
        logger._nowIso(),
        meta
      );
      const parsed = JSON.parse(json);

      expect(parsed.correlationId).toBe('corr-123');
      expect(parsed.userId).toBe('user-456');
      expect(parsed.operation).toBe('doThing');
      expect(parsed.extra).toBe('value');
    });
  });

  describe('logging methods', () => {
    it('info() does not mutate the meta object passed in by the caller', () => {
      const meta = {
        correlationId: 'corr-abc',
        userId: 'user-xyz',
        operation: 'someOperation',
        foo: 'bar',
      };
      const metaSnapshot = { ...meta };

      logger.info('hello world', meta);

      expect(meta).toEqual(metaSnapshot);
    });

    it('allows the same meta object to be reused across multiple log calls', () => {
      const meta = {
        correlationId: 'corr-reuse',
        userId: 'user-reuse',
        operation: 'reusedOperation',
      };

      logger.info('first call', meta);
      logger.info('second call', meta);

      expect(meta.correlationId).toBe('corr-reuse');
      expect(meta.userId).toBe('user-reuse');
      expect(meta.operation).toBe('reusedOperation');
    });

    it('error() does not mutate the meta object passed in by the caller', () => {
      const meta = {
        correlationId: 'corr-err',
        userId: 'user-err',
        operation: 'errorOperation',
      };
      const metaSnapshot = { ...meta };

      logger.error('boom', meta);

      expect(meta).toEqual(metaSnapshot);
    });
  });
});
