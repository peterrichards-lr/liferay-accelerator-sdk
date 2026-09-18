const { lxcConfig, lookupConfig } = require('@rotty3000/config-node');
const { createERC } = require('./misc.cjs');
const { ERC_PREFIX, ENV } = require('./constants.cjs');

function isValidAbsoluteUrl(maybeUrl) {
  if (!maybeUrl || typeof maybeUrl !== 'string') return false;
  if (maybeUrl.includes('undefined')) return false;
  try {
    const u = new URL(maybeUrl);
    return !!(u.protocol && u.host);
  } catch {
    return false;
  }
}

function tryBuildColocatedLiferayUrl() {
  try {
    const liferayServerProtocol = lookupConfig(
      'com.liferay.lxc.dxp.server.protocol'
    );
    const liferayServerDomain = lxcConfig.dxpMainDomain();
    if (!liferayServerProtocol || !liferayServerDomain) return null;
    const built = `${liferayServerProtocol}://${liferayServerDomain}`;
    if (isValidAbsoluteUrl(built)) return built;
  } catch {
    // Ignore error
  }
  return null;
}

/**
 * Whether the caller asked for Basic authentication.
 *
 * Basic is reachable only by asking for it. It used to be inferred from
 * `!config.clientId && ENV.LIFERAY_API_USERNAME && ENV.LIFERAY_API_PASSWORD`,
 * which made the SDK pick the weaker mechanism out of process-wide state the
 * caller may never have set: a config read that came back without a clientId
 * produced a successful request authenticated as somebody else rather than the
 * error `validateOAuthConfig` already knows how to raise (#236).
 *
 * @param {object} [config] The connection config.
 * @returns {boolean} True when Basic was requested, by config or environment.
 */
function isBasicAuthRequested(config = {}) {
  return config?.authMethod === 'basic' || ENV.LIFERAY_AUTH_METHOD === 'basic';
}

/**
 * The username and password to send once Basic has been asked for.
 *
 * The environment is still read here, because a caller that declared
 * `authMethod: 'basic'` has said which mechanism it wants and may reasonably
 * keep the credentials out of its config. What it cannot do is leave the
 * mechanism to the environment.
 *
 * @param {object} [config] The connection config.
 * @returns {{username: string, password: string}} The resolved pair.
 * @throws {Error} When either half is missing, naming the half that is - half a
 *   credential is a configuration error, not a reason to send an empty one.
 */
function resolveBasicCredentials(config = {}) {
  const username = config?.username || ENV.LIFERAY_API_USERNAME;
  const password = config?.password || ENV.LIFERAY_API_PASSWORD;

  const missing = [
    username ? null : 'username',
    password ? null : 'password',
  ].filter(Boolean);

  if (missing.length > 0) {
    const e = new Error(
      `Basic authentication was requested, but ${missing.join(' and ')} ` +
        'is missing. Supply username and password in the config, or set ' +
        'LIFERAY_API_USERNAME and LIFERAY_API_PASSWORD.'
    );
    e.name = 'LiferayRequestError';
    e.operation = 'liferay-auth-resolution';
    e.statusCode = 400;
    e.errorType = 'auth_config';
    e.field = missing[0];
    throw e;
  }

  return { username, password };
}

/**
 * Whether the caller asked to present an access token it already holds.
 *
 * The third mechanism, alongside client credentials and the Basic carve-out,
 * and the one an operator signed in through `pkceLogin` arrives on (#276).
 * Like Basic since #236, it is reachable only by asking for it - a config that
 * merely happens to carry an `accessToken` still takes the OAuth branch, so
 * this cannot silently redirect an existing caller.
 *
 * Unlike Basic there is deliberately no environment declaration. An operator
 * token is short-lived and obtained in-process by a browser round trip; a
 * `LIFERAY_ACCESS_TOKEN` would only exist to be written down somewhere, which
 * is the thing the flow that mints it avoids.
 *
 * @param {object} [config] The connection config.
 * @returns {boolean} True when token authentication was requested.
 */
function isTokenAuthRequested(config = {}) {
  return config?.authMethod === 'token';
}

/**
 * The bearer token to send once token authentication has been asked for.
 *
 * @param {object} [config] The connection config.
 * @returns {string} The access token.
 * @throws {Error} When none was supplied. Sending `Bearer undefined` would come
 *   back as a 401 indistinguishable from a rejected credential.
 */
function resolveTokenCredential(config = {}) {
  const accessToken = config?.accessToken;

  if (!accessToken) {
    const e = new Error(
      'Token authentication was requested, but no accessToken was supplied. ' +
        'Set accessToken on the config - an operator token comes from ' +
        'pkceLogin.login() and is not read from the environment.'
    );
    e.name = 'LiferayRequestError';
    e.operation = 'liferay-auth-resolution';
    e.statusCode = 400;
    e.errorType = 'auth_config';
    e.field = 'accessToken';
    throw e;
  }

  return accessToken;
}

function resolveEffectiveLiferayConnection(
  config = {},
  oauthService,
  persistence
) {
  const errorReference = createERC(ERC_PREFIX.ERROR);

  const isColocated =
    typeof oauthService?.isLiferayRouteAvailable === 'function' &&
    oauthService.isLiferayRouteAvailable();

  let liferayUrl = config.liferayUrl || config.url;
  let clientId = config.clientId;
  let clientSecret = config.clientSecret;

  // 1. Resolve Liferay URL
  if (!isValidAbsoluteUrl(liferayUrl)) {
    liferayUrl =
      (typeof oauthService?.getDefaultLiferayUrl === 'function'
        ? oauthService.getDefaultLiferayUrl()
        : null) ||
      tryBuildColocatedLiferayUrl() ||
      ENV.LIFERAY_API_URL ||
      persistence?.getSystemSetting?.('active_liferay_url') ||
      null;
  }

  // 2. Resolve Credentials based on location
  if (isColocated) {
    if (!clientId && typeof oauthService?.getDefaultClientId === 'function') {
      clientId = oauthService.getDefaultClientId();
    }

    if (
      !clientSecret &&
      typeof oauthService?.getDefaultClientSecret === 'function'
    ) {
      clientSecret = oauthService.getDefaultClientSecret();
    }
  } else {
    // STANDALONE / LOCAL: Fallback to ENV then DB if config is empty
    if (!clientId) {
      clientId =
        ENV.LIFERAY_OAUTH_CLIENT_ID ||
        persistence?.getSystemSetting?.('active_client_id');
    }
    if (!clientSecret) {
      clientSecret =
        ENV.LIFERAY_OAUTH_CLIENT_SECRET ||
        persistence?.getSystemSetting?.('active_client_secret');
    }
  }

  if (!isValidAbsoluteUrl(liferayUrl)) {
    const e = new Error(
      'Liferay URL is not configured. Please provide liferayUrl in the request or set LIFERAY_API_URL.'
    );
    e.name = 'LiferayRequestError';
    e.operation = 'liferay-url-resolution';
    e.userMessage =
      'Missing Liferay URL. Provide a valid liferayUrl in the AI Commerce Accelerator configuration or environment.';
    e.errorReference = errorReference;
    e.problem = {
      status: 'CONFIGURATION_ERROR',
      detail:
        'No liferayUrl was provided, and this service cannot derive one from the environment.',
    };
    throw e;
  }

  // VALIDATION: We either need OAuth credentials OR Basic Auth credentials (checked later in rest.cjs)
  //
  // Ambient LIFERAY_API_USERNAME/PASSWORD only count once Basic has been asked
  // for. Counting them unconditionally let a caller with no OAuth credentials
  // resolve a connection here and be downgraded to Basic a frame later, which
  // is the inference #236 removed.
  const hasOAuth = clientId && clientSecret;
  const hasBasic =
    isBasicAuthRequested(config) &&
    Boolean(config.username || ENV.LIFERAY_API_USERNAME) &&
    Boolean(config.password || ENV.LIFERAY_API_PASSWORD);
  // A caller presenting an operator token has no client credential pair and no
  // Basic pair, and would otherwise be refused here before reaching the
  // transport that knows what to do with it (#276). Widening only: every
  // config that resolved before still resolves, and only a config that
  // explicitly declared this mechanism can take the new branch.
  const hasToken = isTokenAuthRequested(config) && Boolean(config.accessToken);

  if (!isColocated && !hasOAuth && !hasBasic && !hasToken) {
    const e = new Error('Liferay authentication is not configured');
    e.name = 'LiferayRequestError';
    e.operation = 'liferay-auth-resolution';
    e.userMessage =
      'Liferay authentication is not configured. Please provide Client ID and Client Secret in the AI Configuration, or set system environment variables.';
    e.errorReference = errorReference;
    e.problem = {
      status: 'AUTH_CONFIG_ERROR',
      detail:
        'No authentication credentials (OAuth or Basic) were found in the request or environment.',
    };
    throw e;
  }

  // authMethod travels straight through, unexamined by anything above -
  // this function only resolves the OAuth half of a connection. It is
  // included in the return anyway because `_client` (HttpCoreService.cjs)
  // used to hand this return value straight to `createAxiosInstance`,
  // which reads authMethod off exactly that object to pick Basic vs OAuth.
  // Dropping it here meant a caller that asked for Basic auth still got
  // routed to `oauth.getAccessToken`, an object `ctx.oauth` need not even
  // hold for a Basic-only caller (#262). Returning it here means a caller
  // that forgets to spread the input config back over this return value -
  // as `_client` did - still gets the right mechanism.
  // `accessToken` rides back for the same reason as `authMethod`: a caller that
  // forgets to spread its input config over this return value - as `_client`
  // did before #262 - would otherwise hand the transport a mechanism with no
  // credential to go with it.
  return {
    liferayUrl,
    clientId,
    clientSecret,
    isColocated,
    authMethod: config.authMethod,
    accessToken: config.accessToken,
  };
}

module.exports = {
  isValidAbsoluteUrl,
  tryBuildColocatedLiferayUrl,
  resolveEffectiveLiferayConnection,
  isBasicAuthRequested,
  resolveBasicCredentials,
  isTokenAuthRequested,
  resolveTokenCredential,
};
