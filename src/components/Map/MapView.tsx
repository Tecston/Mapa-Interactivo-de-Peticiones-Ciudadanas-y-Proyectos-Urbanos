// src/components/Map/MapView.tsx
import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet'
import { PlusIcon, BuildingIcon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// --- Fix Leaflet icon issue ----------
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

// --- Custom icons ----------
const requestIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const projectIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface MapViewProps {
  openModal: (type: 'request' | 'project') => void
}

const MapView: React.FC<MapViewProps> = ({ openModal }) => {
  const {
    requests,
    projects,
    supportRequest,
    likeProject,
    dislikeProject,
    addComment
  } = useAppContext()

  const [selectedItem, setSelectedItem] = useState<{
    type: 'request' | 'project'
    id: string
  } | null>(null)
  const [newComment, setNewComment] = useState('')

  // Hermosillo: 29.072968, -110.955918
  const defaultCenter: [number, number] = [29.072968, -110.955918]

  const handleAddComment = () => {
    if (!selectedItem || !newComment.trim()) return
    addComment(selectedItem.type, selectedItem.id, newComment.trim())
    setNewComment('')
  }

  return (
    <div className="h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="z-10"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/** Peticiones **/}
        {requests.map((req) => (
          <Marker
            key={req.id}
            position={req.location}
            icon={requestIcon}
            eventHandlers={{
              click: () =>
                setSelectedItem({ type: 'request', id: req.id })
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg">{req.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Por {req.authorName} • {req.date}
                </p>
                <p className="mb-2">{req.description}</p>
                {req.imageUrl && (
                  <img
                    src={req.imageUrl}
                    alt={req.title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Categoría: {req.category}
                  </span>
                  <button
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      supportRequest(req.id)
                    }}
                  >
                    Apoyar ({req.supports})
                  </button>
                </div>

                {/** Comentarios **/}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <h4 className="font-semibold mb-1">
                    Comentarios ({req.comments.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto mb-2">
                    {req.comments.map((c) => (
                      <div
                        key={c.id}
                        className="mb-2 bg-gray-50 p-2 rounded-md"
                      >
                        <p className="text-sm font-semibold">
                          {c.author}
                        </p>
                        <p className="text-sm">{c.text}</p>
                        <p className="text-xs text-gray-500">
                          {c.date}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Añadir comentario..."
                      className="flex-1 border rounded-l-md px-2 py-1 text-sm"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white rounded-r-md px-2 py-1 text-sm"
                      onClick={handleAddComment}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/** Proyectos **/}
        {projects.map((proj) => (
          <Marker
            key={proj.id}
            position={proj.location}
            icon={projectIcon}
            eventHandlers={{
              click: () =>
                setSelectedItem({ type: 'project', id: proj.id })
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg">{proj.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      proj.status === 'planning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : proj.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {proj.status === 'planning'
                      ? 'Planeación'
                      : proj.status === 'in-progress'
                      ? 'En progreso'
                      : 'Completado'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Por {proj.institution}
                </p>
                <p className="mb-2">{proj.description}</p>
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span>Inicio: {proj.startDate}</span>
                  {proj.endDate && <span>Fin: {proj.endDate}</span>}
                </div>
                <div className="flex space-x-2 mb-2">
                  <button
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      likeProject(proj.id)
                    }}
                  >
                    👍 ({proj.likes})
                  </button>
                  <button
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded-full text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      dislikeProject(proj.id)
                    }}
                  >
                    👎 ({proj.dislikes})
                  </button>
                </div>

                {/** Comentarios **/}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <h4 className="font-semibold mb-1">
                    Comentarios ({proj.comments.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto mb-2">
                    {proj.comments.map((c) => (
                      <div
                        key={c.id}
                        className="mb-2 bg-gray-50 p-2 rounded-md"
                      >
                        <p className="text-sm font-semibold">
                          {c.author}
                        </p>
                        <p className="text-sm">{c.text}</p>
                        <p className="text-xs text-gray-500">
                          {c.date}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Añadir comentario..."
                      className="flex-1 border rounded-l-md px-2 py-1 text-sm"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white rounded-r-md px-2 py-1 text-sm"
                      onClick={handleAddComment}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/** Handler de doble clic */}
        <MapClickHandler openModal={openModal} />
      </MapContainer>

      {/** Botones flotantes */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-50 pointer-events-none">
        <button
          className="pointer-events-auto bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700"
          onClick={() => openModal('request')}
        >
          <PlusIcon />
        </button>
        <button
          className="pointer-events-auto bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700"
          onClick={() => openModal('project')}
        >
          <BuildingIcon />
        </button>
      </div>
    </div>
  )
}

interface MapClickHandlerProps {
  openModal: (type: 'request' | 'project') => void
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ openModal }) => {
  useMapEvents({
    dblclick: () => openModal('request')
  })
  return null
}

export default MapView
