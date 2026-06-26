# Phase 1 · Item 6 — Abandoned-checkout recovery (draft for approval)

**Replaces:** chasing abandoned checkouts manually.

**Goal:** when a shopper adds a piece and doesn't finish, Shopify automatically sends a branded,
on-voice reminder — recovering sales with zero manual effort.

> ⚠️ **Customer-facing — approval gate.** These send to real customers automatically once on.
> Nothing activates until the founder approves the copy + cadence. (Standard ecommerce practice;
> you approve once, then it runs.)

## Approach (free, native)

Use Shopify's built-in **Marketing → Automations → "Abandoned checkout"** (Shopify Email).
No app, no cost. We replace the default copy with the brand version below and set the timing.

## Cadence (recommended)

- **Email 1 — ~5 hours** after abandonment (gentle reminder).
- **Email 2 — ~28 hours** (optional soft follow-up + offer of help).

Two touches is plenty for a luxury label — more can feel pushy. **No discount code** on purpose:
discounting cheapens a luxury, made-to-order positioning. Instead we lead with craftsmanship and
an offer to help (sizing / custom measurements), which fits made-to-order.

---

## Email 1 — the reminder (~5 hours)

**Subject:** Your piece is waiting
**Preview text:** Pick up right where you left off.

> Dear {{ first_name | default: "there" }},
>
> You left something beautiful behind. Your selection is saved — whenever you're ready, you can
> complete your order in a moment.
>
> Each Celina Arif piece is **made to order** in our Karachi atelier, so it's created especially
> for you. If you have any questions about sizing, fit, or custom measurements, simply reply to
> this email — we're glad to help.
>
> **[ Return to your order → ]**
>
> With love,
> **Celina Arif**

---

## Email 2 — soft follow-up (~28 hours, optional)

**Subject:** Still thinking it over?
**Preview text:** We're here if you need anything.

> Dear {{ first_name | default: "there" }},
>
> Your piece is still saved for you. Made-to-order means it's crafted just for you — including
> adjustments to length, sleeves, or full custom measurements if you'd like.
>
> If anything held you back — a question on fit, fabric, or delivery — just reply and we'll take
> care of it personally.
>
> **[ Complete your order → ]**
>
> Warmly,
> **Celina Arif**

---

## How to set it up (after approval)

1. Shopify → **Marketing → Automations**.
2. Find **"Abandoned checkout"** → **Turn on** (or **Edit** if it exists).
3. Replace the default email content with **Email 1** above (subject, preview, body). Use the
   brand logo, fonts, and footer (unsubscribe + address are added automatically).
4. *(Optional)* add **Email 2** as a second step in the flow, delayed ~28 hours, with a condition
   to skip if the order was already completed.
5. Set the delay on Email 1 to ~5 hours.
6. **Preview / send a test to yourself**, confirm links return to checkout, then **Turn on**.

**Done when:** an abandoned checkout triggers the approved email automatically — no manual chase.

## Notes
- A **WhatsApp** nudge can be added later (Phase 4, via the BSP) for an even higher recovery rate.
- Keep the brand voice warm and unhurried — these represent the label.
- *Founder to approve:* the wording above, the 5h / 28h timing, and whether to include Email 2.
