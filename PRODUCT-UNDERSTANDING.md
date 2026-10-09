# Product understanding report

Source: read-only inspection of the sibling Laravel repository `ArianHR`, the Arian System landing-page source, and product-owner planning in this conversation. The standalone landing source is outside that Laravel Git root.

## Product identity and audience

- Current page brand: Arian System. A possible future brand change is not confirmed and is not applied here.
- Product direction: operational management for Indonesian small businesses, retail, and multi-outlet operators.
- Main work areas: POS, stock, purchasing, employees, attendance, payroll, finance, approvals, and audit.
- Roles found in application seed/config include owner/admin, HR, manager/supervisor, cashier, director, and employee.

## Product capabilities verified in the sibling application source

| Area | Source evidence | User-facing value |
| --- | --- | --- |
| POS | Product catalog, barcode scan, cart, shifts, pending transactions, payment flow, and receipt printing | Record sales and cashier activity |
| Inventory | Product master, stock movements, low-stock checks, opname, and goods receipts | Review stock and incoming goods |
| Procurement | Supplier and purchase-order modules | Record purchasing work |
| HR | Employee, attendance, leave, overtime, shift, payroll, and compensation modules | Coordinate team administration |
| Finance | Cash/bank, journals, ledger, invoices, receivables/payables, petty cash, reimbursements, and reports | Keep financial records near operations |
| Operational control | Role/permission checks, outlet scope, approval PIN, stock-adjustment approval, POS cancellation rules | Restrict sensitive actions and route approvals |
| Audit and monitoring | Audit records, fraud review, alerts, notifications, KPI and sales reports | Review operational events and decisions |
| Offline/sync foundations | Local-first repositories, offline state, signed entitlement objects, device/cloud policy, and sync transports | Technical foundation for local and connected workflows |

These source capabilities do **not** prove that every feature is ready for every public plan, platform, or role. Menu gating and package entitlements must be checked against the application before the plan matrix is treated as an offer.

## Commercial package proposal — not final

Product-owner planning proposes five packages, with data stored on-device for the first three and online synchronization for Business/Enterprise. The landing displays only draft prices and simple shop/device summaries; detailed account, employee, catalog, supplier, and storage limits are omitted while they remain unverified. The device cap is a single organization-wide total across branches and roles, including employee phones used to sign in for attendance.

| Package | Monthly draft | Annual draft | Shops/branches | Maximum devices (all roles) |
| --- | ---: | ---: | ---: | ---: |
| Gratis | Rp0 | Rp0 | 1 shop | 1 |
| Dasar | Rp29.000 | Rp290.000 | 1 shop | 1 |
| Tumbuh | Rp79.000 | Rp790.000 | 1 shop | 1 |
| Business | Rp349.000 | Rp3.490.000 | 2 shops | 3 |
| Enterprise | Rp1.499.000 | Rp14.990.000 | 5 branches | 10 |

The annual draft equals ten monthly payments and is an upfront total. The device cap is shared by all users in the organization, regardless of role; an employee's attendance phone counts as a device. No add-on rates are published; special requirements should be discussed with an admin rather than shown as fixed prices.

Product-menu assignment, account and employee limits, product/supplier capacities, cloud storage quotas, employee self-service permissions, offline license refresh/grace behavior, backup and retention terms, tax treatment, support boundaries, and cloud-load limits remain to be validated. The static registration link does not select a plan or accept payment. Do not claim these as released subscription capabilities.

## Competitor pricing snapshot reviewed for planning

- Olsera's official pricing page displayed Basic at Rp1.288.000/year, Premium at Rp1.988.000/year, and Pro at Rp2.688.000/year alongside higher reference prices. The page states prices exclude VAT; these are annual prices and do not establish equivalent monthly or multi-outlet terms. Source: https://www.olsera.com/id/pricing
- Mekari Talenta's official pricing page presents Essential, Plus, and Talenta 360 but directs prospects to WhatsApp sales instead of publishing a public price. A matching quote by employee count and scope is required before price comparison. Source: https://www.talenta.co/harga/
- This snapshot is a planning reference, not a full competitor survey or proof that Arian is cheaper/equivalent.

## Platform and release direction

- Web login currently routes to `https://arianstars.web.id/login`.
- Product-owner target platforms: Web, Windows, Linux, and Android. Windows/Linux downloads and the Android Google Play destination are design placeholders until real releases/listing URLs exist.
- macOS and iOS are future possibilities with no promised release dates. App Store costs were discussed as a product constraint; they are not exposed as a customer-facing claim.
- Do not present Windows/Linux/Android download controls as active, invent store URLs, or claim offline behavior uniformly across platforms.

## Verified public application entry points

- Registration: `https://arianstars.web.id/register`
- Login: `https://arianstars.web.id/login`

Organization creation, plan selection, billing, trials, upgrade/downgrade, downloads, and onboarding are application responsibilities and were not implemented by this static landing page.

## Landing-page direction

- Keep the existing editorial design: paper-gray surfaces, large black typography, blue accents, dark contrast areas, thin rules, restrained motion, and product screenshots.
- Make the value proposition and local-vs-cloud distinction immediately understandable.
- Use Indonesian for navigation, package descriptions, platform status, and the primary user explanation; retain familiar product terms where useful.
- Show draft monthly/annual prices, shop/device counts, and the local-versus-online difference in plain language; do not expose unverified account/employee caps or fixed add-on prices.
- Keep disabled platform controls genuinely disabled until release assets/listing destinations exist.

## Information not verified

- Final prices, tax status, billing lifecycle, trial policy, annual renewal terms, refunds, and plan activation.
- Final plan feature gating, device/account enforcement, add-on implementation, cloud capacity, offline licensing period, retention, backup guarantees, and support SLA.
- Official Windows/Linux release links, Android Play listing, and macOS/iOS release dates.
- Customer references, case studies, ratings, customer counts, revenue outcomes, uptime, security certifications, or quantified performance claims.
