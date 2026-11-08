import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { useApp, DEMO_ROLES } from "../../context/AppContext";
import {
  Settings,
  User,
  Shield,
  Sliders,
  Bell,
  RotateCcw,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Database,
  Radio
} from "lucide-react";

export const SettingsPage = () => {
  const {
    currentRole,
    setCurrentRole,
    isSimulating,
    toggleSimulation,
    simSpeed,
    changeSimulationSpeed,
    resetDemoData,
    districtInfo,
    zones,
    addToast
  } = useApp();

  const [thresholds, setThresholds] = useState({
    soilMoistureMin: 30,
    binFillCritical: 90,
    trafficDensitySevere: 85,
    aqiWarning: 150,
    floodWarningMark: 6.0
  });

  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    emailBriefing: true,
    pushEscalations: true,
    autoDispatcher: false
  });

  const handleSaveThresholds = (e) => {
    e.preventDefault();
    addToast("Threshold Configuration Saved", "Edge alerting parameters updated across all 6 administrative zones.", "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Administration & District System Settings"
        subtitle="Role-Based UI Views • Sensor Threshold Rules • Simulation Engine Controls"
      />

      {/* Role Management Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              Administrative Role-Based View Switcher
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrates tailored command interfaces for senior district governance stakeholders
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Active: {currentRole.label}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => {
                setCurrentRole(role);
                addToast("Role Switched", `Command interface set to: ${role.label}`, "info");
              }}
              className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                currentRole.id === role.id
                  ? "border-blue-600 bg-blue-50/30 ring-1 ring-blue-600/30"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{role.title}</span>
                {currentRole.id === role.id && (
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {role.id === "dm" && "Executive district-wide authority with emergency SCADA override and grievance approvals."}
                {role.id === "commissioner" && "Municipal fleet, sanitation, street lighting, and civic service delivery control."}
                {role.id === "dept_head" && "Water resources, SCADA pipeline valves, and agricultural irrigation focus."}
                {role.id === "field_officer" && "Zonal inspection work orders, mobile telemetry checks, and on-ground response."}
                {role.id === "tech_admin" && "LoRaWAN gateway radio metrics, OTA firmware upgrades, and sensor telemetry."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Central Simulation Controls & Reset Demo Data */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-600" />
              Central Simulation & State Engine
            </h3>
            <p className="text-xs text-slate-500">
              Control periodic telemetry drift, test anomaly triggers, or reset all data
            </p>
          </div>
          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-full ${
              isSimulating ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            {isSimulating ? "SIMULATION STREAMING" : "SIMULATION PAUSED"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">Telemetry Stream</div>
            <p className="text-[11px] text-slate-500">Toggle live sensor fluctuations across all 8 sectors</p>
            <button
              onClick={toggleSimulation}
              className={`w-full py-2 rounded-lg text-xs font-bold text-white shadow transition flex items-center justify-center gap-2 ${
                isSimulating ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isSimulating ? "Pause Simulation" : "Resume Simulation"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">Simulation Speed Multiplier</div>
            <p className="text-[11px] text-slate-500">Accelerate interval clock for fast demonstration</p>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => changeSimulationSpeed(spd)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                    simSpeed === spd
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {spd}x Speed
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800">Reset Demo Data</div>
            <p className="text-[11px] text-slate-500">Restore sensors, actuators, and tickets to initial baseline</p>
            <button
              onClick={resetDemoData}
              className="w-full py-2 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Alerting Threshold Rules */}
      <form onSubmit={handleSaveThresholds} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-slate-700" />
              Configured Sensor Alert Thresholds
            </h3>
            <p className="text-xs text-slate-500">Rules that trigger automated escalation incident tickets</p>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 text-xs font-semibold shadow-xs transition"
          >
            Save Thresholds
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Soil Moisture Critical Floor (%)
            </label>
            <input
              type="number"
              value={thresholds.soilMoistureMin}
              onChange={(e) => setThresholds({ ...thresholds, soilMoistureMin: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Waste Bin Critical Overflow (%)
            </label>
            <input
              type="number"
              value={thresholds.binFillCritical}
              onChange={(e) => setThresholds({ ...thresholds, binFillCritical: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Traffic Density Severe Level (%)
            </label>
            <input
              type="number"
              value={thresholds.trafficDensitySevere}
              onChange={(e) => setThresholds({ ...thresholds, trafficDensitySevere: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Air Quality NAAQS Exceedance (AQI)
            </label>
            <input
              type="number"
              value={thresholds.aqiWarning}
              onChange={(e) => setThresholds({ ...thresholds, aqiWarning: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Barrage Flood Warning Mark (Meters)
            </label>
            <input
              type="number"
              step="0.1"
              value={thresholds.floodWarningMark}
              onChange={(e) => setThresholds({ ...thresholds, floodWarningMark: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

