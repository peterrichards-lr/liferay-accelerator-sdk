import { describe, it, expect } from 'vitest';
import LiferayRestService from '../../src/liferay/rest.cjs';
import OAuthService from '../../src/liferay/oauth.cjs';
import {
  assertIntegrationPreconditions,
  isIntegrationRunRequested,
} from './preconditions.mjs';

const isIntegrationTest = isIntegrationRunRequested(process.env);

// Thrown at collection, before a single test is registered, so an unrunnable
// suite is reported as a failed file rather than as skipped tests - which is
// the shape that let this suite report success for a year without ever
// reaching a Liferay (#224). Skipping is right only when the suite was not
// asked to run; once the switch is on, a missing variable is a failure that
// names itself.
if (isIntegrationTest) {
  assertIntegrationPreconditions(process.env);
}

const silentLogger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

/**
 * OAuthService reads `ctx.cache` with `get`, `set(key, value, ttlMs)` and
 * `clear`. A Map satisfies all three and discards the TTL, which costs nothing
 * for a process that lives for the length of one run.
 */
function createServiceContext() {
  const ctx = { logger: silentLogger, cache: new Map() };
  ctx.oauth = new OAuthService(ctx);
  return ctx;
}

describe.skipIf(!isIntegrationTest)('DXP Integration Suite (Opt-in)', () => {
  // Client credentials rather than Basic auth. liferay-demo-accelerator#64
  // removes the username/password fallback from HttpCoreService and
  // graphql.cjs, and this suite is the only live coverage in the project that
  // would have stopped authenticating when it did.
  //
  // No defaults: a default URL or credential is what lets a misconfigured run
  // look like a passing one.
  const config = {
    liferayUrl: process.env.LIFERAY_API_URL,
    clientId: process.env.LIFERAY_OAUTH_CLIENT_ID,
    clientSecret: process.env.LIFERAY_OAUTH_CLIENT_SECRET,
  };

  const restClient = new LiferayRestService(createServiceContext());

  // Both assertions below are shape checks that cannot fail for any reason a
  // caller would care about, and the first is worse than useless:
  // `getPrimaryAccountId` ends in `catch { return null }`, and `null` is one of
  // the two values this accepts, so it passes on a 401, a 404 or a DNS failure
  // alike. Run against `http://nonexistent-host.invalid:9999` with mocks
  // removed, it still passes while the second test fails with ENOTFOUND.
  //
  // Replacing them with values from a named fixture is #208, and needs an
  // instance holding that fixture. Whether `null` is a legitimate answer for
  // the service account the suite authenticates as is a fact about the fixture,
  // not about the code, so the assertion cannot be tightened before one exists.
  it('fetches primary account id from live DXP instance', async () => {
    const accountId = await restClient.getPrimaryAccountId(config);
    expect(accountId === null || typeof accountId === 'number').toBe(true);
  });

  it('fetches account count from live DXP instance', async () => {
    const count = await restClient.getAccountCount(config);
    expect(typeof count).toBe('number');
  });
});
