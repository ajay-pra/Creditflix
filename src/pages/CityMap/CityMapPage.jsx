import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { DistrictMap } from "../../components/maps/DistrictMap";
import { DeviceDetailModal } from "../../components/modals/DeviceDetailModal";
import { useApp } from "../../context/AppContext";
import { MapPin, Layers, Radio, Activity, Search, ShieldCheck } from "lucide-react";

export const CityMapPage = () => {
  const { devices, districtInfo, zones } = useApp();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeZone, setActiveZone] = useState("all");

  const filteredDevices = activeZone === "all"
    ? devices
    : devices.filter((d) => d.zone === activeZone);

  return (
    <div className="space-y-5">
      <Breadcrumb
        title="GIS Geospatial District Command Map"
        subtitle="Full-District GIS Visualisation • 100 IoT Telemetry Endpoints • Creditfix District Administration"
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              Coordinates: 26.8500° N, 80.9400° E
            </span>
          </div>
        }
      />

      {/* Zone Overview Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveZone("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
            activeZone === "all"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          All Zones (6)
        </button>
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setActiveZone(z.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 ${
              activeZone === z.id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: z.color }}></span>
            <span>{z.name}</span>
          </button>
        ))}
      </div>

      {/* Main Large Map */}
      <DistrictMap
        height="h-[680px]"
        showFilters={true}
        onSelectDevice={(device) => setSelectedDevice(device)}
      />

      {/* Device Inspector Modal */}
      <DeviceDetailModal
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
      />
    </div>
  );
};

