import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Badge } from "../common/Badge";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Presentation,
  Sparkles,
  Droplets,
  Trash2,
  Car,
  AlertTriangle,
  Wind,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  BookOpen,
  FileText
} from "lucide-react";

export const DemoWalkthroughModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState("scenarios");

  const DEMO_SCENARIOS = [
    {
      id: "irrigation",
      title: "Scenario 1: Smart Irrigation & Soil Moisture Predictive Dispatch",
      sector: "Agriculture & Green Spaces",
      icon: Droplets,
      color: "emerald",
      path: "/irrigation",
      description:
        "Zone 04 (Model Farm Cluster) soil moisture drops to 24%, triggering an AI advisory before crop wilting occurs. Walk through the mandatory SCADA human-in-the-loop safety confirmation dialog before actuator pump activation.",
      keyMetrics: "Zone 04 • Multi-depth 10cm/30cm sensors • 15 HP Solar VFD Pump",
      assessmentAlignment: "Proactive AI resource dispatch & SCADA safety interlocking"
    },
    {
      id: "waste",
      title: "Scenario 2: Smart Waste Overflow & TSP Fleet Route Optimization",
      sector: "Solid Waste Management",
      icon: Trash2,
      color: "amber",
      path: "/waste",
      description:
        "Optical ultrasonic bins in Central Commercial Market reach 92% fill. Run the in-browser Traveling Salesperson (TSP) heuristic to dynamically dispatch Truck #4 with an optimized shortest-path route, saving 18% fuel.",
      keyMetrics: "50 Smart Bins • 10 Fleet Trucks • Dynamic Route Polyline on GIS Map",
      assessmentAlignment: "Predictive logistics, municipal cost savings & route optimization"
    },
    {
      id: "traffic",
      title: "Scenario 3: SCATS Adaptive Signal & Congestion Clearance",
      sector: "Urban Mobility",
      icon: Car,
      color: "blue",
      path: "/traffic",
      description:
        "Junction 03 (Civil Lines / Mall Road) experiences acute 88% congestion density. Switch from fixed timer mode to SCATS Dynamic Split, prioritizing eastbound arterial flow with automated green-phase cascading.",
      keyMetrics: "8 SCATS Intersections • Doppler Radar Vehicle Flow • Live Phase Timers",
      assessmentAlignment: "Real-time edge actuator telemetry & adaptive urban control"
    },
    {
      id: "water",
      title: "Scenario 4: Water Supply Pipeline Anomaly & Burst Isolation",
      sector: "Water Utilities",
      icon: AlertTriangle,
      color: "cyan",
      path: "/water",
      description:
        "Electromagnetic flow meter FM-04 registers a severe negative flow deviation (310 kL/h vs 450 kL/h baseline) indicating a subterranean main rupture. Walk through remote motorized sluice valve closure.",
      keyMetrics: "Pipeline Section 12 • 450 kL/h nominal • Motorized Sluice SG-04",
      assessmentAlignment: "Real-time anomaly detection, infrastructure protection & audit logging"
    },
    {
      id: "environment",
      title: "Scenario 5: Nocturnal AQI Inversion & Anti-Smog Cannon Logistics",
      sector: "Ambient Air Quality",
      icon: Wind,
      color: "teal",
      path: "/environment",
      description:
        "Continuous Ambient Air Quality Monitoring Station (CAAQMS-06) detects microclimate stagnation in Industrial Sector 8 (AQI 280, PM2.5 165 µg/m³). Deploy municipal mobile anti-smog water cannons.",
      keyMetrics: "8 CAAQMS Stations • Laser Particulate Spectrometry • Microclimate Wind Radar",
      assessmentAlignment: "Environmental forecasting, citizen health protection & inter-agency coordination"
    }
  ];

  const handleLaunchScenario = (scenario) => {
    onClose();
    navigate(scenario.path);
    addToast(
      `Live Demo: ${scenario.title}`,
      `Navigated to ${scenario.sector} module. Follow the guided interactive controls.`,
      "info"
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="">
      <div className="space-y-6">
        {/* Header Hero */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <Presentation className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Creditfix Collectorate Command Centre • Assessment & Live Demo Walkthrough
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Interactive scenarios prepared for Creditfix Group – Applied AI Engineer Take-Home & Live Technical Presentation
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold mr-8">
            <button
              onClick={() => setActiveTab("scenarios")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "scenarios"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Demo Scenarios
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "docs"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Deliverables & Slides
            </button>
          </div>
        </div>

        {/* Tab 1: Live Demo Scenarios */}
        {activeTab === "scenarios" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Select any scenario to jump directly into the live module with simulated telemetry:</span>
              <span className="font-mono font-bold text-blue-600">5 Pre-configured Scenarios</span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {DEMO_SCENARIOS.map((sc, idx) => {
                const IconComponent = sc.icon;
                return (
                  <div
                    key={sc.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {sc.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Sector: {sc.sector}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchScenario(sc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>Launch Scenario</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sc.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-mono text-slate-500">{sc.keyMetrics}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                        {sc.assessmentAlignment}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Documentation & Deck References */}
        {activeTab === "docs" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Proposal Document Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                  <FileText className="h-4 w-4" />
                  <span>Technical & Strategic Proposal</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  CREDITFIX_DISTRICT_ADMINISTRATION_AI_PROPOSAL.md
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Comprehensive 6-part proposal answering Parts A to F of the Creditfix assessment:
                  Stakeholder Discovery, Solution Architecture, 12-Month Roadmap, Sovereign MeghRaj/NIC Compliance, Executive Pitch to DM, and Objection Handling.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                    Location: root / CREDITFIX_DISTRICT_ADMINISTRATION_AI_PROPOSAL.md
                  </span>
                </div>
              </div>

              {/* Slide Deck Outline Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>Live Presentation Slide Deck</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  CREDITFIX_PRESENTATION_SLIDES_DECK.md
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  20-slide executive presentation deck with word-for-word speaker notes, slide visual layouts, and 5-minute live demo script matched to the assessment brief.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                    Location: root / CREDITFIX_PRESENTATION_SLIDES_DECK.md
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-2">
              <h4 className="text-xs font-bold text-blue-900">
                Key Technical Architecture Highlights
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Deterministic Frontend Simulation Engine:</strong> Drifts telemetry realistically (soil moisture, water flow, traffic congestion, waste fill) every 2.5s with zero external dependencies.
                </li>
                <li>
                  <strong>Mandatory Human-in-the-Loop SCADA Interlock:</strong> Actuators require explicit SCADA confirmation before switching states, adhering to industrial safety standards.
                </li>
                <li>
                  <strong>Sovereign Cloud & Edge Deployment Model:</strong> Architecture designed for future deployment on MeghRaj (NIC Cloud) with Edge SCADA microcontrollers for offline resilience.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400">
            Creditfix District Administration Command Centre • Applied AI Engineer Practical Assessment
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </Modal>
  );
};
