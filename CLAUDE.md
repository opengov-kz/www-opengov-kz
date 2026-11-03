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

## Процесс работы с GitHub Issues (Git worktree)

Обязательно для каждой GitHub Issue №N. Источник: регламент Notion «Регламент работы ChatGPT, Claude Code, Notion и GitHub», раздел «Изоляция задач Claude Code через Git worktree — Approved, 03.11.2026».

1. **Изоляция до изменений.** Прежде чем менять любые файлы, выполнить `git fetch origin` и создать ветку `ISSUE-N` и worktree `.worktrees/ISSUE-N` от актуальной основной ветки: `git worktree add -b ISSUE-N .worktrees/ISSUE-N origin/main`.
2. **Существующая ветка или worktree.** Если ветка `ISSUE-N` или каталог `.worktrees/ISSUE-N` уже существуют — сначала проверить их состояние (`git worktree list`, `git status`, `git log`). Не перезаписывать, не пересоздавать и не сбрасывать чужую работу; при сомнениях остановиться и сообщить.
3. **Работа только в своей worktree.** Все изменения Issue №N вносить только в `.worktrees/ISSUE-N`. Не редактировать файлы через основную рабочую директорию и не смешивать изменения разных Issues. Каталог `.worktrees/` игнорируется через корневой `.gitignore`; никогда не добавлять его содержимое в индекс.
4. **Коммит.** Выполнить проверки из критериев приёмки Issue (и `npm run lint` / `npm run build`, если затронут код). В **сообщении каждого коммита** указывать маркер `#ISSUE-N`, например `docs: update navigation #ISSUE-12`. Это текст сообщения, а не Git tag — теги не создавать.
5. **Push.** Опубликовать ветку: `git push -u origin ISSUE-N`.
6. **Отчёт в Issue.** Указать SHA коммита, имя и ссылку на ветку, результаты проверок, ограничения и блокеры. Если нет доступа к публикации комментариев в GitHub — передать готовый отчёт пользователю и не утверждать, что он опубликован.
7. **Безопасная очистка.** Только после успешного push убедиться, что в worktree нет незакоммиченных (`git status`), игнорируемых (`git status --ignored`) и неотправленных (`git log origin/ISSUE-N..ISSUE-N`) данных, затем удалить её штатно: `git worktree remove .worktrees/ISSUE-N` — **без `--force`**. Если такие данные есть или push не прошёл — остановиться и сообщить о блокере. Ветку не удалять. Чужие worktrees, ветки и stash не трогать.
8. **Запрещено без разрешения PO:** создавать PR (если это не предусмотрено scope Issue), выполнять merge, deploy/публикацию сайта и закрывать Issue. Push ветки не является разрешением на merge. После сдачи ожидать BA Review.

**Read-only и диагностические Issues.** Если Issue ограничена диагностикой или отчётом в комментарии, не создавать фиктивных изменений файлов и коммитов ради формального соблюдения процесса. Worktree используется, только если задаче нужен локальный репозиторий, и после отчёта безопасно удаляется по п. 7. Более строгий scope и ограничения конкретной Issue имеют приоритет над этими общими правилами.
