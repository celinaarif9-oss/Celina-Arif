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
3. To cost several designs, **duplicate the tab** (right-click → Duplicate) — one card per design.

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

## Overhead — pick one method

Overhead = the shared costs not tied to one piece (factory rent, utilities, machine
depreciation, supervisor/indirect salaries, sampling/wastage).

- **Recommended — % of prime cost.** Enter a single % in the Rate column of the Overhead row;
  the card applies it to (materials + labour). It scales with complexity — a heavy bridal
  carries more overhead than a simple pret. **To set the %:** `monthly overhead ÷ monthly
  prime cost`. *(Tell me your monthly overhead total and rough monthly material+labour spend
  and I'll work out the %.)*
- **Alternative — flat per article.** If you'd rather, divide total monthly overhead by your
  ~96 articles/month and enter that rupee figure instead (change the Overhead row to a lump).

This is a **costing convention, not accounting** — your accountant should confirm the overhead
basis for any formal reporting.

## Pricing (already on the card)

- **Markup on cost = 50%** (confirmed). Suggested **local price** = Total Cost × 1.5, rounded up
  to the nearest Rs.500.
- **International price** = local price + DHL by destination — use the **Pricing Calculator**,
  which already holds the full DHL zone rate card.

## What I need from you to finish it
1. Confirm/adjust the **material & labour line items** to match your real process.
2. Your **overhead approach** (the %, or a flat per-article figure) — or send me the monthly
   overhead + production numbers and I'll set the %.
