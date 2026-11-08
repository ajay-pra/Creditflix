import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { DISTRICT_INFO, DISTRICT_ZONES } from "../../data/mockLocations";
import { useApp } from "../../context/AppContext";
import { Badge } from "../common/Badge";
import { Layers, Activity, Eye, Power, Navigation2, Filter } from "lucide-react";

// Helper to create modern glowing SVG DivIcons for Leaflet
const createCustomIcon = (category, status = "online", label = "") => {
  const colors = {
    irrigation: { bg: "#059669", ring: "#34d399", symbol: "🌱" },
    waste: { bg: "#d97706", ring: "#fbbf24", symbol: "🗑️" },
    traffic: { bg: "#ea580c", ring: "#fb923c", symbol: "🚦" },
    water: { bg: "#0284c7", ring: "#38bdf8", symbol: "💧" },
    environment: { bg: "#0d9488", ring: "#2dd4bf", symbol: "🍃" },
    flood: { bg: "#e11d48", ring: "#fb7185", symbol: "🌊" },
    lighting: { bg: "#ca8a04", ring: "#facc15", symbol: "💡" },
    infrastructure: { bg: "#6366f1", ring: "#a5b4fc", symbol: "🏛️" },
    vehicle: { bg: "#2563eb", ring: "#60a5fa", symbol: "🚛" }
  };

  const scheme = colors[category] || { bg: "#475569", ring: "#94a3b8", symbol: "📍" };
  const isCritical = status === "critical";

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      ${
        isCritical
          ? `<span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${scheme.bg}; opacity: 0.6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
          : ""
      }
      <div style="
        width: 30px; 
        height: 30px; 
        border-radius: 50%; 
        background: ${scheme.bg}; 
        border: 2px solid #ffffff; 
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 13px;
        color: white;
        cursor: pointer;
      ">
        ${scheme.symbol}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-leaflet-marker",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

export const DistrictMap = ({
  height = "h-[560px]",
  showFilters = true,
  selectedCategory: initialCategory = "all",
  onSelectDevice
}) => {
  const { devices, activeRoute, zones } = useApp();
  const [filterCategory, setFilterCategory] = useState(initialCategory);
  const [showZoneBoundaries, setShowZoneBoundaries] = useState(true);

  // Filter markers based on selected category
  const filteredDevices = useMemo(() => {
    if (filterCategory === "all") return devices;
    return devices.filter((d) => d.category === filterCategory);
  }, [devices, filterCategory]);

  const categories = [
    { id: "all", label: "All Assets", count: devices.length },
    { id: "irrigation", label: "Irrigation", count: devices.filter((d) => d.category === "irrigation").length },
    { id: "waste", label: "Waste", count: devices.filter((d) => d.category === "waste").length },
    { id: "traffic", label: "Traffic", count: devices.filter((d) => d.category === "traffic").length },
    { id: "water", label: "Water", count: devices.filter((d) => d.category === "water").length },
    { id: "environment", label: "Environment", count: devices.filter((d) => d.category === "environment").length },
    { id: "flood", label: "Disaster", count: devices.filter((d) => d.category === "flood").length },
    { id: "lighting", label: "Lighting", count: devices.filter((d) => d.category === "lighting").length },
    { id: "infrastructure", label: "Infra", count: devices.filter((d) => d.category === "infrastructure").length }
  ];

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col`}>
      {/* Map Filter Controls Bar */}
      {showFilters && (
        <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/80 shadow-md pointer-events-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition flex items-center gap-1.5 ${
                  filterCategory === cat.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filterCategory === cat.id ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md pointer-events-auto text-xs">
            <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={showZoneBoundaries}
                onChange={(e) => setShowZoneBoundaries(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
              />
              <span>Zone Buffers</span>
            </label>
          </div>
        </div>
      )}

      {/* Leaflet Map Container */}
      <MapContainer
        center={DISTRICT_INFO.center}
        zoom={DISTRICT_INFO.zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Zone Radii / Buffers */}
        {showZoneBoundaries &&
          zones.map((zone) => (
            <Circle
              key={zone.id}
              center={zone.center}
              radius={1800}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.08,
                weight: 1.5,
                dashArray: "4, 6"
              }}
            />
          ))}

        {/* Dynamic Route Polyline if generated */}
        {activeRoute && activeRoute.routePolyline && (
          <Polyline
            positions={activeRoute.routePolyline}
            pathOptions={{
              color: "#2563eb",
              weight: 4,
              opacity: 0.85,
              dashArray: "8, 6"
            }}
          />
        )}

        {/* Device Markers */}
        {filteredDevices.map((device) => (
          <Marker
            key={device.id}
            position={device.coordinates}
            icon={createCustomIcon(device.category, device.status)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-1 space-y-2 max-w-xs text-xs font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {device.id}
                  </span>
                  <Badge variant={device.status === "online" ? "healthy" : "warning"}>
                    {device.status.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{device.name}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{device.locationName}</p>
                </div>

                {device.telemetry && (
                  <div className="rounded-lg bg-slate-50 p-2 border border-slate-200/60 grid grid-cols-2 gap-1.5 text-[11px]">
                    {Object.entries(device.telemetry).slice(0, 4).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, " $1")}: </span>
                        <strong className="text-slate-800">{String(v)}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                  <span>Ping: {device.lastCommunication}</span>
                  {onSelectDevice && (
                    <button
                      onClick={() => onSelectDevice(device)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5"
                    >
                      <Eye className="h-3 w-3" />
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Footer */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-3 text-[11px] text-slate-600">
        <span className="font-semibold text-slate-900">Map Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>Irrigation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span>Waste</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-orange-500"></span>
          <span>Traffic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
          <span>Water</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500"></span>
          <span>Flood</span>
        </div>
      </div>
    </div>
  );
};
