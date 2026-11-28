import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LANGS, PRERENDERED, langOf, urlOf } from '../../src/routing.js';

// The 9 SPA routes declared in src/App.jsx: 8 MVP routes of design v1.2 (#26) + /projects «Areas of work» (#14, not in the menu).
export const MVP_ROUTES = ['/', '/open-government', '/tools', '/tools/open-data', '/tools/open-budgets',
  '/tools/legal-acts', '/community', '/about'];
export const LEGACY_ROUTES = ['/projects'];
export const ROUTES = [...MVP_ROUTES, ...LEGACY_ROUTES];
// Removed in #28 (Q-OGK-MVP-RB-04=A): no route, no vercel.json rewrite, HTTP 404 on Vercel.
export const REMOVED_ROUTES = ['/aboutMe', '/news', '/newsDetail', '/projectDetail', '/members', '/membersDetail'];
// Q-OGK-TEST-15=A P0 Smoke sample; /projects is reachability only (content owned by #14).
export const P0_ROUTES = ['/', '/tools', '/tools/open-data', '/projects'];
export const UNKNOWN_ROUTE = '/pw-e2e-unknown-route';
// v1.2 header navigation (#26); the logo links to '/'.
export const HEADER_LINKS = ['/open-government', '/tools', '/community', '/about'];

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
export const mainPageText = (lang) => readLocale(lang, 'mainPage');

export const note = (type, description) => test.info().annotations.push({ type, description });

// #44: URLs of src/routing.js (language URLs, all prerendered): RU unprefixed, /kk and /en.
export const LANGUAGE_URLS = PRERENDERED.map((r) => r.url);
export const homeOf = (key) => urlOf(langOf(key), '/');
// URL of the RU route `path` in the language of `locale` (a LOCALES entry), e.g. ('/tools', kz) -> '/kk/tools'.
export const localizedUrl = (path, locale) => urlOf(langOf(locale.key), path);
// Header menu link of the RU route `path` in the language of `locale`.
export const navLink = (page, path, locale = LOCALES[0]) => page.locator(`header nav a[href="${localizedUrl(path, locale)}"]`);

// Locale is not persisted by the app, so every test switches it through the UI.
// Since #26 the header has no burger: navigation and language controls are always visible.
// #44 Phase 1: on every page the switcher is a link to the same page in that language (navigates to /kk/… or /en/…).
export async function setLocale(page, locale) {
  const route = PRERENDERED.find((r) => r.url === new URL(page.url()).pathname);
  expect(route, `setLocale on a language URL, got ${page.url()}`).toBeTruthy();
  await page.locator('header ul a[hreflang]', { hasText: locale.button }).click();
  await expect(page).toHaveURL(urlOf(LANGS.find((l) => l.key === locale.key), route.page.path));
  await expect(navLink(page, '/tools', locale)).toHaveText(headerText(locale.key).tools);
  await expect(page.locator('html')).toHaveAttribute('lang', locale.htmlLang);
}

// F-08 (Q-OGK-MVP-RB-08=B): the environment is chosen only by PW_BASE_URL (see playwright.config.js).
// #44 Phase 1: there is no SPA shell any more, so the local `vite preview` follows vercel.json like Vercel (vite.config.js)
// and both environments answer paths outside the language URLs with HTTP 404 and the static trilingual public/404.html:
// no React, no header, no language links, each language in its own <section lang>.
export const SERVER_404 = true;
export const NOT_FOUND_MODE = 'HTTP 404';
export const isServerNotFound = (route) => !ROUTES.includes(route) && !LANGUAGE_URLS.includes(route);

// NotFound for `route` in `locale`: the real HTTP 404 without redirect, noindex, and the locale's section with the
// same copy as notFoundPage.json (static public/404.html, locally and on Vercel since #44 Phase 1).
export async function expectNotFound(page, route, locale) {
  const response = await page.goto(route, { waitUntil: 'load' });
  const copy = notFoundText(locale.key);
  note('environment', `HTTP 404 static page: ${response.url()}`);
  expect(response.status(), 'server HTTP status').toBe(404);
  expect(response.request().redirectedFrom(), 'redirect before the 404').toBeNull();
  expect(new URL(response.url()).pathname, 'final URL').toBe(route);
  expect(response.headers()['content-type'] ?? '').toContain('text/html');
  await expect(page.locator('#root'), 'React must not render on the server 404').toHaveCount(0);
  await expect(page).toHaveTitle(new RegExp(copy.title));
  const section = page.locator(`main section[lang="${locale.htmlLang}"]`);
  await expect(section.locator('h1, h2')).toHaveText(copy.title);
  await expect(section.locator('p')).toHaveText(copy.text);
  await expect(section.locator('a[href="/"]')).toHaveText(copy.homeLink);
  await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/"]').first()).toBeVisible();
}

// goto + locale switch; an unknown/removed path is the static HTTP 404, checked for that locale instead.
export async function openLocalized(page, route, locale) {
  if (isServerNotFound(route)) return expectNotFound(page, route, locale);
  await page.goto(route, { waitUntil: 'load' });
  await setLocale(page, locale);
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
