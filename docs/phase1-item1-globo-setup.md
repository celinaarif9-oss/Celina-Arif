# Phase 1 · Item 1 — Globo Product Options: setup, test & SOP

Runbook for capturing customisations as line-item properties using **Globo Product Options**
(app confirmed). Pairs with the spec in `phase1-item1-customisations.md`.

> ⚠️ **Approval gate:** nothing here touches live products until the founder approves. Everything
> is built and verified on a **duplicate test product** first. Installing the app and going live
> are the founder's call.
>
> ⏳ **Still needed before install:** the exact option lists — full **size range**, **sleeve
> styles**, **length options**, and which (if any) carry an **upcharge**. Placeholders below are
> marked `TODO: confirm`.

---

## Part A — Install & build the option set

1. **Install** "Globo Product Options, Variant" from the Shopify App Store. *(Confirm the plan
   on the listing; the free tier includes file upload ~20 MB/file, which covers measurement
   photos.)*
2. In Globo, create an **Option Set** named **"Made-to-order customisation"**.
3. Add these fields (mark Required/Optional as noted):

   | Field | Globo field type | Req? | Values |
   |-------|------------------|------|--------|
   | Size | Dropdown | Required | `TODO: confirm` (e.g. XS, S, M, L, XL) |
   | Sleeve style | Dropdown | Required | `TODO: confirm` (e.g. Cap, Full, Sleeveless) |
   | Sleeve length (inches) | Dropdown or Number | Optional | `TODO: confirm` |
   | Garment length (inches) | Dropdown or Number | Required | e.g. 30–34, or "As shown" |
   | Front neck depth (inches) | Number | Optional | free number |
   | Back neck depth (inches) | Number | Optional | free number |
   | Custom measurement photo | **File upload** | Optional | image; replaces "photo in comments" |
   | Special requests | Text box | Optional | free text |

4. *(Optional)* Conditional logic — e.g. only show neck-depth fields when the customer ticks
   "custom measurements". Keep it simple for v1.
5. **Assign** the option set to your made-to-order products (start with the test product in
   Part B — not live products yet).

Each field saves on the order as a **line-item property**, which feeds the production sheet
(item 2) and the slips (item 3) automatically.

---

## Part B — Test on a duplicate product (do this before any live change)

1. **Duplicate** one real product (Shopify: product → ••• → Duplicate). Name it
   `ZZ-TEST – customisation` and keep it on the **Online Store** but **not** in any collection /
   not pushed to customers.
2. Assign the "Made-to-order customisation" option set to the test product.
3. **Place a test order**: open the test product, fill every field, **upload a sample photo**,
   add to cart, and check out (use a real or bogus payment per your setup).
4. **Verify on the order** (Admin → Orders → the test order): the line item shows each
   customisation as a property — Size, Sleeves, Length, Neck F/B, the **photo as a file/URL**,
   and Special requests. Nothing was re-typed.
5. **Acceptance:** ✅ all fields present and correct on the order, ✅ photo opens from the order,
   ✅ values are clean enough to drop into the production sheet columns (item 2 mapping).
6. Delete or archive the test order/product when done.

---

## Part C — Roll out to live products (after founder approval)

- Apply the option set to the live made-to-order products in a batch.
- Spot-check 2–3 live product pages render the options correctly on mobile and desktop.
- Announce to the team that customisations now arrive **on the order** (no more DM/notes
  re-typing) and point them at the SOP below.

**Rollback:** un-assign the option set (products revert to plain) — the test product is separate,
so live listings are never at risk during testing.

---

## Part D — Team SOP (daily use, non-technical)

**Reading a customisation:** open the order → the customisation shows under the line item
(Size, Sleeves, Length, Neck, photo, Special requests). Work from that — do **not** re-type it
elsewhere. (It also lands in the production sheet automatically once item 2 is on.)

**Custom work that costs extra (upcharge):** don't change the product price. Create a **Draft
Order** with the custom amount and send the invoice — **founder approval required** before
sending (it's a customer message).

**Changing options or the size chart:** edit the "Made-to-order customisation" set in Globo.
Big changes → test on the `ZZ-TEST` product first.

**What this replaces:** the team re-typing DM/WhatsApp/note customisations onto Shopify order
notes after each order.

---

## Open items before go-live
- [ ] Founder confirms size range, sleeve styles, length options, and any upcharge options.
- [ ] Founder confirms the size chart.
- [ ] Founder approves installing Globo and going live after the duplicate-product test passes.
