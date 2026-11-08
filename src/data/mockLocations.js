// Vasudha Smart District - Geographic Zones & Coordinates
// Fictional demonstration district modeled after a riverside administrative district headquarters

export const DISTRICT_INFO = {
  name: "Vasudha Smart District",
  code: "VSD-01",
  state: "Demonstration State",
  center: [26.8500, 80.9400],
  zoom: 13,
  adminHeadquarters: "District Collectorate & Municipal Corporation, Zone 1",
  totalAreaSqKm: 420.5,
  population: "1,845,000",
  lastCensus: "2024 (Est.)",
  activeIoTNodes: 284,
  disclaimer: "Fictional demonstration district for executive command and IoT simulation."
};

export const DISTRICT_ZONES = [
  {
    id: "zone-1",
    name: "Zone 1: Civil Lines & Collectorate",
    code: "Z1-CIVIL",
    type: "Administrative & Institutional",
    center: [26.8520, 80.9420],
    color: "#2563eb",
    areaKm2: 45.2,
    population: "140,000",
    keyLandmarks: ["District Magistrate Office", "Municipal Corporation HQ", "District Civil Hospital", "Police Commission"],
    healthScore: 98,
    activeAlerts: 1
  },
  {
    id: "zone-2",
    name: "Zone 2: Central Chowk & Trade Hub",
    code: "Z2-TRADE",
    type: "High-Density Commercial & Historic Market",
    center: [26.8450, 80.9350],
    color: "#d97706",
    areaKm2: 32.8,
    population: "380,000",
    keyLandmarks: ["Central Grain & Wholesale Mandi", "Heritage Market", "Metro Inter-modal Terminal"],
    healthScore: 84,
    activeAlerts: 4
  },
  {
    id: "zone-3",
    name: "Zone 3: Gomati Agro & Green Belt",
    code: "Z3-AGRO",
    type: "Peri-urban Agriculture & Green Infrastructure",
    center: [26.8700, 80.9650],
    color: "#059669",
    areaKm2: 124.6,
    population: "195,000",
    keyLandmarks: ["Community Farm Cluster A & B", "District Seed Nursery", "Kisan Krishi Kendra", "Canal Sluice 4"],
    healthScore: 91,
    activeAlerts: 2
  },
  {
    id: "zone-4",
    name: "Zone 4: Riverfront & Floodplain Corridor",
    code: "Z4-RIVER",
    type: "River Basin, Lowland & Drainage Outfall",
    center: [26.8600, 80.9250],
    color: "#0284c7",
    areaKm2: 58.4,
    population: "210,000",
    keyLandmarks: ["Vasudha Barrage", "River Gauging Pylon 02", "North Storm Drainage Outfall", "Promenade Park"],
    healthScore: 88,
    activeAlerts: 2
  },
  {
    id: "zone-5",
    name: "Zone 5: IT Corridor & Industrial Estate",
    code: "Z5-INDUS",
    type: "Light Manufacturing & IT Parks",
    center: [26.8300, 80.9550],
    color: "#7c3aed",
    areaKm2: 78.5,
    population: "290,000",
    keyLandmarks: ["Vasudha Cyber City", "Industrial Growth Center Phase-II", "Grid Substation 220kV"],
    healthScore: 86,
    activeAlerts: 3
  },
  {
    id: "zone-6",
    name: "Zone 6: South Heights & Urban Sectors",
    code: "Z6-URBAN",
    type: "Planned Residential & Education City",
    center: [26.8350, 80.9200],
    color: "#475569",
    areaKm2: 81.0,
    population: "630,000",
    keyLandmarks: ["District University Campus", "Sector 14 Sports Complex", "Overhead Reservoir OHT-07"],
    healthScore: 94,
    activeAlerts: 1
  }
];

