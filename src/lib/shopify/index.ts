// ---- Shopify API Client ----
// Uses the Admin API for product fetching (server-side only)
// Storefront API for cart operations (server-side)
//
// Storefront tokens MUST come from: Settings → Apps and channels → Headless
// (Create a storefront there and copy its Public/Private tokens.)
// Tokens from "Apps → Develop apps" are Admin API only and will return UNAUTHORIZED/ACCESS_DENIED.

import { unstable_cache } from 'next/cache';

export const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? process.env.SHOPIFY_STORE_DOMAIN.includes('http')
    ? process.env.SHOPIFY_STORE_DOMAIN
    : `https://${process.env.SHOPIFY_STORE_DOMAIN}`
  : '';

// Admin API endpoint & token (works for server-side product fetching)
export const adminEndpoint = `${domain}/admin/api/2024-01/graphql.json`;
export const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';

// Storefront API endpoint & tokens (for cart)
export const storefrontEndpoint = `${domain}/api/2024-01/graphql.json`;
export const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
export const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || '';

// Storefront is configured when we have domain + (private or public token)
const isStorefrontConfigured =
  !!domain &&
  domain !== 'https://' &&
  domain.includes('.myshopify.com') &&
  (!!privateToken || !!publicToken);

// ---- Admin API Fetch (for products) ----

export async function adminFetch<T>({
  query,
  variables
}: {
  query: string;
  variables?: any;
}): Promise<{ status: number; body: T }> {
  try {
    const result = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache: 'no-store'
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify Admin API errors:', body.errors);
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (e) {
    console.error('An error occurred while fetching from Shopify Admin API:', e);
    throw {
      status: 500,
      body: { error: 'Failed to fetch from Shopify Admin API' } as any
    };
  }
}

// ---- Storefront API Fetch (for cart operations) ----

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: any;
}): Promise<{ status: number; body: T }> {
  if (!isStorefrontConfigured) {
    throw {
      status: 503,
      body: {
        error: 'Storefront API not configured',
        message: 'Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_PRIVATE_TOKEN (or SHOPIFY_STOREFRONT_ACCESS_TOKEN) in .env.local'
      } as any
    };
  }

  try {
    // Prefer public token (works server-side); private token often returns ACCESS_DENIED
    const authHeaders: Record<string, string> = publicToken
      ? { 'X-Shopify-Storefront-Access-Token': publicToken }
      : privateToken
        ? {
            'Shopify-Storefront-Private-Token': privateToken,
            'Shopify-Storefront-Buyer-IP': '127.0.0.1'
          }
        : {};

    const result = await fetch(storefrontEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const text = await result.text();
    let body: any;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Storefront API returned non-JSON: ${text.slice(0, 200)}`);
    }

    if (body.errors && Array.isArray(body.errors) && body.errors.length > 0) {
      const err = body.errors[0];
      const msg = typeof err === 'string' ? err : err?.message || JSON.stringify(err);
      console.error('[Storefront API]', body.errors);
      throw new Error(msg);
    }

    if (result.status >= 400) {
      const msg = body?.errors?.[0]?.message || body?.error || `HTTP ${result.status}`;
      throw new Error(msg);
    }

    return { status: result.status, body };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to fetch from Shopify Storefront API';
    console.error('[Storefront API]', message);
    throw {
      status: 500,
      body: { error: message } as any
    };
  }
}

// ---- GRAPHQL QUERIES (Admin API) ----

const adminProductFragment = `
  fragment AdminProductFragment on Product {
    id
    handle
    title
    description
    featuredImage { url altText width height }
    tags
    variants(first: 5) {
      edges {
        node {
          id
          title
          price
        }
      }
    }
  }
`;

// ---- CSV FALLBACK (used when API tokens aren't working yet) ----

import fs from 'fs';
import path from 'path';

function getCSVProducts() {
  const csvPath = path.join(process.cwd(), 'inventory_export.csv');
  if (!fs.existsSync(csvPath)) return [];

  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const seen = new Set<string>();
  const products: any[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parse (handles basic cases)
    const cols = lines[i].split(',');
    const handle = cols[0]?.trim();
    const title = cols[1]?.trim();
    if (!handle || !title || seen.has(handle)) continue;
    seen.add(handle);

    // Seafood category images by keyword
    const img = getSeafoodImage(handle);

    products.push({
      handle,
      title,
      description: `Fresh ${title} from Tasman Star Seafood Market`,
      featuredImage: { url: img, altText: title, width: 400, height: 400 },
      priceRange: { maxVariantPrice: { amount: '24.99', currencyCode: 'AUD' } },
      tags: [],
      variants: {
        edges: [{
          node: {
            id: `csv-variant-${handle}`,
            title: 'Default',
            price: { amount: '24.99', currencyCode: 'AUD' }
          }
        }]
      }
    });
  }
  return products;
}

function getSeafoodImage(handle: string): string {
  const h = handle.toLowerCase();
  if (h.includes('oyster')) return 'https://images.unsplash.com/photo-1606731219412-7e283c4f2c9e?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('prawn')) return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('salmon')) return 'https://images.unsplash.com/photo-1599084990807-33433ed60b29?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('octopus')) return 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('crab')) return 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('scallop')) return 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('mussel')) return 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=400&h=400';
  if (h.includes('whiting') || h.includes('cod') || h.includes('emperor') || h.includes('roughy') || h.includes('parrot'))
    return 'https://images.unsplash.com/photo-1510130113600-521d55ac3ea8?auto=format&fit=crop&q=80&w=400&h=400';
  return 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=400&h=400';
}

async function fetchShopifyProductsUncached() {
  // Try Admin API first
  try {
    const query = `
      ${adminProductFragment}
      query getProducts {
        products(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
          edges { node { ...AdminProductFragment } }
        }
      }
    `;
    const res = await adminFetch<any>({ query });
    const products = res.body.data?.products?.edges?.map((e: any) => {
      const node = e.node;
      const firstVariant = node.variants?.edges?.[0]?.node;
      return {
        ...node,
        priceRange: { maxVariantPrice: { amount: firstVariant?.price || '0', currencyCode: 'AUD' } },
        variants: {
          edges: node.variants?.edges?.map((ve: any) => ({
            node: { ...ve.node, price: { amount: ve.node.price, currencyCode: 'AUD' } }
          })) || []
        }
      };
    }) || [];
    if (products.length > 0) return products;
  } catch (e) {
    console.warn('[getShopifyProducts] Admin API failed, falling back to CSV:', e instanceof Error ? e.message : e);
  }

  // Fallback to CSV data
  return getCSVProducts();
}

export async function getShopifyProducts() {
  return unstable_cache(
    fetchShopifyProductsUncached,
    ['shopify-products'],
    { revalidate: 60, tags: ['products'] }
  )();
}

async function fetchProductUncached(handle: string) {
  // Try Admin API first
  try {
    const query = `
      ${adminProductFragment}
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) { ...AdminProductFragment }
      }
    `;
    const res = await adminFetch<any>({ query, variables: { handle } });
    const product = res.body.data?.productByHandle;
    if (product) {
      const firstVariant = product.variants?.edges?.[0]?.node;
      return {
        ...product,
        priceRange: { maxVariantPrice: { amount: firstVariant?.price || '0', currencyCode: 'AUD' } },
        variants: {
          edges: product.variants?.edges?.map((ve: any) => ({
            node: { ...ve.node, price: { amount: ve.node.price, currencyCode: 'AUD' } }
          })) || []
        }
      };
    }
  } catch (e) {
    console.warn('[getProduct] Admin API failed, falling back to CSV:', e instanceof Error ? e.message : e);
  }

  const all = getCSVProducts();
  return all.find((p: any) => p.handle === handle) || null;
}

export async function getProduct(handle: string) {
  return unstable_cache(
    () => fetchProductUncached(handle),
    ['product', handle],
    { revalidate: 60, tags: ['products'] }
  )();
}

// ---- Storefront connection test (for debugging) ----

export async function testStorefrontConnection(): Promise<{ ok: boolean; shopName?: string; error?: string }> {
  if (!isStorefrontConfigured) {
    return { ok: false, error: 'Storefront not configured (missing SHOPIFY_STORE_DOMAIN or tokens)' };
  }
  try {
    const res = await shopifyFetch<{ data?: { shop?: { name: string } }; errors?: any[] }>({
      query: `query { shop { name } }`,
      cache: 'no-store'
    });
    const name = res.body.data?.shop?.name;
    if (name) return { ok: true, shopName: name };
    const err = res.body.errors?.[0];
    return { ok: false, error: err?.message ?? JSON.stringify(res.body) };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? e?.body?.error ?? String(e) };
  }
}

// ---- Cart operations (Storefront API) ----

const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
        totalTaxAmount { amount currencyCode }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount { amount currencyCode }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  handle
                  title
                  featuredImage { url altText width height }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCart(cartId: string) {
  if (!isStorefrontConfigured) return null;
  try {
    const res = await shopifyFetch<any>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store'
    });
    return res.body.data?.cart ?? null;
  } catch {
    return null;
  }
}

export async function createCart() {
  if (!isStorefrontConfigured) return null;
  try {
    const query = `
      mutation createCart {
        cartCreate {
          cart { id checkoutUrl }
          userErrors { field message }
        }
      }
    `;
    const res = await shopifyFetch<any>({ query, cache: 'no-store' });
    const payload = res.body.data?.cartCreate;
    if (payload?.userErrors?.length) {
      console.error('[Storefront API] cartCreate userErrors:', payload.userErrors);
      return null;
    }
    return payload?.cart ?? null;
  } catch {
    return null;
  }
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  if (!isStorefrontConfigured) return null;
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyFetch<any>({ query, variables: { cartId, lines }, cache: 'no-store' });
  const payload = res.body.data?.cartLinesAdd;
  if (payload?.userErrors?.length) {
    console.error('[Storefront API] cartLinesAdd userErrors:', payload.userErrors);
    throw new Error(payload.userErrors[0]?.message || 'Failed to add to cart');
  }
  return payload?.cart ?? null;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  if (!isStorefrontConfigured) return null;
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyFetch<any>({ query, variables: { cartId, lineIds }, cache: 'no-store' });
  const payload = res.body.data?.cartLinesRemove;
  if (payload?.userErrors?.length) {
    console.error('[Storefront API] cartLinesRemove userErrors:', payload.userErrors);
    throw new Error(payload.userErrors[0]?.message || 'Failed to remove from cart');
  }
  return payload?.cart ?? null;
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId?: string; quantity: number }[]) {
  if (!isStorefrontConfigured) return null;
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id }
        userErrors { field message }
      }
    }
  `;
  const res = await shopifyFetch<any>({ query, variables: { cartId, lines }, cache: 'no-store' });
  const payload = res.body.data?.cartLinesUpdate;
  if (payload?.userErrors?.length) {
    console.error('[Storefront API] cartLinesUpdate userErrors:', payload.userErrors);
    throw new Error(payload.userErrors[0]?.message || 'Failed to update cart');
  }
  return payload?.cart ?? null;
}
