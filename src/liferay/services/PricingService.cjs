const { asItems, asCount } = require('../../utils/liferayUtils.cjs');
const { delay, fromI18n } = require('../../utils/misc.cjs');
const { PATH } = require('../../utils/liferayPaths.cjs');
class PricingService {
  constructor(liferay) {
    this.liferay = liferay;
  }

  async getOrders(
    config,
    {
      pageSize: _pageSize = 200,
      fields: _fields = 'id',
      filter: providedFilter,
    } = {}
  ) {
    const exclusions = await this.liferay._getExclusions(config, 'order');
    const filters = [];
    if (providedFilter) filters.push(providedFilter);

    // REMOVAL: Do not use OData for name/status exclusions (unreliable)
    const filter = filters.length > 0 ? filters.join(' and ') : null;

    // Brute force discovery
    const { items } = await this.liferay._collectAllItems(
      config,
      (cfg, p, size) =>
        this.liferay.rest._get(
          cfg,
          PATH.ORDERS,
          'get-orders-bulk',
          'Get Orders Bulk',
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

  async getPriceLists(
    config,
    { catalogId, pageSize = 200, filter: providedFilter } = {}
  ) {
    // HARDENING: Pricing V2.0 GraphQL and REST filters are unstable in 2025.Q1.
    // Specifically, 'catalogId eq' triggers "Collection not allowed".
    // We permanently switch to Iterative REST Discovery with Memory Filtering.

    if (!catalogId && !providedFilter?.includes('catalogId')) {
      this.liferay.ctx.logger.info(
        'Performing multi-catalog price list discovery sweep...'
      );
      const allCatalogs = await this.liferay.getCatalogs(config);
      const allItems = [];
      for (const cat of allCatalogs) {
        try {
          const { items } = await this.liferay.rest.getPriceLists(config, {
            catalogId: cat.id,
            pageSize,
          });
          allItems.push(...items);
        } catch (err) {
          this.liferay.ctx.logger.warn(
            `Skipping price lists for catalog ${cat.id}: ${err.message}`
          );
        }
      }

      // Deduplicate and filter in memory
      const filteredItems = [
        ...new Map(allItems.map((i) => [i.id, i])).values(),
      ];
      return {
        items: filteredItems,
        totalCount: filteredItems.length,
      };
    }

    // Standard single-catalog fetch via REST but with MEMORY FILTERING
    // We fetch without the catalogId filter to avoid "Collection not allowed"
    const { items } = await this.liferay.rest.getPriceLists(config, {
      pageSize,
      filter: providedFilter,
    });
    const filteredItems = items.filter(
      (it) => !catalogId || Number(it.catalogId) === Number(catalogId)
    );
    return {
      items: filteredItems,
      totalCount: filteredItems.length,
    };
  }

  async getPromotions(config, args = {}) {
    // HARDENING: Switch to memory filtering for promotions to avoid OData issues
    const { items } = await this.liferay.getPriceLists(config, args);
    const filtered = items.filter((it) => it.type === 'promotion');
    return {
      items: filtered,
      totalCount: filtered.length,
    };
  }

  // --- Filtered Deletion Loop ---

  async deletePriceListsBatch(
    config,
    {
      pageSize = 200,
      filter,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'priceList',
      filter,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.PRICE_LISTS_BATCH,
      basePath: PATH.PRICE_LISTS,
      listUrl: PATH.PRICE_LISTS,
      op: 'pricelists:batch-delete',
      friendly: 'Delete price lists (batch)',
      items,
    });
  }

  async deletePromotionsBatch(
    config,
    {
      pageSize = 200,
      filter,
      callbackBatchERC,
      dryRun = false,
      sessionId,
      items,
    } = {}
  ) {
    return this.liferay.deleteByFilter(config, {
      entityName: 'promotion',
      filter,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.PRICE_LISTS_BATCH,
      basePath: PATH.PRICE_LISTS,
      listUrl: PATH.PRICE_LISTS,
      op: 'promotions:batch-delete',
      friendly: 'Delete promotions (batch)',
      items,
    });
  }

  async deleteOrdersBatch(
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
      entityName: 'order',
      filter,
      ids,
      pageSize,
      externalReferenceCode: callbackBatchERC,
      dryRun,
      sessionId,
      nativeBatch: false,
      path: PATH.ORDERS_BATCH,
      basePath: PATH.ORDERS,
      listUrl: PATH.ORDERS,
      op: 'orders:batch-delete',
      friendly: 'Delete orders (batch)',
      items,
    });
  }

  createOrdersBatch(config, ordersData, opts) {
    return this.liferay.rest.createOrdersBatch(config, ordersData, opts);
  }

  createOrder(config, orderData) {
    return this.liferay.rest.createOrder(config, orderData);
  }

  createPriceListAccountGroup(config, priceListERC, payload) {
    return this.liferay.rest.createPriceListAccountGroup(
      config,
      priceListERC,
      payload
    );
  }

  createPriceList(config, priceListData) {
    return this.liferay.rest.createPriceList(config, priceListData);
  }

  patchPriceList(config, priceListId, priceListData) {
    return this.liferay.rest.patchPriceList(config, priceListId, priceListData);
  }

  getPriceListByERC(config, externalReferenceCode) {
    return this.liferay.rest.getPriceListByERC(config, externalReferenceCode);
  }

  createPriceListsBatch(config, priceListsData, opts) {
    return this.liferay.rest.createPriceListsBatch(
      config,
      priceListsData,
      opts
    );
  }

  createPriceEntriesBatch(config, priceEntriesData, opts) {
    return this.liferay.rest.createPriceEntriesBatch(
      config,
      priceEntriesData,
      opts
    );
  }

  createPriceEntry(config, priceListId, priceEntryData) {
    return this.liferay.rest.createPriceEntry(
      config,
      priceListId,
      priceEntryData
    );
  }

  createSkuPriceEntry(config, priceListId, skuId, priceEntryData) {
    return this.liferay.rest.createSkuPriceEntry(
      config,
      priceListId,
      skuId,
      priceEntryData
    );
  }

  getPriceEntries(config, priceListId, opts) {
    return this.liferay.rest.getPriceEntries(config, priceListId, opts);
  }
}
module.exports = PricingService;
