// File: src/components/AboutUs/AboutUs.tsx
import React from 'react'
import HistoryTimeline from '../Timeline/HistoryTimeline'
import Card from '../UI/Card'

interface TeamMember {
  id: string
  name: string
  role: string
  photoUrl: string
}

const team: TeamMember[] = [
  { id: '1', name: 'Jesús', role: 'Arquitecto Principal', photoUrl: '/images/jesus.jpg' },
  { id: '2', name: 'Gael', role: 'Diseñador de Proyectos', photoUrl: '/images/gael.jpg' },
  { id: '3', name: 'Julieta', role: 'Coordinadora de Desarrollo', photoUrl: '/images/julieta.jpg' },
]

const AboutUs: React.FC = () => (
  <div className="space-y-6">
    {/* Timeline de historia */}
    <HistoryTimeline />

    {/* Sección Sobre Nosotros */}
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Sobre Nosotros</h2>
      <p className="text-gray-700">
        Somos un equipo multidisciplinario que busca empoderar a la ciudadanía de Hermosillo
        para mejorar la calidad de vida urbana mediante participación directa, datos abiertos
        y soluciones tecnológicas.
      </p>
      <p className="mt-4 text-gray-700">
        <strong>Misión:</strong> Fomentar la colaboración ciudadana para la mejora de espacios públicos.
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Visión:</strong> Una ciudad sostenible y participativa donde cada voz cuenta.
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700">
        <li>Transparencia</li>
        <li>Colaboración</li>
        <li>Sostenibilidad</li>
      </ul>
    </section>

    {/* Nuestro Equipo */}
    <section>
      <h3 className="text-xl font-semibold mb-4">Nuestro Equipo</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card
            key={member.id}
            title={member.name}
            description={member.role}
            author={member.name}
            date=""
            category="Equipo"
            supports={0}
            comments={0}
            imageUrl={member.photoUrl}
          />
        ))}
      </div>
    </section>

    {/* Alianzas y Logros */}
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-2">Alianzas y Logros</h3>
      <p className="text-gray-700 mb-2">
        Colaboramos con el Ayuntamiento de Hermosillo y el COE Sonora Norte.
      </p>
      <p className="text-gray-700">
        Hasta hoy contamos con 200 usuarios activos en sesiones piloto y más de 500 reportes ciudadanas.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Contáctanos
      </button>
    </section>
  </div>
)

export default AboutUs
