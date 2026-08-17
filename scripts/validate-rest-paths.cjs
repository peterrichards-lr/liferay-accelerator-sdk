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
const SRC_DIR = path.join(__dirname, '..', 'src');

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
  '/o/headless-pim':
    'probed for existence by CatalogAdapterFactory; the PIM spec is unreleased (issue #3)',
  '/o/aica-reindex':
    'an accelerator-specific module, not a Liferay headless API',
  '/o/object-admin': 'no object-admin spec is synced into api-schemas',
  '/o/headless-form': 'no headless-form spec is synced into api-schemas',
  '/o/workflow-admin': 'no workflow-admin spec is synced into api-schemas',
};

/** PATH members that are lookup tables rather than emittable paths. */
const NON_PATH_MEMBERS = new Set(['VARIANT', 'CUSTOM_OBJECTS']);

/**
 * Inline path literals that no synced spec describes.
 *
 * The path profile is not the only place paths come from: some services build a
 * URL inline. Those bypassed this gate entirely until inline harvesting was
 * added, and switching it on surfaced these five, all Page Experience calls in
 * ExtractionFacade. They are listed rather than fixed because a mismatch here
 * has two possible causes - the SDK is wrong, or api-schemas predates the
 * endpoint - and telling them apart needs a live DXP or a re-sync. Tracked
 * separately; see the issue referenced in each entry.
 *
 * The list is a ratchet, not an amnesty: any *new* unmatched inline path fails
 * the build, and an entry that starts matching must be removed.
 */
const KNOWN_UNVERIFIED_INLINE = {
  '/o/headless-delivery/v1.0/site-pages/12345/page-elements':
    'headless-delivery declares no page-element paths; its site-pages are nested under /sites/{siteId}',
  '/o/headless-delivery/v1.0/site-pages/12345/page-specification':
    'the synced specs expose page-specifications (plural) under headless-admin-site, nested beneath /sites/{siteERC}',
  '/o/headless-delivery/v1.0/page-elements/12345':
    'headless-delivery declares no page-element paths',
  '/o/headless-delivery/v1.0/sites/12345/asset-lists':
    'headless-delivery declares no asset-list paths',
  '/o/headless-admin-site/v1.0/site-pages/12345/widget-page-preferences':
    'headless-admin-site declares no widget-page-preferences paths; its site-pages are nested under /sites/{siteERC}',
};

/** Directories under src/ that hold no hand-written paths worth checking. */
const SKIPPED_SOURCES =
  /(^|\/)(logs|generated)(\/|$)|GeneratedLiferayClient|utils\/profiles/;

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

/** Every .cjs/.js file under src/ that could hold a hand-written path. */
function sourceFiles(dir = SRC_DIR, collected = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (SKIPPED_SOURCES.test(full)) continue;
    if (entry.isDirectory()) sourceFiles(full, collected);
    else if (/\.(cjs|js)$/.test(entry.name)) collected.push(full);
  }
  return collected;
}

/**
 * Harvests API paths written inline in the source rather than taken from the
 * path profile. Interpolations become the sentinel segment, so
 * `/sites/${siteId}/pages` is checked as `/sites/12345/pages`.
 *
 * @returns {Array<{name: string, path: string}>}
 */
function harvestInlinePaths(srcDir = SRC_DIR) {
  const harvested = [];
  const literal = /['`](\/o\/[^'`\n]*)['`]/g;

  for (const file of sourceFiles(srcDir)) {
    const source = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = literal.exec(source)) !== null) {
      const withSentinels = match[1].replace(/\$\{[^}]*\}/g, SENTINEL);
      if (withSentinels.includes('${')) continue;
      const line = source.slice(0, match.index).split('\n').length;
      harvested.push({
        name: `${path.relative(path.dirname(srcDir), file)}:${line}`,
        path: withSentinels,
      });
    }
  }

  return harvested;
}

function run({ schemaDir = SCHEMA_DIR, table = PATH, srcDir = SRC_DIR } = {}) {
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

  // Inline literals are classified the same way, except that a known-unverified
  // path is tolerated (with its reason) while any new one fails.
  const inline = harvestInlinePaths(srcDir);
  const inlineMatched = [];
  const inlineUnverified = [];
  const staleAllowlist = [];

  for (const entry of inline) {
    const concrete = normalizePath(entry.path);
    const known = Object.prototype.hasOwnProperty.call(
      KNOWN_UNVERIFIED_INLINE,
      concrete
    );

    if (findTemplate(concrete, templates)) {
      inlineMatched.push({ ...entry, concrete });
      // The list must not outlive the mismatch it documents.
      if (known) {
        staleAllowlist.push({
          ...entry,
          concrete,
          reason:
            'listed in KNOWN_UNVERIFIED_INLINE but now matches a spec - remove the entry',
        });
      }
      continue;
    }

    const reason = unverifiableReason(concrete, placeholderRoots);
    if (reason) {
      inlineUnverified.push({ ...entry, concrete, reason });
      continue;
    }

    if (known) {
      inlineUnverified.push({
        ...entry,
        concrete,
        reason: KNOWN_UNVERIFIED_INLINE[concrete],
        known: true,
      });
      continue;
    }

    failures.push({
      ...entry,
      concrete,
      reason:
        'inline path exists in no OpenAPI document. Fix it, or add it to KNOWN_UNVERIFIED_INLINE with the reason',
    });
  }

  failures.push(...staleAllowlist);

  return {
    templates,
    placeholderRoots,
    harvested,
    matched,
    prefixes,
    unverifiable,
    failures,
    inline,
    inlineMatched,
    inlineUnverified,
  };
}

function main() {
  const {
    templates,
    harvested,
    matched,
    prefixes,
    unverifiable,
    failures,
    inlineMatched,
    inlineUnverified,
  } = run();

  const total =
    harvested.length + inlineMatched.length + inlineUnverified.length;
  console.log(
    `Validating ${total} SDK REST paths (${harvested.length} from the path profile, ${total - harvested.length} inline) against ${templates.length} path templates in api-schemas/\n`
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

  if (inlineMatched.length > 0 || inlineUnverified.length > 0) {
    console.log(
      `\n  Inline paths (${inlineMatched.length + inlineUnverified.length} outside the path profile): ${inlineMatched.length} verified, ${inlineUnverified.length} unverified`
    );
    for (const entry of inlineUnverified) {
      console.log(`    ${entry.name}: ${entry.concrete}`);
      console.log(`      ${entry.reason}`);
    }
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
      `\n${failures.length} of ${total} SDK REST paths do not exist in the authoritative specs.`
    );
    console.error(
      'Fix the path (or re-sync api-schemas if the API legitimately changed).'
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nAll ${matched.length + inlineMatched.length} verifiable REST paths exist in the Liferay OpenAPI specs (${prefixes.length} prefixes, ${unverifiable.length + inlineUnverified.length} unverifiable).`
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  ARG_OVERRIDES,
  KNOWN_UNVERIFIED_INLINE,
  ROOTS_WITHOUT_SPECS,
  harvestInlinePaths,
  SENTINEL,
  harvestPaths,
  isTemplatePrefix,
  loadSpecTemplates,
  normalizePath,
  pathMatchesTemplate,
  run,
};
