// Issue #28: six legacy routes removed (Q-OGK-MVP-RB-04=A), "Подробнее" removed from /projects cards
// (Q-OGK-MVP-RB-06=B). Local `vite preview` answers every path with index.html (200), so server
// HTTP 404 is asserted on vercel.json here; the client side is asserted in the browser.
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LOCALES, REMOVED_ROUTES, ROUTES, notFoundText, setLocale } from './helpers.js';

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
      test(`AC-01 removed ${route} [${locale.key}] renders client NotFound`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        await expect(page.locator('main h1')).toHaveText(notFoundText(locale.key).title);
        await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);
        await expect(page.locator('main a[href="/"]')).toBeVisible();
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
