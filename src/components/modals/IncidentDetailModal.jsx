import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Badge } from "../common/Badge";
import { AlertTriangle, UserCheck, Clock, Building, CheckCircle2, History, MessageSquare, Send } from "lucide-react";
import { useApp, DEMO_ROLES } from "../../context/AppContext";
import { INCIDENT_STATUSES, DEPARTMENTS } from "../../data/mockAlerts";

export const IncidentDetailModal = ({ isOpen, onClose, incident }) => {
  const { updateIncidentStatus, assignIncident, currentRole } = useApp();
  const [selectedStatus, setSelectedStatus] = useState(incident?.status || "new");
  const [resolutionNote, setResolutionNote] = useState("");
  const [officerName, setOfficerName] = useState(incident?.assignedOfficer || "");
  const [selectedDept, setSelectedDept] = useState(incident?.department || DEPARTMENTS[0]);

  if (!incident) return null;

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateIncidentStatus(incident.id, status, resolutionNote);
  };

  const handleAssign = (e) => {
    e.preventDefault();
    if (officerName.trim()) {
      assignIncident(incident.id, officerName, selectedDept);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Incident Dossier: #${incident.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-500">TICKET: {incident.id}</span>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  incident.severity === "critical"
                    ? "critical"
                    : incident.severity === "warning"
                    ? "warning"
                    : "info"
                }
              >
                {incident.severity.toUpperCase()}
              </Badge>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 uppercase tracking-wider">
                {incident.status.replace("-", " ").toUpperCase()}
              </span>
            </div>
          </div>
          <h4 className="text-base font-bold text-slate-900">{incident.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{incident.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200/60">
            <span><strong>Location:</strong> {incident.location}</span>
            <span><strong>Dept:</strong> {incident.department}</span>
            <span><strong>Due:</strong> {incident.dueDate}</span>
          </div>
        </div>

        {/* Recommended Action Box */}
        {incident.recommendedAction && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 p-3.5 text-xs text-purple-900">
            <div className="font-semibold uppercase tracking-wider text-[11px] text-purple-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-purple-700" />
              SOP Action Recommendation:
            </div>
            <div>{incident.recommendedAction}</div>
          </div>
        )}

        {/* Status Lifecycle Stepper */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Update Incident Lifecycle Status
          </label>
          <div className="flex flex-wrap gap-2">
            {INCIDENT_STATUSES.map((st) => (
              <button
                key={st.id}
                onClick={() => handleStatusChange(st.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  incident.status === st.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm font-semibold"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Officer Assignment Form */}
        <form onSubmit={handleAssign} className="rounded-xl border border-slate-200 p-4 bg-white space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-blue-600" />
            Officer & Department Assignment
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-500 block mb-1">Nodal Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-500 block mb-1">Assigned Officer</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="e.g. Er. Rajesh Gupta, AE"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition"
            >
              Update Assignment
            </button>
          </div>
        </form>

        {/* Action History / Audit Trail */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <History className="h-4 w-4 text-slate-500" />
            Action Log & Audit Trail
          </label>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2.5 max-h-40 overflow-y-auto">
            {(incident.actionHistory || []).map((h, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="font-mono text-[11px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {h.timestamp}
                </span>
                <span className="font-semibold text-slate-900">{h.actor}:</span>
                <span className="flex-1 text-slate-600">{h.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </Modal>
  );
};

