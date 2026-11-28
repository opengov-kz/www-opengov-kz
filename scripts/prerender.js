// Build-time prerender (#44): writes static HTML for every language URL of src/routing.js into dist/.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx` (dist-ssr/); no runtime server.
// /kk/tools/open-data -> dist/kk/tools/open-data.html, served at the clean URL by the rewrites of vercel.json.
// The RU home overwrites the client template dist/index.html; no SPA shell is kept (Q-OGK-44-P0-03=A).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const { render, PRERENDERED, headTags, fileOf, fixedI18n } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url));

const template = readFileSync(new URL('index.html', dist), 'utf8');
const ROOT = '<div id="root"></div>';
const TITLE = /<title>[^<]*<\/title>/;
if (!template.includes(ROOT) || !TITLE.test(template) || !template.includes('<html lang="ru">')) {
    throw new Error('prerender: dist/index.html has no <html lang="ru">, <title> or empty #root');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'", '#39': "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#x27|#39|nbsp);/g, (_, e) => ENTITIES[e]);
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
    // One <h1> with the text of the page in the language of the URL (AC-01): a wrong route or language fails the build.
    const h1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '')));
    if (h1.length !== 1 || h1[0] !== t(page.h1)) {
        throw new Error(`prerender: ${url} must render one <h1> "${t(page.h1)}", got ${JSON.stringify(h1)}`);
    }

    const html = template
        .replace('<html lang="ru">', () => `<html lang="${lang.hreflang}">`) // replacer functions: no $-patterns from text
        .replace(TITLE, () => head)
        .replace(ROOT, () => `<div id="root">${body}</div>`);
    const file = new URL(fileOf(url), dist);
    mkdirSync(new URL('.', file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerender: ${url} -> dist/${fileOf(url)}`);
}
console.log(`prerender: ${PRERENDERED.length} language URLs`);
