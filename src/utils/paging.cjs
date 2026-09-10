/**
 * Paging helpers for Liferay's paged collection responses (#200).
 *
 * Every Liferay collection response carries `totalCount` next to `items`, so a
 * reader that keeps only the first page can always tell that it did. Before
 * #200 nothing looked: three catalog readers capped at three different sizes
 * (Liferay's default 20, a hardcoded 100, and whatever the caller passed) and
 * none of them said so, which is how a downstream consumer came to write
 * "SDK getCatalogs already handles pagination" over a total-delete discovery
 * path (AICA #865).
 *
 * Two shapes are supported deliberately, because both are legitimate:
 *   - `collectAllPages` for readers that promise the whole set;
 *   - `warnIfTruncated` for readers that return one page on purpose, so the
 *     truncation is on the record instead of being inferred by whoever
 *     eventually notices the missing rows.
 *
 * Every truncation the SDK notices goes through `warnTruncated` so that one
 * message shape and one set of structured fields (`op`, `returned`,
 * `totalCount`, `truncated`) covers all of them - a short page (#200), a page
 * ceiling (#200), and a row ceiling (#203).
 */

const { asItems, asCount } = require('./liferayUtils.cjs');
const { logger: defaultLogger } = require('./logger.cjs');

const DEFAULT_PAGE_SIZE = 100;

/**
 * Upper bound on pages fetched by `collectAllPages`.
 *
 * A Liferay instance that ignores the `page` parameter answers every request
 * with page one, and the loop below would then only stop once `totalCount`
 * had been reached by repetition - fetching the same rows over and over. The
 * ceiling turns that into a bounded read plus a warning.
 */
const DEFAULT_MAX_PAGES = 1000;

/**
 * Upper bound on rows held in memory by a collecting reader (#203).
 *
 * A ceiling exists so an unbounded read cannot exhaust the heap of whatever
 * process is doing the reading - usually a microservice with other work in
 * flight. That is the only reason it exists. It is *not* a statement about how
 * many rows a collection has, which is the mistake `_collectAllItems` used to
 * make when it returned its own cap as `totalCount`.
 *
 * The previous value was 5000, which is inside the plausible size of the
 * collections these readers serve: SKUs, price entries, accounts, and - once
 * `getEntries` lands (demo-accelerator #63) - arbitrary custom object entries,
 * which is user data where 5000 rows is unremarkable. A ceiling that ordinary
 * data reaches is a truncation waiting to happen, so it moves to 50,000: at the
 * default page size of 200 that is 250 requests, and at the widest rows these
 * readers return (a whole commerce product, a few KB) a few hundred MB - the
 * outer edge of what a default Node heap tolerates, and ten times the volume
 * any of the current callers has been observed to read.
 *
 * It is still a bound, it is still overridable per call, and since #203 it is
 * no longer silent: reaching it logs, sets `truncated`, and can be made to
 * throw.
 */
const DEFAULT_MAX_ITEMS = 50000;

/**
 * Log a truncated read in the one shape the SDK uses for all of them.
 *
 * The structured fields matter more than the prose: an operator greps `op` and
 * compares `returned` against `totalCount`, whatever it was that cut the read
 * short.
 *
 * @param {object} options
 * @param {string} options.op Operation name, for correlating with request logs.
 * @param {number} options.returned Rows the reader is returning.
 * @param {number} options.totalCount Rows Liferay says exist.
 * @param {string} options.detail Why the read stopped, and what to do about it.
 * @param {object} [options.logger] Logger to use; defaults to the SDK logger.
 * @param {object} [options.meta] Extra fields to attach to the warning.
 */
function warnTruncated({ op, returned, totalCount, detail, logger, meta }) {
  (logger || defaultLogger).warn(`Truncated read (${op}): ${detail}`, {
    op,
    returned,
    totalCount,
    truncated: true,
    ...meta,
  });
}

/**
 * Describe a page response against the total the server reported.
 *
 * @param {any} response A Liferay collection response, or a bare array.
 * @returns {{returned: number, totalCount: number, truncated: boolean}}
 */
function describePage(response) {
  const returned = asItems(response).length;
  const totalCount = asCount(response);
  return {
    returned,
    totalCount,
    truncated: returned < totalCount,
  };
}

/**
 * Log a warning when a single-page read answered with less than the whole set.
 *
 * Returns the description either way so a caller can act on it as well as log
 * it - a silent truncation is the defect, not the truncation itself.
 *
 * @param {any} response A Liferay collection response.
 * @param {object} options
 * @param {string} options.op Operation name, for correlating with request logs.
 * @param {object} [options.logger] Logger to use; defaults to the SDK logger.
 * @param {object} [options.meta] Extra fields to attach to the warning.
 * @returns {{returned: number, totalCount: number, truncated: boolean}}
 */
function warnIfTruncated(response, { op, logger, meta } = {}) {
  const description = describePage(response);

  if (description.truncated) {
    warnTruncated({
      op,
      ...description,
      detail:
        `returned ${description.returned} of ${description.totalCount}. ` +
        'This reader returns a single page by design - page explicitly, or use a collecting reader, if the whole set is required.',
      logger,
      meta,
    });
  }

  return description;
}

/**
 * Read every page of a Liferay collection.
 *
 * Transport-agnostic on purpose: `fetchPage` may go through the generated
 * client, `rest._get`, or anything else that answers with `{ items,
 * totalCount }`, which is what lets the facade and the commerce services share
 * one loop rather than growing a fifth private one.
 *
 * @param {(params: {page: number, pageSize: number}) => Promise<any>} fetchPage
 *   Fetches one page. Receives the page number and size to request.
 * @param {object} [options]
 * @param {number} [options.pageSize] Rows per request.
 * @param {number} [options.maxPages] Ceiling on requests; see DEFAULT_MAX_PAGES.
 * @param {string} [options.op] Operation name, used in the ceiling warning.
 * @param {object} [options.logger] Logger to use; defaults to the SDK logger.
 * @returns {Promise<{items: Array, totalCount: number}>}
 */
async function collectAllPages(
  fetchPage,
  {
    pageSize = DEFAULT_PAGE_SIZE,
    maxPages = DEFAULT_MAX_PAGES,
    op = 'collect-all-pages',
    logger,
  } = {}
) {
  const items = [];
  let totalCount = 0;
  let page = 1;

  while (page <= maxPages) {
    const response = await fetchPage({ page, pageSize });
    const pageItems = asItems(response);
    items.push(...pageItems);
    totalCount = asCount(response);

    if (pageItems.length === 0 || items.length >= totalCount) {
      return { items, totalCount: Math.max(totalCount, items.length) };
    }

    page++;
  }

  warnTruncated({
    op,
    returned: items.length,
    totalCount,
    detail:
      `stopped after ${maxPages} pages with ${items.length} of ${totalCount} rows. ` +
      'The instance may be ignoring the page parameter.',
    logger,
    meta: { maxPages },
  });

  return { items, totalCount };
}

module.exports = {
  DEFAULT_MAX_ITEMS,
  DEFAULT_MAX_PAGES,
  DEFAULT_PAGE_SIZE,
  collectAllPages,
  describePage,
  warnIfTruncated,
  warnTruncated,
};
