import { PackageCheck, Timer, BadgePlus } from 'lucide-react';

export default function WholesalePage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            <div className="w-full h-[40vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img src="/assets/wholesale.png" className="absolute inset-0 w-full h-full object-cover" alt="Wholesale Fish Market" />
                <div className="relative z-20 text-center px-6">
                    <span className="text-[#FF8543] font-bold tracking-widest uppercase text-sm mb-2 block">Our Business</span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Wholesale Supply</h1>
                    <p className="text-xl text-slate-200 font-light max-w-xl mx-auto">Providing chefs and grocers with uncompromised quality.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">

                <div className="prose prose-lg prose-slate max-w-none text-center mb-16">
                    <p className="text-slate-600 text-lg leading-relaxed">
                        We understand that the foundation of a great restaurant is the consistency and quality of its ingredients. Tasman Star is the chosen seafood partner for over 150 top-tier restaurants, hotels, and independent grocers across the region.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <PackageCheck size={40} className="text-[#FF8543] mb-4" />
                        <h3 className="font-bold text-xl text-black mb-2">Custom Filleting</h3>
                        <p className="text-slate-500 text-sm">Portion-controlled cuts matching your exact kitchen specifications to reduce prep time.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <Timer size={40} className="text-[#FF8543] mb-4" />
                        <h3 className="font-bold text-xl text-black mb-2">Daily Deliveries</h3>
                        <p className="text-slate-500 text-sm">Order by midnight for 6 AM guaranteed delivery before your prep kitchen opens.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <BadgePlus size={40} className="text-[#FF8543] mb-4" />
                        <h3 className="font-bold text-xl text-black mb-2">Exclusive Access</h3>
                        <p className="text-slate-500 text-sm">Wholesale partners get first pick of rare, limited catch items coming off the boats.</p>
                    </div>
                </div>

                <div className="bg-[#fff3ec] rounded-3xl p-8 md:p-12 text-center border border-[#FF8543]/20">
                    <h2 className="font-serif text-3xl font-bold text-black mb-4">Become a Partner</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">Fill out a basic credit application and get assigned a dedicated account manager within 24 hours.</p>
                    <a href="https://app.fresho.com/tasman-star-seafoods" target="_blank" rel="noopener noreferrer" className="bg-[#FF8543] hover:bg-[#E2743A] text-black font-bold py-4 px-10 rounded-full transition-all text-lg shadow-[0_0_20px_rgba(255,133,67,0.3)] hover:shadow-[0_0_30px_rgba(255,133,67,0.5)] inline-block mt-4 md:mt-0">
                        Order via Fresho
                    </a>
                </div>

            </main>
        </div>
    );
}
