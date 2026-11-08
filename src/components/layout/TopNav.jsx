import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Zap,
  User,
  ChevronDown,
  Clock,
  ShieldAlert,
  MapPin
} from "lucide-react";
import { useApp, DEMO_ROLES } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export const TopNav = ({ isSidebarCollapsed }) => {
  const {
    districtInfo,
    currentRole,
    setCurrentRole,
    isSimulating,
    toggleSimulation,
    simSpeed,
    changeSimulationSpeed,
    resetDemoData,
    globalSearch,
    setGlobalSearch,
    incidents,
    setIsAIAssistantOpen
  } = useApp();

  const navigate = useNavigate();
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Live Clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
      setDateString(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const criticalIncidentsCount = (incidents || []).filter(
    (i) => i.severity === "critical" && i.status !== "resolved"
  ).length;

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
        isSidebarCollapsed ? "left-20" : "left-64"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-3">
        {/* Left: District Location Badge & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          {/* District Selector Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-1.5 border border-slate-200 text-xs font-semibold text-slate-800">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span className="truncate">{districtInfo.name}</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-mono">
              {districtInfo.code}
            </span>
          </div>

          {/* Global Search Bar */}
          <div
            className={`relative flex-1 transition-all ${
              isSearchFocused ? "ring-2 ring-blue-500 rounded-xl" : ""
            }`}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search sensors, actuators, zones, incidents, tickets..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Date & Time Widget */}
          <div className="hidden xl:flex flex-col items-end text-right border-r border-slate-200 pr-3">
            <span className="text-xs font-bold text-slate-900 font-mono tracking-tight flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600" />
              {timeString}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">{dateString}</span>
          </div>

          {/* Central Simulation Controller Widget */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100/70 p-1">
            <button
              onClick={toggleSimulation}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-sm ${
                isSimulating
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
              title={isSimulating ? "Pause IoT Telemetry Simulation" : "Resume Telemetry Simulation"}
            >
              {isSimulating ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span className="hidden sm:inline">LIVE</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span className="hidden sm:inline">PAUSED</span>
                </>
              )}
            </button>

            {/* Speed Selector */}
            <div className="hidden md:flex items-center gap-0.5 text-[11px] font-bold text-slate-600">
              {[1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => changeSimulationSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded ${
                    simSpeed === spd
                      ? "bg-white text-blue-700 shadow-sm"
                      : "hover:bg-slate-200 text-slate-500"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Reset Demo Button */}
            <button
              onClick={resetDemoData}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition"
              title="Reset Demo Data to Initial Baseline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 text-xs font-semibold shadow-sm shadow-purple-600/20 transition active:scale-95"
            title="Open Vasudha AI Copilot"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Incident Notifications Bell */}
          <button
            onClick={() => navigate("/incidents")}
            className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
            title="Active Incidents"
          >
            <Bell className="h-4 w-4" />
            {criticalIncidentsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow">
                {criticalIncidentsCount}
              </span>
            )}
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 sm:px-2.5 sm:py-1.5 hover:bg-slate-50 transition shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  {currentRole.label}
                </div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                  Demo User
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-fade-in">
                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Switch Administrative Demo Role
                </div>
                <div className="py-1 space-y-1">
                  {DEMO_ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        currentRole.id === r.id
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{r.label}</span>
                      {currentRole.id === r.id && (
                        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

