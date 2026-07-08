/**
 * ExtractionFacade Service
 * Exposes clean, version-agnostic methods for extracting core Liferay entities
 * to shield downstream tooling (like liferay-demo-accelerator) from API path volatility.
 */

class ExtractionFacade {
  constructor(ctx) {
    this.ctx = ctx;
    // Map to either the context object directly or extract liferay service references
    const liferay = ctx?.liferay || ctx;
    this.client = liferay?.client;
    this.rest = liferay?.rest;
  }

  /**
   * Fetch site pages for the specified site.
   */
  async getSitePages(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteSitePagesPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch page elements for the specified site page.
   */
  async getPageElements(config, pageId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-delivery/v1.0/site-pages/${pageId}/page-elements`,
      'get-page-elements',
      'Get Page Elements',
      { params: queryParams }
    );
  }

  /**
   * Recursively extract page fragments (elements of type 'Fragment') from layout trees/page lists.
   */
  getPageFragments(layouts) {
    const fragments = [];

    const traverse = (node) => {
      if (!node) return;

      if (Array.isArray(node)) {
        for (const item of node) {
          traverse(item);
        }
        return;
      }

      if (node.pageDefinition) {
        traverse(node.pageDefinition);
        return;
      }

      if (node.pageElement) {
        traverse(node.pageElement);
        return;
      }

      if (node.type === 'Fragment') {
        fragments.push(node);
      }

      if (node.pageElements && Array.isArray(node.pageElements)) {
        traverse(node.pageElements);
      }
    };

    traverse(layouts);
    return fragments;
  }

  /**
   * Fetch documents for the specified site.
   */
  async getDocuments(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteDocumentsPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch style books for the specified site.
   */
  async getStyleBooks(config, siteId, queryParams = {}) {
    return await this.client.headlessAdminSite.v1_0.getSiteStyleBooksPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch navigation menus for the specified site.
   */
  async getNavigationMenus(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteNavigationMenusPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch structured contents for the specified site.
   */
  async getStructuredContents(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteStructuredContentsPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch commerce catalogs.
   */
  async getCommerceCatalogs(config, queryParams = {}) {
    return await this.client.headlessCommerceAdminCatalog.v1_0.getCatalogsPage(
      config,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch Liferay DXP Object definitions.
   */
  async getObjectDefinitions(config, queryParams = {}) {
    return await this.rest._get(
      config,
      '/o/object-admin/v1.0/object-definitions',
      'get-object-definitions',
      'Get Object Definitions',
      { params: queryParams }
    );
  }
}

module.exports = ExtractionFacade;
