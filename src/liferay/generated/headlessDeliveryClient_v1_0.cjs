/**
 * HeadlessDeliveryClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessDeliveryClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getAssetLibraryContentElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentElementsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-elements`,
      data,
      op: 'getAssetLibraryContentElementsPage',
      friendly: 'Generated method getAssetLibraryContentElementsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryContentElementsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryContentElementsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-elements/export-batch`,
      data,
      op: 'postAssetLibraryContentElementsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryContentElementsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryContentSetByKeyContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentSetByKeyContentSetElementsPage(
    config,
    assetLibraryId,
    key,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-sets/by-key/${key}/content-set-elements`,
      data,
      op: 'getAssetLibraryContentSetByKeyContentSetElementsPage',
      friendly:
        'Generated method getAssetLibraryContentSetByKeyContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryContentSetByUuidContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentSetByUuidContentSetElementsPage(
    config,
    assetLibraryId,
    uuid,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-sets/by-uuid/${uuid}/content-set-elements`,
      data,
      op: 'getAssetLibraryContentSetByUuidContentSetElementsPage',
      friendly:
        'Generated method getAssetLibraryContentSetByUuidContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryContentStructuresPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentStructuresPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-structures`,
      data,
      op: 'getAssetLibraryContentStructuresPage',
      friendly: 'Generated method getAssetLibraryContentStructuresPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryContentStructuresPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryContentStructuresPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-structures/export-batch`,
      data,
      op: 'postAssetLibraryContentStructuresPageExportBatch',
      friendly:
        'Generated method postAssetLibraryContentStructuresPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentStructurePermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-structures/permissions`,
      data,
      op: 'getAssetLibraryContentStructurePermissionsPage',
      friendly:
        'Generated method getAssetLibraryContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryContentStructurePermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-structures/permissions`,
      data,
      op: 'putAssetLibraryContentStructurePermissionsPage',
      friendly:
        'Generated method putAssetLibraryContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryContentTemplatesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryContentTemplatesPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-templates`,
      data,
      op: 'getAssetLibraryContentTemplatesPage',
      friendly: 'Generated method getAssetLibraryContentTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryContentTemplatesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryContentTemplatesPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/content-templates/export-batch`,
      data,
      op: 'postAssetLibraryContentTemplatesPageExportBatch',
      friendly:
        'Generated method postAssetLibraryContentTemplatesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentDataDefinitionTypesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentDataDefinitionTypesPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-data-definition-types`,
      data,
      op: 'getAssetLibraryDocumentDataDefinitionTypesPage',
      friendly:
        'Generated method getAssetLibraryDocumentDataDefinitionTypesPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentDataDefinitionType
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentDataDefinitionType(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-data-definition-types`,
      data,
      op: 'postAssetLibraryDocumentDataDefinitionType',
      friendly:
        'Generated method postAssetLibraryDocumentDataDefinitionType failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentDataDefinitionTypeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentDataDefinitionTypeBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-data-definition-types/batch`,
      data,
      op: 'postAssetLibraryDocumentDataDefinitionTypeBatch',
      friendly:
        'Generated method postAssetLibraryDocumentDataDefinitionTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentDataDefinitionTypesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentDataDefinitionTypesPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-data-definition-types/export-batch`,
      data,
      op: 'postAssetLibraryDocumentDataDefinitionTypesPageExportBatch',
      friendly:
        'Generated method postAssetLibraryDocumentDataDefinitionTypesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentFoldersPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders`,
      data,
      op: 'getAssetLibraryDocumentFoldersPage',
      friendly: 'Generated method getAssetLibraryDocumentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentFolder(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders`,
      data,
      op: 'postAssetLibraryDocumentFolder',
      friendly: 'Generated method postAssetLibraryDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentFolderBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders/batch`,
      data,
      op: 'postAssetLibraryDocumentFolderBatch',
      friendly: 'Generated method postAssetLibraryDocumentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentFoldersPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentFoldersPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders/export-batch`,
      data,
      op: 'postAssetLibraryDocumentFoldersPageExportBatch',
      friendly:
        'Generated method postAssetLibraryDocumentFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentFolderPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders/permissions`,
      data,
      op: 'getAssetLibraryDocumentFolderPermissionsPage',
      friendly:
        'Generated method getAssetLibraryDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryDocumentFolderPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders/permissions`,
      data,
      op: 'putAssetLibraryDocumentFolderPermissionsPage',
      friendly:
        'Generated method putAssetLibraryDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentFoldersRatedByMePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentFoldersRatedByMePage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-folders/rated-by-me`,
      data,
      op: 'getAssetLibraryDocumentFoldersRatedByMePage',
      friendly:
        'Generated method getAssetLibraryDocumentFoldersRatedByMePage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentMetadataSetsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentMetadataSetsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets`,
      data,
      op: 'getAssetLibraryDocumentMetadataSetsPage',
      friendly:
        'Generated method getAssetLibraryDocumentMetadataSetsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentMetadataSet
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentMetadataSet(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets`,
      data,
      op: 'postAssetLibraryDocumentMetadataSet',
      friendly: 'Generated method postAssetLibraryDocumentMetadataSet failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentMetadataSetBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentMetadataSetBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets/batch`,
      data,
      op: 'postAssetLibraryDocumentMetadataSetBatch',
      friendly:
        'Generated method postAssetLibraryDocumentMetadataSetBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryDocumentMetadataSetByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentMetadataSetByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryDocumentMetadataSetByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentMetadataSetsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentMetadataSetsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-metadata-sets/export-batch`,
      data,
      op: 'postAssetLibraryDocumentMetadataSetsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryDocumentMetadataSetsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentShortcutsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentShortcutsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-shortcuts`,
      data,
      op: 'getAssetLibraryDocumentShortcutsPage',
      friendly: 'Generated method getAssetLibraryDocumentShortcutsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentShortcut(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-shortcuts`,
      data,
      op: 'postAssetLibraryDocumentShortcut',
      friendly: 'Generated method postAssetLibraryDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentShortcutBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentShortcutBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-shortcuts/batch`,
      data,
      op: 'postAssetLibraryDocumentShortcutBatch',
      friendly: 'Generated method postAssetLibraryDocumentShortcutBatch failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentShortcutsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentShortcutsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/document-shortcuts/export-batch`,
      data,
      op: 'postAssetLibraryDocumentShortcutsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryDocumentShortcutsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentsPage(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents`,
      data,
      op: 'getAssetLibraryDocumentsPage',
      friendly: 'Generated method getAssetLibraryDocumentsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocument(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents`,
      data,
      op: 'postAssetLibraryDocument',
      friendly: 'Generated method postAssetLibraryDocument failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentBatch(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/batch`,
      data,
      op: 'postAssetLibraryDocumentBatch',
      friendly: 'Generated method postAssetLibraryDocumentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryDocumentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryDocumentByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryDocumentByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryDocumentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryDocumentByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryDocumentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryDocumentsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/export-batch`,
      data,
      op: 'postAssetLibraryDocumentsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryDocumentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/permissions`,
      data,
      op: 'getAssetLibraryDocumentPermissionsPage',
      friendly:
        'Generated method getAssetLibraryDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryDocumentPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/permissions`,
      data,
      op: 'putAssetLibraryDocumentPermissionsPage',
      friendly:
        'Generated method putAssetLibraryDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryDocumentsRatedByMePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryDocumentsRatedByMePage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/documents/rated-by-me`,
      data,
      op: 'getAssetLibraryDocumentsRatedByMePage',
      friendly: 'Generated method getAssetLibraryDocumentsRatedByMePage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryLanguagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryLanguagesPage(config, assetLibraryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/languages`,
      data,
      op: 'getAssetLibraryLanguagesPage',
      friendly: 'Generated method getAssetLibraryLanguagesPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryLanguagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryLanguagesPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/languages/export-batch`,
      data,
      op: 'postAssetLibraryLanguagesPageExportBatch',
      friendly:
        'Generated method postAssetLibraryLanguagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentFoldersPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders`,
      data,
      op: 'getAssetLibraryStructuredContentFoldersPage',
      friendly:
        'Generated method getAssetLibraryStructuredContentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContentFolder(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders`,
      data,
      op: 'postAssetLibraryStructuredContentFolder',
      friendly:
        'Generated method postAssetLibraryStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContentFolderBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/batch`,
      data,
      op: 'postAssetLibraryStructuredContentFolderBatch',
      friendly:
        'Generated method postAssetLibraryStructuredContentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryStructuredContentFolderByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentFolderByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryStructuredContentFolderByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContentFoldersPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContentFoldersPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/export-batch`,
      data,
      op: 'postAssetLibraryStructuredContentFoldersPageExportBatch',
      friendly:
        'Generated method postAssetLibraryStructuredContentFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentFolderPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/permissions`,
      data,
      op: 'getAssetLibraryStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method getAssetLibraryStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryStructuredContentFolderPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-content-folders/permissions`,
      data,
      op: 'putAssetLibraryStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method putAssetLibraryStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents`,
      data,
      op: 'getAssetLibraryStructuredContentsPage',
      friendly: 'Generated method getAssetLibraryStructuredContentsPage failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContent(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents`,
      data,
      op: 'postAssetLibraryStructuredContent',
      friendly: 'Generated method postAssetLibraryStructuredContent failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContentBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/batch`,
      data,
      op: 'postAssetLibraryStructuredContentBatch',
      friendly:
        'Generated method postAssetLibraryStructuredContentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAssetLibraryStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteAssetLibraryStructuredContentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteAssetLibraryStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method deleteAssetLibraryStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getAssetLibraryStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method getAssetLibraryStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryStructuredContentByExternalReferenceCode(
    config,
    assetLibraryId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putAssetLibraryStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method putAssetLibraryStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postAssetLibraryStructuredContentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postAssetLibraryStructuredContentsPageExportBatch(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/export-batch`,
      data,
      op: 'postAssetLibraryStructuredContentsPageExportBatch',
      friendly:
        'Generated method postAssetLibraryStructuredContentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getAssetLibraryStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getAssetLibraryStructuredContentPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/permissions`,
      data,
      op: 'getAssetLibraryStructuredContentPermissionsPage',
      friendly:
        'Generated method getAssetLibraryStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putAssetLibraryStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putAssetLibraryStructuredContentPermissionsPage(
    config,
    assetLibraryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/asset-libraries/${assetLibraryId}/structured-contents/permissions`,
      data,
      op: 'putAssetLibraryStructuredContentPermissionsPage',
      friendly:
        'Generated method putAssetLibraryStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * deleteBlogPostingImageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteBlogPostingImageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/blog-posting-images/batch`,
      data,
      op: 'deleteBlogPostingImageBatch',
      friendly: 'Generated method deleteBlogPostingImageBatch failed',
      ...opts,
    });
  }

  /**
   * deleteBlogPostingImage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteBlogPostingImage(config, blogPostingImageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/blog-posting-images/${blogPostingImageId}`,
      data,
      op: 'deleteBlogPostingImage',
      friendly: 'Generated method deleteBlogPostingImage failed',
      ...opts,
    });
  }

  /**
   * getBlogPostingImage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPostingImage(config, blogPostingImageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-posting-images/${blogPostingImageId}`,
      data,
      op: 'getBlogPostingImage',
      friendly: 'Generated method getBlogPostingImage failed',
      ...opts,
    });
  }

  /**
   * deleteBlogPostingBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteBlogPostingBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/blog-postings/batch`,
      data,
      op: 'deleteBlogPostingBatch',
      friendly: 'Generated method deleteBlogPostingBatch failed',
      ...opts,
    });
  }

  /**
   * putBlogPostingBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putBlogPostingBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/blog-postings/batch`,
      data,
      op: 'putBlogPostingBatch',
      friendly: 'Generated method putBlogPostingBatch failed',
      ...opts,
    });
  }

  /**
   * deleteBlogPosting
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteBlogPosting(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
      data,
      op: 'deleteBlogPosting',
      friendly: 'Generated method deleteBlogPosting failed',
      ...opts,
    });
  }

  /**
   * getBlogPosting
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPosting(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
      data,
      op: 'getBlogPosting',
      friendly: 'Generated method getBlogPosting failed',
      ...opts,
    });
  }

  /**
   * patchBlogPosting
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchBlogPosting(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
      data,
      op: 'patchBlogPosting',
      friendly: 'Generated method patchBlogPosting failed',
      ...opts,
    });
  }

  /**
   * putBlogPosting
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putBlogPosting(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}`,
      data,
      op: 'putBlogPosting',
      friendly: 'Generated method putBlogPosting failed',
      ...opts,
    });
  }

  /**
   * getBlogPostingCommentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPostingCommentsPage(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/comments`,
      data,
      op: 'getBlogPostingCommentsPage',
      friendly: 'Generated method getBlogPostingCommentsPage failed',
      ...opts,
    });
  }

  /**
   * postBlogPostingComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postBlogPostingComment(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/comments`,
      data,
      op: 'postBlogPostingComment',
      friendly: 'Generated method postBlogPostingComment failed',
      ...opts,
    });
  }

  /**
   * postBlogPostingCommentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postBlogPostingCommentBatch(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/comments/batch`,
      data,
      op: 'postBlogPostingCommentBatch',
      friendly: 'Generated method postBlogPostingCommentBatch failed',
      ...opts,
    });
  }

  /**
   * postBlogPostingCommentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postBlogPostingCommentsPageExportBatch(
    config,
    blogPostingId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/comments/export-batch`,
      data,
      op: 'postBlogPostingCommentsPageExportBatch',
      friendly:
        'Generated method postBlogPostingCommentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteBlogPostingMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteBlogPostingMyRating(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/my-rating`,
      data,
      op: 'deleteBlogPostingMyRating',
      friendly: 'Generated method deleteBlogPostingMyRating failed',
      ...opts,
    });
  }

  /**
   * getBlogPostingMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPostingMyRating(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/my-rating`,
      data,
      op: 'getBlogPostingMyRating',
      friendly: 'Generated method getBlogPostingMyRating failed',
      ...opts,
    });
  }

  /**
   * postBlogPostingMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postBlogPostingMyRating(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/my-rating`,
      data,
      op: 'postBlogPostingMyRating',
      friendly: 'Generated method postBlogPostingMyRating failed',
      ...opts,
    });
  }

  /**
   * putBlogPostingMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putBlogPostingMyRating(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/my-rating`,
      data,
      op: 'putBlogPostingMyRating',
      friendly: 'Generated method putBlogPostingMyRating failed',
      ...opts,
    });
  }

  /**
   * getBlogPostingPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPostingPermissionsPage(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/permissions`,
      data,
      op: 'getBlogPostingPermissionsPage',
      friendly: 'Generated method getBlogPostingPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putBlogPostingPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putBlogPostingPermissionsPage(config, blogPostingId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/permissions`,
      data,
      op: 'putBlogPostingPermissionsPage',
      friendly: 'Generated method putBlogPostingPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getBlogPostingRenderedContentByDisplayPageDisplayPageKey
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getBlogPostingRenderedContentByDisplayPageDisplayPageKey(
    config,
    blogPostingId,
    displayPageKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/blog-postings/${blogPostingId}/rendered-content-by-display-page/${displayPageKey}`,
      data,
      op: 'getBlogPostingRenderedContentByDisplayPageDisplayPageKey',
      friendly:
        'Generated method getBlogPostingRenderedContentByDisplayPageDisplayPageKey failed',
      ...opts,
    });
  }

  /**
   * deleteCommentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteCommentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/comments/batch`,
      data,
      op: 'deleteCommentBatch',
      friendly: 'Generated method deleteCommentBatch failed',
      ...opts,
    });
  }

  /**
   * putCommentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putCommentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/comments/batch`,
      data,
      op: 'putCommentBatch',
      friendly: 'Generated method putCommentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteComment(config, commentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/comments/${commentId}`,
      data,
      op: 'deleteComment',
      friendly: 'Generated method deleteComment failed',
      ...opts,
    });
  }

  /**
   * getComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getComment(config, commentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/comments/${commentId}`,
      data,
      op: 'getComment',
      friendly: 'Generated method getComment failed',
      ...opts,
    });
  }

  /**
   * putComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putComment(config, commentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/comments/${commentId}`,
      data,
      op: 'putComment',
      friendly: 'Generated method putComment failed',
      ...opts,
    });
  }

  /**
   * getCommentCommentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getCommentCommentsPage(config, parentCommentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/comments/${parentCommentId}/comments`,
      data,
      op: 'getCommentCommentsPage',
      friendly: 'Generated method getCommentCommentsPage failed',
      ...opts,
    });
  }

  /**
   * postCommentComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postCommentComment(config, parentCommentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/comments/${parentCommentId}/comments`,
      data,
      op: 'postCommentComment',
      friendly: 'Generated method postCommentComment failed',
      ...opts,
    });
  }

  /**
   * getContentSetContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getContentSetContentSetElementsPage(
    config,
    contentSetId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/content-sets/${contentSetId}/content-set-elements`,
      data,
      op: 'getContentSetContentSetElementsPage',
      friendly: 'Generated method getContentSetContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getContentStructure
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getContentStructure(config, contentStructureId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/content-structures/${contentStructureId}`,
      data,
      op: 'getContentStructure',
      friendly: 'Generated method getContentStructure failed',
      ...opts,
    });
  }

  /**
   * getContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getContentStructurePermissionsPage(
    config,
    contentStructureId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/content-structures/${contentStructureId}/permissions`,
      data,
      op: 'getContentStructurePermissionsPage',
      friendly: 'Generated method getContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putContentStructurePermissionsPage(
    config,
    contentStructureId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/content-structures/${contentStructureId}/permissions`,
      data,
      op: 'putContentStructurePermissionsPage',
      friendly: 'Generated method putContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getContentStructureStructuredContentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getContentStructureStructuredContentsPage(
    config,
    contentStructureId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/content-structures/${contentStructureId}/structured-contents`,
      data,
      op: 'getContentStructureStructuredContentsPage',
      friendly:
        'Generated method getContentStructureStructuredContentsPage failed',
      ...opts,
    });
  }

  /**
   * postContentStructureStructuredContentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postContentStructureStructuredContentsPageExportBatch(
    config,
    contentStructureId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/content-structures/${contentStructureId}/structured-contents/export-batch`,
      data,
      op: 'postContentStructureStructuredContentsPageExportBatch',
      friendly:
        'Generated method postContentStructureStructuredContentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentDataDefinitionTypeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentDataDefinitionTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-data-definition-types/batch`,
      data,
      op: 'deleteDocumentDataDefinitionTypeBatch',
      friendly: 'Generated method deleteDocumentDataDefinitionTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentDataDefinitionType
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentDataDefinitionType(
    config,
    documentDataDefinitionTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-data-definition-types/${documentDataDefinitionTypeId}`,
      data,
      op: 'deleteDocumentDataDefinitionType',
      friendly: 'Generated method deleteDocumentDataDefinitionType failed',
      ...opts,
    });
  }

  /**
   * getDocumentDataDefinitionType
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentDataDefinitionType(
    config,
    documentDataDefinitionTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-data-definition-types/${documentDataDefinitionTypeId}`,
      data,
      op: 'getDocumentDataDefinitionType',
      friendly: 'Generated method getDocumentDataDefinitionType failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-folders/batch`,
      data,
      op: 'deleteDocumentFolderBatch',
      friendly: 'Generated method deleteDocumentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/batch`,
      data,
      op: 'putDocumentFolderBatch',
      friendly: 'Generated method putDocumentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentFolder(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}`,
      data,
      op: 'deleteDocumentFolder',
      friendly: 'Generated method deleteDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * getDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentFolder(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}`,
      data,
      op: 'getDocumentFolder',
      friendly: 'Generated method getDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * patchDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchDocumentFolder(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}`,
      data,
      op: 'patchDocumentFolder',
      friendly: 'Generated method patchDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolder(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}`,
      data,
      op: 'putDocumentFolder',
      friendly: 'Generated method putDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * getDocumentFolderDocumentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentFolderDocumentsPage(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/documents`,
      data,
      op: 'getDocumentFolderDocumentsPage',
      friendly: 'Generated method getDocumentFolderDocumentsPage failed',
      ...opts,
    });
  }

  /**
   * postDocumentFolderDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentFolderDocument(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/documents`,
      data,
      op: 'postDocumentFolderDocument',
      friendly: 'Generated method postDocumentFolderDocument failed',
      ...opts,
    });
  }

  /**
   * postDocumentFolderDocumentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentFolderDocumentBatch(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/documents/batch`,
      data,
      op: 'postDocumentFolderDocumentBatch',
      friendly: 'Generated method postDocumentFolderDocumentBatch failed',
      ...opts,
    });
  }

  /**
   * postDocumentFolderDocumentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentFolderDocumentsPageExportBatch(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/documents/export-batch`,
      data,
      op: 'postDocumentFolderDocumentsPageExportBatch',
      friendly:
        'Generated method postDocumentFolderDocumentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentFolderMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentFolderMyRating(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/my-rating`,
      data,
      op: 'deleteDocumentFolderMyRating',
      friendly: 'Generated method deleteDocumentFolderMyRating failed',
      ...opts,
    });
  }

  /**
   * getDocumentFolderMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentFolderMyRating(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/my-rating`,
      data,
      op: 'getDocumentFolderMyRating',
      friendly: 'Generated method getDocumentFolderMyRating failed',
      ...opts,
    });
  }

  /**
   * postDocumentFolderMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentFolderMyRating(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/my-rating`,
      data,
      op: 'postDocumentFolderMyRating',
      friendly: 'Generated method postDocumentFolderMyRating failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolderMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolderMyRating(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/my-rating`,
      data,
      op: 'putDocumentFolderMyRating',
      friendly: 'Generated method putDocumentFolderMyRating failed',
      ...opts,
    });
  }

  /**
   * getDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentFolderPermissionsPage(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/permissions`,
      data,
      op: 'getDocumentFolderPermissionsPage',
      friendly: 'Generated method getDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolderPermissionsPage(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/permissions`,
      data,
      op: 'putDocumentFolderPermissionsPage',
      friendly: 'Generated method putDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolderSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolderSubscribe(config, documentFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/subscribe`,
      data,
      op: 'putDocumentFolderSubscribe',
      friendly: 'Generated method putDocumentFolderSubscribe failed',
      ...opts,
    });
  }

  /**
   * putDocumentFolderUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentFolderUnsubscribe(
    config,
    documentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-folders/${documentFolderId}/unsubscribe`,
      data,
      op: 'putDocumentFolderUnsubscribe',
      friendly: 'Generated method putDocumentFolderUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getDocumentFolderDocumentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentFolderDocumentFoldersPage(
    config,
    parentDocumentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-folders/${parentDocumentFolderId}/document-folders`,
      data,
      op: 'getDocumentFolderDocumentFoldersPage',
      friendly: 'Generated method getDocumentFolderDocumentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postDocumentFolderDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentFolderDocumentFolder(
    config,
    parentDocumentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/document-folders/${parentDocumentFolderId}/document-folders`,
      data,
      op: 'postDocumentFolderDocumentFolder',
      friendly: 'Generated method postDocumentFolderDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentMetadataSetBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentMetadataSetBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-metadata-sets/batch`,
      data,
      op: 'deleteDocumentMetadataSetBatch',
      friendly: 'Generated method deleteDocumentMetadataSetBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentMetadataSet
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentMetadataSet(
    config,
    documentMetadataSetId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-metadata-sets/${documentMetadataSetId}`,
      data,
      op: 'deleteDocumentMetadataSet',
      friendly: 'Generated method deleteDocumentMetadataSet failed',
      ...opts,
    });
  }

  /**
   * getDocumentMetadataSet
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentMetadataSet(config, documentMetadataSetId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-metadata-sets/${documentMetadataSetId}`,
      data,
      op: 'getDocumentMetadataSet',
      friendly: 'Generated method getDocumentMetadataSet failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentShortcutBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentShortcutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-shortcuts/batch`,
      data,
      op: 'deleteDocumentShortcutBatch',
      friendly: 'Generated method deleteDocumentShortcutBatch failed',
      ...opts,
    });
  }

  /**
   * putDocumentShortcutBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentShortcutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-shortcuts/batch`,
      data,
      op: 'putDocumentShortcutBatch',
      friendly: 'Generated method putDocumentShortcutBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentShortcut(config, documentShortcutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/document-shortcuts/${documentShortcutId}`,
      data,
      op: 'deleteDocumentShortcut',
      friendly: 'Generated method deleteDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * getDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentShortcut(config, documentShortcutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/document-shortcuts/${documentShortcutId}`,
      data,
      op: 'getDocumentShortcut',
      friendly: 'Generated method getDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * patchDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchDocumentShortcut(config, documentShortcutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/document-shortcuts/${documentShortcutId}`,
      data,
      op: 'patchDocumentShortcut',
      friendly: 'Generated method patchDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * putDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentShortcut(config, documentShortcutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/document-shortcuts/${documentShortcutId}`,
      data,
      op: 'putDocumentShortcut',
      friendly: 'Generated method putDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/documents/batch`,
      data,
      op: 'deleteDocumentBatch',
      friendly: 'Generated method deleteDocumentBatch failed',
      ...opts,
    });
  }

  /**
   * putDocumentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/documents/batch`,
      data,
      op: 'putDocumentBatch',
      friendly: 'Generated method putDocumentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocument(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/documents/${documentId}`,
      data,
      op: 'deleteDocument',
      friendly: 'Generated method deleteDocument failed',
      ...opts,
    });
  }

  /**
   * getDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocument(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/documents/${documentId}`,
      data,
      op: 'getDocument',
      friendly: 'Generated method getDocument failed',
      ...opts,
    });
  }

  /**
   * patchDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchDocument(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/documents/${documentId}`,
      data,
      op: 'patchDocument',
      friendly: 'Generated method patchDocument failed',
      ...opts,
    });
  }

  /**
   * putDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocument(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/documents/${documentId}`,
      data,
      op: 'putDocument',
      friendly: 'Generated method putDocument failed',
      ...opts,
    });
  }

  /**
   * getDocumentCommentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentCommentsPage(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/comments`,
      data,
      op: 'getDocumentCommentsPage',
      friendly: 'Generated method getDocumentCommentsPage failed',
      ...opts,
    });
  }

  /**
   * postDocumentComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentComment(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/comments`,
      data,
      op: 'postDocumentComment',
      friendly: 'Generated method postDocumentComment failed',
      ...opts,
    });
  }

  /**
   * postDocumentCommentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentCommentBatch(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/comments/batch`,
      data,
      op: 'postDocumentCommentBatch',
      friendly: 'Generated method postDocumentCommentBatch failed',
      ...opts,
    });
  }

  /**
   * postDocumentCommentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentCommentsPageExportBatch(
    config,
    documentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/comments/export-batch`,
      data,
      op: 'postDocumentCommentsPageExportBatch',
      friendly: 'Generated method postDocumentCommentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDocumentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteDocumentMyRating(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/my-rating`,
      data,
      op: 'deleteDocumentMyRating',
      friendly: 'Generated method deleteDocumentMyRating failed',
      ...opts,
    });
  }

  /**
   * getDocumentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentMyRating(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/my-rating`,
      data,
      op: 'getDocumentMyRating',
      friendly: 'Generated method getDocumentMyRating failed',
      ...opts,
    });
  }

  /**
   * postDocumentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postDocumentMyRating(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/my-rating`,
      data,
      op: 'postDocumentMyRating',
      friendly: 'Generated method postDocumentMyRating failed',
      ...opts,
    });
  }

  /**
   * putDocumentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentMyRating(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/my-rating`,
      data,
      op: 'putDocumentMyRating',
      friendly: 'Generated method putDocumentMyRating failed',
      ...opts,
    });
  }

  /**
   * getDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentPermissionsPage(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/permissions`,
      data,
      op: 'getDocumentPermissionsPage',
      friendly: 'Generated method getDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putDocumentPermissionsPage(config, documentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/permissions`,
      data,
      op: 'putDocumentPermissionsPage',
      friendly: 'Generated method putDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getDocumentRenderedContentByDisplayPageDisplayPageKey
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getDocumentRenderedContentByDisplayPageDisplayPageKey(
    config,
    documentId,
    displayPageKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/documents/${documentId}/rendered-content-by-display-page/${displayPageKey}`,
      data,
      op: 'getDocumentRenderedContentByDisplayPageDisplayPageKey',
      friendly:
        'Generated method getDocumentRenderedContentByDisplayPageDisplayPageKey failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseArticleBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseArticleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/batch`,
      data,
      op: 'deleteKnowledgeBaseArticleBatch',
      friendly: 'Generated method deleteKnowledgeBaseArticleBatch failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticleBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/batch`,
      data,
      op: 'putKnowledgeBaseArticleBatch',
      friendly: 'Generated method putKnowledgeBaseArticleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseArticle(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}`,
      data,
      op: 'deleteKnowledgeBaseArticle',
      friendly: 'Generated method deleteKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseArticle(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}`,
      data,
      op: 'getKnowledgeBaseArticle',
      friendly: 'Generated method getKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * patchKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchKnowledgeBaseArticle(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}`,
      data,
      op: 'patchKnowledgeBaseArticle',
      friendly: 'Generated method patchKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticle(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}`,
      data,
      op: 'putKnowledgeBaseArticle',
      friendly: 'Generated method putKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseArticleKnowledgeBaseAttachmentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseArticleKnowledgeBaseAttachmentsPage(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/knowledge-base-attachments`,
      data,
      op: 'getKnowledgeBaseArticleKnowledgeBaseAttachmentsPage',
      friendly:
        'Generated method getKnowledgeBaseArticleKnowledgeBaseAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseArticleKnowledgeBaseAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseArticleKnowledgeBaseAttachment(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/knowledge-base-attachments`,
      data,
      op: 'postKnowledgeBaseArticleKnowledgeBaseAttachment',
      friendly:
        'Generated method postKnowledgeBaseArticleKnowledgeBaseAttachment failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseArticleKnowledgeBaseAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseArticleKnowledgeBaseAttachmentBatch(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/knowledge-base-attachments/batch`,
      data,
      op: 'postKnowledgeBaseArticleKnowledgeBaseAttachmentBatch',
      friendly:
        'Generated method postKnowledgeBaseArticleKnowledgeBaseAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseArticleKnowledgeBaseAttachmentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseArticleKnowledgeBaseAttachmentsPageExportBatch(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/knowledge-base-attachments/export-batch`,
      data,
      op: 'postKnowledgeBaseArticleKnowledgeBaseAttachmentsPageExportBatch',
      friendly:
        'Generated method postKnowledgeBaseArticleKnowledgeBaseAttachmentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseArticleMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseArticleMyRating(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/my-rating`,
      data,
      op: 'deleteKnowledgeBaseArticleMyRating',
      friendly: 'Generated method deleteKnowledgeBaseArticleMyRating failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseArticleMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseArticleMyRating(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/my-rating`,
      data,
      op: 'getKnowledgeBaseArticleMyRating',
      friendly: 'Generated method getKnowledgeBaseArticleMyRating failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseArticleMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseArticleMyRating(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/my-rating`,
      data,
      op: 'postKnowledgeBaseArticleMyRating',
      friendly: 'Generated method postKnowledgeBaseArticleMyRating failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticleMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticleMyRating(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/my-rating`,
      data,
      op: 'putKnowledgeBaseArticleMyRating',
      friendly: 'Generated method putKnowledgeBaseArticleMyRating failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseArticlePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseArticlePermissionsPage(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/permissions`,
      data,
      op: 'getKnowledgeBaseArticlePermissionsPage',
      friendly:
        'Generated method getKnowledgeBaseArticlePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticlePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticlePermissionsPage(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/permissions`,
      data,
      op: 'putKnowledgeBaseArticlePermissionsPage',
      friendly:
        'Generated method putKnowledgeBaseArticlePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticleSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticleSubscribe(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/subscribe`,
      data,
      op: 'putKnowledgeBaseArticleSubscribe',
      friendly: 'Generated method putKnowledgeBaseArticleSubscribe failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseArticleUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseArticleUnsubscribe(
    config,
    knowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${knowledgeBaseArticleId}/unsubscribe`,
      data,
      op: 'putKnowledgeBaseArticleUnsubscribe',
      friendly: 'Generated method putKnowledgeBaseArticleUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseArticleKnowledgeBaseArticlesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseArticleKnowledgeBaseArticlesPage(
    config,
    parentKnowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${parentKnowledgeBaseArticleId}/knowledge-base-articles`,
      data,
      op: 'getKnowledgeBaseArticleKnowledgeBaseArticlesPage',
      friendly:
        'Generated method getKnowledgeBaseArticleKnowledgeBaseArticlesPage failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseArticleKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseArticleKnowledgeBaseArticle(
    config,
    parentKnowledgeBaseArticleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-articles/${parentKnowledgeBaseArticleId}/knowledge-base-articles`,
      data,
      op: 'postKnowledgeBaseArticleKnowledgeBaseArticle',
      friendly:
        'Generated method postKnowledgeBaseArticleKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseAttachmentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-attachments/batch`,
      data,
      op: 'deleteKnowledgeBaseAttachmentBatch',
      friendly: 'Generated method deleteKnowledgeBaseAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseAttachment(
    config,
    knowledgeBaseAttachmentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-attachments/${knowledgeBaseAttachmentId}`,
      data,
      op: 'deleteKnowledgeBaseAttachment',
      friendly: 'Generated method deleteKnowledgeBaseAttachment failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseAttachment(
    config,
    knowledgeBaseAttachmentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-attachments/${knowledgeBaseAttachmentId}`,
      data,
      op: 'getKnowledgeBaseAttachment',
      friendly: 'Generated method getKnowledgeBaseAttachment failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/batch`,
      data,
      op: 'deleteKnowledgeBaseFolderBatch',
      friendly: 'Generated method deleteKnowledgeBaseFolderBatch failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/batch`,
      data,
      op: 'putKnowledgeBaseFolderBatch',
      friendly: 'Generated method putKnowledgeBaseFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteKnowledgeBaseFolder(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}`,
      data,
      op: 'deleteKnowledgeBaseFolder',
      friendly: 'Generated method deleteKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseFolder(config, knowledgeBaseFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}`,
      data,
      op: 'getKnowledgeBaseFolder',
      friendly: 'Generated method getKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * patchKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchKnowledgeBaseFolder(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}`,
      data,
      op: 'patchKnowledgeBaseFolder',
      friendly: 'Generated method patchKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseFolder(config, knowledgeBaseFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}`,
      data,
      op: 'putKnowledgeBaseFolder',
      friendly: 'Generated method putKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseFolderKnowledgeBaseArticlesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseFolderKnowledgeBaseArticlesPage(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/knowledge-base-articles`,
      data,
      op: 'getKnowledgeBaseFolderKnowledgeBaseArticlesPage',
      friendly:
        'Generated method getKnowledgeBaseFolderKnowledgeBaseArticlesPage failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseFolderKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseFolderKnowledgeBaseArticle(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/knowledge-base-articles`,
      data,
      op: 'postKnowledgeBaseFolderKnowledgeBaseArticle',
      friendly:
        'Generated method postKnowledgeBaseFolderKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseFolderKnowledgeBaseArticleBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseFolderKnowledgeBaseArticleBatch(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/knowledge-base-articles/batch`,
      data,
      op: 'postKnowledgeBaseFolderKnowledgeBaseArticleBatch',
      friendly:
        'Generated method postKnowledgeBaseFolderKnowledgeBaseArticleBatch failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseFolderKnowledgeBaseArticlesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseFolderKnowledgeBaseArticlesPageExportBatch(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/knowledge-base-articles/export-batch`,
      data,
      op: 'postKnowledgeBaseFolderKnowledgeBaseArticlesPageExportBatch',
      friendly:
        'Generated method postKnowledgeBaseFolderKnowledgeBaseArticlesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseFolderPermissionsPage(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/permissions`,
      data,
      op: 'getKnowledgeBaseFolderPermissionsPage',
      friendly: 'Generated method getKnowledgeBaseFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putKnowledgeBaseFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putKnowledgeBaseFolderPermissionsPage(
    config,
    knowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${knowledgeBaseFolderId}/permissions`,
      data,
      op: 'putKnowledgeBaseFolderPermissionsPage',
      friendly: 'Generated method putKnowledgeBaseFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getKnowledgeBaseFolderKnowledgeBaseFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getKnowledgeBaseFolderKnowledgeBaseFoldersPage(
    config,
    parentKnowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${parentKnowledgeBaseFolderId}/knowledge-base-folders`,
      data,
      op: 'getKnowledgeBaseFolderKnowledgeBaseFoldersPage',
      friendly:
        'Generated method getKnowledgeBaseFolderKnowledgeBaseFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postKnowledgeBaseFolderKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postKnowledgeBaseFolderKnowledgeBaseFolder(
    config,
    parentKnowledgeBaseFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/knowledge-base-folders/${parentKnowledgeBaseFolderId}/knowledge-base-folders`,
      data,
      op: 'postKnowledgeBaseFolderKnowledgeBaseFolder',
      friendly:
        'Generated method postKnowledgeBaseFolderKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardAttachmentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-attachments/batch`,
      data,
      op: 'deleteMessageBoardAttachmentBatch',
      friendly: 'Generated method deleteMessageBoardAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardAttachment(
    config,
    messageBoardAttachmentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-attachments/${messageBoardAttachmentId}`,
      data,
      op: 'deleteMessageBoardAttachment',
      friendly: 'Generated method deleteMessageBoardAttachment failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardAttachment(
    config,
    messageBoardAttachmentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-attachments/${messageBoardAttachmentId}`,
      data,
      op: 'getMessageBoardAttachment',
      friendly: 'Generated method getMessageBoardAttachment failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardMessageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardMessageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-messages/batch`,
      data,
      op: 'deleteMessageBoardMessageBatch',
      friendly: 'Generated method deleteMessageBoardMessageBatch failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/batch`,
      data,
      op: 'putMessageBoardMessageBatch',
      friendly: 'Generated method putMessageBoardMessageBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardMessage(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}`,
      data,
      op: 'deleteMessageBoardMessage',
      friendly: 'Generated method deleteMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardMessage(config, messageBoardMessageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}`,
      data,
      op: 'getMessageBoardMessage',
      friendly: 'Generated method getMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * patchMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchMessageBoardMessage(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}`,
      data,
      op: 'patchMessageBoardMessage',
      friendly: 'Generated method patchMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessage(config, messageBoardMessageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}`,
      data,
      op: 'putMessageBoardMessage',
      friendly: 'Generated method putMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageMarkAsAnswer
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageMarkAsAnswer(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/mark-as-answer`,
      data,
      op: 'putMessageBoardMessageMarkAsAnswer',
      friendly: 'Generated method putMessageBoardMessageMarkAsAnswer failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardMessageMessageBoardAttachmentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardMessageMessageBoardAttachmentsPage(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/message-board-attachments`,
      data,
      op: 'getMessageBoardMessageMessageBoardAttachmentsPage',
      friendly:
        'Generated method getMessageBoardMessageMessageBoardAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardMessageMessageBoardAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardMessageMessageBoardAttachment(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/message-board-attachments`,
      data,
      op: 'postMessageBoardMessageMessageBoardAttachment',
      friendly:
        'Generated method postMessageBoardMessageMessageBoardAttachment failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardMessageMessageBoardAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardMessageMessageBoardAttachmentBatch(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/message-board-attachments/batch`,
      data,
      op: 'postMessageBoardMessageMessageBoardAttachmentBatch',
      friendly:
        'Generated method postMessageBoardMessageMessageBoardAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardMessageMessageBoardAttachmentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardMessageMessageBoardAttachmentsPageExportBatch(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/message-board-attachments/export-batch`,
      data,
      op: 'postMessageBoardMessageMessageBoardAttachmentsPageExportBatch',
      friendly:
        'Generated method postMessageBoardMessageMessageBoardAttachmentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardMessageMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardMessageMyRating(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/my-rating`,
      data,
      op: 'deleteMessageBoardMessageMyRating',
      friendly: 'Generated method deleteMessageBoardMessageMyRating failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardMessageMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardMessageMyRating(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/my-rating`,
      data,
      op: 'getMessageBoardMessageMyRating',
      friendly: 'Generated method getMessageBoardMessageMyRating failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardMessageMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardMessageMyRating(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/my-rating`,
      data,
      op: 'postMessageBoardMessageMyRating',
      friendly: 'Generated method postMessageBoardMessageMyRating failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageMyRating(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/my-rating`,
      data,
      op: 'putMessageBoardMessageMyRating',
      friendly: 'Generated method putMessageBoardMessageMyRating failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardMessagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardMessagePermissionsPage(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/permissions`,
      data,
      op: 'getMessageBoardMessagePermissionsPage',
      friendly: 'Generated method getMessageBoardMessagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessagePermissionsPage(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/permissions`,
      data,
      op: 'putMessageBoardMessagePermissionsPage',
      friendly: 'Generated method putMessageBoardMessagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageSubscribe(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/subscribe`,
      data,
      op: 'putMessageBoardMessageSubscribe',
      friendly: 'Generated method putMessageBoardMessageSubscribe failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageUnmarkAsAnswer
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageUnmarkAsAnswer(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/unmark-as-answer`,
      data,
      op: 'putMessageBoardMessageUnmarkAsAnswer',
      friendly: 'Generated method putMessageBoardMessageUnmarkAsAnswer failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardMessageUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardMessageUnsubscribe(
    config,
    messageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-messages/${messageBoardMessageId}/unsubscribe`,
      data,
      op: 'putMessageBoardMessageUnsubscribe',
      friendly: 'Generated method putMessageBoardMessageUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardMessageMessageBoardMessagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardMessageMessageBoardMessagesPage(
    config,
    parentMessageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-messages/${parentMessageBoardMessageId}/message-board-messages`,
      data,
      op: 'getMessageBoardMessageMessageBoardMessagesPage',
      friendly:
        'Generated method getMessageBoardMessageMessageBoardMessagesPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardMessageMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardMessageMessageBoardMessage(
    config,
    parentMessageBoardMessageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-messages/${parentMessageBoardMessageId}/message-board-messages`,
      data,
      op: 'postMessageBoardMessageMessageBoardMessage',
      friendly:
        'Generated method postMessageBoardMessageMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardSectionBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardSectionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-sections/batch`,
      data,
      op: 'deleteMessageBoardSectionBatch',
      friendly: 'Generated method deleteMessageBoardSectionBatch failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardSectionBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardSectionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-sections/batch`,
      data,
      op: 'putMessageBoardSectionBatch',
      friendly: 'Generated method putMessageBoardSectionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardSection(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}`,
      data,
      op: 'deleteMessageBoardSection',
      friendly: 'Generated method deleteMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardSection(config, messageBoardSectionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}`,
      data,
      op: 'getMessageBoardSection',
      friendly: 'Generated method getMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * patchMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchMessageBoardSection(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}`,
      data,
      op: 'patchMessageBoardSection',
      friendly: 'Generated method patchMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardSection(config, messageBoardSectionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}`,
      data,
      op: 'putMessageBoardSection',
      friendly: 'Generated method putMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardSectionMessageBoardThreadsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardSectionMessageBoardThreadsPage(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/message-board-threads`,
      data,
      op: 'getMessageBoardSectionMessageBoardThreadsPage',
      friendly:
        'Generated method getMessageBoardSectionMessageBoardThreadsPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardSectionMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardSectionMessageBoardThread(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/message-board-threads`,
      data,
      op: 'postMessageBoardSectionMessageBoardThread',
      friendly:
        'Generated method postMessageBoardSectionMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardSectionMessageBoardThreadBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardSectionMessageBoardThreadBatch(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/message-board-threads/batch`,
      data,
      op: 'postMessageBoardSectionMessageBoardThreadBatch',
      friendly:
        'Generated method postMessageBoardSectionMessageBoardThreadBatch failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardSectionMessageBoardThreadsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardSectionMessageBoardThreadsPageExportBatch(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/message-board-threads/export-batch`,
      data,
      op: 'postMessageBoardSectionMessageBoardThreadsPageExportBatch',
      friendly:
        'Generated method postMessageBoardSectionMessageBoardThreadsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardSectionPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardSectionPermissionsPage(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/permissions`,
      data,
      op: 'getMessageBoardSectionPermissionsPage',
      friendly: 'Generated method getMessageBoardSectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardSectionPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardSectionPermissionsPage(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/permissions`,
      data,
      op: 'putMessageBoardSectionPermissionsPage',
      friendly: 'Generated method putMessageBoardSectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardSectionSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardSectionSubscribe(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/subscribe`,
      data,
      op: 'putMessageBoardSectionSubscribe',
      friendly: 'Generated method putMessageBoardSectionSubscribe failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardSectionUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardSectionUnsubscribe(
    config,
    messageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-sections/${messageBoardSectionId}/unsubscribe`,
      data,
      op: 'putMessageBoardSectionUnsubscribe',
      friendly: 'Generated method putMessageBoardSectionUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardSectionMessageBoardSectionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardSectionMessageBoardSectionsPage(
    config,
    parentMessageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-sections/${parentMessageBoardSectionId}/message-board-sections`,
      data,
      op: 'getMessageBoardSectionMessageBoardSectionsPage',
      friendly:
        'Generated method getMessageBoardSectionMessageBoardSectionsPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardSectionMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardSectionMessageBoardSection(
    config,
    parentMessageBoardSectionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-sections/${parentMessageBoardSectionId}/message-board-sections`,
      data,
      op: 'postMessageBoardSectionMessageBoardSection',
      friendly:
        'Generated method postMessageBoardSectionMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardThreadBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardThreadBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-threads/batch`,
      data,
      op: 'deleteMessageBoardThreadBatch',
      friendly: 'Generated method deleteMessageBoardThreadBatch failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThreadBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThreadBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/batch`,
      data,
      op: 'putMessageBoardThreadBatch',
      friendly: 'Generated method putMessageBoardThreadBatch failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThreadsRankedPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThreadsRankedPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/ranked`,
      data,
      op: 'getMessageBoardThreadsRankedPage',
      friendly: 'Generated method getMessageBoardThreadsRankedPage failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardThread(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}`,
      data,
      op: 'deleteMessageBoardThread',
      friendly: 'Generated method deleteMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThread(config, messageBoardThreadId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}`,
      data,
      op: 'getMessageBoardThread',
      friendly: 'Generated method getMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * patchMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchMessageBoardThread(config, messageBoardThreadId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}`,
      data,
      op: 'patchMessageBoardThread',
      friendly: 'Generated method patchMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThread(config, messageBoardThreadId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}`,
      data,
      op: 'putMessageBoardThread',
      friendly: 'Generated method putMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThreadMessageBoardAttachmentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThreadMessageBoardAttachmentsPage(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-attachments`,
      data,
      op: 'getMessageBoardThreadMessageBoardAttachmentsPage',
      friendly:
        'Generated method getMessageBoardThreadMessageBoardAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardAttachment(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-attachments`,
      data,
      op: 'postMessageBoardThreadMessageBoardAttachment',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardAttachment failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardAttachmentBatch(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-attachments/batch`,
      data,
      op: 'postMessageBoardThreadMessageBoardAttachmentBatch',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardAttachmentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardAttachmentsPageExportBatch(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-attachments/export-batch`,
      data,
      op: 'postMessageBoardThreadMessageBoardAttachmentsPageExportBatch',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardAttachmentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThreadMessageBoardMessagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThreadMessageBoardMessagesPage(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-messages`,
      data,
      op: 'getMessageBoardThreadMessageBoardMessagesPage',
      friendly:
        'Generated method getMessageBoardThreadMessageBoardMessagesPage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardMessage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardMessage(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-messages`,
      data,
      op: 'postMessageBoardThreadMessageBoardMessage',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardMessage failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardMessageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardMessageBatch(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-messages/batch`,
      data,
      op: 'postMessageBoardThreadMessageBoardMessageBatch',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardMessageBatch failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMessageBoardMessagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMessageBoardMessagesPageExportBatch(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/message-board-messages/export-batch`,
      data,
      op: 'postMessageBoardThreadMessageBoardMessagesPageExportBatch',
      friendly:
        'Generated method postMessageBoardThreadMessageBoardMessagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMessageBoardThreadMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteMessageBoardThreadMyRating(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/my-rating`,
      data,
      op: 'deleteMessageBoardThreadMyRating',
      friendly: 'Generated method deleteMessageBoardThreadMyRating failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThreadMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThreadMyRating(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/my-rating`,
      data,
      op: 'getMessageBoardThreadMyRating',
      friendly: 'Generated method getMessageBoardThreadMyRating failed',
      ...opts,
    });
  }

  /**
   * postMessageBoardThreadMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postMessageBoardThreadMyRating(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/my-rating`,
      data,
      op: 'postMessageBoardThreadMyRating',
      friendly: 'Generated method postMessageBoardThreadMyRating failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThreadMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThreadMyRating(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/my-rating`,
      data,
      op: 'putMessageBoardThreadMyRating',
      friendly: 'Generated method putMessageBoardThreadMyRating failed',
      ...opts,
    });
  }

  /**
   * getMessageBoardThreadPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getMessageBoardThreadPermissionsPage(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/permissions`,
      data,
      op: 'getMessageBoardThreadPermissionsPage',
      friendly: 'Generated method getMessageBoardThreadPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThreadPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThreadPermissionsPage(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/permissions`,
      data,
      op: 'putMessageBoardThreadPermissionsPage',
      friendly: 'Generated method putMessageBoardThreadPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThreadSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThreadSubscribe(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/subscribe`,
      data,
      op: 'putMessageBoardThreadSubscribe',
      friendly: 'Generated method putMessageBoardThreadSubscribe failed',
      ...opts,
    });
  }

  /**
   * putMessageBoardThreadUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putMessageBoardThreadUnsubscribe(
    config,
    messageBoardThreadId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/message-board-threads/${messageBoardThreadId}/unsubscribe`,
      data,
      op: 'putMessageBoardThreadUnsubscribe',
      friendly: 'Generated method putMessageBoardThreadUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * deleteNavigationMenuBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteNavigationMenuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/navigation-menus/batch`,
      data,
      op: 'deleteNavigationMenuBatch',
      friendly: 'Generated method deleteNavigationMenuBatch failed',
      ...opts,
    });
  }

  /**
   * putNavigationMenuBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putNavigationMenuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/navigation-menus/batch`,
      data,
      op: 'putNavigationMenuBatch',
      friendly: 'Generated method putNavigationMenuBatch failed',
      ...opts,
    });
  }

  /**
   * deleteNavigationMenu
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteNavigationMenu(config, navigationMenuId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/navigation-menus/${navigationMenuId}`,
      data,
      op: 'deleteNavigationMenu',
      friendly: 'Generated method deleteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * getNavigationMenu
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getNavigationMenu(config, navigationMenuId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/navigation-menus/${navigationMenuId}`,
      data,
      op: 'getNavigationMenu',
      friendly: 'Generated method getNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * putNavigationMenu
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putNavigationMenu(config, navigationMenuId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/navigation-menus/${navigationMenuId}`,
      data,
      op: 'putNavigationMenu',
      friendly: 'Generated method putNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * getNavigationMenuPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getNavigationMenuPermissionsPage(
    config,
    navigationMenuId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/navigation-menus/${navigationMenuId}/permissions`,
      data,
      op: 'getNavigationMenuPermissionsPage',
      friendly: 'Generated method getNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putNavigationMenuPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putNavigationMenuPermissionsPage(
    config,
    navigationMenuId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/navigation-menus/${navigationMenuId}/permissions`,
      data,
      op: 'putNavigationMenuPermissionsPage',
      friendly: 'Generated method putNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingImagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingImagesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images`,
      data,
      op: 'getSiteBlogPostingImagesPage',
      friendly: 'Generated method getSiteBlogPostingImagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPostingImage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPostingImage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images`,
      data,
      op: 'postSiteBlogPostingImage',
      friendly: 'Generated method postSiteBlogPostingImage failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPostingImageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPostingImageBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images/batch`,
      data,
      op: 'postSiteBlogPostingImageBatch',
      friendly: 'Generated method postSiteBlogPostingImageBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteBlogPostingImageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteBlogPostingImageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteBlogPostingImageByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteBlogPostingImageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingImageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingImageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteBlogPostingImageByExternalReferenceCode',
      friendly:
        'Generated method getSiteBlogPostingImageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPostingImagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPostingImagesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-posting-images/export-batch`,
      data,
      op: 'postSiteBlogPostingImagesPageExportBatch',
      friendly:
        'Generated method postSiteBlogPostingImagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
      data,
      op: 'getSiteBlogPostingsPage',
      friendly: 'Generated method getSiteBlogPostingsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPosting
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPosting(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
      data,
      op: 'postSiteBlogPosting',
      friendly: 'Generated method postSiteBlogPosting failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPostingBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPostingBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/batch`,
      data,
      op: 'postSiteBlogPostingBatch',
      friendly: 'Generated method postSiteBlogPostingBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    blogPostingExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${blogPostingExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    blogPostingExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${blogPostingExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method getSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    blogPostingExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${blogPostingExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method putSiteBlogPostingByExternalReferenceCodeBlogPostingExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteBlogPostingByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteBlogPostingByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteBlogPostingByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteBlogPostingByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteBlogPostingByExternalReferenceCode',
      friendly:
        'Generated method getSiteBlogPostingByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteBlogPostingByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteBlogPostingByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteBlogPostingByExternalReferenceCode',
      friendly:
        'Generated method putSiteBlogPostingByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteBlogPostingsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteBlogPostingsPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/export-batch`,
      data,
      op: 'postSiteBlogPostingsPageExportBatch',
      friendly: 'Generated method postSiteBlogPostingsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteBlogPostingPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteBlogPostingPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/permissions`,
      data,
      op: 'getSiteBlogPostingPermissionsPage',
      friendly: 'Generated method getSiteBlogPostingPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteBlogPostingPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteBlogPostingPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/permissions`,
      data,
      op: 'putSiteBlogPostingPermissionsPage',
      friendly: 'Generated method putSiteBlogPostingPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteBlogPostingSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteBlogPostingSubscribe(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/subscribe`,
      data,
      op: 'putSiteBlogPostingSubscribe',
      friendly: 'Generated method putSiteBlogPostingSubscribe failed',
      ...opts,
    });
  }

  /**
   * putSiteBlogPostingUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteBlogPostingUnsubscribe(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/unsubscribe`,
      data,
      op: 'putSiteBlogPostingUnsubscribe',
      friendly: 'Generated method putSiteBlogPostingUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * deleteSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    parentCommentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/comments/by-external-reference-code/${parentCommentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    parentCommentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/comments/by-external-reference-code/${parentCommentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method getSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    parentCommentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/comments/by-external-reference-code/${parentCommentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method putSiteCommentByExternalReferenceCodeParentCommentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteContentElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentElementsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-elements`,
      data,
      op: 'getSiteContentElementsPage',
      friendly: 'Generated method getSiteContentElementsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteContentElementsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteContentElementsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-elements/export-batch`,
      data,
      op: 'postSiteContentElementsPageExportBatch',
      friendly:
        'Generated method postSiteContentElementsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteContentSetProviderByKeyContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentSetProviderByKeyContentSetElementsPage(
    config,
    siteId,
    key,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-set-providers/by-key/${key}/content-set-elements`,
      data,
      op: 'getSiteContentSetProviderByKeyContentSetElementsPage',
      friendly:
        'Generated method getSiteContentSetProviderByKeyContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteContentSetByKeyContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentSetByKeyContentSetElementsPage(
    config,
    siteId,
    key,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-sets/by-key/${key}/content-set-elements`,
      data,
      op: 'getSiteContentSetByKeyContentSetElementsPage',
      friendly:
        'Generated method getSiteContentSetByKeyContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteContentSetByUuidContentSetElementsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentSetByUuidContentSetElementsPage(
    config,
    siteId,
    uuid,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-sets/by-uuid/${uuid}/content-set-elements`,
      data,
      op: 'getSiteContentSetByUuidContentSetElementsPage',
      friendly:
        'Generated method getSiteContentSetByUuidContentSetElementsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteContentStructuresPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentStructuresPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-structures`,
      data,
      op: 'getSiteContentStructuresPage',
      friendly: 'Generated method getSiteContentStructuresPage failed',
      ...opts,
    });
  }

  /**
   * postSiteContentStructuresPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteContentStructuresPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-structures/export-batch`,
      data,
      op: 'postSiteContentStructuresPageExportBatch',
      friendly:
        'Generated method postSiteContentStructuresPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentStructurePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-structures/permissions`,
      data,
      op: 'getSiteContentStructurePermissionsPage',
      friendly:
        'Generated method getSiteContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteContentStructurePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteContentStructurePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-structures/permissions`,
      data,
      op: 'putSiteContentStructurePermissionsPage',
      friendly:
        'Generated method putSiteContentStructurePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteContentTemplatesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentTemplatesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-templates`,
      data,
      op: 'getSiteContentTemplatesPage',
      friendly: 'Generated method getSiteContentTemplatesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteContentTemplatesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteContentTemplatesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-templates/export-batch`,
      data,
      op: 'postSiteContentTemplatesPageExportBatch',
      friendly:
        'Generated method postSiteContentTemplatesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteContentTemplate
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteContentTemplate(
    config,
    siteId,
    contentTemplateId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/content-templates/${contentTemplateId}`,
      data,
      op: 'getSiteContentTemplate',
      friendly: 'Generated method getSiteContentTemplate failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentDataDefinitionTypesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentDataDefinitionTypesPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-data-definition-types`,
      data,
      op: 'getSiteDocumentDataDefinitionTypesPage',
      friendly:
        'Generated method getSiteDocumentDataDefinitionTypesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentDataDefinitionType
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentDataDefinitionType(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-data-definition-types`,
      data,
      op: 'postSiteDocumentDataDefinitionType',
      friendly: 'Generated method postSiteDocumentDataDefinitionType failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentDataDefinitionTypeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentDataDefinitionTypeBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-data-definition-types/batch`,
      data,
      op: 'postSiteDocumentDataDefinitionTypeBatch',
      friendly:
        'Generated method postSiteDocumentDataDefinitionTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentDataDefinitionTypesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentDataDefinitionTypesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-data-definition-types/export-batch`,
      data,
      op: 'postSiteDocumentDataDefinitionTypesPageExportBatch',
      friendly:
        'Generated method postSiteDocumentDataDefinitionTypesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentFoldersPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders`,
      data,
      op: 'getSiteDocumentFoldersPage',
      friendly: 'Generated method getSiteDocumentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentFolder(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders`,
      data,
      op: 'postSiteDocumentFolder',
      friendly: 'Generated method postSiteDocumentFolder failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentFolderBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders/batch`,
      data,
      op: 'postSiteDocumentFolderBatch',
      friendly: 'Generated method postSiteDocumentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentFoldersPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentFoldersPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders/export-batch`,
      data,
      op: 'postSiteDocumentFoldersPageExportBatch',
      friendly:
        'Generated method postSiteDocumentFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentFolderPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders/permissions`,
      data,
      op: 'getSiteDocumentFolderPermissionsPage',
      friendly: 'Generated method getSiteDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentFolderPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders/permissions`,
      data,
      op: 'putSiteDocumentFolderPermissionsPage',
      friendly: 'Generated method putSiteDocumentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentFoldersRatedByMePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentFoldersRatedByMePage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-folders/rated-by-me`,
      data,
      op: 'getSiteDocumentFoldersRatedByMePage',
      friendly: 'Generated method getSiteDocumentFoldersRatedByMePage failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentMetadataSetsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentMetadataSetsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets`,
      data,
      op: 'getSiteDocumentMetadataSetsPage',
      friendly: 'Generated method getSiteDocumentMetadataSetsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentMetadataSet
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentMetadataSet(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets`,
      data,
      op: 'postSiteDocumentMetadataSet',
      friendly: 'Generated method postSiteDocumentMetadataSet failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentMetadataSetBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentMetadataSetBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets/batch`,
      data,
      op: 'postSiteDocumentMetadataSetBatch',
      friendly: 'Generated method postSiteDocumentMetadataSetBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteDocumentMetadataSetByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentMetadataSetByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method getSiteDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentMetadataSetByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentMetadataSetByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDocumentMetadataSetByExternalReferenceCode',
      friendly:
        'Generated method putSiteDocumentMetadataSetByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentMetadataSetsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentMetadataSetsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-metadata-sets/export-batch`,
      data,
      op: 'postSiteDocumentMetadataSetsPageExportBatch',
      friendly:
        'Generated method postSiteDocumentMetadataSetsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentShortcutsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentShortcutsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts`,
      data,
      op: 'getSiteDocumentShortcutsPage',
      friendly: 'Generated method getSiteDocumentShortcutsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentShortcut
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentShortcut(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts`,
      data,
      op: 'postSiteDocumentShortcut',
      friendly: 'Generated method postSiteDocumentShortcut failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentShortcutBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentShortcutBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts/batch`,
      data,
      op: 'postSiteDocumentShortcutBatch',
      friendly: 'Generated method postSiteDocumentShortcutBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDocumentShortcutByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteDocumentShortcutByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDocumentShortcutByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDocumentShortcutByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentShortcutByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentShortcutByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDocumentShortcutByExternalReferenceCode',
      friendly:
        'Generated method getSiteDocumentShortcutByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentShortcutByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentShortcutByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDocumentShortcutByExternalReferenceCode',
      friendly:
        'Generated method putSiteDocumentShortcutByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentShortcutsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentShortcutsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/document-shortcuts/export-batch`,
      data,
      op: 'postSiteDocumentShortcutsPageExportBatch',
      friendly:
        'Generated method postSiteDocumentShortcutsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents`,
      data,
      op: 'getSiteDocumentsPage',
      friendly: 'Generated method getSiteDocumentsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteDocument
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocument(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents`,
      data,
      op: 'postSiteDocument',
      friendly: 'Generated method postSiteDocument failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDocumentsFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteDocumentsFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents-folder/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDocumentsFolderByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDocumentsFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentsFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentsFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents-folder/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDocumentsFolderByExternalReferenceCode',
      friendly:
        'Generated method getSiteDocumentsFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentsFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentsFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents-folder/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDocumentsFolderByExternalReferenceCode',
      friendly:
        'Generated method putSiteDocumentsFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/batch`,
      data,
      op: 'postSiteDocumentBatch',
      friendly: 'Generated method postSiteDocumentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    documentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${documentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    documentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${documentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method getSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    documentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${documentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method putSiteDocumentByExternalReferenceCodeDocumentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteDocumentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteDocumentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteDocumentByExternalReferenceCode',
      friendly:
        'Generated method getSiteDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteDocumentByExternalReferenceCode',
      friendly:
        'Generated method putSiteDocumentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteDocumentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteDocumentsPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/export-batch`,
      data,
      op: 'postSiteDocumentsPageExportBatch',
      friendly: 'Generated method postSiteDocumentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/permissions`,
      data,
      op: 'getSiteDocumentPermissionsPage',
      friendly: 'Generated method getSiteDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteDocumentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteDocumentPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/permissions`,
      data,
      op: 'putSiteDocumentPermissionsPage',
      friendly: 'Generated method putSiteDocumentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteDocumentsRatedByMePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteDocumentsRatedByMePage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/documents/rated-by-me`,
      data,
      op: 'getSiteDocumentsRatedByMePage',
      friendly: 'Generated method getSiteDocumentsRatedByMePage failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseArticlesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseArticlesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`,
      data,
      op: 'getSiteKnowledgeBaseArticlesPage',
      friendly: 'Generated method getSiteKnowledgeBaseArticlesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseArticle
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseArticle(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`,
      data,
      op: 'postSiteKnowledgeBaseArticle',
      friendly: 'Generated method postSiteKnowledgeBaseArticle failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseArticleBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseArticleBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/batch`,
      data,
      op: 'postSiteKnowledgeBaseArticleBatch',
      friendly: 'Generated method postSiteKnowledgeBaseArticleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteKnowledgeBaseArticleByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteKnowledgeBaseArticleByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteKnowledgeBaseArticleByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteKnowledgeBaseArticleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseArticleByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseArticleByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteKnowledgeBaseArticleByExternalReferenceCode',
      friendly:
        'Generated method getSiteKnowledgeBaseArticleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseArticleByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseArticleByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteKnowledgeBaseArticleByExternalReferenceCode',
      friendly:
        'Generated method putSiteKnowledgeBaseArticleByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode(
    config,
    siteId,
    knowledgeBaseArticleExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/by-external-reference-code/${knowledgeBaseArticleExternalReferenceCode}/knowledge-base-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode(
    config,
    siteId,
    knowledgeBaseArticleExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/by-external-reference-code/${knowledgeBaseArticleExternalReferenceCode}/knowledge-base-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode',
      friendly:
        'Generated method getSiteKnowledgeBaseArticleByExternalReferenceCodeKnowledgeBaseArticleExternalReferenceCodeKnowledgeBaseAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseArticlesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseArticlesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/export-batch`,
      data,
      op: 'postSiteKnowledgeBaseArticlesPageExportBatch',
      friendly:
        'Generated method postSiteKnowledgeBaseArticlesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseArticlePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseArticlePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/permissions`,
      data,
      op: 'getSiteKnowledgeBaseArticlePermissionsPage',
      friendly:
        'Generated method getSiteKnowledgeBaseArticlePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseArticlePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseArticlePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/permissions`,
      data,
      op: 'putSiteKnowledgeBaseArticlePermissionsPage',
      friendly:
        'Generated method putSiteKnowledgeBaseArticlePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseArticleSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseArticleSubscribe(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/subscribe`,
      data,
      op: 'putSiteKnowledgeBaseArticleSubscribe',
      friendly: 'Generated method putSiteKnowledgeBaseArticleSubscribe failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseArticleUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseArticleUnsubscribe(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles/unsubscribe`,
      data,
      op: 'putSiteKnowledgeBaseArticleUnsubscribe',
      friendly:
        'Generated method putSiteKnowledgeBaseArticleUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseFoldersPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders`,
      data,
      op: 'getSiteKnowledgeBaseFoldersPage',
      friendly: 'Generated method getSiteKnowledgeBaseFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseFolder(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders`,
      data,
      op: 'postSiteKnowledgeBaseFolder',
      friendly: 'Generated method postSiteKnowledgeBaseFolder failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseFolderBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/batch`,
      data,
      op: 'postSiteKnowledgeBaseFolderBatch',
      friendly: 'Generated method postSiteKnowledgeBaseFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteKnowledgeBaseFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteKnowledgeBaseFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteKnowledgeBaseFolderByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteKnowledgeBaseFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteKnowledgeBaseFolderByExternalReferenceCode',
      friendly:
        'Generated method getSiteKnowledgeBaseFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteKnowledgeBaseFolderByExternalReferenceCode',
      friendly:
        'Generated method putSiteKnowledgeBaseFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteKnowledgeBaseFoldersPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteKnowledgeBaseFoldersPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/export-batch`,
      data,
      op: 'postSiteKnowledgeBaseFoldersPageExportBatch',
      friendly:
        'Generated method postSiteKnowledgeBaseFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteKnowledgeBaseFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteKnowledgeBaseFolderPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/permissions`,
      data,
      op: 'getSiteKnowledgeBaseFolderPermissionsPage',
      friendly:
        'Generated method getSiteKnowledgeBaseFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteKnowledgeBaseFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteKnowledgeBaseFolderPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders/permissions`,
      data,
      op: 'putSiteKnowledgeBaseFolderPermissionsPage',
      friendly:
        'Generated method putSiteKnowledgeBaseFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteLanguagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteLanguagesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/languages`,
      data,
      op: 'getSiteLanguagesPage',
      friendly: 'Generated method getSiteLanguagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteLanguagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteLanguagesPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/languages/export-batch`,
      data,
      op: 'postSiteLanguagesPageExportBatch',
      friendly: 'Generated method postSiteLanguagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardMessagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardMessagesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages`,
      data,
      op: 'getSiteMessageBoardMessagesPage',
      friendly: 'Generated method getSiteMessageBoardMessagesPage failed',
      ...opts,
    });
  }

  /**
   * deleteSiteMessageBoardMessageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteMessageBoardMessageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteMessageBoardMessageByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteMessageBoardMessageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardMessageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardMessageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteMessageBoardMessageByExternalReferenceCode',
      friendly:
        'Generated method getSiteMessageBoardMessageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteMessageBoardMessageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteMessageBoardMessageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteMessageBoardMessageByExternalReferenceCode',
      friendly:
        'Generated method putSiteMessageBoardMessageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode(
    config,
    siteId,
    messageBoardMessageExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-external-reference-code/${messageBoardMessageExternalReferenceCode}/message-board-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode(
    config,
    siteId,
    messageBoardMessageExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-external-reference-code/${messageBoardMessageExternalReferenceCode}/message-board-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode',
      friendly:
        'Generated method getSiteMessageBoardMessageByExternalReferenceCodeMessageBoardMessageExternalReferenceCodeMessageBoardAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardMessageByFriendlyUrlPath
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardMessageByFriendlyUrlPath(
    config,
    siteId,
    friendlyUrlPath,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/by-friendly-url-path/${friendlyUrlPath}`,
      data,
      op: 'getSiteMessageBoardMessageByFriendlyUrlPath',
      friendly:
        'Generated method getSiteMessageBoardMessageByFriendlyUrlPath failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardMessagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardMessagesPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/export-batch`,
      data,
      op: 'postSiteMessageBoardMessagesPageExportBatch',
      friendly:
        'Generated method postSiteMessageBoardMessagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardMessagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardMessagePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/permissions`,
      data,
      op: 'getSiteMessageBoardMessagePermissionsPage',
      friendly:
        'Generated method getSiteMessageBoardMessagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteMessageBoardMessagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteMessageBoardMessagePermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-messages/permissions`,
      data,
      op: 'putSiteMessageBoardMessagePermissionsPage',
      friendly:
        'Generated method putSiteMessageBoardMessagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardSectionByFriendlyUrlPath
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardSectionByFriendlyUrlPath(
    config,
    siteId,
    friendlyUrlPath,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-section/by-friendly-url-path/${friendlyUrlPath}`,
      data,
      op: 'getSiteMessageBoardSectionByFriendlyUrlPath',
      friendly:
        'Generated method getSiteMessageBoardSectionByFriendlyUrlPath failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardSectionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardSectionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections`,
      data,
      op: 'getSiteMessageBoardSectionsPage',
      friendly: 'Generated method getSiteMessageBoardSectionsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardSection
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardSection(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections`,
      data,
      op: 'postSiteMessageBoardSection',
      friendly: 'Generated method postSiteMessageBoardSection failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardSectionBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardSectionBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections/batch`,
      data,
      op: 'postSiteMessageBoardSectionBatch',
      friendly: 'Generated method postSiteMessageBoardSectionBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardSectionsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardSectionsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections/export-batch`,
      data,
      op: 'postSiteMessageBoardSectionsPageExportBatch',
      friendly:
        'Generated method postSiteMessageBoardSectionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardSectionPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardSectionPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections/permissions`,
      data,
      op: 'getSiteMessageBoardSectionPermissionsPage',
      friendly:
        'Generated method getSiteMessageBoardSectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteMessageBoardSectionPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteMessageBoardSectionPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-sections/permissions`,
      data,
      op: 'putSiteMessageBoardSectionPermissionsPage',
      friendly:
        'Generated method putSiteMessageBoardSectionPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardThreadsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardThreadsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads`,
      data,
      op: 'getSiteMessageBoardThreadsPage',
      friendly: 'Generated method getSiteMessageBoardThreadsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardThread
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardThread(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads`,
      data,
      op: 'postSiteMessageBoardThread',
      friendly: 'Generated method postSiteMessageBoardThread failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardThreadBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardThreadBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads/batch`,
      data,
      op: 'postSiteMessageBoardThreadBatch',
      friendly: 'Generated method postSiteMessageBoardThreadBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardThreadByFriendlyUrlPath
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardThreadByFriendlyUrlPath(
    config,
    siteId,
    friendlyUrlPath,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads/by-friendly-url-path/${friendlyUrlPath}`,
      data,
      op: 'getSiteMessageBoardThreadByFriendlyUrlPath',
      friendly:
        'Generated method getSiteMessageBoardThreadByFriendlyUrlPath failed',
      ...opts,
    });
  }

  /**
   * postSiteMessageBoardThreadsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteMessageBoardThreadsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads/export-batch`,
      data,
      op: 'postSiteMessageBoardThreadsPageExportBatch',
      friendly:
        'Generated method postSiteMessageBoardThreadsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteMessageBoardThreadPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteMessageBoardThreadPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads/permissions`,
      data,
      op: 'getSiteMessageBoardThreadPermissionsPage',
      friendly:
        'Generated method getSiteMessageBoardThreadPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteMessageBoardThreadPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteMessageBoardThreadPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/message-board-threads/permissions`,
      data,
      op: 'putSiteMessageBoardThreadPermissionsPage',
      friendly:
        'Generated method putSiteMessageBoardThreadPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenusPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenusPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus`,
      data,
      op: 'getSiteNavigationMenusPage',
      friendly: 'Generated method getSiteNavigationMenusPage failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenu
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenu(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus`,
      data,
      op: 'postSiteNavigationMenu',
      friendly: 'Generated method postSiteNavigationMenu failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenuBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenuBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/batch`,
      data,
      op: 'postSiteNavigationMenuBatch',
      friendly: 'Generated method postSiteNavigationMenuBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteNavigationMenuByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteNavigationMenuByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteNavigationMenuByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteNavigationMenuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenuByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenuByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteNavigationMenuByExternalReferenceCode',
      friendly:
        'Generated method getSiteNavigationMenuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteNavigationMenuByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteNavigationMenuByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteNavigationMenuByExternalReferenceCode',
      friendly:
        'Generated method putSiteNavigationMenuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteNavigationMenusPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteNavigationMenusPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/export-batch`,
      data,
      op: 'postSiteNavigationMenusPageExportBatch',
      friendly:
        'Generated method postSiteNavigationMenusPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteNavigationMenuPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteNavigationMenuPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/permissions`,
      data,
      op: 'getSiteNavigationMenuPermissionsPage',
      friendly: 'Generated method getSiteNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteNavigationMenuPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteNavigationMenuPermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/navigation-menus/permissions`,
      data,
      op: 'putSiteNavigationMenuPermissionsPage',
      friendly: 'Generated method putSiteNavigationMenuPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePagesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages`,
      data,
      op: 'getSiteSitePagesPage',
      friendly: 'Generated method getSiteSitePagesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteSitePage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages`,
      data,
      op: 'postSiteSitePage',
      friendly: 'Generated method postSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteSitePageBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/batch`,
      data,
      op: 'postSiteSitePageBatch',
      friendly: 'Generated method postSiteSitePageBatch failed',
      ...opts,
    });
  }

  /**
   * postSiteSitePagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteSitePagesPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/export-batch`,
      data,
      op: 'postSiteSitePagesPageExportBatch',
      friendly: 'Generated method postSiteSitePagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePage(config, siteId, friendlyUrlPath, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/${friendlyUrlPath}`,
      data,
      op: 'getSiteSitePage',
      friendly: 'Generated method getSiteSitePage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePagesExperiencesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePagesExperiencesPage(
    config,
    siteId,
    friendlyUrlPath,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/${friendlyUrlPath}/experiences`,
      data,
      op: 'getSiteSitePagesExperiencesPage',
      friendly: 'Generated method getSiteSitePagesExperiencesPage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageExperienceExperienceKey
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePageExperienceExperienceKey(
    config,
    siteId,
    friendlyUrlPath,
    experienceKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/${friendlyUrlPath}/experiences/${experienceKey}`,
      data,
      op: 'getSiteSitePageExperienceExperienceKey',
      friendly:
        'Generated method getSiteSitePageExperienceExperienceKey failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageExperienceExperienceKeyRenderedPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePageExperienceExperienceKeyRenderedPage(
    config,
    siteId,
    friendlyUrlPath,
    experienceKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/${friendlyUrlPath}/experiences/${experienceKey}/rendered-page`,
      data,
      op: 'getSiteSitePageExperienceExperienceKeyRenderedPage',
      friendly:
        'Generated method getSiteSitePageExperienceExperienceKeyRenderedPage failed',
      ...opts,
    });
  }

  /**
   * getSiteSitePageRenderedPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteSitePageRenderedPage(
    config,
    siteId,
    friendlyUrlPath,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/site-pages/${friendlyUrlPath}/rendered-page`,
      data,
      op: 'getSiteSitePageRenderedPage',
      friendly: 'Generated method getSiteSitePageRenderedPage failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentFoldersPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders`,
      data,
      op: 'getSiteStructuredContentFoldersPage',
      friendly: 'Generated method getSiteStructuredContentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContentFolder(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders`,
      data,
      op: 'postSiteStructuredContentFolder',
      friendly: 'Generated method postSiteStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContentFolderBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/batch`,
      data,
      op: 'postSiteStructuredContentFolderBatch',
      friendly: 'Generated method postSiteStructuredContentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteStructuredContentFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method getSiteStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteStructuredContentFolderByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteStructuredContentFolderByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteStructuredContentFolderByExternalReferenceCode',
      friendly:
        'Generated method putSiteStructuredContentFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContentFoldersPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContentFoldersPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/export-batch`,
      data,
      op: 'postSiteStructuredContentFoldersPageExportBatch',
      friendly:
        'Generated method postSiteStructuredContentFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentFolderPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/permissions`,
      data,
      op: 'getSiteStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method getSiteStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteStructuredContentFolderPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders/permissions`,
      data,
      op: 'putSiteStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method putSiteStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents`,
      data,
      op: 'getSiteStructuredContentsPage',
      friendly: 'Generated method getSiteStructuredContentsPage failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContent(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents`,
      data,
      op: 'postSiteStructuredContent',
      friendly: 'Generated method postSiteStructuredContent failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContentBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/batch`,
      data,
      op: 'postSiteStructuredContentBatch',
      friendly: 'Generated method postSiteStructuredContentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteStructuredContentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method getSiteStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteStructuredContentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteStructuredContentByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteStructuredContentByExternalReferenceCode',
      friendly:
        'Generated method putSiteStructuredContentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    structuredContentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${structuredContentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    structuredContentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${structuredContentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method getSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode(
    config,
    siteId,
    structuredContentExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-external-reference-code/${structuredContentExternalReferenceCode}/comments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode',
      friendly:
        'Generated method putSiteStructuredContentByExternalReferenceCodeStructuredContentExternalReferenceCodeCommentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentByKey
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentByKey(config, siteId, key, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-key/${key}`,
      data,
      op: 'getSiteStructuredContentByKey',
      friendly: 'Generated method getSiteStructuredContentByKey failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentByUuid
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentByUuid(config, siteId, uuid, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/by-uuid/${uuid}`,
      data,
      op: 'getSiteStructuredContentByUuid',
      friendly: 'Generated method getSiteStructuredContentByUuid failed',
      ...opts,
    });
  }

  /**
   * postSiteStructuredContentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteStructuredContentsPageExportBatch(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/export-batch`,
      data,
      op: 'postSiteStructuredContentsPageExportBatch',
      friendly:
        'Generated method postSiteStructuredContentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteStructuredContentPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/permissions`,
      data,
      op: 'getSiteStructuredContentPermissionsPage',
      friendly:
        'Generated method getSiteStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteStructuredContentPermissionsPage(
    config,
    siteId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/structured-contents/permissions`,
      data,
      op: 'putSiteStructuredContentPermissionsPage',
      friendly:
        'Generated method putSiteStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getSiteWikiNodesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteWikiNodesPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes`,
      data,
      op: 'getSiteWikiNodesPage',
      friendly: 'Generated method getSiteWikiNodesPage failed',
      ...opts,
    });
  }

  /**
   * postSiteWikiNode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteWikiNode(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes`,
      data,
      op: 'postSiteWikiNode',
      friendly: 'Generated method postSiteWikiNode failed',
      ...opts,
    });
  }

  /**
   * postSiteWikiNodeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteWikiNodeBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/batch`,
      data,
      op: 'postSiteWikiNodeBatch',
      friendly: 'Generated method postSiteWikiNodeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSiteWikiNodeByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteWikiNodeByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteWikiNodeByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteWikiNodeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteWikiNodeByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteWikiNodeByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteWikiNodeByExternalReferenceCode',
      friendly:
        'Generated method getSiteWikiNodeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteWikiNodeByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteWikiNodeByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteWikiNodeByExternalReferenceCode',
      friendly:
        'Generated method putSiteWikiNodeByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSiteWikiNodesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postSiteWikiNodesPageExportBatch(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/export-batch`,
      data,
      op: 'postSiteWikiNodesPageExportBatch',
      friendly: 'Generated method postSiteWikiNodesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getSiteWikiNodePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteWikiNodePermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/permissions`,
      data,
      op: 'getSiteWikiNodePermissionsPage',
      friendly: 'Generated method getSiteWikiNodePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putSiteWikiNodePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteWikiNodePermissionsPage(config, siteId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-nodes/permissions`,
      data,
      op: 'putSiteWikiNodePermissionsPage',
      friendly: 'Generated method putSiteWikiNodePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * deleteSiteWikiPageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteWikiPageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-pages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteWikiPageByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteWikiPageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteWikiPageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteWikiPageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-pages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteWikiPageByExternalReferenceCode',
      friendly:
        'Generated method getSiteWikiPageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSiteWikiPageByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putSiteWikiPageByExternalReferenceCode(
    config,
    siteId,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-pages/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSiteWikiPageByExternalReferenceCode',
      friendly:
        'Generated method putSiteWikiPageByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode(
    config,
    siteId,
    wikiPageExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-pages/by-external-reference-code/${wikiPageExternalReferenceCode}/wiki-page-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode',
      friendly:
        'Generated method deleteSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode(
    config,
    siteId,
    wikiPageExternalReferenceCode,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/wiki-pages/by-external-reference-code/${wikiPageExternalReferenceCode}/wiki-page-attachments/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode',
      friendly:
        'Generated method getSiteWikiPageByExternalReferenceCodeWikiPageExternalReferenceCodeWikiPageAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSiteUserMessageBoardMessagesActivityPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getSiteUserMessageBoardMessagesActivityPage(
    config,
    siteId,
    userId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/sites/${siteId}/${userId}/message-board-messages/activity`,
      data,
      op: 'getSiteUserMessageBoardMessagesActivityPage',
      friendly:
        'Generated method getSiteUserMessageBoardMessagesActivityPage failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentFolderPermissionsPage(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-content-folder/${structuredContentFolderId}/permissions`,
      data,
      op: 'getStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method getStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentFolderPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentFolderPermissionsPage(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-content-folder/${structuredContentFolderId}/permissions`,
      data,
      op: 'putStructuredContentFolderPermissionsPage',
      friendly:
        'Generated method putStructuredContentFolderPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * deleteStructuredContentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteStructuredContentFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/structured-content-folders/batch`,
      data,
      op: 'deleteStructuredContentFolderBatch',
      friendly: 'Generated method deleteStructuredContentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentFolderBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-content-folders/batch`,
      data,
      op: 'putStructuredContentFolderBatch',
      friendly: 'Generated method putStructuredContentFolderBatch failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentFolderStructuredContentFoldersPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentFolderStructuredContentFoldersPage(
    config,
    parentStructuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${parentStructuredContentFolderId}/structured-content-folders`,
      data,
      op: 'getStructuredContentFolderStructuredContentFoldersPage',
      friendly:
        'Generated method getStructuredContentFolderStructuredContentFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentFolderStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentFolderStructuredContentFolder(
    config,
    parentStructuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${parentStructuredContentFolderId}/structured-content-folders`,
      data,
      op: 'postStructuredContentFolderStructuredContentFolder',
      friendly:
        'Generated method postStructuredContentFolderStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * deleteStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteStructuredContentFolder(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}`,
      data,
      op: 'deleteStructuredContentFolder',
      friendly: 'Generated method deleteStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentFolder(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}`,
      data,
      op: 'getStructuredContentFolder',
      friendly: 'Generated method getStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * patchStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchStructuredContentFolder(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}`,
      data,
      op: 'patchStructuredContentFolder',
      friendly: 'Generated method patchStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentFolder
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentFolder(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}`,
      data,
      op: 'putStructuredContentFolder',
      friendly: 'Generated method putStructuredContentFolder failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentFolderStructuredContentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentFolderStructuredContentsPage(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/structured-contents`,
      data,
      op: 'getStructuredContentFolderStructuredContentsPage',
      friendly:
        'Generated method getStructuredContentFolderStructuredContentsPage failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentFolderStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentFolderStructuredContent(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/structured-contents`,
      data,
      op: 'postStructuredContentFolderStructuredContent',
      friendly:
        'Generated method postStructuredContentFolderStructuredContent failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentFolderStructuredContentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentFolderStructuredContentBatch(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/structured-contents/batch`,
      data,
      op: 'postStructuredContentFolderStructuredContentBatch',
      friendly:
        'Generated method postStructuredContentFolderStructuredContentBatch failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentFolderStructuredContentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentFolderStructuredContentsPageExportBatch(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/structured-contents/export-batch`,
      data,
      op: 'postStructuredContentFolderStructuredContentsPageExportBatch',
      friendly:
        'Generated method postStructuredContentFolderStructuredContentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentFolderSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentFolderSubscribe(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/subscribe`,
      data,
      op: 'putStructuredContentFolderSubscribe',
      friendly: 'Generated method putStructuredContentFolderSubscribe failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentFolderUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentFolderUnsubscribe(
    config,
    structuredContentFolderId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-content-folders/${structuredContentFolderId}/unsubscribe`,
      data,
      op: 'putStructuredContentFolderUnsubscribe',
      friendly: 'Generated method putStructuredContentFolderUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * deleteStructuredContentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteStructuredContentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/structured-contents/batch`,
      data,
      op: 'deleteStructuredContentBatch',
      friendly: 'Generated method deleteStructuredContentBatch failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/batch`,
      data,
      op: 'putStructuredContentBatch',
      friendly: 'Generated method putStructuredContentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteStructuredContent(config, structuredContentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}`,
      data,
      op: 'deleteStructuredContent',
      friendly: 'Generated method deleteStructuredContent failed',
      ...opts,
    });
  }

  /**
   * getStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContent(config, structuredContentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}`,
      data,
      op: 'getStructuredContent',
      friendly: 'Generated method getStructuredContent failed',
      ...opts,
    });
  }

  /**
   * patchStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async patchStructuredContent(config, structuredContentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}`,
      data,
      op: 'patchStructuredContent',
      friendly: 'Generated method patchStructuredContent failed',
      ...opts,
    });
  }

  /**
   * putStructuredContent
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContent(config, structuredContentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}`,
      data,
      op: 'putStructuredContent',
      friendly: 'Generated method putStructuredContent failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentCommentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentCommentsPage(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/comments`,
      data,
      op: 'getStructuredContentCommentsPage',
      friendly: 'Generated method getStructuredContentCommentsPage failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentComment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentComment(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/comments`,
      data,
      op: 'postStructuredContentComment',
      friendly: 'Generated method postStructuredContentComment failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentCommentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentCommentBatch(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/comments/batch`,
      data,
      op: 'postStructuredContentCommentBatch',
      friendly: 'Generated method postStructuredContentCommentBatch failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentCommentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentCommentsPageExportBatch(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/comments/export-batch`,
      data,
      op: 'postStructuredContentCommentsPageExportBatch',
      friendly:
        'Generated method postStructuredContentCommentsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteStructuredContentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteStructuredContentMyRating(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/my-rating`,
      data,
      op: 'deleteStructuredContentMyRating',
      friendly: 'Generated method deleteStructuredContentMyRating failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentMyRating(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/my-rating`,
      data,
      op: 'getStructuredContentMyRating',
      friendly: 'Generated method getStructuredContentMyRating failed',
      ...opts,
    });
  }

  /**
   * postStructuredContentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postStructuredContentMyRating(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/my-rating`,
      data,
      op: 'postStructuredContentMyRating',
      friendly: 'Generated method postStructuredContentMyRating failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentMyRating
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentMyRating(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/my-rating`,
      data,
      op: 'putStructuredContentMyRating',
      friendly: 'Generated method putStructuredContentMyRating failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentPermissionsPage(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/permissions`,
      data,
      op: 'getStructuredContentPermissionsPage',
      friendly: 'Generated method getStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentPermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentPermissionsPage(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/permissions`,
      data,
      op: 'putStructuredContentPermissionsPage',
      friendly: 'Generated method putStructuredContentPermissionsPage failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentRenderedContentByDisplayPageDisplayPageKey
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentRenderedContentByDisplayPageDisplayPageKey(
    config,
    structuredContentId,
    displayPageKey,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/rendered-content-by-display-page/${displayPageKey}`,
      data,
      op: 'getStructuredContentRenderedContentByDisplayPageDisplayPageKey',
      friendly:
        'Generated method getStructuredContentRenderedContentByDisplayPageDisplayPageKey failed',
      ...opts,
    });
  }

  /**
   * getStructuredContentRenderedContentContentTemplate
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getStructuredContentRenderedContentContentTemplate(
    config,
    structuredContentId,
    contentTemplateId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/rendered-content/${contentTemplateId}`,
      data,
      op: 'getStructuredContentRenderedContentContentTemplate',
      friendly:
        'Generated method getStructuredContentRenderedContentContentTemplate failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentSubscribe(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/subscribe`,
      data,
      op: 'putStructuredContentSubscribe',
      friendly: 'Generated method putStructuredContentSubscribe failed',
      ...opts,
    });
  }

  /**
   * putStructuredContentUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putStructuredContentUnsubscribe(
    config,
    structuredContentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/structured-contents/${structuredContentId}/unsubscribe`,
      data,
      op: 'putStructuredContentUnsubscribe',
      friendly: 'Generated method putStructuredContentUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * deleteWikiNodeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiNodeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-nodes/batch`,
      data,
      op: 'deleteWikiNodeBatch',
      friendly: 'Generated method deleteWikiNodeBatch failed',
      ...opts,
    });
  }

  /**
   * putWikiNodeBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiNodeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-nodes/batch`,
      data,
      op: 'putWikiNodeBatch',
      friendly: 'Generated method putWikiNodeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWikiNode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiNode(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}`,
      data,
      op: 'deleteWikiNode',
      friendly: 'Generated method deleteWikiNode failed',
      ...opts,
    });
  }

  /**
   * getWikiNode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiNode(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}`,
      data,
      op: 'getWikiNode',
      friendly: 'Generated method getWikiNode failed',
      ...opts,
    });
  }

  /**
   * putWikiNode
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiNode(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}`,
      data,
      op: 'putWikiNode',
      friendly: 'Generated method putWikiNode failed',
      ...opts,
    });
  }

  /**
   * getWikiNodePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiNodePermissionsPage(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/permissions`,
      data,
      op: 'getWikiNodePermissionsPage',
      friendly: 'Generated method getWikiNodePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putWikiNodePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiNodePermissionsPage(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/permissions`,
      data,
      op: 'putWikiNodePermissionsPage',
      friendly: 'Generated method putWikiNodePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putWikiNodeSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiNodeSubscribe(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/subscribe`,
      data,
      op: 'putWikiNodeSubscribe',
      friendly: 'Generated method putWikiNodeSubscribe failed',
      ...opts,
    });
  }

  /**
   * putWikiNodeUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiNodeUnsubscribe(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/unsubscribe`,
      data,
      op: 'putWikiNodeUnsubscribe',
      friendly: 'Generated method putWikiNodeUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getWikiNodeWikiPagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiNodeWikiPagesPage(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/wiki-pages`,
      data,
      op: 'getWikiNodeWikiPagesPage',
      friendly: 'Generated method getWikiNodeWikiPagesPage failed',
      ...opts,
    });
  }

  /**
   * postWikiNodeWikiPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiNodeWikiPage(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/wiki-pages`,
      data,
      op: 'postWikiNodeWikiPage',
      friendly: 'Generated method postWikiNodeWikiPage failed',
      ...opts,
    });
  }

  /**
   * postWikiNodeWikiPageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiNodeWikiPageBatch(config, wikiNodeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/wiki-pages/batch`,
      data,
      op: 'postWikiNodeWikiPageBatch',
      friendly: 'Generated method postWikiNodeWikiPageBatch failed',
      ...opts,
    });
  }

  /**
   * postWikiNodeWikiPagesPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiNodeWikiPagesPageExportBatch(
    config,
    wikiNodeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-nodes/${wikiNodeId}/wiki-pages/export-batch`,
      data,
      op: 'postWikiNodeWikiPagesPageExportBatch',
      friendly: 'Generated method postWikiNodeWikiPagesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWikiPageAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiPageAttachmentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-page-attachments/batch`,
      data,
      op: 'deleteWikiPageAttachmentBatch',
      friendly: 'Generated method deleteWikiPageAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWikiPageAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiPageAttachment(
    config,
    wikiPageAttachmentId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-page-attachments/${wikiPageAttachmentId}`,
      data,
      op: 'deleteWikiPageAttachment',
      friendly: 'Generated method deleteWikiPageAttachment failed',
      ...opts,
    });
  }

  /**
   * getWikiPageAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiPageAttachment(config, wikiPageAttachmentId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-page-attachments/${wikiPageAttachmentId}`,
      data,
      op: 'getWikiPageAttachment',
      friendly: 'Generated method getWikiPageAttachment failed',
      ...opts,
    });
  }

  /**
   * deleteWikiPageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiPageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-pages/batch`,
      data,
      op: 'deleteWikiPageBatch',
      friendly: 'Generated method deleteWikiPageBatch failed',
      ...opts,
    });
  }

  /**
   * putWikiPageBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiPageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-pages/batch`,
      data,
      op: 'putWikiPageBatch',
      friendly: 'Generated method putWikiPageBatch failed',
      ...opts,
    });
  }

  /**
   * getWikiPageWikiPagesPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiPageWikiPagesPage(config, parentWikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-pages/${parentWikiPageId}/wiki-pages`,
      data,
      op: 'getWikiPageWikiPagesPage',
      friendly: 'Generated method getWikiPageWikiPagesPage failed',
      ...opts,
    });
  }

  /**
   * postWikiPageWikiPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiPageWikiPage(config, parentWikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-pages/${parentWikiPageId}/wiki-pages`,
      data,
      op: 'postWikiPageWikiPage',
      friendly: 'Generated method postWikiPageWikiPage failed',
      ...opts,
    });
  }

  /**
   * deleteWikiPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async deleteWikiPage(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}`,
      data,
      op: 'deleteWikiPage',
      friendly: 'Generated method deleteWikiPage failed',
      ...opts,
    });
  }

  /**
   * getWikiPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiPage(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}`,
      data,
      op: 'getWikiPage',
      friendly: 'Generated method getWikiPage failed',
      ...opts,
    });
  }

  /**
   * putWikiPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiPage(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}`,
      data,
      op: 'putWikiPage',
      friendly: 'Generated method putWikiPage failed',
      ...opts,
    });
  }

  /**
   * getWikiPagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiPagePermissionsPage(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/permissions`,
      data,
      op: 'getWikiPagePermissionsPage',
      friendly: 'Generated method getWikiPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putWikiPagePermissionsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiPagePermissionsPage(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/permissions`,
      data,
      op: 'putWikiPagePermissionsPage',
      friendly: 'Generated method putWikiPagePermissionsPage failed',
      ...opts,
    });
  }

  /**
   * putWikiPageSubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiPageSubscribe(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/subscribe`,
      data,
      op: 'putWikiPageSubscribe',
      friendly: 'Generated method putWikiPageSubscribe failed',
      ...opts,
    });
  }

  /**
   * putWikiPageUnsubscribe
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async putWikiPageUnsubscribe(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/unsubscribe`,
      data,
      op: 'putWikiPageUnsubscribe',
      friendly: 'Generated method putWikiPageUnsubscribe failed',
      ...opts,
    });
  }

  /**
   * getWikiPageWikiPageAttachmentsPage
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async getWikiPageWikiPageAttachmentsPage(
    config,
    wikiPageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/wiki-page-attachments`,
      data,
      op: 'getWikiPageWikiPageAttachmentsPage',
      friendly: 'Generated method getWikiPageWikiPageAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postWikiPageWikiPageAttachment
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiPageWikiPageAttachment(config, wikiPageId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/wiki-page-attachments`,
      data,
      op: 'postWikiPageWikiPageAttachment',
      friendly: 'Generated method postWikiPageWikiPageAttachment failed',
      ...opts,
    });
  }

  /**
   * postWikiPageWikiPageAttachmentBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiPageWikiPageAttachmentBatch(
    config,
    wikiPageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/wiki-page-attachments/batch`,
      data,
      op: 'postWikiPageWikiPageAttachmentBatch',
      friendly: 'Generated method postWikiPageWikiPageAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * postWikiPageWikiPageAttachmentsPageExportBatch
   * API: headless-delivery-v1.0 | Version: v1.0
   */
  async postWikiPageWikiPageAttachmentsPageExportBatch(
    config,
    wikiPageId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-delivery/v1.0/wiki-pages/${wikiPageId}/wiki-page-attachments/export-batch`,
      data,
      op: 'postWikiPageWikiPageAttachmentsPageExportBatch',
      friendly:
        'Generated method postWikiPageWikiPageAttachmentsPageExportBatch failed',
      ...opts,
    });
  }
}

module.exports = HeadlessDeliveryClient_v1_0;
