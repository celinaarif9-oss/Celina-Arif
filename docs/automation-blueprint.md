# Automation Blueprint — Master Plan

> Referenced by `CLAUDE.md` as the source of truth for the full workflow map, phases, and
> costs. **Read this before planning any multi-step work.**
>
> ⚠️ **Status:** this is a scaffold. The detailed **36-workflow map** and cost breakdown are
> **PENDING** — to be imported from the founder's master document. Do not fabricate workflow
> numbers or costs; fill this in from the founder's source.

## Architecture (decided)

Three layers — pick the layer by what the work needs:

| Layer | Tool | Use it when |
|-------|------|-------------|
| Human-facing flows | **Make.com** | A teammate needs to see/toggle an event flow (order → sheet, order → courier, abandoned cart, payment-method → email) |
| Logic & APIs | **Node.js + TypeScript** repo (`/src`, `/finance`) | Real logic or API calls (reconciliation, pricing/profit, commission audit, product descriptions, dashboard data). Python OK for data-heavy finance scripts. |
| Human surface | **Google Sheets + Apps Script**, **Looker Studio** | The daily surface the team reads/edits |

*Rule of thumb: a teammate needs to see/trigger it → Make.com or a Sheet; it needs logic or API calls → the Node/TS repo.*

## Phases (summary — full detail PENDING)

- **Phase 1 — Back-office automation.** Detailed plan: [`docs/phase1-plan.md`](./phase1-plan.md). Six items: capture customisations at checkout; auto order-sheet sync (Shopify → Google Sheet); branded order/packing/delivery sheets; pricing calculator + bulk listing updates; auto bank/Western-Union instructions; native abandoned-cart recovery.
- **Phase 2 — Shipping & tracking.** Courier app with auto-tracking written back to Shopify; weight-based shipping zones from DHL's rate card. *Shopify plan decision (live DHL rates) is decided here.*
- **Phase 3 — Marketing control.** Social scheduling + AI captions; launch automation; KPI dashboard (revenue, profit/article, ROAS, growth); commission auto-audit; ad reporting + alerts.
- **Phase 4 — Finance + customer comms.** Accounting integration + auto P&L + reconciliation + expense tracking; then WhatsApp BSP with FAQ AI + human approval.

## Workflow map (PENDING)

The full 36-workflow map (workflow number → description → phase → tools → cost) is to be added
here from the founder's master document. Phase 1 references workflows 4, 5, 13, 16, 17, 18,
19, 21, 25 (see `phase1-plan.md`); the complete numbered list lives here once supplied.

## Costs (PENDING)

Per-tool monthly costs and the running total vs. the PKR 50k–100k/month software budget — to
be added from the founder's source.

## Status log

| Date | Change |
|------|--------|
| 2026-06-25 | Repo foundation scaffolded; CLAUDE.md + Phase 1 plan committed. Blueprint detail pending founder input. |
