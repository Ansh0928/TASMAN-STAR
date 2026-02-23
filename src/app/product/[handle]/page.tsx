import { ChevronLeft, Info, Search } from 'lucide-react';
import { getMockProducts } from '@/lib/data';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { handle: string } }) {
    const products = await getMockProducts();
    const product = products.find(p => p.handle === params.handle) || products[0];

    return (
        <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Basic Web Header */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <ChevronLeft size={20} />
                        </Link>
                        <span className="font-serif text-xl font-bold text-black tracking-wide">
                            Tasman Star
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-slate-400" />
                            </div>
                            <input type="text" placeholder="Search..." className="w-full bg-slate-100 border-none text-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#FF8543]" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content (Split View on Desktop) */}
            <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow flex flex-col lg:flex-row gap-8 lg:gap-16">

                {/* Left Column: Product Image */}
                <div className="w-full lg:w-1/2">
                    <div className="w-full aspect-[4/3] md:aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-sm border border-slate-200 sticky top-24">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Right Column: Product Details & Options */}
                <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-8 pb-32 lg:pb-0">

                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-black mb-2 leading-tight">
                        {product.title}
                    </h1>
                    <p className="font-sans font-bold text-2xl md:text-3xl text-black mb-4">
                        {product.price}
                    </p>

                    <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-xl">
                        Flaky, tender, and incredibly fresh. Sourced directly from {product.location}, this premium catch is perfect for grilling, pan-searing, or serving raw.
                    </p>

                    <hr className="border-slate-200 mb-8" />

                    {/* Options List mimics "Egg Style" from ref */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-sans font-bold text-black text-lg">Preparation Style</h3>
                            <span className="text-xs text-white bg-[#FF8543] px-2 py-1 rounded font-bold shadow-sm">✓ Required</span>
                        </div>

                        <div className="space-y-4">
                            {['Whole (Uncleaned)', 'Filleted (Skin On)', 'Filleted (Skin Off)', 'Steaks'].map((opt, i) => (
                                <label key={i} className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                                    <span className="text-base text-black font-medium">{opt}</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${i === 1 ? 'border-black' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                        {i === 1 && <div className="w-3 h-3 bg-black rounded-full" />}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl mb-8 max-w-lg text-sm">
                        <Info size={18} className="shrink-0 mt-0.5" />
                        <p>Weight is estimated before cleaning. Final price may adjust slightly based on the exact cut.</p>
                    </div>

                </div>
            </main>

            {/* Sticky Bottom Action Bar (mimicking the yellow Keeta bar but desktop-friendly) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="hidden md:block">
                        <h3 className="font-serif font-bold text-black text-lg">{product.title}</h3>
                        <p className="font-sans text-slate-500 text-sm">Filleted (Skin On)</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6 bg-slate-100 rounded-xl px-5 py-3 border border-slate-200">
                            <button className="text-slate-400 font-bold text-2xl hover:text-black transition-colors leading-none">-</button>
                            <span className="text-black font-bold font-sans text-lg">1</span>
                            <button className="text-black font-bold text-2xl hover:scale-110 transition-transform leading-none">+</button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex-1 md:w-72 bg-[#FF8543] hover:bg-[#E2743A] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-between transition-colors shadow-md text-lg">
                            <span>Add to cart</span>
                            <span>{product.price}</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
