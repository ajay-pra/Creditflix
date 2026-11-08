# Vasudha Smart District | Unified Intelligence & Command Centre

A government-grade, unified command-and-control platform for monitoring, analyzing, and managing district infrastructure, IoT sensor networks, civic utilities, and citizen incident workflows.

Built as an executive proof of concept for the **Creditfix Group Applied AI Engineer Assessment Task (Take-Home Project & Live Presentation)**.

---

## 🏛️ Project Overview

**Vasudha Smart District** simulates an end-to-end digital twin of a forward-looking Indian district administration (District Magistrate / Collectorate / Municipal Corporation headquarters).

The platform models 6 administrative zones across **8 core smart city verticals**:
1. **Smart Agriculture & Irrigation**: Multi-depth soil moisture probes (10cm/30cm), motorized pumps, solenoid valves, evapotranspiration analytics.
2. **Solid Waste Management & Fleet Tracking**: 50 ultrasonic sensor-enabled smart bins, 10 municipal compactor trucks with live GPS, and simulated TSP route optimization.
3. **Adaptive Traffic & Transit Management**: 8 arterial intersections with 77GHz FMCW radar sensors, vehicle flow telemetry, congestion heatmaps, and SCATS-style adaptive signal controller simulation.
4. **Potable Water Supply & SCADA**: Primary reservoirs, water treatment plants (WTPs), elevated storage reservoirs (OHTs), acoustic leak detection (Section 12 anomaly), and motorized pressure regulating valves.
5. **Continuous Ambient Air Quality (CAAQMS)**: 8 environmental observatories measuring AQI, PM2.5, PM10, gaseous pollutants, ambient noise, and anti-smog water cannon logistics.
6. **Disaster Hydrology & Flood Early Warning**: Gomati River gauging pylons, storm drain basins, sluice gate actuators, and high-capacity submersible dewatering pumps.
7. **Energy & Smart Street Lighting**: 1,450 LED luminaires managed across 30 feeder panels with DALI 0-10V dimmers, astronomical clock automation, and energy saving meters.
8. **Public Infrastructure Structural Health Monitoring (SHM)**: Triaxial MEMS accelerometers, vibrating wire strain gauges, and crack displacement sensors on cable-stayed bridges, elevated metro viaducts, and government buildings.

---

## 🧠 Core Philosophy

$$\text{Monitor} \longrightarrow \text{Analyse} \longrightarrow \text{Predict} \longrightarrow \text{Decide} \longrightarrow \text{Act} \longrightarrow \text{Verify}$$

* **Monitor**: Centralized streaming telemetry from 100 IoT devices and 6 administrative zones.
* **Analyse**: Real-time cross-vertical correlation (e.g. pressure drops combined with discharge spikes identify underground pipe bursts).
* **Predict**: Multi-horizon AI forecasting across 1h, 3h, 6h, 12h, and 24h horizons.
* **Decide**: Evidence-based SOP recommendations tailored for senior administrators.
* **Act**: SCADA actuator control with mandatory human-in-the-loop safety interlocks (pumps, sluice gates, traffic signals, feeder relays).
* **Verify**: Closed-loop audit logging and citizen resolution verification.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.x or v20+ (developed on v22.x)
* **npm**: v9+ or v10+

### Installation & Run

```bash
# 1. Clone repository or navigate to project directory
cd e:/smartCity

# 2. Install dependencies (React 18, Vite 5, Tailwind CSS, Leaflet, Recharts, Lucide React)
npm install

# 3. Start local development server
npm run dev
```

The application will launch locally at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗺️ Application Architecture

```
src/
├── components/
│   ├── layout/          # Sidebar (15 items), TopNav (Live clock, search, role switcher), Breadcrumb
│   ├── common/          # StatCard, Badge, Modal, ToastContainer, SimulationControls
│   ├── charts/          # TrendChart (Area/Line), ComparisonBarChart
│   ├── maps/            # DistrictMap (Leaflet OpenStreetMap with custom SVG glowing DivIcons)
│   └── modals/          # ActuatorConfirmModal, AIAssistantModal, DeviceDetailModal, IncidentDetailModal, CreateIncidentModal
├── data/
│   ├── mockLocations.js    # Vasudha District info & 6 geographic zones
│   ├── mockDevices.js      # 100 IoT devices with realistic telemetry & connectivity
│   ├── mockIrrigation.js   # 6 zones with soil depth readings, crop types, pumps
│   ├── mockWaste.js        # 50 bins + 10 municipal collection trucks
│   ├── mockTraffic.js      # 8 intersections with signal phases & congestion metrics
│   ├── mockWater.js        # Reservoirs, WTPs, flow meters & pipeline leakage anomaly
│   ├── mockEnvironment.js  # 8 CAAQMS ambient air observatories
│   ├── mockDisaster.js     # 5 river & storm drain gauging stations
│   ├── mockEnergy.js       # Streetlight feeders, dimming schedules, astronomical clock
│   ├── mockInfrastructure.js # 20 bridges, flyovers, buildings with SHM sensors
│   ├── mockAlerts.js       # 20 administrative incident dossiers with action history
│   └── mockForecasts.js    # Multi-horizon forecast datasets & predictive maintenance
├── services/
│   ├── simulationService.js # Central simulation engine (tick loop, drift, pause/resume)
│   ├── mockAIService.js     # Vasudha AI Copilot natural query parser
│   ├── mockRouteService.js  # Greedy TSP waste collection route optimizer
│   └── exportService.js     # CSV report generator & print handler
├── context/
│   └── AppContext.jsx       # Central state provider, LocalStorage sync & event dispatchers
├── pages/                   # 15 Complete Navigation Views
│   ├── Overview/            # Executive Command Centre Dashboard
│   ├── CityMap/             # Full GIS Geospatial Map
│   ├── Irrigation/          # Smart Irrigation & Precision Agriculture
│   ├── Waste/               # Waste Logistics & AI Route Planning
│   ├── Traffic/             # Intelligent Traffic & Adaptive Signals
│   ├── Water/               # Potable Water Distribution & SCADA
│   ├── Environment/         # Air Quality CAAQMS Observatory
│   ├── Disaster/            # Flood Hydrology Early Warning
│   ├── Energy/              # Smart Street Lighting Tele-Management
│   ├── Infrastructure/      # Civil Infrastructure Structural Health
│   ├── DeviceManagement/    # Central IoT Device Registry (100 nodes)
│   ├── AIIntelligence/      # AI Forecasting & Anomaly Center
│   ├── Incidents/           # Citizen Grievance & SLA Incident Tracker
│   ├── Reports/             # Executive Reporting & CSV Export
│   └── Settings/            # Demo Role Switcher, Thresholds & State Engine
├── App.jsx                  # Main router & shell wrapper
└── main.jsx                 # React root DOM mounting
```

---

## ⚡ Key Interactive Capabilities

1. **Central Simulation Engine**:
   * Use the Top Navigation widget to **Pause** or **Resume** live telemetry streaming.
   * Adjust simulation speed (1x, 2x, 5x) to observe rapid sensor drift.
   * Tap **Reset Demo State** to instantly restore all 100 devices and tickets to their initial baseline.
2. **AI-Powered Route Optimisation**:
   * Navigate to **Waste Management**, select a collection truck, and click **AI Route Optimisation**.
   * The system evaluates bins with $\ge 75\%$ fill, computes an optimal TSP traversal, calculates distance and fuel saved, and draws the interactive route polyline on the GIS map.
3. **Mandatory Actuator Safety Modal**:
   * In Irrigation, Water, Disaster, or Traffic modules, triggering any physical actuator (pump, flood gate, traffic green extension) opens a **Mandatory Safety Pre-Check Dialog**.
   * Verifies upstream water availability, electrical voltage, and operating thresholds before sending the command ACK.
4. **Vasudha AI Copilot**:
   * Click **AI Copilot** in the top bar to query the district's status in plain language.
   * Try suggested prompts: *"Which zones have critical irrigation?"*, *"Which waste bins may overflow today?"*, or *"Which water monitoring stations show anomalies?"*.
5. **Incident Lifecycle Management**:
   * Move incidents between **New → Acknowledged → Assigned → In Progress → Resolved → Closed**.
   * Reassign nodal officers and departments, add resolution audit notes, or log new citizen grievances.
6. **Executive Export**:
   * In **Reports & Analytics**, generate print-friendly review briefs or export full CSV datasets for both Incident Dossiers and IoT Fleets.

---

## 🔌 Future Real-World Integration Readiness

This proof of concept is architected cleanly to connect to real-world infrastructure:

```
┌───────────────────────────────────────┐
│     FUTURE BACKEND INTEGRATION        │
├───────────────────────────────────────┤
│ 1. IoT Telemetry Service:             │
│    Connect src/services/simulation.js │
│    to an MQTT Broker (EMQX / HiveMQ)  │
│    via MQTT.js / WebSocket.           │
│                                       │
│ 2. AI Inference Microservice:         │
│    Replace src/services/mockAIService │
│    with a FastAPI Python backend      │
│    hosting Llama-3 / Mistral via vLLM.│
│                                       │
│ 3. Database & Time-Series:            │
│    Connect AppContext to PostgreSQL   │
│    with TimescaleDB for telemetry and │
│    PostGIS for geospatial layers.     │
│                                       │
│ 4. SCADA RTU Protocol Gateway:        │
│    Interface actuator commands to     │
│    Modbus-TCP / DNP3 industrial RTUs. │
└───────────────────────────────────────┘
```

---

## 📄 Assessment Task Documentation

The full proposal responding to the candidate brief from Creditfix Group is included in:
* **`DISTRICT_ADMINISTRATION_AI_PROPOSAL.md`**: Complete Part A to Part F proposal covering Stakeholder Discovery, Solution Architecture, Zero-to-100% Roadmap, Risks & Sovereign Compliance, Executive Pitch to the DM, and Objection Handling.

