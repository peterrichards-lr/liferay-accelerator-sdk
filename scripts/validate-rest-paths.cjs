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
 * Existing, however, is not the same as being callable the way the SDK calls
 * it. Until #184 a path could pass this gate and still 405 at run time, because
 * the methods each template declares were collected and printed but never
 * asserted - #181 nearly shipped a GET against /v1.0/attachment/{id}, which is
 * DELETE-only, with `yarn validate` green. So the call sites are harvested too:
 * every `_get`/`_post`/... call is paired with the concrete path its second
 * argument resolves to, and the verb is checked against the matched template.
 *
 * The verb is taken from the call rather than from the PATH constant on
 * purpose. Paths are routinely composed at the call site -
 * `${PATH.WAREHOUSES}/${warehouseId}` is a DELETE against /warehouses/{id}, not
 * against /warehouses - so a constant-to-verb map would report those
 * compositions as mismatches every run, forever.
 *
 * Usage:
 *     node scripts/validate-rest-paths.cjs
 *
 * Exits non-zero when a path does not exist in the authoritative spec, or is
 * called with a method that spec does not declare.
 */
const fs = require('fs');
const path = require('path');

const { PATH } = require('../src/utils/liferayPaths.cjs');
const { DEFAULT_REINDEX_BASE_PATH } = require('../src/utils/constants.cjs');

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
  // Unverifiable in principle, not merely unsynced: the segment under /o/c is
  // an object definition created when the instance is provisioned, so no
  // published spec can describe it. That stays true now the SDK's own
  // configuration object is configurable - config.configObjectName or
  // ENV.LIFERAY_CONFIG_OBJECT_NAME can name any definition at run time, and
  // only DEFAULT_CONFIG_OBJECT_NAME is ever a literal in src for a harvester
  // to find.
  '/o/c':
    'Liferay Objects paths are instance-defined: the object under /o/c is ' +
    'created when the portal is provisioned, so no spec describes it and no ' +
    'gate here can',
  '/o/api': 'the API explorer is not itself a described API',
  '/o/oauth2': 'the OAuth2 token endpoint is not described by a headless spec',
  '/o/headless-pim':
    'probed for existence by CatalogAdapterFactory; the PIM spec is unreleased (issue #3)',
  // Taken from the constant the SDK defaults to, so a rename of the module's
  // base cannot leave this gate excusing a root nothing calls any more.
  [DEFAULT_REINDEX_BASE_PATH]:
    'the search-reindex OSGi module, not a Liferay headless API. Formerly ' +
    '/o/aica-reindex, renamed when the module moved out of AICA into the ' +
    'shared modules repository and its names were made generic. Only the ' +
    'default base is checked here; a deployment elsewhere is named by ' +
    'ENV.LIFERAY_REINDEX_BASE_PATH and never appears as a literal in src',
  '/o/headless-form': 'no headless-form spec is synced into api-schemas',
  // /o/workflow-admin was excused here as unsynced until LDM #61 synced the
  // workflow spec and showed there is no such context to sync: the API is
  // headless-admin-workflow, and the one call under /o/workflow-admin was a
  // standing 404. The excuse is gone so the root can never be quietly
  // reintroduced.
};

/**
 * PATH members that are lookup tables rather than emittable paths.
 *
 * CUSTOM_OBJECTS holds object names, not paths, and its one entry is only the
 * default: the live name comes from config.configObjectName or
 * ENV.LIFERAY_CONFIG_OBJECT_NAME. Emitting it would produce a path under /o/c,
 * which is excused above as instance-defined, so nothing is lost by skipping
 * it - but note that between the two exclusions the most instance-specific
 * path the SDK emits is the one this gate checks least. That is a property of
 * Liferay Objects rather than a gap to close here; the object name is covered
 * by unit tests instead.
 */
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
 * The HttpCoreService helpers that put a request on the wire, and the verb each
 * one sends. The multipart helpers and `_downloadFile` are here because they
 * are requests too, even though they do not read as one.
 *
 * `_putMultipart` is a separate entry rather than `_postMultipart` gaining a
 * method argument for exactly this table's sake: the verb has to be readable
 * from the call site's name, or a PUT against a POST-only template goes
 * unchecked - which is the failure #184 was opened for.
 *
 * `_request` is deliberately absent: it takes its method inside an axios config
 * object rather than in its name, and every caller of it in src reaches it
 * through one of the helpers below, so nothing is lost by not parsing it.
 */
const HTTP_HELPER_METHODS = {
  _get: 'GET',
  _post: 'POST',
  _put: 'PUT',
  _patch: 'PATCH',
  _delete: 'DELETE',
  _postMultipart: 'POST',
  _putMultipart: 'PUT',
  _downloadFile: 'GET',
};

/**
 * True when a helper call is a request rather than something else wearing the
 * same name.
 *
 * The names are not unique in src: persistenceService has its own
 * `_get(sql, ...params)` over SQLite, and matching on the name alone would hand
 * this gate a dozen SQL statements to look up in an OpenAPI document. Every
 * HTTP helper takes the Liferay connection config first
 * (`_get(config, url, op, friendly, opts)`), so the discriminator is what that
 * first argument is, not what it is called - the callers spell it `config`,
 * `cfg` and `effective`, and an allowlist of those names would silently drop
 * the next one somebody invents, which is the same overstatement #184 is about.
 * A SQL statement is always a literal, and `...args` is a delegation to the
 * helper that really makes the call.
 */
function isRequestCall(firstArgument) {
  const argument = firstArgument.trim();
  if (!argument || argument.startsWith('...')) return false;
  return !/^['"`]/.test(argument);
}

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
 * Every template a concrete path satisfies, not just the first.
 *
 * One path can satisfy several: headless-batch-engine declares both
 * /import-task/{className} (DELETE, POST, PUT) and /import-task/{importTaskId}
 * (GET), and /import-task/12345 is a legal request against either. Checking a
 * verb against whichever happened to be read first would fail
 * `getImportTaskStatus` for sending GET when the SDK is right and the check is
 * merely looking at the wrong one of two equally matching templates.
 */
function findTemplates(concrete, templates) {
  return templates.filter((entry) =>
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

/**
 * Walks an expression left to right, calling `visit(char, index)` for each
 * character that sits at the top nesting level and outside a string or a
 * template literal. Returning false from `visit` stops the walk.
 *
 * This is a bracket matcher, not a JavaScript parser. It knows just enough to
 * find argument boundaries and template interpolations in the call shapes src
 * actually uses; anything subtler it cannot resolve is reported unverifiable
 * rather than guessed at. A real parser would mean depending on espree or
 * acorn, which are only present here transitively through eslint.
 */
function scanTopLevel(text, visit) {
  const stack = [];

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const context = stack[stack.length - 1];

    if (context === "'" || context === '"') {
      if (char === '\\') index++;
      else if (char === context) stack.pop();
      continue;
    }

    if (context === '`') {
      if (char === '\\') index++;
      else if (char === '`') stack.pop();
      else if (char === '$' && text[index + 1] === '{') {
        stack.push('${');
        index++;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      stack.push(char);
      continue;
    }

    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      continue;
    }

    if (char === ')' || char === ']' || char === '}') {
      // An unmatched closer belongs to whatever encloses this expression, so
      // the caller gets to see it - that is how the end of an argument list is
      // found.
      if (stack.length === 0) {
        if (visit(char, index) === false) return;
        continue;
      }
      stack.pop();
      continue;
    }

    if (stack.length === 0 && visit(char, index) === false) return;
  }
}

/** Index of the character that closes the bracket opened at `openIndex`. */
function findClosingBracket(source, openIndex, closer) {
  let closed = -1;

  scanTopLevel(source.slice(openIndex + 1), (char, index) => {
    if (char !== closer) return true;
    closed = openIndex + 1 + index;
    return false;
  });

  return closed;
}

/** Splits an expression on a top-level separator, ignoring nested ones. */
function splitTopLevel(text, separator) {
  const parts = [];
  let start = 0;

  scanTopLevel(text, (char, index) => {
    if (char !== separator) return true;
    parts.push(text.slice(start, index));
    start = index + 1;
    return true;
  });

  parts.push(text.slice(start));
  return parts;
}

/** Matches `PATH.PRODUCTS`, and `this.paths.PATH.PRODUCTS` in the adapters. */
const PATH_MEMBER = /^(?:[A-Za-z_$][\w$]*\.)*PATH\.([A-Za-z0-9_$]+)$/;
const PATH_CALL = /^(?:[A-Za-z_$][\w$]*\.)*PATH\.([A-Za-z0-9_$]+)\(/;
/** The query-string helper from the same module, `PATH.PRICE_LISTS + q(params)`. */
const QUERY_HELPER_CALL = /^(?:[A-Za-z_$][\w$]*\.)*q\(/;

/** The PATH member an expression names, whether or not the table defines it. */
function namedPathMember(expression) {
  const match =
    PATH_MEMBER.exec(expression) || PATH_CALL.exec(expression.trim());
  return match ? match[1] : null;
}

/** Invokes a PATH member the way harvestPaths does, and returns what it emits. */
function emitFromTable(name, table) {
  const value = table[name];
  if (typeof value === 'string') return value;
  if (typeof value !== 'function') return null;

  // The first override set is enough here: the overrides exist because the
  // sentinel is rejected, not because each set reaches a different template,
  // and harvestPaths still exercises every one of them.
  const args = (ARG_OVERRIDES[name] || [Array(value.length).fill(SENTINEL)])[0];

  try {
    const emitted = value(...args);
    return typeof emitted === 'string' ? emitted : null;
  } catch {
    return null;
  }
}

/**
 * Resolves the path argument of a call to the concrete path it emits, or null
 * when it cannot be resolved statically - a local variable holding a URL built
 * earlier, a ternary, a path handed in by the caller.
 *
 * Null is not a failure. It means this call site cannot be checked, and it is
 * counted and reported as unverifiable, the same way a spec-less root is.
 */
function resolvePathExpression(expression, table = PATH) {
  let text = expression.trim();
  while (
    text.startsWith('(') &&
    findClosingBracket(text, 0, ')') === text.length - 1
  ) {
    text = text.slice(1, -1).trim();
  }
  if (!text) return null;

  // `PATH.PRICE_LISTS + q(params)`. normalizePath drops the query string
  // before matching, so the q() term contributes nothing and resolves to ''.
  const terms = splitTopLevel(text, '+');
  if (terms.length > 1) {
    const resolved = terms.map((term) => resolveTerm(term.trim(), table));
    return resolved.includes(null) ? null : resolved.join('');
  }

  return resolveTerm(text, table);
}

function resolveTerm(text, table) {
  if (QUERY_HELPER_CALL.test(text) && text.endsWith(')')) return '';

  if (
    (text.startsWith("'") && text.endsWith("'")) ||
    (text.startsWith('"') && text.endsWith('"'))
  ) {
    return text.slice(1, -1);
  }

  if (text.startsWith('`') && text.endsWith('`') && text.length > 1) {
    return resolveTemplateLiteral(text, table);
  }

  const member = PATH_MEMBER.exec(text);
  if (member) return emitFromTable(member[1], table);

  const call = PATH_CALL.exec(text);
  if (
    call &&
    findClosingBracket(text, call[0].length - 1, ')') === text.length - 1
  ) {
    return emitFromTable(call[1], table);
  }

  return null;
}

/**
 * Rebuilds a template literal, resolving each interpolation that names a PATH
 * member and substituting the sentinel for the rest.
 *
 * That substitution is what makes composition check correctly:
 * `${PATH.PRICE_ENTRY(result.id)}/tier-prices` resolves to the tier-prices
 * collection, which allows POST, rather than to the price entry, which does
 * not. It is also the substitution harvestInlinePaths already makes for inline
 * literals, on the same assumption - an interpolated id is one path segment.
 */
function resolveTemplateLiteral(text, table) {
  const body = text.slice(1, -1);
  let resolved = '';

  for (let index = 0; index < body.length; index++) {
    if (body[index] === '\\') {
      resolved += body[index + 1] || '';
      index++;
      continue;
    }

    if (body[index] === '$' && body[index + 1] === '{') {
      const close = findClosingBracket(body, index + 1, '}');
      if (close === -1) return null;
      const inner = resolvePathExpression(body.slice(index + 2, close), table);
      resolved += inner === null ? SENTINEL : inner;
      index = close;
      continue;
    }

    resolved += body[index];
  }

  return resolved;
}

/**
 * Harvests the HTTP calls in src, pairing the verb each one sends with the
 * concrete path its second argument resolves to.
 *
 * @returns {Array<{name: string, method: string, expression: string, path?: string}>}
 */
function harvestMethodUsages(srcDir = SRC_DIR, table = PATH) {
  const usages = [];
  const helper = new RegExp(
    `\\.(${Object.keys(HTTP_HELPER_METHODS).join('|')})\\s*\\(`,
    'g'
  );

  for (const file of sourceFiles(srcDir)) {
    const source = fs.readFileSync(file, 'utf8');
    let match;

    // The leading dot is load-bearing: it keeps the helpers' own declarations
    // in HttpCoreService out of the harvest, where `url` is only a parameter
    // name.
    helper.lastIndex = 0;
    while ((match = helper.exec(source)) !== null) {
      const open = match.index + match[0].length - 1;
      const close = findClosingBracket(source, open, ')');
      if (close === -1) continue;

      const args = splitTopLevel(source.slice(open + 1, close), ',');
      if (!isRequestCall(args[0] || '')) continue;

      const line = source.slice(0, match.index).split('\n').length;
      const expression = (args[1] || '').trim().replace(/\s+/g, ' ');
      const resolved = resolvePathExpression(args[1] || '', table);
      const usage = {
        name: `${path.relative(path.dirname(srcDir), file)}:${line}`,
        method: HTTP_HELPER_METHODS[match[1]],
        expression,
      };

      if (resolved !== null) {
        usages.push({ ...usage, path: resolved });
        continue;
      }

      // Naming a member the table does not define is worth saying out loud
      // rather than filing under "could not resolve": the call sends undefined
      // as its URL. src/liferay/services/CommerceService.cjs reaches for
      // PATH.SKUS, which no profile declares.
      const undefinedMember = namedPathMember(expression);
      usages.push(
        undefinedMember && table[undefinedMember] === undefined
          ? { ...usage, undefinedMember }
          : usage
      );
    }
  }

  return usages;
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

  // The method check (#184). A path that exists is only half the guarantee; the
  // other half is that the verb the SDK sends is one the spec declares for it.
  const usages = harvestMethodUsages(srcDir, table);
  const methodMatched = [];
  const methodUnverifiable = [];

  for (const usage of usages) {
    if (usage.path === undefined) {
      methodUnverifiable.push({
        ...usage,
        reason: usage.undefinedMember
          ? `names PATH.${usage.undefinedMember}, which the path profile does not define, so the call sends undefined as its URL`
          : `the path argument (${usage.expression}) is not a literal or a PATH member, so nothing can be matched against a template`,
      });
      continue;
    }

    const concrete = normalizePath(usage.path);
    const reason = unverifiableReason(concrete, placeholderRoots);
    if (reason) {
      methodUnverifiable.push({ ...usage, concrete, reason });
      continue;
    }

    const matches = findTemplates(concrete, templates);
    if (matches.length === 0) {
      // Whether the path itself exists is the other harvesters' business, and
      // they report it with far better provenance than a call site can. Here it
      // only means there are no declared methods to check the verb against.
      methodUnverifiable.push({
        ...usage,
        concrete,
        reason:
          'no OpenAPI document declares this path, so it declares no methods either',
      });
      continue;
    }

    const allowed = matches.find((entry) =>
      entry.methods.includes(usage.method)
    );
    if (allowed) {
      methodMatched.push({ ...usage, concrete, ...allowed });
      continue;
    }

    failures.push({
      ...usage,
      concrete,
      reason: `sends ${usage.method}, but ${matches
        .map(
          (entry) => `${entry.template} declares ${entry.methods.join(', ')}`
        )
        .join('; ')} (${matches[0].spec})`,
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
    inline,
    inlineMatched,
    inlineUnverified,
    usages,
    methodMatched,
    methodUnverifiable,
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
    usages,
    methodMatched,
    methodUnverifiable,
  } = run();

  const total =
    harvested.length + inlineMatched.length + inlineUnverified.length;
  console.log(
    `Validating ${total} SDK REST paths (${harvested.length} from the path profile, ${total - harvested.length} inline) and ${usages.length} call sites against ${templates.length} path templates in api-schemas/\n`
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

  if (usages.length > 0) {
    console.log(
      `\n  Methods (${usages.length} call sites): ${methodMatched.length} checked against the spec, ${methodUnverifiable.length} unverifiable`
    );
    for (const entry of methodMatched) {
      console.log(
        `    PASS  ${entry.name} ${entry.method} ${entry.concrete} -> ${entry.template} [${entry.methods.join(', ')}]`
      );
    }
    for (const entry of methodUnverifiable) {
      console.log(`    ${entry.name} ${entry.method} ${entry.concrete || ''}`);
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
      `\n${failures.length} disagreement(s) with the authoritative specs across ${total} SDK REST paths and ${usages.length} call sites.`
    );
    console.error(
      'Fix the path or the method (or re-sync api-schemas if the API legitimately changed).'
    );
    process.exitCode = 1;
    return;
  }

  // Say what was checked and what was not. Between #131 and #184 this line read
  // "All N verifiable REST paths exist", which was true and also more than the
  // gate proved: nothing had looked at a single method.
  console.log(
    `\nAll ${matched.length + inlineMatched.length} verifiable REST paths exist in the Liferay OpenAPI specs (${prefixes.length} prefixes, ${unverifiable.length + inlineUnverified.length} unverifiable), and all ${methodMatched.length} of ${usages.length} call sites whose path resolves to a spec template use a method it declares (${methodUnverifiable.length} unverifiable).`
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  ARG_OVERRIDES,
  HTTP_HELPER_METHODS,
  KNOWN_UNVERIFIED_INLINE,
  ROOTS_WITHOUT_SPECS,
  harvestInlinePaths,
  SENTINEL,
  harvestMethodUsages,
  harvestPaths,
  isTemplatePrefix,
  loadSpecTemplates,
  normalizePath,
  pathMatchesTemplate,
  resolvePathExpression,
  run,
};
