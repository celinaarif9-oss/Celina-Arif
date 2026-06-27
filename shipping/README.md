# Shipping rates — Phase 2, item A (weight-based)

Weight-based shipping rates for the Shopify checkout, built from DHL's real rate card +
your local consignee quote. Your Shopify **Basic** plan can't show live carrier rates, so
these are flat **weight bands** — accurate enough, and they never undercharge.

**Replaces:** guessing shipping, charging a flat fee that loses money on heavy/far orders,
or quoting every international customer by hand.

## The files

| File | What it is |
|------|------------|
| `international-rates.csv` | Per **DHL zone**, the price for each weight band (DHL cost rounded **up to nearest Rs.1,000**). |
| `local-rates.csv` | Domestic price per weight band (consignee cost **+ Rs.200** petrol buffer). |
| `zone-countries.csv` | Which countries belong to each DHL zone — use this to build the Shopify zones. |
| `build-shipping-rates.mjs` | The generator. Re-run it if DHL/consignee rates change (see bottom). |

## Pricing model (so you can sanity-check)

- **Product price stays the LOCAL price** (cost × 1.5). Everyone sees the same product price.
- **International customers** pay that **+ DHL shipping** at checkout → lands at the all-in
  `intl_price` your pricing calculator already shows. **No double charge.**
- **International rate** = real DHL non-doc cost at the band's top weight, rounded **up to
  Rs.1,000** (a 0–1,000 cushion for fuel/FX swings).
- **Local rate** = consignee cost (1kg Rs.800, 2kg Rs.1,400, ≈ +Rs.600/kg) **+ Rs.200**.
  ⚠️ Local rates **above 2 kg are estimated** at +Rs.600/kg — confirm the real figures with
  your consignee and update `local-rates.csv` (or tell me and I'll regenerate).
- **8 kg+** (rare — 3+ formals) = **"Contact for quote"** so a giant order never ships at a loss.

## How to set it up in Shopify (≈20–30 min, one time)

> This edits your **live checkout** — a Human-Approval step. Review the numbers first, then
> you (not the app) enter them.

**Settings → Shipping and delivery → Manage rates** (under your shipping profile):

1. **Domestic (Pakistan):**
   - Find the **Pakistan** shipping zone (or create it).
   - **Add rate → Use flat rate → Set up your own → Add conditions → Based on item weight.**
   - Add one rate per row in `local-rates.csv` (e.g. *0–1 kg → Rs.1,000*, *1–2 kg → Rs.1,600*…).
2. **International — one Shopify zone per DHL zone:**
   - **Create shipping zone** → name it e.g. **"Zone 3 — UK & nearby"** → add the countries
     listed for that zone in `zone-countries.csv`.
   - Inside it, **Add rate → weight conditions** using that zone's row in `international-rates.csv`.
   - Repeat for each zone you actually ship to. **Tip:** you don't have to build all 13 at once
     — start with your active markets (see below), add the rest later. Put any unbuilt countries
     in a **"Rest of world"** zone priced at **Zone 10** rates (the highest) so you never undercharge.
3. For the **8 kg+** band, either leave no rate (customer must contact you) or add a high
   placeholder and quote manually.

### Your main markets (quick reference)

| Market | DHL zone | Build first? |
|--------|----------|--------------|
| UK | Zone 3 | ✅ |
| USA / Canada | Zone 8 | ✅ |
| UAE | Zone 12 | ✅ |
| Saudi Arabia | Zone 13 | ✅ |
| Australia | Zone 11 | ✅ |
| Europe (France, Germany, Spain…) | Zone 4 | ✅ |
| Qatar, Bahrain | Zone 1 | optional |
| Kuwait, Oman, Sri Lanka, Bangladesh, Nepal, Turkey, Jordan | Zone 2 | optional |

## Keeping it current

When DHL or your consignee changes prices, update the source CSVs in
`finance/pricing-calculator/data/` (DHL) or the constants at the top of
`build-shipping-rates.mjs` (local buffer/cost), then run:

```
node shipping/build-shipping-rates.mjs
```

It rewrites all three CSVs. Then update the changed rates in Shopify.
