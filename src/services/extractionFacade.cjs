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

  // --- Phase 2: Content Organization ---

  /**
   * Fetch asset lists for the specified site.
   */
  async getAssetLists(config, siteId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-delivery/v1.0/sites/${siteId}/asset-lists`,
      'get-asset-lists',
      'Get Asset Lists',
      { params: queryParams }
    );
  }

  /**
   * Fetch display page templates for the specified site.
   */
  async getDisplayPageTemplates(config, siteId, queryParams = {}) {
    return await this.client.headlessAdminSite.v1_0.getSiteDisplayPageTemplatesPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  // --- Phase 3: IAM ---

  /**
   * Fetch user accounts.
   */
  async getUserAccounts(config, queryParams = {}) {
    return await this.client.headlessAdminUser.v1_0.getUserAccountsPage(
      config,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch organizations.
   */
  async getOrganizations(config, queryParams = {}) {
    return await this.client.headlessAdminUser.v1_0.getOrganizationsPage(
      config,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch user groups.
   */
  async getUserGroups(config, queryParams = {}) {
    return await this.client.headlessAdminUser.v1_0.getUserGroupsPage(
      config,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch roles.
   */
  async getRoles(config, queryParams = {}) {
    return await this.client.headlessAdminUser.v1_0.getRolesPage(config, null, {
      params: queryParams,
    });
  }

  // --- Phase 4: Business Logic ---

  /**
   * Fetch forms for the specified site.
   */
  async getForms(config, siteId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-form/v1.0/sites/${siteId}/forms`,
      'get-forms',
      'Get Forms',
      { params: queryParams }
    );
  }

  /**
   * Fetch workflow definitions.
   */
  async getWorkflowDefinitions(config, queryParams = {}) {
    return await this.rest._get(
      config,
      '/o/workflow-admin/v1.0/workflow-definitions',
      'get-workflow-definitions',
      'Get Workflow Definitions',
      { params: queryParams }
    );
  }

  // --- Phase 5: Site Config ---

  /**
   * Fetch site settings/logo/theme config.
   */
  async getSiteSettings(config, siteId, queryParams = {}) {
    return await this.client.headlessAdminSite.v1_0.getSite(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  // --- Phase 6: Advanced Layouts ---

  /**
   * Fetch widget page preferences.
   */
  async getWidgetPagePreferences(config, pageId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-admin-site/v1.0/site-pages/${pageId}/widget-page-preferences`,
      'get-widget-page-preferences',
      'Get Widget Page Preferences',
      { params: queryParams }
    );
  }

  /**
   * Fetch segments for the specified site.
   */
  async getSegments(config, siteId, queryParams = {}) {
    return await this.client.headlessAdminUser.v1_0.getSiteSegmentsPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch personalization experiences for a page.
   */
  async getPersonalizationExperiences(
    config,
    siteId,
    friendlyUrlPath,
    queryParams = {}
  ) {
    return await this.client.headlessDelivery.v1_0.getSiteSitePageFriendlyUrlExperiencesPage(
      config,
      siteId,
      friendlyUrlPath,
      null,
      { params: queryParams }
    );
  }

  // --- Phase 7: App Data & B2B ---

  /**
   * Fetch B2B accounts.
   */
  async getAccounts(config, queryParams = {}) {
    return await this.ctx.getAccounts(config, queryParams);
  }

  /**
   * Fetch B2B account groups.
   */
  async getAccountGroups(config, queryParams = {}) {
    return await this.ctx.getAccountGroups(config, queryParams);
  }

  /**
   * Fetch blog posts for the specified site.
   */
  async getBlogPosts(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteBlogPostingsPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch knowledge base articles for the specified site.
   */
  async getKnowledgeBaseArticles(config, siteId, queryParams = {}) {
    return await this.client.headlessDelivery.v1_0.getSiteKnowledgeBaseArticlesPage(
      config,
      siteId,
      null,
      { params: queryParams }
    );
  }

  /**
   * Fetch taxonomy vocabularies for the specified site.
   */
  async getTaxonomyVocabularies(config, siteId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies`,
      'get-taxonomy-vocabularies',
      'Get Taxonomy Vocabularies',
      { params: queryParams }
    );
  }

  /**
   * Fetch taxonomy categories for the specified taxonomy vocabulary.
   */
  async getTaxonomyCategories(config, vocabularyId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${vocabularyId}/taxonomy-categories`,
      'get-taxonomy-categories',
      'Get Taxonomy Categories',
      { params: queryParams }
    );
  }
}

module.exports = ExtractionFacade;
