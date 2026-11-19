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

- Только новые файлы. Перезапись, удаление, переименование существующих файлов и изменение доступа — только по отдельному разрешению PO (NR-04 §6). Если имя занято, изменённый файл загрузить как `<имя>-v<K>.<расш>`, где K — номер новой версии манифеста (раздел 4).
- Загрузка: `create_file` с `disableConversionToGoogleType = true` и точным `contentMimeType`. `base64Content` — ссылка на файл `sha256:<hex>:<абсолютный путь>`. Ссылка работает только для файлов внутри рабочей директории; если она отклонена — передать base64 содержимого. Если не удалось ни то, ни другое — `Handoff Blocked`.
- Секреты, токены, `.env` и персональные данные не загружать.
- Предел размера base64-канала не проверен (NR-04 §18, ограничение CM-05). Если файл больше уже успешно проверенных размеров или загрузка не удалась — `Handoff Blocked` и предложить альтернативный канал с read-back. Локальный оригинал не удалять.

## 4. Manifest (версионируется, не перезаписывается)

Каждая передача, включая повторную в ту же Issue, создаёт **новый** файл `manifest-v<K>.json`. Имя `manifest.json` без версии не используется, существующие манифесты не изменяются.

1. Найти манифесты в папке: `search_files` с `parentId = '<папка Issue-N>' and title contains 'manifest-v' and trashed = false`.
2. K = максимальный номер + 1; если манифестов нет, K = 1. Два файла с одним номером или файл с именем не по шаблону `manifest-v<число>.json` — `Handoff Blocked`.
3. Манифест v<K> — **полный** список действующих входных файлов. Неизменённые файлы прошлой версии переносятся по их `drive_id` без повторной загрузки, после проверки `get_file_metadata`. Изменённые загружаются по правилу раздела 3. Исключённые просто не включаются: файлы в Drive остаются.
4. `supersedes` — Drive ID предыдущего манифеста (`null` для v1).
5. Загрузить как `application/json` с `disableConversionToGoogleType = true`. SHA-256 считать от тех же байтов, что отправлены.

```json
{
  "issue": "https://github.com/opengov-kz/www-opengov-kz/issues/N",
  "version": 2,
  "supersedes": "<Drive ID manifest-v1.json>",
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
2. Для критичных файлов и манифеста: `download_file_content` (содержимое сохраняется в локальный файл, путь — в ответе), `sha256sum` этого файла сверить со значением в манифесте; для самого манифеста — со значением, которое пойдёт в `Handoff-Manifest`.
3. Повторить поиск из раздела 4, шаг 1: новее v<K> манифестов быть не должно, файл v<K> должен быть один.

Любое расхождение означает `Handoff Blocked`.

## 6. Комментарий в Issue: единственный указатель на актуальный манифест

Комментарий начинается двумя служебными строками без отступа и без `>`:

```
Handoff-Status: Ready
Handoff-Manifest: <Drive ID manifest-v<K>.json> v<K> sha256:<64 hex манифеста>
```

- Служебные строки действуют только в самом начале комментария: первая — `Handoff-Status`, при `Ready` вторая — `Handoff-Manifest`. В других комментариях и в любом другом месте их не повторять даже в блоке кода; примеры давать только inline-кодом внутри предложения. Иначе действующий комментарий станет `blocked`, а пример в начале чужого комментария — ложной передачей.
- При блокировке — одна строка `Handoff-Status: Blocked`, без `Handoff-Manifest`.
- В одном комментарии — ровно одна строка `Handoff-Status`; при `Ready` — ровно одна строка `Handoff-Manifest`.
- Ниже: ссылка на папку и манифест, таблица файлов (имя, размер, сокращённый SHA-256, результат read-back), причины блокировки.

Действующим считается **последний** комментарий Issue со строкой `Handoff-Status` (раздел 2 skill `task-lifecycle`). Повторная передача отменяет предыдущую, только когда её `Ready`-комментарий опубликован и прошёл read-back. До этого действует прежний `Ready`. Если повторная передача не удалась — опубликовать `Handoff-Status: Blocked`.

Публикация и read-back — процедурой из skill `task-lifecycle`, раздел 5. Если read-back не пройден — передача не состоялась: опубликовать `Handoff-Status: Blocked` с причиной. Если публикация в GitHub недоступна, передать текст пользователю и не утверждать, что комментарий опубликован (CLAUDE.md, п. 7).

Пилотные измерения (#34, AC-07): записать в комментарий время от получения задания до `Handoff Ready` и число дополнительных организационных вопросов пользователю.
