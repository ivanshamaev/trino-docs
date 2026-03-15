# Trino Documentation

[GitHub Pages](https://ivanshamaev.github.io/trino-docs/).

## Локальная сборка

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

Сайт откроется по адресу http://127.0.0.1:8000

## Сборка статического сайта

```bash
mkdocs build
```

Результат будет в каталоге `site/`.

## Публикация на GitHub Pages

**Сначала один раз включите Pages в настройках репозитория**, иначе деплой из Actions вернёт 404:

1. Откройте **Settings → Pages**:  
   https://github.com/ivanshamaev/trino-docs/settings/pages
2. В блоке **Build and deployment** в поле **Source** выберите **GitHub Actions** (не «Deploy from a branch»).
3. Сохраните. После этого при пуше в `main` (или `master`) workflow соберёт сайт и опубликует его.

URL сайта: `https://ivanshamaev.github.io/trino-docs/`

### Ошибка «Failed to create deployment (status: 404)»

Она появляется, если в **Settings → Pages** не выбран источник **GitHub Actions**. Выберите его, сохраните настройки и заново запустите workflow (повторный пуш или **Actions → Deploy docs to GitHub Pages → Run workflow**).

## Примечание

Исходные файлы в `docs/` содержат директивы Sphinx (например, `{toctree}`). В MkDocs они отображаются как блоки кода. Навигация задаётся в `mkdocs.yml` в секции `nav`. Страницы из подкаталогов (`sql/`, `security/`, `udf/`, `release/` и др.) доступны по прямым ссылкам и через поиск.
