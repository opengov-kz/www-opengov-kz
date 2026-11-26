/* global process */
import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { LANGS, PRERENDERED, SITE, urlOf } from '../../src/routing.js';

// #44 Phase 0 spike: the nine language URLs of src/routing.js (P0-AC-01…09). HTTP 200/308/404 is checked on the
// Vercel Preview with the HTTP matrix, not here (local vite preview only imitates vercel.json).
// D3_BASELINE=1 (with PW_BASE_URL of the baseline Staging) runs only the visual test and writes the reference
// screenshots: the baseline has no /kk or /en URLs, so it opens the RU URL and switches with the header button.
const BASELINE = process.env.D3_BASELINE === '1';

const locale = (lang, ns) => JSON.parse(readFileSync(new URL(`../../src/locales/${lang.key}/${ns}.json`, import.meta.url), 'utf8'));
const pick = (obj, key) => key.split('.').reduce((o, k) => o[k], obj);
const H1 = { '/': ['mainPage', 'hero.title'], '/tools/open-data': ['toolsPage', 'portals.openData.title'], '/projects': ['projectsPage', 'hero.title'] };
const h1Of = (r) => pick(locale(r.lang, H1[r.page.path][0]), H1[r.page.path][1]);
const seoOf = (r, key) => pick(locale(r.lang, r.page.ns), `${r.page.seo}${key}`);
const find = (lang, path) => PRERENDERED.find((r) => r.lang === lang && r.page.path === path);
const slug = (r) => `${r.lang.hreflang}${r.page.path === '/' ? '-home' : r.page.path.replaceAll('/', '-')}`;

// Head state that P0-AC-05/06 cover, read from the live DOM.
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
    expect(state.alternates, 'reciprocal hreflang').toEqual([
      ...LANGS.map((l) => `${l.hreflang} ${SITE}${urlOf(l, r.page.path)}`),
      `x-default ${SITE}${urlOf(LANGS[0], r.page.path)}`,
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
    new MutationObserver(() => {
      const text = document.querySelector('h1')?.textContent;
      if (text && window.__h1.at(-1) !== text) window.__h1.push(text);
    }).observe(document, { subtree: true, childList: true, characterData: true });
  });
  return errors;
}
const hydrated = (page) => expect.poll(() => page.evaluate(() =>
  Object.keys(document.getElementById('root') ?? {}).some((k) => k.startsWith('__reactContainer'))), { message: 'React root attached' }).toBe(true);
const langLinks = (page) => page.locator('header ul a[hreflang]');

test.describe('@d3 #44 Phase 0 language URLs', () => {
  test.skip(BASELINE, 'D3_BASELINE runs only the visual reference');

  for (const r of PRERENDERED) {
    test(`P0-AC-01/02/05/06 static HTML without JS ${r.url}`, async ({ browser, request }, info) => {
      const res = await request.get(r.url, { maxRedirects: 0 });
      expect(res.status(), 'HTTP status').toBe(200);
      const raw = await res.text();
      expect(raw, 'raw HTML has the H1').toContain(h1Of(r));
      expect(raw).toContain(`<html lang="${r.lang.hreflang}">`);

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

    test(`P0-AC-03/04 first render language and hydration ${r.url}`, async ({ page }) => {
      const errors = await instrument(page);
      await page.goto(r.url, { waitUntil: 'load' });
      await hydrated(page);
      await page.waitForTimeout(300); // late hydration recoverable errors are reported asynchronously
      expect(await page.evaluate(() => window.__h1), 'H1 texts from the first byte: no other language').toEqual([h1Of(r)]);
      expect(errors, 'console/page errors and hydration warnings').toEqual([]);
      await expectHead(page, r);
    });

    test(`P0-AC-08/09 language links, keyboard, overflow ${r.url}`, async ({ page }, info) => {
      const errors = await instrument(page);
      await page.goto(r.url, { waitUntil: 'load' });
      await hydrated(page);

      const links = langLinks(page);
      await expect(links).toHaveCount(3);
      for (const [i, l] of LANGS.entries()) {
        const link = links.nth(i);
        await expect(link).toHaveAttribute('href', urlOf(l, r.page.path));
        await expect(link).toHaveAttribute('lang', l.hreflang);
        await expect(link).toHaveAttribute('hreflang', l.hreflang);
        await expect(link).toHaveText(l.label);
        await expect(page.getByRole('link', { name: l.name, exact: true })).toHaveCount(1);
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

  test('P0-AC-05/06/08 head and language across SPA navigation', async ({ page }) => {
    const errors = await instrument(page);
    const ru = LANGS[0], kk = LANGS[1], en = LANGS[2];
    await page.goto('/kk/projects', { waitUntil: 'load' });
    await hydrated(page);
    await expectHead(page, find(kk, '/projects'));

    await langLinks(page).nth(2).click(); // ENG
    await expect(page).toHaveURL('/en/projects');
    await expectHead(page, find(en, '/projects'));

    await page.locator('header a', { hasText: 'OpenGov.kz' }).click(); // logo keeps the language
    await expect(page).toHaveURL('/en');
    await expectHead(page, find(en, '/'));

    await page.locator('header nav a[href="/tools"]').click(); // RU-only route keeps EN in memory (pre-#44 behaviour)
    await expect(page).toHaveURL('/tools');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(async () => {
      const legacy = await headState(page);
      expect(legacy.canonicals, 'RU-only route: no stale canonical').toEqual([]);
      expect(legacy.alternates, 'RU-only route: no stale hreflang').toEqual([]);
      expect(legacy.robots, 'RU-only route: no stale noindex').toEqual([]);
      expect(legacy.descriptions).toHaveLength(1);
    }).toPass({ timeout: 5000 });

    await page.locator('main a[href="/en/tools/open-data"]').first().click(); // catalog card keeps /en
    await expect(page).toHaveURL('/en/tools/open-data');
    await expectHead(page, find(en, '/tools/open-data'));

    await page.locator('header button', { hasText: 'РУС' }).count().then((n) => expect(n, 'no buttons on language URLs').toBe(0));
    await langLinks(page).nth(0).click();
    await expect(page).toHaveURL('/tools/open-data');
    await expectHead(page, find(ru, '/tools/open-data'));
    expect(errors).toEqual([]);
  });
});

// P0-AC-09 visual compatibility: the same full-page screenshot on the baseline (RU URL + header button) and on the
// spike (language URL). The header differs only by button vs link markup, styled the same.
test.describe('@d3-visual #44 Phase 0 visual comparison', () => {
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
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`${slug(r)}.png`, { fullPage: true, animations: 'disabled' });
    });
  }
});
