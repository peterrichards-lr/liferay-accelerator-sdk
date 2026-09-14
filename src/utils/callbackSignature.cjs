const crypto = require('crypto');

const { ENV } = require('./constants.cjs');

/**
 * Signing the batch callback URL, so a callback can be believed.
 *
 * Liferay's batch engine POSTs to a URL we hand it when the import task
 * finishes, and that callback is now what declares a batch complete - it reads
 * the import task's real status and counts, and advances the session from
 * there. Nothing authenticates it. The endpoint has only ever been reachable
 * because Liferay sat on loopback and the microservice exempts loopback from
 * request signing; a remote Liferay's callback is refused (#812).
 *
 * Simply exempting the path would be worse than the status quo: it mutates run
 * state, so it would become callable by anyone who can reach the host. Instead
 * the URL carries proof that we issued it.
 *
 * **There is no key distribution problem.** This module runs inside the
 * microservice that will later receive the callback - the SDK is a library, not
 * a service - so the same process signs and verifies. Liferay never needs the
 * secret; it echoes back whatever URL it was given.
 *
 * The signature covers the batch's external reference code and an expiry, so a
 * token that leaks cannot be replayed against a different batch, and cannot be
 * replayed at all once the window closes.
 */

// Long enough that a slow import still lands inside it - Liferay's own tasks
// have been measured at ~20s, but a large catalogue under load is a different
// matter - and short enough that a leaked URL stops being useful the same day.
const DEFAULT_TTL_MS = 6 * 60 * 60 * 1000;

const SIGNATURE_PARAM = 'token';
const EXPIRY_PARAM = 'exp';

let ephemeralSecret = null;

/**
 * The signing secret.
 *
 * `CALLBACK_SIGNING_SECRET` when set. Otherwise one generated per process.
 *
 * The ephemeral fallback is deliberate rather than a convenience. An operator
 * who has configured nothing still gets a closed endpoint instead of a disabled
 * one, and a secret that never touches configuration cannot leak through it.
 * What it costs is restart survival: a batch submitted before a restart carries
 * a signature the new process cannot verify. That case already has a recovery
 * path in `recoverOrphanedSessions`, which polls Liferay for sessions left
 * incomplete - so the failure is a delay, not a loss.
 *
 * Configure it when a deployment restarts often enough for that delay to
 * matter, or when more than one process must verify what another signed.
 */
function callbackSecret() {
  const configured = ENV.CALLBACK_SIGNING_SECRET;

  if (configured) return configured;

  if (!ephemeralSecret) {
    ephemeralSecret = crypto.randomBytes(32).toString('hex');
  }

  return ephemeralSecret;
}

/** Whether the secret is one nobody configured - reported once, at startup. */
function usingEphemeralSecret() {
  return !ENV.CALLBACK_SIGNING_SECRET;
}

function digest(batchERC, expiresAt) {
  return crypto
    .createHmac('sha256', callbackSecret())
    .update(`${batchERC}|${expiresAt}`)
    .digest('hex');
}

/**
 * A callback URL carrying proof we issued it.
 *
 * Returns the URL unchanged when there is no `batchERC` to bind to - an
 * unbound signature would be replayable against any batch, which is worse than
 * none, and the receiving end refuses an unsigned remote callback anyway.
 */
function signCallbackUrl(url, { batchERC, ttlMs = DEFAULT_TTL_MS } = {}) {
  if (!url || !batchERC) return url;

  const u = new URL(url);
  const expiresAt = Date.now() + ttlMs;

  u.searchParams.set(EXPIRY_PARAM, String(expiresAt));
  u.searchParams.set(SIGNATURE_PARAM, digest(String(batchERC), expiresAt));

  return u.toString();
}

/**
 * Whether a presented signature was issued by this process for this batch.
 *
 * Compared in constant time: a timing-variable comparison on an HMAC is how a
 * signature gets forged a byte at a time.
 *
 * Returns a reason rather than a bare false, because the receiving end has to
 * tell an expired callback - ordinary, worth an info line - from a forged one,
 * which is not.
 */
function verifyCallbackSignature({ batchERC, expiresAt, signature } = {}) {
  if (!batchERC || !signature || !expiresAt) {
    return { ok: false, reason: 'missing' };
  }

  const expiry = Number(expiresAt);

  if (!Number.isFinite(expiry)) return { ok: false, reason: 'malformed' };
  if (Date.now() > expiry) return { ok: false, reason: 'expired' };

  const expected = digest(String(batchERC), String(expiresAt));
  const presented = String(signature);

  // Equal lengths first: timingSafeEqual throws on a mismatch, and throwing is
  // itself a timing signal.
  if (presented.length !== expected.length) {
    return { ok: false, reason: 'mismatch' };
  }

  const ok = crypto.timingSafeEqual(
    Buffer.from(expected, 'utf8'),
    Buffer.from(presented, 'utf8')
  );

  return ok ? { ok: true, reason: null } : { ok: false, reason: 'mismatch' };
}

/**
 * A URL with its callback signature masked, for logging.
 *
 * The batch submission URL carries the callback URL percent-encoded as the
 * value of `callbackURL`, and that inner URL now carries a signature. Both the
 * submission path and the raw request URL are logged, so without this the
 * signature is written to the log on every batch - a credential at rest, in a
 * file people paste into issues.
 *
 * This lives here rather than in the consumer because the consumer cannot
 * reach it: the log call is made from inside this package, before any consumer
 * sanitiser sees the value. Redaction has to happen where the logging happens.
 *
 * Everything else is left intact. The batch reference is what makes the line
 * worth logging, and masking the whole URL would trade a credential leak for a
 * blind log.
 */
function redactCallbackSignature(value) {
  if (typeof value !== 'string' || !value.includes(SIGNATURE_PARAM)) {
    return value;
  }

  try {
    const absolute = /^https?:\/\//i.test(value);
    const u = new URL(value, 'http://redacted.invalid');

    for (const key of Array.from(u.searchParams.keys())) {
      const inner = u.searchParams.get(key) || '';

      if (key.toLowerCase() === SIGNATURE_PARAM) {
        u.searchParams.set(key, 'REDACTED');
      } else if (/^https?:\/\//i.test(inner)) {
        // The nested callback URL, which is where the signature actually
        // rides. Its parameters are not query parameters of the outer URL, so
        // a single pass never sees them.
        u.searchParams.set(key, redactCallbackSignature(inner));
      }
    }

    return sweep(absolute ? u.toString() : `${u.pathname}${u.search}${u.hash}`);
  } catch {
    return sweep(value);
  }
}

/**
 * A final pass over whatever the structured attempt produced.
 *
 * Parsing is not enough on its own. `new URL('::not a url:: token=x', base)`
 * succeeds - it is a relative path, not a failure - so the catch never runs,
 * and a signature sitting outside a query parameter survives untouched. The
 * encoded form is swept too, for a nested URL that was not reached as one.
 *
 * Belt and braces on purpose: this is the last thing between a credential and
 * a log file, and being thorough here costs a regex.
 */
function sweep(value) {
  return value
    .replace(
      new RegExp(`${SIGNATURE_PARAM}=[^&\\s]+`, 'gi'),
      `${SIGNATURE_PARAM}=REDACTED`
    )
    .replace(
      new RegExp(`${SIGNATURE_PARAM}%3D[^&%\\s]+`, 'gi'),
      `${SIGNATURE_PARAM}%3DREDACTED`
    );
}

module.exports = {
  DEFAULT_TTL_MS,
  EXPIRY_PARAM,
  SIGNATURE_PARAM,
  redactCallbackSignature,
  signCallbackUrl,
  usingEphemeralSecret,
  verifyCallbackSignature,
};
