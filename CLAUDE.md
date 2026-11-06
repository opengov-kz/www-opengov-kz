# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

OpenGov.kz — a static marketing/showcase site (QBS Solutions) for Kazakhstan's open-data / open-government initiative. React 19 + Vite 6, React Router 7, i18next, CSS Modules. No backend; all content is local. Deployed to Vercel automatically on push to `main`. Approved MVP demonstration URL: https://www-opengov-kz.vercel.app/ (DEC-OGK-MVP-URL-01, approved 2026-11-05). Deployment status alone does not constitute functional acceptance.

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

## Управление знаниями и Quality Gate (OpenGov.kz)

При создании или существенном изменении объектов знаний в Notion OpenGov.kz применять действующий [Регламент NR-04 v1](https://app.notion.com/p/40d341823d558173b801c534b0b9af23) и [Knowledge Standards](https://app.notion.com/p/410341823d5581c4a51be5d9f7639029):

- **OGK-QG-01 v0.2** — критерии QG-01…07: SSOT, уникальность, прослеживаемость, статусы, актуальность, границы проектов и история изменений.
- **OGK-STD-08** — Atomic Knowledge Objects: один основной самостоятельный объект знаний на содержательную страницу, с предусмотренными стандартом исключениями.
- **До изменения:** определить объект и SSOT, выполнить Duplicate Check и необходимый Impact Review, проверить действующую редакцию и разрешение PO.
- **После изменения:** выполнить read-back, проверить применимые критерии Quality Gate и соответствие фактических изменений разрешённому scope.

Неприменимый критерий отмечать N/A; отсутствие достаточных свидетельств — Not Verified. Не вводить новые базы, свойства, статусы или нормативные правила автоматически.

Notion OpenGov.kz является источником продуктовых знаний и решений; GitHub Issues — техническим backlog и журналом выполнения; OG — независимым каноническим источником предметных знаний, доступным проекту только для чтения без отдельного разрешения.

Этот раздел содержит ссылки на действующие нормы, не создаёт их новых редакций и не заменяет решения Product Owner.

## Процесс работы с GitHub Issues (Git worktree)

Обязательно для каждой GitHub Issue №N. Источник: регламент Notion «Регламент работы ChatGPT, Claude Code, Notion и GitHub», разделы «Изоляция задач Claude Code через Git worktree — Approved, 03.11.2026» и «Уточнения к процессу worktree — Approved, 05.11.2026».

**Последовательность сдачи:** проверки → коммит с `#ISSUE-N` → push → проверка сохранности данных и безопасная очистка worktree → финальный отчёт в Issue с SHA и результатом очистки → BA Review.

1. **Изоляция до изменений.** Прежде чем менять любые файлы, выполнить `git fetch origin` и создать ветку `ISSUE-N` и worktree `.worktrees/ISSUE-N` от актуальной основной ветки: `git worktree add -b ISSUE-N .worktrees/ISSUE-N origin/main`. Если задача зависит от изменений, ещё не включённых в `main`, сначала проверить зависимости и вместо `origin/main` использовать утверждённый проверенный HEAD родительской ветки: `git worktree add -b ISSUE-N .worktrees/ISSUE-N <SHA>`. Base SHA и порядок интеграции зафиксировать в финальном отчёте; чужую работу не сбрасывать и не перезаписывать. При неоднозначности остановиться и запросить решение.
2. **Существующая ветка или worktree.** Если ветка `ISSUE-N` или каталог `.worktrees/ISSUE-N` уже существуют — сначала проверить их состояние (`git worktree list`, `git status`, `git log`). Не перезаписывать, не пересоздавать и не сбрасывать чужую работу; при сомнениях остановиться и сообщить. Продолжить работу в проверенной ветке без своей worktree можно командой без `-b`: `git worktree add .worktrees/ISSUE-N ISSUE-N`.
3. **Работа только в своей worktree.** Все изменения Issue №N вносить только в `.worktrees/ISSUE-N`. Не редактировать файлы через основную рабочую директорию и не смешивать изменения разных Issues. Каталог `.worktrees/` игнорируется через корневой `.gitignore`; никогда не добавлять его содержимое в индекс.
4. **Коммит.** Выполнить проверки из критериев приёмки Issue (и `npm run lint` / `npm run build`, если затронут код). В **сообщении каждого коммита** указывать маркер `#ISSUE-N`, например `docs: update navigation #ISSUE-12`. Это текст сообщения, а не Git tag — теги не создавать.
5. **Push.** Опубликовать ветку: `git push -u origin ISSUE-N`.
6. **Безопасная очистка.** Только после успешного push убедиться, что в worktree нет незакоммиченных (`git status`), игнорируемых (`git status --ignored`) и неотправленных (`git log origin/ISSUE-N..ISSUE-N`) уникальных данных, затем удалить её штатно: `git worktree remove .worktrees/ISSUE-N` — **без `--force`**. Игнорирование Git не доказывает безопасность удаления: `node_modules/`, `dist/` и другие воспроизводимые ignored-артефакты допустимо считать неуникальными только после проверки отсутствия ручных изменений, секретов, локальных пользовательских или невосстановимых данных. Если уникальные данные есть, есть сомнения или push не прошёл — не удалять, остановиться и сообщить о блокере. Ветку не удалять. Чужие worktrees, ветки и stash не трогать.
7. **Финальный отчёт в Issue.** Публиковать после очистки по п. 6. Указать SHA коммита, имя и ссылку на ветку, результаты проверок, результат очистки, ограничения и блокеры. Если отчёт уже был опубликован, дополнить его отдельным комментарием с результатом очистки. Если нет доступа к публикации комментариев в GitHub — передать готовый отчёт пользователю и не утверждать, что он опубликован.
8. **Запрещено без разрешения PO:** создавать PR (если это не предусмотрено scope Issue), выполнять merge, deploy/публикацию сайта и закрывать Issue. Push ветки не является разрешением на merge. После сдачи ожидать BA Review.

**Read-only и диагностические Issues.** Если Issue ограничена диагностикой или отчётом в комментарии, не создавать фиктивных изменений файлов и коммитов ради формального соблюдения процесса. Worktree используется, только если задаче нужен локальный репозиторий: сначала завершить диагностику, затем безопасно удалить worktree по п. 6 (условие о push неприменимо, если коммитов нет) и только после этого опубликовать финальный отчёт. Более строгий scope и ограничения конкретной Issue имеют приоритет над этими общими правилами.

## Хранение отчётов и технических результатов (модель C)

Источник: регламент Notion, раздел «Хранение отчётов Claude Code и технических результатов — Approved, 05.11.2026 (модель C)». GitHub Issues — единый журнал выполнения технических задач и BA Review; Notion — утверждённые продуктовые решения и требования; Git-репозиторий — код и самостоятельная техническая документация. Отчёты между системами не дублировать.

- **Финальный отчёт** — комментарий в соответствующей GitHub Issue, публикуется по п. 7 раздела выше, то есть после push и безопасной очистки worktree. Содержит SHA, ветку, результаты AC и проверок, ограничения и блокеры, результат очистки, ссылки на самостоятельные технические результаты.
- **Ревью.** BA Review, замечания, исправления, повторные сдачи и решения о приёмке фиксируются в GitHub Issue и не требуют коммита ради обновления служебного отчёта.
- **Файлы отчётов.** Не создавать автоматически `ISSUE-N-report.md` и другие дубликаты служебного отчёта; не копировать в репозиторий содержание финального комментария.
- **Файлы в `docs/`.** Создавать только если файл является самостоятельным долговременным техническим результатом, предусмотренным scope/AC: архитектура, протокол испытаний, runbook, миграции, исследования. Такой файл проходит обычные commit, push и review и обновляется, только если меняется его собственное содержимое.
- **Ссылки.** В отчёте Issue ссылаться на такие документы с указанием точного SHA. Логи CI хранить в GitHub Actions или артефактах CI, скриншоты — во вложениях Issue/PR, если нет отдельной причины их версионировать.
- **Notion и OG.** Не переносить в Notion технические отчёты и backlog. Каноническую базу знаний OG не изменять.
- **Приоритет.** Специальные требования конкретной Issue имеют приоритет над этими правилами.
