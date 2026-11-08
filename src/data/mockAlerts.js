// Alerts & Incidents Dataset
// Real-time sensor threshold alerts and administrative incident tickets

export const INCIDENT_STATUSES = [
  { id: "new", label: "New", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "acknowledged", label: "Acknowledged", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { id: "assigned", label: "Assigned", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "in-progress", label: "In Progress", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "resolved", label: "Resolved", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { id: "closed", label: "Closed", color: "bg-slate-100 text-slate-700 border-slate-200" }
];

export const DEPARTMENTS = [
  "Water Resources & Supply",
  "Solid Waste Management",
  "Traffic Police & Transport",
  "Agriculture & Horticulture",
  "Environment & Pollution Control Board",
  "District Disaster Management Authority (DDMA)",
  "Public Works Department (PWD)",
  "Electricity Distribution (DISCOM)"
];

export const INITIAL_INCIDENTS = [
  {
    id: "VSD-INC-101",
    title: "Critical Soil Moisture Deficit - Zone 03 Gomati Agro Beta",
    category: "irrigation",
    severity: "critical", // "critical" | "warning" | "info"
    location: "Gomati Agro Belt Beta, Zone 3",
    zone: "zone-3",
    sourceDevice: "DEV-IRR-002",
    description: "Multi-depth sensor detected 19.4% soil moisture, well below the 30% survival threshold for standing vegetable crops. Automatic pump activation failed due to power trip.",
    department: "Agriculture & Horticulture",
    assignedOfficer: "Dr. K. N. Rao (District Agriculture Officer)",
    createdAt: "Today, 08:15 AM",
    dueDate: "Today, 12:00 PM",
    status: "assigned",
    actionHistory: [
      { timestamp: "08:15 AM", actor: "System IoT Telemetry", action: "Critical Threshold Triggered (19.4% < 30%)" },
      { timestamp: "08:20 AM", actor: "Admin AI Dispatcher", action: "Auto-classified Severity as CRITICAL" },
      { timestamp: "08:45 AM", actor: "Sub-Divisional Magistrate", action: "Acknowledged and Assigned to Dr. K. N. Rao" }
    ],
    recommendedAction: "Execute manual pump bypass or dispatch mobile tanker irrigation unit."
  },
  {
    id: "VSD-INC-102",
    title: "Smart Waste Bin Overflow Imminent - Central Mandi Gate 1",
    category: "waste",
    severity: "critical",
    location: "Central Mandi Gate 1, Zone 2",
    zone: "zone-2",
    sourceDevice: "BIN-001",
    description: "Bin fill level reached 94% with an estimated 35 minutes before physical overflow onto market walkway. Odour index elevated.",
    department: "Solid Waste Management",
    assignedOfficer: "Shri Mohd. Rizwan (Zonal Sanitary Inspector)",
    createdAt: "Today, 09:30 AM",
    dueDate: "Today, 11:00 AM",
    status: "in-progress",
    actionHistory: [
      { timestamp: "09:30 AM", actor: "System IoT Telemetry", action: "Fill Sensor reported 94%" },
      { timestamp: "09:35 AM", actor: "Sanitary Control Room", action: "Dispatched Vehicle UP-32-GV-4011 (Driver: Rameshwar Singh)" }
    ],
    recommendedAction: "Prioritize collection in active route UP-32-GV-4011."
  },
  {
    id: "VSD-INC-103",
    title: "High-Pressure Underground Water Main Leakage Suspected",
    category: "water",
    severity: "critical",
    location: "Central Chowk Trunk Pipeline Section 12, Zone 2",
    zone: "zone-2",
    sourceDevice: "WTR-005",
    description: "Flow rate surged to 610 m3/h while downstream pressure plunged to 2.1 bar. Acoustic cross-correlation algorithm indicates 88% probability of pipe burst.",
    department: "Water Resources & Supply",
    assignedOfficer: "Er. Ramesh Chandra (Executive Engineer, Jal Nigam)",
    createdAt: "Today, 07:45 AM",
    dueDate: "Today, 01:00 PM",
    status: "in-progress",
    actionHistory: [
      { timestamp: "07:45 AM", actor: "AI Pipeline Anomaly Engine", action: "Pressure/Flow Anomaly Detected" },
      { timestamp: "08:00 AM", actor: "Executive Engineer", action: "Reduced upstream valve to 80% and dispatched rapid inspection crew" }
    ],
    recommendedAction: "Isolate Section 12 isolating valve V-12B and dispatch acoustic ground microphone team."
  },
  {
    id: "VSD-INC-104",
    title: "Severe Air Quality Deterioration (AQI 245 - Very Poor)",
    category: "environment",
    severity: "critical",
    location: "Industrial Sector 8 Boundary CAAQMS, Zone 5",
    zone: "zone-5",
    sourceDevice: "ENV-STA-06",
    description: "Continuous monitoring registered PM10 at 230 ug/m3 and SO2 at 44 ppb, exceeding National Ambient Air Quality Standards (NAAQS) for 4 consecutive hours.",
    department: "Environment & Pollution Control Board",
    assignedOfficer: "Ms. Shalini Saxena (Regional Officer, SPCB)",
    createdAt: "Today, 06:00 AM",
    dueDate: "Today, 04:00 PM",
    status: "acknowledged",
    actionHistory: [
      { timestamp: "06:00 AM", actor: "CAAQMS Node", action: "AQI crossed 200 threshold" },
      { timestamp: "07:15 AM", actor: "SPCB Control Room", action: "Notice drafted for industrial boiler compliance check" }
    ],
    recommendedAction: "Deploy anti-smog water mist cannon and inspect industrial stacks in Sector 8."
  },
  {
    id: "VSD-INC-105",
    title: "Rapid Runoff & Water Level Surge at Nallah-3 Storm Basin",
    category: "flood",
    severity: "critical",
    location: "Nallah-3 Urban Storm Outfall Basin, Zone 2",
    zone: "zone-2",
    sourceDevice: "FLD-003",
    description: "Water level rose 14.2 cm/hr to 2.95m (Warning Mark: 3.20m). Silt accumulation reducing retention capacity. Flooding risk for adjacent market basements.",
    department: "District Disaster Management Authority (DDMA)",
    assignedOfficer: "Col. Sanjeev Varma (Disaster Response Officer)",
    createdAt: "Today, 10:10 AM",
    dueDate: "Today, 01:30 PM",
    status: "in-progress",
    actionHistory: [
      { timestamp: "10:10 AM", actor: "Hydrology Radar Gauge", action: "Rate of rise flagged high" },
      { timestamp: "10:15 AM", actor: "DDMA Duty Officer", action: "Started Submersible Dewatering Pumps 1, 2, and 3" }
    ],
    recommendedAction: "Keep 3 dewatering pumps running and verify sluice outfall clearance to Gomati River."
  },
  {
    id: "VSD-INC-106",
    title: "Severe Congestion & Bottleneck at Chowk Clock Tower",
    category: "traffic",
    severity: "warning",
    location: "Chowk Clock Tower Cross (Junction 02), Zone 2",
    zone: "zone-2",
    sourceDevice: "DEV-TRF-SEN-002",
    description: "Traffic density at 92% with average vehicular crawl speed of 14 km/h. Unloading tempos partially obstructing East-West corridor.",
    department: "Traffic Police & Transport",
    assignedOfficer: "Inspector Devendra Singh (Traffic Circle Incharge)",
    createdAt: "Today, 09:00 AM",
    dueDate: "Today, 11:30 AM",
    status: "acknowledged",
    actionHistory: [
      { timestamp: "09:00 AM", actor: "Radar FMCW System", action: "Density exceeded 85%" },
      { timestamp: "09:20 AM", actor: "Traffic Command Center", action: "Extended green phase by 15s dynamically" }
    ],
    recommendedAction: "Dispatch traffic marshals for clearing illegal loading and enforce perimeter diversions."
  },
  {
    id: "VSD-INC-107",
    title: "Streetlight Circuit Breaker Trip on Market Central Ring",
    category: "lighting",
    severity: "warning",
    location: "Market Central Ring Feeder 2, Zone 2",
    zone: "zone-2",
    sourceDevice: "LGT-FDR-04",
    description: "4 streetlamps along column 22-26 failed to power on during automated night diagnostic cycle. Potential underground cable insulation fault.",
    department: "Electricity Distribution (DISCOM)",
    assignedOfficer: "Er. P. C. Joshi (Sub-Divisional Officer, DISCOM)",
    createdAt: "Yesterday, 08:30 PM",
    dueDate: "Today, 06:00 PM",
    status: "assigned",
    actionHistory: [
      { timestamp: "08:30 PM", actor: "Lighting Tele-Management", action: "Non-responsive LED fixture alert" },
      { timestamp: "09:00 AM", actor: "DISCOM Helpdesk", action: "Assigned maintenance van MV-04" }
    ],
    recommendedAction: "Test megger insulation resistance on Phase B underground cable."
  },
  {
    id: "VSD-INC-108",
    title: "Elevated Structural Vibration - Cyber City Flyover Span 7",
    category: "infrastructure",
    severity: "warning",
    location: "Cyber City Expressway Flyover Deck Span 7, Zone 5",
    zone: "zone-5",
    sourceDevice: "INF-AST-04",
    description: "Triaxial MEMS accelerometer recorded transient peak vibrations of 0.038g under heavy freight passages. Expansion joint rubber profile worn.",
    department: "Public Works Department (PWD)",
    assignedEngineer: "Er. Deepak Sharma",
    createdAt: "Yesterday, 04:15 PM",
    dueDate: "Tomorrow, 05:00 PM",
    status: "acknowledged",
    actionHistory: [
      { timestamp: "04:15 PM", actor: "Structural SHM Telemetry", action: "Vibration excursion above baseline 0.025g" },
      { timestamp: "05:00 PM", actor: "Chief Engineer PWD", action: "Scheduled non-destructive ultrasonic testing" }
    ],
    recommendedAction: "Conduct bridge bearing inspection and restrict multi-axle vehicle speed to 30 km/h."
  },
  {
    id: "VSD-INC-109",
    title: "Citizen Grievance: Low Tap Water Pressure in Sector 14",
    category: "water",
    severity: "info",
    location: "South Heights Sector 14 Residential, Zone 6",
    zone: "zone-6",
    sourceDevice: "WTR-009",
    description: "Multiple citizen complaints received via District Samadhan portal regarding low pressure during 06:00-08:00 AM supply window.",
    department: "Water Resources & Supply",
    assignedOfficer: "Er. Amit Bansal (Assistant Engineer, Water Supply)",
    createdAt: "Today, 07:10 AM",
    dueDate: "Tomorrow, 12:00 PM",
    status: "new",
    actionHistory: [
      { timestamp: "07:10 AM", actor: "District Grievance Portal", action: "Grievance #GRV-8821 Registered" }
    ],
    recommendedAction: "Inspect OHT-07 feeder booster valve PRV-9 pressure setting."
  },
  {
    id: "VSD-INC-110",
    title: "Biohazard Medical Waste Bin Collection Due - Civil Hospital",
    category: "waste",
    severity: "warning",
    location: "Civil Hospital OPD Courtyard, Zone 1",
    zone: "zone-1",
    sourceDevice: "BIN-007",
    description: "Biohazard waste container reached 68% and 24 hours elapsed since last certified collection protocol.",
    department: "Solid Waste Management",
    assignedOfficer: "Shri Rajesh Rawat (Driver, Biohazard Fleet)",
    createdAt: "Today, 08:00 AM",
    dueDate: "Today, 02:00 PM",
    status: "in-progress",
    actionHistory: [
      { timestamp: "08:00 AM", actor: "Biohazard Compliance Timer", action: "24-Hour Max Hold Limit Triggered" },
      { timestamp: "08:30 AM", actor: "Hospital Nodal Officer", action: "Dedicated van UP-32-GV-4019 en route" }
    ],
    recommendedAction: "Complete barcoded manifests transfer to Central Incinerator."
  }
];
