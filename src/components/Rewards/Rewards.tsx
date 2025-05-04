// src/components/Rewards/Rewards.tsx
import React from 'react'
import { useAppContext } from '../../context/AppContext'

const Rewards: React.FC = () => {
  const { currentUser } = useAppContext()

  // % hacia el siguiente nivel (asumiendo cada 100 puntos)
  const progress = currentUser.points % 100

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil y Recompensas</h2>

      <div className="mb-4">
        <p><strong>Usuario:</strong> {currentUser.name}</p>
        <p><strong>Puntos acumulados:</strong> {currentUser.points}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Barra de progreso</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Recompensas disponibles</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>🎫 Cupón de transporte (100 pts)</li>
          <li>🎟️ Entrada a evento cultural (200 pts)</li>
          <li>❤️ Donación a ONG (300 pts)</li>
        </ul>
      </div>
    </div>
  )
}

export default Rewards
