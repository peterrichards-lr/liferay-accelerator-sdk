/**
 * HeadlessCommerceAdminPricingClient_v2_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessCommerceAdminPricingClient_v2_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getDiscountAccountAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountAccountAccount(config, discountAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-accounts/${discountAccountId}/account`,
      data,
      op: 'getDiscountAccountAccount',
      friendly: 'Generated method getDiscountAccountAccount failed',
      ...opts,
    });
  }

  /**
   * getPriceListAccountAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListAccountAccount(
    config,
    priceListAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-accounts/${priceListAccountId}/account`,
      data,
      op: 'getPriceListAccountAccount',
      friendly: 'Generated method getPriceListAccountAccount failed',
      ...opts,
    });
  }

  /**
   * getDiscountCategoryCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountCategoryCategory(
    config,
    discountCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-categories/${discountCategoryId}/category`,
      data,
      op: 'getDiscountCategoryCategory',
      friendly: 'Generated method getDiscountCategoryCategory failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierCategoryCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierCategoryCategory(
    config,
    priceModifierCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-categories/${priceModifierCategoryId}/category`,
      data,
      op: 'getPriceModifierCategoryCategory',
      friendly: 'Generated method getPriceModifierCategoryCategory failed',
      ...opts,
    });
  }

  /**
   * getDiscountChannelChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountChannelChannel(config, discountChannelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-channels/${discountChannelId}/channel`,
      data,
      op: 'getDiscountChannelChannel',
      friendly: 'Generated method getDiscountChannelChannel failed',
      ...opts,
    });
  }

  /**
   * getPriceListChannelChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListChannelChannel(
    config,
    priceListChannelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-channels/${priceListChannelId}/channel`,
      data,
      op: 'getPriceListChannelChannel',
      friendly: 'Generated method getPriceListChannelChannel failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountAccountGroup(
    config,
    discountAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-account-groups/${discountAccountGroupId}`,
      data,
      op: 'deleteDiscountAccountGroup',
      friendly: 'Generated method deleteDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountAccountGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-account-groups`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountAccountGroupsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-account-groups`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountAccountGroup',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountAccountGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-account-groups`,
      data,
      op: 'getDiscountIdDiscountAccountGroupsPage',
      friendly:
        'Generated method getDiscountIdDiscountAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-account-groups`,
      data,
      op: 'postDiscountIdDiscountAccountGroup',
      friendly: 'Generated method postDiscountIdDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccountGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-account-groups/batch`,
      data,
      op: 'deleteDiscountAccountGroupBatch',
      friendly: 'Generated method deleteDiscountAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccountGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-account-groups/batch`,
      data,
      op: 'postDiscountIdDiscountAccountGroupBatch',
      friendly:
        'Generated method postDiscountIdDiscountAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountAccount(config, discountAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-accounts/${discountAccountId}`,
      data,
      op: 'deleteDiscountAccount',
      friendly: 'Generated method deleteDiscountAccount failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountAccountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-accounts`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountAccountsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountAccount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-accounts`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountAccount',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountAccount failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountAccountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountAccountsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-accounts`,
      data,
      op: 'getDiscountIdDiscountAccountsPage',
      friendly: 'Generated method getDiscountIdDiscountAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountAccount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-accounts`,
      data,
      op: 'postDiscountIdDiscountAccount',
      friendly: 'Generated method postDiscountIdDiscountAccount failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-accounts/batch`,
      data,
      op: 'deleteDiscountAccountBatch',
      friendly: 'Generated method deleteDiscountAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-accounts/batch`,
      data,
      op: 'postDiscountIdDiscountAccountBatch',
      friendly: 'Generated method postDiscountIdDiscountAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountCategory(config, discountCategoryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-categories/${discountCategoryId}`,
      data,
      op: 'deleteDiscountCategory',
      friendly: 'Generated method deleteDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountCategoriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountCategoriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-categories`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountCategoriesPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountCategory(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-categories`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountCategory',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountCategoriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountCategoriesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-categories`,
      data,
      op: 'getDiscountIdDiscountCategoriesPage',
      friendly: 'Generated method getDiscountIdDiscountCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-categories`,
      data,
      op: 'postDiscountIdDiscountCategory',
      friendly: 'Generated method postDiscountIdDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountCategoryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-categories/batch`,
      data,
      op: 'deleteDiscountCategoryBatch',
      friendly: 'Generated method deleteDiscountCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountCategoryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-categories/batch`,
      data,
      op: 'postDiscountIdDiscountCategoryBatch',
      friendly: 'Generated method postDiscountIdDiscountCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountChannel(config, discountChannelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-channels/${discountChannelId}`,
      data,
      op: 'deleteDiscountChannel',
      friendly: 'Generated method deleteDiscountChannel failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountChannelsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-channels`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountChannelsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountChannel(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-channels`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountChannel',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountChannel failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountChannelsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountChannelsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-channels`,
      data,
      op: 'getDiscountIdDiscountChannelsPage',
      friendly: 'Generated method getDiscountIdDiscountChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountChannel(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-channels`,
      data,
      op: 'postDiscountIdDiscountChannel',
      friendly: 'Generated method postDiscountIdDiscountChannel failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountChannelBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-channels/batch`,
      data,
      op: 'deleteDiscountChannelBatch',
      friendly: 'Generated method deleteDiscountChannelBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountChannelBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-channels/batch`,
      data,
      op: 'postDiscountIdDiscountChannelBatch',
      friendly: 'Generated method postDiscountIdDiscountChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountOrderType(config, discountOrderTypeId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-order-types/${discountOrderTypeId}`,
      data,
      op: 'deleteDiscountOrderType',
      friendly: 'Generated method deleteDiscountOrderType failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountOrderTypesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountOrderTypesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-order-types`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountOrderTypesPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountOrderType(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-order-types`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountOrderType',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountOrderType failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountOrderTypesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountOrderTypesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-order-types`,
      data,
      op: 'getDiscountIdDiscountOrderTypesPage',
      friendly: 'Generated method getDiscountIdDiscountOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountOrderType(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-order-types`,
      data,
      op: 'postDiscountIdDiscountOrderType',
      friendly: 'Generated method postDiscountIdDiscountOrderType failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountOrderTypeBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-order-types/batch`,
      data,
      op: 'deleteDiscountOrderTypeBatch',
      friendly: 'Generated method deleteDiscountOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountOrderTypeBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-order-types/batch`,
      data,
      op: 'postDiscountIdDiscountOrderTypeBatch',
      friendly: 'Generated method postDiscountIdDiscountOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountProductGroup(
    config,
    discountProductGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-product-groups/${discountProductGroupId}`,
      data,
      op: 'deleteDiscountProductGroup',
      friendly: 'Generated method deleteDiscountProductGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountProductGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountProductGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-product-groups`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountProductGroupsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountProductGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountProductGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-product-groups`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountProductGroup',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountProductGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountProductGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountProductGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-product-groups`,
      data,
      op: 'getDiscountIdDiscountProductGroupsPage',
      friendly:
        'Generated method getDiscountIdDiscountProductGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountProductGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-product-groups`,
      data,
      op: 'postDiscountIdDiscountProductGroup',
      friendly: 'Generated method postDiscountIdDiscountProductGroup failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProductGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountProductGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-product-groups/batch`,
      data,
      op: 'deleteDiscountProductGroupBatch',
      friendly: 'Generated method deleteDiscountProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProductGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountProductGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-product-groups/batch`,
      data,
      op: 'postDiscountIdDiscountProductGroupBatch',
      friendly:
        'Generated method postDiscountIdDiscountProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountProduct(config, discountProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-products/${discountProductId}`,
      data,
      op: 'deleteDiscountProduct',
      friendly: 'Generated method deleteDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountProductsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-products`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountProductsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountProductsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-products`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountProduct',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountProductsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-products`,
      data,
      op: 'getDiscountIdDiscountProductsPage',
      friendly: 'Generated method getDiscountIdDiscountProductsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-products`,
      data,
      op: 'postDiscountIdDiscountProduct',
      friendly: 'Generated method postDiscountIdDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProductBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-products/batch`,
      data,
      op: 'deleteDiscountProductBatch',
      friendly: 'Generated method deleteDiscountProductBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProductBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-products/batch`,
      data,
      op: 'postDiscountIdDiscountProductBatch',
      friendly: 'Generated method postDiscountIdDiscountProductBatch failed',
      ...opts,
    });
  }

  /**
   * getDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}`,
      data,
      op: 'getDiscount',
      friendly: 'Generated method getDiscount failed',
      ...opts,
    });
  }

  /**
   * deleteDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}`,
      data,
      op: 'deleteDiscount',
      friendly: 'Generated method deleteDiscount failed',
      ...opts,
    });
  }

  /**
   * patchDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}`,
      data,
      op: 'patchDiscount',
      friendly: 'Generated method patchDiscount failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getDiscountByExternalReferenceCode',
      friendly: 'Generated method getDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async putDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putDiscountByExternalReferenceCode',
      friendly: 'Generated method putDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteDiscountByExternalReferenceCode',
      friendly: 'Generated method deleteDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchDiscountByExternalReferenceCode',
      friendly: 'Generated method patchDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getDiscountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts`,
      data,
      op: 'getDiscountsPage',
      friendly: 'Generated method getDiscountsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscount(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts`,
      data,
      op: 'postDiscount',
      friendly: 'Generated method postDiscount failed',
      ...opts,
    });
  }

  /**
   * postDiscountsPageExportBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/export-batch`,
      data,
      op: 'postDiscountsPageExportBatch',
      friendly: 'Generated method postDiscountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/batch`,
      data,
      op: 'postDiscountBatch',
      friendly: 'Generated method postDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/batch`,
      data,
      op: 'deleteDiscountBatch',
      friendly: 'Generated method deleteDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * getDiscountRule
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-rules/${id}`,
      data,
      op: 'getDiscountRule',
      friendly: 'Generated method getDiscountRule failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountRule
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-rules/${id}`,
      data,
      op: 'deleteDiscountRule',
      friendly: 'Generated method deleteDiscountRule failed',
      ...opts,
    });
  }

  /**
   * patchDiscountRule
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-rules/${id}`,
      data,
      op: 'patchDiscountRule',
      friendly: 'Generated method patchDiscountRule failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountRulesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountRulesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-rules`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountRulesPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountRulesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountRule
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountRule(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-rules`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountRule',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountRule failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountRulesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountRulesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-rules`,
      data,
      op: 'getDiscountIdDiscountRulesPage',
      friendly: 'Generated method getDiscountIdDiscountRulesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountRule
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-rules`,
      data,
      op: 'postDiscountIdDiscountRule',
      friendly: 'Generated method postDiscountIdDiscountRule failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountRuleBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-rules/batch`,
      data,
      op: 'deleteDiscountRuleBatch',
      friendly: 'Generated method deleteDiscountRuleBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountRuleBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-rules/batch`,
      data,
      op: 'postDiscountIdDiscountRuleBatch',
      friendly: 'Generated method postDiscountIdDiscountRuleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountSku
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountSku(config, discountSkuId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-skus/${discountSkuId}`,
      data,
      op: 'deleteDiscountSku',
      friendly: 'Generated method deleteDiscountSku failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountSkusPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountIdDiscountSkusPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-skus`,
      data,
      op: 'getDiscountIdDiscountSkusPage',
      friendly: 'Generated method getDiscountIdDiscountSkusPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountSku
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountSku(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/${id}/discount-skus`,
      data,
      op: 'postDiscountIdDiscountSku',
      friendly: 'Generated method postDiscountIdDiscountSku failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountSkusPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountByExternalReferenceCodeDiscountSkusPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-skus`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountSkusPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountSkusPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountSku
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountByExternalReferenceCodeDiscountSku(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discount-skus`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountSku',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountSku failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountSkuBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteDiscountSkuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-skus/batch`,
      data,
      op: 'deleteDiscountSkuBatch',
      friendly: 'Generated method deleteDiscountSkuBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountSkuBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postDiscountIdDiscountSkuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/discounts/discount-skus/batch`,
      data,
      op: 'postDiscountIdDiscountSkuBatch',
      friendly: 'Generated method postDiscountIdDiscountSkuBatch failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getDiscountOrderTypeOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountOrderTypeOrderType(
    config,
    discountOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-order-types/${discountOrderTypeId}/order-type`,
      data,
      op: 'getDiscountOrderTypeOrderType',
      friendly: 'Generated method getDiscountOrderTypeOrderType failed',
      ...opts,
    });
  }

  /**
   * getPriceListOrderTypeOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListOrderTypeOrderType(
    config,
    priceListOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-order-types/${priceListOrderTypeId}/order-type`,
      data,
      op: 'getPriceListOrderTypeOrderType',
      friendly: 'Generated method getPriceListOrderTypeOrderType failed',
      ...opts,
    });
  }

  /**
   * getPriceEntry
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntry(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}`,
      data,
      op: 'getPriceEntry',
      friendly: 'Generated method getPriceEntry failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntry
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceEntry(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}`,
      data,
      op: 'deletePriceEntry',
      friendly: 'Generated method deletePriceEntry failed',
      ...opts,
    });
  }

  /**
   * patchPriceEntry
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceEntry(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}`,
      data,
      op: 'patchPriceEntry',
      friendly: 'Generated method patchPriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getPriceEntryByExternalReferenceCode',
      friendly: 'Generated method getPriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deletePriceEntryByExternalReferenceCode',
      friendly:
        'Generated method deletePriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchPriceEntryByExternalReferenceCode',
      friendly:
        'Generated method patchPriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceEntriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceEntriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-entries`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceEntriesPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceEntry
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceEntry(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-entries`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceEntry',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceEntriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceEntriesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-entries`,
      data,
      op: 'getPriceListIdPriceEntriesPage',
      friendly: 'Generated method getPriceListIdPriceEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceEntry
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-entries`,
      data,
      op: 'postPriceListIdPriceEntry',
      friendly: 'Generated method postPriceListIdPriceEntry failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/batch`,
      data,
      op: 'deletePriceEntryBatch',
      friendly: 'Generated method deletePriceEntryBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceEntryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-entries/batch`,
      data,
      op: 'postPriceListIdPriceEntryBatch',
      friendly: 'Generated method postPriceListIdPriceEntryBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListAccountGroup(
    config,
    priceListAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-account-groups/${priceListAccountGroupId}`,
      data,
      op: 'deletePriceListAccountGroup',
      friendly: 'Generated method deletePriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListAccountGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceListAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-account-groups`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListAccountGroupsPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceListAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-account-groups`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListAccountGroup',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListAccountGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceListAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-account-groups`,
      data,
      op: 'getPriceListIdPriceListAccountGroupsPage',
      friendly:
        'Generated method getPriceListIdPriceListAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-account-groups`,
      data,
      op: 'postPriceListIdPriceListAccountGroup',
      friendly: 'Generated method postPriceListIdPriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccountGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-account-groups/batch`,
      data,
      op: 'deletePriceListAccountGroupBatch',
      friendly: 'Generated method deletePriceListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccountGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-list-account-groups/batch`,
      data,
      op: 'postPriceListIdPriceListAccountGroupBatch',
      friendly:
        'Generated method postPriceListIdPriceListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListAccount(config, priceListAccountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-accounts/${priceListAccountId}`,
      data,
      op: 'deletePriceListAccount',
      friendly: 'Generated method deletePriceListAccount failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListAccountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceListAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-accounts`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListAccountsPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceListAccount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-accounts`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListAccount',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListAccount failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListAccountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceListAccountsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-accounts`,
      data,
      op: 'getPriceListIdPriceListAccountsPage',
      friendly: 'Generated method getPriceListIdPriceListAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListAccount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-accounts`,
      data,
      op: 'postPriceListIdPriceListAccount',
      friendly: 'Generated method postPriceListIdPriceListAccount failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-accounts/batch`,
      data,
      op: 'deletePriceListAccountBatch',
      friendly: 'Generated method deletePriceListAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-list-accounts/batch`,
      data,
      op: 'postPriceListIdPriceListAccountBatch',
      friendly: 'Generated method postPriceListIdPriceListAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListChannel(config, priceListChannelId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-channels/${priceListChannelId}`,
      data,
      op: 'deletePriceListChannel',
      friendly: 'Generated method deletePriceListChannel failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListChannelsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceListChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-channels`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListChannelsPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceListChannel(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-channels`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListChannel',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListChannel failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListChannelsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceListChannelsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-channels`,
      data,
      op: 'getPriceListIdPriceListChannelsPage',
      friendly: 'Generated method getPriceListIdPriceListChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListChannel
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListChannel(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-channels`,
      data,
      op: 'postPriceListIdPriceListChannel',
      friendly: 'Generated method postPriceListIdPriceListChannel failed',
      ...opts,
    });
  }

  /**
   * deletePriceListChannelBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-channels/batch`,
      data,
      op: 'deletePriceListChannelBatch',
      friendly: 'Generated method deletePriceListChannelBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListChannelBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-list-channels/batch`,
      data,
      op: 'postPriceListIdPriceListChannelBatch',
      friendly: 'Generated method postPriceListIdPriceListChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListDiscount(config, priceListDiscountId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-discounts/${priceListDiscountId}`,
      data,
      op: 'deletePriceListDiscount',
      friendly: 'Generated method deletePriceListDiscount failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListDiscountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceListDiscountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-discounts`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListDiscountsPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListDiscountsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceListDiscount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-discounts`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListDiscount',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListDiscount failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListDiscountsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceListDiscountsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-discounts`,
      data,
      op: 'getPriceListIdPriceListDiscountsPage',
      friendly: 'Generated method getPriceListIdPriceListDiscountsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListDiscount
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-discounts`,
      data,
      op: 'postPriceListIdPriceListDiscount',
      friendly: 'Generated method postPriceListIdPriceListDiscount failed',
      ...opts,
    });
  }

  /**
   * deletePriceListDiscountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-discounts/batch`,
      data,
      op: 'deletePriceListDiscountBatch',
      friendly: 'Generated method deletePriceListDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListDiscountBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-list-discounts/batch`,
      data,
      op: 'postPriceListIdPriceListDiscountBatch',
      friendly: 'Generated method postPriceListIdPriceListDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListOrderType(
    config,
    priceListOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-order-types/${priceListOrderTypeId}`,
      data,
      op: 'deletePriceListOrderType',
      friendly: 'Generated method deletePriceListOrderType failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListOrderTypesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceListOrderTypesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-order-types`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListOrderTypesPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceListOrderType(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-list-order-types`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListOrderType',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListOrderType failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListOrderTypesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceListOrderTypesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-order-types`,
      data,
      op: 'getPriceListIdPriceListOrderTypesPage',
      friendly: 'Generated method getPriceListIdPriceListOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListOrderType
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListOrderType(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-list-order-types`,
      data,
      op: 'postPriceListIdPriceListOrderType',
      friendly: 'Generated method postPriceListIdPriceListOrderType failed',
      ...opts,
    });
  }

  /**
   * deletePriceListOrderTypeBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-order-types/batch`,
      data,
      op: 'deletePriceListOrderTypeBatch',
      friendly: 'Generated method deletePriceListOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListOrderTypeBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceListOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-list-order-types/batch`,
      data,
      op: 'postPriceListIdPriceListOrderTypeBatch',
      friendly:
        'Generated method postPriceListIdPriceListOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * getPriceList
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}`,
      data,
      op: 'getPriceList',
      friendly: 'Generated method getPriceList failed',
      ...opts,
    });
  }

  /**
   * deletePriceList
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}`,
      data,
      op: 'deletePriceList',
      friendly: 'Generated method deletePriceList failed',
      ...opts,
    });
  }

  /**
   * patchPriceList
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}`,
      data,
      op: 'patchPriceList',
      friendly: 'Generated method patchPriceList failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getPriceListByExternalReferenceCode',
      friendly: 'Generated method getPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async putPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putPriceListByExternalReferenceCode',
      friendly: 'Generated method putPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deletePriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deletePriceListByExternalReferenceCode',
      friendly:
        'Generated method deletePriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchPriceListByExternalReferenceCode',
      friendly: 'Generated method patchPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceListsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists`,
      data,
      op: 'getPriceListsPage',
      friendly: 'Generated method getPriceListsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceList
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceList(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists`,
      data,
      op: 'postPriceList',
      friendly: 'Generated method postPriceList failed',
      ...opts,
    });
  }

  /**
   * postPriceListsPageExportBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/export-batch`,
      data,
      op: 'postPriceListsPageExportBatch',
      friendly: 'Generated method postPriceListsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/batch`,
      data,
      op: 'postPriceListBatch',
      friendly: 'Generated method postPriceListBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/batch`,
      data,
      op: 'deletePriceListBatch',
      friendly: 'Generated method deletePriceListBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierCategory(
    config,
    priceModifierCategoryId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-categories/${priceModifierCategoryId}`,
      data,
      op: 'deletePriceModifierCategory',
      friendly: 'Generated method deletePriceModifierCategory failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierByExternalReferenceCodePriceModifierCategoriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierByExternalReferenceCodePriceModifierCategoriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-categories`,
      data,
      op: 'getPriceModifierByExternalReferenceCodePriceModifierCategoriesPage',
      friendly:
        'Generated method getPriceModifierByExternalReferenceCodePriceModifierCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierByExternalReferenceCodePriceModifierCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierByExternalReferenceCodePriceModifierCategory(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-categories`,
      data,
      op: 'postPriceModifierByExternalReferenceCodePriceModifierCategory',
      friendly:
        'Generated method postPriceModifierByExternalReferenceCodePriceModifierCategory failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierIdPriceModifierCategoriesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierIdPriceModifierCategoriesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-categories`,
      data,
      op: 'getPriceModifierIdPriceModifierCategoriesPage',
      friendly:
        'Generated method getPriceModifierIdPriceModifierCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierCategory
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-categories`,
      data,
      op: 'postPriceModifierIdPriceModifierCategory',
      friendly:
        'Generated method postPriceModifierIdPriceModifierCategory failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierCategoryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-categories/batch`,
      data,
      op: 'deletePriceModifierCategoryBatch',
      friendly: 'Generated method deletePriceModifierCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierCategoryBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/price-modifier-categories/batch`,
      data,
      op: 'postPriceModifierIdPriceModifierCategoryBatch',
      friendly:
        'Generated method postPriceModifierIdPriceModifierCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierProductGroup(
    config,
    priceModifierProductGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-product-groups/${priceModifierProductGroupId}`,
      data,
      op: 'deletePriceModifierProductGroup',
      friendly: 'Generated method deletePriceModifierProductGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierByExternalReferenceCodePriceModifierProductGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierByExternalReferenceCodePriceModifierProductGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-product-groups`,
      data,
      op: 'getPriceModifierByExternalReferenceCodePriceModifierProductGroupsPage',
      friendly:
        'Generated method getPriceModifierByExternalReferenceCodePriceModifierProductGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierByExternalReferenceCodePriceModifierProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierByExternalReferenceCodePriceModifierProductGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-product-groups`,
      data,
      op: 'postPriceModifierByExternalReferenceCodePriceModifierProductGroup',
      friendly:
        'Generated method postPriceModifierByExternalReferenceCodePriceModifierProductGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierIdPriceModifierProductGroupsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierIdPriceModifierProductGroupsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-product-groups`,
      data,
      op: 'getPriceModifierIdPriceModifierProductGroupsPage',
      friendly:
        'Generated method getPriceModifierIdPriceModifierProductGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierProductGroup(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-product-groups`,
      data,
      op: 'postPriceModifierIdPriceModifierProductGroup',
      friendly:
        'Generated method postPriceModifierIdPriceModifierProductGroup failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierProductGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierProductGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-product-groups/batch`,
      data,
      op: 'deletePriceModifierProductGroupBatch',
      friendly: 'Generated method deletePriceModifierProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierProductGroupBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierProductGroupBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/price-modifier-product-groups/batch`,
      data,
      op: 'postPriceModifierIdPriceModifierProductGroupBatch',
      friendly:
        'Generated method postPriceModifierIdPriceModifierProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierProduct(
    config,
    priceModifierProductId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-products/${priceModifierProductId}`,
      data,
      op: 'deletePriceModifierProduct',
      friendly: 'Generated method deletePriceModifierProduct failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierByExternalReferenceCodePriceModifierProductsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierByExternalReferenceCodePriceModifierProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-products`,
      data,
      op: 'getPriceModifierByExternalReferenceCodePriceModifierProductsPage',
      friendly:
        'Generated method getPriceModifierByExternalReferenceCodePriceModifierProductsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierByExternalReferenceCodePriceModifierProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierByExternalReferenceCodePriceModifierProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}/price-modifier-products`,
      data,
      op: 'postPriceModifierByExternalReferenceCodePriceModifierProduct',
      friendly:
        'Generated method postPriceModifierByExternalReferenceCodePriceModifierProduct failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierIdPriceModifierProductsPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierIdPriceModifierProductsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-products`,
      data,
      op: 'getPriceModifierIdPriceModifierProductsPage',
      friendly:
        'Generated method getPriceModifierIdPriceModifierProductsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}/price-modifier-products`,
      data,
      op: 'postPriceModifierIdPriceModifierProduct',
      friendly:
        'Generated method postPriceModifierIdPriceModifierProduct failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierProductBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-products/batch`,
      data,
      op: 'deletePriceModifierProductBatch',
      friendly: 'Generated method deletePriceModifierProductBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceModifierIdPriceModifierProductBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceModifierIdPriceModifierProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/price-modifier-products/batch`,
      data,
      op: 'postPriceModifierIdPriceModifierProductBatch',
      friendly:
        'Generated method postPriceModifierIdPriceModifierProductBatch failed',
      ...opts,
    });
  }

  /**
   * getPriceModifier
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifier(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}`,
      data,
      op: 'getPriceModifier',
      friendly: 'Generated method getPriceModifier failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifier
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifier(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}`,
      data,
      op: 'deletePriceModifier',
      friendly: 'Generated method deletePriceModifier failed',
      ...opts,
    });
  }

  /**
   * patchPriceModifier
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceModifier(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/${id}`,
      data,
      op: 'patchPriceModifier',
      friendly: 'Generated method patchPriceModifier failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getPriceModifierByExternalReferenceCode',
      friendly:
        'Generated method getPriceModifierByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deletePriceModifierByExternalReferenceCode',
      friendly:
        'Generated method deletePriceModifierByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPriceModifierByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchPriceModifierByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchPriceModifierByExternalReferenceCode',
      friendly:
        'Generated method patchPriceModifierByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceModifiersPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListByExternalReferenceCodePriceModifiersPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-modifiers`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceModifiersPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceModifiersPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceModifier
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListByExternalReferenceCodePriceModifier(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/by-externalReferenceCode/${externalReferenceCode}/price-modifiers`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceModifier',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceModifier failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceModifiersPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListIdPriceModifiersPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-modifiers`,
      data,
      op: 'getPriceListIdPriceModifiersPage',
      friendly: 'Generated method getPriceListIdPriceModifiersPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceModifier
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceModifier(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/${id}/price-modifiers`,
      data,
      op: 'postPriceListIdPriceModifier',
      friendly: 'Generated method postPriceListIdPriceModifier failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceModifierBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceListIdPriceModifierBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-lists/price-modifiers/batch`,
      data,
      op: 'postPriceListIdPriceModifierBatch',
      friendly: 'Generated method postPriceListIdPriceModifierBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceModifierBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deletePriceModifierBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifiers/batch`,
      data,
      op: 'deletePriceModifierBatch',
      friendly: 'Generated method deletePriceModifierBatch failed',
      ...opts,
    });
  }

  /**
   * getDiscountAccountGroupAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountAccountGroupAccountGroup(
    config,
    discountAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-account-groups/${discountAccountGroupId}/account-group`,
      data,
      op: 'getDiscountAccountGroupAccountGroup',
      friendly: 'Generated method getDiscountAccountGroupAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceListAccountGroupAccountGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceListAccountGroupAccountGroup(
    config,
    priceListAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-list-account-groups/${priceListAccountGroupId}/account-group`,
      data,
      op: 'getPriceListAccountGroupAccountGroup',
      friendly: 'Generated method getPriceListAccountGroupAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountProductGroupProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountProductGroupProductGroup(
    config,
    discountProductGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-product-groups/${discountProductGroupId}/product-group`,
      data,
      op: 'getDiscountProductGroupProductGroup',
      friendly: 'Generated method getDiscountProductGroupProductGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierProductGroupProductGroup
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierProductGroupProductGroup(
    config,
    priceModifierProductGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-product-groups/${priceModifierProductGroupId}/product-group`,
      data,
      op: 'getPriceModifierProductGroupProductGroup',
      friendly:
        'Generated method getPriceModifierProductGroupProductGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountProductProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountProductProduct(config, discountProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-products/${discountProductId}/product`,
      data,
      op: 'getDiscountProductProduct',
      friendly: 'Generated method getDiscountProductProduct failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryIdProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntryIdProduct(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}/product`,
      data,
      op: 'getPriceEntryIdProduct',
      friendly: 'Generated method getPriceEntryIdProduct failed',
      ...opts,
    });
  }

  /**
   * getPriceModifierProductProduct
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceModifierProductProduct(
    config,
    priceModifierProductId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-modifier-products/${priceModifierProductId}/product`,
      data,
      op: 'getPriceModifierProductProduct',
      friendly: 'Generated method getPriceModifierProductProduct failed',
      ...opts,
    });
  }

  /**
   * getDiscountSkuSku
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getDiscountSkuSku(config, discountSkuId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/discount-skus/${discountSkuId}/sku`,
      data,
      op: 'getDiscountSkuSku',
      friendly: 'Generated method getDiscountSkuSku failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryIdSku
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntryIdSku(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}/sku`,
      data,
      op: 'getPriceEntryIdSku',
      friendly: 'Generated method getPriceEntryIdSku failed',
      ...opts,
    });
  }

  /**
   * getTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getTierPriceByExternalReferenceCode',
      friendly: 'Generated method getTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteTierPriceByExternalReferenceCode',
      friendly:
        'Generated method deleteTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchTierPriceByExternalReferenceCode',
      friendly: 'Generated method patchTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getTierPrice
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/${id}`,
      data,
      op: 'getTierPrice',
      friendly: 'Generated method getTierPrice failed',
      ...opts,
    });
  }

  /**
   * deleteTierPrice
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/${id}`,
      data,
      op: 'deleteTierPrice',
      friendly: 'Generated method deleteTierPrice failed',
      ...opts,
    });
  }

  /**
   * patchTierPrice
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async patchTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/${id}`,
      data,
      op: 'patchTierPrice',
      friendly: 'Generated method patchTierPrice failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryByExternalReferenceCodeTierPricesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntryByExternalReferenceCodeTierPricesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/by-externalReferenceCode/${externalReferenceCode}/tier-prices`,
      data,
      op: 'getPriceEntryByExternalReferenceCodeTierPricesPage',
      friendly:
        'Generated method getPriceEntryByExternalReferenceCodeTierPricesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryByExternalReferenceCodeTierPrice
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceEntryByExternalReferenceCodeTierPrice(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/by-externalReferenceCode/${externalReferenceCode}/tier-prices`,
      data,
      op: 'postPriceEntryByExternalReferenceCodeTierPrice',
      friendly:
        'Generated method postPriceEntryByExternalReferenceCodeTierPrice failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryIdTierPricesPage
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async getPriceEntryIdTierPricesPage(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}/tier-prices`,
      data,
      op: 'getPriceEntryIdTierPricesPage',
      friendly: 'Generated method getPriceEntryIdTierPricesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryIdTierPrice
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceEntryIdTierPrice(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}/tier-prices`,
      data,
      op: 'postPriceEntryIdTierPrice',
      friendly: 'Generated method postPriceEntryIdTierPrice failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryIdTierPriceBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async postPriceEntryIdTierPriceBatch(config, priceEntryId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v2.0/price-entries/${priceEntryId}/tier-prices/batch`,
      data,
      op: 'postPriceEntryIdTierPriceBatch',
      friendly: 'Generated method postPriceEntryIdTierPriceBatch failed',
      ...opts,
    });
  }

  /**
   * deleteTierPriceBatch
   * API: headless-commerce-admin-pricing-v2.0 | Version: v2.0
   */
  async deleteTierPriceBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v2.0/tier-prices/batch`,
      data,
      op: 'deleteTierPriceBatch',
      friendly: 'Generated method deleteTierPriceBatch failed',
      ...opts,
    });
  }
}

module.exports = HeadlessCommerceAdminPricingClient_v2_0;
