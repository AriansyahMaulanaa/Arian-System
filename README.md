# Arian System landing page

Standalone static landing page for Arian System, located as a sibling of the Laravel repository at `D:\VScode\saas-landing-page`. The application repository is used only as a read-only product source; this project does not depend on Laravel, Vite, Alpine, or the SaaS runtime.

## Run locally

```text
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Structure

```text
index.html
css/style.css
js/main.js
assets/images/
assets/icons/
assets/fonts/
```

The page uses Inter from Google Fonts with a system fallback. The product showcase uses six user-owned Arian System screenshots covering OMS, POS/stok, finance, izin/cuti, payroll, and karyawan; the Laravel source remains untouched and no reference-site asset is copied.

## Visual system

- Reference-driven editorial hero with a minimal three-zone navigation, edge metadata, dominant display title, asymmetric supporting copy, capability index, and product marks.
- Section order follows the reference rhythm: introduction, ticker, about, projects, ticker, services, dark commercial block, overlap principle, process, experience, insights, FAQ reel, closing contact, footer.
- Product mockups are intentionally excluded from the hero and placed in a staggered 7-column showcase.
- Motion uses native CSS and a small dependency-free script: load reveal, viewport reveal, marquee, service activation, subtle pointer tilt, accessible process tabs, and FAQ accordion.

## Validation

- JavaScript syntax checked with `node --check`.
- All local HTML, CSS, and JavaScript endpoints return HTTP 200 through a local static server.
- Internal anchors and HTML IDs are checked for missing and duplicate targets.
- Responsive rules cover 320, 375, 390, 414, 768, 1024, 1280, 1440, and 1920px classes.
- `prefers-reduced-motion` disables continuous and transform-heavy motion.

## Product guardrails

- No public price was found, so pricing cards use conversation CTAs.
- No verified customer count, testimonials, ratings, or performance metrics were found, so none are claimed.
- Contact routing is intentionally an anchor placeholder until a public endpoint is chosen.
- The implementation uses no runtime dependency and honors `prefers-reduced-motion`.
