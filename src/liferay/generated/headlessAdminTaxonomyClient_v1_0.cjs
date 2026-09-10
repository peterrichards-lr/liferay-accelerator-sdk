/**
 * HeadlessAdminTaxonomyClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminTaxonomyClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getAssetLibraryKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryKeywordByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryKeywordByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putAssetLibraryKeywordByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryKeywordByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryKeywordByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryKeywordByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getKeyword(config, keywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${keywordId}`,
      data,
      op: 'getKeyword',
      friendly: 'Generated method getKeyword failed',
      ...opts,
    });
  }

  /**
   * putKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putKeyword(config, keywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${keywordId}`,
      data,
      op: 'putKeyword',
      friendly: 'Generated method putKeyword failed',
      ...opts,
    });
  }

  /**
   * deleteKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteKeyword(config, keywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${keywordId}`,
      data,
      op: 'deleteKeyword',
      friendly: 'Generated method deleteKeyword failed',
      ...opts,
    });
  }

  /**
   * putKeywordBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putKeywordBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/batch`,
      data,
      op: 'putKeywordBatch',
      friendly: 'Generated method putKeywordBatch failed',
      ...opts,
    });
  }

  /**
   * deleteKeywordBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteKeywordBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/batch`,
      data,
      op: 'deleteKeywordBatch',
      friendly: 'Generated method deleteKeywordBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteKeywordByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteKeywordByExternalReferenceCode',
      friendly: 'Generated method getSiteKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putSiteKeywordByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteKeywordByExternalReferenceCode',
      friendly: 'Generated method putSiteKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteSiteKeywordByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteKeywordByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchSiteKeywordByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async patchSiteKeywordByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchSiteKeywordByExternalReferenceCode',
      friendly:
        'Generated method patchSiteKeywordByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryKeywordPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryKeywordPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/permissions`,
      data,
      op: 'getAssetLibraryKeywordPermissionsPage',
      friendly: 'Generated method getAssetLibraryKeywordPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryKeywordPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putAssetLibraryKeywordPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/permissions`,
      data,
      op: 'putAssetLibraryKeywordPermissionsPage',
      friendly: 'Generated method putAssetLibraryKeywordPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryKeywordsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryKeywordsPage(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords`,
      data,
      op: 'getAssetLibraryKeywordsPage',
      friendly: 'Generated method getAssetLibraryKeywordsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryKeyword(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords`,
      data,
      op: 'postAssetLibraryKeyword',
      friendly: 'Generated method postAssetLibraryKeyword failed',
      ...opts,
    });
  }

  /**
   * getKeywordsRankedPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getKeywordsRankedPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/ranked`,
      data,
      op: 'getKeywordsRankedPage',
      friendly: 'Generated method getKeywordsRankedPage failed',
      ...opts,
    });
  }

  /**
   * getSiteKeywordPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteKeywordPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/permissions`,
      data,
      op: 'getSiteKeywordPermissionsPage',
      friendly: 'Generated method getSiteKeywordPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteKeywordPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putSiteKeywordPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/permissions`,
      data,
      op: 'putSiteKeywordPermissionsPage',
      friendly: 'Generated method putSiteKeywordPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteKeywordsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteKeywordsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords`,
      data,
      op: 'getSiteKeywordsPage',
      friendly: 'Generated method getSiteKeywordsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteKeyword(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords`,
      data,
      op: 'postSiteKeyword',
      friendly: 'Generated method postSiteKeyword failed',
      ...opts,
    });
  }

  /**
   * patchSiteKeyword
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async patchSiteKeyword(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords`,
      data,
      op: 'patchSiteKeyword',
      friendly: 'Generated method patchSiteKeyword failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryKeywordBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryKeywordBatch(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/batch`,
      data,
      op: 'postAssetLibraryKeywordBatch',
      friendly: 'Generated method postAssetLibraryKeywordBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryKeywordsPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryKeywordsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/keywords/export-batch`,
      data,
      op: 'postAssetLibraryKeywordsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryKeywordsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteKeywordBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteKeywordBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/batch`,
      data,
      op: 'postSiteKeywordBatch',
      friendly: 'Generated method postSiteKeywordBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteKeywordsPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteKeywordsPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/keywords/export-batch`,
      data,
      op: 'postSiteKeywordsPageExportBatch',
      friendly: 'Generated method postSiteKeywordsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putKeywordMerge
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putKeywordMerge(config, toKeywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${toKeywordId}/merge`,
      data,
      op: 'putKeywordMerge',
      friendly: 'Generated method putKeywordMerge failed',
      ...opts,
    });
  }

  /**
   * putKeywordSubscribe
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putKeywordSubscribe(config, keywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${keywordId}/subscribe`,
      data,
      op: 'putKeywordSubscribe',
      friendly: 'Generated method putKeywordSubscribe failed',
      ...opts,
    });
  }

  /**
   * putKeywordUnsubscribe
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putKeywordUnsubscribe(config, keywordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/keywords/${keywordId}/unsubscribe`,
      data,
      op: 'putKeywordUnsubscribe',
      friendly: 'Generated method putKeywordUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryTaxonomyCategoryByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putAssetLibraryTaxonomyCategoryByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryTaxonomyCategoryByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteTaxonomyCategoryByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method getSiteTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putSiteTaxonomyCategoryByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method putSiteTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteSiteTaxonomyCategoryByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyCategory(config, taxonomyCategoryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}`,
      data,
      op: 'getTaxonomyCategory',
      friendly: 'Generated method getTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyCategory(config, taxonomyCategoryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}`,
      data,
      op: 'putTaxonomyCategory',
      friendly: 'Generated method putTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * deleteTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteTaxonomyCategory(config, taxonomyCategoryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}`,
      data,
      op: 'deleteTaxonomyCategory',
      friendly: 'Generated method deleteTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * patchTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async patchTaxonomyCategory(config, taxonomyCategoryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}`,
      data,
      op: 'patchTaxonomyCategory',
      friendly: 'Generated method patchTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyCategoryBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/batch`,
      data,
      op: 'putTaxonomyCategoryBatch',
      friendly: 'Generated method putTaxonomyCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteTaxonomyCategoryBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteTaxonomyCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/batch`,
      data,
      op: 'deleteTaxonomyCategoryBatch',
      friendly: 'Generated method deleteTaxonomyCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode(
    config,
    taxonomyVocabularyId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method getTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode(
    config,
    taxonomyVocabularyId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method putTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode(
    config,
    taxonomyVocabularyId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode',
      friendly:
        'Generated method deleteTaxonomyVocabularyTaxonomyCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryTaxonomyCategoriesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryTaxonomyCategoriesPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories`,
      data,
      op: 'getAssetLibraryTaxonomyCategoriesPage',
      friendly: 'Generated method getAssetLibraryTaxonomyCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyCategory(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories`,
      data,
      op: 'postAssetLibraryTaxonomyCategory',
      friendly: 'Generated method postAssetLibraryTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * getSiteTaxonomyCategoriesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteTaxonomyCategoriesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories`,
      data,
      op: 'getSiteTaxonomyCategoriesPage',
      friendly: 'Generated method getSiteTaxonomyCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyCategory(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories`,
      data,
      op: 'postSiteTaxonomyCategory',
      friendly: 'Generated method postSiteTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyCategoriesRankedPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyCategoriesRankedPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/ranked`,
      data,
      op: 'getTaxonomyCategoriesRankedPage',
      friendly: 'Generated method getTaxonomyCategoriesRankedPage failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyCategoryPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyCategoryPermissionsPage(
    config,
    taxonomyCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}/permissions`,
      data,
      op: 'getTaxonomyCategoryPermissionsPage',
      friendly: 'Generated method getTaxonomyCategoryPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyCategoryPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyCategoryPermissionsPage(
    config,
    taxonomyCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${taxonomyCategoryId}/permissions`,
      data,
      op: 'putTaxonomyCategoryPermissionsPage',
      friendly: 'Generated method putTaxonomyCategoryPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyCategoryTaxonomyCategoriesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyCategoryTaxonomyCategoriesPage(
    config,
    parentTaxonomyCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${parentTaxonomyCategoryId}/taxonomy-categories`,
      data,
      op: 'getTaxonomyCategoryTaxonomyCategoriesPage',
      friendly:
        'Generated method getTaxonomyCategoryTaxonomyCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postTaxonomyCategoryTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postTaxonomyCategoryTaxonomyCategory(
    config,
    parentTaxonomyCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${parentTaxonomyCategoryId}/taxonomy-categories`,
      data,
      op: 'postTaxonomyCategoryTaxonomyCategory',
      friendly: 'Generated method postTaxonomyCategoryTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyVocabularyTaxonomyCategoriesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyVocabularyTaxonomyCategoriesPage(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories`,
      data,
      op: 'getTaxonomyVocabularyTaxonomyCategoriesPage',
      friendly:
        'Generated method getTaxonomyVocabularyTaxonomyCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postTaxonomyVocabularyTaxonomyCategory
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postTaxonomyVocabularyTaxonomyCategory(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories`,
      data,
      op: 'postTaxonomyVocabularyTaxonomyCategory',
      friendly:
        'Generated method postTaxonomyVocabularyTaxonomyCategory failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyCategoriesPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyCategoriesPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories/export-batch`,
      data,
      op: 'postAssetLibraryTaxonomyCategoriesPageExportBatch',
      friendly:
        'Generated method postAssetLibraryTaxonomyCategoriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyCategoryBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyCategoryBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-categories/batch`,
      data,
      op: 'postAssetLibraryTaxonomyCategoryBatch',
      friendly: 'Generated method postAssetLibraryTaxonomyCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyCategoriesPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyCategoriesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories/export-batch`,
      data,
      op: 'postSiteTaxonomyCategoriesPageExportBatch',
      friendly:
        'Generated method postSiteTaxonomyCategoriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyCategoryBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyCategoryBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-categories/batch`,
      data,
      op: 'postSiteTaxonomyCategoryBatch',
      friendly: 'Generated method postSiteTaxonomyCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postTaxonomyVocabularyTaxonomyCategoriesPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postTaxonomyVocabularyTaxonomyCategoriesPageExportBatch(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories/export-batch`,
      data,
      op: 'postTaxonomyVocabularyTaxonomyCategoriesPageExportBatch',
      friendly:
        'Generated method postTaxonomyVocabularyTaxonomyCategoriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postTaxonomyVocabularyTaxonomyCategoryBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postTaxonomyVocabularyTaxonomyCategoryBatch(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/taxonomy-categories/batch`,
      data,
      op: 'postTaxonomyVocabularyTaxonomyCategoryBatch',
      friendly:
        'Generated method postTaxonomyVocabularyTaxonomyCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryTaxonomyVocabularyByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putAssetLibraryTaxonomyVocabularyByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryTaxonomyVocabularyByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteTaxonomyVocabularyByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method getSiteTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putSiteTaxonomyVocabularyByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method putSiteTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteTaxonomyVocabularyByExternalReferenceCode
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteSiteTaxonomyVocabularyByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteTaxonomyVocabularyByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteTaxonomyVocabularyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyVocabulary(config, taxonomyVocabularyId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}`,
      data,
      op: 'getTaxonomyVocabulary',
      friendly: 'Generated method getTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyVocabulary(config, taxonomyVocabularyId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}`,
      data,
      op: 'putTaxonomyVocabulary',
      friendly: 'Generated method putTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * deleteTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteTaxonomyVocabulary(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}`,
      data,
      op: 'deleteTaxonomyVocabulary',
      friendly: 'Generated method deleteTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * patchTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async patchTaxonomyVocabulary(config, taxonomyVocabularyId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}`,
      data,
      op: 'patchTaxonomyVocabulary',
      friendly: 'Generated method patchTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyVocabularyBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyVocabularyBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/batch`,
      data,
      op: 'putTaxonomyVocabularyBatch',
      friendly: 'Generated method putTaxonomyVocabularyBatch failed',
      ...opts,
    });
  }

  /**
   * deleteTaxonomyVocabularyBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async deleteTaxonomyVocabularyBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/batch`,
      data,
      op: 'deleteTaxonomyVocabularyBatch',
      friendly: 'Generated method deleteTaxonomyVocabularyBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryTaxonomyVocabulariesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryTaxonomyVocabulariesPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies`,
      data,
      op: 'getAssetLibraryTaxonomyVocabulariesPage',
      friendly:
        'Generated method getAssetLibraryTaxonomyVocabulariesPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyVocabulary(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies`,
      data,
      op: 'postAssetLibraryTaxonomyVocabulary',
      friendly: 'Generated method postAssetLibraryTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getAssetLibraryTaxonomyVocabularyPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/permissions`,
      data,
      op: 'getAssetLibraryTaxonomyVocabularyPermissionsPage',
      friendly:
        'Generated method getAssetLibraryTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putAssetLibraryTaxonomyVocabularyPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/permissions`,
      data,
      op: 'putAssetLibraryTaxonomyVocabularyPermissionsPage',
      friendly:
        'Generated method putAssetLibraryTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteTaxonomyVocabulariesPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteTaxonomyVocabulariesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies`,
      data,
      op: 'getSiteTaxonomyVocabulariesPage',
      friendly: 'Generated method getSiteTaxonomyVocabulariesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyVocabulary
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyVocabulary(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies`,
      data,
      op: 'postSiteTaxonomyVocabulary',
      friendly: 'Generated method postSiteTaxonomyVocabulary failed',
      ...opts,
    });
  }

  /**
   * getSiteTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getSiteTaxonomyVocabularyPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/permissions`,
      data,
      op: 'getSiteTaxonomyVocabularyPermissionsPage',
      friendly:
        'Generated method getSiteTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putSiteTaxonomyVocabularyPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/permissions`,
      data,
      op: 'putSiteTaxonomyVocabularyPermissionsPage',
      friendly:
        'Generated method putSiteTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async getTaxonomyVocabularyPermissionsPage(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/permissions`,
      data,
      op: 'getTaxonomyVocabularyPermissionsPage',
      friendly: 'Generated method getTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putTaxonomyVocabularyPermissionsPage
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async putTaxonomyVocabularyPermissionsPage(
    config,
    taxonomyVocabularyId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${taxonomyVocabularyId}/permissions`,
      data,
      op: 'putTaxonomyVocabularyPermissionsPage',
      friendly: 'Generated method putTaxonomyVocabularyPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyVocabulariesPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyVocabulariesPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/export-batch`,
      data,
      op: 'postAssetLibraryTaxonomyVocabulariesPageExportBatch',
      friendly:
        'Generated method postAssetLibraryTaxonomyVocabulariesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryTaxonomyVocabularyBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postAssetLibraryTaxonomyVocabularyBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/asset-libraries/${assetLibraryId}/taxonomy-vocabularies/batch`,
      data,
      op: 'postAssetLibraryTaxonomyVocabularyBatch',
      friendly:
        'Generated method postAssetLibraryTaxonomyVocabularyBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyVocabulariesPageExportBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyVocabulariesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/export-batch`,
      data,
      op: 'postSiteTaxonomyVocabulariesPageExportBatch',
      friendly:
        'Generated method postSiteTaxonomyVocabulariesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteTaxonomyVocabularyBatch
   * API: headless-admin-taxonomy-v1.0 | Version: v1.0
   */
  async postSiteTaxonomyVocabularyBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-taxonomy/v1.0/sites/${siteId}/taxonomy-vocabularies/batch`,
      data,
      op: 'postSiteTaxonomyVocabularyBatch',
      friendly: 'Generated method postSiteTaxonomyVocabularyBatch failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminTaxonomyClient_v1_0;
