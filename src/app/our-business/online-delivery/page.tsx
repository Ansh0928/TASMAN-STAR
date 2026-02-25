import { Globe, ShoppingCart, Clock, Truck, MapPin, ShieldCheck, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function OnlineDeliveryPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            <div className="w-full bg-[#0A192F] py-20 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#FF8543]/10 blur-[100px] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm text-white mb-6 uppercase tracking-widest">
                        <Globe size={14} /> Online Store
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Online & Delivery</h1>
                    <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
                        Premium seafood delivered fresh to your door. Order online and enjoy restaurant-quality seafood at home.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 flex flex-col gap-16 max-w-5xl">

                {/* How It Works */}
                <section>
                    <h2 className="font-serif text-4xl font-bold text-black mb-12 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#FF8543]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShoppingCart size={28} className="text-[#FF8543]" />
                            </div>
                            <span className="text-[#FF8543] font-bold text-sm mb-2">Step 1</span>
                            <h3 className="font-bold text-xl text-black mb-2">Browse & Order</h3>
                            <p className="text-slate-500 text-sm">Browse our full range of fresh seafood online. Add your favourites to the cart and checkout in minutes.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#FF8543]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Clock size={28} className="text-[#FF8543]" />
                            </div>
                            <span className="text-[#FF8543] font-bold text-sm mb-2">Step 2</span>
                            <h3 className="font-bold text-xl text-black mb-2">We Prepare</h3>
                            <p className="text-slate-500 text-sm">Your order is hand-picked and prepared by our team. Filleting, cleaning, and portioning to your specs.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#FF8543]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Truck size={28} className="text-[#FF8543]" />
                            </div>
                            <span className="text-[#FF8543] font-bold text-sm mb-2">Step 3</span>
                            <h3 className="font-bold text-xl text-black mb-2">Fresh Delivery</h3>
                            <p className="text-slate-500 text-sm">Delivered in temperature-controlled packaging straight to your door on Wednesday & Friday.</p>
                        </div>
                    </div>
                </section>

                {/* Delivery Info */}
                <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <h2 className="font-serif text-3xl font-bold text-black mb-8">Delivery Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-[#FF8543]/10 rounded-full flex items-center justify-center shrink-0">
                                <MapPin size={24} className="text-[#FF8543]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-black mb-1">Delivery Area</h3>
                                <p className="text-slate-600">Gold Coast, Brisbane, and surrounding suburbs. Contact us for regional delivery options.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-[#FF8543]/10 rounded-full flex items-center justify-center shrink-0">
                                <Clock size={24} className="text-[#FF8543]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-black mb-1">Delivery Days</h3>
                                <p className="text-slate-600">Wednesday & Friday. Order by midnight the day before for next-day delivery.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-[#FF8543]/10 rounded-full flex items-center justify-center shrink-0">
                                <Truck size={24} className="text-[#FF8543]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-black mb-1">Free Delivery</h3>
                                <p className="text-slate-600">Free delivery on all orders over $150. Standard delivery fee of $15 for smaller orders.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-[#FF8543]/10 rounded-full flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} className="text-[#FF8543]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-black mb-1">Freshness Guarantee</h3>
                                <p className="text-slate-600">Not satisfied? We&apos;ll replace your order or refund you — no questions asked.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-[#0A192F] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Ready to Order?</h2>
                        <p className="text-xl text-slate-300 mb-10">Browse our full range of premium seafood and get it delivered fresh.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/" className="flex items-center justify-center gap-3 bg-[#FF8543] hover:bg-[#E2743A] text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
                                <ShoppingCart size={20} /> Shop Now
                            </Link>
                            <a href="tel:0755964155" className="flex items-center justify-center gap-3 bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                <Phone size={20} /> 07 5596 4155
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
