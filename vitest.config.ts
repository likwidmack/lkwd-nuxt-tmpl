import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = realpathSync.native(fileURLToPath(new URL('./', import.meta.url)));

export default defineConfig({
  root,
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.{test,spec}.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**', '.nuxt/**', '.output/**'],
  },
});
