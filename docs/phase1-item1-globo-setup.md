# Phase 1 · Item 1 — Globo Product Options: setup, test & SOP

Runbook for capturing customisations as line-item properties using **Globo Product Options**
(app confirmed). Pairs with the spec in `phase1-item1-customisations.md`.

> ⚠️ **Who runs this:** these are clicks in your **Shopify admin + Globo dashboard**, performed
> by you or Pitch — Claude has repo access only, not your store, so it can't install the app or
> build the option set for you. Claude provides the exact steps and verifies the test order.
>
> ✅ **Inputs received:** size range **XXS–XXL**, the **17-field custom measurement form**, and
> the official **size chart** (see `size-chart.md`). Only the **upcharge amount** (if any) for
> custom measurements is still open.

---

## Part A — Install & build the option set

1. **Install** "Globo Product Options, Variant" from the Shopify App Store. *(Confirm the plan
   on the listing; the free tier includes file upload ~20 MB/file, which covers measurement
   photos.)*
2. In Globo, create an **Option Set** named **"Made-to-order customisation"**.
3. Add a **Fit** dropdown first, then the fields for each path:

   | Field | Globo field type | Req? | Values |
   |-------|------------------|------|--------|
   | **Fit** | Dropdown | Required | `Standard size`, `Custom measurements` |
   | Size | Dropdown | Required* | XXS, XS, S, M, L, XL, XXL |
   | Sleeve style | Dropdown | Optional | Cap, Full, Sleeveless *(confirm full list)* |
   | Sleeve length (inches) | Number | Optional | free number |
   | Garment length (inches) | Number | Optional | e.g. 32, or leave blank for "As shown" |
   | Front neck depth (inches) | Number | Optional | free number |
   | Back neck depth (inches) | Number | Optional | free number |
   | Measurements 1–16 (inches) | Number ×16 | Required* | Height, Shoulder, Armhole, Arm/Sleeve length, Wrist, Bicep, Bust, Under bust, High waist, Waist, Low waist, Hip, Thigh, Ankle, Inseam, Trouser/Shalwar/Lehenga/Saree/Kaftaan length |
   | Any extra requirements (#17) | Text box | Optional | free text |
   | Custom measurement photo | **File upload** | Optional | image; replaces "photo in comments" |
   | Special requests | Text box | Optional | free text |

   *\*Conditional:* Size + sleeve/length/neck fields show when **Fit = Standard size**; the 16
   measurement numbers + #17 show when **Fit = Custom measurements**. Use Globo's
   conditional/dependent-option logic to toggle each group by the Fit value.

4. **Size chart:** upload the official size-chart image to the product page (theme media or a
   Globo info link) so the Size dropdown has a visible guide. Don't re-type the numbers.
5. **Upcharge (optional):** if `Custom measurements` carries a fee, set a Globo **add-on price**
   on that choice. ⚠️ Taking a live price change is a **founder-approval gate** — confirm the
   amount first.
6. **Assign** the option set to your made-to-order products (start with the test product in
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
- [x] Size range (XXS–XXL), custom measurement form (17 fields), and size chart — received.
- [ ] Confirm the **sleeve-style list** and the **custom-measurement upcharge amount** (if any).
- [ ] You/Pitch run **Part A** (install + build the option set) in the Shopify/Globo dashboard.
- [ ] Run **Part B** (duplicate-product test); Claude verifies the test order against the
      acceptance criteria, then you approve **Part C** (live rollout).
