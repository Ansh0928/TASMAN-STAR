'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, isCartLoading } = useCart();

    useEffect(() => {
        if (!isCartLoading && cart?.checkoutUrl && cart.lines.edges.length > 0) {
            window.location.href = cart.checkoutUrl;
        }
    }, [cart, isCartLoading]);

    if (isCartLoading) {
        return (
            <div className="min-h-screen bg-theme-primary flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#FF8543] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!cart?.lines?.edges?.length) {
        return (
            <div className="min-h-screen bg-theme-primary flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-20 h-20 bg-theme-tertiary rounded-full flex items-center justify-center">
                    <ShoppingCart size={32} className="text-theme-muted" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-theme-primary">Your cart is empty</h1>
                <p className="text-theme-muted text-center">Add some items to your cart before checking out.</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#FF8543] hover:bg-[#E2743A] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                    <ChevronLeft size={18} /> Continue Shopping
                </Link>
            </div>
        );
    }

    // Redirecting to Shopify checkout
    return (
        <div className="min-h-screen bg-theme-primary flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-[#FF8543] border-t-transparent rounded-full animate-spin" />
                <p className="text-theme-muted">Redirecting to checkout...</p>
            </div>
        </div>
    );
}
