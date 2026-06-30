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

## Set once a month (top of the card)
- **Labour Rate/hr** — only if a salary changes (edit the formula, e.g. `=80000/26/5`).
- **Overhead** — update Rent / Electricity / Internet / Maintenance / Others, and **Articles/mo**
  (48) if your output changes.
- **Marketing rate** — 8% (or your real blended % incl. ads).

## For each article (≈5 min)
1. **Duplicate the `Cost Card` tab** → rename it the outfit name.
2. **Materials:** type each item's **Quantity** and **Cost** — totals auto.
3. **Labour:** type **Hours** for Cutting / Hand work / Stitching — costs auto from the rates.
4. **Sale Price:** enter it → **Total Cost, Net Profit, margin** all calculate.
5. **Product details:** fill weight, lengths, neckline, customisations (handy for dispatch + listings).

> The ZARA example has **Stitching hours (3.5)** pre-filled; add **Cutting & Hand-work hours** to
> complete its total. Your real articles: fill all three.

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
