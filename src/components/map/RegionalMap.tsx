"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const geoUrl = "/australia.geojson";

// Map region IDs from the JSON to standard state abbreviations
const regionMapping: Record<string, string> = {
    "Queensland": "QLD",
    "New South Wales": "NSW",
    "Victoria": "VIC",
    "Tasmania": "TAS",
    "South Australia": "SA",
    "Western Australia": "WA",
    "Northern Territory": "NT",
    "Australian Capital Territory": "ACT",
};

// Mock data for regional species
const REGIONAL_DATA: Record<string, {
    name: string;
    description: string;
    species: Array<{ name: string, desc: string, emoji: string }>;
}> = {
    "QLD": {
        name: "Queensland",
        description: "The Great Barrier Reef and tropical currents provide sweet, unique seafood.",
        species: [
            { name: "Barramundi", desc: "Iconic Australian sportfish, mild flavor.", emoji: "🐟" },
            { name: "Mud Crab", desc: "Sweet, moist meat packed with flavor.", emoji: "🦀" },
            { name: "Tiger Prawn", desc: "Crisp texture, sweet taste, bold stripes.", emoji: "🦐" }
        ]
    },
    "NSW": {
        name: "New South Wales",
        description: "Pristine estuaries and deep off-shore canyons.",
        species: [
            { name: "Sydney Rock Oyster", desc: "Rich, creamy, with a lasting mineral tang.", emoji: "🦪" },
            { name: "Yellowtail Kingfish", desc: "Firm, white flesh ideal for sashimi.", emoji: "🐟" },
            { name: "Snapper", desc: "Delicate, sweet flavor with medium texture.", emoji: "🐠" }
        ]
    },
    "SA": {
        name: "South Australia",
        description: "Cold, clean waters of the Great Australian Bight.",
        species: [
            { name: "Southern Rock Lobster", desc: "Premium, firm, sweet white meat.", emoji: "🦞" },
            { name: "King George Whiting", desc: "Delicate, sweet flavor. A national treasure.", emoji: "🐟" },
            { name: "Blue Swimmer Crab", desc: "Sweet, nutty flavor with delicate meat.", emoji: "🦀" }
        ]
    },
    "TAS": {
        name: "Tasmania",
        description: "The coldest, purest waters in the world.",
        species: [
            { name: "Atlantic Salmon", desc: "Rich in Omega-3, buttery texture.", emoji: "🍣" },
            { name: "Pacific Oysters", desc: "Plump, salty, and incredibly fresh.", emoji: "🦪" },
            { name: "Ocean Trout", desc: "Vibrant color and a luxurious melt-in-the-mouth feel.", emoji: "🐟" }
        ]
    },
    "WA": {
        name: "Western Australia",
        description: "Wild, rugged coastlines spanning thousands of kilometers.",
        species: [
            { name: "Western Rock Lobster", desc: "Highly sought after for its rich, sweet flavor.", emoji: "🦞" },
            { name: "Pearl Meat", desc: "A rare delicacy, sweet and firm like abalone.", emoji: "🐚" },
            { name: "Dhufish", desc: "The ultimate WA table fish, superb thick white fillets.", emoji: "🐟" }
        ]
    },
    "VIC": {
        name: "Victoria",
        description: "Stormy southern seas producing resilient, deep-flavored seafood.",
        species: [
            { name: "Abalone", desc: "Highly prized, sweet buttery flavor and firm texture.", emoji: "🐚" },
            { name: "Scallops", desc: "Plump, sweet, and perfect for a quick sear.", emoji: "🦪" },
            { name: "Gummy Shark", desc: "Boneless, sweet white fillets. Classic 'flake'.", emoji: "🦈" }
        ]
    },
    "NT": {
        name: "Northern Territory",
        description: "Vast tidal rivers and warm Arafura Sea waters.",
        species: [
            { name: "Spanish Mackerel", desc: "Thick, meaty steaks perfect for the BBQ.", emoji: "🐟" },
            { name: "Goldband Snapper", desc: "Exceptional eating with a firm, flaky texture.", emoji: "🐠" },
            { name: "Mud Crab", desc: "Massive claws with incredibly sweet, rich meat.", emoji: "🦀" }
        ]
    }
};

export default function RegionalMap() {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);

    const regionData = activeRegion ? REGIONAL_DATA[activeRegion] : null;

    return (
        <div className="relative w-full h-[800px] bg-[#0A192F] rounded-3xl overflow-hidden border border-[#FF8543]/20 shadow-2xl flex items-center justify-center perspective-[1000px]">

            {/* Hero Text Overlay */}
            <div className="absolute top-10 left-0 w-full z-20 pointer-events-none text-center flex flex-col items-center">
                <p className="text-[#FF8543] text-xs font-bold tracking-[0.3em] uppercase mb-2">Sourcing Map</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                    Explore Our Waters
                </h2>
                <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed backdrop-blur-sm bg-[#0A192F]/50 p-3 rounded-xl border border-white/5">
                    Discover the premium seafood species we source from the pristine waters around Australia.
                    <span className="text-white font-semibold"> Click on a region to see what we catch.</span>
                </p>
            </div>

            {/* Isometric Map Container */}
            <div className="w-[120%] h-[120%] absolute inset-0 flex items-center justify-center -mt-20 pointer-events-none">

                {/* CSS 3D Transformation applied here to create the Isometric perspective */}
                <div
                    className="w-full h-full"
                    style={{
                        transform: "rotateX(55deg) rotateZ(-30deg) translateZ(0)",
                        transformStyle: "preserve-3d",
                        transition: "all 0.5s ease-in-out",
                    }}
                >
                    {/* Shadow Layer (Faux 3D Depth) */}
                    <div className="absolute inset-0 translate-y-8 translate-x-4 mix-blend-multiply opacity-50 blur-md pointer-events-none">
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [135, -28] }} className="w-full h-full">
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography key={geo.rsmKey + "-shadow"} geography={geo} fill="#000000" stroke="none" />
                                    ))
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>

                    {/* Extrusion / Base Layer (Faux 3D Depth) */}
                    <div className="absolute inset-0 translate-y-3 translate-x-1.5 pointer-events-none">
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [135, -28] }} className="w-full h-full">
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography key={geo.rsmKey + "-base"} geography={geo} fill="#020C1B" stroke="#020C1B" strokeWidth={1} />
                                    ))
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>

                    {/* Interactive Top Layer */}
                    <div className="absolute inset-0 pointer-events-auto">
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800, center: [135, -28] }} className="w-full h-full">
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const regionName = geo.properties.STATE_NAME;
                                        const regionCode = regionMapping[regionName] || null;
                                        const isActive = activeRegion === regionCode;
                                        // Determine if this region is supported in our mock data
                                        const isSupported = !!regionCode && !!REGIONAL_DATA[regionCode];

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => {
                                                    if (isSupported) setActiveRegion(isActive ? null : regionCode);
                                                }}
                                                style={{
                                                    default: {
                                                        fill: isActive ? "#FF8543" : "#d1d5db", // Default grey, active orange
                                                        stroke: "#0A192F",
                                                        strokeWidth: 0.5,
                                                        outline: "none",
                                                        // Elevate active region slightly
                                                        transform: isActive ? "translateZ(20px)" : "translateZ(0px)",
                                                        transition: "all 0.3s ease"
                                                    },
                                                    hover: {
                                                        fill: isActive ? "#FF8543" : "#e5e7eb", // Lighter grey on hover
                                                        stroke: "#0A192F",
                                                        strokeWidth: 0.5,
                                                        outline: "none",
                                                        cursor: isSupported ? "pointer" : "default",
                                                        transform: isActive ? "translateZ(20px)" : "translateZ(10px)",
                                                        transition: "all 0.3s ease"
                                                    },
                                                    pressed: {
                                                        outline: "none",
                                                        transform: "translateZ(5px)"
                                                    },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>

                </div>
            </div>

            {/* Floating Glassmorphism Side Panel */}
            <AnimatePresence>
                {activeRegion && regionData && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute top-24 right-8 w-80 lg:w-96 bg-[#020C1B]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-3xl font-serif font-bold text-[#FF8543] mb-1 drop-shadow-md">
                                    {regionData.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveRegion(null)}
                                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white mt-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-sm text-slate-300 font-sans mb-6 leading-relaxed">
                            {regionData.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            {regionData.species.map((sp, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-2xl shadow-inner border border-white/5 shrink-0 group-hover:scale-110 group-hover:border-[#FF8543]/50 transition-all">
                                        {sp.emoji}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-white font-bold text-sm tracking-wide mb-0.5 group-hover:text-[#FF8543] transition-colors">{sp.name}</h4>
                                        <p className="text-slate-400 text-xs leading-snug pr-2">{sp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href={`/our-business`}
                            className="block w-full text-center bg-gradient-to-r from-[#FF8543] to-[#E2743A] hover:to-[#c45e2e] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(255,133,67,0.4)] hover:shadow-[0_6px_20px_rgba(255,133,67,0.6)] transition-all uppercase tracking-wider text-sm"
                        >
                            View {regionData.name} Products
                        </a>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
