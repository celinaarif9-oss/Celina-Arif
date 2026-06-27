# KPI dashboard (Phase 3)

Your at-a-glance oversight screen: **revenue, growth, profit per article, ROAS, and net
profit** — one tab, updated monthly in ~5 minutes. Built so you can judge marketing yourself
instead of relying on the agency's reporting.

**Replaces:** asking Pitch "how did we do?" and taking the answer on trust.

## One-time setup

The dashboard reads article economics from your **Pricing Calculator**, so they live in the
**same Google Sheet workbook**.

1. Open the workbook that has your pricing calculator. Make sure that tab is named exactly
   **`Calculator`** (right-click the tab → Rename). The dashboard reads **column E
   (total_cost)** and **column F (local_price)** from it.
2. Add the dashboard: **File → Import → Upload** `kpi-dashboard-template.csv` →
   **Insert new sheet(s)** → rename the new tab **`Dashboard`**. (The `=` cells become live
   formulas on import, including the link to the Calculator tab.)
3. Format the % rows (Growth, Marketing cost ratio, ROAS, Net margin) as needed:
   select the cell → **Format → Number → Percent** (ROAS reads better as a plain number, e.g.
   `4.2` = Rs.4.20 back per Rs.1 of ads).

## Each month (~5 minutes)

Paste these into the **INPUTS** block (yellow cells in rows 5–12):

| Input | Where it comes from |
|-------|---------------------|
| Gross sales (incl shipping) | Shopify → Analytics/Reports (or your sales sheet) |
| Shipping | Your consignee ledger total for the month |
| Refunds / returns | Shopify reports |
| Articles (units) sold | Shopify reports (number of items) |
| **Ad spend — Meta** | **Meta Ads Manager → set date range to the month → Reports/Export → "Amount spent"** |
| Pitch commission | The figure from your commission-audit sheet |
| Pitch retainer | Rs.80,000 (fixed) |
| Previous month net revenue | Last month's "Net product revenue" (for the growth %) |

Everything else calculates itself.

### Getting the Meta ad numbers (what Pitch told you to download)
In **Meta Ads Manager**: set the date range to the month → **Reports** (or the **Export**
button) → you want **Amount spent**. While you're there, Meta also shows **Purchase ROAS** and
**Purchases conversion value** — those give you the *platform-attributed* ROAS (revenue Meta
thinks its ads drove). You can drop that straight in as a second ROAS reading (see note below).

## What each number means

- **Net product revenue** = gross − shipping − refunds. Shipping is a pass-through (you collect
  it and pay the courier), so it's stripped out to avoid flattering the numbers.
- **Profit per article** = avg sale price − avg cost, pulled live from the Calculator. As you
  add real articles to the calculator, this sharpens automatically.
- **Gross profit** = net revenue − estimated product cost (units × avg cost).
- **ROAS (blended)** = net revenue ÷ total ad spend — *all* revenue over *all* ad spend. This is
  deliberately conservative: a lot of your sales come from word-of-mouth/organic, so blended
  ROAS will read lower than Meta's attributed "Purchase ROAS." Watch the **trend**, and compare
  it against Meta's own ROAS for a fuller picture.
- **Marketing cost ratio** = (ads + commission + retainer) ÷ net revenue — the share of revenue
  going to all marketing. A key lever as you weigh how much you still need Pitch.
- **Net profit / margin** = gross profit − all marketing − other costs. A management view, not a
  statutory P&L.

## Assumptions & limits (read once)

- This is a **management dashboard, not accounting.** It does **not** yet subtract gateway fees
  (~0.5% + 0.86%), FX on international payouts, salaries, rent, or overheads beyond what's in the
  article cost. The **accountant owns the true P&L** (Phase 4).
- **Profit per article** uses *averages* from the Calculator; a month skewed to heavier formals
  or more discounts will differ. Treat it as a guide, not a guarantee.
- Numbers are only as good as the inputs — paste from real reports, not estimates.
- **Automation later:** once the Shopify store launches (August), gross sales, shipping, units
  and refunds can flow in automatically, and the Meta spend can be pulled via the API — turning
  this into a near-zero-effort monthly screen (Phase 3 ad-reporting item).

## May 2026 (pre-filled to show it working)

Gross Rs.3,475,450, shipping Rs.661,200 → **net product revenue Rs.2,814,250**. Commission and
retainer are in; add your **units sold** and **Meta ad spend** from the export and the
profit/ROAS/net-profit lines complete themselves.
