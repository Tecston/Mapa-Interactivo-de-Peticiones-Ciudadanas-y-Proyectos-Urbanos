import React from "react";

interface Props {
  onClick: () => void;
}

export const ReportsButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="pointer-events-auto px-3 py-1 rounded-lg shadow transition-colors bg-brand-blue hover:bg-brand-blue-darker text-white"
  >
    Informes ciudadanos
  </button>
);
