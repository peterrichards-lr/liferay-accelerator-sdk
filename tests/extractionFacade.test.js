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
        },
      },
      headlessAdminSite: {
        v1_0: {
          getSiteStyleBooksPage: vi
            .fn()
            .mockResolvedValue({ items: [{ id: 5, name: 'StyleBook' }] }),
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
