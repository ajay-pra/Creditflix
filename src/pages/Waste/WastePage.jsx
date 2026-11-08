import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { DistrictMap } from "../../components/maps/DistrictMap";
import { useApp } from "../../context/AppContext";
import { calculateOptimizedRoute } from "../../services/mockRouteService";
import {
  Trash2,
  Truck,
  AlertTriangle,
  Route,
  CheckCircle2,
  Navigation,
  Sparkles,
  MapPin,
  Clock,
  Fuel,
  Check,
  RotateCcw
} from "lucide-react";

export const WastePage = () => {
  const {
    wasteBins,
    vehicles,
    setVehicles,
    activeRoute,
    setActiveRoute,
    markBinCollected,
    addToast
  } = useApp();

  const safeBins = wasteBins || [];
  const safeVehicles = vehicles || [];
  const [filterType, setFilterType] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(() => (safeVehicles[0] || {}));
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);

  const activeVeh = safeVehicles.find((v) => v.id === selectedVehicle?.id) || selectedVehicle || safeVehicles[0] || {};

  // KPIs
  const totalBins = safeBins.length;
  const criticalBins = safeBins.filter((b) => b.fillLevel >= 90).length;
  const warningBins = safeBins.filter((b) => b.fillLevel >= 75 && b.fillLevel < 90).length;
  const normalBins = safeBins.filter((b) => b.fillLevel < 75).length;
  const activeVehiclesCount = safeVehicles.filter((v) => v.status === "in-transit" || v.status === "collecting").length;
  const totalTonsCollectedToday = +(safeVehicles.reduce((acc, v) => acc + (v.currentLoadTons || 0), 0) + 24.5).toFixed(1);

  // Filtered bins
  const filteredBins = safeBins.filter((b) => {
    if (filterType === "all") return true;
    if (filterType === "critical") return b.fillLevel >= 90;
    if (filterType === "warning") return b.fillLevel >= 75;
    return b.type === filterType;
  });

  // Generate AI Route
  const handleGenerateRoute = () => {
    setIsGeneratingRoute(true);
    setTimeout(() => {
      const target = activeVeh.id ? activeVeh : (safeVehicles[0] || {});
      const route = calculateOptimizedRoute(target, safeBins, 8);
      setActiveRoute(route);
      setIsGeneratingRoute(false);
      addToast(
        "AI Dynamic Route Dispatched",
        `Optimized collection path generated for ${target.regNumber} (${route.stops.length} priority bins, ${route.totalDistanceKm} km).`,
        "success"
      );
    }, 600);
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
    addToast("Route Cleared", "Cleared active collection trajectory from GIS layer.", "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Smart Solid Waste Management & Fleet Logistics"
        subtitle="50 Ultrasonic Sensor Bins • 10 Municipal Compactor Trucks • Dynamic AI Route Heuristics"
        actions={
          <div className="flex items-center gap-2">
            {activeRoute ? (
              <button
                onClick={handleClearRoute}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-sm"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Route</span>
              </button>
            ) : (
              <button
                onClick={handleGenerateRoute}
                disabled={isGeneratingRoute}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isGeneratingRoute ? "Computing Route..." : "AI Route Optimisation"}</span>
              </button>
            )}
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Smart Bins"
          value={totalBins}
          subtext="IoT Enabled"
          icon={Trash2}
          trend={`${criticalBins} Critical (≥90%)`}
          trendDirection={criticalBins > 0 ? "down" : "up"}
          status={criticalBins > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Pending Pickup"
          value={criticalBins + warningBins}
          subtext="Bins ≥75% Fill"
          icon={AlertTriangle}
          trend="Urgent clearance"
          trendDirection="down"
          status="warning"
        />
        <StatCard
          title="Active Collection Fleet"
          value={`${activeVehiclesCount} / ${vehicles.length}`}
          subtext="Trucks on road"
          icon={Truck}
          trend="Avg speed 22 km/h"
          trendDirection="neutral"
          status="normal"
        />
        <StatCard
          title="Total Waste Collected"
          value={`${totalTonsCollectedToday} Tons`}
          subtext="Today's Total"
          icon={CheckCircle2}
          trend="+3.2 Tons recycled"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* AI Route Optimisation Panel (Active Route Summary) */}
      {activeRoute && (
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Route className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Active Dispatched Route: {activeRoute.vehicleReg}
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-mono px-2 py-0.5 rounded-full font-bold">
                    Vehicle {activeRoute.vehicleId}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Assigned Driver: <strong>{activeRoute.driverName}</strong> • Real-time Leaflet polyline overlay active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                Distance: <strong className="text-blue-700">{activeRoute.totalDistanceKm} km</strong>
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                ETA: <strong className="text-blue-700">{activeRoute.estimatedTimeMins} mins</strong>
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                Fuel Saved: <strong className="text-emerald-700">{activeRoute.estimatedFuelSavedLiters} L</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Route Stops:</span>
            {activeRoute.stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs whitespace-nowrap shadow-xs"
              >
                <span className="h-4 w-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800">{stop.name}</span>
                <span className="text-[10px] font-mono text-rose-600 font-bold">({stop.fillLevel}%)</span>
                <button
                  onClick={() => markBinCollected(stop.id)}
                  className="ml-1 text-emerald-600 hover:text-emerald-800 p-0.5"
                  title="Mark Collected"
                >
                  <Check className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map & Fleet Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: GIS Map with Waste Bins and Vehicles (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Geospatial Waste Bin & Fleet Telemetry
            </h3>
            <span className="text-xs text-slate-500">
              Showing 50 bins + 10 municipal vehicles
            </span>
          </div>
          <DistrictMap
            height="h-[480px]"
            selectedCategory="waste"
            showFilters={false}
          />
        </div>

        {/* Right: Vehicle Fleet Tracker Table (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Collection Fleet Tracking</h3>
              <p className="text-xs text-slate-500">10 Municipal Compactor Trucks & Electric Tippers</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              10 Trucks
            </span>
          </div>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {vehicles.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`p-3 rounded-xl border transition cursor-pointer ${
                  selectedVehicle.id === v.id
                    ? "border-blue-500 bg-blue-50/20 ring-1 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      {v.regNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{v.driverName}</span>
                  </div>
                  <Badge variant={v.status === "in-transit" || v.status === "collecting" ? "healthy" : "neutral"}>
                    {v.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Current Load ({v.currentLoadTons} / {v.capacityTons} Tons)</span>
                    <span className="font-bold text-slate-800">{v.loadPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        v.loadPct >= 85 ? "bg-rose-500" : v.loadPct >= 60 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${v.loadPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-100">
                  <span>Next: {v.nextStop}</span>
                  <span className="flex items-center gap-1 font-mono text-slate-600">
                    <Fuel className="h-3 w-3 text-amber-500" />
                    {v.fuelBatteryPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Bin Registry Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Smart Bins Telemetry Registry (50 Units)</h3>
            <p className="text-xs text-slate-500">Real-time ultrasonic fill level and overflow projection</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {["all", "critical", "warning", "biodegradable", "recyclable", "hazardous"].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition ${
                  filterType === filter
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Bin ID</th>
                <th className="py-2.5 px-3">Location & Zone</th>
                <th className="py-2.5 px-3">Waste Category</th>
                <th className="py-2.5 px-3">Fill Percentage</th>
                <th className="py-2.5 px-3">Overflow ETA</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBins.slice(0, 10).map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{b.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{b.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{b.zone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="capitalize font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {b.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 w-10">{b.fillLevel}%</span>
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.fillLevel >= 90 ? "bg-rose-500" : b.fillLevel >= 75 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${b.fillLevel}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-medium ${b.fillLevel >= 90 ? "text-rose-600 font-bold" : "text-slate-600"}`}>
                      {b.hoursToOverflow} hours
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={b.status === "normal" ? "healthy" : b.status === "warning" ? "warning" : "critical"}>
                      {b.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => markBinCollected(b.id)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 transition shadow-xs"
                    >
                      Mark Collected
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

