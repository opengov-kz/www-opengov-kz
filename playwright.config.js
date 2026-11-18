/* global process */
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';

// Chromium E2E (Issue #17), local by default, optionally against a deployment (PW_BASE_URL, below). Evidence guard (F-17-02, Q-OGK-TEST-30=A): Playwright
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

// Environment (F-08, Q-OGK-MVP-RB-08=B), selected only by PW_BASE_URL:
// - unset: local `npm run build` + `vite preview` (SPA answers every path, client React NotFound);
// - set (e.g. https://<preview>.vercel.app): no local server, tests run against that deployment, unknown and
//   removed paths must return HTTP 404 with the static public/404.html (tests/e2e/helpers.js expectNotFound).
// PW_STORAGE_STATE (optional) is a storageState file with an access cookie for a protected Preview; keep it outside
// the repo. Traces are then off because they record request cookies.
const remoteBase = process.env.PW_BASE_URL;
if (remoteBase && !/^https?:\/\/[^/]+\/?$/.test(remoteBase)) {
  throw new Error(`PW_BASE_URL "${remoteBase}" must be an origin like https://host`);
}
const storageState = process.env.PW_STORAGE_STATE || undefined;

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
    baseURL: remoteBase?.replace(/\/$/, '') ?? `http://127.0.0.1:${port}`,
    storageState,
    screenshot: 'only-on-failure',
    trace: storageState ? 'off' : 'retain-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'desktop-1440', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-390', use: { browserName: 'chromium', viewport: { width: 390, height: 844 } } },
  ],
  webServer: remoteBase ? undefined : {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
