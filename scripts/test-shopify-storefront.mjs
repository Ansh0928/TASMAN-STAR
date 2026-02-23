#!/usr/bin/env node
/**
 * Sanity test for Shopify Storefront API.
 * Loads .env.local and runs a simple query to verify tokens work.
 * Run: node scripts/test-shopify-storefront.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const envPath = join(root, '.env.local');

if (!existsSync(envPath)) {
  console.error('❌ .env.local not found. Create it with SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((l) => {
      const eq = l.indexOf('=');
      const key = l.slice(0, eq).trim();
      const val = l.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      return [key, val];
    })
);

const domain = env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const publicToken = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const privateToken = env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

if (!domain || (!publicToken && !privateToken)) {
  console.error('❌ Missing SHOPIFY_STORE_DOMAIN or Storefront token(s) in .env.local');
  process.exit(1);
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function test(name, headers) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: 'query { shop { name } }' }),
  });
  const body = await res.json();
  return { status: res.status, body };
}

console.log('Testing Shopify Storefront API...\n');
console.log('Endpoint:', endpoint);
console.log('');

if (publicToken) {
  console.log('1. Public token (X-Shopify-Storefront-Access-Token):');
  const r = await test('public', { 'X-Shopify-Storefront-Access-Token': publicToken });
  if (r.body.data?.shop?.name) {
    console.log('   ✅ OK — shop name:', r.body.data.shop.name);
  } else {
    console.log('   ❌ Failed:', r.body.errors?.[0]?.message || JSON.stringify(r.body));
  }
  console.log('');
}

if (privateToken) {
  console.log('2. Private token (Shopify-Storefront-Private-Token):');
  const r = await test('private', {
    'Shopify-Storefront-Private-Token': privateToken,
    'Shopify-Storefront-Buyer-IP': '127.0.0.1',
  });
  if (r.body.data?.shop?.name) {
    console.log('   ✅ OK — shop name:', r.body.data.shop.name);
  } else {
    console.log('   ❌ Failed:', r.body.errors?.[0]?.message || JSON.stringify(r.body));
  }
  console.log('');
}

if (!publicToken && !privateToken) {
  console.log('No Storefront tokens found in .env.local');
  process.exit(1);
}
