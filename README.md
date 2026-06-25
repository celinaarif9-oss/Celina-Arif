# Celina Arif — Operations Automation

The operations-automation repo for **Celina Arif**, a luxury, made-to-order Pakistani
womenswear label. The goal: remove manual back-office work so the business runs frictionlessly
and scales through peak season — while keeping the creative core human and every
customer-facing action behind a human approval gate.

> **New here? Read [`CLAUDE.md`](./CLAUDE.md) first.** It's the persistent project context:
> mission, business facts, the decided architecture, and the non-negotiable approval &
> security rules.

## Architecture (three layers)

- **Make.com** — no-code, event-driven flows the team can see and toggle (order → production
  sheet, order → courier, abandoned cart, payment-method → instructions email).
- **Node.js + TypeScript** (`src/`, `finance/`) — anything needing real logic or API calls
  (reconciliation, pricing/profit, commission audit, product descriptions, dashboards).
- **Google Sheets + Apps Script** and **Looker Studio** — the human-facing surface the team
  uses daily.

*Rule of thumb: a teammate needs to see/trigger it → Make.com or a Sheet; it needs logic or
API calls → the Node/TS repo.*

## Repo map

```
docs/        SOPs + automation-blueprint.md (master plan) + phase plans
src/         Node + TypeScript — API integrations & logic (Shopify, couriers, Meta, WhatsApp, Google)
finance/     pricing calculator, reconciliation, P&L, commission audit
content/     caption + product-description prompts & templates
sheets/      Google Sheets templates + Apps Script
make/        Make.com scenario notes / exported blueprints
data/        anonymised samples ONLY — never real customer data
.env.example secrets template — copy to .env (gitignored); NEVER commit real secrets
```

## Roadmap

1. **Phase 1 — Back-office automation** ← current. Plan: [`docs/phase1-plan.md`](./docs/phase1-plan.md).
2. **Phase 2 — Shipping & tracking.**
3. **Phase 3 — Marketing control.**
4. **Phase 4 — Finance + customer comms.**

Full detail (and the workflow map) lives in [`docs/automation-blueprint.md`](./docs/automation-blueprint.md).

## Ground rules (see CLAUDE.md for the full list)

- **Human approval required** before anything customer-facing, money-spending, irreversible,
  or that edits the live store.
- **Secrets** live only in a gitignored `.env` (template: `.env.example`). Never commit
  tokens or keys.
- **No real customer PII** in code, commits, prompts, or samples. `data/` is anonymised only.
- Every deliverable ships with a plain-language **"How to use"** for a non-technical team.
