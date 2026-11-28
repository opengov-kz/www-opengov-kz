// D-3 language URLs (#44): one config for React Router, prerender, head tags, vercel.json and checks.
// RU has no prefix, KK is /kk (i18next key stays kz, Q-OGK-D3-URL-01=A), EN is /en; same English slugs.
export const SITE = 'https://opengov.kz'; // Q-OGK-D3-URL-05=A canonical origin

// label: visible switcher text; name: language name (Q-OGK-44-P0-05=A); a11yName: accessible name of the switcher link,
// starting with the visible label (WCAG 2.5.3 Label in Name, PO decision on the AC-06 stop of 28.11.2026: variant A).
export const LANGS = [
    { key: 'ru', prefix: '', hreflang: 'ru', label: 'РУС', name: 'Русский', a11yName: 'РУС — Русский' },
    { key: 'kz', prefix: '/kk', hreflang: 'kk', label: 'ҚАЗ', name: 'Қазақша', a11yName: 'ҚАЗ — Қазақша' },
    { key: 'en', prefix: '/en', hreflang: 'en', label: 'ENG', name: 'English', a11yName: 'ENG — English' },
];

// The 9 routes of the site (8 MVP routes of design v1.2, #26, and /projects «Areas of work», #14, not in the menu).
// ns: i18next namespace of the page; seo: key prefix of its seoTitle/seoDescription; h1: key of its <h1> text.
export const PAGES = [
    { path: '/', ns: 'mainPage', seo: '', h1: 'hero.title' },
    { path: '/open-government', ns: 'openGovernmentPage', seo: '', h1: 'hero.title' },
    { path: '/tools', ns: 'toolsPage', seo: 'catalog.', h1: 'catalog.title' },
    { path: '/tools/open-data', ns: 'toolsPage', seo: 'portals.openData.', h1: 'portals.openData.title' },
    { path: '/tools/open-budgets', ns: 'toolsPage', seo: 'portals.openBudgets.', h1: 'portals.openBudgets.title' },
    { path: '/tools/legal-acts', ns: 'toolsPage', seo: 'portals.legalActs.', h1: 'portals.legalActs.title' },
    { path: '/community', ns: 'communityPage', seo: '', h1: 'hero.title' },
    { path: '/about', ns: 'aboutProjectPage', seo: '', h1: 'hero.title' },
    { path: '/projects', ns: 'projectsPage', seo: '', h1: 'hero.title', noindex: true }, // Q-OGK-PROJECTS-PUB-02=A: 200, noindex, no hreflang
];

export const urlOf = (lang, path) => (lang.prefix && path === '/' ? lang.prefix : lang.prefix + path);

// All 27 language URLs; every one is prerendered to a static HTML file.
export const PRERENDERED = LANGS.flatMap((lang) => PAGES.map((page) => ({ url: urlOf(lang, page.path), lang, page })));

export const matchUrl = (pathname) => PRERENDERED.find((r) => r.url === pathname);

export const langOf = (key) => LANGS.find((l) => l.key === key) ?? LANGS[0];

// Language of a path that is not a language URL (client NotFound): taken from its /kk or /en prefix.
export const langOfPath = (pathname) =>
    LANGS.find((l) => l.prefix && (pathname === l.prefix || pathname.startsWith(`${l.prefix}/`))) ?? LANGS[0];

// Prerendered file of a URL in dist/: / -> index.html, /kk -> kk.html, /kk/tools/open-data -> kk/tools/open-data.html.
export const fileOf = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

// SEO tags of a prerendered URL as [tag, attributes], shared by prerender and SPA navigation (usePageMeta).
// x-default points to the equivalent RU URL (Q-OGK-44-P0-04=A).
export function headTags({ url, page }) {
    if (page.noindex) return [['meta', { name: 'robots', content: 'noindex' }]];
    const href = (lang) => SITE + urlOf(lang, page.path);
    return [
        ['link', { rel: 'canonical', href: SITE + url }],
        ...LANGS.map((lang) => ['link', { rel: 'alternate', hreflang: lang.hreflang, href: href(lang) }]),
        ['link', { rel: 'alternate', hreflang: 'x-default', href: href(LANGS[0]) }],
    ];
}

// Everything headTags or a page may add; removed before a page writes its own tags.
export const SEO_SELECTOR = 'meta[name="description"], meta[name="robots"], link[rel="canonical"], link[rel="alternate"][hreflang]';

// vercel.json routing generated from this config (Q-OGK-44-P0-02=B, P0-03=A, P0-06=A); scripts/check-routes.js keeps
// vercel.json equal to it. Without cleanUrls, so that /404 is a real HTTP 404 and /404.html stays 200 noindex:
// - rewrites: every language URL except / -> its prerendered .html file;
// - redirects 308: the .html file of every language URL and the index aliases of the three homes -> the clean URL.
// Everything else (unknown paths, unknown .html, /404, /spa-shell, /ru, /kz, /KK, removed routes) is HTTP 404 with
// public/404.html; trailingSlash: false keeps 308 /path/ -> /path.
export function vercelRouting() {
    const redirect = (source, destination) => ({ source, destination, permanent: true });
    const homes = LANGS.map((lang) => urlOf(lang, '/'));
    return {
        trailingSlash: false,
        redirects: [
            ...PRERENDERED.map(({ url }) => redirect(`/${fileOf(url)}`, url)),
            ...homes.map((home) => redirect(home === '/' ? '/index' : `${home}/index`, home)),
            ...homes.filter((home) => home !== '/').map((home) => redirect(`${home}/index.html`, home)),
        ],
        rewrites: PRERENDERED.filter(({ url }) => url !== '/').map(({ url }) => ({ source: url, destination: `/${fileOf(url)}` })),
    };
}
