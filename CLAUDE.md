# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

OpenGov.kz — a static marketing/showcase site (QBS Solutions) for Kazakhstan's open-data / open-government initiative. React 19 + Vite 6, React Router 7, i18next, CSS Modules. No backend; all content is local. Deployed to Vercel automatically on push to `main` (demo: https://qbs-solutions.vercel.app/).

## Commands

```bash
npm install
npm run dev       # Vite dev server, http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint (flat config, eslint.config.js)
```

There is no test suite.

## Architecture

- **Routing** — all routes are declared in `src/App.jsx` (`/`, `/aboutMe`, `/news`, `/projects`, `/members`, `/newsDetail`, `/projectDetail`, `/membersDetail`). Each page component renders its own `<Header />` and `<Footer />`; there is no shared layout route.
- **Detail pages are static.** `/newsDetail`, `/projectDetail`, `/membersDetail` take no route params — every list item links to the same detail URL, and the detail content comes from the corresponding locale JSON, not from the data arrays.
- **Page structure** — `src/pages/<page>/<page>.jsx` with a sibling `<page>.module.css`; page-specific card components live in subfolders next to the page (e.g. `pages/newsPage/newsCard1/`). Header, footer, and `scrollTop/` live directly under `src/`.

### Two separate localization mechanisms

1. **UI strings** — i18next namespaces, one JSON per page per language in `src/locales/{ru,kz,en}/<namespace>.json`. Every namespace is imported and registered manually in `src/i18n.js`; adding a namespace means adding three imports and three entries there. Components use `useTranslation("<namespace>")`. Default and fallback language is `ru`; the language code for Kazakh is `kz` (not `kk`). Language is switched only via `i18n.changeLanguage` in `src/header/header.jsx` and is not persisted.
2. **List content** — `src/data/{newsData,projectsData,membersData}.js` hold arrays where each text field is an object `{ ru, kz, en }`. List pages pick the field with `i18n.language` (e.g. `item.title[lang]`). Filtering uses the language-independent `tagKey`, and the category buttons on each list page are a hard-coded array that must be kept in sync with the `tagKey` values in the data.

When adding user-facing text, put it in the matching locale namespace (all three languages) or data object — don't hard-code Russian strings in JSX.

### Static assets

Images live in `public/` and must be referenced from the root (`/pp_Card1.png`), **not** `/public/...` — the latter only works on the dev server and 404s in production builds.

### Mocks

`src/mocks/` contains an MSW setup that is not wired into the app (nothing imports it) and uses the pre-v2 `rest` API, which doesn't exist in the installed msw v2.
