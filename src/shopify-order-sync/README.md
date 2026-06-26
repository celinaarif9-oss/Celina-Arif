# Shopify → Daily Orders (code path)

A small, reliable script that pulls recent **paid** orders straight from Shopify (with article,
size, custom measurements, quantity and price) and writes a CSV you import into the **Daily
Orders** sheet. This is the **code alternative to the Make.com scenario** — your CLAUDE.md
architecture says data work like this belongs in code, where it's robust and testable.

**Replaces:** exporting orders from Shopify and typing the production sheet by hand.

## One-time setup (≈5 min)

1. **Create a read-only Shopify token** (so the script can read orders):
   - Shopify admin → **Settings → Apps and sales channels → Develop apps → Create an app**.
   - **Configure Admin API scopes** → tick **`read_orders`** (and `read_products` if you want).
   - **Install app** → reveal the **Admin API access token** (starts `shpat_…`).
2. In the repo root, copy `.env.example` to `.env` and fill:
   ```
   SHOPIFY_STORE_DOMAIN=celina-arif-3dm.myshopify.com
   SHOPIFY_ADMIN_API_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxx
   ```
   `.env` is gitignored — the token never gets committed.

## Run it

```
node src/shopify-order-sync/sync.mjs
```

(Needs Node 18+. No `npm install` — it uses built-in fetch.) It writes
**`data/private/daily-orders.csv`** (gitignored, so real order data stays out of git) and prints
a count plus a rough gross-sales total.

## Put it in the sheet

In your **Daily Orders** Google Sheet: **File → Import → Upload** `daily-orders.csv` →
**Replace current sheet** (or **Append**). Columns line up with the sheet headers.

## Notes
- **No customer PII** (names/addresses) — production-sheet columns only.
- **Price/sales:** `line_total` is gross (a sum of paid line prices) — **not** net revenue
  (ignores refunds, gateway fees, shipping, FX). Treat the total as a pulse; the accountant owns
  the real numbers (Phase 4 finance).
- **Custom measurements** column fills automatically once the Globo field is live and saving the
  `Custom measurements` line-item property.
- To run it automatically (e.g. nightly), schedule `node sync.mjs` with cron or a task runner;
  or keep the Make.com scenario for live, per-order updates. They can coexist.
