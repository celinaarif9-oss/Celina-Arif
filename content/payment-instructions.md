# Phase 1 · Item 5 — Automated bank / Western-Union instructions (draft for approval)

**Replaces:** manually sending bank/WU details to every customer who picks those methods.

**Goal:** a customer who chooses **Bank Transfer** or **Western Union** automatically sees the
correct details at checkout and on the confirmation page, **and** gets them by email — no manual
send.

> ⚠️ **Customer-facing — approval gate.** You approve the wording and switch it on; after that it
> runs. **Confirming the money actually arrived before you dispatch stays a human step**
> (auto-reconciliation is Phase 4).
>
> 🔒 Real bank/WU details go **only into Shopify**, never into this repo — placeholders below.

## How it works (free, native)

Shopify **manual payment methods** (Settings → Payments) let you add custom methods with a
**Payment instructions** field. Those instructions show automatically at checkout, on the
order-confirmation/thank-you page, and in the order status page — and are included in the order
confirmation email. No app, no cost.

---

## Bank Transfer — instructions (placeholders → fill in Shopify)

> Thank you for your order. To complete it, please transfer the **full order total — including
> shipping** (the amount shown at checkout) to:
>
> **Account title:** [ACCOUNT NAME]
> **Bank:** [BANK NAME]
> **Account number:** [ACCOUNT NUMBER]
> **IBAN:** [IBAN]
> **SWIFT/BIC (international):** [SWIFT]
>
> Please use your order number **{{ order_name }}** as the payment reference, then send a
> screenshot of the transfer to us on **WhatsApp: [WhatsApp number]** (or email [store email]).
> We'll begin your order as soon as payment is confirmed.

## Western Union — instructions (placeholders → fill in Shopify)

> Thank you for your order. To pay via Western Union, please send the **full order total —
> including shipping** (the amount shown at checkout) to:
>
> **Receiver name:** [FULL NAME — exactly as on CNIC/passport]
> **City:** Karachi
> **Country:** Pakistan
>
> After sending, please share the **MTCN (tracking number)**, the **sender's full name**, and the
> **amount** with us on **WhatsApp: [WhatsApp number]** (or email [store email]), along with your
> order number **{{ order_name }}**. We'll begin your order once payment is confirmed.

---

## Setup (after approval)

1. Shopify → **Settings → Payments** → **Manual payment methods** → **Add manual payment method →
   Create custom payment method**.
2. Name it **"Bank Transfer"** → paste the bank wording above into **Payment instructions** (fill
   in your real account details) → **Activate**.
3. Repeat → **"Western Union"** → paste the WU wording (real receiver name + city) → **Activate**.
4. The instructions now show automatically at checkout (when that method is picked) and on the
   confirmation page.
5. **Email check:** place a test order with each method and confirm the order-confirmation email
   shows the instructions. If you want them more prominent in the email, we add a short snippet to
   the **Order confirmation** notification that displays the payment instructions when a manual
   method is used (I'll provide it).

**Done when:** choosing Bank Transfer / Western Union automatically shows and emails the correct
details — no manual send. (Verifying the payment before dispatch remains a human step.)

## Notes
- `{{ order_name }}` is Shopify's order-number variable (auto-fills).
- For your ~60% international orders, the **IBAN + SWIFT** lets overseas customers wire in; WU
  covers cash transfers.
- *Founder to provide:* the real bank details, the WU receiver name/city, the **WhatsApp number**
  for proofs, and the store email. **Wording approved.**
