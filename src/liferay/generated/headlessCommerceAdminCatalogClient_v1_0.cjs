/**
 * HeadlessCommerceAdminCatalogClient_v1_0
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

class HeadlessCommerceAdminCatalogClient_v1_0 {
  constructor(restService) {
    this.rest = restService;
  }

  /**
   * deleteAttachmentBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteAttachmentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/batch`,
      data,
      op: 'deleteAttachmentBatch',
      friendly: 'Generated method deleteAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteAttachmentByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteAttachmentByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteAttachmentByExternalReferenceCode',
      friendly:
        'Generated method deleteAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getAttachmentByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getAttachmentByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getAttachmentByExternalReferenceCode',
      friendly: 'Generated method getAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchAttachmentByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchAttachmentByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchAttachmentByExternalReferenceCode',
      friendly:
        'Generated method patchAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putAttachmentByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putAttachmentByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putAttachmentByExternalReferenceCode',
      friendly: 'Generated method putAttachmentByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteAttachment
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteAttachment(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/attachment/${id}`,
      data,
      op: 'deleteAttachment',
      friendly: 'Generated method deleteAttachment failed',
      ...opts,
    });
  }

  /**
   * deleteCatalogBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCatalogBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/batch`,
      data,
      op: 'deleteCatalogBatch',
      friendly: 'Generated method deleteCatalogBatch failed',
      ...opts,
    });
  }

  /**
   * deleteCatalogByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCatalogByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteCatalogByExternalReferenceCode',
      friendly: 'Generated method deleteCatalogByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getCatalogByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCatalogByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getCatalogByExternalReferenceCode',
      friendly: 'Generated method getCatalogByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchCatalogByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchCatalogByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchCatalogByExternalReferenceCode',
      friendly: 'Generated method patchCatalogByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putCatalogByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putCatalogByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putCatalogByExternalReferenceCode',
      friendly: 'Generated method putCatalogByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCatalog(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/${id}`,
      data,
      op: 'deleteCatalog',
      friendly: 'Generated method deleteCatalog failed',
      ...opts,
    });
  }

  /**
   * getCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCatalog(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/${id}`,
      data,
      op: 'getCatalog',
      friendly: 'Generated method getCatalog failed',
      ...opts,
    });
  }

  /**
   * patchCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchCatalog(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalog/${id}`,
      data,
      op: 'patchCatalog',
      friendly: 'Generated method patchCatalog failed',
      ...opts,
    });
  }

  /**
   * getCatalogsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCatalogsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalogs`,
      data,
      op: 'getCatalogsPage',
      friendly: 'Generated method getCatalogsPage failed',
      ...opts,
    });
  }

  /**
   * postCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCatalog(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalogs`,
      data,
      op: 'postCatalog',
      friendly: 'Generated method postCatalog failed',
      ...opts,
    });
  }

  /**
   * postCatalogBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCatalogBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalogs/batch`,
      data,
      op: 'postCatalogBatch',
      friendly: 'Generated method postCatalogBatch failed',
      ...opts,
    });
  }

  /**
   * postCatalogsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCatalogsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/catalogs/export-batch`,
      data,
      op: 'postCatalogsPageExportBatch',
      friendly: 'Generated method postCatalogsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * getCurrenciesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCurrenciesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies`,
      data,
      op: 'getCurrenciesPage',
      friendly: 'Generated method getCurrenciesPage failed',
      ...opts,
    });
  }

  /**
   * postCurrency
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCurrency(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies`,
      data,
      op: 'postCurrency',
      friendly: 'Generated method postCurrency failed',
      ...opts,
    });
  }

  /**
   * deleteCurrencyBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCurrencyBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/batch`,
      data,
      op: 'deleteCurrencyBatch',
      friendly: 'Generated method deleteCurrencyBatch failed',
      ...opts,
    });
  }

  /**
   * postCurrencyBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCurrencyBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/batch`,
      data,
      op: 'postCurrencyBatch',
      friendly: 'Generated method postCurrencyBatch failed',
      ...opts,
    });
  }

  /**
   * deleteCurrencyByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCurrencyByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteCurrencyByExternalReferenceCode',
      friendly: 'Generated method deleteCurrencyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getCurrencyByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCurrencyByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getCurrencyByExternalReferenceCode',
      friendly: 'Generated method getCurrencyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchCurrencyByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchCurrencyByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchCurrencyByExternalReferenceCode',
      friendly: 'Generated method patchCurrencyByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postCurrenciesPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postCurrenciesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/export-batch`,
      data,
      op: 'postCurrenciesPageExportBatch',
      friendly: 'Generated method postCurrenciesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteCurrency
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteCurrency(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/${id}`,
      data,
      op: 'deleteCurrency',
      friendly: 'Generated method deleteCurrency failed',
      ...opts,
    });
  }

  /**
   * getCurrency
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getCurrency(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/${id}`,
      data,
      op: 'getCurrency',
      friendly: 'Generated method getCurrency failed',
      ...opts,
    });
  }

  /**
   * patchCurrency
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchCurrency(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/currencies/${id}`,
      data,
      op: 'patchCurrency',
      friendly: 'Generated method patchCurrency failed',
      ...opts,
    });
  }

  /**
   * patchDiagram
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchDiagram(config, diagramId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/diagrams/${diagramId}`,
      data,
      op: 'patchDiagram',
      friendly: 'Generated method patchDiagram failed',
      ...opts,
    });
  }

  /**
   * deleteGroupedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteGroupedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/grouped-products/batch`,
      data,
      op: 'deleteGroupedProductBatch',
      friendly: 'Generated method deleteGroupedProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteGroupedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteGroupedProduct(config, groupedProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/grouped-products/${groupedProductId}`,
      data,
      op: 'deleteGroupedProduct',
      friendly: 'Generated method deleteGroupedProduct failed',
      ...opts,
    });
  }

  /**
   * patchGroupedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchGroupedProduct(config, groupedProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/grouped-products/${groupedProductId}`,
      data,
      op: 'patchGroupedProduct',
      friendly: 'Generated method patchGroupedProduct failed',
      ...opts,
    });
  }

  /**
   * getLowStockActionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getLowStockActionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/low-stock-actions`,
      data,
      op: 'getLowStockActionsPage',
      friendly: 'Generated method getLowStockActionsPage failed',
      ...opts,
    });
  }

  /**
   * postLowStockActionsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postLowStockActionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/low-stock-actions/export-batch`,
      data,
      op: 'postLowStockActionsPageExportBatch',
      friendly: 'Generated method postLowStockActionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMappedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteMappedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/mapped-products/batch`,
      data,
      op: 'deleteMappedProductBatch',
      friendly: 'Generated method deleteMappedProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteMappedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteMappedProduct(config, mappedProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/mapped-products/${mappedProductId}`,
      data,
      op: 'deleteMappedProduct',
      friendly: 'Generated method deleteMappedProduct failed',
      ...opts,
    });
  }

  /**
   * patchMappedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchMappedProduct(config, mappedProductId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/mapped-products/${mappedProductId}`,
      data,
      op: 'patchMappedProduct',
      friendly: 'Generated method patchMappedProduct failed',
      ...opts,
    });
  }

  /**
   * getOpenAPI
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOpenAPI(config, type, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/openapi.${type}`,
      data,
      op: 'getOpenAPI',
      friendly: 'Generated method getOpenAPI failed',
      ...opts,
    });
  }

  /**
   * getOptionCategoriesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionCategoriesPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories`,
      data,
      op: 'getOptionCategoriesPage',
      friendly: 'Generated method getOptionCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * postOptionCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionCategory(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories`,
      data,
      op: 'postOptionCategory',
      friendly: 'Generated method postOptionCategory failed',
      ...opts,
    });
  }

  /**
   * deleteOptionCategoryBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/batch`,
      data,
      op: 'deleteOptionCategoryBatch',
      friendly: 'Generated method deleteOptionCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * postOptionCategoryBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionCategoryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/batch`,
      data,
      op: 'postOptionCategoryBatch',
      friendly: 'Generated method postOptionCategoryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOptionCategoryByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionCategoryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteOptionCategoryByExternalReferenceCode',
      friendly:
        'Generated method deleteOptionCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOptionCategoryByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionCategoryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getOptionCategoryByExternalReferenceCode',
      friendly:
        'Generated method getOptionCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchOptionCategoryByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOptionCategoryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchOptionCategoryByExternalReferenceCode',
      friendly:
        'Generated method patchOptionCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putOptionCategoryByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putOptionCategoryByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putOptionCategoryByExternalReferenceCode',
      friendly:
        'Generated method putOptionCategoryByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postOptionCategoriesPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionCategoriesPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/export-batch`,
      data,
      op: 'postOptionCategoriesPageExportBatch',
      friendly: 'Generated method postOptionCategoriesPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOptionCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/${id}`,
      data,
      op: 'deleteOptionCategory',
      friendly: 'Generated method deleteOptionCategory failed',
      ...opts,
    });
  }

  /**
   * getOptionCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/${id}`,
      data,
      op: 'getOptionCategory',
      friendly: 'Generated method getOptionCategory failed',
      ...opts,
    });
  }

  /**
   * patchOptionCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOptionCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionCategories/${id}`,
      data,
      op: 'patchOptionCategory',
      friendly: 'Generated method patchOptionCategory failed',
      ...opts,
    });
  }

  /**
   * deleteOptionValueBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionValueBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/batch`,
      data,
      op: 'deleteOptionValueBatch',
      friendly: 'Generated method deleteOptionValueBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOptionValueByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionValueByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteOptionValueByExternalReferenceCode',
      friendly:
        'Generated method deleteOptionValueByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOptionValueByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionValueByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getOptionValueByExternalReferenceCode',
      friendly: 'Generated method getOptionValueByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchOptionValueByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOptionValueByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchOptionValueByExternalReferenceCode',
      friendly:
        'Generated method patchOptionValueByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/${id}`,
      data,
      op: 'deleteOptionValue',
      friendly: 'Generated method deleteOptionValue failed',
      ...opts,
    });
  }

  /**
   * getOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/${id}`,
      data,
      op: 'getOptionValue',
      friendly: 'Generated method getOptionValue failed',
      ...opts,
    });
  }

  /**
   * patchOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/optionValues/${id}`,
      data,
      op: 'patchOptionValue',
      friendly: 'Generated method patchOptionValue failed',
      ...opts,
    });
  }

  /**
   * getOptionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/options`,
      data,
      op: 'getOptionsPage',
      friendly: 'Generated method getOptionsPage failed',
      ...opts,
    });
  }

  /**
   * postOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOption(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options`,
      data,
      op: 'postOption',
      friendly: 'Generated method postOption failed',
      ...opts,
    });
  }

  /**
   * deleteOptionBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/batch`,
      data,
      op: 'deleteOptionBatch',
      friendly: 'Generated method deleteOptionBatch failed',
      ...opts,
    });
  }

  /**
   * postOptionBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/batch`,
      data,
      op: 'postOptionBatch',
      friendly: 'Generated method postOptionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOptionByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOptionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteOptionByExternalReferenceCode',
      friendly: 'Generated method deleteOptionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOptionByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getOptionByExternalReferenceCode',
      friendly: 'Generated method getOptionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchOptionByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOptionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchOptionByExternalReferenceCode',
      friendly: 'Generated method patchOptionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putOptionByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putOptionByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putOptionByExternalReferenceCode',
      friendly: 'Generated method putOptionByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getOptionByExternalReferenceCodeOptionValuesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionByExternalReferenceCodeOptionValuesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}/optionValues`,
      data,
      op: 'getOptionByExternalReferenceCodeOptionValuesPage',
      friendly:
        'Generated method getOptionByExternalReferenceCodeOptionValuesPage failed',
      ...opts,
    });
  }

  /**
   * postOptionByExternalReferenceCodeOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionByExternalReferenceCodeOptionValue(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/by-externalReferenceCode/${externalReferenceCode}/optionValues`,
      data,
      op: 'postOptionByExternalReferenceCodeOptionValue',
      friendly:
        'Generated method postOptionByExternalReferenceCodeOptionValue failed',
      ...opts,
    });
  }

  /**
   * postOptionsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/export-batch`,
      data,
      op: 'postOptionsPageExportBatch',
      friendly: 'Generated method postOptionsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postOptionIdOptionValueBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionIdOptionValueBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/optionValues/batch`,
      data,
      op: 'postOptionIdOptionValueBatch',
      friendly: 'Generated method postOptionIdOptionValueBatch failed',
      ...opts,
    });
  }

  /**
   * deleteOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/${id}`,
      data,
      op: 'deleteOption',
      friendly: 'Generated method deleteOption failed',
      ...opts,
    });
  }

  /**
   * getOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/${id}`,
      data,
      op: 'getOption',
      friendly: 'Generated method getOption failed',
      ...opts,
    });
  }

  /**
   * patchOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/${id}`,
      data,
      op: 'patchOption',
      friendly: 'Generated method patchOption failed',
      ...opts,
    });
  }

  /**
   * getOptionIdOptionValuesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getOptionIdOptionValuesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/${id}/optionValues`,
      data,
      op: 'getOptionIdOptionValuesPage',
      friendly: 'Generated method getOptionIdOptionValuesPage failed',
      ...opts,
    });
  }

  /**
   * postOptionIdOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postOptionIdOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/options/${id}/optionValues`,
      data,
      op: 'postOptionIdOptionValue',
      friendly: 'Generated method postOptionIdOptionValue failed',
      ...opts,
    });
  }

  /**
   * deletePinBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deletePinBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/pins/batch`,
      data,
      op: 'deletePinBatch',
      friendly: 'Generated method deletePinBatch failed',
      ...opts,
    });
  }

  /**
   * deletePin
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deletePin(config, pinId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/pins/${pinId}`,
      data,
      op: 'deletePin',
      friendly: 'Generated method deletePin failed',
      ...opts,
    });
  }

  /**
   * patchPin
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchPin(config, pinId, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/pins/${pinId}`,
      data,
      op: 'patchPin',
      friendly: 'Generated method patchPin failed',
      ...opts,
    });
  }

  /**
   * deleteProductAccountGroupBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductAccountGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-account-groups/batch`,
      data,
      op: 'deleteProductAccountGroupBatch',
      friendly: 'Generated method deleteProductAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductAccountGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-account-groups/${id}`,
      data,
      op: 'deleteProductAccountGroup',
      friendly: 'Generated method deleteProductAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getProductAccountGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductAccountGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-account-groups/${id}`,
      data,
      op: 'getProductAccountGroup',
      friendly: 'Generated method getProductAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteProductChannelBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-channels/batch`,
      data,
      op: 'deleteProductChannelBatch',
      friendly: 'Generated method deleteProductChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductChannel
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductChannel(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-channels/${id}`,
      data,
      op: 'deleteProductChannel',
      friendly: 'Generated method deleteProductChannel failed',
      ...opts,
    });
  }

  /**
   * getProductChannel
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductChannel(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-channels/${id}`,
      data,
      op: 'getProductChannel',
      friendly: 'Generated method getProductChannel failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListAccountGroupBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListAccountGroupBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-account-groups/batch`,
      data,
      op: 'deleteProductConfigurationListAccountGroupBatch',
      friendly:
        'Generated method deleteProductConfigurationListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListAccountGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListAccountGroup(
    config,
    productConfigurationListAccountGroupId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-account-groups/${productConfigurationListAccountGroupId}`,
      data,
      op: 'deleteProductConfigurationListAccountGroup',
      friendly:
        'Generated method deleteProductConfigurationListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListAccountBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListAccountBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-accounts/batch`,
      data,
      op: 'deleteProductConfigurationListAccountBatch',
      friendly:
        'Generated method deleteProductConfigurationListAccountBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListAccount
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListAccount(
    config,
    productConfigurationListAccountId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-accounts/${productConfigurationListAccountId}`,
      data,
      op: 'deleteProductConfigurationListAccount',
      friendly: 'Generated method deleteProductConfigurationListAccount failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListChannelBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListChannelBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-channels/batch`,
      data,
      op: 'deleteProductConfigurationListChannelBatch',
      friendly:
        'Generated method deleteProductConfigurationListChannelBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListChannel
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListChannel(
    config,
    productConfigurationListChannelId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-channels/${productConfigurationListChannelId}`,
      data,
      op: 'deleteProductConfigurationListChannel',
      friendly: 'Generated method deleteProductConfigurationListChannel failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListOrderTypeBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListOrderTypeBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-order-types/batch`,
      data,
      op: 'deleteProductConfigurationListOrderTypeBatch',
      friendly:
        'Generated method deleteProductConfigurationListOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListOrderType
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListOrderType(
    config,
    productConfigurationListOrderTypeId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-list-order-types/${productConfigurationListOrderTypeId}`,
      data,
      op: 'deleteProductConfigurationListOrderType',
      friendly:
        'Generated method deleteProductConfigurationListOrderType failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists`,
      data,
      op: 'getProductConfigurationListsPage',
      friendly: 'Generated method getProductConfigurationListsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationList
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationList(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists`,
      data,
      op: 'postProductConfigurationList',
      friendly: 'Generated method postProductConfigurationList failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/batch`,
      data,
      op: 'deleteProductConfigurationListBatch',
      friendly: 'Generated method deleteProductConfigurationListBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/batch`,
      data,
      op: 'postProductConfigurationListBatch',
      friendly: 'Generated method postProductConfigurationListBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationListByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteProductConfigurationListByExternalReferenceCode',
      friendly:
        'Generated method deleteProductConfigurationListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCode',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchProductConfigurationListByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductConfigurationListByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchProductConfigurationListByExternalReferenceCode',
      friendly:
        'Generated method patchProductConfigurationListByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroupsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-account-groups`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroupsPage',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroup(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-account-groups`,
      data,
      op: 'postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroup',
      friendly:
        'Generated method postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-accounts`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountsPage',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCodeProductConfigurationListAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccount
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccount(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-accounts`,
      data,
      op: 'postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccount',
      friendly:
        'Generated method postProductConfigurationListByExternalReferenceCodeProductConfigurationListAccount failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCodeProductConfigurationListChannelsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCodeProductConfigurationListChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-channels`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCodeProductConfigurationListChannelsPage',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCodeProductConfigurationListChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListByExternalReferenceCodeProductConfigurationListChannel
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListByExternalReferenceCodeProductConfigurationListChannel(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-channels`,
      data,
      op: 'postProductConfigurationListByExternalReferenceCodeProductConfigurationListChannel',
      friendly:
        'Generated method postProductConfigurationListByExternalReferenceCodeProductConfigurationListChannel failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderTypesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderTypesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-order-types`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderTypesPage',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderType
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderType(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configuration-list-order-types`,
      data,
      op: 'postProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderType',
      friendly:
        'Generated method postProductConfigurationListByExternalReferenceCodeProductConfigurationListOrderType failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListByExternalReferenceCodeProductConfigurationsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListByExternalReferenceCodeProductConfigurationsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configurations`,
      data,
      op: 'getProductConfigurationListByExternalReferenceCodeProductConfigurationsPage',
      friendly:
        'Generated method getProductConfigurationListByExternalReferenceCodeProductConfigurationsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListByExternalReferenceCodeProductConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListByExternalReferenceCodeProductConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/by-externalReferenceCode/${externalReferenceCode}/product-configurations`,
      data,
      op: 'postProductConfigurationListByExternalReferenceCodeProductConfiguration',
      friendly:
        'Generated method postProductConfigurationListByExternalReferenceCodeProductConfiguration failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/export-batch`,
      data,
      op: 'postProductConfigurationListsPageExportBatch',
      friendly:
        'Generated method postProductConfigurationListsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListAccountGroupBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListAccountGroupBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/product-configuration-list-account-groups/batch`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListAccountGroupBatch',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListAccountGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListAccountBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListAccountBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/product-configuration-list-accounts/batch`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListAccountBatch',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListAccountBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListChannelBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListChannelBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/product-configuration-list-channels/batch`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListChannelBatch',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListChannelBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListOrderTypeBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListOrderTypeBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/product-configuration-list-order-types/batch`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListOrderTypeBatch',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListOrderTypeBatch failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationBatch(
    config,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/product-configurations/batch`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationBatch',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationList
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}`,
      data,
      op: 'deleteProductConfigurationList',
      friendly: 'Generated method deleteProductConfigurationList failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationList
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}`,
      data,
      op: 'getProductConfigurationList',
      friendly: 'Generated method getProductConfigurationList failed',
      ...opts,
    });
  }

  /**
   * patchProductConfigurationList
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductConfigurationList(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}`,
      data,
      op: 'patchProductConfigurationList',
      friendly: 'Generated method patchProductConfigurationList failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListIdProductConfigurationListAccountGroupsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListIdProductConfigurationListAccountGroupsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-account-groups`,
      data,
      op: 'getProductConfigurationListIdProductConfigurationListAccountGroupsPage',
      friendly:
        'Generated method getProductConfigurationListIdProductConfigurationListAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListAccountGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListAccountGroup(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-account-groups`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListAccountGroup',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListAccountGroup failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListIdProductConfigurationListAccountsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListIdProductConfigurationListAccountsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-accounts`,
      data,
      op: 'getProductConfigurationListIdProductConfigurationListAccountsPage',
      friendly:
        'Generated method getProductConfigurationListIdProductConfigurationListAccountsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListAccount
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListAccount(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-accounts`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListAccount',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListAccount failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListIdProductConfigurationListChannelsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListIdProductConfigurationListChannelsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-channels`,
      data,
      op: 'getProductConfigurationListIdProductConfigurationListChannelsPage',
      friendly:
        'Generated method getProductConfigurationListIdProductConfigurationListChannelsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListChannel
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListChannel(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-channels`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListChannel',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListChannel failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListIdProductConfigurationListOrderTypesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListIdProductConfigurationListOrderTypesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-order-types`,
      data,
      op: 'getProductConfigurationListIdProductConfigurationListOrderTypesPage',
      friendly:
        'Generated method getProductConfigurationListIdProductConfigurationListOrderTypesPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfigurationListOrderType
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfigurationListOrderType(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configuration-list-order-types`,
      data,
      op: 'postProductConfigurationListIdProductConfigurationListOrderType',
      friendly:
        'Generated method postProductConfigurationListIdProductConfigurationListOrderType failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationListIdProductConfigurationsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationListIdProductConfigurationsPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configurations`,
      data,
      op: 'getProductConfigurationListIdProductConfigurationsPage',
      friendly:
        'Generated method getProductConfigurationListIdProductConfigurationsPage failed',
      ...opts,
    });
  }

  /**
   * postProductConfigurationListIdProductConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductConfigurationListIdProductConfiguration(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configuration-lists/${id}/product-configurations`,
      data,
      op: 'postProductConfigurationListIdProductConfiguration',
      friendly:
        'Generated method postProductConfigurationListIdProductConfiguration failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/batch`,
      data,
      op: 'deleteProductConfigurationBatch',
      friendly: 'Generated method deleteProductConfigurationBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfigurationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfigurationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteProductConfigurationByExternalReferenceCode',
      friendly:
        'Generated method deleteProductConfigurationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductConfigurationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfigurationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getProductConfigurationByExternalReferenceCode',
      friendly:
        'Generated method getProductConfigurationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchProductConfigurationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductConfigurationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchProductConfigurationByExternalReferenceCode',
      friendly:
        'Generated method patchProductConfigurationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteProductConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/${id}`,
      data,
      op: 'deleteProductConfiguration',
      friendly: 'Generated method deleteProductConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/${id}`,
      data,
      op: 'getProductConfiguration',
      friendly: 'Generated method getProductConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-configurations/${id}`,
      data,
      op: 'patchProductConfiguration',
      friendly: 'Generated method patchProductConfiguration failed',
      ...opts,
    });
  }

  /**
   * deleteProductGroupProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductGroupProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-group-products/batch`,
      data,
      op: 'deleteProductGroupProductBatch',
      friendly: 'Generated method deleteProductGroupProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductGroupProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductGroupProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-group-products/${id}`,
      data,
      op: 'deleteProductGroupProduct',
      friendly: 'Generated method deleteProductGroupProduct failed',
      ...opts,
    });
  }

  /**
   * getProductGroupsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductGroupsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups`,
      data,
      op: 'getProductGroupsPage',
      friendly: 'Generated method getProductGroupsPage failed',
      ...opts,
    });
  }

  /**
   * postProductGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroup(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups`,
      data,
      op: 'postProductGroup',
      friendly: 'Generated method postProductGroup failed',
      ...opts,
    });
  }

  /**
   * deleteProductGroupBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/batch`,
      data,
      op: 'deleteProductGroupBatch',
      friendly: 'Generated method deleteProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * postProductGroupBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroupBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/batch`,
      data,
      op: 'postProductGroupBatch',
      friendly: 'Generated method postProductGroupBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductGroupByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteProductGroupByExternalReferenceCode',
      friendly:
        'Generated method deleteProductGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductGroupByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getProductGroupByExternalReferenceCode',
      friendly:
        'Generated method getProductGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchProductGroupByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchProductGroupByExternalReferenceCode',
      friendly:
        'Generated method patchProductGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putProductGroupByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putProductGroupByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putProductGroupByExternalReferenceCode',
      friendly:
        'Generated method putProductGroupByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductGroupByExternalReferenceCodeProductGroupProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductGroupByExternalReferenceCodeProductGroupProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}/product-group-products`,
      data,
      op: 'getProductGroupByExternalReferenceCodeProductGroupProductsPage',
      friendly:
        'Generated method getProductGroupByExternalReferenceCodeProductGroupProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductGroupByExternalReferenceCodeProductGroupProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroupByExternalReferenceCodeProductGroupProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/by-externalReferenceCode/${externalReferenceCode}/product-group-products`,
      data,
      op: 'postProductGroupByExternalReferenceCodeProductGroupProduct',
      friendly:
        'Generated method postProductGroupByExternalReferenceCodeProductGroupProduct failed',
      ...opts,
    });
  }

  /**
   * postProductGroupsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroupsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/export-batch`,
      data,
      op: 'postProductGroupsPageExportBatch',
      friendly: 'Generated method postProductGroupsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postProductGroupIdProductGroupProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroupIdProductGroupProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/product-group-products/batch`,
      data,
      op: 'postProductGroupIdProductGroupProductBatch',
      friendly:
        'Generated method postProductGroupIdProductGroupProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/${id}`,
      data,
      op: 'deleteProductGroup',
      friendly: 'Generated method deleteProductGroup failed',
      ...opts,
    });
  }

  /**
   * getProductGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/${id}`,
      data,
      op: 'getProductGroup',
      friendly: 'Generated method getProductGroup failed',
      ...opts,
    });
  }

  /**
   * patchProductGroup
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductGroup(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/${id}`,
      data,
      op: 'patchProductGroup',
      friendly: 'Generated method patchProductGroup failed',
      ...opts,
    });
  }

  /**
   * getProductGroupIdProductGroupProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductGroupIdProductGroupProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/${id}/product-group-products`,
      data,
      op: 'getProductGroupIdProductGroupProductsPage',
      friendly:
        'Generated method getProductGroupIdProductGroupProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductGroupIdProductGroupProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductGroupIdProductGroupProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-groups/${id}/product-group-products`,
      data,
      op: 'postProductGroupIdProductGroupProduct',
      friendly: 'Generated method postProductGroupIdProductGroupProduct failed',
      ...opts,
    });
  }

  /**
   * deleteProductOptionValueBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductOptionValueBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-option-values/batch`,
      data,
      op: 'deleteProductOptionValueBatch',
      friendly: 'Generated method deleteProductOptionValueBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-option-values/${id}`,
      data,
      op: 'deleteProductOptionValue',
      friendly: 'Generated method deleteProductOptionValue failed',
      ...opts,
    });
  }

  /**
   * getProductOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-option-values/${id}`,
      data,
      op: 'getProductOptionValue',
      friendly: 'Generated method getProductOptionValue failed',
      ...opts,
    });
  }

  /**
   * patchProductOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-option-values/${id}`,
      data,
      op: 'patchProductOptionValue',
      friendly: 'Generated method patchProductOptionValue failed',
      ...opts,
    });
  }

  /**
   * deleteProductVirtualSettingsFileEntryBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductVirtualSettingsFileEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings-file-entries/batch`,
      data,
      op: 'deleteProductVirtualSettingsFileEntryBatch',
      friendly:
        'Generated method deleteProductVirtualSettingsFileEntryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings-file-entries/${id}`,
      data,
      op: 'deleteProductVirtualSettingsFileEntry',
      friendly: 'Generated method deleteProductVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * getProductVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings-file-entries/${id}`,
      data,
      op: 'getProductVirtualSettingsFileEntry',
      friendly: 'Generated method getProductVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * patchProductVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings-file-entries/${id}`,
      data,
      op: 'patchProductVirtualSettingsFileEntry',
      friendly: 'Generated method patchProductVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * getProductVirtualSettingIdProductVirtualSettingsFileEntriesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductVirtualSettingIdProductVirtualSettingsFileEntriesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings/${id}/product-virtual-settings-file-entries`,
      data,
      op: 'getProductVirtualSettingIdProductVirtualSettingsFileEntriesPage',
      friendly:
        'Generated method getProductVirtualSettingIdProductVirtualSettingsFileEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postProductVirtualSettingIdProductVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductVirtualSettingIdProductVirtualSettingsFileEntry(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/product-virtual-settings/${id}/product-virtual-settings-file-entries`,
      data,
      op: 'postProductVirtualSettingIdProductVirtualSettingsFileEntry',
      friendly:
        'Generated method postProductVirtualSettingIdProductVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * deleteProductOptionBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductOptionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/batch`,
      data,
      op: 'deleteProductOptionBatch',
      friendly: 'Generated method deleteProductOptionBatch failed',
      ...opts,
    });
  }

  /**
   * postProductOptionIdProductOptionValueBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductOptionIdProductOptionValueBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/productOptionValues/batch`,
      data,
      op: 'postProductOptionIdProductOptionValueBatch',
      friendly:
        'Generated method postProductOptionIdProductOptionValueBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/${id}`,
      data,
      op: 'deleteProductOption',
      friendly: 'Generated method deleteProductOption failed',
      ...opts,
    });
  }

  /**
   * getProductOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/${id}`,
      data,
      op: 'getProductOption',
      friendly: 'Generated method getProductOption failed',
      ...opts,
    });
  }

  /**
   * patchProductOption
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductOption(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/${id}`,
      data,
      op: 'patchProductOption',
      friendly: 'Generated method patchProductOption failed',
      ...opts,
    });
  }

  /**
   * getProductOptionIdProductOptionValuesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductOptionIdProductOptionValuesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/${id}/productOptionValues`,
      data,
      op: 'getProductOptionIdProductOptionValuesPage',
      friendly:
        'Generated method getProductOptionIdProductOptionValuesPage failed',
      ...opts,
    });
  }

  /**
   * postProductOptionIdProductOptionValue
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductOptionIdProductOptionValue(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/productOptions/${id}/productOptionValues`,
      data,
      op: 'postProductOptionIdProductOptionValue',
      friendly: 'Generated method postProductOptionIdProductOptionValue failed',
      ...opts,
    });
  }

  /**
   * deleteProductSpecificationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductSpecificationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/batch`,
      data,
      op: 'deleteProductSpecificationBatch',
      friendly: 'Generated method deleteProductSpecificationBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteProductSpecificationByExternalReferenceCode',
      friendly:
        'Generated method deleteProductSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getProductSpecificationByExternalReferenceCode',
      friendly:
        'Generated method getProductSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchProductSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchProductSpecificationByExternalReferenceCode',
      friendly:
        'Generated method patchProductSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * deleteProductSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/${id}`,
      data,
      op: 'deleteProductSpecification',
      friendly: 'Generated method deleteProductSpecification failed',
      ...opts,
    });
  }

  /**
   * getProductSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/${id}`,
      data,
      op: 'getProductSpecification',
      friendly: 'Generated method getProductSpecification failed',
      ...opts,
    });
  }

  /**
   * patchProductSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/productSpecifications/${id}`,
      data,
      op: 'patchProductSpecification',
      friendly: 'Generated method patchProductSpecification failed',
      ...opts,
    });
  }

  /**
   * getProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products`,
      data,
      op: 'getProductsPage',
      friendly: 'Generated method getProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProduct(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products`,
      data,
      op: 'postProduct',
      friendly: 'Generated method postProduct failed',
      ...opts,
    });
  }

  /**
   * postProductIdAttachmentBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdAttachmentBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/attachments/batch`,
      data,
      op: 'postProductIdAttachmentBatch',
      friendly: 'Generated method postProductIdAttachmentBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/batch`,
      data,
      op: 'deleteProductBatch',
      friendly: 'Generated method deleteProductBatch failed',
      ...opts,
    });
  }

  /**
   * postProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/batch`,
      data,
      op: 'postProductBatch',
      friendly: 'Generated method postProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProductByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteProductByExternalReferenceCode',
      friendly: 'Generated method deleteProductByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getProductByExternalReferenceCode',
      friendly: 'Generated method getProductByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchProductByExternalReferenceCode',
      friendly: 'Generated method patchProductByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putProductByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putProductByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putProductByExternalReferenceCode',
      friendly: 'Generated method putProductByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeAttachmentsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeAttachmentsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/attachments`,
      data,
      op: 'getProductByExternalReferenceCodeAttachmentsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeAttachment
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeAttachment(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/attachments`,
      data,
      op: 'postProductByExternalReferenceCodeAttachment',
      friendly:
        'Generated method postProductByExternalReferenceCodeAttachment failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeAttachmentByBase64
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeAttachmentByBase64(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/attachments/by-base64`,
      data,
      op: 'postProductByExternalReferenceCodeAttachmentByBase64',
      friendly:
        'Generated method postProductByExternalReferenceCodeAttachmentByBase64 failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeAttachmentByUrl
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeAttachmentByUrl(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/attachments/by-url`,
      data,
      op: 'postProductByExternalReferenceCodeAttachmentByUrl',
      friendly:
        'Generated method postProductByExternalReferenceCodeAttachmentByUrl failed',
      ...opts,
    });
  }

  /**
   * deleteProductByExternalReferenceCodeByVersion
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductByExternalReferenceCodeByVersion(
    config,
    externalReferenceCode,
    version,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/by-version/${version}`,
      data,
      op: 'deleteProductByExternalReferenceCodeByVersion',
      friendly:
        'Generated method deleteProductByExternalReferenceCodeByVersion failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeByVersion
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeByVersion(
    config,
    externalReferenceCode,
    version,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/by-version/${version}`,
      data,
      op: 'getProductByExternalReferenceCodeByVersion',
      friendly:
        'Generated method getProductByExternalReferenceCodeByVersion failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeCatalog(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/catalog`,
      data,
      op: 'getProductByExternalReferenceCodeCatalog',
      friendly:
        'Generated method getProductByExternalReferenceCodeCatalog failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeCategoriesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeCategoriesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/categories`,
      data,
      op: 'getProductByExternalReferenceCodeCategoriesPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCodeCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCodeCategory(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/categories`,
      data,
      op: 'patchProductByExternalReferenceCodeCategory',
      friendly:
        'Generated method patchProductByExternalReferenceCodeCategory failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeClone
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeClone(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/clone`,
      data,
      op: 'postProductByExternalReferenceCodeClone',
      friendly:
        'Generated method postProductByExternalReferenceCodeClone failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/configuration`,
      data,
      op: 'getProductByExternalReferenceCodeConfiguration',
      friendly:
        'Generated method getProductByExternalReferenceCodeConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCodeConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCodeConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/configuration`,
      data,
      op: 'patchProductByExternalReferenceCodeConfiguration',
      friendly:
        'Generated method patchProductByExternalReferenceCodeConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeDiagram
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeDiagram(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/diagrams`,
      data,
      op: 'getProductByExternalReferenceCodeDiagram',
      friendly:
        'Generated method getProductByExternalReferenceCodeDiagram failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeDiagram
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeDiagram(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/diagrams`,
      data,
      op: 'postProductByExternalReferenceCodeDiagram',
      friendly:
        'Generated method postProductByExternalReferenceCodeDiagram failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeGroupedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeGroupedProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/grouped-products`,
      data,
      op: 'getProductByExternalReferenceCodeGroupedProductsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeGroupedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeGroupedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeGroupedProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/grouped-products`,
      data,
      op: 'postProductByExternalReferenceCodeGroupedProduct',
      friendly:
        'Generated method postProductByExternalReferenceCodeGroupedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeImagesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeImagesPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/images`,
      data,
      op: 'getProductByExternalReferenceCodeImagesPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeImagesPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeImage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeImage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/images`,
      data,
      op: 'postProductByExternalReferenceCodeImage',
      friendly:
        'Generated method postProductByExternalReferenceCodeImage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeImageByBase64
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeImageByBase64(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/images/by-base64`,
      data,
      op: 'postProductByExternalReferenceCodeImageByBase64',
      friendly:
        'Generated method postProductByExternalReferenceCodeImageByBase64 failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeImageByUrl
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeImageByUrl(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/images/by-url`,
      data,
      op: 'postProductByExternalReferenceCodeImageByUrl',
      friendly:
        'Generated method postProductByExternalReferenceCodeImageByUrl failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeMappedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeMappedProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/mapped-products`,
      data,
      op: 'getProductByExternalReferenceCodeMappedProductsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeMappedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeMappedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeMappedProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/mapped-products`,
      data,
      op: 'postProductByExternalReferenceCodeMappedProduct',
      friendly:
        'Generated method postProductByExternalReferenceCodeMappedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeMappedProductBySequence
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeMappedProductBySequence(
    config,
    externalReferenceCode,
    sequence,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/mapped-products/by-sequence/${sequence}`,
      data,
      op: 'getProductByExternalReferenceCodeMappedProductBySequence',
      friendly:
        'Generated method getProductByExternalReferenceCodeMappedProductBySequence failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodePinsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodePinsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/pins`,
      data,
      op: 'getProductByExternalReferenceCodePinsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodePinsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodePin
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodePin(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/pins`,
      data,
      op: 'postProductByExternalReferenceCodePin',
      friendly: 'Generated method postProductByExternalReferenceCodePin failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeProductAccountGroupsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeProductAccountGroupsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/product-account-groups`,
      data,
      op: 'getProductByExternalReferenceCodeProductAccountGroupsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeProductAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeProductChannelsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeProductChannelsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/product-channels`,
      data,
      op: 'getProductByExternalReferenceCodeProductChannelsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeProductChannelsPage failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeProductSpecificationsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeProductSpecificationsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/product-specifications`,
      data,
      op: 'getProductByExternalReferenceCodeProductSpecificationsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeProductSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeProductSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeProductSpecification(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/product-specifications`,
      data,
      op: 'postProductByExternalReferenceCodeProductSpecification',
      friendly:
        'Generated method postProductByExternalReferenceCodeProductSpecification failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeProductVirtualSettings
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeProductVirtualSettings(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/product-virtual-settings`,
      data,
      op: 'getProductByExternalReferenceCodeProductVirtualSettings',
      friendly:
        'Generated method getProductByExternalReferenceCodeProductVirtualSettings failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeProductOptionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeProductOptionsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/productOptions`,
      data,
      op: 'getProductByExternalReferenceCodeProductOptionsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeProductOptionsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeProductOptionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeProductOptionsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/productOptions`,
      data,
      op: 'postProductByExternalReferenceCodeProductOptionsPage',
      friendly:
        'Generated method postProductByExternalReferenceCodeProductOptionsPage failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeRelatedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeRelatedProductsPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/relatedProducts`,
      data,
      op: 'getProductByExternalReferenceCodeRelatedProductsPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeRelatedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeRelatedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeRelatedProduct(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/relatedProducts`,
      data,
      op: 'postProductByExternalReferenceCodeRelatedProduct',
      friendly:
        'Generated method postProductByExternalReferenceCodeRelatedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeShippingConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeShippingConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/shippingConfiguration`,
      data,
      op: 'getProductByExternalReferenceCodeShippingConfiguration',
      friendly:
        'Generated method getProductByExternalReferenceCodeShippingConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCodeShippingConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCodeShippingConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/shippingConfiguration`,
      data,
      op: 'patchProductByExternalReferenceCodeShippingConfiguration',
      friendly:
        'Generated method patchProductByExternalReferenceCodeShippingConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeSkusPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeSkusPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/skus`,
      data,
      op: 'getProductByExternalReferenceCodeSkusPage',
      friendly:
        'Generated method getProductByExternalReferenceCodeSkusPage failed',
      ...opts,
    });
  }

  /**
   * postProductByExternalReferenceCodeSku
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductByExternalReferenceCodeSku(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/skus`,
      data,
      op: 'postProductByExternalReferenceCodeSku',
      friendly: 'Generated method postProductByExternalReferenceCodeSku failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeSubscriptionConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/subscriptionConfiguration`,
      data,
      op: 'getProductByExternalReferenceCodeSubscriptionConfiguration',
      friendly:
        'Generated method getProductByExternalReferenceCodeSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCodeSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCodeSubscriptionConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/subscriptionConfiguration`,
      data,
      op: 'patchProductByExternalReferenceCodeSubscriptionConfiguration',
      friendly:
        'Generated method patchProductByExternalReferenceCodeSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductByExternalReferenceCodeTaxConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByExternalReferenceCodeTaxConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/taxConfiguration`,
      data,
      op: 'getProductByExternalReferenceCodeTaxConfiguration',
      friendly:
        'Generated method getProductByExternalReferenceCodeTaxConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductByExternalReferenceCodeTaxConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductByExternalReferenceCodeTaxConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/${externalReferenceCode}/taxConfiguration`,
      data,
      op: 'patchProductByExternalReferenceCodeTaxConfiguration',
      friendly:
        'Generated method patchProductByExternalReferenceCodeTaxConfiguration failed',
      ...opts,
    });
  }

  /**
   * postProductIdDiagramBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdDiagramBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/diagrams/batch`,
      data,
      op: 'postProductIdDiagramBatch',
      friendly: 'Generated method postProductIdDiagramBatch failed',
      ...opts,
    });
  }

  /**
   * postProductsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/export-batch`,
      data,
      op: 'postProductsPageExportBatch',
      friendly: 'Generated method postProductsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdGroupedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdGroupedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/grouped-products/batch`,
      data,
      op: 'postProductIdGroupedProductBatch',
      friendly: 'Generated method postProductIdGroupedProductBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdMappedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdMappedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/mapped-products/batch`,
      data,
      op: 'postProductIdMappedProductBatch',
      friendly: 'Generated method postProductIdMappedProductBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdPinBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdPinBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/pins/batch`,
      data,
      op: 'postProductIdPinBatch',
      friendly: 'Generated method postProductIdPinBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdProductSpecificationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdProductSpecificationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/productSpecifications/batch`,
      data,
      op: 'postProductIdProductSpecificationBatch',
      friendly:
        'Generated method postProductIdProductSpecificationBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdRelatedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdRelatedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/relatedProducts/batch`,
      data,
      op: 'postProductIdRelatedProductBatch',
      friendly: 'Generated method postProductIdRelatedProductBatch failed',
      ...opts,
    });
  }

  /**
   * postProductIdSkuBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdSkuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/skus/batch`,
      data,
      op: 'postProductIdSkuBatch',
      friendly: 'Generated method postProductIdSkuBatch failed',
      ...opts,
    });
  }

  /**
   * deleteProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}`,
      data,
      op: 'deleteProduct',
      friendly: 'Generated method deleteProduct failed',
      ...opts,
    });
  }

  /**
   * getProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}`,
      data,
      op: 'getProduct',
      friendly: 'Generated method getProduct failed',
      ...opts,
    });
  }

  /**
   * patchProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}`,
      data,
      op: 'patchProduct',
      friendly: 'Generated method patchProduct failed',
      ...opts,
    });
  }

  /**
   * getProductIdAttachmentsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdAttachmentsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/attachments`,
      data,
      op: 'getProductIdAttachmentsPage',
      friendly: 'Generated method getProductIdAttachmentsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdAttachment
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdAttachment(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/attachments`,
      data,
      op: 'postProductIdAttachment',
      friendly: 'Generated method postProductIdAttachment failed',
      ...opts,
    });
  }

  /**
   * postProductIdAttachmentByBase64
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdAttachmentByBase64(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/attachments/by-base64`,
      data,
      op: 'postProductIdAttachmentByBase64',
      friendly: 'Generated method postProductIdAttachmentByBase64 failed',
      ...opts,
    });
  }

  /**
   * postProductIdAttachmentByUrl
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdAttachmentByUrl(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/attachments/by-url`,
      data,
      op: 'postProductIdAttachmentByUrl',
      friendly: 'Generated method postProductIdAttachmentByUrl failed',
      ...opts,
    });
  }

  /**
   * deleteProductByVersion
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteProductByVersion(config, id, version, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/by-version/${version}`,
      data,
      op: 'deleteProductByVersion',
      friendly: 'Generated method deleteProductByVersion failed',
      ...opts,
    });
  }

  /**
   * getProductByVersion
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductByVersion(config, id, version, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/by-version/${version}`,
      data,
      op: 'getProductByVersion',
      friendly: 'Generated method getProductByVersion failed',
      ...opts,
    });
  }

  /**
   * getProductIdCatalog
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdCatalog(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/catalog`,
      data,
      op: 'getProductIdCatalog',
      friendly: 'Generated method getProductIdCatalog failed',
      ...opts,
    });
  }

  /**
   * getProductIdCategoriesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdCategoriesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/categories`,
      data,
      op: 'getProductIdCategoriesPage',
      friendly: 'Generated method getProductIdCategoriesPage failed',
      ...opts,
    });
  }

  /**
   * patchProductIdCategory
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductIdCategory(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/categories`,
      data,
      op: 'patchProductIdCategory',
      friendly: 'Generated method patchProductIdCategory failed',
      ...opts,
    });
  }

  /**
   * postProductClone
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductClone(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/clone`,
      data,
      op: 'postProductClone',
      friendly: 'Generated method postProductClone failed',
      ...opts,
    });
  }

  /**
   * getProductIdConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/configuration`,
      data,
      op: 'getProductIdConfiguration',
      friendly: 'Generated method getProductIdConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductIdConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductIdConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/configuration`,
      data,
      op: 'patchProductIdConfiguration',
      friendly: 'Generated method patchProductIdConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductIdDiagram
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdDiagram(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/diagrams`,
      data,
      op: 'getProductIdDiagram',
      friendly: 'Generated method getProductIdDiagram failed',
      ...opts,
    });
  }

  /**
   * postProductIdDiagram
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdDiagram(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/diagrams`,
      data,
      op: 'postProductIdDiagram',
      friendly: 'Generated method postProductIdDiagram failed',
      ...opts,
    });
  }

  /**
   * getProductIdGroupedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdGroupedProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/grouped-products`,
      data,
      op: 'getProductIdGroupedProductsPage',
      friendly: 'Generated method getProductIdGroupedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdGroupedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdGroupedProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/grouped-products`,
      data,
      op: 'postProductIdGroupedProduct',
      friendly: 'Generated method postProductIdGroupedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductIdImagesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdImagesPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/images`,
      data,
      op: 'getProductIdImagesPage',
      friendly: 'Generated method getProductIdImagesPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdImage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdImage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/images`,
      data,
      op: 'postProductIdImage',
      friendly: 'Generated method postProductIdImage failed',
      ...opts,
    });
  }

  /**
   * postProductIdImageByBase64
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdImageByBase64(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/images/by-base64`,
      data,
      op: 'postProductIdImageByBase64',
      friendly: 'Generated method postProductIdImageByBase64 failed',
      ...opts,
    });
  }

  /**
   * postProductIdImageByUrl
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdImageByUrl(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/images/by-url`,
      data,
      op: 'postProductIdImageByUrl',
      friendly: 'Generated method postProductIdImageByUrl failed',
      ...opts,
    });
  }

  /**
   * getProductIdLinkedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdLinkedProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/linked-products`,
      data,
      op: 'getProductIdLinkedProductsPage',
      friendly: 'Generated method getProductIdLinkedProductsPage failed',
      ...opts,
    });
  }

  /**
   * getProductIdMappedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdMappedProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/mapped-products`,
      data,
      op: 'getProductIdMappedProductsPage',
      friendly: 'Generated method getProductIdMappedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdMappedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdMappedProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/mapped-products`,
      data,
      op: 'postProductIdMappedProduct',
      friendly: 'Generated method postProductIdMappedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductIdMappedProductBySequence
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdMappedProductBySequence(
    config,
    id,
    sequence,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/mapped-products/by-sequence/${sequence}`,
      data,
      op: 'getProductIdMappedProductBySequence',
      friendly: 'Generated method getProductIdMappedProductBySequence failed',
      ...opts,
    });
  }

  /**
   * getProductIdPinsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdPinsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/pins`,
      data,
      op: 'getProductIdPinsPage',
      friendly: 'Generated method getProductIdPinsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdPin
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdPin(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/pins`,
      data,
      op: 'postProductIdPin',
      friendly: 'Generated method postProductIdPin failed',
      ...opts,
    });
  }

  /**
   * getProductIdProductAccountGroupsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdProductAccountGroupsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/product-account-groups`,
      data,
      op: 'getProductIdProductAccountGroupsPage',
      friendly: 'Generated method getProductIdProductAccountGroupsPage failed',
      ...opts,
    });
  }

  /**
   * getProductIdProductChannelsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdProductChannelsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/product-channels`,
      data,
      op: 'getProductIdProductChannelsPage',
      friendly: 'Generated method getProductIdProductChannelsPage failed',
      ...opts,
    });
  }

  /**
   * getProductIdProductVirtualSettings
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdProductVirtualSettings(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/product-virtual-settings`,
      data,
      op: 'getProductIdProductVirtualSettings',
      friendly: 'Generated method getProductIdProductVirtualSettings failed',
      ...opts,
    });
  }

  /**
   * getProductIdProductOptionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdProductOptionsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/productOptions`,
      data,
      op: 'getProductIdProductOptionsPage',
      friendly: 'Generated method getProductIdProductOptionsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdProductOptionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdProductOptionsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/productOptions`,
      data,
      op: 'postProductIdProductOptionsPage',
      friendly: 'Generated method postProductIdProductOptionsPage failed',
      ...opts,
    });
  }

  /**
   * getProductIdProductSpecificationsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdProductSpecificationsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/productSpecifications`,
      data,
      op: 'getProductIdProductSpecificationsPage',
      friendly: 'Generated method getProductIdProductSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdProductSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdProductSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/productSpecifications`,
      data,
      op: 'postProductIdProductSpecification',
      friendly: 'Generated method postProductIdProductSpecification failed',
      ...opts,
    });
  }

  /**
   * getProductIdRelatedProductsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdRelatedProductsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/relatedProducts`,
      data,
      op: 'getProductIdRelatedProductsPage',
      friendly: 'Generated method getProductIdRelatedProductsPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdRelatedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdRelatedProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/relatedProducts`,
      data,
      op: 'postProductIdRelatedProduct',
      friendly: 'Generated method postProductIdRelatedProduct failed',
      ...opts,
    });
  }

  /**
   * getProductIdShippingConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdShippingConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/shippingConfiguration`,
      data,
      op: 'getProductIdShippingConfiguration',
      friendly: 'Generated method getProductIdShippingConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductIdShippingConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductIdShippingConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/shippingConfiguration`,
      data,
      op: 'patchProductIdShippingConfiguration',
      friendly: 'Generated method patchProductIdShippingConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductIdSkusPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdSkusPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/skus`,
      data,
      op: 'getProductIdSkusPage',
      friendly: 'Generated method getProductIdSkusPage failed',
      ...opts,
    });
  }

  /**
   * postProductIdSku
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postProductIdSku(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/skus`,
      data,
      op: 'postProductIdSku',
      friendly: 'Generated method postProductIdSku failed',
      ...opts,
    });
  }

  /**
   * getProductIdSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdSubscriptionConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/subscriptionConfiguration`,
      data,
      op: 'getProductIdSubscriptionConfiguration',
      friendly: 'Generated method getProductIdSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductIdSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductIdSubscriptionConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/subscriptionConfiguration`,
      data,
      op: 'patchProductIdSubscriptionConfiguration',
      friendly:
        'Generated method patchProductIdSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * getProductIdTaxConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getProductIdTaxConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/taxConfiguration`,
      data,
      op: 'getProductIdTaxConfiguration',
      friendly: 'Generated method getProductIdTaxConfiguration failed',
      ...opts,
    });
  }

  /**
   * patchProductIdTaxConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchProductIdTaxConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/products/${id}/taxConfiguration`,
      data,
      op: 'patchProductIdTaxConfiguration',
      friendly: 'Generated method patchProductIdTaxConfiguration failed',
      ...opts,
    });
  }

  /**
   * deleteRelatedProductBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteRelatedProductBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/relatedProducts/batch`,
      data,
      op: 'deleteRelatedProductBatch',
      friendly: 'Generated method deleteRelatedProductBatch failed',
      ...opts,
    });
  }

  /**
   * deleteRelatedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteRelatedProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/relatedProducts/${id}`,
      data,
      op: 'deleteRelatedProduct',
      friendly: 'Generated method deleteRelatedProduct failed',
      ...opts,
    });
  }

  /**
   * getRelatedProduct
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getRelatedProduct(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/relatedProducts/${id}`,
      data,
      op: 'getRelatedProduct',
      friendly: 'Generated method getRelatedProduct failed',
      ...opts,
    });
  }

  /**
   * deleteSkuUnitOfMeasureBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuUnitOfMeasureBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-unit-of-measures/batch`,
      data,
      op: 'deleteSkuUnitOfMeasureBatch',
      friendly: 'Generated method deleteSkuUnitOfMeasureBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSkuUnitOfMeasure
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuUnitOfMeasure(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-unit-of-measures/${id}`,
      data,
      op: 'deleteSkuUnitOfMeasure',
      friendly: 'Generated method deleteSkuUnitOfMeasure failed',
      ...opts,
    });
  }

  /**
   * getSkuUnitOfMeasure
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuUnitOfMeasure(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-unit-of-measures/${id}`,
      data,
      op: 'getSkuUnitOfMeasure',
      friendly: 'Generated method getSkuUnitOfMeasure failed',
      ...opts,
    });
  }

  /**
   * patchSkuUnitOfMeasure
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSkuUnitOfMeasure(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-unit-of-measures/${id}`,
      data,
      op: 'patchSkuUnitOfMeasure',
      friendly: 'Generated method patchSkuUnitOfMeasure failed',
      ...opts,
    });
  }

  /**
   * deleteSkuVirtualSettingsFileEntryBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuVirtualSettingsFileEntryBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings-file-entries/batch`,
      data,
      op: 'deleteSkuVirtualSettingsFileEntryBatch',
      friendly:
        'Generated method deleteSkuVirtualSettingsFileEntryBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSkuVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings-file-entries/${id}`,
      data,
      op: 'deleteSkuVirtualSettingsFileEntry',
      friendly: 'Generated method deleteSkuVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * getSkuVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings-file-entries/${id}`,
      data,
      op: 'getSkuVirtualSettingsFileEntry',
      friendly: 'Generated method getSkuVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * patchSkuVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSkuVirtualSettingsFileEntry(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings-file-entries/${id}`,
      data,
      op: 'patchSkuVirtualSettingsFileEntry',
      friendly: 'Generated method patchSkuVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * getSkuVirtualSettingIdSkuVirtualSettingsFileEntriesPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuVirtualSettingIdSkuVirtualSettingsFileEntriesPage(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings/${id}/sku-virtual-settings-file-entries`,
      data,
      op: 'getSkuVirtualSettingIdSkuVirtualSettingsFileEntriesPage',
      friendly:
        'Generated method getSkuVirtualSettingIdSkuVirtualSettingsFileEntriesPage failed',
      ...opts,
    });
  }

  /**
   * postSkuVirtualSettingIdSkuVirtualSettingsFileEntry
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSkuVirtualSettingIdSkuVirtualSettingsFileEntry(
    config,
    id,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/sku-virtual-settings/${id}/sku-virtual-settings-file-entries`,
      data,
      op: 'postSkuVirtualSettingIdSkuVirtualSettingsFileEntry',
      friendly:
        'Generated method postSkuVirtualSettingIdSkuVirtualSettingsFileEntry failed',
      ...opts,
    });
  }

  /**
   * getSkusPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkusPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus`,
      data,
      op: 'getSkusPage',
      friendly: 'Generated method getSkusPage failed',
      ...opts,
    });
  }

  /**
   * deleteSkuBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/batch`,
      data,
      op: 'deleteSkuBatch',
      friendly: 'Generated method deleteSkuBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSkuByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSkuByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'deleteSkuByExternalReferenceCode',
      friendly: 'Generated method deleteSkuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSkuByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'getSkuByExternalReferenceCode',
      friendly: 'Generated method getSkuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchSkuByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSkuByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'patchSkuByExternalReferenceCode',
      friendly: 'Generated method patchSkuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSkuByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putSkuByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}`,
      data,
      op: 'putSkuByExternalReferenceCode',
      friendly: 'Generated method putSkuByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSkuByExternalReferenceCodeSkuUnitOfMeasuresPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuByExternalReferenceCodeSkuUnitOfMeasuresPage(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}/sku-unit-of-measures`,
      data,
      op: 'getSkuByExternalReferenceCodeSkuUnitOfMeasuresPage',
      friendly:
        'Generated method getSkuByExternalReferenceCodeSkuUnitOfMeasuresPage failed',
      ...opts,
    });
  }

  /**
   * postSkuByExternalReferenceCodeSkuUnitOfMeasure
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSkuByExternalReferenceCodeSkuUnitOfMeasure(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}/sku-unit-of-measures`,
      data,
      op: 'postSkuByExternalReferenceCodeSkuUnitOfMeasure',
      friendly:
        'Generated method postSkuByExternalReferenceCodeSkuUnitOfMeasure failed',
      ...opts,
    });
  }

  /**
   * getSkuByExternalReferenceCodeSkuVirtualSettings
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuByExternalReferenceCodeSkuVirtualSettings(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}/sku-virtual-settings`,
      data,
      op: 'getSkuByExternalReferenceCodeSkuVirtualSettings',
      friendly:
        'Generated method getSkuByExternalReferenceCodeSkuVirtualSettings failed',
      ...opts,
    });
  }

  /**
   * getSkuByExternalReferenceCodeSkuSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuByExternalReferenceCodeSkuSubscriptionConfiguration(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/by-externalReferenceCode/${externalReferenceCode}/skuSubscriptionConfiguration`,
      data,
      op: 'getSkuByExternalReferenceCodeSkuSubscriptionConfiguration',
      friendly:
        'Generated method getSkuByExternalReferenceCodeSkuSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * postSkusPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSkusPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/export-batch`,
      data,
      op: 'postSkusPageExportBatch',
      friendly: 'Generated method postSkusPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postSkuIdSkuUnitOfMeasureBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSkuIdSkuUnitOfMeasureBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/sku-unit-of-measures/batch`,
      data,
      op: 'postSkuIdSkuUnitOfMeasureBatch',
      friendly: 'Generated method postSkuIdSkuUnitOfMeasureBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSku
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSku(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}`,
      data,
      op: 'deleteSku',
      friendly: 'Generated method deleteSku failed',
      ...opts,
    });
  }

  /**
   * getSku
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSku(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}`,
      data,
      op: 'getSku',
      friendly: 'Generated method getSku failed',
      ...opts,
    });
  }

  /**
   * patchSku
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSku(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}`,
      data,
      op: 'patchSku',
      friendly: 'Generated method patchSku failed',
      ...opts,
    });
  }

  /**
   * getSkuIdSkuUnitOfMeasuresPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuIdSkuUnitOfMeasuresPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}/sku-unit-of-measures`,
      data,
      op: 'getSkuIdSkuUnitOfMeasuresPage',
      friendly: 'Generated method getSkuIdSkuUnitOfMeasuresPage failed',
      ...opts,
    });
  }

  /**
   * postSkuIdSkuUnitOfMeasure
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSkuIdSkuUnitOfMeasure(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}/sku-unit-of-measures`,
      data,
      op: 'postSkuIdSkuUnitOfMeasure',
      friendly: 'Generated method postSkuIdSkuUnitOfMeasure failed',
      ...opts,
    });
  }

  /**
   * getSkuIdSkuVirtualSettings
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuIdSkuVirtualSettings(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}/sku-virtual-settings`,
      data,
      op: 'getSkuIdSkuVirtualSettings',
      friendly: 'Generated method getSkuIdSkuVirtualSettings failed',
      ...opts,
    });
  }

  /**
   * getSkuIdSkuSubscriptionConfiguration
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSkuIdSkuSubscriptionConfiguration(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/skus/${id}/skuSubscriptionConfiguration`,
      data,
      op: 'getSkuIdSkuSubscriptionConfiguration',
      friendly: 'Generated method getSkuIdSkuSubscriptionConfiguration failed',
      ...opts,
    });
  }

  /**
   * getSpecificationsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSpecificationsPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications`,
      data,
      op: 'getSpecificationsPage',
      friendly: 'Generated method getSpecificationsPage failed',
      ...opts,
    });
  }

  /**
   * postSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecification(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications`,
      data,
      op: 'postSpecification',
      friendly: 'Generated method postSpecification failed',
      ...opts,
    });
  }

  /**
   * deleteSpecificationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSpecificationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/batch`,
      data,
      op: 'deleteSpecificationBatch',
      friendly: 'Generated method deleteSpecificationBatch failed',
      ...opts,
    });
  }

  /**
   * postSpecificationBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecificationBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/batch`,
      data,
      op: 'postSpecificationBatch',
      friendly: 'Generated method postSpecificationBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'deleteSpecificationByExternalReferenceCode',
      friendly:
        'Generated method deleteSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * getSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'getSpecificationByExternalReferenceCode',
      friendly:
        'Generated method getSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * patchSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'patchSpecificationByExternalReferenceCode',
      friendly:
        'Generated method patchSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * putSpecificationByExternalReferenceCode
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async putSpecificationByExternalReferenceCode(
    config,
    externalReferenceCode,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'PUT',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/by-external-reference-code/${externalReferenceCode}`,
      data,
      op: 'putSpecificationByExternalReferenceCode',
      friendly:
        'Generated method putSpecificationByExternalReferenceCode failed',
      ...opts,
    });
  }

  /**
   * postSpecificationsPageExportBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecificationsPageExportBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/export-batch`,
      data,
      op: 'postSpecificationsPageExportBatch',
      friendly: 'Generated method postSpecificationsPageExportBatch failed',
      ...opts,
    });
  }

  /**
   * postSpecificationIdListTypeDefinitionBatch
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecificationIdListTypeDefinitionBatch(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/list-type-definitions/batch`,
      data,
      op: 'postSpecificationIdListTypeDefinitionBatch',
      friendly:
        'Generated method postSpecificationIdListTypeDefinitionBatch failed',
      ...opts,
    });
  }

  /**
   * deleteSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${id}`,
      data,
      op: 'deleteSpecification',
      friendly: 'Generated method deleteSpecification failed',
      ...opts,
    });
  }

  /**
   * getSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${id}`,
      data,
      op: 'getSpecification',
      friendly: 'Generated method getSpecification failed',
      ...opts,
    });
  }

  /**
   * patchSpecification
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async patchSpecification(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'PATCH',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${id}`,
      data,
      op: 'patchSpecification',
      friendly: 'Generated method patchSpecification failed',
      ...opts,
    });
  }

  /**
   * getSpecificationIdListTypeDefinitionsPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getSpecificationIdListTypeDefinitionsPage(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${id}/list-type-definitions`,
      data,
      op: 'getSpecificationIdListTypeDefinitionsPage',
      friendly:
        'Generated method getSpecificationIdListTypeDefinitionsPage failed',
      ...opts,
    });
  }

  /**
   * postSpecificationIdListTypeDefinition
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecificationIdListTypeDefinition(config, id, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${id}/list-type-definitions`,
      data,
      op: 'postSpecificationIdListTypeDefinition',
      friendly: 'Generated method postSpecificationIdListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * deleteSpecificationListTypeDefinition
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async deleteSpecificationListTypeDefinition(
    config,
    specificationId,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'DELETE',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${specificationId}/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'deleteSpecificationListTypeDefinition',
      friendly: 'Generated method deleteSpecificationListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * postSpecificationListTypeDefinition
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async postSpecificationListTypeDefinition(
    config,
    specificationId,
    listTypeDefinitionId,
    data,
    opts = {}
  ) {
    return await this.rest._request(config, {
      method: 'POST',
      url: `/o/headless-commerce-admin-catalog/v1.0/specifications/${specificationId}/list-type-definitions/${listTypeDefinitionId}`,
      data,
      op: 'postSpecificationListTypeDefinition',
      friendly: 'Generated method postSpecificationListTypeDefinition failed',
      ...opts,
    });
  }

  /**
   * getUnitOfMeasureSkusPage
   * API: headless-commerce-admin-catalog-v1.0 | Version: v1.0
   */
  async getUnitOfMeasureSkusPage(config, data, opts = {}) {
    return await this.rest._request(config, {
      method: 'GET',
      url: `/o/headless-commerce-admin-catalog/v1.0/unit-of-measure-skus`,
      data,
      op: 'getUnitOfMeasureSkusPage',
      friendly: 'Generated method getUnitOfMeasureSkusPage failed',
      ...opts,
    });
  }
}

module.exports = HeadlessCommerceAdminCatalogClient_v1_0;
