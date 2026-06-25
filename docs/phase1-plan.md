# Phase 1 Plan — Back-Office Automation (Proposal)

*For approval before any building begins. Once approved, this is the task list a Claude Code session executes.*

---

## What Phase 1 achieves

Remove the parts of your daily warehouse grind that don't need you: re-typing customisations, building order sheets by hand, formatting/printing sheets, sending payment instructions, and chasing abandoned checkouts. Target **~2–3 weeks**. **Everything here works on Shopify Basic — no plan upgrade needed** (the plan question only comes up in Phase 2 for live DHL rates). **No customer-facing AI in this phase** — the only automated customer emails are a standard payment-instructions message and an abandoned-cart nudge, both of which you approve before they switch on.

## How to read each item

> **Replaces** what manual step · **Build** how/where it's built · **Need from you** · **Approval/stays manual** · **Done when** (acceptance test).

---

## The build — 6 work items

### 1. Capture customisations at checkout — *(replaces workflows 16, 17)*
- **Replaces:** your team re-typing DM/WhatsApp/note customisations onto Shopify order notes after each order.
- **Build:** a Shopify **product-options app** (I'll shortlist Globo Product Options and Infinite Options) adding per-product fields — size/length/sleeve as fixed choices plus a free-text "Special requests" box — captured on the product page so they save **on the order automatically** as line-item properties. Free fallback: the theme's native cart-note field for free text. For custom work that needs an upcharge, use Shopify **Draft Orders** to send a separate invoice.
- **Need from you:** which app you prefer; the exact customisation options you offer and which ever require an upcharge; confirmation of your size chart.
- **Approval/stays manual:** installing/configuring the app and any product-page change goes live only with your OK (tested on a duplicate product first). Sending a custom-work invoice = your approval (it's a customer message).
- **Done when:** a test order with a customisation shows that customisation on the order automatically — nobody re-types it.

### 2. Auto order sheet: Shopify → Google Sheet — *(replaces workflow 16)*
- **Replaces:** exporting from Shopify and typing the production sheet by hand.
- **Build:** a **Make.com** scenario — trigger on a new paid Shopify order → add a row to a "Daily Orders" Google Sheet (order no., date, article, size, customisation from item 1, quantity, status). Your production manager works from this live sheet; optional Apps Script buttons to mark items *in production / done*.
- **Need from you:** a Google account + a blank Sheet (or I create one); a Make.com account; the Shopify API token (see checklist); the exact columns your production team wants.
- **Approval/stays manual:** internal only, nothing customer-facing. Run the scenario manually first, then switch the schedule on once verified.
- **Done when:** a new paid order appears as a correctly filled row within minutes, with no typing.

### 3. Branded order / packing / delivery sheets — *(replaces workflows 18, 19)*
- **Replaces:** printing final order sheets and building delivery sheets by hand.
- **Build:** **Order Printer Pro** with two branded templates — a production/packing slip (article, size, customisation, order no.) and a delivery sheet (name, address, contact, email, article, order no.). One-click PDF per order or in bulk.
- **Need from you:** your logo + any layout preference; confirmation of the fields on each sheet.
- **Approval/stays manual:** installing the app needs your OK; printing is on-demand by the team.
- **Done when:** a team member generates a branded packing + delivery PDF for any order in one click.

### 4. Pricing calculator + bulk listing updates — *(replaces workflows 4, 5, 13)*
- **Replaces:** costing/pricing by hand in Excel, writing article details, and updating prices on Shopify one by one.
- **Build:** a **Google Sheet pricing calculator** (fabric + labour + overhead + margin → local price *and* a DHL-inclusive suggested international price); an **AI-assisted product-description** generator from a short spec (Shopify Magic or the repo); and a **reviewed bulk update** to Shopify — dry-run to a sheet → you approve → apply via the bulk editor or a gated `write_products` script.
- **Need from you:** your current cost-plus formula + a sample of recent article costs (**anonymised — no customer data**); your DHL per-kg figures.
- **Approval/stays manual:** any price change going live = your approval; bulk updates are always dry-run first.
- **Done when:** entering an article's costs gives a price instantly, and a batch of prices can be reviewed and pushed after your sign-off.

### 5. Automated bank / Western-Union instructions — *(replaces workflow 21)*
- **Replaces:** manually sending bank/WU details to customers who pick those methods.
- **Build:** Shopify **custom manual payment methods** ("Bank transfer", "Western Union") so instructions display automatically at checkout and on the confirmation page, **plus** an automated email sending the full details when that method is chosen.
- **Need from you:** your bank account details and Western Union details, worded exactly as customers should see them.
- **Approval/stays manual:** this email goes to real customers automatically — you approve the wording and that it's switched on; after that it runs. **Confirming the payment actually landed before dispatch stays a human step** (auto-reconciliation is Phase 4).
- **Done when:** a customer choosing bank transfer/WU automatically sees and is emailed the correct details — no manual send.

### 6. Abandoned-checkout recovery — *(replaces workflow 25)*
- **Replaces:** fully manual abandoned-checkout follow-up.
- **Build:** turn on Shopify's **native abandoned-checkout automation** (free) with a branded recovery email. I draft the copy and timing; you approve. (A WhatsApp nudge can be added in Phase 4.)
- **Need from you:** approve the email copy + cadence; confirm your brand voice.
- **Approval/stays manual:** customer-facing — you approve copy + activation, then it auto-sends (standard ecommerce practice).
- **Done when:** an abandoned checkout triggers your approved recovery email automatically.

---

## Build sequence & dependencies

1. Items **1 → 2 → 3** are a chain: capture feeds the order sheet, which feeds the printables — build in that order.
2. Items **4, 5, 6** are independent and can run in parallel.

Rough schedule: **Week 1** items 1–2 + start 4 · **Week 2** items 3, 5, 6 · **Week 3** test end-to-end, write the one-page SOPs, hand to the team.

## What I need from you to start

- [ ] **Shopify custom app** with an Admin API access token. Scopes: `read_orders`, `read_products` (core), plus `write_products` for bulk updates (used only behind your approval). *(In Settings → Apps and sales channels → Develop apps; Claude will walk your team through the exact clicks when you move to code.)*
- [ ] A **Google account** + a blank Google Sheet (or let Claude create one), and a **Make.com** account.
- [ ] Your pick of **product-options app** (or let me choose after a quick comparison).
- [ ] Your **cost-plus pricing formula** + a sample of recent article costs (anonymised).
- [ ] Your **DHL per-kg** figures.
- [ ] Your **bank + Western Union** payment details text.
- [ ] **2–3 anonymised past orders** that had customisations, so I can model the sheet columns and templates.

## Human-approval gates in this phase

Installing/changing apps on the live store · any price change going live · activating the two customer emails (payment instructions, abandoned-cart) · sending any custom-work invoice. Everything else (internal sheets, calculators, templates, dry-runs) proceeds once you've approved this plan.

## Risks & rollback

- **Options app** alters product pages → test on a duplicate product, approve, then roll out.
- **Bulk price update** → dry-run to a sheet for review; Shopify keeps a CSV you can re-import to revert.
- **Make scenario** → manual runs first, schedule on only after it's verified.

## Definition of done for Phase 1

All six items live, each with a one-page plain-language SOP, and your production manager's order sheet updating automatically from Shopify.

## What comes next

**Phase 2 — Shipping & tracking:** one courier app for Leopards/DHL/etc. with tracking written back to Shopify so customers are emailed automatically, plus weight-based shipping zones. *The Shopify plan decision (for live DHL rates) comes up here, not now.*
