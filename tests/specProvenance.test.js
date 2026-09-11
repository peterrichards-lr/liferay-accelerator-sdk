import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import nodePath from 'path';
const require = createRequire(import.meta.url);

const {
  PROVENANCE_FILE,
  TOLERATED_UNRECORDED_SPECS,
  assessProvenance,
  describeContractLine,
  describeSpecProvenance,
  formatProvenanceReport,
  isOperatorAsserted,
  isPlausibleRelease,
  isRecordedRelease,
  listSpecFiles,
} = require('../scripts/spec-provenance.cjs');

const SCHEMA_DIR = nodePath.join(import.meta.dirname, '..', 'api-schemas');

/**
 * A Liferay openapi.json says nothing about the portal that served it, so
 * api-schemas/PROVENANCE.json is the only record of which DXP line the SDK's
 * contracts describe. These tests pin the reader that makes that record
 * load-bearing rather than decorative (#204).
 */
describe('spec provenance', () => {
  const withSchemaDir = (files) => {
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'provenance-'));
    for (const [name, content] of Object.entries(files)) {
      fs.writeFileSync(
        nodePath.join(dir, name),
        typeof content === 'string' ? content : JSON.stringify(content)
      );
    }
    return dir;
  };

  const entry = (release) => ({
    sourceUrl: 'http://localhost:8080/o/x/v1.0/openapi.json',
    dxpRelease: release,
    dxpReleaseSource: 'LIFERAY_DXP_RELEASE',
    syncedAt: '2026-09-10T10:45:42.614Z',
  });

  it('treats unknown, blank and absent releases as an unanswered question', () => {
    expect(isRecordedRelease('2026.Q3.2')).toBe(true);
    expect(isRecordedRelease('unknown')).toBe(false);
    expect(isRecordedRelease('UNKNOWN')).toBe(false);
    expect(isRecordedRelease('   ')).toBe(false);
    expect(isRecordedRelease(null)).toBe(false);
    expect(isRecordedRelease(undefined)).toBe(false);
  });

  it('reports a document with no manifest entry as a failure, naming it', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: { schemas: { 'a-v1.0-openapi.json': entry('2026.Q3.2') } },
    });

    expect(assessment.undocumented).toEqual(['b-v1.0-openapi.json']);
    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'undocumented spec',
    ]);
    expect(assessment.failures[0].detail).toContain('b-v1.0-openapi.json');
  });

  it('reports a manifest entry whose document is gone', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'removed-v1.0-openapi.json': entry('2026.Q3.2'),
        },
      },
    });

    expect(assessment.orphaned).toEqual(['removed-v1.0-openapi.json']);
    expect(assessment.failures.map((f) => f.kind)).toEqual(['orphaned entry']);
  });

  it('fails when the contracts come from two different DXP lines', () => {
    const assessment = assessProvenance({
      specFiles: ['q1-v1.0-openapi.json', 'q3-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'q1-v1.0-openapi.json': entry('2026.Q1.7'),
          'q3-v1.0-openapi.json': entry('2026.Q3.2'),
        },
      },
    });

    expect(assessment.releases).toEqual([
      { release: '2026.Q1.7', files: ['q1-v1.0-openapi.json'] },
      { release: '2026.Q3.2', files: ['q3-v1.0-openapi.json'] },
    ]);
    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'conflicting releases',
    ]);
    expect(assessment.failures[0].detail).toContain('2026.Q1.7');
    expect(assessment.failures[0].detail).toContain('2026.Q3.2');
  });

  // Before #231 an unrecorded release was filtered out before the only
  // value-level check, so a manifest recording nothing at all was fully green.
  it('fails on an unrecorded release that nothing has excused', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'b-v1.0-openapi.json': entry('unknown'),
        },
      },
    });

    expect(assessment.unrecordedRelease).toEqual(['b-v1.0-openapi.json']);
    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'unrecorded release',
    ]);
    expect(assessment.failures[0].detail).toContain('b-v1.0-openapi.json');
  });

  it('fails when every document is unrecorded, which used to be a clean pass', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('unknown'),
          'b-v1.0-openapi.json': entry('unknown'),
        },
      },
    });

    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'unrecorded release',
      'unrecorded release',
    ]);
  });

  // The gap is allowed to stay, but only stated by name. A silent filter and a
  // named tolerance differ in exactly one way that matters: widening the second
  // is a diff somebody reviews.
  it('tolerates an unrecorded release only for a document named in the list', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'b-v1.0-openapi.json': entry('unknown'),
        },
      },
      tolerated: ['b-v1.0-openapi.json'],
    });

    expect(assessment.toleratedUnrecorded).toEqual(['b-v1.0-openapi.json']);
    expect(assessment.failures).toEqual([]);
  });

  it('refuses a tolerance for a document that now records a release', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: { schemas: { 'a-v1.0-openapi.json': entry('2026.Q3.2') } },
      tolerated: ['a-v1.0-openapi.json'],
    });

    expect(assessment.failures.map((f) => f.kind)).toEqual(['stale tolerance']);
    expect(assessment.failures[0].detail).toContain('now records a release');
  });

  it('refuses a tolerance for a document that is gone', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: { schemas: { 'a-v1.0-openapi.json': entry('2026.Q3.2') } },
      tolerated: ['departed-v1.0-openapi.json'],
    });

    expect(assessment.failures.map((f) => f.kind)).toEqual(['stale tolerance']);
    expect(assessment.failures[0].detail).toContain(
      'no longer in api-schemas/'
    );
  });

  // `2099.Q9.9` and `banana` both passed the gate, which reported them as the
  // line the contracts came from. LIFERAY_DXP_RELEASE is free text an operator
  // sets and nothing measures it, so shape is the only check there can be.
  it('knows what a DXP release line looks like', () => {
    expect(isPlausibleRelease('2026.q3.0')).toBe(true);
    expect(isPlausibleRelease('2026.Q3.2')).toBe(true);
    expect(isPlausibleRelease('dxp-2025.q1.17-lts')).toBe(true);
    expect(isPlausibleRelease('2025.q1.17-lts')).toBe(true);

    expect(isPlausibleRelease('banana')).toBe(false);
    expect(isPlausibleRelease('2099.Q9.9')).toBe(false);
    expect(isPlausibleRelease('2026.Q5.1')).toBe(false);
    expect(isPlausibleRelease('2026.Q3')).toBe(false);
    expect(isPlausibleRelease('7.4.13-u108')).toBe(false);
    expect(isPlausibleRelease('unknown')).toBe(false);
    expect(isPlausibleRelease('')).toBe(false);
    expect(isPlausibleRelease(null)).toBe(false);
  });

  it('bounds the year rather than accepting any four digits', () => {
    expect(isPlausibleRelease('2026.q3.0', { maxYear: 2027 })).toBe(true);
    expect(isPlausibleRelease('2028.q3.0', { maxYear: 2027 })).toBe(false);
    expect(isPlausibleRelease('2019.q3.0', { maxYear: 2027 })).toBe(false);
  });

  it('fails a release string that is not a release line, and does not count it', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('banana'),
          'b-v1.0-openapi.json': entry('2099.Q9.9'),
        },
      },
      maxReleaseYear: 2027,
    });

    expect(assessment.implausibleRelease).toEqual([
      { file: 'a-v1.0-openapi.json', release: 'banana' },
      { file: 'b-v1.0-openapi.json', release: '2099.Q9.9' },
    ]);
    expect(assessment.releases).toEqual([]);
    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'implausible release',
      'implausible release',
    ]);
    expect(describeContractLine(assessment)).toContain(
      'of unrecorded provenance'
    );
  });

  // An unrecorded document used to be dropped before this check, so it could
  // never contribute to it. Now it is accounted for by its own rule, and the
  // conflict message names it rather than describing a subset of the set.
  it('names the unrecorded documents in the conflict it reports', () => {
    const assessment = assessProvenance({
      specFiles: [
        'q1-v1.0-openapi.json',
        'q3-v1.0-openapi.json',
        'unknown-v1.0-openapi.json',
      ],
      provenance: {
        schemas: {
          'q1-v1.0-openapi.json': entry('2026.Q1.7'),
          'q3-v1.0-openapi.json': entry('2026.Q3.2'),
          'unknown-v1.0-openapi.json': entry('unknown'),
        },
      },
      tolerated: ['unknown-v1.0-openapi.json'],
    });

    const conflict = assessment.failures.find(
      (f) => f.kind === 'conflicting releases'
    );

    expect(conflict.detail).toContain('2026.Q1.7 (1)');
    expect(conflict.detail).toContain('2026.Q3.2 (1)');
    expect(conflict.detail).toContain('unrecorded (1)');
  });

  it('says a release was asserted rather than measured when it was', () => {
    expect(isOperatorAsserted('LIFERAY_DXP_RELEASE')).toBe(true);
    expect(
      isOperatorAsserted(
        'LIFERAY_DXP_RELEASE (operator-asserted, not measured)'
      )
    ).toBe(true);
    expect(isOperatorAsserted('Liferay-Portal response header')).toBe(false);
    expect(isOperatorAsserted(null)).toBe(false);
  });

  it('does not qualify a release the instance itself reported', () => {
    const measured = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': {
            ...entry('2026.q3.0'),
            dxpReleaseSource: 'Liferay-Portal response header',
          },
        },
      },
    });

    expect(describeContractLine(measured)).toBe('captured from DXP 2026.q3.0');
  });

  it('fails when no manifest exists at all', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: null,
    });

    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'no manifest',
      'undocumented spec',
    ]);
  });

  it('passes cleanly when every document is documented from one line', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'b-v1.0-openapi.json': entry('2026.Q3.2'),
        },
      },
    });

    expect(assessment.failures).toEqual([]);
    expect(describeContractLine(assessment)).toBe(
      'captured from DXP 2026.Q3.2, as asserted by whoever ran the sync rather than measured'
    );
  });

  it('never claims a line it does not have', () => {
    const unknownOnly = assessProvenance({
      specFiles: ['a-v1.0-openapi.json'],
      provenance: { schemas: { 'a-v1.0-openapi.json': entry('unknown') } },
    });

    expect(describeContractLine(unknownOnly)).toBe(
      'of unrecorded provenance (none of the 1 documents records a DXP release)'
    );

    const mixed = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'b-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'b-v1.0-openapi.json': entry('unknown'),
        },
      },
    });

    expect(describeContractLine(mixed)).toBe(
      'captured from DXP 2026.Q3.2, as asserted by whoever ran the sync rather ' +
        'than measured, with 1 of 2 documents recording no release'
    );
  });

  it('reports an unreadable manifest as unreadable, not as absent', () => {
    const dir = withSchemaDir({
      'a-v1.0-openapi.json': { paths: {} },
      [PROVENANCE_FILE]: '{ not json',
    });

    const assessment = describeSpecProvenance(dir);

    expect(assessment.failures.map((f) => f.kind)).toEqual([
      'unreadable manifest',
    ]);
  });

  it('surfaces every failure in the printed report', () => {
    const assessment = assessProvenance({
      specFiles: ['a-v1.0-openapi.json', 'q1-v1.0-openapi.json'],
      provenance: {
        schemas: {
          'a-v1.0-openapi.json': entry('2026.Q3.2'),
          'q1-v1.0-openapi.json': entry('2026.Q1.7'),
        },
      },
    });

    const report = formatProvenanceReport(assessment).join('\n');

    expect(report).toContain('DXP 2026.Q1.7: 1 document(s)');
    expect(report).toContain('DXP 2026.Q3.2: 1 document(s)');
    expect(report).toContain('PROVENANCE FAILURE (conflicting releases)');
  });

  it('keeps the manifest in step with the specs in this repository', () => {
    const assessment = describeSpecProvenance(SCHEMA_DIR);

    expect(assessment.failures.map((f) => f.detail)).toEqual([]);
    expect(listSpecFiles(SCHEMA_DIR).length).toBeGreaterThan(10);
    expect(assessment.entries.length).toBe(listSpecFiles(SCHEMA_DIR).length);
  });

  // Both directions are enforced, so the two lists cannot drift apart: an
  // unrecorded document that is not tolerated fails, and a tolerance that is
  // not needed fails. The re-sync in #231 shrinks this list to nothing.
  it('tolerates exactly the documents whose provenance is still unrecorded', () => {
    const assessment = describeSpecProvenance(SCHEMA_DIR);

    expect(assessment.unrecordedRelease).toEqual(
      [...TOLERATED_UNRECORDED_SPECS].sort()
    );
  });
});

describe('sync-schemas release assertion', () => {
  const {
    assertReleaseIsPlausible,
    describeRelease,
  } = require('../scripts/sync-schemas.js');

  // LIFERAY_DXP_RELEASE is free text, it is the only source of a release in
  // practice, and until #231 nothing looked at it. The check runs before the
  // first document is written, because a run that labels sixteen files wrongly
  // is worse than one that does not start.
  it('refuses a release string that is not a DXP release line', () => {
    expect(() => assertReleaseIsPlausible('banana')).toThrow(
      'not a DXP release line'
    );
    expect(() => assertReleaseIsPlausible('2099.Q9.9')).toThrow(
      'not a DXP release line'
    );
  });

  it('accepts the lines this ecosystem actually ships', () => {
    expect(() => assertReleaseIsPlausible('2026.q3.0')).not.toThrow();
    expect(() => assertReleaseIsPlausible('dxp-2025.q1.17-lts')).not.toThrow();
  });

  it('leaves an unset variable alone, which records unknown rather than a guess', () => {
    expect(() => assertReleaseIsPlausible(undefined)).not.toThrow();
    expect(() => assertReleaseIsPlausible('')).not.toThrow();
  });

  it('records an operator assertion as an assertion', () => {
    const previous = process.env.LIFERAY_DXP_RELEASE;
    process.env.LIFERAY_DXP_RELEASE = '2026.q3.0';

    try {
      expect(describeRelease({})).toEqual({
        release: '2026.q3.0',
        source: 'LIFERAY_DXP_RELEASE (operator-asserted, not measured)',
      });
    } finally {
      if (previous === undefined) delete process.env.LIFERAY_DXP_RELEASE;
      else process.env.LIFERAY_DXP_RELEASE = previous;
    }
  });
});
