import { describe, it, expect, afterEach, beforeEach } from 'vitest';

/**
 * `OAuthService` reads five settings as `ENV.OAUTH_*`, and they were never
 * defined on ENV — the names existed only in ABS_MIN, so every lookup was
 * `undefined` and `normalizeNumber` always took its literal fallback. Five
 * documented environment overrides that silently did nothing, in a service
 * whose timeouts and retry budget are exactly what an operator reaches for
 * when an instance starts timing out.
 *
 * Found from liferay-ai-commerce-accelerator#1243.
 */
const KEYS = [
  ['OAUTH_HTTP_TIMEOUT_MS', 15000, 3000],
  ['OAUTH_MAX_RETRIES', 2, 0],
  ['OAUTH_RETRY_BACKOFF_MS', 500, 100],
  ['OAUTH_TOKEN_SKEW_SEC', 60, 0],
  ['OAUTH_TOKEN_CACHE_TTL', 3600000, 360000],
];

/** Re-require constants with a clean module cache, so env is read afresh. */
function envWith(overrides = {}) {
  const saved = {};

  for (const [k, v] of Object.entries(overrides)) {
    saved[k] = process.env[k];
    process.env[k] = String(v);
  }

  const path = require.resolve('../src/utils/constants.cjs');
  delete require.cache[path];

  const { ENV } = require('../src/utils/constants.cjs');
  const snapshot = { ...ENV };

  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }

  delete require.cache[path];

  return snapshot;
}

describe('the OAuth settings are overridable from the environment (#1243)', () => {
  it('defines every name OAuthService reads', () => {
    // The defect itself: each was `undefined`, so the override did nothing.
    const ENV = envWith();

    for (const [key] of KEYS) {
      expect(ENV[key], `ENV.${key} is undefined`).toBeDefined();
      expect(typeof ENV[key]).toBe('number');
    }
  });

  it('keeps the defaults OAuthService already applied', () => {
    // Nothing moves for anyone who sets nothing.
    const ENV = envWith();

    for (const [key, def] of KEYS) {
      expect(ENV[key], key).toBe(def);
    }
  });

  it('takes a value from the environment', () => {
    expect(envWith({ OAUTH_HTTP_TIMEOUT_MS: 9000 }).OAUTH_HTTP_TIMEOUT_MS).toBe(
      9000
    );
    expect(envWith({ OAUTH_MAX_RETRIES: 7 }).OAUTH_MAX_RETRIES).toBe(7);
    expect(
      envWith({ OAUTH_TOKEN_CACHE_TTL: 900000 }).OAUTH_TOKEN_CACHE_TTL
    ).toBe(900000);
  });

  it('clamps a value below the floor rather than obeying it', () => {
    // A 0ms HTTP timeout is a misconfiguration, not an instruction.
    for (const [key, , min] of KEYS) {
      expect(envWith({ [key]: -1 })[key], key).toBe(min);
    }
  });

  it('ignores a non-numeric value and keeps the default', () => {
    expect(
      envWith({ OAUTH_HTTP_TIMEOUT_MS: 'soon' }).OAUTH_HTTP_TIMEOUT_MS
    ).toBe(15000);
  });

  it('matches what OAuthService falls back to, so the two cannot drift', () => {
    // The defaults live in two places — here and oauth.cjs's normalizeNumber
    // calls. If they disagree, setting nothing and setting the documented
    // default would behave differently, which is worse than either value.
    const fs = require('fs');
    const src = fs.readFileSync(
      require.resolve('../src/liferay/oauth.cjs'),
      'utf8'
    );
    const settings = src.slice(src.indexOf('this.settings = {'));

    for (const [key, def] of KEYS) {
      const m = settings.match(
        new RegExp(`ENV\\.${key}[\\s\\S]{0,120}?defaultValue:\\s*(\\d+)`)
      );

      expect(m, `no defaultValue found for ${key}`).not.toBeNull();
      expect(Number(m[1]), `${key} default disagrees`).toBe(def);
    }
  });
});
