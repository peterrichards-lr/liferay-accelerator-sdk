const { handleServiceError } = require('../src/utils/serviceErrorHandler.cjs');

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
    method: 'POST',
    url: '/api/thing',
    ip: '127.0.0.1',
    get: () => 'test-agent',
    ...overrides,
  };
}

function mockLogger() {
  return { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() };
}

describe('utils/serviceErrorHandler', () => {
  describe('handleServiceError', () => {
    it('should respond with a generic 500 when the error has no message/status', () => {
      const res = mockRes();
      const logger = mockLogger();

      handleServiceError(res, logger, mockReq(), {}, 'do-thing', {});

      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe(
        'An unexpected error occurred. Please try again.'
      );
      expect(res.body.operation).toBe('do-thing');
      expect(res.body.errorReference).toBeDefined();
    });

    it('should prefer error.userMessage over error.message', () => {
      const res = mockRes();
      const logger = mockLogger();
      const error = { userMessage: 'friendly message', message: 'raw' };

      handleServiceError(res, logger, mockReq(), {}, 'op', error);

      expect(res.body.error).toBe('friendly message');
    });

    it('should use a plain string error as the message', () => {
      const res = mockRes();
      const logger = mockLogger();

      handleServiceError(res, logger, mockReq(), {}, 'op', 'raw string error');

      expect(res.body.error).toBe('raw string error');
    });

    it('should treat status 400 (from status/statusCode/response.status/VALIDATION_ERROR) as a validation error with 400 status', () => {
      const scenarios = [
        { status: 400, message: 'a' },
        { statusCode: 400, message: 'b' },
        { response: { status: 400 }, message: 'c' },
        { code: 'VALIDATION_ERROR', message: 'd' },
      ];

      for (const error of scenarios) {
        const res = mockRes();
        const logger = mockLogger();
        handleServiceError(res, logger, mockReq(), {}, 'op', error);
        expect(res.statusCode).toBe(400);
      }
    });

    it('should use error.status/statusCode when not a validation error, defaulting to 500', () => {
      const res1 = mockRes();
      handleServiceError(res1, mockLogger(), mockReq(), {}, 'op', {
        status: 404,
        message: 'not found',
      });
      expect(res1.statusCode).toBe(404);

      const res2 = mockRes();
      handleServiceError(res2, mockLogger(), mockReq(), {}, 'op', {
        message: 'generic',
      });
      expect(res2.statusCode).toBe(500);
    });

    it('should override the message for AI_KEY_MISSING errors', () => {
      const res = mockRes();
      const error = { code: 'AI_KEY_MISSING', message: 'irrelevant' };

      handleServiceError(res, mockLogger(), mockReq(), {}, 'op', error);

      expect(res.body.error).toContain('AI credentials not configured');
    });

    it('should override the message when the raw message mentions a missing AI API key', () => {
      const res = mockRes();
      const error = { message: 'AI API key not configured for provider X' };

      handleServiceError(res, mockLogger(), mockReq(), {}, 'op', error);

      expect(res.body.error).toContain('AI credentials not configured');
    });

    it('should prefer error.operation over the passed-in operation name', () => {
      const res = mockRes();
      const error = { message: 'x', operation: 'specific-op' };

      handleServiceError(res, mockLogger(), mockReq(), {}, 'generic-op', error);

      expect(res.body.operation).toBe('specific-op');
    });

    it('should log the operation failure with request + error details', () => {
      const res = mockRes();
      const logger = mockLogger();
      const error = new Error('boom');
      const req = mockReq();
      const config = { correlationId: 'cid-123', demoMode: true };

      handleServiceError(res, logger, req, config, 'op', error, {
        entityType: 'product',
      });

      expect(logger.error).toHaveBeenCalledWith(
        'Operation failed',
        expect.objectContaining({
          correlationId: 'cid-123',
          message: 'boom',
          name: 'Error',
          entityType: 'product',
          requestDetails: expect.objectContaining({
            method: 'POST',
            url: '/api/thing',
          }),
        })
      );
      expect(res.body.demo).toBe(true);
    });

    it('should not attempt to respond if headers were already sent', () => {
      const res = mockRes();
      res.headersSent = true;
      const jsonSpy = vi.spyOn(res, 'json');

      const result = handleServiceError(
        res,
        mockLogger(),
        mockReq(),
        {},
        'op',
        new Error('too late')
      );

      expect(jsonSpy).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should tolerate a request object missing get()/method/url', () => {
      const res = mockRes();
      expect(() =>
        handleServiceError(res, mockLogger(), {}, {}, 'op', new Error('x'))
      ).not.toThrow();
      expect(res.statusCode).toBe(500);
    });
  });
});
