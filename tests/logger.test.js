import { describe, it, expect, beforeEach, vi } from 'vitest';
const { logger } = require('../src/utils/logger.cjs');

describe('utils/logger', () => {
  beforeEach(() => {
    // Avoid noisy console/file output and file system side effects while
    // asserting on the emitted JSON shape.
    vi.spyOn(logger, '_writeToFile').mockImplementation(() => {});
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  describe('_asJsonLine', () => {
    it('promotes correlationId/userId to top-level fields and does not duplicate them in nested meta (GH #110)', () => {
      const meta = {
        correlationId: 'abc',
        userId: '123',
        other: 'x',
      };

      const json = logger._asJsonLine(
        'INFO',
        'test message',
        logger._nowIso(),
        meta
      );
      const parsed = JSON.parse(json);

      // Promoted to top-level fields.
      expect(parsed.correlationId).toBe('abc');
      expect(parsed.userId).toBe('123');
      expect(parsed.other).toBe('x');

      // The only place correlationId/userId/other may legitimately live in
      // the parsed object is at the top level - there must be no nested
      // "meta" (or any other) object still carrying duplicate copies of
      // correlationId/userId.
      const nestedValues = Object.keys(parsed)
        .filter((key) => !['correlationId', 'userId', 'other'].includes(key))
        .map((key) => parsed[key])
        .filter((value) => value && typeof value === 'object');

      nestedValues.forEach((nested) => {
        expect(nested).not.toHaveProperty('correlationId');
        expect(nested).not.toHaveProperty('userId');
      });
    });

    it('still removes operation from any nested meta once promoted to top-level', () => {
      const meta = {
        correlationId: 'corr-1',
        userId: 'user-1',
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

      expect(parsed.correlationId).toBe('corr-1');
      expect(parsed.userId).toBe('user-1');
      expect(parsed.operation).toBe('doThing');
      expect(parsed.extra).toBe('value');
    });

    it('matches key comparisons case-insensitively regardless of literal casing', () => {
      // Directly targets the bug: the key-deletion loop lowercases the
      // caller's key before comparing, so the comparison literals must also
      // be lowercase or the match can never succeed.
      const meta = {
        CorrelationId: 'should-not-appear-twice',
        UserId: 'should-not-appear-twice-either',
      };

      const json = logger._asJsonLine(
        'INFO',
        'test message',
        logger._nowIso(),
        meta
      );

      // Once promoted, the original mixed-case keys must be gone from the
      // emitted JSON entirely (not merely renamed) - i.e. they were
      // successfully deleted from meta before being spread onto logEntry.
      expect(json).not.toContain('CorrelationId');
      expect(json).not.toContain('UserId');
    });
  });
});
