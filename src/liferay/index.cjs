const LiferayRestService = require('./rest.cjs');
const LiferayGraphQLService = require('./graphql.cjs');
const GeneratedLiferayClient = require('./GeneratedLiferayClient.cjs');
const CatalogAdapterFactory = require('./adapters/CatalogAdapterFactory.cjs');
const ExtractionFacade = require('../services/extractionFacade.cjs');
const { asItems } = require('../utils/liferayUtils.cjs');
const { PATH } = require('../utils/liferayPaths.cjs');
const { delay, fromI18n } = require('../utils/misc.cjs');
class LiferayService {
  constructor(ctx) {
    this.ctx = ctx;
    this.rest = new LiferayRestService(ctx);
    this.graphql = new LiferayGraphQLService(ctx);
    this.client = new GeneratedLiferayClient(this.rest);
    this.catalogAdapterFactory = new CatalogAdapterFactory();
    this.extraction = new ExtractionFacade(this);
    this.ctx.logger.debug(
      'LiferayService: GraphQL, Fluent client, catalogAdapterFactory, and extractionFacade initialized'
    );
    const ContentService = require('./services/ContentService.cjs');
    const CommerceService = require('./services/CommerceService.cjs');
    const PricingService = require('./services/PricingService.cjs');
    const AccountService = require('./services/AccountService.cjs');
    const TaxonomyService = require('./services/TaxonomyService.cjs');
    this.content = new ContentService(this);
    this.commerce = new CommerceService(this);
    this.pricing = new PricingService(this);
    this.account = new AccountService(this);
    this.taxonomy = new TaxonomyService(this);
  }
  async getCatalogAdapter(...args) {
    return this.commerce.getCatalogAdapter(...args);
  }
  async _collectAllItems(config, fetcherFn, maxItems = 5000) {
    let allItems = [];
    for await (const pageRes of this.rest.iteratePages(
      config,
      fetcherFn,
      null,
      null,
      {
        pageSize: 200,
      }
    )) {
      const items = asItems(pageRes);
      allItems.push(...items);
      if (allItems.length >= maxItems) {
        break;
      }
    }
    if (allItems.length > maxItems) {
      allItems = allItems.slice(0, maxItems);
    }
    return {
      items: allItems,
      totalCount: allItems.length,
    };
  }

  // --- Discovery Methods (Standardized Entry Points with Exclusions) ---
  async getProductsWithSkus(...args) {
    return this.commerce.getProductsWithSkus(...args);
  }
  async getProducts(...args) {
    return this.commerce.getProducts(...args);
  }
  async getAccountGroups(...args) {
    return this.account.getAccountGroups(...args);
  }
  async getAccounts(...args) {
    return this.account.getAccounts(...args);
  }
  async getOptionCategories(...args) {
    return this.commerce.getOptionCategories(...args);
  }
  async getSpecifications(...args) {
    return this.commerce.getSpecifications(...args);
  }
  async getOptions(...args) {
    return this.commerce.getOptions(...args);
  }
  async getOrders(...args) {
    return this.pricing.getOrders(...args);
  }
  async getWarehouses(...args) {
    return this.commerce.getWarehouses(...args);
  }
  async getAllWarehouseItems(...args) {
    return this.commerce.getAllWarehouseItems(...args);
  }
  async getPriceLists(...args) {
    return this.pricing.getPriceLists(...args);
  }
  async getPromotions(...args) {
    return this.pricing.getPromotions(...args);
  }

  // --- Filtered Deletion Loop ---

  async deleteByFilter(
    config,
    {
      entityName,
      filter,
      search,
      nativeBatch,
      ids: providedIds,
      items: providedItems,
      channelId,
      ...rest
    }
  ) {
    const { logger } = this.ctx;
    const exclusions = await this._getExclusions(config, entityName);

    // Define discovery fields per entity to avoid GraphQL DataFetchingException
    const DISCOVERY_FIELDS = {
      product: 'productId,externalReferenceCode,name',
      account: 'id,externalReferenceCode,name',
      'account-group': 'id,externalReferenceCode,name',
      warehouse: 'id,externalReferenceCode,name',
      warehouseItem: 'id,externalReferenceCode,sku,quantity',
      priceList: 'id,externalReferenceCode,name,catalogBasePriceList',
      promotion: 'id,externalReferenceCode,name,catalogBasePriceList',
      order: 'id,externalReferenceCode',
      specification: 'id,externalReferenceCode,title,key',
      option: 'id,externalReferenceCode,name,key',
      optionCategory: 'id,externalReferenceCode,title,key',
    };
    const fieldsParam =
      DISCOVERY_FIELDS[entityName] || 'id,externalReferenceCode,name';
    let totalDeleted = 0;
    const batchRefs = [];
    let batchCount = 0;
    const processBatch = async (items) => {
      const filteredItems = items.filter(
        (it) => !this._shouldExclude(it, exclusions)
      );
      const ids = filteredItems
        .map((it) =>
          entityName === 'product'
            ? it.productId || it.id
            : it.id || it.productId
        )
        .filter(Boolean);
      if (ids.length === 0) return;
      let result;
      const currentErc = rest.externalReferenceCode
        ? batchCount > 0
          ? `${rest.externalReferenceCode}-${batchCount}`
          : rest.externalReferenceCode
        : undefined;
      if (nativeBatch) {
        result = await this.rest._deleteBatchNative(config, {
          entityName,
          ids,
          idField: entityName === 'product' ? 'productId' : 'id',
          ...rest,
          externalReferenceCode: currentErc,
        });
      } else {
        result = await this.rest._deleteBatchSimulated(config, {
          entityName,
          ids,
          ...rest,
          externalReferenceCode: currentErc,
        });
      }
      batchCount++;
      totalDeleted += result.count || 0;
      if (result.batchRefs) batchRefs.push(...result.batchRefs);
    };
    if (providedItems && providedItems.length > 0) {
      const chunks = this.rest._chunkArray(providedItems, 500);
      for (const chunk of chunks) {
        await processBatch(chunk);
      }
    } else if (providedIds && providedIds.length > 0) {
      const idChunks = this.rest._chunkArray(providedIds, 100); // Smaller chunks for large OR filters
      for (const idChunk of idChunks) {
        // Resolve full metadata for these IDs to check exclusions
        // Use 'or' instead of 'in' for maximum compatibility
        const idFilter = idChunk
          .map((id) =>
            entityName === 'product' ? `productId eq ${id}` : `id eq ${id}`
          )
          .join(' or ');
        try {
          const items = await this.rest._collectPagedItems(config, {
            listUrl: rest.listUrl,
            pageSize: 200,
            filter: idFilter,
            fields: fieldsParam,
            op: `${entityName}:list-for-exclusion`,
            friendly: `Fetch ${entityName} for metadata check`,
          });
          if (items && items.length > 0) {
            await processBatch(items);
          }
        } catch (err) {
          logger.error(
            `Failed to resolve metadata for ${entityName} chunk. Deleting without exclusion check as fallback.`,
            {
              error: err.message,
              sessionId: rest.sessionId,
            }
          );
          // If metadata fetch fails, we fallback to deleting the IDs directly to avoid stalling the workflow
          // Note: Exclusions won't be respected in this fallback case
          await this.rest._deleteBatchSimulated(config, {
            entityName,
            ids: idChunk,
            ...rest,
          });
        }
      }
    } else {
      let page = 1;
      let hasMore = true;
      const pageSize = 200;
      while (hasMore) {
        let res;
        if (entityName === 'account') {
          res = await this.getAccounts(config, {
            channelId,
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'account-group') {
          res = await this.getAccountGroups(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'priceList') {
          res = await this.getPriceLists(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'promotion') {
          res = await this.getPromotions(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'product') {
          res = await this.getProducts(config, {
            catalogId: rest.catalogId,
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'warehouseItem') {
          res = await this.getAllWarehouseItems(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'specification') {
          res = await this.getSpecifications(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'option') {
          res = await this.getOptions(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'optionCategory') {
          res = await this.getOptionCategories(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'order') {
          res = await this.getOrders(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else if (entityName === 'warehouse') {
          res = await this.getWarehouses(config, {
            pageSize,
            fields: fieldsParam,
            filter,
            search,
          });
        } else {
          // Absolute REST fallback for non-GraphQL entities
          res = await this.rest._get(
            config,
            rest.listUrl,
            `${entityName}:list`,
            `List ${entityName}`,
            {
              params: {
                page,
                pageSize,
                filter,
                search,
                fields: fieldsParam,
              },
            }
          );
        }
        const items = asItems(res);
        if (items.length === 0) {
          break;
        }
        await processBatch(items);
        if (items.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
        if (page > 1000) {
          logger.warn('Safety break hit in deleteByFilter pagination', {
            entityName,
            sessionId: rest.sessionId,
          });
          break;
        }
      }
    }
    return {
      success: true,
      count: totalDeleted,
      batchRefs,
    };
  }
  async deletePriceListsBatch(...args) {
    return this.pricing.deletePriceListsBatch(...args);
  }
  async deletePromotionsBatch(...args) {
    return this.pricing.deletePromotionsBatch(...args);
  }
  async deleteProductsBatch(...args) {
    return this.commerce.deleteProductsBatch(...args);
  }
  async deleteAccountsBatch(...args) {
    return this.account.deleteAccountsBatch(...args);
  }
  async deleteAccountGroupsBatch(...args) {
    return this.account.deleteAccountGroupsBatch(...args);
  }
  async deleteOrdersBatch(...args) {
    return this.pricing.deleteOrdersBatch(...args);
  }
  async deleteWarehousesBatch(...args) {
    return this.commerce.deleteWarehousesBatch(...args);
  }
  async deleteWarehouseItemsBatch(...args) {
    return this.commerce.deleteWarehouseItemsBatch(...args);
  }
  async deleteSpecificationsBatch(...args) {
    return this.commerce.deleteSpecificationsBatch(...args);
  }
  async deleteOptionsBatch(...args) {
    return this.commerce.deleteOptionsBatch(...args);
  }
  async deleteOptionCategoriesBatch(...args) {
    return this.commerce.deleteOptionCategoriesBatch(...args);
  }

  // --- Exclusion Helpers ---

  _buildNameExclusionFilter(exclusions, fieldName = 'name') {
    if (!exclusions || exclusions.length === 0) return null;
    const names = exclusions
      .map((ex) => ex.name)
      .filter((n) => n && typeof n === 'string');
    if (names.length === 0) return null;
    return names.map((name) => `${fieldName} ne '${name}'`).join(' and ');
  }
  async _getExclusions(config, entityName) {
    const { config: configService } = this.ctx;
    const excludeLists = await configService.getExcludeLists(config);
    const keyMap = {
      account: 'excludedAccounts',
      product: 'excludedProducts',
      warehouse: 'excludedWarehouses',
      priceList: 'excludedPriceLists',
      promotion: 'excludedPriceLists',
      // Promotions are in the PriceLists exclude list
      order: 'excludedOrders',
      specification: 'excludedSpecifications',
      option: 'excludedOptions',
      optionCategory: 'excludedOptionCategories',
    };
    const configKey = keyMap[entityName];
    return excludeLists?.[configKey] || [];
  }
  _shouldExclude(item, exclusions) {
    if (item.system === true || item.system === 'true') return true;
    if (
      item.catalogBasePriceList === true ||
      item.catalogBasePriceList === 'true'
    ) {
      if (
        !item.externalReferenceCode ||
        !item.externalReferenceCode.startsWith('AICA-')
      ) {
        return true;
      }
    }
    if (!exclusions || exclusions.length === 0) return false;
    return exclusions.some((ex) => {
      const idMatch =
        ex.entityId &&
        (String(item.id) === String(ex.entityId) ||
          String(item.productId) === String(ex.entityId));
      const ercMatch = ex.erc && item.externalReferenceCode === ex.erc;
      const nameMatch =
        ex.name &&
        (item.name === ex.name ||
          item.title === ex.name ||
          (typeof item.name === 'object' &&
            Object.values(item.name).includes(ex.name)));
      return idMatch || ercMatch || nameMatch;
    });
  }

  // --- Connectivity Helpers ---

  /**
   * Resilience: Retries connection test until Liferay is reachable or timeout hit.
   * Used at startup to prevent "Ghost failures" during the boot sequence.
   */
  async waitForLiferay(maxAttempts = 12, delayMs = 5000) {
    const { logger } = this.ctx;
    const {
      resolveEffectiveLiferayConnection,
    } = require('../utils/liferayEnv.cjs');

    // Use default environment credentials for the probe
    let config;
    try {
      config = resolveEffectiveLiferayConnection(
        {},
        this.ctx.oauth,
        this.ctx.persistence
      );
    } catch (_err) {
      const { lookupConfig } = require('@rotty3000/config-node');
      const rawUrl =
        lookupConfig('com.liferay.lxc.dxp.main.domain') ||
        lookupConfig('com.liferay.lxc.dxp.server.host') ||
        process.env.LIFERAY_URL ||
        'http://localhost:8080';
      let liferayUrl = rawUrl;
      if (rawUrl && !rawUrl.includes('://')) {
        const protocol =
          lookupConfig('com.liferay.lxc.dxp.server.protocol') || 'http';
        liferayUrl = `${protocol}://${rawUrl}`;
      }
      config = {
        liferayUrl,
      };
    }
    logger.info(
      `Starting Liferay connectivity probe for ${config.liferayUrl}`,
      {
        operation: 'startup-probe-start',
        maxAttempts,
        delayMs,
      }
    );
    for (let i = 1; i <= maxAttempts; i++) {
      try {
        const result = await this.testConnection(config);
        if (result.status === 'connected') {
          logger.success('Liferay connectivity established.', {
            operation: 'startup-probe-success',
            attempt: i,
          });
          return true;
        }
      } catch (err) {
        logger.debug(
          `Startup probe ${i}/${maxAttempts} failed: ${err.message}. Retrying in ${delayMs}ms...`,
          {
            operation: 'startup-probe-retry',
          }
        );
      }
      await delay(delayMs);
    }
    logger.warn(
      `Liferay connectivity probe timed out after ${maxAttempts} attempts. Proceeding with caution.`,
      {
        operation: 'startup-probe-timeout',
      }
    );
    return false;
  }
  testConnection(config) {
    return this.rest.testConnection(config);
  }
  getConfig(config, configKey) {
    return this.rest.getConfig(config, configKey);
  }
  updateConfig(config, configKey, configValue) {
    return this.rest.updateConfig(config, configKey, configValue);
  }
  async getCurrencies(...args) {
    return this.taxonomy.getCurrencies(...args);
  }
  async getTaxonomyVocabularies(...args) {
    return this.taxonomy.getTaxonomyVocabularies(...args);
  }
  async getTaxonomyCategories(...args) {
    return this.taxonomy.getTaxonomyCategories(...args);
  }
  async getRegions(...args) {
    return this.taxonomy.getRegions(...args);
  }
  async getCatalogs(...args) {
    return this.commerce.getCatalogs(...args);
  }
  async getCatalog(...args) {
    return this.commerce.getCatalog(...args);
  }
  async patchCatalog(...args) {
    return this.commerce.patchCatalog(...args);
  }
  async getChannels(...args) {
    return this.commerce.getChannels(...args);
  }
  async createChannel(...args) {
    return this.commerce.createChannel(...args);
  }
  async getLanguages(...args) {
    return this.taxonomy.getLanguages(...args);
  }
  getProductCount(config) {
    return this.rest.getProductCount(config);
  }
  async getPrimaryAccountId(...args) {
    return this.account.getPrimaryAccountId(...args);
  }
  async getAccountCount(...args) {
    return this.account.getAccountCount(...args);
  }
  getImportTask(config, batchId) {
    return this.rest.getImportTask(config, batchId);
  }
  getImportTaskSubmittedContent(config, batchId) {
    return this.rest.getImportTaskSubmittedContent(config, batchId);
  }
  getImportTaskFailedItemReport(config, batchId) {
    return this.rest.getImportTaskFailedItemReport(config, batchId);
  }
  deleteAll(config, args) {
    return this.deleteByFilter(config, {
      ...args,
      filter: undefined,
    });
  }
  async createWarehouse(...args) {
    return this.commerce.createWarehouse(...args);
  }
  async createWarehousesBatch(...args) {
    return this.commerce.createWarehousesBatch(...args);
  }
  async createWarehouseItemsBatch(...args) {
    return this.commerce.createWarehouseItemsBatch(...args);
  }
  async createWarehouseChannelsBatch(...args) {
    return this.commerce.createWarehouseChannelsBatch(...args);
  }
  async createWarehouseChannel(...args) {
    return this.commerce.createWarehouseChannel(...args);
  }
  async deleteWarehouse(...args) {
    return this.commerce.deleteWarehouse(...args);
  }
  async updateProductInventory(...args) {
    return this.commerce.updateProductInventory(...args);
  }
  async updateInventory(...args) {
    return this.commerce.updateInventory(...args);
  }
  async createProduct(...args) {
    return this.commerce.createProduct(...args);
  }
  async createProductsBatch(...args) {
    return this.commerce.createProductsBatch(...args);
  }
  async createProductSkusBatch(...args) {
    return this.commerce.createProductSkusBatch(...args);
  }
  async createAccount(...args) {
    return this.account.createAccount(...args);
  }
  async patchAccount(...args) {
    return this.account.patchAccount(...args);
  }
  async patchAccountByERC(...args) {
    return this.account.patchAccountByERC(...args);
  }
  async getAccountByERC(...args) {
    return this.account.getAccountByERC(...args);
  }
  async getPostalAddressByERC(...args) {
    return this.account.getPostalAddressByERC(...args);
  }
  async getCountries(...args) {
    return this.taxonomy.getCountries(...args);
  }
  async getCountryRegions(...args) {
    return this.taxonomy.getCountryRegions(...args);
  }
  async createAccountAddress(...args) {
    return this.account.createAccountAddress(...args);
  }
  async createAccountAddressBatch(...args) {
    return this.account.createAccountAddressBatch(...args);
  }
  async createSpecificationsBatch(...args) {
    return this.commerce.createSpecificationsBatch(...args);
  }
  async createOptionsBatch(...args) {
    return this.commerce.createOptionsBatch(...args);
  }
  async createAccountsBatch(...args) {
    return this.account.createAccountsBatch(...args);
  }
  async createOrdersBatch(...args) {
    return this.pricing.createOrdersBatch(...args);
  }
  async createOrder(...args) {
    return this.pricing.createOrder(...args);
  }
  async createAccountGroup(...args) {
    return this.account.createAccountGroup(...args);
  }
  async getAccountGroupByERC(...args) {
    return this.account.getAccountGroupByERC(...args);
  }
  async assignAccountToGroup(...args) {
    return this.account.assignAccountToGroup(...args);
  }
  async createPriceListAccountGroup(...args) {
    return this.pricing.createPriceListAccountGroup(...args);
  }
  async createPriceList(...args) {
    return this.pricing.createPriceList(...args);
  }
  async patchPriceList(...args) {
    return this.pricing.patchPriceList(...args);
  }
  async getPriceListByERC(...args) {
    return this.pricing.getPriceListByERC(...args);
  }
  async createPriceListsBatch(...args) {
    return this.pricing.createPriceListsBatch(...args);
  }
  async createPriceEntriesBatch(...args) {
    return this.pricing.createPriceEntriesBatch(...args);
  }
  async createPriceEntry(...args) {
    return this.pricing.createPriceEntry(...args);
  }
  async createSkuPriceEntry(...args) {
    return this.pricing.createSkuPriceEntry(...args);
  }
  async createProductSku(...args) {
    return this.commerce.createProductSku(...args);
  }
  async addProductImage(...args) {
    return this.commerce.addProductImage(...args);
  }
  async addProductDocumentAttachment(...args) {
    return this.commerce.addProductDocumentAttachment(...args);
  }
  async addProductImageByBase64(...args) {
    return this.commerce.addProductImageByBase64(...args);
  }
  async addProductDocumentAttachmentByBase64(...args) {
    return this.commerce.addProductDocumentAttachmentByBase64(...args);
  }
  async addProductImageMultipart(...args) {
    return this.commerce.addProductImageMultipart(...args);
  }
  async addProductDocumentAttachmentMultipart(...args) {
    return this.commerce.addProductDocumentAttachmentMultipart(...args);
  }
  async addProductImageDocumentLibrary(...args) {
    return this.commerce.addProductImageDocumentLibrary(...args);
  }
  async addProductDocumentAttachmentDocumentLibrary(...args) {
    return this.commerce.addProductDocumentAttachmentDocumentLibrary(...args);
  }
  async addProductOptions(...args) {
    return this.commerce.addProductOptions(...args);
  }
  async deleteProductOption(...args) {
    return this.commerce.deleteProductOption(...args);
  }
  async addProductChannels(...args) {
    return this.commerce.addProductChannels(...args);
  }
  async addWarehouseChannel(...args) {
    return this.commerce.addWarehouseChannel(...args);
  }
  async getProductOptions(...args) {
    return this.commerce.getProductOptions(...args);
  }
  async deleteProductSpecification(...args) {
    return this.commerce.deleteProductSpecification(...args);
  }
  async getProductSpecifications(...args) {
    return this.commerce.getProductSpecifications(...args);
  }
  async createOption(...args) {
    return this.commerce.createOption(...args);
  }
  async createOptionWithReuse(...args) {
    return this.commerce.createOptionWithReuse(...args);
  }
  async updateOptionById(...args) {
    return this.commerce.updateOptionById(...args);
  }
  async createOptionValue(...args) {
    return this.commerce.createOptionValue(...args);
  }
  async getOptionByERC(...args) {
    return this.commerce.getOptionByERC(...args);
  }
  async getOptionByKey(...args) {
    return this.commerce.getOptionByKey(...args);
  }
  async getOptionValueByERC(...args) {
    return this.commerce.getOptionValueByERC(...args);
  }
  async getOptionValueByKey(...args) {
    return this.commerce.getOptionValueByKey(...args);
  }
  async updateOptionValueById(...args) {
    return this.commerce.updateOptionValueById(...args);
  }
  async updateOptionValueByERC(...args) {
    return this.commerce.updateOptionValueByERC(...args);
  }
  async createOptionValueWithReuse(...args) {
    return this.commerce.createOptionValueWithReuse(...args);
  }
  async createOptionCategory(...args) {
    return this.commerce.createOptionCategory(...args);
  }
  async getOptionCategoryByKey(...args) {
    return this.commerce.getOptionCategoryByKey(...args);
  }
  async updateOptionCategoryById(...args) {
    return this.commerce.updateOptionCategoryById(...args);
  }
  async createOptionCategoryWithReuse(...args) {
    return this.commerce.createOptionCategoryWithReuse(...args);
  }
  async getOptionCategoryByERC(...args) {
    return this.commerce.getOptionCategoryByERC(...args);
  }
  async updateSpecificationById(...args) {
    return this.commerce.updateSpecificationById(...args);
  }
  async getSpecificationByKey(...args) {
    return this.commerce.getSpecificationByKey(...args);
  }
  async createSpecificationCategoryWithReuse(...args) {
    return this.commerce.createSpecificationCategoryWithReuse(...args);
  }
  async createTaxonomyCategory(...args) {
    return this.taxonomy.createTaxonomyCategory(...args);
  }
  async createSpecificationWithReuse(...args) {
    return this.commerce.createSpecificationWithReuse(...args);
  }
  async setBillingAndShippingAddresses(...args) {
    return this.account.setBillingAndShippingAddresses(...args);
  }

  // Resilient Resolution Utility
  async resolveByERCsWithRetry(config, ercs, resolverFn, options = {}) {
    const { logger } = this.ctx;
    const label = options.label || 'entities';
    const maxRetries = options.maxRetries || 8;
    const initialDelay = options.initialDelay || 3000;
    logger.debug(
      `Starting resolution loop for ${ercs.length} ${label} (max ${maxRetries} retries)...`,
      {
        correlationId: config.correlationId,
      }
    );
    let currentErcs = [...ercs];
    let resolvedMap = new Map();
    let attempt = 0;
    while (attempt < maxRetries && currentErcs.length > 0) {
      if (attempt > 0) {
        const delayMs = initialDelay * Math.pow(2, attempt - 1);
        logger.debug(
          `Retry ${attempt}/${maxRetries} for ${label} in ${delayMs}ms...`,
          {
            missing: currentErcs.length,
            correlationId: config.correlationId,
          }
        );
        await delay(delayMs);
      }
      try {
        const batchResults = await resolverFn(config, currentErcs);
        const resultsArray = Array.isArray(batchResults)
          ? batchResults
          : batchResults?.items || [];
        resultsArray.filter(Boolean).forEach((item) => {
          const itemErc = item.externalReferenceCode || item.erc;
          if (itemErc) {
            resolvedMap.set(itemErc, item);
          }
        });

        // Update list of missing ERCs by checking which ones are now in our map
        const previousCount = currentErcs.length;
        currentErcs = currentErcs.filter((erc) => !resolvedMap.has(erc));
        if (currentErcs.length < previousCount) {
          logger.debug(
            `Resolution progress: ${label} found ${previousCount - currentErcs.length} new items. ${currentErcs.length} remaining.`,
            {
              correlationId: config.correlationId,
            }
          );
        }
      } catch (error) {
        logger.warn(
          `Resolution attempt ${attempt} failed for ${label}: ${error.message}`,
          {
            correlationId: config.correlationId,
          }
        );
      }
      attempt++;
    }

    // FINAL HARDENING: REST Fallback for missing Accounts
    if (currentErcs.length > 0 && label === 'accounts') {
      logger.info(
        `Attempting REST fallback for ${currentErcs.length} missing accounts...`,
        {
          correlationId: config.correlationId,
        }
      );
      for (const erc of currentErcs) {
        try {
          const account = await this.rest.getAccountByERC(config, erc);
          if (account) {
            resolvedMap.set(erc, account);
          }
        } catch (_err) {
          // Ignore individual REST failures
        }
      }
      currentErcs = currentErcs.filter((erc) => !resolvedMap.has(erc));
    }
    if (currentErcs.length > 0) {
      const errorMsg = `Resolution failed to find ${currentErcs.length} / ${ercs.length} ${label} after ${maxRetries} attempts.`;
      if (options.tolerateMissing) {
        logger.warn(
          errorMsg +
            ' Tolerating missing entities and proceeding with partial results.',
          {
            missingERCs: currentErcs,
            correlationId: config.correlationId,
          }
        );
      } else {
        logger.error(errorMsg, {
          missingERCs: currentErcs,
          correlationId: config.correlationId,
        });
        throw new Error(errorMsg);
      }
    } else {
      logger.debug(`Successfully resolved all ${ercs.length} ${label}.`, {
        correlationId: config.correlationId,
      });
    }

    // Return in original order if possible, or just the values
    return Array.from(resolvedMap.values());
  }

  // Other Coordination/Logic
  async getSpecificationsByProductIds(...args) {
    return this.commerce.getSpecificationsByProductIds(...args);
  }
  async getOptionsByProductIds(...args) {
    return this.commerce.getOptionsByProductIds(...args);
  }
  async getAccountsByERC(...args) {
    return this.account.getAccountsByERC(...args);
  }
  async getProductsByERC(...args) {
    return this.commerce.getProductsByERC(...args);
  }
  async getWarehousesByERC(...args) {
    return this.commerce.getWarehousesByERC(...args);
  }
  async getPostalAddressesByERC(...args) {
    return this.account.getPostalAddressesByERC(...args);
  }
  async getSkusByERC(...args) {
    return this.commerce.getSkusByERC(...args);
  }

  // --- REST SDK Passthrough ---

  // --- Page Management (LPD-35443) APIs ---
  async getSitePages(...args) {
    return this.content.getSitePages(...args);
  }
  async createSitePage(...args) {
    return this.content.createSitePage(...args);
  }
  async getSitePage(...args) {
    return this.content.getSitePage(...args);
  }
  async updateSitePage(...args) {
    return this.content.updateSitePage(...args);
  }
  async deleteSitePage(...args) {
    return this.content.deleteSitePage(...args);
  }
  async patchSitePage(...args) {
    return this.content.patchSitePage(...args);
  }

  // --- Page Template Management APIs ---
  async getPageTemplates(...args) {
    return this.content.getPageTemplates(...args);
  }
  async createPageTemplate(...args) {
    return this.content.createPageTemplate(...args);
  }
  async getPageTemplate(...args) {
    return this.content.getPageTemplate(...args);
  }
  async updatePageTemplate(...args) {
    return this.content.updatePageTemplate(...args);
  }
  async deletePageTemplate(...args) {
    return this.content.deletePageTemplate(...args);
  }
  async patchPageTemplate(...args) {
    return this.content.patchPageTemplate(...args);
  }

  // --- Page Template Set Management APIs ---
  async getPageTemplateSets(...args) {
    return this.content.getPageTemplateSets(...args);
  }
  async createPageTemplateSet(...args) {
    return this.content.createPageTemplateSet(...args);
  }
  async getPageTemplateSet(...args) {
    return this.content.getPageTemplateSet(...args);
  }
  async updatePageTemplateSet(...args) {
    return this.content.updatePageTemplateSet(...args);
  }
  async deletePageTemplateSet(...args) {
    return this.content.deletePageTemplateSet(...args);
  }
  async patchPageTemplateSet(...args) {
    return this.content.patchPageTemplateSet(...args);
  }
  async getWarehouseItemsByWarehouseId(...args) {
    return this.commerce.getWarehouseItemsByWarehouseId(...args);
  }
  async getPriceEntries(...args) {
    return this.pricing.getPriceEntries(...args);
  }
  async createWebContentStructure(...args) {
    return this.content.createWebContentStructure(...args);
  }
  async getContentStructure(...args) {
    return this.content.getContentStructure(...args);
  }
  async getSiteContentStructures(...args) {
    return this.content.getSiteContentStructures(...args);
  }
}
module.exports = {
  LiferayService,
};
