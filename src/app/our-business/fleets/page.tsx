import { Snowflake, Truck, MapPin, ShieldCheck, Clock, CheckCircle2, Phone, Mail } from 'lucide-react';

export default function FleetsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* 1. Image Header Banner (Our Commitment to Freshness) */}
            <div className="w-full h-[60vh] relative overflow-hidden bg-[#0A192F]">
                <img src="/tasman-star-fleet1.jpeg" alt="Tasman Star Seafoods Fleet" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-10 z-10 lg:bottom-10 lg:left-10">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm text-white mb-6 uppercase tracking-widest">
                            <Truck size={14} /> Our Fleet
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-tight leading-tight">
                            From the Ocean <br/> to Your Door.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-md max-w-2xl leading-relaxed">
                            At Tasman Star Seafood Market, we take pride in our direct-to-door delivery service. Our dedicated fleet ensures that the premium quality you see in our market is exactly what arrives at your home or business.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24 max-w-7xl">

                {/* 2. Professional Refrigerated Transport (Using second image) */}
                <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row group transition-all duration-300 hover:shadow-xl">
                    <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E0F2FE] rounded-full blur-[100px] opacity-50 -mr-20 -mt-20"></div>
                        
                        <div className="inline-flex items-center gap-2 text-[#0284C7] font-semibold tracking-wider uppercase text-sm mb-4">
                            <Snowflake size={18} /> Our Equipment
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Professional Refrigerated Transport</h2>
                        
                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Fully Refrigerated</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">Every vehicle in our fleet is purpose-built with high-grade refrigeration to keep seafood at the perfect temperature.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Strict Temperature Control</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">We monitor our cooling systems constantly to ensure your order stays fresh and safe throughout the journey.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Daily Sanitization</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">Our vans are cleaned and sanitized after every shift to meet the highest food safety standards.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 min-h-[400px]">
                        <img src="/tasman-star-fleet2.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Refrigerated Delivery Vans" />
                    </div>
                </section>

                {/* Grid for Section 3 & 4 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* 3. Where We Deliver */}
                    <section className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B82F6] rounded-full blur-[120px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981] rounded-full blur-[120px] opacity-20"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                                <MapPin className="text-[#60A5FA]" size={28} />
                            </div>
                            <h2 className="font-serif text-4xl font-bold mb-6">Serving the Community.</h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                Our fleet covers a wide range of areas across the Gold Coast and surrounding regions.
                            </p>
                            
                            <div className="flex-grow space-y-6">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Gold Coast
                                    </h3>
                                    <p className="text-slate-400">Daily deliveries to most suburbs.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div> Special Orders
                                    </h3>
                                    <p className="text-slate-400">Bulk or wholesale delivery available for local restaurants and businesses.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. Why Choose Our Delivery? */}
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden">
                        <h2 className="font-serif text-4xl font-bold text-slate-900 mb-10">Why Choose Our Delivery?</h2>
                        
                        <div className="space-y-10">
                            <div className="group">
                                <h3 className="font-bold text-2xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="text-[#0284C7] bg-[#E0F2FE] w-10 h-10 rounded-full flex items-center justify-center text-sm transition-transform group-hover:scale-110">01</span>
                                    Expert Handling
                                </h3>
                                <p className="text-slate-600 text-lg pl-13 leading-relaxed">Our drivers are trained in handling delicate seafood to ensure no damage occurs during transit.</p>
                            </div>
                            
                            <div className="group">
                                <h3 className="font-bold text-2xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="text-[#0284C7] bg-[#E0F2FE] w-10 h-10 rounded-full flex items-center justify-center text-sm transition-transform group-hover:scale-110">02</span>
                                    Reliable Timing
                                </h3>
                                <p className="text-slate-600 text-lg pl-13 leading-relaxed">We stick to our schedules so you can plan your meals or business operations with confidence.</p>
                            </div>
                            
                            <div className="group">
                                <h3 className="font-bold text-2xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="text-[#0284C7] bg-[#E0F2FE] w-10 h-10 rounded-full flex items-center justify-center text-sm transition-transform group-hover:scale-110">03</span>
                                    Local Service
                                </h3>
                                <p className="text-slate-600 text-lg pl-13 leading-relaxed">When you see a Tasman Star van, you’re seeing a local business dedicated to the community.</p>
                            </div>
                        </div>
                    </section>

                </div>

                {/* 5. Delivery Enquiries */}
                <section className="bg-[#0A192F] rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Delivery Enquiries</h2>
                        <p className="text-xl text-slate-300 mb-10">Have a question about a delivery to your area?</p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="tel:0755964155" className="flex items-center justify-center gap-3 bg-white text-[#0A192F] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl">
                                <Phone size={20} /> 07 5596 4155
                            </a>
                            <a href="mailto:info@tasmanstarseafoods.com" className="flex items-center justify-center gap-3 bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                <Mail size={20} /> Contact Us
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
