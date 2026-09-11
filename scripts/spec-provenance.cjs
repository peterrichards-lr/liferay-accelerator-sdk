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
 * manifest, and the recorded releases against each other. Comparing a recorded
 * release against the line a live instance reports needs a target to ask and is
 * left to a follow-up, as #204 says.
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
 * Compares the documents on disk with the manifest, and the recorded releases
 * with each other.
 *
 * @param {{specFiles: string[], provenance: ?{schemas: Object}}} input
 * @returns {{
 *   entries: Array<{file: string, dxpRelease: ?string, syncedAt: ?string, sourceUrl: ?string}>,
 *   undocumented: string[],
 *   orphaned: string[],
 *   unrecordedRelease: string[],
 *   releases: Array<{release: string, files: string[]}>,
 *   failures: Array<{kind: string, detail: string}>
 * }}
 */
function assessProvenance({ specFiles, provenance }) {
  const schemas = (provenance && provenance.schemas) || {};
  const entries = [];
  const undocumented = [];
  const unrecordedRelease = [];
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
      syncedAt: record.syncedAt ?? null,
      sourceUrl: record.sourceUrl ?? null,
    };
    entries.push(entry);

    if (!isRecordedRelease(entry.dxpRelease)) {
      unrecordedRelease.push(file);
      continue;
    }

    const release = entry.dxpRelease.trim();
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

  if (releases.length > 1) {
    failures.push({
      kind: 'conflicting releases',
      detail:
        'the contracts come from more than one DXP line - ' +
        releases
          .map(({ release, files }) => `${release} (${files.length})`)
          .join(', ') +
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
function describeSpecProvenance(schemaDir = SCHEMA_DIR) {
  const specFiles = listSpecFiles(schemaDir);
  const manifestPath = path.join(schemaDir, PROVENANCE_FILE);

  if (!fs.existsSync(manifestPath)) {
    return assessProvenance({ specFiles, provenance: null });
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
      releases: [],
      failures: [
        {
          kind: 'unreadable manifest',
          detail: `${PROVENANCE_FILE} could not be parsed: ${error.message}`,
        },
      ],
    };
  }

  return assessProvenance({ specFiles, provenance });
}

/**
 * Names the DXP line the contracts were captured from, for the sentence that
 * reports the gate's result. Between #131 and #204 that sentence claimed the
 * specs were authoritative without ever saying what they were authoritative
 * for.
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

  if (unrecordedRelease.length === 0) return named;

  return `${named}, with ${unrecordedRelease.length} of ${total} documents recording no release`;
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

  if (assessment.unrecordedRelease.length > 0) {
    lines.push(
      `  No recorded release: ${assessment.unrecordedRelease.length} document(s) - ${assessment.unrecordedRelease.join(', ')}`
    );
    lines.push(
      '    Synced before provenance was recorded (#204). Re-sync with LIFERAY_DXP_RELEASE set to establish it.'
    );
  }

  for (const failure of assessment.failures) {
    lines.push(`  PROVENANCE FAILURE (${failure.kind}): ${failure.detail}`);
  }

  return lines;
}

module.exports = {
  PROVENANCE_FILE,
  SPEC_SUFFIX,
  UNRECORDED_RELEASE,
  assessProvenance,
  describeContractLine,
  describeSpecProvenance,
  formatProvenanceReport,
  isRecordedRelease,
  listSpecFiles,
};
