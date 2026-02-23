import { Ship, Anchor, Fish } from 'lucide-react';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Hero Banner */}
            <div className="w-full bg-[#0A192F] py-20 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#FF8543]/10 blur-[100px] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">About Tasman Star</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        For over three generations, we have been charting the unpredictable waters of the ocean to bring the freshest catch directly to your plate.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 flex flex-col gap-16 max-w-4xl">

                <section className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1549419163-4baee5ea76ba?auto=format&fit=crop&q=80&w=600&h=400"
                            alt="Fishing Boat"
                            className="rounded-2xl shadow-xl w-full h-auto object-cover border border-slate-200"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h2 className="font-serif text-3xl font-bold text-black border-l-4 border-[#FF8543] pl-4">Our Heritage</h2>
                        <p className="text-slate-600 leading-relaxed">
                            What started as a single small trawler off the Gold Coast in 1978 has grown into a fleet dedicated to sustainable, premium seafood. We believe that the ocean's bounty should be treated with utmost respect.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Every morning before dawn, our crew unloads the freshest fish, crabs, and oysters—ensuring that from sea to table, the cold chain is never broken.
                        </p>
                    </div>
                </section>

                <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <h2 className="font-serif text-3xl font-bold text-center text-black mb-12">The Ocean-First Promise</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 bg-[#fff3ec] rounded-full flex items-center justify-center mb-2">
                                <Ship className="text-[#FF8543]" size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-black">Traceable Catch</h3>
                            <p className="text-sm text-slate-500">We track every single haul back to the exact GPS coordinates it was sourced from.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 bg-[#fff3ec] rounded-full flex items-center justify-center mb-2">
                                <Fish className="text-[#FF8543]" size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-black">Impeccable Freshness</h3>
                            <p className="text-sm text-slate-500">Fast processing and ice-chilled environments ensure absolute restaurant-quality produce.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 bg-[#fff3ec] rounded-full flex items-center justify-center mb-2">
                                <Anchor className="text-[#FF8543]" size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-black">Sustainable Practices</h3>
                            <p className="text-sm text-slate-500">We work alongside marine biologists to ensure we only harvest non-threatened species.</p>
                        </div>
                    </div>
                </section>

            </main>

        </div>
    );
}
