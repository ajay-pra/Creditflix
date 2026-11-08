import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { TrendChart } from "../../components/charts/TrendChart";
import { ComparisonBarChart } from "../../components/charts/ComparisonBarChart";
import { useApp } from "../../context/AppContext";
import { exportToCSV } from "../../services/exportService";
import {
  FileBarChart2,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers
} from "lucide-react";

export const ReportsPage = () => {
  const {
    devices,
    incidents,
    irrigationZones,
    wasteBins,
    lightingSummary,
    districtInfo,
    addToast
  } = useApp();

  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  // Performance datasets for reports
  const departmentPerformance = [
    { name: "Water Supply", resolved: 28, total: 30, ratePct: 93.3 },
    { name: "Waste Mgmt", resolved: 42, total: 45, ratePct: 93.3 },
    { name: "Traffic Police", resolved: 35, total: 38, ratePct: 92.1 },
    { name: "Agriculture", resolved: 18, total: 19, ratePct: 94.7 },
    { name: "Pollution Ctrl", resolved: 14, total: 16, ratePct: 87.5 },
    { name: "Disaster (DDMA)", resolved: 12, total: 12, ratePct: 100.0 },
    { name: "PWD Infra", resolved: 22, total: 24, ratePct: 91.6 },
    { name: "DISCOM Lighting", resolved: 29, total: 30, ratePct: 96.6 }
  ];

  const handleExportIncidentsCSV = () => {
    const rows = (incidents || []).map((i) => ({
      ID: i.id,
      Title: i.title,
      Severity: i.severity,
      Status: i.status,
      Department: i.department,
      AssignedOfficer: i.assignedOfficer,
      Location: i.location,
      Zone: i.zone,
      CreatedTime: i.createdAt,
      DueDate: i.dueDate
    }));
    exportToCSV(`Vasudha_District_Incidents_${new Date().toISOString().slice(0, 10)}.csv`, rows);
    addToast("CSV Export Generated", "Downloaded complete District Incidents dataset.", "success");
  };

  const handleExportDevicesCSV = () => {
    const rows = (devices || []).map((d) => ({
      DeviceID: d.id,
      Name: d.name,
      Category: d.category,
      Status: d.status,
      Zone: d.zone,
      Location: d.locationName,
      Connectivity: d.connectivity,
      BatteryPct: d.battery,
      SignalDbm: d.signalStrength,
      Firmware: d.firmwareVersion
    }));
    exportToCSV(`Vasudha_IoT_Fleet_Registry_${new Date().toISOString().slice(0, 10)}.csv`, rows);
    addToast("CSV Export Generated", "Downloaded complete IoT Fleet Registry dataset.", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-0">
      <Breadcrumb
        title="District Executive Reports & Governance Analytics"
        subtitle="SLA Resolution Rates • Inter-Departmental Metrics • Official Review Dossier"
        actions={
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={handleExportIncidentsCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Incidents CSV</span>
            </button>
            <button
              onClick={handleExportDevicesCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export IoT Devices CSV</span>
            </button>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">Audit Period:</span>
          {["Today", "Last 7 Days", "This Month", "Quarter-to-Date"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                dateRange === range
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Reporting District: <strong>{districtInfo.name} ({districtInfo.code})</strong>
        </div>
      </div>

      {/* Printable Report Header */}
      <div className="hidden print:block p-4 border-b border-slate-300">
        <h1 className="text-2xl font-bold text-slate-900">VASUDHA SMART DISTRICT COMMAND CENTRE</h1>
        <p className="text-xs text-slate-600">Executive Performance Audit & IoT Operations Review Dossier</p>
        <div className="text-xs text-slate-500 mt-1">Generated for District Magistrate & Collector Review</div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Incident Resolution Rate"
          value="94.2%"
          subtext="Within SLA"
          icon={CheckCircle2}
          trend="+2.1% vs target"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="IoT Fleet Availability"
          value="96.5%"
          subtext="284/294 Active"
          icon={Activity}
          trend="LoRaWAN 99.8% RSSI"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Energy Reduction"
          value="1,140 kWh"
          subtext="Daily Dimming"
          icon={TrendingUp}
          trend="₹9,120 conserved"
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Water Loss Index"
          value="4.2%"
          subtext="Distribution Loss"
          icon={Activity}
          trend="Benchmark &lt; 15%"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Department SLA Performance Bar Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Departmental Incident Resolution & SLA Performance</h3>
            <p className="text-xs text-slate-500">Resolved vs Total registered citizen tickets and telemetry alerts</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            District Mean: 94.2%
          </span>
        </div>

        <ComparisonBarChart
          data={departmentPerformance}
          dataKeys={[
            { key: "resolved", name: "Resolved on-time", color: "#16a34a" },
            { key: "total", name: "Total Incident Intake", color: "#64748b" }
          ]}
          xAxisKey="name"
          height={260}
          unit="tickets"
        />
      </div>

      {/* Department Summary Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Departmental Governance Scorecard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Total Inflow</th>
                <th className="py-2.5 px-3">Resolved</th>
                <th className="py-2.5 px-3">SLA Compliance Rate</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentPerformance.map((dept) => (
                <tr key={dept.name} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 font-semibold text-slate-900">{dept.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{dept.total}</td>
                  <td className="py-3 px-3 font-mono text-emerald-700 font-bold">{dept.resolved}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 w-12">{dept.ratePct}%</span>
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${dept.ratePct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      EXCELLENT
                    </span>
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

