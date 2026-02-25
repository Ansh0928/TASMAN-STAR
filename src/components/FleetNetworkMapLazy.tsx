'use client';

import dynamic from 'next/dynamic';

const FleetNetworkMap = dynamic(() => import('./FleetNetworkMap'), { ssr: false });

export default function FleetNetworkMapLazy() {
    return <FleetNetworkMap />;
}
