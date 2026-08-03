const { Cache } = require('memory-cache');
const LegacyProductFirstAdapter = require('./LegacyProductFirstAdapter.cjs');
const PimSkuFirstAdapter = require('./PimSkuFirstAdapter.cjs');
const legacyProfile = require('../../utils/profiles/legacyProfile.cjs');
const { MIN } = require('../../utils/ttl.cjs');

// A transient probe failure (network blip, momentary 5xx, etc.) should not
// permanently lock a tenant into the Legacy adapter for the lifetime of the
// process. Retry the probe a few times before giving up, and if it still
// fails, cache the Legacy fallback for a short TTL only so the tenant gets
// re-probed soon and can self-heal once the transient issue clears. A
// successful PIM detection is stable for the life of the process, so it is
// cached indefinitely (no TTL) to avoid needless re-probing.
const PROBE_RETRY_ATTEMPTS = 3;
const PROBE_FAILURE_TTL_MS = MIN(5);

class CatalogAdapterFactory {
  constructor() {
    this.cache = new Cache();
  }

  async getAdapter(restService, config) {
    const cacheKey = config.liferayUrl || 'default';
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let adapter;
    let ttl;
    try {
      // Probing connection configuration (non-blocking, retried a few
      // times to ride out transient blips before falling back).
      await restService._get(
        config,
        '/o/headless-pim/v1.0/openapi.json',
        'probe-pim-capability',
        'Probe PIM Capability',
        { maxRetries: PROBE_RETRY_ATTEMPTS }
      );

      // PimSkuFirstAdapter is currently identical to LegacyProductFirstAdapter
      // (see #78) — this branch only future-proofs adapter *identity* for #3,
      // it does not yet change behavior for PIM-enabled instances.
      adapter = new PimSkuFirstAdapter(restService, legacyProfile);
      // Successful PIM detection is stable; cache indefinitely.
      ttl = undefined;
    } catch (_e) {
      // Fallback silently to Legacy Product-First, but only cache this
      // result briefly so a transient failure doesn't permanently
      // misconfigure the tenant until the process restarts.
      adapter = new LegacyProductFirstAdapter(restService, legacyProfile);
      ttl = PROBE_FAILURE_TTL_MS;
    }

    this.cache.put(cacheKey, adapter, ttl);
    return adapter;
  }
}

module.exports = CatalogAdapterFactory;
