import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { ComparisonBarChart } from "../../components/charts/ComparisonBarChart";
import { ActuatorConfirmModal } from "../../components/modals/ActuatorConfirmModal";
import { useApp } from "../../context/AppContext";
import { IRRIGATION_HISTORICAL_TRENDS } from "../../data/mockIrrigation";
import {
  Sprout,
  Droplets,
  Thermometer,
  CloudRain,
  Power,
  Clock,
  Sparkles,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Settings2,
  Gauge
} from "lucide-react";

export const IrrigationPage = () => {
  const {
    irrigationZones,
    setIrrigationZones,
    setActuatorState,
    addToast
  } = useApp();

  const safeZones = irrigationZones || [];
  const [selectedZone, setSelectedZone] = useState(() => (safeZones[1] || safeZones[0] || {}));
  const [actuatorModalData, setActuatorModalData] = useState(null);

  // Fallback if selectedZone is missing or updated
  const activeZone = safeZones.find((z) => z.id === selectedZone?.id) || selectedZone || safeZones[0] || {};

  // KPIs
  const totalZones = safeZones.length || 1;
  const avgMoisture = +(safeZones.reduce((acc, z) => acc + (z.soilMoisture10cm || 0), 0) / totalZones).toFixed(1);
  const activePumps = safeZones.filter((z) => z.pumpRunning).length;
  const totalWaterToday = safeZones.reduce((acc, z) => acc + (z.waterConsumptionTodayKL || 0), 0);

  // Trigger pump action with safety modal
  const handleTogglePump = (zone) => {
    const isRunning = zone.pumpRunning;
    setActuatorModalData({
      actuatorId: zone.connectedPumpId,
      actuatorName: `High-Yield Submersible Pump (${zone.name})`,
      actionType: isRunning ? "STOP" : "START",
      zoneName: zone.name,
      parameters: {
        durationMins: isRunning ? 0 : 45,
        flowRate: isRunning ? "0 L/min" : `${zone.pumpFlowRateLpm || 120} L/min`
      },
      onConfirm: () => {
        setActuatorState(
          zone.connectedPumpId,
          { power: !isRunning, pumpRunning: !isRunning },
          `Irrigation Pump for ${zone.name} ${!isRunning ? "STARTED" : "STOPPED"}`
        );
      }
    });
  };

  const handleToggleAutoMode = (zoneId) => {
    setIrrigationZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, autoMode: !z.autoMode } : z))
    );
    addToast("Mode Toggled", "Switched operating mode between SCADA Autonomous and Manual Control.", "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Smart Irrigation & Precision Agriculture"
        subtitle="Rural Agro Belt • Multi-Depth Soil Telemetry • Automated Solenoid & Pump SCADA"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTogglePump(activeZone)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl text-white shadow-sm transition ${
                activeZone.pumpRunning ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>{activeZone.pumpRunning ? "Stop Pump (Safety Halt)" : "Start Precision Pump"}</span>
            </button>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Avg Soil Moisture"
          value={`${avgMoisture}%`}
          subtext="Target: 35-65%"
          icon={Droplets}
          trend={avgMoisture < 30 ? "Stress Deficit" : "Optimal"}
          trendDirection={avgMoisture < 30 ? "down" : "up"}
          status={avgMoisture < 30 ? "warning" : "healthy"}
        />
        <StatCard
          title="Active Pumps"
          value={`${activePumps} / ${totalZones}`}
          subtext="Irrigating"
          icon={Power}
          trend="Grid Supply Stable"
          trendDirection="neutral"
          status={activePumps > 0 ? "healthy" : "normal"}
        />
        <StatCard
          title="Water Consumed"
          value={`${totalWaterToday} kL`}
          subtext="Today's Draw"
          icon={Sprout}
          trend="-18% vs flood irrigation"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Average Temp / Humidity"
          value="28.1°C"
          subtext="60% RH"
          icon={Thermometer}
          trend="Rain Probability: 12%"
          trendDirection="neutral"
          status="normal"
        />
      </div>

      {/* Main Grid: Zones List & Zone Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Agricultural Zones Cards (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monitored Agro Belts</h3>
              <p className="text-xs text-slate-500">6 zones with multi-depth capacitive probes</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              {irrigationZones.length} Zones
            </span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {irrigationZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`rounded-xl border p-3.5 space-y-2.5 transition cursor-pointer ${
                  selectedZone.id === zone.id
                    ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      {zone.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{zone.name}</h4>
                  </div>
                  <Badge variant={zone.status === "healthy" ? "healthy" : zone.status === "irrigating" ? "purple" : "critical"}>
                    {zone.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">Moisture (10cm)</div>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{zone.soilMoisture10cm}%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">Moisture (30cm)</div>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{zone.soilMoisture30cm}%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">Pump State</div>
                    <div className={`font-bold mt-0.5 ${zone.pumpRunning ? "text-emerald-700 font-mono" : "text-slate-500"}`}>
                      {zone.pumpRunning ? "RUNNING" : "OFF"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Crop: <strong>{zone.cropType}</strong></span>
                  <span>{zone.areaAcres} Acres • {zone.soilType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Zone Actuator Controls & AI Forecast (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Actuator SCADA Control Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{activeZone.id} SCADA TERMINAL</span>
                <h3 className="text-base font-bold text-slate-900">{activeZone.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleAutoMode(activeZone.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                    activeZone.autoMode
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  Mode: {activeZone.autoMode ? "AUTOMATIC" : "MANUAL"}
                </button>
              </div>
            </div>

            {/* Actuator parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/70">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Pump Actuator</span>
                <div className="font-bold text-slate-900 mt-1 font-mono">{activeZone.connectedPumpId}</div>
                <div className="text-[11px] text-emerald-600 font-medium">Connectivity: LoRaWAN</div>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/70">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Flow Rate</span>
                <div className="font-bold text-slate-900 mt-1 font-mono">
                  {activeZone.pumpRunning ? `${activeZone.pumpFlowRateLpm} L/min` : "0 L/min"}
                </div>
                <div className="text-[11px] text-slate-500">Pressure: 2.8 Bar</div>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/70">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Water Used Today</span>
                <div className="font-bold text-slate-900 mt-1 font-mono">{activeZone.waterConsumptionTodayKL} kL</div>
                <div className="text-[11px] text-slate-500">From Canal Sluice 4</div>
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/70">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Last Irrigated</span>
                <div className="font-bold text-slate-900 mt-1">{activeZone.lastIrrigated}</div>
                <div className="text-[11px] text-slate-500">Cycle Duration: 45m</div>
              </div>
            </div>

            {/* Manual Override Action Bar */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3.5">
              <div className="text-xs text-slate-600">
                Physical Actuator State:{" "}
                <strong className={activeZone.pumpRunning ? "text-emerald-700" : "text-slate-700"}>
                  {activeZone.pumpRunning ? "RUNNING (PUMPING)" : "STANDBY / STOPPED"}
                </strong>
              </div>
              <button
                onClick={() => handleTogglePump(activeZone)}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg shadow transition flex items-center gap-1.5 ${
                  activeZone.pumpRunning
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <Power className="h-3.5 w-3.5" />
                <span>{activeZone.pumpRunning ? "Halt Irrigation Pump" : "Activate Irrigation Pump"}</span>
              </button>
            </div>
          </div>

          {/* AI Soil Moisture Forecasting Panel */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  AI Multi-Horizon Soil Moisture Forecast ({activeZone.name})
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                94% Confidence
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-purple-100 bg-white p-3 shadow-xs">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">Next 3 Hours</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{activeZone.forecast3h}%</div>
                <div className="text-[10px] text-slate-500">Evaporation loss: 1.2%</div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white p-3 shadow-xs">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">Next 6 Hours</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{activeZone.forecast6h}%</div>
                <div className="text-[10px] text-slate-500">Sun peak evapotranspiration</div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white p-3 shadow-xs">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">Next 12 Hours</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{activeZone.forecast12h}%</div>
                <div className="text-[10px] text-amber-600 font-semibold">Wilting risk if dry</div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white p-3 shadow-xs">
                <span className="text-slate-400 text-[10px] font-semibold uppercase">Next 24 Hours</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{activeZone.forecast24h}%</div>
                <div className="text-[10px] text-slate-500">Estimated requirement: 42 kL</div>
              </div>
            </div>

            <p className="text-xs text-purple-900 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-purple-100">
              <strong>Automated AI Agronomist Recommendation:</strong> Soil moisture in {activeZone.name} is forecast
              to decline past crop threshold limits within 3.5 hours. Recommended irrigation cycle of 45 minutes
              will deliver 54 kL water, restoring soil moisture to 42% at root level.
            </p>
          </div>

          {/* Historical Trend Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">24-Hour Soil Moisture & Irrigation Trend</h3>
            <TrendChart
              data={IRRIGATION_HISTORICAL_TRENDS}
              dataKeys={[
                { key: "avgMoisture", name: "Soil Moisture (%)", color: "#059669" },
                { key: "waterUsageKL", name: "Water Usage (kL)", color: "#2563eb" }
              ]}
              xAxisKey="time"
              height={220}
              unit="%"
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

