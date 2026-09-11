import { describe, it, expect } from 'vitest';
import {
  assertIntegrationPreconditions,
  collectMissingPreconditions,
  describeMissingPreconditions,
  isIntegrationRunRequested,
} from './integration/preconditions.mjs';

const COMPLETE_ENV = {
  LIFERAY_API_URL: 'https://liferay.example.com:8443',
  LIFERAY_OAUTH_CLIENT_ID: 'id-abc',
  LIFERAY_OAUTH_CLIENT_SECRET: 'secret-xyz',
};

describe('isIntegrationRunRequested', () => {
  it('is false when neither switch is set', () => {
    expect(isIntegrationRunRequested({})).toBe(false);
  });

  it('is true for INTEGRATION_TEST and for RUN_INTEGRATION_TESTS', () => {
    expect(isIntegrationRunRequested({ INTEGRATION_TEST: 'true' })).toBe(true);
    expect(isIntegrationRunRequested({ RUN_INTEGRATION_TESTS: 'true' })).toBe(
      true
    );
  });

  it('is false for any value other than the exact string true', () => {
    expect(isIntegrationRunRequested({ INTEGRATION_TEST: '1' })).toBe(false);
    expect(isIntegrationRunRequested({ INTEGRATION_TEST: 'TRUE' })).toBe(false);
    expect(isIntegrationRunRequested({ INTEGRATION_TEST: 'false' })).toBe(
      false
    );
  });
});

describe('collectMissingPreconditions', () => {
  it('reports nothing for a complete environment', () => {
    expect(collectMissingPreconditions(COMPLETE_ENV)).toEqual([]);
  });

  it('names every missing variable, not just the first', () => {
    const failures = collectMissingPreconditions({});
    expect(failures).toHaveLength(3);
    expect(failures.join('\n')).toContain('LIFERAY_API_URL is not set');
    expect(failures.join('\n')).toContain('LIFERAY_OAUTH_CLIENT_ID is not set');
    expect(failures.join('\n')).toContain(
      'LIFERAY_OAUTH_CLIENT_SECRET is not set'
    );
  });

  it.each([
    ['localhost:8080', 'a bare host and port'],
    ['/o/headless-admin-user/v1.0', 'a path'],
    ['ftp://liferay.example.com', 'a non-http scheme'],
    ['', 'an empty string'],
  ])('rejects %s as LIFERAY_API_URL (%s)', (liferayUrl) => {
    const failures = collectMissingPreconditions({
      ...COMPLETE_ENV,
      LIFERAY_API_URL: liferayUrl,
    });
    expect(failures).toHaveLength(1);
    expect(failures[0]).toContain('LIFERAY_API_URL');
  });

  it('echoes an unusable URL so the reader does not have to guess', () => {
    const [failure] = collectMissingPreconditions({
      ...COMPLETE_ENV,
      LIFERAY_API_URL: 'localhost:8080',
    });
    expect(failure).toContain('localhost:8080');
  });

  it('never echoes the client secret', () => {
    const failures = collectMissingPreconditions({
      ...COMPLETE_ENV,
      LIFERAY_API_URL: 'nonsense',
    });
    expect(failures.join('\n')).not.toContain(
      COMPLETE_ENV.LIFERAY_OAUTH_CLIENT_SECRET
    );
  });

  it('accepts plain http, which is what a local instance serves', () => {
    expect(
      collectMissingPreconditions({
        ...COMPLETE_ENV,
        LIFERAY_API_URL: 'http://localhost:8080',
      })
    ).toEqual([]);
  });
});

describe('describeMissingPreconditions', () => {
  it('agrees with itself about how many failures there are', () => {
    const message = describeMissingPreconditions(
      collectMissingPreconditions({})
    );
    expect(message).toContain('3 of its preconditions are not met');
  });

  it('says "is" for a single failure', () => {
    const message = describeMissingPreconditions(
      collectMissingPreconditions({
        ...COMPLETE_ENV,
        LIFERAY_OAUTH_CLIENT_ID: '',
      })
    );
    expect(message).toContain('1 of its preconditions is not met');
  });

  it('points at the command that sets the switch', () => {
    const message = describeMissingPreconditions(['something']);
    expect(message).toContain('yarn test:integration');
  });
});

describe('assertIntegrationPreconditions', () => {
  it('returns quietly for a complete environment', () => {
    expect(() => assertIntegrationPreconditions(COMPLETE_ENV)).not.toThrow();
  });

  it('throws an error naming each unmet precondition', () => {
    expect(() =>
      assertIntegrationPreconditions({
        LIFERAY_OAUTH_CLIENT_ID: 'id-abc',
      })
    ).toThrow(/LIFERAY_API_URL is not set[\s\S]*LIFERAY_OAUTH_CLIENT_SECRET/);
  });
});
