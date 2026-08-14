/**
 * Maps Liferay API URL patterns to their authoritative OpenAPI schemas.
 */
const CONTRACT_MAPPINGS = [
  // --- OUTBOUND & BATCH CONTRACTS ---
  {
    pattern: /\/o\/headless-commerce-admin-catalog\/v1\.0\/products\/batch/,
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Product',
    isBatch: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-catalog\/v1\.0\/products/,
    method: 'POST',
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Product',
  },
  {
    pattern: /\/o\/headless-admin-user\/v1\.0\/accounts\/batch/,
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'Account',
    isBatch: true,
  },
  {
    pattern: /\/o\/headless-admin-user\/v1\.0\/accounts/,
    method: 'POST',
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'Account',
  },
  {
    pattern: /\/o\/headless-commerce-admin-inventory\/v1\.0\/warehouses\/batch/,
    spec: 'headless-commerce-admin-inventory-v1.0-openapi.json',
    schema: 'Warehouse',
    isBatch: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-inventory\/v1\.0\/warehouses/,
    method: 'POST',
    spec: 'headless-commerce-admin-inventory-v1.0-openapi.json',
    schema: 'Warehouse',
  },
  {
    pattern: /\/o\/headless-commerce-admin-channel\/v1\.0\/channels\/batch/,
    spec: 'headless-commerce-admin-channel-v1.0-openapi.json',
    schema: 'Channel',
    isBatch: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-channel\/v1\.0\/channels/,
    method: 'POST',
    spec: 'headless-commerce-admin-channel-v1.0-openapi.json',
    schema: 'Channel',
  },
  {
    pattern: /\/o\/headless-commerce-admin-pricing\/v2\.0\/price-lists\/batch/,
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceList',
    isBatch: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-pricing\/v2\.0\/price-lists/,
    method: 'POST',
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceList',
  },
  {
    pattern:
      /\/o\/headless-commerce-admin-pricing\/v2\.0\/price-entries\/batch/,
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceEntry',
    isBatch: true,
  },
  {
    pattern:
      /\/o\/headless-commerce-admin-catalog\/v1\.0\/products\/\d+\/productOptions/,
    method: 'POST',
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'ProductOption',
    isArray: true,
  },

  // --- INBOUND RESPONSE CONTRACTS (GET) ---
  {
    pattern:
      /\/o\/headless-commerce-admin-catalog\/v1\.0\/products\/[a-zA-Z0-9-]+$/,
    method: 'GET',
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Product',
    isInbound: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-catalog\/v1\.0\/products$/,
    method: 'GET',
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Product',
    isInbound: true,
    isPage: true,
  },
  {
    pattern: /\/o\/headless-admin-user\/v1\.0\/accounts\/[a-zA-Z0-9-]+$/,
    method: 'GET',
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'Account',
    isInbound: true,
  },
  {
    pattern: /\/o\/headless-admin-user\/v1\.0\/accounts$/,
    method: 'GET',
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'Account',
    isInbound: true,
    isPage: true,
  },
  {
    pattern:
      /\/o\/headless-commerce-admin-pricing\/v2\.0\/price-lists\/[a-zA-Z0-9-]+$/,
    method: 'GET',
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceList',
    isInbound: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-pricing\/v2\.0\/price-lists$/,
    method: 'GET',
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceList',
    isInbound: true,
    isPage: true,
  },
  {
    pattern:
      /\/o\/headless-commerce-admin-channel\/v1\.0\/channels\/[a-zA-Z0-9-]+$/,
    method: 'GET',
    spec: 'headless-commerce-admin-channel-v1.0-openapi.json',
    schema: 'Channel',
    isInbound: true,
  },
  {
    pattern: /\/o\/headless-commerce-admin-channel\/v1\.0\/channels$/,
    method: 'GET',
    spec: 'headless-commerce-admin-channel-v1.0-openapi.json',
    schema: 'Channel',
    isInbound: true,
    isPage: true,
  },
];

/**
 * Maps workflow entity types / step keys to their authoritative OpenAPI
 * schemas. Batch import failures are reported per entity rather than per URL,
 * so a URL pattern is not always available to correlate against - see
 * `SchemaCorrelationService`.
 *
 * Keys are canonical, singular, lower-case and letters only.
 */
const ENTITY_CONTRACTS = {
  account: {
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'Account',
  },
  address: {
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'PostalAddress',
  },
  postaladdress: {
    spec: 'headless-admin-user-v1.0-openapi.json',
    schema: 'PostalAddress',
  },
  channel: {
    spec: 'headless-commerce-admin-channel-v1.0-openapi.json',
    schema: 'Channel',
  },
  inventory: {
    spec: 'headless-commerce-admin-inventory-v1.0-openapi.json',
    schema: 'WarehouseItem',
  },
  order: {
    spec: 'headless-commerce-admin-order-v1.0-openapi.json',
    schema: 'Order',
  },
  // The workflow's 'options' step links product options, so its payload items
  // are ProductOption instances rather than standalone catalog Options.
  option: {
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'ProductOption',
  },
  productoption: {
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'ProductOption',
  },
  priceentry: {
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceEntry',
  },
  pricelist: {
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'PriceList',
  },
  product: {
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Product',
  },
  sku: {
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'Sku',
  },
  specification: {
    spec: 'headless-commerce-admin-catalog-v1.0-openapi.json',
    schema: 'ProductSpecification',
  },
  tierprice: {
    spec: 'headless-commerce-admin-pricing-v2.0-openapi.json',
    schema: 'TierPrice',
  },
  warehouse: {
    spec: 'headless-commerce-admin-inventory-v1.0-openapi.json',
    schema: 'Warehouse',
  },
  warehouseitem: {
    spec: 'headless-commerce-admin-inventory-v1.0-openapi.json',
    schema: 'WarehouseItem',
  },
};

/**
 * Finds a matching contract for a given URL and method.
 */
function findContract(url, method = 'GET') {
  return CONTRACT_MAPPINGS.find((m) => {
    const urlMatch = m.pattern.test(url);
    if (!urlMatch) return false;
    if (m.method && m.method !== method) return false;
    return true;
  });
}

/**
 * Normalizes a value into the singular/plural key candidates used to look up
 * ENTITY_CONTRACTS (e.g. 'priceLists' -> ['pricelists', 'pricelist']).
 */
function entityKeyCandidates(value) {
  const normalized = String(value)
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  const candidates = [normalized];
  if (normalized.endsWith('es')) candidates.push(normalized.slice(0, -2));
  if (normalized.endsWith('s')) candidates.push(normalized.slice(0, -1));
  return candidates;
}

/**
 * Resolves the authoritative contract for a workflow entity type or step key.
 * Accepts normalized entity types ('products', 'priceLists') as well as raw
 * step keys ('create-product-skus'), which are resolved right-to-left so the
 * most specific trailing entity wins.
 *
 * @param {string} entityType entity type or step key
 * @returns {{spec: string, schema: string, entity: string}|null}
 */
function findContractByEntityType(entityType) {
  if (!entityType) return null;

  const segments = String(entityType)
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  const attempts = [entityType, ...segments.reverse()];

  for (const attempt of attempts) {
    for (const candidate of entityKeyCandidates(attempt)) {
      if (ENTITY_CONTRACTS[candidate]) {
        return { ...ENTITY_CONTRACTS[candidate], entity: candidate };
      }
    }
  }

  return null;
}

module.exports = { findContract, findContractByEntityType, ENTITY_CONTRACTS };
