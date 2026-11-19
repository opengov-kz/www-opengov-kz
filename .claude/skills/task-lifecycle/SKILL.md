---
name: task-lifecycle
description: Use for every OpenGov.kz GitHub Issue that Claude Code executes — from reading the Issue and Start Gate through worktree, checks, commit/push/PR, Issue comments with read-back, finishing the branch and the deferred worktree cleanup after Post-Merge Verification. Also use before applying superpowers:finishing-a-development-branch or superpowers:using-git-worktrees in this repository.
---

# Claude Task Lifecycle (OpenGov.kz)

Нормы — [NR-04 v2.3](https://app.notion.com/p/41d341823d5581a597cad2023822c254) §§6–11 и раздел CLAUDE.md «Процесс работы с GitHub Issues». При расхождении действует NR-04. Skill задаёт порядок действий и не расширяет полномочия.

## 1. Start Gate

1. Прочитать Issue и все комментарии: `gh issue view N --comments`.
2. Определить Track, утверждённый scope и редакцию AC, явные полномочия (worktree, commit, push, PR, Drive). Источник полномочий — решение PO в Issue или Notion.
3. Start Gate нет или он не покрывает операцию — выполнять только read-only диагностику и готовить отчёт или Change Manifest (NR-04 §§6, 7.4).
4. Merge, deployment, закрытие Issue и удаление веток — только в пределах Release Gate (§9).

## 2. Входные материалы

- Если есть `Evidence/Issue-N/manifest.json`, скачать критичные файлы и сверить их SHA-256 с manifest. Расхождение — блокер и промежуточный комментарий.
- Задание пришло без Issue или без файлов, а они нужны, — применить skill `task-handoff`.

## 3. Worktree

Worktree создаётся только при локальной работе с репозиторием (§7.1). Перед созданием:

```bash
git fetch origin
git worktree list
git branch -a --list '*ISSUE-N*'
```

- Ветки и каталога нет: `git worktree add -b ISSUE-N .worktrees/ISSUE-N origin/main`.
- Ветка или каталог уже есть: CLAUDE.md, п. 2. Не перезаписывать и не сбрасывать.
- Все изменения — только в `.worktrees/ISSUE-N`. Чужие worktrees, ветки и stash не трогать, даже если они выглядят устаревшими.

## 4. Проверки, commit, push

- Проверки по AC; для кода — `npm run lint`, `npm run build` (включает `check:routes`), применимый Playwright: `npm run test:e2e:smoke` или `npm run test:e2e` (§16). Скрипта `npm test` в проекте нет.
- В сообщении каждого commit — маркер `#ISSUE-N`. Push: `git push -u origin ISSUE-N`. Force-push — только по явному решению PO.
- Обязательные бинарные evidence загрузить в Drive до отчёта (skill `task-handoff`, шаги 3–5).

## 5. Комментарии в Issue и read-back

Промежуточный комментарий публикуется:
- при контрольном результате (preflight, готовый PR, пройденные проверки);
- при блокере или существенном отклонении;
- при Standard Track — на каждом этапе.

Финальный комментарий (§8) содержит: Issue, ветку, base/head SHA, PR, diff/файлы, AC (Passed / Failed / Not Verified / N/A с обоснованием), проверки, evidence, ограничения, блокеры, статус worktree.

Read-back каждого обязательного комментария:

```bash
URL=$(gh issue comment N --body-file report.md)
gh api repos/opengov-kz/www-opengov-kz/issues/comments/${URL##*issuecomment-} --jq .body > readback.md
# сравнить report.md и readback.md без учёта CRLF и хвостовых пробелов
```

Файл отчёта держать вне репозитория (scratchpad), в Git не коммитить (§8).

## 6. Завершение ветки (`superpowers:finishing-a-development-branch`)

Skill применяется только в рамках NR-04 §7.5:

| Шаг skill | В OpenGov.kz |
|---|---|
| Step 1 (тесты) | Проверки из раздела 4, а не `npm test` |
| Option 1 (локальный merge) | Не применяется. Merge — только через PR и Release Gate |
| Option 2 (push + PR) | Штатное завершение, если PR разрешён. Иначе push и отчёт |
| Option 3 (оставить как есть) | Пауза, сдачей не считается |
| Discard | Только по решению PO. `git branch -d` и `git branch -D` не применять |
| Step 6 (очистка) | По разделу 7 этого skill |

Совместимость: зафиксированный SHA-256 активного `finishing-a-development-branch/SKILL.md` — `8db5a922b242dd4e1bf824cb91c13b3e8d8e8a86d6ceaf7f0774eb9cce909d65` (Issue #34). При другом SHA-256 перечитать skill и сверить поведение с этой таблицей. Изменение SHA само по себе не блокирует задачу (§7.5). При конфликте остановить затронутую операцию, сообщить в Issue и провести Impact Review.

## 7. Очистка worktree

Когда выполнять (§7.3):
- **PR создан** — worktree сохраняется до merge. Очистка — после успешной Post-Merge Verification, результат публикуется отдельным комментарием;
- **PR закрыт без merge** — очистка только после фиксации причины и решения PO;
- **PR не создаётся** — очистка до итогового отчёта.

Проверки перед удалением. `git worktree remove` без `--force` молча удаляет ignored-файлы, поэтому их проверка обязательна:

```bash
git -C .worktrees/ISSUE-N status --short                 # незакоммиченное
git -C .worktrees/ISSUE-N status --ignored --short       # ignored
git -C .worktrees/ISSUE-N log origin/ISSUE-N..ISSUE-N --oneline   # неотправленное
git -C .worktrees/ISSUE-N stash list
```

- `node_modules/` и `dist/` считать неуникальными только после проверки, что в них нет ручных изменений и секретов.
- `playwright-report/`, `test-results/`, скриншоты и логи — уникальные evidence, пока не доказано обратное. Обязательные загрузить в Drive с read-back до удаления.
- Остались уникальные данные, есть сомнения, push или загрузка не подтверждены — не удалять. Это блокер: опубликовать комментарий.

Удаление: из основной директории `git worktree remove .worktrees/ISSUE-N`, без `--force`. Ветку `ISSUE-N` (локальную и удалённую) не удалять. `git worktree prune` не запускать: он затрагивает чужие регистрации.

## 8. После закрытия Issue

Проверить `git worktree list`: `.worktrees/ISSUE-N` должна отсутствовать. Если она осталась — выполнить проверки раздела 7 и сообщить в Issue. Без проверки не удалять.
