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

**Working end-to-end** ✅ — scenario built (Shopify *Watch orders* → Iterator → Google Sheets
*Add a row*), Shopify connected via OAuth, test run wrote real orders to "Daily Orders".
Currently mapped: `order_no` (Shopify **Name**), `order_date` (**Created at**), `qty`
(Iterator **Quantity**), `status` (static "New").

**Remaining to finish:**
- [ ] **Article (col C)** — Make's Shopify line item doesn't expose a plain "Title"; locate the
      line-item **Name**/variant field, or add a Shopify *Get a Product* step by product ID.
- [ ] **Size / Sleeves / Shirt length (D–F)** — these are Shopify **variant options**; map from
      the line item's **variant title** (and split), or option fields.
- [ ] **Custom measurements (G)** — from the line item **Properties** once Globo is live; use
      `{{join(map(2.Properties; "value"; "name"; "Custom measurements"); ", ")}}`.
- [ ] **Date format** — currently raw ISO (`2025-05-04T18:23:55.000Z`); prettify with
      `formatDate` for the team.
- [ ] **"Paid only" filter** on the link after the trigger (financial status = paid).
- [ ] **Go automatic** — switch from *Run once* to a schedule (e.g. every 15 min) once verified.
