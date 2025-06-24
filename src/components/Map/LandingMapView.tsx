// src/components/Map/LandingMapView.tsx
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Tu token de acceso de Mapbox. Asegúrate de que es correcto y no tiene espacios extra.
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRlcCIsImEiOiJjbTJudjZwbHIwYW00MmtvaTRhdzYyMDgyIn0.8aLktwoo3snu8FRYYCcY2Q';

// Definición de categorías para los puntos
const categories = [
  { name: 'Residencial', color: '#2ECC71' },
  { name: 'Comercial', color: '#3498DB' },
  { name: 'Industrial', color: '#E67E22' },
  { name: 'Infraestructura', color: '#5D6D7E' },
  { name: 'Espacios Públicos', color: '#9B59B6' }
];

// Función para generar puntos aleatorios dentro de los límites aproximados de Hermosillo
const generatePoints = (category: string, color: string) => {
  const points = [];
  // Límites geográficos aproximados para Hermosillo, Sonora
  const minLat = 28.994;
  const maxLat = 29.166;
  const minLng = -111.048;
  const maxLng = -110.860;

  for (let i = 0; i < 30; i++) {
    const lat = minLat + Math.random() * (maxLat - minLat);
    const lng = minLng + Math.random() * (maxLng - minLng);
    points.push({ lat, lng, category, color });
  }
  return points;
};

// Generar todos los puntos para todas las categorías
const allPoints = categories.flatMap(c => generatePoints(c.name, c.color));

const LandingMapView: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null); // Referencia a la instancia del mapa de Mapbox
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al DIV HTML que contendrá el mapa

  // Estado para controlar qué categorías de puntos son visibles.
  const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(c => [c.name, true]))
  );

  // Estado para saber si el mapa base de Mapbox ha terminado de cargar completamente.
  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  // Estado para forzar una re-renderización de marcadores (solución de último recurso para timing)
  const [forceMarkerRender, setForceMarkerRender] = useState(0);

  // Efecto para inicializar el mapa de Mapbox cuando el componente se monta
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // O prueba 'mapbox://styles/mapbox/streets-v12'
      center: [-110.9559, 29.0729],
      zoom: 12,
      maxBounds: [
        [-111.04815936921302, 28.994010641531702],
        [-110.8600185000724, 29.166535465688195]
      ]
    });

    map.on('load', () => {
      mapRef.current = map;
      setMapIsLoaded(true);
      console.log('Mapbox map loaded successfully in LandingMapView!');
      // Después de cargar el mapa, intenta cargar los marcadores
      // y luego un pequeño retraso por si acaso
      setTimeout(() => {
        setForceMarkerRender(prev => prev + 1); // Forzar re-ejecución del useEffect de marcadores
      }, 500); // 500ms de retraso
    });

    map.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Efecto para añadir y actualizar los marcadores en el mapa
  useEffect(() => {
    console.log("Ejecutando useEffect de marcadores. mapIsLoaded:", mapIsLoaded, "visibleCategories:", visibleCategories, "forceMarkerRender:", forceMarkerRender);

    if (!mapIsLoaded || !mapRef.current) {
      console.log('Map not loaded or ref is null, skipping marker rendering.');
      return;
    }

    const map = mapRef.current;
    document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());

    allPoints.forEach((point) => {
      if (!visibleCategories[point.category]) return;

      const el = document.createElement('div');
      el.style.backgroundColor = point.color;
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 2px rgba(0,0,0,0.5)';
      el.style.cursor = 'pointer'; // Añadir cursor para indicar interactividad

      new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <strong>${point.category}</strong><br/>
          Lat: ${point.lat.toFixed(4)}, Lng: ${point.lng.toFixed(4)}
        `))
        .addTo(map);
    });
  }, [visibleCategories, mapIsLoaded, forceMarkerRender]); // Agrega forceMarkerRender a las dependencias

  const toggleCategory = (cat: string) => {
    setVisibleCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Interfaz de filtro de categorías (checkboxes) */}
      <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-3 space-y-1 z-50">
        {categories.map(c => (
          <label key={c.name} className="flex items-center space-x-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={visibleCategories[c.name]}
              onChange={() => toggleCategory(c.name)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
            />
            <span className="flex items-center space-x-1">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: c.color }}
              ></span>
              <span>{c.name}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LandingMapView;