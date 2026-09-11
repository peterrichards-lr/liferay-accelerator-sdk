import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import nodePath from 'path';
const require = createRequire(import.meta.url);

const {
  PROVENANCE_FILE,
  assessProvenance,
  describeContractLine,
  describeSpecProvenance,
  formatProvenanceReport,
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

  it('does not fail on an unrecorded release, which only a re-sync can fix', () => {
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
    expect(assessment.failures).toEqual([]);
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
      'captured from DXP 2026.Q3.2'
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
      'captured from DXP 2026.Q3.2, with 1 of 2 documents recording no release'
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
});
