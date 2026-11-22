// Issue #38: local Human Civic prototype. HC-IMP-01…06 browser checks: opt-in hero images on /, /community, /about,
// join in the home `participate` section, natural aspect ratio without crop, 800px single column, 560px mobile
// composition, decorative alt, no horizontal overflow, H1 + primary CTA in the 390×844 first screen.
import { expect, test } from '@playwright/test';
import { LOCALES, mainPageText, note, overflow, setLocale } from './helpers.js';

const WIDTHS = [1440, 1024, 801, 800, 799, 768, 561, 560, 559, 390, 375, 320];
const TARGETS = { '/': 'hero-home-desktop', '/community': 'hero-community', '/about': 'hero-about' };
const OTHER_HERO_ROUTES = ['/open-government', '/tools', '/tools/open-data', '/tools/open-budgets', '/tools/legal-acts'];
const desktopOnly = (testInfo) => test.skip(testInfo.project.name !== 'desktop-1440', 'viewport matrix runs once, in desktop project');

// Expected composition: community/about switch to their own mobile files at <=560px (F-06=B); home has one.
const expectedFile = (route, width) =>
  route === '/' ? 'hero-home-desktop' : `${TARGETS[route]}-${width <= 560 ? 'mobile' : 'desktop'}`;

async function measure(img) {
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveJSProperty('complete', true);
  return img.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      src: el.currentSrc, nw: el.naturalWidth, nh: el.naturalHeight, x: r.left, right: r.right, w: r.width, h: r.height,
      top: r.top + scrollY, fit: cs.objectFit, alt: el.getAttribute('alt'), attrW: el.getAttribute('width'),
      attrH: el.getAttribute('height'),
    };
  });
}

function expectUncropped(m, width, label) {
  expect.soft(m.nw, `${label}: image decoded`).toBeGreaterThan(0);
  expect.soft(m.fit, `${label}: no object-fit crop`).toBe('fill');
  expect.soft(Math.abs(m.w / m.h - m.nw / m.nh), `${label}: rendered ratio = natural ratio`).toBeLessThan(0.01);
  expect.soft(m.x, `${label}: left edge inside viewport`).toBeGreaterThanOrEqual(0);
  expect.soft(m.right, `${label}: right edge inside viewport`).toBeLessThanOrEqual(width);
}

test.describe('@human-civic #38', () => {
  for (const [route] of Object.entries(TARGETS)) {
    test(`HC-IMP-02/03/04 ${route}: source, ratio, layout, overflow on ${WIDTHS.join('/')} × RU/KK/EN`, async ({ page }, testInfo) => {
      desktopOnly(testInfo);
      test.setTimeout(300_000);
      for (const width of WIDTHS) {
        for (const locale of LOCALES) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(route, { waitUntil: 'load' });
          await setLocale(page, locale);
          const label = `${route} ${locale.key} ${width}`;
          const hero = page.locator('main > div').first();
          const img = hero.locator('img');
          await expect(img, `${label}: one hero illustration`).toHaveCount(1);
          const m = await measure(img);
          expect.soft(m.src, `${label}: currentSrc composition`).toContain(`/illustrations/${expectedFile(route, width)}-`);
          expectUncropped(m, width, label);
          expect.soft(m.alt, `${label}: decorative alt`).toBe('');
          expect.soft(m.attrW && m.attrH, `${label}: width/height attributes reserve space`).toBeTruthy();
          const h1 = await page.locator('main h1').boundingBox();
          const lh = await page.locator('main h1').evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
          const lines = Math.round(h1.height / lh);
          const cols = await hero.locator(':scope > div').evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').map(parseFloat));
          if (route !== '/') {
            // #42 (Q-OGK-HC-V2-DEC-01=A, Q-INT-01=A): /community and /about replace grid B with the A2L-S panorama
            // on every width; the exact A2L-S geometry is checked in a2ls.spec.js. Grid B below stays for / only.
            expect.soft(m.top, `${label}: panorama after the H1/lead row`).toBeGreaterThan(h1.y + h1.height);
          } else if (width > 800) {
            // Q-OGK-HC-GRID-38=A: grid B 1.15fr / 0.85fr (minus the 30px gap) on the home Human Civic hero.
            expect.soft(cols.length, `${label}: two columns`).toBe(2);
            expect.soft(Math.abs(cols[0] / cols[1] - 1.15 / 0.85), `${label}: grid B ratio`).toBeLessThan(0.01);
            expect.soft(m.x, `${label}: image in the second column`).toBeGreaterThanOrEqual(h1.x + 1);
          } else {
            expect.soft(cols.length, `${label}: one column at <=800px`).toBe(1);
            expect.soft(m.top, `${label}: one column, image after the text`).toBeGreaterThan(h1.y + h1.height);
          }
          const o = await overflow(page);
          expect.soft(o.scrollWidth, `${label}: horizontal overflow`).toBeLessThanOrEqual(width);
          note('measure', JSON.stringify({ route, locale: locale.key, width, file: m.src.split('/').pop(),
            img: `${Math.round(m.w)}x${Math.round(m.h)}`, natural: `${m.nw}x${m.nh}`, h1Lines: lines,
            h1Width: Math.round(h1.width), scrollWidth: o.scrollWidth }));
        }
      }
    });
  }

  test('HC-IMP-06 home participate: Approved copy, join illustration, no clipping on all widths × RU/KK/EN', async ({ page }, testInfo) => {
    desktopOnly(testInfo);
    test.setTimeout(300_000);
    for (const width of WIDTHS) {
      for (const locale of LOCALES) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/', { waitUntil: 'load' });
        await setLocale(page, locale);
        const copy = mainPageText(locale.key).participate;
        const section = page.locator('main section').filter({ has: page.getByRole('heading', { level: 2, name: copy.title, exact: true }) });
        await expect(section).toHaveCount(1);
        await expect.soft(section.locator('p').nth(0)).toHaveText(copy.p1);
        await expect.soft(section.locator('p').nth(1)).toHaveText(copy.p2);
        await expect.soft(section.locator('a[href="/community"]')).toHaveText(copy.cta);
        const img = section.locator('img');
        await expect(img).toHaveCount(1);
        const label = `participate ${locale.key} ${width}`;
        const m = await measure(img);
        expect.soft(m.src, `${label}: join composition`).toContain('/illustrations/join-desktop-');
        const cols = await img.evaluate((el) => getComputedStyle(el.closest('picture').parentElement).gridTemplateColumns.split(' ').map(parseFloat));
        if (width > 800) expect.soft(cols[0], `${label}: join keeps 1fr / 1fr`).toBeCloseTo(cols[1], 0);
        else expect.soft(cols.length, `${label}: join one column at <=800px`).toBe(1);
        expectUncropped(m, width, label);
        expect.soft(m.alt, `${label}: decorative alt`).toBe('');
        note('join', JSON.stringify({ locale: locale.key, width, file: m.src.split('/').pop(), img: `${Math.round(m.w)}x${Math.round(m.h)}` }));
      }
    }
  });

  test('HC-IMP-05 390×844: H1 and primary CTA in the first screen; 320×568 fold recorded', async ({ page }, testInfo) => {
    desktopOnly(testInfo);
    for (const locale of LOCALES) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/', { waitUntil: 'load' });
      await setLocale(page, locale);
      const cta = page.locator('main > div').first().locator('a[href="/open-government"]');
      for (const [name, el] of [['h1', page.locator('main h1')], ['primary CTA', cta]]) {
        const b = await el.boundingBox();
        expect.soft(b.y + b.height, `390×844 ${locale.key}: ${name} fully in the first screen`).toBeLessThanOrEqual(844);
      }
      for (const route of Object.keys(TARGETS)) {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        const h1 = await page.locator('main h1').boundingBox();
        const img = await page.locator('main > div').first().locator('img').boundingBox();
        note('fold-320x568', JSON.stringify({ route, locale: locale.key, h1Bottom: Math.round(h1.y + h1.height), imgTop: Math.round(img.y) }));
      }
    }
  });

  test('HC-IMP-01/04 five other Hero routes keep the decorative art and get no illustration', async ({ page }) => {
    for (const route of OTHER_HERO_ROUTES) {
      await page.goto(route, { waitUntil: 'load' });
      await expect.soft(page.locator('main img[src*="/illustrations/"], main source'), `${route}: no illustration`).toHaveCount(0);
      await expect.soft(page.locator('main > div').first().locator('[aria-hidden="true"]'), `${route}: art kept`).toHaveCount(1);
    }
  });

  test('HC-IMP-04 illustrations are decorative, absent from the accessibility tree, after H1 in DOM order', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await expect(page.getByRole('img')).toHaveCount(0);
    const order = await page.evaluate(() => {
      const h1 = document.querySelector('main h1');
      return [...document.querySelectorAll('main img')].map((img) => Boolean(h1.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING));
    });
    expect(order).toEqual([true, true]);
    await expect(page.locator('main img').first()).toHaveAttribute('fetchpriority', 'high');
    await expect(page.locator('main img').nth(1)).toHaveAttribute('loading', 'lazy');
  });
});
