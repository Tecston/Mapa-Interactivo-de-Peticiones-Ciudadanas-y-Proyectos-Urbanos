import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/UI/Header";
import Sidebar from "./components/UI/Sidebar";
import PlatformMapView from "./components/Map/PlatformMapView";
import DataVisualization from "./components/Dashboard/DataVisualization";
import AdminPanel from "./components/Admin/AdminPanel";
import Rewards from "./components/Rewards/Rewards";
import Resources from "./components/Resources/Resources";
import AboutUs from "./components/AboutUs/AboutUs";
import RequestForm from "./components/Forms/RequestForm";
import ProjectForm from "./components/Forms/ProjectForm";
import LandingPage from "./components/Landing/LandingPage";
import ViabilityPage from "./pages/ViabilityPage";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";

import { AppProvider } from "./context/AppContext";

import "./index.css";

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "request" | "project" | null
  >(null);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const openModal = (
    content: "request" | "project",
    coords?: { lat: number; lng: number }
  ) => {
    setModalContent(content);
    setIsModalOpen(true);
    if (coords) {
      setSelectedCoords(coords);
    }
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
    setSelectedCoords(null);
  };

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<LandingPage />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Dashboard con sidebar */}
          <Route
            path="/dashboard/*"
            element={
              <div className="flex h-dvh flex-col bg-gray-50">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto p-4">
                    <Routes>
                      <Route path="/" element={<Navigate to="map" replace />} />
                      <Route
                        path="map"
                        element={<PlatformMapView openModal={openModal} />}
                      />
                      <Route path="stats" element={<DataVisualization />} />
                      {/* <Route path="admin" element={<AdminPanel />} />
                      <Route path="rewards" element={<Rewards />} />
                      <Route path="resources" element={<Resources />} />
                      <Route path="about" element={<AboutUs />} />
                      <Route path="viability" element={<ViabilityPage />} /> */}
                    </Routes>
                  </main>
                </div>

                {/* Modal flotante global */}
                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-white shadow-xl">
                      <div className="p-4">
                        <button
                          onClick={closeModal}
                          className="float-right text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>

                        {modalContent === "request" && (
                          <RequestForm
                            onClose={closeModal}
                            initialCoords={selectedCoords || undefined}
                          />
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
}

export default App;
