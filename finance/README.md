# finance/ — pricing, reconciliation, P&L, commission audit

Money logic for the business. **Show the formula and assumptions, and flag uncertainty.**
Claude is **not** a financial, tax, or legal advisor — the accountant owns filings and
decisions.

**Contents**
- `pricing-calculator/` — Phase 1, item 4: cost-plus → local price + DHL-inclusive
  international price. (Reconciliation, P&L, and commission audit arrive in Phases 3–4.)

**Rules**
- No real customer PII. Use anonymised cost samples.
- Any price change going live is a **Human Approval gate** — calculators and dry-runs are
  fine; pushing prices to Shopify is not, without explicit OK.
