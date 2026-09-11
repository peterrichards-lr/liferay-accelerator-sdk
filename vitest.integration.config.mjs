import { defineConfig } from 'vitest/config';

// The live suite runs under its own config for one reason: it must not load
// `tests/setup.mjs`.
//
// That file starts an `msw` server whose handlers match on path with a wildcard
// host, so a handler written for the accounts endpoint answers for any origin
// at all. Applied to the integration suite it intercepted every request, and
// the suite passed in 1.35s against `http://nonexistent-host.invalid:9999` with
// credentials that were not real. No config option turns a handler off for one
// host, so the only honest fix is not to install them here (#224).
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    pool: 'forks',
    include: ['tests/integration/**/*.test.js'],
    // A real request is retried with backoff (2s, 4s, 8s) before the client
    // gives up. Under the 5s default the suite reported "Test timed out"
    // instead of the ENOTFOUND or 401 that actually happened, which is one
    // more way of not saying what went wrong.
    testTimeout: 60_000,
    server: {
      deps: {
        inline: true,
      },
    },
  },
  resolve: {
    mainFields: ['main', 'module'],
    conditions: ['node', 'require'],
  },
});
