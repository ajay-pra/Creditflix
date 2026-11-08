import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { useApp } from "../../context/AppContext";
import {
  Building2,
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Hammer,
  ShieldCheck,
  Search,
  ExternalLink,
  Plus
} from "lucide-react";

export const InfrastructurePage = () => {
  const { infraAssets, addToast } = useApp();
  const [selectedAsset, setSelectedAsset] = useState(infraAssets[3]); // Cyber City Expressway Flyover (Grade C)
  const [typeFilter, setTypeFilter] = useState("all");

  const totalAssets = infraAssets.length;
  const gradeACount = infraAssets.filter((a) => a.conditionGrade === "A").length;
  const gradeCCount = infraAssets.filter((a) => a.conditionGrade === "C" || a.conditionGrade === "D").length;
  const avgHealthIndex = Math.round(infraAssets.reduce((acc, a) => acc + a.structuralHealthIndex, 0) / totalAssets);

  const filteredAssets = infraAssets.filter((a) => {
    if (typeFilter === "all") return true;
    return a.type.toLowerCase().includes(typeFilter.toLowerCase());
  });

  const handleCreateWorkOrder = (asset) => {
    addToast(
      "PWD Maintenance Work Order Logged",
      `Routine non-destructive testing scheduled for ${asset.name} (Assigned: ${asset.assignedEngineer}).`,
      "success"
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Public Infrastructure & Civil Structural Health (SHM)"
        subtitle="20 Strategic Assets • Bridges, Flyovers & Historic Heritage • MEMS Vibration & Tilt Telemetry"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCreateWorkOrder(selectedAsset)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Hammer className="h-3.5 w-3.5" />
              <span>Issue PWD Work Order</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Monitored Assets"
          value={totalAssets}
          subtext="Strategic Assets"
          icon={Building2}
          trend="Bridge & Viaduct SHM"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Structural Grade A"
          value={gradeACount}
          subtext="Excellent Integrity"
          icon={CheckCircle2}
          trend={`${Math.round((gradeACount / totalAssets) * 100)}% of assets`}
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Attention / Grade C"
          value={gradeCCount}
          subtext="Requires Review"
          icon={AlertTriangle}
          trend="Cyber City Deck 7"
          trendDirection="down"
          status={gradeCCount > 0 ? "warning" : "healthy"}
        />
        <StatCard
          title="Average Health Score"
          value={`${avgHealthIndex} / 100`}
          subtext="Composite Index"
          icon={Activity}
          trend="All clear for mass transit"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Main Grid: Assets Table & Asset Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Assets Table (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Strategic Civil Infrastructure Registry</h3>
              <p className="text-xs text-slate-500">Continuous triaxial accelerometer and strain gauge telemetry</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {["all", "bridges", "buildings", "storm drains"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition ${
                    typeFilter === f
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Condition Grade</th>
                  <th className="py-2.5 px-3">Health Index</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`transition cursor-pointer ${
                      selectedAsset.id === asset.id ? "bg-blue-50/40" : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{asset.name}</div>
                      <div className="font-mono text-[10px] text-blue-600">{asset.id} • {asset.zone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-600 text-[11px] font-medium">{asset.type}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono ${
                          asset.conditionGrade === "A"
                            ? "bg-emerald-100 text-emerald-800"
                            : asset.conditionGrade === "B"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        Grade {asset.conditionGrade}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 font-mono">{asset.structuralHealthIndex}%</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="rounded-lg border border-slate-200 p-1 text-slate-500 hover:text-blue-600 transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Selected Asset Dossier (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-blue-600">{selectedAsset.id} DOSSIER</span>
              <h3 className="text-sm font-bold text-slate-900">{selectedAsset.name}</h3>
            </div>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                selectedAsset.conditionGrade === "A"
                  ? "bg-emerald-100 text-emerald-800"
                  : selectedAsset.conditionGrade === "B"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              Grade {selectedAsset.conditionGrade}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 font-medium">Responsible Authority & Inspection</div>
              <div className="font-bold text-slate-900">{selectedAsset.responsibleDept}</div>
              <div className="text-slate-600">Nodal Engineer: <strong>{selectedAsset.assignedEngineer}</strong></div>
              <div className="text-slate-500 text-[11px] pt-1">
                Last Inspection: {selectedAsset.lastInspection} • Next Due: <strong>{selectedAsset.nextInspectionDue}</strong>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Peak Vibration</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-0.5">
                  {selectedAsset.metrics?.peakVibrationG || 0.015} g
                </div>
                <div className="text-[10px] text-slate-500">MEMS Accelerometer</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tilt Excursion</span>
                <div className="font-bold text-slate-900 text-base font-mono mt-0.5">
                  {selectedAsset.metrics?.tiltDegrees || 0.02}°
                </div>
                <div className="text-[10px] text-slate-500">Biaxial Inclinometer</div>
              </div>
            </div>

            {/* Work order trigger */}
            <div className="pt-2">
              <button
                onClick={() => handleCreateWorkOrder(selectedAsset)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2.5 text-xs font-semibold shadow transition"
              >
                <Hammer className="h-4 w-4" />
                <span>Schedule Preventive Non-Destructive Inspection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
