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
  it('declares the supported Node range', () => {
    // better-sqlite3@12 supports 20.x and 22+, but not 21.x.
    expect(pkg.engines).toEqual({ node: '20.x || >=22' });
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
