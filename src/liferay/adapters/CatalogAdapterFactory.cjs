const LegacyProductFirstAdapter = require('./LegacyProductFirstAdapter.cjs');
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

      // When PimSkuFirstAdapter is written in Phase 2, we will load it here.
      // For now, if the PIM API is detected, we fallback to legacy adapter
      // to guarantee zero regressions.
      adapter = new LegacyProductFirstAdapter(restService, legacyProfile);
    } catch (_e) {
      // Fallback silently to Legacy Product-First
      adapter = new LegacyProductFirstAdapter(restService, legacyProfile);
    }

    this.cache.set(cacheKey, adapter);
    return adapter;
  }
}

module.exports = CatalogAdapterFactory;
