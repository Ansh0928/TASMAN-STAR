import Image from 'next/image';
import Link from 'next/link';
import { Box, Store, Globe, Truck, Anchor, MapPin, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { getShopifyProducts, getCollections } from '@/lib/shopify';
import RegionalMapLazy from '@/components/map/RegionalMapLazy';

const BUSINESS_CARDS = [
    {
        href: '/our-business/wholesale',
        icon: Box,
        title: 'Wholesale Supply',
        description: 'Bulk fresh supply for restaurants, cafes, and independent grocers across the coast.',
        image: '/assets/wholesale.png',
    },
    {
        href: '/our-business/retail-stores',
        icon: Store,
        title: 'Retail Stores',
        description: 'Visit our physical stores in Labrador and Varsity Lakes to pick your own fresh catch.',
        image: '/assets/retail-store.jpeg',
    },
    {
        href: '/our-business/online-delivery',
        icon: Globe,
        title: 'Online & Delivery',
        description: 'Order premium seafood online and get it delivered fresh to your door on the Gold Coast.',
        image: '/assets/fresh.webp',
    },
    {
        href: '/our-business/transport',
        icon: Truck,
        title: 'Transport & Fish Freight',
        description: 'Temperature-controlled logistics moving seafood from our boats to markets across Australia.',
        image: '/tasman-star-fleet1.jpeg',
    },
    {
        href: '/our-business/fishing-fleet',
        icon: Anchor,
        title: 'Our Commercial Fishing Fleet',
        description: 'Our own trawlers and vessels fish the pristine waters off Australia\'s east coast daily.',
        image: '/vessels.jpeg',
    },
];

const CATEGORY_META: Record<string, { icon: string; priority: number }> = {
    'prawns': { icon: '🦐', priority: 1 },
    'oyster': { icon: '🦪', priority: 2 },
    'fish-fillet': { icon: '🐟', priority: 3 },
    'crabs': { icon: '🦀', priority: 4 },
    'clams': { icon: '🐚', priority: 5 },
    'sushi-sashimi': { icon: '🍣', priority: 6 },
    'squid-octopus': { icon: '🐙', priority: 7 },
    'frozen-products': { icon: '❄️', priority: 8 },
    'platters': { icon: '🍽️', priority: 9 },
    'family-bbq-value-packs': { icon: '📦', priority: 10 },
    'condiments-sauces': { icon: '🍋', priority: 11 },
    'smoked-cured-fish-products': { icon: '🔥', priority: 12 },
};

function getDayOfWeek() {
    return new Date().toLocaleDateString('en-AU', { weekday: 'long' });
}

export default async function OurBusinessPage() {
    const [products, collections] = await Promise.all([
        getShopifyProducts(),
        getCollections()
    ]);

    const day = getDayOfWeek();
    const dayIndex = new Date().getDay();

    // Today's specials: rotate daily
    const shuffled = [...products].sort((a: any, b: any) => {
        const aHash = a.handle.charCodeAt(0) + dayIndex;
        const bHash = b.handle.charCodeAt(0) + dayIndex;
        return (aHash % 7) - (bHash % 7);
    });
    const todaysSpecials = shuffled.slice(0, 4);

    // Best buys: products with compareAtPrice (on sale)
    const bestBuys = [...products]
        .filter((p: any) => {
            const compare = p.variants?.edges?.[0]?.node?.compareAtPrice?.amount;
            return compare && parseFloat(compare) > 0;
        })
        .slice(0, 8);
    const bestBuysFinal = bestBuys.length >= 4 ? bestBuys : products.slice(0, 8);

    // Sort collections by priority
    const sortedCollections = collections
        .filter((c: any) => c.handle !== 'all' && c.handle !== 'christmas-orders')
        .sort((a: any, b: any) => {
            const pa = CATEGORY_META[a.handle]?.priority ?? 99;
            const pb = CATEGORY_META[b.handle]?.priority ?? 99;
            return pa - pb;
        });

    return (
        <div className="min-h-screen bg-theme-primary flex flex-col transition-colors duration-300">

            {/* Hero Header */}
            <div className="w-full bg-[#0A192F] py-16 md:py-24">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[#FF8543] font-bold tracking-[0.3em] uppercase text-xs mb-4">Tasman Star Seafoods</p>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Our Business</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        From the boats to the cold trucks, and straight to your business or home. We operate a complete end-to-end seafood supply chain.
                    </p>
                </div>
            </div>

            <main className="flex flex-col w-full">

                {/* Business Cards */}
                <section className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BUSINESS_CARDS.map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={card.href}
                                    href={card.href}
                                    className="group bg-theme-card rounded-2xl shadow-sm border border-theme-subtle overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]/50 flex flex-col"
                                >
                                    <div className="h-52 bg-theme-tertiary overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                        <img
                                            src={card.image}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt={card.title}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col items-center text-center flex-grow">
                                        <div className="w-12 h-12 bg-[#FF8543]/10 rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-theme-card">
                                            <Icon className="text-[#FF8543]" size={24} />
                                        </div>
                                        <h2 className="font-serif text-xl font-bold text-theme-primary mb-2 group-hover:text-[#FF8543] transition-colors">
                                            {card.title}
                                        </h2>
                                        <p className="text-theme-muted text-sm">{card.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Online Delivery — Browse All Products */}
                <section className="container mx-auto px-4 md:px-6 py-8">
                    <div className="border-t border-theme-subtle pt-10">
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <div className="inline-flex items-center gap-2 text-[#FF8543] font-semibold tracking-wider uppercase text-sm mb-2">
                                    <Globe size={16} /> Online &amp; Delivery
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-theme-primary">Shop Our Full Range</h2>
                                <p className="text-theme-muted text-sm mt-2 max-w-xl">
                                    Browse our complete selection of premium seafood. Order online and get it delivered fresh to your door.
                                </p>
                            </div>
                            <Link href="/collections/all" className="hidden md:flex items-center text-[#FF8543] hover:text-theme-primary transition-colors text-sm font-medium gap-1">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>

                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {sortedCollections.map((col: any) => {
                                const meta = CATEGORY_META[col.handle];
                                return (
                                    <Link
                                        key={col.handle}
                                        href={`/collections/${col.handle}`}
                                        className="px-4 py-2 rounded-full bg-theme-card border border-theme-subtle text-sm font-medium text-theme-secondary hover:border-[#FF8543]/50 hover:text-[#FF8543] transition-colors"
                                    >
                                        {meta?.icon} {col.title}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Products grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.slice(0, 12).map((product: any) => (
                                <ProductCard key={product.handle} product={product} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <Link href="/collections/all" className="px-8 py-3 bg-[#FF8543] hover:bg-[#E2743A] text-white font-bold rounded-full transition-colors shadow-lg">
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Explore Our Waters — Map */}
                <section className="container mx-auto px-4 md:px-6 py-8">
                    <div className="border-t border-theme-subtle pt-10">
                        <RegionalMapLazy />
                    </div>
                </section>

                {/* Today's Specials */}
                <section className="container mx-auto px-4 md:px-6 py-8">
                    <div className="border-t border-theme-subtle pt-10">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-theme-primary mb-2">Today&apos;s Specials</h2>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-[#FF7F50] text-white text-xs font-bold rounded uppercase tracking-wider">Fresh Today</span>
                                    <span className="text-theme-muted text-sm">{day} &mdash; Refreshed daily</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {todaysSpecials.map((product: any) => (
                                <ProductCard key={product.handle} product={product} badge="Today" />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Best Buys */}
                <section className="container mx-auto px-4 md:px-6 py-8 pb-20">
                    <div className="border-t border-theme-subtle pt-10">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-theme-primary mb-2">Best Buys</h2>
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded uppercase tracking-wider">Popular</span>
                                    <span className="text-theme-muted text-sm">Customer favorites</span>
                                </div>
                            </div>
                            <Link href="/collections/all" className="hidden md:flex items-center text-[#FF8543] hover:text-theme-primary transition-colors text-sm font-medium gap-1">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {bestBuysFinal.slice(0, 8).map((product: any) => (
                                <ProductCard key={product.handle} product={product} badge="Best Buy" />
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

function ProductCard({ product, badge }: { product: any; badge?: string }) {
    const price = product.priceRange?.minVariantPrice?.amount
        ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
        : product.priceRange?.maxVariantPrice?.amount
            ? `$${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}`
            : '';
    const comparePrice = product.variants?.edges?.[0]?.node?.compareAtPrice?.amount;
    const hasDiscount = comparePrice && parseFloat(comparePrice) > 0;
    const image = product.featuredImage?.url;

    return (
        <Link href={`/product/${product.handle}`} className="bg-theme-card rounded-2xl overflow-hidden shadow-lg border border-theme-subtle flex flex-col group relative hover:border-[#E2743A]/50 transition-colors duration-300">
            {badge && (
                <div className="absolute top-4 left-4 z-10 bg-[#FF7F50] text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase">
                    {badge}
                </div>
            )}
            {hasDiscount && (
                <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                    SALE
                </div>
            )}

            <div className="aspect-[4/3] w-full bg-theme-tertiary overflow-hidden relative">
                {image ? (
                    <Image src={image} alt={product.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                ) : (
                    <div className="w-full h-full bg-theme-tertiary flex items-center justify-center text-theme-muted text-4xl">🐟</div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-theme-primary font-serif text-lg leading-snug mb-2 group-hover:text-[#E2743A] transition-colors line-clamp-2">{product.title}</h3>
                    <p className="text-theme-muted text-xs uppercase tracking-wider mb-4 flex items-center gap-1">
                        <MapPin size={12} className="text-[#FF8543]" /> Gold Coast, QLD
                    </p>
                </div>
                <div className="flex items-end justify-between mt-auto">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[#FF7F50] font-bold text-xl">{price}</span>
                        {hasDiscount && (
                            <span className="text-theme-muted text-sm line-through">${parseFloat(comparePrice).toFixed(2)}</span>
                        )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FF8543] hover:bg-[#1A908A] text-white flex items-center justify-center font-bold text-xl transition-all shadow-md group-hover:scale-110">
                        +
                    </div>
                </div>
            </div>
        </Link>
    );
}
