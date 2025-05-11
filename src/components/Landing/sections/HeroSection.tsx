import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => (
  <section
    id="inicio"
    className="flex flex-col items-center justify-center min-h-screen pt-16 pb-16 text-center px-6"
  >
    <h1 className="text-5xl w-3/4 md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
      Tu mapa de ruta para materializar tu proyecto y crecer en Hermosillo.
    </h1>
    <p className="text-2xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto drop-shadow">
      Descubre los proyectos arquitectónicos más destacados y conoce el
      desarrollo urbano de nuestra región.
    </p>
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <Link
        to="/dashboard"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transform transition hover:scale-105 duration-200 text-lg"
      >
        VER PROYECTOS
      </Link>
      <a
        href="#contacto"
        className="border-2 border-white text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition hover:bg-white hover:text-indigo-700 duration-200 text-lg"
      >
        CONTACTAR
      </a>
    </div>
  </section>
);

export default HeroSection;
