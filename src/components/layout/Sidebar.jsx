import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Sprout,
  Trash2,
  Car,
  Droplets,
  Wind,
  AlertTriangle,
  Lightbulb,
  Building2,
  Cpu,
  Sparkles,
  BellRing,
  FileText,
  FileBarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const NAV_ITEMS = [
  { path: "/", label: "Command Centre", icon: LayoutDashboard, badge: "Live" },
  { path: "/map", label: "GIS District Map", icon: Map },
  { path: "/irrigation", label: "Smart Irrigation", icon: Sprout },
  { path: "/waste", label: "Waste Management", icon: Trash2 },
  { path: "/traffic", label: "Traffic Management", icon: Car },
  { path: "/water", label: "Water & SCADA", icon: Droplets },
  { path: "/environment", label: "Environment & AQI", icon: Wind },
  { path: "/disaster", label: "Disaster & Flood", icon: AlertTriangle },
  { path: "/energy", label: "Energy & Lighting", icon: Lightbulb },
  { path: "/infrastructure", label: "Infrastructure", icon: Building2 },
  { path: "/devices", label: "IoT Device Registry", icon: Cpu, countKey: "devices" },
  { path: "/ai-intelligence", label: "AI Forecasting", icon: Sparkles, highlight: true },
  { path: "/incidents", label: "Citizen Grievances", icon: BellRing, countKey: "incidents" },
  { path: "/files", label: "e-Daftar File Tracker", icon: FileText, badge: "QR" },
  { path: "/reports", label: "Reports & Analytics", icon: FileBarChart2 },
  { path: "/settings", label: "Admin & Settings", icon: Settings }
];

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { incidents, devices } = useApp();
  const criticalCount = (incidents || []).filter((i) => i.severity === "critical" && i.status !== "resolved").length;

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header / District Emblem */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 bg-slate-950/40">
        {!isCollapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold text-lg">
              🏛️
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-extrabold text-white tracking-tight truncate">
                CREDITFIX AI
              </h1>
              <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider truncate">
                Collectorate Command Centre
              </p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-base font-bold">
            🏛️
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                    : item.highlight
                    ? "text-purple-300 hover:bg-purple-950/40 hover:text-purple-200"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                } ${isCollapsed ? "justify-center px-0" : ""}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  item.highlight ? "text-purple-400" : ""
                }`}
              />

              {!isCollapsed && (
                <span className="flex-1 truncate tracking-tight">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {item.badge}
                </span>
              )}

              {!isCollapsed && item.countKey === "incidents" && criticalCount > 0 && (
                <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  {criticalCount}
                </span>
              )}

              {!isCollapsed && item.highlight && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                  AI
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span>District Status</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Nominal
            </span>
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Proof of Concept • Simulated Digital Twin
          </div>
        </div>
      )}
    </aside>
  );
};

