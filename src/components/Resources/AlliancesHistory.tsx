// File: src/components/Resources/AlliancesHistory.tsx
import React from 'react'

interface Alliance {
  id: string
  date: string
  partner: string
  initiative: string
  logoUrl?: string
}

const alliances: Alliance[] = [
  {
    id: 'a1',
    date: '2024-02-15',
    partner: 'Ayuntamiento de Hermosillo',
    initiative: 'Jornadas de limpieza urbana',
    logoUrl: '/logos/ayuntamiento.png',
  },
  {
    id: 'a2',
    date: '2024-04-10',
    partner: 'COE Sonora Norte',
    initiative: 'Talleres de participación ciudadana',
    logoUrl: '/logos/coe.png',
  },
  {
    id: 'a3',
    date: '2024-06-20',
    partner: 'Fundación Xignux',
    initiative: 'Desarrollo de plataforma de datos abiertos',
    logoUrl: '/logos/xignux.png',
  },
]

const AlliancesHistory: React.FC = () => (
  <section className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-2xl font-bold mb-4">Historial de Alianzas</h2>
    <ul className="space-y-4">
      {alliances.map(({ id, date, partner, initiative, logoUrl }) => (
        <li key={id} className="flex items-start space-x-4">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={partner}
              className="w-12 h-12 object-contain rounded-md"
            />
          )}
          <div>
            <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
            <p className="font-medium text-gray-800">{partner}</p>
            <p className="text-gray-600">{initiative}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
)

export default AlliancesHistory