import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet-draw"               // side-effect: añade controles a L
import { useEffect, useRef } from "react"
import L, { LatLngExpression } from "leaflet"

interface MapWithDrawProps {
  onPolygonComplete: (latlngs: LatLngExpression[]) => void
}

export default function MapWithDraw({ onPolygonComplete }: MapWithDrawProps) {
  const mapRef = useRef<L.Map | null>(null)

  // ––––– configurar el control de dibujo –––––
  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current

    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)

    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        marker: false,
        circle: false,
        rectangle: false,
        polyline: false,
        circlemarker: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: { color: "#2563eb" },
        },
      },
      edit: { featureGroup: drawnItems, edit: false, remove: true },
    })

    map.addControl(drawControl)

    map.on(L.Draw.Event.CREATED, (e: any) => {
      drawnItems.clearLayers()
      drawnItems.addLayer(e.layer)
      const latlngs = (e.layer as L.Polygon).getLatLngs()[0] as L.LatLng[]
      onPolygonComplete(latlngs.map((p) => [p.lat, p.lng]))
    })

    return () => {
      map.off()
      map.removeControl(drawControl)
      map.removeLayer(drawnItems)
    }
  }, [onPolygonComplete])

  return (
    <MapContainer
      center={[29.072, -110.955]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
      />
    </MapContainer>
  )
}
