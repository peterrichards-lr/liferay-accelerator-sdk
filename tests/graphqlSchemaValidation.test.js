import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  QUERY_SPECS,
  harvestQueries,
  loadSchema,
  run,
  validateHarvestedQueries,
} = require('../scripts/validate-graphql-queries.cjs');
const LiferayGraphQLService = require('../src/liferay/graphql.cjs');

/**
 * Guards against GraphQL schema drift: every query the SDK can emit is
 * harvested from LiferayGraphQLService and validated against
 * api-schemas/liferay_schema.graphql. See scripts/validate-graphql-queries.cjs.
 */
describe('GraphQL schema validation', () => {
  it('validates every SDK GraphQL query against liferay_schema.graphql', async () => {
    const { results, failures, queryCount } = await run();

    const reported = failures.map(
      ({ method, errors }) => `${method}: ${errors.join(' | ')}`
    );

    expect(reported).toEqual([]);
    expect(results).toHaveLength(QUERY_SPECS.length);
    expect(queryCount).toBeGreaterThanOrEqual(QUERY_SPECS.length);
  });

  it('covers every public query method exposed by LiferayGraphQLService', () => {
    const covered = new Set(QUERY_SPECS.map((spec) => spec.method));

    const publicQueryMethods = Object.getOwnPropertyNames(
      LiferayGraphQLService.prototype
    ).filter((name) => /^(get|fetch)[A-Z]/.test(name));

    const uncovered = publicQueryMethods.filter(
      (name) => !covered.has(name) && name !== 'fetchEntitiesByERC'
    );

    expect(uncovered).toEqual([]);
  });

  it('reports a schema violation when a query requests an unknown field', async () => {
    const schema = loadSchema();

    const results = validateHarvestedQueries(schema, [
      {
        method: 'syntheticDriftedQuery',
        queries: [
          `query {
             headlessCommerceAdminCatalog_v1_0 {
               currencies(page: 1, pageSize: 200) {
                 items { id fieldThatDoesNotExist }
                 totalCount
               }
             }
           }`,
        ],
      },
    ]);

    expect(results[0].errors).toHaveLength(1);
    expect(results[0].errors[0]).toContain('fieldThatDoesNotExist');
  });

  it('reports a harvest failure when a spec names a method that no longer exists', async () => {
    const harvested = await harvestQueries([
      { method: 'getSomethingRemoved', args: [{}] },
    ]);

    expect(harvested[0].queries).toEqual([]);
    expect(harvested[0].harvestError).toContain('getSomethingRemoved');
  });
});
