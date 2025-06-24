// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ← Este div siempre ocupa toda la ventana */}
    <div className="h-screen w-screen">
      <App />
    </div>
  </React.StrictMode>,
);
