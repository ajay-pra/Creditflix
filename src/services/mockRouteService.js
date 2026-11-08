// Smart Route Optimisation Service
// Calculates simulated TSP collection routes for municipal solid waste vehicles

export const calculateOptimizedRoute = (vehicle, bins, maxStops = 8) => {
  // 1. Identify urgent bins (fill >= 75%)
  const urgentBins = bins
    .filter(b => b.fillLevel >= 75)
    .sort((a, b) => b.fillLevel - a.fillLevel)
    .slice(0, maxStops);

  if (urgentBins.length === 0) {
    return {
      vehicleId: vehicle.id,
      stops: [],
      routePolyline: [vehicle.coordinates],
      totalDistanceKm: 0,
      estimatedTimeMins: 0,
      collectedWasteTons: 0
    };
  }

  // 2. Greedy nearest-neighbor ordering from vehicle's current location
  const stops = [];
  let currentCoord = vehicle.coordinates;
  const unvisited = [...urgentBins];

  while (unvisited.length > 0) {
    // find nearest bin
    let nearestIdx = 0;
    let minDistance = 999999;

    for (let i = 0; i < unvisited.length; i++) {
      const b = unvisited[i];
      const d = Math.hypot(b.coordinates[0] - currentCoord[0], b.coordinates[1] - currentCoord[1]);
      if (d < minDistance) {
        minDistance = d;
        nearestIdx = i;
      }
    }

    const nextStop = unvisited.splice(nearestIdx, 1)[0];
    stops.push(nextStop);
    currentCoord = nextStop.coordinates;
  }

  // Build polyline coordinates from vehicle -> stops -> Waste Transfer Depot
  const depotCoords = [26.8580, 80.9280]; // Central Transfer Station
  const routePolyline = [
    vehicle.coordinates,
    ...stops.map(s => s.coordinates),
    depotCoords
  ];

  // Rough distance calculation (~111 km per lat/lng degree)
  let totalDistKm = 0;
  for (let i = 0; i < routePolyline.length - 1; i++) {
    const p1 = routePolyline[i];
    const p2 = routePolyline[i + 1];
    const dist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) * 111.0;
    totalDistKm += dist;
  }

  totalDistKm = Math.round(totalDistKm * 10) / 10;
  const estimatedTimeMins = Math.round((totalDistKm / 22) * 60 + stops.length * 4); // 22 km/h avg speed + 4 mins per bin stop
  const collectedWasteTons = +(stops.length * 0.42).toFixed(1);

  return {
    vehicleId: vehicle.id,
    vehicleReg: vehicle.regNumber,
    driverName: vehicle.driverName,
    stops,
    routePolyline,
    totalDistanceKm: totalDistKm,
    estimatedTimeMins,
    collectedWasteTons,
    estimatedFuelSavedLiters: +(totalDistKm * 0.28).toFixed(1),
    carbonOffsetKg: +(totalDistKm * 0.74).toFixed(1)
  };
};
