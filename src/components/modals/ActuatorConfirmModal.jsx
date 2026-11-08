import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { ShieldAlert, CheckCircle2, AlertTriangle, Power, Clock, Gauge, Wifi } from "lucide-react";

export const ActuatorConfirmModal = ({
  isOpen,
  onClose,
  actuatorName,
  actuatorId,
  actionType = "START", // "START" | "STOP" | "ADJUST"
  zoneName,
  parameters = {},
  onConfirm
}) => {
  const [agreedSafety, setAgreedSafety] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const isStart = actionType === "START";

  const handleExecute = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onConfirm();
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="District SCADA Actuator Safety Authorization"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Warning Banner */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-3.5">
          <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold">Mandatory Operator Verification:</span> Physical actuators
            (pumps, flood sluice gates, and high-voltage grid switches) require explicit administrative
            command authorization. Automated AI suggestions do not auto-trigger device actuation without
            human-in-the-loop sign-off.
          </div>
        </div>

        {/* Actuator Summary Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <div className="text-xs text-slate-500 font-mono">DEVICE ID: {actuatorId}</div>
              <div className="text-sm font-bold text-slate-900">{actuatorName}</div>
            </div>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                isStart ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              ACTION: {actionType}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Gauge className="h-4 w-4 text-blue-600" />
              <span>Target Zone: <strong className="text-slate-900">{zoneName || "Zone 3"}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Wifi className="h-4 w-4 text-emerald-600" />
              <span>Telemetry: <strong className="text-emerald-700">Online (-62 dBm)</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span>Duration: <strong className="text-slate-900">{parameters.durationMins || 45} mins</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Power className="h-4 w-4 text-amber-600" />
              <span>Flow / Rating: <strong className="text-slate-900">{parameters.flowRate || "120 L/min"}</strong></span>
            </div>
          </div>
        </div>

        {/* Automated Safety Pre-Checks */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Automated System Safety Pre-Checks
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Upstream reservoir water availability verified (84.5% capacity).</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Electrical phase voltage within normal limits (232V 3-Phase).</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Operating limits within environmental safety parameters.</span>
            </div>
          </div>
        </div>

        {/* Checkbox confirmation */}
        <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer transition">
          <input
            type="checkbox"
            checked={agreedSafety}
            onChange={(e) => setAgreedSafety(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-slate-700 leading-normal select-none">
            I verify that I have reviewed the telemetry conditions and authorize this actuator dispatch
            under standard operating procedures.
          </span>
        </label>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            disabled={!agreedSafety || isAuthorizing}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white shadow transition ${
              isStart
                ? "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
                : "bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
            }`}
          >
            <Power className="h-3.5 w-3.5" />
            {isAuthorizing ? "Transmitting..." : isStart ? "Confirm & Activate Actuator" : "Confirm & Shutdown Actuator"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
