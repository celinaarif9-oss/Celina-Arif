# Celina Arif — Operations Index

The one-page map of every tool we've built: what it does, where it lives, and how to run it.
Written for the whole team — no tech skills needed. **Start here.**

## How to open anything (read once)

- **Find a file:** go to **github.com** → the **Celina-Arif** repo → open the folder → click the
  file. `.md` files are guides you just read (they show nicely formatted).
- **Open a spreadsheet tool (`.csv`):** on GitHub open the file → **Download** (⬇) → in **Google
  Sheets**: **File → Import → Upload** → choose **"Insert new sheet"** → **Import**. The columns
  and live formulas appear. Rename the tab as the guide says.
- **Status key:** ✅ live · 📄 template (import to Sheets) · 🛠 runbook (follow the steps) · ⏳ waiting on you/Pitch

---

## Back office (orders & money in)
| Tool | What it does | Where | Status |
|------|--------------|-------|--------|
| Customisation capture | Customers add measurements at checkout | Shopify (Globo app) | ✅ live |
| Packing & delivery slips | Branded slips to print per order | `print-templates/` (Order Printer Pro) | ✅ live |
| Payment instructions | Auto bank / Western Union details by payment method | `content/payment-instructions.md` → Shopify | ✅ live |
| Abandoned-cart email | Wins back unfinished checkouts | Shopify automation | ✅ live |
| Pricing calculator | Cost → local + DHL-inclusive intl price | `finance/pricing-calculator/` | 📄 |
| Order → sheet sync | Pull paid orders to a sheet | `src/shopify-order-sync/` | ⏳ (manual export for now) |

## Shipping
| Tool | What it does | Where | Status |
|------|--------------|-------|--------|
| Shipping rates | Rs.500 local / DHL international by zone | `shipping/` (+ README) | ✅ entered |
| Courier + auto-tracking | DHL + local couriers, tracking auto-written to Shopify | `shipping/courier-apps-setup.md` | 🛠 to install |
| Delivery reconciliation | Charged vs consignee cost check | `shipping/delivery-reconciliation.md` | 📄 |

## Marketing & finance oversight
| Tool | What it does | Where | Status |
|------|--------------|-------|--------|
| Commission audit | Checks Pitch's 8% every month | `finance/commission-audit/` | 📄 |
| KPI dashboard | Revenue, profit/article, ROAS, growth | `finance/kpi-dashboard/` | 📄 (needs cost numbers) |
| Cost Card + Overhead | Proper per-article costing + overhead % | `finance/costing/` | 📄 (add your rates) |
| Ad reporting + alerts | Per-campaign ROAS/CPP with ⚠ flags | `finance/ad-reporting/` | 📄 |

## Social & launches
| Tool | What it does | Where | Status |
|------|--------------|-------|--------|
| Brand voice + captions | On-voice caption library + AI prompt | `content/brand-voice.md`, `content/caption-templates.md` | 📄 |
| Social scheduling | 3×/week posting via Meta Business Suite | `content/social-scheduling.md` | 🛠 |
| Launch Playbook | Repeatable collection-drop routine | `content/launch-playbook.md` | 🛠 |

## Customer service
| Tool | What it does | Where | Status |
|------|--------------|-------|--------|
| FAQ + quick replies | Instant on-voice answers | `content/customer-service/faq-knowledge-base.md`, `quick-replies.md` | ✅ live on Instagram |
| AI-assisted workflow | AI drafts, a person sends | `content/customer-service/customer-service-workflow.md` | 🛠 |
| WhatsApp shared inbox | Team inbox + AI draft (WeTarseel) | `content/customer-service/whatsapp-bsp-setup.md` + onboarding checklist | ⏳ signing up |

---

## The golden rules (from CLAUDE.md)
- **A human sends every customer message.** AI may draft — it never auto-sends.
- **Anything that spends money, edits the live store, or is irreversible → founder approves first.**
- **Real customer data stays out of this repo** — templates only; private data lives in private sheets.

## Open actions (who does what)
- 🟣 **You:** add costing numbers (→ Dashboard), approve WeTarseel sign-up, confirm commission base with Pitch.
- 🟢 **Pitch:** roll the Globo measurement form to all products, install the courier apps, confirm the commission base + gross-figure gap.
