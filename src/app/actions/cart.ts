'use server';

import { createCart, getCart, addToCart, removeFromCart, updateCart } from '@/lib/shopify';
import {
    validateAddToCartInput,
    validateRemoveFromCartInput,
    validateUpdateCartInput
} from '@/lib/cart-validation';

export async function createCartAction() {
    return await createCart();
}

export async function getCartAction(cartId: string) {
    const trimmed = cartId?.trim();
    if (!trimmed || trimmed.length > 200) return null;
    return await getCart(trimmed);
}

export async function addToCartAction(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    const result = validateAddToCartInput(cartId, lines);
    if (!result.valid) throw new Error(result.error);
    return await addToCart(result.cartId, result.lines);
}

export async function removeFromCartAction(cartId: string, lineIds: string[]) {
    const result = validateRemoveFromCartInput(cartId, lineIds);
    if (!result.valid) throw new Error(result.error);
    return await removeFromCart(result.cartId, result.lineIds);
}

export async function updateCartAction(cartId: string, lines: { id: string; merchandiseId?: string; quantity: number }[]) {
    const result = validateUpdateCartInput(cartId, lines);
    if (!result.valid) throw new Error(result.error);
    return await updateCart(result.cartId, result.lines);
}
