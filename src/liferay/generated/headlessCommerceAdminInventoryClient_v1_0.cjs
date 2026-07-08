/**
 * HeadlessCommerceAdminInventoryClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessCommerceAdminInventoryClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getOpenAPI
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * deleteReplenishmentItemBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteReplenishmentItemBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/batch`,
      data,
      op: 'deleteReplenishmentItemBatch',
      friendly: 'Generated method deleteReplenishmentItemBatch failed',
      ...opts,
    });
  }

  /**
   * deleteReplenishmentItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteReplenishmentItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteReplenishmentItemByExternalReferenceCode',
      friendly:
        'Generated method deleteReplenishmentItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getReplenishmentItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getReplenishmentItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getReplenishmentItemByExternalReferenceCode',
      friendly:
        'Generated method getReplenishmentItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchReplenishmentItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchReplenishmentItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchReplenishmentItemByExternalReferenceCode',
      friendly:
        'Generated method patchReplenishmentItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putReplenishmentItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async putReplenishmentItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putReplenishmentItemByExternalReferenceCode',
      friendly:
        'Generated method putReplenishmentItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteReplenishmentItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteReplenishmentItem(config, replenishmentItemId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/${replenishmentItemId}`,
      data,
      op: 'deleteReplenishmentItem',
      friendly: 'Generated method deleteReplenishmentItem failed',
      ...opts,
    });
  }

  /**
   * getReplenishmentItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getReplenishmentItem(config, replenishmentItemId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/${replenishmentItemId}`,
      data,
      op: 'getReplenishmentItem',
      friendly: 'Generated method getReplenishmentItem failed',
      ...opts,
    });
  }

  /**
   * patchReplenishmentItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchReplenishmentItem(config, replenishmentItemId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/replenishment-items/${replenishmentItemId}`,
      data,
      op: 'patchReplenishmentItem',
      friendly: 'Generated method patchReplenishmentItem failed',
      ...opts,
    });
  }

  /**
   * getReplenishmentItemsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getReplenishmentItemsPage(config, sku, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/skus/by-sku/${sku}/replenishment-items`,
      data,
      op: 'getReplenishmentItemsPage',
      friendly: 'Generated method getReplenishmentItemsPage failed',
      ...opts,
    });
  }

  /**
   * postReplenishmentItemsPageExportBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postReplenishmentItemsPageExportBatch(config, sku, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/skus/by-sku/${sku}/replenishment-items/export-batch`,
      data,
      op: 'postReplenishmentItemsPageExportBatch',
      friendly: 'Generated method postReplenishmentItemsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseAccountGroupBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-account-groups/batch`,
      data,
      op: 'deleteWarehouseAccountGroupBatch',
      friendly: 'Generated method deleteWarehouseAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseAccountGroup
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseAccountGroup(
    config,
    warehouseAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-account-groups/${warehouseAccountGroupId}`,
      data,
      op: 'deleteWarehouseAccountGroup',
      friendly: 'Generated method deleteWarehouseAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getWarehouseAccountGroupAccountGroup
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseAccountGroupAccountGroup(
    config,
    warehouseAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-account-groups/${warehouseAccountGroupId}/account-group`,
      data,
      op: 'getWarehouseAccountGroupAccountGroup',
      friendly: 'Generated method getWarehouseAccountGroupAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseAccountBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-accounts/batch`,
      data,
      op: 'deleteWarehouseAccountBatch',
      friendly: 'Generated method deleteWarehouseAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseAccount
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseAccount(config, warehouseAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-accounts/${warehouseAccountId}`,
      data,
      op: 'deleteWarehouseAccount',
      friendly: 'Generated method deleteWarehouseAccount failed',
      ...opts,
    });
  }

  /**
   * getWarehouseAccountAccount
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseAccountAccount(
    config,
    warehouseAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-accounts/${warehouseAccountId}/account`,
      data,
      op: 'getWarehouseAccountAccount',
      friendly: 'Generated method getWarehouseAccountAccount failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseChannelBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-channels/batch`,
      data,
      op: 'deleteWarehouseChannelBatch',
      friendly: 'Generated method deleteWarehouseChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseChannel
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseChannel(config, warehouseChannelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-channels/${warehouseChannelId}`,
      data,
      op: 'deleteWarehouseChannel',
      friendly: 'Generated method deleteWarehouseChannel failed',
      ...opts,
    });
  }

  /**
   * getWarehouseChannelChannel
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseChannelChannel(
    config,
    warehouseChannelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-channels/${warehouseChannelId}/channel`,
      data,
      op: 'getWarehouseChannelChannel',
      friendly: 'Generated method getWarehouseChannelChannel failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseOrderTypeBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-order-types/batch`,
      data,
      op: 'deleteWarehouseOrderTypeBatch',
      friendly: 'Generated method deleteWarehouseOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseOrderType
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseOrderType(
    config,
    warehouseOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-order-types/${warehouseOrderTypeId}`,
      data,
      op: 'deleteWarehouseOrderType',
      friendly: 'Generated method deleteWarehouseOrderType failed',
      ...opts,
    });
  }

  /**
   * getWarehouseOrderTypeOrderType
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseOrderTypeOrderType(
    config,
    warehouseOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouse-order-types/${warehouseOrderTypeId}/order-type`,
      data,
      op: 'getWarehouseOrderTypeOrderType',
      friendly: 'Generated method getWarehouseOrderTypeOrderType failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseItemBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseItemBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/batch`,
      data,
      op: 'deleteWarehouseItemBatch',
      friendly: 'Generated method deleteWarehouseItemBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteWarehouseItemByExternalReferenceCode',
      friendly:
        'Generated method deleteWarehouseItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWarehouseItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getWarehouseItemByExternalReferenceCode',
      friendly:
        'Generated method getWarehouseItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchWarehouseItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchWarehouseItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchWarehouseItemByExternalReferenceCode',
      friendly:
        'Generated method patchWarehouseItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postWarehouseItemByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseItemByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'postWarehouseItemByExternalReferenceCode',
      friendly:
        'Generated method postWarehouseItemByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWarehouseItemsUpdatedPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseItemsUpdatedPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/updated`,
      data,
      op: 'getWarehouseItemsUpdatedPage',
      friendly: 'Generated method getWarehouseItemsUpdatedPage failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseItem(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/${id}`,
      data,
      op: 'deleteWarehouseItem',
      friendly: 'Generated method deleteWarehouseItem failed',
      ...opts,
    });
  }

  /**
   * getWarehouseItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseItem(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/${id}`,
      data,
      op: 'getWarehouseItem',
      friendly: 'Generated method getWarehouseItem failed',
      ...opts,
    });
  }

  /**
   * patchWarehouseItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchWarehouseItem(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouseItems/${id}`,
      data,
      op: 'patchWarehouseItem',
      friendly: 'Generated method patchWarehouseItem failed',
      ...opts,
    });
  }

  /**
   * getWarehousesPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehousesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses`,
      data,
      op: 'getWarehousesPage',
      friendly: 'Generated method getWarehousesPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouse
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouse(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses`,
      data,
      op: 'postWarehouse',
      friendly: 'Generated method postWarehouse failed',
      ...opts,
    });
  }

  /**
   * postWarehouseBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/batch`,
      data,
      op: 'postWarehouseBatch',
      friendly: 'Generated method postWarehouseBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteWarehouseByExternalReferenceCode',
      friendly:
        'Generated method deleteWarehouseByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getWarehouseByExternalReferenceCode',
      friendly: 'Generated method getWarehouseByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchWarehouseByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchWarehouseByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchWarehouseByExternalReferenceCode',
      friendly: 'Generated method patchWarehouseByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putWarehouseByExternalReferenceCode
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async putWarehouseByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putWarehouseByExternalReferenceCode',
      friendly: 'Generated method putWarehouseByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCodeWarehouseAccountGroupsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCodeWarehouseAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-account-groups`,
      data,
      op: 'getWarehouseByExternalReferenceCodeWarehouseAccountGroupsPage',
      friendly:
        'Generated method getWarehouseByExternalReferenceCodeWarehouseAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseByExternalReferenceCodeWarehouseAccountGroup
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseByExternalReferenceCodeWarehouseAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-account-groups`,
      data,
      op: 'postWarehouseByExternalReferenceCodeWarehouseAccountGroup',
      friendly:
        'Generated method postWarehouseByExternalReferenceCodeWarehouseAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCodeWarehouseAccountsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCodeWarehouseAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-accounts`,
      data,
      op: 'getWarehouseByExternalReferenceCodeWarehouseAccountsPage',
      friendly:
        'Generated method getWarehouseByExternalReferenceCodeWarehouseAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseByExternalReferenceCodeWarehouseAccount
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseByExternalReferenceCodeWarehouseAccount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-accounts`,
      data,
      op: 'postWarehouseByExternalReferenceCodeWarehouseAccount',
      friendly:
        'Generated method postWarehouseByExternalReferenceCodeWarehouseAccount failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCodeWarehouseChannelsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCodeWarehouseChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-channels`,
      data,
      op: 'getWarehouseByExternalReferenceCodeWarehouseChannelsPage',
      friendly:
        'Generated method getWarehouseByExternalReferenceCodeWarehouseChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseByExternalReferenceCodeWarehouseChannel
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseByExternalReferenceCodeWarehouseChannel(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-channels`,
      data,
      op: 'postWarehouseByExternalReferenceCodeWarehouseChannel',
      friendly:
        'Generated method postWarehouseByExternalReferenceCodeWarehouseChannel failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCodeWarehouseOrderTypesPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCodeWarehouseOrderTypesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-order-types`,
      data,
      op: 'getWarehouseByExternalReferenceCodeWarehouseOrderTypesPage',
      friendly:
        'Generated method getWarehouseByExternalReferenceCodeWarehouseOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseByExternalReferenceCodeWarehouseOrderType
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseByExternalReferenceCodeWarehouseOrderType(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouse-order-types`,
      data,
      op: 'postWarehouseByExternalReferenceCodeWarehouseOrderType',
      friendly:
        'Generated method postWarehouseByExternalReferenceCodeWarehouseOrderType failed',
      ...opts,
    });
  }

  /**
   * getWarehouseByExternalReferenceCodeWarehouseItemsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseByExternalReferenceCodeWarehouseItemsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouseItems`,
      data,
      op: 'getWarehouseByExternalReferenceCodeWarehouseItemsPage',
      friendly:
        'Generated method getWarehouseByExternalReferenceCodeWarehouseItemsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseByExternalReferenceCodeWarehouseItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseByExternalReferenceCodeWarehouseItem(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/by-externalReferenceCode/${externalReferenceCode}/warehouseItems`,
      data,
      op: 'postWarehouseByExternalReferenceCodeWarehouseItem',
      friendly:
        'Generated method postWarehouseByExternalReferenceCodeWarehouseItem failed',
      ...opts,
    });
  }

  /**
   * postWarehousesPageExportBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehousesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/export-batch`,
      data,
      op: 'postWarehousesPageExportBatch',
      friendly: 'Generated method postWarehousesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseAccountGroupBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/warehouse-account-groups/batch`,
      data,
      op: 'postWarehouseIdWarehouseAccountGroupBatch',
      friendly:
        'Generated method postWarehouseIdWarehouseAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseAccountBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/warehouse-accounts/batch`,
      data,
      op: 'postWarehouseIdWarehouseAccountBatch',
      friendly: 'Generated method postWarehouseIdWarehouseAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseChannelBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/warehouse-channels/batch`,
      data,
      op: 'postWarehouseIdWarehouseChannelBatch',
      friendly: 'Generated method postWarehouseIdWarehouseChannelBatch failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseOrderTypeBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/warehouse-order-types/batch`,
      data,
      op: 'postWarehouseIdWarehouseOrderTypeBatch',
      friendly:
        'Generated method postWarehouseIdWarehouseOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseItemBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseItemBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/warehouseItems/batch`,
      data,
      op: 'postWarehouseIdWarehouseItemBatch',
      friendly: 'Generated method postWarehouseIdWarehouseItemBatch failed',
      ...opts,
    });
  }

  /**
   * deleteWarehouseId
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async deleteWarehouseId(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}`,
      data,
      op: 'deleteWarehouseId',
      friendly: 'Generated method deleteWarehouseId failed',
      ...opts,
    });
  }

  /**
   * getWarehouseId
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseId(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}`,
      data,
      op: 'getWarehouseId',
      friendly: 'Generated method getWarehouseId failed',
      ...opts,
    });
  }

  /**
   * patchWarehouseId
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async patchWarehouseId(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}`,
      data,
      op: 'patchWarehouseId',
      friendly: 'Generated method patchWarehouseId failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdWarehouseAccountGroupsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdWarehouseAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-account-groups`,
      data,
      op: 'getWarehouseIdWarehouseAccountGroupsPage',
      friendly:
        'Generated method getWarehouseIdWarehouseAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseAccountGroup
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-account-groups`,
      data,
      op: 'postWarehouseIdWarehouseAccountGroup',
      friendly: 'Generated method postWarehouseIdWarehouseAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdWarehouseAccountsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdWarehouseAccountsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-accounts`,
      data,
      op: 'getWarehouseIdWarehouseAccountsPage',
      friendly: 'Generated method getWarehouseIdWarehouseAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseAccount
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseAccount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-accounts`,
      data,
      op: 'postWarehouseIdWarehouseAccount',
      friendly: 'Generated method postWarehouseIdWarehouseAccount failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdWarehouseChannelsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdWarehouseChannelsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-channels`,
      data,
      op: 'getWarehouseIdWarehouseChannelsPage',
      friendly: 'Generated method getWarehouseIdWarehouseChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseChannel
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseChannel(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-channels`,
      data,
      op: 'postWarehouseIdWarehouseChannel',
      friendly: 'Generated method postWarehouseIdWarehouseChannel failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdWarehouseOrderTypesPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdWarehouseOrderTypesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-order-types`,
      data,
      op: 'getWarehouseIdWarehouseOrderTypesPage',
      friendly: 'Generated method getWarehouseIdWarehouseOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseOrderType
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseOrderType(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouse-order-types`,
      data,
      op: 'postWarehouseIdWarehouseOrderType',
      friendly: 'Generated method postWarehouseIdWarehouseOrderType failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdWarehouseItemsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdWarehouseItemsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouseItems`,
      data,
      op: 'getWarehouseIdWarehouseItemsPage',
      friendly: 'Generated method getWarehouseIdWarehouseItemsPage failed',
      ...opts,
    });
  }

  /**
   * postWarehouseIdWarehouseItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postWarehouseIdWarehouseItem(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${id}/warehouseItems`,
      data,
      op: 'postWarehouseIdWarehouseItem',
      friendly: 'Generated method postWarehouseIdWarehouseItem failed',
      ...opts,
    });
  }

  /**
   * getWarehouseIdReplenishmentItemsPage
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async getWarehouseIdReplenishmentItemsPage(
    config,
    warehouseId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${warehouseId}/replenishment-items`,
      data,
      op: 'getWarehouseIdReplenishmentItemsPage',
      friendly: 'Generated method getWarehouseIdReplenishmentItemsPage failed',
      ...opts,
    });
  }

  /**
   * postReplenishmentItem
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postReplenishmentItem(config, warehouseId, sku, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${warehouseId}/skus/by-sku/${sku}/replenishment-items`,
      data,
      op: 'postReplenishmentItem',
      friendly: 'Generated method postReplenishmentItem failed',
      ...opts,
    });
  }

  /**
   * postReplenishmentItemBatch
   * API: headless-commerce-admin-inventory-v1.0 | Version: v1.0
   */
  async postReplenishmentItemBatch(config, warehouseId, sku, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-inventory/v1.0/warehouses/${warehouseId}/skus/by-sku/${sku}/replenishment-items/batch`,
      data,
      op: 'postReplenishmentItemBatch',
      friendly: 'Generated method postReplenishmentItemBatch failed',
      ...opts,
    });
  }
}

module.exports = HeadlessCommerceAdminInventoryClient_v1_0;
