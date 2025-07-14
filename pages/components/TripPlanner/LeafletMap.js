'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ lat, lon, area }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import('leaflet');

      // Fix marker icon issue
      const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      });

      if (mapRef.current && !mapRef.current._leaflet_id) {
        const map = L.map(mapRef.current).setView([lat, lon], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([lat, lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(area)
          .openPopup();
      }
    };

    if (typeof window !== 'undefined') {
      loadLeaflet();
    }
  }, [lat, lon, area]);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: '100%', borderRadius: '12px' }}
      className="z-0 lg:h-[500px] h-[400px]"
    />
  );
}
