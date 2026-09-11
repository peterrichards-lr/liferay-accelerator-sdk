#!/usr/bin/env node
/**
 * Records what a seeded Liferay holds, as the integration suite's fixture.
 *
 * The suite cannot assert against catalogue totals. The instance is not clean
 * and never will be - it holds products from more than one generation run, and
 * the next run changes the figure again - so `totalCount === 27` is a property
 * of the instance's history rather than of the code under test (#208).
 *
 * So the fixture is keyed on identity: named product external reference codes
 * and what each one holds. Leftovers cannot move those.
 *
 * The codes are not reproducible. `createERC` in AICA builds them from
 * `Date.now()`, a within-millisecond collision counter and eight random hex
 * characters, so nothing after the `AICA-PRD-` prefix survives a regeneration.
 * That is why the fixture is *recorded* rather than hand-written, and why this
 * script exists: regenerate the seed with the recipe below, run this, commit
 * the result. The fixture is data; the recipe and this recorder are how the
 * data comes back after `./gradlew resetBundleFull` wipes it.
 *
 * Usage:
 *     LIFERAY_API_URL=http://localhost:8080 \
 *     LIFERAY_OAUTH_CLIENT_ID=... LIFERAY_OAUTH_CLIENT_SECRET=... \
 *     node scripts/record-integration-fixture.cjs
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { LiferayService } = require('../src/liferay/index.cjs');
const OAuthService = require('../src/liferay/oauth.cjs');
const {
  FIXTURE_FILE,
  RECIPE,
  describeMissingFixture,
} = require('../tests/integration/fixture.mjs');

const silentLogger = {
  debug() {},
  info() {},
  warn() {},
  error() {},
  success() {},
  trace() {},
};

/**
 * `_getExclusions` reads `ctx.config.getExcludeLists`, which is a fact about
 * the consuming application rather than about Liferay. An empty set is the
 * honest stand-in: the fixture records what the instance holds, not what some
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

function describeBytes(buffer, contentType) {
  return {
    bytes: buffer.length,
    sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
    // The first bytes of the format, so a test can say "this is a WebP" rather
    // than only "this is 954 bytes".
    magicHex: buffer.subarray(0, 4).toString('hex'),
    contentType,
  };
}

async function recordProduct(liferay, config, product) {
  const erc = product.externalReferenceCode;
  const images = await liferay.rest.getProductImages(config, erc);
  const attachments = await liferay.rest.getProductAttachments(config, erc);

  const record = {
    externalReferenceCode: erc,
    skuCount: (product.skus || []).length,
    imageCount: images.length,
    attachmentCount: attachments.length,
    image: null,
    attachment: null,
  };

  if (images.length > 0) {
    const { buffer, contentType } = await liferay.rest.getProductImageContent(
      config,
      images[0].src
    );
    record.image = describeBytes(buffer, contentType);
  }

  if (attachments.length > 0) {
    const { buffer, contentType } =
      await liferay.rest.getProductAttachmentContent(
        config,
        attachments[0].src
      );
    record.attachment = describeBytes(buffer, contentType);
  }

  return record;
}

async function main() {
  const config = {
    liferayUrl: process.env.LIFERAY_API_URL,
    clientId: process.env.LIFERAY_OAUTH_CLIENT_ID,
    clientSecret: process.env.LIFERAY_OAUTH_CLIENT_SECRET,
  };

  if (!config.liferayUrl || !config.clientId || !config.clientSecret) {
    throw new Error(
      'LIFERAY_API_URL, LIFERAY_OAUTH_CLIENT_ID and LIFERAY_OAUTH_CLIENT_SECRET ' +
        'must all be set to record the fixture.'
    );
  }

  const liferay = new LiferayService(createServiceContext());

  const { items: products } = await liferay.getProductsWithSkus(config, {});
  if (products.length === 0) {
    throw new Error(describeMissingFixture([], config.liferayUrl));
  }

  const sorted = [...products].sort((a, b) =>
    String(a.externalReferenceCode).localeCompare(
      String(b.externalReferenceCode)
    )
  );

  const recorded = [];
  for (const product of sorted) {
    recorded.push(await recordProduct(liferay, config, product));
  }

  const fixture = {
    $comment:
      'Recorded from a live instance by scripts/record-integration-fixture.cjs. ' +
      'Do not hand-edit: the external reference codes are minted per run and ' +
      'cannot be reproduced, so a regenerated seed needs re-recording rather ' +
      'than patching. See recipe. This records whatever the instance held at ' +
      'recordedAt, which may be more than one generation run or import - the ' +
      'suite asserts per product, so extra products are harmless and only a ' +
      'missing one fails.',
    recordedAt: new Date().toISOString(),
    instance: {
      liferayUrl: config.liferayUrl,
      dxpRelease: process.env.LIFERAY_DXP_RELEASE || null,
    },
    recipe: RECIPE,
    account: {
      primaryAccountId: await liferay.rest.getPrimaryAccountId(config),
      accountCount: await liferay.rest.getAccountCount(config),
    },
    products: recorded,
  };

  const target = path.join(
    __dirname,
    '..',
    'tests',
    'integration',
    FIXTURE_FILE
  );
  fs.writeFileSync(target, `${JSON.stringify(fixture, null, 2)}\n`);

  console.log(`Recorded ${recorded.length} product(s) to ${target}`);
  for (const product of recorded) {
    console.log(
      `  ${product.externalReferenceCode}: ${product.skuCount} sku(s), ` +
        `${product.imageCount} image(s), ${product.attachmentCount} attachment(s)`
    );
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`Failed to record the fixture: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { describeBytes, recordProduct };
