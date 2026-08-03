const fs = require('fs');
const { logger } = require('../src/utils/logger.cjs');
const { ENV } = require('../src/utils/constants.cjs');

describe('utils/logger', () => {
  const originalLevel = logger.loggingLevel;
  const originalPretty = ENV.LOGGER_PRETTY;

  afterEach(() => {
    vi.restoreAllMocks();
    logger.loggingLevel = originalLevel;
    ENV.LOGGER_PRETTY = originalPretty;
  });

  describe('determineLoggingLevel', () => {
    it('should map named levels to their numeric weight', () => {
      expect(logger.determineLoggingLevel('trace')).toBe(4);
      expect(logger.determineLoggingLevel('debug')).toBe(3);
      expect(logger.determineLoggingLevel('info')).toBe(2);
      expect(logger.determineLoggingLevel('warn')).toBe(1);
    });

    it('should default unknown/missing levels to 0', () => {
      expect(logger.determineLoggingLevel('unknown')).toBe(0);
      expect(logger.determineLoggingLevel(undefined)).toBe(0);
    });
  });

  describe('level gating', () => {
    it('isTraceEnabled/isDebugEnabled/isInfoEnabled/isWarnEnabled reflect loggingLevel', () => {
      logger.loggingLevel = 4;
      expect(logger.isTraceEnabled()).toBe(true);
      expect(logger.isDebugEnabled()).toBe(true);
      expect(logger.isInfoEnabled()).toBe(true);
      expect(logger.isWarnEnabled()).toBe(true);

      logger.loggingLevel = 1;
      expect(logger.isTraceEnabled()).toBe(false);
      expect(logger.isDebugEnabled()).toBe(false);
      expect(logger.isInfoEnabled()).toBe(false);
      expect(logger.isWarnEnabled()).toBe(true);

      logger.loggingLevel = 0;
      expect(logger.isWarnEnabled()).toBe(false);
    });

    it('isErrorEnabled and isSuccessEnabled are always true', () => {
      logger.loggingLevel = 0;
      expect(logger.isErrorEnabled()).toBe(true);
      expect(logger.isSuccessEnabled()).toBe(true);
    });

    it('should suppress trace/debug/info/warn below the configured level', () => {
      const spy = vi.spyOn(logger, '_log').mockImplementation(() => {});
      logger.loggingLevel = 0; // Nothing but error/success enabled

      logger.trace('trace message');
      logger.debug('debug message');
      logger.info('info message');
      logger.warn('warn message');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit trace/debug/info/warn once the level allows it', () => {
      const spy = vi.spyOn(logger, '_log').mockImplementation(() => {});
      logger.loggingLevel = 4;

      logger.trace('trace message');
      logger.debug('debug message');
      logger.info('info message');
      logger.warn('warn message');

      expect(spy).toHaveBeenCalledWith('TRACE', 'trace message', {});
      expect(spy).toHaveBeenCalledWith('DEBUG', 'debug message', {});
      expect(spy).toHaveBeenCalledWith('INFO', 'info message', {});
      expect(spy).toHaveBeenCalledWith('WARN', 'warn message', {});
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('error() and success() always call _log regardless of level', () => {
      const spy = vi.spyOn(logger, '_log').mockImplementation(() => {});
      logger.loggingLevel = 0;

      logger.error('error message');
      logger.success('success message');

      expect(spy).toHaveBeenCalledWith('ERROR', 'error message', {});
      expect(spy).toHaveBeenCalledWith('SUCCESS', 'success message', {});
    });

    it('log() delegates to trace()', () => {
      const spy = vi.spyOn(logger, 'trace').mockImplementation(() => {});
      logger.log('delegated message', { a: 1 });
      expect(spy).toHaveBeenCalledWith('delegated message', { a: 1 });
    });
  });

  describe('_asJsonLine', () => {
    it('should produce a JSON string with the expected shape', () => {
      const json = logger._asJsonLine(
        'info',
        'Hello world',
        '2024-01-01T00:00:00.000Z',
        {
          userId: 'user-1',
          operation: 'test-op',
          extra: 'value',
        }
      );

      const parsed = JSON.parse(json);
      expect(parsed.level).toBe('INFO');
      expect(parsed.message).toBe('Hello world');
      expect(parsed.timestamp).toBe('2024-01-01T00:00:00.000Z');
      expect(parsed.userId).toBe('user-1');
      expect(parsed.operation).toBe('test-op');
      expect(parsed.extra).toBe('value');
      expect(parsed.environment).toBe(ENV.NODE_ENV);
      expect(parsed.service).toBe(ENV.SERVICE_NAME);
    });

    it('should default correlationId to "system" when not provided', () => {
      const json = logger._asJsonLine(
        'info',
        'msg',
        '2024-01-01T00:00:00.000Z'
      );
      const parsed = JSON.parse(json);
      expect(parsed.correlationId).toBe('system');
    });

    it('should strip null/undefined fields from the log entry', () => {
      const json = logger._asJsonLine(
        'info',
        'msg',
        '2024-01-01T00:00:00.000Z',
        {
          userId: null,
        }
      );
      const parsed = JSON.parse(json);
      expect(parsed.userId).toBeUndefined();
      expect(Object.prototype.hasOwnProperty.call(parsed, 'userId')).toBe(
        false
      );
    });

    it('should inline queryForGraphiQL as a literal template string', () => {
      const query = 'query {\n  products { id }\n}';
      const json = logger._asJsonLine(
        'info',
        'msg',
        '2024-01-01T00:00:00.000Z',
        {
          queryForGraphiQL: query,
        }
      );

      expect(json).toContain('`' + query + '`');
      expect(json).not.toContain(JSON.stringify(query));
    });

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

  describe('_asPretty', () => {
    it('should include timestamp, level, and normalized message', () => {
      const pretty = logger._asPretty(
        'INFO',
        'Hello\n   world',
        '2024-01-01T00:00:00.000Z',
        {}
      );

      expect(pretty).toContain('2024-01-01T00:00:00.000Z');
      expect(pretty).toContain('INFO');
      expect(pretty).toContain('Hello\nworld');
    });

    it('should append a meta block when extra meta keys are present', () => {
      const pretty = logger._asPretty(
        'WARN',
        'message',
        '2024-01-01T00:00:00.000Z',
        { correlationId: 'abc', foo: 'bar' }
      );

      expect(pretty).toContain('meta:');
      expect(pretty).toContain('foo');
    });

    it('should render queryForGraphiQL raw instead of via util.inspect', () => {
      const query = 'query { products { id } }';
      const pretty = logger._asPretty(
        'INFO',
        'message',
        '2024-01-01T00:00:00.000Z',
        { queryForGraphiQL: query }
      );

      expect(pretty).toContain('queryForGraphiQL:');
      expect(pretty).toContain(query);
    });

    it('should use util.inspect for non-string messages', () => {
      const pretty = logger._asPretty(
        'INFO',
        { some: 'object' },
        '2024-01-01T00:00:00.000Z',
        {}
      );
      expect(pretty).toContain('some');
    });
  });

  describe('_writeToFile', () => {
    it('should append the log entry to the configured log file', () => {
      const spy = vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
      logger._writeToFile('a log line');
      expect(spy).toHaveBeenCalledWith(logger.logFile, 'a log line\n');
    });

    it('should swallow file write errors instead of throwing', () => {
      vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {
        throw new Error('disk full');
      });
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => logger._writeToFile('a log line')).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to write to log file:',
        'disk full'
      );
    });
  });

  describe('_log', () => {
    it('should write JSON to stdout when LOGGER_PRETTY is disabled', () => {
      ENV.LOGGER_PRETTY = false;
      vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
      const writeSpy = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);

      logger._log('INFO', 'hello', {});

      expect(writeSpy).toHaveBeenCalled();
      const written = writeSpy.mock.calls[0][0];
      expect(() => JSON.parse(written)).not.toThrow();
    });

    it('should write pretty output to stdout when LOGGER_PRETTY is enabled', () => {
      ENV.LOGGER_PRETTY = true;
      vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
      const writeSpy = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);

      logger._log('INFO', 'hello', {});

      expect(writeSpy).toHaveBeenCalled();
      const written = writeSpy.mock.calls[0][0];
      expect(() => JSON.parse(written)).toThrow();
    });

    it('should route ERROR and WARN messages to stderr', () => {
      vi.spyOn(fs, 'appendFileSync').mockImplementation(() => {});
      const stdoutSpy = vi
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
      const stderrSpy = vi
        .spyOn(process.stderr, 'write')
        .mockImplementation(() => true);

      logger._log('ERROR', 'boom', {});

      expect(stderrSpy).toHaveBeenCalled();
      expect(stdoutSpy).not.toHaveBeenCalled();
    });
  });

  describe('EPIPE handling', () => {
    it('should swallow EPIPE errors on stdout without logging', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const err = new Error('broken pipe');
      err.code = 'EPIPE';

      expect(() => process.stdout.emit('error', err)).not.toThrow();
      expect(consoleSpy).not.toHaveBeenCalledWith('stdout error:', err);
    });

    it('should log non-EPIPE errors on stdout', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const err = new Error('something else');
      err.code = 'OTHER';

      process.stdout.emit('error', err);
      expect(consoleSpy).toHaveBeenCalledWith('stdout error:', err);
    });

    it('should swallow EPIPE errors on stderr without logging', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const err = new Error('broken pipe');
      err.code = 'EPIPE';

      expect(() => process.stderr.emit('error', err)).not.toThrow();
      expect(consoleSpy).not.toHaveBeenCalledWith('stderr error:', err);
    });

    it('should log non-EPIPE errors on stderr', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const err = new Error('something else');
      err.code = 'OTHER';

      process.stderr.emit('error', err);
      expect(consoleSpy).toHaveBeenCalledWith('stderr error:', err);
    });
  });

  describe('httpRequest / aiOperation / errorWithStack', () => {
    it('httpRequest should warn on 4xx/5xx and trace otherwise', () => {
      const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
      const traceSpy = vi.spyOn(logger, 'trace').mockImplementation(() => {});

      const req = {
        correlationId: 'cid',
        method: 'GET',
        path: '/foo',
        get: () => 'agent',
        ip: '127.0.0.1',
      };

      logger.httpRequest(req, { statusCode: 404 }, 12);
      expect(warnSpy).toHaveBeenCalled();
      expect(traceSpy).not.toHaveBeenCalled();

      logger.httpRequest(req, { statusCode: 200 }, 12);
      expect(traceSpy).toHaveBeenCalled();
    });

    it('aiOperation should log an info message with AI metadata', () => {
      const infoSpy = vi.spyOn(logger, 'info').mockImplementation(() => {});
      logger.aiOperation('generate', 'gpt-4o', 100, 0.01);
      expect(infoSpy).toHaveBeenCalledWith(
        'AI operation completed: generate',
        expect.objectContaining({
          aiModel: 'gpt-4o',
          aiTokens: 100,
          aiCost: 0.01,
        })
      );
    });

    it('errorWithStack should log the error message with name/stack/code', () => {
      const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
      const err = new Error('boom');
      err.code = 'E_BOOM';

      logger.errorWithStack(err);

      expect(errorSpy).toHaveBeenCalledWith(
        'boom',
        expect.objectContaining({
          errorName: 'Error',
          errorCode: 'E_BOOM',
        })
      );
    });
  });

  describe('close', () => {
    it('should resolve without error', async () => {
      await expect(logger.close()).resolves.toBeUndefined();
    });
  });

  describe('logging methods (meta mutation safety, GH #83)', () => {
    beforeEach(() => {
      // Avoid noisy console/file output and file system side effects
      // while asserting on meta object mutation behavior.
      vi.spyOn(logger, '_writeToFile').mockImplementation(() => {});
      vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
      vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    });

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
