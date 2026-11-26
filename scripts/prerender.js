// Build-time prerender (#44 Phase 0): writes static HTML for every language URL of src/routing.js into dist/.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx` (dist-ssr/); no runtime server.
// /kk/tools/open-data -> dist/kk/tools/open-data.html, served by Vercel cleanUrls at the clean URL.
// The untouched client template becomes dist/spa-shell.html, the rewrite target of the RU-only SPA routes.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const { render, PRERENDERED, headTags, fixedI18n } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url));

const template = readFileSync(new URL('index.html', dist), 'utf8');
const ROOT = '<div id="root"></div>';
const TITLE = /<title>[^<]*<\/title>/;
if (!template.includes(ROOT) || !TITLE.test(template) || !template.includes('<html lang="ru">')) {
    throw new Error('prerender: dist/index.html has no <html lang="ru">, <title> or empty #root');
}
writeFileSync(new URL('spa-shell.html', dist), template);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tag = ([name, attrs]) => `<${name} ${Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')}>`;

for (const route of PRERENDERED) {
    const { url, lang, page } = route;
    const t = fixedI18n(lang.key).getFixedT(lang.key, page.ns);
    const head = [
        `<title>${esc(t(`${page.seo}seoTitle`))}</title>`,
        tag(['meta', { name: 'description', content: t(`${page.seo}seoDescription`) }]),
        ...headTags(route).map(tag),
    ].join('\n  ');
    const body = render(url);
    if (!body.includes('<h1')) throw new Error(`prerender: ${url} rendered without <h1>`);

    const html = template
        .replace('<html lang="ru">', () => `<html lang="${lang.hreflang}">`) // replacer functions: no $-patterns from text
        .replace(TITLE, () => head)
        .replace(ROOT, () => `<div id="root">${body}</div>`);
    const file = new URL(url === '/' ? 'index.html' : `${url.slice(1)}.html`, dist);
    mkdirSync(new URL('.', file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerender: ${url} -> dist/${url === '/' ? 'index' : url.slice(1)}.html`);
}
