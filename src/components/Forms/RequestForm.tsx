import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
interface RequestFormProps {
  onClose: () => void;
}
const RequestForm: React.FC<RequestFormProps> = ({
  onClose
}) => {
  const {
    addRequest
  } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infraestructura');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState<[number, number]>([19.432608, -99.133209]); // Default location
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      title,
      description,
      category,
      imageUrl: imageUrl || undefined,
      location,
      authorName: 'Usuario Demo' // In a real app, this would come from auth
    });
    onClose();
  };
  return <div>
      <h2 className="text-xl font-bold mb-4">Nueva Petición Ciudadana</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Necesitamos un parque infantil" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Describe tu petición con detalle..." required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="Infraestructura">Infraestructura</option>
            <option value="Recreación">Recreación</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Transporte">Transporte</option>
            <option value="Medio Ambiente">Medio Ambiente</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen (opcional)
          </label>
          <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://ejemplo.com/imagen.jpg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <div className="flex space-x-2">
            <input type="number" value={location[0]} onChange={e => setLocation([parseFloat(e.target.value), location[1]])} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md" placeholder="Latitud" step="0.000001" required />
            <input type="number" value={location[1]} onChange={e => setLocation([location[0], parseFloat(e.target.value)])} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md" placeholder="Longitud" step="0.000001" required />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            En una versión real, podrías seleccionar la ubicación directamente
            en el mapa
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Enviar Petición
          </button>
        </div>
      </form>
    </div>;
};
export default RequestForm;