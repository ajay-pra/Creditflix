import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { IncidentDetailModal } from "../../components/modals/IncidentDetailModal";
import { CreateIncidentModal } from "../../components/modals/CreateIncidentModal";
import { useApp } from "../../context/AppContext";
import { INCIDENT_STATUSES, DEPARTMENTS } from "../../data/mockAlerts";
import { INITIAL_PHYSICAL_FILES, INITIAL_CERTIFICATES } from "../../data/mockFiles";
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
  UserCheck,
  MessageSquare,
  FileText,
  QrCode,
  Award,
  Send,
  AlertCircle,
  Building,
  CheckCheck,
  ShieldCheck
} from "lucide-react";

export const IncidentsPage = () => {
  const { incidents, acknowledgeIncident, setIsWhatsAppBotOpen, addToast } = useApp();
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grievances"); // 'grievances' | 'files' | 'certificates'
  const [selectedFile, setSelectedFile] = useState(null);

  // Filters for Grievances
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Physical files & certificates state
  const [physicalFiles, setPhysicalFiles] = useState(INITIAL_PHYSICAL_FILES);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);

  // KPIs
  const safeIncidents = incidents || [];
  const totalIncidents = safeIncidents.length;
  const criticalCount = safeIncidents.filter((i) => i.severity === "critical" && i.status !== "resolved").length;
  const assignedCount = safeIncidents.filter((i) => i.status === "assigned" || i.status === "in-progress").length;
  const resolvedCount = safeIncidents.filter((i) => i.status === "resolved" || i.status === "closed").length;

  const criticalFilesCount = physicalFiles.filter((f) => f.dwellStatus === "critical").length;
  const approvedCertsCount = certificates.filter((c) => c.status === "approved").length;

  // Filtered incidents
  const filteredIncidents = safeIncidents.filter((i) => {
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

  const handleIssueShowCause = (file) => {
    addToast(
      "Show-Cause Notice Issued",
      `Administrative notice dispatched to ${file.currentCustodian} for ${file.id} exceeding 72h dwell threshold.`,
      "warning"
    );
  };

  const handleDispatchCertificate = (cert) => {
    addToast(
      "e-Certificate Dispatched",
      `Digitally signed ${cert.type} dispatched via WhatsApp to ${cert.applicantName}.`,
      "success"
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Collectorate Grievances, e-Files & Citizen Services"
        subtitle="Jan Sunwai Redressal • e-Daftar Physical File Tracking (QR) • e-Sathi Certificate Pipeline • SLA Due Timers"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWhatsAppBotOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Simulate Citizen WhatsApp</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log Manual Dossier</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active Citizen Grievances"
          value={totalIncidents}
          subtext="Jan Sunwai & WhatsApp"
          icon={BellRing}
          trend="+3 today via WhatsApp"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Critical Active / Overdue"
          value={criticalCount}
          subtext="Immediate Escalation"
          icon={Flame}
          trend={criticalCount > 0 ? "SLA Overdue Alert" : "Zero Critical"}
          trendDirection={criticalCount > 0 ? "up" : "neutral"}
          status={criticalCount > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="e-Daftar Files >48h Dwell"
          value={criticalFilesCount}
          subtext="Clerk Desk Bottlenecks"
          icon={FileText}
          trend="Desk #3 Sadar Flagged"
          trendDirection="down"
          status={criticalFilesCount > 0 ? "warning" : "healthy"}
        />
        <StatCard
          title="Certificates Approved"
          value={`${approvedCertsCount} / ${certificates.length}`}
          subtext="e-Sathi Service Guarantee"
          icon={Award}
          trend="100% OCR Match"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("grievances")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "grievances"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BellRing className="h-3.5 w-3.5" />
          <span>Citizen Grievances & Telemetry ({safeIncidents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("files")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "files"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>e-Daftar: Physical File & Dwell Tracker ({physicalFiles.length})</span>
          {criticalFilesCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {criticalFilesCount} Alert
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "certificates"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          <span>Certificates & Licences Pipeline ({certificates.length})</span>
        </button>
      </div>

      {/* Tab 1: Citizen Grievances & Telemetry Dossiers */}
      {activeTab === "grievances" && (
        <div className="space-y-4">
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

            {/* Dropdown Filters */}
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
                  placeholder="Search tickets, citizen names..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Incident Dossier Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Grievance Dossiers ({filteredIncidents.length} Records)</h3>
                <p className="text-xs text-slate-500">Includes WhatsApp voice/text intake, Jan Sunwai web tickets, and SCADA threshold alerts</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Ticket ID</th>
                    <th className="py-2.5 px-3">Grievance Title</th>
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
        </div>
      )}

      {/* Tab 2: e-Daftar Physical File Tracking (QR Barcodes & Desk Dwell Times) */}
      {activeTab === "files" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    e-Daftar: Collectorate Physical File Movement & Dwell Time Audits
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Hybrid Physical-Digital Tracking • Water-resistant QR code stickers on physical paper folders with clerk scan logs
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Statutory Dwell Threshold: 48 Hours
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">File ID & QR</th>
                    <th className="py-2.5 px-3">Subject & Priority</th>
                    <th className="py-2.5 px-3">Department & Tehsil</th>
                    <th className="py-2.5 px-3">Current Holding Desk & Babu</th>
                    <th className="py-2.5 px-3">Desk Dwell Time</th>
                    <th className="py-2.5 px-3">Dwell Status</th>
                    <th className="py-2.5 px-3 text-right">Intervention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {physicalFiles.map((file) => (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`transition cursor-pointer ${
                        file.dwellStatus === "critical"
                          ? "bg-rose-50/30 hover:bg-rose-50/50"
                          : file.dwellStatus === "warning"
                          ? "bg-amber-50/20 hover:bg-amber-50/40"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-blue-600">{file.id}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                          <QrCode className="h-3 w-3" />
                          <span>{file.qrCode}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-semibold text-slate-900 leading-snug">{file.subject}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Pages: {file.totalPages} • Priority: {file.priority}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{file.department}</div>
                        <div className="text-[10px] text-slate-500">{file.tehsil}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{file.currentDesk}</div>
                        <div className="text-[10px] text-slate-600 font-medium">{file.currentCustodian}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-slate-900 text-xs">
                          {file.hoursAtDesk} Hours
                        </div>
                        <div className="text-[10px] text-slate-400">({file.daysAtDesk} days)</div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            file.dwellStatus === "critical"
                              ? "critical"
                              : file.dwellStatus === "warning"
                              ? "warning"
                              : "healthy"
                          }
                        >
                          {file.dwellStatus === "critical"
                            ? "BOTTLENECK (>72H)"
                            : file.dwellStatus === "warning"
                            ? "DELAY WARNING"
                            : "ON TRACK"}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {file.dwellStatus === "critical" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIssueShowCause(file);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs"
                          >
                            Show-Cause Alert
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(file);
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                          >
                            View Custody
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Citizen Certificates & Licences Pipeline */}
      {activeTab === "certificates" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    e-Sathi: Citizen Certificate & Statutory Service Delivery Guarantee
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Caste, Income, Domicile, Arms & Fire NOC • Automated OCR eligibility verification with instant WhatsApp dispatch
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Citizens' Charter SLA: 15 Working Days
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Application ID</th>
                    <th className="py-2.5 px-3">Certificate Type</th>
                    <th className="py-2.5 px-3">Applicant & Village</th>
                    <th className="py-2.5 px-3">Assigned Revenue Officer</th>
                    <th className="py-2.5 px-3">AI Document OCR Verification</th>
                    <th className="py-2.5 px-3">SLA Status</th>
                    <th className="py-2.5 px-3 text-right">Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-mono font-bold text-purple-600">{cert.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{cert.type}</div>
                        <div className="text-[10px] text-slate-400">Applied: {cert.appliedDate}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{cert.applicantName}</div>
                        <div className="text-[10px] text-slate-500">{cert.village}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">{cert.assignedOfficer}</div>
                      </td>
                      <td className="py-3 px-3 max-w-xs">
                        <div className="text-xs text-slate-700 leading-snug">{cert.aiOcrCheck}</div>
                        <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{cert.whatsappDelivery}</div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={cert.status === "approved" ? "healthy" : cert.status === "discrepancy" ? "warning" : "info"}>
                          {cert.slaStatus.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {cert.status === "approved" ? (
                          <button
                            onClick={() => handleDispatchCertificate(cert)}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition ml-auto shadow-xs"
                          >
                            <Send className="h-3 w-3" />
                            <span>WhatsApp PDF</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">In Field Verification</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Custody Chain Modal for e-Daftar Files */}
      {selectedFile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{selectedFile.id}</span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">{selectedFile.subject}</h4>
              </div>
              <Badge variant={selectedFile.dwellStatus === "critical" ? "critical" : "normal"}>
                {selectedFile.dwellStatus.toUpperCase()}
              </Badge>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-purple-900">
              <strong>AI Custody Insight:</strong> {selectedFile.aiInsight}
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Chain of Custody Scan History:</h5>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedFile.movementHistory.map((h) => (
                  <div key={h.step} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {h.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900">{h.desk}</div>
                      <div className="text-[11px] text-slate-600">{h.action} ({h.officer})</div>
                      <span className="text-[10px] text-slate-400">{h.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                Close Custody
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        incident={selectedIncident}
      />

      {/* Create Manual Incident Modal */}
      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
