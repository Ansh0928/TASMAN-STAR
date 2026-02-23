'use client';

import React from 'react';
import { useCart } from './CartProvider';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function CartSidebar() {
    const {
        cart,
        isCartLoading,
        isCartSideBarOpen,
        setCartSideBarOpen,
        removeLines,
        updateLines
    } = useCart();

    if (!isCartSideBarOpen) return null;

    const handleQuantityChange = async (lineId: string, currentQuantity: number, change: number) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity <= 0) {
            await removeLines([lineId]);
        } else {
            await updateLines([{ id: lineId, quantity: newQuantity }]);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                onClick={() => setCartSideBarOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white text-black z-[101] shadow-2xl flex flex-col transform transition-transform duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="font-serif text-2xl font-bold">Your Cart</h2>
                    <button
                        onClick={() => setCartSideBarOpen(false)}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-black"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Loading State Overlay */}
                {isCartLoading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-[#FF8543] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {(!cart?.lines?.edges?.length) ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </div>
                            <p className="text-lg">Your cart is empty.</p>
                            <button
                                onClick={() => setCartSideBarOpen(false)}
                                className="text-[#FF8543] font-bold hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.lines.edges.map(({ node }) => {
                            const { id, quantity, cost, merchandise } = node;
                            const image = merchandise.product.featuredImage?.url;
                            return (
                                <div key={id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    {/* Image */}
                                    <div className="w-20 h-20 bg-slate-200 rounded-xl overflow-hidden shrink-0 relative">
                                        {image ? (
                                            <Image src={image} alt={merchandise.product.title} fill className="object-cover" sizes="80px" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200" />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h3 className="font-bold text-black font-sans leading-tight">
                                                    {merchandise.product.title}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {merchandise.title !== 'Default Title' ? merchandise.title : ''}
                                                </p>
                                            </div>
                                            <p className="font-bold text-black shrink-0">
                                                ${parseFloat(cost.totalAmount.amount).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-2 py-1">
                                                <button
                                                    disabled={isCartLoading}
                                                    onClick={() => handleQuantityChange(id, quantity, -1)}
                                                    className="p-1 hover:text-[#FF8543] transition-colors disabled:opacity-50"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                                                <button
                                                    disabled={isCartLoading}
                                                    onClick={() => handleQuantityChange(id, quantity, 1)}
                                                    className="p-1 hover:text-[#FF8543] transition-colors disabled:opacity-50"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                disabled={isCartLoading}
                                                onClick={() => removeLines([id])}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {cart?.lines?.edges?.length ? (
                    <div className="border-t border-slate-100 p-6 bg-white flex flex-col gap-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Subtotal</span>
                            <span>${parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-slate-500 pb-2">Shipping and taxes calculated at checkout.</p>

                        <a
                            href={cart.checkoutUrl}
                            className="bg-[#FF8543] hover:bg-[#E2743A] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-colors shadow-md text-lg w-full"
                        >
                            Proceed to Checkout
                        </a>
                    </div>
                ) : null}
            </div>
        </>
    );
}
