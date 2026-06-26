/**
 * sync.mjs — Shopify → Daily Orders export (Phase 1, item 2, code path)
 *
 * Purpose : Pull recent PAID orders straight from the Shopify Admin API (GraphQL) with full
 *           line-item detail — article, size/variant, custom measurements, quantity, price —
 *           and write them as clean rows to a CSV you import into the "Daily Orders" sheet.
 *           This is the reliable, code-based alternative to the Make.com scenario.
 * Inputs   : .env at repo root with:
 *              SHOPIFY_STORE_DOMAIN=celina-arif-3dm.myshopify.com
 *              SHOPIFY_ADMIN_API_TOKEN=shpat_xxx   (custom app, scope: read_orders)
 *              SHOPIFY_API_VERSION=2024-10         (optional)
 *              ORDERS_LIMIT=100                     (optional, how many recent orders)
 * Outputs  : data/private/daily-orders.csv  (gitignored — real order data never enters git)
 * Run      : 1) fill .env  2) `node src/shopify-order-sync/sync.mjs`
 *            Requires Node 18+ (uses built-in fetch). No npm install needed.
 *
 * No customer PII (names/addresses) is written — production-sheet columns only.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

// --- tiny .env loader (zero dependencies) -------------------------------------------------
function loadEnv() {
  try {
    const raw = readFileSync(resolve(ROOT, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch { /* no .env file — rely on real env vars */ }
}
loadEnv();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';
const LIMIT = Number(process.env.ORDERS_LIMIT || 100);

if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in .env — see header.');
  process.exit(1);
}

const QUERY = `
  query Orders($cursor: String) {
    orders(first: 50, after: $cursor, query: "financial_status:paid", sortKey: CREATED_AT, reverse: true) {
      pageInfo { hasNextPage endCursor }
      nodes {
        name
        createdAt
        lineItems(first: 50) {
          nodes {
            title
            quantity
            variantTitle
            customAttributes { key value }
            discountedUnitPriceSet { shopMoney { amount } }
          }
        }
      }
    }
  }`;

async function graphql(cursor) {
  const res = await fetch(`https://${DOMAIN}/admin/api/${VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN },
    body: JSON.stringify({ query: QUERY, variables: { cursor } }),
  });
  if (!res.ok) throw new Error(`Shopify API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error('GraphQL: ' + JSON.stringify(json.errors));
  return json.data.orders;
}

function csvCell(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function customValue(attrs, key) {
  const hit = (attrs || []).find(a => a.key.toLowerCase() === key.toLowerCase());
  return hit ? hit.value : '';
}

async function main() {
  const rows = [];
  let cursor = null;
  while (rows.length < LIMIT) {
    const page = await graphql(cursor);
    for (const order of page.nodes) {
      for (const li of order.lineItems.nodes) {
        const unit = Number(li.discountedUnitPriceSet?.shopMoney?.amount || 0);
        rows.push([
          order.name,                                   // order_no
          order.createdAt.slice(0, 10),                 // order_date (YYYY-MM-DD)
          li.title,                                     // article
          li.variantTitle || '',                        // size (variant: size/sleeves/length)
          customValue(li.customAttributes, 'Custom measurements'), // custom_measurements
          li.quantity,                                  // qty
          unit,                                         // unit_price
          unit * li.quantity,                           // line_total
          'New',                                        // status
        ]);
      }
      if (rows.length >= LIMIT) break;
    }
    if (!page.pageInfo.hasNextPage) break;
    cursor = page.pageInfo.endCursor;
  }

  const header = ['order_no','order_date','article','size','custom_measurements','qty','unit_price','line_total','status'];
  const csv = [header, ...rows].map(r => r.map(csvCell).join(',')).join('\n');
  const out = resolve(ROOT, 'data', 'private', 'daily-orders.csv');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, csv);

  const total = rows.reduce((s, r) => s + Number(r[7]), 0);
  console.log(`Wrote ${rows.length} line items → ${out}`);
  console.log(`Gross sales (sum of line totals, paid orders): ${total.toLocaleString()} — gross GMV, not net revenue.`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
