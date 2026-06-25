# make/ — Make.com scenario notes & exported blueprints

Documentation and exported blueprints for the no-code, event-driven flows the team can see and
toggle in Make.com. Phase 1 uses one: **new paid Shopify order → add row to the "Daily Orders"
Google Sheet** (item 2). More flows arrive in later phases (order → courier, abandoned cart,
payment-method → instructions email).

**Conventions**
- Each scenario gets a short note: trigger, modules, mapping, and how to turn it on/off.
- Exported `.json` blueprints are sanitised — **no API tokens or connection secrets** in them.
- Run scenarios **manually first**, switch the schedule on only after verifying.

*Empty for now — populated when the order-sheet sync (item 2) is built.*
