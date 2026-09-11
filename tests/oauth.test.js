import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mutate config-node module directly to bypass ESM/CommonJS mock hoisting limitations
const configNode = require('@rotty3000/config-node');

configNode.lxcConfig.oauthApplication = vi.fn().mockReturnValue({
  tokenUri: () => '/o/oauth2/token',
  clientId: () => 'mock-client-id',
  clientSecret: () => 'mock-client-secret',
});
configNode.lxcConfig.dxpMainDomain = vi.fn().mockReturnValue('localhost');
configNode.lxcConfig.dxpProtocol = vi.fn().mockReturnValue('http');

const OAuthService = require('../src/liferay/oauth.cjs');
const { ENV } = require('../src/utils/constants.cjs');

describe('OAuthService', () => {
  let mockContext;
  let mockCache;
  let mockLogger;
  let mockConfigService;

  beforeEach(() => {
    mockCache = new Map();
    mockLogger = {
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      trace: vi.fn(),
    };
    mockConfigService = {
      getOAuthConfigCached: vi.fn().mockReturnValue(null),
      getOAuthConfig: vi.fn().mockResolvedValue({}),
    };

    mockContext = {
      cache: mockCache,
      logger: mockLogger,
      config: mockConfigService,
    };
  });

  describe('Initialization and Config', () => {
    it('should initialize with default settings', () => {
      const service = new OAuthService(mockContext);
      expect(service.settings.maxRetries).toBe(2);
      expect(service.settings.tokenSkewSec).toBe(60);
    });

    it('should apply custom configuration settings via applyConfig', () => {
      const service = new OAuthService(mockContext);
      service.applyConfig({
        maxRetries: 5,
        tokenSkewSec: 30,
        tokenCacheTtlMs: 120000,
      });
      expect(service.settings.maxRetries).toBe(5);
      expect(service.settings.tokenSkewSec).toBe(60); // Math.max with default 60
      expect(service.settings.tokenCacheTtlMs).toBe(3600000); // Math.max with default 3600000
    });

    it('should refresh configurations from remote config service', async () => {
      const service = new OAuthService(mockContext);
      mockConfigService.getOAuthConfig.mockResolvedValue({
        maxRetries: 4,
      });
      await service.refreshConfigFromRemote();
      expect(service.settings.maxRetries).toBe(4);
    });
  });

  describe('Cache Management', () => {
    it('should generate cache key based on URL and Client ID', () => {
      const service = new OAuthService(mockContext);
      const key = service._generateCacheKey('http://liferay', 'client-id');
      expect(key).toBe('http://liferay_client-id');
    });

    it('should store and retrieve access token from cache', () => {
      const service = new OAuthService(mockContext);
      const key = 'test_key';
      service._addAccessTokenToCache(key, 'token-value', 3600);

      const cachedValue = service._getAccessTokenFromCache(key);
      expect(cachedValue).toBe('token-value');
    });

    it('should return null if cached token has expired', () => {
      const service = new OAuthService(mockContext);
      const key = 'test_key_expired';
      mockCache.set(key, {
        token: 'token-value',
        expiresAt: Date.now() - 1000,
      });

      const cachedValue = service._getAccessTokenFromCache(key);
      expect(cachedValue).toBeNull();
    });

    it('should clear token cache', () => {
      const service = new OAuthService(mockContext);
      const key = 'test_key';
      service._addAccessTokenToCache(key, 'token-value', 3600);

      service.clearTokenCache();
      expect(service._getAccessTokenFromCache(key)).toBeNull();
    });

    it('should not cache a token whose remaining life after skew is exactly zero', () => {
      const service = new OAuthService(mockContext);
      const key = 'test_key_zero_ttl';

      // Default tokenSkewSec is 60; an expires_in of 60 leaves ttlMs === 0,
      // which is falsy in JS. This must NOT fall back to the hardCap TTL.
      service._addAccessTokenToCache(key, 'token-value', 60);

      expect(mockCache.has(key)).toBe(false);
      expect(service._getAccessTokenFromCache(key)).toBeNull();
    });

    it('should not cache a token that is already expired relative to skew', () => {
      const service = new OAuthService(mockContext);
      const key = 'test_key_negative_ttl';

      // expires_in < tokenSkewSec (e.g. a misconfigured OAuth server or a
      // very short-lived token) results in a negative ttlMs.
      service._addAccessTokenToCache(key, 'token-value', 10);

      expect(mockCache.has(key)).toBe(false);
      expect(service._getAccessTokenFromCache(key)).toBeNull();
    });
  });

  // The environment is configured for `localhost`: the module-level mock makes
  // `lxcConfig.dxpMainDomain()` report it, so `this.liferayUrl` is
  // `http://localhost` and `tokenEndpoint` is `http://localhost/o/oauth2/token`.
  // Every case below names a different instance as the caller would.
  describe('Token endpoint targeting (#227)', () => {
    const OTHER_INSTANCE = 'http://instance-b.example.com:8080';
    const OTHER_TOKEN_URL = `${OTHER_INSTANCE}/o/oauth2/token`;
    const CONFIGURED_INSTANCE = 'http://localhost';
    const CONFIGURED_TOKEN_URL = `${CONFIGURED_INSTANCE}/o/oauth2/token`;

    const customApplication = {
      tokenUri: () => '/o/custom-app/token',
      clientId: () => 'app-client-id',
      clientSecret: () => 'app-client-secret',
    };

    /**
     * Spies on the single-shot POST rather than the retry wrapper, so the
     * retry and cache paths around it stay real, and records the URL each
     * token was actually requested from.
     */
    function serviceRecordingTokenRequests(ctxOverrides = {}) {
      const service = new OAuthService({ ...mockContext, ...ctxOverrides });
      const requestedUrls = [];

      vi.spyOn(service, '_createAccessTokenOnce').mockImplementation(
        async (tokenUrl) => {
          requestedUrls.push(tokenUrl);
          return {
            data: { access_token: `token-from ${tokenUrl}`, expires_in: 3600 },
          };
        }
      );

      return { service, requestedUrls };
    }

    it('asks the instance the caller named, not the configured one', async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests();

      const token = await service.getAccessTokenWithCredentials(
        OTHER_INSTANCE,
        'client-id',
        'client-secret'
      );

      expect(requestedUrls).toEqual([OTHER_TOKEN_URL]);
      expect(token).toBe(`token-from ${OTHER_TOKEN_URL}`);
    });

    // The cache used to key on the caller's URL while the token came from the
    // configured host, so instance A's token was stored under instance B's key
    // and then reused for B.
    it('never serves one instance a token another instance issued', async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests();

      const other = await service.getAccessTokenWithCredentials(
        OTHER_INSTANCE,
        'client-id',
        'client-secret'
      );
      const configured = await service.getAccessTokenWithCredentials(
        CONFIGURED_INSTANCE,
        'client-id',
        'client-secret'
      );

      expect(requestedUrls).toEqual([OTHER_TOKEN_URL, CONFIGURED_TOKEN_URL]);
      expect(other).not.toBe(configured);
    });

    it('still caches per instance, so a repeat call issues no second request', async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests();

      const first = await service.getAccessTokenWithCredentials(
        OTHER_INSTANCE,
        'client-id',
        'client-secret'
      );
      const second = await service.getAccessTokenWithCredentials(
        OTHER_INSTANCE,
        'client-id',
        'client-secret'
      );

      expect(requestedUrls).toEqual([OTHER_TOKEN_URL]);
      expect(second).toBe(first);
    });

    // Why `tokenEndpoint` is kept rather than removed: an LXC-registered
    // application can declare a token path that is not the default, and
    // `getAccessTokenFromRoute` has no URL of its own to derive one from.
    it("keeps the application's own token path for the configured instance", async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests({
        serverOauthApp: customApplication,
      });

      await service.getAccessTokenFromRoute();

      expect(requestedUrls).toEqual([
        `${CONFIGURED_INSTANCE}/o/custom-app/token`,
      ]);
    });

    // That path is a fact about this environment's DXP. Applying it to a host
    // the caller named would be a guess.
    it('does not apply that path to an instance it was not declared for', async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests({
        serverOauthApp: customApplication,
      });

      await service.getAccessTokenWithCredentials(
        OTHER_INSTANCE,
        'client-id',
        'client-secret'
      );

      expect(requestedUrls).toEqual([OTHER_TOKEN_URL]);
    });

    it('treats a URL it cannot parse as a different instance', async () => {
      const { service, requestedUrls } = serviceRecordingTokenRequests({
        serverOauthApp: customApplication,
      });

      await service.getAccessTokenWithCredentials(
        'not-a-url',
        'client-id',
        'client-secret'
      );

      expect(requestedUrls).toEqual(['not-a-url/o/oauth2/token']);
    });

    it('says the endpoint is unknown rather than posting to "undefined"', () => {
      const service = new OAuthService(mockContext);
      service.tokenEndpoint = null;

      expect(() => service._resolveTokenUrl(null)).toThrow(
        'OAuth token endpoint unknown'
      );
    });
  });

  // `getAccessToken` tested its three arguments together, so any incomplete
  // set took the route branch and returned a token for the instance this
  // process is deployed beside. There were no tests at all for this method.
  describe('Credential completeness (#234)', () => {
    const NAMED_INSTANCE = 'http://instance-b.example.com:8080';

    function serviceWithBothPathsStubbed() {
      const service = new OAuthService(mockContext);
      const viaCredentials = vi
        .spyOn(service, 'getAccessTokenWithCredentials')
        .mockResolvedValue('token-via-credentials');
      const viaRoute = vi
        .spyOn(service, 'getAccessTokenFromRoute')
        .mockResolvedValue('token-via-route');
      return { service, viaCredentials, viaRoute };
    }

    it('takes the credentials path when all three are supplied', async () => {
      const { service, viaCredentials, viaRoute } =
        serviceWithBothPathsStubbed();

      await expect(
        service.getAccessToken(NAMED_INSTANCE, 'client-id', 'client-secret')
      ).resolves.toBe('token-via-credentials');

      expect(viaCredentials).toHaveBeenCalledWith(
        NAMED_INSTANCE,
        'client-id',
        'client-secret'
      );
      expect(viaRoute).not.toHaveBeenCalled();
    });

    it('takes the route when nothing at all is supplied', async () => {
      const { service, viaCredentials, viaRoute } =
        serviceWithBothPathsStubbed();

      await expect(service.getAccessToken()).resolves.toBe('token-via-route');

      expect(viaRoute).toHaveBeenCalled();
      expect(viaCredentials).not.toHaveBeenCalled();
    });

    // The colocated deployment names its own portal and sends no credentials:
    // the AICA fragment hardcodes themeDisplay.portalURL with none, and that
    // config reaches this method unnormalised through the GraphQL client. A
    // credential-less call has only one meaning, so the URL does not change it.
    it('takes the route when a URL is named but no credentials are', async () => {
      const { service, viaCredentials, viaRoute } =
        serviceWithBothPathsStubbed();

      await expect(service.getAccessToken(NAMED_INSTANCE)).resolves.toBe(
        'token-via-route'
      );

      expect(viaRoute).toHaveBeenCalled();
      expect(viaCredentials).not.toHaveBeenCalled();
    });

    // Both credentials but no instance used to take the route too, which does
    // not merely substitute a host: it substitutes the credentials as well.
    it('lets the credentials path name the absent URL', async () => {
      const service = new OAuthService(mockContext);
      const viaRoute = vi.spyOn(service, 'getAccessTokenFromRoute');

      await expect(
        service.getAccessToken(null, 'client-id', 'client-secret')
      ).rejects.toThrow('OAuth configuration missing');

      expect(viaRoute).not.toHaveBeenCalled();
    });

    const halfCredentials = [
      {
        label: 'a URL and a client id, with the secret unread',
        args: [NAMED_INSTANCE, 'client-id', undefined],
        missing: 'clientSecret',
      },
      {
        label: 'a URL and a secret, with the id unread',
        args: [NAMED_INSTANCE, undefined, 'client-secret'],
        missing: 'clientId',
      },
      {
        label: 'a client id alone',
        args: [undefined, 'client-id', undefined],
        missing: 'clientSecret',
      },
      {
        label: 'a secret alone',
        args: [undefined, undefined, 'client-secret'],
        missing: 'clientId',
      },
      {
        label: 'an empty secret, as a config read that returned nothing gives',
        args: [NAMED_INSTANCE, 'client-id', ''],
        missing: 'clientSecret',
      },
    ];

    for (const { label, args, missing } of halfCredentials) {
      it(`refuses ${label}, naming ${missing}`, async () => {
        const { service, viaCredentials, viaRoute } =
          serviceWithBothPathsStubbed();

        await expect(service.getAccessToken(...args)).rejects.toThrow(
          `OAuth credentials incomplete: ${missing} is missing`
        );

        expect(viaRoute).not.toHaveBeenCalled();
        expect(viaCredentials).not.toHaveBeenCalled();
      });
    }

    it('names the missing field on the error, as the 400 path does', async () => {
      const service = new OAuthService(mockContext);

      await expect(
        service.getAccessToken(NAMED_INSTANCE, 'client-id', undefined)
      ).rejects.toMatchObject({
        statusCode: 400,
        field: 'clientSecret',
        errorType: 'auth_error',
      });
    });

    // The defect itself: no token must be minted anywhere, least of all by the
    // configured instance, for a caller that named a different one.
    it('mints no token from the configured instance for a half credential', async () => {
      const service = new OAuthService(mockContext);
      const requestedUrls = [];
      vi.spyOn(service, '_createAccessTokenOnce').mockImplementation(
        async (tokenUrl) => {
          requestedUrls.push(tokenUrl);
          return { data: { access_token: 'token', expires_in: 3600 } };
        }
      );

      await expect(
        service.getAccessToken(NAMED_INSTANCE, 'client-id', undefined)
      ).rejects.toThrow('OAuth credentials incomplete');

      expect(requestedUrls).toEqual([]);
    });
  });

  describe('Authorize URL Generation', () => {
    it('should correctly generate auth URLs without state', () => {
      const service = new OAuthService(mockContext);
      const url = service.generateAuthUrl(
        'http://liferay',
        'my-client',
        'http://redirect'
      );
      expect(url).toContain('http://liferay/o/oauth2/authorize');
      expect(url).toContain('client_id=my-client');
      expect(url).toContain('redirect_uri=http%3A%2F%2Fredirect');
      expect(url).not.toContain('state=');
    });

    it('should correctly generate auth URLs with state', () => {
      const service = new OAuthService(mockContext);
      const url = service.generateAuthUrl(
        'http://liferay',
        'my-client',
        'http://redirect',
        'my-state'
      );
      expect(url).toContain('state=my-state');
    });
  });

  describe('OAuth Handshake Client Calls', () => {
    it('should validate complete config parameters', () => {
      const service = new OAuthService(mockContext);
      expect(() =>
        service.validateOAuthConfig({
          liferayUrl: 'http://liferay',
          clientId: 'client',
          clientSecret: 'secret',
        })
      ).not.toThrow();
    });

    it('should throw validation error on missing config parameters', () => {
      const service = new OAuthService(mockContext);
      expect(() =>
        service.validateOAuthConfig({
          liferayUrl: 'http://liferay',
          clientId: 'client',
        })
      ).toThrow('Missing OAuth configuration: clientSecret');
    });

    // `liferayUrl` is a two-branch expression, and #227 showed that where this
    // value comes from has consequences. The assertion this replaces was
    // `toBeDefined()`, which the empty string, the wrong host, or a URL built
    // from an unexpected domain all satisfy, and which pinned neither branch
    // (#235).
    it('builds the default Liferay URL from the LXC domain and protocol', () => {
      const service = new OAuthService(mockContext);
      expect(service.getDefaultLiferayUrl()).toBe('http://localhost');
    });

    it('falls back to LIFERAY_API_URL when config-node names no DXP', () => {
      const previous = ENV.LIFERAY_API_URL;
      configNode.lxcConfig.dxpMainDomain.mockReturnValueOnce(null);
      configNode.lxcConfig.dxpProtocol.mockReturnValueOnce(null);
      ENV.LIFERAY_API_URL = 'https://named.example:8443';

      try {
        const service = new OAuthService(mockContext);
        expect(service.getDefaultLiferayUrl()).toBe(
          'https://named.example:8443'
        );
      } finally {
        ENV.LIFERAY_API_URL = previous;
      }
    });

    it('should throw 400 when missing credentials parameters during retrieval', async () => {
      const service = new OAuthService(mockContext);
      await expect(
        service.getAccessTokenWithCredentials(null, null, null)
      ).rejects.toThrow('OAuth configuration missing');
    });
  });

  describe('Exception Handling', () => {
    it('should handle network connection exceptions correctly', () => {
      const service = new OAuthService(mockContext);
      const networkError = new Error('getaddrinfo ENOTFOUND');
      networkError.code = 'ENOTFOUND';

      expect(() => service._handleException(networkError)).toThrow(
        'Network connection failed: ENOTFOUND'
      );
    });

    it('should handle OAuth authentication exceptions correctly (401/403)', () => {
      const service = new OAuthService(mockContext);
      const authError = new Error('Request failed with status code 401');
      authError.response = { status: 401, statusText: 'Unauthorized' };

      expect(() => service._handleException(authError)).toThrow(
        'OAuth authentication failed'
      );
    });

    it('should handle generic OAuth failure exceptions correctly', () => {
      const service = new OAuthService(mockContext);
      const genericError = new Error('Some general DXP error');
      genericError.response = { status: 502, statusText: 'Bad Gateway' };

      expect(() => service._handleException(genericError)).toThrow(
        'OAuth request failed: Some general DXP error'
      );
    });
  });

  describe('OAuth application resolution', () => {
    // The SDK used to resolve this itself from a hardcoded external reference
    // code belonging to one consumer. That ERC was wrong, so discovery always
    // returned null and every caller silently used the environment fallback.
    // See #159.
    beforeEach(() => {
      configNode.lxcConfig.oauthApplication.mockClear();
    });

    it('resolves the application from the ERC the consumer supplies', () => {
      const service = new OAuthService({
        ...mockContext,
        oauthApplicationExternalReferenceCode: 'my-consumer-app',
      });

      expect(configNode.lxcConfig.oauthApplication).toHaveBeenCalledWith(
        'my-consumer-app'
      );
      expect(service.getDefaultClientId()).toBe('mock-client-id');
      expect(service.getDefaultClientSecret()).toBe('mock-client-secret');
    });

    it('accepts a pre-resolved application without consulting config-node', () => {
      // For a consumer that does its own lookup, or does not use config-node.
      const service = new OAuthService({
        ...mockContext,
        serverOauthApp: {
          tokenUri: () => '/o/oauth2/token',
          clientId: () => 'injected-id',
          clientSecret: () => 'injected-secret',
        },
      });

      expect(configNode.lxcConfig.oauthApplication).not.toHaveBeenCalled();
      expect(service.getDefaultClientId()).toBe('injected-id');
    });

    it('does not guess an ERC when none is supplied', () => {
      // Defaulting to some consumer's ERC is what caused #159; skipping
      // discovery is the correct behaviour for a shared library.
      const service = new OAuthService(mockContext);

      expect(configNode.lxcConfig.oauthApplication).not.toHaveBeenCalled();
      expect(service.serverOauthApp).toBeNull();
    });

    it('says so at debug level when discovery is skipped', () => {
      // Silence is what hid the defect: the fallback looked like success.
      new OAuthService(mockContext);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining('No OAuth application external reference code'),
        expect.objectContaining({ operation: 'oauth-application-lookup' })
      );
    });

    it('says so at debug level when the ERC resolves to nothing', () => {
      configNode.lxcConfig.oauthApplication.mockReturnValueOnce(null);

      new OAuthService({
        ...mockContext,
        oauthApplicationExternalReferenceCode: 'not-registered',
      });

      expect(mockLogger.debug).toHaveBeenCalledWith(
        expect.stringContaining(
          "No LXC OAuth application registered for 'not-registered'"
        ),
        expect.objectContaining({ operation: 'oauth-application-lookup' })
      );
    });

    it('warns rather than throwing when config-node fails', () => {
      configNode.lxcConfig.oauthApplication.mockImplementationOnce(() => {
        throw new Error('config tree unreadable');
      });

      expect(
        () =>
          new OAuthService({
            ...mockContext,
            oauthApplicationExternalReferenceCode: 'my-consumer-app',
          })
      ).not.toThrow();

      expect(mockLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('config tree unreadable')
      );
    });

    it('reports route credentials as available once resolved', () => {
      const service = new OAuthService({
        ...mockContext,
        oauthApplicationExternalReferenceCode: 'my-consumer-app',
      });

      expect(service.isLiferayRouteAvailable()).toBeTruthy();
    });

    it('reports route credentials as unavailable when nothing resolved', () => {
      configNode.lxcConfig.oauthApplication.mockReturnValueOnce(null);

      const service = new OAuthService({
        ...mockContext,
        oauthApplicationExternalReferenceCode: 'not-registered',
      });

      expect(service.isLiferayRouteAvailable()).toBeFalsy();
    });
  });
});
