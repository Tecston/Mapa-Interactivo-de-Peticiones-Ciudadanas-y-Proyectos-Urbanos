// src/components/Map/PlatformMapView.tsx
<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PlusIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmRlcCIsImEiOiJjbTJudjZwbHIwYW00MmtvaTRhdzYyMDgyIn0.8aLktwoo3snu8FRYYCcY2Q';
=======
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppContext } from "../../context/AppContext"; // Ruta ajustada a la original
import MarkerCarousel from "./MarkerCarousel"; // Ruta ajustada a la original

import { ReportsButton } from "./controls/ReportsButton";
import { EcosystemButton } from "./controls/EcosystemButton";
import { BottomActions } from "./controls/BottomActions";

// Asegúrate de que tu token de Mapbox esté configurado
mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmRlcCIsImEiOiJjbTJudjZwbHIwYW00MmtvaTRhdzYyMDgyIn0.8aLktwoo3snu8FRYYCcY2Q";
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)

interface MapViewProps {
  openModal: (type: 'request', coords?: { lat: number; lng: number }) => void;
}

// Interfaz para la configuración de cada módulo de datos
interface ModuleConfig {
  label: string;
  layerId: string; // ID único para la capa de mapbox
  endpoint: string; // ruta relativa a VITE_BACKEND_URL
  valueProperty: string; // campo numérico en cada feature del GeoJSON
  paintStops: [number, string][]; // pares [valor, color] para interpolate
}

// Configuración de los módulos con layerId único
const modulesConfig: ModuleConfig[] = [
  {
    label: "Vegetación",
    layerId: "layer-vegetacion",
    endpoint: "veg_suelo.geojson",
    valueProperty: "veg_suelo",
    paintStops: [
      [0, "#ffffe5"],
      [0.2, "#ffe6a4"],
      [0.4, "#ffb84d"],
      [0.6, "#e65c00"],
      [0.8, "#993d00"],
    ],
  },
  {
    label: "Humedad superficial",
    layerId: "layer-humedad",
    endpoint: "humedad_suelo.geojson",
    valueProperty: "humedad_suelo",
    paintStops: [
      [0, "#f7fcf5"],
      [10, "#c7e9c0"],
      [20, "#74c476"],
      [30, "#31a354"],
      [40, "#006d2c"],
    ],
  },
  {
    label: "Temperatura superficial",
    layerId: "layer-temperatura",
    endpoint: "temperatura_superficie.geojson",
    valueProperty: "temperatura_superficie",
    paintStops: [
      [30, "#2c7bb6"],
      [34, "#abd9e9"],
      [38, "#ffffbf"],
      [42, "#fdae61"],
      [46, "#d7191c"],
    ],
  },
  {
    label: "Urbanización (índice)",
    layerId: "layer-urbanizacion",
    endpoint: "urban_index.geojson",
    valueProperty: "urban_index",
    paintStops: [
      [0, "#ffffe5"],
      [25, "#fee391"],
      [50, "#fec44f"],
      [75, "#fe9929"],
      [100, "#cc4c02"],
    ],
  },
  {
    label: "CO2",
    layerId: "layer-co2",
    endpoint: "concentracion_co2.geojson",
    valueProperty: "concentracion_co2",
    paintStops: [
      [300, "#edf8fb"],
      [350, "#b3cde3"],
      [400, "#8c96c6"],
      [450, "#8856a7"],
      [500, "#810f7c"],
    ],
  },
  {
    label: "NO2",
    layerId: "layer-no2",
    endpoint: "concentracion_no2.geojson",
    valueProperty: "concentracion_no2",
    paintStops: [
      [0, "#ffffcc"],
      [20, "#a1dab4"],
      [40, "#41b6c4"],
      [60, "#2c7fb8"],
      [80, "#253494"],
    ],
  },
  {
    label: "O3",
    layerId: "layer-o3",
    endpoint: "concentracion_ozono.geojson",
    valueProperty: "concentracion_ozono",
    paintStops: [
      [0, "#f7fcf0"],
      [50, "#ccebc5"],
      [100, "#7bccc4"],
      [150, "#43a2ca"],
      [200, "#0868ac"],
    ],
  },
  {
    label: "PM2.5",
    layerId: "layer-pm25",
    endpoint: "pm25_diario.geojson",
    valueProperty: "pm25_diario",
    paintStops: [
      [0, "#ffffe0"],
      [15, "#f0f0f0"],
      [30, "#d9d9d9"],
      [45, "#bdbdbd"],
      [60, "#737373"],
    ],
  },
  {
    label: "NDVI diferencial",
    layerId: "layer-ndvi-diff",
    endpoint: "ndvi_diff.geojson",
    valueProperty: "ndvi_diff",
    paintStops: [
      [0.0, "#f7fcf0"],
      [0.2, "#ccebc5"],
      [0.4, "#7bccc4"],
      [0.6, "#2b8cbe"],
      [0.8, "#084081"],
    ],
  },
  {
    label: "Clasificación urbana",
    layerId: "layer-urban-class",
    endpoint: "urban_class.geojson",
    valueProperty: "urban_class",
    paintStops: [
      [0, "#f7f7f7"], // clase 0
      [1, "#cccccc"], // clase 1
      [2, "#969696"], // clase 2
      [3, "#636363"], // clase 3
    ],
  },
  {
    label: "Crecimiento urbano",
    layerId: "layer-urban-growth",
    endpoint: "urban_growth.geojson",
    valueProperty: "urban_growth",
    paintStops: [
      [0, "#ffffcc"],
      [10, "#ffeda0"],
      [20, "#feb24c"],
      [30, "#f03b20"],
      [40, "#bd0026"],
    ],
  },
  {
    label: "Pérdida de vegetación",
    layerId: "layer-veg-loss",
    endpoint: "veg_loss.geojson",
    valueProperty: "veg_loss",
    paintStops: [
      [0, "#f7fcfd"],
      [5, "#e0ecf4"],
      [10, "#bfd3e6"],
      [15, "#9ebcda"],
      [20, "#8c96c6"],
    ],
  },
  {
    label: "Áreas verdes",
    layerId: "layer-areas-verdes",
    endpoint: "areas_verdes.geojson",
    valueProperty: "areas_verdes",
    paintStops: [
      [0, "#f7fcf5"],
      [10, "#e5f5e0"],
      [20, "#c7e9c0"],
      [30, "#a1d99b"],
      [40, "#74c476"],
    ],
  },
];

const PlatformMapView: React.FC<MapViewProps> = ({ openModal }) => {
  // ===== estados nuevos =====
  const [showActions, setShowActions] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showModulesPanel, setShowModulesPanel] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
<<<<<<< HEAD
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
      el.style.backgroundColor = '#2563eb';
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
=======
  const [mapStyle, setMapStyle] = useState<"light" | "dark">("light");
  const [isLocating, setIsLocating] = useState(false);
  const [carouselItems, setCarouselItems] = useState<MarkerItem[]>([]);
  const { requests, projects, supportRequest, likeProject, dislikeProject } =
    useAppContext();

  // Distancia entre dos puntos
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /**
   * Muestra/oculta capas de módulos GeoJSON
   */
  const toggleModuleLayer = (selectedLabel: string | null) => {
    const map = mapRef.current;
    if (!map) return;

    // Ocultar todas las capas de módulos primero
    modulesConfig.forEach((module) => {
      if (map.getLayer(module.layerId)) {
        map.setLayoutProperty(module.layerId, "visibility", "none");
      }
    });

    // Si se seleccionó un módulo, hacerlo visible
    if (selectedLabel) {
      const moduleToShow = modulesConfig.find((m) => m.label === selectedLabel);
      if (moduleToShow && map.getLayer(moduleToShow.layerId)) {
        map.setLayoutProperty(moduleToShow.layerId, "visibility", "visible");
      }
    }
  };

  // Agrupa marcadores cercanos
  const groupNearbyMarkers = (items: MarkerItem[], maxDistance = 20) => {
    const groups: MarkerItem[][] = [];
    const processed = new Set<string>();
    items.forEach((item) => {
      if (processed.has(item.id)) return;
      const group = [item];
      processed.add(item.id);
      items.forEach((other) => {
        if (
          !processed.has(other.id) &&
          calculateDistance(
            item.location.lat,
            item.location.lng,
            other.location.lat,
            other.location.lng
          ) <= maxDistance
        ) {
          group.push(other);
          processed.add(other.id);
        }
      });
      groups.push(group);
    });
    return groups;
  };

  // renderMarkers ahora filtra según showRequests y showProjects
  const renderMarkers = () => {
    const map = mapRef.current;
    if (!map) return;
    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    // montar solo los items activos
    const items: MarkerItem[] = [];
    if (showRequests) {
      items.push(
        ...requests.map((r) => ({
          ...r,
          type: "request" as const,
          location: r.location,
        }))
      );
    }
    if (showProjects) {
      items.push(
        ...projects.map((p) => ({
          ...p,
          type: "project" as const,
          location: { lat: p.location[0], lng: p.location[1] },
        }))
      );
    }

    groupNearbyMarkers(items).forEach((group) => {
      const first = group[0];
      const isGroup = group.length > 1;
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor =
        first.type === "request" ? "#009BDA" : "#22c55e";
      el.style.width = isGroup ? "16px" : "12px";
      el.style.height = isGroup ? "16px" : "12px";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 2px rgba(0,0,0,0.5)";
      if (isGroup) {
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.fontSize = "10px";
        el.style.color = "white";
        el.style.fontWeight = "bold";
        el.textContent = String(group.length);
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([first.location.lng, first.location.lat])
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        if (isGroup) {
          setCarouselItems(group);
        } else {
          const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
            <div style="font-family:sans-serif;max-width:240px;">
              <h3 style="margin:0;font-size:16px;">${first.title}</h3>
              ${
                first.category
                  ? `<p style="margin:4px 0;font-size:14px;"><strong>Categoría:</strong> ${first.category}</p>`
                  : ""
              }
              <p style="font-size:13px;">${first.description}</p>
              ${
                first.authorName
                  ? `<p style="font-size:13px;"><strong>Autor:</strong> ${first.authorName}</p>`
                  : ""
              }
              ${
                first.imageUrl
                  ? `<img src="${first.imageUrl}" style="width:100%;margin-top:8px;border-radius:6px;" />`
                  : ""
              }
              ${
                first.type === "request"
                  ? `<button onclick="window.dispatchEvent(new CustomEvent('support-request',{detail:'${first.id}'}))"
                        style="margin-top:8px;background:#2563eb;color:#fff;padding:6px 10px;border:none;border-radius:4px;cursor:pointer;">
                          Apoyar (${first.supports || 0})
                      </button>`
                  : `<div style="margin-top:8px;display:flex;gap:4px;">
                        <button onclick="window.dispatchEvent(new CustomEvent('like-project',{detail:'${first.id}'}))"
                              style="flex:1;background:#22c55e;color:#fff;padding:6px 10px;border:none;border-radius:4px;cursor:pointer;">
                          👍 (${first.likes || 0})
                        </button>
                        <button onclick="window.dispatchEvent(new CustomEvent('dislike-project',{detail:'${first.id}'}))"
                              style="flex:1;background:#ef4444;color:#fff;padding:6px 10px;border:none;border-radius:4px;cursor:pointer;">
                          👎 (${first.dislikes || 0})
                        </button>
                      </div>`
              }
            </div>
          `);
          marker.setPopup(popup);
        }
      });
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)
    });

    // Eliminar oyentes anteriores para evitar duplicados
    window.removeEventListener("support-request", (e: any) => supportRequest(e.detail));
    window.removeEventListener("like-project", (e: any) => likeProject(e.detail));
    window.removeEventListener("dislike-project", (e: any) => dislikeProject(e.detail));

<<<<<<< HEAD
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
=======
    window.addEventListener("support-request", (e: any) =>
      supportRequest(e.detail)
    );
    window.addEventListener("like-project", (e: any) =>
      likeProject(e.detail)
    );
    window.addEventListener("dislike-project", (e: any) =>
      dislikeProject(e.detail)
    );
  };

  // Inicializa el mapa
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        mapStyle === "light"
          ? "mapbox://styles/mapbox/light-v10"
          : "mapbox://styles/mapbox/dark-v10",
      // Centro aproximado de Hermosillo
      center: [-110.958, 29.0957],
      // Zoom inicial
      zoom: 12,
      // Permitir zoom libre entre 10 y 16
      minZoom: 10,
      maxZoom: 16,
      // Restringir la vista al área de Hermosillo
      maxBounds: [
        // suroeste         noreste
        [-111.1, 28.9], // suroeste: un poco al sur-oeste de la ciudad
        [-110.7, 29.3], // noreste: un poco al norte-este
      ],
      attributionControl: false,
      logoPosition: "bottom-right",
      scrollZoom: true, // habilita zoom con rueda
      dragPan: true, // permite arrastrar
      touchZoomRotate: true, // permite zoom táctil
    });

    mapRef.current = map;

    map.on("load", () => {
      // === INICIO: Cargar todas las fuentes y capas de los módulos ===
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        console.error("VITE_BACKEND_URL no está definida en el archivo .env");
        return;
      }

      modulesConfig.forEach((module) => {
        const sourceId = `source-${module.layerId}`;
        const geojsonUrl = `${backendUrl}/${module.endpoint}`;

        // 1. Añadir la fuente de datos GeoJSON
        map.addSource(sourceId, {
          type: "geojson",
          data: geojsonUrl, // URL completa al archivo GeoJSON
        });

        // 2. Añadir la capa de polígonos
        map.addLayer({
          id: module.layerId,
          type: "fill",
          source: sourceId,
          layout: {
            // Inicia como no visible
            visibility: "none",
          },
          paint: {
            // Interpolar el color basado en la propiedad del GeoJSON
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", module.valueProperty],
              // Desestructurar los paintStops en el formato que Mapbox necesita
              ...module.paintStops.flat(),
            ],
            "fill-opacity": 0.7, // Opacidad de los polígonos
            "fill-outline-color": "#000000",
          },
        });
      });
      // === FIN: Carga de módulos ===

      renderMarkers();
    });

    map.on("dblclick", (e) =>
      openModal("request", { lat: e.lngLat.lat, lng: e.lngLat.lng })
    );

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // Dependencia vacía para que se ejecute solo una vez, cargando todas las capas al inicio
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)

  // Cambia de estilo
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Guardar el módulo seleccionado antes de cambiar el estilo para restaurarlo después
    const currentSelectedModuleLabel = selectedModule;

    map.setStyle(
      mapStyle === "light"
        ? "mapbox://styles/mapbox/light-v10"
        : "mapbox://styles/mapbox/dark-v10"
    );

    map.once("styledata", () => {
      // Volver a añadir fuentes y capas porque cambiar el estilo las elimina
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
          console.error("VITE_BACKEND_URL no está definida en el archivo .env");
          return;
      }

      modulesConfig.forEach(module => {
        const sourceId = `source-${module.layerId}`;
        const geojsonUrl = `${backendUrl}/${module.endpoint}`;

        if (!map.getSource(sourceId)) { // Solo añadir la fuente si no existe
          map.addSource(sourceId, {
              type: 'geojson',
              data: geojsonUrl,
          });
        }
        
        if (!map.getLayer(module.layerId)) { // Solo añadir la capa si no existe
          map.addLayer({
              id: module.layerId,
              type: 'fill',
              source: sourceId,
              layout: {
                  'visibility': currentSelectedModuleLabel === module.label ? 'visible' : 'none'
              },
              paint: {
                  'fill-color': [
                      'interpolate',
                      ['linear'],
                      ['get', module.valueProperty],
                      ...module.paintStops.flat()
                  ],
                  'fill-opacity': 0.7,
                  'fill-outline-color': '#000000'
              }
          });
        } else {
           // Si la capa ya existe (ej. por un cambio de estilo anterior), solo actualiza la visibilidad
           map.setLayoutProperty(module.layerId, "visibility", currentSelectedModuleLabel === module.label ? "visible" : "none");
        }
      });
      renderMarkers();
    });
  }, [mapStyle, selectedModule]); // Añadir selectedModule al array de dependencias

  // Re-render cuando cambian datos o filtros
  useEffect(() => {
    renderMarkers();
  }, [requests, projects, showRequests, showProjects]);

  // Maneja la visibilidad de la capa del módulo seleccionado
  useEffect(() => {
    toggleModuleLayer(selectedModule);
  }, [selectedModule]); // Se ejecuta cada vez que selectedModule cambia

  // Geolocalización
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        mapRef.current?.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 15,
          essential: true,
        });
        setIsLocating(false);
      },
      () => {
        alert("No se pudo obtener tu ubicación");
        setIsLocating(false);
      }
    );
  };

  // ===== Botones y filtros =====
  return (
<<<<<<< HEAD
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex z-50 pointer-events-none">
        <button
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white"
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
=======
    <div className="relative w-full h-full overflow-hidden ">
      {/* — Barra “VISTAS” a la izquierda — */}
      <div className="absolute left-4 top-110 bottom-20 z-100 flex flex-col items-center space-y-2 ">
        {/* Miniatura light */}
        <img
          src="/Mapa-light.png"
          alt="Vista clara"
          onClick={() => setMapStyle("light")}
          className={`w-12 h-12 rounded cursor-pointer border-2 ${
            mapStyle === "light" ? "border-blue-500" : "border-transparent"
          }`}
        />
        {/* Miniatura dark */}
        <img
          src="/Mapa-dark.png"
          alt="Vista oscura"
          onClick={() => setMapStyle("dark")}
          className={`w-12 h-12 rounded cursor-pointer border-2 ${
            mapStyle === "dark" ? "border-blue-500" : "border-transparent"
          }`}
        />
      </div>

      {/* — El mapa — */}
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* — Panel de módulos (solo si showModulesPanel) — */}
      {showModulesPanel && (
        <aside className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col space-y-2 overflow-y-auto z-50">
          <h2 className="text-xl font-semibold mb-4">Módulos del sistema</h2>
          {modulesConfig.map((module) => {
            const isActive = selectedModule === module.label;
            return (
              <button
                key={module.label}
                onClick={() => {
                  const next = isActive ? null : module.label;
                  setSelectedModule(next);
                }}
                className={`w-full text-left px-3 py-2 rounded ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {module.label}
              </button>
            );
          })}
        </aside>
      )}

      {/* — Botones de acción (añadir/ubicar) — solo tras pulsar Reports */}
      {showActions && (
        <div className="absolute bottom-[3rem] inset-x-0 flex justify-center z-50">
          <BottomActions
            onAdd={() => {
              const c = mapRef.current?.getCenter();
              if (c) {
                openModal("request", { lat: c.lat, lng: c.lng });
                renderMarkers();
              }
            }}
            onLocate={() => {
              handleLocateUser();
              renderMarkers();
            }}
            isLocating={isLocating}
          />
        </div>
      )}

      {/* — Botones de “Informes” y “Ecosistema” en el pie — */}
      <div className="absolute bottom-3 inset-x-10 flex justify-center space-x-4 z-50 ">
        <ReportsButton
          onClick={() => {
            setShowRequests(true);
            setShowProjects(false);
            setShowActions(true);
            renderMarkers();
            setShowModulesPanel(false); // ocultamos panel
            setSelectedModule(null); // Deselecciona cualquier módulo activo
          }}
        />
        <EcosystemButton
          onClick={() => {
            setShowProjects(true);
            setShowRequests(false);
            setShowActions(false);
            renderMarkers();
            setShowModulesPanel(true); // mostramos panel
          }}
        />
      </div>

      {/* — Carrusel — */}
      {carouselItems.length > 0 && (
        <MarkerCarousel
          items={carouselItems}
          onClose={() => setCarouselItems([])}
          onSupport={supportRequest}
          onLike={likeProject}
          onDislike={dislikeProject}
        />
      )}
>>>>>>> 272a371 (feat(map): Integrar mejoras en el mapa y módulos de datos de la ciudad)
    </div>
  );
};

export default PlatformMapView;