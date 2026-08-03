/**
 * payload-cleaner.cjs
 * Hardened utility to ensure we NEVER send internal Liferay IDs
 * unless they were explicitly returned by Liferay (Resolved).
 */

function deepCleanIds(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCleanIds);
  }

  const cleaned = { ...obj };

  /**
   * Rule 1: Always remove the root 'id' field.
   * Root IDs are system-generated and should never be sent in an UPSERT.
   */
  if ('id' in cleaned) {
    delete cleaned.id;
  }

  /**
   * Rule 2: Never guess internal database IDs for relationships.
   * If an ID is a placeholder (0, null, or in a mock range),
   * it must be stripped to force Liferay to use the ERC.
   */
  const relationalIdFields = [
    'productId',
    'skuId',
    'accountId',
    'addressId',
    'priceListId',
    'defaultBillingAddressId',
    'defaultShippingAddressId',
  ];

  /**
   * Placeholder-ID ranges only apply to the specific mock-data fields they
   * were generated for. Fields like `addressId`/`priceListId` are resolved
   * from real Liferay entities and have no reserved mock range, so a
   * genuine ID that happens to fall in one of these bands must NOT be
   * stripped.
   */
  const mockRangeFieldsMap = {
    accountId: [[10000, 19999]], // Mock Accounts
    productId: [[30000, 39999]], // Mock Products
    skuId: [[40000, 59999]], // Mock SKUs/Variants
  };

  for (const key of relationalIdFields) {
    if (!(key in cleaned)) continue;

    const value = cleaned[key];
    const mockRanges = mockRangeFieldsMap[key] || [];

    // Check for "Non-Resolved" values
    const isPlaceholder =
      value === 0 ||
      value === null ||
      value === undefined ||
      (typeof value === 'number' &&
        mockRanges.some(([min, max]) => value >= min && value <= max));

    if (isPlaceholder) {
      delete cleaned[key];
    }
  }

  // Recurse into nested objects
  for (const key in cleaned) {
    if (Object.prototype.hasOwnProperty.call(cleaned, key)) {
      if (typeof cleaned[key] === 'object' && cleaned[key] !== null) {
        // Special case: Remove externalReferenceCode from nested 'sku' objects in PriceEntry payloads
        if (key === 'sku' && 'skuExternalReferenceCode' in cleaned) {
          // Clone before deleting so we never mutate the caller's original
          // nested object (cleaned[key] still references the same object
          // as obj[key] at this point, since only a shallow copy was made).
          cleaned[key] = { ...cleaned[key] };
          delete cleaned[key].externalReferenceCode;
        }

        cleaned[key] = deepCleanIds(cleaned[key]);

        // Final Safety: If a nested object like 'sku: { id: 40000 }' resulted
        // in an empty object 'sku: {}', remove the parent key entirely.
        if (
          Object.keys(cleaned[key]).length === 0 &&
          !Array.isArray(cleaned[key])
        ) {
          delete cleaned[key];
        }
      }
    }
  }

  return cleaned;
}

module.exports = { deepCleanIds };
