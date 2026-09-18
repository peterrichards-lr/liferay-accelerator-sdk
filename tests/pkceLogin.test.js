import { vi, describe, it, expect, afterEach } from 'vitest';

const crypto = require('crypto');

const {
  CODE_CHALLENGE_METHOD,
  DEFAULT_PORT,
  LOOPBACK_HOST,
  buildAuthorizeUrl,
  createPkcePair,
  exchangeCode,
  login,
  openInBrowser,
  readCallback,
} = require('../src/liferay/pkceLogin.cjs');
const HttpCoreService = require('../src/liferay/rest/HttpCoreService.cjs');
const LiferayGraphQLService = require('../src/liferay/graphql.cjs');
const OAuthService = require('../src/liferay/oauth.cjs');
const liferayEnv = require('../src/utils/liferayEnv.cjs');
const { ENV } = require('../src/utils/constants.cjs');

/**
 * RFC 8252, the flow gh/aws/gcloud use: an authorization code with PKCE,
 * redirected to a loopback listener, through the system browser (#276).
 *
 * The properties under test are the ones the specification exists to protect -
 * that the challenge is a digest rather than the verifier, that a code from
 * another authorization cannot be exchanged here, that no client secret is
 * anywhere in the flow, and that the listener is not reachable from off the
 * machine. A flow that merely returned a token while failing these would look
 * identical in use.
 *
 * What is not tested here, because it cannot be without a browser and a
 * Liferay: that Liferay's own /o/oauth2/authorize honours S256, and that a
 * real system browser reaches the listener. Those are asserted about the
 * requests this module builds, not about the responses it would receive.
 */

const TOKEN_RESPONSE = (body = { access_token: 'the-token' }) =>
  vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => body,
    text: async () => JSON.stringify(body),
  });

/**
 * A listener that hands the flow one redirect, so a whole login can be driven
 * without a browser or a real socket. The state is generated inside `login`,
 * so it is captured from the URL the flow opens rather than guessed.
 */
function fakeLoopback({ callbackPath = '/callback', code = 'the-code' } = {}) {
  const record = {
    boundHost: null,
    boundPort: null,
    opened: null,
    closed: 0,
    // The order the two happened in, so a flow that opens the browser before
    // arming the listener can be told apart from one that does not.
    sequence: [],
  };
  const handlers = {};

  const server = {
    on: (event, handler) => {
      handlers[event] = handler;
    },
    listen: (port, host) => {
      record.boundHost = host;
      record.boundPort = port;
      record.sequence.push('listen');
      setImmediate(() => {
        const state = record.opened
          ? new URL(record.opened).searchParams.get('state')
          : '';
        handlers.request?.(
          { url: `${callbackPath}?code=${code}&state=${state}` },
          { writeHead() {}, end() {} }
        );
      });
    },
    close: () => {
      record.closed += 1;
    },
    emit: (event, value) => handlers[event]?.(value),
  };

  return {
    record,
    createServer: () => server,
    open: (url) => {
      record.opened = url;
      record.sequence.push('open');
    },
  };
}

describe('PKCE loopback login (#276)', () => {
  describe('the PKCE pair', () => {
    it('derives the challenge as base64url(sha256(verifier))', () => {
      const { verifier, challenge, method } = createPkcePair();
      const expected = crypto
        .createHash('sha256')
        .update(verifier)
        .digest('base64url');

      expect(challenge).toBe(expected);
      expect(method).toBe('S256');
    });

    // `plain` would put the verifier through the browser and the authorization
    // server's logs, which is the thing the digest avoids.
    it('never sends the verifier as the challenge', () => {
      const { verifier, challenge } = createPkcePair();

      expect(challenge).not.toBe(verifier);
    });

    it('is different every time', () => {
      expect(createPkcePair().verifier).not.toBe(createPkcePair().verifier);
    });

    // 32 bytes base64url-encoded: inside the 43-128 character range RFC 7636
    // s4.1 requires, from the unreserved alphabet, with no padding a query
    // string could mangle.
    it('produces a verifier of usable length and alphabet', () => {
      const { verifier } = createPkcePair();

      expect(verifier.length).toBeGreaterThanOrEqual(43);
      expect(verifier.length).toBeLessThanOrEqual(128);
      expect(verifier).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('produces a challenge from the same alphabet, unpadded', () => {
      const { challenge } = createPkcePair();

      expect(challenge).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(challenge).not.toContain('=');
    });

    it('declares S256 as the only method this module will send', () => {
      expect(CODE_CHALLENGE_METHOD).toBe('S256');
    });
  });

  describe('the authorize URL', () => {
    const url = (overrides = {}) =>
      new URL(
        buildAuthorizeUrl({
          liferayUrl: 'http://liferay:8080',
          clientId: 'id-cli',
          redirectUri: `http://${LOOPBACK_HOST}:${DEFAULT_PORT}/callback`,
          challenge: 'the-challenge',
          state: 'the-state',
          scopes: 'Liferay.Headless.Admin.User.everything.read',
          ...overrides,
        })
      );

    it('asks for a code, with the challenge and its method', () => {
      const p = url().searchParams;

      expect(p.get('response_type')).toBe('code');
      expect(p.get('code_challenge')).toBe('the-challenge');
      expect(p.get('code_challenge_method')).toBe('S256');
      expect(p.get('client_id')).toBe('id-cli');
      expect(p.get('state')).toBe('the-state');
    });

    // Passing a redirect_uri through is not worth asserting on its own - that
    // would test the fixture. The one `login` builds is asserted below, where
    // it is the code's choice rather than the test's.
    it('passes the redirect_uri through unchanged', () => {
      expect(url().searchParams.get('redirect_uri')).toBe(
        `http://${LOOPBACK_HOST}:${DEFAULT_PORT}/callback`
      );
    });

    it('carries no client secret', () => {
      expect(url().searchParams.get('client_secret')).toBeNull();
      expect(url().toString()).not.toContain('client_secret');
    });

    it('targets the Liferay authorize endpoint', () => {
      expect(url().pathname).toBe('/o/oauth2/authorize');
      expect(url().host).toBe('liferay:8080');
    });

    it('omits scope entirely when none was asked for', () => {
      expect(url({ scopes: undefined }).searchParams.get('scope')).toBeNull();
    });

    it('sends the scopes it was given', () => {
      expect(url().searchParams.get('scope')).toBe(
        'Liferay.Headless.Admin.User.everything.read'
      );
    });
  });

  describe('the redirect', () => {
    it('returns the code when the state matches', () => {
      expect(readCallback('/callback?code=abc&state=xyz', 'xyz')).toEqual({
        code: 'abc',
      });
    });

    // Without this, a code from someone else's authorization could be
    // delivered to this listener and exchanged here.
    it('refuses a mismatched state', () => {
      const result = readCallback('/callback?code=abc&state=attacker', 'xyz');

      expect(result.error).toMatch(/state did not match/);
      expect(result.code).toBeUndefined();
    });

    it('refuses a missing state', () => {
      const result = readCallback('/callback?code=abc', 'xyz');

      expect(result.error).toMatch(/state did not match/);
      expect(result.code).toBeUndefined();
    });

    // An empty state on both sides is not a match - it is two absent values.
    it('refuses an empty state even when nothing was expected', () => {
      expect(readCallback('/callback?code=abc&state=', '').error).toMatch(
        /state did not match/
      );
    });

    it('surfaces an error the authorization server returned', () => {
      const result = readCallback(
        '/callback?error=access_denied&error_description=User+said+no&state=xyz',
        'xyz'
      );

      expect(result.error).toMatch(/access_denied/);
      expect(result.error).toMatch(/User said no/);
      expect(result.code).toBeUndefined();
    });

    it('reports a bare error without inventing a description', () => {
      expect(
        readCallback('/callback?error=access_denied&state=xyz', 'xyz')
      ).toEqual({ error: 'access_denied' });
    });

    // An error arrives without state; refusing it for that reason would report
    // the wrong cause.
    it('reports the server error rather than the absent state', () => {
      expect(
        readCallback('/callback?error=access_denied', 'xyz').error
      ).toMatch(/access_denied/);
    });

    it('refuses a redirect carrying neither code nor error', () => {
      expect(readCallback('/callback?state=xyz', 'xyz').error).toMatch(
        /no authorization code/
      );
    });
  });

  describe('the exchange', () => {
    afterEach(() => vi.unstubAllGlobals());

    const stub = (body, ok = true, status = 200) => {
      const f = vi.fn().mockResolvedValue({
        ok,
        status,
        json: async () => body,
        text: async () => JSON.stringify(body),
      });
      vi.stubGlobal('fetch', f);
      return f;
    };

    const exchange = (overrides = {}) =>
      exchangeCode({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        redirectUri: `http://${LOOPBACK_HOST}:${DEFAULT_PORT}/callback`,
        code: 'the-code',
        verifier: 'the-verifier',
        ...overrides,
      });

    it('sends the verifier, not the challenge', async () => {
      const f = stub({ access_token: 'the-token' });

      await exchange();

      const body = String(f.mock.calls[0][1].body);

      expect(body).toContain('grant_type=authorization_code');
      expect(body).toContain('code_verifier=the-verifier');
      expect(body).toContain('code=the-code');
      expect(body).not.toContain('code_challenge');
    });

    // The entire point of the flow: a public client has no secret to send.
    it('sends no client secret', async () => {
      const f = stub({ access_token: 'the-token' });

      await exchange();

      expect(String(f.mock.calls[0][1].body)).not.toContain('client_secret');
    });

    it('posts form-encoded to the Liferay token endpoint', async () => {
      const f = stub({ access_token: 'the-token' });

      await exchange();

      const [target, init] = f.mock.calls[0];

      expect(String(target)).toBe('http://liferay:8080/o/oauth2/token');
      expect(init.method).toBe('POST');
      expect(init.headers['Content-Type']).toBe(
        'application/x-www-form-urlencoded'
      );
    });

    it('returns the access token', async () => {
      stub({ access_token: 'the-token' });

      await expect(exchange()).resolves.toBe('the-token');
    });

    it('surfaces a rejected exchange', async () => {
      stub({ error: 'invalid_grant' }, false, 400);

      await expect(exchange()).rejects.toThrow(/HTTP 400/);
    });

    // A 200 with no token would otherwise be sent as `Bearer undefined`.
    it('refuses a response with no access_token', async () => {
      stub({ token_type: 'Bearer' });

      await expect(exchange()).rejects.toThrow(/no access_token/);
    });

    // An authorization code is single-use (RFC 6749 s4.1.2), so a retry either
    // repeats a request that already succeeded or replays a revoked code.
    it('does not retry a refused exchange', async () => {
      const f = stub({ error: 'invalid_grant' }, false, 400);

      await expect(exchange()).rejects.toThrow(/HTTP 400/);
      expect(f).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('binds the loopback interface only, by IP literal', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(loopback.record.boundHost).toBe('127.0.0.1');
      expect(loopback.record.boundPort).toBe(DEFAULT_PORT);
    });

    // RFC 8252 s8.3: `localhost` resolves through DNS and the hosts file and
    // can be pointed elsewhere; the IP literal cannot. This asserts the URI
    // `login` constructs, not one handed to it.
    it('builds a redirect to the loopback IP literal, never localhost', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      const redirectUri = new URL(loopback.record.opened).searchParams.get(
        'redirect_uri'
      );

      expect(redirectUri).toBe(`http://127.0.0.1:${DEFAULT_PORT}/callback`);
      expect(redirectUri).not.toContain('localhost');
    });

    it('listens on the port it registers in the redirect URI', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        port: 45555,
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(loopback.record.boundPort).toBe(45555);
      expect(
        new URL(loopback.record.opened).searchParams.get('redirect_uri')
      ).toBe('http://127.0.0.1:45555/callback');
    });

    it('returns the token and sends the verifier matching the challenge it opened', async () => {
      const fetchMock = TOKEN_RESPONSE();
      vi.stubGlobal('fetch', fetchMock);
      const loopback = fakeLoopback();

      const token = await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(token).toBe('the-token');

      const challenge = new URL(loopback.record.opened).searchParams.get(
        'code_challenge'
      );
      const verifier = new URLSearchParams(
        String(fetchMock.mock.calls[0][1].body)
      ).get('code_verifier');

      // The pair actually used in the flow, end to end: the challenge that
      // went through the browser is the digest of the verifier that came back
      // over the wire. A `login` that generated two unrelated pairs, or sent
      // the verifier as the challenge, fails here.
      expect(
        crypto.createHash('sha256').update(verifier).digest('base64url')
      ).toBe(challenge);
      expect(verifier).not.toBe(challenge);
    });

    it('opens the browser with the same URL it prints', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();
      const lines = [];

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: (line) => lines.push(line),
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(lines.join('\n')).toContain(loopback.record.opened);
    });

    // The other order races: a cached consent can redirect back before the
    // listener is up, and the code would arrive at a closed port.
    it('arms the listener before opening the browser', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(loopback.record.sequence).toEqual(['listen', 'open']);
    });

    it('stops listening once the redirect has been handled', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(loopback.record.closed).toBe(1);
    });

    it('generates a fresh state for every login', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const states = [];

      for (let i = 0; i < 2; i += 1) {
        const loopback = fakeLoopback();
        await login({
          liferayUrl: 'http://liferay:8080',
          clientId: 'id-cli',
          log: () => {},
          open: loopback.open,
          createServer: loopback.createServer,
        });
        states.push(new URL(loopback.record.opened).searchParams.get('state'));
      }

      expect(states[0]).not.toBe(states[1]);
      expect(states[0]).toBeTruthy();
    });

    it('rejects a redirect whose state is not the one it sent', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const loopback = fakeLoopback();
      // Ignore the state the flow generated and answer with another one.
      loopback.open = () => {};

      await expect(
        login({
          liferayUrl: 'http://liferay:8080',
          clientId: 'id-cli',
          log: () => {},
          open: () => {},
          createServer: loopback.createServer,
        })
      ).rejects.toThrow(/state did not match/);
    });

    it('never exchanges a code that failed the state check', async () => {
      const fetchMock = TOKEN_RESPONSE();
      vi.stubGlobal('fetch', fetchMock);
      const loopback = fakeLoopback();

      await login({
        liferayUrl: 'http://liferay:8080',
        clientId: 'id-cli',
        log: () => {},
        open: () => {},
        createServer: loopback.createServer,
      }).catch(() => {});

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('explains a busy port rather than silently moving to another one', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const handlers = {};
      const server = {
        on: (event, handler) => {
          handlers[event] = handler;
        },
        listen: () => {
          setImmediate(() =>
            handlers.error?.(
              Object.assign(new Error('boom'), {
                code: 'EADDRINUSE',
              })
            )
          );
        },
        close: () => {},
      };

      await expect(
        login({
          liferayUrl: 'http://liferay:8080',
          clientId: 'id-cli',
          log: () => {},
          open: () => {},
          createServer: () => server,
        })
      ).rejects.toThrow(/is in use/);
    });

    it('surfaces a listener error that is not a busy port as itself', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const handlers = {};
      const server = {
        on: (event, handler) => {
          handlers[event] = handler;
        },
        listen: () => {
          setImmediate(() =>
            handlers.error?.(
              Object.assign(new Error('EACCES: denied'), {
                code: 'EACCES',
              })
            )
          );
        },
        close: () => {},
      };

      await expect(
        login({
          liferayUrl: 'http://liferay:8080',
          clientId: 'id-cli',
          log: () => {},
          open: () => {},
          createServer: () => server,
        })
      ).rejects.toThrow(/EACCES/);
    });

    it('refuses without a Liferay URL or client id', async () => {
      await expect(
        login({ clientId: 'id', log: () => {}, createServer: () => ({}) })
      ).rejects.toThrow(/Liferay URL/);

      await expect(
        login({
          liferayUrl: 'http://x',
          log: () => {},
          createServer: () => ({}),
        })
      ).rejects.toThrow(/client id/);
    });

    it('refuses before building a listener at all', async () => {
      const createServer = vi.fn();

      await expect(
        login({ clientId: 'id', log: () => {}, createServer })
      ).rejects.toThrow(/Liferay URL/);

      expect(createServer).not.toHaveBeenCalled();
    });
  });

  // RFC 8252 s8.12: the system browser, never an embedded view - an embedded
  // one can observe what the operator types. Every other test injects `open`,
  // so this is the only place the default seam is exercised at all.
  describe('the default browser opener', () => {
    const platform = process.platform;

    const asPlatform = (value) =>
      Object.defineProperty(process, 'platform', {
        value,
        configurable: true,
      });

    afterEach(() => asPlatform(platform));

    const spawnSpy = () => {
      const unref = vi.fn();
      const spawn = vi.fn().mockReturnValue({ unref });
      return { spawn, unref };
    };

    it.each([
      ['darwin', 'open'],
      ['win32', 'start'],
      ['linux', 'xdg-open'],
    ])('hands the URL to the %s system opener', (value, command) => {
      asPlatform(value);
      const { spawn } = spawnSpy();

      expect(openInBrowser('http://liferay:8080/authorize', spawn)).toBe(true);
      expect(spawn).toHaveBeenCalledWith(
        command,
        ['http://liferay:8080/authorize'],
        { detached: true, stdio: 'ignore' }
      );
    });

    // Detached and unreferenced, so the opener does not hold the CLI open.
    it('does not let the opener hold the process open', () => {
      asPlatform('darwin');
      const { spawn, unref } = spawnSpy();

      openInBrowser('http://liferay:8080/authorize', spawn);

      expect(unref).toHaveBeenCalled();
    });

    // Not fatal: `login` has already printed the URL to paste.
    it('reports failure rather than throwing when nothing can be spawned', () => {
      asPlatform('linux');
      const spawn = vi.fn(() => {
        throw new Error('ENOENT');
      });

      expect(openInBrowser('http://liferay:8080/authorize', spawn)).toBe(false);
    });
  });

  describe('OAuthService.getAccessTokenWithPkce', () => {
    afterEach(() => vi.unstubAllGlobals());

    const makeService = () =>
      new OAuthService({
        logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn() },
        cache: {
          get: vi.fn().mockReturnValue(null),
          set: vi.fn(),
          clear: vi.fn(),
        },
      });

    it('signs in against the instance the service is configured for', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const service = makeService();
      service.liferayUrl = 'http://configured:8080';
      const loopback = fakeLoopback();

      const token = await service.getAccessTokenWithPkce({
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(token).toBe('the-token');
      expect(new URL(loopback.record.opened).host).toBe('configured:8080');
    });

    it('lets the caller name a different instance', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const service = makeService();
      service.liferayUrl = 'http://configured:8080';
      const loopback = fakeLoopback();

      await service.getAccessTokenWithPkce({
        liferayUrl: 'http://elsewhere:8080',
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(new URL(loopback.record.opened).host).toBe('elsewhere:8080');
    });

    // The token cache is keyed by client id and serves the client-credentials
    // path. An operator token left in it would later be handed to a caller
    // that asked for the service's identity.
    it('does not put the operator token in the client-credentials cache', async () => {
      vi.stubGlobal('fetch', TOKEN_RESPONSE());
      const service = makeService();
      service.liferayUrl = 'http://configured:8080';
      const loopback = fakeLoopback();

      await service.getAccessTokenWithPkce({
        clientId: 'id-cli',
        log: () => {},
        open: loopback.open,
        createServer: loopback.createServer,
      });

      expect(service.ctx.cache.set).not.toHaveBeenCalled();
    });
  });

  describe('the token as a third connection mechanism (#276)', () => {
    const makeCtx = (overrides = {}) => ({
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        trace: vi.fn(),
      },
      oauth: {
        getAccessToken: vi.fn().mockResolvedValue('service-token'),
        isLiferayRouteAvailable: vi.fn().mockReturnValue(false),
        validateOAuthConfig: vi.fn(),
      },
      persistence: {},
      ...overrides,
    });

    const authEnv = {
      LIFERAY_AUTH_METHOD: ENV.LIFERAY_AUTH_METHOD,
      LIFERAY_API_USERNAME: ENV.LIFERAY_API_USERNAME,
      LIFERAY_API_PASSWORD: ENV.LIFERAY_API_PASSWORD,
      LIFERAY_OAUTH_CLIENT_ID: ENV.LIFERAY_OAUTH_CLIENT_ID,
      LIFERAY_OAUTH_CLIENT_SECRET: ENV.LIFERAY_OAUTH_CLIENT_SECRET,
      LIFERAY_API_URL: ENV.LIFERAY_API_URL,
    };

    afterEach(() => {
      Object.assign(ENV, authEnv);
    });

    describe('declaring the mechanism', () => {
      it('is requested by authMethod: token', () => {
        expect(liferayEnv.isTokenAuthRequested({ authMethod: 'token' })).toBe(
          true
        );
      });

      // Like Basic since #236: carrying the credential is not asking for the
      // mechanism. A config that merely happens to hold an accessToken must
      // still take the branch it takes today.
      it('is not requested by an accessToken alone', () => {
        expect(
          liferayEnv.isTokenAuthRequested({ accessToken: 'operator-token' })
        ).toBe(false);
      });

      it('is not requested by the environment', () => {
        ENV.LIFERAY_AUTH_METHOD = 'token';

        expect(liferayEnv.isTokenAuthRequested({})).toBe(false);
      });

      it('is not requested by an absent or unrelated config', () => {
        expect(liferayEnv.isTokenAuthRequested()).toBe(false);
        expect(liferayEnv.isTokenAuthRequested({ authMethod: 'basic' })).toBe(
          false
        );
      });

      it('resolves the token from the config', () => {
        expect(
          liferayEnv.resolveTokenCredential({ accessToken: 'operator-token' })
        ).toBe('operator-token');
      });

      // `Bearer undefined` comes back as a 401 indistinguishable from a
      // rejected credential.
      it('refuses the mechanism with no token to send', () => {
        expect(() => liferayEnv.resolveTokenCredential({})).toThrow(
          /no accessToken was supplied/
        );
      });

      it('does not read a token from the environment', () => {
        ENV.LIFERAY_ACCESS_TOKEN = 'env-token';

        expect(() => liferayEnv.resolveTokenCredential({})).toThrow(
          /no accessToken was supplied/
        );

        delete ENV.LIFERAY_ACCESS_TOKEN;
      });
    });

    describe('resolveEffectiveLiferayConnection', () => {
      it('accepts a token-only connection that would otherwise be refused', () => {
        ENV.LIFERAY_OAUTH_CLIENT_ID = '';
        ENV.LIFERAY_OAUTH_CLIENT_SECRET = '';

        const connection = liferayEnv.resolveEffectiveLiferayConnection(
          {
            liferayUrl: 'http://liferay:8080',
            authMethod: 'token',
            accessToken: 'operator-token',
          },
          {},
          {}
        );

        expect(connection.accessToken).toBe('operator-token');
        expect(connection.authMethod).toBe('token');
      });

      // The widening is exactly one case wide: the mechanism has to be
      // declared and the credential present.
      it('still refuses a declared mechanism with no token', () => {
        ENV.LIFERAY_OAUTH_CLIENT_ID = '';
        ENV.LIFERAY_OAUTH_CLIENT_SECRET = '';

        expect(() =>
          liferayEnv.resolveEffectiveLiferayConnection(
            { liferayUrl: 'http://liferay:8080', authMethod: 'token' },
            {},
            {}
          )
        ).toThrow(/authentication is not configured/);
      });

      it('still refuses a token carried without declaring the mechanism', () => {
        ENV.LIFERAY_OAUTH_CLIENT_ID = '';
        ENV.LIFERAY_OAUTH_CLIENT_SECRET = '';

        expect(() =>
          liferayEnv.resolveEffectiveLiferayConnection(
            {
              liferayUrl: 'http://liferay:8080',
              accessToken: 'operator-token',
            },
            {},
            {}
          )
        ).toThrow(/authentication is not configured/);
      });

      it('still refuses a connection with no credentials at all', () => {
        ENV.LIFERAY_OAUTH_CLIENT_ID = '';
        ENV.LIFERAY_OAUTH_CLIENT_SECRET = '';

        expect(() =>
          liferayEnv.resolveEffectiveLiferayConnection(
            { liferayUrl: 'http://liferay:8080' },
            {},
            {}
          )
        ).toThrow(/authentication is not configured/);
      });
    });

    describe('the REST transport', () => {
      it('presents the operator token as a bearer credential', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        const instance = await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        expect(instance.defaults.headers.Authorization).toBe(
          'Bearer operator-token'
        );
        expect(ctx.oauth.getAccessToken).not.toHaveBeenCalled();
      });

      it('survives _client, which is where a mechanism used to be stripped (#262)', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        const client = await service._client({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        expect(client.defaults.headers.Authorization).toBe(
          'Bearer operator-token'
        );
        expect(ctx.oauth.getAccessToken).not.toHaveBeenCalled();
      });

      // The config is the more specific declaration, and an operator who just
      // signed in did so deliberately.
      it('wins over a process-wide basic declaration', async () => {
        ENV.LIFERAY_AUTH_METHOD = 'basic';
        ENV.LIFERAY_API_USERNAME = 'env-user';
        ENV.LIFERAY_API_PASSWORD = 'env-password';

        const service = new HttpCoreService(makeCtx());

        const instance = await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        expect(instance.defaults.headers.Authorization).toBe(
          'Bearer operator-token'
        );
      });

      it('refuses the mechanism with no token rather than sending Bearer undefined', async () => {
        const service = new HttpCoreService(makeCtx());

        await expect(
          service.createAxiosInstance({
            liferayUrl: 'http://liferay:8080',
            authMethod: 'token',
          })
        ).rejects.toThrow(/no accessToken was supplied/);
      });

      it('does not write the token to the log', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        const logged = JSON.stringify(ctx.logger.debug.mock.calls);

        expect(logged).not.toContain('operator-token');
      });

      it('does not demand an OAuth client id when testing the connection', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);
        service._get = vi.fn().mockResolvedValue({});

        await service.testConnection({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        expect(ctx.oauth.validateOAuthConfig).not.toHaveBeenCalled();
      });
    });

    describe('the GraphQL transport', () => {
      it('presents the operator token as a bearer credential', async () => {
        const ctx = makeCtx();
        const service = new LiferayGraphQLService(ctx);

        const client = await service._getClient({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'token',
          accessToken: 'operator-token',
        });

        expect(client.defaults.headers.Authorization).toBe(
          'Bearer operator-token'
        );
        expect(ctx.oauth.getAccessToken).not.toHaveBeenCalled();
      });

      it('refuses the mechanism with no token', async () => {
        const service = new LiferayGraphQLService(makeCtx());

        await expect(
          service._getClient({
            liferayUrl: 'http://liferay:8080',
            authMethod: 'token',
          })
        ).rejects.toThrow(/no accessToken was supplied/);
      });
    });

    // This is additive. The two mechanisms that existed before must behave
    // exactly as they did, including for a config that happens to carry the
    // new field without declaring the new mechanism.
    describe('the mechanisms that already existed', () => {
      it('still reaches OAuth for client credentials', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        const instance = await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          clientId: 'client-1',
          clientSecret: 'secret-1',
        });

        expect(ctx.oauth.getAccessToken).toHaveBeenCalledWith(
          'http://liferay:8080',
          'client-1',
          'secret-1'
        );
        expect(instance.defaults.headers.Authorization).toBe(
          'Bearer service-token'
        );
      });

      it('still reaches Basic for a config declaring it', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        const instance = await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          authMethod: 'basic',
          username: 'admin',
          password: 'secret',
        });

        expect(instance.defaults.headers.Authorization).toBe(
          `Basic ${Buffer.from('admin:secret').toString('base64')}`
        );
        expect(ctx.oauth.getAccessToken).not.toHaveBeenCalled();
      });

      it('still reaches OAuth for a config carrying an undeclared accessToken', async () => {
        const ctx = makeCtx();
        const service = new HttpCoreService(ctx);

        const instance = await service.createAxiosInstance({
          liferayUrl: 'http://liferay:8080',
          clientId: 'client-1',
          clientSecret: 'secret-1',
          accessToken: 'operator-token',
        });

        expect(instance.defaults.headers.Authorization).toBe(
          'Bearer service-token'
        );
        expect(ctx.oauth.getAccessToken).toHaveBeenCalled();
      });
    });
  });
});
