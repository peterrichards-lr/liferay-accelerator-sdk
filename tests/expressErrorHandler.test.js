const {
  ErrorHandler,
  errorMiddleware,
} = require('../src/utils/expressErrorHandler.cjs');
const { logger } = require('../src/utils/logger.cjs');

function mockRes() {
  return {
    statusCode: null,
    body: null,
    headersSent: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function mockReq(overrides = {}) {
  return {
    url: '/api/test',
    method: 'GET',
    path: '/api/test',
    query: {},
    body: {},
    headers: {},
    ip: '127.0.0.1',
    correlationId: 'cid-1',
    get: () => 'test-agent',
    ...overrides,
  };
}

describe('utils/expressErrorHandler', () => {
  beforeEach(() => {
    vi.spyOn(logger, 'error').mockImplementation(() => {});
    vi.spyOn(logger, 'warn').mockImplementation(() => {});
    vi.spyOn(logger, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createError', () => {
    it('should build an Error with status and details attached', () => {
      const err = ErrorHandler.createError('bad things', 422, { a: 1 });
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('bad things');
      expect(err.status).toBe(422);
      expect(err.details).toEqual({ a: 1 });
    });

    it('should default status to 500 and details to null', () => {
      const err = ErrorHandler.createError('oops');
      expect(err.status).toBe(500);
      expect(err.details).toBeNull();
    });
  });

  describe('handleLiferayError - status-code branching', () => {
    const cases = [
      [400, 'Bad request:'],
      [401, 'Authentication failed'],
      [403, 'Access denied'],
      [404, 'Resource not found:'],
      [409, 'Conflict:'],
      [422, 'Validation error:'],
      [429, 'Rate limit exceeded'],
      [500, 'Liferay server error:'],
      [418, 'Liferay API error (418)'],
    ];

    it.each(cases)(
      'maps HTTP %i to the expected message/status',
      (status, expectedMessageFragment) => {
        const error = {
          response: { status, data: { title: 'Detail title' } },
          message: 'raw message',
        };

        const result = ErrorHandler.handleLiferayError(error, 'test-op');

        expect(result.status).toBe(status);
        expect(result.message).toContain(expectedMessageFragment);
      }
    );

    it('logs the offending request body on 400 errors', () => {
      const error = { response: { status: 400, data: { title: 'Invalid' } } };
      const requestBody = { foo: 'bar' };

      ErrorHandler.handleLiferayError(error, 'create-product', requestBody);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('400 BAD REQUEST'),
        { payload: requestBody }
      );
    });
  });

  describe('handleLiferayError - network errors', () => {
    it('maps ECONNREFUSED to a 503', () => {
      const error = { code: 'ECONNREFUSED', message: 'connect failed' };
      const result = ErrorHandler.handleLiferayError(error, 'test-op');
      expect(result.status).toBe(503);
      expect(result.message).toContain('Connection refused');
    });

    it('maps ETIMEDOUT to a 504', () => {
      const error = { code: 'ETIMEDOUT', message: 'timed out' };
      const result = ErrorHandler.handleLiferayError(error, 'test-op');
      expect(result.status).toBe(504);
      expect(result.message).toContain('timeout');
    });

    it('falls back to a generic 500 for unrecognized errors', () => {
      const error = { message: 'totally unknown' };
      const result = ErrorHandler.handleLiferayError(error, 'my-op');
      expect(result.status).toBe(500);
      expect(result.message).toBe('my-op failed: totally unknown');
    });
  });

  describe('handleBatchErrors', () => {
    it('should summarize errors by status/type', () => {
      const errors = [
        { status: 400, message: 'bad 1' },
        { status: 400, message: 'bad 2' },
        { status: 500, message: 'server err' },
        'plain string error',
      ];

      const summary = ErrorHandler.handleBatchErrors(errors, 'delete-batch');

      expect(summary.total).toBe(4);
      expect(summary.byType[400]).toBe(2);
      expect(summary.byType[500]).toBe(1);
      expect(summary.byType.unknown).toBe(1);
      expect(summary.messages).toContain('bad 1');
      expect(summary.messages).toContain('plain string error');
    });
  });

  describe('isRetryableError', () => {
    it('treats errors with no HTTP response as retryable', () => {
      expect(ErrorHandler.isRetryableError({})).toBe(true);
    });

    it('treats 5xx responses as retryable', () => {
      expect(ErrorHandler.isRetryableError({ response: { status: 500 } })).toBe(
        true
      );
      expect(ErrorHandler.isRetryableError({ response: { status: 503 } })).toBe(
        true
      );
    });

    it('treats 429 as retryable', () => {
      expect(ErrorHandler.isRetryableError({ response: { status: 429 } })).toBe(
        true
      );
    });

    it('treats other 4xx responses as non-retryable', () => {
      expect(ErrorHandler.isRetryableError({ response: { status: 400 } })).toBe(
        false
      );
      expect(ErrorHandler.isRetryableError({ response: { status: 404 } })).toBe(
        false
      );
    });
  });

  describe('shouldStopBatch', () => {
    it('returns false when error count is below the threshold', () => {
      expect(ErrorHandler.shouldStopBatch(new Array(10), 50)).toBe(false);
    });

    it('returns true once the error count reaches the threshold', () => {
      expect(ErrorHandler.shouldStopBatch(new Array(50), 50)).toBe(true);
      expect(ErrorHandler.shouldStopBatch(new Array(51), 50)).toBe(true);
    });

    it('defaults the threshold to 50', () => {
      expect(ErrorHandler.shouldStopBatch(new Array(49))).toBe(false);
      expect(ErrorHandler.shouldStopBatch(new Array(50))).toBe(true);
    });
  });

  describe('handleError (module-level override / express middleware)', () => {
    it('should respond with statusCode derived from error.statusCode', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('custom failure');
      error.statusCode = 418;

      ErrorHandler.handleError(error, req, res, () => {});

      expect(res.statusCode).toBe(418);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('custom failure');
      expect(res.body.correlationId).toBe('cid-1');
    });

    it('should infer 404 from message content when statusCode is absent', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('Product not found');

      ErrorHandler.handleError(error, req, res, () => {});
      expect(res.statusCode).toBe(404);
    });

    it('should infer 401 from message content', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('unauthorized access');

      ErrorHandler.handleError(error, req, res, () => {});
      expect(res.statusCode).toBe(401);
    });

    it('should infer 403 from message content', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('forbidden resource');

      ErrorHandler.handleError(error, req, res, () => {});
      expect(res.statusCode).toBe(403);
    });

    it('should default to 500 and log full request details when nothing matches', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('totally generic failure');

      ErrorHandler.handleError(error, req, res, () => {});

      expect(res.statusCode).toBe(500);
      expect(logger.error).toHaveBeenCalledWith(
        'Internal Server Error - Request Details:',
        expect.objectContaining({
          method: 'GET',
          url: '/api/test',
        })
      );
    });

    it('errorMiddleware should delegate to ErrorHandler.handleError', () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('delegated error');

      errorMiddleware(error, req, res, () => {});

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('delegated error');
    });
  });
});
