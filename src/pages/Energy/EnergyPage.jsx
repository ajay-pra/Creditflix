import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { useApp } from "../../context/AppContext";
import { HOURLY_ENERGY_CONSUMPTION } from "../../data/mockEnergy";
import {
  Lightbulb,
  Zap,
  Moon,
  Sun,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Sparkles,
  Power
} from "lucide-react";

export const EnergyPage = () => {
  const {
    lightingFeeders,
    setLightingFeeders,
    lightingSummary,
    addToast
  } = useApp();

  const safeFeeders = lightingFeeders || [];
  const [selectedFeeder, setSelectedFeeder] = useState(() => (safeFeeders[3] || safeFeeders[0] || {}));
  const [globalBrightness, setGlobalBrightness] = useState(0); // daytime 0%

  const activeFeeder = safeFeeders.find((f) => f.id === selectedFeeder?.id) || selectedFeeder || safeFeeders[0] || {};

  const handleToggleLight = (feederId) => {
    setLightingFeeders((prev) =>
      prev.map((f) => {
        if (f.id === feederId) {
          const nextState = f.state === "ON" ? "OFF" : "ON";
          return {
            ...f,
            state: nextState,
            brightnessPct: nextState === "ON" ? 100 : 0
          };
        }
        return f;
      })
    );
    addToast("Lighting Feeder Command Dispatched", "Relay state updated via 4G/NB-IoT tele-management.", "info");
  };

  const handleAdjustBrightness = (feederId, newPct) => {
    setLightingFeeders((prev) =>
      prev.map((f) =>
        f.id === feederId
          ? { ...f, brightnessPct: newPct, state: newPct > 0 ? "ON" : "OFF" }
          : f
      )
    );
  };

  const handleToggleAuto = (feederId) => {
    setLightingFeeders((prev) =>
      prev.map((f) => (f.id === feederId ? { ...f, mode: f.mode === "auto" ? "manual" : "auto" } : f))
    );
    addToast("Mode Toggled", "Switched feeder between Astronomical Auto-Dimming and Manual Override.", "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Energy & Smart Street Lighting Tele-Management"
        subtitle="1,450 LED Fixtures • 30 Intelligent Feeder Panels • Astronomical Dimming & PIR Sensors"
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
              Sunset: {lightingSummary.sunsetScheduledTime} • Sunrise: {lightingSummary.sunriseScheduledTime}
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Fixtures"
          value={lightingSummary.totalFixtures}
          subtext="LED Luminaires"
          icon={Lightbulb}
          trend={`${lightingSummary.operationalAvailabilityPct}% Availability`}
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Faulty / Dark Lamps"
          value={lightingSummary.faultyFixtures}
          subtext="Lamps Alert"
          icon={AlertTriangle}
          trend="Feeder 04 Column 22-26"
          trendDirection="down"
          status={lightingSummary.faultyFixtures > 0 ? "warning" : "healthy"}
        />
        <StatCard
          title="Daily Energy Consumed"
          value={`${lightingSummary.totalEnergyTodayKwh} kWh`}
          subtext="Grid Draw"
          icon={Zap}
          trend="Standby Load 18.4 kW"
          trendDirection="neutral"
          status="normal"
        />
        <StatCard
          title="Energy Saved by Dimming"
          value={`${lightingSummary.energySavedTodayKwh} kWh`}
          subtext="25% Peak Cut"
          icon={Sparkles}
          trend={`₹${lightingSummary.estimatedCostSavedInr.toLocaleString()} Saved`}
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Main Grid: Feeders List & Controller Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Feeder Panels List (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Lighting Feeder Panels</h3>
              <p className="text-xs text-slate-500">Three-phase smart meters with DALI 0-10V dimmers</p>
            </div>
            <span className="text-xs font-mono font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
              8 Monitored
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {lightingFeeders.map((feeder) => (
              <div
                key={feeder.id}
                onClick={() => setSelectedFeeder(feeder)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2.5 ${
                  selectedFeeder.id === feeder.id
                    ? "border-yellow-500 bg-yellow-50/20 ring-1 ring-yellow-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-yellow-800 bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-200">
                      {feeder.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{feeder.name}</h4>
                  </div>
                  <Badge variant={feeder.faultyLamps > 0 ? "warning" : "healthy"}>
                    {feeder.faultyLamps > 0 ? `${feeder.faultyLamps} FAULT` : "OPTIMAL"}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Total Lamps</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{feeder.totalLamps}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Dimming</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{feeder.brightnessPct}%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">State</span>
                    <div className={`font-bold font-mono mt-0.5 ${feeder.state === "ON" ? "text-amber-600" : "text-slate-500"}`}>
                      {feeder.state}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Zone: {feeder.zone}</span>
                  <span>Energy: <strong>{feeder.energyTodayKwh} kWh</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Feeder Control Box & Energy Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controller Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-yellow-700">{activeFeeder.id} DALI CONTROLLER</span>
                <h3 className="text-base font-bold text-slate-900">{activeFeeder.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleAuto(activeFeeder.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                    activeFeeder.mode === "auto"
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  Mode: {(activeFeeder.mode || "auto").toUpperCase()}
                </button>
                <button
                  onClick={() => handleToggleLight(activeFeeder.id)}
                  className={`px-3.5 py-1 text-xs font-semibold rounded-lg text-white shadow-xs transition ${
                    activeFeeder.state === "ON" ? "bg-rose-600 hover:bg-rose-700" : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {activeFeeder.state === "ON" ? "Turn OFF" : "Turn ON"}
                </button>
              </div>
            </div>

            {/* Electrical Diagnostics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Fixtures</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {activeFeeder.activeLamps} / {activeFeeder.totalLamps}
                </div>
                <div className="text-[10px] text-slate-500">LED 70W Fixtures</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Daylight Lux</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {activeFeeder.ambientLux} Lux
                </div>
                <div className="text-[10px] text-slate-500">Daytime Threshold</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Grid Voltage</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {activeFeeder.voltageV} V
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">PF {activeFeeder.powerFactor}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Energy Today</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-1">
                  {activeFeeder.energyTodayKwh} kWh
                </div>
                <div className="text-[10px] text-slate-500">Cumulative Metrology</div>
              </div>
            </div>

            {/* Brightness Dimming Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Dimming Level (0-100%)</span>
                <span className="font-mono font-bold text-amber-700">{activeFeeder.brightnessPct || 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={activeFeeder.brightnessPct || 0}
                onChange={(e) => handleAdjustBrightness(activeFeeder.id, Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>0% (Daytime Standby)</span>
                <span>50% (Midnight Eco-Dimming)</span>
                <span>100% (Full Illuminance)</span>
              </div>
            </div>
          </div>

          {/* AI Energy Optimization */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-purple-100 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  AI Energy Conservation & Predictive Maintenance
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                97% Efficiency
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-purple-100">
              <strong>Preventive Maintenance Note:</strong> Feeder Panel 04 shows an asymmetric phase current
              deviation on Lamp Column 22-26. Field inspection is recommended to replace the tripped miniature
              circuit breaker before sunset illuminance trigger at 17:48.
            </p>
          </div>

          {/* Diurnal Energy Curve */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Diurnal Grid Load & Adaptive Dimming Savings</h3>
            <TrendChart
              data={HOURLY_ENERGY_CONSUMPTION}
              dataKeys={[
                { key: "activeLoadKw", name: "Active Load with Dimming (kW)", color: "#16a34a" },
                { key: "expectedLoadKw", name: "Baseline Without Dimming (kW)", color: "#94a3b8" }
              ]}
              xAxisKey="hour"
              height={220}
              unit="kW"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

