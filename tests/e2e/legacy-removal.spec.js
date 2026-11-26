// Issue #28: six legacy routes removed (Q-OGK-MVP-RB-04=A). AC-11 checks /projects as the Approved
// «Areas of work» page of #14 (the former mock cards and their "Подробнее" link are gone). Locally `vite preview` answers every path with index.html (200), so the client
// NotFound is asserted in the browser and server 404 on vercel.json; with PW_BASE_URL (Vercel) AC-01
// asserts the real HTTP 404 static page instead (F-08, helpers.expectNotFound).
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LANGUAGE_URLS, LOCALES, NOT_FOUND_MODE, REMOVED_ROUTES, ROUTES, expectNotFound, setLocale } from './helpers.js';

const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const projectsText = (lang) =>
  JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/projectsPage.json`, import.meta.url), 'utf8'));

test.describe('@regression #28 legacy removal', () => {
  test('AC-05 vercel.json: no rewrite for removed routes, rewrites for surviving routes, no redirects', () => {
    const sources = vercel.rewrites.map((r) => r.source);
    expect(sources.filter((s) => REMOVED_ROUTES.includes(s)), 'removed routes still rewritten to index.html').toEqual([]);
    // #44 Phase 0: language URLs (/, /tools/open-data, /projects and /kk, /en twins) are prerendered files served by
    // cleanUrls; the other SPA routes are rewritten to the SPA shell.
    expect(sources.sort()).toEqual(ROUTES.filter((r) => !LANGUAGE_URLS.includes(r)).sort());
    expect(vercel.rewrites.every((r) => r.destination === '/spa-shell.html'), 'rewrites target the SPA shell').toBe(true);
    expect(vercel.redirects, 'no redirects approved (Q-OGK-MVP-RB-04=A)').toBeUndefined();
  });

  for (const route of REMOVED_ROUTES) {
    for (const locale of LOCALES) {
      test(`AC-01 removed ${route} [${locale.key}] renders ${NOT_FOUND_MODE} NotFound`, async ({ page }) => {
        await expectNotFound(page, route, locale);
      });
    }
  }

  // #14 (K1=A): /projects is the Approved «Areas of work» page (AC-PROJ-01/03/04/05), replacing the 18 mock cards.
  for (const locale of LOCALES) {
    test(`AC-11 /projects [${locale.key}] Approved areas of work, no mock cards, search, filters or detail link`, async ({ page }) => {
      const copy = projectsText(locale.key);
      await page.goto('/projects', { waitUntil: 'load' });
      await setLocale(page, locale);
      const main = page.locator('main');
      await expect(main.locator('h1')).toHaveText(copy.hero.title);
      await expect(main.getByText(copy.hero.lead, { exact: true })).toBeVisible();
      await expect(main.getByText(copy.hero.about, { exact: true })).toBeVisible();
      await expect(main.locator('h2')).toHaveText(copy.areas.map((area) => area.title));
      for (const area of copy.areas) await expect(main.getByText(area.text, { exact: true })).toBeVisible();
      await expect(main.getByText(copy.note, { exact: true })).toBeVisible();
      await expect(main.getByText(copy.cta.question, { exact: true })).toBeVisible();
      await expect(main.getByRole('link', { name: copy.cta.link, exact: true })).toHaveAttribute('href', '/community');
      await expect(page).toHaveTitle(copy.seoTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', copy.seoDescription);
      await expect(page.locator('img[src^="/pp_Card"]'), 'mock project cards').toHaveCount(0);
      await expect(main.locator('input, button, a[href^="mailto:"]'), 'search, filters, pagination, email CTA').toHaveCount(0);
      await expect(page.locator('a[href="/projectDetail"]'), 'link to removed /projectDetail').toHaveCount(0);
      await expect(page.locator('header nav a[href="/projects"]'), 'no «Projects» menu item').toHaveCount(0);
    });
  }
});
