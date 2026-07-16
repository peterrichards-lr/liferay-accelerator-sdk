
const { asItems, asCount } = require("../../utils/liferayUtils.cjs");
const { delay, fromI18n } = require('../../utils/misc.cjs');
const { PATH } = require('../../utils/liferayPaths.cjs');
class ContentService {
  constructor(liferay) {
    this.liferay = liferay;
  }

  // --- REST SDK Passthrough ---

  // --- Page Management (LPD-35443) APIs ---

  async getSitePages(config, siteExternalReferenceCode, queryParams = {}) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSiteSitePagesPage(
      config,
      siteExternalReferenceCode,
      null,
      {
        params: queryParams,
      }
    );
  }

  async createSitePage(
    config,
    siteExternalReferenceCode,
    sitePageData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.postSiteSitePage(
      config,
      siteExternalReferenceCode,
      sitePageData,
      opts
    );
  }

  async getSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSiteSitePage(
      config,
      siteExternalReferenceCode,
      sitePageExternalReferenceCode,
      null,
      opts
    );
  }

  async updateSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    sitePageData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.putSiteSitePage(
      config,
      siteExternalReferenceCode,
      sitePageExternalReferenceCode,
      sitePageData,
      opts
    );
  }

  async deleteSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.deleteSiteSitePage(
      config,
      siteExternalReferenceCode,
      sitePageExternalReferenceCode,
      null,
      opts
    );
  }

  async patchSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    sitePageData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.patchSiteSitePage(
      config,
      siteExternalReferenceCode,
      sitePageExternalReferenceCode,
      sitePageData,
      opts
    );
  }

  // --- Page Template Management APIs ---

  // --- Page Template Management APIs ---

  async getPageTemplates(config, siteExternalReferenceCode, queryParams = {}) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSitePageTemplatesPage(
      config,
      siteExternalReferenceCode,
      null,
      {
        params: queryParams,
      }
    );
  }

  async createPageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.postSitePageTemplate(
      config,
      siteExternalReferenceCode,
      pageTemplateData,
      opts
    );
  }

  async getPageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSitePageTemplate(
      config,
      siteExternalReferenceCode,
      pageTemplateExternalReferenceCode,
      null,
      opts
    );
  }

  async updatePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    pageTemplateData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.putSitePageTemplate(
      config,
      siteExternalReferenceCode,
      pageTemplateExternalReferenceCode,
      pageTemplateData,
      opts
    );
  }

  async deletePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.deleteSitePageTemplate(
      config,
      siteExternalReferenceCode,
      pageTemplateExternalReferenceCode,
      null,
      opts
    );
  }

  async patchPageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    pageTemplateData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.patchSitePageTemplate(
      config,
      siteExternalReferenceCode,
      pageTemplateExternalReferenceCode,
      pageTemplateData,
      opts
    );
  }

  // --- Page Template Set Management APIs ---

  // --- Page Template Set Management APIs ---

  async getPageTemplateSets(
    config,
    siteExternalReferenceCode,
    queryParams = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSitePageTemplateSetsPage(
      config,
      siteExternalReferenceCode,
      null,
      {
        params: queryParams,
      }
    );
  }

  async createPageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.postSitePageTemplateSet(
      config,
      siteExternalReferenceCode,
      pageTemplateSetData,
      opts
    );
  }

  async getPageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.getSitePageTemplateSet(
      config,
      siteExternalReferenceCode,
      pageTemplateSetExternalReferenceCode,
      null,
      opts
    );
  }

  async updatePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    pageTemplateSetData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.putSitePageTemplateSet(
      config,
      siteExternalReferenceCode,
      pageTemplateSetExternalReferenceCode,
      pageTemplateSetData,
      opts
    );
  }

  async deletePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.deleteSitePageTemplateSet(
      config,
      siteExternalReferenceCode,
      pageTemplateSetExternalReferenceCode,
      null,
      opts
    );
  }

  async patchPageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    pageTemplateSetData,
    opts = {}
  ) {
    return await this.liferay.client.headlessAdminSite.v1_0.patchSitePageTemplateSet(
      config,
      siteExternalReferenceCode,
      pageTemplateSetExternalReferenceCode,
      pageTemplateSetData,
      opts
    );
  }

  async createWebContentStructure(config, siteId, structureData) {
    return await this.liferay.rest.createWebContentStructure(
      config,
      siteId,
      structureData
    );
  }

  async getContentStructure(config, contentStructureId, queryParams = {}) {
    return await this.liferay.client.headlessDelivery.v1_0.getContentStructure(
      config,
      contentStructureId,
      null,
      {
        params: queryParams,
      }
    );
  }

  async getSiteContentStructures(config, siteId, queryParams = {}) {
    return await this.liferay.client.headlessDelivery.v1_0.getSiteContentStructuresPage(
      config,
      siteId,
      null,
      {
        params: queryParams,
      }
    );
  }
}
module.exports = ContentService;
