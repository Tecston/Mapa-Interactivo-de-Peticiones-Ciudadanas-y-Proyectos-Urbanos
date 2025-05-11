import React, { useState, useEffect, useRef } from "react";
import { AppProvider } from "../../context/AppContext";
import Footer from "../Footer";
import HeroSection from "./sections/HeroSection";
import MapSection from "./sections/MapSection";
import SectorStatsSection from "./sections/SectorStatsSection";
import FeaturedTopicsSection from "./sections/FeaturedTopicsSection";
import UrbanStatsSection from "./sections/UrbanStatsSection";
import ServiciosSection from "./sections/ServiciosSection";
import TeamSection from "./sections/TeamSection";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Mapa", href: "#mapa" },
  { label: "Estadísticas", href: "#estadisticas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  const [activeSection, setActiveSection] = useState("inicio");
  const sectionsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        sectionsRef.current[entry.target.id] = entry;
      });
      const visibleSections = Object.values(sectionsRef.current).filter(
        (entry) => entry.isIntersecting
      );
      if (visibleSections.length > 0) {
        const mostVisibleSection = visibleSections.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio
            ? prev
            : current;
        });
        setActiveSection(mostVisibleSection.target.id);
      }
    }, observerOptions);
    NAV_LINKS.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) {
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("inicio");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsOverHero(rect.bottom > 200);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppProvider>
      <div
        className="min-h-screen w-full relative flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,40,0.7),rgba(20,20,40,0.7)), url(https://cdn.pixabay.com/photo/2021/04/09/02/09/hermosillo-6163195_1280.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Top Navigation for sm/md/lg screens */}
        <nav className="w-full z-50 bg-gray-900 sticky xl:hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <span className="text-xl font-bold tracking-wide text-white">
                Ciudata
              </span>
              <div className="flex items-center space-x-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gray-800"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <button
                  onClick={onEnterApp}
                  className="font-medium py-2 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 text-sm ml-2"
                >
                  VER PROYECTOS
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Side Navigation for xl screens and up */}
        <nav
          className={`fixed left-0 top-0 h-full z-50 hidden xl:flex flex-col items-start justify-center pl-12`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative mt-24">
            <div
              className={`absolute -left-8 top-1 pb-10 -translate-y-1/2 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <span
                className={`text-xl font-bold tracking-wide whitespace-nowrap ${
                  isOverHero ? "text-white" : "text-gray-800"
                }`}
              >
                Ciudata
              </span>
            </div>
            {/* Nav Links */}
            <ul className="space-y-6">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.href} className="relative group">
                    <a
                      href={link.href}
                      className={`flex items-center space-x-4 transition-all duration-300 px-2 py-1 rounded-lg ${
                        isOverHero
                          ? isActive
                            ? "text-white scale-110"
                            : "text-white/60 hover:text-white"
                          : isActive
                          ? "text-gray-800 scale-110"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                      style={{ minWidth: 120 }}
                    >
                      {/* Active indicator line */}
                      <div
                        className={`absolute -left-6 top-1/2 -translate-y-1/2 h-0.5 transition-all duration-300 ${
                          isActive
                            ? isOverHero
                              ? "w-4 bg-white"
                              : "w-4 bg-gray-800"
                            : "w-0 group-hover:w-4 bg-white/60"
                        }`}
                      />
                      <span className="font-medium tracking-wide text-lg">
                        {link.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={`mt-8 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <button
                onClick={onEnterApp}
                className={`font-medium py-2 px-4 rounded-full backdrop-blur-sm transition-all duration-300 text-sm ${
                  isOverHero
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-900/10 hover:bg-gray-900/20 text-gray-800"
                }`}
              >
                VER PROYECTOS
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content - All sections as components */}
        <main className="flex-1 pt-16 lg:pt-0">
          <HeroSection onEnterApp={onEnterApp} />
          <MapSection />
          <SectorStatsSection />
          <FeaturedTopicsSection />
          <UrbanStatsSection />
          <ServiciosSection />
          <TeamSection />
        </main>
      </div>
      <Footer />
    </AppProvider>
  );
};

export default LandingPage;
