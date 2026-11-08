// Creditfix District Administration - Geographic Zones & Coordinates
// Fictional demonstration district modeled after a large Indian district collectorate headquarters
// Built for Creditfix Group – Applied AI Engineer Assessment Task

export const DISTRICT_INFO = {
  name: "Creditfix District Administration",
  code: "CFX-DIST-01",
  state: "Creditfix AI Benchmark District",
  center: [26.8500, 80.9400],
  zoom: 13,
  adminHeadquarters: "Office of the District Magistrate & Collectorate HQ, Zone 1",
  totalAreaSqKm: 420.5,
  population: "1,845,000",
  lastCensus: "2024 (Est.)",
  activeIoTNodes: 284,
  assessmentProject: "Creditfix Group – Applied AI Engineer Practical Assessment",
  disclaimer: "Demonstration prototype for Creditfix Group Applied AI Engineer practical assessment."
};

export const DISTRICT_ZONES = [
  {
    id: "zone-1",
    name: "Zone 1: Civil Lines & DM Collectorate HQ",
    code: "Z1-CIVIL",
    type: "Administrative & Collectorate Secretariat",
    center: [26.8520, 80.9420],
    color: "#2563eb",
    areaKm2: 45.2,
    population: "140,000",
    keyLandmarks: [
      "District Magistrate Office (DM Secretariat)",
      "Collectorate Record Room & e-Daftar",
      "District Civil Hospital",
      "Senior Superintendent of Police (SSP) HQ"
    ],
    healthScore: 98,
    activeAlerts: 1
  },
  {
    id: "zone-2",
    name: "Zone 2: Sadar Tehsil & Central Market Hub",
    code: "Z2-TRADE",
    type: "High-Density Commercial & Revenue Tehsil",
    center: [26.8450, 80.9350],
    color: "#d97706",
    areaKm2: 32.8,
    population: "380,000",
    keyLandmarks: [
      "Sadar Tehsil Revenue Court",
      "Central Wholesale Mandi",
      "Heritage Commercial Bazaar",
      "Inter-modal Transport Terminal"
    ],
    healthScore: 84,
    activeAlerts: 4
  },
  {
    id: "zone-3",
    name: "Zone 3: Rural Agro & Irrigation Belt (Block A)",
    code: "Z3-AGRO",
    type: "Rural Agriculture & Krishi Seva Kendra",
    center: [26.8700, 80.9650],
    color: "#059669",
    areaKm2: 124.6,
    population: "195,000",
    keyLandmarks: [
      "Community Model Farm Cluster",
      "District Seed Nursery & Soil Testing Lab",
      "Block Development Office (BDO)",
      "Irrigation Canal Sluice SG-04"
    ],
    healthScore: 91,
    activeAlerts: 2
  },
  {
    id: "zone-4",
    name: "Zone 4: Riverfront & Drainage Basin Corridor",
    code: "Z4-RIVER",
    type: "Gomati River Basin, Lowland & Drainage Outfall",
    center: [26.8600, 80.9250],
    color: "#0284c7",
    areaKm2: 58.4,
    population: "210,000",
    keyLandmarks: [
      "District Barrage & Water Regulating Headworks",
      "River Hydro Gauging Pylon 02",
      "North Storm Drainage Outfall Pumping Station",
      "Riverfront Promenade"
    ],
    healthScore: 88,
    activeAlerts: 2
  },
  {
    id: "zone-5",
    name: "Zone 5: Industrial Estate & IT Tech Park",
    code: "Z5-INDUS",
    type: "Manufacturing, Warehousing & IT Corridors",
    center: [26.8300, 80.9550],
    color: "#7c3aed",
    areaKm2: 78.5,
    population: "290,000",
    keyLandmarks: [
      "Creditfix Tech Park",
      "Industrial Growth Center Phase-II",
      "220kV Main Grid Substation"
    ],
    healthScore: 86,
    activeAlerts: 3
  },
  {
    id: "zone-6",
    name: "Zone 6: Outer Residential & Education Sector",
    code: "Z6-URBAN",
    type: "Planned Residential & Education Campus",
    center: [26.8350, 80.9200],
    color: "#475569",
    areaKm2: 81.0,
    population: "630,000",
    keyLandmarks: [
      "District University & Medical College",
      "District Sports Complex",
      "Overhead Water Reservoir OHT-07"
    ],
    healthScore: 94,
    activeAlerts: 1
  }
];
