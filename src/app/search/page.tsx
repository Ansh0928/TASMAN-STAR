import Image from 'next/image';
import Link from 'next/link';
import { searchProducts } from '@/lib/shopify';
import { ChevronLeft, MapPin, SearchX } from 'lucide-react';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="flex flex-col w-full bg-theme-primary min-h-screen transition-colors duration-300">
      <section className="container mx-auto px-4 md:px-6 pt-8 pb-4">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-muted hover:text-[#FF8543] transition-colors text-sm mb-6">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-theme-primary mb-2">
          {query ? `Results for "${query}"` : 'Search'}
        </h1>
        {query && (
          <p className="text-theme-muted text-sm">{results.length} product{results.length !== 1 ? 's' : ''} found</p>
        )}
      </section>

      <section className="container mx-auto px-4 md:px-6 py-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product: any) => {
              const price = product.priceRange?.minVariantPrice?.amount
                ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
                : '';
              const image = product.featuredImage?.url;

              return (
                <Link key={product.handle} href={`/product/${product.handle}`} className="bg-theme-card rounded-2xl overflow-hidden shadow-lg border border-theme-subtle flex flex-col group relative hover:border-[#E2743A]/50 transition-colors duration-300">
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
                      <span className="text-[#FF7F50] font-bold text-xl">{price}</span>
                      <div className="w-10 h-10 rounded-full bg-[#FF8543] hover:bg-[#1A908A] text-white flex items-center justify-center font-bold text-xl transition-all shadow-md group-hover:scale-110">
                        +
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <SearchX size={48} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-muted text-lg mb-2">No products found for &quot;{query}&quot;</p>
            <p className="text-theme-muted text-sm">Try searching for prawns, salmon, oysters, or platters</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-theme-muted text-lg">Enter a search term to find products</p>
          </div>
        )}
      </section>
    </div>
  );
}
