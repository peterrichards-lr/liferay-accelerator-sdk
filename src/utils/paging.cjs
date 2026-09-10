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
    (logger || defaultLogger).warn(
      `Truncated read (${op}): returned ${description.returned} of ${description.totalCount}. ` +
        'This reader returns a single page by design - page explicitly, or use a collecting reader, if the whole set is required.',
      {
        op,
        ...description,
        ...meta,
      }
    );
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

  (logger || defaultLogger).warn(
    `Truncated read (${op}): stopped after ${maxPages} pages with ${items.length} of ${totalCount} rows. ` +
      'The instance may be ignoring the page parameter.',
    {
      op,
      returned: items.length,
      totalCount,
      maxPages,
      truncated: true,
    }
  );

  return { items, totalCount };
}

module.exports = {
  DEFAULT_MAX_PAGES,
  DEFAULT_PAGE_SIZE,
  collectAllPages,
  describePage,
  warnIfTruncated,
};
