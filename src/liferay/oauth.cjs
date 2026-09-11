const { lxcConfig } = require('@rotty3000/config-node');
const axios = require('axios');
const { createERC, normalizeNumber, delay } = require('../utils/misc.cjs');
const { ENV, ERC_PREFIX } = require('../utils/constants.cjs');

class OAuthService {
  constructor(ctx) {
    this.ctx = ctx;

    // The OAuth application is supplied by the consumer, not discovered here.
    // Each consumer registers its own application under its own external
    // reference code, so any ERC hardcoded in a shared library is wrong for
    // every other consumer - and this one was wrong for the consumer it named.
    // See #159.
    //
    // Two shapes are accepted: an ERC to resolve via config-node, for a
    // consumer already using it; or a pre-resolved application, for one that
    // does its own lookup or does not use config-node at all.
    let serverOauthApp = ctx?.serverOauthApp ?? null;
    const erc = ctx?.oauthApplicationExternalReferenceCode;

    if (!serverOauthApp && erc) {
      try {
        serverOauthApp = lxcConfig.oauthApplication(erc);

        if (!serverOauthApp && ctx?.logger?.debug) {
          ctx.logger.debug(
            `No LXC OAuth application registered for '${erc}'; falling back to environment credentials.`,
            { operation: 'oauth-application-lookup' }
          );
        }
      } catch (e) {
        if (ctx?.logger?.warn) {
          ctx.logger.warn(
            `Could not resolve OAuth application config from LXC environment: ${e.message}`
          );
        }
      }
    } else if (!serverOauthApp && ctx?.logger?.debug) {
      // Silence here is what hid the defect in #159: discovery never ran, and
      // every caller quietly used the environment fallback instead.
      ctx.logger.debug(
        'No OAuth application external reference code supplied; using environment credentials.',
        { operation: 'oauth-application-lookup' }
      );
    }

    const lxcDXPMainDomain = lxcConfig.dxpMainDomain();
    const lxcDXPServerProtocol = lxcConfig.dxpProtocol();
    const uri = serverOauthApp?.tokenUri?.();

    this.liferayUrl =
      lxcDXPMainDomain && lxcDXPServerProtocol
        ? `${lxcDXPServerProtocol}://${lxcDXPMainDomain}`
        : ENV.LIFERAY_API_URL;

    this.tokenEndpoint =
      this.liferayUrl && this.liferayUrl.trim()
        ? uri
          ? `${this.liferayUrl}${uri}`
          : `${this.liferayUrl}/o/oauth2/token`
        : null;

    this.pendingTokenPromises = new Map();
    this.serverOauthApp = serverOauthApp;

    this.settings = {
      httpTimeoutMs: normalizeNumber(ENV.OAUTH_HTTP_TIMEOUT_MS, {
        min: 3000,
        defaultValue: 15000,
      }),
      maxRetries: normalizeNumber(ENV.OAUTH_MAX_RETRIES, {
        min: 0,
        defaultValue: 2,
      }),
      backoffBaseMs: normalizeNumber(ENV.OAUTH_RETRY_BACKOFF_MS, {
        min: 100,
        defaultValue: 500,
      }),
      tokenSkewSec: normalizeNumber(ENV.OAUTH_TOKEN_SKEW_SEC, {
        min: 0,
        defaultValue: 60,
      }),
      tokenCacheTtlMs: normalizeNumber(ENV.OAUTH_TOKEN_CACHE_TTL, {
        min: 60000,
        defaultValue: 3600000,
      }),
    };

    const cfgSvc = this.ctx.config;
    const cached = cfgSvc?.getOAuthConfigCached?.();
    if (cached) this.applyConfig(cached);
  }

  applyConfig(cfg = {}) {
    const { logger } = this.ctx;
    const next = {
      httpTimeoutMs: normalizeNumber(cfg.httpTimeoutMs, {
        min: 3000,
        defaultValue: this.settings.httpTimeoutMs,
      }),
      maxRetries: normalizeNumber(cfg.maxRetries, {
        min: 0,
        defaultValue: this.settings.maxRetries,
      }),
      backoffBaseMs: normalizeNumber(cfg.backoffBaseMs, {
        min: 100,
        defaultValue: this.settings.backoffBaseMs,
      }),
      tokenSkewSec: normalizeNumber(cfg.tokenSkewSec, {
        min: 0,
        defaultValue: this.settings.tokenSkewSec,
      }),
      tokenCacheTtlMs: normalizeNumber(cfg.tokenCacheTtlMs, {
        min: 60000,
        defaultValue: this.settings.tokenCacheTtlMs,
      }),
    };
    this.settings = {
      httpTimeoutMs: Math.max(this.settings.httpTimeoutMs, next.httpTimeoutMs),
      maxRetries: Math.max(this.settings.maxRetries, next.maxRetries),
      backoffBaseMs: Math.max(this.settings.backoffBaseMs, next.backoffBaseMs),
      tokenSkewSec: Math.max(this.settings.tokenSkewSec, next.tokenSkewSec),
      tokenCacheTtlMs: Math.max(
        this.settings.tokenCacheTtlMs,
        next.tokenCacheTtlMs
      ),
    };
    logger?.debug?.('OAuthService config applied', {
      operation: 'oauth-config-apply',
      settings: this.settings,
    });
  }

  async refreshConfigFromRemote(config) {
    const { config: configService, logger } = this.ctx;
    if (!configService?.getOAuthConfig) return;
    try {
      const remote = await configService.getOAuthConfig(config);
      this.applyConfig(remote);
    } catch (e) {
      logger?.warn?.('OAuthService: failed to refresh config from remote', {
        operation: 'oauth-config-refresh',
        error: String(e?.message || e),
      });
    }
  }

  _generateCacheKey(liferayUrl, clientId) {
    return `${liferayUrl}_${clientId}`;
  }

  _getAccessTokenFromCache(cacheKey) {
    const tokenCache = this.ctx.cache;
    const cached = tokenCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.token;
    }
    return null;
  }

  _addAccessTokenToCache(cacheKey, token, expiresInSec = 3600) {
    const tokenCache = this.ctx.cache;
    const skewMs = this.settings.tokenSkewSec * 1000;
    const ttlMs = expiresInSec * 1000 - skewMs;
    if (ttlMs <= 0) {
      // Token is already expired (or within the skew window) by the time we
      // would cache it. Skip caching entirely rather than falling back to
      // the hardCap TTL, which would serve an expired token as "valid" for
      // up to an hour.
      return;
    }
    const hardCap = this.settings.tokenCacheTtlMs;
    const finalTtl = Math.min(ttlMs, hardCap);
    tokenCache.set(
      cacheKey,
      {
        token,
        expiresAt: Date.now() + finalTtl,
      },
      finalTtl
    );
  }

  async _createAccessTokenOnce(tokenUrl, clientId, clientSecret) {
    const { logger } = this.ctx;
    logger?.debug?.(
      `Creating new access token for ${clientId} using ${tokenUrl}`
    );
    const res = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: this.settings.httpTimeoutMs,
      }
    );
    return res;
  }

  async _createAccessTokenWithRetry(tokenUrl, clientId, clientSecret) {
    const { logger } = this.ctx;
    let attempt = 0;
    const maxA = this.settings.maxRetries + 1;
    while (attempt < maxA) {
      try {
        return await this._createAccessTokenOnce(
          tokenUrl,
          clientId,
          clientSecret
        );
      } catch (err) {
        attempt++;
        const retriable =
          ![401, 403].includes(err?.response?.status) && attempt < maxA;
        logger?.warn?.('OAuth token request failed', {
          operation: 'oauth-token-request',
          attempt,
          maxAttempts: maxA,
          status: err?.response?.status,
          message: String(err?.message || err),
        });
        if (!retriable) throw err;
        const backoff = this.settings.backoffBaseMs * Math.pow(2, attempt - 1);
        await delay(backoff);
      }
    }
  }

  _getTokenUrl(liferayUrl) {
    return `${liferayUrl}/o/oauth2/token`;
  }

  /**
   * `null` when the value is absent or not a parseable absolute URL, which is
   * distinct from every origin a success can produce, so the caller can treat
   * "could not be read" as "not the configured instance" rather than as a
   * match.
   */
  _toOrigin(value) {
    if (!value || typeof value !== 'string') return null;
    try {
      return new URL(value).origin;
    } catch {
      return null;
    }
  }

  _isConfiguredInstance(liferayUrl) {
    const configured = this._toOrigin(this.liferayUrl);
    return configured !== null && configured === this._toOrigin(liferayUrl);
  }

  /**
   * Where to ask for a token for `liferayUrl`.
   *
   * The caller's instance wins. `tokenEndpoint` is fixed at construction from
   * `lxcConfig.dxpMainDomain()` or `ENV.LIFERAY_API_URL`, and taking it
   * unconditionally meant a caller naming instance B, in an environment
   * configured for A, got a token issued by A and presented it to B - a 401
   * from B holding a perfectly valid token, which is a hard failure to read
   * (#227).
   *
   * It is still consulted, because it is not merely `liferayUrl` plus the
   * default path: an LXC-registered OAuth application can declare its own
   * `tokenUri`, and `getAccessTokenFromRoute` has no URL of its own to derive
   * one from. That path is a fact about this environment's DXP alone, so
   * applying it to a host the caller named would be a guess. It is therefore
   * used when, and only when, the caller is asking for the very instance it
   * was derived from.
   *
   * @param {string} liferayUrl The instance a token is wanted for.
   * @returns {string} The token endpoint to POST to.
   * @throws {Error} When neither a caller URL nor a configured endpoint names
   *   an instance, rather than posting to the string "undefined".
   */
  _resolveTokenUrl(liferayUrl) {
    if (
      liferayUrl &&
      !(this.tokenEndpoint && this._isConfiguredInstance(liferayUrl))
    ) {
      return this._getTokenUrl(liferayUrl);
    }

    if (this.tokenEndpoint) return this.tokenEndpoint;

    const customError = new Error(
      'OAuth token endpoint unknown: no Liferay URL was supplied and none is configured'
    );
    customError.statusCode = 500;
    throw customError;
  }

  async _createOrGetAccessToken(liferayUrl, clientId, clientSecret) {
    // Keyed on the endpoint that issues the token rather than on the URL the
    // caller asked about, so a token can never be served from cache for a host
    // that did not mint it (#227).
    const tokenUrl = this._resolveTokenUrl(liferayUrl);
    const cacheKey = this._generateCacheKey(tokenUrl, clientId);
    const cached = this._getAccessTokenFromCache(cacheKey);
    if (cached) return cached;

    if (this.pendingTokenPromises.has(cacheKey)) {
      return this.pendingTokenPromises.get(cacheKey);
    }

    const promise = (async () => {
      try {
        const response = await this._createAccessTokenWithRetry(
          tokenUrl,
          clientId,
          clientSecret
        );
        const token = response.data.access_token;
        const expiresIn = response.data.expires_in || 3600;
        this._addAccessTokenToCache(cacheKey, token, expiresIn);
        return token;
      } finally {
        this.pendingTokenPromises.delete(cacheKey);
      }
    })();

    this.pendingTokenPromises.set(cacheKey, promise);
    return promise;
  }

  _handleException(error, liferayUrl = null, clientId = null) {
    const { logger } = this.ctx;
    const errorRef = createERC(ERC_PREFIX.ERROR);
    logger?.error?.(`OAuth Error [${errorRef}]:`, {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      message: error?.message,
      stack: error?.stack,
      url: liferayUrl,
      clientId,
      timestamp: new Date().toISOString(),
    });

    let customError;
    if (['ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'].includes(error?.code)) {
      customError = new Error(`Network connection failed: ${error.code}`);
      customError.statusCode = 0;
    } else if (
      error?.response?.status === 401 ||
      error?.response?.status === 403
    ) {
      customError = new Error('OAuth authentication failed');
      customError.statusCode = error.response.status;
      customError.errorType = 'auth_error';
      customError.field = 'clientSecret';
    } else {
      customError = new Error(`OAuth request failed: ${error?.message}`);
      customError.statusCode = error?.response?.status || 500;
    }
    customError.errorReference = errorRef;
    customError.code = error?.code;
    throw customError;
  }

  async getAccessTokenFromRoute() {
    const { logger } = this.ctx;
    const clientId =
      this.serverOauthApp?.clientId?.() || ENV.LIFERAY_OAUTH_CLIENT_ID;
    const clientSecret =
      this.serverOauthApp?.clientSecret?.() || ENV.LIFERAY_OAUTH_CLIENT_SECRET;

    if (!this.liferayUrl || !clientId || !clientSecret) {
      const errorRef = createERC(ERC_PREFIX.ERROR);
      logger?.error?.(
        `OAuth Error [${errorRef}]: Unable to obtain LXC configuration`,
        {
          liferayUrl: this.liferayUrl || 'undefined',
          clientId: clientId || 'undefined',
          clientSecret: clientSecret ? '[PROVIDED]' : 'undefined',
          timestamp: new Date().toISOString(),
        }
      );
      const customError = new Error('OAuth configuration not found');
      customError.statusCode = 500;
      customError.errorReference = errorRef;
      throw customError;
    }

    try {
      return await this._createOrGetAccessToken(
        this.liferayUrl,
        clientId,
        clientSecret
      );
    } catch (error) {
      this._handleException(error, this.liferayUrl, clientId);
    }
  }

  async getAccessTokenWithCredentials(liferayUrl, clientId, clientSecret) {
    const { logger } = this.ctx;
    if (!liferayUrl || !clientId || !clientSecret) {
      const errorRef = createERC(ERC_PREFIX.ERROR);
      logger?.error?.(
        `OAuth Error [${errorRef}]: Missing required parameters`,
        {
          liferayUrl: liferayUrl || 'undefined',
          clientId: clientId || 'undefined',
          clientSecret: clientSecret ? '[PROVIDED]' : 'undefined',
          timestamp: new Date().toISOString(),
        }
      );
      const customError = new Error('OAuth configuration missing');
      customError.statusCode = 400;
      customError.errorReference = errorRef;
      throw customError;
    }

    try {
      return await this._createOrGetAccessToken(
        liferayUrl,
        clientId,
        clientSecret
      );
    } catch (error) {
      this._handleException(error, liferayUrl, clientId);
    }
  }

  /**
   * Obtains a token for whichever identity the caller specified.
   *
   * The three arguments used to be tested together - `!liferayUrl ||
   * !clientId || !clientSecret` - so any incomplete set fell through to
   * `getAccessTokenFromRoute`, which discards the caller's URL and uses
   * `this.liferayUrl` with this environment's own credentials. A caller whose
   * secret came back empty from a config read therefore received a valid token
   * for the instance this process is deployed beside, and found out as a 401
   * from the host it did name: #227's failure arriving by a different door
   * (#234). The missing argument was the diagnostic, and it was thrown away.
   *
   * The credentials decide, and the pair is indivisible:
   *
   * - **both supplied** - a named identity. `getAccessTokenWithCredentials`
   *   takes it, and raises its own 400 naming `liferayUrl` when no instance was
   *   named, rather than quietly minting a token from different credentials.
   * - **neither supplied** - the ambient identity, which is the only sense a
   *   credential-less call can be given. `getAccessTokenFromRoute` takes it,
   *   whatever `liferayUrl` says, because the colocated deployment legitimately
   *   names its own portal and sends no credentials at all.
   * - **one supplied** - a half credential, which is nobody's intent. It is
   *   reported here rather than answered, because the only available answer is
   *   a token for somebody else.
   *
   * A caller that wants the ambient identity for an instance it also names can
   * say so by calling `getAccessTokenFromRoute` directly.
   *
   * @throws {Error} 400, naming the credential that is missing.
   */
  async getAccessToken(liferayUrl, clientId, clientSecret) {
    const { logger } = this.ctx;
    const hasClientId = Boolean(clientId);
    const hasClientSecret = Boolean(clientSecret);

    if (hasClientId !== hasClientSecret) {
      const missing = hasClientId ? 'clientSecret' : 'clientId';
      const errorRef = createERC(ERC_PREFIX.ERROR);
      logger?.error?.(
        `OAuth Error [${errorRef}]: Incomplete credentials for ${liferayUrl || 'an unnamed instance'}`,
        {
          liferayUrl: liferayUrl || 'undefined',
          clientId: clientId || 'undefined',
          clientSecret: clientSecret ? '[PROVIDED]' : 'undefined',
          missing,
          timestamp: new Date().toISOString(),
        }
      );
      const customError = new Error(
        `OAuth credentials incomplete: ${missing} is missing. Supply both ` +
          "clientId and clientSecret, or neither to use this environment's " +
          'own credentials via getAccessTokenFromRoute'
      );
      customError.statusCode = 400;
      customError.errorType = 'auth_error';
      customError.field = missing;
      customError.errorReference = errorRef;
      throw customError;
    }

    return hasClientId
      ? this.getAccessTokenWithCredentials(liferayUrl, clientId, clientSecret)
      : this.getAccessTokenFromRoute();
  }

  async getAccessTokenWithCode(
    liferayUrl,
    clientId,
    clientSecret,
    code,
    redirectUri
  ) {
    const { logger } = this.ctx;
    try {
      const response = await axios.post(
        this._getTokenUrl(liferayUrl),
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: this.settings.httpTimeoutMs,
        }
      );
      return response.data;
    } catch (error) {
      const errorRef = createERC(ERC_PREFIX.ERROR);
      logger?.error?.(
        `OAuth code exchange failed [${errorRef}]:`,
        error?.response?.data || error?.message
      );
      const customError = new Error(
        `OAuth code exchange failed: ${
          error?.response?.data?.error_description || error?.message
        }`
      );
      customError.statusCode = error?.response?.status || 500;
      customError.errorReference = errorRef;
      throw customError;
    }
  }

  generateAuthUrl(liferayUrl, clientId, redirectUri, state = null) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope:
        'Liferay.Headless.Commerce.Admin.Catalog.everything Liferay.Headless.Commerce.Admin.Channel.everything Liferay.Headless.Commerce.Admin.Order.everything Liferay.Headless.Commerce.Admin.Pricing.everything Liferay.Headless.Commerce.Admin.Account.everything',
    });
    if (state) params.append('state', state);
    return `${liferayUrl}/o/oauth2/authorize?${params.toString()}`;
  }

  clearTokenCache() {
    const tokenCache = this.ctx.cache;
    tokenCache.clear();
  }

  isLiferayRouteAvailable() {
    return (
      this.tokenEndpoint &&
      (this.serverOauthApp?.clientId?.() || ENV.LIFERAY_OAUTH_CLIENT_ID) &&
      (this.serverOauthApp?.clientSecret?.() || ENV.LIFERAY_OAUTH_CLIENT_SECRET)
    );
  }

  validateOAuthConfig(config) {
    const required = ['liferayUrl', 'clientId', 'clientSecret'];
    const missing = required.filter((field) => !config[field]);
    if (missing.length > 0) {
      throw new Error(`Missing OAuth configuration: ${missing.join(', ')}`);
    }
  }

  getDefaultClientId() {
    return this.serverOauthApp?.clientId?.() || ENV.LIFERAY_OAUTH_CLIENT_ID;
  }
  getDefaultClientSecret() {
    return (
      this.serverOauthApp?.clientSecret?.() || ENV.LIFERAY_OAUTH_CLIENT_SECRET
    );
  }
  getDefaultLiferayUrl() {
    return this.liferayUrl;
  }
}

module.exports = OAuthService;
