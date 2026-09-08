import path from 'path';
import { describe, expect, it } from 'vitest';
import { resolveDbPath } from '../src/utils/dbPath.cjs';

// The environment is passed in rather than assigned to process.env: mutating
// NODE_ENV is visible to every other module sharing the worker, and a
// PersistenceService constructed during that window would try to open a real
// file on disk.
const PRODUCTION = 'production';

describe('resolveDbPath', () => {
  // The bug this replaces: resolving against __dirname put the default inside
  // node_modules, so every install deleted the database along with the package
  // (#175). The path has to mean the same thing here as it does anywhere else.
  it('resolves a relative path against the consumer, not the SDK', () => {
    const resolved = resolveDbPath('./data/workflows.db', PRODUCTION);

    expect(resolved).toBe(path.join(process.cwd(), 'data', 'workflows.db'));
    expect(resolved).not.toContain('node_modules');
    expect(resolved).not.toContain(path.join('src', 'data'));
  });

  it('leaves an absolute path exactly as given', () => {
    expect(resolveDbPath('/var/lib/aica/workflows.db', PRODUCTION)).toBe(
      '/var/lib/aica/workflows.db'
    );
  });

  it('keeps an explicit in-memory database in memory', () => {
    expect(resolveDbPath(':memory:', PRODUCTION)).toBe(':memory:');
  });

  // Tests must never touch a file on disk, whatever path they ask for.
  it('stays in memory under NODE_ENV=test regardless of the path', () => {
    expect(resolveDbPath('./data/workflows.db', 'test')).toBe(':memory:');
    expect(resolveDbPath('/var/lib/aica/workflows.db', 'test')).toBe(
      ':memory:'
    );
  });

  it('reads the ambient environment when none is given', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(resolveDbPath('./data/workflows.db')).toBe(':memory:');
  });
});
