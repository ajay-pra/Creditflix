import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Sidebar } from "./components/layout/Sidebar";
import { TopNav } from "./components/layout/TopNav";
import { ToastContainer } from "./components/common/ToastContainer";
import { AIAssistantModal } from "./components/modals/AIAssistantModal";
import { DemoWalkthroughModal } from "./components/modals/DemoWalkthroughModal";
import { CitizenWhatsAppBotModal } from "./components/modals/CitizenWhatsAppBotModal";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

// 15 Command Centre Pages
import { OverviewPage } from "./pages/Overview/OverviewPage";
import { CityMapPage } from "./pages/CityMap/CityMapPage";
import { IrrigationPage } from "./pages/Irrigation/IrrigationPage";
import { WastePage } from "./pages/Waste/WastePage";
import { TrafficPage } from "./pages/Traffic/TrafficPage";
import { WaterPage } from "./pages/Water/WaterPage";
import { EnvironmentPage } from "./pages/Environment/EnvironmentPage";
import { DisasterPage } from "./pages/Disaster/DisasterPage";
import { EnergyPage } from "./pages/Energy/EnergyPage";
import { InfrastructurePage } from "./pages/Infrastructure/InfrastructurePage";
import { DeviceManagementPage } from "./pages/DeviceManagement/DeviceManagementPage";
import { AIIntelligencePage } from "./pages/AIIntelligence/AIIntelligencePage";
import { IncidentsPage } from "./pages/Incidents/IncidentsPage";
import { FilesPage } from "./pages/Files/FilesPage";
import { ReportsPage } from "./pages/Reports/ReportsPage";
import { SettingsPage } from "./pages/Settings/SettingsPage";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    isWhatsAppBotOpen,
    setIsWhatsAppBotOpen,
    isDemoWalkthroughOpen,
    setIsDemoWalkthroughOpen
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Top Header */}
      <TopNav isSidebarCollapsed={isSidebarCollapsed} />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 pt-20 px-4 sm:px-6 pb-12 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/map" element={<CityMapPage />} />
              <Route path="/irrigation" element={<IrrigationPage />} />
              <Route path="/waste" element={<WastePage />} />
              <Route path="/traffic" element={<TrafficPage />} />
              <Route path="/water" element={<WaterPage />} />
              <Route path="/environment" element={<EnvironmentPage />} />
              <Route path="/disaster" element={<DisasterPage />} />
              <Route path="/energy" element={<EnergyPage />} />
              <Route path="/infrastructure" element={<InfrastructurePage />} />
              <Route path="/devices" element={<DeviceManagementPage />} />
              <Route path="/ai-intelligence" element={<AIIntelligencePage />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>

      {/* Floating System Notifications */}
      <ToastContainer />

      {/* Creditfix Collectorate AI Copilot Dialog */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />

      {/* Creditfix Assessment Demo Walkthrough Modal */}
      <DemoWalkthroughModal
        isOpen={isDemoWalkthroughOpen}
        onClose={() => setIsDemoWalkthroughOpen(false)}
      />

      {/* Citizen WhatsApp AI Grievance Intake Simulator */}
      <CitizenWhatsAppBotModal
        isOpen={isWhatsAppBotOpen}
        onClose={() => setIsWhatsAppBotOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </AppProvider>
  );
}

