// Smart Water & Distribution Network Dataset
// 10 Monitoring Points & Pumping Stations in Vasudha Smart District

export const INITIAL_WATER_POINTS = [
  {
    id: "WTR-001",
    name: "Vasudha Lake Primary Reservoir",
    type: "Raw Water Reservoir",
    zone: "zone-4",
    coordinates: [26.8620, 80.9230],
    levelPct: 84.5,
    capacityMillionLiters: 1450,
    currentStorageML: 1225.2,
    inflowRateM3h: 1850,
    outflowRateM3h: 1420,
    ph: 7.2,
    turbidityNtu: 3.2,
    tdsPpm: 210,
    status: "optimal",
    pumpActive: true,
    targetLevelPct: 80
  },
  {
    id: "WTR-002",
    name: "North Basin Water Treatment Plant (WTP-1)",
    type: "Treatment & Clarification Plant",
    zone: "zone-4",
    coordinates: [26.8650, 80.9270],
    levelPct: 91.0,
    capacityMillionLiters: 320,
    currentStorageML: 291.2,
    inflowRateM3h: 1420,
    outflowRateM3h: 1380,
    ph: 7.4,
    turbidityNtu: 0.8, // Potable standard < 1.0 NTU
    chlorineResidualMgL: 0.55,
    tdsPpm: 185,
    status: "optimal",
    pumpActive: true,
    targetLevelPct: 85
  },
  {
    id: "WTR-003",
    name: "Civil Lines Overhead Reservoir OHT-01",
    type: "Elevated Storage Reservoir",
    zone: "zone-1",
    coordinates: [26.8540, 80.9440],
    levelPct: 78.0,
    capacityMillionLiters: 45,
    currentStorageML: 35.1,
    inflowRateM3h: 420,
    outflowRateM3h: 390,
    ph: 7.3,
    turbidityNtu: 0.6,
    chlorineResidualMgL: 0.48,
    status: "optimal",
    pumpActive: false,
    valveOpenPct: 75
  },
  {
    id: "WTR-004",
    name: "Collectorate Feeder Pipeline DM-A4",
    type: "Ductile Iron Transmission Main",
    zone: "zone-1",
    coordinates: [26.8510, 80.9395],
    pressureBar: 3.4, // Normal range 3.0 - 4.5 bar
    flowRateM3h: 380,
    leakageProbabilityPct: 4,
    status: "optimal",
    valveOpenPct: 90
  },
  {
    id: "WTR-005",
    name: "Central Chowk Trunk Pipeline Section 12",
    type: "High-Density Urban Main (Old Cast Iron)",
    zone: "zone-2",
    coordinates: [26.8435, 80.9370],
    pressureBar: 2.1, // Pressure drop! Anomaly!
    flowRateM3h: 610, // Flow divergence (+28% expected)
    leakageProbabilityPct: 88, // AI flag: Potential underground pipe burst
    status: "anomaly",
    valveOpenPct: 80,
    alertNote: "Significant pressure drop with sudden flow spike detected between Node 12A and 12B"
  },
  {
    id: "WTR-006",
    name: "Chowk Commercial OHT-03",
    type: "Elevated Storage Reservoir",
    zone: "zone-2",
    coordinates: [26.8460, 80.9338],
    levelPct: 52.0,
    capacityMillionLiters: 50,
    currentStorageML: 26.0,
    inflowRateM3h: 310,
    outflowRateM3h: 440,
    ph: 7.1,
    turbidityNtu: 1.1,
    status: "warning",
    pumpActive: true,
    valveOpenPct: 100
  },
  {
    id: "WTR-007",
    name: "Cyber City Booster Pumping Station",
    type: "High-Lift Booster Pump House",
    zone: "zone-5",
    coordinates: [26.8310, 80.9530],
    pressureBar: 4.2,
    flowRateM3h: 540,
    status: "optimal",
    pumpActive: true,
    valveOpenPct: 85
  },
  {
    id: "WTR-008",
    name: "Industrial Estate Effluent Return Line",
    type: "Dedicated Industrial Feed & Flow Meter",
    zone: "zone-5",
    coordinates: [26.8325, 80.9575],
    pressureBar: 3.8,
    flowRateM3h: 410,
    ph: 7.0,
    turbidityNtu: 1.4,
    status: "optimal",
    pumpActive: false,
    valveOpenPct: 70
  },
  {
    id: "WTR-009",
    name: "South Heights Overhead Reservoir OHT-07",
    type: "Elevated Storage Reservoir",
    zone: "zone-6",
    coordinates: [26.8335, 80.9220],
    levelPct: 64.0,
    capacityMillionLiters: 65,
    currentStorageML: 41.6,
    inflowRateM3h: 390,
    outflowRateM3h: 360,
    ph: 7.2,
    turbidityNtu: 0.7,
    status: "optimal",
    pumpActive: false,
    valveOpenPct: 80
  },
  {
    id: "WTR-010",
    name: "South Bypass Feeder Junction PRV-9",
    type: "Smart Pressure Regulating Station",
    zone: "zone-6",
    coordinates: [26.8315, 80.9165],
    pressureBar: 3.6,
    flowRateM3h: 310,
    status: "optimal",
    valveOpenPct: 75
  }
];

export const HOURLY_WATER_CONSUMPTION = [
  { hour: "04:00", demandML: 1.8, pressureAvg: 4.1 },
  { hour: "06:00", demandML: 6.2, pressureAvg: 3.5 }, // Morning supply surge
  { hour: "08:00", demandML: 8.9, pressureAvg: 3.2 },
  { hour: "10:00", demandML: 5.4, pressureAvg: 3.7 },
  { hour: "12:00", demandML: 4.1, pressureAvg: 3.9 },
  { hour: "14:00", demandML: 3.8, pressureAvg: 3.9 },
  { hour: "16:00", demandML: 4.5, pressureAvg: 3.8 },
  { hour: "18:00", demandML: 7.4, pressureAvg: 3.4 }, // Evening supply surge
  { hour: "20:00", demandML: 8.1, pressureAvg: 3.3 },
  { hour: "22:00", demandML: 3.2, pressureAvg: 4.0 },
];

