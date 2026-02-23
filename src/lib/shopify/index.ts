export const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? process.env.SHOPIFY_STORE_DOMAIN.includes('http')
        ? process.env.SHOPIFY_STORE_DOMAIN
        : `https://${process.env.SHOPIFY_STORE_DOMAIN}`
    : '';

export const endpoint = `${domain}/api/2024-01/graphql.json`;
export const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

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
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        });

        const body = await result.json();

        if (body.errors) {
            console.error(body.errors);
            throw body.errors[0];
        }

        return {
            status: result.status,
            body
        };
    } catch (e) {
        console.error('An error occurred while fetching from Shopify:', e);
        throw {
            status: 500,
            body: { error: 'Failed to fetch from Shopify API' } as any
        };
    }
}

// ---- GRAPHQL QUERIES ----

const productFragment = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    priceRange {
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    tags
    catchRegion: metafield(namespace: "custom", key: "catch_region") {
      value
    }
    variants(first: 5) {
      edges {
        node {
          id
          title
          price { amount currencyCode }
        }
      }
    }
  }
`;

export async function getShopifyProducts() {
    const query = `
    ${productFragment}
    query getProducts {
      products(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

    const res = await shopifyFetch<any>({ query, cache: 'no-store' });
    return res.body.data?.products?.edges?.map((e: any) => e.node) || [];
}
