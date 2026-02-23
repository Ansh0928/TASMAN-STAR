"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ShoppingCart } from "lucide-react";
import type { ParsedProduct } from "../../lib/data";

// Helper to convert lat/long to 3D sphere coordinates
function getPosFromLatLng(lat: number, lng: number, radius = 5): [number, number, number] {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
}

const CATCH_ZONES = [
    { id: "Gold Coast Reefs", name: "Gold Coast Reefs", coordinates: getPosFromLatLng(-28.0, 153.4) },
    { id: "Moreton Bay", name: "Moreton Bay", coordinates: getPosFromLatLng(-27.2, 153.2) },
    { id: "Tasman Sea", name: "Tasman Sea", coordinates: getPosFromLatLng(-34.0, 151.0) },
    { id: "EVERYDAY PICK UP AT SHOP LOCATION", name: "Local Harbour", coordinates: getPosFromLatLng(-29.0, 152.0) }
];

function EarthNode() {
    const earthRef = useRef<THREE.Mesh>(null);

    // Slight auto-rotation for the globe
    useFrame(({ clock }) => {
        if (earthRef.current) {
            earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={earthRef}>
            <Sphere args={[5, 64, 64]}>
                <meshStandardMaterial
                    color="#0A192F"
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
            <Sphere args={[4.95, 64, 64]}>
                <meshBasicMaterial color="#020C1B" />
            </Sphere>
        </group>
    );
}

function CatchMarker({ position, name, onClick }: { position: [number, number, number], name: string, onClick: () => void }) {
    const markerRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (markerRef.current) {
            const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
            markerRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={position}>
            <Sphere
                args={[0.15, 16, 16]}
                ref={markerRef}
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshBasicMaterial color={hovered ? "#E2743A" : "#FF8543"} />
            </Sphere>

            {/* Glowing Halo */}
            <Sphere args={[0.3, 16, 16]}>
                <meshBasicMaterial color="#FF8543" transparent opacity={0.3} />
            </Sphere>

            {/* UI Label */}
            <Html distanceFactor={15} center>
                <div
                    className="flex flex-col items-center cursor-pointer pointer-events-none select-none transition-transform"
                    style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
                >
                    <div className="bg-[#0A192F]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#FF8543]/50 text-white font-sans text-xs font-bold shadow-[0_0_15px_rgba(255,133,67,0.4)] whitespace-nowrap mt-4">
                        {name}
                    </div>
                    <div className="w-0.5 h-4 bg-[#FF8543]/50 mt-1" />
                </div>
            </Html>
        </group>
    );
}

export default function CatchMap3D({ products }: { products: ParsedProduct[] }) {
    const [activeZone, setActiveZone] = useState<string | null>(null);

    const activeProducts = products.filter((p) => {
        if (activeZone === 'EVERYDAY PICK UP AT SHOP LOCATION') return p.location.includes('EVERYDAY');
        return p.location === activeZone;
    });

    return (
        <div className="relative w-full h-[700px] bg-[#020C1B] rounded-3xl overflow-hidden border border-[#FF8543]/20 shadow-[-10px_-10px_60px_rgba(255,133,67,0.05),_10px_10px_60px_rgba(255,133,67,0.05)]">

            {/* Top Left Title Overlay */}
            <div className="absolute top-8 left-10 z-10 select-none pointer-events-none">
                <h2 className="text-4xl font-serif font-bold text-white tracking-wide mix-blend-plus-lighter drop-shadow-lg">
                    Live <span className="text-[#FF8543]">Navigation</span>
                </h2>
                <p className="text-slate-400 mt-2 text-sm max-w-[280px] leading-relaxed backdrop-blur-sm bg-[#020C1B]/30 p-2 rounded-lg mix-blend-screen inline-block">
                    Drag the globe to explore. Tap a glowing active coordinate to trace today's catch right to the source.
                </p>
            </div>

            {/* The 3D Scene */}
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#FF8543" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group rotation={[0.4, -2.2, 0]}> {/* Angle adjusting camera to Australia by default */}
                    <EarthNode />
                    {CATCH_ZONES.map((zone) => (
                        <CatchMarker
                            key={zone.id}
                            position={zone.coordinates}
                            name={zone.name}
                            onClick={() => setActiveZone(zone.id)}
                        />
                    ))}
                </group>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* The Slide-Out Data Panel (HTML Overlay) */}
            <AnimatePresence>
                {activeZone && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="absolute top-0 right-0 h-full w-full md:w-[420px] bg-[#0A192F]/90 backdrop-blur-xl border-l border-[#FF8543]/20 p-6 md:p-8 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] overflow-y-auto z-20"
                    >
                        {/* Drawer Header */}
                        <div className="flex justify-between items-start mb-8 border-b border-[#FF8543]/20 pb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FF8543] animate-pulse shadow-[0_0_10px_#FF8543]"></span>
                                    <p className="text-[#FF8543] text-xs font-bold uppercase tracking-widest font-sans">
                                        Active Zone
                                    </p>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                                    {CATCH_ZONES.find(z => z.id === activeZone)?.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveZone(null)}
                                className="p-2.5 bg-white/5 hover:bg-white/15 rounded-full transition-colors text-white backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        {activeProducts.length === 0 ? (
                            <div className="text-slate-400 text-sm mt-10 text-center bg-white/5 p-6 rounded-2xl border border-white/5">
                                No new catches reported in this sector today. Check back tomorrow morning.
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <p className="text-slate-400 text-sm mb-4">Displaying {activeProducts.length} catches fresh off the boats.</p>
                                {activeProducts.map((product) => (
                                    <div key={product.handle} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-[#FF8543]/50 transition-colors flex flex-col shadow-lg">
                                        <div className="h-40 bg-slate-800 relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute top-3 left-3 bg-[#FF8543] text-white px-2.5 py-1 rounded text-xs font-bold uppercase shadow-xl font-sans">
                                                JUST LANDED
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                                            <div>
                                                <h4 className="text-white font-serif text-lg leading-snug mb-1">{product.title}</h4>
                                                <p className="text-[#FF8543] font-bold font-sans text-xl">{product.price} <span className="text-slate-500 font-normal text-sm">/kg</span></p>
                                            </div>
                                            <button className="w-full bg-[#fff3ec] hover:bg-[#FF8543] hover:text-white text-[#FF8543] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm">
                                                <ShoppingCart size={16} /> View Details
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
