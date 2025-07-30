'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function CarMap({ carList = [] }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || !carList.length) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
      center: [78.4744, 17.3753], // fallback center
      zoom: 10,
    });

    map.scrollZoom.disable(); // Disable scroll zoom

    const bounds = new maplibregl.LngLatBounds();
    let validMarkerCount = 0;

    carList.forEach((car) => {
      const lng = parseFloat(car.longitude);
      const lat = parseFloat(car.latitude);

      const isValidCoord =
        !isNaN(lng) &&
        !isNaN(lat) &&
        Math.abs(lng) <= 180 &&
        Math.abs(lat) <= 90;

      if (isValidCoord) {
        validMarkerCount++;

        // Create image element for car icon
        const el = document.createElement('img');
        el.src = '/pointer.png'; // must exist in public folder
        el.alt = 'car icon';
        el.style.width = '34px';
        el.style.height = '34px';
        el.style.objectFit = 'contain';

        new maplibregl.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(
            new maplibregl.Popup().setText(
              `${car.maker_model || 'Car'} - ${car.location || ''}`
            )
          )
          .addTo(map);

        bounds.extend([lng, lat]);
      }
    });

    if (validMarkerCount > 0 && !bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: 20,
        duration: 1000,
      });
    }

    return () => map.remove();
  }, [carList]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[300px]" />;
}
