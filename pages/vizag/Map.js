// components/Map.js
'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CarMap({ carList = [] }) {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
            center: [78.4744, 17.3753], // default center
            zoom: 12,
        });

        map.scrollZoom.disable(); // Disable scroll zoom

        carList.forEach((car) => {
            if (car.latitude && car.longitude) {
                new maplibregl.Marker()
                    .setLngLat([parseFloat(car.longitude), parseFloat(car.latitude)])
                    .setPopup(
                        new maplibregl.Popup().setText(
                            `${car.maker_model || 'Car'} - ${car.location || ''}`
                        )
                    )
                    .addTo(map);
            }
        });

        return () => map.remove();
    }, [carList]);

    return <div ref={mapContainerRef} className="w-full h-full" />;
}
