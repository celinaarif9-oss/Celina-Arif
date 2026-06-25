# Pricing Calculator (Phase 1, item 4)

**Replaces:** costing/pricing each article by hand in Excel.

Enter an article's costs → get a suggested **local retail price** and a **DHL-inclusive
international price** for any destination, using DHL's real zone rate card.

## Model (confirmed with founder)

```
total_cost  = direct_materials + direct_labour + overhead_allocation   # entered per article
local_price = round_up( total_cost * 1.50 )                            # 50% markup on cost
intl_price  = round_up( local_price + dhl_cost )                       # dhl_cost from zone rate card
```

- **Markup:** 50% on total cost.
- **Rounding:** up to nearest **Rs.500** by default (set in the Apps Script `SETTINGS`). *Note:
  your sample retail prices end in `,450` — if you round to a different step, change `ROUND_TO`.*
- **Sanity check:** a total cost of ~Rs.33,600 → local price ~Rs.50,450, matching real order
  #1726 (Natasha). The model lines up with current pricing.

## DHL: real rate card, per destination

Two reference datasets (DHL's published rate card — no customer data) live in `data/`:

- **`data/dhl-zones.csv`** — 232 countries → DHL zone (1–13). *(UK = zone 3, USA = 8, UAE = 12.)*
- **`data/dhl-rates-nondoc.csv`** — DHL **non-document** rates (clothing) by weight bracket
  (0.5–20 kg in 0.5 kg steps, Zone 1–13), in PKR.

The calculator looks up: `dest_country → zone`, rounds weight up to the next 0.5 kg, then reads
the rate for that (weight, zone). **Valid to 20 kg** — an outfit is ~1–3 kg; above 20 kg DHL
uses incremental pricing, so the calculator flags it for a manual quote.

## How to use (non-technical)

1. Create a new Google Sheet named **"Pricing Calculator"**.
2. **Import the two reference tabs** — *File → Import → Upload*, "Insert new sheet(s)":
   - `data/dhl-zones.csv` → rename the tab exactly **`DHL Zones`**
   - `data/dhl-rates-nondoc.csv` → rename the tab exactly **`DHL Rates`**
3. **Extensions → Apps Script**, delete the sample code, paste `pricing-calculator.gs`, **Save**.
4. Back in the Sheet, open the first (blank) tab and run **`setupTemplate`** once from the Apps
   Script **Run** menu. It lays out the columns, formulas, and a country dropdown.
5. In a row, type **materials / labour / overhead** (cols B,C,D) and **weight_kg** (G), then pick
   a **dest_country** (H). **local_price** (F) and **intl_price** (K) fill in automatically.
6. Drag row 2's formulas down for more articles.

Columns and formulas are documented in `schema.csv`.

**Bulk price updates to Shopify are a separate, gated step** (dry-run → founder approval →
apply). Not part of this calculator.

## A note on cost-plus for a luxury label

50% markup-on-cost is a sound **floor** — every article covers materials + labour + overhead
plus margin, which is right for made-to-order work where costs vary piece to piece. Its limit:
it's cost-anchored, not value-anchored, and luxury pricing is largely about positioning. Use it
as the **minimum**, then sense-check hero/statement pieces against what your market tier commands
and nudge those up. (Realized margin after discounts/returns/shipping is tracked later in the
Phase 4 finance work.) *Not financial advice — your accountant should confirm the overhead
allocation method.*
