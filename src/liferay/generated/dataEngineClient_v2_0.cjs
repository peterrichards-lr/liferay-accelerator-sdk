/**
 * DataEngineClient_v2_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class DataEngineClient_v2_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getDataDefinitionDataDefinitionFieldLinksPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataDefinitionFieldLinksPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-definition-field-links`,
      data,
      op: 'getDataDefinitionDataDefinitionFieldLinksPage',
      friendly:
        'Generated method getDataDefinitionDataDefinitionFieldLinksPage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataDefinitionFieldLinksPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataDefinitionFieldLinksPageExportBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-definition-field-links/export-batch`,
      data,
      op: 'postDataDefinitionDataDefinitionFieldLinksPageExportBatch',
      friendly:
        'Generated method postDataDefinitionDataDefinitionFieldLinksPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getDataDefinition
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinition(config, dataDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}`,
      data,
      op: 'getDataDefinition',
      friendly: 'Generated method getDataDefinition failed',
      ...opts,
    });
  }

  /**
   * putDataDefinition
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataDefinition(config, dataDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}`,
      data,
      op: 'putDataDefinition',
      friendly: 'Generated method putDataDefinition failed',
      ...opts,
    });
  }

  /**
   * deleteDataDefinition
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataDefinition(config, dataDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}`,
      data,
      op: 'deleteDataDefinition',
      friendly: 'Generated method deleteDataDefinition failed',
      ...opts,
    });
  }

  /**
   * patchDataDefinition
   * API: data-engine-v2.0 | Version: v2.0
   */
  async patchDataDefinition(config, dataDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}`,
      data,
      op: 'patchDataDefinition',
      friendly: 'Generated method patchDataDefinition failed',
      ...opts,
    });
  }

  /**
   * putDataDefinitionBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-definitions/batch`,
      data,
      op: 'putDataDefinitionBatch',
      friendly: 'Generated method putDataDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDataDefinitionBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-definitions/batch`,
      data,
      op: 'deleteDataDefinitionBatch',
      friendly: 'Generated method deleteDataDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDataDefinitionByContentTypeByExternalReferenceCode
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getSiteDataDefinitionByContentTypeByExternalReferenceCode(
    config,
    siteId,
    contentType,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDataDefinitionByContentTypeByExternalReferenceCode',
      friendly:
        'Generated method getSiteDataDefinitionByContentTypeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDataDefinitionByContentTypeByExternalReferenceCode
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putSiteDataDefinitionByContentTypeByExternalReferenceCode(
    config,
    siteId,
    contentType,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDataDefinitionByContentTypeByExternalReferenceCode',
      friendly:
        'Generated method putSiteDataDefinitionByContentTypeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDataDefinitionByContentTypeByExternalReferenceCode
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteSiteDataDefinitionByContentTypeByExternalReferenceCode(
    config,
    siteId,
    contentType,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDataDefinitionByContentTypeByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDataDefinitionByContentTypeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionByContentTypeContentTypePage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionByContentTypeContentTypePage(
    config,
    contentType,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/by-content-type/${contentType}`,
      data,
      op: 'getDataDefinitionByContentTypeContentTypePage',
      friendly:
        'Generated method getDataDefinitionByContentTypeContentTypePage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionByContentType
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionByContentType(config, contentType, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/by-content-type/${contentType}`,
      data,
      op: 'postDataDefinitionByContentType',
      friendly: 'Generated method postDataDefinitionByContentType failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataDefinitionFieldFieldTypes
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataDefinitionFieldFieldTypes(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/data-definition-fields/field-types`,
      data,
      op: 'getDataDefinitionDataDefinitionFieldFieldTypes',
      friendly:
        'Generated method getDataDefinitionDataDefinitionFieldFieldTypes failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionPermissionsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionPermissionsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/permissions`,
      data,
      op: 'getDataDefinitionPermissionsPage',
      friendly: 'Generated method getDataDefinitionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putDataDefinitionPermissionsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataDefinitionPermissionsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/permissions`,
      data,
      op: 'putDataDefinitionPermissionsPage',
      friendly: 'Generated method putDataDefinitionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDataDefinitionByContentTypeByDataDefinitionKey
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getSiteDataDefinitionByContentTypeByDataDefinitionKey(
    config,
    siteId,
    contentType,
    dataDefinitionKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}/by-data-definition-key/${dataDefinitionKey}`,
      data,
      op: 'getSiteDataDefinitionByContentTypeByDataDefinitionKey',
      friendly:
        'Generated method getSiteDataDefinitionByContentTypeByDataDefinitionKey failed',
      ...opts,
    });
  }

  /**
   * getSiteDataDefinitionByContentTypeContentTypePage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getSiteDataDefinitionByContentTypeContentTypePage(
    config,
    siteId,
    contentType,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}`,
      data,
      op: 'getSiteDataDefinitionByContentTypeContentTypePage',
      friendly:
        'Generated method getSiteDataDefinitionByContentTypeContentTypePage failed',
      ...opts,
    });
  }

  /**
   * postSiteDataDefinitionByContentType
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postSiteDataDefinitionByContentType(
    config,
    siteId,
    contentType,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-definitions/by-content-type/${contentType}`,
      data,
      op: 'postSiteDataDefinitionByContentType',
      friendly: 'Generated method postSiteDataDefinitionByContentType failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionCopy
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionCopy(config, dataDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/copy`,
      data,
      op: 'postDataDefinitionCopy',
      friendly: 'Generated method postDataDefinitionCopy failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataLayoutsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataLayoutsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts`,
      data,
      op: 'getDataDefinitionDataLayoutsPage',
      friendly: 'Generated method getDataDefinitionDataLayoutsPage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataLayout
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataLayout(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts`,
      data,
      op: 'postDataDefinitionDataLayout',
      friendly: 'Generated method postDataDefinitionDataLayout failed',
      ...opts,
    });
  }

  /**
   * deleteDataDefinitionDataLayout
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataDefinitionDataLayout(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts`,
      data,
      op: 'deleteDataDefinitionDataLayout',
      friendly: 'Generated method deleteDataDefinitionDataLayout failed',
      ...opts,
    });
  }

  /**
   * getDataLayout
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataLayout(config, dataLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-layouts/${dataLayoutId}`,
      data,
      op: 'getDataLayout',
      friendly: 'Generated method getDataLayout failed',
      ...opts,
    });
  }

  /**
   * putDataLayout
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataLayout(config, dataLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-layouts/${dataLayoutId}`,
      data,
      op: 'putDataLayout',
      friendly: 'Generated method putDataLayout failed',
      ...opts,
    });
  }

  /**
   * deleteDataLayout
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataLayout(config, dataLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-layouts/${dataLayoutId}`,
      data,
      op: 'deleteDataLayout',
      friendly: 'Generated method deleteDataLayout failed',
      ...opts,
    });
  }

  /**
   * putDataLayoutBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataLayoutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-layouts/batch`,
      data,
      op: 'putDataLayoutBatch',
      friendly: 'Generated method putDataLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDataLayoutBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataLayoutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-layouts/batch`,
      data,
      op: 'deleteDataLayoutBatch',
      friendly: 'Generated method deleteDataLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDataLayoutByContentTypeByDataLayoutKey
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getSiteDataLayoutByContentTypeByDataLayoutKey(
    config,
    siteId,
    contentType,
    dataLayoutKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-layouts/by-content-type/${contentType}/by-data-layout-key/${dataLayoutKey}`,
      data,
      op: 'getSiteDataLayoutByContentTypeByDataLayoutKey',
      friendly:
        'Generated method getSiteDataLayoutByContentTypeByDataLayoutKey failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataLayoutBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataLayoutBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts/batch`,
      data,
      op: 'postDataDefinitionDataLayoutBatch',
      friendly: 'Generated method postDataDefinitionDataLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataLayoutsPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataLayoutsPageExportBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-layouts/export-batch`,
      data,
      op: 'postDataDefinitionDataLayoutsPageExportBatch',
      friendly:
        'Generated method postDataDefinitionDataLayoutsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postDataLayoutContext
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataLayoutContext(config, dataLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-layouts/${dataLayoutId}/context`,
      data,
      op: 'postDataLayoutContext',
      friendly: 'Generated method postDataLayoutContext failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataListViewsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataListViewsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views`,
      data,
      op: 'getDataDefinitionDataListViewsPage',
      friendly: 'Generated method getDataDefinitionDataListViewsPage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataListView
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataListView(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views`,
      data,
      op: 'postDataDefinitionDataListView',
      friendly: 'Generated method postDataDefinitionDataListView failed',
      ...opts,
    });
  }

  /**
   * deleteDataDefinitionDataListView
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataDefinitionDataListView(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views`,
      data,
      op: 'deleteDataDefinitionDataListView',
      friendly: 'Generated method deleteDataDefinitionDataListView failed',
      ...opts,
    });
  }

  /**
   * getDataListView
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataListView(config, dataListViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-list-views/${dataListViewId}`,
      data,
      op: 'getDataListView',
      friendly: 'Generated method getDataListView failed',
      ...opts,
    });
  }

  /**
   * putDataListView
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataListView(config, dataListViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-list-views/${dataListViewId}`,
      data,
      op: 'putDataListView',
      friendly: 'Generated method putDataListView failed',
      ...opts,
    });
  }

  /**
   * deleteDataListView
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataListView(config, dataListViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-list-views/${dataListViewId}`,
      data,
      op: 'deleteDataListView',
      friendly: 'Generated method deleteDataListView failed',
      ...opts,
    });
  }

  /**
   * putDataListViewBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataListViewBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-list-views/batch`,
      data,
      op: 'putDataListViewBatch',
      friendly: 'Generated method putDataListViewBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDataListViewBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataListViewBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-list-views/batch`,
      data,
      op: 'deleteDataListViewBatch',
      friendly: 'Generated method deleteDataListViewBatch failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataListViewBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataListViewBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views/batch`,
      data,
      op: 'postDataDefinitionDataListViewBatch',
      friendly: 'Generated method postDataDefinitionDataListViewBatch failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataListViewsPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataListViewsPageExportBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-list-views/export-batch`,
      data,
      op: 'postDataDefinitionDataListViewsPageExportBatch',
      friendly:
        'Generated method postDataDefinitionDataListViewsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getDataRecordCollection
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecordCollection(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}`,
      data,
      op: 'getDataRecordCollection',
      friendly: 'Generated method getDataRecordCollection failed',
      ...opts,
    });
  }

  /**
   * putDataRecordCollection
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataRecordCollection(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}`,
      data,
      op: 'putDataRecordCollection',
      friendly: 'Generated method putDataRecordCollection failed',
      ...opts,
    });
  }

  /**
   * deleteDataRecordCollection
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataRecordCollection(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}`,
      data,
      op: 'deleteDataRecordCollection',
      friendly: 'Generated method deleteDataRecordCollection failed',
      ...opts,
    });
  }

  /**
   * putDataRecordCollectionBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataRecordCollectionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-record-collections/batch`,
      data,
      op: 'putDataRecordCollectionBatch',
      friendly: 'Generated method putDataRecordCollectionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDataRecordCollectionBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataRecordCollectionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-record-collections/batch`,
      data,
      op: 'deleteDataRecordCollectionBatch',
      friendly: 'Generated method deleteDataRecordCollectionBatch failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataRecordCollection
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataRecordCollection(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-record-collection`,
      data,
      op: 'getDataDefinitionDataRecordCollection',
      friendly: 'Generated method getDataDefinitionDataRecordCollection failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataRecordCollectionsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataRecordCollectionsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-record-collections`,
      data,
      op: 'getDataDefinitionDataRecordCollectionsPage',
      friendly:
        'Generated method getDataDefinitionDataRecordCollectionsPage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecordCollection
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecordCollection(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-record-collections`,
      data,
      op: 'postDataDefinitionDataRecordCollection',
      friendly:
        'Generated method postDataDefinitionDataRecordCollection failed',
      ...opts,
    });
  }

  /**
   * getDataRecordCollectionPermissionByCurrentUser
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecordCollectionPermissionByCurrentUser(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/permissions/by-current-user`,
      data,
      op: 'getDataRecordCollectionPermissionByCurrentUser',
      friendly:
        'Generated method getDataRecordCollectionPermissionByCurrentUser failed',
      ...opts,
    });
  }

  /**
   * getDataRecordCollectionPermissionsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecordCollectionPermissionsPage(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/permissions`,
      data,
      op: 'getDataRecordCollectionPermissionsPage',
      friendly:
        'Generated method getDataRecordCollectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putDataRecordCollectionPermissionsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataRecordCollectionPermissionsPage(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/permissions`,
      data,
      op: 'putDataRecordCollectionPermissionsPage',
      friendly:
        'Generated method putDataRecordCollectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDataRecordCollectionByDataRecordCollectionKey
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getSiteDataRecordCollectionByDataRecordCollectionKey(
    config,
    siteId,
    dataRecordCollectionKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/sites/${siteId}/data-record-collections/by-data-record-collection-key/${dataRecordCollectionKey}`,
      data,
      op: 'getSiteDataRecordCollectionByDataRecordCollectionKey',
      friendly:
        'Generated method getSiteDataRecordCollectionByDataRecordCollectionKey failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecordCollectionBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecordCollectionBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-record-collections/batch`,
      data,
      op: 'postDataDefinitionDataRecordCollectionBatch',
      friendly:
        'Generated method postDataDefinitionDataRecordCollectionBatch failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecordCollectionsPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecordCollectionsPageExportBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-record-collections/export-batch`,
      data,
      op: 'postDataDefinitionDataRecordCollectionsPageExportBatch',
      friendly:
        'Generated method postDataDefinitionDataRecordCollectionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecord(config, dataRecordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-records/${dataRecordId}`,
      data,
      op: 'getDataRecord',
      friendly: 'Generated method getDataRecord failed',
      ...opts,
    });
  }

  /**
   * putDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataRecord(config, dataRecordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-records/${dataRecordId}`,
      data,
      op: 'putDataRecord',
      friendly: 'Generated method putDataRecord failed',
      ...opts,
    });
  }

  /**
   * deleteDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataRecord(config, dataRecordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-records/${dataRecordId}`,
      data,
      op: 'deleteDataRecord',
      friendly: 'Generated method deleteDataRecord failed',
      ...opts,
    });
  }

  /**
   * patchDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async patchDataRecord(config, dataRecordId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/data-engine/v2.0/data-records/${dataRecordId}`,
      data,
      op: 'patchDataRecord',
      friendly: 'Generated method patchDataRecord failed',
      ...opts,
    });
  }

  /**
   * putDataRecordBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async putDataRecordBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/data-engine/v2.0/data-records/batch`,
      data,
      op: 'putDataRecordBatch',
      friendly: 'Generated method putDataRecordBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDataRecordBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async deleteDataRecordBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/data-engine/v2.0/data-records/batch`,
      data,
      op: 'deleteDataRecordBatch',
      friendly: 'Generated method deleteDataRecordBatch failed',
      ...opts,
    });
  }

  /**
   * getDataDefinitionDataRecordsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataDefinitionDataRecordsPage(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records`,
      data,
      op: 'getDataDefinitionDataRecordsPage',
      friendly: 'Generated method getDataDefinitionDataRecordsPage failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecord(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records`,
      data,
      op: 'postDataDefinitionDataRecord',
      friendly: 'Generated method postDataDefinitionDataRecord failed',
      ...opts,
    });
  }

  /**
   * getDataRecordCollectionDataRecordExport
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecordCollectionDataRecordExport(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/data-records/export`,
      data,
      op: 'getDataRecordCollectionDataRecordExport',
      friendly:
        'Generated method getDataRecordCollectionDataRecordExport failed',
      ...opts,
    });
  }

  /**
   * getDataRecordCollectionDataRecordsPage
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getDataRecordCollectionDataRecordsPage(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/data-records`,
      data,
      op: 'getDataRecordCollectionDataRecordsPage',
      friendly:
        'Generated method getDataRecordCollectionDataRecordsPage failed',
      ...opts,
    });
  }

  /**
   * postDataRecordCollectionDataRecord
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataRecordCollectionDataRecord(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/data-records`,
      data,
      op: 'postDataRecordCollectionDataRecord',
      friendly: 'Generated method postDataRecordCollectionDataRecord failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecordBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecordBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records/batch`,
      data,
      op: 'postDataDefinitionDataRecordBatch',
      friendly: 'Generated method postDataDefinitionDataRecordBatch failed',
      ...opts,
    });
  }

  /**
   * postDataDefinitionDataRecordsPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataDefinitionDataRecordsPageExportBatch(
    config,
    dataDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-definitions/${dataDefinitionId}/data-records/export-batch`,
      data,
      op: 'postDataDefinitionDataRecordsPageExportBatch',
      friendly:
        'Generated method postDataDefinitionDataRecordsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postDataRecordCollectionDataRecordBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataRecordCollectionDataRecordBatch(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/data-records/batch`,
      data,
      op: 'postDataRecordCollectionDataRecordBatch',
      friendly:
        'Generated method postDataRecordCollectionDataRecordBatch failed',
      ...opts,
    });
  }

  /**
   * postDataRecordCollectionDataRecordsPageExportBatch
   * API: data-engine-v2.0 | Version: v2.0
   */
  async postDataRecordCollectionDataRecordsPageExportBatch(
    config,
    dataRecordCollectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/data-engine/v2.0/data-record-collections/${dataRecordCollectionId}/data-records/export-batch`,
      data,
      op: 'postDataRecordCollectionDataRecordsPageExportBatch',
      friendly:
        'Generated method postDataRecordCollectionDataRecordsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: data-engine-v2.0 | Version: v2.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/data-engine/v2.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }
}

module.exports = DataEngineClient_v2_0;
