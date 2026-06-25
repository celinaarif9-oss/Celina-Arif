# Pricing Calculator — starter template (Phase 1, item 4)

**Replaces:** costing/pricing each article by hand in Excel.

Enter an article's costs → get a suggested **local retail price** and a **DHL-inclusive
international price** instantly. This folder is the version-controlled **template**: a column/
formula schema (`schema.csv`) and an Apps Script implementation (`pricing-calculator.gs`) you
paste into a Google Sheet.

> ⚠️ **This is a skeleton. It contains NO real numbers.** Every rate/assumption is a
> `TODO: founder to supply` placeholder. The math is wired up; the inputs are not. Nothing is
> pushed to Shopify — this only *suggests* prices for you to review.

## The formula (transparent on purpose)

```
base_cost   = fabric_cost + labour_cost + overhead          # overhead may be a flat amount or % of (fabric+labour)
local_price = round_up( base_cost / (1 - margin_pct) )       # margin as a fraction of selling price
intl_price  = round_up( local_price + (weight_kg * dhl_per_kg) )
```

Margin is expressed as a fraction of the **selling price** (e.g. margin_pct = 0.40 → cost is
60% of price). If the founder's existing formula uses **markup on cost** instead
(price = cost × (1 + markup)), say so and we switch the one line — see `schema.csv` notes.

## Inputs the founder must supply (replace the TODOs)

| Input | Where | Notes |
|-------|-------|-------|
| Cost-plus formula | confirm margin-on-price vs. markup-on-cost | changes one formula line |
| `margin_pct` | a Settings cell | e.g. 0.40 |
| `overhead` basis | a Settings cell | flat PKR per article, or % of (fabric+labour) |
| `dhl_per_kg` | a Settings cell | PKR per kg, per destination zone if they differ |
| Rounding rule | a Settings cell | e.g. round up to nearest Rs.500 |
| Sample article costs (anonymised) | `../../data/` | to validate the output against current prices |

## How to use (non-technical)

1. Create a new Google Sheet named **"Pricing Calculator"**.
2. **Extensions → Apps Script**, delete the sample code, paste in `pricing-calculator.gs`, Save.
3. Back in the Sheet, set up the columns per `schema.csv` (or run the `setupTemplate` helper
   from the Apps Script **Run** menu to lay them out for you).
4. Fill the yellow **Settings** cells with your real figures (the TODOs above).
5. Type a new article's fabric/labour/overhead/weight into a row — the **Local price** and
   **Intl price** columns fill in automatically.
6. Sanity-check against a few recent articles before trusting it. Flag anything that looks off.

**Bulk price updates to Shopify are a separate, gated step** (dry-run → founder approval →
apply). Not part of this calculator.
