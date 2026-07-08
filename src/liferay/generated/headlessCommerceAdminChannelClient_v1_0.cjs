/**
 * HeadlessCommerceAdminChannelClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessCommerceAdminChannelClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * deleteAccountAddressChannelBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteAccountAddressChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/account-address-channels/batch`,
      data,
      op: 'deleteAccountAddressChannelBatch',
      friendly: 'Generated method deleteAccountAddressChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAccountAddressChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteAccountAddressChannel(
    config,
    accountAddressChannelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/account-address-channels/${accountAddressChannelId}`,
      data,
      op: 'deleteAccountAddressChannel',
      friendly: 'Generated method deleteAccountAddressChannel failed',
      ...opts,
    });
  }

  /**
   * getAccountAddressChannelChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getAccountAddressChannelChannel(
    config,
    accountAddressChannelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/account-address-channels/${accountAddressChannelId}/channel`,
      data,
      op: 'getAccountAddressChannelChannel',
      friendly: 'Generated method getAccountAddressChannelChannel failed',
      ...opts,
    });
  }

  /**
   * getAccountAddressByExternalReferenceCodeAccountAddressChannelsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getAccountAddressByExternalReferenceCodeAccountAddressChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/account-addresses/by-externalReferenceCode/${externalReferenceCode}/account-address-channels`,
      data,
      op: 'getAccountAddressByExternalReferenceCodeAccountAddressChannelsPage',
      friendly:
        'Generated method getAccountAddressByExternalReferenceCodeAccountAddressChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountAddressByExternalReferenceCodeAccountAddressChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postAccountAddressByExternalReferenceCodeAccountAddressChannel(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/account-addresses/by-externalReferenceCode/${externalReferenceCode}/account-address-channels`,
      data,
      op: 'postAccountAddressByExternalReferenceCodeAccountAddressChannel',
      friendly:
        'Generated method postAccountAddressByExternalReferenceCodeAccountAddressChannel failed',
      ...opts,
    });
  }

  /**
   * getAccountAddressIdAccountAddressChannelsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getAccountAddressIdAccountAddressChannelsPage(
    config,
    addressId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/account-addresses/${addressId}/account-address-channels`,
      data,
      op: 'getAccountAddressIdAccountAddressChannelsPage',
      friendly:
        'Generated method getAccountAddressIdAccountAddressChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postAccountAddressIdAccountAddressChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postAccountAddressIdAccountAddressChannel(
    config,
    addressId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/account-addresses/${addressId}/account-address-channels`,
      data,
      op: 'postAccountAddressIdAccountAddressChannel',
      friendly:
        'Generated method postAccountAddressIdAccountAddressChannel failed',
      ...opts,
    });
  }

  /**
   * deleteCategoryDisplayPageBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteCategoryDisplayPageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/category-display-pages/batch`,
      data,
      op: 'deleteCategoryDisplayPageBatch',
      friendly: 'Generated method deleteCategoryDisplayPageBatch failed',
      ...opts,
    });
  }

  /**
   * deleteCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/category-display-pages/${id}`,
      data,
      op: 'deleteCategoryDisplayPage',
      friendly: 'Generated method deleteCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/category-display-pages/${id}`,
      data,
      op: 'getCategoryDisplayPage',
      friendly: 'Generated method getCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * patchCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async patchCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-channel/v1.0/category-display-pages/${id}`,
      data,
      op: 'patchCategoryDisplayPage',
      friendly: 'Generated method patchCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * deleteChannelAccountBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channel-accounts/batch`,
      data,
      op: 'deleteChannelAccountBatch',
      friendly: 'Generated method deleteChannelAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteChannelAccount
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelAccount(config, channelAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channel-accounts/${channelAccountId}`,
      data,
      op: 'deleteChannelAccount',
      friendly: 'Generated method deleteChannelAccount failed',
      ...opts,
    });
  }

  /**
   * getChannelAccountAccount
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelAccountAccount(config, channelAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channel-accounts/${channelAccountId}/account`,
      data,
      op: 'getChannelAccountAccount',
      friendly: 'Generated method getChannelAccountAccount failed',
      ...opts,
    });
  }

  /**
   * getChannelsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels`,
      data,
      op: 'getChannelsPage',
      friendly: 'Generated method getChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannel(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels`,
      data,
      op: 'postChannel',
      friendly: 'Generated method postChannel failed',
      ...opts,
    });
  }

  /**
   * deleteChannelBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/batch`,
      data,
      op: 'deleteChannelBatch',
      friendly: 'Generated method deleteChannelBatch failed',
      ...opts,
    });
  }

  /**
   * postChannelBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/batch`,
      data,
      op: 'postChannelBatch',
      friendly: 'Generated method postChannelBatch failed',
      ...opts,
    });
  }

  /**
   * putChannelBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async putChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/batch`,
      data,
      op: 'putChannelBatch',
      friendly: 'Generated method putChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteChannelByExternalReferenceCode
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteChannelByExternalReferenceCode',
      friendly: 'Generated method deleteChannelByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCode
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getChannelByExternalReferenceCode',
      friendly: 'Generated method getChannelByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchChannelByExternalReferenceCode
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async patchChannelByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchChannelByExternalReferenceCode',
      friendly: 'Generated method patchChannelByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putChannelByExternalReferenceCode
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async putChannelByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putChannelByExternalReferenceCode',
      friendly: 'Generated method putChannelByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCodeCategoryDisplayPagesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCodeCategoryDisplayPagesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/category-display-pages`,
      data,
      op: 'getChannelByExternalReferenceCodeCategoryDisplayPagesPage',
      friendly:
        'Generated method getChannelByExternalReferenceCodeCategoryDisplayPagesPage failed',
      ...opts,
    });
  }

  /**
   * postChannelByExternalReferenceCodeCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelByExternalReferenceCodeCategoryDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/category-display-pages`,
      data,
      op: 'postChannelByExternalReferenceCodeCategoryDisplayPage',
      friendly:
        'Generated method postChannelByExternalReferenceCodeCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCodeChannelAccountsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCodeChannelAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/channel-accounts`,
      data,
      op: 'getChannelByExternalReferenceCodeChannelAccountsPage',
      friendly:
        'Generated method getChannelByExternalReferenceCodeChannelAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postChannelByExternalReferenceCodeChannelAccount
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelByExternalReferenceCodeChannelAccount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/channel-accounts`,
      data,
      op: 'postChannelByExternalReferenceCodeChannelAccount',
      friendly:
        'Generated method postChannelByExternalReferenceCodeChannelAccount failed',
      ...opts,
    });
  }

  /**
   * deleteChannelByExternalReferenceCodeDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelByExternalReferenceCodeDefaultCategoryDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-category-display-pages`,
      data,
      op: 'deleteChannelByExternalReferenceCodeDefaultCategoryDisplayPage',
      friendly:
        'Generated method deleteChannelByExternalReferenceCodeDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCodeDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCodeDefaultCategoryDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-category-display-pages`,
      data,
      op: 'getChannelByExternalReferenceCodeDefaultCategoryDisplayPage',
      friendly:
        'Generated method getChannelByExternalReferenceCodeDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * postChannelByExternalReferenceCodeDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelByExternalReferenceCodeDefaultCategoryDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-category-display-pages`,
      data,
      op: 'postChannelByExternalReferenceCodeDefaultCategoryDisplayPage',
      friendly:
        'Generated method postChannelByExternalReferenceCodeDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * deleteChannelByExternalReferenceCodeDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelByExternalReferenceCodeDefaultProductDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-product-display-page`,
      data,
      op: 'deleteChannelByExternalReferenceCodeDefaultProductDisplayPage',
      friendly:
        'Generated method deleteChannelByExternalReferenceCodeDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCodeDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCodeDefaultProductDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-product-display-page`,
      data,
      op: 'getChannelByExternalReferenceCodeDefaultProductDisplayPage',
      friendly:
        'Generated method getChannelByExternalReferenceCodeDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * postChannelByExternalReferenceCodeDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelByExternalReferenceCodeDefaultProductDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/default-product-display-page`,
      data,
      op: 'postChannelByExternalReferenceCodeDefaultProductDisplayPage',
      friendly:
        'Generated method postChannelByExternalReferenceCodeDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelByExternalReferenceCodeProductDisplayPagesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelByExternalReferenceCodeProductDisplayPagesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/product-display-pages`,
      data,
      op: 'getChannelByExternalReferenceCodeProductDisplayPagesPage',
      friendly:
        'Generated method getChannelByExternalReferenceCodeProductDisplayPagesPage failed',
      ...opts,
    });
  }

  /**
   * postChannelByExternalReferenceCodeProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelByExternalReferenceCodeProductDisplayPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/by-externalReferenceCode/${externalReferenceCode}/product-display-pages`,
      data,
      op: 'postChannelByExternalReferenceCodeProductDisplayPage',
      friendly:
        'Generated method postChannelByExternalReferenceCodeProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * postChannelsPageExportBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/export-batch`,
      data,
      op: 'postChannelsPageExportBatch',
      friendly: 'Generated method postChannelsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannel(config, channelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}`,
      data,
      op: 'deleteChannel',
      friendly: 'Generated method deleteChannel failed',
      ...opts,
    });
  }

  /**
   * getChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannel(config, channelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}`,
      data,
      op: 'getChannel',
      friendly: 'Generated method getChannel failed',
      ...opts,
    });
  }

  /**
   * patchChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async patchChannel(config, channelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}`,
      data,
      op: 'patchChannel',
      friendly: 'Generated method patchChannel failed',
      ...opts,
    });
  }

  /**
   * putChannel
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async putChannel(config, channelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}`,
      data,
      op: 'putChannel',
      friendly: 'Generated method putChannel failed',
      ...opts,
    });
  }

  /**
   * getChannelShippingMethodsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelShippingMethodsPage(config, channelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}/shipping-methods`,
      data,
      op: 'getChannelShippingMethodsPage',
      friendly: 'Generated method getChannelShippingMethodsPage failed',
      ...opts,
    });
  }

  /**
   * postChannelShippingMethodsPageExportBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelShippingMethodsPageExportBatch(
    config,
    channelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${channelId}/shipping-methods/export-batch`,
      data,
      op: 'postChannelShippingMethodsPageExportBatch',
      friendly:
        'Generated method postChannelShippingMethodsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getChannelIdCategoryDisplayPagesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelIdCategoryDisplayPagesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/category-display-pages`,
      data,
      op: 'getChannelIdCategoryDisplayPagesPage',
      friendly: 'Generated method getChannelIdCategoryDisplayPagesPage failed',
      ...opts,
    });
  }

  /**
   * postChannelIdCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelIdCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/category-display-pages`,
      data,
      op: 'postChannelIdCategoryDisplayPage',
      friendly: 'Generated method postChannelIdCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelIdChannelAccountsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelIdChannelAccountsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/channel-accounts`,
      data,
      op: 'getChannelIdChannelAccountsPage',
      friendly: 'Generated method getChannelIdChannelAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postChannelIdChannelAccount
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelIdChannelAccount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/channel-accounts`,
      data,
      op: 'postChannelIdChannelAccount',
      friendly: 'Generated method postChannelIdChannelAccount failed',
      ...opts,
    });
  }

  /**
   * deleteChannelIdDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelIdDefaultCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-category-display-pages`,
      data,
      op: 'deleteChannelIdDefaultCategoryDisplayPage',
      friendly:
        'Generated method deleteChannelIdDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelIdDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelIdDefaultCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-category-display-pages`,
      data,
      op: 'getChannelIdDefaultCategoryDisplayPage',
      friendly:
        'Generated method getChannelIdDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * postChannelIdDefaultCategoryDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelIdDefaultCategoryDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-category-display-pages`,
      data,
      op: 'postChannelIdDefaultCategoryDisplayPage',
      friendly:
        'Generated method postChannelIdDefaultCategoryDisplayPage failed',
      ...opts,
    });
  }

  /**
   * deleteChannelIdDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteChannelIdDefaultProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-product-display-pages`,
      data,
      op: 'deleteChannelIdDefaultProductDisplayPage',
      friendly:
        'Generated method deleteChannelIdDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelIdDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelIdDefaultProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-product-display-pages`,
      data,
      op: 'getChannelIdDefaultProductDisplayPage',
      friendly: 'Generated method getChannelIdDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * postChannelIdDefaultProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelIdDefaultProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/default-product-display-pages`,
      data,
      op: 'postChannelIdDefaultProductDisplayPage',
      friendly:
        'Generated method postChannelIdDefaultProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getChannelIdProductDisplayPagesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getChannelIdProductDisplayPagesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/product-display-pages`,
      data,
      op: 'getChannelIdProductDisplayPagesPage',
      friendly: 'Generated method getChannelIdProductDisplayPagesPage failed',
      ...opts,
    });
  }

  /**
   * postChannelIdProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postChannelIdProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/channels/${id}/product-display-pages`,
      data,
      op: 'postChannelIdProductDisplayPage',
      friendly: 'Generated method postChannelIdProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * deletePaymentMethodGroupRelOrderTypeBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deletePaymentMethodGroupRelOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-order-types/batch`,
      data,
      op: 'deletePaymentMethodGroupRelOrderTypeBatch',
      friendly:
        'Generated method deletePaymentMethodGroupRelOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deletePaymentMethodGroupRelOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deletePaymentMethodGroupRelOrderType(
    config,
    paymentMethodGroupRelOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-order-types/${paymentMethodGroupRelOrderTypeId}`,
      data,
      op: 'deletePaymentMethodGroupRelOrderType',
      friendly: 'Generated method deletePaymentMethodGroupRelOrderType failed',
      ...opts,
    });
  }

  /**
   * getPaymentMethodGroupRelOrderTypeOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getPaymentMethodGroupRelOrderTypeOrderType(
    config,
    paymentMethodGroupRelOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-order-types/${paymentMethodGroupRelOrderTypeId}/order-type`,
      data,
      op: 'getPaymentMethodGroupRelOrderTypeOrderType',
      friendly:
        'Generated method getPaymentMethodGroupRelOrderTypeOrderType failed',
      ...opts,
    });
  }

  /**
   * deletePaymentMethodGroupRelTermBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deletePaymentMethodGroupRelTermBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-terms/batch`,
      data,
      op: 'deletePaymentMethodGroupRelTermBatch',
      friendly: 'Generated method deletePaymentMethodGroupRelTermBatch failed',
      ...opts,
    });
  }

  /**
   * deletePaymentMethodGroupRelTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deletePaymentMethodGroupRelTerm(
    config,
    paymentMethodGroupRelTermId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-terms/${paymentMethodGroupRelTermId}`,
      data,
      op: 'deletePaymentMethodGroupRelTerm',
      friendly: 'Generated method deletePaymentMethodGroupRelTerm failed',
      ...opts,
    });
  }

  /**
   * getPaymentMethodGroupRelTermTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getPaymentMethodGroupRelTermTerm(
    config,
    paymentMethodGroupRelTermId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rel-terms/${paymentMethodGroupRelTermId}/term`,
      data,
      op: 'getPaymentMethodGroupRelTermTerm',
      friendly: 'Generated method getPaymentMethodGroupRelTermTerm failed',
      ...opts,
    });
  }

  /**
   * getPaymentMethodGroupRelIdPaymentMethodGroupRelOrderTypesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getPaymentMethodGroupRelIdPaymentMethodGroupRelOrderTypesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rels/${id}/payment-method-group-rel-order-types`,
      data,
      op: 'getPaymentMethodGroupRelIdPaymentMethodGroupRelOrderTypesPage',
      friendly:
        'Generated method getPaymentMethodGroupRelIdPaymentMethodGroupRelOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postPaymentMethodGroupRelIdPaymentMethodGroupRelOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postPaymentMethodGroupRelIdPaymentMethodGroupRelOrderType(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rels/${id}/payment-method-group-rel-order-types`,
      data,
      op: 'postPaymentMethodGroupRelIdPaymentMethodGroupRelOrderType',
      friendly:
        'Generated method postPaymentMethodGroupRelIdPaymentMethodGroupRelOrderType failed',
      ...opts,
    });
  }

  /**
   * getPaymentMethodGroupRelIdPaymentMethodGroupRelTermsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getPaymentMethodGroupRelIdPaymentMethodGroupRelTermsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rels/${id}/payment-method-group-rel-terms`,
      data,
      op: 'getPaymentMethodGroupRelIdPaymentMethodGroupRelTermsPage',
      friendly:
        'Generated method getPaymentMethodGroupRelIdPaymentMethodGroupRelTermsPage failed',
      ...opts,
    });
  }

  /**
   * postPaymentMethodGroupRelIdPaymentMethodGroupRelTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postPaymentMethodGroupRelIdPaymentMethodGroupRelTerm(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/payment-method-group-rels/${id}/payment-method-group-rel-terms`,
      data,
      op: 'postPaymentMethodGroupRelIdPaymentMethodGroupRelTerm',
      friendly:
        'Generated method postPaymentMethodGroupRelIdPaymentMethodGroupRelTerm failed',
      ...opts,
    });
  }

  /**
   * deleteProductDisplayPageBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteProductDisplayPageBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/product-display-pages/batch`,
      data,
      op: 'deleteProductDisplayPageBatch',
      friendly: 'Generated method deleteProductDisplayPageBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/product-display-pages/${id}`,
      data,
      op: 'deleteProductDisplayPage',
      friendly: 'Generated method deleteProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * getProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/product-display-pages/${id}`,
      data,
      op: 'getProductDisplayPage',
      friendly: 'Generated method getProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * patchProductDisplayPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async patchProductDisplayPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-channel/v1.0/product-display-pages/${id}`,
      data,
      op: 'patchProductDisplayPage',
      friendly: 'Generated method patchProductDisplayPage failed',
      ...opts,
    });
  }

  /**
   * deleteShippingFixedOptionOrderTypeBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteShippingFixedOptionOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-order-types/batch`,
      data,
      op: 'deleteShippingFixedOptionOrderTypeBatch',
      friendly:
        'Generated method deleteShippingFixedOptionOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteShippingFixedOptionOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteShippingFixedOptionOrderType(
    config,
    shippingFixedOptionOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-order-types/${shippingFixedOptionOrderTypeId}`,
      data,
      op: 'deleteShippingFixedOptionOrderType',
      friendly: 'Generated method deleteShippingFixedOptionOrderType failed',
      ...opts,
    });
  }

  /**
   * getShippingFixedOptionOrderTypeOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getShippingFixedOptionOrderTypeOrderType(
    config,
    shippingFixedOptionOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-order-types/${shippingFixedOptionOrderTypeId}/order-type`,
      data,
      op: 'getShippingFixedOptionOrderTypeOrderType',
      friendly:
        'Generated method getShippingFixedOptionOrderTypeOrderType failed',
      ...opts,
    });
  }

  /**
   * deleteShippingFixedOptionTermBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteShippingFixedOptionTermBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-terms/batch`,
      data,
      op: 'deleteShippingFixedOptionTermBatch',
      friendly: 'Generated method deleteShippingFixedOptionTermBatch failed',
      ...opts,
    });
  }

  /**
   * deleteShippingFixedOptionTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async deleteShippingFixedOptionTerm(
    config,
    shippingFixedOptionTermId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-terms/${shippingFixedOptionTermId}`,
      data,
      op: 'deleteShippingFixedOptionTerm',
      friendly: 'Generated method deleteShippingFixedOptionTerm failed',
      ...opts,
    });
  }

  /**
   * getShippingFixedOptionTermTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getShippingFixedOptionTermTerm(
    config,
    shippingFixedOptionTermId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-option-terms/${shippingFixedOptionTermId}/term`,
      data,
      op: 'getShippingFixedOptionTermTerm',
      friendly: 'Generated method getShippingFixedOptionTermTerm failed',
      ...opts,
    });
  }

  /**
   * getShippingFixedOptionIdShippingFixedOptionOrderTypesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getShippingFixedOptionIdShippingFixedOptionOrderTypesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-options/${id}/shipping-fixed-option-order-types`,
      data,
      op: 'getShippingFixedOptionIdShippingFixedOptionOrderTypesPage',
      friendly:
        'Generated method getShippingFixedOptionIdShippingFixedOptionOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postShippingFixedOptionIdShippingFixedOptionOrderType
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postShippingFixedOptionIdShippingFixedOptionOrderType(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-options/${id}/shipping-fixed-option-order-types`,
      data,
      op: 'postShippingFixedOptionIdShippingFixedOptionOrderType',
      friendly:
        'Generated method postShippingFixedOptionIdShippingFixedOptionOrderType failed',
      ...opts,
    });
  }

  /**
   * getShippingFixedOptionIdShippingFixedOptionTermsPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getShippingFixedOptionIdShippingFixedOptionTermsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-options/${id}/shipping-fixed-option-terms`,
      data,
      op: 'getShippingFixedOptionIdShippingFixedOptionTermsPage',
      friendly:
        'Generated method getShippingFixedOptionIdShippingFixedOptionTermsPage failed',
      ...opts,
    });
  }

  /**
   * postShippingFixedOptionIdShippingFixedOptionTerm
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postShippingFixedOptionIdShippingFixedOptionTerm(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/shipping-fixed-options/${id}/shipping-fixed-option-terms`,
      data,
      op: 'postShippingFixedOptionIdShippingFixedOptionTerm',
      friendly:
        'Generated method postShippingFixedOptionIdShippingFixedOptionTerm failed',
      ...opts,
    });
  }

  /**
   * getTaxCategoriesPage
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getTaxCategoriesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/tax-categories`,
      data,
      op: 'getTaxCategoriesPage',
      friendly: 'Generated method getTaxCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postTaxCategoriesPageExportBatch
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async postTaxCategoriesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-channel/v1.0/tax-categories/export-batch`,
      data,
      op: 'postTaxCategoriesPageExportBatch',
      friendly: 'Generated method postTaxCategoriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getTaxCategory
   * API: headless-commerce-admin-channel-v1.0 | Version: v1.0
   */
  async getTaxCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-channel/v1.0/tax-categories/${id}`,
      data,
      op: 'getTaxCategory',
      friendly: 'Generated method getTaxCategory failed',
      ...opts,
    });
  }
}

module.exports = HeadlessCommerceAdminChannelClient_v1_0;
