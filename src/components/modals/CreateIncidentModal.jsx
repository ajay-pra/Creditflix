import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { PlusCircle, ShieldAlert, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DEPARTMENTS } from "../../data/mockAlerts";
import { DISTRICT_ZONES } from "../../data/mockLocations";

export const CreateIncidentModal = ({ isOpen, onClose }) => {
  const { createIncident } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("water");
  const [severity, setSeverity] = useState("warning");
  const [zone, setZone] = useState("zone-2");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [recommendedAction, setRecommendedAction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    createIncident({
      title,
      category,
      severity,
      zone,
      location,
      description,
      department,
      recommendedAction: recommendedAction || "Field inspection and prompt SOP compliance required.",
      assignedOfficer: "Pending Department Assignment",
      sourceDevice: "MANUAL-CITIZEN-INTAKE"
    });

    onClose();
    setTitle("");
    setLocation("");
    setDescription("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log District Incident / Citizen Grievance"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Incident Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Major Water Pipeline Rupture near Mandi Gate"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Vertical Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="water">Smart Water</option>
              <option value="waste">Waste Management</option>
              <option value="traffic">Traffic Management</option>
              <option value="irrigation">Agriculture & Irrigation</option>
              <option value="environment">Environment & AQI</option>
              <option value="flood">Disaster & Flood</option>
              <option value="lighting">Energy & Lighting</option>
              <option value="infrastructure">Public Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Priority Severity
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="critical">CRITICAL (Immediate Action)</option>
              <option value="warning">WARNING (Review in 2h)</option>
              <option value="info">INFO / Routine</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Administrative Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              {DISTRICT_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
              Specific Location / Landmark *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Metro Pier 42, Central Chowk"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Responsible Government Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Detailed Description / Field Report
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context, affected citizens, telemetry observations, or field reports..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Recommended Action / SOP
          </label>
          <input
            type="text"
            value={recommendedAction}
            onChange={(e) => setRecommendedAction(e.target.value)}
            placeholder="e.g. Dispatch emergency repair van and cordon off lane."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow transition flex items-center gap-1.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Incident Ticket</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

