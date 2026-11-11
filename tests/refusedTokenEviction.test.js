import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const configNode = require('@rotty3000/config-node');

configNode.lxcConfig.oauthApplication = vi.fn().mockReturnValue({
  tokenUri: () => '/o/oauth2/token',
  clientId: () => 'mock-client-id',
  clientSecret: () => 'mock-client-secret',
});
configNode.lxcConfig.dxpMainDomain = vi.fn().mockReturnValue('localhost');
configNode.lxcConfig.dxpProtocol = vi.fn().mockReturnValue('http');

const OAuthService = require('../src/liferay/oauth.cjs');
const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');

/**
 * A token a resource refused is evicted, so a scope granted after the token
 * was issued takes effect on the next request rather than after the token's
 * lifetime (#316). Measured in liferay-ai-commerce-accelerator#1379: the scope
 * resolved at 13:33:12 and the old token was refused until 13:39.
 */
const logger = () => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  trace: vi.fn(),
});

describe('OAuthService.evictAccessToken', () => {
  let cache;
  let oauth;

  beforeEach(() => {
    vi.useFakeTimers();
    cache = new Map();
    oauth = new OAuthService({ cache, logger: logger() });
    oauth._addAccessTokenToCache('key-a', 'token-a', 600);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('evicts a refused token old enough, so the cache no longer serves it', () => {
    vi.advanceTimersByTime(61 * 1000);

    expect(oauth.evictAccessToken('token-a')).toBe(true);
    expect(oauth._getAccessTokenFromCache('key-a')).toBeNull();
  });

  it('keeps a token younger than a minute, bounding token requests', () => {
    vi.advanceTimersByTime(30 * 1000);

    expect(oauth.evictAccessToken('token-a')).toBe(false);
    expect(oauth._getAccessTokenFromCache('key-a')).toBe('token-a');
  });

  it('ignores a token it did not cache, or none', () => {
    vi.advanceTimersByTime(61 * 1000);

    expect(oauth.evictAccessToken('someone-elses')).toBe(false);
    expect(oauth.evictAccessToken(undefined)).toBe(false);
    expect(oauth._getAccessTokenFromCache('key-a')).toBe('token-a');
  });

  it('evicts only the refused client, not every cached token', () => {
    oauth._addAccessTokenToCache('key-b', 'token-b', 600);
    vi.advanceTimersByTime(61 * 1000);

    oauth.evictAccessToken('token-a');

    expect(oauth._getAccessTokenFromCache('key-b')).toBe('token-b');
  });

  it('does not evict a replacement because its predecessor was refused', () => {
    vi.advanceTimersByTime(61 * 1000);
    oauth._addAccessTokenToCache('key-a', 'token-a2', 600);

    expect(oauth.evictAccessToken('token-a')).toBe(false);
    expect(oauth._getAccessTokenFromCache('key-a')).toBe('token-a2');
  });
});

describe('HttpCoreService evicts a token a resource refuses (#316)', () => {
  const URL = 'http://liferay:8080';
  let ctx;
  let service;

  beforeEach(() => {
    ctx = {
      logger: logger(),
      oauth: {
        getAccessToken: vi.fn().mockResolvedValue('cached-token'),
        evictAccessToken: vi.fn(),
      },
      persistence: {},
    };
    service = new HttpCoreService(ctx);
  });

  const respondWith = (status) =>
    server.use(
      http.get(`${URL}/o/c/things`, () =>
        HttpResponse.json({ status }, { status })
      )
    );

  it.each([401, 403])(
    'evicts on %i and passes the error on unchanged',
    async (status) => {
      respondWith(status);
      const client = await service.createAxiosInstance({ liferayUrl: URL });

      const error = await client.get('/o/c/things').catch((e) => e);

      expect(error.response.status).toBe(status);
      expect(ctx.oauth.evictAccessToken).toHaveBeenCalledWith('cached-token');
    }
  );

  it.each([404, 500])('does not evict on %i', async (status) => {
    respondWith(status);
    const client = await service.createAxiosInstance({ liferayUrl: URL });

    await client.get('/o/c/things').catch(() => {});

    expect(ctx.oauth.evictAccessToken).not.toHaveBeenCalled();
  });

  it('does not evict a token the caller supplied', async () => {
    respondWith(403);
    const client = await service.createAxiosInstance({
      liferayUrl: URL,
      authMethod: 'token',
      accessToken: 'supplied-token',
    });

    await client.get('/o/c/things').catch(() => {});

    expect(ctx.oauth.evictAccessToken).not.toHaveBeenCalled();
  });

  it('does not evict on Basic credentials', async () => {
    respondWith(401);
    const client = await service.createAxiosInstance({
      liferayUrl: URL,
      authMethod: 'basic',
      username: 'u',
      password: 'p',
    });

    await client.get('/o/c/things').catch(() => {});

    expect(ctx.oauth.evictAccessToken).not.toHaveBeenCalled();
  });
});
