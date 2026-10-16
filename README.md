# Arian System landing page

Standalone static marketing site for Arian System. The site explains the operational product, planned local/cloud packages, and platform availability without implementing subscription or download backends. Positioning is OMS-led: the OMS is presented as the core, POS appears as an optional module for companies that also sell directly, and copy uses generic company/location terms.

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
assets/icons/ (favicon.svg + platform logos: web, windows, linux, android, apple)
robots.txt
sitemap.xml
```

## Page flow

1. Hero: product introduction with the OMS dashboard screenshot and annotation chips
2. Product screenshots: six module screens
3. Operations overview: value points and a single OMS panel with a numbered module list, plus a slim optional POS strip
4. Workflow and access controls: daily flow steps and control points
5. Platform availability: Web (active), Windows, Linux, Android (preparing); macOS/iOS upcoming cards
6. Getting started: prepare, run, monitor, control tabs
7. Pricing: local and online groups, growth strip, billing-period switch, and admin contact for special requirements
8. FAQ and footer

## Subscription plan — planning draft only

The table below reflects the prices and device limits currently shown on the landing page. This static site links to account registration but does not process package selection or payments.

| Package | Monthly draft | Annual draft | Locations/branches | Maximum devices (all roles) |
| --- | ---: | ---: | ---: | ---: |
| Gratis | Rp0 | Rp0 | 1 location | 1 |
| Dasar | Rp29.000 | Rp290.000 | 1 location | 1 |
| Tumbuh | Rp79.000 | Rp790.000 | 1 location | 1 |
| Business | Rp349.000 | Rp3.490.000 | 2 locations | 3 |
| Enterprise | Rp1.499.000 | Rp14.990.000 | 5 branches | 10 |

Annual draft amounts equal ten monthly payments and are shown as an upfront total. Device limits are one total per organization, across its branches and all roles; employee phones used to sign in for attendance count toward the same limit. Prices and package contents remain drafts. Account/employee caps, technical quotas, and add-on prices are not displayed while product and service capacity is still being validated. Special requirements should be discussed with an admin rather than presented as fixed add-on prices.

## Platform availability

- Web login links to `https://arianstars.web.id/login`.
- Platform cards show monochrome OS logos (globe, Windows, Tux, Android, Apple) from `assets/icons/`.
- Windows and Linux download controls are deliberately disabled until official installer links and releases exist.
- Android's Google Play control is deliberately disabled until the official listing exists.
- macOS and iOS appear as Apple-mark cards with a "Segera hadir" status and disabled actions; no release dates.
- Do not add fake download URLs or imply offline behavior on every platform.

## CTA routing

- Registration: `https://arianstars.web.id/register`
- Login / Web access: `https://arianstars.web.id/login`
- Organization creation, plan selection, subscription billing, downloads, and onboarding remain application/release responsibilities. The static landing page does not implement these backends.

## Visual and interaction system

- Editorial identity kept: warm paper surfaces, white cards with firm hairline borders, ink typography, blue as a functional accent, restrained motion, and product screenshots as the primary visual.
- Status pills carry functional tints: green for available, pale blue for preparing, neutral outline for upcoming.
- The hero shows the product first: OMS dashboard in a frame with annotation chips; no background glow effects.
- Existing CSS variables remain the token source. Body copy is 14-16px; display type uses sentence case; contrast targets 4.5:1 for body text.
- User-owned Arian System product screenshots are reused; optimized WebP derivatives remain the display assets.
- Pricing is grouped into local (on-device data) and online (synchronized data); the period switch is dependency-free and updates card prices accessibly.
- Navigation, FAQ, tabs, and reduced-motion behavior are dependency-free.

## Validation expectations

- JavaScript syntax: `node --check js/main.js`
- HTML parsing, local assets, internal anchors, and plan copy consistency
- Desktop, tablet, and mobile browser review
- Keyboard/focus navigation, billing switch, mobile menu, tabs, FAQ, and reduced motion
- Browser console/network error inspection before deployment

## Product guardrails

- Positioning is OMS-led; POS is an optional module. Page copy uses generic company/location terms and must not claim export-specific features (multi-currency, export documentation, batch/lot, multi-warehouse) until they are verified in the application.
- Draft prices and feature/limit matrices must not be described as active subscriptions until backend entitlements, billing, support terms, tax treatment, and capacity are verified.
- Do not invent customer logos, testimonials, customer counts, revenue or performance claims, certifications, integrations, payment methods, uptime, or SLA.
- No dates are promised for Windows/Linux/Android release or macOS/iOS availability.
- The landing page is served from the GitHub Pages URL (`https://ariansyahmaulanaa.github.io/Arian-System/`); `arianstars.web.id` belongs to a separate site and must not be claimed by this repository via a CNAME file.
