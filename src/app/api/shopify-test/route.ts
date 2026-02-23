import { NextResponse } from 'next/server';
import { getShopifyProducts } from '@/lib/shopify';

export async function GET() {
    try {
        const products = await getShopifyProducts();

        return NextResponse.json({
            success: true,
            message: "Successfully connected to Shopify!",
            count: products.length,
            products: products
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Failed to connect to Shopify. Check your API token.",
            error: error.message || error
        }, { status: 500 });
    }
}
