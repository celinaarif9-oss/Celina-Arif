# Courier apps + auto-tracking — Phase 2B

Book couriers and get the tracking number onto the Shopify order **automatically**, so no one
types tracking numbers and every customer gets a shipping email the moment a parcel is booked.

**Replaces:** logging into each courier portal, copying tracking numbers into Shopify by hand,
and emailing customers their tracking link one by one.

## The stack (both apps are free to install — you only pay the couriers)

| Orders | App | Couriers | What it does |
|--------|-----|----------|--------------|
| **International** (~60%) | **DHL Express (Official)** — "DHL Express Commerce" | DHL | Books DHL, prints label, **auto-writes tracking back to the Shopify order**. |
| **Local** (~40%) | **Universal Courier Pakistan** | Leopards, TCS | Books the parcel, prints label, **auto-syncs tracking + delivery status** to Shopify. |

> **Skynet:** dropped for online orders (June 2026 decision) — local goes through Leopards & TCS.
> If you ever need Skynet again it has its own app (*Skynet Worldwide Express*); add it then.

## How the automation works (and where a human stays in the loop)

1. A paid order comes in.
2. **A team member selects the order(s) and clicks "Book"** in the right app (DHL for
   international, Universal for local). 👉 *This step is human on purpose* — booking commits
   money to a courier, which is a Human-Approval action in CLAUDE.md. The app never books on
   its own.
3. The app creates the shipment, prints the label, and **writes the tracking number into the
   Shopify order automatically**.
4. Shopify marks the order **fulfilled** and sends the customer its **branded shipping email
   with the tracking link** — automatically. No copy-paste, no manual customer message.

So the *decision to ship* stays human; everything after it is automatic.

## One-time setup

> Each app needs that courier's **account + API credentials**. These come from your courier
> accounts (Pitch likely holds the local ones). Credentials go **into the app**, never into
> this repo.

### A) DHL Express (Official) — international
1. Shopify admin → **Apps → Shopify App Store** → search **"DHL Express"** → open the one
   marked **(Official)** / *DHL Express Commerce* → **Install**.
2. In the app, **connect your DHL Express account** using your **account number + API
   credentials**. *(You have the account number. If the app also asks for API/"DHL Express
   Commerce" access keys, request those once from your DHL account rep — tell them you're
   connecting DHL Express Commerce to Shopify.)*
3. Set your **pickup address** (DHA Karachi) and default service (e.g. *DHL Express Worldwide*).
4. Send one **test booking** on a real order to confirm the tracking number lands on the
   Shopify order and the customer email fires.

### B) Universal Courier Pakistan — local
1. App Store → search **"Universal Courier Pakistan"** → **Install**.
2. In the app, **connect Leopards** and **TCS** using each one's **merchant API key / login**
   (from your Leopards and TCS business accounts — Pitch likely has these).
3. Set your **pickup address** and label size.
4. **Test book** one local order; confirm tracking + status sync back to Shopify.

## Daily use (for the team — no tech skills needed)

1. Open the app for the destination: **DHL Express** (abroad) or **Universal Courier** (Pakistan).
2. Tick the new paid orders → **Book** → **Print labels**.
3. Hand parcels to the courier. Done — Shopify and the customer are updated automatically.

**Tip:** book international and local in two quick passes (one app each) rather than order by order.

## Notes
- **No customer messages are AI-sent.** Shopify's shipping email is its standard transactional
  email, triggered by your team's booking — fine under the Human-Approval rule.
- **Costs:** both apps free to install; you pay DHL and the local couriers exactly as today.
- **Returns / cancellations** are handled inside each app — not automated here (a refund/return
  is an irreversible, money action → keep it human).
