# Phase 1 · Item 2 — Auto order sheet (Shopify → Google Sheet)

**Replaces:** exporting orders from Shopify and typing the production sheet by hand.

**Goal:** every **paid** order automatically adds a row to a live **"Daily Orders"** Google
Sheet the production team works from — order no., article, size, customisation, qty, status.
No typing.

> Built with **Make.com** (no-code, the team can see/toggle it). Internal only — nothing
> customer-facing, so no approval gate beyond switching it on once verified.

## The sheet — "Daily Orders"

Columns (header template in `../sheets/daily-orders-template.csv`):

| Column | Source (Shopify order) |
|--------|------------------------|
| `order_no` | order name (e.g. #1726) |
| `order_date` | created date |
| `article` | line item title (style name) |
| `size` | line-item property **Size** (incl. CUSTOM) |
| `sleeves` | line-item property **Sleeves** |
| `shirt_length` | line-item property **Shirt length** |
| `custom_measurements` | line-item property **Custom measurements** (once item 1 is live) |
| `qty` | line item quantity |
| `status` | manual — *New / In production / Done* (team updates) |
| `notes` | manual |

**No customer PII** on this production sheet (name/address live only on the delivery slip in
item 3). One **row per line item**, so multi-item orders produce multiple rows.

## The Make.com scenario

```
Trigger:  Shopify ▸ "Watch Orders"  (event: order paid / order create with financial_status = paid)
   │
Iterator: split the order's line items (one row each)
   │
Action:   Google Sheets ▸ "Add a Row"  → Daily Orders sheet
           map: order_no, order_date, article, size, sleeves, shirt_length,
                custom_measurements (from line-item properties), qty
           status = "New"
```

- **Size / Sleeves / Shirt length / Custom measurements** come from each line item's
  **properties** array — map by property name.
- Filter so only **paid** orders create rows (avoid unpaid/abandoned).

## Accounts needed (free tiers are fine)

1. **Make.com** account — make.com → sign up.
2. **Google account** + a blank Google Sheet named **"Daily Orders"** (import
   `daily-orders-template.csv` for the header row).
3. **Shopify connection** inside Make — authorised by the store owner or Pitch (read-only on
   orders is enough). *(No secret is committed; Make holds the connection.)*

## How to set it up (we'll do this together, click-by-click)

1. Create the Make.com + Google accounts above; create the "Daily Orders" sheet.
2. In Make: **Create a scenario** → add **Shopify ▸ Watch Orders** → connect your store.
3. Add **Iterator** on line items → add **Google Sheets ▸ Add a Row** → pick the Daily Orders
   sheet → map the columns above.
4. **Run once manually** with a recent order to verify the row lands correctly.
5. Only then **turn the schedule ON** (e.g. every 15 min, or instant via webhook).

**Done when:** a new paid order appears as a correctly filled row within minutes — no typing.

## Build status (in progress)

**Working end-to-end** ✅ — scenario built (Shopify *Watch orders* → GraphQL API call → Iterator
→ Google Sheets *Add a row*), Shopify connected via OAuth. Data confirmed flowing: a manual run
on a known order shows **Iterator ✓4** (line items reach the final step), correct Spreadsheet ID
pinned, column range `A-Z`, mappings intact (`title`, `variantTitle`, `quantity`).

**⚠️ Open blocker:** the **Google Sheets "Add a Row" step does not execute** even though the
Iterator hands it 4 items, and there is **no filter** on that link and **no red error** on the
canvas. Next diagnostic: open the run in **History → click the Google Sheets circle** to read why
it's "not executed" (or its error). Likely a module-level config the inspector will name. Until
then, use the **code path** (`src/shopify-order-sync/`) or a manual Shopify CSV export.

**Key finding:** Make's Shopify *Watch Orders* line item is **thin** — only IDs, prices,
inventory, quantity. **No product title, variant title, or properties.** So Article + size +
customisations can't be mapped from the trigger directly. Fix: fetch the full order via an API
call. *(Best finished on a laptop — inserting a module mid-flow is fiddly on a tablet.)*

### Recipe to finish (laptop)

1. **Insert a Shopify "Make an API Call" module between the trigger and the Iterator.**
   - To insert mid-flow: hover the route and use **Add a module**; if only the filter wrench
     appears, drag the Iterator's input off the trigger, add the API Call to the trigger's
     output, then reconnect the Iterator after it.
   - **URL:** `/admin/api/2024-10/orders/{{1.Legacy_resource_id}}.json`
   - **Method:** `GET`  (this returns the full order: titles, variant_title, properties)
2. **Repoint the Iterator** → Array = `{{2.body.order.line_items}}` (module 2 = the API call).
3. **Remap Google Sheets "Add a Row"** from the now-rich Iterator line item:
   - `article` (C) → `name` (e.g. "Alysa - S / Cap Sleeves / 32 inches") or `title` for product only
   - `size`/`sleeves`/`shirt_length` (D–F) → from `variant_title` (one combined value, or split)
   - `custom_measurements` (G) → `{{join(map(<lineitem>.properties; "value"; "name"; "Custom measurements"); ", ")}}`
   - `qty` (H) → `quantity`
4. **Date format** (B) → `{{formatDate(1.Created at; "YYYY-MM-DD")}}`.
5. **"Paid only" filter** on the route after the trigger → `{{1.Display_financial_status}}`
   **Equal to** `PAID` (confirm exact casing from a test run).
6. **Run once** to verify a clean row, then switch the schedule **ON** (e.g. every 15 min).

**Alternative:** this rich-data extraction is also a clean fit for the Node/TS layer (direct
Shopify Admin API) if Make's modules stay limiting — see CLAUDE.md architecture.

## For Pitch — two ways to finish (either is ~5 min)

The scenario is built and the code path is written; the only remaining piece needs developer
access. Pick one:

**Option A — code path (recommended, most reliable).**
1. Create a **read-only Admin API token** (scope `read_orders`). Shopify now routes "Develop
   apps" to the **Dev Dashboard** → Create app → add the `read_orders` scope → install on the
   store → copy the Admin API access token (`shpat_…`).
2. Add it to the repo `.env` as `SHOPIFY_ADMIN_API_TOKEN` (and `SHOPIFY_STORE_DOMAIN`).
3. Run `node src/shopify-order-sync/sync.mjs` → import the resulting
   `data/private/daily-orders.csv` into the Daily Orders sheet. (Schedulable via cron.)

**Option B — fix the existing Make scenario.** It runs successfully but the Google Sheets
"Add a Row" module was resolving the spreadsheet **by name** ("Search by path") and writing to a
**different "Daily Orders" file** than the team's. Fix: set Search Method to **Enter manually**,
point it at the **correct** Daily Orders spreadsheet ID (the file the team actually uses), Save,
verify one order lands, then switch the schedule **ON**. The trigger only fetches **new** orders,
so test with a fresh order rather than re-running old ones.

**Done when:** a new paid order lands as a correct row (article, size, qty, price) in the team's
Daily Orders sheet, automatically.
