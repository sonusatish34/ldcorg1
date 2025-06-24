'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import('leaflet');

      if (mapRef.current && !mapRef.current._leaflet_id) {
        const map = L.map(mapRef.current).setView([17.4061875, 78.4690625], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([17.4061875, 78.4690625])
          .addTo(map)
          .bindPopup('Birla Mandir')
          .openPopup();
      }
    };

    if (typeof window !== 'undefined') {
      loadLeaflet();
    }
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapRef}
        style={{ width: '100%', height: '400px', borderRadius: '12px' }}
      />
      <p className="text-red-300 pu-10">jiji</p>
    </>
  );
}
