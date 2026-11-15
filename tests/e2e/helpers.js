import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// The 12 SPA routes declared in src/App.jsx (a3c71ab).
export const ROUTES = ['/', '/aboutMe', '/news', '/projects', '/members', '/newsDetail', '/projectDetail',
  '/membersDetail', '/tools', '/tools/open-data', '/tools/open-budgets', '/tools/legal-acts'];
// Q-OGK-TEST-15=A P0 Smoke sample; /projects is reachability only (content owned by #14).
export const P0_ROUTES = ['/', '/tools', '/tools/open-data', '/projects'];
export const UNKNOWN_ROUTE = '/pw-e2e-unknown-route';
export const HEADER_LINKS = ['/', '/aboutMe', '/news', '/members', '/projects'];

// i18next key -> header button label -> semantic HTML lang (Q-OGK-TEST-12=A: kz -> kk).
export const LOCALES = [
  { key: 'ru', button: 'РУС', htmlLang: 'ru' },
  { key: 'kz', button: 'ҚАЗ', htmlLang: 'kk' },
  { key: 'en', button: 'ENG', htmlLang: 'en' },
];

const readLocale = (lang, ns) =>
  JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/${ns}.json`, import.meta.url), 'utf8'));
export const headerText = (lang) => readLocale(lang, 'header');
export const notFoundText = (lang) => readLocale(lang, 'notFoundPage');

export const note = (type, description) => test.info().annotations.push({ type, description });

export const burger = (page) => page.locator('header > button');

export async function openMobileMenuIfNeeded(page) {
  const nav = page.locator('header nav');
  if (!(await nav.isVisible()) && (await burger(page).isVisible())) {
    await burger(page).click();
    await expect(nav).toBeVisible();
  }
}

// Locale is not persisted by the app, so every test switches it through the UI.
export async function setLocale(page, locale) {
  await openMobileMenuIfNeeded(page);
  await page.locator('header').getByRole('button', { name: locale.button, exact: true }).click();
  await expect(page.locator('header nav a[href="/"]')).toHaveText(headerText(locale.key).home);
}

export async function expectRendered(page) {
  await expect(page.locator('#root > *').first()).toBeAttached();
  await expect(page.locator('header')).toBeVisible();
}

export const htmlLang = (page) => page.evaluate(() => document.documentElement.lang);

export const overflow = (page) =>
  page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, viewport: window.innerWidth }));

// PW-10 (Q-OGK-TEST-17=A): pageerror and first-party resource failures are separate checks,
// console.error is diagnostic only.
export function watchErrors(page, origin) {
  const errors = { pageErrors: [], consoleErrors: [], firstPartyFailures: [], thirdPartyFailures: [] };
  page.on('pageerror', (e) => errors.pageErrors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.consoleErrors.push(m.text()); });
  page.on('response', (r) => {
    const type = r.request().resourceType();
    if (type === 'document') return;
    const firstParty = r.url().startsWith(origin);
    // Local `vite preview` answers missing files with the SPA index.html (200) where Vercel returns 404.
    const spaFallback = firstParty && r.status() < 400 && ['image', 'script', 'stylesheet', 'font'].includes(type)
      && (r.headers()['content-type'] ?? '').includes('text/html');
    if (r.status() < 400 && !spaFallback) return;
    const entry = spaFallback ? `missing ${type} (served SPA HTML fallback) ${r.url()}` : `${r.status()} ${r.url()}`;
    (firstParty ? errors.firstPartyFailures : errors.thirdPartyFailures).push(entry);
  });
  page.on('requestfailed', (r) => {
    const entry = `failed ${r.url()} ${r.failure()?.errorText ?? ''}`;
    (r.url().startsWith(origin) ? errors.firstPartyFailures : errors.thirdPartyFailures).push(entry);
  });
  return errors;
}
