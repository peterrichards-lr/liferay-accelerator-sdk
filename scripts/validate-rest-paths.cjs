#!/usr/bin/env node
/**
 * Statically validates every REST path the SDK can emit against the OpenAPI
 * documents in api-schemas/.
 *
 * This is the REST counterpart to validate-graphql-queries.cjs. Paths are
 * assembled at call time from the profile table in
 * src/utils/profiles/legacyProfile.cjs (re-exported as src/utils/liferayPaths.cjs
 * and handed to the catalog adapters), so nothing checks them until a request
 * reaches a live DXP. The GraphQL gate found three broken queries the moment it
 * was switched on; this closes the same hole on the much larger REST surface.
 *
 * Every PATH entry is invoked with sentinel arguments, the resulting concrete
 * path is stripped of its query string, and the remainder is matched
 * segment-wise against the path templates declared by the specs.
 *
 * Usage:
 *     node scripts/validate-rest-paths.cjs
 *
 * Exits non-zero when a path does not exist in the authoritative spec.
 */
const fs = require('fs');
const path = require('path');

const { PATH } = require('../src/utils/liferayPaths.cjs');

const SCHEMA_DIR = path.join(__dirname, '..', 'api-schemas');

/** Stands in for any interpolated id or external reference code. */
const SENTINEL = '12345';

/**
 * Roots the SDK talks to that have no OpenAPI document in api-schemas. Paths
 * under these are reported as unverifiable rather than silently passing, so the
 * gap stays visible.
 */
const ROOTS_WITHOUT_SPECS = {
  '/o/headless-admin-taxonomy': 'no taxonomy spec is synced into api-schemas',
  '/o/c': 'Liferay Objects paths are instance-defined, not described by a spec',
  '/o/api': 'the API explorer is not itself a described API',
  '/o/oauth2': 'the OAuth2 token endpoint is not described by a headless spec',
};

/** PATH members that are lookup tables rather than emittable paths. */
const NON_PATH_MEMBERS = new Set(['VARIANT', 'CUSTOM_OBJECTS']);

/**
 * Arguments for entries whose parameters are not interchangeable single path
 * segments, so the sentinel alone cannot exercise them.
 */
const ARG_OVERRIDES = {
  PERMISSIONS_BY_ASSET: [
    ['document-folder', SENTINEL],
    ['document', SENTINEL],
  ],
};

/**
 * Builds the set of path templates the specs declare, keyed by the API root
 * taken from each document's `servers` entry.
 *
 * A spec's path keys already carry their version (`/v1.0/products`), which is
 * what keeps pricing v1.0 and v2.0 distinct under a shared root.
 *
 * @returns {Array<{template: string, methods: string[], spec: string}>}
 */
function loadSpecTemplates(schemaDir = SCHEMA_DIR) {
  const templates = [];
  const placeholderRoots = {};

  for (const file of fs.readdirSync(schemaDir)) {
    if (!file.endsWith('-openapi.json')) continue;

    const spec = JSON.parse(
      fs.readFileSync(path.join(schemaDir, file), 'utf8')
    );
    const serverUrl = spec.servers && spec.servers[0] && spec.servers[0].url;
    const paths = Object.entries(spec.paths || {});

    // 'http://localhost:8080/o/headless-commerce-admin-catalog/' -> '/o/headless-commerce-admin-catalog'
    // A placeholder spec (see #130) has neither servers nor paths, so its root
    // is recovered from the file name, which every spec here is named after.
    const root = serverUrl
      ? new URL(serverUrl).pathname.replace(/\/+$/, '')
      : `/o/${file.replace(/-v\d+\.\d+-openapi\.json$/, '')}`;

    if (paths.length === 0) {
      placeholderRoots[root] = true;
      continue;
    }

    for (const [template, operations] of paths) {
      templates.push({
        template: `${root}${template}`,
        methods: Object.keys(operations || {})
          .filter((key) => key !== 'parameters')
          .map((method) => method.toUpperCase()),
        spec: file,
      });
    }
  }

  return { templates, placeholderRoots };
}

/** Strips the query string and any trailing slash from an emitted path. */
function normalizePath(emitted) {
  return emitted.split('?')[0].replace(/\/+$/, '') || '/';
}

/** True when a concrete path satisfies an OpenAPI path template. */
function pathMatchesTemplate(concrete, template) {
  const concreteSegments = concrete.split('/');
  const templateSegments = template.split('/');
  if (concreteSegments.length !== templateSegments.length) return false;

  return templateSegments.every((segment, index) => {
    const actual = concreteSegments[index];
    if (segment.startsWith('{') && segment.endsWith('}')) {
      return actual.length > 0;
    }
    return segment === actual;
  });
}

function findTemplate(concrete, templates) {
  return templates.find((entry) =>
    pathMatchesTemplate(concrete, entry.template)
  );
}

/**
 * True when a path is not an endpoint itself but a prefix that longer templates
 * are built from - the API roots and collection bases in PATH.BASE. Treating
 * these as failures would flag every one of them, so they are reported
 * separately.
 */
function isTemplatePrefix(concrete, templates) {
  return templates.some((entry) => entry.template.startsWith(`${concrete}/`));
}

function unverifiableReason(concrete, placeholderRoots = {}) {
  const root = Object.keys(ROOTS_WITHOUT_SPECS).find(
    (prefix) => concrete === prefix || concrete.startsWith(`${prefix}/`)
  );
  if (root) return ROOTS_WITHOUT_SPECS[root];

  const placeholder = Object.keys(placeholderRoots).find(
    (prefix) => concrete === prefix || concrete.startsWith(`${prefix}/`)
  );
  if (placeholder) {
    return `${placeholder} is served by a placeholder spec that declares no paths (see issue #130)`;
  }

  return null;
}

/**
 * Invokes every PATH member and collects the concrete paths it can emit.
 * Functions are called with sentinel arguments matching their arity; the
 * sentinel is a valid single segment, so branches that differ only in query
 * parameters converge on the same path.
 *
 * @returns {Array<{name: string, path?: string, harvestError?: string}>}
 */
function harvestPaths(table = PATH) {
  const harvested = [];

  const record = (name, value) => {
    if (typeof value === 'string') {
      harvested.push({ name, path: value });
      return;
    }
    if (typeof value !== 'function') return;

    const argSets = ARG_OVERRIDES[name] || [Array(value.length).fill(SENTINEL)];

    argSets.forEach((args) => {
      const label = argSets.length > 1 ? `${name}[${args[0]}]` : name;
      try {
        const emitted = value(...args);
        if (typeof emitted !== 'string') {
          harvested.push({
            name: label,
            harvestError: `returned ${typeof emitted}, expected a path string`,
          });
          return;
        }
        harvested.push({ name: label, path: emitted });
      } catch (error) {
        harvested.push({ name: label, harvestError: error.message });
      }
    });
  };

  for (const [name, value] of Object.entries(table)) {
    if (NON_PATH_MEMBERS.has(name)) continue;

    // BASE holds the API roots and collection prefixes the rest are built from,
    // and they are used directly as paths too, so they are worth checking.
    if (name === 'BASE') {
      for (const [baseName, baseValue] of Object.entries(value)) {
        record(`BASE.${baseName}`, baseValue);
      }
      continue;
    }

    record(name, value);
  }

  return harvested;
}

function run({ schemaDir = SCHEMA_DIR, table = PATH } = {}) {
  const { templates, placeholderRoots } = loadSpecTemplates(schemaDir);
  const harvested = harvestPaths(table);

  const matched = [];
  const prefixes = [];
  const unverifiable = [];
  const failures = [];

  for (const entry of harvested) {
    if (entry.harvestError) {
      failures.push({
        ...entry,
        reason: `could not harvest: ${entry.harvestError}`,
      });
      continue;
    }

    const concrete = normalizePath(entry.path);
    const reason = unverifiableReason(concrete, placeholderRoots);
    if (reason) {
      unverifiable.push({ ...entry, concrete, reason });
      continue;
    }

    const match = findTemplate(concrete, templates);
    if (match) {
      matched.push({ ...entry, concrete, ...match });
      continue;
    }

    if (isTemplatePrefix(concrete, templates)) {
      prefixes.push({ ...entry, concrete });
      continue;
    }

    failures.push({
      ...entry,
      concrete,
      reason: 'no matching path in any OpenAPI document',
    });
  }

  return {
    templates,
    placeholderRoots,
    harvested,
    matched,
    prefixes,
    unverifiable,
    failures,
  };
}

function main() {
  const { templates, harvested, matched, prefixes, unverifiable, failures } =
    run();

  console.log(
    `Validating ${harvested.length} SDK REST paths against ${templates.length} path templates in api-schemas/\n`
  );

  for (const entry of matched) {
    console.log(`  PASS  ${entry.name}`);
    console.log(`          ${entry.concrete}`);
    console.log(`          -> ${entry.template} [${entry.methods.join(', ')}]`);
  }

  if (prefixes.length > 0) {
    console.log(
      `\n  Prefixes, not endpoints (${prefixes.length}): ${prefixes
        .map((entry) => entry.name)
        .join(', ')}`
    );
  }

  if (unverifiable.length > 0) {
    console.log(`\n  Unverifiable (${unverifiable.length}):`);
    for (const entry of unverifiable) {
      console.log(`    ${entry.name}: ${entry.concrete}`);
      console.log(`      ${entry.reason}`);
    }
  }

  if (failures.length > 0) {
    console.log(`\n  FAILURES (${failures.length}):`);
    for (const entry of failures) {
      console.log(`    ${entry.name}: ${entry.concrete || '(not emitted)'}`);
      console.log(`      ${entry.reason}`);
    }
    console.error(
      `\n${failures.length} of ${harvested.length} SDK REST paths do not exist in the authoritative specs.`
    );
    console.error(
      'Fix the path (or re-sync api-schemas if the API legitimately changed).'
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nAll ${matched.length} verifiable REST paths exist in the Liferay OpenAPI specs (${prefixes.length} prefixes, ${unverifiable.length} unverifiable).`
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  ARG_OVERRIDES,
  ROOTS_WITHOUT_SPECS,
  SENTINEL,
  harvestPaths,
  isTemplatePrefix,
  loadSpecTemplates,
  normalizePath,
  pathMatchesTemplate,
  run,
};
