# Arian System landing page

Standalone static marketing site for Arian System. The site explains the operational product, planned local/cloud packages, and platform availability without implementing subscription or download backends.

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

## Page flow

1. Product introduction and primary navigation
2. Connected operations and POS/OMS explanation
3. Daily workflow and access controls
4. Product screenshots
5. Growth path from local single-outlet use to connected operations
6. Platform availability: Web, Windows, Linux, Android; macOS/iOS roadmap
7. Draft packages, billing-period switch, feature comparison, and add-on proposal
8. Product credibility and FAQ

## Subscription plan — planning draft only

These values were supplied during product planning. They are displayed with a clear draft disclaimer and are not an active offer or billing configuration.

| Package | Monthly draft | Annual draft | Outlets | Operational devices | Admin/operator accounts | Active employees |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Gratis | Rp0 | Rp0 | 1 | 1 | 1 | — |
| Dasar | Rp29.000 | Rp290.000 | 1 | 1 | 3 | — |
| Tumbuh | Rp79.000 | Rp790.000 | 1 | 1 | 10 | 30 |
| Business | Rp349.000 | Rp3.490.000 | 2 | 3 | 10 | 50 |
| Enterprise | Rp1.499.000 | Rp14.990.000 | 5 | 10 | 30 | 150 |

Annual draft amounts equal ten monthly payments and are shown as an upfront total. Add-on monthly draft amounts: one admin/operator account Rp10.000; one operational device Rp25.000; one outlet including two devices and five admin/operator accounts Rp99.000; 25 active employees with self-service access Rp50.000.

Package menus, technical quotas (products, suppliers, cloud attachments), offline licensing, employee self-service, and cloud capacity still require product/backend validation. Keep this disclaimer until the offer is approved and implemented end to end. Do not represent the registration CTA as plan selection or payment.

## Platform availability

- Web login links to `https://arianstars.web.id/login`.
- Windows and Linux download controls are deliberately disabled until official installer links and releases exist.
- Android's Google Play control is deliberately disabled until the official listing exists.
- macOS and iOS appear as future-platform labels without release dates.
- Do not add fake download URLs or imply offline behavior on every platform.

## CTA routing

- Registration: `https://arianstars.web.id/register`
- Login / Web access: `https://arianstars.web.id/login`
- Organization creation, plan selection, subscription billing, downloads, and onboarding remain application/release responsibilities. The static landing page does not implement these backends.

## Visual and interaction system

- Preserve the editorial identity: paper surfaces, large black typography, blue accents/glows, dark contrast sections, fine rules, and restrained motion.
- Existing CSS variables remain the token source.
- User-owned Arian System product screenshots are reused; optimized WebP derivatives remain the display assets.
- The pricing period switch is dependency-free and updates card prices accessibly.
- Navigation, FAQ, tabs, and reduced-motion behavior are dependency-free.

## Validation expectations

- JavaScript syntax: `node --check js/main.js`
- HTML parsing, local assets, internal anchors, and plan copy consistency
- Desktop, tablet, and mobile browser review
- Keyboard/focus navigation, billing switch, mobile menu, tabs, FAQ, and reduced motion
- Browser console/network error inspection before deployment

## Product guardrails

- Draft prices and feature/limit matrices must not be described as active subscriptions until backend entitlements, billing, support terms, tax treatment, and capacity are verified.
- Do not invent customer logos, testimonials, customer counts, revenue or performance claims, certifications, integrations, payment methods, uptime, or SLA.
- No dates are promised for Windows/Linux/Android release or macOS/iOS availability.
- `CNAME` currently names `arianstars.web.id`, while the marketing canonical points to the supplied GitHub Pages URL. Review hosting/domain architecture before changing either.
