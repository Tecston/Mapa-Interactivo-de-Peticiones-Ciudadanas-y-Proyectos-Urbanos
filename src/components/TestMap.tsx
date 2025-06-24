// src/components/TestMap.tsx
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRlcCIsImEiOiJjbTJudjZwbHIwYW00MmtvaTRhdzYyMDgyIn0.8aLktwoo3snu8FRYYCcY2Q';

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializa el mapa
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-110.9580, 29.0957], // Hermosillo
      zoom: 12,
    });

    return () => {
      map.remove();
    };
  }, []);

  // Ocupa toda la ventana para descartar problemas de tamaño
  return (
    <div
      ref={mapContainer}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: '4px solid hotpink', // borde visible para depuración
      }}
    />
  );
}
