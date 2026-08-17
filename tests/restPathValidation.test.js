import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  ARG_OVERRIDES,
  KNOWN_UNVERIFIED_INLINE,
  harvestInlinePaths,
  harvestPaths,
  isTemplatePrefix,
  loadSpecTemplates,
  normalizePath,
  pathMatchesTemplate,
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
