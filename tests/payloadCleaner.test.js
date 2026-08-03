import { describe, it, expect } from 'vitest';
const { deepCleanIds } = require('../src/utils/payload-cleaner.cjs');

describe('payload-cleaner', () => {
  it('should remove the root id field', () => {
    const input = { id: 123, name: 'Test' };
    const output = deepCleanIds(input);
    expect(output).toEqual({ name: 'Test' });
    expect(output.id).toBeUndefined();
  });

  it('should remove placeholder relational IDs', () => {
    const input = {
      productId: 0,
      skuId: 45000, // Mock range
      accountId: 15000, // Mock range
      priceListId: null,
      name: 'Test Product',
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({ name: 'Test Product' });
  });

  it('should keep resolved relational IDs', () => {
    const input = {
      productId: 70001, // Outside mock range
      skuId: 80002, // Outside mock range
      name: 'Test Product',
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({
      productId: 70001,
      skuId: 80002,
      name: 'Test Product',
    });
  });

  it('should recursively clean nested objects', () => {
    const input = {
      name: 'Product',
      skus: [
        { id: 40001, sku: 'S1', productId: 0 },
        { id: 40002, sku: 'S2', productId: 70001 },
      ],
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({
      name: 'Product',
      skus: [{ sku: 'S1' }, { sku: 'S2', productId: 70001 }],
    });
  });

  it('should remove empty nested objects resulting from cleaning', () => {
    const input = {
      name: 'Product',
      sku: { id: 40000 },
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({ name: 'Product' });
    expect(output.sku).toBeUndefined();
  });

  it('should return primitive inputs unchanged', () => {
    expect(deepCleanIds('string')).toBe('string');
    expect(deepCleanIds(123)).toBe(123);
    expect(deepCleanIds(null)).toBeNull();
    expect(deepCleanIds(undefined)).toBeUndefined();
  });

  it('should remove externalReferenceCode from nested sku object in price entry payload if skuExternalReferenceCode is present', () => {
    const input = {
      skuExternalReferenceCode: 'SKU-ERC-123',
      sku: {
        externalReferenceCode: 'SKU-ERC-123',
        otherProp: 'keep',
      },
    };
    const output = deepCleanIds(input);
    expect(output.skuExternalReferenceCode).toBe('SKU-ERC-123');
    expect(output.sku).toEqual({ otherProp: 'keep' });
  });

  it('should NOT strip addressId/priceListId values that merely fall within a mock account/product/SKU range', () => {
    const input = {
      addressId: 15000, // Within the "Mock Accounts" range, but addressId has no mock range
      priceListId: 45000, // Within the "Mock SKUs/Variants" range, but priceListId has no mock range
      defaultBillingAddressId: 35000, // Within the "Mock Products" range, but has no mock range
      defaultShippingAddressId: 12000, // Within the "Mock Accounts" range, but has no mock range
      name: 'Resolved Entity',
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({
      addressId: 15000,
      priceListId: 45000,
      defaultBillingAddressId: 35000,
      defaultShippingAddressId: 12000,
      name: 'Resolved Entity',
    });
  });

  it('should still treat 0/null/undefined as placeholders for addressId/priceListId even without a mock range', () => {
    const input = {
      addressId: 0,
      priceListId: null,
      defaultBillingAddressId: undefined,
      name: 'Test',
    };
    const output = deepCleanIds(input);
    expect(output).toEqual({ name: 'Test' });
  });

  it("should not mutate the caller's original input object when cleaning a nested sku.externalReferenceCode", () => {
    const input = {
      skuExternalReferenceCode: 'SKU-ERC-123',
      sku: {
        externalReferenceCode: 'SKU-ERC-123',
        otherProp: 'keep',
      },
    };
    const originalSkuRef = input.sku;

    deepCleanIds(input);

    // The original object passed in must remain untouched.
    expect(input.sku.externalReferenceCode).toBe('SKU-ERC-123');
    expect(originalSkuRef.externalReferenceCode).toBe('SKU-ERC-123');
    expect(input.sku).toEqual({
      externalReferenceCode: 'SKU-ERC-123',
      otherProp: 'keep',
    });
  });
});
