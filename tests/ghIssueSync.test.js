import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const childProcess = require('child_process');
const { readFileSync } = require('fs');
const {
  describe: describeArgs,
  gh,
  ghIssueCreateArgs,
} = require('../scripts/gh-issue-sync.cjs');

/**
 * The tool used to build its gh invocations by string concatenation and run them
 * through a shell, so an issue body containing backticks was executed rather
 * than posted (issue #135).
 *
 * SAFETY: no test here may pass mutating arguments to gh(). An early version of
 * this file did, relying on a spy to intercept the call - the spy did not take
 * effect, the real `gh issue create` ran, and it filed issue #138 against this
 * repository. Interception is now belt; the brace is that the only arguments
 * ever handed to gh() are read-only, so a failed spy costs nothing.
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

    // Asserted on the argument array rather than by invoking gh: building the
    // args is where the shell-quoting bug lived, and this way the test cannot
    // reach the network even if interception fails.
    const args = ghIssueCreateArgs('Title with "quotes"', body, ['bug']);

    // The body survives byte for byte as exactly one argv entry, not several.
    expect(args).toContain(body);
    expect(args.filter((arg) => arg === body)).toHaveLength(1);
    expect(args).toContain('Title with "quotes"');
    expect(args.filter((arg) => arg === 'Title with "quotes"')).toHaveLength(1);
  });

  it('never hands mutating arguments to gh from this suite', () => {
    // Guards the safety note above: gh() reaches a real CLI if a spy fails, so
    // every call site in this file must be read-only.
    const source = readFileSync(new URL(import.meta.url), 'utf8');
    const ghCalls = source.match(/\bgh\(\[[^\]]*\]/g) || [];

    expect(ghCalls.length).toBeGreaterThan(0);
    for (const call of ghCalls) {
      expect(call).not.toMatch(/'(create|close|comment|edit|delete|merge)'/);
    }
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
