# Pitch commission auto-audit (Phase 3)

Checks Pitch's monthly **8% commission** against your **agreed terms** so you never overpay.
Drop in two numbers from your own records and it tells you the correct commission, what Pitch
billed, and the variance.

**Replaces:** taking the agency's invoice on trust.

## Your agreed terms (confirmed June 2026)

| Term | Value |
|------|-------|
| Commission rate | **8%** |
| Base | **Gross online sales, EXCLUDING shipping** |
| Refunds/returns | **Not** deducted (terms say gross) |
| Scope | **All online revenue**, domestic + international |
| Frequency | Monthly, no cap (yet) |
| Separate retainer | Rs.80,000/month (not part of this %) |

> You noted you *don't agree* with charging on **gross** (you'd prefer net of returns) — but
> these are the current terms. The audit follows the terms; the "Refunds" row is shown for
> visibility so you can see what a net-of-returns deal would save, if you renegotiate.

## How to use (2 minutes a month)

1. Open the template: **File → Import →** upload `commission-audit-template.csv` into a Google
   Sheet → **Replace current sheet**. (The `=` cells become live formulas on import.)
2. Fill **two numbers from YOUR records** (Shopify reports, or your sales sheet) — *not* from
   Pitch's invoice:
   - **Gross online sales** (all online revenue incl. shipping) → cell `B5`
   - **Shipping you collected** that month → cell `B6`
3. Enter what Pitch billed (from their invoice): their **base** → `B15`, their **commission** → `B16`.
4. Read the bottom rows:
   - **Pitch's own math check** — confirms their `base × 8%` equals what they billed.
   - **Commission variance** — *billed minus correct*. Positive = you were **overbilled**.
   - **Verdict** — ✓ matches, ⚠ overbilled, or underbilled.

The formula is simple and shown in the sheet:
`correct commission = (gross online sales − shipping) × 8%`.

## May 2026 — worked example & finding

The template ships pre-filled with May's invoice figures so you can see it work:

| | Amount |
|---|---|
| Pitch "Total Sales" | Rs.3,475,450 |
| Pitch "Net Sale" (base they used) | Rs.3,318,650 |
| Commission billed @ 8% | Rs.265,492 |

- ✅ **Their arithmetic is correct:** 8% × 3,318,650 = 265,492 exactly.
- ⚠️ **The base can't be verified from the invoice.** They deducted Rs.156,800 from Total→Net
  but don't label it. Your term is *"excluding shipping,"* and with ~60% of orders going
  international by DHL (Rs.15k–26k each), real monthly shipping should be **much larger** than
  Rs.156,800. **Action:** replace `B5`/`B6` with your **actual** May gross and shipping from
  Shopify. If your real shipping was higher than 156,800, the base was overstated and you were
  overbilled (every Rs.100k of un-excluded shipping = **Rs.8,000** overcharged).
- ℹ️ If May's sales were taken manually (store launches August) and shipping was handled
  outside this figure, the base may be fine — the reconciliation will confirm which.

## Notes & guardrails

- **Use your own source numbers**, not the invoice's — that's the whole point of an audit.
- This is a **math check against your stated terms**, not legal/accounting advice. For the
  contract wording (what counts as "shipping," refund treatment, FX on international sales),
  confirm with your **accountant** before raising a billing dispute.
- **No third-party private data is stored here** — only the aggregate sales/commission figures.
  Pitch's bank details and staff names from the invoice are deliberately **not** in this repo.
- From August, once the Shopify store is live and order data flows, "gross sales" and "shipping
  collected" can be pulled automatically into this audit instead of typed in.
