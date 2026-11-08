// Unified AI Intelligence & Forecasting Dataset
// Powers multi-horizon predictive analytics and decision-support for District Officers

export const AI_PREDICTION_HORIZONS = ["1h", "3h", "6h", "12h", "24h"];

export const MULTI_DOMAIN_FORECASTS = {
  irrigation: {
    title: "Soil Moisture & Irrigation Demand Forecast",
    unit: "% Moisture / kL Water",
    metricName: "Average Soil Moisture",
    data: [
      { horizon: "Current", actual: 37.2, predicted: 37.2, baselineLower: 30, baselineUpper: 55 },
      { horizon: "Next 1h", actual: null, predicted: 35.8, baselineLower: 30, baselineUpper: 55 },
      { horizon: "Next 3h", actual: null, predicted: 33.2, baselineLower: 30, baselineUpper: 55 },
      { horizon: "Next 6h", actual: null, predicted: 30.8, baselineLower: 30, baselineUpper: 55 },
      { horizon: "Next 12h", actual: null, predicted: 28.1, baselineLower: 30, baselineUpper: 55 }, // Drops below 30%
      { horizon: "Next 24h", actual: null, predicted: 25.4, baselineLower: 30, baselineUpper: 55 }
    ],
    confidence: 94,
    insight: "Soil moisture in Zone 03 (Gomati Agro Belt Beta) will breach critical 20% limit within 3.5 hours in the absence of irrigation. Expected water requirement: 42 kL."
  },
  waste: {
    title: "Waste Bin Overflow Probability & Volume Demand",
    unit: "% Fill Level",
    metricName: "Commercial Hotspot Average Fill",
    data: [
      { horizon: "Current", actual: 86.4, predicted: 86.4, threshold: 90 },
      { horizon: "Next 1h", actual: null, predicted: 89.1, threshold: 90 },
      { horizon: "Next 3h", actual: null, predicted: 94.6, threshold: 90 }, // Overflow
      { horizon: "Next 6h", actual: null, predicted: 98.2, threshold: 90 },
      { horizon: "Next 12h", actual: null, predicted: 100.0, threshold: 90 },
      { horizon: "Next 24h", actual: null, predicted: 100.0, threshold: 90 }
    ],
    confidence: 91,
    insight: "3 smart bins in Zone 02 (Central Mandi & Clocktower) are forecast to reach 95%+ capacity before 14:00. Dynamic route dispatch recommended to avoid public spillage."
  },
  traffic: {
    title: "Traffic Congestion & Density Peak Prediction",
    unit: "% Density",
    metricName: "Chowk Corridor Density",
    data: [
      { horizon: "Current", actual: 84.0, predicted: 84.0, severeLevel: 85 },
      { horizon: "Next 1h", actual: null, predicted: 88.5, severeLevel: 85 },
      { horizon: "Next 3h", actual: null, predicted: 95.2, severeLevel: 85 }, // Evening peak surge
      { horizon: "Next 6h", actual: null, predicted: 82.0, severeLevel: 85 },
      { horizon: "Next 12h", actual: null, predicted: 35.0, severeLevel: 85 },
      { horizon: "Next 24h", actual: null, predicted: 78.0, severeLevel: 85 }
    ],
    confidence: 89,
    insight: "Chowk Clock Tower & Metro Flyover intersections will enter gridlock conditions between 17:30 and 19:30 due to festival market rush. Recommended 20s green light extension on East-West arm."
  },
  water: {
    title: "District Potable Water Demand & Reservoir Storage",
    unit: "Million Litres (ML)",
    metricName: "Hourly District Demand",
    data: [
      { horizon: "Current", actual: 6.8, predicted: 6.8, supplyCapacity: 8.5 },
      { horizon: "Next 1h", actual: null, predicted: 7.2, supplyCapacity: 8.5 },
      { horizon: "Next 3h", actual: null, predicted: 8.4, supplyCapacity: 8.5 },
      { horizon: "Next 6h", actual: null, predicted: 7.8, supplyCapacity: 8.5 },
      { horizon: "Next 12h", actual: null, predicted: 3.5, supplyCapacity: 8.5 },
      { horizon: "Next 24h", actual: null, predicted: 7.0, supplyCapacity: 8.5 }
    ],
    confidence: 96,
    insight: "Evening municipal water demand surge expected between 18:00 - 20:30. Overhead reservoir OHT-03 requires 45 mins pre-filling cycle from District Lake Reservoir."
  },
  environment: {
    title: "Air Quality Index (AQI) 24-Hour Forecast",
    unit: "AQI Index",
    metricName: "District Average AQI",
    data: [
      { horizon: "Current", actual: 136, predicted: 136, moderateMax: 100, poorLevel: 200 },
      { horizon: "Next 1h", actual: null, predicted: 142, moderateMax: 100, poorLevel: 200 },
      { horizon: "Next 3h", actual: null, predicted: 168, moderateMax: 100, poorLevel: 200 },
      { horizon: "Next 6h", actual: null, predicted: 192, moderateMax: 100, poorLevel: 200 },
      { horizon: "Next 12h", actual: null, predicted: 215, moderateMax: 100, poorLevel: 200 }, // Winter temperature inversion
      { horizon: "Next 24h", actual: null, predicted: 148, moderateMax: 100, poorLevel: 200 }
    ],
    confidence: 88,
    insight: "Stagnant nocturnal wind (under 5 km/h) and thermal inversion will trap industrial particulates in Zone 5, elevating AQI above 200. Targeted anti-smog water spraying advised."
  },
  energy: {
    title: "Grid Load & Smart Lighting Power Consumption",
    unit: "kW Demand",
    metricName: "Total Streetlight Load",
    data: [
      { horizon: "Current", actual: 18, predicted: 18, peakRating: 140 },
      { horizon: "Next 1h", actual: null, predicted: 22, peakRating: 140 },
      { horizon: "Next 3h", actual: null, predicted: 118, peakRating: 140 }, // Sunset lighting switch-on
      { horizon: "Next 6h", actual: null, predicted: 84, peakRating: 140 }, // Midnight auto-dimming
      { horizon: "Next 12h", actual: null, predicted: 20, peakRating: 140 },
      { horizon: "Next 24h", actual: null, predicted: 18, peakRating: 140 }
    ],
    confidence: 97,
    insight: "Automated astronomical dimming schedule will cut midnight peak energy from 120 kW to 62 kW, yielding daily power savings of ~1,140 kWh across 1,450 fixtures."
  }
};

export const INITIAL_AI_RECOMMENDATIONS = [
  {
    id: "REC-AI-01",
    category: "Smart Irrigation",
    domain: "irrigation",
    priority: "HIGH",
    confidencePct: 94,
    forecastPeriod: "Next 3.5 Hours",
    problem: "Soil moisture in Gomati Agro Belt Beta (Zone 3) forecast to plummet to 17.5%, crossing critical stress limits for standing vegetable saplings.",
    supportingData: "Current Reading: 19.4% (Threshold: 30%) | Evapotranspiration: 4.8 mm/day | Ambient Temp: 30.2°C",
    recommendedAction: "Activate Irrigation Pump DEV-ACT-002 for 45 minutes (approx 54 kL). Estimated water recovery will restore moisture to 44%.",
    actionType: "actuator_irrigation",
    targetDevice: "DEV-ACT-002",
    department: "Agriculture & Horticulture",
    reviewed: false,
    dismissed: false
  },
  {
    id: "REC-AI-02",
    category: "Waste Logistics",
    domain: "waste",
    priority: "HIGH",
    confidencePct: 92,
    forecastPeriod: "Next 2 Hours",
    problem: "Waste bins in Central Mandi and Clocktower are filling at 3.8% per hour and will hit 100% overflow during peak afternoon bazaar trade.",
    supportingData: "BIN-001 (94% full), BIN-002 (91% full), BIN-003 (88% full) | Estimated public footfall: 14,000",
    recommendedAction: "Reroute compactor truck UP-32-GV-4011 currently 600m away with 1.2 Tons remaining capacity to execute immediate unscheduled clearance.",
    actionType: "route_dispatch",
    targetVehicle: "VEH-WST-01",
    department: "Solid Waste Management",
    reviewed: false,
    dismissed: false
  },
  {
    id: "REC-AI-03",
    category: "Traffic Optimization",
    domain: "traffic",
    priority: "HIGH",
    confidencePct: 89,
    forecastPeriod: "Evening Peak (17:30 - 19:30)",
    problem: "Chowk Clock Tower Cross (Junction 02) will suffer gridlock with queue lengths exceeding 320 metres.",
    supportingData: "Current Density: 92% | Flow: 125 vehicles/min | Upstream delay: +14 mins vs benchmark",
    recommendedAction: "Apply Adaptive Green Split: increase East-West phase by 18 seconds and alert Traffic Police to restrict heavy vehicle entry from Metro junction.",
    actionType: "signal_adjustment",
    targetJunction: "TRF-INT-02",
    department: "Traffic Police & Transport",
    reviewed: false,
    dismissed: false
  },
  {
    id: "REC-AI-04",
    category: "Water Network Integrity",
    domain: "water",
    priority: "CRITICAL",
    confidencePct: 88,
    forecastPeriod: "Immediate",
    problem: "Hydraulic pressure divergence detected in Central Chowk Trunk Pipeline Section 12.",
    supportingData: "Discharge: 610 m3/h (+28%) | Pressure: 2.1 bar (-1.3 bar drop) | Acoustic leak confidence: 88%",
    recommendedAction: "Dispatch leak detection van with acoustic correlator to Section 12 and throttle upstream isolation valve V-12B by 20% to mitigate road washout risk.",
    actionType: "incident_dispatch",
    targetDevice: "WTR-005",
    department: "Water Resources & Supply",
    reviewed: false,
    dismissed: false
  },
  {
    id: "REC-AI-05",
    category: "Environmental Mitigation",
    domain: "environment",
    priority: "MEDIUM",
    confidencePct: 85,
    forecastPeriod: "Next 12 Hours",
    problem: "Industrial Sector 8 CAAQMS station shows continuous NAAQS exceedance with PM10 reaching 230 ug/m3.",
    supportingData: "AQI: 245 (Very Poor) | Wind: 8.0 km/h SW towards South Heights residential sector",
    recommendedAction: "Deploy municipal Anti-Smog Mobile Cannon No. 3 along Industrial Sector 8 arterial road and issue automated stack verification notice to 4 foundry units.",
    actionType: "deploy_cannon",
    targetDevice: "ENV-STA-06",
    department: "Pollution Control Board",
    reviewed: false,
    dismissed: false
  },
  {
    id: "REC-AI-06",
    category: "Disaster Preparedness",
    domain: "flood",
    priority: "HIGH",
    confidencePct: 91,
    forecastPeriod: "Next 4 Hours",
    problem: "Nallah-3 Urban Storm Outfall water level rising at 14.2 cm/hr following localized storm discharge.",
    supportingData: "Current Level: 2.95m (Warning: 3.20m) | Freeboard margin: 25 cm | Gomati River Backwater Level: Normal",
    recommendedAction: "Keep 3 storm dewatering pumps in continuous forced cycle and open barrage relief gate 5 by 20% to accelerate river discharge.",
    actionType: "flood_actuator",
    targetDevice: "FLD-003",
    department: "DDMA & Drainage Dept",
    reviewed: false,
    dismissed: false
  }
];

export const PREDICTIVE_MAINTENANCE_LIST = [
  {
    deviceId: "DEV-ACT-002",
    deviceName: "Irrigation Solenoid Valve & Pump 2",
    category: "Smart Irrigation",
    location: "Gomati Agro Belt Beta",
    healthScore: 68,
    riskLevel: "HIGH",
    failureMode: "Pump motor stator overheating & intermittent contactor chatter",
    predictedTimeToFailure: "48 - 72 hours",
    recommendation: "Inspect thermal overload relay and verify pump impellor clearance."
  },
  {
    deviceId: "INF-AST-04",
    deviceName: "Cyber City Expressway Flyover Deck Span 7",
    category: "Infrastructure",
    location: "Cyber City Expressway",
    healthScore: 74,
    riskLevel: "MEDIUM",
    failureMode: "Elastomeric bridge expansion joint degradation under heavy freight loads",
    predictedTimeToFailure: "14 - 21 days",
    recommendation: "Replace elastomeric seal and conduct acoustic non-destructive bridge test."
  },
  {
    deviceId: "LGT-FDR-04",
    deviceName: "Market Central Ring Feeder 2",
    category: "Smart Streetlights",
    location: "Central Market Zone 2",
    healthScore: 71,
    riskLevel: "MEDIUM",
    failureMode: "Phase B underground armored cable insulation breakdown",
    predictedTimeToFailure: "5 - 7 days",
    recommendation: "Perform cable fault locator thumping test on column 22-26 segment."
  },
  {
    deviceId: "DEV-WTR-MON-005",
    deviceName: "Water Monitor - Central Chowk Line",
    category: "Water Supply",
    location: "Central Chowk Trunk Pipeline",
    healthScore: 65,
    riskLevel: "HIGH",
    failureMode: "Ultrasonic transducer transducer calibration drift due to pipe turbulence",
    predictedTimeToFailure: "36 hours",
    recommendation: "Field recalibration with portable Doppler clamp-on meter."
  }
];

