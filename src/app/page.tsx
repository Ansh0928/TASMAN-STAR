import Image from 'next/image';
import { getShopifyProducts } from '@/lib/shopify';
import { Search, MapPin, ChevronRight, Tag } from 'lucide-react';
import RegionalMapLazy from '@/components/map/RegionalMapLazy';

const CATEGORIES = [
  { name: 'Fresh Catch', icon: '🐟', img: '/assets/fresh.webp' },
  { name: 'Shellfish', icon: '🦞', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Fillets', icon: '🔪', img: '/assets/fillets.png' },
  { name: 'Bundles', icon: '📦', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Frozen', icon: '❄️', img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Sauces', icon: '🍋', img: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Platters', icon: '🍣', img: '/assets/sushi.jpeg' },
  { name: 'Best Buys', icon: '⭐️', img: '/assets/best.webp' },
];

export default async function Home() {
  const products = await getShopifyProducts();

  return (
    <div className="flex flex-col w-full bg-theme-primary transition-colors duration-300">

      {/* Vouchers Panel / Promos */}
      <div className="w-full bg-gradient-to-r from-[var(--promo-from)] to-[var(--promo-to)] rounded-3xl p-6 md:p-10 border border-theme-accent flex flex-col md:flex-row items-start md:items-center justify-between shadow-2xl relative overflow-hidden group transition-colors duration-300">
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
          <Tag size={300} className="text-[#FF8543]" />
        </div>
        <div className="relative z-10 flex-col flex gap-2 mb-4 md:mb-0">
          <h2 className="text-[#FF7F50] font-bold tracking-widest uppercase text-xs">Special Offer</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-serif font-bold text-theme-primary">Today&apos;s Special</span>
          </div>
          <p className="text-theme-muted text-sm max-w-md mt-3">
            Get the freshest catch straight from the boats. Discover our hand-picked selections of premium seafood available today.
          </p>
        </div>
        <div className="relative z-10">
          <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105">
            Shop Specials
          </button>
        </div>
      </div>

      {/* Shipping / Delivery Status */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="bg-[#fff3ec] text-[#FF8543] px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm border border-[#FF8543]/20 max-w-max mx-auto md:mx-0">
          <span className="animate-pulse">🚚</span> Free refrigerated delivery on orders over $150
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h3 className="text-theme-primary font-serif text-2xl font-bold mb-6">Explore by Category</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-theme-tertiary border-2 border-transparent group-hover:border-[#E2743A] transition-all p-1 shadow-lg group-hover:shadow-[#FF8543]/20">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
                </div>
              </div>
              <span className="text-sm font-medium text-theme-secondary text-center group-hover:text-theme-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Offers for you / Product Grid */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex border-t border-theme-subtle pt-12 items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-theme-primary mb-2">Catch of the Day</h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-[#FF7F50] text-white text-xs font-bold rounded uppercase tracking-wider">Limited Availability</span>
              <span className="text-theme-muted text-sm">Fresh from the boats</span>
            </div>
          </div>
          <a href="#" className="hidden md:flex items-center text-[#FF8543] hover:text-theme-primary transition-colors text-sm font-medium gap-1">
            View All Products <ChevronRight size={16} />
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {products.slice(0, 8).map((product: any) => {
            const price = product.priceRange?.maxVariantPrice?.amount
              ? `$${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}`
              : 'Price Unavailable';
            const location = product.catchRegion?.value || 'Tasman Waters';
            const image = product.featuredImage?.url;

            return (
              <a key={product.handle} href={`/product/${product.handle}`} className="bg-theme-card rounded-2xl overflow-hidden shadow-lg border border-theme-subtle flex flex-col group relative hover:border-[#E2743A]/50 transition-colors duration-300">
                <div className="absolute top-4 left-4 z-10 bg-[#FF7F50] text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase">
                  Fresh
                </div>

                <div className="aspect-[4/3] w-full bg-theme-tertiary overflow-hidden relative">
                  {image ? (
                    <Image src={image} alt={product.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                  ) : (
                    <div className="w-full h-full bg-theme-tertiary flex items-center justify-center text-theme-muted">No Image</div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-theme-primary font-serif text-lg leading-snug mb-2 group-hover:text-[#E2743A] transition-colors line-clamp-2">{product.title}</h3>
                    <p className="text-theme-muted text-xs uppercase tracking-wider mb-4 flex items-center gap-1">
                      <MapPin size={12} className="text-[#FF8543]" /> {location}
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#FF7F50] font-bold text-xl">{price} <span className="text-sm font-normal text-theme-muted">/item</span></span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-[#FF8543] hover:bg-[#1A908A] text-white flex items-center justify-center font-bold text-xl transition-all shadow-md group-hover:scale-110">
                      +
                    </button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="w-full relative z-10 p-2 md:p-6 bg-theme-primary transition-colors duration-300">
        <RegionalMapLazy />
      </div>
    </div >
  );
}
