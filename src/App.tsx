// src/App.tsx
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

  /** ---------- helpers ----------- */
  const openModal = (content: "request" | "project") => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Landing puro */}
          <Route path="/" element={<LandingPage />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Dashboard con sidebar */}
          <Route
            path="/dashboard/*"
            element={
              <div className="flex h-screen flex-col bg-gray-50">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-auto p-4">
                    <Routes>
                      {/* redirección por default */}
                      <Route path="/" element={<Navigate to="map" replace />} />

                      {/* vistas */}
                      <Route
                        path="map"
                        element={<MapView openModal={openModal} />}
                      />
                      <Route path="stats" element={<DataVisualization />} />
                      <Route path="admin" element={<AdminPanel />} />
                      <Route path="rewards" element={<Rewards />} />
                      <Route path="resources" element={<Resources />} />
                      <Route path="about" element={<AboutUs />} />
                      <Route path="viability" element={<ViabilityPage />} />
                    </Routes>
                  </main>
                </div>

                {/* modal global para peticiones/proyectos */}
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
}
export default App;
