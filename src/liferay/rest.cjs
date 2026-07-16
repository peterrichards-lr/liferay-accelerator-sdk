const {
  resolveEffectiveLiferayConnection,
} = require('../utils/liferayEnv.cjs');
const fs = require('fs');
const { tmpdir } = require('os');
const path = require('path');
const StreamZip = require('node-stream-zip');
const { logger } = require('../utils/logger.cjs');
const crypto = require('crypto');

const { PATH, CUSTOM_OBJECTS, q } = require('../utils/liferayPaths.cjs');
const { ASSET_TYPE } = require('../utils/liferayPermissions.cjs');
const { ERC_PREFIX, ENV } = require('../utils/constants.cjs');
const { delay, createERC } = require('../utils/misc.cjs');
const { sanitizedERC } = require('../utils/normalize.cjs');
const { ErrorHandler } = require('../utils/expressErrorHandler.cjs');
const { parse } = require('csv-parse/sync');

const { getBatchCacheTTLms } = require('../utils/ttl.cjs');
const { COMMERCE_CONSTRAINTS } = require('../utils/commerceConstants.cjs');
const { asItems, asCount } = require('../utils/liferayUtils.cjs');

const HttpCoreService = require('./rest/HttpCoreService.cjs');
const BatchOperationService = require('./rest/BatchOperationService.cjs');
const BatchDeleteService = require('./rest/BatchDeleteService.cjs');
const MultipartService = require('./rest/MultipartService.cjs');
const { SOFT_STATUS_BY_OP } = require('./rest/config.cjs');

class LiferayRestService {
  constructor(ctx) {
    this.ctx = ctx;
    this.httpCore = new HttpCoreService(ctx);
    this.batch = new BatchOperationService(ctx);
    this.batchDelete = new BatchDeleteService(ctx);
    this.multipart = new MultipartService(ctx);
  }
  _get(...args) {
    return this.httpCore._get(...args);
  }
  _post(...args) {
    return this.httpCore._post(...args);
  }
  _put(...args) {
    return this.httpCore._put(...args);
  }
  _patch(...args) {
    return this.httpCore._patch(...args);
  }
  _delete(...args) {
    return this.httpCore._delete(...args);
  }
  _request(...args) {
    return this.httpCore._request(...args);
  }
  _downloadFile(...args) {
    return this.httpCore._downloadFile(...args);
  }

  _postBatch(...args) {
    return this.batch._postBatch(...args);
  }
  _collectPagedItems(...args) {
    return this.batch._collectPagedItems(...args);
  }
  _collectPagedIds(...args) {
    return this.batch._collectPagedIds(...args);
  }

  _deleteBatchNative(...args) {
    return this.batchDelete._deleteBatchNative(...args);
  }
  _deleteByBatch(...args) {
    return this.batchDelete._deleteByBatch(...args);
  }
  _deleteByIds(...args) {
    return this.batchDelete._deleteByIds(...args);
  }
  _deleteBatchSimulated(...args) {
    return this.batchDelete._deleteBatchSimulated(...args);
  }

  _postMultipart(...args) {
    return this.multipart._postMultipart(...args);
  }
  addProductImageMultipart(...args) {
    return this.multipart.addProductImageMultipart(...args);
  }
  addProductDocumentAttachmentMultipart(...args) {
    return this.multipart.addProductDocumentAttachmentMultipart(...args);
  }

  createAxiosInstance(...args) {
    return this.httpCore.createAxiosInstance(...args);
  }
  testConnection(...args) {
    return this.httpCore.testConnection(...args);
  }

  addProductImage(...args) {
    return this.multipart.addProductImage(...args);
  }
  addProductDocumentAttachment(...args) {
    return this.multipart.addProductDocumentAttachment(...args);
  }
  addProductImageByBase64(...args) {
    return this.multipart.addProductImageByBase64(...args);
  }
  addProductDocumentAttachmentByBase64(...args) {
    return this.multipart.addProductDocumentAttachmentByBase64(...args);
  }
  addProductImageDocumentLibrary(...args) {
    return this.multipart.addProductImageDocumentLibrary(...args);
  }
  addProductDocumentAttachmentDocumentLibrary(...args) {
    return this.multipart.addProductDocumentAttachmentDocumentLibrary(...args);
  }

  _stringifySafe(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return '[Unserializable object]';
    }
  }

  _getBaseCallbackUrl(config, session = null) {
    if (process.env.LIFERAY_BATCH_CALLBACK_URL) {
      return process.env.LIFERAY_BATCH_CALLBACK_URL;
    }

    const url =
      config?.microserviceUrl ||
      session?.context?.config?.microserviceUrl ||
      session?.context?.microserviceUrl ||
      session?.context?.microserviceURL ||
      ENV.MICROSERVICE_URL;

    if (!url) {
      const loggerToUse = this.ctx?.logger || logger;
      loggerToUse.warn(
        'microserviceUrl is not configured. Callbacks will likely fail.',
        {
          correlationId: config?.correlationId || session?.correlationId,
          hasConfig: !!config,
          hasSession: !!session,
          contextKeys: session?.context ? Object.keys(session.context) : [],
        }
      );
      return null;
    }
    return `${url}/api/v1/batch/callback`;
  }

  _buildCallbackURL(baseUrl, meta = {}) {
    if (!baseUrl) return null;
    try {
      const u = new URL(baseUrl);
      const batchERC = meta.batchExternalReferenceCode || meta.batchERC;
      if (batchERC) {
        u.searchParams.set('batchERC', String(batchERC));
      }
      return u.toString();
    } catch {
      return baseUrl;
    }
  }

  _buildSoftFallback(op, status) {
    return {
      items: [],
      page: 1,
      pageSize: 0,
      lastPage: 1,
      totalCount: 0,
      status,
      softEmpty: true,
      op,
    };
  }

  async *iteratePages(config, urlOrFetcher, op, friendly, opts = {}) {
    let page = 1;
    const pageSize = opts.pageSize || 200;
    let hasMore = true;

    while (hasMore) {
      let res;
      if (typeof urlOrFetcher === 'function') {
        res = await urlOrFetcher(config, page, pageSize);
      } else {
        const pageOpts = {
          ...opts,
          params: {
            ...opts.params,
            page,
            pageSize,
          },
        };
        res = await this.httpCore._get(
          config,
          urlOrFetcher,
          op,
          friendly,
          pageOpts
        );
      }

      yield res;

      const items = asItems(res);
      if (items.length < pageSize || items.length === 0) {
        hasMore = false;
      } else {
        page++;
      }
    }
  }

  _normalizePermissionItems(items = []) {
    const map = new Map();
    for (const { roleName, actionIds } of items) {
      map.set(roleName, new Set(actionIds || []));
    }
    return map;
  }

  _denormalizePermissionMap(map) {
    const items = [];
    for (const [roleName, set] of map.entries()) {
      items.push({ roleName, actionIds: Array.from(set).sort() });
    }
    items.sort((a, b) => a.roleName.localeCompare(b.roleName));
    return items;
  }

  _mergePermissionsItems(existing = [], proposed = [], opts = {}) {
    const { strategy = 'union', remove = {} } = opts;
    const existingMap = this._normalizePermissionItems(existing);
    const proposedMap = this._normalizePermissionItems(proposed);
    const allRoles = new Set([...existingMap.keys(), ...proposedMap.keys()]);
    const out = new Map();

    for (const role of allRoles) {
      const cur = new Set(existingMap.get(role) || []);
      const next = new Set(proposedMap.get(role) || []);
      let merged;

      if (strategy === 'replace' || strategy === 'replaceSelected') {
        merged = proposedMap.has(role) ? next : cur;
      } else {
        merged = new Set([...cur, ...next]);
      }

      for (const r of remove[role] || []) merged.delete(r);
      out.set(role, merged);
    }

    return this._denormalizePermissionMap(out);
  }

  _permissionsOps(assetType) {
    switch (assetType) {
      case ASSET_TYPE.DOCUMENT_FOLDER:
        return {
          getPath: (id) => PATH.DOCUMENT_FOLDER_PERMISSIONS(id),
          putPath: (id) => PATH.DOCUMENT_FOLDER_PERMISSIONS(id),
        };
      case ASSET_TYPE.DOCUMENT:
        return {
          getPath: (id) => PATH.DOCUMENT_PERMISSIONS(id),
          putPath: (id) => PATH.DOCUMENT_PERMISSIONS(id),
        };
      default:
        throw new Error(`Unsupported assetType: ${assetType}`);
    }
  }

  async _getPermissions(config, assetType, id) {
    const ops = this._permissionsOps(assetType);
    const data = await this.httpCore._get(
      config,
      ops.getPath(id),
      `get-permissions:${assetType}`
    );
    return asItems(data);
  }

  async _putPermissions(config, assetType, id, items) {
    if (!Array.isArray(items)) {
      throw new TypeError('_putPermissions: items must be an array');
    }
    const payload = items.map((it) => ({
      roleName: it?.roleName,
      actionIds: Array.isArray(it?.actionIds) ? it.actionIds.slice() : [],
    }));
    const ops = this._permissionsOps(assetType);
    return this.httpCore._put(
      config,
      ops.putPath(id),
      payload,
      `put-permissions:${assetType}`
    );
  }

  async updateConfig(config, configKey, configValue) {
    const erc = String(configKey || '').toUpperCase();
    const existing = await this.getConfig(config, configKey);

    const payload = {
      configKey,
      configValue: configValue || '',
      externalReferenceCode: erc,
    };

    if (existing?.items?.length) {
      const id = existing.items[0].id;
      return await this.httpCore._patch(
        config,
        `${PATH.CUSTOM_OBJECT(CUSTOM_OBJECTS.AICA_CONFIGS)}/${id}`,
        payload,
        `update-config:${configKey}`
      );
    } else {
      return await this.httpCore._post(
        config,
        PATH.CUSTOM_OBJECT(CUSTOM_OBJECTS.AICA_CONFIGS),
        payload,
        `create-config:${configKey}`
      );
    }
  }

  async getRegions(config, countryId) {
    const data = await this.httpCore._get(
      config,
      PATH.COUNTRY_REGIONS(countryId),
      `get-regions:${countryId}`
    );
    return asItems(data);
  }

  async getCatalogs(config) {
    const data = await this.httpCore._get(
      config,
      PATH.CATALOGS,
      'get-catalogs'
    );
    return asItems(data);
  }

  async getCatalog(config, catalogId) {
    const data = await this.httpCore._get(
      config,
      PATH.CATALOG(catalogId),
      'get-catalog'
    );
    return data;
  }

  async patchCatalog(config, catalogId, data) {
    return await this.httpCore._patch(
      config,
      PATH.CATALOG(catalogId),
      data,
      'patch-catalog',
      'Failed to update catalog configuration'
    );
  }

  async getChannels(config) {
    const data = await this.httpCore._get(
      config,
      PATH.CHANNELS,
      'get-channels'
    );
    return asItems(data);
  }

  async createChannel(config, channelData) {
    return await this.httpCore._post(
      config,
      PATH.CHANNELS,
      channelData,
      'create-channel',
      'Failed to create default commerce channel'
    );
  }

  async getLanguages(config, siteGroupId) {
    if (!siteGroupId) {
      throw new Error('siteGroupId is required for getLanguages');
    }
    const url = PATH.SITE_LANGUAGES(siteGroupId);
    const data = await this.httpCore._get(
      config,
      url,
      'get-languages',
      'Failed to get site languages'
    );
    return asItems(data);
  }

  async getProductCount(config) {
    let url =
      PATH.PRODUCTS +
      (config.catalogId ? `?filter=catalogId eq ${config.catalogId}` : '');
    const data = await this.httpCore._get(config, url, 'get-products');
    return asCount(data);
  }

  async getPrimaryAccountId(config) {
    try {
      const me = await this.httpCore._get(
        config,
        PATH.ME,
        'get-primary-account-id'
      );
      if (me && typeof me.defaultAccountId === 'number') {
        return me.defaultAccountId;
      }
      if (Array.isArray(me?.accountBriefs) && me.accountBriefs.length > 0) {
        const first = me.accountBriefs[0];
        if (first && typeof first.id === 'number') {
          return first.id;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  async getAccountCount(config) {
    const data = await this.httpCore._get(
      config,
      PATH.ACCOUNTS,
      'get-accounts'
    );
    return asCount(data);
  }

  async getImportTask(config, batchId) {
    let attempts = 0;
    const maxAttempts = 3;
    const backoff = 1000;

    while (attempts < maxAttempts) {
      try {
        const result = await this.httpCore._get(
          config,
          PATH.IMPORT_TASK(batchId),
          'import-task',
          'Failed to get import task'
        );

        if (result?.softEmpty) {
          const loggerToUse = this.ctx?.logger || logger;
          loggerToUse?.warn(
            `Batch ${batchId} returned 404 from batch engine (soft fallback). Assuming completed to prevent orchestrator deadlock.`
          );
          return {
            executeStatus: 'COMPLETED',
            totalItemsCount: 1,
            processedItemsCount: 1,
          };
        }

        return result;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts || error.status !== 400) {
          if (
            error.status === 404 ||
            error.message?.includes('404') ||
            error.response?.status === 404 ||
            error.problem?.status === 'NOT_FOUND'
          ) {
            const loggerToUse = this.ctx?.logger || logger;
            loggerToUse?.warn(
              `Batch ${batchId} returned 404 from batch engine. Assuming completed to prevent orchestrator deadlock.`
            );
            return {
              executeStatus: 'COMPLETED',
              totalItemsCount: 1,
              processedItemsCount: 1,
            };
          }
          throw error;
        }
        logger.warn(
          `Intermittent 400 error getting import task ${batchId}. Retrying ${attempts}/${maxAttempts}...`,
          {
            correlationId: config?.correlationId,
            error: error.message,
          }
        );
        await delay(backoff * attempts);
      }
    }
  }

  async getImportTaskSubmittedContent(config, batchId) {
    const urlResponse = await this.httpCore._get(
      config,
      PATH.IMPORT_TASK_SUBMITTED_CONTENT(batchId),
      'import-task-submitted-content',
      'Failed to get import task submitted content',
      { headers: { Accept: '*/*' } }
    );

    logger.info('Received urlResponse from getImportTaskSubmittedContent', {
      batchId,
      urlResponse: JSON.stringify(urlResponse, null, 2),
    });

    if (urlResponse && urlResponse.url) {
      const tempFilePath = path.join(tmpdir(), `${crypto.randomUUID()}.zip`);

      try {
        await this.httpCore._downloadFile(
          config,
          urlResponse.url,
          tempFilePath
        );

        const zip = new StreamZip.async({ file: tempFilePath });
        const entries = await zip.entries();
        const jsonEntry = Object.values(entries).find((entry) =>
          entry.name.endsWith('.json')
        );

        if (jsonEntry) {
          const jsonContent = await zip.entryData(jsonEntry);
          return JSON.parse(jsonContent.toString('utf8'));
        }
      } finally {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    }
    return [];
  }

  async getImportTaskFailedItemReport(config, batchId) {
    const csvContent = await this.httpCore._get(
      config,
      PATH.IMPORT_TASK_ERROR_REPORT(batchId),
      'import-task-error-report',
      'Failed to get import task error report',
      { headers: { Accept: 'application/octet-stream' } }
    );

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return records;
  }

  async createWarehousesBatch(config, warehousesData, opts = {}) {
    const results = await this.batch._postBatch(config, {
      entityName: 'warehouse',
      items: warehousesData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'externalReferenceCode',
      op: 'create-warehouses-batch',
      friendly: 'Failed to create warehouses batch',
      path: PATH.WAREHOUSES_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });

    return {
      ...results,
      warehouseCount: results.count,
    };
  }

  async createWarehouseItemsBatch(config, itemsData, opts = {}) {
    const { logger } = this.ctx;
    const warehouseId = opts.warehouseId;
    logger.info(
      `Simulating batch creation of ${itemsData.length} inventory items for warehouse ${warehouseId} to bypass Liferay DXP platform bug...`,
      {
        sessionId: opts.sessionId,
      }
    );

    const results = {
      status: 'completed',
      batchId: `simulated-inventory-batch-${Date.now()}`,
      count: 0,
      batchExternalReferenceCode:
        opts.externalReferenceCode || `AICA-BATCH-SIM-INV-${Date.now()}`,
      errors: [],
    };

    // Process in smaller chunks concurrently
    const concurrency = 5;
    for (let i = 0; i < itemsData.length; i += concurrency) {
      const chunk = itemsData.slice(i, i + concurrency);
      await Promise.all(
        chunk.map(async (entry) => {
          try {
            await this.httpCore._post(
              config,
              PATH.WAREHOUSE_INVENTORIES(warehouseId),
              entry,
              'create-inventory-item',
              'Failed to create inventory item'
            );
            results.count++;
          } catch (err) {
            results.errors.push({ sku: entry.sku, error: err.message });
            logger.warn(
              `Failed to create simulated batch inventory item for SKU ${entry.sku}: ${err.message}`
            );
          }
        })
      );
    }

    if (results.errors.length > 0) {
      throw new Error(
        `Failed to create ${results.errors.length} inventory items during simulated batch`
      );
    }

    return results;
  }

  async createWarehouse(config, warehouseData) {
    return await this.httpCore._post(
      config,
      PATH.WAREHOUSES,
      warehouseData,
      'create-warehouse',
      'Failed to create warehouse'
    );
  }

  async deleteWarehouse(config, warehouseId) {
    return await this.httpCore._delete(
      config,
      `${PATH.WAREHOUSES}/${warehouseId}`,
      null,
      'delete-warehouse',
      'Failed to delete warehouse'
    );
  }

  async updateProductInventory(config, warehouseId, sku, inventoryData) {
    return await this.httpCore._post(
      config,
      PATH.WAREHOUSE_INVENTORIES(warehouseId),
      { ...inventoryData, sku },
      'update-product-inventory',
      'Failed to update product inventory'
    );
  }

  async getWarehouseItems(
    config,
    warehouseId,
    { filter, page, pageSize } = {}
  ) {
    return await this.httpCore._get(
      config,
      PATH.WAREHOUSE_INVENTORIES(warehouseId),
      'warehouse:items',
      'Get warehouse items',
      { params: { filter, page, pageSize } }
    );
  }

  async getCurrencies(config) {
    const data = await this.httpCore._get(
      config,
      PATH.CURRENCIES,
      'get-currencies'
    );
    const items = asItems(data);
    const lang = config.languageId || 'en_US';

    return items.map((currency) => {
      let name = currency.name?.[lang];

      if (!name && currency.name) {
        // Fallback to en_US
        name = currency.name['en_US'];
      }

      if (!name && currency.name && typeof currency.name === 'object') {
        // Fallback to first available translation
        const values = Object.values(currency.name);
        if (values.length > 0) name = values[0];
      }

      return {
        code: currency.code,
        name: name || currency.code,
      };
    });
  }

  async getProductById(config, productId) {
    return await this.httpCore._get(
      config,
      PATH.PRODUCT(productId),
      'get-product-by-id'
    );
  }

  async patchProductById(config, productId, data) {
    return await this.httpCore._patch(
      config,
      PATH.PRODUCT(productId),
      data,
      'patch-product-by-id',
      'Failed to patch product'
    );
  }

  async createProduct(config, productData) {
    const { logger } = this.ctx;
    if (!productData.catalogId && config.catalogId) {
      productData.catalogId = parseInt(config.catalogId, 10);
    }

    logger.debug('Creating product with payload:', {
      sku: productData.sku,
      name: productData.name?.[config.languageId || 'en_US'] || 'N/A',
      catalogId: productData.catalogId,
      productType: productData.productType,
      payloadKeys: Object.keys(productData),
    });

    const data = await this.httpCore._post(
      config,
      PATH.PRODUCTS,
      productData,
      'create-product',
      'Failed to create product'
    );

    return data;
  }

  async createProductsBatch(config, productsData, opts = {}) {
    const results = await this.batch._postBatch(config, {
      entityName: 'product',
      items: productsData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'sku',
      op: 'create-products-batch',
      friendly: 'Failed to create products batch',
      path: PATH.PRODUCTS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });

    return {
      ...results,
      productCount: results.count,
    };
  }

  async createWarehouseChannelsBatch(config, itemsData, _opts = {}) {
    this.logger.info(
      `Linking ${itemsData.length} warehouse channels sequentially for idempotency...`
    );
    const results = [];
    for (const item of itemsData) {
      try {
        const res = await this.createWarehouseChannel(
          config,
          item.warehouseId,
          item.channelId
        );
        results.push({ ...item, status: res.status || 'SUCCESS' });
      } catch (err) {
        this.logger.error(
          `Failed to link warehouse ${item.warehouseId} to channel ${item.channelId}: ${err.message}`
        );
        throw err;
      }
    }
    return { success: true, count: itemsData.length, items: results };
  }

  async createWarehouseChannel(config, warehouseId, channelId) {
    // HARDENING: Ensure we only send the primitive IDs to prevent nesting corruption.
    // Liferay Commerce relationship APIs are strict and reject unknown properties.
    const cleanedWarehouseId =
      typeof warehouseId === 'object' ? warehouseId.id : warehouseId;
    const cleanedChannelId =
      typeof channelId === 'object' ? channelId.channelId : channelId;

    const payload = {
      channelId: parseInt(cleanedChannelId, 10),
      warehouseId: parseInt(cleanedWarehouseId, 10),
    };

    try {
      const data = await this.httpCore._post(
        config,
        PATH.WAREHOUSE_CHANNELS(cleanedWarehouseId),
        payload,
        'create-warehouse-channel',
        'Failed to link warehouse to channel'
      );
      return data;
    } catch (error) {
      if (error.response?.status === 409 || error.status === 409) {
        // Log a warning and bypass since the link relation already exists
        return { status: 'ALREADY_EXISTS' };
      }
      throw error;
    }
  }

  async createAccount(config, accountData) {
    const data = await this.httpCore._post(
      config,
      PATH.ACCOUNTS,
      accountData,
      'create-account',
      null,
      'handle'
    );

    return data;
  }

  async patchAccount(config, accountId, accountData) {
    return await this.httpCore._patch(
      config,
      PATH.ACCOUNT(accountId),
      accountData,
      'patch-account',
      'Failed to patch account'
    );
  }

  async patchAccountByERC(config, externalReferenceCode, accountData) {
    return await this.httpCore._patch(
      config,
      PATH.ACCOUNT_BY_ERC(externalReferenceCode),
      accountData,
      'patch-account-by-erc',
      'Failed to patch account by ERC'
    );
  }

  async getAccountByERC(config, externalReferenceCode) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.ACCOUNT_BY_ERC(externalReferenceCode),
        'get-account-by-erc'
      );
      if (res && res.softEmpty) return null;
      return res;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(`Failed to get account by ERC: ${error.message}`, {
        cause: error,
      });
    }
  }

  async getCountries(config) {
    const { cache, logger } = this.ctx;
    const correlationId = config?.correlationId;
    const cacheKey = 'LIFERAY_COUNTRIES';

    logger.debug('[getCountries] - Start', { correlationId, cacheKey });

    let countries = cache.get(cacheKey);
    if (countries) {
      logger.debug('[getCountries] - Cache hit', {
        correlationId,
        cacheKey,
        countriesCount: countries.length,
      });
      return countries;
    }
    logger.debug('[getCountries] - Cache miss', { correlationId, cacheKey });

    const data = await this.httpCore._get(
      config,
      PATH.COUNTRIES,
      'get-countries',
      null,
      { params: { pageSize: 1000, active: true } }
    );

    countries = asItems(data);

    logger.debug('[getCountries] - API call completed', {
      correlationId,
      cacheKey,
      countriesCount: countries.length,
    });

    cache.set(cacheKey, countries, 900000);

    logger.debug('[getCountries] - Cache set', {
      correlationId,
      cacheKey,
      countriesCount: countries.length,
    });
    return countries;
  }

  async getCountryRegions(config, countryId) {
    const { cache, logger } = this.ctx;
    const correlationId = config?.correlationId;
    const cacheKey = `LIFERAY_REGIONS_${countryId}`;

    logger.debug('[getCountryRegions] - Start', { correlationId, cacheKey });

    let regions = cache.get(cacheKey);
    if (regions) {
      logger.debug('[getCountryRegions] - Cache hit', {
        correlationId,
        cacheKey,
        regionsCount: regions.length,
      });
      return regions;
    }
    logger.debug('[getCountryRegions] - Cache miss', {
      correlationId,
      cacheKey,
    });

    const data = await this.httpCore._get(
      config,
      PATH.COUNTRY_REGIONS(countryId),
      'get-country-regions',
      null,
      { params: { pageSize: 1000, active: true } }
    );
    regions = asItems(data);

    logger.debug('[getCountryRegions] - API call completed', {
      correlationId,
      cacheKey,
      regionsCount: regions.length,
    });

    cache.set(cacheKey, regions, 900000);
    logger.debug('[getCountryRegions] - Cache set', {
      correlationId,
      cacheKey,
      regionsCount: regions.length,
    });
    return regions;
  }

  async createAccountAddress(config, accountId, addressData) {
    return await this.httpCore._post(
      config,
      PATH.ACCOUNT_ADDRESSES(accountId),
      addressData,
      'create-account-address',
      'Failed to create account address'
    );
  }

  async createAccountAddressBatch(config, accountId, addressesData, opts = {}) {
    // HARDENING: Strip accountId from items as it is not allowed in the DTO
    // and is already in the URL path.
    const preparedItems = addressesData.map((addr) => {
      const { accountId: _aid, ...rest } = addr;
      return rest;
    });

    const results = await this.batch._postBatch(config, {
      entityName: 'address',
      items: preparedItems,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'id',
      op: 'create-account-addresses-batch',
      friendly: 'Failed to create account addresses batch',
      path: (callback) => PATH.ACCOUNT_ADDRESSES_BATCH(accountId, callback),
      sessionId: opts.sessionId,
      session: opts.session,
    });

    return {
      ...results,
      addressCount: results.count,
    };
  }

  async createProductSkusBatch(config, skusData, opts = {}) {
    const results = await this.batch._postBatch(config, {
      entityName: 'sku',
      items: skusData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'sku',
      op: 'create-skus-batch',
      friendly: 'Failed to create SKUs batch',
      path: (callback) => {
        if (opts.productId || opts.productExternalReferenceCode) {
          return PATH.PRODUCT_SKUS_BATCH_SCOPED(
            opts.productId,
            opts.productExternalReferenceCode,
            callback
          );
        }
        return PATH.PRODUCTS_SKUS_BATCH(callback);
      },
      sessionId: opts.sessionId,
      session: opts.session,
    });

    return {
      ...results,
      skuCount: results.count,
    };
  }

  async createSpecificationsBatch(config, specificationsData, opts = {}) {
    return await this.batch._postBatch(config, {
      entityName: 'specification',
      items: specificationsData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'externalReferenceCode',
      op: 'create-specifications-batch',
      friendly: 'Failed to create specifications batch',
      path: PATH.SPECIFICATIONS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async createOptionsBatch(config, optionsData, opts = {}) {
    return await this.batch._postBatch(config, {
      entityName: 'option',
      items: optionsData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'externalReferenceCode',
      op: 'create-options-batch',
      friendly: 'Failed to create options batch',
      path: PATH.OPTIONS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async createAccountsBatch(config, accountsData, opts = {}) {
    const { logger } = this.ctx;
    const sessionId = opts.sessionId;

    if (!accountsData || accountsData.length === 0) {
      return {
        batchId: `batch-empty-${Date.now()}`,
        status: 'completed',
        count: 0,
        batchExternalReferenceCode: opts.externalReferenceCode || 'empty',
        batchRefs: [],
        accountCount: 0,
      };
    }

    // 1. Resolve ERCs for all items using the same logic as _postBatch
    const processedAccounts = accountsData.map((item) => {
      const extERC = sanitizedERC(
        item.externalReferenceCode || item.name || crypto.randomUUID()
      );
      return { ...item, externalReferenceCode: extERC };
    });

    const itemERCs = processedAccounts.map((a) => a.externalReferenceCode);
    const existingMap = new Map();

    // 2. Query Liferay to find which accounts already exist via GraphQL direct database lookup
    if (processedAccounts.length > 0) {
      try {
        const LiferayGraphQLService = require('./graphql.cjs');
        const graphql = new LiferayGraphQLService(this.ctx);
        const existingAccounts = await graphql.getAccountsByERC(
          config,
          itemERCs
        );
        for (const acc of existingAccounts) {
          if (acc.externalReferenceCode) {
            existingMap.set(acc.externalReferenceCode, acc);
          }
        }
      } catch (err) {
        if (logger) {
          logger.warn(
            `Failed to query existing accounts: ${err.message}. Emulating upsert via individual errors.`
          );
        }
      }
    }

    // 3. Separate into existing (to patch) and new (to create)
    const toCreate = [];
    const toUpdate = [];

    for (const acc of processedAccounts) {
      if (existingMap.has(acc.externalReferenceCode)) {
        toUpdate.push(acc);
      } else {
        toCreate.push(acc);
      }
    }

    if (logger) {
      logger.info(
        `Accounts batch emulation: ${toCreate.length} to create, ${toUpdate.length} to update.`,
        { sessionId }
      );
    }

    // 4. Update existing accounts in parallel
    if (toUpdate.length > 0) {
      await Promise.all(
        toUpdate.map(async (acc) => {
          try {
            await this.patchAccountByERC(
              config,
              acc.externalReferenceCode,
              acc
            );
          } catch (err) {
            if (logger) {
              logger.warn(
                `Failed to update existing account ${acc.externalReferenceCode}: ${err.message}`,
                { sessionId }
              );
            }
          }
        })
      );
    }

    // 5. Create new accounts using batch if any
    let results;
    if (toCreate.length > 0) {
      results = await this.batch._postBatch(config, {
        entityName: 'account',
        items: toCreate,
        externalReferenceCode: opts.externalReferenceCode,
        itemERCKey: 'name',
        op: 'create-accounts-batch',
        friendly: 'Failed to create accounts batch',
        path: PATH.ACCOUNTS_BATCH,
        sessionId: opts.sessionId,
        session: opts.session,
        skipItemERC: true, // We already resolved and sanitized ERCs
      });
    } else {
      const mockERC =
        opts.externalReferenceCode ||
        createERC(ERC_PREFIX.ACCOUNT_BATCH || ERC_PREFIX.BATCH);
      results = {
        batchId: `batch-mock-${Date.now()}`,
        status: 'completed',
        count: 0,
        batchExternalReferenceCode: mockERC,
        batchRefs: [],
      };
      // Cache the item ERCs so progress tracking/monitors can resolve them
      this._cacheItemERCs(mockERC, null, itemERCs, sessionId);
    }

    return {
      ...results,
      accountCount: results.count + toUpdate.length,
    };
  }

  _cacheItemERCs(batchERC, batchId, itemERCs, sessionId = null) {
    const { cache, config: configService, logger } = this.ctx;
    const ttl = getBatchCacheTTLms(configService);

    if (itemERCs && itemERCs.length > 0) {
      if (batchERC) {
        cache.set(`erc:${batchERC}:itemERCs`, itemERCs, ttl);
      }
      if (batchId) {
        cache.set(`batch:${batchId}:itemERCs`, itemERCs, ttl);
      }
      if (sessionId && batchERC) {
        cache.set(
          `session:${sessionId}:itemERCsByBatch:${batchERC}`,
          itemERCs,
          ttl
        );
      }
      logger?.trace?.('cache:itemERCs:stored', {
        scopeERC: batchERC,
        sessionId,
        batchId,
        count: itemERCs.length,
      });
    }
  }

  async createOrdersBatch(config, ordersData, opts = {}) {
    const results = await this.batch._postBatch(config, {
      entityName: 'order',
      items: ordersData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'externalReferenceCode',
      op: 'create-orders-batch',
      friendly: 'Failed to create orders batch',
      path: PATH.ORDERS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });

    return {
      ...results,
      orderCount: results.count,
    };
  }

  async createOrder(config, orderData) {
    const { logger } = this.ctx;
    if (!orderData.channelId)
      throw new Error('channelId is required for order creation');
    if (!orderData.currencyCode)
      throw new Error('currencyCode is required for order creation');

    orderData.channelId = parseInt(orderData.channelId, 10);

    logger.trace('Creating order with payload', {
      channelId: orderData.channelId,
      currencyCode: orderData.currencyCode,
      accountId: orderData.accountId,
      payloadKeys: Object.keys(orderData),
    });

    return await this.httpCore._post(
      config,
      PATH.ORDERS,
      orderData,
      'create-order',
      'Failed to create order'
    );
  }

  async createAccountGroup(config, accountGroupData) {
    return await this.httpCore._post(
      config,
      '/o/headless-admin-user/v1.0/account-groups',
      accountGroupData,
      'create-account-group',
      'Failed to create account group'
    );
  }

  async getAccountGroupByERC(config, externalReferenceCode) {
    try {
      const res = await this.httpCore._get(
        config,
        `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${encodeURIComponent(externalReferenceCode)}`,
        'get-account-group-by-erc'
      );
      if (res && res.softEmpty) return null;
      return res;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }

  async assignAccountToGroup(config, groupERC, accountERC) {
    // WORKAROUND: Liferay's REST endpoint internally swaps the parameters:
    // the first placeholder maps to account ERC, and the second maps to group ERC.
    return await this.httpCore._post(
      config,
      `/o/headless-admin-user/v1.0/account-groups/by-external-reference-code/${encodeURIComponent(accountERC)}/accounts/by-external-reference-code/${encodeURIComponent(groupERC)}`,
      null,
      'assign-account-to-group',
      'Failed to assign account to group'
    );
  }

  async createPriceListAccountGroup(config, priceListERC, payload) {
    return await this.httpCore._post(
      config,
      PATH.PRICE_LIST_ACCOUNT_GROUPS_BY_ERC(priceListERC),
      payload,
      'create-price-list-account-group',
      'Failed to link account group to price list'
    );
  }

  async createPriceList(config, priceListData) {
    return await this.httpCore._post(
      config,
      PATH.PRICE_LISTS,
      priceListData,
      'create-price-list',
      'Failed to create price list'
    );
  }

  async patchPriceList(config, priceListId, priceListData) {
    return await this.httpCore._patch(
      config,
      PATH.PRICE_LIST(priceListId),
      priceListData,
      'patch-price-list',
      'Failed to patch price list'
    );
  }

  async getPriceListByERC(config, externalReferenceCode) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.PRICE_LIST_BY_ERC(externalReferenceCode),
        'get-price-list-by-erc'
      );
      if (res && res.softEmpty) return null;
      return res;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }

  async getPriceLists(
    config,
    { filter, page, pageSize, search, sort, catalogId } = {}
  ) {
    const params = { filter, page, pageSize, search, sort };
    const res = await this.httpCore._get(
      config,
      PATH.PRICE_LISTS + q(params),
      'get-price-lists'
    );

    if (catalogId && res.items) {
      const filteredItems = res.items.filter(
        (pl) => parseInt(pl.catalogId, 10) === parseInt(catalogId, 10)
      );
      return {
        ...res,
        items: filteredItems,
        totalCount: filteredItems.length,
      };
    }

    return res;
  }

  async getPriceEntries(config, priceListId, { filter, page, pageSize } = {}) {
    const params = { filter, page, pageSize };
    return await this.httpCore._get(
      config,
      PATH.PRICE_ENTRIES(priceListId) + q(params),
      'price-entries:list'
    );
  }

  async createPriceListsBatch(config, priceListsData, opts = {}) {
    return await this.batch._postBatch(config, {
      entityName: 'pricelist',
      items: priceListsData,
      externalReferenceCode: opts.externalReferenceCode,
      itemERCKey: 'externalReferenceCode',
      op: 'create-price-lists-batch',
      friendly: 'Failed to create price lists batch',
      path: PATH.PRICE_LISTS_BATCH,
      sessionId: opts.sessionId,
      session: opts.session,
    });
  }

  async createPriceEntriesBatch(config, priceEntriesData, opts = {}) {
    const { logger } = this.ctx;
    const simulateBatch = opts.simulateBatch !== false;

    if (!simulateBatch) {
      logger.info(
        `Creating batch of ${priceEntriesData.length} price entries natively...`,
        { sessionId: opts.sessionId }
      );
      return await this.batch._postBatch(config, {
        entityName: 'price-entries',
        items: priceEntriesData,
        externalReferenceCode: opts.externalReferenceCode,
        itemERCKey: 'externalReferenceCode',
        op: 'create-price-entries-batch',
        friendly: 'Failed to create price entries batch',
        path: PATH.PRICE_ENTRIES_BATCH(),
        sessionId: opts.sessionId,
        session: opts.session,
      });
    }

    logger.info(
      `Simulating batch creation of ${priceEntriesData.length} price entries to bypass Liferay DXP platform bug...`,
      {
        sessionId: opts.sessionId,
      }
    );

    const results = {
      status: 'completed',
      batchId: `simulated-batch-${Date.now()}`,
      count: 0,
      batchExternalReferenceCode:
        opts.externalReferenceCode || `AICA-BATCH-SIM-${Date.now()}`,
      errors: [],
    };

    const priceListKey =
      opts.priceListExternalReferenceCode || opts.priceListId;

    // Process in smaller chunks to avoid overwhelming the REST API
    const concurrency = 5;
    for (let i = 0; i < priceEntriesData.length; i += concurrency) {
      const chunk = priceEntriesData.slice(i, i + concurrency);
      await Promise.all(
        chunk.map(async (entry) => {
          try {
            const keyToUse = priceListKey || entry.priceListId;
            await this.createPriceEntry(config, keyToUse, entry, opts);
            results.count++;
          } catch (err) {
            results.errors.push({
              sku: entry.skuExternalReferenceCode,
              error: err.message,
            });
            logger.warn(
              `Failed to create simulated batch price entry for SKU ${entry.skuExternalReferenceCode}: ${err.message}`
            );
          }
        })
      );
    }

    if (results.errors.length > 0) {
      throw new Error(
        `Failed to create ${results.errors.length} price entries during simulated batch`
      );
    }

    return results;
  }

  async createPriceEntry(config, priceListIdOrERC, priceEntryData, opts = {}) {
    const { tierPrices, ...entryData } = priceEntryData;

    const isERC =
      typeof priceListIdOrERC === 'string' && isNaN(Number(priceListIdOrERC));
    let urlPath = isERC
      ? PATH.PRICE_ENTRIES_BY_ERC(priceListIdOrERC)
      : PATH.PRICE_ENTRIES(priceListIdOrERC);

    // Clean up priceListId from entryData since we specify it in the URL path,
    // to avoid Liferay matching/validation conflicts on ID-scoped endpoints.
    // Clean up IDs to avoid Vulcan Batch Engine NotSupportedException mapping bugs
    if (isERC) {
      entryData.priceListExternalReferenceCode = priceListIdOrERC;
    } else {
      delete entryData.priceListId;
      delete entryData.priceListExternalReferenceCode;
    }

    const result = await this.httpCore._post(
      config,
      urlPath,
      entryData,
      'create-price-entry',
      'Failed to create price entry'
    );

    if (tierPrices && tierPrices.length > 0 && result && result.id) {
      for (const tp of tierPrices) {
        await this.httpCore._post(
          config,
          `${PATH.PRICE_ENTRY(result.id)}/tier-prices`,
          tp,
          'create-tier-price',
          'Failed to create tier price'
        );
      }
    }

    return result;
  }

  async createSkuPriceEntry(config, priceListId, skuId, priceEntryData) {
    return await this.httpCore._post(
      config,
      PATH.PRICE_ENTRIES(priceListId),
      { ...priceEntryData, skuId },
      'create-sku-price-entry',
      'Failed to create SKU price entry'
    );
  }

  async createProductSku(config, productId, skuData) {
    return await this.httpCore._post(
      config,
      PATH.PRODUCT_SKUS(productId),
      skuData,
      'create-sku',
      'Failed to create SKU'
    );
  }

  async addProductOptions(config, productId, productOptions, productERC) {
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    // HARDENING: Use ERC-based path if available to bypass Indexing Lag
    const path = productERC
      ? PATH.PRODUCT_OPTIONS_BY_ERC(productERC)
      : PATH.PRODUCT_OPTIONS(productId);

    while (attempts < maxAttempts) {
      try {
        return await this.httpCore._post(
          config,
          path,
          productOptions,
          'add-product-options',
          'Failed to add product options'
        );
      } catch (error) {
        lastError = error;
        // If 404, the product might not be ready yet
        if (error.problem?.status === 404 || error.status === 404) {
          attempts++;
          if (attempts < maxAttempts) {
            const delayMs = 2000 * attempts;
            logger.warn(
              `Product ${productERC || productId} not found for options link, retrying in ${delayMs}ms...`,
              { attempt: attempts, productId: productId, productERC }
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

  async addProductChannels(config, productId, channelIds, productERC) {
    let attempts = 0;
    const maxAttempts = 3;
    let lastError;

    const path = productERC
      ? PATH.PRODUCT_CHANNELS_BY_ERC(productERC)
      : PATH.PRODUCT_CHANNELS(productId);

    // DTO expects an array of { channelId: 123 }
    const payload = channelIds.map((id) => ({ channelId: parseInt(id, 10) }));

    while (attempts < maxAttempts) {
      try {
        return await this.httpCore._post(
          config,
          path,
          payload,
          'add-product-channels',
          'Failed to add product channels'
        );
      } catch (error) {
        lastError = error;
        if (error.problem?.status === 404 || error.status === 404) {
          attempts++;
          if (attempts < maxAttempts) {
            const delayMs = 2000 * attempts;
            logger.warn(
              `Product ${productERC || productId} not found for channels link, retrying in ${delayMs}ms...`,
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

  async addWarehouseChannel(config, warehouseId, channelId) {
    const path = PATH.WAREHOUSE_CHANNELS(warehouseId);
    const payload = {
      channelId: parseInt(channelId, 10),
      warehouseId: parseInt(warehouseId, 10),
    };

    return await this.httpCore._post(
      config,
      path,
      payload,
      'add-warehouse-channel',
      'Failed to add warehouse channel'
    );
  }

  async deleteProductOption(config, productId, productOptionId) {
    return await this.httpCore._delete(
      config,
      PATH.PRODUCT_OPTION(productOptionId),
      null,
      'delete-product-option',
      'Failed to delete product option'
    );
  }

  async getCommerceProductOptions(config, productId) {
    const data = await this.httpCore._get(
      config,
      PATH.PRODUCT_OPTIONS(productId),
      'get-product-options'
    );
    return asItems(data);
  }

  async deleteProductSpecification(config, productId, productSpecificationId) {
    return await this.httpCore._delete(
      config,
      PATH.PRODUCT_SPECIFICATION(productSpecificationId),
      null,
      'delete-product-specification',
      'Failed to delete product specification'
    );
  }

  async getCommerceProductSpecifications(config, productId) {
    const data = await this.httpCore._get(
      config,
      PATH.PRODUCT_SPECIFICATIONS(productId),
      'get-product-specifications'
    );
    return asItems(data);
  }

  async createSpecificationCategory(config, categoryData) {
    // Both legacy and modern DXP endpoints use 'title' and 'key'.
    // Do not attempt to map to 'name' as Jackson will strictly reject it.
    const payload = {
      externalReferenceCode: categoryData.externalReferenceCode,
      title: categoryData.title,
      description: categoryData.description,
      key: categoryData.key,
    };

    return await this.httpCore._post(
      config,
      PATH.SPECIFICATION_CATEGORIES,
      payload,
      'create-specification-category',
      'Failed to create specification category'
    );
  }

  async getSpecificationCategoryByKey(config, key) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.SPECIFICATION_CATEGORIES,
        'specification-categories:list',
        'Find spec category by key',
        {
          params: {
            page: 1,
            pageSize: 250, // Fetch all to prevent OData filter failures on different DXP versions
          },
        }
      );
      const items = asItems(res);
      return (
        items.find(
          (it) =>
            String(it.key || '').toLowerCase() === String(key).toLowerCase()
        ) || null
      );
    } catch (error) {
      throw new Error(
        `Failed to get specification category by key: ${error.message}`,
        { cause: error }
      );
    }
  }

  async createSpecificationCategoryWithReuse(config, payload) {
    const key = payload?.key;
    if (key) {
      try {
        const existing = await this.getSpecificationCategoryByKey(config, key);
        if (existing) {
          return existing;
        }
      } catch (_err) {
        // Ignore pre-check lookup errors and fall back to creation
      }
    }

    try {
      return await this.createSpecificationCategory(config, payload);
    } catch (e) {
      const msg = String(e?.message || '').toLowerCase();
      const isConflict =
        e?.status === 409 ||
        e?.status === 400 || // Match 400 duplicate/bad requests as conflicts
        e?.problem?.status === 'CONFLICT' ||
        msg.includes('409') ||
        msg.includes('conflict') ||
        msg.includes('duplicate') ||
        msg.includes('already exists');

      if (!isConflict) throw e;

      if (!key) throw e;

      const existing = await this.getSpecificationCategoryByKey(config, key);
      if (!existing) throw e;

      return existing;
    }
  }

  async createSpecification(config, specificationData) {
    const { logger } = this.ctx;
    logger.debug(`LiferayRestService.createSpecification called with:`, {
      specificationKey: specificationData.key,
      specificationName: specificationData.title?.en_US,
      liferayUrl: config.liferayUrl,
    });

    const data = await this.httpCore._post(
      config,
      PATH.SPECIFICATIONS,
      specificationData,
      'create-specification',
      'Failed to create specification'
    );

    logger.debug(`✓ Specification created successfully:`, data);
    return data;
  }

  async getSkuByERC(config, erc) {
    return await this.httpCore._get(
      config,
      PATH.SKU_BY_ERC(erc),
      'get-sku-by-erc',
      'Get SKU by ERC'
    );
  }

  async getSkusByERC(config, ercs) {
    if (!ercs || ercs.length === 0) return [];

    // HARDENING: Switch to REST discovery for SKUs to bypass GQL indexing lag
    const results = await Promise.allSettled(
      ercs.map((erc) => this.getSkuByERC(config, erc))
    );

    return results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
  }

  async getSpecificationByERC(config, externalReferenceCode) {
    try {
      return await this.httpCore._get(
        config,
        PATH.SPECIFICATION_BY_ERC(externalReferenceCode),
        'get-specification-by-erc'
      );
    } catch (error) {
      // Safely return null on any error (404, 400, 500) to allow graceful fallback to key lookup
      this.ctx.logger.debug(
        `Failed to fetch specification by ERC '${externalReferenceCode}'. Bypassing. Error: ${error.message}`
      );
      return null;
    }
  }

  async getSpecificationByKey(config, key) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.SPECIFICATIONS,
        'specifications:list',
        'Find specification by key',
        {
          params: {
            page: 1,
            pageSize: 250, // Fetch all to prevent OData filter failures on different DXP versions
          },
        }
      );
      const items = asItems(res);
      return (
        items.find(
          (it) =>
            String(it.key || '').toLowerCase() === String(key).toLowerCase()
        ) || null
      );
    } catch (error) {
      throw new Error(`Failed to get specification by key: ${error.message}`, {
        cause: error,
      });
    }
  }

  async updateSpecificationById(config, id, payload) {
    const url = `${PATH.SPECIFICATIONS}/${encodeURIComponent(id)}`;
    return this.httpCore._put(
      config,
      url,
      payload,
      'update-specification-by-id',
      'Failed to update specification by ID'
    );
  }

  async createSpecificationWithReuse(config, payload) {
    const { logger } = this.ctx;
    const key = payload?.key;
    const erc = payload?.externalReferenceCode;
    let existing = null;

    // 1. Try Lookup-First before posting to prevent duplicate key database crashes
    if (erc) {
      try {
        existing = await this.getSpecificationByERC(config, erc);
      } catch (_err) {
        // Ignore and try key
      }
    }
    if (!existing && key) {
      try {
        existing = await this.getSpecificationByKey(config, key);
      } catch (_err) {
        // Ignore and fall back to create
      }
    }

    if (existing) {
      // If found, update its ERC if mismatched and return it
      if (erc && existing.externalReferenceCode !== erc) {
        try {
          await this.updateSpecificationById(config, existing.id, {
            externalReferenceCode: erc,
          });
          existing.externalReferenceCode = erc;
        } catch {
          logger.warn(
            `Failed to update ERC for existing specification '${key}'`
          );
        }
      }
      return existing;
    }

    // 2. Fall back to Creation
    try {
      return await this.createSpecification(config, payload);
    } catch (e) {
      const msg = String(e?.message || '').toLowerCase();
      const isConflict =
        e?.status === 409 ||
        e?.status === 400 || // Match 400 bad requests as potential conflicts
        e?.problem?.status === 'CONFLICT' ||
        msg.includes('409') ||
        msg.includes('conflict') ||
        msg.includes('duplicate') ||
        msg.includes('already exists');

      if (!isConflict) throw e;

      logger.trace(
        `Conflict creating specification, attempting to fetch by key: ${payload.key}`
      );

      if (!key) {
        throw new Error(
          'Conflict on createSpecification, but no key was provided to find existing.',
          { cause: e }
        );
      }

      existing = await this.getSpecificationByKey(config, key);

      if (!existing) {
        throw new Error(
          `Conflict creating specification '${key}', but could not retrieve the existing one.`,
          { cause: e }
        );
      }

      if (erc && existing.externalReferenceCode !== erc) {
        try {
          await this.updateSpecificationById(config, existing.id, {
            externalReferenceCode: erc,
          });
          existing.externalReferenceCode = erc;
        } catch {
          logger.warn(
            `Failed to update ERC for existing specification '${key}'`
          );
        }
      }
      return existing;
    }
  }

  async createOption(config, optionData) {
    // Last-line-of-defense validation for Commerce constraints
    if (
      optionData.skuContributor &&
      !COMMERCE_CONSTRAINTS.SKU_CONTRIBUTOR_FIELD_TYPES.includes(
        optionData.fieldType
      )
    ) {
      logger.warn(
        `REST: fieldType '${optionData.fieldType}' is incompatible with skuContributor. Disabling skuContributor.`,
        { optionKey: optionData.key }
      );
      optionData.skuContributor = false;
    }

    logger.debug(`LiferayRestService.createOption called with:`, {
      optionKey: optionData.key,
      optionName: optionData.name?.en_US,
      fieldType: optionData.fieldType,
      liferayUrl: config.liferayUrl,
    });

    const data = await this.httpCore._post(
      config,
      PATH.OPTIONS,
      optionData,
      'create-option',
      'Failed to create option'
    );

    logger.debug(`✓ Option created successfully:`, data);
    return data;
  }

  async createOptionWithReuse(config, optionData) {
    const erc = optionData?.externalReferenceCode;
    const key = optionData?.key;
    let existing = null;

    // 1. Try Lookup-First before posting to prevent duplicate key database crashes
    if (erc) {
      try {
        existing = await this.getOptionByERC(config, erc);
      } catch (_err) {
        // Ignore and try key
      }
    }
    if (!existing && key) {
      try {
        existing = await this.getOptionByKey(config, key);
      } catch (_err) {
        // Ignore and fall back to create
      }
    }

    if (existing) {
      // If found, update its ERC if mismatched and return it
      if (
        erc &&
        existing.externalReferenceCode !== erc &&
        typeof this.updateOptionById === 'function'
      ) {
        try {
          await this.updateOptionById(config, existing.id, {
            externalReferenceCode: erc,
          });
        } catch {
          // Ignore
        }
      }
      return existing;
    }

    // 2. Fall back to Creation
    try {
      return await this.createOption(config, optionData);
    } catch (e) {
      const msg = String(e?.message || '').toLowerCase();
      const isConflict =
        e?.status === 409 ||
        e?.status === 400 || // Match 400 bad requests as potential conflicts
        e?.problem?.status === 'CONFLICT' ||
        msg.includes('409') ||
        msg.includes('conflict') ||
        msg.includes('duplicate') ||
        msg.includes('already exists');

      if (!isConflict) throw e;

      // Repeat lookup on conflict to ensure we retrieve it
      if (erc) {
        try {
          existing = await this.getOptionByERC(config, erc);
        } catch (ercError) {
          this.ctx.logger.debug(
            `Failed lookup by ERC '${erc}' after conflict. Error: ${ercError.message}`
          );
        }
      }
      if (!existing && key) {
        try {
          existing = await this.getOptionByKey(config, key);
        } catch (keyError) {
          this.ctx.logger.debug(
            `Failed lookup by Key '${key}' after conflict. Error: ${keyError.message}`
          );
        }
      }
      if (!existing) throw e;

      if (
        erc &&
        existing.externalReferenceCode !== erc &&
        typeof this.updateOptionById === 'function'
      ) {
        try {
          await this.updateOptionById(config, existing.id, {
            externalReferenceCode: erc,
          });
        } catch {
          // Ignore error
        }
      }
      return existing;
    }
  }

  async createOptionValue(config, optionId, optionValueData) {
    return await this.httpCore._post(
      config,
      PATH.OPTION_VALUES(optionId),
      optionValueData,
      'create-option-value',
      'Failed to create option value'
    );
  }

  async getOptionByERC(config, externalReferenceCode) {
    try {
      return await this.httpCore._get(
        config,
        PATH.OPTION_BY_ERC(externalReferenceCode),
        'get-option-by-erc'
      );
    } catch (error) {
      // Safely return null on any error (404, 400, 500) to allow graceful fallback to key lookup
      this.ctx.logger.debug(
        `Failed to fetch option by ERC '${externalReferenceCode}'. Bypassing. Error: ${error.message}`
      );
      return null;
    }
  }

  async getOptionByKey(config, key) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.OPTIONS,
        'options:list',
        'Find option by key',
        {
          params: {
            page: 1,
            pageSize: 250, // Fetch all to prevent OData filter failures on different DXP versions
          },
        }
      );
      const items = asItems(res);
      return (
        items.find(
          (it) =>
            String(it.key || '').toLowerCase() === String(key).toLowerCase()
        ) || null
      );
    } catch (error) {
      throw new Error(`Failed to get option by key: ${error.message}`, {
        cause: error,
      });
    }
  }

  async updateOptionById(config, id, payload) {
    const url = `${PATH.OPTIONS}/${encodeURIComponent(id)}`;
    return this.httpCore._put(
      config,
      url,
      payload,
      'update-option-by-id',
      'Failed to update option by ID'
    );
  }

  async getOptionValueByERC(config, optionId, externalReferenceCode) {
    try {
      return await this.httpCore._get(
        config,
        PATH.OPTION_VALUE_BY_ERC(optionId, externalReferenceCode),
        'get-option-value-by-erc'
      );
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(`Failed to get option value by ERC: ${error.message}`, {
        cause: error,
      });
    }
  }

  async getOptionValueByKey(config, optionId, key) {
    const listUrl = `${PATH.OPTIONS}/${encodeURIComponent(
      optionId
    )}/productOptionValues`;
    const res = await this.httpCore._get(
      config,
      listUrl,
      'optionValues:list',
      'Find option value by key',
      {
        params: {
          page: 1,
          pageSize: 1,
          search: key,
          fields: 'id,key,externalReferenceCode',
        },
      }
    );
    const items = Array.isArray(res?.items) ? res.items : [];
    return items.find((it) => it.key === key) || null;
  }

  async updateOptionValueById(config, optionId, valueId, payload) {
    const url = PATH.OPTION_VALUE(valueId);
    return this.httpCore._patch(
      config,
      url,
      payload,
      'update-option-value-by-id',
      'Failed to update option value by ID'
    );
  }

  async updateOptionValueByERC(
    config,
    optionId,
    externalReferenceCode,
    payload
  ) {
    const url = PATH.OPTION_VALUE_BY_ERC(optionId, externalReferenceCode);
    return this.httpCore._patch(
      config,
      url,
      payload,
      'update-option-value-by-erc',
      'Failed to update option value by ERC'
    );
  }

  async createOptionValueWithReuse(config, optionId, payload) {
    try {
      return await this.createOptionValue(config, optionId, payload);
    } catch (e) {
      const msg = String(e?.message || '').toLowerCase();
      const problemTitle = String(e?.problem?.title || '').toLowerCase();

      const isConflict =
        e?.status === 409 ||
        e?.problem?.status === 'CONFLICT' ||
        msg.includes('409') ||
        msg.includes('conflict') ||
        problemTitle.includes('duplicate key');

      if (!isConflict) throw e;

      let existing = null;
      const erc = payload?.externalReferenceCode;
      const key = payload?.key;

      if (erc) {
        try {
          existing = await this.getOptionValueByERC(config, optionId, erc);
        } catch {
          // Ignore error
        }
      }
      if (!existing && key) {
        try {
          existing = await this.getOptionValueByKey(config, optionId, key);
        } catch {
          // Ignore error
        }
      }
      if (!existing) throw e;

      if (erc && existing.externalReferenceCode !== erc) {
        try {
          await this.updateOptionValueById(config, optionId, existing.id, {
            externalReferenceCode: erc,
          });
          existing.externalReferenceCode = erc;
        } catch {
          // Ignore error
        }
      }
      return existing;
    }
  }

  async createOptionCategory(config, optionCategoryData) {
    return await this.httpCore._post(
      config,
      PATH.OPTION_CATEGORIES,
      optionCategoryData,
      'create-option-category',
      'Failed to create option category'
    );
  }

  async createTaxonomyCategory(config, vocabularyId, categoryPayload) {
    return await this.httpCore._post(
      config,
      PATH.TAXONOMY_CATEGORIES(vocabularyId),
      categoryPayload,
      'create-taxonomy-category',
      'Failed to create taxonomy category'
    );
  }

  async getOptionCategoryByKey(config, key) {
    try {
      const res = await this.httpCore._get(
        config,
        PATH.OPTION_CATEGORIES,
        'optionCategories:list',
        'Find option category by key',
        {
          params: {
            page: 1,
            pageSize: 1,
            filter: `key eq '${key}'`,
            fields: 'id,key,externalReferenceCode,title,description,priority',
          },
        }
      );
      const items = asItems(res);
      return items.find((it) => it.key === key) || null;
    } catch (error) {
      throw new Error(
        `Failed to get option category by key: ${error.message}`,
        {
          cause: error,
        }
      );
    }
  }

  async _listOptionCategories(
    config,
    {
      search,
      filter,
      pageSize = 200,
      fields = 'id,key,externalReferenceCode',
    } = {}
  ) {
    return this.httpCore._get(
      config,
      PATH.OPTION_CATEGORIES,
      'optionCategories:list',
      'List option categories',
      {
        params: {
          page: 1,
          pageSize,
          fields,
          ...(search ? { search } : {}),
          ...(filter ? { filter } : {}),
        },
      }
    );
  }

  async updateOptionCategoryById(config, id, payload) {
    const url = PATH.OPTION_CATEGORY(id);
    return this.httpCore._patch(
      config,
      url,
      payload,
      'update-option-category-by-id',
      'Failed to update option category by ID'
    );
  }

  async createOptionCategoryWithReuse(config, payload) {
    const { logger } = this.ctx;
    try {
      return await this.createOptionCategory(config, payload);
    } catch (e) {
      const msg = String(e?.message || '').toLowerCase();
      const isConflict =
        e?.status === 409 ||
        e?.problem?.status === 'CONFLICT' ||
        msg.includes('409') ||
        msg.includes('conflict');

      if (!isConflict) throw e;

      logger.trace(
        `Conflict creating option category, attempting to fetch by key: ${payload.key}`
      );

      const key = payload?.key;
      if (!key) {
        throw new Error(
          'Conflict on createOptionCategory, but no key was provided to find existing.',
          { cause: e }
        );
      }

      const existing = await this.getOptionCategoryByKey(config, key);

      if (!existing) {
        throw new Error(
          `Conflict creating option category '${key}', but could not retrieve the existing one.`,
          { cause: e }
        );
      }

      const erc = payload?.externalReferenceCode;
      if (erc && existing.externalReferenceCode !== erc) {
        try {
          await this.updateOptionCategoryById(config, existing.id, {
            externalReferenceCode: erc,
          });
          existing.externalReferenceCode = erc;
        } catch {
          logger.warn(
            `Failed to update ERC for existing option category '${key}'`
          );
        }
      }
      return existing;
    }
  }

  async getOptionCategoryByERC(config, externalReferenceCode) {
    try {
      return await this.httpCore._get(
        config,
        PATH.OPTION_CATEGORY_BY_ERC(externalReferenceCode),
        'get-option-category-by-erc'
      );
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(
        `Failed to get option category by ERC: ${error.message}`,
        {
          cause: error,
        }
      );
    }
  }

  async getOptionCategories(
    config,
    { search, pageSize = 200, fields = 'id,key,externalReferenceCode' } = {}
  ) {
    return this._listOptionCategories(config, { search, pageSize, fields });
  }

  async getPostalAddressByERC(config, externalReferenceCode) {
    try {
      return await this.httpCore._get(
        config,
        PATH.POSTAL_ADDRESS_BY_ERC(externalReferenceCode),
        'get-postal-address-by-erc'
      );
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(`Failed to get postal address by ERC: ${error.message}`, {
        cause: error,
      });
    }
  }

  async triggerReindex(config, className = null) {
    const url = className
      ? `/o/aica-reindex/reindex/${className}`
      : '/o/aica-reindex/reindex/all';
    return await this.httpCore._post(
      config,
      url,
      null,
      'trigger-reindex',
      'Failed to trigger search reindexing'
    );
  }

  async setBillingAndShippingAddresses(
    config,
    accountId,
    shippingAddressId,
    billingAddressId
  ) {
    const payload = {};
    if (shippingAddressId) payload.defaultShippingAddressId = shippingAddressId;
    if (billingAddressId) payload.defaultBillingAddressId = billingAddressId;

    return await this.httpCore._patch(
      config,
      PATH.ACCOUNT(accountId),
      payload,
      'set-billing-and-shipping-addresses',
      'Failed to set billing and shipping addresses'
    );
  }

  async getClassNameId(config, className) {
    const cacheKey = `classname_${className}`;
    if (this.ctx.cache) {
      const cached = this.ctx.cache.get(cacheKey);
      if (cached !== undefined && cached !== null) return cached;
    }

    const classNameId = await this.httpCore._post(
      config,
      '/api/jsonws/classname/get-class-name-id',
      { value: className },
      'get-class-name-id',
      'Get Class Name ID'
    );

    if (this.ctx.cache) {
      this.ctx.cache.set(cacheKey, classNameId);
    }

    return classNameId;
  }

  async createWebContentStructure(config, siteId, structureData = {}) {
    const {
      structureKey,
      name,
      description = '',
      fields,
      definition,
    } = structureData;
    const lang = config.languageId || 'en_US';

    const classNameId = await this.getClassNameId(
      config,
      'com.liferay.journal.model.JournalArticle'
    );

    let finalDefinition;
    if (typeof definition === 'string') {
      finalDefinition = definition;
    } else if (definition && typeof definition === 'object') {
      if (definition.fields) {
        finalDefinition = JSON.stringify(definition);
      } else if (Array.isArray(definition)) {
        finalDefinition = JSON.stringify(
          this._buildDDMFormDefinition(definition, lang)
        );
      } else {
        finalDefinition = JSON.stringify(definition);
      }
    } else if (Array.isArray(fields)) {
      finalDefinition = JSON.stringify(
        this._buildDDMFormDefinition(fields, lang)
      );
    } else {
      throw new Error(
        'WebContentStructure definition or fields must be provided'
      );
    }

    const nameMap = typeof name === 'string' ? { [lang]: name } : name || {};
    const descriptionMap =
      typeof description === 'string'
        ? { [lang]: description }
        : description || {};

    const key = structureKey || `ddm-structure-${Date.now()}`;

    const payload = {
      groupId: String(siteId),
      parentStructureId: '0',
      classNameId: String(classNameId),
      structureKey: key,
      nameMap: JSON.stringify(nameMap),
      descriptionMap: JSON.stringify(descriptionMap),
      definition: finalDefinition,
      storageType: 'json',
      type: '0',
      serviceContext: '{}',
    };

    const result = await this.httpCore._post(
      config,
      '/api/jsonws/ddm.ddmstructure/add-structure',
      payload,
      'add-ddm-structure',
      'Add DDM Structure'
    );

    return this._normalizeDDMStructureToContentStructure(result, lang);
  }

  _buildDDMFormDefinition(fields, lang = 'en_US') {
    const ddmFormFields = fields.map((f) => {
      if (f.dataType && f.type && f.name) {
        return f;
      }

      const fieldName = f.name;
      const fieldType = f.type || 'text';
      const dataType = f.dataType || this._mapFieldTypeToDataType(fieldType);

      const localizedLabel =
        typeof f.label === 'string'
          ? { [lang]: f.label }
          : f.label || { [lang]: fieldName };
      const localizedPredefinedValue =
        typeof f.predefinedValue === 'string'
          ? { [lang]: f.predefinedValue }
          : f.predefinedValue;

      const baseField = {
        dataType,
        indexType: f.indexType || 'keyword',
        localizable: f.localizable !== undefined ? f.localizable : true,
        multiple: f.multiple !== undefined ? f.multiple : false,
        name: fieldName,
        readOnly: f.readOnly !== undefined ? f.readOnly : false,
        repeatable: f.repeatable !== undefined ? f.repeatable : false,
        required: f.required !== undefined ? f.required : false,
        showLabel: f.showLabel !== undefined ? f.showLabel : true,
        type: fieldType,
        label: localizedLabel,
      };

      if (localizedPredefinedValue) {
        baseField.predefinedValue = localizedPredefinedValue;
      }

      if (f.options) {
        baseField.options = f.options.map((opt) => ({
          label:
            typeof opt.label === 'string'
              ? { [lang]: opt.label }
              : opt.label || {},
          value: opt.value || '',
        }));
      }

      if (f.nestedFields) {
        baseField.nestedDDMFormFields = this._buildDDMFormDefinition(
          f.nestedFields,
          lang
        ).fields;
      }

      return baseField;
    });

    return {
      availableLanguageIds: [lang],
      defaultLanguageId: lang,
      fields: ddmFormFields,
    };
  }

  _mapFieldTypeToDataType(type) {
    switch (type) {
      case 'text':
      case 'textarea':
      case 'select':
      case 'radio':
        return 'string';
      case 'boolean':
      case 'checkbox':
        return 'boolean';
      case 'integer':
      case 'number':
        return 'integer';
      case 'decimal':
      case 'float':
      case 'double':
        return 'double';
      case 'date':
        return 'date';
      case 'document':
      case 'image':
        return 'document-library';
      default:
        return 'string';
    }
  }

  _normalizeDDMStructureToContentStructure(ddmStructure, lang = 'en_US') {
    if (!ddmStructure) return null;

    let definitionObj = {};
    try {
      if (typeof ddmStructure.definition === 'string') {
        definitionObj = JSON.parse(ddmStructure.definition);
      } else if (
        ddmStructure.definition &&
        typeof ddmStructure.definition === 'object'
      ) {
        definitionObj = ddmStructure.definition;
      }
    } catch (err) {
      this.ctx.logger.warn(
        `Failed to parse DDM structure definition: ${err.message}`
      );
    }

    let nameMap;
    let descriptionMap;
    try {
      nameMap =
        typeof ddmStructure.nameMap === 'string'
          ? JSON.parse(ddmStructure.nameMap)
          : ddmStructure.nameMap || {};
    } catch {
      nameMap = { [lang]: ddmStructure.name || '' };
    }

    try {
      descriptionMap =
        typeof ddmStructure.descriptionMap === 'string'
          ? JSON.parse(ddmStructure.descriptionMap)
          : ddmStructure.descriptionMap || {};
    } catch {
      descriptionMap = { [lang]: ddmStructure.description || '' };
    }

    const fields = Array.isArray(definitionObj.fields)
      ? definitionObj.fields.map((f) =>
          this._normalizeDDMFieldToContentStructureField(f, lang)
        )
      : [];

    return {
      id: ddmStructure.structureId,
      siteId: ddmStructure.groupId,
      name:
        nameMap[lang] ||
        nameMap[Object.keys(nameMap)[0]] ||
        ddmStructure.name ||
        '',
      name_i18n: nameMap,
      description:
        descriptionMap[lang] ||
        descriptionMap[Object.keys(descriptionMap)[0]] ||
        ddmStructure.description ||
        '',
      description_i18n: descriptionMap,
      contentStructureFields: fields,
      structureKey: ddmStructure.structureKey,
      xClassName: 'com.liferay.headless.delivery.dto.v1_0.ContentStructure',
    };
  }

  _normalizeDDMFieldToContentStructureField(field, lang = 'en_US') {
    if (!field) return null;

    const labelMap = field.label || {};
    const predefinedValueMap = field.predefinedValue || {};

    const fieldOptions = Array.isArray(field.options)
      ? field.options.map((opt) => ({
          label:
            opt.label?.[lang] ||
            opt.label?.[Object.keys(opt.label || {})[0]] ||
            '',
          value: opt.value || '',
        }))
      : undefined;

    const nestedFields = Array.isArray(field.nestedDDMFormFields)
      ? field.nestedDDMFormFields.map((f) =>
          this._normalizeDDMFieldToContentStructureField(f, lang)
        )
      : undefined;

    return {
      dataType: field.dataType || 'string',
      inputControl: field.type || 'text',
      label:
        labelMap[lang] ||
        labelMap[Object.keys(labelMap || {})[0]] ||
        field.name ||
        '',
      label_i18n: labelMap,
      localizable: field.localizable !== undefined ? field.localizable : true,
      multiple: field.multiple !== undefined ? field.multiple : false,
      name: field.name,
      options: fieldOptions,
      predefinedValue:
        predefinedValueMap[lang] ||
        predefinedValueMap[Object.keys(predefinedValueMap || {})[0]] ||
        '',
      predefinedValue_i18n: predefinedValueMap,
      repeatable: field.repeatable !== undefined ? field.repeatable : false,
      required: field.required !== undefined ? field.required : false,
      showLabel: field.showLabel !== undefined ? field.showLabel : true,
      nestedContentStructureFields: nestedFields,
    };
  }
}

LiferayRestService.SOFT_STATUS_BY_OP = SOFT_STATUS_BY_OP;

module.exports = LiferayRestService;
