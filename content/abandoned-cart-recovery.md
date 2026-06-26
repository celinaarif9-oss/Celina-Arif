# Phase 1 · Item 6 — Abandoned-checkout recovery (approved copy)

**Replaces:** chasing abandoned checkouts manually.

**Goal:** when a shopper adds a piece and doesn't finish, send a warm, on-brand reminder
automatically — recovering sales with no manual chase.

> ⚠️ **Customer-facing — approval gate.** Sends to real customers. Email is approved to go live;
> WhatsApp is drafted but needs the BSP (see below) before it can auto-send.

## Cadence & channels (founder-approved)

| Touch | When | Channel | Purpose |
|-------|------|---------|---------|
| 1 | **24 hours** | **Email + WhatsApp** | reminder |
| 2 | **48 hours** | **WhatsApp** | soft follow-up |

Warm, short, not gushing. **No discount** (protects the luxury positioning).

---

### Touch 1 — Email (24h)
**Subject:** Your piece is waiting · **Preview:** It's still saved for you.

> Hi {{ first_name }},
>
> You left a piece behind — and it's still saved for you. Whenever you're ready, finishing your
> order only takes a moment.
>
> Questions about sizing or fit? Just reply — we're happy to help.
>
> **[ Return to your order → ]**
>
> Celina Arif

### Touch 1 — WhatsApp (24h)
> Hi {{ first_name }}, you left a piece in your cart and it's still saved for you. Ready to
> complete your order? {{ checkout_url }}
> Any questions about sizing or fit, just reply — we're happy to help. — Celina Arif

### Touch 2 — WhatsApp (48h)
> Hi {{ first_name }}, just checking in — your piece is still saved for you. If anything held you
> back (fit, fabric, or delivery), reply here and we'll take care of it. {{ checkout_url }}
> — Celina Arif

---

## Setup

### Email (live now — free, native)
1. Shopify → **Marketing → Automations** → **Abandoned checkout** → Edit/Turn on.
2. Set the delay to **24 hours**; paste the **Touch 1 — Email** copy (subject, preview, body),
   brand logo + footer.
3. **Send a test to yourself**, confirm the "Return to your order" link works, then **Turn on**.

### WhatsApp (needs setup first — flagged)
Automated WhatsApp can't run yet. It requires:
- A **WhatsApp BSP** (Interakt / AiSensy / Wati) — Phase 4 infrastructure — connected to
  Shopify's abandoned-checkout event.
- **Meta-approved message templates** (marketing templates need approval) and **customer
  opt-in** to receive WhatsApp marketing.

**Two ways forward:**
- **(a) Recommended now:** turn on the **email** today; **queue WhatsApp** for when we stand up
  the BSP (we can bring this forward from Phase 4 if recovery on WhatsApp is a priority).
- **(b) Interim manual:** the team sends the WhatsApp by hand from the Business inbox, using
  **Shopify → Orders → Abandoned checkouts** (shows the customer + phone if they entered it).
  Human-in-the-loop, no automation — fine for low volume, not scalable for peak.

**Done when:** an abandoned checkout triggers the approved **email** automatically; WhatsApp
follows once the BSP is connected (or is sent manually in the interim).

## Notes
- `{{ first_name }}` / `{{ checkout_url }}` are merge fields — Shopify Email and the BSP each
  have their own equivalents; map them at setup.
- Keep the voice warm and brief — it represents the label.
