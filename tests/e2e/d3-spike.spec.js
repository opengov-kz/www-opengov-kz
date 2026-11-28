/* global process */
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LANGS, PRERENDERED, SITE, urlOf } from '../../src/routing.js';

// #44 D-3 language URLs: the 27 URLs of src/routing.js (9 routes × RU, /kk, /en), Phase 1 AC-01…08, AC-12.
// The HTTP 200/308/404 matrix (AC-09) is http-contract.spec.js, axe (AC-06) is a11y-axe.spec.js.
// D3_BASELINE=1 (with PW_BASE_URL of the baseline Staging) runs only the visual test and writes the reference
// screenshots (Q-OGK D-2=A, committed): the baseline has no /kk or /en URLs, so it opens the RU URL and switches with
// the header button.
const BASELINE = process.env.D3_BASELINE === '1';

const locale = (lang, ns) => JSON.parse(readFileSync(new URL(`../../src/locales/${lang.key}/${ns}.json`, import.meta.url), 'utf8'));
const pick = (obj, key) => key.split('.').reduce((o, k) => o[k], obj);
const h1Of = (r) => pick(locale(r.lang, r.page.ns), r.page.h1);
const seoOf = (r, key) => pick(locale(r.lang, r.page.ns), `${r.page.seo}${key}`);
const find = (lang, path) => PRERENDERED.find((r) => r.lang === lang && r.page.path === path);
const slug = (r) => `${r.lang.hreflang}${r.page.path === '/' ? '-home' : r.page.path.replaceAll('/', '-')}`;
const [RU, KK, EN] = LANGS;

// Head state that AC-07/08 cover, read from the live DOM.
const headState = (page) => page.evaluate(() => ({
  lang: document.documentElement.lang,
  title: document.title,
  descriptions: [...document.querySelectorAll('meta[name="description"]')].map((m) => m.content),
  robots: [...document.querySelectorAll('meta[name="robots"]')].map((m) => m.content),
  canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.href),
  alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => `${l.hreflang} ${l.href}`),
}));

function assertHead(state, r) {
  expect(state.lang, 'html lang').toBe(r.lang.hreflang);
  expect(state.title, 'title').toBe(seoOf(r, 'seoTitle'));
  expect(state.descriptions, 'one description').toEqual([seoOf(r, 'seoDescription')]);
  if (r.page.noindex) {
    expect(state.robots, 'projects: noindex').toEqual(['noindex']);
    expect(state.canonicals, 'projects: no canonical').toEqual([]);
    expect(state.alternates, 'projects: no hreflang').toEqual([]);
  } else {
    expect(state.robots, 'indexable: no robots meta').toEqual([]);
    expect(state.canonicals, 'one self-canonical').toEqual([SITE + r.url]);
    expect(state.alternates, 'reciprocal hreflang, x-default RU (P0-04=A)').toEqual([
      ...LANGS.map((l) => `${l.hreflang} ${SITE}${urlOf(l, r.page.path)}`),
      `x-default ${SITE}${urlOf(RU, r.page.path)}`,
    ]);
  }
}

const expectHead = (page, r) => expect(async () => assertHead(await headState(page), r)).toPass({ timeout: 5000 });

// Records every text the first <h1> shows from the first parsed byte on (RU flash detector), JS errors and
// hydration warnings, and a marker that survives SPA navigation but not a full reload.
async function instrument(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error' || /hydrat/i.test(m.text())) errors.push(`${m.type()}: ${m.text()}`); });
  await page.addInitScript(() => {
    window.__h1 = [];
    window.__lang = [];
    new MutationObserver(() => {
      const text = document.querySelector('h1')?.textContent;
      if (text && window.__h1.at(-1) !== text) window.__h1.push(text);
      // every value <html lang> takes from the first parsed byte on (a transient wrong lang is caught too)
      const lang = document.documentElement?.getAttribute('lang');
      if (lang && window.__lang.at(-1) !== lang) window.__lang.push(lang);
    }).observe(document, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['lang'] });
  });
  return errors;
}
const hydrated = (page) => expect.poll(() => page.evaluate(() =>
  Object.keys(document.getElementById('root') ?? {}).some((k) => k.startsWith('__reactContainer'))), { message: 'React root attached' }).toBe(true);
const langLinks = (page) => page.locator('header ul a[hreflang]');
const LANGUAGE_URLS = PRERENDERED.map((r) => r.url);

// Lazy images below the fold (src/ui/illustration.jsx) load nondeterministically in a full-page screenshot (#47):
// force and await them before a reference or a compared screenshot.
const loadImages = (page) => page.evaluate(async () => {
  const imgs = [...document.images];
  imgs.forEach((i) => { i.loading = 'eager'; });
  await Promise.all(imgs.map((i) => (i.complete && i.naturalWidth ? i.decode().catch(() => {})
    : new Promise((ok) => { i.onload = i.onerror = ok; }).then(() => i.decode().catch(() => {})))));
});

test.describe('@d3 #44 language URLs', () => {
  test.skip(BASELINE, 'D3_BASELINE runs only the visual reference');

  for (const r of PRERENDERED) {
    test(`AC-01/02/07 static HTML without JS ${r.url}`, async ({ browser, request }, info) => {
      const res = await request.get(r.url, { maxRedirects: 0 });
      expect(res.status(), 'HTTP status').toBe(200);
      const raw = await res.text();
      const rawH1 = [...raw.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '')
        .replace(/&(amp|lt|gt|quot|#x27|#39);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'", '#39': "'" })[e]));
      expect(rawH1, 'raw HTML: one h1 with the page text').toEqual([h1Of(r)]);
      expect(raw).toContain(`<html lang="${r.lang.hreflang}">`);
      expect(raw, 'raw HTML: main').toContain('<main');

      const context = await browser.newContext({ javaScriptEnabled: false, storageState: info.project.use.storageState });
      const page = await context.newPage();
      await page.goto(r.url);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1')).toHaveText(h1Of(r));
      await expect(page.locator('h1')).toHaveCount(1);
      await expectHead(page, r);
      await page.screenshot({ path: info.outputPath(`js-disabled-${slug(r)}.png`) });
      await context.close();
    });

    test(`AC-03/12 first render language and hydration ${r.url}`, async ({ page }) => {
      const errors = await instrument(page);
      await page.goto(r.url, { waitUntil: 'load' });
      await hydrated(page);
      await page.waitForTimeout(300); // late hydration recoverable errors are reported asynchronously
      expect(await page.evaluate(() => window.__h1), 'H1 texts from the first byte: no other language').toEqual([h1Of(r)]);
      expect(await page.evaluate(() => window.__lang), '<html lang> from the first byte: never another language').toEqual([r.lang.hreflang]);
      expect(errors, 'console/page errors and hydration warnings').toEqual([]);
      await expectHead(page, r);
    });

    test(`AC-05 internal links keep the language ${r.url}`, async ({ page }) => {
      await page.goto(r.url, { waitUntil: 'load' });
      await hydrated(page);
      // Every same-site link outside the language switcher is a language URL of the page language (/projects is no
      // menu item, so it may only appear as the current page).
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) =>
        as.filter((a) => !a.closest('header ul')).map((a) => a.getAttribute('href')));
      expect(hrefs.length, 'internal links found').toBeGreaterThan(5);
      const wrong = hrefs.filter((h) => !LANGUAGE_URLS.includes(h) || PRERENDERED.find((x) => x.url === h).lang !== r.lang);
      expect(wrong, `links outside ${r.lang.hreflang} language URLs`).toEqual([]);
    });

    test(`AC-04/06/12 language links, keyboard, overflow ${r.url}`, async ({ page }, info) => {
      const errors = await instrument(page);
      await page.goto(r.url, { waitUntil: 'load' });
      await hydrated(page);

      const links = langLinks(page);
      await expect(links).toHaveCount(3);
      await expect(page.locator('header button'), 'no language buttons (P0-03=A, F-06)').toHaveCount(0);
      for (const [i, l] of LANGS.entries()) {
        const link = links.nth(i);
        await expect(link).toHaveAttribute('href', urlOf(l, r.page.path));
        await expect(link).toHaveAttribute('lang', l.hreflang);
        await expect(link).toHaveAttribute('hreflang', l.hreflang);
        await expect(link).toHaveText(l.label);
        // accessible name: visible label + language name (P0-05=A, AC-06 decision A, WCAG 2.5.3)
        await expect(link).toHaveAccessibleName(`${l.label} — ${l.name}`);
        await expect(page.getByRole('link', { name: l.a11yName, exact: true })).toHaveCount(1);
        if (l === r.lang) await expect(link).toHaveAttribute('aria-current', 'page');
        else await expect(link).not.toHaveAttribute('aria-current');
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'horizontal overflow px').toBeLessThanOrEqual(0);
      await page.screenshot({ path: info.outputPath(`${slug(r)}.png`), fullPage: true });

      // Keyboard: Tab reaches the next language link with a visible focus ring, Enter opens the equivalent page.
      const target = LANGS[(LANGS.indexOf(r.lang) + 1) % LANGS.length];
      const next = find(target, r.page.path);
      await page.evaluate(() => { window.__spa = 1; });
      let focused = false;
      for (let i = 0; i < 20 && !focused; i++) {
        await page.keyboard.press('Tab');
        focused = await page.evaluate((h) => document.activeElement?.getAttribute('hreflang') === h, target.hreflang);
      }
      expect(focused, `Tab reaches ${target.label}`).toBe(true);
      const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
      expect(outline, 'visible focus').not.toBe('none');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(next.url);
      await expect(page.locator('main h1')).toHaveText(h1Of(next));
      expect(await page.evaluate(() => window.__spa), 'SPA navigation, no full reload').toBe(1);
      await expectHead(page, next);

      await page.reload();
      await expect(page).toHaveURL(next.url);
      await expect(page.locator('main h1')).toHaveText(h1Of(next));
      await expectHead(page, next);

      await page.goBack();
      await expect(page).toHaveURL(r.url);
      await expect(page.locator('main h1')).toHaveText(h1Of(r));
      await expectHead(page, r);
      await page.goForward();
      await expect(page).toHaveURL(next.url);
      await expect(page.locator('main h1')).toHaveText(h1Of(next));
      expect(errors).toEqual([]);
    });
  }

  test('AC-05/08 head and language across SPA navigation', async ({ page }) => {
    const errors = await instrument(page);
    await page.goto('/kk/projects', { waitUntil: 'load' });
    await hydrated(page);
    await page.evaluate(() => { window.__spa = 1; });
    await expectHead(page, find(KK, '/projects'));

    await langLinks(page).nth(2).click(); // ENG
    await expect(page).toHaveURL('/en/projects');
    await expectHead(page, find(EN, '/projects'));

    await page.locator('header a', { hasText: 'OpenGov.kz' }).click(); // logo keeps the language
    await expect(page).toHaveURL('/en');
    await expectHead(page, find(EN, '/'));

    // #44 Phase 1 (F-06 removed): every menu item is a language URL, the language stays in the URL.
    for (const path of ['/open-government', '/tools', '/community', '/about']) {
      await page.locator(`header nav a[href="${urlOf(EN, path)}"]`).click();
      await expect(page).toHaveURL(urlOf(EN, path));
      await expect(page.locator('main h1')).toHaveText(h1Of(find(EN, path)));
      await expectHead(page, find(EN, path)); // no duplicates or stale tags of the previous page (AC-08)
    }

    await page.locator('header nav a[href="/en/tools"]').click();
    await page.locator('main a[href="/en/tools/legal-acts"]').first().click(); // catalog card keeps /en
    await expect(page).toHaveURL('/en/tools/legal-acts');
    await expectHead(page, find(EN, '/tools/legal-acts'));

    await page.locator('main a[href="/en/tools"]').first().click(); // breadcrumb / «All tools» keep /en
    await expect(page).toHaveURL('/en/tools');
    await expectHead(page, find(EN, '/tools'));

    await langLinks(page).nth(0).click();
    await expect(page).toHaveURL('/tools');
    await expectHead(page, find(RU, '/tools'));
    expect(await page.evaluate(() => window.__spa), 'the whole walk is SPA navigation').toBe(1);
    expect(errors).toEqual([]);
  });

  test('AC-14 language is not stored in cookies or Web Storage', async ({ page, context }) => {
    await page.goto('/', { waitUntil: 'load' });
    await langLinks(page).nth(1).click();
    await expect(page).toHaveURL('/kk');
    await page.locator('header nav a[href="/kk/about"]').click();
    await expect(page).toHaveURL('/kk/about');
    const storage = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
    expect(storage, 'no localStorage / sessionStorage').toEqual({ local: {}, session: {} });
    const cookies = (await context.cookies()).filter((c) => !c.name.startsWith('_vercel')); // Preview access cookie only
    expect(cookies, 'no app cookies').toEqual([]);
  });
});

// AC-12 visual compatibility (D-2=A): the same full-page screenshot on the baseline Staging (RU URL + header button,
// before #44) and on the language URL. The header differs only by button vs link markup, styled the same.
test.describe('@d3-visual #44 visual comparison', () => {
  for (const r of PRERENDERED) {
    test(`visual ${r.url}`, async ({ page }) => {
      if (BASELINE) {
        await page.goto(r.page.path, { waitUntil: 'load' });
        if (r.lang.key !== 'ru') await page.locator('header').getByRole('button', { name: r.lang.label, exact: true }).click();
      } else {
        await page.goto(r.url, { waitUntil: 'load' });
      }
      await expect(page.locator('main h1')).toHaveText(h1Of(r));
      await page.evaluate(() => document.fonts.ready);
      await loadImages(page);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${slug(r)}.png`, { fullPage: true, animations: 'disabled' });
    });
  }
});
