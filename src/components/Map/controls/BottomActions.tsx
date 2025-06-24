import React from "react";
import { PlusIcon } from "lucide-react";
import { FaMapPin } from "react-icons/fa";

interface Props {
  onAdd: () => void;
  onLocate: () => void;
  isLocating: boolean;
}

export const BottomActions: React.FC<Props> = ({ onAdd, onLocate, isLocating }) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50 pointer-events-none">
    <button
      onClick={onAdd}
      className="pointer-events-auto w-12 h-12 rounded-lg flex items-center justify-center shadow-lg transition-colors bg-brand-blue hover:bg-brand-blue-darker text-white"
    >
      <PlusIcon />
    </button>
    <button
      onClick={onLocate}
      disabled={isLocating}
      className="pointer-events-auto w-12 h-12 rounded-lg flex items-center justify-center shadow-lg transition-colors bg-brand-blue hover:bg-brand-blue-darker text-white"
    >
      {isLocating ? (
        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <FaMapPin />
      )}
    </button>
  </div>
);
