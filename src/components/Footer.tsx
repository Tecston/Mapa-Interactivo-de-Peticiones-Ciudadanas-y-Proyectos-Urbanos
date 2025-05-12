import React from "react";

const Footer: React.FC = () => (
  <footer
    id="contacto"
    className="w-full text-neutral-200 border-t bg-slate-800 border-neutral-800"
  >
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Main footer content in three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Company Info Column */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white mb-4">Ciudata</h3>
          <p className="text-neutral-400 text-sm mb-4 italic">
            "Transformando el futuro urbano de Hermosillo, un proyecto a la vez"
          </p>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white mb-4">Contacto</h3>
          <div className="space-y-2 text-neutral-400 text-sm">
            <p>Email: info@ciudata.mx</p>
            <p>Teléfono: (662) 123-4567</p>
            <p>Dirección: Hermosillo, Sonora</p>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-white mb-4">Enlaces Rápidos</h3>
          <div className="space-y-2 text-neutral-400 text-sm">
            <a href="#inicio" className="hover:text-white transition-colors">
              Inicio
            </a>
            <br />
            <a href="#mapa" className="hover:text-white transition-colors">
              Mapa
            </a>
            <br />
            <a
              href="#estadisticas"
              className="hover:text-white transition-colors"
            >
              Estadísticas
            </a>
            <br />
            <a href="#servicios" className="hover:text-white transition-colors">
              Servicios
            </a>
            <br />
            <a href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar with copyright and social links */}
      <div className="border-t border-gray-8/50 pt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-neutral-400 text-sm mb-4 md:mb-0">
          © 2025 Ciudata. Todos los derechos reservados.
        </div>
        <div className="flex space-x-4">
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
