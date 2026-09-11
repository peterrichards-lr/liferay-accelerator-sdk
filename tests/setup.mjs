import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers.mjs';
import { isIntegrationRunRequested } from './integration/preconditions.mjs';

// The handlers below match on path with a wildcard host, so they answer for any
// origin - including a live instance. Loading this file into an integration run
// is therefore not a degraded live run, it is a mocked one wearing the live
// run's name (#224). `yarn test:integration` uses vitest.integration.config.mjs,
// which does not load this file; anything else that sets the switch is a
// mistake, and this is where it stops.
if (isIntegrationRunRequested(process.env)) {
  throw new Error(
    'The unit test setup installs msw request handlers that intercept every ' +
      'host, so an integration run loading it would verify mocks rather than ' +
      'a live Liferay. Run the integration suite with `yarn test:integration` ' +
      '(vitest.integration.config.mjs), or unset INTEGRATION_TEST and ' +
      'RUN_INTEGRATION_TESTS to run the unit suite.'
  );
}

const server = setupServer(...handlers);

vi.mock('@rotty3000/config-node', () => {
  return {
    lxcConfig: {
      oauthApplication: vi.fn().mockReturnValue({}),
      userAgentApplication: vi.fn().mockReturnValue({}),
      dxpMainDomain: vi.fn().mockReturnValue('localhost'),
      dxpProtocol: vi.fn().mockReturnValue('http'),
    },
    lookupConfig: vi.fn().mockReturnValue(null),
  };
});

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server };
