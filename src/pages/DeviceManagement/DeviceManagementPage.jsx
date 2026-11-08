import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { DeviceDetailModal } from "../../components/modals/DeviceDetailModal";
import { useApp } from "../../context/AppContext";
import { DEVICE_CATEGORIES } from "../../data/mockDevices";
import {
  Cpu,
  Radio,
  Wifi,
  Battery,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Power,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export const DeviceManagementPage = () => {
  const { devices, setDevices, addToast } = useApp();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // KPIs
  const totalCount = devices.length;
  const onlineCount = devices.filter((d) => d.status === "online").length;
  const warningCount = devices.filter((d) => d.status === "warning").length;
  const actuatorCount = devices.filter((d) => d.isActuator).length;

  // Filtered devices
  const filteredDevices = devices.filter((d) => {
    if (categoryFilter !== "all" && d.category !== categoryFilter) return false;
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    if (
      searchQuery &&
      !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleDeactivate = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, status: d.status === "offline" ? "online" : "offline" } : d))
    );
    addToast("Device State Updated", `Node ${deviceId} connectivity state modified.`, "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Central IoT Device Registry & Edge Management"
        subtitle="100 Registered IoT Telemetry Endpoints • LoRaWAN, 4G/NB-IoT & Fiber • SCADA Actuators"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast("Device Registration Wizard", "Digital Twin Provisioning initialized for new edge gateway.", "info")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Register IoT Node</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Devices"
          value={totalCount}
          subtext="IoT Fleet Nodes"
          icon={Cpu}
          trend="100% Provisioned"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Nominal / Online"
          value={onlineCount}
          subtext="Healthy Nodes"
          icon={CheckCircle2}
          trend={`${Math.round((onlineCount / totalCount) * 100)}% Online`}
          trendDirection="up"
          status="healthy"
        />
        <StatCard
          title="Warning / Degraded"
          value={warningCount}
          subtext="Attention Items"
          icon={AlertTriangle}
          trend="Low Battery / Calibration"
          trendDirection="down"
          status={warningCount > 0 ? "warning" : "healthy"}
        />
        <StatCard
          title="SCADA Actuator Nodes"
          value={actuatorCount}
          subtext="Controllers & Relays"
          icon={Power}
          trend="Pumps & Sluice Gates"
          trendDirection="neutral"
          status="purple"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {DEVICE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition ${
                categoryFilter === c.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search & Status */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
          </select>

          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, location..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Device Inventory ({filteredDevices.length} Nodes)</h3>
            <p className="text-xs text-slate-500">Click any row to open hardware diagnostics and raw telemetry</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Device ID</th>
                <th className="py-2.5 px-3">Device Name & Type</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Location & Zone</th>
                <th className="py-2.5 px-3">Connectivity</th>
                <th className="py-2.5 px-3">Power / Battery</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDevices.slice(0, 15).map((device) => (
                <tr
                  key={device.id}
                  onClick={() => setSelectedDevice(device)}
                  className="hover:bg-slate-50/80 transition cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{device.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{device.name}</div>
                    <div className="text-[10px] text-slate-400">{device.type}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="capitalize font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {device.category}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-800">{device.locationName}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{device.zone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{device.connectivity}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{device.signalStrength} dBm</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-800">{device.battery}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={device.status === "online" ? "healthy" : device.status === "warning" ? "warning" : "critical"}>
                      {device.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleDeactivate(device.id)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition shadow-xs"
                    >
                      {device.status === "offline" ? "Activate" : "Deactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeviceDetailModal
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
      />
    </div>
  );
};
