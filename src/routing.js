// D-3 language URLs (#44 Phase 0 spike): one config for React Router, prerender, head tags and checks.
// RU has no prefix, KK is /kk (i18next key stays kz, Q-OGK-D3-URL-01=A), EN is /en; same English slugs.
export const SITE = 'https://opengov.kz'; // Q-OGK-D3-URL-05=A canonical origin

export const LANGS = [
    { key: 'ru', prefix: '', hreflang: 'ru', label: 'РУС', name: 'Русский' },
    { key: 'kz', prefix: '/kk', hreflang: 'kk', label: 'ҚАЗ', name: 'Қазақша' },
    { key: 'en', prefix: '/en', hreflang: 'en', label: 'ENG', name: 'English' },
];

// shortcut: Phase 0 covers only these three pages (9 URLs); Phase 1 extends PAGES to all 9 routes (27 URLs).
// seo is the i18next key prefix of seoTitle/seoDescription in the page namespace.
export const PAGES = [
    { path: '/', ns: 'mainPage', seo: '' },
    { path: '/tools/open-data', ns: 'toolsPage', seo: 'portals.openData.' },
    { path: '/projects', ns: 'projectsPage', seo: '', noindex: true }, // Q-OGK-PROJECTS-PUB-02=A: 200, noindex, no hreflang
];

export const urlOf = (lang, path) => (lang.prefix && path === '/' ? lang.prefix : lang.prefix + path);

export const PRERENDERED = LANGS.flatMap((lang) => PAGES.map((page) => ({ url: urlOf(lang, page.path), lang, page })));

export const matchUrl = (pathname) => PRERENDERED.find((r) => r.url === pathname);

export const langOf = (key) => LANGS.find((l) => l.key === key) ?? LANGS[0];

// SEO tags of a prerendered URL as [tag, attributes], shared by prerender and SPA navigation (usePageMeta).
// x-default points to the RU URL: an assumption, open for a PO decision.
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
