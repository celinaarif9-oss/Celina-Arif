# Article costing — Cost Card (Phase 3 / finance foundation)

Cost a single design **properly** — direct materials, direct labour, and overhead — so every
downstream number (price, profit per article, the dashboard) is built on a real cost, not a guess.

**Replaces:** pricing by gut feel, or a single lump "cost" with no breakdown.

## How the pieces connect

```
Cost Card (this file)  →  Pricing Calculator  →  KPI Dashboard
 detailed cost of          + 50% markup + DHL      profit per article
 ONE design                = local & intl price
```

The Cost Card's three subtotals drop straight into one Calculator row:
**Materials subtotal → `materials_cost`, Labour subtotal → `labour_cost`, Overhead amount → `overhead`.**

## Setup

1. Open your finance Google Sheet (the one that will hold the Calculator + Dashboard).
2. **File → Import → Upload** `cost-card-template.csv` → **Insert new sheet** → name the tab
   **`Cost Card`**. The `=` cells become live formulas.
3. Also import **`overhead-pool-template.csv`** as a tab named **`Overhead Pool`** — it sets your
   monthly overhead %.
4. To cost several designs, **duplicate the Cost Card tab** (right-click → Duplicate) — one per design.

## How to fill a Cost Card (5 minutes per design)

Fill only **Qty** and **Rate (PKR)** — every **Amount** and subtotal calculates itself.

- **Direct materials** — main fabric, contrast, lining, embroidery/handwork material, trims,
  dupatta, packaging. For *per-metre* items enter metres × rate. For *lump* items (e.g. a
  handwork bundle) enter **Qty = 1** and put the whole cost in **Rate**.
- **Direct labour** — cutting, stitching, embroidery (karigar), finishing/QC. Same rule: piece
  rate × qty, or Qty 1 + lump in Rate.
- **Made-to-order add-ons** — if a customisation adds fabric or handwork, add a line for it so
  the customised piece carries its true cost.

> Edit the line items to match how *you* actually buy and make — add/rename rows freely. The
> rates are **yours to enter**; nothing is pre-filled with invented numbers.

## Overhead — the two-bucket method (the important bit)

Your costing sheet groups two different cost types under "overhead." They must be handled
differently, or the maths breaks:

### Bucket 1 — Factory overhead (rent, electricity, water, maintenance, Shopify subscription)
Fixed, shared, monthly. You can't know one dress's share, so **pool it monthly and spread it**:

1. In the **Overhead Pool** tab (`overhead-pool-template.csv`), enter the month's rent,
   electricity, water, maintenance, Shopify subscription → it totals them.
2. Enter the month's **total prime cost** (all articles' materials + labour).
3. It returns an **overhead rate (% of prime)**. Put that % in the Cost Card's overhead row.
4. **Update it monthly, not per design** — this is what removes the "manual every time" pain.
   Heavier pieces carry proportionally more overhead, which is fair.

### Bucket 2 — Selling costs (commission 8%, gateway/Shopify fee, ads, bank charges)
These scale with the **sale**, not the article — so they're a **% of the selling price**, taken
*after* price, to show **net profit**. They are **not** in the production cost, and **not** in
the markup base.

> ⚠️ Why not just add commission/ads into cost and mark up? Because commission is **8% of the
> price** — if it's in the cost, and price = cost × 1.5, the price depends on a cost that depends
> on the price. Circular. Keeping selling costs as a % of price avoids this entirely.

The Cost Card already has both: an **allocated factory-overhead** line (Bucket 1) feeding
**Production Cost**, then a **Selling Costs** block (Bucket 2) feeding **Net Profit / margin**.
Known rates are pre-filled — commission **8%**, gateway **~1.36%** (0.5% + 0.86%); you add your
**bank charges %** and **ads %** (monthly Meta spend ÷ monthly revenue).

This is a **costing convention, not accounting** — your accountant should confirm the overhead
basis for any formal reporting.

## Pricing (already on the card)

- **Markup on cost = 50%** (confirmed). Suggested **local price** = Total Cost × 1.5, rounded up
  to the nearest Rs.500.
- **International price** = local price + DHL by destination — use the **Pricing Calculator**,
  which already holds the full DHL zone rate card.

## What I need from you to finish it
1. The **rates** for one real article (materials metres × rate, labour) — drop them in and the
   card computes.
2. The month's **fixed overhead figures** (rent, electricity, water, maintenance, Shopify sub)
   plus **monthly prime cost** → goes in the Overhead Pool tab, which sets the %.
3. Your **bank charges %** and a starting **ads %** (monthly Meta spend ÷ monthly revenue).
