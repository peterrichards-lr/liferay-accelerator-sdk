import { describe, expect, it, vi, afterEach } from 'vitest';

const load = async () => {
  vi.resetModules();
  return (
    (await import('../src/utils/callbackSignature.cjs')).default ??
    (await import('../src/utils/callbackSignature.cjs'))
  );
};

const {
  EXPIRY_PARAM,
  SIGNATURE_PARAM,
  signCallbackUrl,
  verifyCallbackSignature,
} = require('../src/utils/callbackSignature.cjs');

const BASE = 'http://localhost:3001/api/v1/batch/callback';
const params = (url) => new URL(url).searchParams;

/**
 * The batch callback declares a batch complete - it reads Liferay's import task
 * for real status and counts, and advances the session. Nothing authenticated
 * it; the endpoint was reachable only because Liferay sat on loopback (#812).
 */
describe('signing the batch callback URL (#812)', () => {
  afterEach(() => vi.useRealTimers());

  it('binds the signature to the batch, so it cannot be replayed against another', () => {
    const url = signCallbackUrl(`${BASE}?batchERC=BATCH-1`, {
      batchERC: 'BATCH-1',
    });
    const q = params(url);

    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-1',
        expiresAt: q.get(EXPIRY_PARAM),
        signature: q.get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: true, reason: null });

    // The same token, presented for a different batch.
    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-2',
        expiresAt: q.get(EXPIRY_PARAM),
        signature: q.get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: false, reason: 'mismatch' });
  });

  it('stops being valid once the window closes', () => {
    const url = signCallbackUrl(`${BASE}?batchERC=BATCH-1`, {
      batchERC: 'BATCH-1',
      ttlMs: 1000,
    });
    const q = params(url);

    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 5000);

    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-1',
        expiresAt: q.get(EXPIRY_PARAM),
        signature: q.get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: false, reason: 'expired' });
  });

  it('refuses a tampered expiry, so the window cannot simply be extended', () => {
    // The expiry is inside the digest for exactly this reason.
    const url = signCallbackUrl(`${BASE}?batchERC=BATCH-1`, {
      batchERC: 'BATCH-1',
      ttlMs: 1000,
    });
    const q = params(url);

    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-1',
        expiresAt: String(Date.now() + 999999),
        signature: q.get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: false, reason: 'mismatch' });
  });

  it('distinguishes a missing signature from a wrong one', () => {
    // The receiving end treats these differently: absent is the ordinary case
    // for a loopback caller, wrong is not ordinary at all.
    expect(verifyCallbackSignature({ batchERC: 'BATCH-1' })).toEqual({
      ok: false,
      reason: 'missing',
    });
    expect(verifyCallbackSignature({})).toEqual({
      ok: false,
      reason: 'missing',
    });
  });

  it('refuses a malformed expiry rather than coercing it', () => {
    const url = signCallbackUrl(`${BASE}?batchERC=BATCH-1`, {
      batchERC: 'BATCH-1',
    });

    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-1',
        expiresAt: 'soon',
        signature: params(url).get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: false, reason: 'malformed' });
  });

  it('leaves a URL alone when there is no batch to bind to', () => {
    // An unbound signature would be replayable against any batch, which is
    // worse than none.
    expect(signCallbackUrl(BASE, {})).toBe(BASE);
    expect(signCallbackUrl(null, { batchERC: 'BATCH-1' })).toBeNull();
  });

  it('does not put the secret in the URL', () => {
    const url = signCallbackUrl(`${BASE}?batchERC=BATCH-1`, {
      batchERC: 'BATCH-1',
    });

    expect(url).toContain(`${SIGNATURE_PARAM}=`);
    expect(url).not.toContain('CALLBACK_SIGNING_SECRET');
    // The digest, not the key.
    expect(params(url).get(SIGNATURE_PARAM)).toMatch(/^[0-9a-f]{64}$/);
  });
});

/**
 * The signature is a credential, and the URL carrying it is logged twice per
 * batch submission - once as the submission path, once as the raw request URL.
 * Redaction has to happen here rather than in a consumer, because the log call
 * is made from inside this package (#812).
 */
describe('keeping the signature out of the log (#812)', () => {
  const {
    redactCallbackSignature,
  } = require('../src/utils/callbackSignature.cjs');

  const signed = () =>
    signCallbackUrl(`${BASE}?batchERC=BATCH-1`, { batchERC: 'BATCH-1' });

  const nested = (inner) =>
    `/o/headless-commerce-admin-catalog/v1.0/products/batch?callbackURL=${encodeURIComponent(inner)}`;

  it('masks the signature nested inside a submission path', () => {
    const inner = signed();
    const token = params(inner).get(SIGNATURE_PARAM);

    expect(redactCallbackSignature(nested(inner))).not.toContain(token);
  });

  it('masks it in a bare callback URL too', () => {
    const inner = signed();

    expect(redactCallbackSignature(inner)).not.toContain(
      params(inner).get(SIGNATURE_PARAM)
    );
  });

  it('keeps the batch reference, so the line is still worth logging', () => {
    expect(redactCallbackSignature(nested(signed()))).toContain('BATCH-1');
  });

  it('masks it even in a string it cannot parse as a URL', () => {
    // The fallback path. A malformed value must not carry the token through
    // just because URL parsing threw.
    const token = params(signed()).get(SIGNATURE_PARAM);

    expect(
      redactCallbackSignature(`::not a url:: ${SIGNATURE_PARAM}=${token}&x=1`)
    ).not.toContain(token);
  });

  it('leaves a URL with no signature alone', () => {
    const plain = `${BASE}?batchERC=BATCH-1`;

    expect(redactCallbackSignature(plain)).toBe(plain);
    expect(redactCallbackSignature('/o/headless/products/batch')).toBe(
      '/o/headless/products/batch'
    );
  });

  it('does not alter the URL actually sent', () => {
    // The point worth guarding: redaction is for the log only. A signed URL
    // that had been redacted before sending would fail its own verification.
    const inner = signed();
    const q = params(inner);

    expect(
      verifyCallbackSignature({
        batchERC: 'BATCH-1',
        expiresAt: q.get(EXPIRY_PARAM),
        signature: q.get(SIGNATURE_PARAM),
      })
    ).toEqual({ ok: true, reason: null });
  });
});
