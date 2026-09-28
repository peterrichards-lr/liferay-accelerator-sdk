import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const configNode = require('@rotty3000/config-node');
const { LiferayService } = require('../src/liferay/index.cjs');
const { ENV } = require('../src/utils/constants.cjs');

// The URL a colocated deployment's config tree yields. It is the correct
// value - Liferay recording its own listener address - and it is unreachable
// from a different container on the same host.
const LOOPBACK = 'https://localhost';

describe('waitForLiferay probe target (#289)', () => {
  let service;
  let probed;
  let savedApiUrl;
  let savedLxcDomain;
  let savedProtocol;

  beforeEach(() => {
    savedApiUrl = ENV.LIFERAY_API_URL;
    savedLxcDomain = process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN;
    savedProtocol = process.env.COM_LIFERAY_LXC_DXP_SERVER_PROTOCOL;

    ENV.LIFERAY_API_URL = '';
    delete process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN;
    delete process.env.COM_LIFERAY_LXC_DXP_SERVER_PROTOCOL;
    configNode.clearCache();

    const ctx = {
      cache: new Map(),
      logger: {
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        success: vi.fn(),
      },
      config: {},
      oauth: {
        // A colocated deployment, resolving its own target the way the one in
        // the report did.
        isLiferayRouteAvailable: () => true,
        getDefaultLiferayUrl: () => LOOPBACK,
        getDefaultClientId: () => 'client-id',
        getDefaultClientSecret: () => 'client-secret',
      },
    };

    service = new LiferayService(ctx);

    probed = [];
    service.testConnection = vi.fn(async (config) => {
      probed.push(config.liferayUrl);
      return { status: 'connected' };
    });
  });

  afterEach(() => {
    ENV.LIFERAY_API_URL = savedApiUrl;
    if (savedLxcDomain === undefined) {
      delete process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN;
    } else {
      process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = savedLxcDomain;
    }
    if (savedProtocol === undefined) {
      delete process.env.COM_LIFERAY_LXC_DXP_SERVER_PROTOCOL;
    } else {
      process.env.COM_LIFERAY_LXC_DXP_SERVER_PROTOCOL = savedProtocol;
    }
    configNode.clearCache();
  });

  it('probes the LXC domain, not the loopback host, when the platform injects one', async () => {
    // The variable is already in the container's environment on any LXC
    // deployment. This is the reported failure: sixty probes at
    // https://localhost, none of which could have succeeded.
    process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = 'aica-e2e.demo';

    await service.waitForLiferay(1, 0);

    expect(probed).toEqual(['https://aica-e2e.demo']);
    expect(probed).not.toContain(LOOPBACK);
  });

  it('honours the protocol the platform recorded', async () => {
    process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = 'dxp.internal';
    process.env.COM_LIFERAY_LXC_DXP_SERVER_PROTOCOL = 'http';

    await service.waitForLiferay(1, 0);

    expect(probed).toEqual(['http://dxp.internal']);
  });

  it('probes exactly the URL the caller states', async () => {
    // Everything else is set, and loses. A caller that names a target has said
    // where Liferay is.
    process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = 'aica-e2e.demo';
    ENV.LIFERAY_API_URL = 'https://from-env.example';

    await service.waitForLiferay({
      liferayUrl: 'https://stated-by-caller.example',
      maxAttempts: 1,
      delayMs: 0,
    });

    expect(probed).toEqual(['https://stated-by-caller.example']);
  });

  it('takes the operator override ahead of the platform domain', async () => {
    process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = 'aica-e2e.demo';
    ENV.LIFERAY_API_URL = 'https://from-env.example';

    await service.waitForLiferay(1, 0);

    expect(probed).toEqual(['https://from-env.example']);
  });

  it('is unchanged for a deployment with neither override', async () => {
    // Nothing injected, nothing overridden: today's resolution stands.
    await service.waitForLiferay(1, 0);

    expect(probed).toEqual([LOOPBACK]);
  });

  it('still accepts the positional form every existing caller uses', async () => {
    // Asserted through the attempt budget rather than the return value: a
    // probe that succeeds first time would look identical however the
    // arguments were read.
    service.testConnection = vi.fn(async () => {
      throw new Error('refused');
    });

    const result = await service.waitForLiferay(3, 0);

    expect(result).toBe(false);
    expect(service.testConnection).toHaveBeenCalledTimes(3);
  });

  it('keeps the credentials the resolution supplies', async () => {
    // The probe needs more than a URL. Short-circuiting to a bare
    // `{ liferayUrl }` would have authenticated nothing.
    process.env.LIFERAY_LXC_DXP_MAIN_DOMAIN = 'aica-e2e.demo';

    await service.waitForLiferay(1, 0);

    expect(service.testConnection).toHaveBeenCalledWith(
      expect.objectContaining({
        liferayUrl: 'https://aica-e2e.demo',
        clientId: 'client-id',
        clientSecret: 'client-secret',
      })
    );
  });
});
