// ---- Shopify Storefront API Client ----
// All operations use the Storefront API via the Headless channel.
// Tokens come from: Shopify Admin → Sales channels → Headless

import { unstable_cache } from 'next/cache';

export const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? process.env.SHOPIFY_STORE_DOMAIN.includes('http')
    ? process.env.SHOPIFY_STORE_DOMAIN
    : `https://${process.env.SHOPIFY_STORE_DOMAIN}`
  : '';

export const storefrontEndpoint = `${domain}/api/2024-01/graphql.json`;
export const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const isConfigured =
  !!domain &&
  domain !== 'https://' &&
  domain.includes('.myshopify.com') &&
  !!publicToken;

// ---- Storefront API Fetch ----

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
  if (!isConfigured) {
    throw new Error('Storefront API not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local');
  }

  const result = await fetch(storefrontEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': publicToken,
      ...headers
    },
    body: JSON.stringify({ query, variables }),
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

  if (body.errors?.length) {
    const msg = body.errors[0]?.message || JSON.stringify(body.errors[0]);
    console.error('[Storefront API]', body.errors);
    throw new Error(msg);
  }

  return { status: result.status, body };
}

// ---- Product Queries (Storefront API) ----

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    productType
    tags
    featuredImage { url altText width height }
    images(first: 5) {
      edges { node { url altText width height } }
    }
    priceRange {
      maxVariantPrice { amount currencyCode }
      minVariantPrice { amount currencyCode }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
    collections(first: 5) {
      edges { node { handle title } }
    }
  }
`;

async function fetchAllProducts() {
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${PRODUCT_FRAGMENT}
        query getAllProducts {
          products(first: 100, sortKey: TITLE) {
            edges { node { ...ProductFields } }
          }
        }
      `,
      cache: 'no-store',
      tags: ['products']
    });
    return res.body.data?.products?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error('[getShopifyProducts] Storefront API failed:', e instanceof Error ? e.message : e);
    return [];
  }
}

export async function getShopifyProducts() {
  return unstable_cache(
    fetchAllProducts,
    ['shopify-products'],
    { revalidate: 60, tags: ['products'] }
  )();
}

async function fetchProduct(handle: string) {
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${PRODUCT_FRAGMENT}
        query getProduct($handle: String!) {
          product(handle: $handle) { ...ProductFields }
        }
      `,
      variables: { handle },
      cache: 'no-store',
      tags: ['products']
    });
    return res.body.data?.product ?? null;
  } catch (e) {
    console.error('[getProduct] Storefront API failed:', e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getProduct(handle: string) {
  return unstable_cache(
    () => fetchProduct(handle),
    ['product', handle],
    { revalidate: 60, tags: ['products'] }
  )();
}

// ---- Collection Queries ----

async function fetchCollections() {
  try {
    const res = await shopifyFetch<any>({
      query: `
        query getCollections {
          collections(first: 20) {
            edges {
              node {
                id
                handle
                title
                description
                image { url altText width height }
                products(first: 4) {
                  edges {
                    node {
                      id
                      handle
                      title
                      featuredImage { url altText width height }
                      priceRange { minVariantPrice { amount currencyCode } }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      cache: 'no-store',
      tags: ['collections']
    });
    return res.body.data?.collections?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error('[getCollections] failed:', e instanceof Error ? e.message : e);
    return [];
  }
}

export async function getCollections() {
  return unstable_cache(
    fetchCollections,
    ['shopify-collections'],
    { revalidate: 60, tags: ['collections'] }
  )();
}

async function fetchCollectionByHandle(handle: string) {
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${PRODUCT_FRAGMENT}
        query getCollection($handle: String!) {
          collection(handle: $handle) {
            id
            handle
            title
            description
            image { url altText width height }
            products(first: 50) {
              edges { node { ...ProductFields } }
            }
          }
        }
      `,
      variables: { handle },
      cache: 'no-store',
      tags: ['collections']
    });
    return res.body.data?.collection ?? null;
  } catch (e) {
    console.error('[getCollection] failed:', e instanceof Error ? e.message : e);
    return null;
  }
}

export async function getCollection(handle: string) {
  return unstable_cache(
    () => fetchCollectionByHandle(handle),
    ['collection', handle],
    { revalidate: 60, tags: ['collections'] }
  )();
}

// ---- Search ----

export async function searchProducts(query: string) {
  if (!query.trim()) return [];
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${PRODUCT_FRAGMENT}
        query searchProducts($query: String!) {
          search(query: $query, first: 20, types: PRODUCT) {
            edges {
              node {
                ... on Product { ...ProductFields }
              }
            }
          }
        }
      `,
      variables: { query },
      cache: 'no-store'
    });
    return res.body.data?.search?.edges?.map((e: any) => e.node) || [];
  } catch (e) {
    console.error('[searchProducts] failed:', e instanceof Error ? e.message : e);
    return [];
  }
}

// ---- Cart Operations ----

const CART_FRAGMENT = `
  fragment CartFields on Cart {
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
              price { amount currencyCode }
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
`;

export async function createCart() {
  if (!isConfigured) return null;
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${CART_FRAGMENT}
        mutation createCart {
          cartCreate {
            cart { ...CartFields }
            userErrors { field message }
          }
        }
      `,
      cache: 'no-store'
    });
    const payload = res.body.data?.cartCreate;
    if (payload?.userErrors?.length) {
      console.error('[cartCreate] userErrors:', payload.userErrors);
      return null;
    }
    return payload?.cart ?? null;
  } catch {
    return null;
  }
}

export async function getCart(cartId: string) {
  if (!isConfigured) return null;
  try {
    const res = await shopifyFetch<any>({
      query: `
        ${CART_FRAGMENT}
        query getCart($cartId: ID!) {
          cart(id: $cartId) { ...CartFields }
        }
      `,
      variables: { cartId },
      cache: 'no-store'
    });
    return res.body.data?.cart ?? null;
  } catch {
    return null;
  }
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  if (!isConfigured) return null;
  const res = await shopifyFetch<any>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
    `,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  const payload = res.body.data?.cartLinesAdd;
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0]?.message || 'Failed to add to cart');
  }
  return payload?.cart ?? null;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  if (!isConfigured) return null;
  const res = await shopifyFetch<any>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
    `,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });
  const payload = res.body.data?.cartLinesRemove;
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0]?.message || 'Failed to remove from cart');
  }
  return payload?.cart ?? null;
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId?: string; quantity: number }[]) {
  if (!isConfigured) return null;
  const res = await shopifyFetch<any>({
    query: `
      ${CART_FRAGMENT}
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { field message }
        }
      }
    `,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  const payload = res.body.data?.cartLinesUpdate;
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0]?.message || 'Failed to update cart');
  }
  return payload?.cart ?? null;
}

// ---- Connection Test ----

export async function testStorefrontConnection(): Promise<{ ok: boolean; shopName?: string; error?: string }> {
  if (!isConfigured) {
    return { ok: false, error: 'Storefront not configured' };
  }
  try {
    const res = await shopifyFetch<any>({
      query: `query { shop { name } }`,
      cache: 'no-store'
    });
    const name = res.body.data?.shop?.name;
    return name ? { ok: true, shopName: name } : { ok: false, error: 'No shop name returned' };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? String(e) };
  }
}
