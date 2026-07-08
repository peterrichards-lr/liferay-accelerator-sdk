/**
 * HeadlessAdminSiteClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminSiteClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getSiteDisplayPageTemplateFolder
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplateFolder(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}`,
      data,
      op: 'getSiteDisplayPageTemplateFolder',
      friendly: 'Generated method getSiteDisplayPageTemplateFolder failed',
      ...opts,
    });
  }

  /**
   * putSiteDisplayPageTemplateFolder
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteDisplayPageTemplateFolder(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}`,
      data,
      op: 'putSiteDisplayPageTemplateFolder',
      friendly: 'Generated method putSiteDisplayPageTemplateFolder failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDisplayPageTemplateFolder
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteDisplayPageTemplateFolder(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}`,
      data,
      op: 'deleteSiteDisplayPageTemplateFolder',
      friendly: 'Generated method deleteSiteDisplayPageTemplateFolder failed',
      ...opts,
    });
  }

  /**
   * patchSiteDisplayPageTemplateFolder
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteDisplayPageTemplateFolder(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}`,
      data,
      op: 'patchSiteDisplayPageTemplateFolder',
      friendly: 'Generated method patchSiteDisplayPageTemplateFolder failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplateFolderPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplateFolderPermissionsPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteDisplayPageTemplateFolderPermissionsPage',
      friendly:
        'Generated method getSiteDisplayPageTemplateFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteDisplayPageTemplateFolderPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteDisplayPageTemplateFolderPermissionsPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteDisplayPageTemplateFolderPermissionsPage',
      friendly:
        'Generated method putSiteDisplayPageTemplateFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplateFoldersPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplateFoldersPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders`,
      data,
      op: 'getSiteDisplayPageTemplateFoldersPage',
      friendly: 'Generated method getSiteDisplayPageTemplateFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplateFolder
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplateFolder(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders`,
      data,
      op: 'postSiteDisplayPageTemplateFolder',
      friendly: 'Generated method postSiteDisplayPageTemplateFolder failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplateFolderBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplateFolderBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/batch`,
      data,
      op: 'postSiteDisplayPageTemplateFolderBatch',
      friendly:
        'Generated method postSiteDisplayPageTemplateFolderBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplateFoldersPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplateFoldersPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/export-batch`,
      data,
      op: 'postSiteDisplayPageTemplateFoldersPageExportBatch',
      friendly:
        'Generated method postSiteDisplayPageTemplateFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}`,
      data,
      op: 'getSiteDisplayPageTemplate',
      friendly: 'Generated method getSiteDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * putSiteDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}`,
      data,
      op: 'putSiteDisplayPageTemplate',
      friendly: 'Generated method putSiteDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}`,
      data,
      op: 'deleteSiteDisplayPageTemplate',
      friendly: 'Generated method deleteSiteDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * patchSiteDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}`,
      data,
      op: 'patchSiteDisplayPageTemplate',
      friendly: 'Generated method patchSiteDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplateFolderDisplayPageTemplatesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplateFolderDisplayPageTemplatesPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}/display-page-templates`,
      data,
      op: 'getSiteDisplayPageTemplateFolderDisplayPageTemplatesPage',
      friendly:
        'Generated method getSiteDisplayPageTemplateFolderDisplayPageTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplateFolderDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplateFolderDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    displayPageTemplateFolderExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-template-folders/${displayPageTemplateFolderExternalReferenceCode}/display-page-templates`,
      data,
      op: 'postSiteDisplayPageTemplateFolderDisplayPageTemplate',
      friendly:
        'Generated method postSiteDisplayPageTemplateFolderDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplatePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplatePermissionsPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteDisplayPageTemplatePermissionsPage',
      friendly:
        'Generated method getSiteDisplayPageTemplatePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteDisplayPageTemplatePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteDisplayPageTemplatePermissionsPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteDisplayPageTemplatePermissionsPage',
      friendly:
        'Generated method putSiteDisplayPageTemplatePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplatesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplatesPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates`,
      data,
      op: 'getSiteDisplayPageTemplatesPage',
      friendly: 'Generated method getSiteDisplayPageTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplate(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates`,
      data,
      op: 'postSiteDisplayPageTemplate',
      friendly: 'Generated method postSiteDisplayPageTemplate failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplateBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplateBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/batch`,
      data,
      op: 'postSiteDisplayPageTemplateBatch',
      friendly: 'Generated method postSiteDisplayPageTemplateBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplatePageSpecificationsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplatePageSpecificationsPage(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}/page-specifications`,
      data,
      op: 'getSiteDisplayPageTemplatePageSpecificationsPage',
      friendly:
        'Generated method getSiteDisplayPageTemplatePageSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplatePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplatePageSpecification(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}/page-specifications`,
      data,
      op: 'postSiteDisplayPageTemplatePageSpecification',
      friendly:
        'Generated method postSiteDisplayPageTemplatePageSpecification failed',
      ...opts,
    });
  }

  /**
   * postSiteDisplayPageTemplatesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteDisplayPageTemplatesPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/export-batch`,
      data,
      op: 'postSiteDisplayPageTemplatesPageExportBatch',
      friendly:
        'Generated method postSiteDisplayPageTemplatesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDisplayPageTemplateFriendlyUrlHistory
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteDisplayPageTemplateFriendlyUrlHistory(
    config,
    siteExternalReferenceCode,
    displayPageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/display-page-templates/${displayPageTemplateExternalReferenceCode}/friendly-url-history`,
      data,
      op: 'getSiteDisplayPageTemplateFriendlyUrlHistory',
      friendly:
        'Generated method getSiteDisplayPageTemplateFriendlyUrlHistory failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageFriendlyUrlHistory
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePageFriendlyUrlHistory(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/friendly-url-history`,
      data,
      op: 'getSiteSitePageFriendlyUrlHistory',
      friendly: 'Generated method getSiteSitePageFriendlyUrlHistory failed',
      ...opts,
    });
  }

  /**
   * getSiteUtilityPageFriendlyUrlHistory
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteUtilityPageFriendlyUrlHistory(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}/friendly-url-history`,
      data,
      op: 'getSiteUtilityPageFriendlyUrlHistory',
      friendly: 'Generated method getSiteUtilityPageFriendlyUrlHistory failed',
      ...opts,
    });
  }

  /**
   * getSiteMasterPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteMasterPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}`,
      data,
      op: 'getSiteMasterPage',
      friendly: 'Generated method getSiteMasterPage failed',
      ...opts,
    });
  }

  /**
   * putSiteMasterPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteMasterPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}`,
      data,
      op: 'putSiteMasterPage',
      friendly: 'Generated method putSiteMasterPage failed',
      ...opts,
    });
  }

  /**
   * deleteSiteMasterPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteMasterPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}`,
      data,
      op: 'deleteSiteMasterPage',
      friendly: 'Generated method deleteSiteMasterPage failed',
      ...opts,
    });
  }

  /**
   * patchSiteMasterPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteMasterPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}`,
      data,
      op: 'patchSiteMasterPage',
      friendly: 'Generated method patchSiteMasterPage failed',
      ...opts,
    });
  }

  /**
   * getSiteMasterPagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteMasterPagePermissionsPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteMasterPagePermissionsPage',
      friendly: 'Generated method getSiteMasterPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteMasterPagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteMasterPagePermissionsPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteMasterPagePermissionsPage',
      friendly: 'Generated method putSiteMasterPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteMasterPagesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteMasterPagesPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages`,
      data,
      op: 'getSiteMasterPagesPage',
      friendly: 'Generated method getSiteMasterPagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteMasterPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteMasterPage(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages`,
      data,
      op: 'postSiteMasterPage',
      friendly: 'Generated method postSiteMasterPage failed',
      ...opts,
    });
  }

  /**
   * postSiteMasterPageBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteMasterPageBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/batch`,
      data,
      op: 'postSiteMasterPageBatch',
      friendly: 'Generated method postSiteMasterPageBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMasterPagePageSpecificationsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteMasterPagePageSpecificationsPage(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}/page-specifications`,
      data,
      op: 'getSiteMasterPagePageSpecificationsPage',
      friendly:
        'Generated method getSiteMasterPagePageSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteMasterPagePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteMasterPagePageSpecification(
    config,
    siteExternalReferenceCode,
    masterPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/${masterPageExternalReferenceCode}/page-specifications`,
      data,
      op: 'postSiteMasterPagePageSpecification',
      friendly: 'Generated method postSiteMasterPagePageSpecification failed',
      ...opts,
    });
  }

  /**
   * postSiteMasterPagesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteMasterPagesPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/master-pages/export-batch`,
      data,
      op: 'postSiteMasterPagesPageExportBatch',
      friendly: 'Generated method postSiteMasterPagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenu
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenu(
    config,
    siteExternalReferenceCode,
    navigationMenuExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/${navigationMenuExternalReferenceCode}`,
      data,
      op: 'getSiteNavigationMenu',
      friendly: 'Generated method getSiteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * putSiteNavigationMenu
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteNavigationMenu(
    config,
    siteExternalReferenceCode,
    navigationMenuExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/${navigationMenuExternalReferenceCode}`,
      data,
      op: 'putSiteNavigationMenu',
      friendly: 'Generated method putSiteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * deleteSiteNavigationMenu
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteNavigationMenu(
    config,
    siteExternalReferenceCode,
    navigationMenuExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/${navigationMenuExternalReferenceCode}`,
      data,
      op: 'deleteSiteNavigationMenu',
      friendly: 'Generated method deleteSiteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenuPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenuPermissionsPage(
    config,
    siteExternalReferenceCode,
    navigationMenuExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/${navigationMenuExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteNavigationMenuPermissionsPage',
      friendly: 'Generated method getSiteNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteNavigationMenuPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteNavigationMenuPermissionsPage(
    config,
    siteExternalReferenceCode,
    navigationMenuExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/${navigationMenuExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteNavigationMenuPermissionsPage',
      friendly: 'Generated method putSiteNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenusPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenusPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus`,
      data,
      op: 'getSiteNavigationMenusPage',
      friendly: 'Generated method getSiteNavigationMenusPage failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenu
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenu(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus`,
      data,
      op: 'postSiteNavigationMenu',
      friendly: 'Generated method postSiteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenuBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenuBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/batch`,
      data,
      op: 'postSiteNavigationMenuBatch',
      friendly: 'Generated method postSiteNavigationMenuBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenusPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenusPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/navigation-menus/export-batch`,
      data,
      op: 'postSiteNavigationMenusPageExportBatch',
      friendly:
        'Generated method postSiteNavigationMenusPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getSitePageSpecificationPageExperiencePageElement
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageSpecificationPageExperiencePageElement(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    pageElementExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements/${pageElementExternalReferenceCode}`,
      data,
      op: 'getSitePageSpecificationPageExperiencePageElement',
      friendly:
        'Generated method getSitePageSpecificationPageExperiencePageElement failed',
      ...opts,
    });
  }

  /**
   * putSitePageSpecificationPageExperiencePageElement
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageSpecificationPageExperiencePageElement(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    pageElementExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements/${pageElementExternalReferenceCode}`,
      data,
      op: 'putSitePageSpecificationPageExperiencePageElement',
      friendly:
        'Generated method putSitePageSpecificationPageExperiencePageElement failed',
      ...opts,
    });
  }

  /**
   * deleteSitePageSpecificationPageExperiencePageElement
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSitePageSpecificationPageExperiencePageElement(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    pageElementExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements/${pageElementExternalReferenceCode}`,
      data,
      op: 'deleteSitePageSpecificationPageExperiencePageElement',
      friendly:
        'Generated method deleteSitePageSpecificationPageExperiencePageElement failed',
      ...opts,
    });
  }

  /**
   * patchSitePageSpecificationPageExperiencePageElement
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSitePageSpecificationPageExperiencePageElement(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    pageElementExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements/${pageElementExternalReferenceCode}`,
      data,
      op: 'patchSitePageSpecificationPageExperiencePageElement',
      friendly:
        'Generated method patchSitePageSpecificationPageExperiencePageElement failed',
      ...opts,
    });
  }

  /**
   * getSitePageSpecificationPageExperiencePageElementPageElementsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageSpecificationPageExperiencePageElementPageElementsPage(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    pageElementExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements/${pageElementExternalReferenceCode}/page-elements`,
      data,
      op: 'getSitePageSpecificationPageExperiencePageElementPageElementsPage',
      friendly:
        'Generated method getSitePageSpecificationPageExperiencePageElementPageElementsPage failed',
      ...opts,
    });
  }

  /**
   * getSitePageSpecificationPageExperiencePageElementsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageSpecificationPageExperiencePageElementsPage(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements`,
      data,
      op: 'getSitePageSpecificationPageExperiencePageElementsPage',
      friendly:
        'Generated method getSitePageSpecificationPageExperiencePageElementsPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageSpecificationPageExperiencePageElement
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageSpecificationPageExperiencePageElement(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}/page-elements`,
      data,
      op: 'postSitePageSpecificationPageExperiencePageElement',
      friendly:
        'Generated method postSitePageSpecificationPageExperiencePageElement failed',
      ...opts,
    });
  }

  /**
   * getSitePageExperience
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageExperience(
    config,
    siteExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}`,
      data,
      op: 'getSitePageExperience',
      friendly: 'Generated method getSitePageExperience failed',
      ...opts,
    });
  }

  /**
   * putSitePageExperience
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageExperience(
    config,
    siteExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}`,
      data,
      op: 'putSitePageExperience',
      friendly: 'Generated method putSitePageExperience failed',
      ...opts,
    });
  }

  /**
   * deleteSitePageExperience
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSitePageExperience(
    config,
    siteExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}`,
      data,
      op: 'deleteSitePageExperience',
      friendly: 'Generated method deleteSitePageExperience failed',
      ...opts,
    });
  }

  /**
   * patchSitePageExperience
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSitePageExperience(
    config,
    siteExternalReferenceCode,
    pageExperienceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-experiences/${pageExperienceExternalReferenceCode}`,
      data,
      op: 'patchSitePageExperience',
      friendly: 'Generated method patchSitePageExperience failed',
      ...opts,
    });
  }

  /**
   * getSitePageSpecificationPageExperiencesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageSpecificationPageExperiencesPage(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences`,
      data,
      op: 'getSitePageSpecificationPageExperiencesPage',
      friendly:
        'Generated method getSitePageSpecificationPageExperiencesPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageSpecificationPageExperience
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageSpecificationPageExperience(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/page-experiences`,
      data,
      op: 'postSitePageSpecificationPageExperience',
      friendly:
        'Generated method postSitePageSpecificationPageExperience failed',
      ...opts,
    });
  }

  /**
   * getSitePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageSpecification(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}`,
      data,
      op: 'getSitePageSpecification',
      friendly: 'Generated method getSitePageSpecification failed',
      ...opts,
    });
  }

  /**
   * putSitePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageSpecification(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}`,
      data,
      op: 'putSitePageSpecification',
      friendly: 'Generated method putSitePageSpecification failed',
      ...opts,
    });
  }

  /**
   * deleteSitePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSitePageSpecification(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}`,
      data,
      op: 'deleteSitePageSpecification',
      friendly: 'Generated method deleteSitePageSpecification failed',
      ...opts,
    });
  }

  /**
   * patchSitePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSitePageSpecification(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}`,
      data,
      op: 'patchSitePageSpecification',
      friendly: 'Generated method patchSitePageSpecification failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplatePageSpecificationsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplatePageSpecificationsPage(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}/page-specifications`,
      data,
      op: 'getSitePageTemplatePageSpecificationsPage',
      friendly:
        'Generated method getSitePageTemplatePageSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplatePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplatePageSpecification(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}/page-specifications`,
      data,
      op: 'postSitePageTemplatePageSpecification',
      friendly: 'Generated method postSitePageTemplatePageSpecification failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePagePageSpecificationsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePagePageSpecificationsPage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/page-specifications`,
      data,
      op: 'getSiteSitePagePageSpecificationsPage',
      friendly: 'Generated method getSiteSitePagePageSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePagePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSitePagePageSpecification(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/page-specifications`,
      data,
      op: 'postSiteSitePagePageSpecification',
      friendly: 'Generated method postSiteSitePagePageSpecification failed',
      ...opts,
    });
  }

  /**
   * getSiteUtilityPagePageSpecificationsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteUtilityPagePageSpecificationsPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}/page-specifications`,
      data,
      op: 'getSiteUtilityPagePageSpecificationsPage',
      friendly:
        'Generated method getSiteUtilityPagePageSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteUtilityPagePageSpecification
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteUtilityPagePageSpecification(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}/page-specifications`,
      data,
      op: 'postSiteUtilityPagePageSpecification',
      friendly: 'Generated method postSiteUtilityPagePageSpecification failed',
      ...opts,
    });
  }

  /**
   * postSitePageSpecificationPublish
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageSpecificationPublish(
    config,
    siteExternalReferenceCode,
    pageSpecificationExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-specifications/${pageSpecificationExternalReferenceCode}/publish`,
      data,
      op: 'postSitePageSpecificationPublish',
      friendly: 'Generated method postSitePageSpecificationPublish failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}`,
      data,
      op: 'getSitePageTemplate',
      friendly: 'Generated method getSitePageTemplate failed',
      ...opts,
    });
  }

  /**
   * putSitePageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}`,
      data,
      op: 'putSitePageTemplate',
      friendly: 'Generated method putSitePageTemplate failed',
      ...opts,
    });
  }

  /**
   * deleteSitePageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSitePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}`,
      data,
      op: 'deleteSitePageTemplate',
      friendly: 'Generated method deleteSitePageTemplate failed',
      ...opts,
    });
  }

  /**
   * patchSitePageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSitePageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}`,
      data,
      op: 'patchSitePageTemplate',
      friendly: 'Generated method patchSitePageTemplate failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplatePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplatePermissionsPage(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}/permissions`,
      data,
      op: 'getSitePageTemplatePermissionsPage',
      friendly: 'Generated method getSitePageTemplatePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSitePageTemplatePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageTemplatePermissionsPage(
    config,
    siteExternalReferenceCode,
    pageTemplateExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/${pageTemplateExternalReferenceCode}/permissions`,
      data,
      op: 'putSitePageTemplatePermissionsPage',
      friendly: 'Generated method putSitePageTemplatePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplateSetPageTemplatesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplateSetPageTemplatesPage(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}/page-templates`,
      data,
      op: 'getSitePageTemplateSetPageTemplatesPage',
      friendly:
        'Generated method getSitePageTemplateSetPageTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplateSetPageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplateSetPageTemplate(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}/page-templates`,
      data,
      op: 'postSitePageTemplateSetPageTemplate',
      friendly: 'Generated method postSitePageTemplateSetPageTemplate failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplatesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplatesPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates`,
      data,
      op: 'getSitePageTemplatesPage',
      friendly: 'Generated method getSitePageTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplate
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplate(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates`,
      data,
      op: 'postSitePageTemplate',
      friendly: 'Generated method postSitePageTemplate failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplateBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplateBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/batch`,
      data,
      op: 'postSitePageTemplateBatch',
      friendly: 'Generated method postSitePageTemplateBatch failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplatesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplatesPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-templates/export-batch`,
      data,
      op: 'postSitePageTemplatesPageExportBatch',
      friendly: 'Generated method postSitePageTemplatesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplateSet
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}`,
      data,
      op: 'getSitePageTemplateSet',
      friendly: 'Generated method getSitePageTemplateSet failed',
      ...opts,
    });
  }

  /**
   * putSitePageTemplateSet
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}`,
      data,
      op: 'putSitePageTemplateSet',
      friendly: 'Generated method putSitePageTemplateSet failed',
      ...opts,
    });
  }

  /**
   * deleteSitePageTemplateSet
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSitePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}`,
      data,
      op: 'deleteSitePageTemplateSet',
      friendly: 'Generated method deleteSitePageTemplateSet failed',
      ...opts,
    });
  }

  /**
   * patchSitePageTemplateSet
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSitePageTemplateSet(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}`,
      data,
      op: 'patchSitePageTemplateSet',
      friendly: 'Generated method patchSitePageTemplateSet failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplateSetPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplateSetPermissionsPage(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}/permissions`,
      data,
      op: 'getSitePageTemplateSetPermissionsPage',
      friendly: 'Generated method getSitePageTemplateSetPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSitePageTemplateSetPermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePageTemplateSetPermissionsPage(
    config,
    siteExternalReferenceCode,
    pageTemplateSetExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/${pageTemplateSetExternalReferenceCode}/permissions`,
      data,
      op: 'putSitePageTemplateSetPermissionsPage',
      friendly: 'Generated method putSitePageTemplateSetPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSitePageTemplateSetsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePageTemplateSetsPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets`,
      data,
      op: 'getSitePageTemplateSetsPage',
      friendly: 'Generated method getSitePageTemplateSetsPage failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplateSet
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplateSet(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets`,
      data,
      op: 'postSitePageTemplateSet',
      friendly: 'Generated method postSitePageTemplateSet failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplateSetBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplateSetBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/batch`,
      data,
      op: 'postSitePageTemplateSetBatch',
      friendly: 'Generated method postSitePageTemplateSetBatch failed',
      ...opts,
    });
  }

  /**
   * postSitePageTemplateSetsPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitePageTemplateSetsPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/page-template-sets/export-batch`,
      data,
      op: 'postSitePageTemplateSetsPageExportBatch',
      friendly:
        'Generated method postSitePageTemplateSetsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}`,
      data,
      op: 'getSiteSitePage',
      friendly: 'Generated method getSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * putSiteSitePage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}`,
      data,
      op: 'putSiteSitePage',
      friendly: 'Generated method putSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * deleteSiteSitePage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}`,
      data,
      op: 'deleteSiteSitePage',
      friendly: 'Generated method deleteSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * patchSiteSitePage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteSitePage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}`,
      data,
      op: 'patchSiteSitePage',
      friendly: 'Generated method patchSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePagePermissionsPage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteSitePagePermissionsPage',
      friendly: 'Generated method getSiteSitePagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteSitePagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteSitePagePermissionsPage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteSitePagePermissionsPage',
      friendly: 'Generated method putSiteSitePagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePagesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePagesPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages`,
      data,
      op: 'getSiteSitePagesPage',
      friendly: 'Generated method getSiteSitePagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSitePage(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages`,
      data,
      op: 'postSiteSitePage',
      friendly: 'Generated method postSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePageBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSitePageBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/batch`,
      data,
      op: 'postSiteSitePageBatch',
      friendly: 'Generated method postSiteSitePageBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePagesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSitePagesPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/export-batch`,
      data,
      op: 'postSiteSitePagesPageExportBatch',
      friendly: 'Generated method postSiteSitePagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSite
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSite(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}`,
      data,
      op: 'getSite',
      friendly: 'Generated method getSite failed',
      ...opts,
    });
  }

  /**
   * putSite
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSite(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}`,
      data,
      op: 'putSite',
      friendly: 'Generated method putSite failed',
      ...opts,
    });
  }

  /**
   * deleteSite
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSite(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}`,
      data,
      op: 'deleteSite',
      friendly: 'Generated method deleteSite failed',
      ...opts,
    });
  }

  /**
   * putSiteBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/batch`,
      data,
      op: 'putSiteBatch',
      friendly: 'Generated method putSiteBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/batch`,
      data,
      op: 'postSiteBatch',
      friendly: 'Generated method postSiteBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/batch`,
      data,
      op: 'deleteSiteBatch',
      friendly: 'Generated method deleteSiteBatch failed',
      ...opts,
    });
  }

  /**
   * getSitePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitePermissionsPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/permissions`,
      data,
      op: 'getSitePermissionsPage',
      friendly: 'Generated method getSitePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSitePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSitePermissionsPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/permissions`,
      data,
      op: 'putSitePermissionsPage',
      friendly: 'Generated method putSitePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteSiteInitializer
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSiteInitializer(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-initializer`,
      data,
      op: 'getSiteSiteInitializer',
      friendly: 'Generated method getSiteSiteInitializer failed',
      ...opts,
    });
  }

  /**
   * putSiteSiteInitializer
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteSiteInitializer(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-initializer`,
      data,
      op: 'putSiteSiteInitializer',
      friendly: 'Generated method putSiteSiteInitializer failed',
      ...opts,
    });
  }

  /**
   * getSitesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSitesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites`,
      data,
      op: 'getSitesPage',
      friendly: 'Generated method getSitesPage failed',
      ...opts,
    });
  }

  /**
   * postSite
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSite(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites`,
      data,
      op: 'postSite',
      friendly: 'Generated method postSite failed',
      ...opts,
    });
  }

  /**
   * postSiteSiteInitializer
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSiteInitializer(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/site-initializer`,
      data,
      op: 'postSiteSiteInitializer',
      friendly: 'Generated method postSiteSiteInitializer failed',
      ...opts,
    });
  }

  /**
   * postSitesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSitesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/export-batch`,
      data,
      op: 'postSitesPageExportBatch',
      friendly: 'Generated method postSitesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteStyleBook
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteStyleBook(
    config,
    siteExternalReferenceCode,
    styleBookExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/${styleBookExternalReferenceCode}`,
      data,
      op: 'getSiteStyleBook',
      friendly: 'Generated method getSiteStyleBook failed',
      ...opts,
    });
  }

  /**
   * putSiteStyleBook
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteStyleBook(
    config,
    siteExternalReferenceCode,
    styleBookExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/${styleBookExternalReferenceCode}`,
      data,
      op: 'putSiteStyleBook',
      friendly: 'Generated method putSiteStyleBook failed',
      ...opts,
    });
  }

  /**
   * deleteSiteStyleBook
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteStyleBook(
    config,
    siteExternalReferenceCode,
    styleBookExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/${styleBookExternalReferenceCode}`,
      data,
      op: 'deleteSiteStyleBook',
      friendly: 'Generated method deleteSiteStyleBook failed',
      ...opts,
    });
  }

  /**
   * patchSiteStyleBook
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteStyleBook(
    config,
    siteExternalReferenceCode,
    styleBookExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/${styleBookExternalReferenceCode}`,
      data,
      op: 'patchSiteStyleBook',
      friendly: 'Generated method patchSiteStyleBook failed',
      ...opts,
    });
  }

  /**
   * getSiteStyleBooksPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteStyleBooksPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books`,
      data,
      op: 'getSiteStyleBooksPage',
      friendly: 'Generated method getSiteStyleBooksPage failed',
      ...opts,
    });
  }

  /**
   * postSiteStyleBook
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteStyleBook(config, siteExternalReferenceCode, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books`,
      data,
      op: 'postSiteStyleBook',
      friendly: 'Generated method postSiteStyleBook failed',
      ...opts,
    });
  }

  /**
   * postSiteStyleBookBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteStyleBookBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/batch`,
      data,
      op: 'postSiteStyleBookBatch',
      friendly: 'Generated method postSiteStyleBookBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteStyleBooksPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteStyleBooksPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/style-books/export-batch`,
      data,
      op: 'postSiteStyleBooksPageExportBatch',
      friendly: 'Generated method postSiteStyleBooksPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteUtilityPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteUtilityPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}`,
      data,
      op: 'getSiteUtilityPage',
      friendly: 'Generated method getSiteUtilityPage failed',
      ...opts,
    });
  }

  /**
   * putSiteUtilityPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteUtilityPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}`,
      data,
      op: 'putSiteUtilityPage',
      friendly: 'Generated method putSiteUtilityPage failed',
      ...opts,
    });
  }

  /**
   * deleteSiteUtilityPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteUtilityPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}`,
      data,
      op: 'deleteSiteUtilityPage',
      friendly: 'Generated method deleteSiteUtilityPage failed',
      ...opts,
    });
  }

  /**
   * patchSiteUtilityPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteUtilityPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}`,
      data,
      op: 'patchSiteUtilityPage',
      friendly: 'Generated method patchSiteUtilityPage failed',
      ...opts,
    });
  }

  /**
   * getSiteUtilityPagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteUtilityPagePermissionsPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}/permissions`,
      data,
      op: 'getSiteUtilityPagePermissionsPage',
      friendly: 'Generated method getSiteUtilityPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteUtilityPagePermissionsPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteUtilityPagePermissionsPage(
    config,
    siteExternalReferenceCode,
    utilityPageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/${utilityPageExternalReferenceCode}/permissions`,
      data,
      op: 'putSiteUtilityPagePermissionsPage',
      friendly: 'Generated method putSiteUtilityPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteUtilityPagesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteUtilityPagesPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages`,
      data,
      op: 'getSiteUtilityPagesPage',
      friendly: 'Generated method getSiteUtilityPagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteUtilityPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteUtilityPage(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages`,
      data,
      op: 'postSiteUtilityPage',
      friendly: 'Generated method postSiteUtilityPage failed',
      ...opts,
    });
  }

  /**
   * postSiteUtilityPageBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteUtilityPageBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/batch`,
      data,
      op: 'postSiteUtilityPageBatch',
      friendly: 'Generated method postSiteUtilityPageBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteUtilityPagesPageExportBatch
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteUtilityPagesPageExportBatch(
    config,
    siteExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/utility-pages/export-batch`,
      data,
      op: 'postSiteUtilityPagesPageExportBatch',
      friendly: 'Generated method postSiteUtilityPagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageWidgetInstance
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePageWidgetInstance(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    widgetInstanceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances/${widgetInstanceExternalReferenceCode}`,
      data,
      op: 'getSiteSitePageWidgetInstance',
      friendly: 'Generated method getSiteSitePageWidgetInstance failed',
      ...opts,
    });
  }

  /**
   * putSiteSitePageWidgetInstance
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async putSiteSitePageWidgetInstance(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    widgetInstanceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances/${widgetInstanceExternalReferenceCode}`,
      data,
      op: 'putSiteSitePageWidgetInstance',
      friendly: 'Generated method putSiteSitePageWidgetInstance failed',
      ...opts,
    });
  }

  /**
   * deleteSiteSitePageWidgetInstance
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async deleteSiteSitePageWidgetInstance(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    widgetInstanceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances/${widgetInstanceExternalReferenceCode}`,
      data,
      op: 'deleteSiteSitePageWidgetInstance',
      friendly: 'Generated method deleteSiteSitePageWidgetInstance failed',
      ...opts,
    });
  }

  /**
   * patchSiteSitePageWidgetInstance
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async patchSiteSitePageWidgetInstance(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    widgetInstanceExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances/${widgetInstanceExternalReferenceCode}`,
      data,
      op: 'patchSiteSitePageWidgetInstance',
      friendly: 'Generated method patchSiteSitePageWidgetInstance failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageWidgetInstancesPage
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async getSiteSitePageWidgetInstancesPage(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances`,
      data,
      op: 'getSiteSitePageWidgetInstancesPage',
      friendly: 'Generated method getSiteSitePageWidgetInstancesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePageWidgetInstance
   * API: headless-admin-site-v1.0 | Version: v1.0
   */
  async postSiteSitePageWidgetInstance(
    config,
    siteExternalReferenceCode,
    sitePageExternalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-site/v1.0/sites/${siteExternalReferenceCode}/site-pages/${sitePageExternalReferenceCode}/widget-instances`,
      data,
      op: 'postSiteSitePageWidgetInstance',
      friendly: 'Generated method postSiteSitePageWidgetInstance failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminSiteClient_v1_0;
