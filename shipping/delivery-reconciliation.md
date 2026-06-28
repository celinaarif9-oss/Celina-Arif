# Shipping reconciliation — charged vs cost (Phase 2/3)

Checks whether the delivery charges customers paid on **Shopify** cover what your **consignee**
actually charged you — so you know if shipping is paying for itself or eating into margin.

**Replaces:** assuming shipping nets out, and only finding out at year-end that it didn't.

> ⚠️ **PII — keep the filled sheet private.** The consignee ledger lists customer names and
> addresses. Do the reconciliation in a **private Google Sheet** (or `data/private/`, which is
> gitignored). **Never commit the filled version.** The template in the repo is blank headers only.

## What you'll need (pull tomorrow)

1. **Shopify shipping charged (May):** Shopify admin → **Orders → Export → CSV** (date range =
   May, paid orders). The export has a **`Shipping`** amount per order — that's what each customer
   paid for delivery.
2. **Consignee cost (May):** your delivery ledger — per shipment, and the **Rs.661,200** total
   we already confirmed.

## How to run it

1. **File → Import →** upload `delivery-reconciliation-template.csv` into a **private** Google
   Sheet → the `=` cells go live.
2. From **row 10 down**, paste one line per order: `order_ref`, `destination`,
   `shipping_charged_pkr` (from Shopify), `consignee_cost_pkr` (from the ledger). Match them by
   **customer/consignee name** (or AWB).
3. Drag the **variance** formula (column E) down — it's `charged − cost` per order.
4. Read the **SUMMARY** at the top:
   - **Total charged vs total cost**, and the **variance**.
   - The consignee total should reconcile to **Rs.661,200**.

## What to look for

- **Overall variance** — positive means shipping covered itself; negative means you absorbed it.
- **Local orders** will likely show a **loss**: your new flat rate is **Rs.500**, but the
  consignee charges you **Rs.800–1,400** per local parcel — so expect ~Rs.300–900 absorbed on
  each. That's the deliberate "premium, near-free local" choice (matches Sania/Nadia) — this
  just quantifies the cost of it.
- **International orders** should roughly **net out** (you pass DHL through at cost).
- **Per-order red flags** — e.g. shipping **charged Rs.0** on an order that **cost Rs.17,500**:
  a free-shipping giveaway or a misconfigured rate. The row variance surfaces these instantly.

## May 2026 result (top-line)

| | Amount |
|---|---|
| Shipping charged to customers (Shopify finance summary) | Rs 603,336 |
| Shipping cost (consignee ledger) | Rs 661,200 |
| **Net absorbed** | **Rs 57,864** (8.8% of cost; 91.2% covered) |

**Read:** shipping is being charged and broadly covers cost. The ~Rs 58k shortfall is the
**local** flat rate sitting below the consignee's Rs.800–1,400 local charge (international is
passed through at cost). Decision: keep absorbing it (premium near-free local), or lift the
local flat rate toward Rs.800. A per-order export would split local vs international exactly.

## Note

The flat Rs.500 local / DHL-international rates we set up apply going forward (store launch).
For **May**, this reconciles whatever was actually charged then — so the result is a true
read on May's shipping position, and a baseline to watch once the new rates are live.
