import { ChevronLeft, Home, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 h-14 flex items-center">
                    <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors text-slate-800">
                        <ChevronLeft size={24} />
                    </Link>
                    <span className="font-sans text-lg font-bold text-black ml-2">
                        Checkout
                    </span>
                </div>
            </header>

            <main className="container mx-auto max-w-2xl px-4 py-6 flex-grow flex flex-col gap-6">

                {/* Delivery Details Block */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">

                    {/* Address */}
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex gap-3">
                            <div className="mt-0.5 text-slate-400"><Home size={20} /></div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">Home</span>
                                    <span className="text-sm font-medium text-black">123 Ocean Drive</span>
                                </div>
                                <span className="text-sm text-slate-500">Gold Coast, QLD 4217, Australia...</span>
                            </div>
                        </div>
                        <ChevronLeft size={16} className="text-slate-300 rotate-180" />
                    </div>

                    {/* Delivery Instructions */}
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <MapPin size={20} className="text-slate-400" />
                            <span className="text-sm font-bold text-black">Leave at Front door</span>
                        </div>
                        <ChevronLeft size={16} className="text-slate-300 rotate-180" />
                    </div>

                    {/* Time Estimate */}
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Clock size={20} className="text-slate-400" />
                            <span className="text-sm font-bold text-black">Est. arrival 13:05-13:15</span>
                        </div>

                        <div className="ml-8 bg-[#fff3ec] rounded-xl p-3 border border-[#FFcba8]/50">
                            <div className="flex items-center gap-1 text-[#FF8543] font-bold text-sm mb-1">
                                <span className="text-[12px]">🛡</span> On-time Promise <ChevronLeft size={14} className="rotate-180" />
                            </div>
                            <p className="text-xs text-slate-600 leading-snug">
                                If your order arrives after 13:30, you'll get at least 1 x $10.00 in vouchers, up to 2 x $10.00 vouchers depending on the delay
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Summary Block */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-black font-sans">Order summary</h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black text-white font-serif font-bold flex items-center justify-center rounded-lg">
                                    TS
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-black">Tasman Star Seafood</span>
                                    <span className="text-xs text-slate-500">1 item</span>
                                </div>
                            </div>
                            <span className="text-sm text-slate-500 flex items-center gap-1 cursor-pointer">
                                Edit <ChevronLeft size={14} className="rotate-180" />
                            </span>
                        </div>

                        <div className="flex items-start justify-between">
                            <span className="text-sm text-black">1 × Whole King Salmon</span>
                            <span className="text-sm font-bold text-black">$ 60.00</span>
                        </div>
                    </div>
                </div>

                {/* Instant Savings Block */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-black font-sans">Instant savings</h2>

                    <div className="bg-[#fff3ec] border border-[#FFcba8]/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#ffe3d1] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#FF8543] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                %
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-black">Voucher</span>
                                <span className="text-xs text-slate-500">No vouchers applicable</span>
                            </div>
                        </div>
                        <ChevronLeft size={16} className="text-[#FF8543] rotate-180" />
                    </div>
                </div>

                {/* Order Totals */}
                <div className="flex flex-col gap-4 pb-32">
                    <h2 className="text-xl font-bold text-black font-sans mb-2">Order totals</h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Promo banner */}
                        <div className="bg-[#fff3ec] px-4 py-2 flex items-center gap-2">
                            <span className="text-sm">🥳</span>
                            <span className="text-xs font-bold text-[#FF8543]">You've got the best deal!</span>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Subtotal</span>
                                <span className="text-black font-medium">$ 60.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Refrigerated Delivery</span>
                                <span className="text-black font-medium">$ 5.90</span>
                            </div>
                            <div className="flex justify-between text-sm text-[#FF8543] font-medium">
                                <span>Delivery Discount</span>
                                <span>-$ 2.90</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Sticky Checkout Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
                <div className="container mx-auto max-w-2xl flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-black">Total $ 63.00</span>
                        <span className="text-xs text-[#FF8543] font-medium">$ 2.90 off applied</span>
                    </div>
                    <button className="bg-black hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-xl flex items-center gap-2 transition-colors">
                        Pay
                    </button>
                </div>
            </div>

        </div>
    );
}
