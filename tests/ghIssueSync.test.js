import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const childProcess = require('child_process');
const {
  describe: describeArgs,
  gh,
  ghIssueCreateArgs,
} = require('../scripts/gh-issue-sync.cjs');

/**
 * The tool used to build its gh invocations by string concatenation and run
 * them through a shell, so an issue body containing backticks was executed
 * rather than posted (issue #135).
 */
describe('gh-issue-sync argument handling', () => {
  let execFileSync;

  beforeEach(() => {
    execFileSync = vi
      .spyOn(childProcess, 'execFileSync')
      .mockReturnValue('https://github.com/o/r/issues/1\n');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes arguments to gh without a shell', () => {
    gh(['issue', 'view', '1']);

    expect(execFileSync).toHaveBeenCalledWith(
      'gh',
      ['issue', 'view', '1'],
      expect.objectContaining({ encoding: 'utf8' })
    );
    // A `shell: true` option would reintroduce the whole class of bug.
    expect(execFileSync.mock.calls[0][2]).not.toHaveProperty('shell');
  });

  it('carries a hostile body through as a single literal argument', () => {
    const body = [
      'Run `rm -rf /` and $(whoami) and "quoted" text',
      'plus a ${template} and a backslash \\ for good measure',
    ].join('\n');

    gh(ghIssueCreateArgs('Title with "quotes"', body, ['bug']));

    const [, args] = execFileSync.mock.calls[0];
    // The body reaches gh byte for byte, and is one argv entry, not several.
    expect(args).toContain(body);
    expect(args.filter((arg) => arg === body)).toHaveLength(1);
    expect(args).toContain('Title with "quotes"');
  });

  it('emits one --label flag per label and none when there are no labels', () => {
    expect(ghIssueCreateArgs('t', 'b', ['bug', 'tech debt'])).toEqual([
      'issue',
      'create',
      '--title',
      't',
      '--body',
      'b',
      '--label',
      'bug',
      '--label',
      'tech debt',
    ]);

    expect(ghIssueCreateArgs('t', 'b')).toEqual([
      'issue',
      'create',
      '--title',
      't',
      '--body',
      'b',
    ]);
    expect(ghIssueCreateArgs('t', 'b', null)).not.toContain('--label');
  });

  it('quotes only for display in dry-run output', () => {
    const rendered = describeArgs([
      'issue',
      'create',
      '--title',
      'has spaces',
      '--body',
      'plain',
    ]);

    expect(rendered).toBe('gh issue create --title "has spaces" --body plain');
  });
});
