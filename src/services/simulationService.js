// Central Simulation Engine
// Simulates live IoT telemetry, actuator state feedback, and anomaly drift across all 8 sectors

export class SimulationEngine {
  constructor(onUpdate, onAlert) {
    this.onUpdate = onUpdate;
    this.onAlert = onAlert;
    this.isRunning = true;
    this.speed = 1; // 1x, 2x, 5x
    this.timerId = null;
    this.tickCount = 0;
  }

  start(intervalMs = 4000) {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (this.isRunning) {
        this.tick();
      }
    }, intervalMs / this.speed);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  setSpeed(speedMultiplier) {
    this.speed = speedMultiplier;
    this.start();
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    return this.isRunning;
  }

  tick() {
    this.tickCount++;
    if (this.onUpdate) {
      this.onUpdate(this.tickCount);
    }
  }
}

// Applies realistic evolutionary drift to existing application state
export const simulateNextState = (prevState) => {
  const {
    devices,
    irrigationZones,
    wasteBins,
    vehicles,
    intersections,
    waterPoints,
    envStations,
    floodStations,
    lightingFeeders
  } = prevState;

  // 1. Simulate Irrigation Zones & Pumps
  const nextIrrigation = irrigationZones.map((zone) => {
    let nextMoisture10 = zone.soilMoisture10cm;
    let nextMoisture30 = zone.soilMoisture30cm;
    let nextWaterUsage = zone.waterConsumptionTodayKL;

    if (zone.pumpRunning) {
      // Pump is on: moisture increases steadily!
      nextMoisture10 = Math.min(68, +(nextMoisture10 + 0.4).toFixed(1));
      nextMoisture30 = Math.min(65, +(nextMoisture30 + 0.25).toFixed(1));
      nextWaterUsage += 0.2; // kL
    } else {
      // Natural evaporation / transpiration drift
      nextMoisture10 = Math.max(10, +(nextMoisture10 - 0.05).toFixed(1));
      nextMoisture30 = Math.max(12, +(nextMoisture30 - 0.02).toFixed(1));
    }

    let status = "healthy";
    if (nextMoisture10 < 22) status = "critical";
    else if (nextMoisture10 < 30) status = "warning";
    else if (zone.pumpRunning) status = "irrigating";

    return {
      ...zone,
      soilMoisture10cm: nextMoisture10,
      soilMoisture30cm: nextMoisture30,
      waterConsumptionTodayKL: Math.round(nextWaterUsage * 10) / 10,
      status
    };
  });

  // 2. Simulate Waste Bins (fill creeps upward slightly unless emptied)
  const nextBins = wasteBins.map((bin) => {
    // Random 20% chance of a slight fill increase (0.2% - 0.6%)
    let fill = bin.fillLevel;
    if (Math.random() < 0.25 && fill < 99) {
      fill = Math.min(100, Math.round(fill + Math.random() * 0.8));
    }
    let status = "normal";
    if (fill >= 90) status = "critical";
    else if (fill >= 75) status = "warning";

    const hoursToOverflow = fill >= 90 ? +(0.3 + Math.random() * 0.4).toFixed(1) : Math.round((100 - fill) / 3.5);

    return {
      ...bin,
      fillLevel: fill,
      status,
      hoursToOverflow,
      needsCollection: fill >= 75
    };
  });

  // 3. Simulate Vehicle movement slightly for active transit vehicles
  const nextVehicles = vehicles.map((v) => {
    if (v.status === "in-transit" || v.status === "collecting") {
      // Jitter coordinates along local route
      const dLat = (Math.random() - 0.48) * 0.0003;
      const dLng = (Math.random() - 0.48) * 0.0003;
      return {
        ...v,
        coordinates: [+(v.coordinates[0] + dLat).toFixed(5), +(v.coordinates[1] + dLng).toFixed(5)],
        speedKmph: v.status === "collecting" ? 0 : Math.round(15 + Math.random() * 18)
      };
    }
    return v;
  });

  // 4. Simulate Traffic Signal Countdown & Dynamic Density Jitter
  const nextIntersections = intersections.map((item) => {
    let timer = item.signalTimerRemaining - 1;
    let phase = item.signalStatus;

    if (timer <= 0) {
      if (phase === "GREEN") {
        phase = "YELLOW";
        timer = 5;
      } else if (phase === "YELLOW") {
        phase = "RED";
        timer = 45;
      } else {
        phase = "GREEN";
        timer = 40;
      }
    }

    // Jitter vehicles per minute slightly (+-2)
    const vpm = Math.max(10, item.vehiclesPerMinute + Math.round((Math.random() - 0.5) * 4));
    const density = Math.min(99, Math.max(20, Math.round(vpm * 0.72)));

    return {
      ...item,
      signalTimerRemaining: timer,
      signalStatus: phase,
      vehiclesPerMinute: vpm,
      trafficDensityPct: density,
      congestionLevel: density > 85 ? "Severe" : density > 70 ? "Heavy" : density > 50 ? "Moderate" : "Low"
    };
  });

  // 5. Simulate Water Quality & Flow Fluctuations
  const nextWater = waterPoints.map((w) => {
    const flowJitter = Math.round((Math.random() - 0.5) * 6);
    return {
      ...w,
      flowRateM3h: Math.max(50, (w.flowRateM3h || 400) + flowJitter),
      pressureBar: w.pressureBar ? +(w.pressureBar + (Math.random() - 0.5) * 0.05).toFixed(2) : undefined
    };
  });

  // 6. Simulate Environmental Sensors (micro AQI jitter)
  const nextEnv = envStations.map((e) => {
    const aqiJitter = Math.round((Math.random() - 0.5) * 2);
    const newAqi = Math.max(30, e.aqi + aqiJitter);
    return {
      ...e,
      aqi: newAqi,
      pm25: Math.max(10, +(e.pm25 + aqiJitter * 0.45).toFixed(1)),
      tempC: +(e.tempC + (Math.random() - 0.5) * 0.05).toFixed(1)
    };
  });

  // 7. Update central device registry with the fresh telemetry
  const nextDevices = devices.map((d) => {
    if (d.category === "irrigation" && !d.isActuator) {
      const match = nextIrrigation.find((z) => z.connectedPumpId === d.id || d.name.includes(z.name.slice(-1)));
      if (match) {
        return {
          ...d,
          telemetry: {
            ...d.telemetry,
            soilMoisture: match.soilMoisture10cm
          }
        };
      }
    }
    return d;
  });

  return {
    ...prevState,
    devices: nextDevices,
    irrigationZones: nextIrrigation,
    wasteBins: nextBins,
    vehicles: nextVehicles,
    intersections: nextIntersections,
    waterPoints: nextWater,
    envStations: nextEnv
  };
};
