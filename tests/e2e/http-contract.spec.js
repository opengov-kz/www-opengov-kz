// #44 Phase 1 AC-09: HTTP contract of the language URLs and special paths (Q-OGK-44-P0-02=B, P0-03=A, P0-06=A).
// Runs against the local `vite preview` (follows vercel.json, vite.config.js) and, with PW_BASE_URL, the Vercel Preview.
// Redirects are not followed: every answer is checked as served, then each redirect target is requested once more,
// so a loop or a false 200 behind a redirect fails.
import { expect, test } from '@playwright/test';
import { LANGS, PRERENDERED, fileOf } from '../../src/routing.js';
import { REMOVED_ROUTES, note } from './helpers.js';

const QUERY = '?pw=1&utm_source=e2e';
const homes = LANGS.map((l) => (l.prefix || '/'));

// [path, status, location (pathname+search) for 308]
const MATRIX = [
  ...PRERENDERED.map(({ url }) => [url, 200]),
  ...PRERENDERED.map(({ url }) => [`/${fileOf(url)}`, 308, url]), // known page .html -> clean URL (/index.html -> /)
  ...PRERENDERED.map(({ url }) => [`/${fileOf(url)}${QUERY}`, 308, `${url}${QUERY}`]), // query kept
  ...PRERENDERED.filter(({ url }) => url !== '/').map(({ url }) => [`${url}/`, 308, url]), // existing trailing slash contract
  ['/index', 308, '/'],
  ...homes.filter((h) => h !== '/').flatMap((h) => [[`${h}/index`, 308, h], [`${h}/index.html`, 308, h], [`${h}/`, 308, h]]),
  ['/404', 404], // P0-02=B
  ['/404.html', 200], // P0-02=B: technical page, noindex (checked below)
  ['/spa-shell', 404], // P0-03=A
  ['/spa-shell.html', 404],
  ['/ru', 404], ['/kz', 404], ['/ru/', '404|308', '/ru'], ['/kz/', '404|308', '/kz'], // P0-06=A: 404 or 308 then 404
  ['/KK', 404], ['/EN', 404], ['/Kk/about', 404],
  ['/unknown.html', 404], ['/kk/unknown.html', 404], ['/tools/unknown.html', 404],
  ['/kk/pw-e2e-unknown', 404], ['/en/tools/pw-e2e-unknown', 404], ['/pw-e2e-unknown-route', 404],
  ['/kk/kk', 404], ['/en/kk', 404], ['/ru/about', 404], ['/kz/about', 404],
  ...REMOVED_ROUTES.flatMap((r) => [[r, 404], [`/kk${r}`, 404], [`/en${r}`, 404]]),
];

const pathOf = (location, base) => {
  const u = new URL(location, base);
  return u.pathname + u.search;
};

test.describe('@http #44 HTTP contract', () => {
  test('AC-09 200/308/404 matrix, no loops and no false 200', async ({ request, baseURL }, info) => {
    test.skip(info.project.name !== 'desktop-1440', 'HTTP matrix does not depend on the viewport');
    test.setTimeout(180_000);
    const rows = [];
    const bad = [];
    for (const [path, status, location] of MATRIX) {
      const res = await request.get(path, { maxRedirects: 0 });
      const got = { path, status: res.status(), location: res.headers().location ? pathOf(res.headers().location, baseURL) : '' };
      rows.push(got);
      const allowed = String(status).split('|').map(Number);
      if (!allowed.includes(got.status)) bad.push(`${path}: HTTP ${got.status}, want ${status}`);
      if (got.status === 308 && got.location !== location) bad.push(`${path}: Location ${got.location}, want ${location}`);
      if (got.status === 308) {
        // one hop: the target is final (200 or 404), never another redirect
        const next = await request.get(got.location, { maxRedirects: 0 });
        const want = PRERENDERED.some((r) => r.url === new URL(got.location, baseURL).pathname) ? 200 : 404;
        if (next.status() !== want) bad.push(`${path} -> ${got.location}: HTTP ${next.status()}, want ${want}`);
      }
      if (got.status === 200) {
        const body = await res.text();
        if (!(res.headers()['content-type'] ?? '').includes('text/html')) bad.push(`${path}: not HTML`);
        if (path === '/404.html' && !body.includes('<meta name="robots" content="noindex" />')) bad.push('/404.html: no noindex');
        if (path !== '/404.html' && !body.includes('<div id="root"><')) bad.push(`${path}: 200 without prerendered content`);
      }
    }
    note('http-matrix', JSON.stringify(rows));
    await info.attach('http-matrix.json', { body: JSON.stringify({ baseURL, rows }, null, 2), contentType: 'application/json' });
    expect(MATRIX.length, 'matrix size').toBeGreaterThan(140);
    expect(bad, 'HTTP contract deviations').toEqual([]);
  });
});
