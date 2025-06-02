// src/components/UI/Sidebar.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapIcon,
  LayoutDashboardIcon,
  ShieldIcon,
  ClipboardListIcon,
  AwardIcon,
  BookOpenIcon,
  InfoIcon,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

type ViewType = "map" | "stats" | "admin";
// | "rewards"
// | "resources"
// | "about"
// | "viability";

/* definición centralizada */
const NAV_ITEMS: {
  type: ViewType;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  path: string;
  adminOnly?: boolean;
}[] = [
  {
    type: "map",
    label: "Mapa",
    icon: (active) => (
      <MapIcon
        size={20}
        className={`mr-2 ${active ? "text-blue-500" : "text-gray-8"}`}
      />
    ),
    path: "/dashboard/map",
  },
  {
    type: "stats",
    label: "Estadísticas",
    icon: (active) => (
      <LayoutDashboardIcon
        size={20}
        className={`mr-2 ${active ? "text-green-500" : "text-gray-8"}`}
      />
    ),
    path: "/dashboard/stats",
  },
  // {
  //   type: "admin",
  //   label: "Administración",
  //   icon: (active) => (
  //     <ShieldIcon
  //       size={20}
  //       className={`mr-2 ${active ? "text-red-500" : "text-gray-8"}`}
  //     />
  //   ),
  //   path: "/dashboard/admin",
  //   adminOnly: true,
  // },
  //   {
  //     type: "viability",
  //     label: "Viabilidad",
  //     icon: (active) => (
  //       <ClipboardListIcon
  //         size={20}
  //         className={`mr-2 ${active ? "text-orange-500" : "text-gray-8"}`}
  //       />
  //     ),
  //     path: "/dashboard/viability",
  //   },
  //   {
  //     type: "rewards",
  //     label: "Recompensas",
  //     icon: (active) => (
  //       <AwardIcon
  //         size={20}
  //         className={`mr-2 ${active ? "text-yellow-500" : "text-gray-8"}`}
  //       />
  //     ),
  //     path: "/dashboard/rewards",
  //   },
  //   {
  //     type: "resources",
  //     label: "Recursos",
  //     icon: (active) => (
  //       <BookOpenIcon
  //         size={20}
  //         className={`mr-2 ${active ? "text-cyan-500" : "text-gray-8"}`}
  //       />
  //     ),
  //     path: "/dashboard/resources",
  //   },
  //   {
  //     type: "about",
  //     label: "Sobre Nosotros",
  //     icon: (active) => (
  //       <InfoIcon
  //         size={20}
  //         className={`mr-2 ${active ? "text-gray-12" : "text-gray-8"}`}
  //       />
  //     ),
  //     path: "/dashboard/about",
  //   },
];

const Sidebar: React.FC = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="flex w-16 flex-col bg-white border-t-1 shadow-md md:w-56">
      <nav className="flex flex-1 flex-col p-2">
        {NAV_ITEMS.map((item) => {
          if (item.adminOnly && !currentUser.isAdmin) return null;

          return (
            <SidebarItem
              key={item.type}
              icon={item.icon}
              label={item.label}
              active={pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-2 text-center md:p-4">
        <span className="hidden text-xs text-gray-500 md:block">
          © 2025 CiudadParticipa
        </span>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: (active: boolean) => React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center p-2 ${
      active
        ? "bg-blue-3 text-blue-12 border-1 border-blue-3"
        : "text-gray-12 border-1 border-white hover:border-1 hover:border-blue-6"
    }`}
  >
    {icon(active)}
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default Sidebar;
