/* global process */
import { defineConfig } from '@playwright/test';

// Local-only Chromium E2E (Issue #17). Each run writes to its own folder so a new run
// does not wipe the failure artifacts of a previous one: set PW_RUN_ID per run.
const runId = process.env.PW_RUN_ID || 'latest';
const negativeControl = process.env.PW_NEGATIVE_CONTROL === '1';
const port = 4173;

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: `test-results/${runId}`,
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  // PW-11 negative control runs only on demand, never as part of Smoke/Regression.
  grep: negativeControl ? /@negative/ : undefined,
  grepInvert: negativeControl ? undefined : /@negative/,
  reporter: [['list'], ['json', { outputFile: `playwright-report/${runId}.json` }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'desktop-1440', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-390', use: { browserName: 'chromium', viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
