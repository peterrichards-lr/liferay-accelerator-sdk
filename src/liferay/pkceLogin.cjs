/**
 * Signing in as a person, from a terminal.
 *
 * Everything else in this package authenticates an *application*: client
 * credentials name the deployed service, and the Basic carve-out names whatever
 * account a process was configured with. Neither is an operator, and no
 * allowlist entry can make one - so a command acting on routes reserved for
 * administrator accounts had no identity to present (#276).
 *
 * This is the flow RFC 8252 specifies for native applications, and the one gh,
 * aws and gcloud use: an authorization code with PKCE, redirected to a loopback
 * listener, through the system browser.
 *
 * Four details are specified rather than chosen, and each closes something:
 *
 *   - **S256, never `plain`** (RFC 7636 s4.2). The challenge is what travels
 *     through the browser and the authorization server's logs, and a `plain`
 *     challenge *is* the verifier, so recording one hands over the other.
 *   - **127.0.0.1, never `localhost`** (RFC 8252 s8.3). `localhost` resolves
 *     through DNS and the hosts file and can be pointed elsewhere; the IP
 *     literal cannot. The listener binds that interface alone, because it
 *     accepts an authorization code and nothing off the machine should reach
 *     it.
 *   - **The system browser, never an embedded view** (RFC 8252 s8.12). An
 *     embedded view can observe what the operator types, which is the thing
 *     this avoids.
 *   - **No client secret.** A secret shipped inside a distributed CLI is not a
 *     secret, and this flow is what replaces it: the code is bound by the
 *     challenge to the process that asked for it, so an intercepted code is
 *     useless on its own.
 *
 * Plus one operational decision: **the token is returned, never stored.** Not
 * to disk, and not into `OAuthService`'s token cache either - that cache is
 * keyed by client id and serves the client-credentials path, so an operator
 * token left in it would later be handed to a caller that asked for the
 * service's identity. Re-authenticating costs one browser round trip on
 * commands this rare, and a token at rest is a credential to look after.
 *
 * Deliberately dependency-free beyond `node:` builtins, so a CLI can require
 * this file alone - before any SDK context, config or transport exists.
 *
 * @module liferay/pkceLogin
 */

const crypto = require('crypto');
const http = require('http');
const { spawn } = require('child_process');

/**
 * The loopback port the redirect comes back to.
 *
 * Registered with the OAuth2 application, so it cannot be arbitrary. RFC 8252
 * s7.3 *recommends* servers accept any loopback port, but that is a
 * recommendation: an exact-match registration works whether or not a given
 * server follows it, and failing loudly on a busy port beats depending on
 * behaviour nobody measured.
 */
const DEFAULT_PORT = 38017;

/** The only challenge method this module will send. See the note above. */
const CODE_CHALLENGE_METHOD = 'S256';

/** The interface the listener binds, and the host in the redirect URI. */
const LOOPBACK_HOST = '127.0.0.1';

const base64url = (buffer) => buffer.toString('base64url');

/**
 * A verifier and the challenge derived from it.
 *
 * 32 random bytes base64url-encoded is 43 characters: the bottom of the 43-128
 * range RFC 7636 s4.1 requires, from the unreserved alphabet, with no padding
 * for a query string to mangle.
 *
 * @returns {{verifier: string, challenge: string, method: string}} The pair,
 *   and the method naming how the challenge was derived.
 */
function createPkcePair() {
  const verifier = base64url(crypto.randomBytes(32));
  const challenge = base64url(
    crypto.createHash('sha256').update(verifier).digest()
  );

  return { verifier, challenge, method: CODE_CHALLENGE_METHOD };
}

/**
 * The URL to send the operator's browser to.
 *
 * @param {object} params
 * @param {string} params.liferayUrl The instance to authenticate against.
 * @param {string} params.clientId The OAuth2 application's client id.
 * @param {string} params.redirectUri Where the authorization server sends the
 *   code back to; registered with the application.
 * @param {string} params.challenge The S256 challenge from `createPkcePair`.
 * @param {string} params.state The value `readCallback` will require back.
 * @param {string} [params.scopes] Space-separated scopes, when the application
 *   does not grant them by default.
 * @returns {string} The absolute authorize URL.
 */
function buildAuthorizeUrl({
  liferayUrl,
  clientId,
  redirectUri,
  challenge,
  state,
  scopes,
}) {
  const url = new URL('/o/oauth2/authorize', liferayUrl);

  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', CODE_CHALLENGE_METHOD);
  url.searchParams.set('state', state);

  if (scopes) {
    url.searchParams.set('scope', scopes);
  }

  return url.toString();
}

/**
 * What came back on the redirect.
 *
 * The state check is the CSRF defence (RFC 6749 s10.12): without it a code from
 * someone else's authorization could be delivered to this listener and
 * exchanged here, binding the operator's session to an account they do not own.
 *
 * An error is read before the state, because an authorization server that
 * refuses early may answer without one - reporting "state did not match" for
 * a denied consent would name the wrong cause.
 *
 * @param {string} requestUrl The request line's URL, absolute or rooted.
 * @param {string} expectedState The state this login sent.
 * @returns {{code: string}|{error: string}} The code, or why there is none.
 */
function readCallback(requestUrl, expectedState) {
  const params = new URL(requestUrl, `http://${LOOPBACK_HOST}`).searchParams;
  const error = params.get('error');

  if (error) {
    const description = params.get('error_description');

    return {
      error: description ? `${error}: ${description}` : error,
    };
  }

  const state = params.get('state');

  if (!state || state !== expectedState) {
    return { error: 'state did not match the one this login sent' };
  }

  const code = params.get('code');

  if (!code) {
    return { error: 'no authorization code in the redirect' };
  }

  return { code };
}

/**
 * Hands the URL to the *system* browser - never an embedded view, which could
 * observe what the operator types (RFC 8252 s8.12).
 *
 * Detached and with its streams ignored, so the opener does not hold the CLI
 * open or write over its output.
 *
 * @param {string} url The authorize URL.
 * @param {Function} [spawnImpl] The spawn to use; injectable so the platform
 *   dispatch can be tested without launching anything.
 * @returns {boolean} Whether the platform opener could be spawned. A false
 *   here is not fatal: `login` has already printed the URL to paste.
 */
function openInBrowser(url, spawnImpl = spawn) {
  const command =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

  try {
    spawnImpl(command, [url], { detached: true, stdio: 'ignore' }).unref();
    return true;
  } catch {
    return false;
  }
}

/**
 * Waits for one redirect, then stops listening.
 *
 * @param {import('http').Server} server A server that has not yet been listened
 *   on; injectable so the flow can be driven without a real socket.
 * @param {number} port The registered redirect port.
 * @param {string} expectedState The state to require back.
 * @returns {Promise<string>} The authorization code.
 */
function awaitRedirect(server, port, expectedState) {
  return new Promise((resolve, reject) => {
    server.on('request', (req, res) => {
      const outcome = readCallback(req.url, expectedState);

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(
        outcome.error
          ? `Sign-in failed: ${outcome.error}\n\nYou can close this tab.`
          : 'Signed in. You can close this tab and return to the terminal.'
      );

      server.close();

      if (outcome.error) {
        reject(new Error(outcome.error));
      } else {
        resolve(outcome.code);
      }
    });

    server.on('error', (error) => {
      reject(
        error.code === 'EADDRINUSE'
          ? new Error(
              `Port ${port} is in use, and it is the one registered as this ` +
                `CLI's redirect URI, so another port cannot be substituted. ` +
                `Close whatever is holding it and try again.`
            )
          : error
      );
    });

    // The loopback interface only, and by IP literal - see the module note.
    server.listen(port, LOOPBACK_HOST);
  });
}

/**
 * Trades the authorization code for an access token.
 *
 * Sent without a client secret and with the verifier instead: the authorization
 * server hashes it and compares against the challenge it saw, which is what
 * proves this is the process that started the flow.
 *
 * Deliberately not retried, and deliberately not routed through
 * `OAuthService`'s retrying token path. An authorization code is single-use
 * (RFC 6749 s4.1.2), so a retry either repeats a request that already
 * succeeded elsewhere or replays a code the server has now revoked - there is
 * nothing here for a backoff to rescue.
 *
 * @param {object} params
 * @param {string} params.liferayUrl The instance that issued the code.
 * @param {string} params.clientId The OAuth2 application's client id.
 * @param {string} params.redirectUri The same URI the code was sent to.
 * @param {string} params.code The authorization code.
 * @param {string} params.verifier The verifier whose challenge was sent.
 * @returns {Promise<string>} The access token.
 * @throws {Error} When the exchange is refused, or answers 200 with no token.
 */
async function exchangeCode({
  liferayUrl,
  clientId,
  redirectUri,
  code,
  verifier,
}) {
  const res = await fetch(new URL('/o/oauth2/token', liferayUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      code_verifier: verifier,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Could not exchange the authorization code: HTTP ${res.status}: ${await res.text()}`
    );
  }

  const body = await res.json();

  // A 200 carrying no token would otherwise be sent as `Bearer undefined` and
  // come back as a 401 that looks like a rejected credential.
  if (!body.access_token) {
    throw new Error(
      'Liferay returned no access_token for the authorization code.'
    );
  }

  return body.access_token;
}

/**
 * Signs an operator in and returns their access token.
 *
 * `open` and `createServer` are injectable so the whole flow can be driven in a
 * test without a browser or a real port.
 *
 * @param {object} options
 * @param {string} options.liferayUrl The instance to authenticate against.
 * @param {string} options.clientId The OAuth2 application's client id. Public
 *   by design - there is no secret to pair it with.
 * @param {number} [options.port] The registered redirect port.
 * @param {string} [options.scopes] Space-separated scopes to request.
 * @param {Function} [options.log] Where the browser prompt is written. Defaults
 *   to stderr, so a CLI piping stdout is unaffected.
 * @param {Function} [options.open] Opens the system browser.
 * @param {Function} [options.createServer] Builds the loopback listener.
 * @returns {Promise<string>} The access token. Never written anywhere.
 * @throws {Error} When no instance or client id was named, when the redirect
 *   carries an error or a state that does not match, or when the exchange
 *   fails.
 */
async function login({
  liferayUrl,
  clientId,
  port = DEFAULT_PORT,
  scopes,
  log = console.error,
  open = openInBrowser,
  createServer = http.createServer,
} = {}) {
  if (!liferayUrl) throw new Error('No Liferay URL to sign in against.');
  if (!clientId) throw new Error('No OAuth2 client id for the CLI.');

  const { verifier, challenge } = createPkcePair();
  const state = base64url(crypto.randomBytes(16));
  const redirectUri = `http://${LOOPBACK_HOST}:${port}/callback`;
  const authorizeUrl = buildAuthorizeUrl({
    liferayUrl,
    clientId,
    redirectUri,
    challenge,
    state,
    scopes,
  });

  const server = createServer();

  // Listening is armed before the browser is opened. The other order races: a
  // cached consent can redirect back before the listener is up, and the code
  // would arrive at a closed port.
  const redirect = awaitRedirect(server, port, state);

  log(`Opening your browser to sign in to ${liferayUrl}`);
  log(`If it does not open, visit:\n   ${authorizeUrl}\n`);
  open(authorizeUrl);

  const code = await redirect;

  return exchangeCode({ liferayUrl, clientId, redirectUri, code, verifier });
}

module.exports = {
  CODE_CHALLENGE_METHOD,
  DEFAULT_PORT,
  LOOPBACK_HOST,
  buildAuthorizeUrl,
  createPkcePair,
  exchangeCode,
  login,
  openInBrowser,
  readCallback,
};
