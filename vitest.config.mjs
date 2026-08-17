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
      // Raised from 40 once #133 lifted the adapters to 99% and the path
      // profile to 96%. Set a few points below the measured 61.7/62.4 so a
      // small refactor does not fail the build, but a real regression does.
      thresholds: {
        statements: 55,
        lines: 55,
      },
    },
  },
  resolve: {
    mainFields: ['main', 'module'],
    conditions: ['node', 'require'],
  },
});
