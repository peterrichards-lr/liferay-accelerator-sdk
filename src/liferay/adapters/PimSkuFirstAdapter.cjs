const LegacyProductFirstAdapter = require('./LegacyProductFirstAdapter.cjs');

class PimSkuFirstAdapter extends LegacyProductFirstAdapter {
  constructor(restService, pathsProfile) {
    super(restService, pathsProfile);
  }
}

module.exports = PimSkuFirstAdapter;
