/**
 * Reads the provenance recorded beside the OpenAPI documents in api-schemas/.
 *
 * scripts/sync-schemas.js writes api-schemas/PROVENANCE.json on every sync
 * because a Liferay openapi.json records nothing about the portal that served
 * it: no release, and a `servers` entry that only ever names the host it was
 * fetched from. Recording it was half the job (#204). Until something reads it
 * back, the record is a comment: it can rot without anything noticing, and
 * `yarn validate:rest` still reports the specs as authoritative without saying
 * which DXP line they are authoritative for.
 *
 * This is the reader. It answers one question about the documents
 * scripts/validate-rest-paths.cjs is about to trust - "where did these come
 * from" - and is deliberately offline: it compares the directory against the
 * manifest, and the recorded releases against each other and against the shape
 * a DXP release line actually has. Comparing a recorded release against the
 * line a live instance reports needs a target to ask and is left to a
 * follow-up, as #204 says.
 *
 * The first attempt to fool the gate succeeded on every count (#231): it
 * asserted the manifest's shape and never a value, so `2099.Q9.9` and `banana`
 * both passed as releases, and `unknown` was filtered out before the only
 * value-level check, so a manifest recording nothing at all was fully green.
 * Every document is now classified, and every class is accounted for.
 */
const fs = require('fs');
const path = require('path');

const SCHEMA_DIR = path.join(__dirname, '..', 'api-schemas');
const PROVENANCE_FILE = 'PROVENANCE.json';

/**
 * The suffix scripts/validate-rest-paths.cjs uses to decide what is a contract
 * document. Kept identical on purpose: the gate must describe exactly the set
 * of files it validates against, not a similar one.
 */
const SPEC_SUFFIX = '-openapi.json';

const UNRECORDED_RELEASE = 'unknown';

/**
 * The shape of a DXP release line, as this ecosystem writes it: `2026.q3.0`,
 * `2026.Q3.2`, `dxp-2025.q1.17-lts`.
 *
 * The 7.x form (`7.4.13-u108`) is deliberately absent. Every instance this SDK
 * is pointed at is on the quarterly line, and a gate that accepts a form
 * nothing here uses buys nothing while widening what can be recorded. Syncing
 * from a 7.x bundle should fail here and be widened deliberately, rather than
 * record a release the gate cannot reason about.
 */
const RELEASE_PATTERN = /^(?:dxp-)?(\d{4})\.q([1-4])\.(\d{1,3})(?:-lts)?$/i;

/** Quarterly releases begin well after this; anything earlier is not one. */
const EARLIEST_PLAUSIBLE_RELEASE_YEAR = 2023;

/**
 * Documents whose provenance is unrecorded and whose provenance only a re-sync
 * can establish, tolerated by name and with the reason stated.
 *
 * This list is the difference between a gap that is known and one that is
 * invisible. Before #231 every unrecorded document was filtered out before the
 * only value-level check, so a manifest recording nothing at all passed; making
 * them fail outright instead would turn the gate red on a state nobody can fix
 * until the re-sync in #231 happens and a human has decided which instance is
 * canonical. So they are tolerated here, where widening the tolerance is a code
 * change somebody has to review, and where a document that is NOT on this list
 * fails the moment its provenance goes unrecorded.
 *
 * The tolerance is checked in both directions: an entry naming a document that
 * has since been re-synced, or that is no longer in api-schemas/, is itself a
 * failure, so this cannot quietly outlive what it excuses.
 *
 * @see https://github.com/peterrichards-lr/liferay-accelerator-sdk/issues/231
 */
const UNRECORDED_TOLERANCE_REASON =
  'captured 2026-05-11, before provenance was recorded (#204), and carried ' +
  'into this repository by the squashed import that hid their origin. Only a ' +
  're-sync can establish the line, and #231 holds that until a human has ' +
  'confirmed which instance is canonical';

const TOLERATED_UNRECORDED_SPECS = [
  'headless-admin-address-v1.0-openapi.json',
  'headless-admin-site-v1.0-openapi.json',
  'headless-admin-user-v1.0-openapi.json',
  'headless-batch-engine-v1.0-openapi.json',
  'headless-commerce-admin-catalog-v1.0-openapi.json',
  'headless-commerce-admin-channel-v1.0-openapi.json',
  'headless-commerce-admin-inventory-v1.0-openapi.json',
  'headless-commerce-admin-order-v1.0-openapi.json',
  'headless-commerce-admin-pricing-v1.0-openapi.json',
  'headless-commerce-admin-pricing-v2.0-openapi.json',
  'headless-delivery-v1.0-openapi.json',
];

/** @returns {string[]} spec file names, sorted, as the validator sees them. */
function listSpecFiles(schemaDir = SCHEMA_DIR) {
  return fs
    .readdirSync(schemaDir)
    .filter((file) => file.endsWith(SPEC_SUFFIX))
    .sort();
}

/**
 * A release string is provenance only when it names something. `unknown` is
 * what sync-schemas.js writes when neither LIFERAY_DXP_RELEASE nor the
 * Liferay-Portal header said, and an honest gap must not be counted as an
 * answer.
 */
function isRecordedRelease(release) {
  return (
    typeof release === 'string' &&
    release.trim() !== '' &&
    release.trim().toLowerCase() !== UNRECORDED_RELEASE
  );
}

/**
 * Whether a recorded release could be a DXP release line at all.
 *
 * Nothing validated this until #231, and nothing measures it even now: the only
 * source in practice is LIFERAY_DXP_RELEASE, which is free text an operator
 * sets. That is how the manifest came to record `2026.Q3.2` for documents
 * captured from a `2026.q3.0` box, and how `banana` passed the gate. A shape
 * check cannot tell a wrong release from a right one - only that a typo, a
 * placeholder or a joke is not a release.
 *
 * @param {*} release the recorded value
 * @param {{maxYear?: number}} [options] upper bound on a plausible year;
 *   defaults to next year, so a release from the future is refused without
 *   this needing an edit every January.
 */
function isPlausibleRelease(release, { maxYear } = {}) {
  if (!isRecordedRelease(release)) return false;

  const match = RELEASE_PATTERN.exec(release.trim());
  if (!match) return false;

  const year = Number(match[1]);
  const upperBound = maxYear ?? new Date().getFullYear() + 1;

  return year >= EARLIEST_PLAUSIBLE_RELEASE_YEAR && year <= upperBound;
}

/**
 * Whether a recorded release was asserted by an operator rather than measured.
 *
 * `describeRelease()` in sync-schemas.js prefers LIFERAY_DXP_RELEASE over
 * everything else, and on DXP the only other source - the `Liferay-Portal`
 * header - carries no version, so the environment variable is the sole source
 * in practice. The gate's closing sentence used to present that as though the
 * instance had reported it (#231).
 */
function isOperatorAsserted(source) {
  return typeof source === 'string' && source.includes('LIFERAY_DXP_RELEASE');
}

/**
 * Compares the documents on disk with the manifest, the recorded releases with
 * the shape of a release, and the recorded releases with each other.
 *
 * Every document lands in exactly one class - documented and plausible,
 * documented and implausible, unrecorded, or absent from the manifest - so one
 * defect produces one failure, and no class is silently dropped on the way to a
 * check (#231).
 *
 * `tolerated` defaults to empty rather than to TOLERATED_UNRECORDED_SPECS:
 * that list names files in this repository's api-schemas/, so it is applied by
 * describeSpecProvenance, which is the function that reads that directory.
 *
 * @param {{
 *   specFiles: string[],
 *   provenance: ?{schemas: Object},
 *   tolerated?: string[],
 *   maxReleaseYear?: number
 * }} input
 * @returns {{
 *   entries: Array<{file: string, dxpRelease: ?string, syncedAt: ?string, sourceUrl: ?string, dxpReleaseSource: ?string}>,
 *   undocumented: string[],
 *   orphaned: string[],
 *   unrecordedRelease: string[],
 *   toleratedUnrecorded: string[],
 *   implausibleRelease: Array<{file: string, release: string}>,
 *   releases: Array<{release: string, files: string[]}>,
 *   failures: Array<{kind: string, detail: string}>
 * }}
 */
function assessProvenance({
  specFiles,
  provenance,
  tolerated = [],
  maxReleaseYear,
}) {
  const schemas = (provenance && provenance.schemas) || {};
  const toleranceList = [...tolerated].sort();
  const entries = [];
  const undocumented = [];
  const unrecordedRelease = [];
  const toleratedUnrecorded = [];
  const implausibleRelease = [];
  const byRelease = new Map();

  for (const file of specFiles) {
    const record = schemas[file];
    if (!record) {
      undocumented.push(file);
      continue;
    }

    const entry = {
      file,
      dxpRelease: record.dxpRelease ?? null,
      dxpReleaseSource: record.dxpReleaseSource ?? null,
      syncedAt: record.syncedAt ?? null,
      sourceUrl: record.sourceUrl ?? null,
    };
    entries.push(entry);

    if (!isRecordedRelease(entry.dxpRelease)) {
      unrecordedRelease.push(file);
      if (toleranceList.includes(file)) toleratedUnrecorded.push(file);
      continue;
    }

    const release = entry.dxpRelease.trim();

    if (!isPlausibleRelease(release, { maxYear: maxReleaseYear })) {
      implausibleRelease.push({ file, release });
      continue;
    }

    if (!byRelease.has(release)) byRelease.set(release, []);
    byRelease.get(release).push(file);
  }

  const orphaned = Object.keys(schemas)
    .filter((file) => !specFiles.includes(file))
    .sort();

  const releases = [...byRelease.entries()]
    .map(([release, files]) => ({ release, files }))
    .sort((a, b) => a.release.localeCompare(b.release));

  const failures = [];

  if (provenance === null) {
    failures.push({
      kind: 'no manifest',
      detail:
        `no ${PROVENANCE_FILE} beside the specs, so nothing says which DXP line ` +
        'they describe. Run `yarn sync` against the instance these contracts are for',
    });
  }

  for (const file of undocumented) {
    failures.push({
      kind: 'undocumented spec',
      detail:
        `${file} is validated against but has no entry in ${PROVENANCE_FILE}, ` +
        'so nothing says which DXP line it came from. Re-sync it rather than hand-editing the manifest',
    });
  }

  for (const file of orphaned) {
    failures.push({
      kind: 'orphaned entry',
      detail: `${PROVENANCE_FILE} records ${file}, which is no longer in api-schemas/`,
    });
  }

  for (const { file, release } of implausibleRelease) {
    failures.push({
      kind: 'implausible release',
      detail:
        `${file} records the DXP release "${release}", which is not a release line. ` +
        'Expected a quarterly line such as 2026.q3.0 or dxp-2025.q1.17-lts. ' +
        'LIFERAY_DXP_RELEASE is free text an operator sets, and nothing measures it, ' +
        'so this is the only thing standing between the manifest and a typo',
    });
  }

  for (const file of unrecordedRelease) {
    if (toleratedUnrecorded.includes(file)) continue;
    failures.push({
      kind: 'unrecorded release',
      detail:
        `${file} records no DXP release, so the gate cannot say what it is a ` +
        'contract for. Re-sync it with LIFERAY_DXP_RELEASE set. If it genuinely ' +
        'cannot be established yet, add it to TOLERATED_UNRECORDED_SPECS in ' +
        'scripts/spec-provenance.cjs with the reason, so the gap is stated rather than silent',
    });
  }

  for (const file of toleranceList) {
    if (!specFiles.includes(file)) {
      failures.push({
        kind: 'stale tolerance',
        detail:
          `TOLERATED_UNRECORDED_SPECS excuses ${file}, which is no longer in ` +
          'api-schemas/. Remove it, so the tolerance cannot outlive what it excuses',
      });
      continue;
    }
    if (!unrecordedRelease.includes(file)) {
      failures.push({
        kind: 'stale tolerance',
        detail:
          `TOLERATED_UNRECORDED_SPECS excuses ${file}, which now records a ` +
          'release. Remove it, so the tolerance shrinks as the re-sync progresses',
      });
    }
  }

  // Conflict is asserted over recorded releases only, and deliberately so: a
  // document whose line is unrecorded might be from the same line as the rest.
  // Claiming a conflict that has not been measured is the same fault as
  // claiming a line that has not been measured, which is what #231 is about.
  // Unrecorded documents are no longer invisible here - they are accounted for
  // by their own rule above - which is what let them slip past this check
  // before.
  if (releases.length > 1) {
    failures.push({
      kind: 'conflicting releases',
      detail:
        'the contracts come from more than one DXP line - ' +
        releases
          .map(({ release, files }) => `${release} (${files.length})`)
          .join(', ') +
        (unrecordedRelease.length > 0
          ? `, unrecorded (${unrecordedRelease.length})`
          : '') +
        '. Q1 and Q3 are a real API boundary, so a call validated against one ' +
        'proves nothing about the other. Finish the sync so every document is ' +
        'from the line the SDK is pointed at',
    });
  }

  return {
    entries,
    undocumented,
    orphaned,
    unrecordedRelease,
    toleratedUnrecorded,
    implausibleRelease,
    releases,
    failures,
  };
}

/**
 * Reads the manifest and assesses it.
 *
 * An unreadable manifest is reported as a failure rather than thrown: the point
 * of the gate is to say what is wrong with the provenance, and a stack trace
 * from JSON.parse says it worse. It is never treated as "no provenance", which
 * would let a corrupt file pass as a missing one.
 */
function describeSpecProvenance(schemaDir = SCHEMA_DIR, options = {}) {
  const specFiles = listSpecFiles(schemaDir);
  const manifestPath = path.join(schemaDir, PROVENANCE_FILE);

  const withTolerance = {
    tolerated: TOLERATED_UNRECORDED_SPECS,
    ...options,
  };

  if (!fs.existsSync(manifestPath)) {
    return assessProvenance({ specFiles, provenance: null, ...withTolerance });
  }

  let provenance;
  try {
    provenance = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    return {
      entries: [],
      undocumented: [],
      orphaned: [],
      unrecordedRelease: [],
      toleratedUnrecorded: [],
      implausibleRelease: [],
      releases: [],
      failures: [
        {
          kind: 'unreadable manifest',
          detail: `${PROVENANCE_FILE} could not be parsed: ${error.message}`,
        },
      ],
    };
  }

  return assessProvenance({ specFiles, provenance, ...withTolerance });
}

/**
 * Names the DXP line the contracts were captured from, for the sentence that
 * reports the gate's result. Between #131 and #204 that sentence claimed the
 * specs were authoritative without ever saying what they were authoritative
 * for, and until #231 it presented an operator's assertion as though the
 * instance had reported it.
 *
 * @returns {string} a phrase, never a bare version
 */
function describeContractLine(assessment) {
  const { releases, unrecordedRelease, entries } = assessment;
  const total = entries.length + assessment.undocumented.length;

  if (releases.length === 0) {
    return `of unrecorded provenance (none of the ${total} documents records a DXP release)`;
  }

  const named =
    releases.length === 1
      ? `captured from DXP ${releases[0].release}`
      : `captured from ${releases.map((entry) => `DXP ${entry.release}`).join(' and ')}`;

  const recordedFiles = new Set(releases.flatMap(({ files }) => files));
  const asserted = entries
    .filter(({ file }) => recordedFiles.has(file))
    .every(({ dxpReleaseSource }) => isOperatorAsserted(dxpReleaseSource));

  const qualified = asserted
    ? `${named}, as asserted by whoever ran the sync rather than measured`
    : named;

  if (unrecordedRelease.length === 0) return qualified;

  return `${qualified}, with ${unrecordedRelease.length} of ${total} documents recording no release`;
}

/**
 * Renders the provenance block printed above the gate's own output.
 *
 * @returns {string[]} lines, ready to print
 */
function formatProvenanceReport(assessment) {
  const lines = [];

  for (const { release, files } of assessment.releases) {
    lines.push(`  DXP ${release}: ${files.length} document(s)`);
  }

  if (assessment.implausibleRelease.length > 0) {
    lines.push(
      `  Not a release line: ${assessment.implausibleRelease
        .map(({ file, release }) => `${file} ("${release}")`)
        .join(', ')}`
    );
  }

  if (assessment.unrecordedRelease.length > 0) {
    lines.push(
      `  No recorded release: ${assessment.unrecordedRelease.length} document(s) - ${assessment.unrecordedRelease.join(', ')}`
    );
    if (assessment.toleratedUnrecorded.length > 0) {
      lines.push(
        `    ${assessment.toleratedUnrecorded.length} tolerated by name in scripts/spec-provenance.cjs: ${UNRECORDED_TOLERANCE_REASON}.`
      );
    }
    lines.push(
      '    Re-sync with LIFERAY_DXP_RELEASE set to establish it (#231).'
    );
  }

  for (const failure of assessment.failures) {
    lines.push(`  PROVENANCE FAILURE (${failure.kind}): ${failure.detail}`);
  }

  return lines;
}

module.exports = {
  EARLIEST_PLAUSIBLE_RELEASE_YEAR,
  PROVENANCE_FILE,
  RELEASE_PATTERN,
  SPEC_SUFFIX,
  TOLERATED_UNRECORDED_SPECS,
  UNRECORDED_RELEASE,
  UNRECORDED_TOLERANCE_REASON,
  assessProvenance,
  describeContractLine,
  describeSpecProvenance,
  formatProvenanceReport,
  isOperatorAsserted,
  isPlausibleRelease,
  isRecordedRelease,
  listSpecFiles,
};
