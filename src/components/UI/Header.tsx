import React from 'react';
import { MapPinIcon, AwardIcon, UserIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
const Header = () => {
  const {
    currentUser
  } = useAppContext();
  return <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MapPinIcon size={24} />
          <h1 className="text-xl font-bold">CiudadParticipa</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-blue-700 rounded-full px-3 py-1">
            <AwardIcon size={16} className="mr-1" />
            <span>{currentUser.points} puntos</span>
          </div>
          <div className="flex items-center">
            <UserIcon size={20} className="mr-1" />
            <span className="hidden sm:inline">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;