/**
 * GeneratedLiferayClient
 * DO NOT EDIT MANUALLY. USE "yarn generate".
 */

const DataEngineClient_v2_0 = require('./generated/dataEngineClient_v2_0.cjs');
const HeadlessAdminAddressClient_v1_0 = require('./generated/headlessAdminAddressClient_v1_0.cjs');
const HeadlessAdminListTypeClient_v1_0 = require('./generated/headlessAdminListTypeClient_v1_0.cjs');
const HeadlessAdminSiteClient_v1_0 = require('./generated/headlessAdminSiteClient_v1_0.cjs');
const HeadlessAdminTaxonomyClient_v1_0 = require('./generated/headlessAdminTaxonomyClient_v1_0.cjs');
const HeadlessAdminUserClient_v1_0 = require('./generated/headlessAdminUserClient_v1_0.cjs');
const HeadlessAdminWorkflowClient_v1_0 = require('./generated/headlessAdminWorkflowClient_v1_0.cjs');
const HeadlessBatchEngineClient_v1_0 = require('./generated/headlessBatchEngineClient_v1_0.cjs');
const HeadlessCommerceAdminCatalogClient_v1_0 = require('./generated/headlessCommerceAdminCatalogClient_v1_0.cjs');
const HeadlessCommerceAdminChannelClient_v1_0 = require('./generated/headlessCommerceAdminChannelClient_v1_0.cjs');
const HeadlessCommerceAdminInventoryClient_v1_0 = require('./generated/headlessCommerceAdminInventoryClient_v1_0.cjs');
const HeadlessCommerceAdminPricingClient_v1_0 = require('./generated/headlessCommerceAdminPricingClient_v1_0.cjs');
const HeadlessCommerceAdminPricingClient_v2_0 = require('./generated/headlessCommerceAdminPricingClient_v2_0.cjs');
const HeadlessDeliveryClient_v1_0 = require('./generated/headlessDeliveryClient_v1_0.cjs');
const ObjectAdminClient_v1_0 = require('./generated/objectAdminClient_v1_0.cjs');

class GeneratedLiferayClient {
  constructor(restService) {
    this.rest = restService;
    if (!this.dataEngine) this.dataEngine = {};
    this.dataEngine.v2_0 = new DataEngineClient_v2_0(restService);

    if (!this.headlessAdminAddress) this.headlessAdminAddress = {};
    this.headlessAdminAddress.v1_0 = new HeadlessAdminAddressClient_v1_0(
      restService
    );

    if (!this.headlessAdminListType) this.headlessAdminListType = {};
    this.headlessAdminListType.v1_0 = new HeadlessAdminListTypeClient_v1_0(
      restService
    );

    if (!this.headlessAdminSite) this.headlessAdminSite = {};
    this.headlessAdminSite.v1_0 = new HeadlessAdminSiteClient_v1_0(restService);

    if (!this.headlessAdminTaxonomy) this.headlessAdminTaxonomy = {};
    this.headlessAdminTaxonomy.v1_0 = new HeadlessAdminTaxonomyClient_v1_0(
      restService
    );

    if (!this.headlessAdminUser) this.headlessAdminUser = {};
    this.headlessAdminUser.v1_0 = new HeadlessAdminUserClient_v1_0(restService);

    if (!this.headlessAdminWorkflow) this.headlessAdminWorkflow = {};
    this.headlessAdminWorkflow.v1_0 = new HeadlessAdminWorkflowClient_v1_0(
      restService
    );

    if (!this.headlessBatchEngine) this.headlessBatchEngine = {};
    this.headlessBatchEngine.v1_0 = new HeadlessBatchEngineClient_v1_0(
      restService
    );

    if (!this.headlessCommerceAdminCatalog)
      this.headlessCommerceAdminCatalog = {};
    this.headlessCommerceAdminCatalog.v1_0 =
      new HeadlessCommerceAdminCatalogClient_v1_0(restService);

    if (!this.headlessCommerceAdminChannel)
      this.headlessCommerceAdminChannel = {};
    this.headlessCommerceAdminChannel.v1_0 =
      new HeadlessCommerceAdminChannelClient_v1_0(restService);

    if (!this.headlessCommerceAdminInventory)
      this.headlessCommerceAdminInventory = {};
    this.headlessCommerceAdminInventory.v1_0 =
      new HeadlessCommerceAdminInventoryClient_v1_0(restService);

    if (!this.headlessCommerceAdminPricing)
      this.headlessCommerceAdminPricing = {};
    this.headlessCommerceAdminPricing.v1_0 =
      new HeadlessCommerceAdminPricingClient_v1_0(restService);

    if (!this.headlessCommerceAdminPricing)
      this.headlessCommerceAdminPricing = {};
    this.headlessCommerceAdminPricing.v2_0 =
      new HeadlessCommerceAdminPricingClient_v2_0(restService);

    if (!this.headlessDelivery) this.headlessDelivery = {};
    this.headlessDelivery.v1_0 = new HeadlessDeliveryClient_v1_0(restService);

    if (!this.objectAdmin) this.objectAdmin = {};
    this.objectAdmin.v1_0 = new ObjectAdminClient_v1_0(restService);
  }
}

module.exports = GeneratedLiferayClient;
