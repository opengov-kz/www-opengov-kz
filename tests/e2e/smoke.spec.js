// Mandatory P0 Smoke (Q-OGK-TEST-15=A): PW-01/02/03/04/06/07/10 on /, /tools, /tools/open-data,
// /projects (reachability only) and one unknown path, both viewports, RU/KZ/EN where applicable.
import { expect, test } from '@playwright/test';
import {
  HEADER_LINKS, LOCALES, P0_ROUTES, UNKNOWN_ROUTE, expectRendered, headerText, htmlLang, note,
  notFoundText, openMobileMenuIfNeeded, overflow, setLocale, watchErrors,
} from './helpers.js';

test.describe('@smoke', () => {
  test('PW-01 homepage renders principal content without uncaught JS errors', async ({ page, baseURL }) => {
    const errors = watchErrors(page, baseURL);
    await page.goto('/', { waitUntil: 'load' });
    await expectRendered(page);
    // Locators taken from src/pages/mainPage/mainPage.jsx: hero image and hero CTA.
    await expect(page.locator('img[src="/mainPage_1.png"]')).toBeVisible();
    // Hero CTA is the link itself since #19 (AC-SUI-04: no button nested in a link).
    await expect(page.locator('a[href="/aboutMe"]:not(header a):not(footer a)')).toBeVisible();
    expect(errors.pageErrors, 'uncaught JS exceptions').toEqual([]);
  });

  for (const href of HEADER_LINKS) {
    test(`PW-02 baseline: header link ${href} navigates (current implementation)`, async ({ page }) => {
      await page.goto(href === '/' ? '/news' : '/', { waitUntil: 'load' });
      await openMobileMenuIfNeeded(page);
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
      note('scope', 'Local vite preview answers 200 for any path; real HTTP status is PW-12 (separate gate)');
    });
  }

  for (const locale of LOCALES) {
    test(`PW-06 client NotFound ${locale.key}: copy, title, lang, noindex and cleanup`, async ({ page }) => {
      const copy = notFoundText(locale.key);
      await page.goto(UNKNOWN_ROUTE, { waitUntil: 'load' });
      await setLocale(page, locale);
      await expect(page.locator('main h1')).toHaveText(copy.title);
      await expect(page).toHaveTitle(copy.seoTitle);
      expect(await htmlLang(page)).toBe(locale.htmlLang);
      await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);
      const home = page.locator('main a[href="/"]');
      await expect(home).toHaveText(copy.homeLink);
      await home.click();
      await expect(page).toHaveURL('/');
      await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(0);
      await expect(page).toHaveTitle('OpenGov.kz');
    });
  }

  for (const route of [...P0_ROUTES, UNKNOWN_ROUTE]) {
    for (const locale of LOCALES) {
      test(`PW-07 no horizontal overflow ${route} [${locale.key}]`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
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

  test('PW-03 header language buttons RU/KZ/EN exist, default is RU', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await openMobileMenuIfNeeded(page);
    for (const locale of LOCALES) {
      await expect(page.locator('header').getByRole('button', { name: locale.button, exact: true })).toBeVisible();
    }
    await expect(page.locator('header nav a[href="/"]')).toHaveText(headerText('ru').home);
  });
});
