import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { DISTRICT_INFO, DISTRICT_ZONES } from "../data/mockLocations";
import { generateInitialDevices } from "../data/mockDevices";
import { INITIAL_IRRIGATION_ZONES } from "../data/mockIrrigation";
import { generateInitialWasteBins, INITIAL_VEHICLES } from "../data/mockWaste";
import { INITIAL_INTERSECTIONS } from "../data/mockTraffic";
import { INITIAL_WATER_POINTS } from "../data/mockWater";
import { INITIAL_ENV_STATIONS } from "../data/mockEnvironment";
import { INITIAL_FLOOD_STATIONS } from "../data/mockDisaster";
import { INITIAL_LIGHTING_SUMMARY, INITIAL_LIGHTING_FEEDERS } from "../data/mockEnergy";
import { INITIAL_INFRA_ASSETS } from "../data/mockInfrastructure";
import { INITIAL_INCIDENTS } from "../data/mockAlerts";
import { INITIAL_AI_RECOMMENDATIONS } from "../data/mockForecasts";
import { SimulationEngine, simulateNextState } from "../services/simulationService";

const AppContext = createContext();

export const DEMO_ROLES = [
  { id: "dm", title: "District Magistrate & Collector", label: "DM / Collector (Executive)", badge: "bg-blue-600 text-white" },
  { id: "commissioner", title: "Municipal Commissioner", label: "Municipal Commissioner", badge: "bg-indigo-600 text-white" },
  { id: "dept_head", title: "Department Head (Water & Agri)", label: "Department Head", badge: "bg-emerald-600 text-white" },
  { id: "field_officer", title: "Zonal Field Officer", label: "Field Officer", badge: "bg-amber-600 text-white" },
  { id: "tech_admin", title: "SCADA & IoT Administrator", label: "IoT / SCADA Admin", badge: "bg-purple-600 text-white" }
];

export const AppProvider = ({ children }) => {
  // 1. Initial State from LocalStorage or defaults
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`vasudha_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [districtInfo] = useState(DISTRICT_INFO);
  const [zones] = useState(DISTRICT_ZONES);
  const [devices, setDevices] = useState(() => loadState("devices", generateInitialDevices()));
  const [irrigationZones, setIrrigationZones] = useState(() => loadState("irrigation", INITIAL_IRRIGATION_ZONES));
  const [wasteBins, setWasteBins] = useState(() => loadState("wasteBins", generateInitialWasteBins()));
  const [vehicles, setVehicles] = useState(() => loadState("vehicles", INITIAL_VEHICLES));
  const [intersections, setIntersections] = useState(() => loadState("traffic", INITIAL_INTERSECTIONS));
  const [waterPoints, setWaterPoints] = useState(() => loadState("water", INITIAL_WATER_POINTS));
  const [envStations, setEnvStations] = useState(() => loadState("env", INITIAL_ENV_STATIONS));
  const [floodStations, setFloodStations] = useState(() => loadState("flood", INITIAL_FLOOD_STATIONS));
  const [lightingSummary, setLightingSummary] = useState(INITIAL_LIGHTING_SUMMARY);
  const [lightingFeeders, setLightingFeeders] = useState(() => loadState("lighting", INITIAL_LIGHTING_FEEDERS));
  const [infraAssets, setInfraAssets] = useState(() => loadState("infra", INITIAL_INFRA_ASSETS));
  const [incidents, setIncidents] = useState(() => loadState("incidents", INITIAL_INCIDENTS));
  const [aiRecommendations, setAiRecommendations] = useState(() => loadState("aiRecs", INITIAL_AI_RECOMMENDATIONS));

  // Application Shell State
  const [currentRole, setCurrentRole] = useState(DEMO_ROLES[0]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [toasts, setToasts] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedZoneFilter, setSelectedZoneFilter] = useState("all");
  const [activeRoute, setActiveRoute] = useState(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Simulation engine instance ref
  const simEngineRef = useRef(null);

  // Toast Notification Helper
  const addToast = (title, message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 2. Persist to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("vasudha_devices", JSON.stringify(devices));
      localStorage.setItem("vasudha_irrigation", JSON.stringify(irrigationZones));
      localStorage.setItem("vasudha_wasteBins", JSON.stringify(wasteBins));
      localStorage.setItem("vasudha_vehicles", JSON.stringify(vehicles));
      localStorage.setItem("vasudha_traffic", JSON.stringify(intersections));
      localStorage.setItem("vasudha_water", JSON.stringify(waterPoints));
      localStorage.setItem("vasudha_env", JSON.stringify(envStations));
      localStorage.setItem("vasudha_flood", JSON.stringify(floodStations));
      localStorage.setItem("vasudha_lighting", JSON.stringify(lightingFeeders));
      localStorage.setItem("vasudha_infra", JSON.stringify(infraAssets));
      localStorage.setItem("vasudha_incidents", JSON.stringify(incidents));
      localStorage.setItem("vasudha_aiRecs", JSON.stringify(aiRecommendations));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }
  }, [
    devices,
    irrigationZones,
    wasteBins,
    vehicles,
    intersections,
    waterPoints,
    envStations,
    floodStations,
    lightingFeeders,
    infraAssets,
    incidents,
    aiRecommendations
  ]);

  // 3. Initialize Central Simulation Loop
  useEffect(() => {
    simEngineRef.current = new SimulationEngine((tickCount) => {
      // Advance telemetry state
      setIrrigationZones((prevIrr) => {
        setWasteBins((prevBins) => {
          setVehicles((prevVeh) => {
            setIntersections((prevInt) => {
              setWaterPoints((prevWtr) => {
                setEnvStations((prevEnv) => {
                  setDevices((prevDev) => {
                    const next = simulateNextState({
                      devices: prevDev,
                      irrigationZones: prevIrr,
                      wasteBins: prevBins,
                      vehicles: prevVeh,
                      intersections: prevInt,
                      waterPoints: prevWtr,
                      envStations: prevEnv,
                      floodStations,
                      lightingFeeders
                    });
                    // Apply device updates
                    setDevices(next.devices);
                    return next.envStations;
                  });
                  return prevWtr;
                });
                return prevInt;
              });
              return prevVeh;
            });
            return prevBins;
          });
          return prevIrr;
        });
      });
    });

    simEngineRef.current.start(3500);

    return () => {
      if (simEngineRef.current) simEngineRef.current.stop();
    };
  }, []);

  // Toggle Simulation Pause/Resume
  const toggleSimulation = () => {
    if (simEngineRef.current) {
      const running = simEngineRef.current.togglePause();
      setIsSimulating(running);
      addToast(
        running ? "Simulation Resumed" : "Simulation Paused",
        running ? "IoT sensors and actuators are now updating dynamically." : "Sensor values are locked for inspection.",
        running ? "success" : "info"
      );
    }
  };

  const changeSimulationSpeed = (speed) => {
    setSimSpeed(speed);
    if (simEngineRef.current) {
      simEngineRef.current.setSpeed(speed);
      addToast("Simulation Speed Updated", `Clock speed multiplier set to ${speed}x.`, "info");
    }
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setDevices(generateInitialDevices());
    setIrrigationZones(INITIAL_IRRIGATION_ZONES);
    setWasteBins(generateInitialWasteBins());
    setVehicles(INITIAL_VEHICLES);
    setIntersections(INITIAL_INTERSECTIONS);
    setWaterPoints(INITIAL_WATER_POINTS);
    setEnvStations(INITIAL_ENV_STATIONS);
    setFloodStations(INITIAL_FLOOD_STATIONS);
    setLightingFeeders(INITIAL_LIGHTING_FEEDERS);
    setLightingSummary(INITIAL_LIGHTING_SUMMARY);
    setInfraAssets(INITIAL_INFRA_ASSETS);
    setIncidents(INITIAL_INCIDENTS);
    setAiRecommendations(INITIAL_AI_RECOMMENDATIONS);
    setActiveRoute(null);
    addToast("Demo Data Reset Complete", "All sensors, actuators, and incidents have been restored to initial baseline.", "success");
  };

  // Actuator Control Helper (Pumps, Solenoids, Flood Gates, Lighting, Traffic Signals)
  const setActuatorState = (actuatorId, updates, description) => {
    // 1. Update device in devices registry
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === actuatorId) {
          return {
            ...d,
            actuatorState: {
              ...d.actuatorState,
              ...updates
            },
            lastCommunication: "Just now (Command ACK)"
          };
        }
        return d;
      })
    );

    // 2. Cascade to domain specific state (e.g. Irrigation pump)
    setIrrigationZones((prev) =>
      prev.map((z) => {
        if (z.connectedPumpId === actuatorId) {
          const power = updates.power !== undefined ? updates.power : updates.pumpRunning;
          return {
            ...z,
            pumpRunning: power,
            status: power ? "irrigating" : z.soilMoisture10cm < 25 ? "critical" : "healthy",
            pumpFlowRateLpm: power ? 120 : 0
          };
        }
        return z;
      })
    );

    // 3. Cascade to Flood drainage pumps
    setFloodStations((prev) =>
      prev.map((f) => {
        if (f.id === actuatorId || actuatorId.includes("FLD")) {
          return {
            ...f,
            ...updates
          };
        }
        return f;
      })
    );

    addToast(
      "Actuator Command Executed",
      `${description || `Device ${actuatorId}`} command verified and dispatched to edge controller.`,
      "success"
    );
  };

  // Incident Lifecycle Helpers
  const acknowledgeIncident = (incidentId) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const history = [
            ...(inc.actionHistory || []),
            { timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), actor: currentRole.title, action: "Acknowledged Incident" }
          ];
          return { ...inc, status: "acknowledged", actionHistory: history };
        }
        return inc;
      })
    );
    addToast("Incident Acknowledged", `Incident ${incidentId} marked as acknowledged.`, "info");
  };

  const assignIncident = (incidentId, officer, department) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const history = [
            ...(inc.actionHistory || []),
            { timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), actor: currentRole.title, action: `Assigned to ${officer} (${department})` }
          ];
          return {
            ...inc,
            status: "assigned",
            assignedOfficer: officer,
            department: department || inc.department,
            actionHistory: history
          };
        }
        return inc;
      })
    );
    addToast("Incident Assigned", `Assigned to ${officer}. Automated notification dispatched.`, "success");
  };

  const updateIncidentStatus = (incidentId, newStatus, note) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const history = [
            ...(inc.actionHistory || []),
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              actor: currentRole.title,
              action: `Status changed to ${newStatus.toUpperCase()}${note ? `: "${note}"` : ""}`
            }
          ];
          return { ...inc, status: newStatus, actionHistory: history, resolutionNote: note || inc.resolutionNote };
        }
        return inc;
      })
    );
    addToast("Incident Updated", `Status updated to ${newStatus.toUpperCase()}.`, "info");
  };

  const createIncident = (incidentData) => {
    const nextId = `VSD-INC-${110 + incidents.length + 1}`;
    const newIncident = {
      id: nextId,
      createdAt: "Just now",
      dueDate: "Today, 06:00 PM",
      status: "new",
      actionHistory: [
        { timestamp: "Just now", actor: currentRole.title, action: "Incident Logged via Command Centre" }
      ],
      ...incidentData
    };
    setIncidents((prev) => [newIncident, ...prev]);
    addToast("Incident Created", `Incident #${nextId} logged and prioritized.`, "success");
    return nextId;
  };

  // AI Recommendation Handlers
  const reviewAIRecommendation = (recId, actionTaken) => {
    setAiRecommendations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, reviewed: true, actionTaken } : r))
    );
    addToast("AI Recommendation Approved", "Operational action initiated with verified administrative oversight.", "success");
  };

  const dismissAIRecommendation = (recId) => {
    setAiRecommendations((prev) =>
      prev.map((r) => (r.id === recId ? { ...r, dismissed: true } : r))
    );
    addToast("AI Recommendation Dismissed", "Feedback noted in predictive learning registry.", "info");
  };

  // Collect Waste Bin Action
  const markBinCollected = (binId) => {
    setWasteBins((prev) =>
      prev.map((b) => (b.id === binId ? { ...b, fillLevel: 4, status: "normal", lastCollected: "Just now", needsCollection: false } : b))
    );
    addToast("Bin Clearance Verified", `Smart Bin ${binId} emptied and sensor calibrated to 4% baseline.`, "success");
  };

  return (
    <AppContext.Provider
      value={{
        districtInfo,
        zones,
        devices,
        setDevices,
        irrigationZones,
        setIrrigationZones,
        wasteBins,
        setWasteBins,
        vehicles,
        setVehicles,
        intersections,
        setIntersections,
        waterPoints,
        setWaterPoints,
        envStations,
        setEnvStations,
        floodStations,
        setFloodStations,
        lightingSummary,
        lightingFeeders,
        setLightingFeeders,
        infraAssets,
        setInfraAssets,
        incidents,
        setIncidents,
        aiRecommendations,
        setAiRecommendations,
        currentRole,
        setCurrentRole,
        isSimulating,
        toggleSimulation,
        simSpeed,
        changeSimulationSpeed,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
        globalSearch,
        setGlobalSearch,
        selectedZoneFilter,
        setSelectedZoneFilter,
        activeRoute,
        setActiveRoute,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        setActuatorState,
        acknowledgeIncident,
        assignIncident,
        updateIncidentStatus,
        createIncident,
        reviewAIRecommendation,
        dismissAIRecommendation,
        markBinCollected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
