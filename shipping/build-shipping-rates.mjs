/**
 * build-shipping-rates.mjs — Celina Arif weight-based shipping rates (Phase 2, item A)
 *
 * Purpose : Turn the DHL rate card + zone map (already in finance/pricing-calculator/data)
 *           into Shopify-ready weight-based shipping rates the founder pastes into
 *           Settings -> Shipping. Produces three CSVs:
 *             - international-rates.csv : per DHL zone, a charge for each weight band
 *             - local-rates.csv         : domestic (consignee cost + petrol buffer)
 *             - zone-countries.csv      : which countries belong to each DHL zone
 * Model   : INTERNATIONAL = real DHL non-doc cost at the band's TOP weight, rounded UP to
 *           the nearest Rs.1,000 (a 0-1,000 cushion for fuel/FX drift; never undercharges).
 *           LOCAL = consignee cost (1kg=800, 2kg=1400, i.e. +600/kg) + Rs.200 buffer.
 *           Rates above 2 kg local are EXTRAPOLATED at +600/kg — confirm with the consignee.
 * Inputs  : ../finance/pricing-calculator/data/dhl-rates-nondoc.csv
 *           ../finance/pricing-calculator/data/dhl-zones.csv
 * Outputs : shipping/international-rates.csv, local-rates.csv, zone-countries.csv
 * Run     : node shipping/build-shipping-rates.mjs   (Node 18+, no npm install)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = resolve(HERE, '..', 'finance', 'pricing-calculator', 'data');

// --- weight bands: [label, DHL rate-card weight (kg) used to price the band] -----------------
// Band priced at its TOP weight so we never undercharge. 8kg+ = manual quote (no flat rate).
const BANDS = [
  { label: '0-1 kg',  min: 0, max: 1, rateKg: 1.0 },
  { label: '1-2 kg',  min: 1, max: 2, rateKg: 2.0 },
  { label: '2-3 kg',  min: 2, max: 3, rateKg: 3.0 },
  { label: '3-5 kg',  min: 3, max: 5, rateKg: 5.0 },
  { label: '5-8 kg',  min: 5, max: 8, rateKg: 8.0 },
];

const INTL_ROUND = 1000; // round international charge UP to nearest this (fuel/FX cushion)
const LOCAL_BASE_1KG = 800;   // consignee charge at 1 kg
const LOCAL_PER_KG = 600;     // consignee increment per extra kg (800->1400 = +600)
const LOCAL_BUFFER = 200;     // we charge the customer this much over our consignee cost

const roundUpTo = (v, step) => Math.ceil(v / step) * step;

function parseCsv(text) {
  // minimal CSV: handles quoted fields containing commas
  return text.trim().split('\n').map(line => {
    const out = []; let cur = ''; let q = false;
    for (const ch of line) {
      if (ch === '"') q = !q;
      else if (ch === ',' && !q) { out.push(cur); cur = ''; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  });
}

// --- load DHL rate card: weight_kg -> [zone1..zone13] ---------------------------------------
const rateRows = parseCsv(readFileSync(resolve(DATA, 'dhl-rates-nondoc.csv'), 'utf8'));
const rateByKg = new Map();
for (let i = 1; i < rateRows.length; i++) {
  const r = rateRows[i];
  if (!r[0]) continue;
  rateByKg.set(Number(r[0]).toFixed(2), r.slice(1).map(Number)); // index 0 = zone1
}

// --- international-rates.csv ------------------------------------------------------------------
const intlHeader = ['dhl_zone', ...BANDS.map(b => b.label), '8 kg+'];
const intlLines = [intlHeader.join(',')];
for (let zone = 1; zone <= 13; zone++) {
  const cells = [`Zone ${zone}`];
  for (const b of BANDS) {
    const row = rateByKg.get(b.rateKg.toFixed(2));
    const cost = row[zone - 1];
    cells.push(roundUpTo(cost, INTL_ROUND));
  }
  cells.push('Contact for quote');
  intlLines.push(cells.join(','));
}
writeFileSync(resolve(HERE, 'international-rates.csv'), intlLines.join('\n') + '\n');

// --- local-rates.csv -------------------------------------------------------------------------
const localLines = ['weight_band,our_cost_pkr,charge_customer_pkr,note'];
for (const b of BANDS) {
  const cost = LOCAL_BASE_1KG + (b.rateKg - 1) * LOCAL_PER_KG; // consignee cost at band top
  const charge = cost + LOCAL_BUFFER;
  const note = b.rateKg > 2 ? 'EXTRAPOLATED +600/kg - confirm with consignee' : 'from consignee quote';
  localLines.push([b.label, cost, charge, note].join(','));
}
localLines.push('8 kg+,,,Contact for quote');
writeFileSync(resolve(HERE, 'local-rates.csv'), localLines.join('\n') + '\n');

// --- zone-countries.csv (grouped, for building Shopify shipping zones) -----------------------
const zoneRows = parseCsv(readFileSync(resolve(DATA, 'dhl-zones.csv'), 'utf8'));
const byZone = new Map();
for (let i = 1; i < zoneRows.length; i++) {
  const [country, , zone] = zoneRows[i];
  if (!country) continue;
  const z = Number(zone);
  if (!byZone.has(z)) byZone.set(z, []);
  byZone.get(z).push(country);
}
const zcLines = ['dhl_zone,country_count,countries'];
for (let zone = 1; zone <= 13; zone++) {
  const list = (byZone.get(zone) || []).sort();
  zcLines.push([`Zone ${zone}`, list.length, `"${list.join('; ')}"`].join(','));
}
writeFileSync(resolve(HERE, 'zone-countries.csv'), zcLines.join('\n') + '\n');

console.log('Wrote international-rates.csv, local-rates.csv, zone-countries.csv to shipping/');
