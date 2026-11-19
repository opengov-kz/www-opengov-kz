---
name: task-handoff
description: Use when a task for OpenGov.kz is handed to Claude Code (from ChatGPT, PO or chat) together with input files, screenshots or binaries, or when asked to prepare the Issue and Evidence/Issue-N folder for a task. Finds or creates the GitHub Issue and the Google Drive Evidence/Issue-N folder without duplicates, uploads inputs, writes a SHA-256 manifest, reads everything back and reports Handoff Ready or Handoff Blocked in the Issue.
---

# Task Handoff (OpenGov.kz)

Нормы — [NR-04 v2.3](https://app.notion.com/p/41d341823d5581a597cad2023822c254) §§3, 6, 7.3, 8; при расхождении действует NR-04. Этот skill задаёт только порядок действий и не расширяет полномочия.

Результат передачи — одно из двух значений в комментарии Issue:
- `Handoff Ready`: Issue и папка найдены или созданы, все входные файлы загружены, manifest создан, read-back пройден полностью;
- `Handoff Blocked`: любой шаг не выполнен или не подтверждён. Указать причину и что сохранено локально.

Это значения результата в комментарии, а не статусы Notion или GitHub (NR-04 §13). Без полного read-back `Ready` не объявлять.

## 1. Issue

1. Номер Issue указан — прочитать её: `gh issue view N --comments`. Проверить, что она открыта и относится к передаваемой задаче.
2. Номер не указан — Duplicate Check: `gh issue list --state all --search "<ключевые слова>"`.
3. Создавать новую Issue только при явном указании в задании («создать Issue») и если дубликатов нет. После `gh issue create` прочитать её обратно (`gh issue view`).
4. Изменять чужие Issues нельзя.

## 2. Папка Drive `Evidence/Issue-N/`

- Родитель `Evidence`: folder ID `1aFgaXfk3VF17-tUpxOTgXJfhDHNZopel` (внутри `OpenGov.kz`, `1R7jwicXo74pGRVhnX03t0j4hKNGg3qaV`).
- Поиск: `search_files` с `parentId = '1aFgaXfk3VF17-tUpxOTgXJfhDHNZopel' and title = 'Issue-N'`.
  - одна папка — использовать её;
  - больше одной — `Handoff Blocked`, ничего не создавать.
- Создавать папку, только если её нет: `create_file`, `contentMimeType = application/vnd.google-apps.folder`, `parentId` — Evidence. Затем `get_file_metadata` и проверить `parentId`, `title`, `trashed = false`.

## 3. Загрузка входных файлов

- Только новые файлы. Перезапись, удаление, переименование существующих файлов и изменение доступа — только по отдельному разрешению PO (NR-04 §6). Если имя занято, загрузить с суффиксом `-vN` и указать это в manifest.
- Загрузка: `create_file` с `disableConversionToGoogleType = true`, точным `contentMimeType` и `base64Content` в виде ссылки на файл `sha256:<hex>:<абсолютный путь>`. base64 вручную не набирать.
- Секреты, токены, `.env` и персональные данные не загружать.
- Предел размера base64-канала не проверен (NR-04 §18, ограничение CM-05). Если файл больше уже успешно проверенных размеров или загрузка не удалась — `Handoff Blocked` и предложить альтернативный канал с read-back. Локальный оригинал не удалять.

## 4. Manifest

`manifest.json` в той же папке: загрузить как `application/json` с `disableConversionToGoogleType = true`.

```json
{
  "issue": "https://github.com/opengov-kz/www-opengov-kz/issues/N",
  "created": "YYYY-MM-DDThh:mm:ssZ",
  "baseline": {"repo_sha": "<origin/main SHA, если относится>", "nr04": "v2.3"},
  "files": [
    {"name": "x.png", "drive_id": "…", "url": "https://drive.google.com/file/d/…/view",
     "mime": "image/png", "size": 12345, "sha256": "<hex>", "critical": true, "source": "откуда получен"}
  ]
}
```

- `sha256` обязателен для критичных файлов (входные данные, на которые опираются AC) и для набора в целом; для остальных — по возможности.
- Ссылки и версии внешних источников (Notion, Figma, URL) указываются в manifest, их копии в Drive не нужны.

## 5. Read-back

Для каждого загруженного файла и для manifest:
1. `get_file_metadata`: `parentId` = папка Issue-N, `title`, `mimeType`, размер, `trashed = false`.
2. Для критичных файлов и manifest: `download_file_content`, декодировать, посчитать SHA-256 и сверить с manifest.

Любое расхождение означает `Handoff Blocked`.

## 6. Комментарий в Issue

Опубликовать комментарий с итогом:
- `Handoff Ready` или `Handoff Blocked`;
- ссылка на папку и manifest;
- таблица файлов (имя, размер, SHA-256 сокращённо, результат read-back);
- причины блокировки.

Затем read-back комментария: `gh api repos/opengov-kz/www-opengov-kz/issues/comments/<id> --jq .body`, сверить с отправленным текстом. Если публикация недоступна — передать текст пользователю и не утверждать, что комментарий опубликован (CLAUDE.md, п. 7).

Пилотные измерения (#34, AC-07): записать в комментарий время от получения задания до `Handoff Ready` и число дополнительных организационных вопросов пользователю.
