import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { IncidentDetailModal } from "../../components/modals/IncidentDetailModal";
import { CreateIncidentModal } from "../../components/modals/CreateIncidentModal";
import { useApp } from "../../context/AppContext";
import { INCIDENT_STATUSES, DEPARTMENTS } from "../../data/mockAlerts";
import {
  BellRing,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  Search,
  ExternalLink,
  UserCheck
} from "lucide-react";

export const IncidentsPage = () => {
  const { incidents, acknowledgeIncident } = useApp();
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // KPIs
  const totalIncidents = incidents.length;
  const criticalCount = incidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length;
  const assignedCount = incidents.filter((i) => i.status === "assigned" || i.status === "in-progress").length;
  const resolvedCount = incidents.filter((i) => i.status === "resolved" || i.status === "closed").length;

  // Filtered incidents
  const filteredIncidents = incidents.filter((i) => {
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    if (severityFilter !== "all" && i.severity !== severityFilter) return false;
    if (deptFilter !== "all" && i.department !== deptFilter) return false;
    if (
      searchQuery &&
      !i.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !i.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !i.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="District Alerts & Incident Command Management"
        subtitle="Citizen Grievances & Telemetry Threshold Escalations • SLA Due Timers • Inter-Departmental Tracking"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log New Incident</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Total Incidents Tracked"
          value={totalIncidents}
          subtext="District Tickets"
          icon={BellRing}
          trend="+2 today"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Critical Active"
          value={criticalCount}
          subtext="Immediate Escalation"
          icon={Flame}
          trend={criticalCount > 0 ? "SLA Alert" : "Zero Critical"}
          trendDirection={criticalCount > 0 ? "up" : "neutral"}
          status={criticalCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="In Progress / Assigned"
          value={assignedCount}
          subtext="Nodal Officers"
          icon={UserCheck}
          trend="Field Units Dispatched"
          trendDirection="up"
          status="warning"
        />
        <StatCard
          title="Resolved & Closed"
          value={resolvedCount}
          subtext="Completed SOPs"
          icon={CheckCircle2}
          trend="94% On-time Resolution"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Filters and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition ${
              statusFilter === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Tickets ({incidents.length})
          </button>
          {INCIDENT_STATUSES.map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition capitalize ${
                statusFilter === st.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none hidden md:block"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incidents..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Incident Dossier Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Incident Dossiers ({filteredIncidents.length} Records)</h3>
            <p className="text-xs text-slate-500">Click any row to view action history, assign officer, or update status</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Ticket ID</th>
                <th className="py-2.5 px-3">Incident Title</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Location & Zone</th>
                <th className="py-2.5 px-3">Department & Officer</th>
                <th className="py-2.5 px-3">Due SLA</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="hover:bg-slate-50/80 transition cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{inc.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 leading-snug">{inc.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Source: {inc.sourceDevice}</div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={inc.severity === "critical" ? "critical" : inc.severity === "warning" ? "warning" : "info"}>
                      {inc.severity.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-800">{inc.location}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{inc.zone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{inc.department}</div>
                    <div className="text-[10px] text-slate-500">{inc.assignedOfficer || "Pending Assignment"}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-700">{inc.dueDate}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 text-[11px] font-semibold uppercase">
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncident(inc);
                      }}
                      className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition shadow-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <IncidentDetailModal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        incident={selectedIncident}
      />

      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
