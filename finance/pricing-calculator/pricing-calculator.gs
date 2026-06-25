/**
 * pricing-calculator.gs — Celina Arif pricing calculator (Phase 1, item 4)
 *
 * Purpose : From an article's costs, suggest a local retail price and a DHL-inclusive
 *           international price for any destination country, using DHL's real zone rate card.
 * Model   : MARKUP ON COST (confirmed: 50%). price = total_cost * (1 + markup).
 *           total_cost = direct materials + direct labour + overhead allocation (entered per row).
 * Data    : two reference tabs imported from this folder's /data CSVs (see README):
 *             "DHL Zones"  <- data/dhl-zones.csv        (country, code, zone)
 *             "DHL Rates"  <- data/dhl-rates-nondoc.csv (weight_kg, zone1..zone13)
 * Outputs : local_price and intl_price columns, computed live.
 * Run     : Import the two CSVs as tabs (exact names above), then Extensions -> Apps Script,
 *           paste this file, Save, and run `setupTemplate` once from the Run menu.
 *
 * Note: DHL's published totals here are valid to 20 kg (an outfit is ~1-3 kg). Above 20 kg DHL
 * switches to incremental pricing — the calculator flags those for a manual quote.
 */

// ---- Settings ------------------------------------------------------------------------------
var SETTINGS = {
  MARKUP_PCT: 0.5,   // confirmed: 50% markup on total cost
  ROUND_TO: 500,     // round suggested prices up to nearest this many PKR (founder's choice)
  MAX_KG: 20         // DHL totals valid to here; above this, get a manual quote
};

var ZONES_SHEET = 'DHL Zones';
var RATES_SHEET = 'DHL Rates';

function roundUpTo(value) {
  var step = SETTINGS.ROUND_TO || 1;
  return Math.ceil(value / step) * step;
}

/** Suggested local retail price = round_up( total_cost * (1 + markup) ). */
function localPrice(totalCost) {
  return roundUpTo(totalCost * (1 + SETTINGS.MARKUP_PCT));
}

/** DHL non-document cost (PKR) for a destination country + shipment weight. */
function dhlCost(country, weightKg) {
  if (weightKg > SETTINGS.MAX_KG) return null; // > 20 kg: manual quote
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var zoneRows = ss.getSheetByName(ZONES_SHEET).getDataRange().getValues();
  var zone = null;
  for (var i = 1; i < zoneRows.length; i++) {
    if (String(zoneRows[i][0]).trim().toLowerCase() === String(country).trim().toLowerCase()) {
      zone = Number(zoneRows[i][2]); break;
    }
  }
  if (!zone) throw new Error('Country not found in "' + ZONES_SHEET + '": ' + country);
  var bracket = Math.ceil(weightKg / 0.5) * 0.5;
  var rateRows = ss.getSheetByName(RATES_SHEET).getDataRange().getValues();
  for (var r = 1; r < rateRows.length; r++) {
    if (Number(rateRows[r][0]) === bracket) return Number(rateRows[r][zone]); // col 0=weight, zone N in col N
  }
  throw new Error('No DHL rate row for weight bracket ' + bracket + ' kg');
}

/** Suggested DHL-inclusive international price. */
function intlPrice(totalCost, country, weightKg) {
  var dhl = dhlCost(country, weightKg);
  if (dhl == null) return null;
  return roundUpTo(localPrice(totalCost) + dhl);
}

/**
 * Sheet functions: =LOCAL_PRICE(total_cost) and =INTL_PRICE(total_cost, country, weight_kg).
 * @customfunction
 */
function LOCAL_PRICE(totalCost) { return localPrice(totalCost); }
/** @customfunction */
function INTL_PRICE(totalCost, country, weightKg) {
  var p = intlPrice(totalCost, country, weightKg);
  return p == null ? '>' + SETTINGS.MAX_KG + 'kg: get DHL quote' : p;
}

/** One-time helper: lay out the Calculator columns + formulas (assumes the two tabs exist). */
function setupTemplate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName(ZONES_SHEET) || !ss.getSheetByName(RATES_SHEET)) {
    SpreadsheetApp.getUi().alert(
      'First import the reference tabs:\n' +
      ' • data/dhl-zones.csv        -> a tab named "' + ZONES_SHEET + '"\n' +
      ' • data/dhl-rates-nondoc.csv -> a tab named "' + RATES_SHEET + '"\n' +
      'Then run setupTemplate again.');
    return;
  }
  var sheet = ss.getActiveSheet();
  var headers = ['article_ref','materials_cost','labour_cost','overhead','total_cost',
                 'local_price','weight_kg','dest_country','zone','dhl_cost','intl_price','notes'];
  sheet.getRange(1,1,1,headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);

  // Row-2 template formulas (fill the cost inputs, then drag down).
  sheet.getRange('E2').setFormula('=B2+C2+D2');                                  // total_cost
  sheet.getRange('F2').setFormula('=ROUNDUP(E2*(1+' + SETTINGS.MARKUP_PCT + ')/' + SETTINGS.ROUND_TO + ')*' + SETTINGS.ROUND_TO); // local_price
  sheet.getRange('I2').setFormula('=IFERROR(VLOOKUP(H2,\'' + ZONES_SHEET + '\'!A:C,3,FALSE),"")'); // zone
  sheet.getRange('J2').setFormula('=IF(G2>' + SETTINGS.MAX_KG + ',"",IFERROR(INDEX(\'' + RATES_SHEET +
      '\'!B:N,MATCH(CEILING(G2,0.5),\'' + RATES_SHEET + '\'!A:A,0),I2),""))');   // dhl_cost
  sheet.getRange('K2').setFormula('=IF(G2>' + SETTINGS.MAX_KG + ',">' + SETTINGS.MAX_KG +
      'kg: get DHL quote",ROUNDUP((F2+J2)/' + SETTINGS.ROUND_TO + ')*' + SETTINGS.ROUND_TO + ')'); // intl_price

  // Country dropdown for dest_country, sourced from the zones tab.
  var zoneCount = ss.getSheetByName(ZONES_SHEET).getLastRow();
  var rule = SpreadsheetApp.newDataValidation()
      .requireValueInRange(ss.getSheetByName(ZONES_SHEET).getRange('A2:A' + zoneCount), true)
      .setAllowInvalid(false).build();
  sheet.getRange('H2:H1000').setDataValidation(rule);

  SpreadsheetApp.getUi().alert(
    'Calculator ready. In a row, type materials/labour/overhead (B,C,D), weight_kg (G), and ' +
    'pick a dest_country (H). local_price (F) and intl_price (K) compute automatically.\n\n' +
    'Markup is ' + (SETTINGS.MARKUP_PCT*100) + '%. Drag row 2\'s formulas down for more rows.');
}
