import React from "react";

interface Props {
  current: "light" | "dark";
  onChange: (style: "light" | "dark") => void;
}

export const StyleToggle: React.FC<Props> = ({ current, onChange }) => (
  <div className="flex flex-col space-y-2">
    <img
      src="/Mapa-light.png"
      alt="Vista clara"
      onClick={() => onChange("light")}
      className={`w-12 h-12 rounded-xl cursor-pointer border-2 ${
        current === "light" ? "border-blue-500" : "border-transparent"
      }`}
    />
    <img
      src="/Mapa-dark.png"
      alt="Vista oscura"
      onClick={() => onChange("dark")}
      className={`w-12 h-12 rounded-xl cursor-pointer border-2 ${
        current === "dark" ? "border-blue-500" : "border-transparent"
      }`}
    />
  </div>
);
