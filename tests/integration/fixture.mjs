/**
 * The seeded data the live suite asserts against, and how to get it back.
 *
 * Keyed on identity, never on totals. The instance is not clean and never will
 * be: it holds products from more than one generation run, and the next run
 * changes the figure again, so `totalCount === 27` asserts a property of the
 * instance's history rather than of the code under test (#208). Named products
 * and what each one holds are properties of the seed, and leftovers cannot move
 * them.
 *
 * The codes cannot be written by hand. AICA's `createERC` builds them from
 * `Date.now()`, a within-millisecond collision counter and eight random hex
 * characters, so nothing after the `AICA-PRD-` prefix survives a regeneration -
 * not even the index, which is a collision counter rather than a position. The
 * fixture is therefore recorded from the instance and committed, and `RECIPE`
 * is how a wiped bundle gets back to a state worth recording.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const FIXTURE_FILE = 'fixture.json';

const FIXTURE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  FIXTURE_FILE
);

/**
 * How to recreate the seed, and then the fixture that describes it.
 *
 * Two steps, because they are two different things: the first puts commerce
 * data on the instance, the second records what it happens to have produced.
 * Only the second is reproducible - the first mints new external reference
 * codes every time.
 *
 * `--demo` is load-bearing rather than a convenience: it is what produces the
 * fixed 3x3 option matrix, so nine SKUs per product is a consequence of that
 * flag. A live-AI run produces whatever the model returns.
 */
export const RECIPE = {
  wipe: './gradlew resetBundleFull    # in the AICA repo; refuses while 8080 is in use',
  seed: [
    'node scripts/aica-cli.cjs generate',
    '  --demo --products 5 --images default --pdfs default',
    '  --catalog-id <id> --channel-id <id> --site-group-id <id>',
    '  --non-interactive',
  ].join(' \\\n'),
  record: [
    'LIFERAY_API_URL=http://localhost:8080 \\',
    'LIFERAY_OAUTH_CLIENT_ID=... LIFERAY_OAUTH_CLIENT_SECRET=... \\',
    'node scripts/record-integration-fixture.cjs',
  ].join('\n'),
  notes: [
    'The seed runs against the AICA microservice (default http://localhost:3001),',
    'not against Liferay directly, so that has to be up too.',
    'Nine SKUs per product comes from --demo, not from a flag; there is no --skus.',
    'The default image and PDF come from the Liferay config object entries',
    'DEFAULT-IMAGE and DEFAULT-PDF, so their bytes are only stable while those are.',
  ],
};

export function describeRecipe() {
  return [
    'Recreate the seed, then re-record the fixture:',
    '',
    `  1. wipe (optional):  ${RECIPE.wipe}`,
    '',
    '  2. seed:',
    RECIPE.seed
      .split('\n')
      .map((line) => `       ${line}`)
      .join('\n'),
    '',
    '  3. record:',
    RECIPE.record
      .split('\n')
      .map((line) => `       ${line}`)
      .join('\n'),
    '',
    ...RECIPE.notes.map((note) => `  ${note}`),
  ].join('\n');
}

export function loadFixture(fixturePath = FIXTURE_PATH) {
  if (!fs.existsSync(fixturePath)) {
    throw new Error(
      [
        `The integration fixture is missing (${fixturePath}).`,
        '',
        describeRecipe(),
      ].join('\n')
    );
  }

  return JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
}

/**
 * The message a run gets when the instance no longer holds what was recorded -
 * the bundle was reset, or the data deleted.
 *
 * "The fixture has gone" must be an instruction rather than a mystery, so the
 * recipe is printed here rather than left in a README somebody has to find.
 */
export function describeMissingFixture(missingErcs, liferayUrl) {
  return [
    missingErcs.length === 0
      ? `${liferayUrl} holds no products at all, so there is nothing for the live suite to assert against.`
      : `${liferayUrl} no longer holds ${missingErcs.length} of the products the fixture names, so the recorded expectations cannot be checked:`,
    ...missingErcs.map((erc) => `  - ${erc}`),
    '',
    describeRecipe(),
  ].join('\n');
}

/**
 * Which of the fixture's products the instance still has.
 *
 * Resolved by external reference code rather than by counting, so leftovers
 * from other runs are irrelevant and a partially deleted seed is named rather
 * than silently passing on whatever survived.
 */
export function findMissingProducts(fixture, liveProducts) {
  const present = new Set(
    liveProducts.map((product) => product.externalReferenceCode)
  );

  return fixture.products
    .map((product) => product.externalReferenceCode)
    .filter((erc) => !present.has(erc));
}
