# Trino Documentation

Документация Trino, собранная с [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

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

1. В настройках репозитория: **Settings → Pages**
2. В разделе **Build and deployment** выберите **Source**: **GitHub Actions**
3. При пуше в ветку `main` (или `master`) workflow `.github/workflows/deploy.yml` соберёт сайт и опубликует его на GitHub Pages.

URL сайта: `https://<username>.github.io/<repo>/` (для организации: `https://<org>.github.io/<repo>/`).

## Примечание

Исходные файлы в `docs/` содержат директивы Sphinx (например, `{toctree}`). В MkDocs они отображаются как блоки кода. Навигация задаётся в `mkdocs.yml` в секции `nav`. Страницы из подкаталогов (`sql/`, `security/`, `udf/`, `release/` и др.) доступны по прямым ссылкам и через поиск.
