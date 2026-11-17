# The Velvet Show, Dubai — cost & break-even

A model for the Boulevard One exhibition (one day, 9am–7pm), built on your **real prices and
stock**. It totals every fixed cost, then shows **how many pieces you must sell to break even** —
and because production cost is the only value still to pin, it shows break-even across a **range**
of production costs.

Two files:
- `velvet-show-sales.csv` — your 27 designs, 87 pieces, prices (PKR + AED), line values, totals.
- `velvet-show-cost-breakeven.csv` — fixed costs + break-even + a production-cost sensitivity table.

> Management estimate, before tax. The accountant confirms anything for filing.

## How to use
**File → Import →** upload each CSV → **Insert new sheet** → name the tabs **`Sales`** and
**`Break-even`**. The `=` cells go live. In Break-even, pin **one** cell — *Avg production cost /
piece (PKR)* — once you've costed the pieces. Everything else is filled.

## The real picture
| | |
|---|---|
| Designs / pieces | **27 designs · 87 pieces** |
| Price range | **AED 450 – 1,020** (avg **AED 741 / Rs56,345**) |
| Potential revenue if all 87 sell | **AED 64,500  (Rs4.9M)** |
| **Fixed cost to show up** | **≈ AED 20,480  /  Rs1.56M** |

## How many must you sell to break even?
It depends on your **average production cost** — the one number left to pin. The range:

| Avg production cost | Contribution/piece | Break-even | ...as % of stock | Profit if all 87 sell |
|---|---|---|---|---|
| Rs15,000 | AED 528 | **39 pieces** | 45% | AED 25,500 |
| Rs20,000 | AED 463 | **45 pieces** | 52% | AED 19,800 |
| Rs25,000 | AED 397 | **52 pieces** | 60% | AED 14,000 |
| Rs30,000 | AED 331 | **62 pieces** | 71% | AED 8,300 |
| Rs35,000 | AED 265 | **78 pieces** | 90% | AED 2,600 |
| Rs40,000 | AED 199 | 103 pieces | 118% | –AED 3,100 |

**Read:** as long as your average production cost stays **under ~Rs35,000**, you break even
**within your 87 stock pieces** — and any pre-orders from the catalogue are pure profit on top.
Above ~Rs38k you'd need pre-orders just to break even, so costing matters.

## Still to pin: production cost (your note #16)
Break-even uses **production cost only — materials + labour + overhead**. We leave out your
domestic selling costs (Pitch 8%, local bank 2.875%), which don't apply in Dubai. The show's own
costs are already modelled: **VAT 5% the customer pays** (not your cost), **3% card fee you
absorb** on card sales. **Prices already include shipping**, so the DHL freight isn't charged to
customers twice.

To replace the sensitivity range with one exact number, I'll build a **show costing** for these
27 designs (your cost cards with the selling-% section removed). Several (Serena, Sabah, Isra,
Ayesha, Tamara) are already costed from Vol 2; the rest (Natasha, Azure, Sarah, Maria, Jasmine,
Nubia, Zinnia, Zara, Zayna, Zaha, Kiara, Sama) need their material/labour details.

## Estimates to refine
- **Local transport + food:** AED 2,000 placeholder.
- **Card share:** 70% card / 30% cash assumed.
