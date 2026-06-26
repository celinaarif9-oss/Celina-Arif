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

## Run it automatically (recommended — GitHub Actions, no laptop needed)

The workflow `.github/workflows/order-sync.yml` runs this sync in the cloud on a schedule, with
the token stored securely as a **GitHub secret** (never in code or chat).

**One-time setup (you):**
1. On GitHub → your repo → **Settings → Secrets and variables → Actions → New repository secret**.
   Add two secrets:
   - `SHOPIFY_STORE_DOMAIN` = `celina-arif-3dm.myshopify.com`
   - `SHOPIFY_ADMIN_API_TOKEN` = the app automation token you generated
2. Go to the **Actions** tab → **Order sync** → **Run workflow** (manual test).
3. When it finishes (green ✓), open the run → **Artifacts → daily-orders** → download the CSV.
4. Import it into the **Daily Orders** sheet (File → Import → Upload → **Replace current sheet** —
   it's a fresh snapshot of recent paid orders each run).

After that it runs **daily on its own**; trigger it any time with **Run workflow**. (A red ✗ run
means the token can't read orders — tell me and we'll fix the scope/token.)

### ⏳ Token status (pick up here next session)
The Dev Dashboard app **"Order Sync" is created and installed** on the store with `read_orders` +
`read_products` (scopes granted on the install consent screen). A first CI run failed with
**`Shopify API 401: Invalid API key or access token`** — because the **"App automation token"**
(Settings → App automation token) is for **CI/CD app-management, not the store Admin API**, so the
Admin API rejects it.

**Next step — get the real Admin API access token:**
- Easiest if available: check the installed app for an **Admin API access token** to reveal
  (Overview → Installs, or an "API access" area).
- Otherwise, do the **OAuth authorize** once: add a **Redirect URL** to the app version, open
  `https://celina-arif-3dm.myshopify.com/admin/oauth/authorize?client_id=<CLIENT_ID>&scope=read_orders,read_products&redirect_uri=<REDIRECT>&state=x`,
  approve, copy the `code` from the redirect, then exchange it (with the client secret) at
  `POST /admin/oauth/access_token` for the token (`shpat_…` / offline token).
- Put that token in the `SHOPIFY_ADMIN_API_TOKEN` GitHub secret (replacing the automation token)
  and re-run the workflow.

## Notes
- **No customer PII** (names/addresses) — production-sheet columns only.
- **Price/sales:** `line_total` is gross (a sum of paid line prices) — **not** net revenue
  (ignores refunds, gateway fees, shipping, FX). Treat the total as a pulse; the accountant owns
  the real numbers (Phase 4 finance).
- **Custom measurements** column fills automatically once the Globo field is live and saving the
  `Custom measurements` line-item property.
- To run it automatically (e.g. nightly), schedule `node sync.mjs` with cron or a task runner;
  or keep the Make.com scenario for live, per-order updates. They can coexist.
