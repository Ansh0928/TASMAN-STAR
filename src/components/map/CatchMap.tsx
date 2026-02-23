"use client";

import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ShoppingCart } from "lucide-react";
import type { ParsedProduct } from "../../lib/data";

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/australia/australia-states.json";

// Mock locations matching the parser logc
const CATCH_ZONES = [
    { id: "Gold Coast Reefs", name: "Gold Coast Reefs", coordinates: [153.4, -28.0] as [number, number] },
    { id: "Moreton Bay", name: "Moreton Bay", coordinates: [153.2, -27.2] as [number, number] },
    { id: "Tasman Sea", name: "Tasman Sea", coordinates: [151.0, -34.0] as [number, number] },
    { id: "EVERYDAY PICK UP AT SHOP LOCATION", name: "Local Harbour Pickup", coordinates: [152.0, -29.0] as [number, number] }
];

export default function CatchMap({ products }: { products: ParsedProduct[] }) {
    const [activeZone, setActiveZone] = useState<string | null>(null);

    // Filter products by the clicked zone
    const activeProducts = products.filter((p) => {
        if (activeZone === 'Local Harbour Pickup') return p.location.includes('EVERYDAY');
        return p.location === activeZone;
    });

    return (
        <div className="relative w-full h-[600px] bg-[#0A192F] rounded-2xl overflow-hidden border border-[#FF8543]/30 shadow-2xl shadow-[#FF8543]/10">

            {/* Title Overlay */}
            <div className="absolute top-6 left-8 z-10 select-none pointer-events-none">
                <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
                    Interactive <span className="text-[#FF8543]">Catch Map</span>
                </h2>
                <p className="text-slate-400 mt-2 text-sm max-w-sm">
                    Select a glowing fishing sector to see exactly what was caught there today.
                    Trace your seafood directly to the source.
                </p>
            </div>

            {/* The Map */}
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1800, center: [135, -28] }}
                className="w-full h-full"
            >
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#112240"
                                    stroke="#FF8543"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#1A365D", outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {CATCH_ZONES.map((zone) => (
                        <Marker key={zone.id} coordinates={zone.coordinates}>
                            <motion.g
                                initial={{ scale: 0.8, opacity: 0.8 }}
                                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="cursor-pointer"
                                onClick={() => setActiveZone(zone.id)}
                            >
                                <circle cx={0} cy={0} r={6} fill="#FF7F50" className="opacity-50" />
                                <circle cx={0} cy={0} r={3} fill="#FF7F50" />
                            </motion.g>
                            <text
                                textAnchor="middle"
                                y={-15}
                                className="text-[10px] font-bold fill-white tracking-wider font-sans pointer-events-none"
                            >
                                {zone.name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>

            {/* The Slide-Out Side Panel */}
            <AnimatePresence>
                {activeZone && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-0 right-0 h-full w-[400px] bg-[#020C1B]/95 backdrop-blur-md border-l border-[#FF8543]/30 p-6 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-[#FF8543] text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <MapPin size={12} /> Active Zone
                                </p>
                                <h3 className="text-2xl font-serif font-bold text-white">
                                    {CATCH_ZONES.find(z => z.id === activeZone)?.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveZone(null)}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {activeProducts.length === 0 ? (
                            <div className="text-slate-400 text-sm mt-10 text-center">
                                No catches reported in this zone today.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activeProducts.map((product) => (
                                    <div key={product.handle} className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-[#E2743A]/50 transition-colors flex flex-col">
                                        <div className="h-32 bg-slate-800 relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#FF7F50]">
                                                FRESH
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow justify-between">
                                            <div>
                                                <h4 className="text-white font-medium mb-1 truncate">{product.title}</h4>
                                                <p className="text-[#FF8543] font-bold">{product.price} /kg</p>
                                            </div>
                                            <button className="mt-4 w-full bg-[#FF8543] hover:bg-[#1A908A] text-[#020C1B] font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                                                <ShoppingCart size={16} /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
