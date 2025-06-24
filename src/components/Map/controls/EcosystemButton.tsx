import React from "react";

interface Props {
  onClick: () => void;
}

export const EcosystemButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="pointer-events-auto px-3 py-1 rounded-lg shadow transition-colors bg-brand-blue hover:bg-brand-blue-darker text-white"
  >
    Ecosistema
  </button>
);
