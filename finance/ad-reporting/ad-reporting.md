# Ad reporting + alerts (Phase 3)

See whether your Meta ad spend is actually working — and get an **automatic ⚠ flag** when a
campaign underperforms — so you can judge ads yourself instead of taking the agency's word.

**Replaces:** "the ads are doing well, trust us."

## Setup
1. **File → Import →** upload `ad-report-template.csv` into a Google Sheet → name the tab
   **`Ad Report`**. The `=` cells go live.
2. Set your **TARGETS** (top): **Target ROAS** (e.g. 3) and **Max cost per purchase** (e.g.
   Rs.8,000). These drive the alerts — adjust to your real targets.

## Each week (or per campaign) — ~5 min
1. **Meta Ads Manager** → set the date range → **Columns: Performance** → note (or **Export**):
   **Amount spent, Impressions, Link clicks, Purchases, Purchase conversion value**.
2. Paste one row per campaign into the table (from row 14 down): `campaign`, `period`,
   `amount_spent`, `impressions`, `link_clicks`, `purchases`, `purchase_value`.
3. **ctr, roas, cpp, and the flag calculate themselves.** Drag the formula row down for more rows.

## What the columns tell you
- **ROAS** = purchase value ÷ spend. *Rs back per Rs1 spent.* Above your target = healthy.
- **CPP** (cost per purchase) = spend ÷ purchases. *What each order costs you in ads.* Keep it a
  small fraction of your ~Rs50k AOV.
- **CTR** = link clicks ÷ impressions. Low CTR (<1%) usually means the **creative** isn't landing.
- **Flag** = **⚠ review** if ROAS is below target **or** CPP is above your max; otherwise **✓ ok**.

## When a campaign flags ⚠
1. **Low ROAS / high CPP** → the campaign isn't paying back. Pause or cut its budget; shift to a
   winning one.
2. **Low CTR but decent reach** → creative problem — try a new image/caption.
3. **High spend, few purchases** → check the audience/targeting, or whether checkout is working.
4. If Pitch runs the campaign, this is your **evidence to ask them to fix or justify it.**

## Ties into the rest
- The **Total spend** here is the **ad-spend figure** you drop into the **KPI dashboard** each month.
- ROAS here is **campaign-level** (per ad); the dashboard's blended ROAS is all revenue ÷ all
  spend. Both together = the full picture.

## Note
Numbers are only as honest as the export — pull from Ads Manager directly. This is a management
view to spot trends and problems early, not a substitute for the accountant's P&L.
