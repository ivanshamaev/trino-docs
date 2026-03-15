# Building Documentation Locally

To build the Trino documentation locally, follow these steps:

## Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Building

To build the documentation:

```bash
cd sphinx
sphinx-build -W --keep-going -b html . ../_build/html
```

The built documentation will be in `_build/html/`. Open `_build/html/index.html` in your browser to view it.

## Watch Mode (Optional)

For development, you can use `sphinx-autobuild` to automatically rebuild the documentation when files change:

```bash
pip install sphinx-autobuild
cd sphinx
sphinx-autobuild -b html . ../_build/html
```

This will start a local server at `http://127.0.0.1:8000`.

## Cleaning

To remove the build artifacts:

```bash
rm -rf _build/
```

## Deployment

The documentation is automatically deployed to GitHub Pages when you push to the `main` or `master` branch.
See `.github/workflows/deploy-docs.yml` for the deployment configuration.
