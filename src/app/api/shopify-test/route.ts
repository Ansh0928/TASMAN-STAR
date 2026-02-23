import { NextResponse } from 'next/server';
import { getShopifyProducts, createCart, testStorefrontConnection } from '@/lib/shopify';

export async function GET() {
    const results: { admin: boolean; storefront: boolean; adminError?: string; storefrontError?: string; productCount?: number } = {
        admin: false,
        storefront: false
    };

    // Test Admin API (products)
    try {
        const products = await getShopifyProducts();
        results.admin = true;
        results.productCount = products.length;
    } catch (error: unknown) {
        results.adminError = process.env.NODE_ENV === 'development'
            ? (error instanceof Error ? error.message : String(error))
            : 'Admin API configuration error';
    }

    // Test Storefront API (cart create + connection test for details)
    try {
        const cart = await createCart();
        results.storefront = !!cart;
        if (!cart) {
            const conn = await testStorefrontConnection();
            results.storefrontError = process.env.NODE_ENV === 'development'
                ? (conn.error ?? 'createCart returned null (check Storefront token/scopes)')
                : 'Storefront API configuration error';
        }
    } catch (error: unknown) {
        results.storefrontError = process.env.NODE_ENV === 'development'
            ? (error instanceof Error ? error.message : String(error))
            : 'Storefront API configuration error';
    }

    const allOk = results.admin && results.storefront;
    return NextResponse.json({
        success: allOk,
        message: allOk
            ? 'Admin API and Storefront API are working.'
            : 'One or more APIs failed. See details below.',
        admin: results.admin ? 'OK' : results.adminError,
        storefront: results.storefront ? 'OK' : results.storefrontError,
        ...(results.productCount != null && { productCount: results.productCount })
    }, { status: allOk ? 200 : 500 });
}
