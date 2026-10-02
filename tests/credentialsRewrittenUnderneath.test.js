import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/**
 * Credentials replaced AFTER a successful resolution.
 *
 * #288 made the application resolve on read rather than at construction, which
 * fixed reading too EARLY. It does nothing about the credentials being
 * rewritten afterwards, because a cached success is never revisited — and
 * Liferay rewrites the config tree when it deploys a client extension, which
 * is minutes after a container starts.
 *
 * Measured twice on different days in an LXC deployment: resolved and obtained
 * a token at minute 0, Liferay rewrote the tree at ~minute 6, and at minute 9 —
 * when the access token expired — the cached client id was rejected with
 * `401 invalid_client` and the process never recovered. The client id in use
 * matched no application in the published tree.
 *
 * The real config-node on a real temp tree, as in oauthApplicationResolution:
 * the behaviour under test is how that library caches over time, and a mock
 * would assert our idea of it.
 */
const configNode = require('@rotty3000/config-node');
const OAuthService = require('../src/liferay/oauth.cjs');
const { ENV } = require('../src/utils/constants.cjs');

let tree;
let ercSeq = 0;
const nextErc = () => `rewrite-ext-${process.pid}-${++ercSeq}`;

const write = (key, value) =>
  fs.writeFileSync(path.join(tree, key), value, 'utf8');

const makeCtx = (overrides = {}) => ({
  cache: new Map(),
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), trace: vi.fn() },
  config: { getOAuthConfigCached: () => null },
  oauthApplicationRetryMs: 0,
  ...overrides,
});

let savedEnvClientId;
let savedEnvClientSecret;

beforeEach(() => {
  tree = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-rewrite-'));
  process.env.CONFIG_NODE_CONFIG_TREES = tree;
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

/** A service with a resolved application and a stubbed token endpoint. */
function resolvedService(erc, { onToken }) {
  write('liferay.oauth.application.external.reference.codes', erc);
  write(`${erc}.oauth2.headless.server.client.id`, 'first-client-id');
  write(`${erc}.oauth2.headless.server.client.secret`, 'first-secret');

  const service = new OAuthService(
    makeCtx({ oauthApplicationExternalReferenceCode: erc })
  );
  service.liferayUrl = 'https://dxp.example.test';

  // The seam is the one network call. Everything above it is the real code.
  service._createAccessTokenWithRetry = vi.fn(
    async (_tokenUrl, clientId, clientSecret) => onToken(clientId, clientSecret)
  );

  return service;
}

const rejection = (status) => {
  const err = new Error(`Request failed with status code ${status}`);
  err.response = { status, data: { error: 'invalid_client' } };
  return err;
};

describe('credentials rewritten underneath a running process', () => {
  it('re-reads the tree when a resolved credential is rejected', async () => {
    const erc = nextErc();
    const seen = [];

    const service = resolvedService(erc, {
      onToken: (clientId) => {
        seen.push(clientId);
        if (clientId === 'first-client-id') throw rejection(401);
        return {
          data: { access_token: 'token-after-rewrite', expires_in: 60 },
        };
      },
    });

    // Resolve, exactly as minute 0 does.
    expect(service.getDefaultClientId()).toBe('first-client-id');

    // Liferay deploys the extension and rewrites the tree.
    write(`${erc}.oauth2.headless.server.client.id`, 'second-client-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'second-secret');

    const token = await service.getAccessTokenFromRoute();

    expect(token).toBe('token-after-rewrite');
    // The requirement: it presented the NEW credential, not that it retried.
    expect(seen).toEqual(['first-client-id', 'second-client-id']);
  });

  it('does not retry when the fresh credential is rejected too', async () => {
    // Otherwise a genuinely wrong credential becomes a loop against the token
    // endpoint rather than a clear 401.
    const erc = nextErc();
    const seen = [];

    const service = resolvedService(erc, {
      onToken: (clientId) => {
        seen.push(clientId);
        throw rejection(401);
      },
    });

    expect(service.getDefaultClientId()).toBe('first-client-id');
    write(`${erc}.oauth2.headless.server.client.id`, 'second-client-id');
    write(`${erc}.oauth2.headless.server.client.secret`, 'second-secret');

    await expect(service.getAccessTokenFromRoute()).rejects.toThrow();

    expect(seen).toEqual(['first-client-id', 'second-client-id']);
  });

  it('leaves a 500 alone, since re-reading cannot help it', async () => {
    const erc = nextErc();
    const seen = [];

    const service = resolvedService(erc, {
      onToken: (clientId) => {
        seen.push(clientId);
        throw rejection(500);
      },
    });

    expect(service.getDefaultClientId()).toBe('first-client-id');
    await expect(service.getAccessTokenFromRoute()).rejects.toThrow();

    // One attempt. A server fault is not a stale credential.
    expect(seen).toEqual(['first-client-id']);
  });

  it('never discards an application the caller pinned', async () => {
    // An explicit application has no ERC and no tree behind it; re-resolving
    // would resolve it to nothing.
    const erc = nextErc();
    const service = resolvedService(erc, {
      onToken: () => {
        throw rejection(401);
      },
    });

    service.serverOauthApp = {
      clientId: () => 'pinned-id',
      clientSecret: () => 'pinned-secret',
    };

    expect(service.invalidateResolvedOauthApp()).toBe(false);
    expect(service.serverOauthApp.clientId()).toBe('pinned-id');
  });
});
