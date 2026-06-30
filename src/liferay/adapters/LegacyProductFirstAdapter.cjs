const LiferayCatalogAdapter = require('./LiferayCatalogAdapter.cjs');
const { asItems } = require('../../utils/liferayUtils.cjs');
const { delay } = require('../../utils/misc.cjs');

class LegacyProductFirstAdapter extends LiferayCatalogAdapter {
  constructor(restService, pathsProfile) {
    super(restService, pathsProfile);
  }

  async getProductsRaw(config, filter, page, pageSize, fields) {
    return await this.rest._get(
      config,
      this.paths.PATH.PRODUCTS,
      'get-products-bulk',
      'Get Products Bulk',
      {
        params: {
          filter,
          page,
          pageSize,
          fields,
        },
      }
    );
  }

  async createProductsBatch(config, items, opts = {}) {
    return await this.rest._postBatch(config, {
      entityName: 'product',
      items,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'product',
      op: 'products:batch',
      friendly: 'Failed to create products (batch)',
      path: this.paths.PATH.PRODUCTS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async deleteProductsBatch(config, opts = {}) {
    return await this.rest._postBatch(config, {
      entityName: 'product',
      items: opts.items || [],
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'product',
      op: 'products:batch-delete',
      friendly: 'Delete products (batch)',
      path: this.paths.PATH.PRODUCTS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async createProductSkusBatch(config, skusData, opts = {}) {
    return await this.rest._postBatch(config, {
      entityName: 'sku',
      items: skusData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'sku',
      op: 'create-skus-batch',
      friendly: 'Failed to create SKUs batch',
      path: (callback) => {
        if (opts.productId || opts.productExternalReferenceCode) {
          return this.paths.PATH.PRODUCT_SKUS_BATCH_SCOPED(
            opts.productId,
            opts.productExternalReferenceCode,
            callback
          );
        }
        return this.paths.PATH.PRODUCTS_SKUS_BATCH(callback);
      },
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async createProductSku(config, productId, skuData) {
    return await this.rest._post(
      config,
      this.paths.PATH.PRODUCT_SKUS(productId),
      skuData,
      'create-sku',
      'Failed to create SKU'
    );
  }

  async getSkusByERC(config, ercs) {
    if (!ercs || ercs.length === 0) return [];

    const results = await Promise.allSettled(
      ercs.map(async (erc) => {
        return await this.rest._get(
          config,
          this.paths.PATH.SKU_BY_ERC(erc),
          'get-sku-by-erc',
          'Get SKU by ERC'
        );
      })
    );

    return results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
  }

  async getProductOptions(config, productId) {
    const data = await this.rest._get(
      config,
      this.paths.PATH.PRODUCT_OPTIONS(productId),
      'get-product-options'
    );
    return asItems(data);
  }

  async deleteProductOption(config, productId, optionId) {
    return await this.rest._delete(
      config,
      this.paths.PATH.PRODUCT_OPTION(optionId),
      null,
      'delete-product-option',
      'Failed to delete product option'
    );
  }

  async addProductOptions(config, productId, productOptions, productERC) {
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    const path = productERC
      ? this.paths.PATH.PRODUCT_OPTIONS_BY_ERC(productERC)
      : this.paths.PATH.PRODUCT_OPTIONS(productId);

    while (attempts < maxAttempts) {
      try {
        return await this.rest._post(
          config,
          path,
          productOptions,
          'add-product-options',
          'Failed to add product options'
        );
      } catch (error) {
        lastError = error;
        if (error.problem?.status === 404 || error.status === 404) {
          attempts++;
          if (attempts < maxAttempts) {
            const delayMs = 2000 * attempts;
            this.rest.ctx.logger.warn(
              `Product ${productERC || productId} not found for options link, retrying in ${delayMs}ms...`,
              { attempt: attempts, productId, productERC }
            );
            await delay(delayMs);
            continue;
          }
        }
        throw error;
      }
    }
    throw lastError;
  }

  async getProductSpecifications(config, productId) {
    const data = await this.rest._get(
      config,
      this.paths.PATH.PRODUCT_SPECIFICATIONS(productId),
      'get-product-specs'
    );
    return asItems(data);
  }

  async deleteProductSpecification(config, productId, specId) {
    return await this.rest._delete(
      config,
      this.paths.PATH.PRODUCT_SPECIFICATION(specId),
      null,
      'delete-product-specification',
      'Failed to delete product specification'
    );
  }
}

module.exports = LegacyProductFirstAdapter;
