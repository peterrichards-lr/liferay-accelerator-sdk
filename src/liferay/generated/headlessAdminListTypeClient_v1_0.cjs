/**
 * HeadlessAdminListTypeClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminListTypeClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getListTypeDefinition
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeDefinition(config, listTypeDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'getListTypeDefinition',
      friendly: 'Generated method getListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * putListTypeDefinition
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async putListTypeDefinition(config, listTypeDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'putListTypeDefinition',
      friendly: 'Generated method putListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * deleteListTypeDefinition
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async deleteListTypeDefinition(
    config,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'deleteListTypeDefinition',
      friendly: 'Generated method deleteListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * patchListTypeDefinition
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async patchListTypeDefinition(config, listTypeDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'patchListTypeDefinition',
      friendly: 'Generated method patchListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * putListTypeDefinitionBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async putListTypeDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/batch`,
      data,
      op: 'putListTypeDefinitionBatch',
      friendly: 'Generated method putListTypeDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/batch`,
      data,
      op: 'postListTypeDefinitionBatch',
      friendly: 'Generated method postListTypeDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteListTypeDefinitionBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async deleteListTypeDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/batch`,
      data,
      op: 'deleteListTypeDefinitionBatch',
      friendly: 'Generated method deleteListTypeDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * getListTypeDefinitionByExternalReferenceCode
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeDefinitionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getListTypeDefinitionByExternalReferenceCode',
      friendly:
        'Generated method getListTypeDefinitionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putListTypeDefinitionByExternalReferenceCode
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async putListTypeDefinitionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putListTypeDefinitionByExternalReferenceCode',
      friendly:
        'Generated method putListTypeDefinitionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getListTypeDefinitionsPage
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeDefinitionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions`,
      data,
      op: 'getListTypeDefinitionsPage',
      friendly: 'Generated method getListTypeDefinitionsPage failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinition
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions`,
      data,
      op: 'postListTypeDefinition',
      friendly: 'Generated method postListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionsPageExportBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/export-batch`,
      data,
      op: 'postListTypeDefinitionsPageExportBatch',
      friendly:
        'Generated method postListTypeDefinitionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getListTypeEntry
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeEntry(config, listTypeEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-entries/${listTypeEntryId}`,
      data,
      op: 'getListTypeEntry',
      friendly: 'Generated method getListTypeEntry failed',
      ...opts,
    });
  }

  /**
   * putListTypeEntry
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async putListTypeEntry(config, listTypeEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-list-type/v1.0/list-type-entries/${listTypeEntryId}`,
      data,
      op: 'putListTypeEntry',
      friendly: 'Generated method putListTypeEntry failed',
      ...opts,
    });
  }

  /**
   * deleteListTypeEntry
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async deleteListTypeEntry(config, listTypeEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-list-type/v1.0/list-type-entries/${listTypeEntryId}`,
      data,
      op: 'deleteListTypeEntry',
      friendly: 'Generated method deleteListTypeEntry failed',
      ...opts,
    });
  }

  /**
   * putListTypeEntryBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async putListTypeEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-list-type/v1.0/list-type-entries/batch`,
      data,
      op: 'putListTypeEntryBatch',
      friendly: 'Generated method putListTypeEntryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteListTypeEntryBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async deleteListTypeEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-list-type/v1.0/list-type-entries/batch`,
      data,
      op: 'deleteListTypeEntryBatch',
      friendly: 'Generated method deleteListTypeEntryBatch failed',
      ...opts,
    });
  }

  /**
   * getListTypeDefinitionByExternalReferenceCodeListTypeEntriesPage
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeDefinitionByExternalReferenceCodeListTypeEntriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${externalReferenceCode}/list-type-entries`,
      data,
      op: 'getListTypeDefinitionByExternalReferenceCodeListTypeEntriesPage',
      friendly:
        'Generated method getListTypeDefinitionByExternalReferenceCodeListTypeEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionByExternalReferenceCodeListTypeEntry
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionByExternalReferenceCodeListTypeEntry(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${externalReferenceCode}/list-type-entries`,
      data,
      op: 'postListTypeDefinitionByExternalReferenceCodeListTypeEntry',
      friendly:
        'Generated method postListTypeDefinitionByExternalReferenceCodeListTypeEntry failed',
      ...opts,
    });
  }

  /**
   * getListTypeDefinitionListTypeEntriesPage
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getListTypeDefinitionListTypeEntriesPage(
    config,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}/list-type-entries`,
      data,
      op: 'getListTypeDefinitionListTypeEntriesPage',
      friendly:
        'Generated method getListTypeDefinitionListTypeEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionListTypeEntry
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionListTypeEntry(
    config,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}/list-type-entries`,
      data,
      op: 'postListTypeDefinitionListTypeEntry',
      friendly: 'Generated method postListTypeDefinitionListTypeEntry failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionListTypeEntriesPageExportBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionListTypeEntriesPageExportBatch(
    config,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}/list-type-entries/export-batch`,
      data,
      op: 'postListTypeDefinitionListTypeEntriesPageExportBatch',
      friendly:
        'Generated method postListTypeDefinitionListTypeEntriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postListTypeDefinitionListTypeEntryBatch
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async postListTypeDefinitionListTypeEntryBatch(
    config,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-list-type/v1.0/list-type-definitions/${listTypeDefinitionId}/list-type-entries/batch`,
      data,
      op: 'postListTypeDefinitionListTypeEntryBatch',
      friendly:
        'Generated method postListTypeDefinitionListTypeEntryBatch failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-list-type-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-list-type/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminListTypeClient_v1_0;
