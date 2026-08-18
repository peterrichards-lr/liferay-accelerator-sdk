import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [path.resolve(__dirname, './tests/setup.mjs')],
    pool: 'forks',
    server: {
      deps: {
        inline: true,
      },
    },
    coverage: {
      provider: 'v8',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**',
        '**/mocks/**',
        '**/scripts/**',
        '**/GeneratedLiferayClient.cjs',
        '**/src/liferay/generated/**',
      ],
      // Ratcheted as #133 and #147 landed: 40 -> 55 -> 60 -> 65. Held a few points
      // below measured coverage so a small refactor does not fail the build.
      thresholds: {
        statements: 65,
        lines: 65,
      },
    },
  },
  resolve: {
    mainFields: ['main', 'module'],
    conditions: ['node', 'require'],
  },
});
