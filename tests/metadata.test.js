import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const { LiferayService } = require('../src/liferay/index.cjs');

describe('LiferayService Metadata and Catalogs', () => {
  let liferayService;
  let mockCtx;
  const config = {
    liferayUrl: 'http://liferay:8080',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    siteGroupId: 20127,
  };

  beforeEach(() => {
    const mockCache = new Map();
    mockCtx = {
      cache: {
        get: (key) => mockCache.get(key),
        set: (key, value) => mockCache.set(key, value),
        clear: () => mockCache.clear(),
      },
      logger: {
        info: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
      },
      config: {},
    };

    mockCtx.oauth = {
      getAccessToken: vi.fn().mockResolvedValue('test-token'),
      clearTokenCache: vi.fn(),
      applyConfig: vi.fn(),
    };

    liferayService = new LiferayService(mockCtx);
  });

  it('should retrieve currencies', async () => {
    server.use(
      http.get('*/o/headless-commerce-admin-catalog/v1.0/currencies', () => {
        return HttpResponse.json({
          items: [
            { code: 'USD', name: { en_US: 'US Dollar' } },
            { code: 'EUR', name: { es_ES: 'Euro' } },
          ],
        });
      })
    );

    const currencies = await liferayService.getCurrencies(config);
    expect(currencies).toHaveLength(2);
    expect(currencies[0]).toEqual({ code: 'USD', name: 'US Dollar' });
    expect(currencies[1]).toEqual({ code: 'EUR', name: 'Euro' });
  });

  it('should retrieve catalogs with fromI18n name resolution', async () => {
    server.use(
      http.get('*/o/headless-commerce-admin-catalog/v1.0/catalogs', () => {
        return HttpResponse.json({
          items: [{ id: 101, name: { en_US: 'My Catalog' } }],
        });
      })
    );

    const catalogs = await liferayService.getCatalogs(config);
    expect(catalogs).toHaveLength(1);
    expect(catalogs[0].id).toBe(101);
    expect(catalogs[0].name).toBe('My Catalog');
  });

  it('should retrieve catalog by ID', async () => {
    server.use(
      http.get('*/o/headless-commerce-admin-catalog/v1.0/catalog/101', () => {
        return HttpResponse.json({
          id: 101,
          name: { en_US: 'Single Catalog' },
        });
      })
    );

    const catalog = await liferayService.getCatalog(config, 101);
    expect(catalog.id).toBe(101);
  });

  it('should patch catalog by ID', async () => {
    let patchedData = null;
    server.use(
      http.patch(
        '*/o/headless-commerce-admin-catalog/v1.0/catalog/101',
        async ({ request }) => {
          patchedData = await request.json();
          return HttpResponse.json({ id: 101, ...patchedData });
        }
      )
    );

    const res = await liferayService.patchCatalog(config, 101, {
      defaultLanguageId: 'en_US',
    });
    expect(res.id).toBe(101);
    expect(patchedData).toEqual({ defaultLanguageId: 'en_US' });
  });

  it('should retrieve channels without self-healing if active channels exist', async () => {
    server.use(
      http.get('*/o/headless-commerce-admin-channel/v1.0/channels', () => {
        return HttpResponse.json({
          items: [{ id: 201, name: 'Web Store' }],
        });
      })
    );

    const channels = await liferayService.getChannels(config);
    expect(channels).toHaveLength(1);
    expect(channels[0].id).toBe(201);
  });

  it('should retrieve channels and self-heal with Guest Web Store if empty', async () => {
    const testConfig = { ...config, siteGroupId: 99999 };

    // 1. Return empty channels first
    server.use(
      http.get('*/o/headless-commerce-admin-channel/v1.0/channels', () => {
        return HttpResponse.json({ items: [] });
      })
    );

    // 2. Mock sites query returning a site matching siteGroupId
    server.use(
      http.get('*/o/headless-admin-site/v1.0/sites', () => {
        return HttpResponse.json({
          items: [{ id: 99999, name: 'Liferay', friendlyURLPath: '/guest' }],
        });
      })
    );

    // 3. Mock channel creation POST
    let createdChannel = null;
    server.use(
      http.post(
        '*/o/headless-commerce-admin-channel/v1.0/channels',
        async ({ request }) => {
          createdChannel = await request.json();
          return HttpResponse.json({ id: 999, ...createdChannel });
        }
      )
    );

    const channels = await liferayService.getChannels(testConfig);
    expect(channels).toHaveLength(1);
    expect(channels[0].id).toBe(999);
    expect(createdChannel.name).toBe('Web Store');
    expect(createdChannel.type).toBe('site');
  });

  it('should create a channel', async () => {
    let postData = null;
    server.use(
      http.post(
        '*/o/headless-commerce-admin-channel/v1.0/channels',
        async ({ request }) => {
          postData = await request.json();
          return HttpResponse.json({ id: 301, ...postData });
        }
      )
    );

    const res = await liferayService.createChannel(config, {
      name: 'New Channel',
      type: 'site',
    });
    expect(res.id).toBe(301);
    expect(postData.name).toBe('New Channel');
  });

  it('should retrieve countries', async () => {
    vi.spyOn(liferayService.graphql, 'getCountries').mockResolvedValue({
      items: [{ id: 1, name: 'United States', a2: 'US' }],
    });

    const res = await liferayService.getCountries(config);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('United States');
  });

  it('should retrieve country regions', async () => {
    vi.spyOn(liferayService.graphql, 'getCountryRegions').mockResolvedValue({
      items: [{ id: 10, name: 'California', regionCode: 'CA' }],
    });

    const res = await liferayService.getCountryRegions(config, 1);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('California');
  });

  it('should retrieve regions', async () => {
    server.use(
      http.get('*/o/headless-admin-address/v1.0/countries/1/regions', () => {
        return HttpResponse.json({
          items: [{ id: 10, name: 'California', regionCode: 'CA' }],
        });
      })
    );

    const res = await liferayService.getRegions(config, 1);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('California');
  });

  it('should retrieve taxonomy vocabularies with localized name/description resolution', async () => {
    vi.spyOn(
      liferayService.graphql,
      'getTaxonomyVocabularies'
    ).mockResolvedValue({
      items: [
        {
          id: 11,
          name: { en_US: 'Vocabulary 1' },
          description: { en_US: 'Desc 1' },
        },
      ],
    });

    const res = await liferayService.getTaxonomyVocabularies(config, 'guest');
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Vocabulary 1');
    expect(res[0].description).toBe('Desc 1');
  });

  it('should retrieve taxonomy categories with localized name/description resolution', async () => {
    vi.spyOn(liferayService.graphql, 'getTaxonomyCategories').mockResolvedValue(
      {
        items: [
          {
            id: 22,
            name: { en_US: 'Category 1' },
            description: { en_US: 'Desc 2' },
          },
        ],
      }
    );

    const res = await liferayService.getTaxonomyCategories(config, 11);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe('Category 1');
    expect(res[0].description).toBe('Desc 2');
  });
});
