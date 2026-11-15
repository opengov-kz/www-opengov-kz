/* global process */
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';

// Local-only Chromium E2E (Issue #17). Evidence guard (F-17-02, Q-OGK-TEST-30=A): Playwright
// deletes outputDir and overwrites the JSON report at start, so every run gets its own never
// reused folder. The default ID is unique per invocation and is exported to process.env so
// worker processes, which reload this file, resolve the same folder.
process.env.PW_RUN_ID ||= `run-${new Date().toISOString().replace(/[:.]/g, '-')}-p${process.pid}`;
const runId = process.env.PW_RUN_ID;
const root = fileURLToPath(new URL('./', import.meta.url));
const outputDir = `${root}test-results/${runId}`;
const reportFile = `${root}playwright-report/${runId}.json`;

// The check runs once, in the process that first loads the config; that process and its
// workers (children) carry the guard token and skip it. Nothing is ever deleted here.
const guardToken = `${runId}:${process.pid}`;
if (![guardToken, `${runId}:${process.ppid}`].includes(process.env.PW_RUN_GUARD)) {
  const stop = (why) => { throw new Error(`[evidence guard] ${why}. Nothing was deleted or overwritten.`); };
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(runId)) stop(`PW_RUN_ID "${runId}" must be a plain folder name`);
  if (process.argv.some((a) => a === '--output' || a.startsWith('--output='))) stop('--output bypasses the per-run folder, use PW_RUN_ID');
  // F-MR-01: a CLI reporter replaces the JSON reporter, and the HTML reporter clears playwright-report/.
  if (process.argv.some((a) => a === '--reporter' || a.startsWith('--reporter='))) stop('--reporter replaces the per-run JSON report');
  for (const name of ['PLAYWRIGHT_JSON_OUTPUT_FILE', 'PLAYWRIGHT_JSON_OUTPUT_NAME', 'PLAYWRIGHT_JSON_OUTPUT_DIR', 'PW_TEST_REPORTER']) {
    if (process.env[name]) stop(`${name} overrides the per-run JSON report`);
  }
  if (existsSync(reportFile)) stop(`report playwright-report/${runId}.json already exists`);
  mkdirSync(`${root}test-results`, { recursive: true });
  try {
    mkdirSync(outputDir); // atomic reservation: a concurrent run with the same ID gets EEXIST
  } catch (e) {
    if (e.code === 'EEXIST') stop(`output folder test-results/${runId} already exists`);
    throw e;
  }
  process.env.PW_RUN_GUARD = guardToken;
}

const negativeControl = process.env.PW_NEGATIVE_CONTROL === '1';
const port = 4173;

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir,
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  // PW-11 negative control runs only on demand, never as part of Smoke/Regression.
  grep: negativeControl ? /@negative/ : undefined,
  grepInvert: negativeControl ? undefined : /@negative/,
  reporter: [['list'], ['json', { outputFile: reportFile }]],
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
