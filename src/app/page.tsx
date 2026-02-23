import { getMockProducts } from '@/lib/data';
import { Search, MapPin, ChevronRight, Tag } from 'lucide-react';
import RegionalMap from '@/components/map/RegionalMap';

// Categories mock
const CATEGORIES = [
  { name: 'Fresh Catch', icon: '🐟', img: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Shellfish', icon: '🦞', img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Fillets', icon: '🔪', img: 'https://images.unsplash.com/photo-1599084990807-33433ed60b29?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Bundles', icon: '📦', img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Frozen', icon: '❄️', img: 'https://images.unsplash.com/photo-1557008064-5509e51c0993?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Marinades', icon: '🍋', img: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Smoked', icon: '💨', img: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=200&h=200' },
  { name: 'Best Buys', icon: '⭐️', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=200&h=200' },
];

export default async function Home() {
  const products = await getMockProducts();

  return (
    <div className="flex flex-col w-full bg-[#020C1B]">

      {/* 3D Regional Sourcing Map Hero */}
      <div className="w-full relative z-10 p-2 md:p-6 pb-0">
        <RegionalMap />
      </div>

      {/* Vouchers Panel / Promos */}
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="w-full bg-gradient-to-r from-[#1A365D] to-[#0A192F] rounded-3xl p-6 md:p-10 border border-[#FF8543]/30 flex flex-col md:flex-row items-start md:items-center justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
            <Tag size={300} className="text-[#FF8543]" />
          </div>
          <div className="relative z-10 flex-col flex gap-2 mb-4 md:mb-0">
            <h2 className="text-white font-serif text-2xl md:text-3xl font-bold tracking-wide">Today's Market Deals</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-slate-300 font-medium">UP TO</span>
              <span className="text-5xl md:text-6xl font-serif font-bold text-[#FF7F50]">30%</span>
              <span className="text-xl text-[#FF7F50] font-bold">OFF</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-2">
              Get the freshest catch straight from the boats. Claim your VIP vouchers for exclusive discounts on premium shellfish and fillets.
            </p>
          </div>
          <div className="relative z-10">
            <button className="bg-white hover:bg-slate-100 text-[#0A192F] text-sm font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105">
              Claim VIP Vouchers
            </button>
          </div>
        </div>
      </div>

      {/* Shipping / Delivery Status */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        <div className="bg-[#fff3ec] text-[#FF8543] px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm border border-[#FF8543]/20 max-w-max mx-auto md:mx-0">
          <span className="animate-pulse">🚚</span> Free refrigerated delivery on orders over $150
        </div>
      </div>

      {/* Categories Grid (Desktop Responsive) */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h3 className="text-white font-serif text-2xl font-bold mb-6">Explore by Category</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-800 border-2 border-transparent group-hover:border-[#E2743A] transition-all p-1 shadow-lg group-hover:shadow-[#FF8543]/20">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-300 text-center group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Offers for you section / Product Grid */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex border-t border-slate-800/50 pt-12 items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">Catch of the Day</h2>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-[#FF7F50] text-[#020C1B] text-xs font-bold rounded uppercase tracking-wider">Limited Availability</span>
              <span className="text-slate-400 text-sm">Fresh from the boats</span>
            </div>
          </div>
          <a href="#" className="hidden md:flex items-center text-[#FF8543] hover:text-white transition-colors text-sm font-medium gap-1">
            View All Products <ChevronRight size={16} />
          </a>
        </div>

        {/* Product Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {products.slice(0, 8).map((product, i) => (
            <a key={product.handle} href={`/product/${product.handle}`} className="bg-[#112240] rounded-2xl overflow-hidden shadow-lg border border-slate-700/50 flex flex-col group relative hover:border-[#E2743A]/50 transition-colors">
              <div className="absolute top-4 left-4 z-10 bg-[#FF7F50] text-[#0A192F] text-xs font-bold px-3 py-1 rounded shadow-lg uppercase">
                Fresh
              </div>

              <div className="aspect-[4/3] w-full bg-slate-800 overflow-hidden relative">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-white font-serif text-lg leading-snug mb-2 group-hover:text-[#E2743A] transition-colors line-clamp-2">{product.title}</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-4 flex items-center gap-1">
                    <MapPin size={12} className="text-[#FF8543]" /> {product.location}
                  </p>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 line-through text-xs font-medium">$32.00 /kg</span>
                    <span className="text-[#FF7F50] font-bold text-xl">{product.price} <span className="text-sm font-normal text-slate-400">/kg</span></span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#FF8543] hover:bg-[#1A908A] text-[#020C1B] flex items-center justify-center font-bold text-xl transition-all shadow-md group-hover:scale-110">
                    +
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
