
const { asItems, asCount } = require("../../utils/liferayUtils.cjs");
const { delay, fromI18n } = require('../../utils/misc.cjs');
const { PATH } = require('../../utils/liferayPaths.cjs');
class CommerceService {
  constructor(liferay) {
    this.liferay = liferay;
  }

  async getCatalogAdapter(config) {
    return await this.liferay.catalogAdapterFactory.getAdapter(
      this.liferay.rest,
      config
    );
  }

  // --- Discovery Methods (Standardized Entry Points with Exclusions) ---

  async getProductsWithSkus(config, { catalogId, pageSize = 200 } = {}) {
    // 1. Fetch all products
    const { items: products } = await this.liferay.getProducts(config, {
      catalogId,
      pageSize,
    });

    // 2. Fetch all SKUs globally from SQL to ensure real-time consistency
    let allSkus = [];
    try {
      const res = await this.liferay.rest._get(
        config,
        PATH.SKUS,
        'get-skus-bulk',
        'Get SKUs Bulk',
        {
          params: {
            pageSize: 250,
          },
        }
      );
      allSkus = asItems(res);
    } catch (err) {
      this.liferay.ctx.logger.warn(
        `Failed to fetch SKUs globally: ${err.message}`
      );
    }

    // 3. Map SKUs by productId in memory
    const skusByProductId = new Map();
    for (const s of allSkus) {
      const pId = s.productId || s.product?.id;
      if (pId) {
        if (!skusByProductId.has(pId)) {
          skusByProductId.set(pId, []);
        }
        skusByProductId.get(pId).push({
          sku: s.sku,
          purchasable: s.purchasable,
          price: s.price,
          externalReferenceCode: s.externalReferenceCode,
        });
      }
    }

    // 4. Associate SKUs to products
    const items = products.map((p) => {
      const targetId = p.productId || p.id;
      return {
        ...p,
        skus: skusByProductId.get(targetId) || [],
      };
    });
    return {
      items,
      totalCount: items.length,
    };
  }

  async getProducts(
    config,
    {
      catalogId,
      pageSize = 200,
      fields = 'productId,externalReferenceCode,name',
      filter: providedFilter,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(config, 'product');

    // HARDENING: Liferay's /products API throws 404 if no catalogId is provided.
    // If we want a "Global" search, we MUST iterate through all catalogs.
    if (!catalogId && !providedFilter?.includes('catalogId')) {
      this.liferay.ctx.logger.info(
        'Performing multi-catalog product discovery sweep...'
      );
      const allCatalogs = await this.liferay.getCatalogs(config);
      const allItems = [];
      for (const cat of allCatalogs) {
        try {
          const { items } = await this.liferay.getProducts(config, {
            catalogId: cat.id,
            pageSize,
            fields,
          });
          allItems.push(...items);
        } catch (err) {
          this.liferay.ctx.logger.warn(
            `Skipping products for catalog ${cat.id}: ${err.message}`
          );
        }
      }

      // Deduplicate and filter in memory
      const filteredItems = [
        ...new Map(allItems.map((i) => [i.productId || i.id, i])).values(),
      ].filter((it) => !this.liferay._shouldExclude(it, exclusions));
      return {
        items: filteredItems,
        totalCount: filteredItems.length,
      };
    }

    // Standard single-catalog fetch
    const filters = [];
    if (catalogId) filters.push(`catalogId eq ${catalogId}`);
    if (providedFilter) filters.push(providedFilter);
    const filter = filters.length > 0 ? filters.join(' and ') : null;
    const adapter = await this.liferay.getCatalogAdapter(config);
    const { items } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) => adapter.getProductsRaw(cfg, filter, p, size, fields)
    );
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getOptionCategories(
    config,
    {
      page: _page = 1,
      pageSize: _pageSize = 200,
      fields: _fields = 'id',
      filter: providedFilter,
      ercPrefix,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(
      config,
      'optionCategory'
    );
    const filters = [];
    if (providedFilter) filters.push(providedFilter);

    // REMOVAL: Do not use OData for name exclusions (unreliable)
    const filter = filters.length > 0 ? filters.join(' and ') : null;
    const { items: allItems } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.OPTION_CATEGORIES,
          'get-option-categories-bulk',
          'Get Option Categories Bulk',
          {
            params: {
              filter,
              page: p,
              pageSize: size,
            },
          }
        )
    );
    let items = allItems;

    // Apply prefix filter in JS memory
    if (ercPrefix) {
      items = items.filter(
        (it) =>
          it.externalReferenceCode &&
          it.externalReferenceCode.startsWith(ercPrefix)
      );
    }

    // HARDENING: Perform all exclusions in JS memory
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getSpecifications(
    config,
    {
      page: _page = 1,
      pageSize: _pageSize = 200,
      fields: _fields = 'id',
      filter: providedFilter,
      ercPrefix,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(
      config,
      'specification'
    );
    const filters = [];
    if (providedFilter) filters.push(providedFilter);

    // REMOVAL: Do not use OData for name exclusions (unreliable)
    const filter = filters.length > 0 ? filters.join(' and ') : null;
    const { items: allItems } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.SPECIFICATIONS,
          'get-specifications-bulk',
          'Get Specifications Bulk',
          {
            params: {
              filter,
              page: p,
              pageSize: size,
            },
          }
        )
    );
    let items = allItems;

    // Apply prefix filter in JS memory
    if (ercPrefix) {
      items = items.filter(
        (it) =>
          it.externalReferenceCode &&
          it.externalReferenceCode.startsWith(ercPrefix)
      );
    }

    // HARDENING: Perform all exclusions in JS memory
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getOptions(
    config,
    {
      page: _page = 1,
      pageSize: _pageSize = 200,
      fields: _fields = 'id',
      filter: providedFilter,
      ercPrefix,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(config, 'option');
    const filters = [];
    if (providedFilter) filters.push(providedFilter);

    // REMOVAL: Do not use OData for name exclusions (unreliable)
    const filter = filters.length > 0 ? filters.join(' and ') : null;
    const { items: allItems } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.OPTIONS,
          'get-options-bulk',
          'Get Options Bulk',
          {
            params: {
              filter,
              page: p,
              pageSize: size,
            },
          }
        )
    );
    let items = allItems;

    // Apply prefix filter in JS memory
    if (ercPrefix) {
      items = items.filter(
        (it) =>
          it.externalReferenceCode &&
          it.externalReferenceCode.startsWith(ercPrefix)
      );
    }

    // HARDENING: Perform all exclusions in JS memory
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getWarehouses(
    config,
    {
      pageSize: _pageSize = 200,
      fields: _fields = 'id,externalReferenceCode,name',
      filter: providedFilter,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(config, 'warehouse');
    const filters = [];
    if (providedFilter) filters.push(providedFilter);

    // REMOVAL: Do not use OData for name exclusions (unreliable)
    const filter = filters.length > 0 ? filters.join(' and ') : null;

    // Brute force discovery
    const { items } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.WAREHOUSES,
          'get-warehouses-bulk',
          'Get Warehouses Bulk',
          {
            params: {
              filter,
              page: p,
              pageSize: size,
            },
          }
        )
    );

    // HARDENING: Perform all exclusions in JS memory
    const filteredItems = items.filter(
      (it) => !this.liferay._shouldExclude(it, exclusions)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getAllWarehouseItems(
    config,
    { pageSize = 200, fields = 'id', filter } = {}
  ) {
    const warehouses = await this.liferay.getWarehouses(config, {
      pageSize: 1000,
    });
    const allItems = [];
    let totalCount = 0;

    // Standardize requested fields for GraphQL
    const requestedFields = new Set([
      'id',
      'externalReferenceCode',
      'sku',
      'quantity',
    ]);
    if (fields) {
      fields.split(',').forEach((f) => requestedFields.add(f.trim()));
    }
    const filters = [];
    if (filter) filters.push(filter);
    const combinedFilter = filters.length > 0 ? filters.join(' and ') : null;
    for (const warehouse of warehouses.items) {
      try {
        const res = await this.liferay.graphql.getWarehouseItems(
          config,
          warehouse.id,
          combinedFilter,
          Array.from(requestedFields),
          {
            page: 1,
            pageSize,
          }
        );
        let items = asItems(res);
        allItems.push(...items);
        totalCount += res.totalCount || items.length;
      } catch (err) {
        this.liferay.ctx.logger.warn(
          `Failed to list warehouse items via GraphQL for ${warehouse.id}`,
          {
            error: err.message,
          }
        );
      }
      if (allItems.length >= pageSize) break;
    }
    return {
      items: allItems,
      totalCount,
    };
  }

  async deleteProductsBatch(
    config,
    {
      catalogId,
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return this.liferay.deleteByFilter(config, {
      entityName: 'product',
      filter: filter || (catalogId ? `catalogId eq ${catalogId}` : undefined),
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: adapter.paths.PATH.PRODUCTS_BATCH,
      basePath: adapter.paths.PATH.PRODUCTS,
      listUrl: adapter.paths.PATH.PRODUCTS,
      op: 'products:batch-delete',
      friendly: 'Delete products (batch)',
      items,
      catalogId,
    });
  }

  async deleteWarehousesBatch(
    config,
    {
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'warehouse',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      basePath: PATH.WAREHOUSES,
      listUrl: PATH.WAREHOUSES,
      op: 'warehouses:batch-delete',
      friendly: 'Delete warehouses (batch)',
      items,
      concurrency: 1,
    });
  }

  async deleteWarehouseItemsBatch(
    config,
    {
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    const listUrl = PATH.WAREHOUSE_INVENTORIES_DELETE_BATCH('')
      .split('?')[0]
      .replace('/batch', '');
    return this.liferay.deleteByFilter(config, {
      entityName: 'warehouseItem',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.WAREHOUSE_INVENTORIES_DELETE_BATCH,
      basePath: listUrl,
      listUrl: listUrl,
      op: 'inventory:batch-delete',
      friendly: 'Delete inventory items (batch)',
      items,
    });
  }

  async deleteSpecificationsBatch(
    config,
    {
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'specification',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.SPECIFICATIONS_BATCH,
      basePath: PATH.SPECIFICATIONS,
      listUrl: PATH.SPECIFICATIONS,
      op: 'specifications:batch-delete',
      friendly: 'Delete specifications (batch)',
      items,
    });
  }

  async deleteOptionsBatch(
    config,
    {
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'option',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.OPTIONS_BATCH,
      basePath: PATH.OPTIONS,
      listUrl: PATH.OPTIONS,
      op: 'options:batch-delete',
      friendly: 'Delete options (batch)',
      items,
    });
  }

  async deleteOptionCategoriesBatch(
    config,
    {
      pageSize = 200,
      filter,
      ids,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'optionCategory',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.OPTION_CATEGORIES_BATCH,
      basePath: PATH.OPTION_CATEGORIES,
      listUrl: PATH.OPTION_CATEGORIES,
      op: 'optionCategories:batch-delete',
      friendly: 'Delete option categories (batch)',
      items,
    });
  }

  // --- Exclusion Helpers ---

  async getCatalogs(config) {
    const res = await this.liferay.rest._get(
      config,
      PATH.CATALOGS,
      'get-catalogs-bulk',
      'Get Catalogs Bulk',
      {
        params: {
          page: 1,
          pageSize: 100,
        },
      }
    );
    const items = asItems(res);
    return items.map((item) => ({
      ...item,
      name: fromI18n(item.name),
    }));
  }

  async getCatalog(config, catalogId) {
    return this.liferay.rest.getCatalog(config, catalogId);
  }

  async patchCatalog(config, catalogId, catalogData) {
    return this.liferay.rest.patchCatalog(config, catalogId, catalogData);
  }

  async getChannels(config) {
    const res = await this.liferay.rest._get(
      config,
      PATH.CHANNELS,
      'get-channels-bulk',
      'Get Channels Bulk',
      {
        params: {
          page: 1,
          pageSize: 100,
        },
      }
    );
    let items = asItems(res);
    // Self-Healing: If there are no active Commerce Channels, auto-scaffold a Guest Web Store Channel
    let siteGroupId = parseInt(config.siteGroupId, 10);
    if (!siteGroupId || isNaN(siteGroupId)) {
      try {
        const sitesRes = await this.liferay.rest._get(
          config,
          '/o/headless-admin-site/v1.0/sites',
          'get-sites'
        );
        const sites = asItems(sitesRes);
        if (sites && sites.length > 0) {
          const guestSite = sites.find(
            (s) =>
              s.friendlyUrlPath === '/guest' ||
              s.name?.toLowerCase() === 'guest'
          );
          const targetSite = guestSite || sites[0];
          siteGroupId = parseInt(targetSite.id, 10);
          config.siteGroupId = siteGroupId;
          this.liferay.ctx.logger.info(
            `Resolved fallback siteGroupId from Liferay: ${siteGroupId} (${targetSite.name})`
          );
        }
      } catch (err) {
        this.liferay.ctx.logger.warn(
          `Failed to resolve fallback siteGroupId from Liferay (handled): ${err.message}`
        );
      }
    }
    if (items.length === 0 && siteGroupId > 0) {
      this.liferay.ctx.logger.info(
        `No active Commerce channels discovered. Auto-scaffolding a Guest Web Store Channel...`,
        {
          siteGroupId,
        }
      );
      try {
        const newChannel = await this.liferay.rest._post(
          config,
          PATH.CHANNELS,
          {
            name: 'Web Store',
            type: 'site',
            siteGroupId: siteGroupId,
            currencyCode: config.currencyCode || 'USD',
            externalReferenceCode: `AICA-CH-GUEST-STORE-${siteGroupId}`,
          },
          'create-channel',
          'Failed to auto-scaffold Guest Web Store Channel'
        );
        if (newChannel) {
          items.push(newChannel);
        }
      } catch (err) {
        this.liferay.ctx.logger.warn(
          `Self-healing Commerce Channel creation failed (handled): ${err.message}`
        );
      }
    }
    return items.map((item) => ({
      ...item,
      name: fromI18n(item.name),
    }));
  }

  async createChannel(config, channelData) {
    return this.liferay.rest.createChannel(config, channelData);
  }

  createWarehouse(config, warehouseData) {
    return this.liferay.rest.createWarehouse(config, warehouseData);
  }

  createWarehousesBatch(config, warehousesData, opts) {
    return this.liferay.rest.createWarehousesBatch(
      config,
      warehousesData,
      opts
    );
  }

  createWarehouseItemsBatch(config, itemsData, opts) {
    return this.liferay.rest.createWarehouseItemsBatch(config, itemsData, opts);
  }

  createWarehouseChannelsBatch(config, itemsData, opts) {
    return this.liferay.rest.createWarehouseChannelsBatch(
      config,
      itemsData,
      opts
    );
  }

  createWarehouseChannel(config, warehouseId, channelId) {
    return this.liferay.rest.createWarehouseChannel(
      config,
      warehouseId,
      channelId
    );
  }

  deleteWarehouse(config, warehouseId) {
    return this.liferay.rest.deleteWarehouse(config, warehouseId);
  }

  updateProductInventory(config, warehouseId, sku, inventoryData) {
    return this.liferay.rest.updateProductInventory(
      config,
      warehouseId,
      sku,
      inventoryData
    );
  }

  updateInventory(config, warehouseId, sku, inventoryData) {
    return this.liferay.updateProductInventory(
      config,
      warehouseId,
      sku,
      inventoryData
    );
  }

  createProduct(config, productData) {
    return this.liferay.rest.createProduct(config, productData);
  }

  async createProductsBatch(config, productsData, opts) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.createProductsBatch(config, productsData, opts);
  }

  async createProductSkusBatch(config, skusData, opts) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.createProductSkusBatch(config, skusData, opts);
  }

  createSpecificationsBatch(config, specificationsData, opts) {
    return this.liferay.rest.createSpecificationsBatch(
      config,
      specificationsData,
      opts
    );
  }

  createOptionsBatch(config, optionsData, opts) {
    return this.liferay.rest.createOptionsBatch(config, optionsData, opts);
  }

  async createProductSku(config, productId, skuData) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.createProductSku(config, productId, skuData);
  }

  addProductImage(config, productId, image) {
    return this.liferay.rest.addProductImage(config, productId, image);
  }

  addProductDocumentAttachment(config, productId, attachment) {
    return this.liferay.rest.addProductDocumentAttachment(
      config,
      productId,
      attachment
    );
  }

  addProductImageByBase64(config, productERC, image) {
    return this.liferay.rest.addProductImageByBase64(config, productERC, image);
  }

  addProductDocumentAttachmentByBase64(config, productERC, attachment) {
    return this.liferay.rest.addProductDocumentAttachmentByBase64(
      config,
      productERC,
      attachment
    );
  }

  addProductImageMultipart(config, productId, data) {
    return this.liferay.rest.addProductImageMultipart(config, productId, data);
  }

  addProductDocumentAttachmentMultipart(config, productId, data) {
    return this.liferay.rest.addProductDocumentAttachmentMultipart(
      config,
      productId,
      data
    );
  }

  addProductImageDocumentLibrary(config, productId, data) {
    return this.liferay.rest.addProductImageDocumentLibrary(
      config,
      productId,
      data
    );
  }

  addProductDocumentAttachmentDocumentLibrary(config, productId, data) {
    return this.liferay.rest.addProductDocumentAttachmentDocumentLibrary(
      config,
      productId,
      data
    );
  }

  async addProductOptions(config, productId, productOptions, productERC) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.addProductOptions(
      config,
      productId,
      productOptions,
      productERC
    );
  }

  async deleteProductOption(config, productId, productOptionId) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.deleteProductOption(config, productId, productOptionId);
  }

  addProductChannels(config, productId, channelIds, productERC) {
    return this.liferay.rest.addProductChannels(
      config,
      productId,
      channelIds,
      productERC
    );
  }

  addWarehouseChannel(config, warehouseId, channelId) {
    return this.liferay.rest.addWarehouseChannel(
      config,
      warehouseId,
      channelId
    );
  }

  async getProductOptions(config, productId) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.getProductOptions(config, productId);
  }

  async deleteProductSpecification(config, productId, productSpecificationId) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.deleteProductSpecification(
      config,
      productId,
      productSpecificationId
    );
  }

  async getProductSpecifications(config, productId) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.getProductSpecifications(config, productId);
  }

  createOption(config, optionData) {
    return this.liferay.rest.createOption(config, optionData);
  }

  createOptionWithReuse(config, optionData) {
    return this.liferay.rest.createOptionWithReuse(config, optionData);
  }

  updateOptionById(config, id, payload) {
    return this.liferay.rest.updateOptionById(config, id, payload);
  }

  createOptionValue(config, optionId, optionValueData) {
    return this.liferay.rest.createOptionValue(
      config,
      optionId,
      optionValueData
    );
  }

  getOptionByERC(config, externalReferenceCode) {
    return this.liferay.rest.getOptionByERC(config, externalReferenceCode);
  }

  getOptionByKey(config, key) {
    return this.liferay.rest.getOptionByKey(config, key);
  }

  getOptionValueByERC(config, optionId, externalReferenceCode) {
    return this.liferay.rest.getOptionValueByERC(
      config,
      optionId,
      externalReferenceCode
    );
  }

  getOptionValueByKey(config, optionId, key) {
    return this.liferay.rest.getOptionValueByKey(config, optionId, key);
  }

  updateOptionValueById(config, optionId, valueId, payload) {
    return this.liferay.rest.updateOptionValueById(
      config,
      optionId,
      valueId,
      payload
    );
  }

  updateOptionValueByERC(config, optionId, externalReferenceCode, payload) {
    return this.liferay.rest.updateOptionValueByERC(
      config,
      optionId,
      externalReferenceCode,
      payload
    );
  }

  createOptionValueWithReuse(config, optionId, payload) {
    return this.liferay.rest.createOptionValueWithReuse(
      config,
      optionId,
      payload
    );
  }

  createOptionCategory(config, optionCategoryData) {
    return this.liferay.rest.createOptionCategory(config, optionCategoryData);
  }

  getOptionCategoryByKey(config, key) {
    return this.liferay.rest.getOptionCategoryByKey(config, key);
  }

  updateOptionCategoryById(config, id, payload) {
    return this.liferay.rest.updateOptionCategoryById(config, id, payload);
  }

  createOptionCategoryWithReuse(config, payload) {
    return this.liferay.rest.createOptionCategoryWithReuse(config, payload);
  }

  getOptionCategoryByERC(config, externalReferenceCode) {
    return this.liferay.rest.getOptionCategoryByERC(
      config,
      externalReferenceCode
    );
  }

  updateSpecificationById(config, id, payload) {
    return this.liferay.rest.updateSpecificationById(config, id, payload);
  }

  getSpecificationByKey(config, key) {
    return this.liferay.rest.getSpecificationByKey(config, key);
  }

  createSpecificationCategoryWithReuse(config, payload) {
    return this.liferay.rest.createSpecificationCategoryWithReuse(
      config,
      payload
    );
  }

  createSpecificationWithReuse(config, payload) {
    return this.liferay.rest.createSpecificationWithReuse(config, payload);
  }

  // Other Coordination/Logic
  getSpecificationsByProductIds(config, productIds, fields) {
    return this.liferay.graphql.getSpecificationsByProductIds(
      config,
      productIds,
      fields
    );
  }

  getOptionsByProductIds(config, productIds, fields) {
    return this.liferay.graphql.getOptionsByProductIds(
      config,
      productIds,
      fields
    );
  }

  async getProductsByERC(config, ercs, fields) {
    try {
      const results = await this.liferay.graphql.getProductsByERC(
        config,
        ercs,
        fields
      );
      if (results && results.length > 0) return results;
      throw new Error('GraphQL returned empty results');
    } catch (error) {
      this.liferay.ctx.logger.warn(
        `GraphQL product resolution failed, falling back to REST: ${error.message}`
      );
      const res = await this.liferay.getProducts(config, {
        pageSize: 500,
      });
      const items = res.items || [];
      return items.filter((p) => ercs.includes(p.externalReferenceCode));
    }
  }

  async getWarehousesByERC(config, ercs, fields) {
    try {
      const results = await this.liferay.graphql.getWarehousesByERC(
        config,
        ercs,
        fields
      );
      if (results && results.length > 0) return results;
      throw new Error('GraphQL returned empty results');
    } catch (error) {
      this.liferay.ctx.logger.warn(
        `GraphQL warehouse resolution failed, falling back to REST: ${error.message}`
      );
      const res = await this.liferay.getWarehouses(config, {
        pageSize: 500,
      });
      const items = res.items || [];
      return items.filter((w) => ercs.includes(w.externalReferenceCode));
    }
  }

  async getSkusByERC(config, ercs, fields) {
    const adapter = await this.liferay.getCatalogAdapter(config);
    return adapter.getSkusByERC(config, ercs, fields);
  }

  // --- REST SDK Passthrough ---

  // --- Page Management (LPD-35443) APIs ---

  getWarehouseItemsByWarehouseId(config, warehouseId, opts) {
    return this.liferay.rest.getWarehouseItems(config, warehouseId, opts);
  }
}
module.exports = CommerceService;
