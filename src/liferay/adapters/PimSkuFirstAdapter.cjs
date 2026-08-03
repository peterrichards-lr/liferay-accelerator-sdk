const LegacyProductFirstAdapter = require('./LegacyProductFirstAdapter.cjs');

// Intentional placeholder: real SKU-first behavior is blocked on the Liferay PIM
// OpenAPI spec (tracked in #3) and not yet implemented. Until then this is a
// pass-through identical to LegacyProductFirstAdapter, not a bug.
class PimSkuFirstAdapter extends LegacyProductFirstAdapter {
  constructor(restService, pathsProfile) {
    super(restService, pathsProfile);
  }
}

module.exports = PimSkuFirstAdapter;
