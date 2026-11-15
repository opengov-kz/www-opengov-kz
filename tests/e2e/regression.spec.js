// Regression: applicable PW-02…09 across all 12 routes, both viewports and RU/KZ/EN.
// Baseline (current implementation) and target-delta checks are separate tests; known product
// defects stay Failed (BRULE-TEST-05). /projects: no assertions on unpublished content (#14).
import { expect, test } from '@playwright/test';
import {
  HEADER_LINKS, LOCALES, P0_ROUTES, ROUTES, UNKNOWN_ROUTE, burger, expectRendered, headerText, htmlLang, note,
  openMobileMenuIfNeeded, overflow, setLocale, watchErrors,
} from './helpers.js';

const TOOL_PORTALS = {
  '/tools/open-data': 'https://data.egov.kz/',
  '/tools/open-budgets': 'https://budget.egov.kz/',
  '/tools/legal-acts': 'https://legalacts.egov.kz/',
};
const isMobile = (testInfo) => testInfo.project.name.startsWith('mobile');

// Per rendered <a>: full visible label, raw href, page region, a selector unique on the page and,
// for React Router links (data-discover), whether the source <Link> received `to`. The `to` prop
// is read from the parent React fiber (ForwardRef, tag 11): React internals, test-only, no app change.
const auditLinks = (page) => page.locator('a').evaluateAll((as) => as.map((a) => {
  const img = a.querySelector('img[src]');
  const region = a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : a.closest('main') ? 'main' : 'body';
  const href = a.getAttribute('href');
  const base = `${region} ${href === null ? 'a:not([href])' : `a[href="${href.replace(/"/g, '\\"')}"]`}`
    + (img ? `:has(img[src="${img.getAttribute('src')}"])` : '');
  const same = [...document.querySelectorAll(base)];
  let to = 'n/a';
  if (a.hasAttribute('data-discover')) {
    const key = Object.keys(a).find((k) => k.startsWith('__reactFiber$'));
    const owner = key ? a[key].return : null;
    to = owner?.tag === 11 && owner.memoizedProps
      ? (owner.memoizedProps.to == null || owner.memoizedProps.to === '' ? 'missing' : 'set')
      : 'unreadable';
  }
  return {
    href,
    region,
    to,
    selector: same.length > 1 ? `${base} >> nth=${same.indexOf(a)}` : base,
    label: (a.innerText || a.getAttribute('aria-label') || img?.getAttribute('alt') || img?.getAttribute('src') || '')
      .replace(/\s+/g, ' ').trim(),
  };
}));

test.describe('@regression', () => {
  test('PW-02 target delta: header links to approved /tools catalog', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const current = await page.locator('header nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    note('current-header-links', current.join(', '));
    note('target-source', 'Menu item "Инструменты" -> /tools (#8 delta); legacy links in nav vs Q-TS05-02=B and '
      + '"Проекты" vs Q-OGK-PROJECTS-TS-01=A reported for BA, owner: product issue, not #17');
    expect(current, 'approved target link /tools in header navigation').toContain('/tools');
  });

  for (const route of [...ROUTES, UNKNOWN_ROUTE]) {
    for (const locale of LOCALES) {
      test(`PW-03 html lang ${route} [${locale.key}] = ${locale.htmlLang}`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        const actual = await htmlLang(page);
        note('baseline-html-lang', `actual="${actual}"`);
        expect(actual, 'target html lang (Q-OGK-TEST-12=A)').toBe(locale.htmlLang);
      });
    }
  }

  for (const route of ROUTES) {
    test(`PW-04 direct load and refresh ${route}`, async ({ page }) => {
      expect((await page.goto(route, { waitUntil: 'load' })).status()).toBe(200);
      await expectRendered(page);
      expect((await page.reload({ waitUntil: 'load' })).status()).toBe(200);
      await expect(page).toHaveURL(route);
      await expectRendered(page);
    });
  }

  test('PW-05 browser back/forward across header navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    for (const href of ['/aboutMe', '/news']) {
      await openMobileMenuIfNeeded(page);
      await page.locator(`header nav a[href="${href}"]`).click();
      await expect(page).toHaveURL(href);
    }
    await page.goBack();
    await expect(page).toHaveURL('/aboutMe');
    await page.goBack();
    await expect(page).toHaveURL('/');
    await expectRendered(page);
    await page.goForward();
    await expect(page).toHaveURL('/aboutMe');
    await expectRendered(page);
  });

  test('PW-05 browser back/forward between /tools and a tool page', async ({ page }) => {
    await page.goto('/tools', { waitUntil: 'load' });
    await page.locator('main a[href="/tools/open-data"]').click();
    await expect(page.locator('main h1')).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL('/tools');
    await expect(page.locator('main a[href="/tools/open-data"]')).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL('/tools/open-data');
  });

  test('PW-06 nested unknown path renders client NotFound', async ({ page }) => {
    await page.goto('/nested/pw-e2e/unknown', { waitUntil: 'load' });
    await expect(page.locator('main a[href="/"]')).toBeVisible();
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(1);
  });

  for (const route of [...ROUTES, UNKNOWN_ROUTE]) {
    for (const locale of LOCALES) {
      test(`PW-07 no horizontal overflow ${route} [${locale.key}]`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'load' });
        await setLocale(page, locale);
        const o = await overflow(page);
        note('overflow', `scrollWidth=${o.scrollWidth}, viewport=${o.viewport}`);
        expect(o.scrollWidth, '0 px tolerance (Q-OGK-TEST-16=A)').toBeLessThanOrEqual(o.viewport);
      });
    }
  }

  // PW-08 link audit (Q-OGK-TEST-13=A, Q-OGK-TEST-30=A). Confirmed missing destinations fail:
  // missing/empty href, unknown internal route, React Router <Link> rendered without `to` (it
  // falls back to the current URL, so in the DOM it looks like a self-link). A link that merely
  // points to the current page is a candidate for BA review, not a failure: no such product rule.
  for (const route of ROUTES) {
    test(`PW-08 rendered links have usable destinations ${route}`, async ({ page }, testInfo) => {
      await page.goto(route, { waitUntil: 'load' });
      const confirmed = [];
      const unclassified = [];
      const candidates = [];
      const external = new Set();
      const headerMarkers = new Set();
      for (const locale of LOCALES) {
        await setLocale(page, locale);
        for (const l of await auditLinks(page)) {
          const where = `route=${route} | locale=${locale.key} | viewport=${testInfo.project.name} | `
            + `selector=${l.selector} | label="${l.label}" | href=${JSON.stringify(l.href)}`;
          if (l.region === 'header' && l.href?.startsWith('/')) headerMarkers.add(l.to);
          const path = l.href?.startsWith('/') ? new URL(l.href, 'http://x').pathname : null;
          if (l.href === null) confirmed.push(`missing href | ${where}`);
          else if (l.href === '') confirmed.push(`empty href | ${where}`);
          else if (l.to === 'missing') confirmed.push(`router Link without "to" (renders current URL) | ${where}`);
          else if (path && !ROUTES.includes(path)) confirmed.push(`unknown internal route | ${where}`);
          else if (path === route && l.region !== 'header' && l.region !== 'footer') {
            (l.to === 'unreadable' ? unclassified : candidates).push(`candidate self-link | ${where}`);
          } else if (/^https?:/.test(l.href)) external.add(l.href);
        }
      }
      for (const c of candidates) note('candidate self-link (BA disposition, not a failure)', c);
      if (external.size) note('external-links (href only, not visited)', [...external].join(', '));
      // Sentinel (F-MR-02): header NavLinks always pass `to`. Anything but 'set' means the React
      // Router marker or fiber props this audit relies on are gone, so `to` checks would be silent.
      expect.soft([...headerMarkers], 'header router-link markers unreadable (test limitation)').toEqual(['set']);
      expect.soft(unclassified, 'self-link whose source <Link> props could not be read (test limitation)').toEqual([]);
      expect(confirmed, 'links without a usable destination (Q-OGK-TEST-13=A)').toEqual([]);
    });
  }

  for (const [route, portal] of Object.entries(TOOL_PORTALS)) {
    test(`PW-08 ${route} links to approved portal ${portal} (href only)`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'load' });
      await expect(page.locator(`main a[href="${portal}"]`)).toHaveCount(1);
      await page.locator('main a[href="/tools"]').click();
      await expect(page).toHaveURL('/tools');
    });
  }

  test('PW-08 homepage hero CTA navigates to /aboutMe (baseline)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await page.locator('a[href="/aboutMe"] button').click();
    await expect(page).toHaveURL('/aboutMe');
    await expectRendered(page);
  });

  test('PW-08 target delta: homepage CTA destinations approved in Q-TS05-08=A', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const hrefs = await page.locator('#root a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    note('target-source', 'Q-TS05-08=A hero CTA -> /open-government, /community, /about; routes not in App.jsx');
    for (const target of ['/open-government', '/community', '/about']) {
      expect.soft(hrefs, `approved CTA target ${target}`).toContain(target);
    }
  });

  test('PW-09 desktop keyboard: header links and language buttons', async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo), 'desktop header layout; mobile menu covered by PW-09 mobile test');
    await page.goto('/', { waitUntil: 'load' });
    const seen = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      seen.push(await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return {
          id: el.getAttribute('href') ?? el.textContent.trim(),
          inHeader: !!el.closest('header'),
          visibleFocus: (cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px') || cs.boxShadow !== 'none',
        };
      }));
    }
    const header = seen.filter((s) => s.inHeader);
    for (const id of [...HEADER_LINKS, 'РУС', 'ҚАЗ', 'ENG']) {
      expect.soft(header.map((s) => s.id), `${id} reachable by Tab`).toContain(id);
    }
    const noRing = [...new Set(header.filter((s) => !s.visibleFocus).map((s) => s.id))];
    expect.soft(noRing, 'header controls without visible focus indicator').toEqual([]);
    expect(new Set(seen.map((s) => s.id)).size, 'focus keeps moving (no trap)').toBeGreaterThan(8);

    await page.locator('header nav a[href="/news"]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/news');
    await page.locator('header').getByRole('button', { name: 'ENG', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('header nav a[href="/"]')).toHaveText(headerText('en').home);
    await page.locator('header').getByRole('button', { name: 'ҚАЗ', exact: true }).focus();
    await page.keyboard.press('Space');
    await expect(page.locator('header nav a[href="/"]')).toHaveText(headerText('kz').home);
  });

  test('PW-09 mobile keyboard: burger menu', async ({ page }, testInfo) => {
    test.skip(!isMobile(testInfo), 'burger is shown only at <= 768 px');
    await page.goto('/', { waitUntil: 'load' });
    await page.keyboard.press('Tab');
    await expect(burger(page), 'burger is first Tab stop').toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('header nav'), 'Enter opens menu').toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('header nav a[href="/"]'), 'Tab moves into opened menu').toBeFocused();
    await expect.soft(burger(page), 'burger has accessible name').toHaveAccessibleName(/\S/);
    await expect.soft(burger(page), 'burger exposes aria-expanded=true when open').toHaveAttribute('aria-expanded', 'true');
  });

  // PW-10 on the routes outside the P0 Smoke sample (P0 routes are covered in smoke.spec.js).
  for (const route of ROUTES.filter((r) => !P0_ROUTES.includes(r))) {
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
      expect(errors.firstPartyFailures, 'first-party resource HTTP >= 400 or network failure').toEqual([]);
    });
  }

  test('PW-09 homepage has no interactive element nested in a link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await expect(page.locator('a button, a a, button a'), 'nested interactive controls (double Tab stop)').toHaveCount(0);
  });
});
