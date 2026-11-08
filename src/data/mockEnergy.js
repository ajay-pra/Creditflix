// Energy & Smart Street Lighting Dataset
// 30 Smart Feeder Panels managing 1,450 LED fixtures in Creditfix District Administration

export const INITIAL_LIGHTING_SUMMARY = {
  totalFixtures: 1450,
  activeFixtures: 1438,
  faultyFixtures: 12,
  operationalAvailabilityPct: 99.17,
  totalEnergyTodayKwh: 3420,
  energySavedTodayKwh: 1140, // 25% saved via automated dimming & PIR sensors
  estimatedCostSavedInr: 9120,
  currentGridLoadKw: 18.4, // daytime standby load
  currentOperatingMode: "Astronomical Auto-Dimming",
  sunsetScheduledTime: "17:48",
  sunriseScheduledTime: "06:14"
};

export const INITIAL_LIGHTING_FEEDERS = [
  {
    id: "LGT-FDR-01",
    name: "Collectorate Avenue Feeder Panel 1",
    zone: "zone-1",
    coordinates: [26.8520, 80.9410],
    totalLamps: 85,
    activeLamps: 85,
    faultyLamps: 0,
    state: "OFF", // daytime
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5200,
    energyTodayKwh: 184.2,
    voltageV: 232.4,
    powerFactor: 0.98,
    status: "optimal"
  },
  {
    id: "LGT-FDR-02",
    name: "Civil Lines Boulevard Feeder 2",
    zone: "zone-1",
    coordinates: [26.8535, 80.9425],
    totalLamps: 92,
    activeLamps: 92,
    faultyLamps: 0,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5150,
    energyTodayKwh: 210.5,
    voltageV: 231.8,
    powerFactor: 0.97,
    status: "optimal"
  },
  {
    id: "LGT-FDR-03",
    name: "Chowk Heritage Walkway Feeder 1",
    zone: "zone-2",
    coordinates: [26.8445, 80.9350],
    totalLamps: 74,
    activeLamps: 74,
    faultyLamps: 0,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 4800,
    energyTodayKwh: 162.8,
    voltageV: 228.6,
    powerFactor: 0.96,
    status: "optimal"
  },
  {
    id: "LGT-FDR-04",
    name: "Market Central Ring Feeder 2",
    zone: "zone-2",
    coordinates: [26.8460, 80.9365],
    totalLamps: 110,
    activeLamps: 106,
    faultyLamps: 4, // 4 non-responsive fixtures
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 4950,
    energyTodayKwh: 245.0,
    voltageV: 226.2,
    powerFactor: 0.94,
    status: "warning",
    faultNote: "Phase B breaker trip on Lamp Column 22 to 26"
  },
  {
    id: "LGT-FDR-05",
    name: "Riverfront Promenade Solar-Hybrid Feeder",
    zone: "zone-4",
    coordinates: [26.8590, 80.9250],
    totalLamps: 140,
    activeLamps: 140,
    faultyLamps: 0,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5600,
    energyTodayKwh: 312.0,
    voltageV: 234.0,
    powerFactor: 0.99,
    status: "optimal"
  },
  {
    id: "LGT-FDR-06",
    name: "Cyber City Expressway High-Mast Feeder",
    zone: "zone-5",
    coordinates: [26.8295, 80.9535],
    totalLamps: 125,
    activeLamps: 125,
    faultyLamps: 0,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5400,
    energyTodayKwh: 380.4,
    voltageV: 230.1,
    powerFactor: 0.97,
    status: "optimal"
  },
  {
    id: "LGT-FDR-07",
    name: "Industrial Road Arterial Feeder 4",
    zone: "zone-5",
    coordinates: [26.8310, 80.9575],
    totalLamps: 95,
    activeLamps: 93,
    faultyLamps: 2,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5100,
    energyTodayKwh: 215.8,
    voltageV: 227.8,
    powerFactor: 0.95,
    status: "warning"
  },
  {
    id: "LGT-FDR-08",
    name: "South Heights Boulevard Feeder 1",
    zone: "zone-6",
    coordinates: [26.8345, 80.9205],
    totalLamps: 88,
    activeLamps: 88,
    faultyLamps: 0,
    state: "OFF",
    brightnessPct: 0,
    mode: "auto",
    ambientLux: 5300,
    energyTodayKwh: 198.6,
    voltageV: 232.0,
    powerFactor: 0.98,
    status: "optimal"
  }
];

export const HOURLY_ENERGY_CONSUMPTION = [
  { hour: "17:00", activeLoadKw: 15, expectedLoadKw: 15, ambientLux: 1800 },
  { hour: "18:00", activeLoadKw: 95, expectedLoadKw: 120, ambientLux: 200 }, // Lights on (100% brightness)
  { hour: "20:00", activeLoadKw: 120, expectedLoadKw: 125, ambientLux: 0 },
  { hour: "22:00", activeLoadKw: 85, expectedLoadKw: 120, ambientLux: 0 }, // Dimming to 70%
  { hour: "00:00", activeLoadKw: 62, expectedLoadKw: 120, ambientLux: 0 }, // Dimming to 50% midnight
  { hour: "02:00", activeLoadKw: 60, expectedLoadKw: 120, ambientLux: 0 },
  { hour: "04:00", activeLoadKw: 60, expectedLoadKw: 120, ambientLux: 0 },
  { hour: "06:00", activeLoadKw: 35, expectedLoadKw: 60, ambientLux: 450 }, // Sunrise switch-off
];

