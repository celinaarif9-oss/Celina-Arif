# Phase 1 · Item 1 — Capture customisations at checkout

**Replaces:** the team re-typing size/customisation details (from DM/WhatsApp/notes) onto
Shopify order notes after each order.

**Goal:** capture the *made-to-measure* path on the order automatically — so custom orders stop
going through a manual "contact us" conversation and flow straight into the production sheet
(item 2) and the slips (item 3).

> ⚠️ **Scope correction (decided):** the live product pages **already** capture **Size**
> (XXS–XXL **+ CUSTOM**), **Sleeves**, **Shirt length**, and **dupatta add-ons** as line-item
> properties — past orders confirm it (e.g. "S / 4-inch Cap Sleeves / 32 inches"). So Globo must
> **NOT** re-add Size/Sleeves/Length (that would show the customer two pickers). Globo's only job
> is the **made-to-measure form + measurement photo**, which today is handled manually via
> "For a custom order, contact now".

## What Globo adds (slim scope)

One written-list field, revealed only for custom orders (gate on a single checkbox, or on the
existing native **Size = CUSTOM** selection). Saves on the order as a **line-item property**.
**No photo** — the customer types the measurements out as a list.

| Field | Globo type | Notes |
|-------|------------|-------|
| Custom measurements | **Textarea** | the 17-point form pre-loaded as a numbered list in the placeholder (see `size-chart.md`); the customer fills inches next to each line |

**Gate:** add one Globo **checkbox** "Add custom measurements (made-to-measure)" → show the
Textarea when ticked. (Keeps standard buyers' pages clean.) Standard Size / Sleeves / Length stay
as the existing native options — untouched.

**Upcharge:** if made-to-measure carries a fee, set a Globo **add-on price** on the checkbox
(*taking a price live is a founder-approval gate*), or bill via a Shopify **Draft Order** the
founder approves before sending.

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

The production sheet (item 2, Make.com → Google Sheet) reads these properties directly. Most
already exist on the order from the **native** product options; Globo only adds the last two.

| Order sheet column | Source | Where it comes from |
|--------------------|--------|---------------------|
| Order no. / Date | Shopify order | native |
| Article | Product title | native |
| Size | line-item property `Size` (incl. CUSTOM) | **existing native option** |
| Sleeves | `Sleeves` | **existing native option** |
| Length | `Shirt length` | **existing native option** |
| Custom measurements | `Custom measurements` (written list) | **Globo (new)** |
| Qty | line-item quantity | native |
| Status | manual (in production / done) | sheet |

*(Customer name/address are used only on the delivery slip in item 3 — never stored in this
repo.)*

## Open items
1. Confirm whether **custom measurements carry an upcharge** (→ Globo add-on price, approved, or
   a Draft Order).
2. Set Globo's **display position** so the fields render in the right-hand column (not page
   bottom) — see runbook.

## Approval gates
- Configuring/publishing on the live store → your OK; built and tested on a **duplicate
  product** first, then rolled out.
- Sending any custom-work (Draft Order) invoice → your approval (it's a customer message).

**Done when:** a test order with a customisation shows that customisation on the order
automatically — nobody re-types it.
