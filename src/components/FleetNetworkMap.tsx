"use client";

import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Line,
    Marker,
} from "react-simple-maps";

const geoUrl = "/au-states.json";

// Coordinates for the cities we want to include (omitting Perth and Darwin)
const cities = {
    brisbane: { name: "Brisbane", coordinates: [153.0211, -27.4705] as [number, number] },
    sydney: { name: "Sydney", coordinates: [151.2093, -33.8688] as [number, number] },
    melbourne: { name: "Melbourne", coordinates: [144.9631, -37.8136] as [number, number] },
    adelaide: { name: "Adelaide", coordinates: [138.6007, -34.9285] as [number, number] },
    hobart: { name: "Hobart", coordinates: [147.3272, -42.8821] as [number, number] },
    bundaberg: { name: "Bundaberg", coordinates: [152.3489, -24.8662] as [number, number] }, // Roughly based on the image connections going north of Brisbane
};

const lines = [
    // Primary lines
    { from: cities.brisbane.coordinates, to: cities.sydney.coordinates },
    { from: cities.sydney.coordinates, to: cities.melbourne.coordinates },
    { from: cities.melbourne.coordinates, to: cities.adelaide.coordinates },
    { from: cities.sydney.coordinates, to: cities.adelaide.coordinates },
    { from: cities.melbourne.coordinates, to: cities.hobart.coordinates },
    { from: cities.brisbane.coordinates, to: cities.bundaberg.coordinates },
];

export default function FleetNetworkMap() {
    return (
        <div className="w-full flex justify-center items-center bg-[#f8f9fa] rounded-3xl p-8 shadow-inner overflow-hidden relative">
            <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-sm z-10">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Our Delivery Network</h3>
                <div className="flex items-center gap-2 mb-1 text-sm text-slate-600">
                    <span className="w-6 h-[2px] bg-red-600 block"></span> Direct Freight Line
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-6 h-[2px] bg-red-600 border border-dashed border-white block"></span> Temperature Controlled
                </div>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 900,
                    center: [142, -31], // Centered more on the East Coast/South
                }}
                className="w-full h-auto max-w-[800px]"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#d2162a" // Deep Red colour for the map
                                stroke="#ffffff"
                                strokeWidth={1}
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#b01222", outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {lines.map((line, i) => (
                    <React.Fragment key={i}>
                        {/* Glow effect duplicate */}
                        <Line
                            from={line.from}
                            to={line.to}
                            stroke="#E2743A"
                            strokeWidth={5}
                            strokeLinecap="round"
                            className="opacity-50 blur-[2px]"
                        />
                        <Line
                            from={line.from}
                            to={line.to}
                            stroke="#ffffff"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeDasharray="6 4"
                            className="animate-pulse"
                        />
                    </React.Fragment>
                ))}

                {Object.values(cities).map((city) => (
                    <Marker key={city.name} coordinates={city.coordinates}>
                        {/* Marker dot */}
                        <circle r={5} fill="#ffffff" stroke="#d2162a" strokeWidth={2} className="drop-shadow-md" />
                        {/* City name text */}
                        <text
                            textAnchor="middle"
                            y={-12}
                            style={{ fontFamily: "inherit", fill: "#ffffff", fontSize: "12px", fontWeight: "bold", filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))" }}
                        >
                            {city.name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
}
