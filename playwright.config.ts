import { defineConfig, devices } from '@playwright/test';

const e2eOrigin = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3810';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: e2eOrigin,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run build:e2e && npm run preview:e2e',
    url: e2eOrigin,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
