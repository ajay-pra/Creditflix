import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Badge } from "../common/Badge";
import { Cpu, Wifi, Battery, Clock, MapPin, Activity, Power, Settings, ShieldCheck, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const DeviceDetailModal = ({ isOpen, onClose, device, onTriggerActuator }) => {
  const { setActuatorState, addToast } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!device) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast("Diagnostics Refreshed", `Polled latest telemetry packet for ${device.id}.`, "info");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Device Registry: ${device.name}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Top Header Card */}
        <div className="flex items-start justify-between rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {device.id}
              </span>
              <Badge variant={device.status === "online" ? "healthy" : device.status === "warning" ? "warning" : "critical"}>
                {device.status.toUpperCase()}
              </Badge>
              {device.isActuator && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  Actuator Node
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-slate-900">{device.name}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{device.locationName} ({device.zone})</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-slate-500">[{device.coordinates.join(", ")}]</span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Poll Telemetry</span>
          </button>
        </div>

        {/* Hardware & Radio Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 p-3 bg-white">
            <div className="text-slate-500 font-medium flex items-center gap-1.5 mb-1">
              <Wifi className="h-3.5 w-3.5 text-blue-600" />
              Network
            </div>
            <div className="font-bold text-slate-900">{device.connectivity}</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">{device.signalStrength} dBm</div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-white">
            <div className="text-slate-500 font-medium flex items-center gap-1.5 mb-1">
              <Battery className="h-3.5 w-3.5 text-emerald-600" />
              Power Source
            </div>
            <div className="font-bold text-slate-900">{device.battery}% Battery</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Solar + Supercap</div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-white">
            <div className="text-slate-500 font-medium flex items-center gap-1.5 mb-1">
              <Cpu className="h-3.5 w-3.5 text-indigo-600" />
              Firmware
            </div>
            <div className="font-bold text-slate-900 font-mono">{device.firmwareVersion}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">OTA Up-to-date</div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-white">
            <div className="text-slate-500 font-medium flex items-center gap-1.5 mb-1">
              <Clock className="h-3.5 w-3.5 text-slate-600" />
              Last Packet
            </div>
            <div className="font-bold text-slate-900">{device.lastCommunication}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Packet loss: 0.0%</div>
          </div>
        </div>

        {/* Live Telemetry Readings */}
        {device.telemetry && (
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-blue-600" />
              Live Sensor Telemetry
            </h5>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(device.telemetry).map(([key, val]) => (
                <div key={key} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {typeof val === "number" ? val.toLocaleString() : String(val)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actuator Controls (If Actuator) */}
        {device.isActuator && (
          <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-purple-700" />
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                  Actuator State & Controls
                </span>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Mode: {device.actuatorState?.mode || "auto"}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-slate-700">
                Current State:{" "}
                <strong className={device.actuatorState?.power || device.actuatorState?.pumpActive ? "text-emerald-700" : "text-slate-600"}>
                  {device.actuatorState?.power || device.actuatorState?.pumpActive ? "ACTIVATED / RUNNING" : "STANDBY / OFF"}
                </strong>
              </div>
              <button
                onClick={() => {
                  if (onTriggerActuator) {
                    onTriggerActuator(device);
                  } else {
                    const isCurrentlyOn = device.actuatorState?.power || device.actuatorState?.pumpActive;
                    setActuatorState(
                      device.id,
                      { power: !isCurrentlyOn, pumpActive: !isCurrentlyOn },
                      `${device.name} state changed to ${!isCurrentlyOn ? "ON" : "OFF"}`
                    );
                  }
                }}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white shadow transition ${
                  device.actuatorState?.power || device.actuatorState?.pumpActive
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {device.actuatorState?.power || device.actuatorState?.pumpActive ? "Halt Actuator" : "Activate Actuator"}
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
