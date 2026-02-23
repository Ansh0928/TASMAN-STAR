import Image from 'next/image';
import { getShopifyProducts } from '@/lib/shopify';
import Link from 'next/link';
import { Tag, Flame, Clock, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'Deals | Tasman Star Seafood Market',
    description: 'Discover daily deals and special offers on premium fresh seafood from Tasman Star.',
};

// Simulate some deals — in production these would come from a Shopify collection tagged "deals"
function getDeals(products: any[]) {
    return products.slice(0, 12).map((p: any, i: number) => {
        const originalPrice = parseFloat(p.priceRange?.maxVariantPrice?.amount || '29.99');
        const discount = [10, 15, 20, 25, 30][i % 5];
        const salePrice = originalPrice * (1 - discount / 100);
        return {
            ...p,
            discount,
            originalPrice: originalPrice.toFixed(2),
            salePrice: salePrice.toFixed(2),
        };
    });
}

export default async function DealsPage() {
    const products = await getShopifyProducts();
    const deals = getDeals(products);

    return (
        <div className="flex flex-col w-full bg-[#020C1B] min-h-screen">

            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1A365D] via-[#0A192F] to-[#020C1B] py-16 md:py-24 px-6">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#FF8543] blur-[100px]"></div>
                    <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-[#FF7F50] blur-[120px]"></div>
                </div>
                <div className="container mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#FF8543]/20 text-[#FF7F50] px-4 py-2 rounded-full text-sm font-bold mb-6 border border-[#FF8543]/30">
                        <Flame size={16} className="animate-pulse" />
                        Hot Deals
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                        Today&apos;s <span className="text-[#FF7F50]">Specials</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Fresh from the boats, straight to your table. Grab these limited-time deals before they&apos;re gone.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500">
                        <Clock size={14} />
                        Updated daily at 6:00 AM AEST
                    </div>
                </div>
            </div>

            {/* Deals Grid */}
            <div className="container mx-auto px-4 md:px-6 py-12">

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {['All Deals', 'Under $20', 'Prawns', 'Oysters', 'Fish Fillets', 'Platters'].map((filter, i) => (
                        <button
                            key={filter}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? 'bg-[#FF8543] text-white shadow-lg shadow-[#FF8543]/25'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {deals.map((deal: any) => {
                        const image = deal.featuredImage?.url;
                        return (
                            <Link
                                key={deal.handle}
                                href={`/product/${deal.handle}`}
                                className="group bg-[#0A192F] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF8543]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF8543]/5 flex flex-col"
                            >
                                {/* Image */}
                                <div className="aspect-square w-full bg-slate-800 overflow-hidden relative">
                                    {/* Discount Badge */}
                                    <div className="absolute top-3 left-3 z-10 bg-[#FF3B30] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        {deal.discount}% OFF
                                    </div>
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={deal.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-[#FF8543] transition-colors line-clamp-2">
                                        {deal.title}
                                    </h3>
                                    <div className="mt-auto pt-3 flex items-baseline gap-2">
                                        <span className="text-[#FF7F50] font-bold text-lg">${deal.salePrice}</span>
                                        <span className="text-slate-500 line-through text-sm">${deal.originalPrice}</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#FF8543]/70">
                                        <Tag size={12} />
                                        <span>Limited time offer</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-[#1A365D] to-[#0A192F] rounded-3xl p-10 border border-[#FF8543]/20 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#FF8543] blur-[80px] opacity-20"></div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 relative z-10">
                            Want fresh deals every day?
                        </h2>
                        <p className="text-slate-400 mb-6 relative z-10">
                            Visit our stores or check back daily — new specials drop every morning at 6 AM.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#FF8543] hover:bg-[#E2743A] text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 relative z-10"
                        >
                            Browse All Products
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
