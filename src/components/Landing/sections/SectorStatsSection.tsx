import React from "react";
import * as Progress from "@radix-ui/react-progress";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const AnimatedNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );
  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value]);
  return <motion.span>{rounded}</motion.span>;
};

const SectorStatsSection: React.FC = () => (
  <section
    id="estadisticas"
    className="w-full flex flex-col items-center py-24 bg-white"
  >
    <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">
      Estadísticas del Sector
    </h2>
    <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
      Datos relevantes sobre el desarrollo arquitectónico y urbano en Sonora
    </p>
    <div className="grid px-6 lg:px-0 grid-cols-1 md:grid-cols-4 gap-6 mb-10 w-full max-w-6xl">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border">
        <span className="text-green-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"
            />
          </svg>
        </span>
        <h3 className="text-xl font-bold mb-1 text-center">
          Proyectos Activos
        </h3>
        <div className="text-3xl font-extrabold mb-1">
          <AnimatedNumber value={78} />
        </div>
        <div className="text-gray-500 text-center text-sm">
          Proyectos arquitectónicos en desarrollo
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border">
        <span className="text-green-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 0C6.477 4 2 8.477 2 14c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4 0-5.523-4.477-10-10-10z"
            />
          </svg>
        </span>
        <h3 className="text-xl font-bold mb-1 text-center">Inversión Total</h3>
        <div className="text-3xl font-extrabold mb-1">
          <AnimatedNumber value={1250} />
        </div>
        <div className="text-gray-500 text-center text-sm">
          MDP
          <br />
          Millones de pesos invertidos en 2025
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border">
        <span className="text-green-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 118 0v4"
            />
          </svg>
        </span>
        <h3 className="text-xl font-bold mb-1 text-center">
          Empleos Generados
        </h3>
        <div className="text-3xl font-extrabold mb-1">
          <AnimatedNumber value={3450} />
        </div>
        <div className="text-gray-500 text-center text-sm">
          Puestos de trabajo en el sector
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border">
        <span className="text-green-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 17l6-6 4 4 8-8"
            />
          </svg>
        </span>
        <h3 className="text-xl font-bold mb-1 text-center">
          Crecimiento Anual
        </h3>
        <div className="text-3xl font-extrabold mb-1">
          <AnimatedNumber value={28} />
        </div>
        <div className="text-gray-500 text-center text-sm">
          %<br />
          Incremento respecto al año anterior
        </div>
      </div>
    </div>
    <div className="w-full px-6 lg:px-0 max-w-6xl mt-8">
      <h3 className="text-xl font-bold mb-4">
        Distribución por Tipo de Proyecto
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="font-semibold flex items-center justify-between">
            Espacios Públicos <span className="ml-2">8%</span>
          </div>
          <Progress.Root
            value={8}
            max={100}
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mt-2"
          >
            <Progress.Indicator
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: "8%" }}
            />
          </Progress.Root>
        </div>
        <div>
          <div className="font-semibold flex items-center justify-between">
            Residencial <span className="ml-2">42%</span>
          </div>
          <Progress.Root
            value={42}
            max={100}
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mt-2"
          >
            <Progress.Indicator
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: "42%" }}
            />
          </Progress.Root>
        </div>
        <div>
          <div className="font-semibold flex items-center justify-between">
            Comercial <span className="ml-2">28%</span>
          </div>
          <Progress.Root
            value={28}
            max={100}
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mt-2"
          >
            <Progress.Indicator
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: "28%" }}
            />
          </Progress.Root>
        </div>
        <div>
          <div className="font-semibold flex items-center justify-between">
            Industrial <span className="ml-2">15%</span>
          </div>
          <Progress.Root
            value={15}
            max={100}
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mt-2"
          >
            <Progress.Indicator
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: "15%" }}
            />
          </Progress.Root>
        </div>
        <div>
          <div className="font-semibold flex items-center justify-between">
            Infraestructura <span className="ml-2">7%</span>
          </div>
          <Progress.Root
            value={7}
            max={100}
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mt-2"
          >
            <Progress.Indicator
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: "7%" }}
            />
          </Progress.Root>
        </div>
      </div>
    </div>
  </section>
);

export default SectorStatsSection;
