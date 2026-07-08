import { vi, describe, it, expect, beforeEach } from 'vitest';
const ExtractionFacade = require('../src/services/extractionFacade.cjs');

describe('ExtractionFacade', () => {
  let facade;
  let mockLiferayService;
  let mockClient;
  let mockRest;
  const config = {
    liferayUrl: 'http://liferay:8080',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
  };

  beforeEach(() => {
    mockClient = {
      headlessDelivery: {
        v1_0: {
          getSiteSitePagesPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 1, name: 'Home' }] }),
          getSiteDocumentsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 2, name: 'Doc' }] }),
          getSiteNavigationMenusPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 3, name: 'Menu' }] }),
          getSiteStructuredContentsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 4, name: 'Article' }] }),
          getSiteBlogPostingsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 15, name: 'BlogPost' }] }),
          getSiteKnowledgeBaseArticlesPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 16, name: 'KBArticle' }] }),
          getSiteSitePageFriendlyUrlExperiencesPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 17, name: 'Experience' }] }),
        },
      },
      headlessAdminSite: {
        v1_0: {
          getSiteStyleBooksPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 5, name: 'StyleBook' }] }),
          getSiteDisplayPageTemplatesPage: vi.fn().mockResolvedValue({
            items: [{ id: 8, name: 'DisplayPageTemplate' }],
          }),
          getSite: vi.fn().mockResolvedValue({ id: 9, name: 'SiteSettings' }),
        },
      },
      headlessAdminUser: {
        v1_0: {
          getUserAccountsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 10, name: 'UserAccount' }] }),
          getOrganizationsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 11, name: 'Organization' }] }),
          getUserGroupsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 12, name: 'UserGroup' }] }),
          getRolesPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 13, name: 'Role' }] }),
          getSiteSegmentsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 14, name: 'Segment' }] }),
        },
      },
      headlessCommerceAdminCatalog: {
        v1_0: {
          getCatalogsPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 6, name: 'Catalog' }] }),
        },
      },
    };

    mockRest = {
      _get: vi
        .fn()
        .mockResolvedValue({ items: [{ id: 7, name: 'ObjectDef' }] }),
    };

    mockLiferayService = {
      client: mockClient,
      rest: mockRest,
      getAccounts: vi
        .fn()
        .mockResolvedValue({ items: [{ id: 18, name: 'Account' }] }),
      getAccountGroups: vi
        .fn()
        .mockResolvedValue({ items: [{ id: 19, name: 'AccountGroup' }] }),
    };

    facade = new ExtractionFacade(mockLiferayService);
  });

  it('should instantiate successfully and bind service references', () => {
    expect(facade).toBeDefined();
    expect(facade.client).toBe(mockClient);
    expect(facade.rest).toBe(mockRest);
  });

  it('should extract site pages', async () => {
    const result = await facade.getSitePages(config, 'site-123', { page: 1 });
    expect(
      mockClient.headlessDelivery.v1_0.getSiteSitePagesPage
    ).toHaveBeenCalledWith(config, 'site-123', null, { params: { page: 1 } });
    expect(result.items[0].name).toBe('Home');
  });

  it('should extract documents', async () => {
    const result = await facade.getDocuments(config, 'site-123');
    expect(
      mockClient.headlessDelivery.v1_0.getSiteDocumentsPage
    ).toHaveBeenCalledWith(config, 'site-123', null, { params: {} });
    expect(result.items[0].name).toBe('Doc');
  });

  it('should extract style books', async () => {
    const result = await facade.getStyleBooks(config, 'site-123');
    expect(
      mockClient.headlessAdminSite.v1_0.getSiteStyleBooksPage
    ).toHaveBeenCalledWith(config, 'site-123', null, { params: {} });
    expect(result.items[0].name).toBe('StyleBook');
  });

  it('should extract navigation menus', async () => {
    const result = await facade.getNavigationMenus(config, 'site-123');
    expect(
      mockClient.headlessDelivery.v1_0.getSiteNavigationMenusPage
    ).toHaveBeenCalledWith(config, 'site-123', null, { params: {} });
    expect(result.items[0].name).toBe('Menu');
  });

  it('should extract structured contents', async () => {
    const result = await facade.getStructuredContents(config, 'site-123');
    expect(
      mockClient.headlessDelivery.v1_0.getSiteStructuredContentsPage
    ).toHaveBeenCalledWith(config, 'site-123', null, { params: {} });
    expect(result.items[0].name).toBe('Article');
  });

  it('should extract commerce catalogs', async () => {
    const result = await facade.getCommerceCatalogs(config);
    expect(
      mockClient.headlessCommerceAdminCatalog.v1_0.getCatalogsPage
    ).toHaveBeenCalledWith(config, null, { params: {} });
    expect(result.items[0].name).toBe('Catalog');
  });

  it('should extract object definitions via rest._get', async () => {
    const result = await facade.getObjectDefinitions(config);
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/object-admin/v1.0/object-definitions',
      'get-object-definitions',
      'Get Object Definitions',
      { params: {} }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract page elements via rest._get', async () => {
    const result = await facade.getPageElements(config, 'page-123', {
      fields: 'id',
    });
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/headless-delivery/v1.0/site-pages/page-123/page-elements',
      'get-page-elements',
      'Get Page Elements',
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract asset lists via rest._get', async () => {
    const result = await facade.getAssetLists(config, 'site-123', {
      fields: 'id',
    });
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/headless-delivery/v1.0/sites/site-123/asset-lists',
      'get-asset-lists',
      'Get Asset Lists',
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract display page templates via client', async () => {
    const result = await facade.getDisplayPageTemplates(config, 'site-123', {
      fields: 'id',
    });
    expect(
      mockClient.headlessAdminSite.v1_0.getSiteDisplayPageTemplatesPage
    ).toHaveBeenCalledWith(config, 'site-123', null, {
      params: { fields: 'id' },
    });
    expect(result.items[0].name).toBe('DisplayPageTemplate');
  });

  it('should extract user accounts via client', async () => {
    const result = await facade.getUserAccounts(config, { fields: 'id' });
    expect(
      mockClient.headlessAdminUser.v1_0.getUserAccountsPage
    ).toHaveBeenCalledWith(config, null, { params: { fields: 'id' } });
    expect(result.items[0].name).toBe('UserAccount');
  });

  it('should extract organizations via client', async () => {
    const result = await facade.getOrganizations(config, { fields: 'id' });
    expect(
      mockClient.headlessAdminUser.v1_0.getOrganizationsPage
    ).toHaveBeenCalledWith(config, null, { params: { fields: 'id' } });
    expect(result.items[0].name).toBe('Organization');
  });

  it('should extract user groups via client', async () => {
    const result = await facade.getUserGroups(config, { fields: 'id' });
    expect(
      mockClient.headlessAdminUser.v1_0.getUserGroupsPage
    ).toHaveBeenCalledWith(config, null, { params: { fields: 'id' } });
    expect(result.items[0].name).toBe('UserGroup');
  });

  it('should extract roles via client', async () => {
    const result = await facade.getRoles(config, { fields: 'id' });
    expect(mockClient.headlessAdminUser.v1_0.getRolesPage).toHaveBeenCalledWith(
      config,
      null,
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('Role');
  });

  it('should extract forms via rest._get', async () => {
    const result = await facade.getForms(config, 'site-123', { fields: 'id' });
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/headless-form/v1.0/sites/site-123/forms',
      'get-forms',
      'Get Forms',
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract workflow definitions via rest._get', async () => {
    const result = await facade.getWorkflowDefinitions(config, {
      fields: 'id',
    });
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/workflow-admin/v1.0/workflow-definitions',
      'get-workflow-definitions',
      'Get Workflow Definitions',
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract site settings via client', async () => {
    const result = await facade.getSiteSettings(config, 'site-123', {
      fields: 'id',
    });
    expect(mockClient.headlessAdminSite.v1_0.getSite).toHaveBeenCalledWith(
      config,
      'site-123',
      null,
      { params: { fields: 'id' } }
    );
    expect(result.name).toBe('SiteSettings');
  });

  it('should extract widget page preferences via rest._get', async () => {
    const result = await facade.getWidgetPagePreferences(config, 'page-123', {
      fields: 'id',
    });
    expect(mockRest._get).toHaveBeenCalledWith(
      config,
      '/o/headless-admin-site/v1.0/site-pages/page-123/widget-page-preferences',
      'get-widget-page-preferences',
      'Get Widget Page Preferences',
      { params: { fields: 'id' } }
    );
    expect(result.items[0].name).toBe('ObjectDef');
  });

  it('should extract segments via client', async () => {
    const result = await facade.getSegments(config, 'site-123', {
      fields: 'id',
    });
    expect(
      mockClient.headlessAdminUser.v1_0.getSiteSegmentsPage
    ).toHaveBeenCalledWith(config, 'site-123', null, {
      params: { fields: 'id' },
    });
    expect(result.items[0].name).toBe('Segment');
  });

  it('should extract personalization experiences via client', async () => {
    const result = await facade.getPersonalizationExperiences(
      config,
      'site-123',
      'home',
      { fields: 'id' }
    );
    expect(
      mockClient.headlessDelivery.v1_0.getSiteSitePageFriendlyUrlExperiencesPage
    ).toHaveBeenCalledWith(config, 'site-123', 'home', null, {
      params: { fields: 'id' },
    });
    expect(result.items[0].name).toBe('Experience');
  });

  it('should extract accounts by delegating to service context', async () => {
    const result = await facade.getAccounts(config, { fields: 'id' });
    expect(mockLiferayService.getAccounts).toHaveBeenCalledWith(config, {
      fields: 'id',
    });
    expect(result.items[0].name).toBe('Account');
  });

  it('should extract account groups by delegating to service context', async () => {
    const result = await facade.getAccountGroups(config, { fields: 'id' });
    expect(mockLiferayService.getAccountGroups).toHaveBeenCalledWith(config, {
      fields: 'id',
    });
    expect(result.items[0].name).toBe('AccountGroup');
  });

  it('should extract blog posts via client', async () => {
    const result = await facade.getBlogPosts(config, 'site-123', {
      fields: 'id',
    });
    expect(
      mockClient.headlessDelivery.v1_0.getSiteBlogPostingsPage
    ).toHaveBeenCalledWith(config, 'site-123', null, {
      params: { fields: 'id' },
    });
    expect(result.items[0].name).toBe('BlogPost');
  });

  it('should extract knowledge base articles via client', async () => {
    const result = await facade.getKnowledgeBaseArticles(config, 'site-123', {
      fields: 'id',
    });
    expect(
      mockClient.headlessDelivery.v1_0.getSiteKnowledgeBaseArticlesPage
    ).toHaveBeenCalledWith(config, 'site-123', null, {
      params: { fields: 'id' },
    });
    expect(result.items[0].name).toBe('KBArticle');
  });

  describe('getPageFragments', () => {
    it('should return an empty array if layout tree is null or empty', () => {
      expect(facade.getPageFragments(null)).toEqual([]);
      expect(facade.getPageFragments(undefined)).toEqual([]);
      expect(facade.getPageFragments({})).toEqual([]);
    });

    it('should recursively extract fragments from a page element tree', () => {
      const layouts = {
        pageDefinition: {
          pageElement: {
            id: 'root',
            type: 'Root',
            pageElements: [
              {
                id: 'sec-1',
                type: 'Section',
                pageElements: [
                  {
                    id: 'frag-1',
                    type: 'Fragment',
                    name: 'Header Fragment',
                  },
                  {
                    id: 'row-1',
                    type: 'Row',
                    pageElements: [
                      {
                        id: 'frag-2',
                        type: 'Fragment',
                        name: 'Footer Fragment',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'frag-3',
                type: 'Fragment',
                name: 'Direct Child Fragment',
              },
            ],
          },
        },
      };

      const result = facade.getPageFragments(layouts);
      expect(result).toHaveLength(3);
      expect(result.map((f) => f.id)).toEqual(['frag-1', 'frag-2', 'frag-3']);
    });

    it('should handle array inputs of layouts/pages', () => {
      const layouts = [
        {
          pageDefinition: {
            pageElement: {
              id: 'frag-1',
              type: 'Fragment',
            },
          },
        },
        {
          id: 'frag-2',
          type: 'Fragment',
        },
      ];

      const result = facade.getPageFragments(layouts);
      expect(result).toHaveLength(2);
      expect(result.map((f) => f.id)).toEqual(['frag-1', 'frag-2']);
    });
  });
});
