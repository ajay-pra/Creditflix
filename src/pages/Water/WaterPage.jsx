import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { ActuatorConfirmModal } from "../../components/modals/ActuatorConfirmModal";
import { useApp } from "../../context/AppContext";
import { HOURLY_WATER_CONSUMPTION } from "../../data/mockWater";
import {
  Droplets,
  Activity,
  AlertTriangle,
  Gauge,
  Power,
  Sparkles,
  Sliders,
  CheckCircle2,
  Waves
} from "lucide-react";

export const WaterPage = () => {
  const {
    waterPoints,
    setWaterPoints,
    setActuatorState,
    addToast
  } = useApp();

  const [selectedPoint, setSelectedPoint] = useState(waterPoints[4]); // Central Chowk Section 12 (leak anomaly)
  const [actuatorModalData, setActuatorModalData] = useState(null);

  // KPIs
  const totalPoints = waterPoints.length;
  const anomalyCount = waterPoints.filter((w) => w.status === "anomaly" || w.status === "warning").length;
  const primaryReservoir = waterPoints[0];
  const avgPressure = +(
    waterPoints.filter((w) => w.pressureBar).reduce((acc, w) => acc + w.pressureBar, 0) /
    (waterPoints.filter((w) => w.pressureBar).length || 1)
  ).toFixed(1);

  const handleTogglePump = (point) => {
    const isRunning = point.pumpActive;
    setActuatorModalData({
      actuatorId: point.id,
      actuatorName: `High-Lift Booster Pump / Valve (${point.name})`,
      actionType: isRunning ? "STOP" : "START",
      zoneName: point.zone,
      parameters: {
        flowRate: `${point.flowRateM3h || 450} m3/h`,
        durationMins: 60
      },
      onConfirm: () => {
        setWaterPoints((prev) =>
          prev.map((w) => (w.id === point.id ? { ...w, pumpActive: !isRunning } : w))
        );
        addToast(
          "SCADA Actuator Triggered",
          `Pump/Valve for ${point.name} switched to ${!isRunning ? "ACTIVE" : "STANDBY"}.`,
          "success"
        );
      }
    });
  };

  const handleAdjustValve = (pointId, newPct) => {
    setWaterPoints((prev) =>
      prev.map((w) => (w.id === pointId ? { ...w, valveOpenPct: newPct } : w))
    );
    addToast("Valve Aperture Adjusted", `Motorized throttle aperture set to ${newPct}%.`, "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Smart Water Distribution & Quality SCADA"
        subtitle="10 Water Assets • Potable Quality Sensors (pH, Turbidity, Chlorine) • Pipeline Leak Detection"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTogglePump(selectedPoint)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl text-white shadow-sm transition ${
                selectedPoint.pumpActive ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>{selectedPoint.pumpActive ? "Halt Booster Pump" : "Start Booster Pump"}</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Vasudha Lake Reservoir"
          value={`${primaryReservoir?.levelPct}%`}
          subtext="1,225 ML Storage"
          icon={Waves}
          trend="84.5% Full"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Network Pressure"
          value={`${avgPressure} Bar`}
          subtext="District Average"
          icon={Gauge}
          trend="Target: 3.5 Bar"
          trendDirection="neutral"
          status="normal"
        />
        <StatCard
          title="Hydraulic Anomalies"
          value={anomalyCount}
          subtext="Flags"
          icon={AlertTriangle}
          trend="Section 12 Burst Risk"
          trendDirection="down"
          status={anomalyCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Potable Quality (WTP)"
          value="0.8 NTU"
          subtext="pH 7.4 (Potable)"
          icon={Droplets}
          trend="IS-10500 Certified"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Main Grid: Water Assets List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 10 Water Assets (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Distribution Points & Reservoirs</h3>
              <p className="text-xs text-slate-500">Continuous ultrasonic flow & pressure loggers</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              10 Nodes
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {waterPoints.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPoint(item)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                  selectedPoint.id === item.id
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
                  <Badge variant={item.status === "optimal" ? "healthy" : item.status === "warning" ? "warning" : "critical"}>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {item.levelPct !== undefined && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400">Level</span>
                      <div className="font-bold text-slate-900 font-mono mt-0.5">{item.levelPct}%</div>
                    </div>
                  )}
                  {item.flowRateM3h !== undefined && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400">Flow</span>
                      <div className="font-bold text-slate-900 font-mono mt-0.5">{item.flowRateM3h} m³/h</div>
                    </div>
                  )}
                  {item.pressureBar !== undefined && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400">Pressure</span>
                      <div className="font-bold text-slate-900 font-mono mt-0.5">{item.pressureBar} Bar</div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Type: {item.type}</span>
                  <span>Zone: {item.zone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Water Anomaly & SCADA Actuator Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Anomaly Highlight Box if Leakage flagged */}
          {selectedPoint.leakageProbabilityPct && (
            <div className="rounded-2xl border border-rose-300 bg-rose-50/40 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <h4 className="text-sm font-bold text-rose-900">
                    Acoustic Cross-Correlation Pipe Rupture Alert
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  {selectedPoint.leakageProbabilityPct}% Rupture Probability
                </span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed font-medium">
                {selectedPoint.alertNote || "Significant pressure drop accompanied by flow divergence detected."}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleAdjustValve(selectedPoint.id, 50)}
                  className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition"
                >
                  Throttle Valve to 50%
                </button>
                <button
                  onClick={() => handleAdjustValve(selectedPoint.id, 0)}
                  className="rounded-lg bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition"
                >
                  Emergency Valve Shutoff
                </button>
              </div>
            </div>
          )}

          {/* Actuator & Valve Controls Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{selectedPoint.id} SCADA INTERFACE</span>
                <h3 className="text-base font-bold text-slate-900">{selectedPoint.name}</h3>
              </div>
              <Badge variant={selectedPoint.status === "optimal" ? "healthy" : "critical"}>
                {selectedPoint.status.toUpperCase()}
              </Badge>
            </div>

            {/* Quality Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">pH Factor</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">{selectedPoint.ph || "7.2"}</div>
                <div className="text-[10px] text-slate-500">IS Standard 6.5 - 8.5</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Turbidity</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {selectedPoint.turbidityNtu ? `${selectedPoint.turbidityNtu} NTU` : "1.2 NTU"}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Clear Potable</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Flow Rate</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {selectedPoint.flowRateM3h} m³/h
                </div>
                <div className="text-[10px] text-slate-500">Ultrasonic Meter</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Valve Opening</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {selectedPoint.valveOpenPct || 80}%
                </div>
                <div className="text-[10px] text-slate-500">Motorized RTU</div>
              </div>
            </div>

            {/* Valve aperture slider */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Aperture Throttle Position</span>
                <span className="font-mono font-bold text-blue-700">{selectedPoint.valveOpenPct || 80}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedPoint.valveOpenPct || 80}
                onChange={(e) => handleAdjustValve(selectedPoint.id, Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Diurnal Water Consumption Demand Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Diurnal Water Consumption & Network Pressure</h3>
            <TrendChart
              data={HOURLY_WATER_CONSUMPTION}
              dataKeys={[
                { key: "demandML", name: "Demand (Million Litres)", color: "#0284c7" },
                { key: "pressureAvg", name: "Pressure (Bar)", color: "#059669" }
              ]}
              xAxisKey="hour"
              height={220}
              unit="ML"
            />
          </div>
        </div>
      </div>

      {actuatorModalData && (
        <ActuatorConfirmModal
          isOpen={!!actuatorModalData}
          onClose={() => setActuatorModalData(null)}
          {...actuatorModalData}
        />
      )}
    </div>
  );
};
