/**
 * ExtractionFacade Service
 * Exposes clean, version-agnostic methods for extracting core Liferay entities
 * to shield downstream tooling (like liferay-demo-accelerator) from API path
 * volatility.
 *
 * Every collection reader here returns **one page**, and says so in its name
 * (#200). That is deliberate: these methods pass `queryParams` straight through
 * to Liferay - including `page` and `pageSize` - so the caller, not the facade,
 * decides how much to read, and the page envelope they get back carries
 * `totalCount` next to `items`. Collecting pages inside them would make an
 * explicit `page: 3` meaningless and would change the contract of two dozen
 * methods at once.
 *
 * What was wrong before #200 was not the semantics but the advertising: a
 * method called `getCommerceCatalogs` wrapping `getCatalogsPage` reads like it
 * returns the catalogs. The un-suffixed names are kept as deprecated aliases so
 * nothing downstream breaks, and a short page now warns instead of passing
 * itself off as the whole set.
 *
 * To read everything, wrap a reader in `collectAll`:
 *
 *   const { items } = await facade.collectAll((params) =>
 *     facade.getCommerceCatalogsPage(config, params)
 *   );
 */

const { collectAllPages, warnIfTruncated } = require('../utils/paging.cjs');

class ExtractionFacade {
  constructor(ctx) {
    this.ctx = ctx;
    // Map to either the context object directly or extract liferay service references
    const liferay = ctx?.liferay || ctx;
    this.client = liferay?.client;
    this.rest = liferay?.rest;
    this.logger = liferay?.ctx?.logger || ctx?.logger;
    this.siteExternalReferenceCodes = new Map();
  }

  /**
   * Await one page and report it if it is short of what Liferay counted.
   *
   * The warning is suppressed when the caller passed `page`, because somebody
   * walking the pages themselves - `collectAll` does - already knows that page
   * three of nine is not the whole set. Silence is only a defect when nobody
   * asked for a page and got one anyway.
   *
   * @param {string} op Operation name, matching the request logs.
   * @param {object} queryParams The caller's query parameters.
   * @param {() => Promise<any>} fetchPage Performs the read.
   */
  async _readPage(op, queryParams, fetchPage) {
    const response = await fetchPage();

    if (queryParams?.page === undefined) {
      warnIfTruncated(response, { op, logger: this.logger });
    }

    return response;
  }

  /**
   * Read every page of any of this facade's page readers.
   *
   * @param {(params: {page: number, pageSize: number}) => Promise<any>} fetchPage
   *   Called once per page with the `page` and `pageSize` to request; pass them
   *   through as the reader's queryParams.
   * @param {object} [options] `pageSize`, `maxPages` and `op`; see utils/paging.
   * @returns {Promise<{items: Array, totalCount: number}>}
   */
  async collectAll(fetchPage, options = {}) {
    return await collectAllPages(fetchPage, {
      logger: this.logger,
      ...options,
    });
  }

  /**
   * Fetch one page of sites.
   *
   * Exists so a caller holding a numeric site id - which is what a CLI is
   * given - can turn it into the external reference code that every
   * `headless-admin-site` path is keyed on (#240).
   */
  async getSitesPage(config, queryParams = {}) {
    return await this._readPage('getSitesPage', queryParams, () =>
      this.client.headlessAdminSite.v1_0.getSitesPage(config, null, {
        params: queryParams,
      })
    );
  }

  /**
   * The external reference code for a site, given either form of reference.
   *
   * `headless-admin-site` keys every site-scoped path on
   * `{siteExternalReferenceCode}`, while `headless-delivery` keys its own on
   * `{siteId}`. Three readers here took an id and substituted it into the
   * first kind of slot, which is structurally well-formed and wrong: style
   * books and display page templates answered 400, and getSite answered 404,
   * on every call ever made (#240).
   *
   * A numeric reference is resolved by walking `/v1.0/sites` and matching
   * `id`; `/v1.0/sites` declares no `filter` parameter, only
   * `active`/`page`/`pageSize`/`search`, so there is no server-side lookup to
   * ask for. The result is cached per instance and id, because a site's
   * external reference code does not change under a running extraction, and
   * three readers on the same site would otherwise walk the site list three
   * times.
   *
   * @param {object} config Liferay connection config.
   * @param {string|number} site The site's external reference code, or its id.
   * @returns {Promise<string>} The external reference code.
   * @throws {Error} When no reference was given, or no site carries that id.
   */
  async resolveSiteExternalReferenceCode(config, site) {
    if (site === undefined || site === null || site === '') {
      throw new Error(
        'A site is required: pass the site external reference code, or the numeric site id to resolve one from'
      );
    }

    const reference = String(site);
    if (!/^\d+$/.test(reference)) return reference;

    const cacheKey = `${config?.liferayUrl || ''}::${reference}`;
    const cached = this.siteExternalReferenceCodes.get(cacheKey);
    if (cached) return cached;

    const { items } = await this.collectAll(
      (params) => this.getSitesPage(config, params),
      { op: 'getSitesPage' }
    );

    const match = items.find(
      (candidate) => String(candidate?.id) === reference
    );

    if (!match?.externalReferenceCode) {
      throw new Error(
        `No site with id ${reference} carries an external reference code, and headless-admin-site addresses sites by external reference code`
      );
    }

    this.siteExternalReferenceCodes.set(cacheKey, match.externalReferenceCode);
    return match.externalReferenceCode;
  }

  /**
   * Fetch one page of site pages for the specified site.
   */
  async getSitePagesPage(config, siteId, queryParams = {}) {
    return await this._readPage('getSiteSitePagesPage', queryParams, () =>
      this.client.headlessDelivery.v1_0.getSiteSitePagesPage(
        config,
        siteId,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getSitePagesPage`, or `collectAll`
   * to read every page (#200).
   */
  async getSitePages(config, siteId, queryParams = {}) {
    return await this.getSitePagesPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of page elements for the specified site page.
   */
  async getPageElementsPage(config, pageId, queryParams = {}) {
    return await this._readPage('get-page-elements', queryParams, () =>
      this.rest._get(
        config,
        `/o/headless-delivery/v1.0/site-pages/${pageId}/page-elements`,
        'get-page-elements',
        'Get Page Elements',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getPageElementsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getPageElements(config, pageId, queryParams = {}) {
    return await this.getPageElementsPage(config, pageId, queryParams);
  }

  /**
   * Fetch page specification for the specified site page.
   * Requires LPS-178642 to be enabled on the target DXP instance.
   */
  async getPageSpecification(config, pageId, queryParams = {}) {
    return await this.rest._get(
      config,
      `/o/headless-delivery/v1.0/site-pages/${pageId}/page-specification`,
      'get-page-specification',
      'Get Page Specification',
      { params: queryParams }
    );
  }

  /**
   * Mutate a page element's configuration or content.
   * Requires LPS-168340 to be enabled on the target DXP instance.
   */
  async updatePageElement(config, pageElementId, payload, queryParams = {}) {
    // Note: this.rest._patch signature is (config, url, data, op, friendly, fullResponse)
    // However, depending on the SDK core, some endpoints might require PUT. We use PATCH here as it's standard for partial updates.
    // Ensure the payload structure matches the OData spec for PageElement.
    const url = `/o/headless-delivery/v1.0/page-elements/${pageElementId}`;

    // Add query params to URL if they exist
    let finalUrl = url;
    if (Object.keys(queryParams).length > 0) {
      const qs = new URLSearchParams(queryParams).toString();
      finalUrl += `?${qs}`;
    }

    return await this.rest._patch(
      config,
      finalUrl,
      payload,
      'update-page-element',
      'Update Page Element'
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
   * Fetch one page of documents for the specified site.
   */
  async getDocumentsPage(config, siteId, queryParams = {}) {
    return await this._readPage('getSiteDocumentsPage', queryParams, () =>
      this.client.headlessDelivery.v1_0.getSiteDocumentsPage(
        config,
        siteId,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getDocumentsPage`, or `collectAll`
   * to read every page (#200).
   */
  async getDocuments(config, siteId, queryParams = {}) {
    return await this.getDocumentsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of style books for the specified site.
   *
   * @param {object} config Liferay connection config.
   * @param {string|number} siteExternalReferenceCode The site's external
   *   reference code, or its numeric id, which is resolved to one (#240).
   * @param {object} [queryParams] Passed through to Liferay.
   */
  async getStyleBooksPage(config, siteExternalReferenceCode, queryParams = {}) {
    const erc = await this.resolveSiteExternalReferenceCode(
      config,
      siteExternalReferenceCode
    );

    return await this._readPage('getSiteStyleBooksPage', queryParams, () =>
      this.client.headlessAdminSite.v1_0.getSiteStyleBooksPage(
        config,
        erc,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getStyleBooksPage`, or `collectAll`
   * to read every page (#200).
   */
  async getStyleBooks(config, siteExternalReferenceCode, queryParams = {}) {
    return await this.getStyleBooksPage(
      config,
      siteExternalReferenceCode,
      queryParams
    );
  }

  /**
   * Fetch one page of navigation menus for the specified site.
   */
  async getNavigationMenusPage(config, siteId, queryParams = {}) {
    return await this._readPage('getSiteNavigationMenusPage', queryParams, () =>
      this.client.headlessDelivery.v1_0.getSiteNavigationMenusPage(
        config,
        siteId,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getNavigationMenusPage`, or
   * `collectAll` to read every page (#200).
   */
  async getNavigationMenus(config, siteId, queryParams = {}) {
    return await this.getNavigationMenusPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of structured contents for the specified site.
   */
  async getStructuredContentsPage(config, siteId, queryParams = {}) {
    return await this._readPage(
      'getSiteStructuredContentsPage',
      queryParams,
      () =>
        this.client.headlessDelivery.v1_0.getSiteStructuredContentsPage(
          config,
          siteId,
          null,
          { params: queryParams }
        )
    );
  }

  /**
   * @deprecated Returns a single page; use `getStructuredContentsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getStructuredContents(config, siteId, queryParams = {}) {
    return await this.getStructuredContentsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of commerce catalogs.
   */
  async getCommerceCatalogsPage(config, queryParams = {}) {
    return await this._readPage('getCatalogsPage', queryParams, () =>
      this.client.headlessCommerceAdminCatalog.v1_0.getCatalogsPage(
        config,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getCommerceCatalogsPage`, or
   * `collectAll` to read every page (#200). `liferay.getCatalogs()` returns
   * every catalog if that is what you want.
   */
  async getCommerceCatalogs(config, queryParams = {}) {
    return await this.getCommerceCatalogsPage(config, queryParams);
  }

  /**
   * Fetch one page of Liferay DXP Object definitions.
   */
  async getObjectDefinitionsPage(config, queryParams = {}) {
    return await this._readPage('get-object-definitions', queryParams, () =>
      this.rest._get(
        config,
        '/o/object-admin/v1.0/object-definitions',
        'get-object-definitions',
        'Get Object Definitions',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getObjectDefinitionsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getObjectDefinitions(config, queryParams = {}) {
    return await this.getObjectDefinitionsPage(config, queryParams);
  }

  // --- Phase 2: Content Organization ---

  /**
   * Not available: Liferay serves no asset-list collection.
   *
   * This requested a site's asset-lists collection under headless-delivery, a
   * path no synced OpenAPI document declares. The path gate carried it as
   * unverified because the two possible causes - the SDK inventing a path, or
   * `api-schemas` predating the endpoint - could not be told apart without a
   * live instance. One has now answered: HTTP 404 (#240).
   *
   * It throws rather than requesting the path anyway, so a caller learns that
   * this collection cannot be read at all instead of reading a 404 as an
   * extraction failure it might retry or route around. Liferay's nearest
   * equivalent is a content set addressed by key or uuid
   * (`/v1.0/sites/{siteId}/content-sets/by-key/{key}/content-set-elements`),
   * which answers with the elements of one named set rather than the sets a
   * site has.
   *
   * @throws {Error} Always.
   */
  async getAssetListsPage() {
    throw new Error(
      'Asset lists cannot be extracted: headless-delivery declares no asset-list collection, and /o/headless-delivery/v1.0/sites/{siteId}/asset-lists answers 404 on a live instance (#240). Read a named content set by key or uuid instead.'
    );
  }

  /**
   * @deprecated Not available; see `getAssetListsPage` (#240).
   */
  async getAssetLists(config, siteId, queryParams = {}) {
    return await this.getAssetListsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of display page templates for the specified site.
   *
   * @param {object} config Liferay connection config.
   * @param {string|number} siteExternalReferenceCode The site's external
   *   reference code, or its numeric id, which is resolved to one (#240).
   * @param {object} [queryParams] Passed through to Liferay.
   */
  async getDisplayPageTemplatesPage(
    config,
    siteExternalReferenceCode,
    queryParams = {}
  ) {
    const erc = await this.resolveSiteExternalReferenceCode(
      config,
      siteExternalReferenceCode
    );

    return await this._readPage(
      'getSiteDisplayPageTemplatesPage',
      queryParams,
      () =>
        this.client.headlessAdminSite.v1_0.getSiteDisplayPageTemplatesPage(
          config,
          erc,
          null,
          { params: queryParams }
        )
    );
  }

  /**
   * @deprecated Returns a single page; use `getDisplayPageTemplatesPage`, or
   * `collectAll` to read every page (#200).
   */
  async getDisplayPageTemplates(
    config,
    siteExternalReferenceCode,
    queryParams = {}
  ) {
    return await this.getDisplayPageTemplatesPage(
      config,
      siteExternalReferenceCode,
      queryParams
    );
  }

  // --- Phase 3: IAM ---

  /**
   * Fetch one page of user accounts.
   */
  async getUserAccountsPage(config, queryParams = {}) {
    return await this._readPage('getUserAccountsPage', queryParams, () =>
      this.client.headlessAdminUser.v1_0.getUserAccountsPage(config, null, {
        params: queryParams,
      })
    );
  }

  /**
   * @deprecated Returns a single page; use `getUserAccountsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getUserAccounts(config, queryParams = {}) {
    return await this.getUserAccountsPage(config, queryParams);
  }

  /**
   * Fetch one page of organizations.
   */
  async getOrganizationsPage(config, queryParams = {}) {
    return await this._readPage('getOrganizationsPage', queryParams, () =>
      this.client.headlessAdminUser.v1_0.getOrganizationsPage(config, null, {
        params: queryParams,
      })
    );
  }

  /**
   * @deprecated Returns a single page; use `getOrganizationsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getOrganizations(config, queryParams = {}) {
    return await this.getOrganizationsPage(config, queryParams);
  }

  /**
   * Fetch one page of user groups.
   */
  async getUserGroupsPage(config, queryParams = {}) {
    return await this._readPage('getUserGroupsPage', queryParams, () =>
      this.client.headlessAdminUser.v1_0.getUserGroupsPage(config, null, {
        params: queryParams,
      })
    );
  }

  /**
   * @deprecated Returns a single page; use `getUserGroupsPage`, or `collectAll`
   * to read every page (#200).
   */
  async getUserGroups(config, queryParams = {}) {
    return await this.getUserGroupsPage(config, queryParams);
  }

  /**
   * Fetch one page of roles.
   */
  async getRolesPage(config, queryParams = {}) {
    return await this._readPage('getRolesPage', queryParams, () =>
      this.client.headlessAdminUser.v1_0.getRolesPage(config, null, {
        params: queryParams,
      })
    );
  }

  /**
   * @deprecated Returns a single page; use `getRolesPage`, or `collectAll` to
   * read every page (#200).
   */
  async getRoles(config, queryParams = {}) {
    return await this.getRolesPage(config, queryParams);
  }

  // --- Phase 4: Business Logic ---

  /**
   * Fetch one page of forms for the specified site.
   */
  async getFormsPage(config, siteId, queryParams = {}) {
    return await this._readPage('get-forms', queryParams, () =>
      this.rest._get(
        config,
        `/o/headless-form/v1.0/sites/${siteId}/forms`,
        'get-forms',
        'Get Forms',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getFormsPage`, or `collectAll` to
   * read every page (#200).
   */
  async getForms(config, siteId, queryParams = {}) {
    return await this.getFormsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of workflow definitions.
   *
   * The root is `headless-admin-workflow`, not `workflow-admin`: no JAX-RS
   * context named `workflow-admin` is registered on DXP, so this call 404'd
   * every time it was made. Nothing caught it because no workflow spec was
   * synced, so validate-rest-paths.cjs excused the whole root - and the unit
   * test asserted the broken path back at itself. Syncing the spec (LDM #61)
   * made it visible.
   */
  async getWorkflowDefinitionsPage(config, queryParams = {}) {
    return await this._readPage('get-workflow-definitions', queryParams, () =>
      this.rest._get(
        config,
        '/o/headless-admin-workflow/v1.0/workflow-definitions',
        'get-workflow-definitions',
        'Get Workflow Definitions',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getWorkflowDefinitionsPage`, or
   * `collectAll` to read every page (#200).
   */
  async getWorkflowDefinitions(config, queryParams = {}) {
    return await this.getWorkflowDefinitionsPage(config, queryParams);
  }

  // --- Phase 5: Site Config ---

  /**
   * Fetch site settings/logo/theme config.
   *
   * @param {object} config Liferay connection config.
   * @param {string|number} siteExternalReferenceCode The site's external
   *   reference code, or its numeric id, which is resolved to one (#240).
   * @param {object} [queryParams] Passed through to Liferay.
   */
  async getSiteSettings(config, siteExternalReferenceCode, queryParams = {}) {
    const erc = await this.resolveSiteExternalReferenceCode(
      config,
      siteExternalReferenceCode
    );

    return await this.client.headlessAdminSite.v1_0.getSite(config, erc, null, {
      params: queryParams,
    });
  }

  // --- Phase 6: Advanced Layouts ---

  /**
   * Fetch one page of widget page preferences.
   */
  async getWidgetPagePreferencesPage(config, pageId, queryParams = {}) {
    return await this._readPage(
      'get-widget-page-preferences',
      queryParams,
      () =>
        this.rest._get(
          config,
          `/o/headless-admin-site/v1.0/site-pages/${pageId}/widget-page-preferences`,
          'get-widget-page-preferences',
          'Get Widget Page Preferences',
          { params: queryParams }
        )
    );
  }

  /**
   * @deprecated Returns a single page; use `getWidgetPagePreferencesPage`, or
   * `collectAll` to read every page (#200).
   */
  async getWidgetPagePreferences(config, pageId, queryParams = {}) {
    return await this.getWidgetPagePreferencesPage(config, pageId, queryParams);
  }

  /**
   * Fetch one page of segments for the specified site.
   */
  async getSegmentsPage(config, siteId, queryParams = {}) {
    return await this._readPage('getSiteSegmentsPage', queryParams, () =>
      this.client.headlessAdminUser.v1_0.getSiteSegmentsPage(
        config,
        siteId,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getSegmentsPage`, or `collectAll`
   * to read every page (#200).
   */
  async getSegments(config, siteId, queryParams = {}) {
    return await this.getSegmentsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of personalization experiences for a page.
   */
  async getPersonalizationExperiencesPage(
    config,
    siteId,
    friendlyUrlPath,
    queryParams = {}
  ) {
    return await this._readPage(
      'getSiteSitePageFriendlyUrlExperiencesPage',
      queryParams,
      () =>
        this.client.headlessDelivery.v1_0.getSiteSitePageFriendlyUrlExperiencesPage(
          config,
          siteId,
          friendlyUrlPath,
          null,
          { params: queryParams }
        )
    );
  }

  /**
   * @deprecated Returns a single page; use `getPersonalizationExperiencesPage`,
   * or `collectAll` to read every page (#200).
   */
  async getPersonalizationExperiences(
    config,
    siteId,
    friendlyUrlPath,
    queryParams = {}
  ) {
    return await this.getPersonalizationExperiencesPage(
      config,
      siteId,
      friendlyUrlPath,
      queryParams
    );
  }

  // --- Phase 7: App Data & B2B ---

  /**
   * Fetch B2B accounts.
   *
   * Unlike the readers above this one already collects every page, because
   * `AccountService` does the paging (subject to its own 5000-row ceiling).
   */
  async getAccounts(config, queryParams = {}) {
    return await this.ctx.getAccounts(config, queryParams);
  }

  /**
   * Fetch B2B account groups.
   *
   * Collects every page; see `getAccounts`.
   */
  async getAccountGroups(config, queryParams = {}) {
    return await this.ctx.getAccountGroups(config, queryParams);
  }

  /**
   * Fetch one page of blog posts for the specified site.
   */
  async getBlogPostsPage(config, siteId, queryParams = {}) {
    return await this._readPage('getSiteBlogPostingsPage', queryParams, () =>
      this.client.headlessDelivery.v1_0.getSiteBlogPostingsPage(
        config,
        siteId,
        null,
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getBlogPostsPage`, or `collectAll`
   * to read every page (#200).
   */
  async getBlogPosts(config, siteId, queryParams = {}) {
    return await this.getBlogPostsPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of knowledge base articles for the specified site.
   */
  async getKnowledgeBaseArticlesPage(config, siteId, queryParams = {}) {
    return await this._readPage(
      'getSiteKnowledgeBaseArticlesPage',
      queryParams,
      () =>
        this.client.headlessDelivery.v1_0.getSiteKnowledgeBaseArticlesPage(
          config,
          siteId,
          null,
          { params: queryParams }
        )
    );
  }

  /**
   * @deprecated Returns a single page; use `getKnowledgeBaseArticlesPage`, or
   * `collectAll` to read every page (#200).
   */
  async getKnowledgeBaseArticles(config, siteId, queryParams = {}) {
    return await this.getKnowledgeBaseArticlesPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of taxonomy vocabularies for the specified site.
   */
  async getTaxonomyVocabulariesPage(config, siteId, queryParams = {}) {
    return await this._readPage('get-taxonomy-vocabularies', queryParams, () =>
      this.rest._get(
        config,
        `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies`,
        'get-taxonomy-vocabularies',
        'Get Taxonomy Vocabularies',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getTaxonomyVocabulariesPage`, or
   * `collectAll` to read every page (#200).
   */
  async getTaxonomyVocabularies(config, siteId, queryParams = {}) {
    return await this.getTaxonomyVocabulariesPage(config, siteId, queryParams);
  }

  /**
   * Fetch one page of taxonomy categories for the specified taxonomy vocabulary.
   */
  async getTaxonomyCategoriesPage(config, vocabularyId, queryParams = {}) {
    return await this._readPage('get-taxonomy-categories', queryParams, () =>
      this.rest._get(
        config,
        `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${vocabularyId}/taxonomy-categories`,
        'get-taxonomy-categories',
        'Get Taxonomy Categories',
        { params: queryParams }
      )
    );
  }

  /**
   * @deprecated Returns a single page; use `getTaxonomyCategoriesPage`, or
   * `collectAll` to read every page (#200).
   */
  async getTaxonomyCategories(config, vocabularyId, queryParams = {}) {
    return await this.getTaxonomyCategoriesPage(
      config,
      vocabularyId,
      queryParams
    );
  }

  /**
   * Create a Web Content structure using the legacy JSONWS service.
   */
  async createWebContentStructure(config, siteId, structureData) {
    return await this.ctx.createWebContentStructure(
      config,
      siteId,
      structureData
    );
  }

  /**
   * Fetch a specific Web Content structure by ID.
   */
  async getContentStructure(config, contentStructureId, queryParams = {}) {
    return await this.ctx.getContentStructure(
      config,
      contentStructureId,
      queryParams
    );
  }

  /**
   * Fetch one page of Web Content structures for the specified site.
   */
  async getSiteContentStructuresPage(config, siteId, queryParams = {}) {
    return await this._readPage(
      'getSiteContentStructuresPage',
      queryParams,
      () => this.ctx.getSiteContentStructures(config, siteId, queryParams)
    );
  }

  /**
   * @deprecated Returns a single page; use `getSiteContentStructuresPage`, or
   * `collectAll` to read every page (#200).
   */
  async getSiteContentStructures(config, siteId, queryParams = {}) {
    return await this.getSiteContentStructuresPage(config, siteId, queryParams);
  }
}

module.exports = ExtractionFacade;
