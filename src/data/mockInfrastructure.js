// Public Infrastructure Monitoring Dataset
// 20 Strategic Infrastructure Assets in Vasudha Smart District

export const ASSET_TYPES = [
  "Bridges & Flyovers",
  "Heritage & Government Buildings",
  "Storm Drains & Culverts",
  "Road Corridors",
  "Public Water Towers",
  "Transit Terminals"
];

export const INITIAL_INFRA_ASSETS = [
  {
    id: "INF-AST-01",
    name: "Vasudha Cable-Stayed Barrage Bridge Pier 3",
    type: "Bridges & Flyovers",
    zone: "zone-4",
    coordinates: [26.8612, 80.9238],
    conditionGrade: "A", // A = Excellent, B = Good, C = Fair, D = Poor / Critical
    structuralHealthIndex: 96,
    lastInspection: "12 Oct 2024",
    nextInspectionDue: "12 Apr 2025",
    responsibleDept: "Public Works Department (PWD)",
    assignedEngineer: "Er. A. K. Mishra",
    sensorDeviceId: "DEV-INF-SHM-001",
    metrics: {
      peakVibrationG: 0.018,
      tiltDegrees: 0.02,
      microstrain: 142,
      expansionJointMm: 4.8
    },
    activeIssues: 0,
    status: "optimal"
  },
  {
    id: "INF-AST-02",
    name: "Civil Lines Heritage Collectorate Annex Tower",
    type: "Heritage & Government Buildings",
    zone: "zone-1",
    coordinates: [26.8524, 80.9418],
    conditionGrade: "B",
    structuralHealthIndex: 89,
    lastInspection: "04 Aug 2024",
    nextInspectionDue: "04 Feb 2025",
    responsibleDept: "PWD & Heritage Conservation Cell",
    assignedEngineer: "Er. Sunita Pathak",
    sensorDeviceId: "DEV-INF-SHM-002",
    metrics: {
      peakVibrationG: 0.004,
      tiltDegrees: 0.01,
      microstrain: 98,
      crackWidthMm: 0.12
    },
    activeIssues: 1, // Minor cornice surface weathering
    status: "optimal"
  },
  {
    id: "INF-AST-03",
    name: "Chowk Elevated Metro Viaduct Pier 42",
    type: "Bridges & Flyovers",
    zone: "zone-2",
    coordinates: [26.8465, 80.9335],
    conditionGrade: "A",
    structuralHealthIndex: 94,
    lastInspection: "20 Sep 2024",
    nextInspectionDue: "20 Mar 2025",
    responsibleDept: "Metro Rail Corporation & PWD",
    assignedEngineer: "Er. R. K. Srivastava",
    sensorDeviceId: "DEV-INF-SHM-003",
    metrics: {
      peakVibrationG: 0.025,
      tiltDegrees: 0.04,
      microstrain: 168,
      bearingWearPct: 8
    },
    activeIssues: 0,
    status: "optimal"
  },
  {
    id: "INF-AST-04",
    name: "Cyber City Expressway Flyover Deck Span 7",
    type: "Bridges & Flyovers",
    zone: "zone-5",
    coordinates: [26.8298, 80.9528],
    conditionGrade: "C", // Approaching warning
    structuralHealthIndex: 82,
    lastInspection: "15 Jul 2024",
    nextInspectionDue: "15 Jan 2025 (Overdue for review)",
    responsibleDept: "PWD & Expressway Authority",
    assignedEngineer: "Er. Deepak Sharma",
    sensorDeviceId: "DEV-INF-SHM-004",
    metrics: {
      peakVibrationG: 0.038, // Elevated vibration under heavy multi-axle freight
      tiltDegrees: 0.05,
      microstrain: 210,
      expansionJointMm: 9.4
    },
    activeIssues: 1, // Expansion joint elastomer wear
    status: "warning"
  },
  {
    id: "INF-AST-05",
    name: "South Heights Over-Rail Road Bridge Pier 8",
    type: "Bridges & Flyovers",
    zone: "zone-6",
    coordinates: [26.8325, 80.9168],
    conditionGrade: "A",
    structuralHealthIndex: 97,
    lastInspection: "28 Oct 2024",
    nextInspectionDue: "28 Apr 2025",
    responsibleDept: "Indian Railways Joint PWD Cell",
    assignedEngineer: "Er. V. K. Saxena",
    sensorDeviceId: "DEV-INF-SHM-005",
    metrics: {
      peakVibrationG: 0.015,
      tiltDegrees: 0.02,
      microstrain: 120,
      expansionJointMm: 3.2
    },
    activeIssues: 0,
    status: "optimal"
  },
  {
    id: "INF-AST-06",
    name: "Nallah-3 Major Culvert & Retaining Wall",
    type: "Storm Drains & Culverts",
    zone: "zone-2",
    coordinates: [26.8425, 80.9375],
    conditionGrade: "C",
    structuralHealthIndex: 78,
    lastInspection: "18 Jun 2024",
    nextInspectionDue: "18 Dec 2024",
    responsibleDept: "Municipal Corporation Drainage Div",
    assignedEngineer: "Er. Mohan Lal",
    sensorDeviceId: "DEV-FLD-MON-003",
    metrics: {
      siltAccumulationPct: 42,
      wallScourDepthM: 0.35,
      waterLevelM: 2.95
    },
    activeIssues: 1, // Desilting and masonry repointing required
    status: "warning"
  },
  {
    id: "INF-AST-07",
    name: "District Civil Hospital Multi-Specialty Wing",
    type: "Heritage & Government Buildings",
    zone: "zone-1",
    coordinates: [26.8518, 80.9428],
    conditionGrade: "A",
    structuralHealthIndex: 98,
    lastInspection: "02 Nov 2024",
    nextInspectionDue: "02 May 2025",
    responsibleDept: "Health & PWD Electrical/Civil",
    assignedEngineer: "Er. Neha Gupta",
    sensorDeviceId: "DEV-ACT-005",
    metrics: {
      dgSetHealthPct: 100,
      oxygenPlantPressureBar: 4.8,
      fireSafetyCertified: true
    },
    activeIssues: 0,
    status: "optimal"
  },
  {
    id: "INF-AST-08",
    name: "Gomati Agro Canal Aqueduct Sluice 4",
    type: "Storm Drains & Culverts",
    zone: "zone-3",
    coordinates: [26.8715, 80.9665],
    conditionGrade: "B",
    structuralHealthIndex: 91,
    lastInspection: "10 Sep 2024",
    nextInspectionDue: "10 Mar 2025",
    responsibleDept: "Irrigation & Water Resources Dept",
    assignedEngineer: "Er. Pradeep Yadav",
    sensorDeviceId: "DEV-ACT-001",
    metrics: {
      sluiceGearLubrication: "Normal",
      masonryIntegrityPct: 92,
      gateTorqueNm: 480
    },
    activeIssues: 0,
    status: "optimal"
  }
];
