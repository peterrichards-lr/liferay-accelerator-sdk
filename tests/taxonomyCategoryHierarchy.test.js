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

describe('reading categories back with their structure', () => {
  /** Capture the query the SDK sends, without a network. */
  async function capturedQuery() {
    const GraphQLService = require('../src/liferay/graphql.cjs');
    const svc = Object.create(GraphQLService.prototype);
    let sent = '';

    svc.ctx = { logger: { warn: vi.fn() } };
    svc._safeGraphQLInt = (v) => Number(v);
    svc._getClient = async () => ({
      post: async (_url, body) => {
        sent = body.query;
        return {
          data: {
            data: {
              headlessAdminTaxonomy_v1_0: {
                taxonomyVocabularyTaxonomyCategories: {
                  items: [],
                  totalCount: 0,
                },
              },
            },
          },
        };
      },
    });

    await svc.getTaxonomyCategories({}, 42);

    return sent;
  }

  it('asks for the parent, so a flat page can be rebuilt into a tree', async () => {
    const q = await capturedQuery();

    expect(q).toMatch(/parentTaxonomyCategory\s*{[^}]*\bid\b/);
    expect(q).toMatch(/parentTaxonomyCategory\s*{[^}]*externalReferenceCode/);
  });

  it('asks for the path Liferay already computes', async () => {
    // Cheaper and more trustworthy than deriving it from parent links.
    expect(await capturedQuery()).toMatch(/^\s*path\s*$/m);
  });

  it('KEEPS flatten: true', async () => {
    // Dropping it returns only top-level categories, so reading a tree would
    // cost one request per level per branch. Flat page plus parent links is
    // one request for the whole vocabulary.
    expect(await capturedQuery()).toContain('flatten: true');
  });

  it('selects only fields the shipped OpenAPI schema defines', async () => {
    // An unknown field fails the ENTIRE query, for every existing caller, so
    // the QUERY is checked against the schema.
    //
    // The first version of this test asserted the schema contained the fields
    // this test named — which says nothing about what the query asks for. A
    // perturbation adding `notARealField` to the query left it green. It is
    // the selection that has to be derived from the source, not the
    // expectation.
    const schema = require('../api-schemas/headless-admin-taxonomy-v1.0-openapi.json');
    const category = schema.components.schemas.TaxonomyCategory.properties;
    const parent = schema.components.schemas.ParentTaxonomyCategory.properties;

    const query = await capturedQuery();
    const items = query.slice(query.indexOf('items {'));

    // Fields selected on the category, down to the nested parent block.
    const categoryFields = items
      .slice(0, items.indexOf('parentTaxonomyCategory'))
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(l));

    const parentBlock = items.slice(items.indexOf('parentTaxonomyCategory'));
    const parentFields = parentBlock
      .slice(parentBlock.indexOf('{') + 1, parentBlock.indexOf('}'))
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(l));

    expect(categoryFields.length).toBeGreaterThan(3);
    expect(parentFields.length).toBeGreaterThan(1);

    for (const f of categoryFields) {
      expect(category, `TaxonomyCategory has no field '${f}'`).toHaveProperty(
        f
      );
    }
    for (const f of parentFields) {
      expect(
        parent,
        `ParentTaxonomyCategory has no field '${f}'`
      ).toHaveProperty(f);
    }
  });
});
