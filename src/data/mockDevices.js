// Central Device Registry - 100 IoT Devices across Creditfix District Administration
// All devices have coherent IDs, coordinates within district zones, connectivity, and telemetry

export const DEVICE_CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Cpu' },
  { id: 'irrigation', name: 'Smart Irrigation', icon: 'Sprout', color: 'emerald' },
  { id: 'waste', name: 'Waste Management', icon: 'Trash2', color: 'amber' },
  { id: 'traffic', name: 'Traffic & Transit', icon: 'Car', color: 'orange' },
  { id: 'water', name: 'Water & Reservoirs', icon: 'Droplets', color: 'cyan' },
  { id: 'environment', name: 'Environment & AQI', icon: 'Wind', color: 'teal' },
  { id: 'flood', name: 'Disaster & Flood', icon: 'AlertTriangle', color: 'rose' },
  { id: 'lighting', name: 'Smart Streetlights', icon: 'Lightbulb', color: 'yellow' },
  { id: 'infrastructure', name: 'Infrastructure Assets', icon: 'Building2', color: 'indigo' },
];

export const CONNECTIVITY_TYPES = ['LoRaWAN', '4G/NB-IoT', 'Fiber-IoT', 'Zigbee 3.0'];

// Generates 100 realistic devices mapped to district zones
export const generateInitialDevices = () => {
  const devices = [];
  
  // 1. Irrigation Devices (12 nodes)
  const irrigationZones = [
    { zone: 'zone-3', name: 'Gomati Agro Belt Alpha', coords: [26.8710, 80.9630] },
    { zone: 'zone-3', name: 'Gomati Agro Belt Beta', coords: [26.8680, 80.9680] },
    { zone: 'zone-3', name: 'District Seedling Nursery', coords: [26.8740, 80.9610] },
    { zone: 'zone-3', name: 'Horticulture Research Plot', coords: [26.8650, 80.9710] },
    { zone: 'zone-1', name: 'Civil Lines Public Park Greens', coords: [26.8530, 80.9410] },
    { zone: 'zone-6', name: 'South Heights Urban Forest', coords: [26.8370, 80.9230] }
  ];

  irrigationZones.forEach((z, idx) => {
    // Sensor node
    devices.push({
      id: `DEV-IRR-${String(idx + 1).padStart(3, '0')}`,
      name: `Soil & Microclimate Node ${idx + 1}`,
      category: 'irrigation',
      type: 'Multi-depth Soil Sensor (10cm/30cm)',
      zone: z.zone,
      locationName: z.name,
      coordinates: z.coords,
      connectivity: 'LoRaWAN',
      battery: 88 - (idx * 4),
      signalStrength: -68 - (idx * 2), // dBm
      status: idx === 1 ? 'warning' : 'online',
      health: idx === 1 ? 'Needs Calibration' : 'Optimal',
      firmwareVersion: 'v2.4.1',
      lastCommunication: '2 mins ago',
      telemetry: {
        soilMoisture: idx === 1 ? 19.4 : 42.5 - (idx * 3), // %
        soilTemp: 24.8 + (idx * 0.4), // °C
        ambientTemp: 29.2,
        ambientHumidity: 64,
        rainfallRecent: 0
      }
    });

    // Actuator node (Pumps / Smart Solenoids)
    devices.push({
      id: `DEV-ACT-${String(idx + 1).padStart(3, '0')}`,
      name: `Irrigation Solenoid Valve & Pump ${idx + 1}`,
      category: 'irrigation',
      type: 'Motorized Solenoid Actuator',
      zone: z.zone,
      locationName: `${z.name} - Pump House`,
      coordinates: [z.coords[0] + 0.001, z.coords[1] + 0.001],
      connectivity: '4G/NB-IoT',
      battery: 100, // Grid powered
      signalStrength: -62,
      status: idx === 0 ? 'online' : 'standby',
      health: 'Optimal',
      firmwareVersion: 'v3.1.0',
      lastCommunication: '1 min ago',
      isActuator: true,
      actuatorState: {
        power: idx === 0, // pump 1 is ON
        mode: 'auto', // 'auto' | 'manual'
        flowRateLpm: idx === 0 ? 120 : 0,
        runTimeMins: idx === 0 ? 45 : 0
      }
    });
  });

  // 2. Smart Waste Bins & Fleet (16 devices)
  const wasteLocations = [
    { name: 'Central Mandi Gate 1', zone: 'zone-2', coords: [26.8455, 80.9340], fill: 94, status: 'critical' },
    { name: 'Heritage Chowk Clocktower', zone: 'zone-2', coords: [26.8440, 80.9360], fill: 88, status: 'warning' },
    { name: 'Metro Interchange Plaza', zone: 'zone-2', coords: [26.8468, 80.9325], fill: 72, status: 'online' },
    { name: 'Civil Hospital OPD Courtyard', zone: 'zone-1', coords: [26.8515, 80.9430], fill: 68, status: 'online' },
    { name: 'District Collectorate East Wing', zone: 'zone-1', coords: [26.8528, 80.9415], fill: 45, status: 'online' },
    { name: 'Cyber City Food Court 2', zone: 'zone-5', coords: [26.8290, 80.9540], fill: 82, status: 'warning' },
    { name: 'Industrial Complex Sector 8', zone: 'zone-5', coords: [26.8315, 80.9570], fill: 51, status: 'online' },
    { name: 'University Main Gate North', zone: 'zone-6', coords: [26.8360, 80.9220], fill: 34, status: 'online' },
    { name: 'Sector 14 Residential Market', zone: 'zone-6', coords: [26.8340, 80.9180], fill: 79, status: 'warning' },
    { name: 'Riverfront Promenade Ghat', zone: 'zone-4', coords: [26.8590, 80.9260], fill: 40, status: 'online' }
  ];

  wasteLocations.forEach((w, idx) => {
    devices.push({
      id: `DEV-WST-BIN-${String(idx + 1).padStart(3, '0')}`,
      name: `Smart Bin - ${w.name}`,
      category: 'waste',
      type: 'Ultrasonic Time-of-Flight Level Sensor',
      zone: w.zone,
      locationName: w.name,
      coordinates: w.coords,
      connectivity: 'LoRaWAN',
      battery: 92 - (idx * 3),
      signalStrength: -72 - (idx * 2),
      status: w.status,
      health: w.fill >= 90 ? 'Overflow Risk' : 'Optimal',
      firmwareVersion: 'v1.8.2',
      lastCommunication: '3 mins ago',
      telemetry: {
        fillLevel: w.fill,
        temperature: 28.5,
        lidStatus: 'Closed',
        tiltAngle: 1.2,
        odourIndex: w.fill > 80 ? 'Elevated' : 'Normal',
        lastEmptied: '14 hours ago'
      }
    });
  });

  // 3. Traffic Sensors & Intersections (14 devices)
  const trafficJunctions = [
    { name: 'Collectorate Circle (Junction 01)', zone: 'zone-1', coords: [26.8522, 80.9405], density: 65, vpm: 78, speed: 38 },
    { name: 'Chowk Clock Tower Cross (Junction 02)', zone: 'zone-2', coords: [26.8448, 80.9355], density: 92, vpm: 125, speed: 14 },
    { name: 'Metro Station Flyover (Junction 03)', zone: 'zone-2', coords: [26.8475, 80.9330], density: 84, vpm: 108, speed: 19 },
    { name: 'Riverfront Barrage Bridge Head (Junction 04)', zone: 'zone-4', coords: [26.8610, 80.9240], density: 48, vpm: 54, speed: 45 },
    { name: 'Cyber City Expressway Toll (Junction 05)', zone: 'zone-5', coords: [26.8285, 80.9520], density: 89, vpm: 132, speed: 22 },
    { name: 'Industrial Sector 8 Crossway (Junction 06)', zone: 'zone-5', coords: [26.8330, 80.9580], density: 56, vpm: 68, speed: 40 },
    { name: 'University Campus Rotary (Junction 07)', zone: 'zone-6', coords: [26.8365, 80.9210], density: 42, vpm: 50, speed: 48 },
    { name: 'South Ring Road Bypass (Junction 08)', zone: 'zone-6', coords: [26.8320, 80.9160], density: 73, vpm: 94, speed: 32 }
  ];

  trafficJunctions.forEach((j, idx) => {
    // AI Radar / Camera Sensor
    devices.push({
      id: `DEV-TRF-SEN-${String(idx + 1).padStart(3, '0')}`,
      name: `AI Traffic Radar - ${j.name}`,
      category: 'traffic',
      type: '77GHz FMCW Radar & ANPR Camera',
      zone: j.zone,
      locationName: j.name,
      coordinates: j.coords,
      connectivity: 'Fiber-IoT',
      battery: 100,
      signalStrength: -50,
      status: j.density > 85 ? 'warning' : 'online',
      health: 'Optimal',
      firmwareVersion: 'v4.0.5',
      lastCommunication: 'Live (0.8s)',
      telemetry: {
        trafficDensity: j.density,
        vehiclesPerMinute: j.vpm,
        avgSpeedKmph: j.speed,
        congestionLevel: j.density > 85 ? 'Severe' : j.density > 70 ? 'Heavy' : 'Moderate',
        pedestrianCount: Math.round(j.vpm * 0.4)
      }
    });

    // Traffic Signal Controller (Actuator)
    devices.push({
      id: `DEV-TRF-SIG-${String(idx + 1).padStart(3, '0')}`,
      name: `Adaptive Signal Controller - ${j.name}`,
      category: 'traffic',
      type: 'ATCS SCATS-Compatible Signal Controller',
      zone: j.zone,
      locationName: `${j.name} Signal Box`,
      coordinates: [j.coords[0] + 0.0005, j.coords[1] + 0.0005],
      connectivity: 'Fiber-IoT',
      battery: 100,
      signalStrength: -48,
      status: 'online',
      health: 'Optimal',
      firmwareVersion: 'v2.9.1',
      lastCommunication: 'Live',
      isActuator: true,
      actuatorState: {
        currentPhase: idx % 2 === 0 ? 'GREEN' : 'RED',
        remainingSeconds: 24,
        cycleDurationSec: 90,
        mode: 'auto', // 'auto' | 'manual'
        manualGreenExtension: false
      }
    });
  });

  // 4. Smart Water Distribution & Quality (14 devices)
  const waterPoints = [
    { name: 'District Lake Reservoir Intake', zone: 'zone-4', coords: [26.8620, 80.9230], level: 84.5, flow: 1250, pH: 7.2, ntu: 3.2 },
    { name: 'North Basin Water Treatment Plant', zone: 'zone-4', coords: [26.8650, 80.9270], level: 91.0, flow: 980, pH: 7.4, ntu: 1.1 },
    { name: 'Civil Lines Overhead Tank OHT-01', zone: 'zone-1', coords: [26.8540, 80.9440], level: 78.0, flow: 420, pH: 7.3, ntu: 0.9 },
    { name: 'Collectorate Pressure Regulating Valve', zone: 'zone-1', coords: [26.8510, 80.9395], level: 0, flow: 380, pressure: 3.4 },
    { name: 'Central Chowk High-Yield Distribution Line', zone: 'zone-2', coords: [26.8435, 80.9370], level: 0, flow: 610, pressure: 2.1, anomaly: true },
    { name: 'Cyber City Booster Pump Station', zone: 'zone-5', coords: [26.8310, 80.9530], level: 82.0, flow: 540, pressure: 4.1 },
    { name: 'South Heights OHT-07 Reservoir', zone: 'zone-6', coords: [26.8335, 80.9220], level: 64.0, flow: 390, pH: 7.1, ntu: 1.4 }
  ];

  waterPoints.forEach((w, idx) => {
    // Water Telemetry Node
    devices.push({
      id: `DEV-WTR-MON-${String(idx + 1).padStart(3, '0')}`,
      name: `Water Monitor - ${w.name}`,
      category: 'water',
      type: 'Multi-parameter Water Quality & Ultrasonic Flow',
      zone: w.zone,
      locationName: w.name,
      coordinates: w.coords,
      connectivity: '4G/NB-IoT',
      battery: 95,
      signalStrength: -65,
      status: w.anomaly ? 'warning' : 'online',
      health: w.anomaly ? 'Pressure Loss Anomaly' : 'Optimal',
      firmwareVersion: 'v3.3.4',
      lastCommunication: '1 min ago',
      telemetry: {
        levelPct: w.level,
        flowRateM3h: w.flow,
        pressureBar: w.pressure || 3.8,
        ph: w.pH || 7.2,
        turbidityNtu: w.ntu || 1.2,
        chlorineResidualMgL: 0.45
      }
    });

    // Booster Pump / Sluice Valve Actuator
    devices.push({
      id: `DEV-WTR-VAL-${String(idx + 1).padStart(3, '0')}`,
      name: `Motorized Valve / Pump Controller - ${w.name}`,
      category: 'water',
      type: 'Industrial SCADA Remote Terminal Unit (RTU)',
      zone: w.zone,
      locationName: `${w.name} - Control Chamber`,
      coordinates: [w.coords[0] + 0.0008, w.coords[1] + 0.0008],
      connectivity: 'Fiber-IoT',
      battery: 100,
      signalStrength: -55,
      status: 'online',
      health: 'Optimal',
      firmwareVersion: 'v4.1.0',
      lastCommunication: 'Live',
      isActuator: true,
      actuatorState: {
        pumpActive: idx < 3,
        valveOpenPct: 85,
        targetPressureBar: 3.5,
        mode: 'auto'
      }
    });
  });

  // 5. Environment & Air Quality Stations (8 stations)
  const envStations = [
    { name: 'Civil Lines Central Monitoring Mast', zone: 'zone-1', coords: [26.8525, 80.9412], aqi: 124, pm25: 48, pm10: 95 },
    { name: 'Chowk Commercial Transit AQI Node', zone: 'zone-2', coords: [26.8452, 80.9348], aqi: 218, pm25: 112, pm10: 198, status: 'critical' },
    { name: 'Gomati Green Agri-Observatory', zone: 'zone-3', coords: [26.8690, 80.9640], aqi: 62, pm25: 18, pm10: 42, status: 'online' },
    { name: 'Riverfront Promenade Weather Station', zone: 'zone-4', coords: [26.8595, 80.9255], aqi: 88, pm25: 32, pm10: 68 },
    { name: 'Cyber City Tech Park AQI Mast', zone: 'zone-5', coords: [26.8305, 80.9545], aqi: 178, pm25: 84, pm10: 154, status: 'warning' },
    { name: 'Industrial Sector 8 Stack Boundary', zone: 'zone-5', coords: [26.8322, 80.9590], aqi: 245, pm25: 135, pm10: 230, status: 'critical' },
    { name: 'University Botanical Gardens', zone: 'zone-6', coords: [26.8355, 80.9215], aqi: 74, pm25: 24, pm10: 52 },
    { name: 'South Heights Residential Sector 14', zone: 'zone-6', coords: [26.8330, 80.9175], aqi: 105, pm25: 41, pm10: 82 }
  ];

  envStations.forEach((e, idx) => {
    devices.push({
      id: `DEV-ENV-STA-${String(idx + 1).padStart(3, '0')}`,
      name: `Continuous Ambient AQI Station - ${e.name}`,
      category: 'environment',
      type: 'Laser Particle Counter & Multi-Gas Spectrometry',
      zone: e.zone,
      locationName: e.name,
      coordinates: e.coords,
      connectivity: '4G/NB-IoT',
      battery: 100, // Solar + grid
      signalStrength: -60,
      status: e.status || (e.aqi > 150 ? 'warning' : 'online'),
      health: e.aqi > 200 ? 'Severe Pollution' : 'Optimal',
      firmwareVersion: 'v2.6.0',
      lastCommunication: 'Live (5s)',
      telemetry: {
        aqi: e.aqi,
        pm25: e.pm25,
        pm10: e.pm10,
        no2: Math.round(e.aqi * 0.35),
        so2: Math.round(e.aqi * 0.18),
        co: +(e.aqi * 0.012).toFixed(1),
        o3: 42,
        noiseDb: 54 + (idx * 3),
        tempC: 28.4,
        humidityPct: 62,
        windSpeedKmph: 11.2,
        windDirection: 'NW'
      }
    });
  });

  // 6. Disaster & Flood Monitoring (10 devices)
  const floodStations = [
    { name: 'District Barrage River Pylon', zone: 'zone-4', coords: [26.8615, 80.9235], level: 4.8, warn: 6.0, danger: 7.2 },
    { name: 'North Gomati Flood Warning Gauging Post', zone: 'zone-4', coords: [26.8660, 80.9280], level: 5.1, warn: 5.8, danger: 6.8 },
    { name: 'Nallah-3 Urban Storm Outfall Basin', zone: 'zone-2', coords: [26.8420, 80.9380], level: 2.9, warn: 3.2, danger: 4.0, status: 'warning' },
    { name: 'Industrial Sector Culvert Inundation Sensor', zone: 'zone-5', coords: [26.8280, 80.9560], level: 1.4, warn: 2.5, danger: 3.5 },
    { name: 'Lowland Agricultural Bund Gauging Post', zone: 'zone-3', coords: [26.8720, 80.9670], level: 3.2, warn: 4.5, danger: 5.5 }
  ];

  floodStations.forEach((f, idx) => {
    // Ultrasonic river gauge
    devices.push({
      id: `DEV-FLD-MON-${String(idx + 1).padStart(3, '0')}`,
      name: `Flood Hydrology Gauge - ${f.name}`,
      category: 'flood',
      type: 'Radar Water Level & Discharge Doppler Profiler',
      zone: f.zone,
      locationName: f.name,
      coordinates: f.coords,
      connectivity: '4G/NB-IoT',
      battery: 98,
      signalStrength: -64,
      status: f.status || 'online',
      health: f.status === 'warning' ? 'Approaching Warning Level' : 'Normal Streamflow',
      firmwareVersion: 'v3.0.1',
      lastCommunication: '1 min ago',
      telemetry: {
        waterLevelMeters: f.level,
        warningThresholdMeters: f.warn,
        dangerThresholdMeters: f.danger,
        dischargeRateCusecs: Math.round(f.level * 420),
        rateOfRiseCmHr: idx === 2 ? 14 : 2,
        statusLabel: f.level >= f.warn ? 'WARNING' : 'SAFE'
      }
    });

    // Flood Barrier / Storm Drainage Pump Actuator
    devices.push({
      id: `DEV-FLD-ACT-${String(idx + 1).padStart(3, '0')}`,
      name: `High-Capacity Storm Pump & Sluice Gate ${idx + 1}`,
      category: 'flood',
      type: 'Heavy Hydraulic Sluice Gate & Submersible Dewatering Pump',
      zone: f.zone,
      locationName: `${f.name} - Dewatering Pumping Station`,
      coordinates: [f.coords[0] + 0.0006, f.coords[1] + 0.0006],
      connectivity: 'Fiber-IoT',
      battery: 100,
      signalStrength: -52,
      status: 'online',
      health: 'Standby Ready',
      firmwareVersion: 'v4.5.0',
      lastCommunication: 'Live',
      isActuator: true,
      actuatorState: {
        pumpRunning: idx === 2, // Running at Nallah 3
        gatePositionPct: 75,
        sirenArmed: true,
        mode: 'auto'
      }
    });
  });

  // 7. Smart Street Lighting (16 controllers, managing 1,450 fixtures)
  const lightingFeeders = [
    { name: 'Collectorate Avenue Feeder Panel 1', zone: 'zone-1', coords: [26.8520, 80.9410], lights: 85, status: 'online' },
    { name: 'Civil Lines Boulevard Feeder 2', zone: 'zone-1', coords: [26.8535, 80.9425], lights: 92, status: 'online' },
    { name: 'Chowk Heritage Walkway Feeder 1', zone: 'zone-2', coords: [26.8445, 80.9350], lights: 74, status: 'online' },
    { name: 'Market Central Ring Feeder 2', zone: 'zone-2', coords: [26.8460, 80.9365], lights: 110, status: 'warning', faulty: 4 },
    { name: 'Riverfront Promenade Solar-Hybrid Feeder', zone: 'zone-4', coords: [26.8590, 80.9250], lights: 140, status: 'online' },
    { name: 'Cyber City Expressway High-Mast Feeder', zone: 'zone-5', coords: [26.8295, 80.9535], lights: 125, status: 'online' },
    { name: 'Industrial Road Arterial Feeder 4', zone: 'zone-5', coords: [26.8310, 80.9575], lights: 95, status: 'online' },
    { name: 'South Heights Boulevard Feeder 1', zone: 'zone-6', coords: [26.8345, 80.9205], lights: 88, status: 'online' }
  ];

  lightingFeeders.forEach((l, idx) => {
    // Energy / Lux telemetry node
    devices.push({
      id: `DEV-LGT-MON-${String(idx + 1).padStart(3, '0')}`,
      name: `Lighting Meter & Lux Sensor - ${l.name}`,
      category: 'lighting',
      type: 'Three-Phase Smart Energy Meter & Daylight Lux Photodiode',
      zone: l.zone,
      locationName: l.name,
      coordinates: l.coords,
      connectivity: '4G/NB-IoT',
      battery: 100,
      signalStrength: -66,
      status: l.status,
      health: l.faulty ? `${l.faulty} Lamps Non-Responsive` : 'Optimal',
      firmwareVersion: 'v2.2.0',
      lastCommunication: 'Live',
      telemetry: {
        totalLamps: l.lights,
        activeLamps: l.faulty ? l.lights - l.faulty : l.lights,
        faultyLamps: l.faulty || 0,
        currentDrawAmps: 34.2,
        powerFactor: 0.96,
        ambientLux: 4500, // daytime
        dailyEnergyKwh: 312.4
      }
    });

    // Dimming & Relay Actuator
    devices.push({
      id: `DEV-LGT-ACT-${String(idx + 1).padStart(3, '0')}`,
      name: `Smart Lighting Dimming Controller - ${l.name}`,
      category: 'lighting',
      type: 'DALI / 0-10V Dimming Tele-management Controller',
      zone: l.zone,
      locationName: `${l.name} - Feeder Pillar`,
      coordinates: [l.coords[0] + 0.0004, l.coords[1] + 0.0004],
      connectivity: '4G/NB-IoT',
      battery: 100,
      signalStrength: -62,
      status: 'online',
      health: 'Optimal',
      firmwareVersion: 'v3.0.0',
      lastCommunication: 'Live',
      isActuator: true,
      actuatorState: {
        powerState: false, // OFF during day
        dimmingLevelPct: 0,
        mode: 'auto', // 'auto' (astronomical clock + lux) | 'manual'
        schedule: 'Sunset to Sunrise Adaptive'
      }
    });
  });

  // 8. Public Infrastructure Health Sensors (10 devices)
  const infraAssets = [
    { name: 'District Cable-Stayed Barrage Bridge Pier 3', zone: 'zone-4', coords: [26.8612, 80.9238], type: 'Bridge Structural Health', vib: 0.018, tilt: 0.02 },
    { name: 'Civil Lines Heritage Collectorate Annex Tower', zone: 'zone-1', coords: [26.8524, 80.9418], type: 'Historic Building Tilt & Crack', vib: 0.004, tilt: 0.01 },
    { name: 'Chowk Elevated Metro Viaduct Pier 42', zone: 'zone-2', coords: [26.8465, 80.9335], type: 'Mass Transit Viaduct Strain', vib: 0.025, tilt: 0.04 },
    { name: 'Cyber City Expressway Flyover Deck Span 7', zone: 'zone-5', coords: [26.8298, 80.9528], type: 'Expressway Flyover Expansion Joint', vib: 0.038, tilt: 0.05, warning: true },
    { name: 'South Heights Over-Rail Road Bridge Pier 8', zone: 'zone-6', coords: [26.8325, 80.9168], type: 'Rail Over-Bridge Structural Health', vib: 0.015, tilt: 0.02 }
  ];

  infraAssets.forEach((a, idx) => {
    // SHM node
    devices.push({
      id: `DEV-INF-SHM-${String(idx + 1).padStart(3, '0')}`,
      name: `Structural Health Telemetry - ${a.name}`,
      category: 'infrastructure',
      type: 'Triaxial MEMS Accelerometer & Vibrating Wire Strain Gauge',
      zone: a.zone,
      locationName: a.name,
      coordinates: a.coords,
      connectivity: 'Fiber-IoT',
      battery: 100,
      signalStrength: -54,
      status: a.warning ? 'warning' : 'online',
      health: a.warning ? 'Vibration Frequency Deviation' : 'Structural Grade A',
      firmwareVersion: 'v2.8.4',
      lastCommunication: 'Live',
      telemetry: {
        peakVibrationG: a.vib,
        tiltDegrees: a.tilt,
        strainMicrostrain: 142,
        crackWidthMm: 0.12,
        thermalExpansionMm: 4.8,
        safetyIndex: a.warning ? 82 : 97
      }
    });

    // Infrastructure Work-Order / Actuator Barrier
    devices.push({
      id: `DEV-INF-ACT-${String(idx + 1).padStart(3, '0')}`,
      name: `Automated Barrier & Weight Sensor - ${a.name}`,
      category: 'infrastructure',
      type: 'Weigh-In-Motion & Smart Overload Diverter Barrier',
      zone: a.zone,
      locationName: `${a.name} Approach Checkpoint`,
      coordinates: [a.coords[0] + 0.0005, a.coords[1] + 0.0005],
      connectivity: '4G/NB-IoT',
      battery: 100,
      signalStrength: -58,
      status: 'online',
      health: 'Optimal',
      firmwareVersion: 'v1.9.0',
      lastCommunication: 'Live',
      isActuator: true,
      actuatorState: {
        barrierDown: false,
        overweightDetected: false,
        emergencyLockdown: false,
        mode: 'auto'
      }
    });
  });

  return devices;
};

