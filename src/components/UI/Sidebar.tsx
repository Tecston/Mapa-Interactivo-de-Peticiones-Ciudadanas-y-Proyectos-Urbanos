// src/components/UI/Sidebar.tsx
import React from 'react'
import {
  MapIcon,
  LayoutDashboardIcon,
  ShieldIcon,
  AwardIcon,
  BookOpenIcon, // ícono para Recursos
  InfoIcon,
} from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { currentUser } = useAppContext()
  return (
    <aside className="bg-white shadow-md w-16 md:w-56 flex flex-col">
      <nav className="flex flex-col flex-1 p-2 space-y-1">
        <SidebarItem
          icon={<MapIcon size={20} />}
          label="Mapa"
          active={activeView === 'map'}
          onClick={() => setActiveView('map')}
        />
        <SidebarItem
          icon={<LayoutDashboardIcon size={20} />}
          label="Estadísticas"
          active={activeView === 'stats'}
          onClick={() => setActiveView('stats')}
        />
        {currentUser.isAdmin && (
          <SidebarItem
            icon={<ShieldIcon size={20} />}
            label="Administración"
            active={activeView === 'admin'}
            onClick={() => setActiveView('admin')}
          />
        )}
        <SidebarItem
          icon={<AwardIcon size={20} />}
          label="Recompensas"
          active={activeView === 'rewards'}
          onClick={() => setActiveView('rewards')}
        />
        <SidebarItem
          icon={<BookOpenIcon size={20} />}
          label="Recursos"
          active={activeView === 'resources'}
          onClick={() => setActiveView('resources')}
        />
        <SidebarItem
          icon={<InfoIcon size={20} />}
          label="Sobre Nosotros"
          active={activeView === 'about'}
          onClick={() => setActiveView('about')}
        />
      </nav>
      <div className="p-2 md:p-4 border-t border-gray-200 text-center">
        <span className="text-xs text-gray-500 hidden md:block">© 2025 CiudadParticipa</span>
      </div>
    </aside>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center space-x-2 p-2 rounded-lg ${
      active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
)

export default Sidebar
