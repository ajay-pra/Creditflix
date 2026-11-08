// Disaster & Flood Early Warning Dataset
// 5 Hydrological & Flood Risk Stations in Creditfix District Administration

export const INITIAL_FLOOD_STATIONS = [
  {
    id: "FLD-001",
    name: "District Barrage River Pylon Station",
    zone: "zone-4",
    coordinates: [26.8615, 80.9235],
    waterLevelMeters: 4.82,
    warningLevelMeters: 6.00,
    dangerLevelMeters: 7.20,
    riverBedMeters: 1.20,
    rateOfRiseCmHr: 2.1,
    dischargeRateCusecs: 2150,
    floodRiskLevel: "LOW", // "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
    sluiceGatesOpen: 4,
    totalSluiceGates: 12,
    sirenArmed: true,
    drainagePumpsRunning: 1,
    totalDrainagePumps: 4,
    status: "optimal",
    lastInspection: "Yesterday, 16:00"
  },
  {
    id: "FLD-002",
    name: "North Gomati Flood Warning Gauging Post",
    zone: "zone-4",
    coordinates: [26.8660, 80.9280],
    waterLevelMeters: 5.12,
    warningLevelMeters: 5.80,
    dangerLevelMeters: 6.80,
    riverBedMeters: 1.00,
    rateOfRiseCmHr: 3.5,
    dischargeRateCusecs: 2480,
    floodRiskLevel: "MODERATE",
    sluiceGatesOpen: 2,
    totalSluiceGates: 6,
    sirenArmed: true,
    drainagePumpsRunning: 2,
    totalDrainagePumps: 4,
    status: "warning",
    lastInspection: "Today, 06:00"
  },
  {
    id: "FLD-003",
    name: "Nallah-3 Urban Storm Outfall Basin",
    zone: "zone-2",
    coordinates: [26.8420, 80.9380],
    waterLevelMeters: 2.95, // Near warning 3.20m
    warningLevelMeters: 3.20,
    dangerLevelMeters: 4.00,
    riverBedMeters: 0.40,
    rateOfRiseCmHr: 14.2, // Fast urban runoff
    dischargeRateCusecs: 840,
    floodRiskLevel: "HIGH",
    sluiceGatesOpen: 3,
    totalSluiceGates: 4,
    sirenArmed: true,
    drainagePumpsRunning: 3, // Pumping active!
    totalDrainagePumps: 4,
    status: "critical",
    lastInspection: "Today, 11:30"
  },
  {
    id: "FLD-004",
    name: "Industrial Sector Culvert Inundation Node",
    zone: "zone-5",
    coordinates: [26.8280, 80.9560],
    waterLevelMeters: 1.40,
    warningLevelMeters: 2.50,
    dangerLevelMeters: 3.50,
    riverBedMeters: 0.20,
    rateOfRiseCmHr: 1.0,
    dischargeRateCusecs: 310,
    floodRiskLevel: "LOW",
    sluiceGatesOpen: 1,
    totalSluiceGates: 2,
    sirenArmed: false,
    drainagePumpsRunning: 0,
    totalDrainagePumps: 2,
    status: "optimal",
    lastInspection: "3 days ago"
  },
  {
    id: "FLD-005",
    name: "Lowland Agricultural Bund Gauging Post",
    zone: "zone-3",
    coordinates: [26.8720, 80.9670],
    waterLevelMeters: 3.25,
    warningLevelMeters: 4.50,
    dangerLevelMeters: 5.50,
    riverBedMeters: 0.80,
    rateOfRiseCmHr: 2.4,
    dischargeRateCusecs: 690,
    floodRiskLevel: "LOW",
    sluiceGatesOpen: 2,
    totalSluiceGates: 4,
    sirenArmed: false,
    drainagePumpsRunning: 1,
    totalDrainagePumps: 3,
    status: "optimal",
    lastInspection: "Yesterday, 14:00"
  }
];

export const HOURLY_RIVER_LEVELS = [
  { hour: "00:00", barrageMeters: 4.60, stormDrainMeters: 1.80, rainfallMm: 0 },
  { hour: "03:00", barrageMeters: 4.65, stormDrainMeters: 1.85, rainfallMm: 0 },
  { hour: "06:00", barrageMeters: 4.70, stormDrainMeters: 2.10, rainfallMm: 2.5 },
  { hour: "09:00", barrageMeters: 4.75, stormDrainMeters: 2.45, rainfallMm: 6.8 }, // Rain event upstream
  { hour: "12:00", barrageMeters: 4.82, stormDrainMeters: 2.95, rainfallMm: 4.2 },
  { hour: "15:00", barrageMeters: 4.90, stormDrainMeters: 2.70, rainfallMm: 0.5 },
  { hour: "18:00", barrageMeters: 4.85, stormDrainMeters: 2.30, rainfallMm: 0 },
  { hour: "21:00", barrageMeters: 4.80, stormDrainMeters: 2.05, rainfallMm: 0 },
];

