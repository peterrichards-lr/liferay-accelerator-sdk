const pkg = require('../package.json');
const sdk = require('../src/index.js');

describe('SDK Version', () => {
  it('should export the version from package.json dynamically', () => {
    expect(sdk.version).toBeDefined();
    expect(sdk.version).toBe(pkg.version);
  });
});
