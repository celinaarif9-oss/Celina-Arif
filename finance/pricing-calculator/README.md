# Pricing Calculator — starter template (Phase 1, item 4)

**Replaces:** costing/pricing each article by hand in Excel.

Enter an article's costs → get a suggested **local retail price** and a **DHL-inclusive
international price** (per destination zone) instantly. This folder is the version-controlled
**template**: a column/formula schema (`schema.csv`), a DHL zone-rate table (`dhl-zones.csv`),
and an Apps Script implementation (`pricing-calculator.gs`) you paste into a Google Sheet.

> ⚠️ **This is a skeleton. It contains NO real numbers.** Every rate/assumption is a
> `TODO: founder to supply` placeholder. The math is wired up; the inputs are not. Nothing is
> pushed to Shopify — this only *suggests* prices for you to review.

## The model (confirmed: markup on cost)

```
total_cost  = direct_materials + direct_labour + overhead_allocation
local_price = round_up( total_cost * (1 + markup_pct) )          # markup on cost
intl_price  = round_up( local_price + weight_kg * dhl_per_kg )    # dhl_per_kg looked up by zone
```

`markup_pct` is a fraction (e.g. `1.5` = price is cost × 2.5). A **margin-on-price**
alternative (`price = cost / (1 - margin_pct)`) is included but **off by default** — flip
`USE_MARGIN_ON_PRICE` in the Settings block if you ever want it.

### Markup % ↔ margin % (so you set markup intentionally)

| Markup on cost | Margin on price |
|----------------|-----------------|
| ×1.5 (+50%)    | 33%             |
| ×2.0 (+100%)   | 50%             |
| ×2.5 (+150%)   | 60%             |
| ×3.0 (+200%)   | 67%             |

## Per-zone DHL

International shipping cost varies by destination, so `dhl_per_kg` comes from a **DHL Zones**
lookup table (`dhl-zones.csv` / a "DHL Zones" sheet tab). Each article row picks a `dest_zone`;
the rate is pulled with `=VLOOKUP(dest_zone, 'DHL Zones'!A:B, 2, FALSE)`. Fill the table from
the DHL zone list you'll share.

## Inputs the founder must supply (replace the TODOs)

| Input | Where | Notes |
|-------|-------|-------|
| `markup_pct` | Settings cell / Apps Script | e.g. 1.5 |
| Overhead basis + value | Settings | flat PKR per article, or % of (materials+labour) |
| DHL per-kg, **per zone** | `DHL Zones` table | from the DHL list you'll share |
| Rounding rule | Settings | default: round up to nearest Rs.500 |
| Sample article costs (anonymised) | `../../data/` | to validate output vs. current prices |

## How to use (non-technical)

1. Create a new Google Sheet named **"Pricing Calculator"**.
2. **Extensions → Apps Script**, delete the sample code, paste in `pricing-calculator.gs`, Save.
3. Back in the Sheet, run **`setupTemplate`** once from the Apps Script **Run** menu — it lays
   out the columns and adds a **DHL Zones** tab.
4. Fill the **Settings** block (markup %, overhead) and the **DHL Zones** rates.
5. In an article row, type materials/labour/overhead/weight and pick a `dest_zone`. The
   **local_price** and **intl_price** columns fill in automatically.
6. Sanity-check against a few recent articles before trusting it. Flag anything that looks off.

**Bulk price updates to Shopify are a separate, gated step** (dry-run → founder approval →
apply). Not part of this calculator.

## A note on cost-plus for a luxury label

Markup-on-cost is a sound **floor** — it guarantees every article covers materials + labour +
overhead and a target margin, which is exactly right for made-to-order work where costs vary
piece to piece. Its limit: it's cost-anchored, not value-anchored, and luxury pricing is
largely about positioning and perceived value. Recommended use: treat cost-plus as the
**minimum**, then sense-check hero/statement pieces against what your market tier commands and
nudge those up. (Realized margin after discounts/returns/shipping is tracked later in the
Phase 4 finance work.) *Not financial advice — your accountant should confirm the overhead
allocation method.*
