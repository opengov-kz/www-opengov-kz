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

При создании или существенном изменении объектов знаний в Notion OpenGov.kz применять действующий [Регламент NR-04 v2](https://app.notion.com/p/40d341823d558173b801c534b0b9af23) и [Knowledge Standards](https://app.notion.com/p/410341823d5581c4a51be5d9f7639029):

- **OGK-QG-01 v0.2** — критерии QG-01…07: SSOT, уникальность, прослеживаемость, статусы, актуальность, границы проектов и история изменений.
- **OGK-STD-08** — Atomic Knowledge Objects: один основной самостоятельный объект знаний на содержательную страницу, с предусмотренными стандартом исключениями.
- **До изменения:** определить объект и SSOT, выполнить Duplicate Check и необходимый Impact Review, проверить действующую редакцию и разрешение PO.
- **После изменения:** выполнить read-back, проверить применимые критерии Quality Gate и соответствие фактических изменений разрешённому scope.

Неприменимый критерий отмечать N/A; отсутствие достаточных свидетельств — Not Verified. Не вводить новые базы, свойства, статусы или нормативные правила автоматически.

Notion OpenGov.kz является источником продуктовых знаний и решений; GitHub Issues — техническим backlog и журналом выполнения; OG — независимым каноническим источником предметных знаний, доступным проекту только для чтения без отдельного разрешения.

Этот раздел содержит ссылки на действующие нормы, не создаёт их новых редакций и не заменяет решения Product Owner.

## Fast Track / Standard Track, Start Gate и Release Gate

Краткая сводка для исполнения. Нормативный SSOT — [Регламент NR-04 v2](https://app.notion.com/p/40d341823d558173b801c534b0b9af23), разделы 5, 6, 8–11; этот раздел не создаёт самостоятельных норм и не заменяет решения Product Owner.

**Классификация (раздел 5).**

- **Fast Track** допустим только при одновременном выполнении условий: требования и AC утверждены; scope и файлы/компоненты ограничены и проверяемы; не меняются бизнес-правила, существенные API-контракты, архитектура, модель данных, права доступа, обработка персональных данных или секретов; нет миграций, изменения production-конфигурации, инфраструктуры или DNS; известны возможные preview deployments и последствия merge; проверки воспроизводимы; нет существенных нерешённых зависимостей.
- **Standard Track** обязателен при существенных изменениях архитектуры, интеграций, данных, безопасности, прав доступа, инфраструктуры, бизнес-поведения, сложных зависимостях или недостаточной определённости. Дополнительные Review/Approval Gates определяются рисками конкретной Issue.
- Классификация определяется последствиями, зависимостями и рисками, а не количеством файлов, строк или продолжительностью. Название задачи не разрешает Fast Track. При сомнении — Standard Track. При новом существенном риске остановить затронутые действия и инициировать пересмотр; переход Standard → Fast — только по решению PO.

**Start Gate (раздел 6).** Fast Track требует явного Start Gate PO для конкретной Issue, утверждённого scope и конкретной редакции AC. Он может единым разрешением делегировать создание worktree, реализацию, локальные исправления в пределах AC, проверки, commit с `#ISSUE-N`, push, безопасную очистку своей worktree, PR и технический отчёт. Полномочия не распространяются на другие задачи и прекращаются при существенном изменении требований, рисков или полномочий. Start Gate не разрешает merge, production deployment или закрытие Issue. В Standard Track допустимые операции задаются индивидуально.

**Независимый BA Review (раздел 8).** ChatGPT независимо проверяет AC, требования, diff и доказательства; замечания и повторные проверки фиксируются в Issue. BA Review Passed не даёт автоматического права на merge. При изменении проверенного head SHA нужен повторный Review затронутого результата.

**Release Gate (раздел 9).** Решение PO однозначно определяет Issue, PR, проверенный head SHA, разрешение на merge, допустимые последствия deployment, обязательные Post-Merge Checks, Stop Conditions и право условного закрытия Issue. Перед ним подтверждаются BA Review Passed, отсутствие блокирующих замечаний, соответствие diff scope, обязательные проверки и известные последствия merge/deploy. В Fast Track всё это может быть разрешено одним решением PO; Standard Track может требовать дополнительные решения.

**Pre-Merge Gate (раздел 9).** Непосредственно перед merge сверить PR, head SHA, scope, diff, конфликты, обязательные проверки и актуальный `main`. Изменение base SHA само по себе не блокер при подтверждённой совместимости и неизменном проверенном результате. При изменении head SHA, содержательном конфликте или провале проверок merge запрещён до исправления и необходимого повторного BA Review.

**Post-Merge Verification (раздел 10).** Проверить: PR Merged; проверенный commit включён в `main`; merge SHA установлен; ожидаемый diff присутствует; обязательные deployment и проверки завершены; AC сохраняются; итоговый отчёт опубликован в Issue. Каждый обязательный критерий проверяется отдельно с исходом Passed, Failed, Not Verified или N/A; N/A допустим только с обоснованием неприменимости. Deployment `READY` не означает функциональную приёмку; главная страница не доказывает работоспособность всех маршрутов, локализаций, мобильного интерфейса и контента.

**Условное закрытие Issue (раздел 10).** Claude Code вправе закрыть Issue как Completed только если Release Gate явно делегирует такое право и все обязательные Post-Merge Checks успешны; после закрытия обязателен read-back. При Failed или Not Verified хотя бы одного обязательного критерия закрытие запрещено: Issue остаётся открытой, факты и ограничения фиксируются.

**Stop Conditions (раздел 11).** Остановить затронутую операцию при изменении утверждённых требований или необходимости нового решения PO; расширении scope; конфликте SSOT/норм; изменении проверенного head SHA без повторного Review; несовместимости с `main`; провале обязательных проверок; риске потери уникальных данных; необходимости изменения секретов, доступа или production-конфигурации вне разрешения; нарушении границ OG/других проектов; отсутствии полномочий; обязательном Not Verified. Безопасная read-only диагностика и отчёт допустимы в рамках разрешения.

## Процесс работы с GitHub Issues (Git worktree)

Обязательно для каждой GitHub Issue №N. Источник: [Регламент NR-04 v2](https://app.notion.com/p/40d341823d558173b801c534b0b9af23), раздел 7.

**Последовательность сдачи:** проверки → коммит с `#ISSUE-N` → push → проверка сохранности данных и безопасная очистка worktree → PR, если он разрешён Start Gate или отдельным решением PO → финальный отчёт в Issue с base/head SHA, ссылкой на PR и результатом очистки → независимый BA Review.

1. **Изоляция до изменений.** Прежде чем менять любые файлы, выполнить `git fetch origin` и создать ветку `ISSUE-N` и worktree `.worktrees/ISSUE-N` от актуальной основной ветки: `git worktree add -b ISSUE-N .worktrees/ISSUE-N origin/main`. Если задача зависит от изменений, ещё не включённых в `main`, сначала проверить зависимости и вместо `origin/main` использовать утверждённый проверенный HEAD родительской ветки: `git worktree add -b ISSUE-N .worktrees/ISSUE-N <SHA>`. Base SHA и порядок интеграции зафиксировать в финальном отчёте; чужую работу не сбрасывать и не перезаписывать. При неоднозначности остановиться и запросить решение.
2. **Существующая ветка или worktree.** Если ветка `ISSUE-N` или каталог `.worktrees/ISSUE-N` уже существуют — сначала проверить их состояние (`git worktree list`, `git status`, `git log`). Не перезаписывать, не пересоздавать и не сбрасывать чужую работу; при сомнениях остановиться и сообщить. Продолжить работу в проверенной ветке без своей worktree можно командой без `-b`: `git worktree add .worktrees/ISSUE-N ISSUE-N`.
3. **Работа только в своей worktree.** Все изменения Issue №N вносить только в `.worktrees/ISSUE-N`. Не редактировать файлы через основную рабочую директорию и не смешивать изменения разных Issues. Каталог `.worktrees/` игнорируется через корневой `.gitignore`; никогда не добавлять его содержимое в индекс.
4. **Коммит.** Выполнить проверки из критериев приёмки Issue (и `npm run lint` / `npm run build`, если затронут код). В **сообщении каждого коммита** указывать маркер `#ISSUE-N`, например `docs: update navigation #ISSUE-12`. Это текст сообщения, а не Git tag — теги не создавать.
5. **Push.** Опубликовать ветку: `git push -u origin ISSUE-N`.
6. **Безопасная очистка.** Только после успешного push убедиться, что в worktree нет незакоммиченных (`git status`), игнорируемых (`git status --ignored`) и неотправленных (`git log origin/ISSUE-N..ISSUE-N`) уникальных данных, затем удалить её штатно: `git worktree remove .worktrees/ISSUE-N` — **без `--force`**. Игнорирование Git не доказывает безопасность удаления: `node_modules/`, `dist/` и другие воспроизводимые ignored-артефакты допустимо считать неуникальными только после проверки отсутствия ручных изменений, секретов, локальных пользовательских или невосстановимых данных. Если уникальные данные есть, есть сомнения или push не прошёл — не удалять, остановиться и сообщить о блокере. Ветку не удалять. Чужие worktrees, ветки и stash не трогать.
7. **Финальный отчёт в Issue.** Публиковать после очистки по п. 6. Указать Issue, имя и ссылку на ветку, base/head SHA, ссылку на PR (если создан), diff/файлы, результаты AC и проверок, свидетельства, результат очистки, ограничения и блокеры. Если отчёт уже был опубликован, дополнить его отдельным комментарием с результатом очистки. Если нет доступа к публикации комментариев в GitHub — передать готовый отчёт пользователю и не утверждать, что он опубликован.
8. **Запрещено без разрешения PO:** создавать PR без явного разрешения Start Gate или отдельного решения PO; выполнять merge, production deployment/публикацию сайта и закрывать Issue вне пределов Release Gate. Push ветки не является разрешением на merge. После сдачи ожидать BA Review.

**Read-only и диагностические Issues.** Если Issue ограничена диагностикой или отчётом в комментарии, не создавать фиктивных изменений файлов и коммитов ради формального соблюдения процесса. Worktree используется, только если задаче нужен локальный репозиторий: сначала завершить диагностику, затем безопасно удалить worktree по п. 6 (условие о push неприменимо, если коммитов нет) и только после этого опубликовать финальный отчёт. Более строгий scope и ограничения конкретной Issue имеют приоритет над этими общими правилами.

## Хранение отчётов и технических результатов (модель C)

Источник: [Регламент NR-04 v2](https://app.notion.com/p/40d341823d558173b801c534b0b9af23), раздел 8 (модель C). GitHub Issues — единый журнал выполнения технических задач и BA Review; Notion — утверждённые продуктовые решения и требования; Git-репозиторий — код и самостоятельная техническая документация. Отчёты между системами не дублировать.

- **Финальный отчёт** — комментарий в соответствующей GitHub Issue, публикуется по п. 7 раздела выше, то есть после push и безопасной очистки worktree. Содержит Issue, ветку, base/head SHA, PR, diff/файлы, результаты AC и проверок, свидетельства, ограничения и блокеры, результат очистки, ссылки на самостоятельные технические результаты.
- **Ревью.** BA Review, замечания, исправления, повторные сдачи и решения о приёмке фиксируются в GitHub Issue и не требуют коммита ради обновления служебного отчёта.
- **Файлы отчётов.** Не создавать автоматически `ISSUE-N-report.md` и другие дубликаты служебного отчёта; не копировать в репозиторий содержание финального комментария.
- **Файлы в `docs/`.** Создавать только если файл является самостоятельным долговременным техническим результатом, предусмотренным scope/AC: архитектура, протокол испытаний, runbook, миграции, исследования. Такой файл проходит обычные commit, push и review и обновляется, только если меняется его собственное содержимое.
- **Ссылки.** В отчёте Issue ссылаться на такие документы с указанием точного SHA. Логи CI хранить в GitHub Actions или артефактах CI, скриншоты — во вложениях Issue/PR, если нет отдельной причины их версионировать.
- **Notion и OG.** Не переносить в Notion технические отчёты и backlog. Каноническую базу знаний OG не изменять.
- **Приоритет.** Специальные требования конкретной Issue имеют приоритет над этими правилами.
