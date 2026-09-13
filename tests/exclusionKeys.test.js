import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  EXCLUSION_KEY_BY_ENTITY,
  EXCLUSION_KEYS,
  EXCLUSION_ITEM_FIELDS,
  emptyExcludeLists,
  excludeListsJsonSchema,
  exclusionKeyFor,
} = require('../src/utils/exclusionKeys.cjs');
const sdk = require('../src/index.js');
const { LiferayService } = require('../src/liferay/index.cjs');

/** The matcher, called without a service - it reads no instance state. */
const matches = (item, entry) =>
  LiferayService.prototype._shouldExclude.call({}, item, [entry]);

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

  describe('the item shape, and the matcher it describes', () => {
    it('does not vary by key - one matcher serves every list', () => {
      // Every reader routes through _shouldExclude, so a consumer generating a
      // schema needs one item shape, not nine.
      expect(Object.keys(EXCLUSION_ITEM_FIELDS).sort()).toEqual([
        'entityId',
        'erc',
        'name',
      ]);
    });

    it('matches each declared field the way the declaration says it does', () => {
      expect(matches({ id: 42 }, { entityId: '42' })).toBe(true);
      expect(matches({ productId: 42 }, { entityId: 42 })).toBe(true);
      expect(matches({ externalReferenceCode: 'A-1' }, { erc: 'A-1' })).toBe(
        true
      );
      expect(matches({ name: 'Widget' }, { name: 'Widget' })).toBe(true);
      expect(matches({ title: 'Widget' }, { name: 'Widget' })).toBe(true);
      expect(
        matches(
          { name: { en_US: 'Widget', fr_FR: 'Machin' } },
          { name: 'Machin' }
        )
      ).toBe(true);
    });

    it('declares nothing it cannot match, and matches nothing it does not declare', () => {
      // The fields the matcher reads off an entry, taken from the declaration -
      // if _shouldExclude grows a fourth, this test does not notice, but the
      // reverse (a declared field that matches nothing) is caught below.
      for (const field of Object.keys(EXCLUSION_ITEM_FIELDS)) {
        const spec = EXCLUSION_ITEM_FIELDS[field];
        const probe = spec.matchedAgainst[0].replace(/\[locale\]$/, '');
        expect(
          matches({ [probe]: 'probe-value' }, { [field]: 'probe-value' })
        ).toBe(true);
      }
    });

    it('does not match on key, which is how options and specifications are named', () => {
      // Documented in the declaration because it fails silently: an operator
      // naming an option by its key excludes nothing and is told nothing.
      expect(matches({ key: 'SIZE' }, { name: 'SIZE' })).toBe(false);
      expect(matches({ key: 'SIZE' }, { entityId: 'SIZE' })).toBe(false);
      expect(matches({ key: 'SIZE' }, { erc: 'SIZE' })).toBe(false);
    });

    it('leaves an item alone when no field matches', () => {
      expect(matches({ id: 1, name: 'Keep' }, { name: 'Drop' })).toBe(false);
    });
  });

  describe('the derived JSON Schema', () => {
    it('has a property per distinct key and no required keys by default', () => {
      const schema = excludeListsJsonSchema();

      expect(Object.keys(schema.properties).sort()).toEqual(
        [...EXCLUSION_KEYS].sort()
      );
      // Deriving `required` from the keys would reject every configuration
      // saved before a key existed - that is a migration hazard, not
      // enforcement.
      expect(schema.required).toEqual([]);
    });

    it('honours required when a caller asks for it explicitly', () => {
      const schema = excludeListsJsonSchema({
        required: ['excludedAccounts'],
      });

      expect(schema.required).toEqual(['excludedAccounts']);
      expect(excludeListsJsonSchema().required).toEqual([]);
    });

    it('requires at least one identifier on an entry', () => {
      const item = excludeListsJsonSchema().properties.excludedAccounts.items;

      expect(item.anyOf).toEqual(
        Object.keys(EXCLUSION_ITEM_FIELDS).map((f) => ({ required: [f] }))
      );
    });

    it('accepts the shape emptyExcludeLists produces', () => {
      const schema = excludeListsJsonSchema();

      for (const key of Object.keys(emptyExcludeLists())) {
        expect(schema.properties[key]).toBeDefined();
      }
    });
  });
});
