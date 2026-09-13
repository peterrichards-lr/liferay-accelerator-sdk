/**
 * Statuses tolerated per operation, rather than surfaced as errors.
 *
 * Keys must match an op label a call site actually passes. Ops ending in
 * `:list` are also produced dynamically (`${entityName}:list` in
 * src/liferay/index.cjs). An entry naming an op nothing emits is dead
 * configuration - it looks like 404 tolerance while providing none - so
 * tests/rest.test.js asserts every key is reachable.
 */
const SOFT_STATUS_BY_OP = {
  'accounts:list': [404],
  'products:list': [404],
  'orders:list': [404],
  'import-task': [404],
  'options:list': [404],
  'pricelists:list': [404],
  'get-price-list-by-erc': [404],
  'get-account-by-erc': [404],
  'get-sku-by-erc': [404],
  'specifications:list': [404],
  'optionCategories:list': [404],
  'warehouse:items': [404],
  'price-entries:list': [404],
  'pricelists:batch-delete': [403, 404],
  'promotions:batch-delete': [403, 404],
  'products:batch-delete': [403, 404],
  'accounts:batch-delete': [400, 403, 404],
  'account-groups:batch-delete': [400, 403, 404],
  'orders:batch-delete': [400, 403, 404],
  'warehouses:batch-delete': [403, 404],
  'inventory:batch-delete': [403, 404],
  'specifications:batch-delete': [403, 404],
  'options:batch-delete': [403, 404],
  'optionCategories:batch-delete': [403, 404],
};

/**
 * The feature flag that gates each operation, and how Liferay classifies it.
 *
 * Liferay gates a headless resource in one of two places, and the two look
 * nothing alike from the outside:
 *
 *   - at registration, so the route is absent and the request 404s. That is
 *     LPD-35443, which `testConnection` already probes for.
 *   - inside the resource method, as `_checkFeatureFlag()`, which throws
 *     `UnsupportedOperationException` and surfaces as **400**.
 *
 * The second shape is why #250 was first diagnosed as an unimplemented
 * endpoint: `getSiteStyleBooksPage` is fully implemented, and its first
 * instruction is a flag check. Nothing a caller sends produces that exception,
 * so a 400 naming it is always the instance's capability being off - never a
 * malformed request - but the response body does not say which flag, so the
 * mapping has to be declared here.
 *
 * Keys are op labels, matched exactly and then by prefix, so a family of ops
 * sharing a resource needs one entry. Measured against DXP 2026.Q1.12-LTS by
 * decompiling `_checkFeatureFlag` in each resource; the flag a release gates on
 * can change, which is why the message names it as the usual gate rather than a
 * certainty.
 */
const FEATURE_FLAG_BY_OP = {
  'get-style-books': { flag: 'LPD-56718', tier: 'Beta' },
  getSiteStyleBooksPage: { flag: 'LPD-56718', tier: 'Beta' },
  'get-page-specifications': { flag: 'LPD-74328', tier: 'Developer' },
  'get-page-experiences': { flag: 'LPD-74328', tier: 'Developer' },
  'get-page-elements': { flag: 'LPD-74328', tier: 'Developer' },
  'update-page-element': { flag: 'LPD-74328', tier: 'Developer' },
  'get-widget-instances': { flag: 'LPD-74328', tier: 'Developer' },
};

/**
 * The flag gating an op, if one is known.
 *
 * @param {string} op The operation label.
 * @returns {{flag: string, tier: string}|null}
 */
function featureFlagForOp(op) {
  if (!op) return null;
  return FEATURE_FLAG_BY_OP[op] || null;
}

module.exports = {
  SOFT_STATUS_BY_OP,
  FEATURE_FLAG_BY_OP,
  featureFlagForOp,
};
