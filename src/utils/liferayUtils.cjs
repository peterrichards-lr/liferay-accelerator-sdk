/**
 * Utility functions for processing Liferay API responses (REST and GraphQL).
 *
 * The distinction these helpers exist to keep is between a collection that is
 * empty and a response that is not a collection at all (#277). Before that
 * issue both answered `[]`, so `undefined`, an error envelope, a page whose
 * `items` is an object, and a collection field under a different name were all
 * reported as "this collection is empty" - and every guard a consumer had
 * written sat above the layer where the evidence was thrown away.
 *
 * `parseCollection` is the one place that decision is made. `asItems` keeps the
 * permissive contract its callers were written against, and now says so in the
 * log instead of swallowing it; `asItemsStrict` refuses to answer, and is what
 * the paged readers use, because a pager that reads an unparseable page as
 * empty stops early and reports a partial collection as a complete one.
 */

const { logger: defaultLogger } = require('./logger.cjs');

/**
 * Error code carried by every failure to parse a collection response (#277).
 *
 * Exported so a consumer can tell this apart from a transport failure without
 * matching on a message.
 */
const UNPARSEABLE_COLLECTION = 'UNPARSEABLE_COLLECTION';

/** Field names listed when reporting an envelope nothing recognised. */
const MAX_REPORTED_FIELDS = 5;

function typeName(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  if (typeof value === 'object') return 'an object';
  return `a ${typeof value}`;
}

/**
 * Describe what arrived, without quoting it.
 *
 * The field names are the useful part - a collection served under a different
 * name is one of the shapes this defect hides - so they are named while the
 * values, which may carry customer data or a token, are not.
 *
 * @param {any} data The response that could not be read as a collection.
 * @returns {string} A description safe to put in a log line or an error.
 */
function describeResponse(data) {
  if (data === undefined) return 'undefined';
  if (data === null) return 'null';
  if (typeof data !== 'object') return typeName(data);

  if (data.items !== undefined) {
    return `an object whose "items" is ${typeName(data.items)}`;
  }

  const fields = Object.keys(data);
  if (fields.length === 0) return 'an object with no fields';

  const shown = fields.slice(0, MAX_REPORTED_FIELDS).join(', ');
  const remainder =
    fields.length > MAX_REPORTED_FIELDS
      ? `, and ${fields.length - MAX_REPORTED_FIELDS} more`
      : '';

  return `an object with no "items" (fields: ${shown}${remainder})`;
}

/**
 * Build the error raised when a response cannot be read as a collection.
 *
 * @param {string} reason Output of `describeResponse`.
 * @param {string} [op] Operation name, for correlating with request logs.
 * @returns {Error}
 */
function unparseableCollectionError(reason, op) {
  const where = op ? ` (${op})` : '';
  const error = new Error(
    `Unparseable collection response${where}: expected an array, or an envelope with an "items" array, but received ${reason}. ` +
      'This is not an empty collection - nothing here could read it.'
  );
  error.name = 'UnparseableCollectionError';
  Object.assign(error, {
    code: UNPARSEABLE_COLLECTION,
    op: op || null,
    received: reason,
  });
  return error;
}

/**
 * Whether an error - or anything it was raised from - is this failure.
 *
 * The chain is walked because a reader that wraps its failures in its own
 * message (`getOptionCategoryByKey` does) would otherwise hide the code from
 * the consumer deciding whether a read can be treated as "none found".
 *
 * @param {any} error The error to test.
 * @returns {boolean}
 */
function isUnparseableCollection(error) {
  for (let current = error, depth = 0; current && depth < 10; depth += 1) {
    if (current.code === UNPARSEABLE_COLLECTION) return true;
    current = current.cause;
  }
  return false;
}

/**
 * Read a Liferay response as a collection, and say whether it was one.
 *
 * `parsed: false` is the state the SDK used to lose. It is not an empty
 * collection; it is a response no reader here understood, and a caller that
 * treats the two alike is reporting an absent value as a known one.
 *
 * @param {any} data The response data from Liferay.
 * @returns {{parsed: boolean, items: Array, totalCount: number|null, reason: string|null}}
 *   `totalCount` is the number the server reported, or `null` when it reported
 *   none - never a substitute count invented here.
 */
function parseCollection(data) {
  const totalCount =
    typeof data?.totalCount === 'number'
      ? data.totalCount
      : typeof data?.items?.totalCount === 'number'
        ? data.items.totalCount
        : null;

  if (Array.isArray(data)) {
    return { parsed: true, items: data, totalCount, reason: null };
  }

  if (data && typeof data === 'object' && Array.isArray(data.items)) {
    return { parsed: true, items: data.items, totalCount, reason: null };
  }

  return {
    parsed: false,
    items: [],
    totalCount,
    reason: describeResponse(data),
  };
}

/**
 * Extract items from a Liferay API response.
 * Handles both flat arrays and paginated response objects.
 *
 * A response that is neither still answers `[]`, because that is the contract
 * every existing call site was written against - but it is no longer silent,
 * and a caller that must not confuse the two cases has `asItemsStrict` or
 * `parseCollection` instead (#277).
 *
 * @param {any} data The response data from Liferay.
 * @param {object} [options]
 * @param {string} [options.op] Operation name, for correlating with request logs.
 * @param {object} [options.logger] Logger to use; defaults to the SDK logger.
 * @returns {Array} An array of items.
 */
function asItems(data, { op, logger } = {}) {
  const { parsed, items, reason } = parseCollection(data);

  if (!parsed) {
    (logger || defaultLogger).warn(
      `Unparseable collection response${op ? ` (${op})` : ''}: received ${reason}, reporting it as empty.`,
      {
        op: op || null,
        received: reason,
        unparseableCollection: true,
      }
    );
  }

  return items;
}

/**
 * Extract items from a Liferay API response, or refuse to answer.
 *
 * For a reader that terminates on an empty page - every pager in this SDK -
 * the difference between "this page is empty" and "this page could not be
 * read" is the difference between a complete collection and a truncated one
 * presented as complete.
 *
 * @param {any} data The response data from Liferay.
 * @param {object} [options]
 * @param {string} [options.op] Operation name, for correlating with request logs.
 * @returns {Array} An array of items.
 * @throws {Error} `UNPARSEABLE_COLLECTION` when the response is not a collection.
 */
function asItemsStrict(data, { op } = {}) {
  const { parsed, items, reason } = parseCollection(data);

  if (!parsed) {
    throw unparseableCollectionError(reason, op);
  }

  return items;
}

/**
 * Extract the total count from a Liferay API response.
 *
 * The count the server reported is used whenever it sent one, whatever the
 * rest of the envelope looks like. Falling back to the number of rows read is
 * only valid for a response that was read at all: a count of `0` for a
 * response nothing understood is the same wrong answer as an empty collection,
 * stated more confidently (#277).
 *
 * @param {any} data The response data from Liferay.
 * @param {object} [options]
 * @param {string} [options.op] Operation name, for correlating with request logs.
 * @returns {number} The total count of items.
 * @throws {Error} `UNPARSEABLE_COLLECTION` when the response carries no count
 *   and is not a collection.
 */
function asCount(data, { op } = {}) {
  const { parsed, items, totalCount, reason } = parseCollection(data);

  if (totalCount !== null) return totalCount;

  if (!parsed) {
    throw unparseableCollectionError(reason, op);
  }

  return items.length;
}

module.exports = {
  UNPARSEABLE_COLLECTION,
  asCount,
  asItems,
  asItemsStrict,
  isUnparseableCollection,
  parseCollection,
};
