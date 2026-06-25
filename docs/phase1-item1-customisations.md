# Phase 1 · Item 1 — Capture customisations at checkout

**Replaces:** the team re-typing size/customisation details (from DM/WhatsApp/notes) onto
Shopify order notes after each order.

**Goal:** the customer enters their size + customisation on the product page; it saves **on the
order automatically** as line-item properties — so nobody re-types it, and it flows straight
into the production sheet (item 2) and the packing/delivery slips (item 3).

> Status: **proposal — needs founder sign-off** on the app and the exact option list before
> anything is installed. Installing/changing an app on the live store is a Human-Approval gate
> (tested on a duplicate product first).

## Customisation fields (derived from how current orders are actually structured)

Recent orders show a consistent pattern — e.g. *"S / 4 inch Cap Sleeves (embroidery on ends) /
32 inches"*, plus notes like *"front neck depth 6 inch, back neck depth 3 inch"* and *"custom
measurement photos attached"*. Proposed per-product option set:

| Field | Type | Example / notes |
|-------|------|-----------------|
| Size | dropdown | XS–XL (confirm your range) — drives the size chart |
| Sleeve style | dropdown | e.g. Cap / Full / Sleeveless (confirm full list) |
| Sleeve length | dropdown or number (inches) | e.g. "4 inch cap sleeves" |
| Garment length | dropdown or number (inches) | e.g. 32" / "As shown" |
| Front neck depth | number (inches) | optional |
| Back neck depth | number (inches) | optional |
| Custom measurement photo | **file upload** | replaces the current "attached in comments" workaround |
| Special requests | free text | catch-all |

Each becomes a **line-item property** on the order. Anything that needs an **upcharge** (e.g.
bespoke measurements beyond standard) is handled separately via Shopify **Draft Orders** — a
custom invoice the founder approves before sending.

## App choice — **Globo Product Options** (confirmed)

> Decision: **Globo Product Options** (founder-confirmed). Setup, duplicate-product test plan,
> and the team SOP are in `phase1-item1-globo-setup.md`.


Both shortlisted apps store selections as line-item properties on the order. The deciding
factor is **file upload** (your custom-measurement photos):

| | **Globo Product Options** (recommended) | Infinite Options (+ Uploadery) |
|--|------------------------------------------|--------------------------------|
| Options as line-item properties | ✅ | ✅ |
| Dropdown / number / free-text | ✅ | ✅ |
| **File upload (measurement photos)** | ✅ **built-in** | ❌ needs a **second app** (Uploadery) |
| Conditional logic | ✅ | ✅ |
| Apps to install & pay for | **1** | **2** |
| Cost | Free tier incl. file upload (~20 MB); paid tiers for more | Two subscriptions |

**Why Globo:** one app covers options *and* photo upload, keeping setup and cost down (fits the
PKR 50k–100k/mo software budget), and removes the manual "photo in comments" step entirely.
Infinite Options is capable but needs Uploadery alongside it = two apps to manage and pay for.
*(Verify current pricing on the Shopify App Store listing before installing.)*

## Hand-off to item 2 (order sheet) — line-item property → column mapping

The production sheet (item 2, Make.com → Google Sheet) reads these properties directly:

| Order sheet column | Source |
|--------------------|--------|
| Order no. | Shopify order number |
| Date | Order created date |
| Article | Product title (e.g. style name) |
| Size | line-item property `Size` |
| Sleeves | `Sleeve style` + `Sleeve length` |
| Length | `Garment length` |
| Neck (F/B) | `Front neck depth` / `Back neck depth` |
| Photo | `Custom measurement photo` (file URL) |
| Special requests | `Special requests` |
| Qty | line-item quantity |
| Status | manual (in production / done) |

*(Customer name/address are used only on the delivery slip in item 3 — never stored in this
repo.)*

## What I need from you

1. **Confirm the app** (recommended: Globo Product Options).
2. The **exact option lists**: your full size range, sleeve styles, length options, and which
   (if any) carry an **upcharge**.
3. **Size chart** confirmation (so the dropdown maps to real measurements).

## Approval gates
- Installing/configuring the app on the live store → your OK; built and tested on a **duplicate
  product** first, then rolled out.
- Sending any custom-work (Draft Order) invoice → your approval (it's a customer message).

**Done when:** a test order with a customisation shows that customisation on the order
automatically — nobody re-types it.
