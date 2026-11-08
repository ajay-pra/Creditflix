import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { DistrictMap } from "../../components/maps/DistrictMap";
import { DeviceDetailModal } from "../../components/modals/DeviceDetailModal";
import { IncidentDetailModal } from "../../components/modals/IncidentDetailModal";
import { ActuatorConfirmModal } from "../../components/modals/ActuatorConfirmModal";
import {
  Cpu,
  Radio,
  WifiOff,
  AlertTriangle,
  Flame,
  Sprout,
  Trash2,
  Car,
  Droplets,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Activity,
  ShieldCheck,
  ChevronRight,
  Filter,
  Check,
  X,
  ExternalLink
} from "lucide-react";

export const OverviewPage = () => {
  const navigate = useNavigate();
  const {
    devices,
    irrigationZones,
    wasteBins,
    vehicles,
    intersections,
    waterPoints,
    envStations,
    floodStations,
    lightingSummary,
    incidents,
    aiRecommendations,
    isSimulating,
    acknowledgeIncident,
    reviewAIRecommendation,
    dismissAIRecommendation,
    setActuatorState
  } = useApp();

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [actuatorModalData, setActuatorModalData] = useState(null);
  const [sensorCategoryFilter, setSensorCategoryFilter] = useState("all");

  // KPI Calculations with safe fallbacks
  const safeDevices = devices || [];
  const safeIncidents = incidents || [];
  const safeIrrigation = irrigationZones || [];
  const safeWasteBins = wasteBins || [];
  const safeVehicles = vehicles || [];
  const safeIntersections = intersections || [];
  const safeWater = waterPoints || [];

  const totalDevicesCount = safeDevices.length;
  const activeSensorsCount = safeDevices.filter((d) => d.status === "online" && !d.isActuator).length;
  const offlineDevicesCount = safeDevices.filter((d) => d.status === "offline" || d.status === "warning").length;
  const activeAlertsCount = safeIncidents.filter((i) => i.status !== "resolved" && i.status !== "closed").length;
  const criticalIncidentsCount = safeIncidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length;

  // Sector Health status list
  const sectorHealth = [
    { name: "Smart Agriculture & Irrigation", score: 92, status: "healthy", activeNodes: 12, issues: 1, path: "/irrigation" },
    { name: "Solid Waste Management", score: 85, status: "warning", activeNodes: 50, issues: 2, path: "/waste" },
    { name: "Traffic & Transit Monitoring", score: 79, status: "warning", activeNodes: 16, issues: 1, path: "/traffic" },
    { name: "Water Supply & SCADA", score: 88, status: "warning", activeNodes: 14, issues: 1, path: "/water" },
    { name: "Environment & Air Quality", score: 76, status: "critical", activeNodes: 8, issues: 2, path: "/environment" },
    { name: "Disaster & Flood Preparedness", score: 95, status: "healthy", activeNodes: 10, issues: 1, path: "/disaster" },
    { name: "Energy & Smart Lighting", score: 99, status: "healthy", activeNodes: 16, issues: 0, path: "/energy" },
    { name: "Public Infrastructure Health", score: 94, status: "healthy", activeNodes: 10, issues: 1, path: "/infrastructure" }
  ];

  // Recent Live Sensor Readings Feed
  const recentSensors = safeDevices
    .filter((d) => !d.isActuator)
    .filter((d) => (sensorCategoryFilter === "all" ? true : d.category === sensorCategoryFilter))
    .slice(0, 7);

  // Active Critical Incidents
  const activeIncidents = safeIncidents.filter((i) => i.status !== "resolved" && i.status !== "closed").slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Breadcrumb
        title="District Executive Command Centre"
        subtitle="Unified Command & Control • Creditfix District Administration • Operational Dashboard"
        actions={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${isSimulating ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
              <span>{isSimulating ? "Live Edge Stream Active" : "Telemetry Simulation Paused"}</span>
            </span>
            <button
              onClick={() => navigate("/ai-intelligence")}
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Forecast Center</span>
            </button>
          </div>
        }
      />

      {/* A. Executive KPI Cards (10 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <StatCard
          title="Total IoT Fleet"
          value={totalDevicesCount}
          subtext="Nodes"
          icon={Cpu}
          trend="+4"
          trendDirection="up"
          status="normal"
          onClick={() => navigate("/devices")}
        />
        <StatCard
          title="Active Sensors"
          value={activeSensorsCount}
          subtext="Online"
          icon={Radio}
          trend="96.2%"
          trendDirection="up"
          status="healthy"
          onClick={() => navigate("/devices")}
        />
        <StatCard
          title="Attention / Offline"
          value={offlineDevicesCount}
          subtext="Nodes"
          icon={WifiOff}
          trend="-2"
          trendDirection="down"
          status={offlineDevicesCount > 5 ? "critical" : "warning"}
          onClick={() => navigate("/devices")}
        />
        <StatCard
          title="Active Alerts"
          value={activeAlertsCount}
          subtext="Open"
          icon={AlertTriangle}
          trend="+1"
          trendDirection="up"
          status={activeAlertsCount > 5 ? "warning" : "normal"}
          onClick={() => navigate("/incidents")}
        />
        <StatCard
          title="Critical Incidents"
          value={criticalIncidentsCount}
          subtext="Priority"
          icon={Flame}
          trend={criticalIncidentsCount > 0 ? "Urgent" : "Zero"}
          trendDirection={criticalIncidentsCount > 0 ? "up" : "neutral"}
          status={criticalIncidentsCount > 0 ? "critical" : "healthy"}
          onClick={() => navigate("/incidents")}
        />
        <StatCard
          title="Irrigation Zones"
          value={`${safeIrrigation.filter(z => z.pumpRunning).length} / ${safeIrrigation.length}`}
          subtext="Pumping"
          icon={Sprout}
          trend="Zone 3 Critical"
          trendDirection="down"
          status="warning"
          onClick={() => navigate("/irrigation")}
        />
        <StatCard
          title="Waste Fleet"
          value={`${safeVehicles.filter(v => v.status === "in-transit" || v.status === "collecting").length} / ${safeVehicles.length}`}
          subtext="Active"
          icon={Trash2}
          trend="3 Bins ≥90%"
          trendDirection="neutral"
          status="warning"
          onClick={() => navigate("/waste")}
        />
        <StatCard
          title="Traffic Junctions"
          value={`${safeIntersections.filter(i => i.congestionLevel === "Severe").length} / ${safeIntersections.length}`}
          subtext="Congested"
          icon={Car}
          trend="Avg 31 km/h"
          trendDirection="down"
          status="warning"
          onClick={() => navigate("/traffic")}
        />
        <StatCard
          title="Water Network"
          value={`${safeWater.filter(w => w.status === "optimal").length} / ${safeWater.length}`}
          subtext="Optimal"
          icon={Droplets}
          trend="1 Leak Flag"
          trendDirection="down"
          status="blue"
          onClick={() => navigate("/water")}
        />
        <StatCard
          title="Lighting Saved"
          value={`${lightingSummary.energySavedTodayKwh}`}
          subtext="kWh Today"
          icon={Zap}
          trend="₹9,120 saved"
          trendDirection="up"
          status="healthy"
          onClick={() => navigate("/energy")}
        />
      </div>

      {/* B. City-Wide GIS Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              City-Wide GIS Geospatial Operations
            </h3>
            <p className="text-xs text-slate-500">
              Interactive OpenStreetMap GIS layer displaying live positions of all 100 IoT devices, waste fleet, and sensors.
            </p>
          </div>
          <button
            onClick={() => navigate("/map")}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            <span>Full Map View</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <DistrictMap
          height="h-[520px]"
          showFilters={true}
          onSelectDevice={(device) => setSelectedDevice(device)}
        />
      </div>

      {/* Middle Row: C. District System Health & F. AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* C. District System Health (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">District System Health</h3>
              <p className="text-xs text-slate-500">Cross-department operational readiness</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Overall: 91.4%
            </span>
          </div>

          <div className="space-y-3">
            {sectorHealth.map((sector) => (
              <div
                key={sector.name}
                onClick={() => navigate(sector.path)}
                className="group p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition flex items-center gap-1.5">
                    {sector.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">{sector.score}%</span>
                    <Badge variant={sector.status === "healthy" ? "healthy" : sector.status === "warning" ? "warning" : "critical"}>
                      {sector.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sector.score >= 90
                        ? "bg-emerald-500"
                        : sector.score >= 80
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${sector.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>{sector.activeNodes} Nodes Monitored</span>
                  <span>{sector.issues > 0 ? `${sector.issues} Attention Items` : "Nominal"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* F. AI-Generated Insights (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-purple-200 bg-gradient-to-br from-white to-purple-50/30 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  AI Autonomous Recommendations Feed
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-mono">
                    Edge Engine
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Simulated multi-horizon predictive inferences requiring administrative review
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/ai-intelligence")}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {(aiRecommendations || [])
              .filter((r) => !r.dismissed)
              .slice(0, 4)
              .map((rec) => (
                <div
                  key={rec.id}
                  className={`rounded-xl border p-4 transition-all ${
                    rec.reviewed
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-slate-200 bg-white hover:border-purple-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                          {rec.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Forecast Horizon: {rec.forecastPeriod}
                        </span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 font-mono">
                          {rec.confidencePct}% Confidence
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{rec.problem}</h4>
                      <p className="text-[11px] text-slate-600 font-mono bg-slate-50 p-1.5 rounded border border-slate-100">
                        {rec.supportingData}
                      </p>
                      <div className="text-xs text-purple-900 font-medium pt-1">
                        <strong>Recommended SOP:</strong> {rec.recommendedAction}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3 text-xs">
                    <span className="text-slate-400 text-[11px]">Dept: {rec.department}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dismissAIRecommendation(rec.id)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition"
                      >
                        Dismiss
                      </button>
                      {rec.reviewed ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                          <CheckCircle className="h-4 w-4" />
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            if (rec.actionType === "actuator_irrigation") {
                              setActuatorModalData({
                                actuatorId: rec.targetDevice,
                                actuatorName: "Irrigation Pump DEV-ACT-002",
                                actionType: "START",
                                zoneName: "Gomati Agro Belt Beta (Zone 3)",
                                parameters: { durationMins: 45, flowRate: "120 L/min" },
                                onConfirm: () => {
                                  setActuatorState(
                                    rec.targetDevice,
                                    { power: true, pumpRunning: true },
                                    "Zone 3 Irrigation Pump Activated"
                                  );
                                  reviewAIRecommendation(rec.id, "Pump Activated");
                                }
                              });
                            } else {
                              reviewAIRecommendation(rec.id, "Approved by DM");
                            }
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 font-semibold shadow-sm transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve & Execute</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: D. Live Sensor Activity & E. Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* D. Live Sensor Activity Table (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Live IoT Sensor Stream</span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">• Periodic Controlled Tick</span>
            </div>

            {/* Category filter */}
            <select
              value={sensorCategoryFilter}
              onChange={(e) => setSensorCategoryFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Verticals</option>
              <option value="irrigation">Irrigation</option>
              <option value="waste">Waste</option>
              <option value="traffic">Traffic</option>
              <option value="water">Water</option>
              <option value="environment">Environment</option>
              <option value="flood">Flood</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Sensor Node</th>
                  <th className="py-2.5 px-3">Location & Zone</th>
                  <th className="py-2.5 px-3">Primary Reading</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentSensors.map((s) => {
                  const firstTelemetryVal = s.telemetry ? Object.values(s.telemetry)[0] : "-";
                  const firstTelemetryKey = s.telemetry ? Object.keys(s.telemetry)[0] : "";
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{s.name}</div>
                        <div className="font-mono text-[10px] text-blue-600">{s.id}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800">{s.locationName}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{s.category} • {s.zone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">
                          {String(firstTelemetryVal)}
                        </div>
                        <div className="text-[10px] text-slate-500 capitalize">
                          {firstTelemetryKey.replace(/([A-Z])/g, " $1")}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={s.status === "online" ? "healthy" : s.status === "warning" ? "warning" : "critical"}>
                          {s.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedDevice(s)}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition shadow-sm"
                          title="View Telemetry"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* E. Critical Alerts and Incidents (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                Critical Alerts & Incidents
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                  {criticalIncidentsCount} Critical
                </span>
              </h3>
              <p className="text-xs text-slate-500">Administrative escalation queue</p>
            </div>
            <button
              onClick={() => navigate("/incidents")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {activeIncidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`rounded-xl border p-3.5 space-y-2 transition-all cursor-pointer ${
                  inc.severity === "critical"
                    ? "border-rose-200 bg-rose-50/20 hover:border-rose-300"
                    : "border-amber-200 bg-amber-50/20 hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-500">{inc.id}</span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={inc.severity === "critical" ? "critical" : "warning"}>
                      {inc.severity.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-semibold text-slate-600 uppercase bg-white px-2 py-0.5 rounded border border-slate-200">
                      {inc.status}
                    </span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">{inc.title}</h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/50 pt-2">
                  <span>{inc.location}</span>
                  <span className="font-medium text-slate-700">{inc.department}</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">Logged: {inc.createdAt}</span>
                  {inc.status === "new" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        acknowledgeIncident(inc.id);
                      }}
                      className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 text-[11px] font-semibold transition"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reusable Modals */}
      <DeviceDetailModal
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
        onTriggerActuator={(device) => {
          setSelectedDevice(null);
          setActuatorModalData({
            actuatorId: device.id,
            actuatorName: device.name,
            actionType: device.actuatorState?.power || device.actuatorState?.pumpActive ? "STOP" : "START",
            zoneName: device.locationName,
            onConfirm: () => {
              const currentPower = device.actuatorState?.power || device.actuatorState?.pumpActive;
              setActuatorState(device.id, { power: !currentPower, pumpActive: !currentPower }, `${device.name} toggled`);
            }
          });
        }}
      />

      <IncidentDetailModal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        incident={selectedIncident}
      />

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

