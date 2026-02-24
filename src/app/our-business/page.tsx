import Link from 'next/link';
import { Truck, Store, Box, Ship, Anchor } from 'lucide-react';

export default function OurBusinessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            <div className="w-full bg-[#0A192F] py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Our Operations</h1>
                    <p className="text-slate-300 max-w-xl mx-auto">
                        Tasman Star operates an end-to-end seafood supply chain. From the boats to the cold trucks, and straight to your business or home.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Wholesale Card */}
                    <Link href="/our-business/wholesale" className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]">
                        <div className="h-48 bg-slate-100 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img src="/assets/wholesale.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Wholesale" />
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-white">
                                <Box className="text-[#FF8543]" size={24} />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-black mb-2">Wholesale Supply</h2>
                            <p className="text-slate-500 text-sm">Bulk fresh supply for restaurants, cafes, and independent grocers across the coast.</p>
                        </div>
                    </Link>

                    {/* Fleets Card */}
                    <Link href="/our-business/fleets" className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]">
                        <div className="h-48 bg-slate-100 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img src="/tasman-star-fleet1.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Refrigerated Trucks" />
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-white">
                                <Truck className="text-[#FF8543]" size={24} />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-black mb-2">Our Delivery Fleet</h2>
                            <p className="text-slate-500 text-sm">Our modern refrigerated trucks and vans ensuring perfect cold-chain delivery.</p>
                        </div>
                    </Link>

                    {/* Retail Stores Card */}
                    <Link href="/our-business/retail-stores" className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]">
                        <div className="h-48 bg-slate-100 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img src="/assets/retail-store.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Fish Market Store" />
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-white">
                                <Store className="text-[#FF8543]" size={24} />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-black mb-2">Retail Outlets</h2>
                            <p className="text-slate-500 text-sm">Visit our physical stores in Labrador and Varsity Lakes to pick your own catch.</p>
                        </div>
                    </Link>

                    {/* Commercial Freight Card */}
                    <Link href="/our-business/commercial-freight" className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]">
                        <div className="h-48 bg-slate-100 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img src="/frieght.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Commercial Freight" />
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-white">
                                <Anchor className="text-[#FF8543]" size={24} />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-black mb-2">Commercial Freight</h2>
                            <p className="text-slate-500 text-sm">Professional and reliable commercial freight services managing marine logistics with precision.</p>
                        </div>
                    </Link>

                    {/* Own Boats Card */}
                    <Link href="/our-business/our-boats" className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:border-[#FF8543]">
                        <div className="h-48 bg-slate-100 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img src="/vessels.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Our Fishing Fleet" />
                        </div>
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center -mt-12 z-20 mb-3 shadow-md border-4 border-white">
                                <Ship className="text-[#FF8543]" size={24} />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-black mb-2">Our Fishing Fleet</h2>
                            <p className="text-slate-500 text-sm">We own and operate our own vessels, ensuring the highest standards of quality straight from the ocean to you.</p>
                        </div>
                    </Link>

                </div>
            </main>

        </div>
    );
}
