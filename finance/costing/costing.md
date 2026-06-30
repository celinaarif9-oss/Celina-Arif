# Article costing — Cost Card (matches your Vol 2 sheet)

A cleaner, **auto-calculating** version of your Vol 2 Costing sheet. Same structure you already
use — Direct Material, Labour, Overhead, Marketing — but it does the maths for you and you
duplicate one tab per article.

**Replaces:** re-doing the salary/overhead maths by hand on every article tab.

## What's different (and better) vs the Excel you sent
1. **Labour rates are computed once from salary** (Master 80,000/mo, etc.) → per article you just
   type the **Hours**, and Rate/hr × Hours fills in. No re-writing the salary maths each time.
2. **Overhead auto-allocates** — each monthly cost ÷ articles/month (you use **48** = 12/week × 4).
3. **Marketing auto-calculates** as a **% of sale price** (8%).
4. **Everything totals itself** — Materials, Labour, Overhead, Marketing → **Total Cost**, then
   **Net Profit** and **margin** off your Sale Price.
5. One **Cost Card** tab you duplicate per article (Zara, Raaniya, Yara…).

## Setup
1. **File → Import → Upload** `cost-card-template.csv` into your costing Google Sheet →
   **Insert new sheet** → name the tab **`Cost Card`**. The `=` cells go live.
2. It opens pre-filled with **ZARA** as a worked example (materials total = **14,331**, matching
   your sheet) so you can see it working.

## The three tabs (import all into one Google Sheet)
1. **`Master Rate List`** — material prices (unit cost). *Source of truth for materials.*
2. **`Labour & Overhead Setup`** — salaries, overheads, production rate, selling %s. *Computes
   per-article labour + overhead once a month.*
3. **`Cost Card`** — per design: materials + auto labour/overhead + sale price → net profit.

## Set once a month — in `Labour & Overhead Setup`
- **Production rate** — articles/day (4), days/week (6) → it works out articles/week (24) and
  /month (~104).
- **Direct labour** — each role's **total weekly wage** (all workers in that role) → per-article
  auto. Finishing is a flat per-outfit figure.
- **Overheads** — Rent, Electricity, Internet, Maintenance, Cleaning, Food & Beverages, Ads,
  Shopify, Globo, and **Outbound bank charges** → per-article auto.
- **Selling %s** — Marketing commission (8%) and **Inbound charges** (income tax + bank + sales
  tax = 5.965%).

You only touch this tab when wages/overheads change — every Cost Card updates automatically.

## For each article (≈3 min) — in `Cost Card`
1. **Duplicate the `Cost Card` tab** → rename it the outfit name.
2. **Materials:** type the item name **exactly as in the Master Rate List** → Unit + Unit cost
   auto-fill → type the **Qty used** → Total auto-calculates.
3. **Sale Price:** enter it. **Labour, Overhead, selling costs, Total Cost, Net Profit & margin
   all calculate automatically** (labour/overhead pull from the Setup tab).
4. **Product details:** fill weight, lengths, neckline, customisations.

> 💡 **Tip:** add a dropdown on the Material cells — **Data → Data validation → Dropdown (from a
> range)** → `Master Rate List` column B — so you *pick* materials and the lookup always matches.

> ⚠️ All three tabs must be in the **same Google Sheet** for the lookups/links to work, and the
> tab names must match exactly: `Master Rate List`, `Labour & Overhead Setup`, `Cost Card`.

## Master Rate List (your price source)
`master-rate-list.csv` is your **single source of truth** — **116 materials** with prices, ready
to use. Import it as a tab named **`Master Rate List`**.

**The key idea (handles your "quantity differs per outfit" point):** materials are bought by
**packet / box / kg / lari / yard**, but used in small amounts. So each row stores the **Price**
and the **Pack size**, and computes the **Unit cost = Price ÷ Pack size**:

| Item | Price | Pack size | Unit | **Unit cost** |
|------|-------|-----------|------|---------------|
| Sequin Matt no.3 | 350 | 100 | gram | **3.5 / gram** |
| Hooks | 450 | 100 | hook | **4.5 / hook** |
| Pearl no.2 | 850 | 20 | lari | **42.5 / lari** |
| Sheesha Silk | 850 | 1 | yard | **850 / yard** |

Then in the Cost Card: **material cost = Unit cost × Quantity used**. You only update the
**quantity used** per outfit (during production); the unit cost stays fixed until a price changes.

- Update a price **once here** and it flows everywhere.
- Edit **Pack size** if a material's basis differs (e.g. buqram per cut-piece).
- Custom/range items (factory-designed fabrics, dabka per kg) are flagged in **Notes**.

*Next step once you confirm the list: I'll wire the Cost Card to **auto-pull the unit cost** by
item name (you pick the item → unit cost fills in → you just type the quantity used).*

## Feeds the rest
- Put each finished article's **name, Total Cost, Sale Price, Net Profit** as one row on a
  **`Summary`** tab (you already have a "Summery" tab) — that's what the **KPI dashboard** reads
  for profit-per-article.

## Note
Per-article overhead assumes ~**48 articles/month**. If volume changes a lot (peak season),
update Articles/mo so overhead per piece stays accurate. This is a costing convention — your
accountant should confirm the overhead basis for any formal reporting.
