# GitHub Pages demo

The `development` branch is configured to deploy a review-only demonstration through `.github/workflows/pages-demo.yml`.

## Demo safeguards

- The deployed artifact is generated from `development`; `main` is not merged or changed for the demo.
- The deployed copy injects `noindex, nofollow, noarchive` into HTML pages.
- The deployed `robots.txt` disallows crawling.
- Demo-only illustrations under `assets/demo/` remain production launch blockers and must be replaced by rights-cleared, owner-controlled business photography before launch.

Expected project Pages URL after GitHub Pages is enabled for Actions:

`https://prithiraj.github.io/children-learning-center/`
