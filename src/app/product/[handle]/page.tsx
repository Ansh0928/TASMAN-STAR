import { ChevronLeft, Info, Search } from 'lucide-react';
import Image from 'next/image';
import { getProduct } from '@/lib/shopify';
import Link from 'next/link';
import AddToCartBar from '@/components/AddToCartBar';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return notFound();
    }

    const price = product.priceRange?.maxVariantPrice?.amount
        ? `$${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}`
        : '';

    const variants = product.variants?.edges?.map((e: any) => e.node) || [];
    const location = product.catchRegion?.value || 'Tasman Waters';

    return (
        <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans mb-32">

            {/* Basic Web Header */}
            <header className="sticky top-0 w-full bg-white border-b border-slate-200 z-40">
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
                    <div className="w-full aspect-[4/3] md:aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-sm border border-slate-200 sticky top-24 relative">
                        {product.featuredImage?.url ? (
                            <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">No Image</div>
                        )}
                    </div>
                </div>

                {/* Right Column: Product Details & Options */}
                <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-8 pb-32 lg:pb-0">

                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-black mb-2 leading-tight">
                        {product.title}
                    </h1>
                    <p className="font-sans font-bold text-2xl md:text-3xl text-black mb-4">
                        {price}
                    </p>

                    <div className="text-base text-slate-600 mb-8 leading-relaxed max-w-xl">
                        {product.description ? (
                            <p>{product.description}</p>
                        ) : (
                            <p>Flaky, tender, and incredibly fresh. Sourced directly from {location}, this premium catch is perfect for grilling, pan-searing, or serving raw.</p>
                        )}
                    </div>

                    <hr className="border-slate-200 mb-8" />

                    {/* Disclaimer */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl mb-8 max-w-lg text-sm">
                        <Info size={18} className="shrink-0 mt-0.5" />
                        <p>Weight is estimated before cleaning. Final price may adjust slightly based on the exact cut.</p>
                    </div>

                    <AddToCartBar productTitle={product.title} variants={variants} />

                </div>
            </main>

        </div>
    );
}

