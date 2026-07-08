/**
 * HeadlessBatchEngineClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessBatchEngineClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getExportTaskByExternalReferenceCode
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getExportTaskByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/export-task/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getExportTaskByExternalReferenceCode',
      friendly: 'Generated method getExportTaskByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getExportTaskByExternalReferenceCodeContent
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getExportTaskByExternalReferenceCodeContent(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/export-task/by-external-reference-code/${externalReferenceCode}/content`,
      data,
      op: 'getExportTaskByExternalReferenceCodeContent',
      friendly:
        'Generated method getExportTaskByExternalReferenceCodeContent failed',
      ...opts,
    });
  }

  /**
   * postExportTask
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async postExportTask(config, className, contentType, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-batch-engine/v1.0/export-task/${className}/${contentType}`,
      data,
      op: 'postExportTask',
      friendly: 'Generated method postExportTask failed',
      ...opts,
    });
  }

  /**
   * getExportTask
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getExportTask(config, exportTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/export-task/${exportTaskId}`,
      data,
      op: 'getExportTask',
      friendly: 'Generated method getExportTask failed',
      ...opts,
    });
  }

  /**
   * getExportTaskContent
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getExportTaskContent(config, exportTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/export-task/${exportTaskId}/content`,
      data,
      op: 'getExportTaskContent',
      friendly: 'Generated method getExportTaskContent failed',
      ...opts,
    });
  }

  /**
   * getImportTaskByExternalReferenceCode
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTaskByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getImportTaskByExternalReferenceCode',
      friendly: 'Generated method getImportTaskByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getImportTaskByExternalReferenceCodeContent
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTaskByExternalReferenceCodeContent(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/by-external-reference-code/${externalReferenceCode}/content`,
      data,
      op: 'getImportTaskByExternalReferenceCodeContent',
      friendly:
        'Generated method getImportTaskByExternalReferenceCodeContent failed',
      ...opts,
    });
  }

  /**
   * getImportTaskByExternalReferenceCodeFailedItemReport
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTaskByExternalReferenceCodeFailedItemReport(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/by-external-reference-code/${externalReferenceCode}/failed-items/report`,
      data,
      op: 'getImportTaskByExternalReferenceCodeFailedItemReport',
      friendly:
        'Generated method getImportTaskByExternalReferenceCodeFailedItemReport failed',
      ...opts,
    });
  }

  /**
   * deleteImportTask_1
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async deleteImportTask_1(config, className, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-batch-engine/v1.0/import-task/${className}`,
      data,
      op: 'deleteImportTask_1',
      friendly: 'Generated method deleteImportTask_1 failed',
      ...opts,
    });
  }

  /**
   * postImportTask_1
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async postImportTask_1(config, className, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-batch-engine/v1.0/import-task/${className}`,
      data,
      op: 'postImportTask_1',
      friendly: 'Generated method postImportTask_1 failed',
      ...opts,
    });
  }

  /**
   * putImportTask_1
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async putImportTask_1(config, className, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-batch-engine/v1.0/import-task/${className}`,
      data,
      op: 'putImportTask_1',
      friendly: 'Generated method putImportTask_1 failed',
      ...opts,
    });
  }

  /**
   * getImportTask
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTask(config, importTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/${importTaskId}`,
      data,
      op: 'getImportTask',
      friendly: 'Generated method getImportTask failed',
      ...opts,
    });
  }

  /**
   * getImportTaskContent
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTaskContent(config, importTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/${importTaskId}/content`,
      data,
      op: 'getImportTaskContent',
      friendly: 'Generated method getImportTaskContent failed',
      ...opts,
    });
  }

  /**
   * getImportTaskFailedItemReport
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getImportTaskFailedItemReport(config, importTaskId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/import-task/${importTaskId}/failed-items/report`,
      data,
      op: 'getImportTaskFailedItemReport',
      friendly: 'Generated method getImportTaskFailedItemReport failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-batch-engine-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-batch-engine/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }
}

module.exports = HeadlessBatchEngineClient_v1_0;
