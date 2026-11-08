import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { useApp } from "../../context/AppContext";
import { INITIAL_PHYSICAL_FILES } from "../../data/mockFiles";
import {
  FileText,
  QrCode,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Scan,
  Send,
  Building,
  User,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from "lucide-react";

export const FilesPage = () => {
  const { addToast } = useApp();
  const [files, setFiles] = useState(INITIAL_PHYSICAL_FILES);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  // KPIs
  const totalFiles = files.length;
  const criticalFiles = files.filter((f) => f.dwellStatus === "critical").length;
  const warningFiles = files.filter((f) => f.dwellStatus === "warning").length;
  const avgDwellHours = Math.round(files.reduce((acc, f) => acc + f.hoursAtDesk, 0) / totalFiles);

  const filteredFiles = files.filter((f) => {
    if (statusFilter !== "all" && f.dwellStatus !== statusFilter) return false;
    if (
      searchQuery &&
      !f.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.qrCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.currentCustodian.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleIssueShowCause = (file) => {
    addToast(
      "Show-Cause Notice Dispatched",
      `Administrative show-cause notice issued to ${file.currentCustodian} (${file.currentDesk}) for ${file.id} exceeding 72h dwell limit.`,
      "warning"
    );
  };

  const handleSimulateScan = () => {
    addToast(
      "QR Barcode Scanned",
      "Simulated barcode wand scan: File #FILE-REV-2026-0891 custody logged to SDM Revenue Court Peshi.",
      "success"
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="e-Daftar: Physical File & Document Movement Tracker"
        subtitle="QR Code Barcoding on Physical Paper Jackets • Desk Dwell Time Audits • Eliminating Lost Files & Bureaucratic Delays"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateScan}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition"
            >
              <Scan className="h-3.5 w-3.5" />
              <span>Simulate QR Wand Scan</span>
            </button>
            <button
              onClick={() => {
                addToast(
                  "Mass Show-Cause Notices Issued",
                  `Automated notices dispatched to all ${criticalFiles} desks exceeding 72h statutory dwell limit.`,
                  "warning"
                );
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Escalate Bottlenecks ({criticalFiles})</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Tracked Physical Files"
          value={totalFiles}
          subtext="Active Paper Dossiers"
          icon={FileText}
          trend="QR Jackets Affixed"
          trendDirection="up"
          status="normal"
        />
        <StatCard
          title="Critical Bottlenecks (>72h)"
          value={criticalFiles}
          subtext="Files Stalled at Desks"
          icon={AlertTriangle}
          trend={criticalFiles > 0 ? "Requires DM Intervention" : "Zero Stalled"}
          trendDirection={criticalFiles > 0 ? "down" : "up"}
          status={criticalFiles > 0 ? "critical" : "healthy"}
        />
        <StatCard
          title="Average Desk Dwell Time"
          value={`${avgDwellHours} Hours`}
          subtext="Target: <48 Hours"
          icon={Clock}
          trend={`${(avgDwellHours / 24).toFixed(1)} Days Avg`}
          trendDirection="neutral"
          status={avgDwellHours > 48 ? "warning" : "healthy"}
        />
        <StatCard
          title="Custody Scan Compliance"
          value="98.4%"
          subtext="Clerical Scan Rate"
          icon={CheckCircle2}
          trend="Zero Lost Files"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* Concept Explanation Banner */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <QrCode className="h-4 w-4 text-blue-700" />
            <span>How e-Daftar Works in Indian District Administration (The "Zero-Typing" Babu Model)</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Physical court and revenue files cannot be legally discarded overnight. e-Daftar affixes a tamper-proof QR code to each paper jacket. Clerks use a 1-tap phone scan upon receipt and dispatch. If a file dwells on a desk for &gt;48 hours without action, it triggers automated alerts on the DM's review screen.
          </p>
        </div>
        <div className="shrink-0 font-mono text-[11px] font-bold text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200">
          Statutory SLA: 48h / Desk
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: `All Files (${totalFiles})` },
            { id: "critical", label: `Bottlenecks >72h (${criticalFiles})` },
            { id: "warning", label: `Delay Warning 48-72h (${warningFiles})` },
            { id: "normal", label: "Normal <48h" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by File ID, QR code, clerk..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Files Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Physical File Docket Registry ({filteredFiles.length} Records)
            </h3>
            <p className="text-xs text-slate-500">
              Click any file row to inspect the complete chain-of-custody transfer history
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">File ID & QR Code</th>
                <th className="py-2.5 px-3">Subject & Dossier Details</th>
                <th className="py-2.5 px-3">Department & Tehsil</th>
                <th className="py-2.5 px-3">Current Holding Desk & Babu</th>
                <th className="py-2.5 px-3">Desk Dwell Time</th>
                <th className="py-2.5 px-3">Dwell Status</th>
                <th className="py-2.5 px-3 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFiles.map((file) => (
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
                      <QrCode className="h-3 w-3 text-slate-500" />
                      <span>{file.qrCode}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 max-w-sm">
                    <div className="font-semibold text-slate-900 leading-snug">{file.subject}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {file.totalPages} Pages • Priority: <span className="font-medium text-slate-700">{file.priority}</span>
                    </div>
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
                    <div className="text-[10px] text-slate-400">({file.daysAtDesk} days at desk)</div>
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

      {/* Custody Chain Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
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
              <strong>AI Custody Audit:</strong> {selectedFile.aiInsight}
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chain of Custody Handover Log:
              </h5>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {selectedFile.movementHistory.map((h) => (
                  <div key={h.step} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {h.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900">{h.desk}</div>
                      <div className="text-[11px] text-slate-600">{h.action} (Officer: {h.officer})</div>
                      <span className="text-[10px] text-slate-400">{h.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] text-slate-400 font-mono">Scanned QR: {selectedFile.qrCode}</span>
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                Close Custody
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

