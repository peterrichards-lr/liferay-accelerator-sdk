import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Deliberately the real config-node, not a mock. The whole point of #288 is
// how that library behaves over time - it caches a miss on purpose - and a
// mock of it would assert our idea of the library rather than the library.
const configNode = require('@rotty3000/config-node');
const OAuthService = require('../src/liferay/oauth.cjs');
const { ENV } = require('../src/utils/constants.cjs');

let tree;
let ercSeq = 0;

/** A fresh ERC per test: config-node memoises resolved applications by ERC in
 * a module-private map that outlives any cache flush. */
const nextErc = () => `test-ext-${process.pid}-${++ercSeq}`;

const write = (key, value) =>
  fs.writeFileSync(path.join(tree, key), value, 'utf8');

const makeCtx = (overrides = {}) => ({
  cache: new Map(),
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), trace: vi.fn() },
  config: { getOAuthConfigCached: () => null },
  // No throttle unless a test is about the throttle.
  oauthApplicationRetryMs: 0,
  ...overrides,
});

let savedEnvClientId;
let savedEnvClientSecret;

beforeEach(() => {
  tree = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-ctree-'));
  process.env.CONFIG_NODE_CONFIG_TREES = tree;

  // The environment fallback must not stand in for a credential the config
  // tree was supposed to supply, or a failure to resolve looks like a success.
  savedEnvClientId = ENV.LIFERAY_OAUTH_CLIENT_ID;
  savedEnvClientSecret = ENV.LIFERAY_OAUTH_CLIENT_SECRET;
  ENV.LIFERAY_OAUTH_CLIENT_ID = '';
  ENV.LIFERAY_OAUTH_CLIENT_SECRET = '';

  configNode.clearCache();
});

afterEach(() => {
  ENV.LIFERAY_OAUTH_CLIENT_ID = savedEnvClientId;
  ENV.LIFERAY_OAUTH_CLIENT_SECRET = savedEnvClientSecret;
  fs.rmSync(tree, { recursive: true, force: true });
  configNode.clearCache();
});

describe('OAuth application resolution over time (#288)', () => {
  it('acquires credentials Liferay writes after construction, without a restart', () => {
    const erc = nextErc();
    const service = new OAuthService(
      makeCtx({ oauthApplicationExternalReferenceCode: erc })
    );

    // Constructed before Liferay registered the application, which is the
    // ordinary case: registration is downstream of the portal becoming
    // healthy, and the extension starts first.
    expect(service.getDefaultClientId()).toBeFalsy();

    // Liferay registers the application and the platform writes the tree.
    write('liferay.oauth.application.external.reference.codes', erc);
    write(`${erc}.oauth2.headless.server.client.id`, 'late-client-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'late-client-secret');

    // The requirement: the same process, on a later call, uses the real
    // credentials. Not "it looked again" - the credentials themselves.
    expect(service.getDefaultClientId()).toBe('late-client-id');
    expect(service.getDefaultClientSecret()).toBe('late-client-secret');
  });

  it('recovers when the ERC list lands before the credentials', () => {
    // The realistic split: the ERC list is what the extension declares, the
    // credentials are what Liferay writes when it registers. config-node
    // memoises the application it builds from a half-written tree, deciding
    // its profile once and for good, so this state does not heal on its own.
    const erc = nextErc();
    write('liferay.oauth.application.external.reference.codes', erc);

    const service = new OAuthService(
      makeCtx({ oauthApplicationExternalReferenceCode: erc })
    );
    expect(service.getDefaultClientId()).toBeFalsy();

    write(`${erc}.oauth2.headless.server.client.id`, 'registered-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'registered-secret');

    expect(service.getDefaultClientId()).toBe('registered-id');
    expect(service.getDefaultClientSecret()).toBe('registered-secret');
  });

  it('takes the application token path once the application appears', () => {
    const erc = nextErc();
    const service = new OAuthService(
      makeCtx({ oauthApplicationExternalReferenceCode: erc })
    );
    service.liferayUrl = 'https://dxp.example.test';

    // Read once while unresolved. Nothing may be frozen by this read.
    expect(service.tokenEndpoint).toBe(
      'https://dxp.example.test/o/oauth2/token'
    );

    write('liferay.oauth.application.external.reference.codes', erc);
    write(`${erc}.oauth2.headless.server.client.id`, 'an-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'a-secret');
    write(`${erc}.oauth2.token.uri`, '/o/custom/token');

    expect(service.tokenEndpoint).toBe(
      'https://dxp.example.test/o/custom/token'
    );
  });

  it('keeps using an explicitly supplied application and never reads the tree', () => {
    // That caller has no ERC and no config tree; re-resolving would resolve it
    // to nothing.
    const spy = vi.spyOn(configNode.lxcConfig, 'oauthApplication');
    const service = new OAuthService(
      makeCtx({
        serverOauthApp: {
          clientId: () => 'injected-id',
          clientSecret: () => 'injected-secret',
          tokenUri: () => '/o/oauth2/token',
        },
      })
    );

    expect(service.getDefaultClientId()).toBe('injected-id');
    expect(service.getDefaultClientId()).toBe('injected-id');
    expect(service.getDefaultClientSecret()).toBe('injected-secret');
    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('does not re-read the tree once the application has resolved', () => {
    const erc = nextErc();
    write('liferay.oauth.application.external.reference.codes', erc);
    write(`${erc}.oauth2.headless.server.client.id`, 'stable-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'stable-secret');

    const service = new OAuthService(
      makeCtx({ oauthApplicationExternalReferenceCode: erc })
    );
    expect(service.getDefaultClientId()).toBe('stable-id');

    const spy = vi.spyOn(configNode.lxcConfig, 'oauthApplication');
    service.getDefaultClientId();
    service.getDefaultClientSecret();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not flush the process config cache on every read while unresolved', () => {
    // Re-resolution clears config-node's caches for the whole process and
    // re-stats the config tree. The application is read on the path of every
    // token request, so an unthrottled retry would do that per outbound call.
    const erc = nextErc();
    const service = new OAuthService(
      makeCtx({
        oauthApplicationExternalReferenceCode: erc,
        oauthApplicationRetryMs: 60000,
      })
    );

    const spy = vi.spyOn(configNode.lxcConfig, 'oauthApplication');
    for (let i = 0; i < 25; i++) service.getDefaultClientId();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
