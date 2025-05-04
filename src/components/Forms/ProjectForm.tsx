import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
interface ProjectFormProps {
  onClose: () => void;
}
const ProjectForm: React.FC<ProjectFormProps> = ({
  onClose
}) => {
  const {
    addProject
  } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [institution, setInstitution] = useState('');
  const [status, setStatus] = useState<'planning' | 'in-progress' | 'completed'>('planning');
  const [imageUrl, setImageUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState<[number, number]>([19.432608, -99.133209]); // Default location
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      title,
      description,
      institution,
      status,
      imageUrl: imageUrl || undefined,
      location,
      startDate,
      endDate: endDate || undefined
    });
    onClose();
  };
  return <div>
      <h2 className="text-xl font-bold mb-4">Nuevo Proyecto Urbano</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Renovación de Plaza Principal" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Describe el proyecto con detalle..." required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institución
          </label>
          <input type="text" value={institution} onChange={e => setInstitution(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ej: Secretaría de Desarrollo Urbano" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select value={status} onChange={e => setStatus(e.target.value as 'planning' | 'in-progress' | 'completed')} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="planning">Planeación</option>
            <option value="in-progress">En Progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen (opcional)
          </label>
          <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="https://ejemplo.com/imagen.jpg" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio
            </label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Finalización (est.)
            </label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
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
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Registrar Proyecto
          </button>
        </div>
      </form>
    </div>;
};
export default ProjectForm;