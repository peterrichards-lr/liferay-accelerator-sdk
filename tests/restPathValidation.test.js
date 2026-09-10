import { afterAll, describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import nodePath from 'path';
const require = createRequire(import.meta.url);

const {
  ARG_OVERRIDES,
  HTTP_HELPER_METHODS,
  KNOWN_UNVERIFIED_INLINE,
  harvestInlinePaths,
  harvestMethodUsages,
  harvestPaths,
  isTemplatePrefix,
  loadSpecTemplates,
  normalizePath,
  pathMatchesTemplate,
  resolvePathExpression,
  run,
} = require('../scripts/validate-rest-paths.cjs');
const { PATH } = require('../src/utils/liferayPaths.cjs');

/**
 * Guards against REST path drift: every path the SDK can emit is harvested from
 * the profile table and matched against the OpenAPI documents in api-schemas.
 * See scripts/validate-rest-paths.cjs.
 */
describe('REST path validation', () => {
  it('validates every emittable SDK path against the OpenAPI specs', () => {
    const { failures, matched } = run();

    const reported = failures.map(
      (entry) =>
        `${entry.name}: ${entry.concrete || '(not emitted)'} - ${entry.reason}`
    );

    expect(reported).toEqual([]);
    expect(matched.length).toBeGreaterThan(100);
  });

  it('harvests every emittable member of the PATH table', () => {
    const harvested = harvestPaths();
    const harvestedNames = new Set(
      harvested.map((entry) => entry.name.replace(/\[.*\]$/, ''))
    );

    const emittable = Object.entries(PATH)
      .filter(([name]) => !['VARIANT', 'CUSTOM_OBJECTS', 'BASE'].includes(name))
      .filter(
        ([, value]) => typeof value === 'string' || typeof value === 'function'
      )
      .map(([name]) => name);

    const missed = emittable.filter((name) => !harvestedNames.has(name));
    expect(missed).toEqual([]);
  });

  it('emits at least one path for every entry, including overridden ones', () => {
    const harvested = harvestPaths();
    const unusable = harvested.filter((entry) => entry.harvestError);

    expect(unusable).toEqual([]);
    // The override exists because this entry rejects an unknown asset type.
    expect(Object.keys(ARG_OVERRIDES)).toContain('PERMISSIONS_BY_ASSET');
  });

  it('matches concrete paths against templated segments', () => {
    const template = '/o/api/v1.0/products/{id}/skus';

    expect(pathMatchesTemplate('/o/api/v1.0/products/42/skus', template)).toBe(
      true
    );
    // A template segment must not swallow more than one path segment.
    expect(
      pathMatchesTemplate('/o/api/v1.0/products/42/7/skus', template)
    ).toBe(false);
    expect(pathMatchesTemplate('/o/api/v1.0/products/42', template)).toBe(
      false
    );
    expect(
      pathMatchesTemplate('/o/api/v1.0/products/42/options', template)
    ).toBe(false);
  });

  it('strips query strings and trailing slashes before matching', () => {
    expect(normalizePath('/o/x/v1.0/products/batch?callbackURL=cb')).toBe(
      '/o/x/v1.0/products/batch'
    );
    expect(normalizePath('/o/x/v1.0/products/')).toBe('/o/x/v1.0/products');
  });

  it('separates prefixes from endpoints', () => {
    const templates = [
      { template: '/o/x/v1.0/products/{id}', methods: ['GET'] },
    ];

    expect(isTemplatePrefix('/o/x/v1.0/products', templates)).toBe(true);
    expect(isTemplatePrefix('/o/x/v1.0/nonsense', templates)).toBe(false);
  });

  it('treats a placeholder spec as unverifiable rather than passing or failing', () => {
    const { placeholderRoots } = loadSpecTemplates();
    const { unverifiable } = run();

    // The order spec declares no paths (issue #130), so order paths cannot be
    // checked either way and must not be reported as valid.
    expect(Object.keys(placeholderRoots)).toContain(
      '/o/headless-commerce-admin-order'
    );
    expect(unverifiable.some((entry) => entry.name === 'ORDERS_BATCH')).toBe(
      true
    );
  });

  describe('inline paths outside the path profile', () => {
    it('harvests the API paths written inline in src', () => {
      const inline = harvestInlinePaths();

      expect(inline.length).toBeGreaterThan(10);
      // Each is reported with a file:line so it can be found and fixed.
      for (const entry of inline) {
        expect(entry.name).toMatch(/\.(cjs|js):\d+$/);
        expect(entry.path.startsWith('/o/')).toBe(true);
        // Interpolations are replaced, so nothing unresolved reaches matching.
        expect(entry.path).not.toContain('${');
      }
    });

    it('validates them alongside the profile paths', () => {
      const { inline, inlineMatched, inlineUnverified } = run();

      expect(inline.length).toBe(
        inlineMatched.length + inlineUnverified.length
      );
      expect(inlineMatched.length).toBeGreaterThan(0);
    });

    it('tolerates only the paths explicitly listed as unverified', () => {
      const { inlineUnverified } = run();

      // Anything unverified is either a listed exception or served by an API
      // with no synced spec - never an unexplained mismatch.
      for (const entry of inlineUnverified) {
        expect(entry.reason).toBeTruthy();
        if (entry.known) {
          expect(Object.keys(KNOWN_UNVERIFIED_INLINE)).toContain(
            entry.concrete
          );
        }
      }
    });

    it('keeps the known-unverified list honest', () => {
      const { failures, inlineMatched } = run();

      // An entry that starts matching a spec must be removed, so the list
      // cannot outlive the mismatch it documents.
      const stale = inlineMatched.filter((entry) =>
        Object.prototype.hasOwnProperty.call(
          KNOWN_UNVERIFIED_INLINE,
          entry.concrete
        )
      );
      expect(stale).toEqual([]);
      expect(failures).toEqual([]);
    });
  });

  it('fails a path that does not exist in any spec', () => {
    const { failures } = run({
      table: {
        MADE_UP: '/o/headless-commerce-admin-catalog/v1.0/nonexistent-resource',
      },
    });

    expect(failures).toHaveLength(1);
    expect(failures[0].name).toBe('MADE_UP');
    expect(failures[0].reason).toMatch(/no matching path/);
  });
});

/**
 * Guards against the other half of the same drift (#184): a path can exist and
 * still not accept the verb the SDK sends it. The verb is taken from the call
 * site rather than from the PATH constant, because the constant is often only
 * the base a longer path is composed from.
 */
describe('REST method validation', () => {
  const scratch = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'rest-methods-'));

  afterAll(() => fs.rmSync(scratch, { recursive: true, force: true }));

  /** Writes a source tree holding one call, and validates against it. */
  const validateCall = (name, call) => {
    const srcDir = nodePath.join(scratch, name, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(
      nodePath.join(srcDir, 'fixture.cjs'),
      `class Fixture {\n  async call(config, id) {\n    return this.http.${call};\n  }\n}\nmodule.exports = Fixture;\n`
    );
    return run({ srcDir });
  };

  it('checks the verb of every call site whose path resolves', () => {
    const { failures, methodMatched, methodUnverifiable, usages } = run();

    const reported = failures.map(
      (entry) => `${entry.name}: ${entry.concrete} - ${entry.reason}`
    );

    expect(reported).toEqual([]);
    expect(methodMatched.length).toBeGreaterThan(50);
    // Every call site is accounted for, either checked or explained.
    expect(usages.length).toBe(
      methodMatched.length + methodUnverifiable.length
    );
    for (const entry of methodUnverifiable) {
      expect(entry.reason).toBeTruthy();
    }
  });

  it('fails a GET against a DELETE-only template', () => {
    // /v1.0/attachment/{id} takes DELETE and nothing else, which is exactly
    // what #181 nearly shipped a read against.
    const { failures } = validateCall(
      'delete-only',
      "_get(config, PATH.ATTACHMENT(id), 'read-attachment')"
    );

    expect(failures).toHaveLength(1);
    expect(failures[0].name).toMatch(/fixture\.cjs:3$/);
    expect(failures[0].concrete).toMatch(/\/v1\.0\/attachment\/\d+$/);
    expect(failures[0].reason).toMatch(/sends GET/);
    expect(failures[0].reason).toMatch(/declares DELETE/);
  });

  it('passes the DELETE that template does declare', () => {
    const { failures, methodMatched } = validateCall(
      'delete-allowed',
      "_delete(config, PATH.ATTACHMENT(id), 'delete-attachment')"
    );

    expect(failures).toEqual([]);
    expect(methodMatched.some((entry) => entry.method === 'DELETE')).toBe(true);
  });

  it('resolves a path composed at the call site, not the constant it starts from', () => {
    // Keyed on the constant these read as mismatches: /warehouses takes no
    // DELETE and /price-entries/{id} takes no POST. Keyed on what is actually
    // requested, both are correct.
    expect(resolvePathExpression('`${PATH.WAREHOUSES}/${warehouseId}`')).toBe(
      `${PATH.WAREHOUSES}/12345`
    );
    expect(
      resolvePathExpression('`${PATH.PRICE_ENTRY(result.id)}/tier-prices`')
    ).toBe(`${PATH.PRICE_ENTRY('12345')}/tier-prices`);
    // The query string is stripped before matching, so q() adds nothing.
    expect(resolvePathExpression('PATH.PRICE_LISTS + q(params)')).toBe(
      PATH.PRICE_LISTS
    );
    expect(
      resolvePathExpression("'/o/headless-admin-user/v1.0/accounts'")
    ).toBe('/o/headless-admin-user/v1.0/accounts');
    // A URL assembled earlier cannot be recovered, and is reported unverifiable
    // rather than guessed at.
    expect(resolvePathExpression('listUrl')).toBeNull();
    expect(resolvePathExpression('ops.getPath(id)')).toBeNull();
  });

  it('accepts a verb declared by any template the path matches', () => {
    // headless-batch-engine declares /import-task/{className} (DELETE, POST,
    // PUT) and /import-task/{importTaskId} (GET). /import-task/42 is a legal
    // request against either, so reading the first one found would fail a GET
    // the spec plainly allows.
    const { failures, methodMatched } = validateCall(
      'ambiguous',
      "_get(config, PATH.IMPORT_TASK(id), 'get-import-task')"
    );

    expect(failures).toEqual([]);
    expect(
      methodMatched.some((entry) => entry.template.endsWith('/{importTaskId}'))
    ).toBe(true);
  });

  it('leaves the SQLite _get out of the harvest', () => {
    // persistenceService has its own _get(sql, ...params). A SQL statement is
    // not a REST path, and matching on the helper name alone would send a
    // dozen of them looking for an OpenAPI template.
    const usages = harvestMethodUsages();

    expect(usages.length).toBeGreaterThan(50);
    expect(
      usages.some((entry) => entry.name.includes('persistenceService'))
    ).toBe(false);
    for (const entry of usages) {
      expect(entry.name).toMatch(/\.(cjs|js):\d+$/);
      expect(Object.values(HTTP_HELPER_METHODS)).toContain(entry.method);
    }
  });

  it('says so when a call names a PATH member the profile does not define', () => {
    const { methodUnverifiable } = validateCall(
      'undefined-member',
      "_get(config, PATH.NOT_A_REAL_MEMBER, 'nonsense')"
    );

    expect(
      methodUnverifiable.some((entry) =>
        /does not define/.test(entry.reason || '')
      )
    ).toBe(true);
  });
});

describe('liferayPaths regressions', () => {
  const CATALOG = '/o/headless-commerce-admin-catalog/v1.0';

  it('addresses a product by id on the products collection', () => {
    // The catalog API has no singular /product/{id} endpoint.
    expect(PATH.PRODUCT(42)).toBe(`${CATALOG}/products/42`);
  });

  it('addresses an option value by ERC on the optionValues collection', () => {
    // There is no /options/{id}/optionValues/by-externalReferenceCode variant.
    expect(PATH.OPTION_VALUE_BY_ERC('OV-1')).toBe(
      `${CATALOG}/optionValues/by-externalReferenceCode/OV-1`
    );
  });

  it('keeps site languages on headless-delivery', () => {
    expect(PATH.SITE_LANGUAGES(99)).toBe(
      '/o/headless-delivery/v1.0/sites/99/languages'
    );
  });
});
