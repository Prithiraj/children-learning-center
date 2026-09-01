# Validation report

Validated on 2026-09-01 against the `development` implementation.

## Static validation

- HTML structure: **pass**
- One `h1` on home page: **pass**
- Meta description: **pass**
- JSON-LD present: **pass**
- Open Graph title/description: **pass**
- Internal anchors: **pass**
- Duplicate IDs: **pass**
- Image alt attributes: **pass**
- Form-label basics: **pass**
- Button accessible-name basics: **pass**
- CSS parsing with `tinycss2`: **pass**
- Reusable CSS custom properties: **pass**
- `:focus-visible` styling: **pass**
- `prefers-reduced-motion` rules: **pass**
- Local asset existence: **pass**
- Demo-asset provenance markers: **pass**
- Verified-fact guard for license/address/phone/age/capacity: **pass**

## JavaScript syntax

`node --check` passes for:

- `js/app.js`
- `js/business-status.js`
- `js/navigation.js`
- `js/tabs-filters.js`
- `js/image-fallbacks.js`
- `js/animations.js`
- `js/three.js`

## Browser behavior checks

Chromium headless checks:

- mobile navigation open / Escape close: **pass**
- gallery filter state and visibility: **pass**
- image-error fallback swap: **pass**
- business open/closed status logic with canonical business data: **pass**
- Three.js concern boundary returns no-op and loads no Three.js dependency: **pass**
- reduced-motion mode exposes content without reveal motion and disables smooth scrolling: **pass**

## Responsive layout checks

Rendered at:

- desktop: **1440 × 1100**, no horizontal overflow
- mobile: **390 × 844**, no horizontal overflow

Screenshots:

- `docs/screenshots/desktop.jpg`
- `docs/screenshots/mobile.jpg`

## Known launch blockers

1. All files under `assets/demo/` that appear as hero/gallery imagery must be replaced with rights-cleared, owner-controlled business photography.
2. The final deployment hostname is not known. Relative canonical/OG/sitemap paths should be converted to the production absolute URL during deployment QA.
3. The static inquiry helper currently opens the visitor's email application. If a hosted form endpoint is added, privacy copy and security/data handling must be reviewed.
4. Social links remain intentionally absent until official accounts are verified.
5. Any additional programs, current availability, tuition, transportation, meals, subsidies, or other policies must be owner-confirmed before publication.
