# Product understanding report

Source: read-only inspection of the sibling Laravel repository `ArianHR`. The standalone landing source is outside that Git root.

## Product identity

- Name: Arian System
- Type: web-based all-in-one operational management platform
- Industry: UMKM / retail and operational businesses
- Primary users: owners and operational managers, HR/admin, supervisors, cashiers, directors, and employees
- Roles found in seed/config: `super_admin`, `admin_hr`, `manager`, `SPV`, `kasir`, `direktur`, `karyawan`

## Core problem

The application addresses fragmented operational work: attendance and employee administration, point-of-sale activity, stock movement, purchasing, cash and accounting records, approvals, and performance tracking otherwise require disconnected workflows and manual reconciliation.

## Core solution

Arian System brings those workflows into one role-aware workspace. The source shows OMS/HR and POS modes, outlet/branch scope, dashboards and reports, approval flows, notifications, append-only audit logging, offline/PWA support, and synchronization services.

## Verified feature set used in the page

| Feature | Source evidence | Landing-page angle |
| --- | --- | --- |
| OMS / HR | employee, attendance, leave, overtime, shift, payroll, THR, compensation controllers and views | Organize people and daily operations |
| POS | product catalog, barcode scan, cart, shifts, pending transactions, cash/debit/QRIS payment flow, receipt printing | Keep checkout fast and traceable |
| Inventory | master products, stock, stock mutations, low-stock checks, stock opname, goods receipt | See stock before it interrupts sales |
| Procurement | supplier and purchase order modules | Connect incoming goods to operations |
| Finance | cash bank, journals, ledger, invoices, payable/receivable, petty cash, reimbursement, cash advance, payment request, reports | Keep financial context close to activity |
| Control | Spatie permissions/RBAC, branch scope, approval PIN, stock adjustment approval, POS fraud review | Make sensitive decisions reviewable |
| Audit | append-only `AuditLog`, activity filters, user/action/module/IP/device/GPS fields | Give changes a durable trail |
| KPI / sales | targets, periods, components, scores, sales reports and dashboard APIs | Turn operational data into reviewable signals |
| Notifications / PWA | in-app notifications, low-stock/pending alerts, service worker, offline state, synchronization module | Support teams beyond a single desktop session |

## Differentiators grounded in source

- POS cancellation and sensitive stock adjustment flows include Leader/SPV approval and PIN verification.
- Audit logs are guarded against update and delete at the model level.
- Role and branch/outlet scope are applied to operational access.
- Pending transactions, low-stock alerts, approval states, and fraud-review views are first-class workflows.
- Payroll processing is designed around queued work; dashboard and KPI aggregation use caching per the project documentation.

## Information gap — do not invent

- Annual pricing, discounts, payment methods, trial policy, billing lifecycle, upgrade behavior, or Enterprise price: not confirmed.
- Verified customer names, testimonials, ratings, or case studies: not found.
- Customer count, revenue lift, conversion rate, uptime, or other business metrics: not found.
- Public demo URL or contact endpoint: not found.
- Formal security/compliance certification claims: not found.

## Commercial facts supplied by the product owner

These facts were supplied directly for the SaaS landing page on 2026-08-30 and are separate from source-code evidence.

| Plan | Monthly price | Outlet limit | User limit | Positioning |
| --- | ---: | ---: | ---: | --- |
| Starter | Rp249.000 | 1 | 10 | One-outlet business organizing POS, stock, and team operations |
| Growth | Rp649.000 | 3 | 30 | Growing business adding purchasing, stock transfer, payroll, KPI, and approval |
| Scale | Rp1.799.000 | 10 | 100 | Multi-outlet operation requiring centralized finance, access control, audit, and consolidated reports |

Growth is the “Paling Populer” plan. A business above the Scale limits may discuss future needs, but no Enterprise price is published.

## Verified public application entry points

- Registration: `https://arianstars.web.id/register`
- Login: `https://arianstars.web.id/login`

The registration route is public. Organization creation, plan handoff, trial/payment, and onboarding behavior were not verified as part of the static landing-page implementation and must remain application concerns.

## Marketing direction

Primary value proposition: “Operasional bisnis lebih rapi karena aktivitas, transaksi, stok, tim, dan kontrol kerja terlihat dalam satu sistem.”

Emotional benefit: less uncertainty between the work happening in the field and the decisions made by the owner or manager.

Functional benefit: one role-aware surface for the operational records, approvals, alerts, and review trails that the application already supports.

## Reference audit summary

The reference page is a Framer agency/portfolio page whose actual rhythm is introduction, ticker, about, projects, ticker, services, pricing, overlapping statement/testimonial, process, experiences, latest insights, FAQ reel, closing contact, and footer. The introduction uses a minimal horizontal navigation, edge metadata, one dominant 174px desktop title, asymmetric supporting text, compact proof, a right-side capability list, and marks near the bottom—not a conventional two-column SaaS hero. Its responsive variants use desktop/tablet/mobile thresholds around 1200px and 810px, with a container near 1380px, 32px desktop gutters, and 24px/20px mobile gutters. Motion is primarily opacity plus translate/scale reveal, spring-like entrances, hover movement, continuous marquees, and interactive process pacing.

This project reconstructs that section sequence, spatial hierarchy, oversized typography, staggered showcase proportions, overlapping blocks, marquee, scroll reveal, hover, process tabs, and accordion behavior with new Arian System content and code. Product previews have been moved below the hero and recreated from verified modules. It does not copy the reference name, text, photographs, illustrations, logo, or hosted assets.
