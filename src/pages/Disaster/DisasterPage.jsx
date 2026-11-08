import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { ActuatorConfirmModal } from "../../components/modals/ActuatorConfirmModal";
import { useApp } from "../../context/AppContext";
import { HOURLY_RIVER_LEVELS } from "../../data/mockDisaster";
import {
  AlertTriangle,
  Waves,
  CloudRain,
  ShieldAlert,
  Power,
  Sparkles,
  Sliders,
  CheckCircle2,
  Activity,
  Bell
} from "lucide-react";

export const DisasterPage = () => {
  const {
    floodStations,
    setFloodStations,
    setActuatorState,
    addToast
  } = useApp();

  const [selectedStation, setSelectedStation] = useState(floodStations[2]); // Nallah-3 (high risk / storm surge)
  const [actuatorModalData, setActuatorModalData] = useState(null);

  // KPIs
  const totalStations = floodStations.length;
  const highRiskCount = floodStations.filter((s) => s.floodRiskLevel === "HIGH" || s.floodRiskLevel === "CRITICAL").length;
  const barrageStation = floodStations[0];
  const activePumps = floodStations.reduce((acc, s) => acc + s.drainagePumpsRunning, 0);

  const handleTogglePumps = (station) => {
    const isPumping = station.drainagePumpsRunning > 0;
    setActuatorModalData({
      actuatorId: station.id,
      actuatorName: `High-Capacity Storm Dewatering Pump (${station.name})`,
      actionType: isPumping ? "STOP" : "START",
      zoneName: station.zone,
      parameters: {
        flowRate: "850 Litres/sec Submersible",
        durationMins: 120
      },
      onConfirm: () => {
        setFloodStations((prev) =>
          prev.map((s) => (s.id === station.id ? { ...s, drainagePumpsRunning: isPumping ? 0 : 3 } : s))
        );
        addToast(
          "Flood Dewatering Actuator Dispatched",
          `Dewatering pumps at ${station.name} switched to ${isPumping ? "STANDBY" : "FORCED CYCLE"}.`,
          "success"
        );
      }
    });
  };

  const handleAdjustSluice = (stationId, count) => {
    setFloodStations((prev) =>
      prev.map((s) => (s.id === stationId ? { ...s, sluiceGatesOpen: count } : s))
    );
    addToast("Barrage Sluice Position Command Sent", `${count} sluice gates repositioned.`, "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Disaster & Flood Hydrology Early Warning"
        subtitle="Vasudha Gomati River Basin & Urban Storm Drainage Network • Dewatering Pump SCADA"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTogglePumps(selectedStation)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl text-white shadow-sm transition ${
                selectedStation.drainagePumpsRunning > 0 ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>{selectedStation.drainagePumpsRunning > 0 ? "Halt Storm Dewatering" : "Start Storm Dewatering"}</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Vasudha Barrage Level"
          value={`${barrageStation?.waterLevelMeters} m`}
          subtext="Warning Mark: 6.00 m"
          icon={Waves}
          trend="Safe Freeboard 1.18m"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="High Risk Inundation Points"
          value={highRiskCount}
          subtext="Storm Basins"
          icon={AlertTriangle}
          trend="Nallah-3 Urban Outfall"
          trendDirection="down"
          status={highRiskCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Dewatering Pumps"
          value={`${activePumps} Active`}
          subtext="Total 17 Pumps"
          icon={Power}
          trend="Pumping 2,550 L/s"
          trendDirection="neutral"
          status="warning"
        />
        <StatCard
          title="Disaster Siren Fleet"
          value="100% Armed"
          subtext="5 Acoustic Sirens"
          icon={Bell}
          trend="RF Telemetry Verified"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Main Grid: Hydrology Stations List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Stations List (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Hydrology & River Gauging Stations</h3>
              <p className="text-xs text-slate-500">Radar non-contact water level & discharge Doppler sensors</p>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              5 Stations
            </span>
          </div>

          <div className="space-y-3">
            {floodStations.map((station) => (
              <div
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2.5 ${
                  selectedStation.id === station.id
                    ? "border-rose-500 bg-rose-50/20 ring-1 ring-rose-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      {station.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{station.name}</h4>
                  </div>
                  <Badge variant={station.floodRiskLevel === "HIGH" || station.floodRiskLevel === "CRITICAL" ? "critical" : station.floodRiskLevel === "MODERATE" ? "warning" : "healthy"}>
                    {station.floodRiskLevel} RISK
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Current Level</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{station.waterLevelMeters} m</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Warning Mark</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{station.warningLevelMeters} m</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Rate of Rise</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">+{station.rateOfRiseCmHr} cm/h</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Sluice Gates: <strong>{station.sluiceGatesOpen} / {station.totalSluiceGates} Open</strong></span>
                  <span>Pumps Running: <strong>{station.drainagePumpsRunning} / {station.totalDrainagePumps}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Station Hydraulic Detail & AI Early Warning (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Station In-depth Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-rose-600">{selectedStation.id} HYDROLOGICAL POST</span>
                <h3 className="text-base font-bold text-slate-900">{selectedStation.name}</h3>
              </div>
              <Badge variant={selectedStation.floodRiskLevel === "HIGH" ? "critical" : "healthy"}>
                {selectedStation.floodRiskLevel} RISK
              </Badge>
            </div>

            {/* Level gauge progress visualization */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Water Depth vs Danger Threshold</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedStation.waterLevelMeters} m / Danger: {selectedStation.dangerLevelMeters} m
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${
                    selectedStation.waterLevelMeters >= selectedStation.warningLevelMeters
                      ? "bg-rose-500"
                      : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(100, (selectedStation.waterLevelMeters / selectedStation.dangerLevelMeters) * 100)}%`
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Bed: {selectedStation.riverBedMeters} m</span>
                <span className="text-amber-600 font-bold">Warning: {selectedStation.warningLevelMeters} m</span>
                <span className="text-rose-600 font-bold">Danger: {selectedStation.dangerLevelMeters} m</span>
              </div>
            </div>

            {/* Sluice Gate Aperture Stepper */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <div className="font-bold text-slate-900">Barrage Sluice Gates</div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  Currently {selectedStation.sluiceGatesOpen} of {selectedStation.totalSluiceGates} gates deployed
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(selectedStation.totalSluiceGates + 1).keys()].slice(0, 6).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAdjustSluice(selectedStation.id, num)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                      selectedStation.sluiceGatesOpen === num
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Hydrological Early Warning */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-purple-100 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  AI Hydrology Runoff & Storm Forecasting
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                91% Confidence
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-purple-100">
              <strong>Urban Inundation Advisory:</strong> Water levels at Nallah-3 Storm Basin are rising rapidly
              at 14.2 cm/hr following localized storm discharge. Freeboard is down to 25 cm. Continuous operation of
              3 submersible dewatering pumps is mandatory to prevent backflow into commercial market basements.
            </p>
          </div>

          {/* River Water Level Hourly Curve */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">24-Hour Hydrology Inflow & Outfall Hydrograph</h3>
            <TrendChart
              data={HOURLY_RIVER_LEVELS}
              dataKeys={[
                { key: "barrageMeters", name: "Barrage Level (m)", color: "#0284c7" },
                { key: "stormDrainMeters", name: "Storm Drain Level (m)", color: "#e11d48" }
              ]}
              xAxisKey="hour"
              height={220}
              unit="m"
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
