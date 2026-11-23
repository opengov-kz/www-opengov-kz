// Issue #26: design v1.2 on the eight MVP routes. AC-IMP-01…05 evidence: approved copy and SEO per locale,
// responsive two-row header and overflow on 6 widths with full-page screenshots, forbidden content, links,
// keyboard focus, /about vs removed /aboutMe (#28).
import { expect, test } from '@playwright/test';
import { APPROVED, DISCLAIMER } from './approved-copy.js';
import { HEADER_LINKS, LOCALES, MVP_ROUTES, UNKNOWN_ROUTE, isServerNotFound, note, overflow, setLocale } from './helpers.js';

const WIDTHS = [320, 375, 390, 768, 1024, 1440];
const desktopOnly = (testInfo) => test.skip(testInfo.project.name !== 'desktop-1440', 'viewport matrix runs once, in desktop project');

test.describe('@redesign', () => {
  for (const route of MVP_ROUTES) {
    for (const locale of LOCALES) {
      test(`AC-IMP-03 approved H1, title, description ${route} [${locale.key}]`, async ({ page }) => {
        const copy = APPROVED[route][locale.key];
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('main h1')).toHaveText(copy.h1);
        await expect(page).toHaveTitle(copy.title);
        const description = page.locator('meta[name="description"]');
        await expect(description, 'exactly one meta description').toHaveCount(1);
        await expect(description).toHaveAttribute('content', copy.description);
        await expect(page.locator('footer')).toContainText(DISCLAIMER[locale.key]);
      });

      test(`AC-IMP-03 no forbidden content ${route} [${locale.key}]`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        const text = await page.locator('body').innerText();
        const head = await page.evaluate(() => document.title + ' ' + [...document.querySelectorAll('meta')].map((m) => m.content).join(' '));
        for (const bad of ['Концепт', 'info@opengov.kz', 'Gate', 'не для отображения', 'notion.', 'http://OpenGov.kz']) {
          expect.soft(text + head, `"${bad}" must not be shown`).not.toContain(bad);
        }
        await expect(page.locator('a[href^="mailto:"]'), 'email CTA disabled until receipt is verified (ED-03)').toHaveCount(0);
        await expect(page.locator('form, input'), 'no inert subscription form').toHaveCount(0);
        await expect(page.locator('a[href=""], a:not([href])'), 'no empty links').toHaveCount(0);
      });
    }

    test(`AC-IMP-02 header and overflow on ${WIDTHS.join('/')} with screenshots ${route}`, async ({ page }, testInfo) => {
      desktopOnly(testInfo);
      test.setTimeout(120_000);
      await page.goto(route, { waitUntil: 'load' });
      for (const locale of LOCALES) {
        await setLocale(page, locale);
        for (const width of WIDTHS) {
          await page.setViewportSize({ width, height: 900 });
          const o = await overflow(page);
          note('overflow', `${route} ${locale.key} ${width}: scrollWidth=${o.scrollWidth}`);
          expect.soft(o.scrollWidth, `${locale.key} ${width}px horizontal overflow`).toBeLessThanOrEqual(width);
          for (const href of HEADER_LINKS) {
            await expect.soft(page.locator(`header nav a[href="${href}"]`), `${locale.key} ${width}px nav ${href} visible`).toBeVisible();
          }
          const logo = await page.locator('header a[href="/"]').boundingBox();
          const nav = await page.locator('header nav').boundingBox();
          if (width <= 390) {
            expect.soft(nav.y, `${locale.key} ${width}px: navigation is the second header row`).toBeGreaterThanOrEqual(logo.y + logo.height);
          }
          const name = `${route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')}-${locale.key}-${width}.png`;
          await page.screenshot({ path: testInfo.outputPath(name), fullPage: true });
        }
      }
    });
  }

  test('AC-IMP-02 header nav marks only the current page with aria-current', async ({ page }) => {
    for (const href of HEADER_LINKS) {
      await page.goto(href, { waitUntil: 'load' });
      await expect(page.locator('header nav a[aria-current="page"]')).toHaveCount(1);
      await expect(page.locator('header nav a[aria-current="page"]')).toHaveAttribute('href', href);
    }
    await page.goto('/tools/open-data', { waitUntil: 'load' });
    await expect(page.locator('header nav a[aria-current="page"]')).toHaveCount(0);
  });

  // Issue #40 AC-01 / BA40-01: on every route each header nav item has exactly the expected aria-current
  // ("page" on its own page, "true" for Tools on /tools/*, none otherwise), and only a marked item is highlighted.
  const BLUE = 'rgb(36, 99, 207)'; // --og-blue
  const NAVY = 'rgb(20, 44, 70)'; // --og-navy
  const expectedCurrent = (route, href) =>
    route === href ? 'page' : href === '/tools' && route.startsWith('/tools/') ? 'true' : null;
  for (const locale of LOCALES) {
    test(`#40 AC-01 header nav aria-current and highlight on every route [${locale.key}]`, async ({ page }, testInfo) => {
      for (const route of [...MVP_ROUTES, '/projects', UNKNOWN_ROUTE]) {
        // F-40-PM-01: on a deployment an unknown path is the static HTTP 404 page (no React, no header), so it can
        // carry no aria-current; locally it is the client NotFound with the header, checked like any other route.
        if (isServerNotFound(route)) {
          const response = await page.goto(route, { waitUntil: 'load' });
          expect(response.status(), `${route} server HTTP status`).toBe(404);
          await expect(page.locator('#root'), `${route} React must not render`).toHaveCount(0);
          await expect(page.locator('header'), `${route} no header on the static 404`).toHaveCount(0);
          await expect(page.locator('[aria-current]'), `${route} no aria-current on the static 404`).toHaveCount(0);
          note('F-40-PM-01', `${route}: HTTP ${response.status()}, static 404 without header or aria-current`);
          continue;
        }
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        await page.mouse.move(0, 0); // no hover colour on nav links
        for (const href of HEADER_LINKS) {
          const link = page.locator(`header nav a[href="${href}"]`);
          const want = expectedCurrent(route, href);
          const where = `${route} → ${href}`;
          if (want) await expect(link, where).toHaveAttribute('aria-current', want);
          else expect(await link.getAttribute('aria-current'), where).toBeNull();
          await expect(link, where).toHaveCSS('color', want ? BLUE : NAVY);
          await expect(link, where).toHaveCSS('border-bottom-color', want ? BLUE : 'rgba(0, 0, 0, 0)');
        }
        await expect(page.locator('header [aria-current]'), route).toHaveCount(HEADER_LINKS.some((h) => expectedCurrent(route, h)) ? 1 : 0);
        if (locale.key === 'ru' && ['/tools', '/tools/open-data', '/about', '/'].includes(route)) {
          const name = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');
          await page.locator('header').screenshot({ path: testInfo.outputPath(`header-${name}-${testInfo.project.name}.png`) });
        }
      }
    });
  }

  // Issue #40 AC-03: favicon from the existing ◩ mark, linked from the SPA shell and the static 404 page.
  test('#40 AC-03 favicon.svg and favicon.ico are linked and served', async ({ page, request }) => {
    for (const [path, type] of [['/favicon.svg', 'image/svg+xml'], ['/favicon.ico', 'image/']]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()['content-type'] ?? '', path).toContain(type);
      note('favicon', `${path} ${res.status()} ${res.headers()['content-type']} ${(await res.body()).length} B`);
    }
    await page.goto('/', { waitUntil: 'load' });
    await expect(page.locator('head link[rel="icon"][href="/favicon.svg"][type="image/svg+xml"]')).toHaveCount(1);
    await expect(page.locator('head link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1);
    const static404 = await (await request.get('/404.html')).text();
    expect(static404).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml" />');
    expect(static404).toContain('<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />');
  });

  test('AC-IMP-02 keyboard: every focus stop on the eight routes shows a focus indicator', async ({ page }, testInfo) => {
    desktopOnly(testInfo);
    const missing = [];
    for (const route of MVP_ROUTES) {
      await page.goto(route, { waitUntil: 'load' });
      const count = await page.locator('a[href], button').count();
      for (let i = 0; i < count; i++) {
        await page.keyboard.press('Tab');
        const f = await page.evaluate(() => {
          const el = document.activeElement;
          const cs = getComputedStyle(el);
          return {
            id: `${el.tagName} ${el.getAttribute('href') ?? el.textContent.trim()}`,
            ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none',
          };
        });
        if (!f.ring) missing.push(`${route}: ${f.id}`);
      }
    }
    expect(missing, 'focused elements without visible indicator').toEqual([]);
  });

  test('AC-IMP-01 CTA and internal links of the eight routes resolve to MVP routes', async ({ page }) => {
    const bad = [];
    for (const route of MVP_ROUTES) {
      await page.goto(route, { waitUntil: 'load' });
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
      for (const h of hrefs) if (!MVP_ROUTES.includes(h)) bad.push(`${route} -> ${h}`);
    }
    expect(bad, 'internal links outside the eight approved routes').toEqual([]);
  });

  test('AC-IMP-04 official and international outbound links', async ({ page }) => {
    await page.goto('/open-government', { waitUntil: 'load' });
    for (const href of ['https://www.opengovpartnership.org/', 'https://www.oecd.org/', 'https://sdgs.un.org/goals/goal16']) {
      await expect(page.locator(`main a[href="${href}"]`)).toHaveAttribute('rel', 'noopener');
    }
    for (const [route, url] of [['/tools/open-data', 'https://data.egov.kz/'], ['/tools/open-budgets', 'https://budget.egov.kz/'],
      ['/tools/legal-acts', 'https://legalacts.egov.kz/']]) {
      await page.goto(route, { waitUntil: 'load' });
      await expect(page.locator(`main a[href="${url}"]`)).toHaveAccessibleName(`${url} (внешний сайт)`); // ↗ is aria-hidden
    }
  });

  // #28: legacy /aboutMe is removed, so it must render the client NotFound, not the /about page.
  test('AC-IMP-05 /about is the approved page and removed /aboutMe is NotFound', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'load' });
    await expect(page.locator('main h1')).toHaveText(APPROVED['/about'].ru.h1);
    await page.goto('/aboutMe', { waitUntil: 'load' });
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);
    await expect(page.getByText(APPROVED['/about'].ru.h1)).toHaveCount(0);
  });

  test('AC-IMP-02 language switch updates H1, title and lang without reload', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'load' });
    for (const locale of [LOCALES[1], LOCALES[2], LOCALES[0]]) {
      await setLocale(page, locale);
      await expect(page.locator('main h1')).toHaveText(APPROVED['/community'][locale.key].h1);
      await expect(page).toHaveTitle(APPROVED['/community'][locale.key].title);
      await expect(page.locator('header button[aria-pressed="true"]')).toHaveText(locale.button);
    }
  });
});
