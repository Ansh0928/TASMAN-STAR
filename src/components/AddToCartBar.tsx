'use client';

import React, { useState } from 'react';
import { useCart } from './CartProvider';

interface AddToCartBarProps {
    productTitle: string;
    variants: Array<{
        id: string;
        title: string;
        price: { amount: string };
    }>;
}

export default function AddToCartBar({ productTitle, variants }: AddToCartBarProps) {
    const { addLines, isCartLoading } = useCart();

    // Default to first variant
    const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const activeVariant = variants.find(v => v.id === selectedVariantId) || variants[0];
    const price = activeVariant ? parseFloat(activeVariant.price.amount) : 0;
    const variantTitle = activeVariant ? activeVariant.title : '';

    const handleAddToCart = async () => {
        if (!selectedVariantId) return;
        setIsAdding(true);
        await addLines([{ merchandiseId: selectedVariantId, quantity }]);
        setIsAdding(false);
    };

    return (
        <>
            {/* Options List mimics "Egg Style" from ref */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-sans font-bold text-black text-lg">Preparation Style / Variant</h3>
                    <span className="text-xs text-white bg-[#FF8543] px-2 py-1 rounded font-bold shadow-sm">✓ Required</span>
                </div>

                <div className="space-y-4">
                    {variants.map((v) => {
                        const isSelected = selectedVariantId === v.id;
                        return (
                            <label
                                key={v.id}
                                className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors"
                            >
                                <div className="flex flex-col">
                                    <span className="text-base text-black font-medium">{v.title}</span>
                                    <span className="text-sm text-slate-500">${parseFloat(v.price.amount).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="variant"
                                        value={v.id}
                                        checked={isSelected}
                                        onChange={() => setSelectedVariantId(v.id)}
                                        className="hidden"
                                    />
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-black' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                        {isSelected && <div className="w-3 h-3 bg-black rounded-full" />}
                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="hidden md:block">
                        <h3 className="font-serif font-bold text-black text-lg">{productTitle}</h3>
                        <p className="font-sans text-slate-500 text-sm">{variantTitle !== 'Default Title' ? variantTitle : ''}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6 bg-slate-100 rounded-xl px-5 py-3 border border-slate-200">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="text-slate-400 font-bold text-2xl hover:text-black transition-colors leading-none disabled:opacity-50"
                                disabled={quantity <= 1 || isAdding || isCartLoading}
                            >
                                -
                            </button>
                            <span className="text-black font-bold font-sans text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="text-black font-bold text-2xl hover:scale-110 transition-transform leading-none disabled:opacity-50"
                                disabled={isAdding || isCartLoading}
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding || isCartLoading}
                            className="flex-1 md:w-72 bg-[#FF8543] hover:bg-[#E2743A] disabled:bg-[#FF8543]/50 text-black font-bold py-4 px-6 rounded-xl flex items-center justify-between transition-colors shadow-md text-lg"
                        >
                            <span>{isAdding ? 'Adding...' : 'Add to cart'}</span>
                            <span>${(price * quantity).toFixed(2)}</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
