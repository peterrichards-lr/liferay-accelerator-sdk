/**
 * The parts of a failed Liferay request worth putting in a log line.
 *
 * HttpCoreService already attaches everything needed to diagnose a rejection -
 * `status`, `response.data`, `userMessage`, `problem` - but every caller logged
 * only `error.message`, which for a REST failure is the operation's friendly
 * name. So a run died with "Failed to create option" while the response said
 * `optionValues[0].name must not be null`, and the reason had to be recovered
 * by reproducing the call by hand.
 *
 * Liferay does not write validation rejections to its own log either: a 400
 * exists only in the response body. If the caller drops it, nothing anywhere
 * records why the write failed.
 */

// Long enough for a validation message listing several fields, short enough
// that a log line stays readable.
const MAX_DETAIL = 600;

function stringify(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return value.slice(0, MAX_DETAIL);
  }

  try {
    return JSON.stringify(value).slice(0, MAX_DETAIL);
  } catch {
    return String(value).slice(0, MAX_DETAIL);
  }
}

/**
 * Returns fields to spread into a log call. Only what is present is included,
 * so a plain Error adds nothing and a log line never gains empty keys.
 */
function describeRequestError(error) {
  if (!error || typeof error !== 'object') {
    return {};
  }

  const described = {};
  const status = error.status ?? error.statusCode ?? error.response?.status;

  if (status !== undefined) {
    described.status = status;
  }

  if (error.operation) {
    described.operation = error.operation;
  }

  // What Liferay actually said. `problem` is its structured form where the
  // endpoint provides one; `response.data` is the raw body otherwise.
  const detail = stringify(error.problem ?? error.response?.data);

  if (detail) {
    described.liferayDetail = detail;
  }

  // Distinct from `message`, which is the operation's friendly name for a REST
  // failure and so says nothing a reader does not already know.
  if (error.userMessage && error.userMessage !== error.message) {
    described.userMessage = error.userMessage;
  }

  if (error.networkCode) {
    described.networkCode = error.networkCode;
  }

  return described;
}

module.exports = { MAX_DETAIL, describeRequestError };
