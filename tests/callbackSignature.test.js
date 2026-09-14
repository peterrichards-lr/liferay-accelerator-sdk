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
