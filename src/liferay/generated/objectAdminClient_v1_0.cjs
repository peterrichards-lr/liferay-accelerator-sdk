/**
 * ObjectAdminClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class ObjectAdminClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectAction(config, objectActionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-actions/${objectActionId}`,
      data,
      op: 'getObjectAction',
      friendly: 'Generated method getObjectAction failed',
      ...opts,
    });
  }

  /**
   * putObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectAction(config, objectActionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-actions/${objectActionId}`,
      data,
      op: 'putObjectAction',
      friendly: 'Generated method putObjectAction failed',
      ...opts,
    });
  }

  /**
   * deleteObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectAction(config, objectActionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-actions/${objectActionId}`,
      data,
      op: 'deleteObjectAction',
      friendly: 'Generated method deleteObjectAction failed',
      ...opts,
    });
  }

  /**
   * patchObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async patchObjectAction(config, objectActionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/object-admin/v1.0/object-actions/${objectActionId}`,
      data,
      op: 'patchObjectAction',
      friendly: 'Generated method patchObjectAction failed',
      ...opts,
    });
  }

  /**
   * putObjectActionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectActionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-actions/batch`,
      data,
      op: 'putObjectActionBatch',
      friendly: 'Generated method putObjectActionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectActionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectActionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-actions/batch`,
      data,
      op: 'deleteObjectActionBatch',
      friendly: 'Generated method deleteObjectActionBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectActionsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectActionsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-actions`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectActionsPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectActionsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectAction(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-actions`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectAction',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectAction failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectActionsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectActionsPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-actions`,
      data,
      op: 'getObjectDefinitionObjectActionsPage',
      friendly: 'Generated method getObjectDefinitionObjectActionsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectAction
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectAction(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-actions`,
      data,
      op: 'postObjectDefinitionObjectAction',
      friendly: 'Generated method postObjectDefinitionObjectAction failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectActionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectActionBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-actions/batch`,
      data,
      op: 'postObjectDefinitionObjectActionBatch',
      friendly: 'Generated method postObjectDefinitionObjectActionBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectActionsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectActionsPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-actions/export-batch`,
      data,
      op: 'postObjectDefinitionObjectActionsPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectActionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinition
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinition(config, objectDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`,
      data,
      op: 'getObjectDefinition',
      friendly: 'Generated method getObjectDefinition failed',
      ...opts,
    });
  }

  /**
   * putObjectDefinition
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectDefinition(config, objectDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`,
      data,
      op: 'putObjectDefinition',
      friendly: 'Generated method putObjectDefinition failed',
      ...opts,
    });
  }

  /**
   * deleteObjectDefinition
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectDefinition(config, objectDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`,
      data,
      op: 'deleteObjectDefinition',
      friendly: 'Generated method deleteObjectDefinition failed',
      ...opts,
    });
  }

  /**
   * patchObjectDefinition
   * API: object-admin-v1.0 | Version: v1.0
   */
  async patchObjectDefinition(config, objectDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}`,
      data,
      op: 'patchObjectDefinition',
      friendly: 'Generated method patchObjectDefinition failed',
      ...opts,
    });
  }

  /**
   * putObjectDefinitionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-definitions/batch`,
      data,
      op: 'putObjectDefinitionBatch',
      friendly: 'Generated method putObjectDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/batch`,
      data,
      op: 'postObjectDefinitionBatch',
      friendly: 'Generated method postObjectDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectDefinitionBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-definitions/batch`,
      data,
      op: 'deleteObjectDefinitionBatch',
      friendly: 'Generated method deleteObjectDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCode
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCode',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putObjectDefinitionByExternalReferenceCode
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectDefinitionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putObjectDefinitionByExternalReferenceCode',
      friendly:
        'Generated method putObjectDefinitionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions`,
      data,
      op: 'getObjectDefinitionsPage',
      friendly: 'Generated method getObjectDefinitionsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinition
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions`,
      data,
      op: 'postObjectDefinition',
      friendly: 'Generated method postObjectDefinition failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionPublish
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionPublish(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/publish`,
      data,
      op: 'postObjectDefinitionPublish',
      friendly: 'Generated method postObjectDefinitionPublish failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/export-batch`,
      data,
      op: 'postObjectDefinitionsPageExportBatch',
      friendly: 'Generated method postObjectDefinitionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectField(config, objectFieldId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-fields/${objectFieldId}`,
      data,
      op: 'getObjectField',
      friendly: 'Generated method getObjectField failed',
      ...opts,
    });
  }

  /**
   * putObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectField(config, objectFieldId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-fields/${objectFieldId}`,
      data,
      op: 'putObjectField',
      friendly: 'Generated method putObjectField failed',
      ...opts,
    });
  }

  /**
   * deleteObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectField(config, objectFieldId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-fields/${objectFieldId}`,
      data,
      op: 'deleteObjectField',
      friendly: 'Generated method deleteObjectField failed',
      ...opts,
    });
  }

  /**
   * patchObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async patchObjectField(config, objectFieldId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/object-admin/v1.0/object-fields/${objectFieldId}`,
      data,
      op: 'patchObjectField',
      friendly: 'Generated method patchObjectField failed',
      ...opts,
    });
  }

  /**
   * putObjectFieldBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectFieldBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-fields/batch`,
      data,
      op: 'putObjectFieldBatch',
      friendly: 'Generated method putObjectFieldBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectFieldBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectFieldBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-fields/batch`,
      data,
      op: 'deleteObjectFieldBatch',
      friendly: 'Generated method deleteObjectFieldBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectFieldsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectFieldsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-fields`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectFieldsPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectFieldsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectField(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-fields`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectField',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectField failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectFieldsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectFieldsPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-fields`,
      data,
      op: 'getObjectDefinitionObjectFieldsPage',
      friendly: 'Generated method getObjectDefinitionObjectFieldsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectField
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectField(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-fields`,
      data,
      op: 'postObjectDefinitionObjectField',
      friendly: 'Generated method postObjectDefinitionObjectField failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectFieldBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectFieldBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-fields/batch`,
      data,
      op: 'postObjectDefinitionObjectFieldBatch',
      friendly: 'Generated method postObjectDefinitionObjectFieldBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectFieldsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectFieldsPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-fields/export-batch`,
      data,
      op: 'postObjectDefinitionObjectFieldsPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectFieldsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectFolder
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectFolder(config, objectFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-folders/${objectFolderId}`,
      data,
      op: 'getObjectFolder',
      friendly: 'Generated method getObjectFolder failed',
      ...opts,
    });
  }

  /**
   * putObjectFolder
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectFolder(config, objectFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-folders/${objectFolderId}`,
      data,
      op: 'putObjectFolder',
      friendly: 'Generated method putObjectFolder failed',
      ...opts,
    });
  }

  /**
   * deleteObjectFolder
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectFolder(config, objectFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-folders/${objectFolderId}`,
      data,
      op: 'deleteObjectFolder',
      friendly: 'Generated method deleteObjectFolder failed',
      ...opts,
    });
  }

  /**
   * patchObjectFolder
   * API: object-admin-v1.0 | Version: v1.0
   */
  async patchObjectFolder(config, objectFolderId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/object-admin/v1.0/object-folders/${objectFolderId}`,
      data,
      op: 'patchObjectFolder',
      friendly: 'Generated method patchObjectFolder failed',
      ...opts,
    });
  }

  /**
   * putObjectFolderBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-folders/batch`,
      data,
      op: 'putObjectFolderBatch',
      friendly: 'Generated method putObjectFolderBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectFolderBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-folders/batch`,
      data,
      op: 'postObjectFolderBatch',
      friendly: 'Generated method postObjectFolderBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectFolderBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectFolderBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-folders/batch`,
      data,
      op: 'deleteObjectFolderBatch',
      friendly: 'Generated method deleteObjectFolderBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectFolderByExternalReferenceCode
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectFolderByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getObjectFolderByExternalReferenceCode',
      friendly:
        'Generated method getObjectFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putObjectFolderByExternalReferenceCode
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectFolderByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-folders/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putObjectFolderByExternalReferenceCode',
      friendly:
        'Generated method putObjectFolderByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getObjectFoldersPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectFoldersPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-folders`,
      data,
      op: 'getObjectFoldersPage',
      friendly: 'Generated method getObjectFoldersPage failed',
      ...opts,
    });
  }

  /**
   * postObjectFolder
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectFolder(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-folders`,
      data,
      op: 'postObjectFolder',
      friendly: 'Generated method postObjectFolder failed',
      ...opts,
    });
  }

  /**
   * postObjectFoldersPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectFoldersPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-folders/export-batch`,
      data,
      op: 'postObjectFoldersPageExportBatch',
      friendly: 'Generated method postObjectFoldersPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectLayout
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectLayout(config, objectLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-layouts/${objectLayoutId}`,
      data,
      op: 'getObjectLayout',
      friendly: 'Generated method getObjectLayout failed',
      ...opts,
    });
  }

  /**
   * putObjectLayout
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectLayout(config, objectLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-layouts/${objectLayoutId}`,
      data,
      op: 'putObjectLayout',
      friendly: 'Generated method putObjectLayout failed',
      ...opts,
    });
  }

  /**
   * deleteObjectLayout
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectLayout(config, objectLayoutId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-layouts/${objectLayoutId}`,
      data,
      op: 'deleteObjectLayout',
      friendly: 'Generated method deleteObjectLayout failed',
      ...opts,
    });
  }

  /**
   * putObjectLayoutBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectLayoutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-layouts/batch`,
      data,
      op: 'putObjectLayoutBatch',
      friendly: 'Generated method putObjectLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectLayoutBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectLayoutBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-layouts/batch`,
      data,
      op: 'deleteObjectLayoutBatch',
      friendly: 'Generated method deleteObjectLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectLayoutsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectLayoutsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-layouts`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectLayoutsPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectLayoutsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectLayout
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectLayout(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-layouts`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectLayout',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectLayout failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectLayoutsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectLayoutsPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-layouts`,
      data,
      op: 'getObjectDefinitionObjectLayoutsPage',
      friendly: 'Generated method getObjectDefinitionObjectLayoutsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectLayout
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectLayout(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-layouts`,
      data,
      op: 'postObjectDefinitionObjectLayout',
      friendly: 'Generated method postObjectDefinitionObjectLayout failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectLayoutBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectLayoutBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-layouts/batch`,
      data,
      op: 'postObjectDefinitionObjectLayoutBatch',
      friendly: 'Generated method postObjectDefinitionObjectLayoutBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectLayoutsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectLayoutsPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-layouts/export-batch`,
      data,
      op: 'postObjectDefinitionObjectLayoutsPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectLayoutsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectRelationship
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectRelationship(config, objectRelationshipId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-relationships/${objectRelationshipId}`,
      data,
      op: 'getObjectRelationship',
      friendly: 'Generated method getObjectRelationship failed',
      ...opts,
    });
  }

  /**
   * putObjectRelationship
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectRelationship(config, objectRelationshipId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-relationships/${objectRelationshipId}`,
      data,
      op: 'putObjectRelationship',
      friendly: 'Generated method putObjectRelationship failed',
      ...opts,
    });
  }

  /**
   * deleteObjectRelationship
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectRelationship(
    config,
    objectRelationshipId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-relationships/${objectRelationshipId}`,
      data,
      op: 'deleteObjectRelationship',
      friendly: 'Generated method deleteObjectRelationship failed',
      ...opts,
    });
  }

  /**
   * putObjectRelationshipBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectRelationshipBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-relationships/batch`,
      data,
      op: 'putObjectRelationshipBatch',
      friendly: 'Generated method putObjectRelationshipBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectRelationshipBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectRelationshipBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-relationships/batch`,
      data,
      op: 'deleteObjectRelationshipBatch',
      friendly: 'Generated method deleteObjectRelationshipBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectRelationshipsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectRelationshipsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-relationships`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectRelationshipsPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectRelationshipsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectRelationship
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectRelationship(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-relationships`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectRelationship',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectRelationship failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectRelationshipsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectRelationshipsPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-relationships`,
      data,
      op: 'getObjectDefinitionObjectRelationshipsPage',
      friendly:
        'Generated method getObjectDefinitionObjectRelationshipsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectRelationship
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectRelationship(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-relationships`,
      data,
      op: 'postObjectDefinitionObjectRelationship',
      friendly:
        'Generated method postObjectDefinitionObjectRelationship failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectRelationshipBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectRelationshipBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-relationships/batch`,
      data,
      op: 'postObjectDefinitionObjectRelationshipBatch',
      friendly:
        'Generated method postObjectDefinitionObjectRelationshipBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectRelationshipsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectRelationshipsPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-relationships/export-batch`,
      data,
      op: 'postObjectDefinitionObjectRelationshipsPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectRelationshipsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putObjectRelationshipByExternalReferenceCode
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectRelationshipByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-relationships/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putObjectRelationshipByExternalReferenceCode',
      friendly:
        'Generated method putObjectRelationshipByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectValidationRule(
    config,
    objectValidationRuleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-validation-rules/${objectValidationRuleId}`,
      data,
      op: 'getObjectValidationRule',
      friendly: 'Generated method getObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * putObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectValidationRule(
    config,
    objectValidationRuleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-validation-rules/${objectValidationRuleId}`,
      data,
      op: 'putObjectValidationRule',
      friendly: 'Generated method putObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * deleteObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectValidationRule(
    config,
    objectValidationRuleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-validation-rules/${objectValidationRuleId}`,
      data,
      op: 'deleteObjectValidationRule',
      friendly: 'Generated method deleteObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * patchObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async patchObjectValidationRule(
    config,
    objectValidationRuleId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/object-admin/v1.0/object-validation-rules/${objectValidationRuleId}`,
      data,
      op: 'patchObjectValidationRule',
      friendly: 'Generated method patchObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * putObjectValidationRuleBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectValidationRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-validation-rules/batch`,
      data,
      op: 'putObjectValidationRuleBatch',
      friendly: 'Generated method putObjectValidationRuleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectValidationRuleBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectValidationRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-validation-rules/batch`,
      data,
      op: 'deleteObjectValidationRuleBatch',
      friendly: 'Generated method deleteObjectValidationRuleBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectValidationRulesPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectValidationRulesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-validation-rules`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectValidationRulesPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectValidationRulesPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectValidationRule(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-validation-rules`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectValidationRule',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectValidationRulesPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectValidationRulesPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-validation-rules`,
      data,
      op: 'getObjectDefinitionObjectValidationRulesPage',
      friendly:
        'Generated method getObjectDefinitionObjectValidationRulesPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectValidationRule
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectValidationRule(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-validation-rules`,
      data,
      op: 'postObjectDefinitionObjectValidationRule',
      friendly:
        'Generated method postObjectDefinitionObjectValidationRule failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectValidationRuleBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectValidationRuleBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-validation-rules/batch`,
      data,
      op: 'postObjectDefinitionObjectValidationRuleBatch',
      friendly:
        'Generated method postObjectDefinitionObjectValidationRuleBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectValidationRulesPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectValidationRulesPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-validation-rules/export-batch`,
      data,
      op: 'postObjectDefinitionObjectValidationRulesPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectValidationRulesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectView
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectView(config, objectViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-views/${objectViewId}`,
      data,
      op: 'getObjectView',
      friendly: 'Generated method getObjectView failed',
      ...opts,
    });
  }

  /**
   * putObjectView
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectView(config, objectViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-views/${objectViewId}`,
      data,
      op: 'putObjectView',
      friendly: 'Generated method putObjectView failed',
      ...opts,
    });
  }

  /**
   * deleteObjectView
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectView(config, objectViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-views/${objectViewId}`,
      data,
      op: 'deleteObjectView',
      friendly: 'Generated method deleteObjectView failed',
      ...opts,
    });
  }

  /**
   * putObjectViewBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async putObjectViewBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/object-admin/v1.0/object-views/batch`,
      data,
      op: 'putObjectViewBatch',
      friendly: 'Generated method putObjectViewBatch failed',
      ...opts,
    });
  }

  /**
   * deleteObjectViewBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async deleteObjectViewBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/object-admin/v1.0/object-views/batch`,
      data,
      op: 'deleteObjectViewBatch',
      friendly: 'Generated method deleteObjectViewBatch failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionByExternalReferenceCodeObjectViewsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionByExternalReferenceCodeObjectViewsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-views`,
      data,
      op: 'getObjectDefinitionByExternalReferenceCodeObjectViewsPage',
      friendly:
        'Generated method getObjectDefinitionByExternalReferenceCodeObjectViewsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionByExternalReferenceCodeObjectView
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionByExternalReferenceCodeObjectView(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/by-external-reference-code/${externalReferenceCode}/object-views`,
      data,
      op: 'postObjectDefinitionByExternalReferenceCodeObjectView',
      friendly:
        'Generated method postObjectDefinitionByExternalReferenceCodeObjectView failed',
      ...opts,
    });
  }

  /**
   * getObjectDefinitionObjectViewsPage
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getObjectDefinitionObjectViewsPage(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-views`,
      data,
      op: 'getObjectDefinitionObjectViewsPage',
      friendly: 'Generated method getObjectDefinitionObjectViewsPage failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectView
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectView(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-views`,
      data,
      op: 'postObjectDefinitionObjectView',
      friendly: 'Generated method postObjectDefinitionObjectView failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectViewBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectViewBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-views/batch`,
      data,
      op: 'postObjectDefinitionObjectViewBatch',
      friendly: 'Generated method postObjectDefinitionObjectViewBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectDefinitionObjectViewsPageExportBatch
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectDefinitionObjectViewsPageExportBatch(
    config,
    objectDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-definitions/${objectDefinitionId}/object-views/export-batch`,
      data,
      op: 'postObjectDefinitionObjectViewsPageExportBatch',
      friendly:
        'Generated method postObjectDefinitionObjectViewsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postObjectViewCopy
   * API: object-admin-v1.0 | Version: v1.0
   */
  async postObjectViewCopy(config, objectViewId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/object-admin/v1.0/object-views/${objectViewId}/copy`,
      data,
      op: 'postObjectViewCopy',
      friendly: 'Generated method postObjectViewCopy failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: object-admin-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/object-admin/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }
}

module.exports = ObjectAdminClient_v1_0;
