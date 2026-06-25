# Phase 1 · Item 1 — Globo Product Options: setup, test & SOP

Runbook for capturing customisations as line-item properties using **Globo Product Options**
(app confirmed). Pairs with the spec in `phase1-item1-customisations.md`.

> ⚠️ **Who runs this:** these are clicks in your **Shopify admin + Globo dashboard**, performed
> by you or Pitch — Claude has repo access only, not your store, so it can't build the option set
> for you. Claude provides the exact steps and verifies the test order.
>
> ⚠️ **Scope (decided):** the live product pages **already** capture Size (incl. CUSTOM),
> Sleeves, Shirt length, and dupatta add-ons. **Globo must not duplicate those.** Its only job is
> the **made-to-measure form + measurement photo**, gated so standard buyers don't see it.

---

## Part A — Build the (slim) option set

Globo is installed. Build **one small option set** — measurements typed as a list, **no photo**:

1. Open the option set (rename to **"Custom measurements"**). **Delete** the duplicate
   `Fit` / `Standard Size` fields you built earlier — Size lives in the existing native options.
2. Add these fields:

   | # | Field (Name on cart page) | Globo type | Notes |
   |---|---------------------------|------------|-------|
   | 1 | `Add custom measurements` | **Checkbox / Switch** | the gate — when ticked, reveal the list below |
   | 2 | `Custom measurements` | **Textarea** | the customer writes each measurement on its own line |

   Pre-load the **Textarea placeholder/help text** with the numbered list so they just fill in
   the inches next to each — it lands on the order as a tidy written list:
   ```
   1. Height:
   2. Shoulder:
   3. Armhole:
   4. Arm/Sleeve length:
   5. Wrist:
   6. Bicep:
   7. Bust:
   8. Under bust:
   9. High waist:
   10. Waist:
   11. Low waist:
   12. Hip:
   13. Thigh:
   14. Ankle:
   15. Inseam:
   16. Trouser/Shalwar/Lehenga/Saree/Kaftaan length:
   17. Any extra requirements:
   ```

   *(Prefer each measurement captured separately? Use 17 individual fields instead — cleaner
   data, but a longer form to build. The single Textarea above is the quick, tidy option.)*

3. **Conditional logic:** on field 2, set **show when `Add custom measurements` = ticked**.
   *(Alternatively, gate on the native `Size = CUSTOM` if Globo can read the variant.)*
4. **Display position — DONE / hand to Pitch for fine-tuning.** The Globo **app block** has been
   added to the **Product information** section (theme: *Copy of Changes*), so the box now renders
   in the **right-hand column** next to Size/Sleeves — no longer at the page bottom.
   - The block currently sits near the Size options; this is acceptable as-is.
   - **For Pitch:** to nudge it just above the *Add to Bag* button, open *Online Store → Themes →
     Customize → Default product*, hover the **Globo Product Options** block in the left list until
     the **⠿** handle appears, and drag it below *Price*. (Shopify's block-drag is unreliable on
     touch and occasionally on trackpads — use a mouse.) Then **Publish** the theme.
   - Do this on the **duplicated theme** first, then Publish — don't edit the live theme directly.
5. **Upcharge (optional):** if made-to-measure carries a fee, set a Globo **add-on price** on the
   `Add custom measurements` checkbox. ⚠️ Taking a live price change is a **founder-approval
   gate** — confirm the amount first.
6. **Assign** the set to your made-to-order products — but for now, the **test product only**
   (Part B). Keep the set on **Draft** until the test passes.

These two new fields save on the order as line-item properties, feeding the production sheet
(item 2) and slips (item 3). Size / Sleeves / Length already arrive from the native options.

---

## Part B — Test on a duplicate product (do this before any live change)

1. **Duplicate** one real product (Shopify: product → ••• → Duplicate). Name it
   `ZZ-TEST – customisation` and keep it on the **Online Store** but **not** in any collection /
   not pushed to customers.
2. Assign the "Custom measurements" option set to the test product.
3. **Place a test order**: open the test product, tick **Add custom measurements**, fill the
   measurements list, add to cart, and check out (use a real or bogus payment per your setup).
4. **Verify on the order** (Admin → Orders → the test order): the line item shows the native
   **Size / Sleeves / Length** *and* the new **Custom measurements** list as properties.
   Nothing was re-typed.
5. **Acceptance:** ✅ the measurements list appears on the order and reads cleanly, ✅ values drop
   neatly into the production sheet columns (item 2 mapping), ✅ standard buyers (checkbox
   un-ticked) don't see the measurements box.
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

**Reading a customisation:** open the order → the line item shows the native **Size / Sleeves /
Length** and, for custom orders, the **Custom measurements** list. Work from that — do **not**
re-type it elsewhere. (It also lands in the production sheet automatically once item 2 is on.)

**Custom work that costs extra (upcharge):** don't change the product price. Create a **Draft
Order** with the custom amount and send the invoice — **founder approval required** before
sending (it's a customer message).

**Changing the measurements field or the size chart:** edit the "Custom measurements" set in
Globo. Big changes → test on the `ZZ-TEST` product first.

**What this replaces:** the team re-typing DM/WhatsApp/note customisations onto Shopify order
notes after each order.

---

## Troubleshooting (seen during setup)

- **Field shows in Globo's own preview but NOT on the live product page.** The Globo block was
  added to a **draft theme** (e.g. "Copy of Changes") that isn't published — the live store runs a
  different theme without the block. Fix: either set Globo **Settings → Display position** to
  **automatic** (injects near Add-to-Cart on any theme, no block needed), **or** add the block to
  the **live** theme, **or** publish the draft theme (only if all its other changes are intended).
- **Nothing shows at all, even in preview.** Check the **checkbox** field has **no conditional
  logic** (a stray "show if variant = on" hides it, and the dependent Textarea with it). Only the
  **Textarea** should carry conditional logic ("show when the checkbox is ticked").
- **Empty preview in the theme editor.** The option set must be **Active** (not Draft) and the
  previewed product must be in **Assign products**.

## For Pitch — Globo field not rendering on live product pages

**Symptom:** the Globo "Custom measurements" field does not appear on live product pages
(e.g. Alysa) even though it renders correctly in Globo's own preview.

**Already verified (NOT the cause):**
- Option set is **Active**; checkbox has **no** conditional logic (only the Textarea does).
- Globo **app block** added; theme **Published**; widget placement = "Above add to cart".
- Alysa uses the **"Default product"** template (which has the block) — so it is *not* a custom
  template issue.

**Remaining suspects + asks (custom theme — this is the crux):**
1. **Block may be on the wrong theme.** The live/Active theme is **"Changes"**, but the Globo
   app block was added while editing a duplicate, **"Copy of Changes."** Please confirm the
   Globo block is on the **live "Changes"** theme's **Default product** template (Alysa uses
   Default product), not only on a duplicate.
2. **No "App embeds" in this theme.** The live theme's **Theme settings** list ends at
   "Theme style" with **no App embeds section** — this custom theme doesn't expose app embeds
   the standard way. So Globo likely needs a **manual integration**: place the Globo app block
   (or a Globo anchor snippet) directly in the **custom product template / add-to-cart markup**
   where it should render.
3. **Product assignment** — confirm **Alysa** is in the option set's *Assign products* list
   (Globo's preview shows the set regardless of assignment, so this is easy to miss).
4. Rule out **caching** (hard refresh / incognito).

**Net:** the Globo option set is built and correct (verified in Globo's own preview); what
remains is wiring it into this **custom theme** — a theme job for Pitch.

**Acceptance:** on a live made-to-order product, ticking "Add custom measurements" reveals the
measurements list, and a test order shows `Custom measurements` as a line-item property.

## Open items before go-live
- [x] Scope decided: Globo adds **only** the custom-measurements written list (no photo); Size /
      Sleeves / Length stay as the existing native options.
- [ ] Delete the duplicate `Fit` / `Standard Size` fields; keep checkbox + Textarea.
- [ ] Set Globo **display position** (right column, not page bottom).
- [ ] Confirm the **custom-measurement upcharge amount** (if any).
- [ ] Run **Part B** (duplicate-product test); Claude verifies the order, then you approve
      **Part C** (live rollout).
