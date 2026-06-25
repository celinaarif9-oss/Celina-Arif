# src/ — Node + TypeScript integrations & logic

Code Claude owns for anything needing real logic or direct API access: Shopify Admin,
couriers, Meta, WhatsApp BSP, and Google APIs (reconciliation, pricing/profit, commission
audit, product descriptions, dashboard data).

**Conventions**
- Credentials come from the gitignored `.env` (template: `../.env.example`). Never hardcode or log secrets.
- Default to **read-only** API scopes. Write-capable calls (editing products, creating
  orders/fulfilments, sending messages, spending money) run ONLY behind a Human Approval gate
  — see `../CLAUDE.md`.
- Every script gets a header comment: purpose, inputs, outputs, run steps.
- Small, focused files over monoliths.

*Empty for now — populated as Phase 1+ items that need API logic are built.*
