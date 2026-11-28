// Mandatory P0 Smoke (Q-OGK-TEST-15=A): PW-01/02/03/04/06/07/10 on /, /tools, /tools/open-data,
// /projects (reachability only) and one unknown path, both viewports, RU/KZ/EN where applicable.
import { expect, test } from '@playwright/test';
import {
  HEADER_LINKS, LOCALES, NOT_FOUND_MODE, P0_ROUTES, UNKNOWN_ROUTE, expectNotFound, expectRendered,
  headerText, htmlLang, mainPageText, note, notFoundText, openLocalized, overflow, setLocale, watchErrors,
} from './helpers.js';

test.describe('@smoke', () => {
  test('PW-01 homepage renders principal content without uncaught JS errors', async ({ page, baseURL }) => {
    const errors = watchErrors(page, baseURL);
    await page.goto('/', { waitUntil: 'load' });
    await expectRendered(page);
    // v1.2 home (#26): H1 and the primary hero CTA to /open-government.
    await expect(page.locator('main h1')).toHaveText(mainPageText('ru').hero.title);
    await expect(page.locator('main a[href="/open-government"]').first()).toBeVisible();
    expect(errors.pageErrors, 'uncaught JS exceptions').toEqual([]);
  });

  for (const href of HEADER_LINKS) {
    test(`PW-02 baseline: header link ${href} navigates (current implementation)`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'load' });
      await page.locator(`header nav a[href="${href}"]`).click();
      await expect(page).toHaveURL(href);
      await expectRendered(page);
    });
  }

  for (const route of ['/', '/tools']) {
    for (const locale of LOCALES) {
      test(`PW-03 locale ${locale.key} on ${route}: switch works and html lang is ${locale.htmlLang}`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale); // baseline: UI strings switch to the selected locale
        const actual = await htmlLang(page);
        note('baseline-html-lang', `${route} ${locale.key}: actual="${actual}", target="${locale.htmlLang}"`);
        note('approved-copy', 'Not Verified: no approved per-page copy assertions in this test (Q-OGK-TEST-12=A)');
        expect(actual, 'target html lang (Q-OGK-TEST-12=A)').toBe(locale.htmlLang);
      });
    }
  }

  for (const route of P0_ROUTES) {
    test(`PW-04 direct load and refresh ${route}`, async ({ page }) => {
      const first = await page.goto(route, { waitUntil: 'load' });
      expect(first.status()).toBe(200);
      await expectRendered(page);
      const again = await page.reload({ waitUntil: 'load' });
      expect(again.status()).toBe(200);
      await expect(page).toHaveURL(route);
      await expectRendered(page);
      note('scope', 'Since #44 Phase 1 local vite preview follows vercel.json; the deployed HTTP matrix is checked on Preview');
    });
  }

  for (const locale of LOCALES) {
    test(`PW-06 ${NOT_FOUND_MODE} NotFound ${locale.key}: copy, title, lang, noindex and cleanup`, async ({ page }) => {
      const copy = notFoundText(locale.key);
      await expectNotFound(page, UNKNOWN_ROUTE, locale);
      // Server 404 (locally and on Vercel since #44 Phase 1): one static page for all languages (document lang ru,
      // locale in its <section lang>), its home link is / for every language.
      const home = page.locator(`main section[lang="${locale.htmlLang}"] a[href="/"]`);
      await expect(home).toHaveText(copy.homeLink);
      await home.click();
      await expect(page).toHaveURL('/');
      await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(0);
      // The locale is not persisted, so after a full page load (server 404 -> /) the app starts in ru.
      await expect(page).toHaveTitle(mainPageText('ru').seoTitle);
    });
  }

  for (const route of [...P0_ROUTES, UNKNOWN_ROUTE]) {
    for (const locale of LOCALES) {
      test(`PW-07 no horizontal overflow ${route} [${locale.key}]`, async ({ page }) => {
        await openLocalized(page, route, locale);
        const o = await overflow(page);
        note('overflow', `${route} ${locale.key}: scrollWidth=${o.scrollWidth}, viewport=${o.viewport}`);
        expect(o.scrollWidth, 'document width beyond viewport, 0 px tolerance (Q-OGK-TEST-16=A)')
          .toBeLessThanOrEqual(o.viewport);
      });
    }
  }

  for (const route of [...P0_ROUTES, UNKNOWN_ROUTE]) {
    test(`PW-10 no uncaught JS errors ${route}`, async ({ page, baseURL }) => {
      const errors = watchErrors(page, baseURL);
      await page.goto(route, { waitUntil: 'networkidle' });
      if (errors.consoleErrors.length) note('console.error (diagnostic)', errors.consoleErrors.join(' | '));
      expect(errors.pageErrors).toEqual([]);
    });

    test(`PW-10 first-party resources load ${route}`, async ({ page, baseURL }) => {
      const errors = watchErrors(page, baseURL);
      await page.goto(route, { waitUntil: 'networkidle' });
      if (errors.thirdPartyFailures.length) note('third-party failures (diagnostic)', errors.thirdPartyFailures.join(' | '));
      if (errors.consoleErrors.length) note('console.error (diagnostic)', errors.consoleErrors.join(' | '));
      expect(errors.firstPartyFailures, 'first-party resource HTTP >= 400 or network failure').toEqual([]);
    });
  }

  test('PW-03 header language links RU/KZ/EN exist, default is RU', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    for (const locale of LOCALES) {
      // #44: the language controls are links (no buttons since Phase 1); visible label checked.
      await expect(page.locator('header ul a[hreflang]').getByText(locale.button, { exact: true })).toBeVisible();
    }
    await expect(page.locator('header ul button'), 'no language buttons (#44 Phase 1)').toHaveCount(0);
    await expect(page.locator('header nav a[href="/tools"]')).toHaveText(headerText('ru').tools);
  });
});
