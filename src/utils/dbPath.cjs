const path = require('path');

/**
 * Where the workflow database file goes.
 *
 * A relative path resolves against the consumer's working directory, not the
 * SDK's own. Resolving against __dirname put the default inside node_modules,
 * where every install deleted it along with the package (#175). An absolute
 * path already says where it goes, and path.resolve returns it unchanged.
 *
 * The environment is a parameter rather than a read of process.env so a test
 * can ask what production would choose without assigning to NODE_ENV, which
 * every other module sharing the worker would see.
 */
function resolveDbPath(rawPath, nodeEnv = process.env.NODE_ENV) {
  if (rawPath === ':memory:' || nodeEnv === 'test') {
    return ':memory:';
  }

  return path.resolve(process.cwd(), rawPath);
}

module.exports = { resolveDbPath };
