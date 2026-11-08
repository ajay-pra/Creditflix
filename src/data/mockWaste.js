// Smart Waste Management Dataset
// 50 Smart Bins & 10 Municipal Fleet Vehicles in Vasudha Smart District

export const BIN_TYPES = [
  { id: "biodegradable", name: "Organic / Wet Waste", color: "#16a34a" },
  { id: "recyclable", name: "Dry Recyclables", color: "#2563eb" },
  { id: "hazardous", name: "Sanitary / Hazardous", color: "#dc2626" },
  { id: "general", name: "General Mixed", color: "#64748b" }
];

// Generates 50 Smart Bins across the 6 zones
export const generateInitialWasteBins = () => {
  const bins = [];
  const baseLocations = [
    { name: "Central Mandi Gate 1", zone: "zone-2", lat: 26.8455, lng: 80.9340, fill: 94, type: "biodegradable" },
    { name: "Central Mandi Fish Market", zone: "zone-2", lat: 26.8450, lng: 80.9345, fill: 91, type: "biodegradable" },
    { name: "Heritage Chowk Clocktower", zone: "zone-2", lat: 26.8440, lng: 80.9360, fill: 88, type: "recyclable" },
    { name: "Chowk Street Food Lane", zone: "zone-2", lat: 26.8445, lng: 80.9352, fill: 86, type: "biodegradable" },
    { name: "Metro Interchange East Gate", zone: "zone-2", lat: 26.8468, lng: 80.9325, fill: 72, type: "general" },
    { name: "Metro Terminal Bus Bay", zone: "zone-2", lat: 26.8472, lng: 80.9332, fill: 78, type: "recyclable" },
    { name: "Civil Hospital OPD Courtyard", zone: "zone-1", lat: 26.8515, lng: 80.9430, fill: 68, type: "hazardous" },
    { name: "Civil Hospital Emergency Lane", zone: "zone-1", lat: 26.8510, lng: 80.9425, fill: 42, type: "hazardous" },
    { name: "Collectorate East Wing Gate", zone: "zone-1", lat: 26.8528, lng: 80.9415, fill: 45, type: "general" },
    { name: "Municipal HQ Public Lawn", zone: "zone-1", lat: 26.8535, lng: 80.9405, fill: 35, type: "biodegradable" },
    { name: "Cyber City Food Court 2", zone: "zone-5", lat: 26.8290, lng: 80.9540, fill: 82, type: "biodegradable" },
    { name: "Cyber City Tower C Plaza", zone: "zone-5", lat: 26.8298, lng: 80.9548, fill: 55, type: "recyclable" },
    { name: "Industrial Complex Sector 8 Hub", zone: "zone-5", lat: 26.8315, lng: 80.9570, fill: 51, type: "hazardous" },
    { name: "Industrial Estate Factory Row 3", zone: "zone-5", lat: 26.8328, lng: 80.9585, fill: 40, type: "general" },
    { name: "University North Gate", zone: "zone-6", lat: 26.8360, lng: 80.9220, fill: 34, type: "recyclable" },
    { name: "University Canteen Courtyard", zone: "zone-6", lat: 26.8368, lng: 80.9212, fill: 64, type: "biodegradable" },
    { name: "Sector 14 Residential Market", zone: "zone-6", lat: 26.8340, lng: 80.9180, fill: 79, type: "general" },
    { name: "Sector 14 Community Park", zone: "zone-6", lat: 26.8335, lng: 80.9192, fill: 38, type: "biodegradable" },
    { name: "Riverfront Promenade Ghat 1", zone: "zone-4", lat: 26.8590, lng: 80.9260, fill: 40, type: "recyclable" },
    { name: "Riverfront Barrage Walkway", zone: "zone-4", lat: 26.8605, lng: 80.9245, fill: 31, type: "general" }
  ];

  // Seed 50 bins by expanding around key clusters
  for (let i = 1; i <= 50; i++) {
    const base = baseLocations[(i - 1) % baseLocations.length];
    const offsetLat = ((i * 17) % 25 - 12) * 0.0006;
    const offsetLng = ((i * 29) % 25 - 12) * 0.0006;
    const fill = Math.min(98, Math.max(12, Math.round(base.fill + ((i * 13) % 22 - 10))));

    let status = "normal";
    if (fill >= 90) status = "critical";
    else if (fill >= 75) status = "warning";

    const hoursToOverflow = fill >= 90 ? +(0.5 + ((i % 3) * 0.5)).toFixed(1) : Math.round((100 - fill) / 3.5);

    bins.push({
      id: `BIN-${String(i).padStart(3, "0")}`,
      name: `${base.name} - Hub ${Math.floor((i - 1) / 5) + 1}`,
      zone: base.zone,
      type: base.type,
      coordinates: [+(base.lat + offsetLat).toFixed(5), +(base.lng + offsetLng).toFixed(5)],
      fillLevel: fill,
      capacityLiters: 1100,
      status: status,
      hoursToOverflow: hoursToOverflow,
      batteryPct: 95 - (i % 20),
      lastCollected: `${(i % 18) + 2} hours ago`,
      lidOpen: false,
      needsCollection: fill >= 75
    });
  }
  return bins;
};

// 10 Garbage Collection Fleet Vehicles
export const INITIAL_VEHICLES = [
  {
    id: "VEH-WST-01",
    regNumber: "UP-32-GV-4011",
    driverName: "Rameshwar Singh",
    phone: "+91 98390 12041",
    vehicleType: "Compactor Truck (12 Cu.M)",
    capacityTons: 8.0,
    currentLoadTons: 6.8,
    loadPct: 85,
    status: "in-transit", // "in-transit" | "collecting" | "idle" | "at-depot"
    assignedZone: "zone-2",
    coordinates: [26.8458, 80.9345],
    speedKmph: 18,
    assignedBinsCount: 8,
    completedBinsCount: 5,
    nextStop: "BIN-001 (Central Mandi Gate 1)",
    fuelBatteryPct: 68
  },
  {
    id: "VEH-WST-02",
    regNumber: "UP-32-GV-4012",
    driverName: "Satish Kumar",
    phone: "+91 98390 12042",
    vehicleType: "Electric Tipper (4 Cu.M)",
    capacityTons: 3.5,
    currentLoadTons: 2.1,
    loadPct: 60,
    status: "collecting",
    assignedZone: "zone-2",
    coordinates: [26.8442, 80.9358],
    speedKmph: 0,
    assignedBinsCount: 6,
    completedBinsCount: 3,
    nextStop: "BIN-003 (Heritage Chowk)",
    fuelBatteryPct: 82
  },
  {
    id: "VEH-WST-03",
    regNumber: "UP-32-GV-4013",
    driverName: "Mohd. Aslam",
    phone: "+91 98390 12043",
    vehicleType: "Compactor Truck (12 Cu.M)",
    capacityTons: 8.0,
    currentLoadTons: 3.4,
    loadPct: 42,
    status: "in-transit",
    assignedZone: "zone-1",
    coordinates: [26.8520, 80.9422],
    speedKmph: 24,
    assignedBinsCount: 7,
    completedBinsCount: 4,
    nextStop: "BIN-007 (Civil Hospital)",
    fuelBatteryPct: 74
  },
  {
    id: "VEH-WST-04",
    regNumber: "UP-32-GV-4014",
    driverName: "Dinesh Yadav",
    phone: "+91 98390 12044",
    vehicleType: "Electric Tipper (4 Cu.M)",
    capacityTons: 3.5,
    currentLoadTons: 0.8,
    loadPct: 22,
    status: "in-transit",
    assignedZone: "zone-5",
    coordinates: [26.8292, 80.9542],
    speedKmph: 32,
    assignedBinsCount: 5,
    completedBinsCount: 1,
    nextStop: "BIN-011 (Cyber City Food Court)",
    fuelBatteryPct: 90
  },
  {
    id: "VEH-WST-05",
    regNumber: "UP-32-GV-4015",
    driverName: "Arun Tiwari",
    phone: "+91 98390 12045",
    vehicleType: "Compactor Truck (12 Cu.M)",
    capacityTons: 8.0,
    currentLoadTons: 5.2,
    loadPct: 65,
    status: "in-transit",
    assignedZone: "zone-6",
    coordinates: [26.8342, 80.9185],
    speedKmph: 20,
    assignedBinsCount: 6,
    completedBinsCount: 4,
    nextStop: "BIN-017 (Sector 14 Market)",
    fuelBatteryPct: 58
  },
  {
    id: "VEH-WST-06",
    regNumber: "UP-32-GV-4016",
    driverName: "Gurpreet Singh",
    phone: "+91 98390 12046",
    vehicleType: "Hook Loader (16 Cu.M)",
    capacityTons: 10.0,
    currentLoadTons: 7.9,
    loadPct: 79,
    status: "in-transit",
    assignedZone: "zone-4",
    coordinates: [26.8595, 80.9258],
    speedKmph: 28,
    assignedBinsCount: 4,
    completedBinsCount: 3,
    nextStop: "Vasudha Solid Waste Transfer Station",
    fuelBatteryPct: 64
  },
  {
    id: "VEH-WST-07",
    regNumber: "UP-32-GV-4017",
    driverName: "Prakash Verma",
    phone: "+91 98390 12047",
    vehicleType: "Electric Tipper (4 Cu.M)",
    capacityTons: 3.5,
    currentLoadTons: 0.0,
    loadPct: 0,
    status: "idle",
    assignedZone: "zone-1",
    coordinates: [26.8540, 80.9410],
    speedKmph: 0,
    assignedBinsCount: 0,
    completedBinsCount: 0,
    nextStop: "Central Depot Standby",
    fuelBatteryPct: 96
  },
  {
    id: "VEH-WST-08",
    regNumber: "UP-32-GV-4018",
    driverName: "Vinod Pandey",
    phone: "+91 98390 12048",
    vehicleType: "Electric Tipper (4 Cu.M)",
    capacityTons: 3.5,
    currentLoadTons: 0.0,
    loadPct: 0,
    status: "idle",
    assignedZone: "zone-5",
    coordinates: [26.8310, 80.9560],
    speedKmph: 0,
    assignedBinsCount: 0,
    completedBinsCount: 0,
    nextStop: "Tech Park Depot Standby",
    fuelBatteryPct: 98
  },
  {
    id: "VEH-WST-09",
    regNumber: "UP-32-GV-4019",
    driverName: "Rajesh Rawat",
    phone: "+91 98390 12049",
    vehicleType: "Bio-Medical Waste Van",
    capacityTons: 2.5,
    currentLoadTons: 1.6,
    loadPct: 64,
    status: "collecting",
    assignedZone: "zone-1",
    coordinates: [26.8512, 80.9428],
    speedKmph: 0,
    assignedBinsCount: 4,
    completedBinsCount: 2,
    nextStop: "BIN-008 (Civil Hospital Biohazard Annex)",
    fuelBatteryPct: 80
  },
  {
    id: "VEH-WST-10",
    regNumber: "UP-32-GV-4020",
    driverName: "Manoj Chaurasia",
    phone: "+91 98390 12050",
    vehicleType: "Hook Loader (16 Cu.M)",
    capacityTons: 10.0,
    currentLoadTons: 9.8,
    loadPct: 98,
    status: "at-depot",
    assignedZone: "zone-3",
    coordinates: [26.8680, 80.9630],
    speedKmph: 0,
    assignedBinsCount: 5,
    completedBinsCount: 5,
    nextStop: "Compost & Biogas Processing Facility",
    fuelBatteryPct: 45
  }
];
