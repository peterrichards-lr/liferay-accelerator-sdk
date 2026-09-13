/**
 * The exclusion list each entity is filtered by, and the keys a configuration
 * service is expected to supply.
 *
 * This is the **authority**. The SDK decides which key it reads for which
 * entity, so a consumer that writes its own copy - a config-UI schema, a set of
 * service defaults, seeded batch data - is restating a decision made here and
 * will eventually restate it wrongly. That has already happened twice: price
 * lists drifted between the three copies, and `account-group` was missing from
 * this map entirely, so exclusions never applied to account groups and
 * `deleteAccountGroupsBatch` deleted ones an operator had named (#245).
 *
 * It lives in its own module, and is exported from the package entry, so a
 * consumer can generate its configuration surface from the declaration instead
 * of maintaining a third copy (#254).
 */

/**
 * Entity name, as passed to `_getExclusions` and `deleteByFilter`, to the
 * property holding its exclusion list.
 *
 * Promotions deliberately share the price list key: Liferay models a promotion
 * as a price list, and the exclude list follows the data rather than the label.
 */
const EXCLUSION_KEY_BY_ENTITY = Object.freeze({
  account: 'excludedAccounts',
  'account-group': 'excludedAccountGroups',
  product: 'excludedProducts',
  warehouse: 'excludedWarehouses',
  priceList: 'excludedPriceLists',
  promotion: 'excludedPriceLists',
  order: 'excludedOrders',
  specification: 'excludedSpecifications',
  option: 'excludedOptions',
  optionCategory: 'excludedOptionCategories',
});

/**
 * Every distinct key, in declaration order.
 *
 * Distinct rather than one per entity, because promotions and price lists share
 * one. A consumer generating a form or a defaults object wants this, not the
 * map - ten entities, nine keys.
 */
const EXCLUSION_KEYS = Object.freeze([
  ...new Set(Object.values(EXCLUSION_KEY_BY_ENTITY)),
]);

/**
 * An exclude-lists object with every declared key present and empty.
 *
 * The shape a configuration service should default to, so that "no exclusions
 * configured" is expressed by an empty list rather than by an absent property -
 * which is the distinction #254 exists to make visible.
 *
 * @returns {Record<string, Array>} A fresh object; the caller may mutate it.
 */
function emptyExcludeLists() {
  return Object.fromEntries(EXCLUSION_KEYS.map((key) => [key, []]));
}

/**
 * The key an entity's exclusions are read from, or `undefined`.
 *
 * @param {string} entityName The entity being read.
 * @returns {string|undefined}
 */
function exclusionKeyFor(entityName) {
  return Object.prototype.hasOwnProperty.call(
    EXCLUSION_KEY_BY_ENTITY,
    entityName
  )
    ? EXCLUSION_KEY_BY_ENTITY[entityName]
    : undefined;
}

module.exports = {
  EXCLUSION_KEY_BY_ENTITY,
  EXCLUSION_KEYS,
  emptyExcludeLists,
  exclusionKeyFor,
};
