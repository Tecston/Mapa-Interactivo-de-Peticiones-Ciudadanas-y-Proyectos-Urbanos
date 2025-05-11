<<<<<<< Updated upstream
// File: src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/UI/Header";
import Sidebar from "./components/UI/Sidebar";
import MapView from "./components/Map/MapView";
import DataVisualization from "./components/Dashboard/DataVisualization";
import AdminPanel from "./components/Admin/AdminPanel";
import Rewards from "./components/Rewards/Rewards";
import Resources from "./components/Resources/Resources";
import AboutUs from "./components/AboutUs/AboutUs";
import RequestForm from "./components/Forms/RequestForm";
import ProjectForm from "./components/Forms/ProjectForm";
import { AppProvider } from "./context/AppContext";
import LandingPage from "./components/Landing/LandingPage";

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "request" | "project" | null
  >(null);
=======
// src/App.tsx
import React, { useState } from "react"
import Header from "./components/UI/Header"
import Sidebar from "./components/UI/Sidebar"
import MapView from "./components/Map/MapView"
import DataVisualization from "./components/Dashboard/DataVisualization"
import AdminPanel from "./components/Admin/AdminPanel"
import Rewards from "./components/Rewards/Rewards"
import Resources from "./components/Resources/Resources"
import AboutUs from "./components/AboutUs/AboutUs"
import RequestForm from "./components/Forms/RequestForm"
import ProjectForm from "./components/Forms/ProjectForm"
import { AppProvider } from "./context/AppContext"
import LandingPage from "./components/Landing/LandingPage"
import ViabilityPage from "./pages/ViabilityPage" // <-- Asegúrate que exista

export function App() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false)
  const [activeView, setActiveView] = useState<
    | "map"
    | "stats"
    | "admin"
    | "rewards"
    | "resources"
    | "about"
    | "viability"
  >("map")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<"request" | "project" | null>(null)
>>>>>>> Stashed changes

  const openModal = (content: "request" | "project") => {
    setModalContent(content)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setModalContent(null)
    setIsModalOpen(false)
  }

<<<<<<< Updated upstream
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard/*"
            element={
              <div className="flex flex-col h-screen w-full bg-gray-50">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto p-4">
                    <Routes>
                      <Route path="/" element={<Navigate to="map" replace />} />
                      <Route
                        path="map"
                        element={<MapView openModal={openModal} />}
                      />
                      <Route path="stats" element={<DataVisualization />} />
                      <Route path="admin" element={<AdminPanel />} />
                      <Route path="rewards" element={<Rewards />} />
                      <Route path="resources" element={<Resources />} />
                      <Route path="about" element={<AboutUs />} />
                    </Routes>
                  </main>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
                      <div className="p-4">
                        <button
                          onClick={closeModal}
                          className="float-right text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                        {modalContent === "request" && (
                          <RequestForm onClose={closeModal} />
                        )}
                        {modalContent === "project" && (
                          <ProjectForm onClose={closeModal} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
=======
  if (!hasEnteredApp) {
    return <LandingPage onEnterApp={() => setHasEnteredApp(true)} />
  }

  return (
    <AppProvider>
      <div className="flex flex-col h-screen w-full bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />

          <main className="flex-1 overflow-auto p-4">
            {activeView === "map"       && <MapView openModal={openModal} />}
            {activeView === "stats"     && <DataVisualization />}
            {activeView === "admin"     && <AdminPanel />}
            {activeView === "rewards"   && <Rewards />}
            {activeView === "resources" && <Resources />}
            {activeView === "about"     && <AboutUs />}
            {activeView === "viability" && <ViabilityPage />}
          </main>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
              <div className="p-4">
                <button
                  onClick={closeModal}
                  className="float-right text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                {modalContent === "request" && <RequestForm onClose={closeModal} />}
                {modalContent === "project" && <ProjectForm onClose={closeModal} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppProvider>
  )
>>>>>>> Stashed changes
}
