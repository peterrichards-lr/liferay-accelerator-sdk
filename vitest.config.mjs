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
      // Ratcheted as #133 landed: 40 -> 55 -> 60. Held a few points below the
      // measured 65.9/66.5 so a small refactor does not fail the build, while a
      // real regression does. Raise it again when #147 lands.
      thresholds: {
        statements: 60,
        lines: 60,
      },
    },
  },
  resolve: {
    mainFields: ['main', 'module'],
    conditions: ['node', 'require'],
  },
});
