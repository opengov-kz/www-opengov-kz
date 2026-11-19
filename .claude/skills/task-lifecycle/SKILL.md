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

Актуальный манифест определяется **только** по последнему комментарию Issue со строкой `Handoff-Status` (skill `task-handoff`, раздел 6). Искать «последний файл в папке» или `manifest.json` нельзя.

```bash
F=$(cat <<'EOF'
[.[] | select(.body | test("(?m)^Handoff-Status: (Ready|Blocked)[[:space:]]*$"))] as $h
| if ($h | length) == 0 then {state: "none"}
  else ($h | last) as $c
  | [$c.body | scan("(?m)^Handoff-Status: (Ready|Blocked)[[:space:]]*$")] as $s
  | [$c.body | scan("(?m)^Handoff-Manifest: ([A-Za-z0-9_-]+) v([0-9]+) sha256:([0-9a-f]{64})[[:space:]]*$")] as $m
  | [$h[] | select(.body | test("(?m)^Handoff-Status: Ready[[:space:]]*$")) | .body
     | scan("(?m)^Handoff-Manifest: [A-Za-z0-9_-]+ v([0-9]+) ")[0] | tonumber] as $vers
  | if ($s | length) != 1 then {state: "blocked", reason: "статус в комментарии не один", url: $c.url}
    elif $s[0][0] == "Blocked" then {state: "blocked", reason: "последний статус Blocked", url: $c.url}
    elif ($m | length) != 1 then {state: "blocked", reason: "строк Handoff-Manifest не одна", url: $c.url}
    elif ($m[0][1] | tonumber) != ($vers | max) then {state: "blocked", reason: "версия ниже ранее объявленной", url: $c.url}
    else {state: "ready", url: $c.url, drive_id: $m[0][0], version: ($m[0][1] | tonumber), sha256: $m[0][2]} end
  end
EOF
)
gh issue view N --json comments --jq ".comments | $F"
```

Фильтр использует `[[:space:]]`, а не `\s`: Git Bash схлопывает `\\` в аргументах `gh`.

- `none` — передачи не было. Если входные файлы нужны — применить skill `task-handoff`.
- `blocked` — блокер. Опубликовать промежуточный комментарий с причиной и `url`; входные файлы не использовать.
- `ready`:
  1. Скачать манифест строго по `drive_id` (`download_file_content`). `sha256sum` должен совпасть с `sha256`, в JSON — `version` и `issue`.
  2. Проверить папку `Evidence/Issue-N/` (`title contains 'manifest-v'`): манифеста новее `version` быть не должно. Если он есть — передача не завершена или не подтверждена: `Handoff Blocked`.
  3. Скачать критичные файлы по их `drive_id` из манифеста и сверить SHA-256 и размер.

Любое расхождение — `Handoff Blocked`: промежуточный комментарий с `Handoff-Status: Blocked` и причиной. Работа с этими входными данными останавливается.

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

Публикация и read-back каждого обязательного комментария (одна команда Bash):

```bash
REPORT=/путь/к/report.md   # вне репозитория (scratchpad), в Git не коммитить (§8)
norm() { tr -d '\r' | sed -e 's/[[:space:]]*$//' | awk 'NF{p=1} p' | sed -e :a -e '/^\n*$/{$d;N;ba' -e '}'; }
URL=$(gh issue comment N --body-file "$REPORT"); ID=${URL##*issuecomment-}
case $ID in ''|*[!0-9]*) echo "PUBLISH FAILED: '$URL'";; *)
  A=$(norm < "$REPORT" | sha256sum | cut -c1-64)
  B=$(gh api "repos/opengov-kz/www-opengov-kz/issues/comments/$ID" --jq .body | norm | sha256sum | cut -c1-64)
  [ "$A" = "$B" ] && echo "READ-BACK OK $URL" || echo "READ-BACK FAILED $URL";; esac
```

- Сравнение идёт без учёта CRLF, хвостовых пробелов и пустых строк в начале и конце.
- `READ-BACK OK` — публикация подтверждена.
- `PUBLISH FAILED` — комментарий не создан: не повторять вслепую, сначала `gh issue view N --comments`, чтобы не создать дубль.
- `READ-BACK FAILED` — текст в GitHub отличается: сообщить и не считать отчёт опубликованным.

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
