# Pitch commission auto-audit (Phase 3)

Checks Pitch's monthly **8% commission** against your **agreed terms** so you never overpay.
Drop in two numbers from your own records and it tells you the correct commission, what Pitch
billed, and the variance.

**Replaces:** taking the agency's invoice on trust.

## Your agreed terms (confirmed June 2026)

| Term | Value |
|------|-------|
| Commission rate | **8%** |
| Base | **Paid order Subtotals** (Shopify "Subtotal" = product value, **already excludes shipping & tax**) |
| Voided / cancelled orders | **Excluded** (no commission on them) |
| Refunds/returns | **Not** deducted (terms say gross) |
| Scope | **All online revenue**, domestic + international |
| Frequency | Monthly, no cap (yet) |
| Separate retainer | Rs.80,000/month (not part of this %) |

> **Key point:** because the base is Shopify's **Subtotal** (which is *before* shipping), you do
> **not** subtract your courier/shipping ledger separately — shipping is already out. The only
> things removed from the sum of subtotals are **voided/cancelled** orders.

## How to use (2 minutes a month)

1. Open the template: **File → Import →** upload `commission-audit-template.csv` into a Google
   Sheet → **Replace current sheet**. (The `=` cells become live formulas on import.)
2. Fill **two numbers from YOUR records** (Shopify order report, paid orders) — *not* from
   Pitch's sheet:
   - **Sum of paid order Subtotals** → cell `B5` *(Shopify Subtotal is pre-shipping, so shipping
     is already excluded)*
   - **Any voided/cancelled orders** still sitting in that sum → cell `B6`
3. Enter what Pitch billed (from their commissions sheet): their **base** → `B16`, their
   **commission** → `B17`.
4. Read the bottom rows:
   - **Pitch's own math check** — confirms their `base × 8%` equals what they billed.
   - **Commission variance** — *billed minus correct*. Positive = you were **overbilled**.
   - **Verdict** — ✓ matches, ⚠ overbilled, or underbilled.

The formula is simple and shown in the sheet:
`correct commission = (sum of paid order subtotals − voided orders) × 8%`.

## May 2026 — RESOLVED (verified order-by-order)

Pitch sent the order-level commissions sheet. Every figure was checked by summing the lines:

| | Amount |
|---|---|
| Sum of all order subtotals (incl. voided) | Rs.3,475,450 ✓ |
| Three **voided** orders (#1690, #1700, #1699) | Rs.156,800 ✓ |
| Sum of **paid** order subtotals | Rs.3,318,650 ✓ |
| Pitch's calc-error correction (#1692, #1682, #1697, #1709) | −Rs.93,200 |
| **Corrected base** | **Rs.3,225,450** |
| **Corrected commission @ 8%** | **Rs.258,036** ✓ |

**Conclusion:** Pitch's method matches the terms. The Rs.156,800 was the **three voided orders**
(not under-excluded shipping), and the **"Subtotal" column already excludes shipping**, so the
courier ledger (Rs.661,200) is irrelevant to the base. The audit still earned its keep — it
prompted Pitch to recheck and they found a genuine **Rs.93,200** error, cutting the bill from
**Rs.265,492 → Rs.258,036** (you save **Rs.7,456**). **Amount to pay: Rs.258,036.**

> Correction note: an earlier version of this file flagged a ~Rs.40k overbill on the assumption
> the base included shipping. The order-level detail disproved that — the base is product
> subtotals (pre-shipping). Recorded here for an honest trail.

## Each month going forward — what to spot-check

- **Voided/cancelled orders** are pulled out of the base (they were here).
- **Subtotals**, not order totals, are summed (keeps shipping out automatically).
- A quick **sum of the paid-order subtotals** in their sheet should equal the base they bill on.
  Drop that sum into `B5` and the template flags any gap.

## Notes & guardrails

- **Use your own source numbers**, not the invoice's — that's the whole point of an audit.
- This is a **math check against your stated terms**, not legal/accounting advice. For the
  contract wording (what counts as "shipping," refund treatment, FX on international sales),
  confirm with your **accountant** before raising a billing dispute.
- **No third-party private data is stored here** — only the aggregate sales/commission figures.
  Pitch's bank details and staff names from the invoice are deliberately **not** in this repo.
- From August, once the Shopify store is live and order data flows, "gross sales" and "shipping
  collected" can be pulled automatically into this audit instead of typed in.
