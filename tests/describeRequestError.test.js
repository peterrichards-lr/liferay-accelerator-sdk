const {
  describeRequestError,
} = require('../src/utils/describeRequestError.cjs');

/**
 * The error HttpCoreService throws for the failure that motivated this: an
 * option create rejected because the values had no names. The log said only
 * "Failed to create option" - the operation's friendly name - while the
 * response carried the reason.
 */
function optionCreateFailure() {
  const error = new Error('Failed to create option');
  error.name = 'LiferayRequestError';
  error.status = 400;
  error.statusText = 'Bad Request';
  error.operation = 'create-option';
  error.response = {
    data: 'optionValues[0].name must not be null\noptionValues[1].name must not be null',
    status: 400,
  };
  return error;
}

describe('describeRequestError', () => {
  it('surfaces the status and what Liferay actually said', () => {
    const described = describeRequestError(optionCreateFailure());

    expect(described.status).toBe(400);
    expect(described.operation).toBe('create-option');
    expect(described.liferayDetail).toContain('must not be null');
  });

  it('prefers the structured problem over the raw body', () => {
    const error = new Error('Failed to create product');
    error.status = 422;
    error.problem = { detail: 'baseSku is required', title: 'Validation' };
    error.response = { data: 'ignored when a problem is present' };

    expect(describeRequestError(error).liferayDetail).toContain(
      'baseSku is required'
    );
  });

  it('adds nothing for an ordinary Error', () => {
    // Spread into a log call, so an unrelated failure must not gain empty keys.
    expect(describeRequestError(new Error('boom'))).toEqual({});
  });

  it('tolerates a non-error', () => {
    for (const value of [null, undefined, 'a string', 42]) {
      expect(describeRequestError(value)).toEqual({});
    }
  });

  it('omits userMessage when it merely repeats the message', () => {
    const error = new Error('Failed to create option');
    error.userMessage = 'Failed to create option';

    expect(describeRequestError(error).userMessage).toBeUndefined();
  });

  it('keeps userMessage when it says something the message does not', () => {
    const error = new Error('Failed to create option');
    error.userMessage = 'The option key is already in use';

    expect(describeRequestError(error).userMessage).toBe(
      'The option key is already in use'
    );
  });

  it('reports a network failure that never reached Liferay', () => {
    const error = new Error('Request failed');
    error.networkCode = 'ECONNREFUSED';

    const described = describeRequestError(error);

    expect(described.networkCode).toBe('ECONNREFUSED');
    expect(described.status).toBeUndefined();
  });

  it('truncates a very large body rather than filling the log', () => {
    const error = new Error('Failed');
    error.status = 500;
    error.response = { data: 'x'.repeat(5000) };

    expect(describeRequestError(error).liferayDetail.length).toBeLessThan(1000);
  });

  it('falls back to response.status when status is absent', () => {
    const error = new Error('Failed');
    error.response = { data: 'nope', status: 404 };

    expect(describeRequestError(error).status).toBe(404);
  });
});
