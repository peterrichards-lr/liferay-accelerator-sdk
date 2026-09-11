const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const sdk = require('../src/index.js');

describe('SDK Version', () => {
  it('should export the version from package.json dynamically', () => {
    expect(sdk.version).toBeDefined();
    expect(sdk.version).toBe(pkg.version);
  });
});

/**
 * Without an allowlist, a publish carries the whole working tree: measured at
 * 285 files / 12MB, including coverage output, the test suite and whatever logs
 * happen to sit in src/logs on the packing machine. With it, 69 files / 266kB.
 * These pin the decisions that keep it that way.
 */
describe('package distribution metadata', () => {
  /**
   * The previous version of this asserted the literal string
   * `'20.x || >=22'` and nothing else. That pinned the declaration without
   * proving anything about it: CI could build on any Node it liked and this
   * file would still have passed, which is how the repository came to declare
   * a range whose lower half no longer installs (issue #216). These assert
   * the floor's consequences instead - what it excludes, what runs the suite,
   * and what CI builds on.
   */
  describe('the supported Node range', () => {
    const declared = pkg.engines.node;
    const floor = Number(/^>=(\d+)/.exec(declared)?.[1]);

    it('is a single floor, not an enumeration of majors', () => {
      // An enumeration is what made the old range wrong: it kept 20.x alive
      // long after better-sqlite3@13 and @vitest/istanbul-lib-coverage@1 had
      // moved their own engines to >=22, so every dependency bump failed at
      // install rather than in a test.
      expect(declared).toMatch(/^>=\d+(\.\d+){0,2}$/);
      expect(floor).toBeGreaterThanOrEqual(22);
    });

    it('is satisfied by the Node actually running this suite', () => {
      // The behavioural half: a runner on an unsupported Node fails here
      // rather than quietly producing a green suite on a version the package
      // does not claim to support.
      const running = Number(process.versions.node.split('.')[0]);

      expect(running).toBeGreaterThanOrEqual(floor);
    });

    it('is satisfied by the Node version CI builds on', () => {
      // Two declarations of the same fact drift apart unless something
      // compares them. A missing or unreadable workflow is a failure, not a
      // reason to skip: skipping would make the drift invisible again.
      const workflow = fs.readFileSync(
        path.join(__dirname, '..', '.github', 'workflows', 'ci.yml'),
        'utf8'
      );
      const declarations = [...workflow.matchAll(/node-version:\s*'?(\d+)/g)];

      expect(declarations.length).toBeGreaterThan(0);

      for (const [, major] of declarations) {
        expect(Number(major)).toBeGreaterThanOrEqual(floor);
      }
    });
  });

  it('declares its repository', () => {
    expect(pkg.repository).toMatchObject({
      type: 'git',
      url: expect.stringContaining('liferay-accelerator-sdk'),
    });
  });

  it('ships the runtime code and nothing else', () => {
    expect(pkg.files).toContain('src');
    expect(pkg.files).toContain('bin');
    // Logs are untracked but present in a working checkout, so the negation is
    // what stops a publish from shipping them.
    expect(pkg.files).toContain('!src/logs');

    for (const excluded of ['tests', 'scripts', '.agents', 'coverage']) {
      expect(pkg.files).not.toContain(excluded);
    }
  });

  it('ships every OpenAPI spec ContractValidator loads at runtime', () => {
    // contractValidator.cjs reads ../../api-schemas at construction time, so
    // trimming these out of the package breaks contract validation for
    // consumers rather than merely shrinking the tarball.
    const specDir = path.join(__dirname, '..', 'api-schemas');
    const specs = fs
      .readdirSync(specDir)
      .filter((file) => file.endsWith('-openapi.json'));

    expect(specs.length).toBeGreaterThan(0);
    expect(pkg.files).toContain('api-schemas/*.json');

    // The 1.6MB GraphQL SDL is only read by the dev-time validator script, so
    // the *.json pattern deliberately leaves it out.
    expect(pkg.files).not.toContain('api-schemas');
    expect(fs.existsSync(path.join(specDir, 'liferay_schema.graphql'))).toBe(
      true
    );
  });
});
