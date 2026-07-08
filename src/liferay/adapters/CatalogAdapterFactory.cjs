const LegacyProductFirstAdapter = require('./LegacyProductFirstAdapter.cjs');
const PimSkuFirstAdapter = require('./PimSkuFirstAdapter.cjs');
const legacyProfile = require('../../utils/profiles/legacyProfile.cjs');

class CatalogAdapterFactory {
  constructor() {
    this.cache = new Map();
  }

  async getAdapter(restService, config) {
    const cacheKey = config.liferayUrl || 'default';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let adapter;
    try {
      // Probing connection configuration (non-blocking, single attempt)
      await restService._get(
        config,
        '/o/headless-pim/v1.0/openapi.json',
        'probe-pim-capability',
        'Probe PIM Capability',
        { maxRetries: 1 }
      );

      adapter = new PimSkuFirstAdapter(restService, legacyProfile);
    } catch (_e) {
      // Fallback silently to Legacy Product-First
      adapter = new LegacyProductFirstAdapter(restService, legacyProfile);
    }

    this.cache.set(cacheKey, adapter);
    return adapter;
  }
}

module.exports = CatalogAdapterFactory;
