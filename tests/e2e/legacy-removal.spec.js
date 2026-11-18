// Issue #28: six legacy routes removed (Q-OGK-MVP-RB-04=A), "Подробнее" removed from /projects cards
// (Q-OGK-MVP-RB-06=B). Locally `vite preview` answers every path with index.html (200), so the client
// NotFound is asserted in the browser and server 404 on vercel.json; with PW_BASE_URL (Vercel) AC-01
// asserts the real HTTP 404 static page instead (F-08, helpers.expectNotFound).
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LOCALES, NOT_FOUND_MODE, REMOVED_ROUTES, ROUTES, expectNotFound, setLocale } from './helpers.js';

const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const projectsText = (lang) =>
  JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/projectsPage.json`, import.meta.url), 'utf8'));

test.describe('@regression #28 legacy removal', () => {
  test('AC-05 vercel.json: no rewrite for removed routes, rewrites for surviving routes, no redirects', () => {
    const sources = vercel.rewrites.map((r) => r.source);
    expect(sources.filter((s) => REMOVED_ROUTES.includes(s)), 'removed routes still rewritten to index.html').toEqual([]);
    expect(sources.sort()).toEqual(ROUTES.filter((r) => r !== '/').sort());
    expect(vercel.redirects, 'no redirects approved (Q-OGK-MVP-RB-04=A)').toBeUndefined();
  });

  for (const route of REMOVED_ROUTES) {
    for (const locale of LOCALES) {
      test(`AC-01 removed ${route} [${locale.key}] renders ${NOT_FOUND_MODE} NotFound`, async ({ page }) => {
        await expectNotFound(page, route, locale);
      });
    }
  }

  for (const locale of LOCALES) {
    test(`AC-11 /projects [${locale.key}] 18 cards, no "${projectsText(locale.key).more}" and no detail link`, async ({ page }) => {
      await page.goto('/projects', { waitUntil: 'load' });
      await setLocale(page, locale);
      const pages = page.locator('#root button').filter({ hasText: /^\d+$/ });
      await expect(pages).toHaveCount(3);
      let cards = 0;
      for (let p = 1; p <= 3; p++) {
        await pages.filter({ hasText: new RegExp(`^${p}$`) }).click();
        const images = page.locator('img[src^="/pp_Card"]');
        await expect(images.first()).toBeVisible();
        cards += await images.count();
        await expect(page.locator('a[href="/projectDetail"]'), 'link to removed /projectDetail').toHaveCount(0);
        await expect(page.getByText(projectsText(locale.key).more, { exact: true }), 'dead CTA').toHaveCount(0);
      }
      expect(cards).toBe(18);
    });
  }
});
