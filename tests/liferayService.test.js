import { vi, describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './setup.mjs';

const { LiferayService } = require('../src/liferay/index.cjs');

describe('LiferayService', () => {
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

    // Create a mock OAuthService instance manually
    mockCtx.oauth = {
      getAccessToken: vi.fn().mockResolvedValue('test-token'),
      clearTokenCache: vi.fn(),
      applyConfig: vi.fn(),
    };

    liferayService = new LiferayService(mockCtx);

    // Mock getExclusions to avoid needing real persistence logic in discovery tests
    liferayService._getExclusions = vi.fn().mockResolvedValue([]);
  });

  it('should fetch products using the mocked Liferay API', async () => {
    const result = await liferayService.getProducts(config, { catalogId: 123 });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Test Product 1');
    expect(result.items[0].catalogId).toBe(123);
    expect(result.totalCount).toBe(1);
  });

  it('should fetch accounts using the mocked Liferay API', async () => {
    const result = await liferayService.getAccounts(config);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Test Account 1');
    expect(result.items[0].externalReferenceCode).toBe('ACC-1');
    expect(result.totalCount).toBe(1);
  });

  it('should fetch accounts with fields limiting using the mocked Liferay API', async () => {
    const result = await liferayService.getAccounts(config, { fields: 'id' });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(10);
    expect(result.items[0].name).toBeUndefined();
    expect(result.items[0].externalReferenceCode).toBeUndefined();
  });

  it('should fetch account groups using the mocked Liferay API', async () => {
    const result = await liferayService.getAccountGroups(config);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Test Account Group 1');
    expect(result.items[0].externalReferenceCode).toBe('ACG-1');
    expect(result.totalCount).toBe(1);
  });

  it('should fetch account groups with fields limiting using the mocked Liferay API', async () => {
    const result = await liferayService.getAccountGroups(config, {
      fields: 'id',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(15);
    expect(result.items[0].name).toBeUndefined();
    expect(result.items[0].externalReferenceCode).toBeUndefined();
  });

  it('should fetch orders using the mocked Liferay API', async () => {
    const result = await liferayService.getOrders(config);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].externalReferenceCode).toBe('ORD-1');
    expect(result.totalCount).toBe(1);
  });

  it('should fetch price lists using the mocked Liferay API', async () => {
    const result = await liferayService.getPriceLists(config);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Test Price List 1');
    expect(result.totalCount).toBe(1);
  });

  it('should fetch warehouses using the mocked Liferay API', async () => {
    const result = await liferayService.getWarehouses(config);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Test Warehouse 1');
    expect(result.totalCount).toBe(1);
  });

  it('should fetch batch status using the mocked Liferay API', async () => {
    const result = await liferayService.getImportTask(config, 9001);

    expect(result.executeStatus).toBe('COMPLETED');
    expect(result.processedItemsCount).toBe(10);
    expect(result.totalItemsCount).toBe(10);
    expect(result.id).toBe(9001);
  });

  it('should fail to create products batch if contract is violated', async () => {
    const invalidProducts = [
      {
        name: 'Invalid product',
        productType: 'unknown-type', // Violates enum
      },
    ];

    // Note: We need a real ContractValidator instance for this test
    const ContractValidator = require('../src/services/contractValidator.cjs');
    mockCtx.contractValidator = new ContractValidator(mockCtx);

    await expect(
      liferayService.createProductsBatch(config, invalidProducts)
    ).rejects.toThrow();
  });

  it('should flatten localized names for catalogs', async () => {
    const result = await liferayService.getCatalogs(config);
    expect(result[0].name).toBe('Test Catalog 1');
  });

  it('should flatten localized names for channels', async () => {
    const result = await liferayService.getChannels(config);
    expect(result[0].name).toBe('Test Channel 1');
  });

  it('should auto-scaffold a Guest Web Store Channel if no channels exist and siteGroupId is valid', async () => {
    const { http, HttpResponse } = require('msw');

    let postPayload = null;

    server.use(
      http.get('*/o/headless-commerce-admin-channel/v1.0/channels', () => {
        return HttpResponse.json({ items: [], totalCount: 0 });
      }),
      http.post(
        '*/o/headless-commerce-admin-channel/v1.0/channels',
        async ({ request }) => {
          postPayload = await request.json();
          return HttpResponse.json({
            id: 999,
            name: { en_US: 'Web Store' },
            type: 'site',
            siteGroupId: 20127,
            externalReferenceCode: 'AICA-CH-GUEST-STORE-20127',
          });
        }
      )
    );

    const result = await liferayService.getChannels({
      ...config,
      siteGroupId: 20127,
      currencyCode: 'USD',
      languageId: 'en_US',
    });

    expect(postPayload).toEqual({
      name: 'Web Store',
      type: 'site',
      siteGroupId: 20127,
      currencyCode: 'USD',
      externalReferenceCode: 'AICA-CH-GUEST-STORE-20127',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(999);
    expect(result[0].name).toBe('Web Store');
  });

  it('should programmatically resolve and mutate config.siteGroupId when it is missing but channels already exist', async () => {
    const { http, HttpResponse } = require('msw');

    server.use(
      http.get('*/o/headless-admin-site/v1.0/sites', () => {
        return HttpResponse.json({
          items: [{ id: 20111, friendlyUrlPath: '/guest', name: 'Guest' }],
          totalCount: 1,
        });
      })
    );

    const testConfig = { ...config, siteGroupId: undefined };
    const result = await liferayService.getChannels(testConfig);

    expect(result).toHaveLength(1);
    expect(testConfig.siteGroupId).toBe(20111);
  });

  it('should programmatically resolve config.siteGroupId and auto-scaffold a Guest Web Store when no channels exist', async () => {
    const { http, HttpResponse } = require('msw');

    let postPayload = null;
    server.use(
      http.get('*/o/headless-commerce-admin-channel/v1.0/channels', () => {
        return HttpResponse.json({ items: [], totalCount: 0 });
      }),
      http.get('*/o/headless-admin-site/v1.0/sites', () => {
        return HttpResponse.json({
          items: [{ id: 20111, friendlyUrlPath: '/guest', name: 'Guest' }],
          totalCount: 1,
        });
      }),
      http.post(
        '*/o/headless-commerce-admin-channel/v1.0/channels',
        async ({ request }) => {
          postPayload = await request.json();
          return HttpResponse.json({
            id: 999,
            name: { en_US: 'Web Store' },
            type: 'site',
            siteGroupId: 20111,
            externalReferenceCode: 'AICA-CH-GUEST-STORE-20111',
          });
        }
      )
    );

    const testConfig = { ...config, siteGroupId: undefined };
    const result = await liferayService.getChannels(testConfig);

    expect(testConfig.siteGroupId).toBe(20111);
    expect(postPayload).toEqual({
      name: 'Web Store',
      type: 'site',
      siteGroupId: 20111,
      currencyCode: 'USD',
      externalReferenceCode: 'AICA-CH-GUEST-STORE-20111',
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(999);
  });

  it('should flatten localized names for currencies', async () => {
    const result = await liferayService.getCurrencies(config);
    expect(result[0].name).toBe('US Dollar');
  });

  describe('Page Management (LPD-35443) APIs', () => {
    const siteKey = 'test-site-key';

    it('should get site pages', async () => {
      const res = await liferayService.getSitePages(config, siteKey);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].name).toBe('Test Page 1');
      expect(res.items[0].externalReferenceCode).toBe('PAGE-1');
    });

    it('should create site page', async () => {
      const pageData = { externalReferenceCode: 'NEW-PAGE', name: 'New Page' };
      const res = await liferayService.createSitePage(
        config,
        siteKey,
        pageData
      );
      expect(res.name).toBe('New Page');
      expect(res.externalReferenceCode).toBe('NEW-PAGE');
    });

    it('should get specific site page', async () => {
      const res = await liferayService.getSitePage(
        config,
        siteKey,
        'MY-PAGE-1'
      );
      expect(res.externalReferenceCode).toBe('MY-PAGE-1');
      expect(res.name).toBe('Test Page 1');
    });

    it('should update site page', async () => {
      const pageData = { name: 'Updated Page' };
      const res = await liferayService.updateSitePage(
        config,
        siteKey,
        'MY-PAGE-1',
        pageData
      );
      expect(res.name).toBe('Updated Page');
      expect(res.externalReferenceCode).toBe('MY-PAGE-1');
    });

    it('should delete site page', async () => {
      const res = await liferayService.deleteSitePage(
        config,
        siteKey,
        'MY-PAGE-1',
        { fullResponse: true }
      );
      expect(res.status).toBe(204);
    });

    it('should patch site page', async () => {
      const pageData = { name: 'Patched Page' };
      const res = await liferayService.patchSitePage(
        config,
        siteKey,
        'MY-PAGE-1',
        pageData
      );
      expect(res.name).toBe('Patched Page');
      expect(res.externalReferenceCode).toBe('MY-PAGE-1');
    });
  });

  describe('Page Template Management APIs', () => {
    const siteKey = 'test-site-key';

    it('should get page templates', async () => {
      const res = await liferayService.getPageTemplates(config, siteKey);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].name).toBe('Test Template 1');
    });

    it('should create page template', async () => {
      const templateData = {
        externalReferenceCode: 'NEW-TEMP',
        name: 'New Temp',
      };
      const res = await liferayService.createPageTemplate(
        config,
        siteKey,
        templateData
      );
      expect(res.name).toBe('New Temp');
      expect(res.externalReferenceCode).toBe('NEW-TEMP');
    });

    it('should get specific page template', async () => {
      const res = await liferayService.getPageTemplate(
        config,
        siteKey,
        'MY-TEMP-1'
      );
      expect(res.externalReferenceCode).toBe('MY-TEMP-1');
    });

    it('should update page template', async () => {
      const templateData = { name: 'Updated Temp' };
      const res = await liferayService.updatePageTemplate(
        config,
        siteKey,
        'MY-TEMP-1',
        templateData
      );
      expect(res.name).toBe('Updated Temp');
      expect(res.externalReferenceCode).toBe('MY-TEMP-1');
    });

    it('should delete page template', async () => {
      const res = await liferayService.deletePageTemplate(
        config,
        siteKey,
        'MY-TEMP-1',
        { fullResponse: true }
      );
      expect(res.status).toBe(204);
    });

    it('should patch page template', async () => {
      const templateData = { name: 'Patched Temp' };
      const res = await liferayService.patchPageTemplate(
        config,
        siteKey,
        'MY-TEMP-1',
        templateData
      );
      expect(res.name).toBe('Patched Temp');
      expect(res.externalReferenceCode).toBe('MY-TEMP-1');
    });
  });

  describe('Page Template Set Management APIs', () => {
    const siteKey = 'test-site-key';

    it('should get page template sets', async () => {
      const res = await liferayService.getPageTemplateSets(config, siteKey);
      expect(res.items).toHaveLength(1);
      expect(res.items[0].name).toBe('Test Set 1');
    });

    it('should create page template set', async () => {
      const setData = { externalReferenceCode: 'NEW-SET', name: 'New Set' };
      const res = await liferayService.createPageTemplateSet(
        config,
        siteKey,
        setData
      );
      expect(res.name).toBe('New Set');
      expect(res.externalReferenceCode).toBe('NEW-SET');
    });

    it('should get specific page template set', async () => {
      const res = await liferayService.getPageTemplateSet(
        config,
        siteKey,
        'MY-SET-1'
      );
      expect(res.externalReferenceCode).toBe('MY-SET-1');
    });

    it('should update page template set', async () => {
      const setData = { name: 'Updated Set' };
      const res = await liferayService.updatePageTemplateSet(
        config,
        siteKey,
        'MY-SET-1',
        setData
      );
      expect(res.name).toBe('Updated Set');
      expect(res.externalReferenceCode).toBe('MY-SET-1');
    });

    it('should delete page template set', async () => {
      const res = await liferayService.deletePageTemplateSet(
        config,
        siteKey,
        'MY-SET-1',
        { fullResponse: true }
      );
      expect(res.status).toBe(204);
    });

    it('should patch page template set', async () => {
      const setData = { name: 'Patched Set' };
      const res = await liferayService.patchPageTemplateSet(
        config,
        siteKey,
        'MY-SET-1',
        setData
      );
      expect(res.name).toBe('Patched Set');
      expect(res.externalReferenceCode).toBe('MY-SET-1');
    });
  });

  describe('createAccountsBatch with emulated UPSERT', () => {
    it('should split accounts into new and existing, patching existing and batch-posting new', async () => {
      const { http, HttpResponse } = require('msw');
      let patchPayloads = [];
      let postBatchPayload = null;

      // Setup custom MSW handlers to capture and mock the emulated UPSERT calls
      server.use(
        http.post('*/o/graphql', () => {
          return HttpResponse.json({
            data: {
              headlessAdminUser_v1_0: {
                alias0: {
                  id: 10,
                  externalReferenceCode: 'ACC-EXISTING',
                  name: 'Existing Account',
                },
                alias1: null,
              },
            },
          });
        }),
        http.patch(
          '*/o/headless-admin-user/v1.0/accounts/by-external-reference-code/:erc',
          async ({ params, request }) => {
            const data = await request.json();
            patchPayloads.push({ erc: params.erc, data });
            return HttpResponse.json({
              id: 10,
              externalReferenceCode: params.erc,
              ...data,
            });
          }
        ),
        http.post(
          '*/o/headless-admin-user/v1.0/accounts/batch',
          async ({ request }) => {
            postBatchPayload = await request.json();
            return HttpResponse.json({
              id: 9002,
              status: 'INITIAL',
            });
          }
        )
      );

      const accounts = [
        { externalReferenceCode: 'ACC-EXISTING', name: 'Existing Account' },
        { externalReferenceCode: 'ACC-NEW', name: 'New Account' },
      ];

      const results = await liferayService.createAccountsBatch(
        config,
        accounts,
        {
          sessionId: 'test-session-id',
          externalReferenceCode: 'test-batch-erc',
        }
      );

      // 1. Verify that patch was called for the existing account
      expect(patchPayloads).toHaveLength(1);
      expect(patchPayloads[0].erc).toBe('ACC-EXISTING');
      expect(patchPayloads[0].data.name).toBe('Existing Account');

      // 2. Verify that batch create was called for the new account
      expect(postBatchPayload).not.toBeNull();
      expect(postBatchPayload.createStrategy).toBe('UPSERT');
      expect(postBatchPayload.items).toHaveLength(1);
      expect(postBatchPayload.items[0].externalReferenceCode).toBe('ACC-NEW');

      // 3. Verify final return count
      expect(results.accountCount).toBe(2);
      expect(results.batchId).toBe(9002);
    });

    it('should return completed status immediately if all accounts already exist', async () => {
      const { http, HttpResponse } = require('msw');
      let patchCount = 0;
      let postBatchCalled = false;

      server.use(
        http.post('*/o/graphql', () => {
          return HttpResponse.json({
            data: {
              headlessAdminUser_v1_0: {
                alias0: {
                  id: 10,
                  externalReferenceCode: 'ACC-EXISTING-1',
                  name: 'Existing 1',
                },
                alias1: {
                  id: 11,
                  externalReferenceCode: 'ACC-EXISTING-2',
                  name: 'Existing 2',
                },
              },
            },
          });
        }),
        http.patch(
          '*/o/headless-admin-user/v1.0/accounts/by-external-reference-code/:erc',
          () => {
            patchCount++;
            return HttpResponse.json({ success: true });
          }
        ),
        http.post('*/o/headless-admin-user/v1.0/accounts/batch', () => {
          postBatchCalled = true;
          return HttpResponse.json({ id: 9002 });
        })
      );

      const accounts = [
        { externalReferenceCode: 'ACC-EXISTING-1', name: 'Existing 1' },
        { externalReferenceCode: 'ACC-EXISTING-2', name: 'Existing 2' },
      ];

      const results = await liferayService.createAccountsBatch(
        config,
        accounts,
        {
          sessionId: 'test-session-id',
          externalReferenceCode: 'test-batch-erc',
        }
      );

      expect(patchCount).toBe(2);
      expect(postBatchCalled).toBe(false);
      expect(results.status).toBe('completed');
      expect(results.accountCount).toBe(2);
      expect(results.batchId).toContain('batch-mock-');
    });
  });

  describe('CatalogAdapterFactory capabilities discovery', () => {
    it('should resolve to PimSkuFirstAdapter when PIM capability is detected', async () => {
      // Use a unique URL to avoid factory caching
      const testConfig = { ...config, liferayUrl: 'http://liferay-pim:8080' };
      server.use(
        http.get(
          'http://liferay-pim:8080/o/headless-pim/v1.0/openapi.json',
          () => {
            return HttpResponse.json({ openapi: '3.0.0' });
          }
        )
      );

      const adapter = await liferayService.getCatalogAdapter(testConfig);
      const PimSkuFirstAdapter = require('../src/liferay/adapters/PimSkuFirstAdapter.cjs');
      expect(adapter).toBeInstanceOf(PimSkuFirstAdapter);
    });

    it('should resolve to LegacyProductFirstAdapter when PIM capability is missing', async () => {
      const testConfig = {
        ...config,
        liferayUrl: 'http://liferay-no-pim:8080',
      };
      server.use(
        http.get(
          'http://liferay-no-pim:8080/o/headless-pim/v1.0/openapi.json',
          () => {
            return new HttpResponse(null, { status: 404 });
          }
        )
      );

      const adapter = await liferayService.getCatalogAdapter(testConfig);
      const LegacyProductFirstAdapter = require('../src/liferay/adapters/LegacyProductFirstAdapter.cjs');
      expect(adapter).toBeInstanceOf(LegacyProductFirstAdapter);
    });
  });

  describe('iteratePages', () => {
    it('should iterate pages using a custom fetcher function', async () => {
      const fetcher = vi
        .fn()
        .mockImplementation(async (cfg, page, _pageSize) => {
          if (page === 1) {
            return {
              items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
              ],
            };
          } else if (page === 2) {
            return { items: [{ id: 3, name: 'Item 3' }] };
          }
          return { items: [] };
        });

      const pages = [];
      for await (const pageRes of liferayService.rest.iteratePages(
        config,
        fetcher,
        null,
        null,
        { pageSize: 2 }
      )) {
        pages.push(pageRes);
      }

      expect(fetcher).toHaveBeenCalledTimes(2);
      expect(pages).toHaveLength(2);
      expect(pages[0].items).toHaveLength(2);
      expect(pages[1].items).toHaveLength(1);
    });

    it('should iterate pages using a string URL', async () => {
      server.use(
        http.get('http://liferay:8080/o/test-list', (info) => {
          const url = new URL(info.request.url);
          const page = parseInt(url.searchParams.get('page') || '1', 10);
          if (page === 1) {
            return HttpResponse.json({ items: [{ id: 1 }, { id: 2 }] });
          } else {
            return HttpResponse.json({ items: [] });
          }
        })
      );

      const pages = [];
      for await (const pageRes of liferayService.rest.iteratePages(
        config,
        '/o/test-list',
        'test-list',
        'Test List',
        { pageSize: 2 }
      )) {
        pages.push(pageRes);
      }

      expect(pages).toHaveLength(2);
      expect(pages[0].items).toHaveLength(2);
      expect(pages[1].items).toHaveLength(0);
    });
  });

  describe('Web Content Structure Support', () => {
    it('should dynamically resolve classname ID and cache it', async () => {
      let classnameCalls = 0;
      server.use(
        http.post(
          '*/api/jsonws/classname/get-class-name-id',
          async ({ request }) => {
            classnameCalls++;
            const body = await request.json();
            expect(body.value).toBe('com.liferay.journal.model.JournalArticle');
            return HttpResponse.json(45001);
          }
        )
      );

      const id1 = await liferayService.rest.getClassNameId(
        config,
        'com.liferay.journal.model.JournalArticle'
      );
      const id2 = await liferayService.rest.getClassNameId(
        config,
        'com.liferay.journal.model.JournalArticle'
      );

      expect(id1).toBe(45001);
      expect(id2).toBe(45001);
      expect(classnameCalls).toBe(1); // Caching works
    });

    it('should create web content structure with simplified fields array', async () => {
      let addStructurePayload = null;

      server.use(
        http.post('*/api/jsonws/classname/get-class-name-id', () => {
          return HttpResponse.json(45001);
        }),
        http.post(
          '*/api/jsonws/ddm.ddmstructure/add-structure',
          async ({ request }) => {
            addStructurePayload = await request.json();
            return HttpResponse.json({
              structureId: 12345,
              groupId: 20127,
              classNameId: 45001,
              structureKey: addStructurePayload.structureKey,
              name: 'Test Web Content Structure',
              nameMap: addStructurePayload.nameMap,
              description: 'Test Description',
              descriptionMap: addStructurePayload.descriptionMap,
              definition: addStructurePayload.definition,
              storageType: 'json',
              type: 0,
            });
          }
        )
      );

      const structureData = {
        structureKey: 'my-custom-structure',
        name: 'Test Web Content Structure',
        description: 'Test Description',
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'Title',
          },
          {
            name: 'age',
            type: 'integer',
            label: 'Age',
            required: true,
          },
        ],
      };

      const result = await liferayService.createWebContentStructure(
        config,
        20127,
        structureData
      );

      expect(addStructurePayload).toBeDefined();
      expect(addStructurePayload.groupId).toBe('20127');
      expect(addStructurePayload.classNameId).toBe('45001');
      expect(addStructurePayload.structureKey).toBe('my-custom-structure');

      const parsedDef = JSON.parse(addStructurePayload.definition);
      expect(parsedDef.fields).toHaveLength(2);
      expect(parsedDef.fields[0].name).toBe('title');
      expect(parsedDef.fields[0].dataType).toBe('string');
      expect(parsedDef.fields[0].type).toBe('text');
      expect(parsedDef.fields[1].name).toBe('age');
      expect(parsedDef.fields[1].dataType).toBe('integer');
      expect(parsedDef.fields[1].required).toBe(true);

      expect(result.id).toBe(12345);
      expect(result.siteId).toBe(20127);
      expect(result.name).toBe('Test Web Content Structure');
      expect(result.contentStructureFields).toHaveLength(2);
      expect(result.contentStructureFields[0].name).toBe('title');
      expect(result.contentStructureFields[0].dataType).toBe('string');
      expect(result.contentStructureFields[0].inputControl).toBe('text');
    });

    it('should retrieve a single content structure by ID', async () => {
      server.use(
        http.get('*/o/headless-delivery/v1.0/content-structures/12345', () => {
          return HttpResponse.json({
            id: 12345,
            name: 'Test Structure',
            structureKey: 'test-key',
          });
        })
      );

      const result = await liferayService.getContentStructure(config, 12345);
      expect(result.id).toBe(12345);
      expect(result.name).toBe('Test Structure');
      expect(result.structureKey).toBe('test-key');
    });

    it('should retrieve site content structures', async () => {
      server.use(
        http.get(
          '*/o/headless-delivery/v1.0/sites/20127/content-structures',
          () => {
            return HttpResponse.json({
              items: [
                {
                  id: 12345,
                  name: 'Test Structure',
                  structureKey: 'test-key',
                },
              ],
              totalCount: 1,
            });
          }
        )
      );

      const result = await liferayService.getSiteContentStructures(
        config,
        20127
      );
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe(12345);
      expect(result.totalCount).toBe(1);
    });
  });

  describe('triggerReindex', () => {
    it('should successfully trigger a full search reindex (all)', async () => {
      const res = await liferayService.rest.triggerReindex(config);
      expect(res.status).toBe('success');
      expect(res.message).toBe('All indexes scheduled for reindexing');
    });

    it('should successfully trigger a class-specific search reindex', async () => {
      const res = await liferayService.rest.triggerReindex(
        config,
        'com.liferay.portal.kernel.model.User'
      );
      expect(res.status).toBe('success');
      expect(res.className).toBe('com.liferay.portal.kernel.model.User');
    });
  });
});
