import { describe, it, expect, beforeAll } from 'vitest';
import LiferayRestService from '../../src/liferay/rest.cjs';
import OAuthService from '../../src/liferay/oauth.cjs';
import { LiferayService } from '../../src/liferay/index.cjs';
import { PATH } from '../../src/utils/liferayPaths.cjs';
import {
  assertIntegrationPreconditions,
  isIntegrationRunRequested,
} from './preconditions.mjs';
import {
  describeMissingFixture,
  findMissingProducts,
  loadFixture,
} from './fixture.mjs';

const isIntegrationTest = isIntegrationRunRequested(process.env);

// Thrown at collection, before a single test is registered, so an unrunnable
// suite is reported as a failed file rather than as skipped tests - which is
// the shape that let this suite report success for a year without ever
// reaching a Liferay (#224). Skipping is right only when the suite was not
// asked to run; once the switch is on, a missing variable is a failure that
// names itself.
if (isIntegrationTest) {
  assertIntegrationPreconditions(process.env);
}

const silentLogger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  success: () => {},
  trace: () => {},
};

/**
 * OAuthService reads `ctx.cache` with `get`, `set(key, value, ttlMs)` and
 * `clear`. A Map satisfies all three and discards the TTL, which costs nothing
 * for a process that lives for the length of one run.
 *
 * `config.getExcludeLists` is the consuming application's exclusion list, which
 * `_getExclusions` reads before every discovery call. An empty set is the
 * honest stand-in here: the suite asserts what Liferay holds, not what some
 * consumer would have filtered out of it.
 */
function createServiceContext() {
  const ctx = {
    logger: silentLogger,
    cache: new Map(),
    config: { getExcludeLists: async () => ({}) },
  };
  ctx.oauth = new OAuthService(ctx);
  return ctx;
}

describe.skipIf(!isIntegrationTest)('DXP Integration Suite (Opt-in)', () => {
  // Client credentials rather than Basic auth. liferay-demo-accelerator#64
  // removes the username/password fallback from HttpCoreService and
  // graphql.cjs, and this suite is the only live coverage in the project that
  // would have stopped authenticating when it did.
  //
  // No defaults: a default URL or credential is what lets a misconfigured run
  // look like a passing one.
  const config = {
    liferayUrl: process.env.LIFERAY_API_URL,
    clientId: process.env.LIFERAY_OAUTH_CLIENT_ID,
    clientSecret: process.env.LIFERAY_OAUTH_CLIENT_SECRET,
  };

  const ctx = createServiceContext();
  const restClient = new LiferayRestService(ctx);
  const liferay = new LiferayService(ctx);
  const fixture = loadFixture();

  let liveProducts = [];

  // The only thing standing between a leftover-laden instance and a green run
  // that proved nothing. Resolution is by external reference code, so products
  // from other runs are irrelevant and a partly deleted seed is named rather
  // than quietly reducing what gets asserted.
  beforeAll(async () => {
    const { items } = await liferay.getProductsWithSkus(config, {});
    liveProducts = items;

    const missing = findMissingProducts(fixture, items);
    if (missing.length > 0) {
      throw new Error(describeMissingFixture(missing, config.liferayUrl));
    }
  });

  const productsWithImages = fixture.products.filter(
    (product) => product.imageCount > 0
  );
  const productsWithAttachments = fixture.products.filter(
    (product) => product.attachmentCount > 0
  );

  describe('Product media round trip (#189, #181)', () => {
    // The round trip #189 broke: an attachment's `src` comes back rooted at an
    // origin Liferay advertises rather than one a caller can dial. This
    // instance serves `https://localhost:8080/...` - https on the plaintext
    // port - so a bare HTTP client fetching that `src` fails here, live, and
    // only `_resolveUrl` rewriting it against the configured host makes the
    // bytes reachable. A unit test cannot reach this: it supplies a
    // well-formed `src`.
    it.each(productsWithImages)(
      'fetches the recorded image bytes for $externalReferenceCode',
      async (expected) => {
        const images = await restClient.getProductImages(
          config,
          expected.externalReferenceCode
        );
        expect(images).toHaveLength(expected.imageCount);

        const { buffer, contentType } = await restClient.getProductImageContent(
          config,
          images[0].src
        );

        expect(buffer.length).toBe(expected.image.bytes);
        expect(buffer.subarray(0, 4).toString('hex')).toBe(
          expected.image.magicHex
        );
        expect(contentType).toBe(expected.image.contentType);
      }
    );

    it.each(productsWithAttachments)(
      'fetches the recorded attachment bytes for $externalReferenceCode',
      async (expected) => {
        const attachments = await restClient.getProductAttachments(
          config,
          expected.externalReferenceCode
        );
        expect(attachments).toHaveLength(expected.attachmentCount);

        const { buffer, contentType } =
          await restClient.getProductAttachmentContent(
            config,
            attachments[0].src
          );

        expect(buffer.length).toBe(expected.attachment.bytes);
        expect(buffer.subarray(0, 4).toString('hex')).toBe(
          expected.attachment.magicHex
        );
        expect(contentType).toBe(expected.attachment.contentType);
      }
    );

    it('serves an image `src` whose origin a caller could not have dialled', async () => {
      const [first] = productsWithImages;
      const images = await restClient.getProductImages(
        config,
        first.externalReferenceCode
      );

      // Not an assertion about a bug - an assertion that the condition #189
      // hardened against is present on this instance, so the tests above are
      // exercising the rewrite rather than passing because the origin happened
      // to be right. If Liferay ever advertises a dialable origin here, this
      // fails and says the coverage has gone quiet.
      const advertised = new URL(images[0].src, config.liferayUrl);
      expect(advertised.origin).not.toBe(new URL(config.liferayUrl).origin);
    });
  });

  describe('Products carry their SKUs (#199)', () => {
    // `getProductsWithSkus` named a path no profile defined, so every call
    // requested `<liferay>/undefined`, 404'd, and the failure was swallowed
    // into an empty list. Every unit test passed, because a mock returns what
    // it is told to.
    it.each(fixture.products)(
      'returns $skuCount sku(s) for $externalReferenceCode',
      (expected) => {
        const live = liveProducts.find(
          (product) =>
            product.externalReferenceCode === expected.externalReferenceCode
        );

        expect(live).toBeDefined();
        expect(live.skus).toHaveLength(expected.skuCount);
      }
    );

    // The method projects each SKU to four fields rather than passing
    // Liferay's whole Sku through - `id` is deliberately not among them - so
    // this pins the projection a caller actually receives. Dropping one of
    // these is a breaking change that the SKU *count* above would not notice.
    it('projects each SKU to the four fields the method returns', () => {
      const withSkus = fixture.products.find((product) => product.skuCount > 0);
      const live = liveProducts.find(
        (product) =>
          product.externalReferenceCode === withSkus.externalReferenceCode
      );

      for (const sku of live.skus) {
        expect(Object.keys(sku).sort()).toEqual([
          'externalReferenceCode',
          'price',
          'purchasable',
          'sku',
        ]);
        expect(typeof sku.sku).toBe('string');
        expect(sku.sku.length).toBeGreaterThan(0);
        expect(typeof sku.externalReferenceCode).toBe('string');
      }
    });
  });

  describe('Paged readers report what exists, not what was kept (#200, #203)', () => {
    // Deliberately free of the fixture, and deliberately relationships rather
    // than absolutes. The SKU collection spans several pages and its size
    // changes whenever anybody generates anything, so `totalCount === 141`
    // would assert the instance's history. These hold whatever the figure is.
    const readSkuPages = (cfg, page, pageSize) =>
      liferay.rest._get(
        cfg,
        PATH.SKUS,
        'integration-skus',
        'Integration SKUs',
        {
          params: { page, pageSize },
        }
      );

    let unbounded;

    beforeAll(async () => {
      unbounded = await liferay._collectAllItems(
        config,
        readSkuPages,
        null,
        20,
        {
          op: 'integration-skus-all',
        }
      );
    });

    it('returns every row of a multi-page collection', () => {
      expect(unbounded.items.length).toBe(unbounded.totalCount);
      expect(unbounded.truncated).toBe(false);
      // A single-page collection would prove nothing about paging.
      expect(unbounded.totalCount).toBeGreaterThan(20);
    });

    it('stops at the ceiling while still reporting the full figure', async () => {
      const ceiling = 3;
      const capped = await liferay._collectAllItems(
        config,
        readSkuPages,
        ceiling,
        20,
        { op: 'integration-skus-capped' }
      );

      expect(capped.items).toHaveLength(ceiling);
      // The defect this pins: the kept count must never become the reported
      // total. Before #203 this returned `totalCount: items.length`, so a
      // caller could not tell a collection of exactly 3 from one of 141.
      expect(capped.totalCount).toBe(unbounded.totalCount);
      expect(capped.totalCount).toBeGreaterThan(ceiling);
      expect(capped.truncated).toBe(true);
    });
  });

  describe('Account reads', () => {
    // `null` is a fact about the fixture rather than about the code: it means
    // the service account the suite authenticates as names no account. Before
    // #228 this method ended in `catch { return null }`, so it answered `null`
    // for a 401, a 404 and a DNS failure alike - and the assertion here
    // accepted it, inside the file whose purpose is catching exactly that.
    // The swallow is gone, so reaching this assertion proves the call
    // authenticated and was answered.
    it('fetches the primary account id the fixture recorded', async () => {
      const accountId = await restClient.getPrimaryAccountId(config);
      expect(accountId).toBe(fixture.account.primaryAccountId);
    });

    it('counts at least the accounts the fixture recorded', async () => {
      const count = await restClient.getAccountCount(config);
      expect(Number.isInteger(count)).toBe(true);
      // At least, not exactly: an account added since the recording is not a
      // regression, while losing one is.
      expect(count).toBeGreaterThanOrEqual(fixture.account.accountCount);
    });
  });
});
