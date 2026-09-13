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

/**
 * What an exclusion entry may carry, and what each field is compared against.
 *
 * This does **not** vary by key. Every reader that filters by exclusions -
 * accounts, products, warehouses, price lists, promotions, orders,
 * specifications, options, option categories - routes through the one matcher,
 * `LiferayService._shouldExclude`, so one item shape covers all nine lists.
 * An entry needs at least one of these fields; entries are OR-ed, and so are
 * the fields within an entry.
 *
 * Exported because it is the part a consumer cannot derive from the key names,
 * and the part most likely to be guessed at (#254).
 *
 * Two limits worth knowing, because both fail silently:
 *
 *   - **`key` is not matchable.** Liferay identifies options and
 *     specifications by `key`, and nothing here compares it. An entry naming
 *     one of those by its key excludes nothing, and says nothing.
 *   - `entityId` is compared as a string against `id` and `productId`, so a
 *     numeric id and its string form both match, but a `sku` or a `uuid` does
 *     not.
 */
const EXCLUSION_ITEM_FIELDS = Object.freeze({
  entityId: Object.freeze({
    matchedAgainst: Object.freeze(['id', 'productId']),
    comparison: 'string-coerced',
  }),
  erc: Object.freeze({
    matchedAgainst: Object.freeze(['externalReferenceCode']),
    comparison: 'strict',
  }),
  name: Object.freeze({
    // The i18n case is why a specification or an order without a `name` is
    // still excludable: `title` is compared too, and a localised `name` object
    // matches on any of its values.
    matchedAgainst: Object.freeze(['name', 'title', 'name[locale]']),
    comparison: 'strict',
  }),
});

/**
 * A JSON Schema for the whole exclude-lists object, derived from the
 * declaration above.
 *
 * For a consumer validating the configuration as raw JSON. Generating it here
 * removes the third hand-maintained copy of this list: the SDK decides the
 * keys and the item shape, so a settings panel should not restate either.
 *
 * `required` defaults to **empty, deliberately**. Deriving it from the nine
 * keys would fail every configuration saved before a key existed - an operator
 * who has never heard of `excludedAccountGroups` should not have their saved
 * object rejected for lacking it. Supply `required` explicitly if a caller
 * genuinely wants enforcement.
 *
 * @param {object} [options]
 * @param {Array<string>} [options.required] Keys to mark required; none by
 *   default.
 * @returns {object} A JSON Schema (draft-07 compatible) for the object.
 */
function excludeListsJsonSchema({ required = [] } = {}) {
  const item = {
    type: 'object',
    properties: Object.fromEntries(
      Object.keys(EXCLUSION_ITEM_FIELDS).map((field) => [
        field,
        { type: 'string' },
      ])
    ),
    anyOf: Object.keys(EXCLUSION_ITEM_FIELDS).map((field) => ({
      required: [field],
    })),
    additionalProperties: true,
  };

  return {
    type: 'object',
    properties: Object.fromEntries(
      EXCLUSION_KEYS.map((key) => [key, { type: 'array', items: item }])
    ),
    required: [...required],
    additionalProperties: true,
  };
}

module.exports = {
  EXCLUSION_KEY_BY_ENTITY,
  EXCLUSION_KEYS,
  EXCLUSION_ITEM_FIELDS,
  emptyExcludeLists,
  excludeListsJsonSchema,
  exclusionKeyFor,
};
