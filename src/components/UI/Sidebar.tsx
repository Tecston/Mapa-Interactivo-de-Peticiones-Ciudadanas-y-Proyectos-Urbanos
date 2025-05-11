// src/components/UI/Sidebar.tsx
<<<<<<< Updated upstream
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
=======
import React from "react"
>>>>>>> Stashed changes
import {
  MapIcon,
  LayoutDashboardIcon,
  ShieldIcon,
  ClipboardListIcon,
  AwardIcon,
  BookOpenIcon,
  InfoIcon,
} from "lucide-react"
import { useAppContext } from "../../context/AppContext"

type ViewType =
  | "map"
  | "stats"
  | "admin"
  | "rewards"
  | "resources"
  | "about"
  | "viability"

<<<<<<< Updated upstream
const NAV_ITEMS: {
  type: ViewType;
  label: string;
  icon: React.ReactNode;
  path: string;
}[] = [
  {
    type: "map",
    label: "Mapa",
    icon: <MapIcon size={20} />,
    path: "/dashboard/map",
  },
  {
    type: "stats",
    label: "Estadísticas",
    icon: <LayoutDashboardIcon size={20} />,
    path: "/dashboard/stats",
  },
  {
    type: "admin",
    label: "Administración",
    icon: <ShieldIcon size={20} />,
    path: "/dashboard/admin",
  },
  {
    type: "rewards",
    label: "Recompensas",
    icon: <AwardIcon size={20} />,
    path: "/dashboard/rewards",
  },
  {
    type: "resources",
    label: "Recursos",
    icon: <BookOpenIcon size={20} />,
    path: "/dashboard/resources",
  },
  {
    type: "about",
    label: "Sobre Nosotros",
    icon: <InfoIcon size={20} />,
    path: "/dashboard/about",
  },
];

const Sidebar: React.FC = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
=======
interface SidebarProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { currentUser } = useAppContext()
>>>>>>> Stashed changes

  return (
    <aside className="bg-white shadow-md w-16 md:w-56 flex flex-col">
      <nav className="flex flex-col flex-1 p-2 space-y-1">
<<<<<<< Updated upstream
        {NAV_ITEMS.map((item) => {
          if (item.type === "admin" && !currentUser.isAdmin) return null;
          return (
            <SidebarItem
              key={item.type}
              icon={item.icon}
              label={item.label}
              active={currentPath === item.path}
              onClick={() => navigate(item.path)}
            />
          );
        })}
=======
        <SidebarItem icon={<MapIcon size={20} />}            label="Mapa"           active={activeView === "map"}       onClick={() => setActiveView("map")} />
        <SidebarItem icon={<LayoutDashboardIcon size={20} />} label="Estadísticas" active={activeView === "stats"}     onClick={() => setActiveView("stats")} />
        {currentUser.isAdmin && (
          <SidebarItem icon={<ShieldIcon size={20} />}         label="Administración" active={activeView === "admin"}     onClick={() => setActiveView("admin")} />
        )}
        <SidebarItem icon={<ClipboardListIcon size={20} />}   label="Viabilidad"    active={activeView === "viability"} onClick={() => setActiveView("viability")} />
        <SidebarItem icon={<AwardIcon size={20} />}            label="Recompensas"    active={activeView === "rewards"}    onClick={() => setActiveView("rewards")} />
        <SidebarItem icon={<BookOpenIcon size={20} />}         label="Recursos"       active={activeView === "resources"} onClick={() => setActiveView("resources")} />
        <SidebarItem icon={<InfoIcon size={20} />}             label="Sobre Nosotros" active={activeView === "about"}      onClick={() => setActiveView("about")} />
>>>>>>> Stashed changes
      </nav>
      <div className="p-2 md:p-4 border-t border-gray-200 text-center">
        <span className="text-xs text-gray-500 hidden md:block">
          © 2025 CiudadParticipa
        </span>
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
    onClick={onClick}
    className={`flex items-center space-x-2 p-2 rounded-lg ${
      active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </button>
)

export default Sidebar
