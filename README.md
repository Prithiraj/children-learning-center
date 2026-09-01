# I Love Children Learning Center website

Static, conversion-focused website for I Love Children Learning Center in Montclair, New Jersey.

## Branching

- `main`: protected production baseline; do not merge without approval.
- `development`: current implementation branch.

## Verified business data

Canonical business facts and research provenance are kept in `assets/data/business.json`. The HTML duplicates a small number of critical facts so the core experience remains useful without JavaScript.

## Runtime architecture

- semantic HTML
- CSS custom properties for reusable design tokens
- small ES modules by concern
- no runtime framework
- no Three.js dependency (explicitly disabled by approved design)
- no analytics or third-party form service

JavaScript modules:

- `business-status.js`
- `navigation.js`
- `tabs-filters.js`
- `image-fallbacks.js`
- `animations.js`
- `three.js`
- `app.js` orchestration and inquiry-email helper

## Demo imagery

All imagery under `assets/demo/` is a development-only placeholder and a production blocker. See `assets/demo/README.md` and `docs/RIGHTS.md`.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Validation

Run:

```bash
python scripts/validate.py
node --check js/app.js
node --check js/business-status.js
node --check js/navigation.js
node --check js/tabs-filters.js
node --check js/image-fallbacks.js
node --check js/animations.js
node --check js/three.js
```

The current validation report is in `docs/VALIDATION.md`.
