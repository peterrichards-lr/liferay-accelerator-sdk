import { describe, it, expect } from 'vitest';
import LiferayRestService from '../../src/liferay/rest.cjs';

const isIntegrationTest =
  process.env.INTEGRATION_TEST === 'true' ||
  process.env.RUN_INTEGRATION_TESTS === 'true';

describe.skipIf(!isIntegrationTest)('DXP Integration Suite (Opt-in)', () => {
  const config = {
    liferayUrl: process.env.LIFERAY_API_URL || 'http://localhost:8081',
    auth: {
      username: process.env.LIFERAY_API_USERNAME || 'test@liferay.com',
      password: process.env.LIFERAY_API_PASSWORD || 'test',
    },
  };

  const restClient = new LiferayRestService({
    logger: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  });

  it('fetches primary account id from live DXP instance', async () => {
    const accountId = await restClient.getPrimaryAccountId(config);
    expect(accountId === null || typeof accountId === 'number').toBe(true);
  });

  it('fetches account count from live DXP instance', async () => {
    const count = await restClient.getAccountCount(config);
    expect(typeof count).toBe('number');
  });
});
