# Arian System landing page

Standalone static marketing site for Arian System. The page positions Arian System as a web-based operational platform for Indonesian UMKM and retail, connecting POS, OMS, inventory, purchasing, people, payroll, finance, approval, and audit.

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
assets/icons/favicon.svg
robots.txt
sitemap.xml
```

## Product flow

The information architecture follows this order:

1. Hero and primary SaaS CTA
2. Connected operations value
3. POS and OMS relationship
4. Operational workflow
5. Role, approval, outlet, and audit control
6. Real product screenshots
7. Business growth path from one to multiple outlets
8. Product usage process
9. Monthly pricing
10. Product credibility, FAQ, and final CTA

## Commercial facts

- Starter: Rp249.000/month — 1 outlet, up to 10 users
- Growth: Rp649.000/month — up to 3 outlets, up to 30 users
- Scale: Rp1.799.000/month — up to 10 outlets, up to 100 users
- Growth is the most popular plan.
- No annual price, discount, trial, SLA, or Enterprise price is claimed.

## CTA routing

- Registration: `https://arianstars.web.id/register`
- Login: `https://arianstars.web.id/login`
- Organization creation, plan selection, billing, and onboarding remain application responsibilities; the static landing page contains no SaaS business logic.

## Visual system

- Existing editorial/technical identity retained: dark operational surfaces, assertive typography, cobalt accent, grid, monospace labels, restrained secondary colors, and minimal decoration.
- Existing CSS variables remain the single token source.
- Six user-owned Arian System screenshots are reused as product proof; optimized WebP derivatives are served while the original PNG files remain the source assets.
- Motion is dependency-free and respects `prefers-reduced-motion`.

## Validation expectations

- JavaScript syntax via `node --check js/main.js`
- Local endpoints and internal anchors
- W3C markup validation
- Desktop, tablet, and mobile browser checks
- Keyboard navigation, mobile-menu focus trap, FAQ, tabs, and reduced motion
- Console and network error inspection before deployment

## Product guardrails

- No customer logos, testimonials, user counts, revenue metrics, performance claims, awards, certifications, integrations, payment methods, uptime, or SLA are invented.
- Technical capabilities are presented as supporting evidence, not primary buyer messaging.
- `CNAME` currently names `arianstars.web.id`, while the marketing canonical remains the supplied GitHub Pages URL; hosting/domain architecture should be reviewed before changing canonical metadata.
