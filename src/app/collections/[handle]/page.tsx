import Image from 'next/image';
import Link from 'next/link';
import { getCollection, getCollections } from '@/lib/shopify';
import { ChevronLeft, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    return notFound();
  }

  const products = collection.products?.edges?.map((e: any) => e.node) || [];

  return (
    <div className="flex flex-col w-full bg-theme-primary min-h-screen transition-colors duration-300">

      {/* Collection Header */}
      <section className="container mx-auto px-4 md:px-6 pt-8 pb-4">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-muted hover:text-[#FF8543] transition-colors text-sm mb-6">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {collection.image?.url && (
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden relative shrink-0 border border-theme-subtle shadow-lg">
              <Image src={collection.image.url} alt={collection.title} fill className="object-cover" sizes="112px" />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-theme-primary mb-2">{collection.title}</h1>
            {collection.description && (
              <p className="text-theme-muted text-sm max-w-2xl">{collection.description}</p>
            )}
            <p className="text-theme-muted text-sm mt-2">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const price = product.priceRange?.minVariantPrice?.amount
                ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
                : '';
              const comparePrice = product.variants?.edges?.[0]?.node?.compareAtPrice?.amount;
              const hasDiscount = comparePrice && parseFloat(comparePrice) > 0;
              const image = product.featuredImage?.url;

              return (
                <Link key={product.handle} href={`/product/${product.handle}`} className="bg-theme-card rounded-2xl overflow-hidden shadow-lg border border-theme-subtle flex flex-col group relative hover:border-[#E2743A]/50 transition-colors duration-300">
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
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-theme-muted text-lg">No products in this collection yet.</p>
            <Link href="/" className="text-[#FF8543] hover:underline mt-4 inline-block">Browse all products</Link>
          </div>
        )}
      </section>
    </div>
  );
}
