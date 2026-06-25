/**
 * pricing-calculator.gs — Celina Arif pricing calculator (Phase 1, item 4)
 *
 * Purpose : From an article's costs, suggest a local retail price and a DHL-inclusive
 *           international price (per destination zone). Cost-plus, fully transparent.
 * Model   : MARKUP ON COST (confirmed with founder) — price = total_cost * (1 + markup).
 *           total_cost = direct materials + direct labour + overhead allocation.
 *           A margin-on-price alternative is included but off by default.
 * Inputs  : Per-row costs (materials, labour, overhead, weight, destination zone) + a
 *           Settings block + a DHL Zones table the founder fills with real figures.
 * Outputs : local_price and intl_price columns, computed live.
 * Run     : Extensions -> Apps Script -> paste this file -> Save. Run `setupTemplate` once
 *           from the Run menu to lay out the columns + the DHL Zones table, fill the
 *           Settings + zone rates, then type article costs into new rows.
 *
 * NOTE: every figure below is a PLACEHOLDER. Replace the TODO values with the founder's real
 * numbers. Nothing here pushes prices to Shopify — it only suggests prices for review.
 */

// ---- Settings (PLACEHOLDERS — founder to supply) -------------------------------------------
var SETTINGS = {
  // Primary model: markup on cost. e.g. 1.5 = price is cost x 2.5 (i.e. +150%).  TODO.
  MARKUP_PCT: null,        // TODO: founder to supply (fraction, e.g. 0.5, 1.0, 1.5)

  // Overhead allocation per article: 'flat' PKR amount, or 'percent' of (materials+labour).
  OVERHEAD_MODE: 'flat',   // 'flat' | 'percent'
  OVERHEAD_VALUE: null,    // TODO: flat PKR, or fraction (e.g. 0.10) if OVERHEAD_MODE='percent'

  // Optional alternative: margin on selling price instead of markup on cost.
  USE_MARGIN_ON_PRICE: false,
  MARGIN_PCT: null,        // only if USE_MARGIN_ON_PRICE=true. Fraction of price, e.g. 0.40

  ROUND_TO: 500            // round suggested prices up to nearest this many PKR. Adjust if needed.
};

/** Overhead for an article, per the chosen mode. */
function overhead(materials, labour) {
  if (SETTINGS.OVERHEAD_VALUE == null) throw new Error('Set OVERHEAD_VALUE in SETTINGS.');
  return SETTINGS.OVERHEAD_MODE === 'percent'
    ? (materials + labour) * SETTINGS.OVERHEAD_VALUE
    : SETTINGS.OVERHEAD_VALUE;
}

/** Total cost = direct materials + direct labour + overhead allocation. */
function totalCost(materials, labour) {
  return materials + labour + overhead(materials, labour);
}

/** Round up to the nearest ROUND_TO. */
function roundUpTo(value) {
  var step = SETTINGS.ROUND_TO || 1;
  return Math.ceil(value / step) * step;
}

/** Suggested local retail price from costs (markup-on-cost by default). */
function localPrice(materials, labour) {
  var cost = totalCost(materials, labour);
  if (SETTINGS.USE_MARGIN_ON_PRICE) {
    if (SETTINGS.MARGIN_PCT == null || SETTINGS.MARGIN_PCT >= 1)
      throw new Error('MARGIN_PCT must be set and < 1 (fraction of price).');
    return roundUpTo(cost / (1 - SETTINGS.MARGIN_PCT));
  }
  if (SETTINGS.MARKUP_PCT == null) throw new Error('Set MARKUP_PCT in SETTINGS.');
  return roundUpTo(cost * (1 + SETTINGS.MARKUP_PCT));
}

/** Suggested DHL-inclusive international price for a given per-kg rate (from the zone table). */
function intlPrice(materials, labour, weightKg, dhlPerKg) {
  if (dhlPerKg == null || dhlPerKg === '') throw new Error('Provide dhl_per_kg (from the DHL Zones table).');
  return roundUpTo(localPrice(materials, labour) + weightKg * dhlPerKg);
}

/**
 * Sheet functions so the team can type =LOCAL_PRICE(...) / =INTL_PRICE(...) in cells.
 * dhl_per_kg is looked up from the DHL Zones table by zone (use a VLOOKUP in the sheet,
 * see setupTemplate / README).
 * @customfunction
 */
function LOCAL_PRICE(materials, labour) { return localPrice(materials, labour); }
/** @customfunction */
function INTL_PRICE(materials, labour, weightKg, dhlPerKg) {
  return intlPrice(materials, labour, weightKg, dhlPerKg);
}

/** One-time helper: lay out the article columns and a DHL Zones lookup table. */
function setupTemplate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var headers = ['article_ref', 'materials_cost', 'labour_cost', 'overhead', 'total_cost',
                 'markup_pct', 'local_price', 'weight_kg', 'dest_zone', 'dhl_per_kg', 'intl_price', 'notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);

  // DHL Zones lookup table on its own sheet (founder fills the rates from DHL's list).
  var zones = ss.getSheetByName('DHL Zones') || ss.insertSheet('DHL Zones');
  zones.clear();
  zones.getRange(1, 1, 1, 2).setValues([['zone', 'dhl_per_kg']]).setFontWeight('bold');
  zones.getRange(2, 1, 3, 2).setValues([
    ['TODO: e.g. Zone 1 (UK/EU)', ''],
    ['TODO: e.g. Zone 2 (US/CA)', ''],
    ['TODO: e.g. Zone 3 (ME/Asia)', '']
  ]);

  SpreadsheetApp.getUi().alert(
    'Columns + a "DHL Zones" sheet added.\n\n' +
    '1) Fill the SETTINGS block in Apps Script (markup %, overhead).\n' +
    '2) Fill the DHL Zones rates from DHL\'s list.\n' +
    '3) In each article row, set dest_zone, then dhl_per_kg can be:\n' +
    '   =VLOOKUP(I2, \'DHL Zones\'!A:B, 2, FALSE)\n' +
    '   and intl_price: =INTL_PRICE(B2, C2, H2, J2).');
}
