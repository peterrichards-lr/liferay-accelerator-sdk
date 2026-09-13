import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  EXCLUSION_KEY_BY_ENTITY,
  EXCLUSION_KEYS,
  emptyExcludeLists,
  exclusionKeyFor,
} = require('../src/utils/exclusionKeys.cjs');
const sdk = require('../src/index.js');

/**
 * The declaration is the authority a consumer generates its configuration from
 * (#254). These assertions are about that contract holding, not about the
 * particular names - a name changing is a decision, a name disagreeing with
 * itself across the three accessors is a defect.
 */
describe('exclusion key declaration', () => {
  it('is exported from the package entry, at the top level and under utils', () => {
    expect(sdk.EXCLUSION_KEY_BY_ENTITY).toBe(EXCLUSION_KEY_BY_ENTITY);
    expect(sdk.utils.EXCLUSION_KEYS).toBe(EXCLUSION_KEYS);
    expect(typeof sdk.emptyExcludeLists).toBe('function');
  });

  it('is frozen, so a consumer cannot mutate the authority', () => {
    expect(Object.isFrozen(EXCLUSION_KEY_BY_ENTITY)).toBe(true);
    expect(Object.isFrozen(EXCLUSION_KEYS)).toBe(true);
  });

  it('lists every key exactly once, though entities may share one', () => {
    const entities = Object.keys(EXCLUSION_KEY_BY_ENTITY);
    expect(entities.length).toBeGreaterThan(EXCLUSION_KEYS.length);
    expect(new Set(EXCLUSION_KEYS).size).toBe(EXCLUSION_KEYS.length);
    expect([...new Set(Object.values(EXCLUSION_KEY_BY_ENTITY))].sort()).toEqual(
      [...EXCLUSION_KEYS].sort()
    );
  });

  it('shares one key between price lists and promotions, deliberately', () => {
    expect(exclusionKeyFor('promotion')).toBe(exclusionKeyFor('priceList'));
  });

  it('resolves a mapped entity and refuses an unmapped one', () => {
    expect(exclusionKeyFor('account-group')).toBe('excludedAccountGroups');
    expect(exclusionKeyFor('sprocket')).toBeUndefined();
    // Not inherited from Object.prototype.
    expect(exclusionKeyFor('constructor')).toBeUndefined();
    expect(exclusionKeyFor('toString')).toBeUndefined();
  });

  it('defaults every declared key to an empty list', () => {
    const defaults = emptyExcludeLists();

    expect(Object.keys(defaults).sort()).toEqual([...EXCLUSION_KEYS].sort());
    expect(Object.values(defaults).every((v) => Array.isArray(v))).toBe(true);
    expect(Object.values(defaults).every((v) => v.length === 0)).toBe(true);
  });

  it('hands back a fresh object each time, so one consumer cannot poison another', () => {
    const first = emptyExcludeLists();
    first.excludedAccounts.push({ name: 'mutated' });

    expect(emptyExcludeLists().excludedAccounts).toEqual([]);
  });

  it('covers every entity the delete path can be given', () => {
    // deleteByFilter passes these names through to _getExclusions; an entity
    // it can delete but cannot map is the #245 defect exactly.
    for (const entity of [
      'account',
      'account-group',
      'product',
      'warehouse',
      'priceList',
      'promotion',
      'order',
      'specification',
      'option',
      'optionCategory',
    ]) {
      expect(exclusionKeyFor(entity)).toBeTruthy();
    }
  });
});
