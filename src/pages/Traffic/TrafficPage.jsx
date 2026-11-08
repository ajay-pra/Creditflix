import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { ComparisonBarChart } from "../../components/charts/ComparisonBarChart";
import { useApp } from "../../context/AppContext";
import { HOURLY_TRAFFIC_TRENDS } from "../../data/mockTraffic";
import {
  Car,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  Activity,
  ShieldAlert,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Navigation
} from "lucide-react";

export const TrafficPage = () => {
  const {
    intersections,
    setIntersections,
    setActuatorState,
    addToast
  } = useApp();

  const [selectedIntersection, setSelectedIntersection] = useState(intersections[1]); // Junction 02 (Chowk Clock Tower - congested)

  // KPIs
  const totalIntersections = intersections.length;
  const severeCongestionCount = intersections.filter((i) => i.congestionLevel === "Severe").length;
  const avgDensity = Math.round(
    intersections.reduce((acc, i) => acc + i.trafficDensityPct, 0) / totalIntersections
  );
  const avgSpeed = Math.round(
    intersections.reduce((acc, i) => acc + i.avgSpeedKmph, 0) / totalIntersections
  );

  // Extend Green Phase Action
  const handleExtendGreen = (intersectionId, extraSeconds = 15) => {
    setIntersections((prev) =>
      prev.map((item) => {
        if (item.id === intersectionId) {
          return {
            ...item,
            signalStatus: "GREEN",
            signalTimerRemaining: item.signalTimerRemaining + extraSeconds
          };
        }
        return item;
      })
    );
    addToast(
      "Signal Phase Extended",
      `Dispatched Adaptive Green Light extension (+${extraSeconds}s) to ${selectedIntersection.name}.`,
      "success"
    );
  };

  const handleToggleSignalMode = (intersectionId) => {
    setIntersections((prev) =>
      prev.map((item) => {
        if (item.id === intersectionId) {
          const nextMode = item.controlMode === "auto" ? "manual" : "auto";
          return { ...item, controlMode: nextMode };
        }
        return item;
      })
    );
    addToast("Signal Mode Updated", "Switched intersection between ATCS SCADA Auto and Manual Override.", "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Intelligent Traffic & Adaptive Signal Management"
        subtitle="8 Arterial Intersections • 77GHz Radar FMCW Telemetry • ATCS SCATS Adaptive Controllers"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExtendGreen(selectedIntersection.id, 20)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Extend Green Signal (+20s)</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Monitored Intersections"
          value={totalIntersections}
          subtext="Junctions"
          icon={Car}
          trend="8 FMCW Radars Active"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Average Traffic Density"
          value={`${avgDensity}%`}
          subtext="District Average"
          icon={Activity}
          trend="+8% evening surge"
          trendDirection="down"
          status={avgDensity > 75 ? "warning" : "normal"}
        />
        <StatCard
          title="Severe Congestion Points"
          value={severeCongestionCount}
          subtext="Bottlenecks"
          icon={AlertTriangle}
          trend="Chowk Clocktower"
          trendDirection="down"
          status={severeCongestionCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Average Speed"
          value={`${avgSpeed} km/h`}
          subtext="Arterial Roads"
          icon={Clock}
          trend="-6 km/h during peak"
          trendDirection="down"
          status="normal"
        />
      </div>

      {/* Main Grid: Intersections List & Controller Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Monitored Intersections (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">District Intersections</h3>
              <p className="text-xs text-slate-500">Live vehicle flow and signal state</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              8 Intersections
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {intersections.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedIntersection(item)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2.5 ${
                  selectedIntersection.id === item.id
                    ? "border-blue-500 bg-blue-50/20 ring-1 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      {item.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  </div>
                  {/* Traffic Light State Mini Badge */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.signalStatus === "GREEN"
                          ? "bg-emerald-500 animate-pulse"
                          : item.signalStatus === "YELLOW"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                    />
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {item.signalStatus} ({item.signalTimerRemaining}s)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Flow</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{item.vehiclesPerMinute} vpm</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Density</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{item.trafficDensityPct}%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Avg Speed</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{item.avgSpeedKmph} km/h</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="capitalize">Congestion: <strong>{item.congestionLevel}</strong></span>
                  <span>Peak: {item.peakHoursPredicted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Signal Simulator & AI Forecast (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Signal Actuator Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{selectedIntersection.id} SCATS SIMULATOR</span>
                <h3 className="text-base font-bold text-slate-900">{selectedIntersection.name}</h3>
              </div>
              <button
                onClick={() => handleToggleSignalMode(selectedIntersection.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                  selectedIntersection.controlMode === "auto"
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                Control Mode: {selectedIntersection.controlMode.toUpperCase()}
              </button>
            </div>

            {/* Traffic Signal Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 text-white">
              {/* Traffic light housing */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div
                  className={`h-10 w-10 rounded-full border-2 border-slate-700 flex items-center justify-center transition-all ${
                    selectedIntersection.signalStatus === "RED"
                      ? "bg-rose-600 border-rose-400 shadow-lg shadow-rose-600/50"
                      : "bg-rose-950/40 opacity-30"
                  }`}
                >
                  <span className="text-[10px] font-bold">RED</span>
                </div>
                <div
                  className={`h-10 w-10 rounded-full border-2 border-slate-700 flex items-center justify-center transition-all ${
                    selectedIntersection.signalStatus === "YELLOW"
                      ? "bg-amber-500 border-amber-300 shadow-lg shadow-amber-500/50"
                      : "bg-amber-950/40 opacity-30"
                  }`}
                >
                  <span className="text-[10px] font-bold">YEL</span>
                </div>
                <div
                  className={`h-10 w-10 rounded-full border-2 border-slate-700 flex items-center justify-center transition-all ${
                    selectedIntersection.signalStatus === "GREEN"
                      ? "bg-emerald-500 border-emerald-300 shadow-lg shadow-emerald-500/50"
                      : "bg-emerald-950/40 opacity-30"
                  }`}
                >
                  <span className="text-[10px] font-bold">GRN</span>
                </div>
              </div>

              {/* Timer & Cycle duration */}
              <div className="sm:col-span-2 flex flex-col justify-center space-y-3">
                <div>
                  <div className="text-xs text-slate-400 font-medium">PHASE COUNTDOWN</div>
                  <div className="text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                    {selectedIntersection.signalTimerRemaining} <span className="text-sm text-slate-400 font-sans">seconds</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Cycle Duration: {selectedIntersection.signalCycleDuration}s • North-South: {selectedIntersection.greenTimeAllocation.NorthSouth}s
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleExtendGreen(selectedIntersection.id, 15)}
                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2 text-xs font-semibold shadow transition"
                  >
                    +15s Green Split
                  </button>
                  <button
                    onClick={() => handleExtendGreen(selectedIntersection.id, 30)}
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-xs font-semibold shadow transition"
                  >
                    +30s Green Split
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Traffic Flow Recommendations */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-purple-100 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  AI Dynamic Signal & Corridor Advisory
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                89% Confidence
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-purple-100">
              <strong>Peak Forecast Notice:</strong> Traffic density around {selectedIntersection.name} will reach 95%
              between 17:30 and 19:30. SCATS controller is recommended to prolong East-West arterial green
              duration by 18 seconds to prevent spillback onto the Metro Viaduct.
            </p>
          </div>

          {/* Hourly Traffic Trends Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Diurnal Congestion Density & Speed Profile</h3>
            <TrendChart
              data={HOURLY_TRAFFIC_TRENDS}
              dataKeys={[
                { key: "densityPct", name: "Traffic Density (%)", color: "#ea580c" },
                { key: "avgSpeed", name: "Average Speed (km/h)", color: "#0284c7" }
              ]}
              xAxisKey="hour"
              height={220}
              unit="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
