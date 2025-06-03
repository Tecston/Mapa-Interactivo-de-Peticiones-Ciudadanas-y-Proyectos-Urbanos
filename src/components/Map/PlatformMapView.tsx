// src/components/Map/PlatformMapView.tsx
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PlusIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRlcCIsImEiOiJjbTJudjZwbHIwYW00MmtvaTRhdzYyMDgyIn0.8aLktwoo3snu8FRYYCcY2Q';

interface MapViewProps {
  openModal: (type: 'request', coords?: { lat: number; lng: number }) => void;
}

const MapView: React.FC<MapViewProps> = ({ openModal }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const {
    requests,
    projects,
    supportRequest,
    likeProject,
    dislikeProject,
  } = useAppContext();

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-110.8835, 29.1451],
      zoom: 15,
      minZoom: 13,
      maxZoom: 18,
      maxBounds: [
        [-110.9000, 29.1300],
        [-110.8600, 29.1600]
      ]
    });

    mapRef.current = map;

    map.on('dblclick', (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      openModal('request', { lat, lng });
    });
  }, [openModal]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    console.log("📦 Total de requests:", requests);
    console.log("📦 Total de projects:", projects);

    const markers: mapboxgl.Marker[] = [];

    // Requests
    requests.forEach((req) => {
      console.log("📍 Marcador de request:", req.title, req.location);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = '#009BDA';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';

      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
      <div style="font-family:sans-serif;max-width:240px;">
        <h3 style="margin:0;font-size:16px;">${req.title}</h3>
        <p style="margin:4px 0;font-size:14px;"><strong>Categoría:</strong> ${req.category}</p>
        <p style="font-size:13px;">${req.description}</p>
        <p style="font-size:13px;"><strong>Autor:</strong> ${req.authorName}</p>
        ${req.contactPhone ? `<p style="font-size:13px;"><strong>Tel:</strong> ${req.contactPhone}</p>` : ""}
        ${req.imageUrl ? `<img src="${req.imageUrl}" alt="Evidencia" style="width:100%;margin-top:8px;border-radius:6px;" />` : ""}
        <button onclick="window.dispatchEvent(new CustomEvent('support-request',{detail:'${req.id}'}))"
          style="margin-top:8px;background:#2563eb;color:#fff;padding:6px 10px;border:none;border-radius:4px;cursor:pointer;">
          Apoyar (${req.supports})
        </button>
      </div>
    `);


      const marker = new mapboxgl.Marker(el)
        .setLngLat([req.location.lng, req.location.lat])
        .setPopup(popup)
        .addTo(map);

      markers.push(marker);
    });

    // Projects
    projects.forEach((proj) => {
      console.log("📍 Marcador de project:", proj.title, proj.location);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = '#22c55e';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';

      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
        <div style="font-family: sans-serif; max-width: 240px;">
          <h3 style="margin: 0;">${proj.title}</h3>
          <p>${proj.description}</p>
          <p><strong>Institución:</strong> ${proj.institution}</p>
          <button onclick="window.dispatchEvent(new CustomEvent('like-project', { detail: '${proj.id}' }))">👍 (${proj.likes})</button>
          <button onclick="window.dispatchEvent(new CustomEvent('dislike-project', { detail: '${proj.id}' }))">👎 (${proj.dislikes})</button>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([proj.location[1], proj.location[0]])
        .setPopup(popup)
        .addTo(map);

      markers.push(marker);
    });

    const handleSupport = (e: any) => supportRequest(e.detail);
    const handleLike = (e: any) => likeProject(e.detail);
    const handleDislike = (e: any) => dislikeProject(e.detail);

    window.addEventListener('support-request', handleSupport);
    window.addEventListener('like-project', handleLike);
    window.addEventListener('dislike-project', handleDislike);

    return () => {
      markers.forEach((marker) => marker.remove());
      window.removeEventListener('support-request', handleSupport);
      window.removeEventListener('like-project', handleLike);
      window.removeEventListener('dislike-project', handleDislike);
    };
  }, [requests, projects]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex z-50 pointer-events-none">
        <button
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-brand-blue hover:bg-brand-blue-darker cursor-pointer text-white"
          onClick={() => {
            const center = mapRef.current?.getCenter();
            if (center) {
              openModal('request', { lat: center.lat, lng: center.lng });
            }
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default MapView;
