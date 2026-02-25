import { NextResponse } from 'next/server';
import { getShopifyProducts, createCart, testStorefrontConnection } from '@/lib/shopify';

export async function GET() {
    const results: {
        storefront: boolean;
        storefrontError?: string;
        shopName?: string;
        productCount?: number;
        cartCreated?: boolean;
    } = {
        storefront: false
    };

    // Test connection
    const conn = await testStorefrontConnection();
    results.storefront = conn.ok;
    results.shopName = conn.shopName;
    if (!conn.ok) {
        results.storefrontError = conn.error;
    }

    // Test product fetching
    try {
        const products = await getShopifyProducts();
        results.productCount = products.length;
    } catch (error: unknown) {
        results.storefrontError = error instanceof Error ? error.message : String(error);
    }

    // Test cart creation
    try {
        const cart = await createCart();
        results.cartCreated = !!cart;
    } catch {
        results.cartCreated = false;
    }

    return NextResponse.json({
        success: results.storefront && (results.productCount ?? 0) > 0 && results.cartCreated,
        ...results
    }, { status: results.storefront ? 200 : 500 });
}
