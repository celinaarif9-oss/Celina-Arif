/**
 * pricing-calculator.gs — Celina Arif pricing calculator (Phase 1, item 4)
 *
 * Purpose : From an article's costs, suggest a local retail price and a DHL-inclusive
 *           international price. Cost-plus, fully transparent.
 * Inputs  : Per-row costs (fabric, labour, overhead, weight) + a Settings block the founder
 *           fills with real figures (margin %, overhead basis, DHL per kg, rounding step).
 * Outputs : local_price and intl_price columns, computed live.
 * Run     : Extensions -> Apps Script -> paste this file -> Save. Then run `setupTemplate`
 *           once from the Run menu to lay out the sheet, fill the Settings cells, and type
 *           article costs into new rows.
 *
 * NOTE: every figure below is a PLACEHOLDER. Replace the TODO values with the founder's real
 * numbers. Nothing here pushes prices to Shopify — it only suggests prices for review.
 */

// ---- Settings (PLACEHOLDERS — founder to supply) -------------------------------------------
var SETTINGS = {
  MARGIN_PCT: null,        // TODO: e.g. 0.40 = 40% margin on selling price
  OVERHEAD_MODE: 'flat',   // 'flat' (PKR per article) or 'percent' (% of fabric+labour)
  OVERHEAD_VALUE: null,    // TODO: flat PKR amount, or fraction e.g. 0.10 if OVERHEAD_MODE='percent'
  MARKUP_MODE: false,      // false = margin-on-price (default). true = markup-on-cost; set MARKUP_PCT
  MARKUP_PCT: null,        // TODO (only if MARKUP_MODE=true): e.g. 1.5 = +150% on cost
  DHL_PER_KG: null,        // TODO: PKR per kg
  ROUND_TO: 500            // round suggested prices up to nearest this many PKR. Adjust if needed.
};

/** Overhead for an article, per the chosen mode. */
function overhead(fabricCost, labourCost) {
  if (SETTINGS.OVERHEAD_VALUE == null) throw new Error('Set OVERHEAD_VALUE in SETTINGS.');
  return SETTINGS.OVERHEAD_MODE === 'percent'
    ? (fabricCost + labourCost) * SETTINGS.OVERHEAD_VALUE
    : SETTINGS.OVERHEAD_VALUE;
}

/** Round up to the nearest ROUND_TO. */
function roundUpTo(value) {
  var step = SETTINGS.ROUND_TO || 1;
  return Math.ceil(value / step) * step;
}

/** Suggested local retail price from costs. */
function localPrice(fabricCost, labourCost) {
  var base = fabricCost + labourCost + overhead(fabricCost, labourCost);
  if (SETTINGS.MARKUP_MODE) {
    if (SETTINGS.MARKUP_PCT == null) throw new Error('Set MARKUP_PCT (MARKUP_MODE is on).');
    return roundUpTo(base * (1 + SETTINGS.MARKUP_PCT));
  }
  if (SETTINGS.MARGIN_PCT == null) throw new Error('Set MARGIN_PCT in SETTINGS.');
  if (SETTINGS.MARGIN_PCT >= 1) throw new Error('MARGIN_PCT must be < 1 (it is a fraction of price).');
  return roundUpTo(base / (1 - SETTINGS.MARGIN_PCT));
}

/** Suggested DHL-inclusive international price. */
function intlPrice(fabricCost, labourCost, weightKg) {
  if (SETTINGS.DHL_PER_KG == null) throw new Error('Set DHL_PER_KG in SETTINGS.');
  return roundUpTo(localPrice(fabricCost, labourCost) + weightKg * SETTINGS.DHL_PER_KG);
}

/**
 * Custom sheet functions so the team can type =LOCAL_PRICE(...) / =INTL_PRICE(...) in cells.
 * @customfunction
 */
function LOCAL_PRICE(fabricCost, labourCost) { return localPrice(fabricCost, labourCost); }
/** @customfunction */
function INTL_PRICE(fabricCost, labourCost, weightKg) { return intlPrice(fabricCost, labourCost, weightKg); }

/** One-time helper: lay out the header row described in schema.csv. */
function setupTemplate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = ['article_ref', 'fabric_cost', 'labour_cost', 'overhead', 'base_cost',
                 'margin_pct', 'local_price', 'weight_kg', 'dhl_per_kg', 'intl_price', 'notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  SpreadsheetApp.getUi().alert(
    'Header row added. Now fill the SETTINGS block at the top of the Apps Script with your ' +
    'real figures (margin %, overhead, DHL per kg), then type article costs into new rows.');
}
