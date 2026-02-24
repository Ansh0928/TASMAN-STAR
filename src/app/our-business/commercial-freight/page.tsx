import { Anchor, ShieldCheck, Clock, CheckCircle2, Phone, Mail, Box } from 'lucide-react';

export default function CommercialFreightPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* 1. Image Header Banner */}
            <div className="w-full h-[60vh] relative overflow-hidden bg-[#0A192F]">
                <img src="/frieght.png" alt="Commercial Freight" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-10 z-10 lg:bottom-10 lg:left-10">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm text-white mb-6 uppercase tracking-widest">
                            <Anchor size={14} /> Commercial Freight
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-tight leading-tight">
                            Marine Logistics <br /> with Precision.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-md max-w-2xl leading-relaxed">
                            Tasman Star offers professional commercial freight services. We leverage our extensive experience in marine logistics to provide reliable, scalable, and time-critical transport solutions.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24 max-w-7xl">

                {/* 2. Freight Services Section */}
                <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row group transition-all duration-300 hover:shadow-xl">
                    <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF0E5] rounded-full blur-[100px] opacity-50 -mr-20 -mt-20"></div>

                        <div className="inline-flex items-center gap-2 text-[#FF8543] font-semibold tracking-wider uppercase text-sm mb-4">
                            <Box size={18} /> Our Capacity
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Handling Volume with Care</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#FFF3EC] text-[#FF8543] rounded-full flex items-center justify-center">
                                    <Anchor size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Marine Transport</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">Specialized commercial capabilities for moving large-scale catches efficiently from port to processing.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#FFF3EC] text-[#FF8543] rounded-full flex items-center justify-center">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Time-Critical Logistics</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">In the seafood industry, time is freshness. Our logistics network is optimized for speed without compromising safety.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#FFF3EC] text-[#FF8543] rounded-full flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Compliance & Safety</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">We strictly adhere to all maritime safety and commercial freight regulations to ensure smooth operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 min-h-[400px]">
                        <img src="/frieght.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Freight Operations" />
                    </div>
                </section>

                {/* 3. Why Choose Us */}
                <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden">
                    <h2 className="font-serif text-4xl font-bold text-slate-900 mb-12 text-center">The Tasman Star Advantage</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group flex flex-col items-center text-center">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#FF8543] bg-[#FFF3EC] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110">01</span>
                                Industry Expertise
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Decades of experience navigating the complexities of commercial seafood freight and marine logistics.</p>
                        </div>

                        <div className="group flex flex-col items-center text-center">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#FF8543] bg-[#FFF3EC] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110">02</span>
                                Robust Infrastructure
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Backed by our own fleet and processing facilities, we manage the entire supply chain with confidence.</p>
                        </div>

                        <div className="group flex flex-col items-center text-center">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#FF8543] bg-[#FFF3EC] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110">03</span>
                                End-to-End Tracking
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Maintaining full visibility over commercial shipments to guarantee accountability and peace of mind.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Contact for Freight */}
                <section className="bg-[#0A192F] rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Partner With Us</h2>
                        <p className="text-xl text-slate-300 mb-10">Looking for a reliable commercial freight partner? Let's discuss your logistical needs.</p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="tel:0755964155" className="flex items-center justify-center gap-3 bg-white text-[#0A192F] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl">
                                <Phone size={20} /> 07 5596 4155
                            </a>
                            <a href="mailto:info@tasmanstarseafoods.com" className="flex items-center justify-center gap-3 bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                <Mail size={20} /> Contact Commercial Team
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
