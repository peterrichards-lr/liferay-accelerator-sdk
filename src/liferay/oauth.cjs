const {
  lxcConfig,
  lookupConfig,
  clearCache,
} = require('@rotty3000/config-node');
const axios = require('axios');
const { createERC, normalizeNumber, delay } = require('../utils/misc.cjs');
const { ENV, ERC_PREFIX } = require('../utils/constants.cjs');
const pkceLogin = require('./pkceLogin.cjs');

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
    // An explicitly supplied application is authoritative and is never
    // re-resolved: that caller has no ERC and no config tree to consult, so
    // "resolve it again later" would mean resolving it to nothing.
    this._explicitOauthApp = ctx?.serverOauthApp ?? null;
    this._oauthApplicationErc = ctx?.oauthApplicationExternalReferenceCode;
    this._resolvedOauthApp = null;
    this._lastOauthAppAttemptAt = 0;

    // How long to wait between re-resolution attempts. Every re-resolution
    // flushes config-node's caches (see `_resolveOauthApplication`), and the
    // application is read on the path of every token request, so an
    // unthrottled retry would flush the process's whole configuration cache
    // and re-stat the config tree once per outbound call.
    this._oauthAppRetryMs = normalizeNumber(ctx?.oauthApplicationRetryMs, {
      min: 0,
      defaultValue: 30000,
    });

    if (!this._explicitOauthApp && this._oauthApplicationErc) {
      // Attempted here as well as on read, so that a deployment whose
      // credentials are already present behaves exactly as it did before, and
      // logs what it always logged, at the moment it always logged it.
      this._resolvedOauthApp = this._resolveOauthApplication();
    } else if (!this._explicitOauthApp && ctx?.logger?.debug) {
      // Silence here is what hid the defect in #159: discovery never ran, and
      // every caller quietly used the environment fallback instead.
      ctx.logger.debug(
        'No OAuth application external reference code supplied; using environment credentials.',
        { operation: 'oauth-application-lookup' }
      );
    }

    // Resolved on first read, not here. See the accessors below.
    this._liferayUrl = undefined;
    this._tokenEndpoint = undefined;

    this.pendingTokenPromises = new Map();

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

  /**
   * The OAuth application whose credentials this client presents, resolved on
   * read rather than fixed at construction.
   *
   * An LXC extension's credentials are written when Liferay registers its
   * OAuth application, which is downstream of the portal becoming healthy. A
   * container that starts, waits and schedules correctly can still construct
   * this client before its own credentials exist; fixing the orchestration
   * narrows that window but cannot close it. Resolving once meant every later
   * call fell through to `ENV.LIFERAY_OAUTH_*` for the life of the process.
   *
   * Only a usable resolution is cached - one that actually yields a clientId.
   * An application object that exists but has no clientId is not a resolution,
   * it is a half-written config tree, and caching it would freeze the miss
   * exactly as the old shape did.
   */
  get serverOauthApp() {
    if (this._explicitOauthApp) return this._explicitOauthApp;
    if (this._resolvedOauthApp) return this._resolvedOauthApp;

    // Nothing to resolve from. `null` rather than `undefined` because callers
    // and tests treat "no application" as a value, not as an absent property.
    if (!this._oauthApplicationErc) return null;

    if (Date.now() - this._lastOauthAppAttemptAt < this._oauthAppRetryMs) {
      return null;
    }

    this._resolvedOauthApp = this._resolveOauthApplication({
      clearMissCache: true,
    });

    return this._resolvedOauthApp;
  }

  /**
   * Kept so a caller or test can pin an application onto an existing instance.
   * What is pinned is treated as explicit, and so is never re-resolved.
   */
  set serverOauthApp(value) {
    this._explicitOauthApp = value ?? null;
  }

  /**
   * Discards a resolved application so the next read goes back to the tree.
   *
   * Resolving on read fixed reading too EARLY. It does nothing about the
   * credentials being replaced AFTER a successful resolution, because a cached
   * success is never revisited - and Liferay rewrites the config tree when it
   * deploys a client extension, which is minutes after a container starts.
   *
   * Measured twice, on different days, in an LXC deployment: the container
   * resolved and obtained a token at minute 0, Liferay rewrote the tree at
   * about minute 6, and at minute 9 - when the access token expired and a new
   * one was needed - the cached client id was rejected with
   * `401 invalid_client` and the process never recovered. The client id in use
   * matched no application in the published tree.
   *
   * Returns whether anything was discarded, so a caller can tell a stale
   * resolution from credentials that are simply wrong and not retry blindly.
   *
   * An EXPLICIT application is never discarded. A caller that pinned one
   * stated it, has no ERC and no tree to consult, and re-resolving would
   * resolve it to nothing.
   *
   * @returns {boolean}
   */
  invalidateResolvedOauthApp() {
    if (this._explicitOauthApp) return false;
    if (!this._resolvedOauthApp) return false;

    this._resolvedOauthApp = null;
    // Not throttled. The retry window exists so that a MISS does not re-stat
    // the tree on every outbound call; a 401 against a resolution that once
    // worked is a specific signal that the tree has changed, and waiting
    // 30 seconds to act on it would leave the process failing in the meantime.
    this._lastOauthAppAttemptAt = 0;
    return true;
  }

  /**
   * One attempt at reading the application out of the LXC config tree.
   *
   * @param {object} [options]
   * @param {boolean} [options.clearMissCache] Whether to flush config-node's
   *   caches first. It caches a miss on purpose - `holder.cache.set(key,
   *   value)` runs whether or not a value was found, with the comment "map
   *   undefined value so we don't process it over and over again". A lazy
   *   getter alone is therefore *not* enough: without this flush every retry
   *   reads the same cached `undefined` and the credentials are never seen, no
   *   matter how many times we ask. Verified against @rotty3000/config-node
   *   0.4.x.
   * @returns {object|null} A usable application, or null.
   */
  _resolveOauthApplication({ clearMissCache = false } = {}) {
    const erc = this._oauthApplicationErc;
    const logger = this.ctx?.logger;

    this._lastOauthAppAttemptAt = Date.now();

    if (clearMissCache) {
      try {
        clearCache();
      } catch {
        // A cache we could not flush is a stale read, not a fatal error; the
        // lookup below still runs and may still succeed.
      }
    }

    let application = null;
    try {
      application = lxcConfig.oauthApplication(erc) || null;
    } catch (e) {
      // This throws rather than returning undefined when the ERC list is
      // unreadable: it does `ercs.includes(erc)` on an `ercs` that is
      // undefined, so an absent list surfaces as a TypeError. That is the
      // ordinary "not registered yet" state, not an exceptional one.
      // `application` is still the null it was declared as: the assignment
      // above never completed.
      logger?.warn?.(
        `Could not resolve OAuth application config from LXC environment: ${e.message}`
      );
    }

    if (application && application.clientId?.()) return application;

    const recovered = this._buildHeadlessServerApplication(erc);
    if (recovered) return recovered;

    if (!application && logger?.debug) {
      logger.debug(
        `No LXC OAuth application registered for '${erc}'; falling back to environment credentials.`,
        { operation: 'oauth-application-lookup' }
      );
    }

    return null;
  }

  /**
   * An application read straight from the config tree keys, bypassing
   * `lxcConfig.oauthApplication`.
   *
   * Needed because that function memoises the application it builds, in a
   * module-private map that `clearCache()` does not reach, with
   * `applicationType` decided once from whether the headless-server client id
   * was readable *at build time*. If the ERC list lands before the credentials
   * - the ordering this whole defect is about - the application is memoised as
   * USER_AGENT, its `clientId()` reads the user-agent key forever, and no
   * amount of cache flushing recovers it. Verified against
   * @rotty3000/config-node 0.4.x.
   *
   * Only ever consulted when the primary path produced no clientId, so it
   * cannot change the result for a deployment that resolves correctly.
   *
   * @param {string} erc The external reference code.
   * @returns {object|null} A headless-server application, or null.
   */
  _buildHeadlessServerApplication(erc) {
    if (!erc) return null;

    let clientId;
    try {
      clientId = lookupConfig(`${erc}.oauth2.headless.server.client.id`);
    } catch {
      return null;
    }

    if (!clientId) return null;

    return {
      applicationType: 0, // OAuthApplicationProfile.HEADLESS_SERVER
      audience: () => lookupConfig(`${erc}.oauth2.headless.server.audience`),
      authorizationUri: () => lookupConfig(`${erc}.oauth2.authorization.uri`),
      clientId: () => lookupConfig(`${erc}.oauth2.headless.server.client.id`),
      clientSecret: () =>
        lookupConfig(`${erc}.oauth2.headless.server.client.secret`),
      introspectionUri: () => lookupConfig(`${erc}.oauth2.introspection.uri`),
      jwksUri: () => lookupConfig(`${erc}.oauth2.jwks.uri`),
      scopes: () => lookupConfig(`${erc}.oauth2.headless.server.scopes`),
      tokenUri: () => lookupConfig(`${erc}.oauth2.token.uri`),
    };
  }

  /**
   * Where Liferay is, resolved on read rather than at construction.
   *
   * This was assigned once in the constructor from `lxcConfig.dxpMainDomain()`.
   * In a colocated deployment that tree is written by Liferay when its main
   * servlet is first hit, which is after this process starts - so the
   * constructor asked before the answer could exist, cached whatever it got,
   * and every later request used it. A consumer measured 3624 connection
   * refusals to a port inside its own container while the correct host sat in
   * the environment, because the value had been captured before the system it
   * describes was ready.
   *
   * Only a successful resolution is cached. An empty answer is not stored, so
   * the next read tries again - which is the whole point, and the opposite of
   * what the previous shape did.
   *
   * The setter is kept because callers and tests assign it to pin an instance.
   */
  get liferayUrl() {
    if (this._liferayUrl !== undefined) return this._liferayUrl;

    const domain = lxcConfig.dxpMainDomain();
    const protocol = lxcConfig.dxpProtocol();
    const resolved =
      domain && protocol ? `${protocol}://${domain}` : ENV.LIFERAY_API_URL;

    if (resolved) this._liferayUrl = resolved;

    return resolved;
  }

  set liferayUrl(value) {
    this._liferayUrl = value;
  }

  /**
   * Derived from `liferayUrl`, and therefore equally unsafe to fix at
   * construction. An LXC-registered application may declare its own tokenUri;
   * absent that, the default path applies.
   */
  get tokenEndpoint() {
    if (this._tokenEndpoint !== undefined) return this._tokenEndpoint;

    const url = this.liferayUrl;

    // Not cached: with no URL there is nothing to derive, and a later read
    // may find one.
    if (!url || !url.trim()) return null;

    const application = this.serverOauthApp;
    const uri = application?.tokenUri?.();
    const resolved = uri ? `${url}${uri}` : `${url}/o/oauth2/token`;

    // Not cached while the application is still unresolved. An LXC-registered
    // application may declare its own token path, so freezing the default here
    // would outlive the credentials arriving and send every token request to
    // the wrong path - the same "answered before the answer could exist"
    // mistake this class has made twice already. Nothing to wait for when no
    // ERC was supplied, so that case caches as before.
    if (application || !this._oauthApplicationErc) {
      this._tokenEndpoint = resolved;
    }

    return resolved;
  }

  set tokenEndpoint(value) {
    this._tokenEndpoint = value;
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

    // Every downstream decision is made from `response`, not from `statusCode`:
    // HttpCoreService asks `!error.response && error.request` before concluding
    // the server never answered, and `[401, 403].includes(error.response?.status)`
    // before recognising an auth failure. Replacing the axios error without
    // carrying its response left the first branch reachable and the second one
    // not, so a rejected credential was reported as a transport fault - and
    // retried, because ErrorHandler.isRetryableError reads the same field (#238).
    if (error?.response) {
      customError.response = error.response;
    } else {
      // axios sets ERR_BAD_REQUEST for any 4xx. Copied onto an error that has
      // lost its response it is the only surviving signal, and it describes a
      // transport that was in fact fine.
      customError.code = error?.code;
    }

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
      // A rejected credential that we RESOLVED may simply be out of date:
      // Liferay rewrites the config tree when it deploys a client extension,
      // and a resolution cached before that still names the old application.
      // Discard it, re-read, and try once more.
      //
      // Exactly once. If the freshly read credentials are rejected too, the
      // problem is the credentials rather than their age, and retrying a
      // second time would turn a clear 401 into a loop against the token
      // endpoint.
      //
      // Only here. `getAccessTokenWithCredentials` is given its credentials by
      // the caller, who stated them; re-resolving those would substitute
      // something the caller did not ask for.
      if (this._isAuthRejection(error) && this.invalidateResolvedOauthApp()) {
        const freshClientId =
          this.serverOauthApp?.clientId?.() || ENV.LIFERAY_OAUTH_CLIENT_ID;
        const freshClientSecret =
          this.serverOauthApp?.clientSecret?.() ||
          ENV.LIFERAY_OAUTH_CLIENT_SECRET;

        logger?.warn?.(
          'OAuth credentials were rejected; re-read them from the config tree',
          {
            operation: 'oauth-credentials-refresh',
            status: error?.response?.status ?? error?.statusCode,
            changed: freshClientId !== clientId,
          }
        );

        if (freshClientId && freshClientSecret) {
          try {
            return await this._createOrGetAccessToken(
              this.liferayUrl,
              freshClientId,
              freshClientSecret
            );
          } catch (retryError) {
            this._handleException(retryError, this.liferayUrl, freshClientId);
          }
        }
      }

      this._handleException(error, this.liferayUrl, clientId);
    }
  }

  /**
   * Whether the server rejected who we claimed to be, as opposed to failing.
   *
   * 401 and 403 are the two the token endpoint uses for a client it will not
   * accept, and they are the two `_createAccessTokenWithRetry` treats as
   * non-retriable - correctly, since repeating a rejected credential cannot
   * change the answer. Re-reading it can.
   */
  _isAuthRejection(error) {
    const status = error?.response?.status ?? error?.statusCode;
    return status === 401 || status === 403;
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

  /**
   * Signs an *operator* in through the system browser and returns their token.
   *
   * Every other method on this class authenticates the application. This one
   * authenticates the person running the command, which is the identity a
   * route reserved for administrator accounts actually wants (#276). It is a
   * sibling of the client-credentials path, not a replacement: nothing else
   * here changes, and a consumer that never calls it is unaffected.
   *
   * `liferayUrl` defaults to the instance this service was configured for, so
   * a consumer that already built the SDK's services need only name the
   * application. There is no client secret to pass - see `pkceLogin`.
   *
   * The token is returned and **not cached**. The token cache is keyed by
   * client id and serves the client-credentials path; putting an operator's
   * token in it would mean a later caller asking for the *service's* identity
   * was handed a person's instead, which is the confusion this whole flow
   * exists to end.
   *
   * @param {object} [options] Passed through to `pkceLogin.login`, which
   *   documents `port`, `scopes`, `log`, `open` and `createServer`.
   * @param {string} [options.liferayUrl] Defaults to the configured instance.
   * @param {string} options.clientId The public OAuth2 application.
   * @returns {Promise<string>} The operator's access token.
   */
  async getAccessTokenWithPkce(options = {}) {
    const { liferayUrl, ...rest } = options;

    return pkceLogin.login({
      ...rest,
      liferayUrl: liferayUrl || this.getDefaultLiferayUrl(),
    });
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
