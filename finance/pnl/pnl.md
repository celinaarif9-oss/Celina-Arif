# Monthly P&L dashboard

A one-page **Profit & Loss** for the founder and accountant: revenue → cost of goods → gross
profit → operating expenses → **net profit**, with margins and profit-per-article, across all 12
months of the year.

**Replaces:** working out "did we actually make money this month?" by hand from scattered numbers.

> Not tax or accounting advice. This is a management view — your **accountant confirms** the
> figures for any filing.

## How to set it up (once)
1. **File → Import → Upload** `pnl-dashboard.csv` into a Google Sheet → **Insert new sheet** →
   name the tab **`P&L`**. The `=` cells go live.
2. It opens with your **fixed monthly costs pre-filled** across every month (rent 260,000,
   electricity 70,000, ads 200,000, Pitch retainer 80,000, etc.). Overwrite any that change.

You can keep it in the **same workbook** as your costing (Master Rate List, Cost Cards) or as its
own sheet — it doesn't need to link to them.

## Each month — fill just the blue-sky inputs
Type these into that month's column; everything else calculates itself:

| Row | What to enter | Where it comes from |
|-----|---------------|---------------------|
| **Gross sales (online, excl. shipping)** | the month's product sales | Shopify → Analytics/Finance (use net product sales, not incl. shipping) |
| **Refunds / returns** | total refunded | Shopify |
| **Units sold** | number of articles sold | Shopify |
| **Materials used** | month's fabric/trims spend | your cost cards × units, or actual material purchases |
| **Production payroll** | total staff wages that month | your payroll |
| **Bank charges** | month's money-gone bank fees | HBL statement |
| **Shipping (your net cost)** | what shipping cost you *minus* what customers paid | courier bills vs Shopify shipping collected |
| **Other** | anything one-off | — |

**Auto-calculated:** Net revenue, Total COGS, **Gross profit + margin**, Pitch commission (8% of
gross sales), Total operating expenses, **Net profit + margin**, and **profit per article**. The
**Year** column on the right totals all 12 months.

## Reading it
- **Gross margin %** — how much is left after making the clothes (materials + production wages).
- **Net margin %** — what you actually keep after all overheads, marketing and commission.
- **Profit per article** — net profit ÷ units; a quick health check per piece.
- Scan a row **across the months** to spot trends (rising ads, thinning margin, seasonal peaks).

## Notes & assumptions
- **Pitch commission** auto-calculates at **8% of gross sales**. It applies to **online** sales
  only — if a month has offline/in-store sales, adjust that cell.
- **Fixed costs are pre-filled** with your current monthly figures. They run every month whether
  or not the store sold — so pre-launch months will show the fixed-cost burn until online sales
  begin (store launches August).
- **Production payroll vs. per-article labour:** the Cost Card allocates labour *per piece* for
  pricing; this P&L uses your *total monthly payroll* for the real monthly result. Both are
  correct for their job.
- **Tax** is not included — the net profit here is **before tax**. Your accountant handles
  withholding, sales tax and income tax filings.

## Feeds
The **Year** column and the monthly **Net profit** row are what a founder KPI dashboard would
chart over time.
