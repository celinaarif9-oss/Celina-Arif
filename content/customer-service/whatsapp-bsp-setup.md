# WhatsApp BSP — shared team inbox + AI drafting (Phase 4, Layer 2)

Move the customer WhatsApp onto an official **WhatsApp Business Platform (API)** provider so
**you and Pitch share one inbox**, quick replies are built in, and AI can **draft** replies for
approval. This replaces the "one number stuck on one phone" bottleneck.

> 🔒 Still human-in-the-loop: AI **drafts**, a person **sends**. The BSP just makes the shared
> inbox + drafting possible. Signing up **spends money → founder approves first.**

## Shortlist (all official Meta BSPs, all inside budget)

| Provider | Best for | Notes | Billing |
|----------|----------|-------|---------|
| **Interakt** | **Capability** — recommended | **Unified WhatsApp + Instagram inbox**, native **Shopify** integration (order updates + **abandoned-cart on WhatsApp** = delivers your queued Phase 1 touch), AI FAQ, team agents | INR (verify PK onboarding) |
| **WAB2C / WeTarseel** | **Ease** — local | **Pakistan-built**: **PKR billing**, local Urdu/English support, understands local couriers/COD. Smoothest onboarding for your team | PKR |
| **AiSensy** | Low cost | No message markup, AI agents, D2C broadcasts; clean and affordable | INR/USD |

**Costs:** platform ≈ **Rs 8,000–25,000/month** (or ~$15–40 for Interakt/AiSensy) + Meta's
per-conversation fee (**service replies ≈ Rs 3–6 each**, and replies within 24h of a customer
message are cheap/often free). Comfortably inside your Rs 50–100k software budget.

## My recommendation
- **Interakt** if you want the **Shopify + unified IG/WhatsApp inbox** (it advances Phase 4 *and*
  the WhatsApp abandoned-cart from Phase 1 in one move) — pending a check that they onboard a
  Pakistani number/billing cleanly.
- **WAB2C / WeTarseel** if you'd rather have **local PKR billing + local support** and the easiest
  path for a non-technical team.

Both are right answers; it's capability vs local-ease.

## What setup involves (a few days, with Pitch)
This is a coordinated migration, not a 10-minute job — plan for **Meta business verification**
(can take 1–3 days) and a **display-name approval**.

1. **Prerequisites**
   - A **Meta Business account** (Business Manager) for Celina Arif, verified.
   - Decide the **number**: **migrate the existing customer number** (keeps the line customers
     know — *recommended*) or use a new one. Migrating means the number **leaves the WhatsApp
     Business/regular app** (it can't be on both) — so this **must be coordinated with Pitch**,
     ideally at a quiet time, after a **chat backup**.
2. **Sign up** with the chosen BSP → connect the Meta Business account → complete verification.
3. **Register the number** on the API (OTP) → set the **display name** (e.g. "Celina Arif").
4. **Configure**
   - Add **agents**: you + Pitch (shared inbox).
   - Load the **quick replies** from `quick-replies.md`.
   - Set **greeting** + **away** messages.
   - (Interakt) connect **Shopify** → order updates + WhatsApp abandoned-cart.
   - Turn on the **AI FAQ** in **suggest/draft mode** (never auto-send) using `faq-knowledge-base.md`.
5. **Go live** → both log into the same inbox from any device (phone, iPad, laptop).

## Decisions I need from you
1. **Provider:** Interakt (capability) or a local BSP (ease)? *(I can verify Interakt's Pakistan
   onboarding before you commit.)*
2. **Number:** migrate the existing customer number (recommended), or start a new one?
3. Confirm you're OK to **loop Pitch in** for the migration (their phone holds it today).
