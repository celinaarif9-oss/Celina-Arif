# Phase 1 · Item 3 — Branded packing & delivery slips

**Replaces:** printing production sheets and building delivery sheets by hand.

**Goal:** from any order, generate a branded **production/packing slip** and **delivery sheet**
as a one-click PDF — single order or in bulk — with the customisations already on them.

Templates live in [`../print-templates/`](../print-templates/):
- `packing-slip.liquid` — workroom: article, size/options, customisation, qty (no address).
- `delivery-sheet.liquid` — dispatch: name, address, contact, email + articles.

## App

**Order Printer Pro** (recommended in the plan). *Free alternative:* Shopify's own **Order
Printer** app works too — the templates are standard Liquid; with Order Printer you may need to
swap `order.name` → `order_name`, `order.line_items` → `line_items`, and
`order.shipping_address` → `shipping_address` (bare variables instead of the `order.` object).

## Setup (you/Pitch, in Shopify admin)

1. Install **Order Printer Pro** from the Shopify App Store. *(Confirm the plan/price; a light
   tier is fine for this volume.)*
2. Open the app → **Templates** → **Create template** → name it **"Packing slip"**.
3. Paste the entire contents of `packing-slip.liquid` → **Save**.
4. Repeat: new template **"Delivery sheet"** → paste `delivery-sheet.liquid` → **Save**.
5. *(Optional brand polish)* swap the `Celina Arif` text header for your logo: replace the
   `<div class="ca-brand">Celina Arif</div>` line with
   `<img src="YOUR_LOGO_URL" style="height:48px;">` (upload the logo in Shopify → Content → Files
   and copy its URL).
6. **Preview** each on a real order and tweak spacing/fonts to taste.

## How to use (the team, daily)

**One order:** Shopify → **Orders** → open the order → **More actions → Print with Order Printer
Pro** → tick **Packing slip** and/or **Delivery sheet** → Print or Save as PDF.

**A batch (dispatch routine — recommended):** do this **inside the app**, because Shopify's
native bulk "Print packing slips" uses Shopify's *default* template, **not** our branded one.
Go to **Apps → Order Printer Pro → Orders** tab → filter/select the orders going out → **Print**
→ choose **Packing slip** or **Delivery sheet** → one combined branded PDF → print the stack.
*(Optional: the app has a setting to add a bulk-print button onto Shopify's own Orders page.)*

**A typical dispatch run:** select the day's paid/unfulfilled orders → print **Delivery sheets**
(for packages/courier) + **Packing slips** (for the workroom) → pack → mark fulfilled.

**Hands-off option:** Order Printer Pro's **Automated PDFs** can auto-generate the slips the
moment an order is paid, so they're ready with no clicking — set up when ready.

**What it replaces:** no more hand-building or re-typing production and delivery sheets.

## Notes
- The packing slip auto-shows each line item's **customisation** (line-item properties),
  including Globo **Custom measurements** once that field is live on orders. Native Size/Sleeves/
  Length already show via the variant.
- Hidden helper properties (names starting with `_`) are filtered out automatically.
- **Approval gate:** installing the app on the live store is your call. Printing itself is
  internal and on-demand — no customer message, so no further gate.
- The delivery sheet contains customer address/contact by design (it's the dispatch sheet);
  that data is pulled live from the order, never stored in the repo.
