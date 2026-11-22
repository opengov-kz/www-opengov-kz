// Issue #42: Hero A2L-S panorama on /community and /about (Q-OGK-HC-V2-DEC-01=A, Q-INT-01/02=A).
// AC-INT-01…05: H1 | lead row 7fr/5fr above the whole 2:1 scene, 960px cap aligned with the H1 at >=1009px,
// V2-P spacing per range, mobile full-bleed at <=560px, srcset/sizes, Approved H1, no overflow, RU/KK/EN.
import { expect, test } from '@playwright/test';
import { APPROVED } from './approved-copy.js';
import { LOCALES, note, overflow, setLocale } from './helpers.js';

const WIDTHS = [320, 390, 560, 561, 800, 801, 1008, 1009, 1024, 1025, 1440];
const PAGES = { '/community': 'hero-community', '/about': 'hero-about' };
const PANORAMA_SIZES = '(max-width: 560px) 100vw, (max-width: 1008px) calc(100vw - 48px), 960px';
const desktopOnly = (testInfo) => test.skip(testInfo.project.name !== 'desktop-1440', 'viewport matrix runs once, in desktop project');
// Viewport heights of the Hero v2 evidence: 900 at >=1024, 1024 at 561–1023, 844 at <=560.
const heightFor = (w) => (w >= 1024 ? 900 : w > 560 ? 1024 : 844);

// Expected A2L-S state per range (reference: Issue #33 prototype-delta/*/index-a2ls.html).
function expected(width) {
  const content = Math.min(width, 1160) - (width <= 560 ? 32 : 48);
  if (width <= 560) return { pad: [40, 48], gap: 32, cols: 1, lead: 17, radius: 0, file: 'mobile', imgW: width, imgX: 0 };
  if (width <= 800) return { pad: [40, 48], gap: 32, cols: 1, lead: 18, radius: 20, file: 'desktop', imgW: content };
  if (width <= 1008) return { pad: [64, 72], gap: 44, cols: 2, lead: 18, radius: 20, file: 'desktop', imgW: content };
  return { pad: [40, 72], gap: 24, cols: 2, lead: 18, radius: 20, file: 'desktop', imgW: 960 };
}

async function heroMetrics(page) {
  const img = page.locator('main > div').first().locator('img');
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveJSProperty('complete', true);
  await page.evaluate(() => window.scrollTo(0, 0));
  return page.evaluate(() => {
    const hero = document.querySelector('main > div');
    const box = (el) => el.getBoundingClientRect();
    const h1 = hero.querySelector('h1');
    const intro = h1.parentElement;
    const img = hero.querySelector('img');
    const leads = [...intro.querySelectorAll('p')];
    const hs = getComputedStyle(hero);
    return {
      padTop: parseFloat(hs.paddingTop), padBottom: parseFloat(hs.paddingBottom),
      cols: getComputedStyle(intro).gridTemplateColumns.split(' ').map(parseFloat),
      h1: box(h1).toJSON(), intro: box(intro).toJSON(), img: box(img).toJSON(),
      leadSize: leads.map((p) => parseFloat(getComputedStyle(p).fontSize)),
      leadBoxes: leads.map((p) => box(p).toJSON()),
      radius: parseFloat(getComputedStyle(img).borderTopLeftRadius),
      fit: getComputedStyle(img).objectFit, src: img.currentSrc, nw: img.naturalWidth, nh: img.naturalHeight,
      sizes: img.getAttribute('sizes'), sourceSizes: hero.querySelector('source')?.getAttribute('sizes'),
      alt: img.getAttribute('alt'), attrW: img.getAttribute('width'), attrH: img.getAttribute('height'),
      h1Text: h1.textContent, innerHeight,
      afterH1: Boolean(h1.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING),
    };
  });
}

test.describe('@a2ls #42', () => {
  for (const [route, file] of Object.entries(PAGES)) {
    test(`AC-INT-01…05 ${route}: A2L-S geometry on ${WIDTHS.join('/')} × RU/KK/EN`, async ({ page }, testInfo) => {
      desktopOnly(testInfo);
      test.setTimeout(300_000);
      for (const width of WIDTHS) {
        for (const locale of LOCALES) {
          await page.setViewportSize({ width, height: heightFor(width) });
          await page.goto(route, { waitUntil: 'load' });
          await setLocale(page, locale);
          const label = `${route} ${locale.key} ${width}`;
          const e = expected(width);
          const m = await heroMetrics(page);
          // AC-INT-05: Approved H1, one H1, no horizontal overflow, image after the text and not over it.
          expect.soft(m.h1Text, `${label}: Approved H1`).toBe(APPROVED[route][locale.key].h1);
          await expect.soft(page.locator('main h1'), `${label}: one H1`).toHaveCount(1);
          expect.soft((await overflow(page)).scrollWidth, `${label}: horizontal overflow`).toBeLessThanOrEqual(width);
          expect.soft(m.afterH1, `${label}: image after H1 in DOM`).toBe(true);
          expect.soft(m.img.top, `${label}: image below the H1/lead row`).toBeGreaterThanOrEqual(m.intro.bottom);
          // AC-INT-03: composition and spacing of the range.
          expect.soft(m.cols.length, `${label}: intro columns`).toBe(e.cols);
          if (e.cols === 2) expect.soft(Math.abs(m.cols[0] / m.cols[1] - 7 / 5), `${label}: 7fr/5fr`).toBeLessThan(0.01);
          expect.soft(m.leadSize, `${label}: lead font-size`).toEqual(m.leadSize.map(() => e.lead));
          expect.soft([m.padTop, m.padBottom], `${label}: Hero padding`).toEqual(e.pad);
          expect.soft(Math.abs(m.img.top - m.intro.bottom - e.gap), `${label}: gap to panorama ${e.gap}px`).toBeLessThanOrEqual(0.5);
          expect.soft(m.radius, `${label}: border radius`).toBe(e.radius);
          // AC-INT-01: width and left edge (= H1, or the viewport edge when full-bleed).
          expect.soft(Math.abs(m.img.width - e.imgW), `${label}: panorama width ${e.imgW}`).toBeLessThanOrEqual(0.5);
          expect.soft(Math.abs(m.img.left - (e.imgX ?? m.h1.left)), `${label}: panorama left edge`).toBeLessThanOrEqual(0.5);
          // AC-INT-02: native ratio, no crop.
          expect.soft(m.fit, `${label}: no object-fit crop`).toBe('fill');
          expect.soft(Math.abs(m.img.width / m.img.height - m.nw / m.nh), `${label}: rendered ratio = natural`).toBeLessThan(0.01);
          // AC-INT-04 and FR-INT-07: file, sizes, decorative, reserved space.
          expect.soft(m.src, `${label}: currentSrc`).toContain(`/illustrations/${file}-${e.file}-`);
          expect.soft(m.sizes, `${label}: img sizes`).toBe(PANORAMA_SIZES);
          expect.soft(m.sourceSizes, `${label}: mobile source sizes`).toBe(PANORAMA_SIZES);
          expect.soft(m.alt, `${label}: decorative alt`).toBe('');
          expect.soft(m.attrW && m.attrH, `${label}: width/height attributes`).toBeTruthy();
          const fold = Math.max(0, Math.min(m.img.bottom, m.innerHeight) - Math.max(m.img.top, 0)) / m.img.height;
          note('a2ls', JSON.stringify({ route, locale: locale.key, width, height: m.innerHeight, file: m.src.split('/').pop(),
            img: `${Math.round(m.img.width)}x${Math.round(m.img.height)}`, left: m.img.left, h1Left: m.h1.left,
            gap: +(m.img.top - m.intro.bottom).toFixed(2), pad: [m.padTop, m.padBottom], fold: +(fold * 100).toFixed(1) }));
        }
      }
    });
  }

  test('AC-INT-01 @smoke /about RU 1440: panorama 960px, left edge = H1', async ({ page }, testInfo) => {
    desktopOnly(testInfo);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/about', { waitUntil: 'load' });
    const m = await heroMetrics(page);
    expect(Math.abs(m.img.width - 960)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(m.img.left - m.h1.left)).toBeLessThanOrEqual(0.5);
    expect(m.cols.length).toBe(2);
  });
});
