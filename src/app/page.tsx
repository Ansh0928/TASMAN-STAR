import Image from 'next/image';
import Link from 'next/link';
import { getShopifyProducts, getCollections } from '@/lib/shopify';
import { MapPin, ChevronRight, Clock, Truck, ShieldCheck, Anchor } from 'lucide-react';
import RegionalMapLazy from '@/components/map/RegionalMapLazy';

// Map collection handles to display info
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

export default async function Home() {
  const [products, collections] = await Promise.all([
    getShopifyProducts(),
    getCollections()
  ]);

  const day = getDayOfWeek();

  // Today's specials: rotate daily based on the day
  const dayIndex = new Date().getDay();
  const shuffled = [...products].sort((a: any, b: any) => {
    const aHash = a.handle.charCodeAt(0) + dayIndex;
    const bHash = b.handle.charCodeAt(0) + dayIndex;
    return (aHash % 7) - (bHash % 7);
  });
  const todaysSpecials = shuffled.slice(0, 4);

  // Best buys: products with compareAtPrice (on sale) or lowest price items
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
    <div className="flex flex-col w-full bg-theme-primary transition-colors duration-300">

      {/* Hero / Today's Special Banner */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="w-full bg-gradient-to-br from-[var(--promo-from)] to-[var(--promo-to)] rounded-3xl p-6 md:p-10 border border-theme-accent flex flex-col md:flex-row items-start md:items-center justify-between shadow-2xl relative overflow-hidden group transition-colors duration-300">
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
              <Anchor size={300} className="text-[#FF8543]" />
            </div>
            <div className="relative z-10 flex-col flex gap-2 mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[#FF7F50] font-bold tracking-widest uppercase text-xs">{day}&apos;s Specials</span>
                <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-primary">
                Today&apos;s Fresh Catch
              </h1>
              <p className="text-theme-muted text-sm max-w-md mt-2">
                Hand-picked selections of premium seafood, straight off the boats and onto your plate.
              </p>
            </div>
            <div className="relative z-10 flex gap-3">
              {todaysSpecials.slice(0, 3).map((p: any) => (
                <Link key={p.handle} href={`/product/${p.handle}`} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/10 hover:border-[#FF8543] transition-all shadow-lg relative shrink-0">
                  {p.featuredImage?.url && (
                    <Image src={p.featuredImage.url} alt={p.title} fill className="object-cover" sizes="96px" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <div className="bg-[#fff3ec] dark:bg-[#FF8543]/10 text-[#FF8543] px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm border border-[#FF8543]/20">
            <Truck size={16} /> Free delivery over $150
          </div>
          <div className="bg-[#ecfdf5] dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm border border-emerald-500/20">
            <ShieldCheck size={16} /> Quality guaranteed
          </div>
          <div className="bg-[#eff6ff] dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm border border-blue-500/20">
            <Clock size={16} /> Wed &amp; Fri delivery
          </div>
        </div>
      </div>

      {/* Categories from Shopify Collections */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-theme-primary font-serif text-2xl font-bold mb-6">Explore by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-8 gap-x-4">
          {sortedCollections.map((col: any) => {
            const meta = CATEGORY_META[col.handle];
            return (
              <Link key={col.handle} href={`/collections/${col.handle}`} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-theme-tertiary border-2 border-transparent group-hover:border-[#E2743A] transition-all p-1 shadow-lg group-hover:shadow-[#FF8543]/20">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-theme-tertiary">
                    {col.image?.url ? (
                      <Image src={col.image.url} alt={col.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">{meta?.icon || '🐟'}</div>
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-theme-secondary text-center group-hover:text-theme-primary transition-colors line-clamp-2">
                  {col.title}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Today's Specials Grid */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex border-t border-theme-subtle pt-10 items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-theme-primary mb-2">Today&apos;s Specials</h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-[#FF7F50] text-white text-xs font-bold rounded uppercase tracking-wider">Fresh Today</span>
              <span className="text-theme-muted text-sm">Refreshed daily</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {todaysSpecials.map((product: any) => (
            <ProductCard key={product.handle} product={product} badge="Today" />
          ))}
        </div>
      </section>

      {/* Best Buys / All Products */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex border-t border-theme-subtle pt-10 items-end justify-between mb-8">
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
      </section>

      {/* Interactive Sourcing Map */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="border-t border-theme-subtle pt-10">
          <RegionalMapLazy />
        </div>
      </section>

      {/* About Strip */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="border-t border-theme-subtle pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3 p-6">
              <div className="w-14 h-14 rounded-full bg-[#FF8543]/10 flex items-center justify-center">
                <Anchor size={24} className="text-[#FF8543]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-theme-primary">Fleet to Fork</h3>
              <p className="text-theme-muted text-sm">Our own fleet of trawlers delivers the freshest catch direct from Australian waters to your door.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck size={24} className="text-emerald-500" />
              </div>
              <h3 className="font-serif text-lg font-bold text-theme-primary">Quality Promise</h3>
              <p className="text-theme-muted text-sm">Every product is hand-inspected for freshness. Not happy? We&apos;ll make it right, guaranteed.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Truck size={24} className="text-blue-500" />
              </div>
              <h3 className="font-serif text-lg font-bold text-theme-primary">Cold Chain Delivery</h3>
              <p className="text-theme-muted text-sm">Temperature-controlled from catch to kitchen. Delivered fresh to the Gold Coast every Wednesday &amp; Friday.</p>
            </div>
          </div>
        </div>
      </section>
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
