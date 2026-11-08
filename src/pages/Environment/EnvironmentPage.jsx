import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { ComparisonBarChart } from "../../components/charts/ComparisonBarChart";
import { useApp } from "../../context/AppContext";
import { HOURLY_AQI_TRENDS } from "../../data/mockEnvironment";
import {
  Wind,
  Thermometer,
  Activity,
  AlertTriangle,
  Volume2,
  Sparkles,
  CloudRain,
  ShieldAlert,
  Compass,
  CheckCircle2
} from "lucide-react";

export const EnvironmentPage = () => {
  const { envStations, addToast } = useApp();
  const safeStations = envStations || [];
  const [selectedStation, setSelectedStation] = useState(() => (safeStations[5] || safeStations[0] || {}));

  const activeStation = safeStations.find((s) => s.id === selectedStation?.id) || selectedStation || safeStations[0] || {};

  // KPIs
  const totalStations = safeStations.length || 1;
  const avgAqi = Math.round(safeStations.reduce((acc, s) => acc + (s.aqi || 0), 0) / totalStations);
  const criticalAqiCount = safeStations.filter((s) => s.aqi > 200).length;
  const avgNoise = Math.round(safeStations.reduce((acc, s) => acc + (s.noiseDb || 0), 0) / totalStations);

  const handleDeployAntiSmog = () => {
    addToast(
      "Anti-Smog Mist Cannon Dispatched",
      `Municipal Mobile Water Cannon deployed to ${activeStation.locationName || activeStation.name} corridor.`,
      "success"
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Environment & Ambient Air Quality Observatory"
        subtitle="8 Continuous Ambient AQI Stations (CAAQMS) • Laser Particle Spectrometry • Anti-Smog Logistics"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeployAntiSmog}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
            >
              <Wind className="h-3.5 w-3.5" />
              <span>Deploy Anti-Smog Cannon</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="District Average AQI"
          value={avgAqi}
          subtext="Moderate Range"
          icon={Wind}
          trend={avgAqi > 150 ? "Unhealthy" : "Acceptable"}
          trendDirection={avgAqi > 150 ? "down" : "up"}
          status={avgAqi > 150 ? "warning" : "healthy"}
        />
        <StatCard
          title="Hotspot Exceedances"
          value={criticalAqiCount}
          subtext="Stations > 200 AQI"
          icon={AlertTriangle}
          trend="Sector 8 & Chowk"
          trendDirection="down"
          status={criticalAqiCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Average Ambient Temp"
          value="28.4°C"
          subtext="60% Relative Humidity"
          icon={Thermometer}
          trend="Wind: 11 km/h NW"
          trendDirection="neutral"
          status="normal"
        />
        <StatCard
          title="Urban Noise Index"
          value={`${avgNoise} dB`}
          subtext="Ambient Level"
          icon={Volume2}
          trend="Peak 76 dB at Chowk"
          trendDirection="neutral"
          status={avgNoise > 65 ? "warning" : "normal"}
        />
      </div>

      {/* Main Grid: Stations List & Station Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Ambient Air Stations (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">CAAQMS Monitoring Stations</h3>
              <p className="text-xs text-slate-500">Real-time laser particulate & multi-gas telemetry</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              8 Stations
            </span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {safeStations.map((station) => (
              <div
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                  selectedStation.id === station.id
                    ? "border-teal-500 bg-teal-50/20 ring-1 ring-teal-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {station.id}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{station.name}</h4>
                  </div>
                  <Badge variant={station.aqi > 200 ? "critical" : station.aqi > 150 ? "warning" : "healthy"}>
                    AQI {station.aqi}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">PM2.5</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{station.pm25} µg/m³</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">PM10</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{station.pm10} µg/m³</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400">Noise</span>
                    <div className="font-bold text-slate-900 font-mono mt-0.5">{station.noiseDb} dB</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Zone: {station.zone}</span>
                  <span>Primary: <strong>{station.primaryPollutant}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Station Detail & Diurnal Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Station In-depth Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-teal-600">{activeStation.id} CAAQMS TELEMETRY</span>
                <h3 className="text-base font-bold text-slate-900">{activeStation.name}</h3>
              </div>
              <Badge variant={activeStation.aqi > 200 ? "critical" : activeStation.aqi > 150 ? "warning" : "healthy"}>
                {(activeStation.category || "Moderate").toUpperCase()}
              </Badge>
            </div>

            {/* Pollutants Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">PM 2.5</span>
                <div className="font-bold text-slate-900 text-lg font-mono mt-1">{activeStation.pm25} µg/m³</div>
                <div className="text-[10px] text-slate-500">Standard &lt; 60</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">PM 10</span>
                <div className="font-bold text-slate-900 text-lg font-mono mt-1">{activeStation.pm10} µg/m³</div>
                <div className="text-[10px] text-slate-500">Standard &lt; 100</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Nitrogen Dioxide (NO₂)</span>
                <div className="font-bold text-slate-900 text-lg font-mono mt-1">{activeStation.no2} ppb</div>
                <div className="text-[10px] text-slate-500">Vehicular Exhaust</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Sulfur Dioxide (SO₂)</span>
                <div className="font-bold text-slate-900 text-lg font-mono mt-1">{activeStation.so2} ppb</div>
                <div className="text-[10px] text-slate-500">Industrial Boiler</div>
              </div>
            </div>

            {/* Environmental Microclimate */}
            <div className="grid grid-cols-3 gap-3 text-xs pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-700">
                <Thermometer className="h-4 w-4 text-rose-500" />
                <span>Ambient Temp: <strong>{activeStation.tempC}°C</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CloudRain className="h-4 w-4 text-blue-500" />
                <span>Humidity: <strong>{activeStation.humidityPct}%</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Compass className="h-4 w-4 text-indigo-500" />
                <span>Wind: <strong>{activeStation.windSpeedKmph} km/h {activeStation.windDirection}</strong></span>
              </div>
            </div>
          </div>

          {/* AI Environmental Advisory */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-purple-100 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  AI 24-Hour Environmental Forecast & Mitigation Advisory
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                88% Confidence
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-purple-100">
              <strong>Stagnation Alert:</strong> Nocturnal wind speeds dropping below 5 km/h will trap particulate
              emissions from Industrial Sector 8 over residential areas in Zone 6. Automated dispatch of Anti-Smog
              Mobile Cannons is recommended along Sector 8 arterial road between 20:00 and 04:00.
            </p>
          </div>

          {/* Hourly AQI Profile Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">24-Hour District AQI & Particulate Inversion Curve</h3>
            <TrendChart
              data={HOURLY_AQI_TRENDS}
              dataKeys={[
                { key: "avgAqi", name: "Average AQI", color: "#0d9488" },
                { key: "pm25", name: "PM 2.5 (µg/m³)", color: "#ea580c" },
                { key: "pm10", name: "PM 10 (µg/m³)", color: "#7c3aed" }
              ]}
              xAxisKey="hour"
              height={220}
              unit="AQI"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

