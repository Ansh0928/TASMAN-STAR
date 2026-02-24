import { Ship, Droplet, Fish, Anchor, Navigation, Users, Hexagon } from 'lucide-react';

export default function OurBoatsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* 1. Image Header Banner */}
            <div className="w-full h-[60vh] relative overflow-hidden bg-[#0A192F]">
                <img src="/vessels.png" alt="Tasman Star Fishing Fleet" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-10 z-10 lg:bottom-10 lg:left-10">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm text-white mb-6 uppercase tracking-widest">
                            <Ship size={14} /> Our Own Vessels
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-tight leading-tight">
                            Straight from <br /> Our Nets.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 font-light drop-shadow-md max-w-2xl leading-relaxed">
                            At Tasman Star, we don't just buy seafood – we catch it. Operating our own fleet means we control the quality from the very moment the fish leaves the ocean.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24 max-w-7xl">

                {/* 2. Fishing Fleet Details */}
                <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row group transition-all duration-300 hover:shadow-xl">
                    <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E0F2FE] rounded-full blur-[100px] opacity-50 -mr-20 -mt-20"></div>

                        <div className="inline-flex items-center gap-2 text-[#0284C7] font-semibold tracking-wider uppercase text-sm mb-4">
                            <Navigation size={18} /> Deep Sea Operations
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Harvesting Excellence</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <Fish size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Quality at the Source</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">By owning the boats, we remove the middlemen. Our catch is immediately processed and preserved under the highest standards on board.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <Droplet size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Sustainable Practices</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">We only fish in designated, regulated zones. Operating our own vessels ensures we strictly follow ethical and sustainable fishing quotas.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 bg-[#F0F9FF] text-[#0284C7] rounded-full flex items-center justify-center">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2">Experienced Crew</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">Our captains and crew have generations of experience navigating the Eastern seaboard and bringing back only the finest catch.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 min-h-[400px]">
                        {/* Reusing tasman-star-fleet1.jpeg but maybe flip it to distinguish or just use it as is */}
                        <img src="/vessels.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Tasman Star Crew & Operations" />
                    </div>
                </section>

                {/* 3. The Catch Journey */}
                <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden">
                    <h2 className="font-serif text-4xl font-bold text-slate-900 mb-12 text-center">From Ocean to Market</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

                        <div className="group flex flex-col items-center text-center relative z-10">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#0284C7] bg-[#E0F2FE] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110 shadow-sm border-4 border-white">
                                    <Hexagon size={20} />
                                </span>
                                1. The Catch
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Early mornings out at sea, our crew hauls in wild-caught and sustainably sourced premium seafood.</p>
                        </div>

                        <div className="group flex flex-col items-center text-center relative z-10">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#0284C7] bg-[#E0F2FE] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110 shadow-sm border-4 border-white">
                                    <Ship size={20} />
                                </span>
                                2. Onboard Care
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">The catch is immediately flash-chilled on the vessels, locking in freshness, flavor, and texture before returning to port.</p>
                        </div>

                        <div className="group flex flex-col items-center text-center relative z-10">
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 flex flex-col items-center gap-3">
                                <span className="text-[#0284C7] bg-[#E0F2FE] w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform group-hover:scale-110 shadow-sm border-4 border-white">
                                    <Anchor size={20} />
                                </span>
                                3. To Our Facilities
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Docking straight at our processing facilities to be prepped for wholesale distribution or retail sale within hours.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Commitment Footer */}
                <section className="bg-[#0A192F] rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Our Commitment</h2>
                        <p className="text-xl text-slate-300 mb-10">Because we own the boats, we own the commitment to quality. The Tasman Star name promises nothing less than the best the ocean has to offer.</p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-[#FF8543] rounded-full mx-auto"></div>
                    </div>
                </section>

            </main>
        </div>
    );
}
