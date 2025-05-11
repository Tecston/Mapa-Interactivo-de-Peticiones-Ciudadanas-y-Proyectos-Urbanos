// src/components/UI/Button.tsx
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 ${className}`}
  />
)
