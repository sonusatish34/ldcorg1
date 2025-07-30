'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CarMap({ carList = [] }) {
  const mapContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current || !carList.length) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [78.4744, 17.3753],
      zoom: 10,
    });

    map.scrollZoom.disable();

    const bounds = new maplibregl.LngLatBounds();
    let validMarkerCount = 0;

    carList.forEach((car) => {
      const lng = parseFloat(car.longitude);
      const lat = parseFloat(car.latitude);

      const isValidCoord =
        !isNaN(lng) && !isNaN(lat) &&
        Math.abs(lng) <= 180 &&
        Math.abs(lat) <= 90;

      if (isValidCoord) {
        validMarkerCount++;

        const latOffset = (Math.random() - 0.5) * 0.002;
        const lngOffset = (Math.random() - 0.5) * 0.002;

        new maplibregl.Marker()
          .setLngLat([lng + lngOffset, lat + latOffset])
          .setPopup(
            new maplibregl.Popup().setText(
              `${car.maker_model || 'Car'} - ${car.location || ''}`
            )
          )
          .addTo(map);

        bounds.extend([lng + lngOffset, lat + latOffset]);
      }
    });

    if (validMarkerCount > 0 && !bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: 20,
        duration: 1000,
      });
    }

    map.on('load', () => {
      setLoading(false);
    });

    return () => map.remove();
  }, [carList]);

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80 text-black font-medium text-lg">
          Please wait while the map loads...
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden" />
    </div>
  );
}
