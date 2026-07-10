# Marketing & ROAS dashboard

The one screen that answers **"is our marketing paying off?"** — across all 12 months of
FY 2025–26, pre-filled with your **real** numbers from the P&L.

**Replaces:** taking Pitch's word for "the ads are working." Now you can see it yourself.

> Management view, before tax. The accountant owns the statutory P&L. Meta's attributed ROAS
> over-counts (it claims credit for sales it only *touched*); the blended ROAS under-counts
> (it ignores that a sale had many touchpoints). The truth sits between them — watch the trend.

## How to open it (once)
1. **File → Import → Upload** `marketing-roas-2025-26.csv` → **Insert new sheet** → name the
   tab **`Marketing`**. The `=` cells go live.
2. The top block (Sale, Ad spend, Pitch, Total marketing, Marketing %, Blended ROAS) is
   **already filled from your P&L** — nothing to type.
3. Format the % row and ROAS rows: select the cells → **Format → Number → Percent** (for
   Marketing %) or leave ROAS as a plain number (e.g. `24.7` = Rs24.70 of sales per Rs1 of ads).

## To sharpen it — add two numbers per month (~3 min)
Only two inputs are missing, and both are easy to pull:

| Row | What to enter | Where it comes from |
|-----|---------------|---------------------|
| **Units / orders sold** | number of orders that month | Shopify → Analytics |
| **Meta attributed purchase value** | the "Purchases conversion value" Meta reports | Meta Ads Manager → set the month → column **Purchases conversion value** |

Then **Meta attributed ROAS** and **Marketing cost per order** fill themselves.

## What the numbers already say (FY 2025–26)

| Metric | Value |
|---|---|
| Total sales | Rs 33.50M |
| Ad spend (Meta) | Rs 1.35M (4.0% of sales) |
| Pitch (commission + retainer) | Rs 3.08M (9.2% of sales) |
| **Total marketing** | **Rs 4.44M — 13.2% of sales** |
| Blended ROAS on ad spend | **24.7×** |
| Blended return on *total* marketing | 7.5× |

**Three things stand out:**

1. **Ad spend is small; Pitch is the bulk.** Of every Rs100 of marketing, only ~Rs30 is actual
   Meta ad spend — ~Rs70 is Pitch's commission + retainer. If you want to cut marketing cost,
   **Pitch is the lever, not the ad budget.**

2. **Sales don't track ad spend — brand/organic is doing the heavy lifting.** The two biggest
   months tell it plainly:
   - **Feb:** Rs8.4M sales on Rs186k ads → **45× blended**.
   - **Mar:** Rs3.4M sales on Rs71k ads → **48× blended**.
   - **May & Jun:** ad spend was **zero**, yet sales were Rs3.75M and Rs1.15M.

   A blended ROAS of 24× is not "the ads are genius" — it means **most sales aren't coming from
   ads at all.** That's a strong brand, but it also means there's little proof the ad rupees are
   pulling their weight. **The Meta attributed-value input above is what settles it** — until
   that's in, we can't separate "ads drove it" from "it would have sold anyway."

3. **Marketing % is lowest in your best months** (Feb 10%, Jun 7%) and highest in the quiet ones
   (Dec 27%, Aug 26%). That's normal — fixed Pitch retainer spread over low sales. The watch-out
   is quiet months where you're paying 25%+ of sales to marketing for little return.

## What to do with it
- **Add the Meta attributed value** for at least the last 3–4 months. If Meta-attributed ROAS is
  strong (say 4×+), the ad spend is earning its keep — consider *more*. If it's weak, the ads are
  riding on brand and the money is better spent elsewhere.
- **Question the Pitch retainer + 8%** against what it delivers — it's Rs3.08M/year, your single
  biggest marketing line. This dashboard is your evidence for that conversation.
- Pair with the **per-campaign `ad-reporting` sheet** to see *which* specific ads work; this
  dashboard is the monthly altitude view, that one is the campaign-level zoom.

## Ties into the rest
- Numbers flow **from** `pnl-2025-26-actuals.csv` (Sale, Advertising, Marketing-Pitch rows).
- Feeds the founder **KPI dashboard** (marketing cost ratio + ROAS lines).
- Once the Shopify store + Meta API are wired (Phase 3), units, sales and ad spend can auto-fill.
