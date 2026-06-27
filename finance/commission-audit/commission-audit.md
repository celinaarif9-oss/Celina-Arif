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

## May 2026 — finding (reconciled against the consignee ledger)

| | Amount |
|---|---|
| Pitch "Total Sales" (gross) | Rs.3,475,450 |
| Pitch "Net Sale" (base they used) | Rs.3,318,650 |
| Shipping Pitch excluded (Total − Net) | Rs.156,800 |
| **Your ACTUAL May shipping (consignee ledger)** | **Rs.661,200** |
| Commission billed @ 8% | Rs.265,492 |

- ✅ **Their arithmetic is internally correct:** 8% × 3,318,650 = 265,492 exactly.
- 🚩 **But the shipping deduction is far too small.** Your term is *"gross sales excluding
  shipping."* Pitch excluded only **Rs.156,800**, yet the consignee ledger shows you actually
  spent **Rs.661,200** on shipping in May — a **Rs.504,400 gap**.
- **Corrected:** base should be 3,475,450 − 661,200 = **Rs.2,814,250**; commission @ 8% =
  **Rs.225,140**. Pitch billed **Rs.265,492** → **overbilled by ~Rs.40,352** for May alone
  (~**Rs.484,000/year** if this repeats).

**Before you raise it, confirm two things (the finding depends on them):**
1. **Does "Total Sales" (3,475,450) already include the shipping customers paid?** If yes
   (most likely — they bill on gross), the exclusion should remove the full shipping, so the
   overbilling stands. If "Total Sales" is product-only and shipping was never in it, then
   nothing should be excluded — flip side, they'd have slightly *under*billed. Your sales
   records settle this.
2. **Is Rs.661,200 the shipping that belongs in the base?** The ledger is your courier *cost*.
   If you charge customers shipping at roughly cost (pass-through), cost ≈ the shipping revenue
   to exclude. If customers paid more/less, use that figure instead.
3. **Ask Pitch what the Rs.156,800 they deducted actually represents** — that single answer
   tells you how they're interpreting "shipping."

## Notes & guardrails

- **Use your own source numbers**, not the invoice's — that's the whole point of an audit.
- This is a **math check against your stated terms**, not legal/accounting advice. For the
  contract wording (what counts as "shipping," refund treatment, FX on international sales),
  confirm with your **accountant** before raising a billing dispute.
- **No third-party private data is stored here** — only the aggregate sales/commission figures.
  Pitch's bank details and staff names from the invoice are deliberately **not** in this repo.
- From August, once the Shopify store is live and order data flows, "gross sales" and "shipping
  collected" can be pulled automatically into this audit instead of typed in.
