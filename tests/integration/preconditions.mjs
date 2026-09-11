/**
 * What the live suite needs before any of it means anything.
 *
 * The suite is opt-in, and skipping when it was not asked for is right. Once
 * the switch is on the run was asked for, so a missing variable is a failure
 * that names itself - not a skip, and not a stack trace thrown from inside
 * `resolveEffectiveLiferayConnection` three frames into the client.
 */

export const INTEGRATION_SWITCH_VARIABLES = [
  'INTEGRATION_TEST',
  'RUN_INTEGRATION_TESTS',
];

export function isIntegrationRunRequested(env = process.env) {
  return INTEGRATION_SWITCH_VARIABLES.some((name) => env[name] === 'true');
}

function isAbsoluteHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * `secret: true` keeps a value out of the failure message. Everything else is
 * echoed back, because "LIFERAY_API_URL is not an absolute URL" without the
 * offending value sends the reader to their shell history to find out why.
 */
const REQUIRED_VARIABLES = [
  {
    name: 'LIFERAY_API_URL',
    purpose: 'the absolute origin of the instance under test',
    example: 'https://liferay.example.com:8443',
    isValid: isAbsoluteHttpUrl,
    invalidReason: 'is not an absolute http(s) URL',
  },
  {
    name: 'LIFERAY_OAUTH_CLIENT_ID',
    purpose:
      'the client id of a headless server OAuth application on that instance',
  },
  {
    name: 'LIFERAY_OAUTH_CLIENT_SECRET',
    purpose: 'its client secret',
    secret: true,
  },
];

/**
 * Every missing precondition, not the first. Reporting one at a time turns a
 * single misconfiguration into three round trips.
 *
 * @param {Record<string, string|undefined>} env
 * @returns {string[]} One sentence per failed precondition; empty when the
 *   environment is complete.
 */
export function collectMissingPreconditions(env = process.env) {
  const failures = [];

  for (const variable of REQUIRED_VARIABLES) {
    const value = env[variable.name];

    if (!value) {
      failures.push(
        `${variable.name} is not set - ${variable.purpose}` +
          (variable.example ? `, e.g. ${variable.example}` : '')
      );
      continue;
    }

    if (variable.isValid && !variable.isValid(value)) {
      failures.push(
        `${variable.name} ${variable.invalidReason}` +
          (variable.secret ? '' : `: ${value}`)
      );
    }
  }

  return failures;
}

export function describeMissingPreconditions(failures) {
  return [
    `The integration suite was asked to run, but ${failures.length} of its ` +
      `preconditions ${failures.length === 1 ? 'is' : 'are'} not met, so there ` +
      'is no live Liferay for it to verify anything against:',
    ...failures.map((failure) => `  - ${failure}`),
    '',
    'Set them and re-run `yarn test:integration`. See README > Testing >',
    'Integration suite for the OAuth application these credentials come from.',
  ].join('\n');
}

/**
 * @throws {Error} naming every unmet precondition.
 */
export function assertIntegrationPreconditions(env = process.env) {
  const failures = collectMissingPreconditions(env);
  if (failures.length > 0) {
    throw new Error(describeMissingPreconditions(failures));
  }
}
