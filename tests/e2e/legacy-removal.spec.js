// Issue #28: six legacy routes removed (Q-OGK-MVP-RB-04=A). AC-11 checks /projects as the Approved
// «Areas of work» page of #14 (the former mock cards and their "Подробнее" link are gone). Since #44 Phase 1 the local
// `vite preview` follows vercel.json like Vercel, so AC-01 asserts the real HTTP 404 static page in both environments
// (F-08, helpers.expectNotFound).
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LANGUAGE_URLS, LOCALES, NOT_FOUND_MODE, REMOVED_ROUTES, expectNotFound, localizedUrl, setLocale } from './helpers.js';

const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const projectsText = (lang) =>
  JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/projectsPage.json`, import.meta.url), 'utf8'));

test.describe('@regression #28 legacy removal', () => {
  test('AC-05 vercel.json: no rewrite or redirect for removed routes; rewrites only for language URLs', () => {
    const sources = [...vercel.rewrites, ...vercel.redirects].map((r) => r.source);
    expect(sources.filter((s) => REMOVED_ROUTES.includes(s)), 'removed routes still rewritten or redirected').toEqual([]);
    // #44 Phase 1: every language URL except / is rewritten to its prerendered .html file (no SPA shell, no cleanUrls,
    // Q-OGK-44-P0-02=B, P0-03=A).
    expect(vercel.rewrites.map((r) => r.source).sort()).toEqual(LANGUAGE_URLS.filter((u) => u !== '/').sort());
    for (const r of vercel.rewrites) expect(r.destination, `rewrite ${r.source}`).toBe(`${r.source}.html`);
    expect(vercel.cleanUrls, 'no cleanUrls: /404 must stay HTTP 404 (P0-02=B)').toBeUndefined();
    // Q-OGK-44-P0-06=A (supersedes «no redirects» of Q-OGK-MVP-RB-04=A for these paths): only permanent 308 redirects of
    // .html and index aliases to a language URL.
    for (const r of vercel.redirects) {
      expect(r.permanent, `redirect ${r.source} is 308`).toBe(true);
      expect(LANGUAGE_URLS, `redirect ${r.source} -> language URL`).toContain(r.destination);
      expect(r.source, `redirect ${r.source} is an .html or index alias`).toMatch(/(\.html|\/index)$/);
    }
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
      // #44: internal links keep the language of the page (/kk/community, /en/community).
      await expect(main.getByRole('link', { name: copy.cta.link, exact: true })).toHaveAttribute('href', localizedUrl('/community', locale));
      await expect(page).toHaveTitle(copy.seoTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', copy.seoDescription);
      await expect(page.locator('img[src^="/pp_Card"]'), 'mock project cards').toHaveCount(0);
      await expect(main.locator('input, button, a[href^="mailto:"]'), 'search, filters, pagination, email CTA').toHaveCount(0);
      await expect(page.locator('a[href="/projectDetail"]'), 'link to removed /projectDetail').toHaveCount(0);
      await expect(page.locator('header nav a[href$="/projects"]'), 'no «Projects» menu item').toHaveCount(0);
    });
  }
});
