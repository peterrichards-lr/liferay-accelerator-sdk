/**
 * HeadlessCommerceAdminPricingClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessCommerceAdminPricingClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountRulesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountByExternalReferenceCodeDiscountRulesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discount/by-externalReferenceCode/${externalReferenceCode}/discountRules`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountRulesPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountRulesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountRule
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountByExternalReferenceCodeDiscountRule(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discount/by-externalReferenceCode/${externalReferenceCode}/discountRules`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountRule',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountRule failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccountGroupBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountAccountGroups/batch`,
      data,
      op: 'deleteDiscountAccountGroupBatch',
      friendly: 'Generated method deleteDiscountAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountAccountGroups/${id}`,
      data,
      op: 'deleteDiscountAccountGroup',
      friendly: 'Generated method deleteDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountCategoryBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountCategories/batch`,
      data,
      op: 'deleteDiscountCategoryBatch',
      friendly: 'Generated method deleteDiscountCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountCategory
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountCategories/${id}`,
      data,
      op: 'deleteDiscountCategory',
      friendly: 'Generated method deleteDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProductBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountProducts/batch`,
      data,
      op: 'deleteDiscountProductBatch',
      friendly: 'Generated method deleteDiscountProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountProduct
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountProducts/${id}`,
      data,
      op: 'deleteDiscountProduct',
      friendly: 'Generated method deleteDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountRuleBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountRules/batch`,
      data,
      op: 'deleteDiscountRuleBatch',
      friendly: 'Generated method deleteDiscountRuleBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountRule
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountRules/${id}`,
      data,
      op: 'deleteDiscountRule',
      friendly: 'Generated method deleteDiscountRule failed',
      ...opts,
    });
  }

  /**
   * getDiscountRule
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountRules/${id}`,
      data,
      op: 'getDiscountRule',
      friendly: 'Generated method getDiscountRule failed',
      ...opts,
    });
  }

  /**
   * patchDiscountRule
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/discountRules/${id}`,
      data,
      op: 'patchDiscountRule',
      friendly: 'Generated method patchDiscountRule failed',
      ...opts,
    });
  }

  /**
   * getDiscountsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts`,
      data,
      op: 'getDiscountsPage',
      friendly: 'Generated method getDiscountsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscount
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscount(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts`,
      data,
      op: 'postDiscount',
      friendly: 'Generated method postDiscount failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/batch`,
      data,
      op: 'deleteDiscountBatch',
      friendly: 'Generated method deleteDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/batch`,
      data,
      op: 'postDiscountBatch',
      friendly: 'Generated method postDiscountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteDiscountByExternalReferenceCode',
      friendly: 'Generated method deleteDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getDiscountByExternalReferenceCode',
      friendly: 'Generated method getDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchDiscountByExternalReferenceCode',
      friendly: 'Generated method patchDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putDiscountByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async putDiscountByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putDiscountByExternalReferenceCode',
      friendly: 'Generated method putDiscountByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountAccountGroupsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountByExternalReferenceCodeDiscountAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountAccountGroups`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountAccountGroupsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountByExternalReferenceCodeDiscountAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountAccountGroups`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountAccountGroup',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountCategoriesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountByExternalReferenceCodeDiscountCategoriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountCategories`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountCategoriesPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountCategory
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountByExternalReferenceCodeDiscountCategory(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountCategories`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountCategory',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * getDiscountByExternalReferenceCodeDiscountProductsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountByExternalReferenceCodeDiscountProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountProducts`,
      data,
      op: 'getDiscountByExternalReferenceCodeDiscountProductsPage',
      friendly:
        'Generated method getDiscountByExternalReferenceCodeDiscountProductsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountByExternalReferenceCodeDiscountProduct
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountByExternalReferenceCodeDiscountProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/by-externalReferenceCode/${externalReferenceCode}/discountProducts`,
      data,
      op: 'postDiscountByExternalReferenceCodeDiscountProduct',
      friendly:
        'Generated method postDiscountByExternalReferenceCodeDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccountGroupBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/discountAccountGroups/batch`,
      data,
      op: 'postDiscountIdDiscountAccountGroupBatch',
      friendly:
        'Generated method postDiscountIdDiscountAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountCategoryBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/discountCategories/batch`,
      data,
      op: 'postDiscountIdDiscountCategoryBatch',
      friendly: 'Generated method postDiscountIdDiscountCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProductBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/discountProducts/batch`,
      data,
      op: 'postDiscountIdDiscountProductBatch',
      friendly: 'Generated method postDiscountIdDiscountProductBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountRuleBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountRuleBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/discountRules/batch`,
      data,
      op: 'postDiscountIdDiscountRuleBatch',
      friendly: 'Generated method postDiscountIdDiscountRuleBatch failed',
      ...opts,
    });
  }

  /**
   * postDiscountsPageExportBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/export-batch`,
      data,
      op: 'postDiscountsPageExportBatch',
      friendly: 'Generated method postDiscountsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteDiscount
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}`,
      data,
      op: 'deleteDiscount',
      friendly: 'Generated method deleteDiscount failed',
      ...opts,
    });
  }

  /**
   * getDiscount
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}`,
      data,
      op: 'getDiscount',
      friendly: 'Generated method getDiscount failed',
      ...opts,
    });
  }

  /**
   * patchDiscount
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchDiscount(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}`,
      data,
      op: 'patchDiscount',
      friendly: 'Generated method patchDiscount failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountAccountGroupsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountIdDiscountAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountAccountGroups`,
      data,
      op: 'getDiscountIdDiscountAccountGroupsPage',
      friendly:
        'Generated method getDiscountIdDiscountAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountAccountGroups`,
      data,
      op: 'postDiscountIdDiscountAccountGroup',
      friendly: 'Generated method postDiscountIdDiscountAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountCategoriesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountIdDiscountCategoriesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountCategories`,
      data,
      op: 'getDiscountIdDiscountCategoriesPage',
      friendly: 'Generated method getDiscountIdDiscountCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountCategory
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountCategories`,
      data,
      op: 'postDiscountIdDiscountCategory',
      friendly: 'Generated method postDiscountIdDiscountCategory failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountProductsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountIdDiscountProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountProducts`,
      data,
      op: 'getDiscountIdDiscountProductsPage',
      friendly: 'Generated method getDiscountIdDiscountProductsPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountProduct
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountProducts`,
      data,
      op: 'postDiscountIdDiscountProduct',
      friendly: 'Generated method postDiscountIdDiscountProduct failed',
      ...opts,
    });
  }

  /**
   * getDiscountIdDiscountRulesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getDiscountIdDiscountRulesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountRules`,
      data,
      op: 'getDiscountIdDiscountRulesPage',
      friendly: 'Generated method getDiscountIdDiscountRulesPage failed',
      ...opts,
    });
  }

  /**
   * postDiscountIdDiscountRule
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postDiscountIdDiscountRule(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/discounts/${id}/discountRules`,
      data,
      op: 'postDiscountIdDiscountRule',
      friendly: 'Generated method postDiscountIdDiscountRule failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntryBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/batch`,
      data,
      op: 'deletePriceEntryBatch',
      friendly: 'Generated method deletePriceEntryBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deletePriceEntryByExternalReferenceCode',
      friendly:
        'Generated method deletePriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getPriceEntryByExternalReferenceCode',
      friendly: 'Generated method getPriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPriceEntryByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchPriceEntryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchPriceEntryByExternalReferenceCode',
      friendly:
        'Generated method patchPriceEntryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryByExternalReferenceCodeTierPricesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceEntryByExternalReferenceCodeTierPricesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/by-externalReferenceCode/${externalReferenceCode}/tierPrices`,
      data,
      op: 'getPriceEntryByExternalReferenceCodeTierPricesPage',
      friendly:
        'Generated method getPriceEntryByExternalReferenceCodeTierPricesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryByExternalReferenceCodeTierPrice
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceEntryByExternalReferenceCodeTierPrice(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/by-externalReferenceCode/${externalReferenceCode}/tierPrices`,
      data,
      op: 'postPriceEntryByExternalReferenceCodeTierPrice',
      friendly:
        'Generated method postPriceEntryByExternalReferenceCodeTierPrice failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryIdTierPriceBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceEntryIdTierPriceBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/tierPrices/batch`,
      data,
      op: 'postPriceEntryIdTierPriceBatch',
      friendly: 'Generated method postPriceEntryIdTierPriceBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceEntry
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/${id}`,
      data,
      op: 'deletePriceEntry',
      friendly: 'Generated method deletePriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceEntry
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/${id}`,
      data,
      op: 'getPriceEntry',
      friendly: 'Generated method getPriceEntry failed',
      ...opts,
    });
  }

  /**
   * patchPriceEntry
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchPriceEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/${id}`,
      data,
      op: 'patchPriceEntry',
      friendly: 'Generated method patchPriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceEntryIdTierPricesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceEntryIdTierPricesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/${id}/tierPrices`,
      data,
      op: 'getPriceEntryIdTierPricesPage',
      friendly: 'Generated method getPriceEntryIdTierPricesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceEntryIdTierPrice
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceEntryIdTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceEntries/${id}/tierPrices`,
      data,
      op: 'postPriceEntryIdTierPrice',
      friendly: 'Generated method postPriceEntryIdTierPrice failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccountGroupBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceListAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceListAccountGroups/batch`,
      data,
      op: 'deletePriceListAccountGroupBatch',
      friendly: 'Generated method deletePriceListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceListAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceListAccountGroups/${id}`,
      data,
      op: 'deletePriceListAccountGroup',
      friendly: 'Generated method deletePriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getPriceListsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists`,
      data,
      op: 'getPriceListsPage',
      friendly: 'Generated method getPriceListsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceList
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceList(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists`,
      data,
      op: 'postPriceList',
      friendly: 'Generated method postPriceList failed',
      ...opts,
    });
  }

  /**
   * deletePriceListBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/batch`,
      data,
      op: 'deletePriceListBatch',
      friendly: 'Generated method deletePriceListBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/batch`,
      data,
      op: 'postPriceListBatch',
      friendly: 'Generated method postPriceListBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deletePriceListByExternalReferenceCode',
      friendly:
        'Generated method deletePriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getPriceListByExternalReferenceCode',
      friendly: 'Generated method getPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchPriceListByExternalReferenceCode',
      friendly: 'Generated method patchPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putPriceListByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async putPriceListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putPriceListByExternalReferenceCode',
      friendly: 'Generated method putPriceListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceEntriesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListByExternalReferenceCodePriceEntriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}/priceEntries`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceEntriesPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceEntry
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListByExternalReferenceCodePriceEntry(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}/priceEntries`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceEntry',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceListByExternalReferenceCodePriceListAccountGroupPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListByExternalReferenceCodePriceListAccountGroupPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}/priceListAccountGroup`,
      data,
      op: 'getPriceListByExternalReferenceCodePriceListAccountGroupPage',
      friendly:
        'Generated method getPriceListByExternalReferenceCodePriceListAccountGroupPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListByExternalReferenceCodePriceListAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListByExternalReferenceCodePriceListAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/by-externalReferenceCode/${externalReferenceCode}/priceListAccountGroup`,
      data,
      op: 'postPriceListByExternalReferenceCodePriceListAccountGroup',
      friendly:
        'Generated method postPriceListByExternalReferenceCodePriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * postPriceListsPageExportBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/export-batch`,
      data,
      op: 'postPriceListsPageExportBatch',
      friendly: 'Generated method postPriceListsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceEntryBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListIdPriceEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/priceEntries/batch`,
      data,
      op: 'postPriceListIdPriceEntryBatch',
      friendly: 'Generated method postPriceListIdPriceEntryBatch failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccountGroupBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListIdPriceListAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/priceListAccountGroups/batch`,
      data,
      op: 'postPriceListIdPriceListAccountGroupBatch',
      friendly:
        'Generated method postPriceListIdPriceListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deletePriceList
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deletePriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}`,
      data,
      op: 'deletePriceList',
      friendly: 'Generated method deletePriceList failed',
      ...opts,
    });
  }

  /**
   * getPriceList
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}`,
      data,
      op: 'getPriceList',
      friendly: 'Generated method getPriceList failed',
      ...opts,
    });
  }

  /**
   * patchPriceList
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchPriceList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}`,
      data,
      op: 'patchPriceList',
      friendly: 'Generated method patchPriceList failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceEntriesPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListIdPriceEntriesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}/priceEntries`,
      data,
      op: 'getPriceListIdPriceEntriesPage',
      friendly: 'Generated method getPriceListIdPriceEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceEntry
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListIdPriceEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}/priceEntries`,
      data,
      op: 'postPriceListIdPriceEntry',
      friendly: 'Generated method postPriceListIdPriceEntry failed',
      ...opts,
    });
  }

  /**
   * getPriceListIdPriceListAccountGroupsPage
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getPriceListIdPriceListAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}/priceListAccountGroups`,
      data,
      op: 'getPriceListIdPriceListAccountGroupsPage',
      friendly:
        'Generated method getPriceListIdPriceListAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postPriceListIdPriceListAccountGroup
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async postPriceListIdPriceListAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-pricing/v1.0/priceLists/${id}/priceListAccountGroups`,
      data,
      op: 'postPriceListIdPriceListAccountGroup',
      friendly: 'Generated method postPriceListIdPriceListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteTierPriceBatch
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteTierPriceBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/batch`,
      data,
      op: 'deleteTierPriceBatch',
      friendly: 'Generated method deleteTierPriceBatch failed',
      ...opts,
    });
  }

  /**
   * deleteTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteTierPriceByExternalReferenceCode',
      friendly:
        'Generated method deleteTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getTierPriceByExternalReferenceCode',
      friendly: 'Generated method getTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchTierPriceByExternalReferenceCode
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchTierPriceByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchTierPriceByExternalReferenceCode',
      friendly: 'Generated method patchTierPriceByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteTierPrice
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async deleteTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/${id}`,
      data,
      op: 'deleteTierPrice',
      friendly: 'Generated method deleteTierPrice failed',
      ...opts,
    });
  }

  /**
   * getTierPrice
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async getTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/${id}`,
      data,
      op: 'getTierPrice',
      friendly: 'Generated method getTierPrice failed',
      ...opts,
    });
  }

  /**
   * patchTierPrice
   * API: headless-commerce-admin-pricing-v1.0 | Version: v1.0
   */
  async patchTierPrice(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-pricing/v1.0/tierPrices/${id}`,
      data,
      op: 'patchTierPrice',
      friendly: 'Generated method patchTierPrice failed',
      ...opts,
    });
  }
}

module.exports = HeadlessCommerceAdminPricingClient_v1_0;
