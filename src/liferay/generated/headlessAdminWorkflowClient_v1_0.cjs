/**
 * HeadlessAdminWorkflowClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessAdminWorkflowClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getWorkflowTaskAssignableUsersPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTaskAssignableUsersPage(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/assignable-users`,
      data,
      op: 'getWorkflowTaskAssignableUsersPage',
      friendly: 'Generated method getWorkflowTaskAssignableUsersPage failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstanceNextTransitionsPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstanceNextTransitionsPage(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/next-transitions`,
      data,
      op: 'getWorkflowInstanceNextTransitionsPage',
      friendly:
        'Generated method getWorkflowInstanceNextTransitionsPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTaskNextTransitionsPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTaskNextTransitionsPage(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/next-transitions`,
      data,
      op: 'getWorkflowTaskNextTransitionsPage',
      friendly: 'Generated method getWorkflowTaskNextTransitionsPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLinksPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLinksPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/by-external-reference-code/${externalReferenceCode}/workflow-definition-links`,
      data,
      op: 'getWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLinksPage',
      friendly:
        'Generated method getWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLinksPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLink
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLink(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/by-external-reference-code/${externalReferenceCode}/workflow-definition-links`,
      data,
      op: 'postWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLink',
      friendly:
        'Generated method postWorkflowDefinitionByExternalReferenceCodeWorkflowDefinitionLink failed',
      ...opts,
    });
  }

  /**
   * getWorkflowDefinitionWorkflowDefinitionLinksPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowDefinitionWorkflowDefinitionLinksPage(
    config,
    workflowDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}/workflow-definition-links`,
      data,
      op: 'getWorkflowDefinitionWorkflowDefinitionLinksPage',
      friendly:
        'Generated method getWorkflowDefinitionWorkflowDefinitionLinksPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionWorkflowDefinitionLink
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionWorkflowDefinitionLink(
    config,
    workflowDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}/workflow-definition-links`,
      data,
      op: 'postWorkflowDefinitionWorkflowDefinitionLink',
      friendly:
        'Generated method postWorkflowDefinitionWorkflowDefinitionLink failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionWorkflowDefinitionLinkBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionWorkflowDefinitionLinkBatch(
    config,
    workflowDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}/workflow-definition-links/batch`,
      data,
      op: 'postWorkflowDefinitionWorkflowDefinitionLinkBatch',
      friendly:
        'Generated method postWorkflowDefinitionWorkflowDefinitionLinkBatch failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionWorkflowDefinitionLinksPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionWorkflowDefinitionLinksPageExportBatch(
    config,
    workflowDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}/workflow-definition-links/export-batch`,
      data,
      op: 'postWorkflowDefinitionWorkflowDefinitionLinksPageExportBatch',
      friendly:
        'Generated method postWorkflowDefinitionWorkflowDefinitionLinksPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * putWorkflowDefinitionLinkByExternalReferenceCode
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async putWorkflowDefinitionLinkByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-workflow/v1.0/workflow-definition-links/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putWorkflowDefinitionLinkByExternalReferenceCode',
      friendly:
        'Generated method putWorkflowDefinitionLinkByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWorkflowDefinition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowDefinition(config, workflowDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}`,
      data,
      op: 'getWorkflowDefinition',
      friendly: 'Generated method getWorkflowDefinition failed',
      ...opts,
    });
  }

  /**
   * putWorkflowDefinition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async putWorkflowDefinition(config, workflowDefinitionId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}`,
      data,
      op: 'putWorkflowDefinition',
      friendly: 'Generated method putWorkflowDefinition failed',
      ...opts,
    });
  }

  /**
   * deleteWorkflowDefinition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async deleteWorkflowDefinition(
    config,
    workflowDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/${workflowDefinitionId}`,
      data,
      op: 'deleteWorkflowDefinition',
      friendly: 'Generated method deleteWorkflowDefinition failed',
      ...opts,
    });
  }

  /**
   * putWorkflowDefinitionBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async putWorkflowDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/batch`,
      data,
      op: 'putWorkflowDefinitionBatch',
      friendly: 'Generated method putWorkflowDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/batch`,
      data,
      op: 'postWorkflowDefinitionBatch',
      friendly: 'Generated method postWorkflowDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWorkflowDefinitionBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async deleteWorkflowDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/batch`,
      data,
      op: 'deleteWorkflowDefinitionBatch',
      friendly: 'Generated method deleteWorkflowDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWorkflowDefinitionUndeploy
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async deleteWorkflowDefinitionUndeploy(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/undeploy`,
      data,
      op: 'deleteWorkflowDefinitionUndeploy',
      friendly: 'Generated method deleteWorkflowDefinitionUndeploy failed',
      ...opts,
    });
  }

  /**
   * getWorkflowDefinitionByName
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowDefinitionByName(config, name, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/by-name/${name}`,
      data,
      op: 'getWorkflowDefinitionByName',
      friendly: 'Generated method getWorkflowDefinitionByName failed',
      ...opts,
    });
  }

  /**
   * getWorkflowDefinitionsPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowDefinitionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions`,
      data,
      op: 'getWorkflowDefinitionsPage',
      friendly: 'Generated method getWorkflowDefinitionsPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions`,
      data,
      op: 'postWorkflowDefinition',
      friendly: 'Generated method postWorkflowDefinition failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionDeploy
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionDeploy(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/deploy`,
      data,
      op: 'postWorkflowDefinitionDeploy',
      friendly: 'Generated method postWorkflowDefinitionDeploy failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionSave
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionSave(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/save`,
      data,
      op: 'postWorkflowDefinitionSave',
      friendly: 'Generated method postWorkflowDefinitionSave failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionUpdateActive
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionUpdateActive(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/update-active`,
      data,
      op: 'postWorkflowDefinitionUpdateActive',
      friendly: 'Generated method postWorkflowDefinitionUpdateActive failed',
      ...opts,
    });
  }

  /**
   * postWorkflowDefinitionsPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowDefinitionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-definitions/export-batch`,
      data,
      op: 'postWorkflowDefinitionsPageExportBatch',
      friendly:
        'Generated method postWorkflowDefinitionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstance
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstance(config, workflowInstanceId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}`,
      data,
      op: 'getWorkflowInstance',
      friendly: 'Generated method getWorkflowInstance failed',
      ...opts,
    });
  }

  /**
   * deleteWorkflowInstance
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async deleteWorkflowInstance(config, workflowInstanceId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}`,
      data,
      op: 'deleteWorkflowInstance',
      friendly: 'Generated method deleteWorkflowInstance failed',
      ...opts,
    });
  }

  /**
   * patchWorkflowInstance
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async patchWorkflowInstance(config, workflowInstanceId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}`,
      data,
      op: 'patchWorkflowInstance',
      friendly: 'Generated method patchWorkflowInstance failed',
      ...opts,
    });
  }

  /**
   * deleteWorkflowInstanceBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async deleteWorkflowInstanceBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/batch`,
      data,
      op: 'deleteWorkflowInstanceBatch',
      friendly: 'Generated method deleteWorkflowInstanceBatch failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstancesPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstancesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances`,
      data,
      op: 'getWorkflowInstancesPage',
      friendly: 'Generated method getWorkflowInstancesPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowInstanceChangeTransition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowInstanceChangeTransition(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/change-transition`,
      data,
      op: 'postWorkflowInstanceChangeTransition',
      friendly: 'Generated method postWorkflowInstanceChangeTransition failed',
      ...opts,
    });
  }

  /**
   * postWorkflowInstanceSubmit
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowInstanceSubmit(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/submit`,
      data,
      op: 'postWorkflowInstanceSubmit',
      friendly: 'Generated method postWorkflowInstanceSubmit failed',
      ...opts,
    });
  }

  /**
   * postWorkflowInstancesPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowInstancesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/export-batch`,
      data,
      op: 'postWorkflowInstancesPageExportBatch',
      friendly: 'Generated method postWorkflowInstancesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstanceWorkflowLogsPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstanceWorkflowLogsPage(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-logs`,
      data,
      op: 'getWorkflowInstanceWorkflowLogsPage',
      friendly: 'Generated method getWorkflowInstanceWorkflowLogsPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowLog
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowLog(config, workflowLogId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-logs/${workflowLogId}`,
      data,
      op: 'getWorkflowLog',
      friendly: 'Generated method getWorkflowLog failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTaskWorkflowLogsPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTaskWorkflowLogsPage(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/workflow-logs`,
      data,
      op: 'getWorkflowTaskWorkflowLogsPage',
      friendly: 'Generated method getWorkflowTaskWorkflowLogsPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowInstanceWorkflowLogsPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowInstanceWorkflowLogsPageExportBatch(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-logs/export-batch`,
      data,
      op: 'postWorkflowInstanceWorkflowLogsPageExportBatch',
      friendly:
        'Generated method postWorkflowInstanceWorkflowLogsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskWorkflowLogsPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskWorkflowLogsPageExportBatch(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/workflow-logs/export-batch`,
      data,
      op: 'postWorkflowTaskWorkflowLogsPageExportBatch',
      friendly:
        'Generated method postWorkflowTaskWorkflowLogsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskAssignableUser
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskAssignableUser(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assignable-users`,
      data,
      op: 'postWorkflowTaskAssignableUser',
      friendly: 'Generated method postWorkflowTaskAssignableUser failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstanceWorkflowTasksAssignedToMePage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstanceWorkflowTasksAssignedToMePage(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-tasks/assigned-to-me`,
      data,
      op: 'getWorkflowInstanceWorkflowTasksAssignedToMePage',
      friendly:
        'Generated method getWorkflowInstanceWorkflowTasksAssignedToMePage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstanceWorkflowTasksAssignedToUserPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstanceWorkflowTasksAssignedToUserPage(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-tasks/assigned-to-user`,
      data,
      op: 'getWorkflowInstanceWorkflowTasksAssignedToUserPage',
      friendly:
        'Generated method getWorkflowInstanceWorkflowTasksAssignedToUserPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowInstanceWorkflowTasksPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowInstanceWorkflowTasksPage(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-tasks`,
      data,
      op: 'getWorkflowInstanceWorkflowTasksPage',
      friendly: 'Generated method getWorkflowInstanceWorkflowTasksPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTask
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTask(config, workflowTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}`,
      data,
      op: 'getWorkflowTask',
      friendly: 'Generated method getWorkflowTask failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTaskHasAssignableUsers
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTaskHasAssignableUsers(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/has-assignable-users`,
      data,
      op: 'getWorkflowTaskHasAssignableUsers',
      friendly: 'Generated method getWorkflowTaskHasAssignableUsers failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksAssignedToMePage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksAssignedToMePage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assigned-to-me`,
      data,
      op: 'getWorkflowTasksAssignedToMePage',
      friendly: 'Generated method getWorkflowTasksAssignedToMePage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksAssignedToMyRolesPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksAssignedToMyRolesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assigned-to-my-roles`,
      data,
      op: 'getWorkflowTasksAssignedToMyRolesPage',
      friendly: 'Generated method getWorkflowTasksAssignedToMyRolesPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksAssignedToRolePage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksAssignedToRolePage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assigned-to-role`,
      data,
      op: 'getWorkflowTasksAssignedToRolePage',
      friendly: 'Generated method getWorkflowTasksAssignedToRolePage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksAssignedToUserPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksAssignedToUserPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assigned-to-user`,
      data,
      op: 'getWorkflowTasksAssignedToUserPage',
      friendly: 'Generated method getWorkflowTasksAssignedToUserPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksAssignedToUserRolesPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksAssignedToUserRolesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assigned-to-user-roles`,
      data,
      op: 'getWorkflowTasksAssignedToUserRolesPage',
      friendly:
        'Generated method getWorkflowTasksAssignedToUserRolesPage failed',
      ...opts,
    });
  }

  /**
   * getWorkflowTasksSubmittingUserPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async getWorkflowTasksSubmittingUserPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/submitting-user`,
      data,
      op: 'getWorkflowTasksSubmittingUserPage',
      friendly: 'Generated method getWorkflowTasksSubmittingUserPage failed',
      ...opts,
    });
  }

  /**
   * patchWorkflowTaskAssignToUser
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async patchWorkflowTaskAssignToUser(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/assign-to-user`,
      data,
      op: 'patchWorkflowTaskAssignToUser',
      friendly: 'Generated method patchWorkflowTaskAssignToUser failed',
      ...opts,
    });
  }

  /**
   * patchWorkflowTaskChangeTransition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async patchWorkflowTaskChangeTransition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/change-transition`,
      data,
      op: 'patchWorkflowTaskChangeTransition',
      friendly: 'Generated method patchWorkflowTaskChangeTransition failed',
      ...opts,
    });
  }

  /**
   * patchWorkflowTaskUpdateDueDate
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async patchWorkflowTaskUpdateDueDate(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/update-due-date`,
      data,
      op: 'patchWorkflowTaskUpdateDueDate',
      friendly: 'Generated method patchWorkflowTaskUpdateDueDate failed',
      ...opts,
    });
  }

  /**
   * postWorkflowInstanceWorkflowTasksPageExportBatch
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowInstanceWorkflowTasksPageExportBatch(
    config,
    workflowInstanceId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-tasks/export-batch`,
      data,
      op: 'postWorkflowInstanceWorkflowTasksPageExportBatch',
      friendly:
        'Generated method postWorkflowInstanceWorkflowTasksPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskAssignToMe
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskAssignToMe(config, workflowTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/assign-to-me`,
      data,
      op: 'postWorkflowTaskAssignToMe',
      friendly: 'Generated method postWorkflowTaskAssignToMe failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskAssignToRole
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskAssignToRole(config, workflowTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/assign-to-role`,
      data,
      op: 'postWorkflowTaskAssignToRole',
      friendly: 'Generated method postWorkflowTaskAssignToRole failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskAssignToUser
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskAssignToUser(config, workflowTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/assign-to-user`,
      data,
      op: 'postWorkflowTaskAssignToUser',
      friendly: 'Generated method postWorkflowTaskAssignToUser failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskChangeTransition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskChangeTransition(
    config,
    workflowTaskId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/change-transition`,
      data,
      op: 'postWorkflowTaskChangeTransition',
      friendly: 'Generated method postWorkflowTaskChangeTransition failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskUpdateDueDate
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskUpdateDueDate(config, workflowTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/${workflowTaskId}/update-due-date`,
      data,
      op: 'postWorkflowTaskUpdateDueDate',
      friendly: 'Generated method postWorkflowTaskUpdateDueDate failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTasksPage
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTasksPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks`,
      data,
      op: 'postWorkflowTasksPage',
      friendly: 'Generated method postWorkflowTasksPage failed',
      ...opts,
    });
  }

  /**
   * postWorkflowTaskTransition
   * API: headless-admin-workflow-v1.0 | Version: v1.0
   */
  async postWorkflowTaskTransition(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-admin-workflow/v1.0/workflow-tasks/next-transitions`,
      data,
      op: 'postWorkflowTaskTransition',
      friendly: 'Generated method postWorkflowTaskTransition failed',
      ...opts,
    });
  }
}

module.exports = HeadlessAdminWorkflowClient_v1_0;
