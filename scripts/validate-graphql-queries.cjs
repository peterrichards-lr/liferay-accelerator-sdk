#!/usr/bin/env node
/**
 * Statically validates every GraphQL query the SDK can emit against the
 * authoritative Liferay schema (`api-schemas/liferay_schema.graphql`).
 *
 * `LiferayGraphQLService` builds its queries as template strings at call time,
 * so there are no static `gql` literals for graphql-eslint/graphql-inspector to
 * lint. Instead we *harvest* the real query strings: every service method is
 * invoked with representative arguments against a stubbed transport that
 * records the outgoing query and then aborts the call. Each captured query is
 * then parsed and validated against the schema, which catches missing fields,
 * renamed query methods and argument/type mismatches (schema drift) before any
 * of it reaches a live DXP instance.
 *
 * Usage:
 *     node scripts/validate-graphql-queries.cjs
 *
 * Exits non-zero when any query fails to parse or validate.
 */
const fs = require('fs');
const path = require('path');
const { buildSchema, parse, validate } = require('graphql');

const LiferayGraphQLService = require('../src/liferay/graphql.cjs');

const SCHEMA_PATH = path.join(
  __dirname,
  '..',
  'api-schemas',
  'liferay_schema.graphql'
);

/**
 * Marker used by the stub transport to unwind a service method as soon as its
 * query has been captured, so no synthetic GraphQL response has to be faked.
 */
const CAPTURE_MARKER = '__liferaySdkQueryCaptured';

const CONFIG = {
  liferayUrl: 'http://validate.invalid',
  authMethod: 'basic',
  username: 'validator',
  password: 'validator',
};

const PAGINATION = { page: 1, pageSize: 200 };
const FILTER = "name eq 'Sample'";
const SEARCH = 'sample';
const ERCS = ['SAMPLE-ERC-1', 'SAMPLE-ERC-2'];
const PRODUCT_IDS = [101, 102];

/**
 * The queries the SDK is able to emit, expressed as the public service call
 * that produces them. Methods whose `fields` argument has no default are given
 * a representative selection so the query method itself is still validated.
 *
 * Add an entry here whenever a new query method is added to
 * `src/liferay/graphql.cjs`, otherwise the new query is not covered.
 */
const QUERY_SPECS = [
  { method: 'getCurrencies', args: [CONFIG] },
  { method: 'getCatalogs', args: [CONFIG] },
  { method: 'getChannels', args: [CONFIG] },
  { method: 'getCountries', args: [CONFIG] },
  { method: 'getLanguages', args: [CONFIG, 'guest'] },
  { method: 'getSiteLanguages', args: [CONFIG, 'guest'] },
  { method: 'getCountryRegions', args: [CONFIG, 1] },
  { method: 'getTaxonomyVocabularies', args: [CONFIG, 'guest'] },
  { method: 'getTaxonomyCategories', args: [CONFIG, 42] },
  {
    method: 'getWarehouses',
    args: [CONFIG, FILTER, null, PAGINATION, SEARCH],
  },
  { method: 'getProducts', args: [CONFIG, FILTER, null, PAGINATION, SEARCH] },
  { method: 'getAccounts', args: [CONFIG, FILTER, null, PAGINATION, SEARCH] },
  { method: 'getOrders', args: [CONFIG, FILTER, null, PAGINATION, SEARCH] },
  {
    method: 'getOptions',
    args: [
      CONFIG,
      FILTER,
      ['id', 'externalReferenceCode', 'key', 'name'],
      PAGINATION,
    ],
  },
  {
    method: 'getOptionCategories',
    args: [
      CONFIG,
      FILTER,
      ['id', 'externalReferenceCode', 'key', 'title'],
      PAGINATION,
    ],
  },
  {
    method: 'getSpecifications',
    args: [
      CONFIG,
      FILTER,
      ['id', 'externalReferenceCode', 'key', 'title'],
      PAGINATION,
    ],
  },
  {
    method: 'getPriceLists',
    args: [
      CONFIG,
      FILTER,
      ['id', 'externalReferenceCode', 'name', 'currencyCode'],
      PAGINATION,
    ],
  },
  {
    method: 'getDiscounts',
    args: [
      CONFIG,
      FILTER,
      ['id', 'externalReferenceCode', 'title'],
      PAGINATION,
    ],
  },
  {
    // No filter: warehouseIdWarehouseItems accepts only id/page/pageSize, and
    // the service rejects a filter before it ever builds a query.
    method: 'getWarehouseItems',
    args: [
      CONFIG,
      7,
      null,
      ['id', 'externalReferenceCode', 'sku', 'quantity'],
      PAGINATION,
    ],
  },
  { method: 'getAccountsByERC', args: [CONFIG, ERCS] },
  { method: 'getProductsByERC', args: [CONFIG, ERCS] },
  { method: 'getWarehousesByERC', args: [CONFIG, ERCS] },
  { method: 'getSkusByERC', args: [CONFIG, ERCS] },
  { method: 'getPostalAddressesByERC', args: [CONFIG, ERCS] },
  { method: 'getOptionsByProductIds', args: [CONFIG, PRODUCT_IDS] },
  { method: 'getSpecificationsByProductIds', args: [CONFIG, PRODUCT_IDS] },
];

function createSilentLogger() {
  const noop = () => {};
  return {
    trace: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
    success: noop,
  };
}

/**
 * Builds a service whose transport records queries instead of sending them.
 * The recorded query is surfaced by throwing a marked error, which every
 * service method re-throws after logging - so no response shape has to be
 * simulated for the harvest to work.
 */
function createHarvestService() {
  const captured = [];
  const service = new LiferayGraphQLService({ logger: createSilentLogger() });

  service._getClient = async () => ({
    post: async (_url, body) => {
      captured.push(body && body.query);
      const abort = new Error('GraphQL query captured for static validation');
      abort[CAPTURE_MARKER] = true;
      throw abort;
    },
  });

  return { service, captured };
}

/**
 * Invokes every spec and returns the queries each one emitted.
 * @returns {Promise<Array<{method: string, queries: string[], harvestError?: string}>>}
 */
async function harvestQueries(specs = QUERY_SPECS) {
  const harvested = [];

  for (const spec of specs) {
    const { service, captured } = createHarvestService();

    if (typeof service[spec.method] !== 'function') {
      harvested.push({
        method: spec.method,
        queries: [],
        harvestError: `LiferayGraphQLService has no method '${spec.method}'`,
      });
      continue;
    }

    let harvestError;
    try {
      await service[spec.method](...spec.args);
    } catch (error) {
      if (!error[CAPTURE_MARKER]) {
        harvestError = `${error.name}: ${error.message}`;
      }
    }

    if (!harvestError && captured.length === 0) {
      harvestError = 'method completed without emitting a GraphQL query';
    }

    harvested.push({ method: spec.method, queries: captured, harvestError });
  }

  return harvested;
}

function loadSchema(schemaPath = SCHEMA_PATH) {
  const sdl = fs.readFileSync(schemaPath, 'utf8');
  // The Liferay SDL is generated and self-consistent; skipping the full SDL
  // validation pass keeps the (56k line) build fast without weakening the
  // query validation we actually rely on.
  return buildSchema(sdl, { assumeValidSDL: true });
}

/**
 * Parses and validates each harvested query against the schema.
 * @returns {Array<{method: string, errors: string[]}>} one entry per spec
 */
function validateHarvestedQueries(schema, harvested) {
  return harvested.map(({ method, queries, harvestError }) => {
    const errors = [];

    if (harvestError) {
      errors.push(`Could not harvest query: ${harvestError}`);
    }

    queries.forEach((query, index) => {
      const label = queries.length > 1 ? ` (query ${index + 1})` : '';

      if (typeof query !== 'string' || query.trim() === '') {
        errors.push(`Emitted an empty query${label}`);
        return;
      }

      let document;
      try {
        document = parse(query);
      } catch (parseError) {
        errors.push(`Syntax error${label}: ${parseError.message}`);
        return;
      }

      validate(schema, document).forEach((error) => {
        errors.push(`Schema violation${label}: ${error.message}`);
      });
    });

    return { method, errors };
  });
}

async function run({ schemaPath = SCHEMA_PATH, specs = QUERY_SPECS } = {}) {
  const schema = loadSchema(schemaPath);
  const harvested = await harvestQueries(specs);
  const results = validateHarvestedQueries(schema, harvested);

  const failures = results.filter((result) => result.errors.length > 0);
  const queryCount = harvested.reduce(
    (total, entry) => total + entry.queries.length,
    0
  );

  return { results, failures, queryCount };
}

async function main() {
  const { results, failures, queryCount } = await run();

  console.log(
    `Validating ${queryCount} GraphQL ${
      queryCount === 1 ? 'query' : 'queries'
    } from ${results.length} SDK methods against ${path.relative(
      process.cwd(),
      SCHEMA_PATH
    )}\n`
  );

  for (const { method, errors } of results) {
    if (errors.length === 0) {
      console.log(`  PASS  ${method}`);
    } else {
      console.log(`  FAIL  ${method}`);
      errors.forEach((error) => console.log(`          ${error}`));
    }
  }

  if (failures.length > 0) {
    console.error(
      `\n${failures.length} of ${results.length} SDK GraphQL methods do not match the Liferay schema.`
    );
    console.error(
      'Fix the query (or re-sync api-schemas/liferay_schema.graphql if the schema legitimately changed).'
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nAll ${queryCount} queries match the Liferay GraphQL schema definition.`
  );
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`GraphQL query validation failed to run: ${error.message}`);
    console.error(error.stack);
    process.exitCode = 1;
  });
}

module.exports = {
  CAPTURE_MARKER,
  QUERY_SPECS,
  SCHEMA_PATH,
  harvestQueries,
  loadSchema,
  run,
  validateHarvestedQueries,
};
