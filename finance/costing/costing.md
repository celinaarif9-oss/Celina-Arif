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
- **Production rate** — articles/day (3), days/week (6) → it works out articles/week (18) and
  /month (~78). This is the divisor for overhead per article — lower output = more overhead each.
- **Direct labour** — each role's **weekly wage per worker** (one person) → it works out the
  **daily wage** (weekly ÷ 6). Finishing is a flat per-outfit figure.
- **Overheads** — Rent, Electricity, Internet, Maintenance, Cleaning, Food & Beverages, Ads,
  Shopify, Globo, and **Outbound bank charges** → per-article auto.
- **Selling %s** — Marketing commission (8%) and **Inbound charges** (income tax + bank + sales
  tax = 5.965%).

You only touch this tab when wages/overheads change — every Cost Card updates automatically.

## ⭐ ONE-TIME SETUP (do this ONCE, then never again)

Import is only the *seed*. Dropdowns and formatting are **not** saved in a CSV, so re-importing
loses them. So set things up once, then **stop importing** — duplicate the tab instead.

1. Import the three CSVs once and rename the tabs exactly: `Master Rate List`,
   `Labour & Overhead Setup`, `Cost Card` (capitals + spaces + the `&` matter).
2. On the `Cost Card` tab, set up the material **dropdown** so you pick instead of type:
   - Select cells **`A7:A22`**
   - **Data → Data validation → Add rule → Dropdown (from a range)**
   - In the range box type **exactly** (this value never changes):
     ```
     ='Master Rate List'!$B$4:$B$300
     ```
   - **Done.**

That's it — you never open a settings box again.

## For each new outfit (≈3 min) — NEVER re-import, just duplicate
1. **Right-click the `Cost Card` tab → Duplicate** → rename the copy the outfit name.
   *(The duplicate already carries the dropdown + every formula. This is why you don't re-import.)*
2. **Materials:** click the cell → **pick** the material from the dropdown → type the **Qty used**
   → Unit cost + Total fill in automatically.
   - **Qty is in that material's unit.** Some are fractions: packet items (e.g. **Moti** = Rs450
     per 450g packet) are priced **per packet**, so enter **0.5** for half a packet, **0.25** for
     a quarter, **1** for a whole packet.
3. **Labour:** for each role set **Workers** (how many people on this outfit) and **Days** (how
   long they spend on it — leave at **1** for a normal piece; bump to 2-3 for heavy embroidery).
   Daily wage × Workers × Days calculates the cost.
   - **Cutting is the exception:** the master cuts several outfits a day, so in the cutting row's
     **Days** column enter **how many articles he cut that day** — the sheet divides his daily
     wage by that, charging this outfit only its share. **Default is 5** (the working average):
     Rs3,000 ÷ 5 = **Rs600**. Change it for a specific batch if he cut more (cheaper) or fewer.
4. **Sale Price:** enter it. **Overhead, selling costs, Total Cost, Net Profit & margin all
   calculate automatically** (labour/overhead pull from the Setup tab).
5. **Product details:** fill weight, lengths, neckline, customisations.

## Adding a brand-new material (one place only)
Add it on the **`Master Rate List`** tab in the first empty row: fill **Category, Item, Price,
Pack size, Unit**, then copy the **Unit cost** cell from the row above so it gets the ÷ formula.
Keep it **above row 300**. It instantly appears in the Cost Card dropdown — nothing else to do.

## The only exact values you ever type in a settings box (so you never have to ask)
- **Material dropdown range:** `='Master Rate List'!$B$4:$B$300`
- **Tab names (must match exactly):** `Master Rate List` · `Labour & Overhead Setup` · `Cost Card`

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
