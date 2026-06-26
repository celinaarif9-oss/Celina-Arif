# Print templates (Phase 1, item 3)

Branded **Order Printer Pro** templates for one-click PDFs from any Shopify order.

- **`packing-slip.liquid`** — internal production/packing slip: article, size/options,
  customisation (incl. Globo "Custom measurements" once live), quantity. **No customer address.**
- **`delivery-sheet.liquid`** — dispatch sheet: name, address, contact, email + articles.

Both use the standard `order` Liquid object, so no real data lives in these files — the order's
details are filled in at print time. Setup + how-to-use: see
[`docs/phase1-item3-print-slips.md`](../docs/phase1-item3-print-slips.md).
