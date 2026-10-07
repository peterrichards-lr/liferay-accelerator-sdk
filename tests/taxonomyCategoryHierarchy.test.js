import { vi, describe, it, expect, beforeEach } from 'vitest';

const RestService = require('../src/liferay/rest.cjs');
const TaxonomyService = require('../src/liferay/services/TaxonomyService.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');

/**
 * A child taxonomy category is created under its PARENT, not its vocabulary.
 *
 * The vocabulary-scoped endpoint creates top-level categories and ignores a
 * parent supplied in the body, so a hierarchy built through it comes back
 * flat — silently, which is the part worth guarding. Liferay's nested endpoint
 * `/taxonomy-categories/{parentId}/taxonomy-categories` is the only one that
 * accepts a child, and it carries the vocabulary down from the parent.
 *
 * See liferay-ai-commerce-accelerator#1204.
 */
describe('taxonomy categories, nested and flat', () => {
  let rest;
  let posted;

  beforeEach(() => {
    posted = [];
    rest = Object.create(RestService.prototype);
    rest.httpCore = {
      _post: vi.fn(async (config, path, payload, op) => {
        posted.push({ config, path, payload, op });
        return { id: 999 };
      }),
    };
  });

  it('posts to the vocabulary when there is no parent', async () => {
    await rest.createTaxonomyCategory({}, 'vocab-1', { name: 'Outdoor' });

    expect(posted).toHaveLength(1);
    expect(posted[0].path).toBe(PATH.TAXONOMY_CATEGORIES('vocab-1'));
    expect(posted[0].path).toContain('taxonomy-vocabularies/vocab-1');
  });

  it('posts under the parent when there is one', async () => {
    await rest.createTaxonomyCategory({}, 'vocab-1', { name: 'Tents' }, 42);

    expect(posted).toHaveLength(1);
    expect(posted[0].path).toBe(PATH.TAXONOMY_CATEGORY_CHILDREN(42));
    expect(posted[0].path).toContain(
      'taxonomy-categories/42/taxonomy-categories'
    );
  });

  it('does not mention the vocabulary on the nested path', async () => {
    // The parent already determines it. Sending it too would be the caller
    // asserting something the server knows and could contradict.
    await rest.createTaxonomyCategory({}, 'vocab-1', { name: 'Tents' }, 42);

    expect(posted[0].path).not.toContain('vocab-1');
    expect(posted[0].path).not.toContain('taxonomy-vocabularies');
  });

  it('distinguishes the two operations for diagnostics', async () => {
    await rest.createTaxonomyCategory({}, 'v', { name: 'A' });
    await rest.createTaxonomyCategory({}, 'v', { name: 'B' }, 7);

    expect(posted[0].op).toBe('create-taxonomy-category');
    expect(posted[1].op).toBe('create-taxonomy-category-child');
  });

  it('treats a null, undefined or 0 parent as no parent', async () => {
    // 0 is not a valid Liferay id, and a falsy parent must not silently build
    // `/taxonomy-categories/0/...` — that would 404 at runtime rather than
    // falling back to the behaviour every existing caller relies on.
    for (const parent of [null, undefined, 0]) {
      posted = [];
      await rest.createTaxonomyCategory({}, 'vocab-1', { name: 'X' }, parent);
      expect(posted[0].path).toBe(PATH.TAXONOMY_CATEGORIES('vocab-1'));
    }
  });

  it('is reachable through TaxonomyService, parent and all', async () => {
    const service = new TaxonomyService({
      rest: {
        createTaxonomyCategory: vi.fn(async (...args) => args),
      },
    });

    const args = await service.createTaxonomyCategory(
      { c: 1 },
      'vocab-1',
      { name: 'Tents' },
      42
    );

    expect(args).toEqual([{ c: 1 }, 'vocab-1', { name: 'Tents' }, 42]);
  });

  it('keeps working for a three-argument caller', async () => {
    // Every existing call site passes three. Additive means additive.
    const service = new TaxonomyService({
      rest: {
        createTaxonomyCategory: vi.fn(async (...args) => args),
      },
    });

    const args = await service.createTaxonomyCategory({}, 'vocab-1', {
      name: 'Outdoor',
    });

    expect(args[3]).toBeNull();
  });
});
