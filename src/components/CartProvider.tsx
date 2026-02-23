'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createCartAction, getCartAction, addToCartAction, removeFromCartAction, updateCartAction } from '@/app/actions/cart';

export type CartItem = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: { amount: string; currencyCode: string };
    };
    merchandise: {
        id: string;
        title: string;
        product: {
            id: string;
            handle: string;
            title: string;
            featuredImage: { url: string; altText: string; width: number; height: number };
        };
    };
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: { amount: string; currencyCode: string };
        totalAmount: { amount: string; currencyCode: string };
        totalTaxAmount?: { amount: string; currencyCode: string };
    };
    lines: {
        edges: { node: CartItem }[];
    };
};

interface CartContextType {
    cart: Cart | null;
    isCartLoading: boolean;
    isCartSideBarOpen: boolean;
    setCartSideBarOpen: (isOpen: boolean) => void;
    addLines: (lines: { merchandiseId: string; quantity: number }[]) => Promise<void>;
    removeLines: (lineIds: string[]) => Promise<void>;
    updateLines: (lines: { id: string; merchandiseId?: string; quantity: number }[]) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [isCartSideBarOpen, setCartSideBarOpen] = useState(false);

    useEffect(() => {
        const initCart = async () => {
            try {
                const localCartId = window.localStorage.getItem('shopify_cart_id');

                if (localCartId) {
                    const existingCart = await getCartAction(localCartId);
                    if (existingCart) {
                        setCart(existingCart);
                        setIsCartLoading(false);
                        return;
                    }
                }

                // Create new cart if none exists or if it's expired/invalid
                const newCart = await createCartAction();
                if (newCart) {
                    window.localStorage.setItem('shopify_cart_id', newCart.id);
                    setCart(newCart);
                }
            } catch (error) {
                console.warn('Cart initialization failed (Storefront API may not be configured yet):', error);
                // Cart features will be unavailable but the rest of the site will still work
            }
            setIsCartLoading(false);
        };

        if (typeof window !== 'undefined') {
            initCart();
        }
    }, []);

    const addLines = async (lines: { merchandiseId: string; quantity: number }[]) => {
        if (!cart) return;
        setIsCartLoading(true);
        try {
            await addToCartAction(cart.id, lines);
            const updatedCart = await getCartAction(cart.id);
            if (updatedCart) setCart(updatedCart);
            setCartSideBarOpen(true);
        } catch (err) {
            console.warn('Add to cart failed:', err);
        } finally {
            setIsCartLoading(false);
        }
    };

    const removeLines = async (lineIds: string[]) => {
        if (!cart) return;
        setIsCartLoading(true);
        try {
            await removeFromCartAction(cart.id, lineIds);
            const updatedCart = await getCartAction(cart.id);
            if (updatedCart) setCart(updatedCart);
        } catch (err) {
            console.warn('Remove from cart failed:', err);
        } finally {
            setIsCartLoading(false);
        }
    };

    const updateLines = async (lines: { id: string; merchandiseId?: string; quantity: number }[]) => {
        if (!cart) return;
        setIsCartLoading(true);
        try {
            await updateCartAction(cart.id, lines);
            const updatedCart = await getCartAction(cart.id);
            if (updatedCart) setCart(updatedCart);
        } catch (err) {
            console.warn('Update cart failed:', err);
        } finally {
            setIsCartLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            isCartLoading,
            isCartSideBarOpen,
            setCartSideBarOpen,
            addLines,
            removeLines,
            updateLines
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
