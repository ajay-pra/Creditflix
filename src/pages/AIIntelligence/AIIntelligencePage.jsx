import React, { useState } from "react";
import { Breadcrumb } from "../../components/layout/Breadcrumb";
import { StatCard } from "../../components/common/StatCard";
import { Badge } from "../../components/common/Badge";
import { TrendChart } from "../../components/charts/TrendChart";
import { useApp } from "../../context/AppContext";
import { MULTI_DOMAIN_FORECASTS, PREDICTIVE_MAINTENANCE_LIST } from "../../data/mockForecasts";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Wrench,
  Bot,
  CheckCircle2,
  Check,
  X,
  Layers,
  Activity,
  ArrowRight
} from "lucide-react";

export const AIIntelligencePage = () => {
  const {
    aiRecommendations,
    reviewAIRecommendation,
    dismissAIRecommendation,
    setIsAIAssistantOpen,
    addToast
  } = useApp();

  const [activeDomain, setActiveDomain] = useState("irrigation");

  const forecastData = MULTI_DOMAIN_FORECASTS[activeDomain] || MULTI_DOMAIN_FORECASTS.irrigation;

  return (
    <div className="space-y-6">
      <Breadcrumb
        title="Unified AI Intelligence & Predictive Forecasting Centre"
        subtitle="Cross-Domain Machine Learning Inferences • Anomaly Detection • Predictive Asset Maintenance"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Launch AI Copilot Chat</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          title="Active Predictive Models"
          value="8 Verticals"
          subtext="Simulated ML Models"
          icon={Sparkles}
          trend="94.2% Mean Confidence"
          trendDirection="up"
          status="purple"
        />
        <StatCard
          title="Active AI Recommendations"
          value={aiRecommendations.filter((r) => !r.dismissed && !r.reviewed).length}
          subtext="Awaiting Sign-off"
          icon={AlertTriangle}
          trend="Human-in-the-Loop"
          trendDirection="neutral"
          status="warning"
        />
        <StatCard
          title="Predictive Maintenance Alerts"
          value={PREDICTIVE_MAINTENANCE_LIST.length}
          subtext="Flagged Hardware"
          icon={Wrench}
          trend="4 Field Interventions"
          trendDirection="down"
          status="normal"
        />
        <StatCard
          title="Forecast Horizon"
          value="24 Hours"
          subtext="1h, 3h, 6h, 12h, 24h"
          icon={TrendingUp}
          trend="Simulated Edge Ingestion"
          trendDirection="up"
          status="healthy"
        />
      </div>

      {/* A. Forecasting Centre: Multi-Domain Forecast Selector & Line Charts */}
      <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Multi-Horizon Forecasting Centre: {forecastData.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Comparing actual historical baseline against simulated predicted trajectory ({forecastData.unit})
            </p>
          </div>

          {/* Domain tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "irrigation", label: "Irrigation" },
              { id: "waste", label: "Waste Fill" },
              { id: "traffic", label: "Traffic Peak" },
              { id: "water", label: "Water Demand" },
              { id: "environment", label: "AQI Profile" },
              { id: "energy", label: "Grid Load" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition ${
                  activeDomain === tab.id
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Forecast Line Chart */}
        <div className="pt-2">
          <TrendChart
            data={forecastData.data}
            dataKeys={[
              { key: "actual", name: "Actual Sensor Telemetry", color: "#2563eb" },
              { key: "predicted", name: "Simulated AI Prediction", color: "#7c3aed" }
            ]}
            xAxisKey="horizon"
            height={260}
            unit={forecastData.unit}
            isArea={false}
          />
        </div>

        {/* Forecast Insight Note */}
        <div className="rounded-xl bg-purple-50/70 border border-purple-200/80 p-3.5 text-xs text-purple-900 leading-relaxed font-medium">
          <strong>AI Predictive Ingestion Summary:</strong> {forecastData.insight}
        </div>
      </div>

      {/* Middle Row: D. Recommendations Feed & B. Anomaly Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* D. AI Recommendations Feed (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Executive Recommendation Action Feed</h3>
              <p className="text-xs text-slate-500">Autonomous evidence-based SOP suggestions</p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {aiRecommendations.length} Recommendations
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {aiRecommendations
              .filter((r) => !r.dismissed)
              .map((rec) => (
                <div
                  key={rec.id}
                  className={`rounded-xl border p-4 space-y-2.5 transition ${
                    rec.reviewed
                      ? "border-emerald-200 bg-emerald-50/20"
                      : "border-slate-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        {rec.category}
                      </span>
                      <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                        {rec.confidencePct}% Confidence
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Horizon: {rec.forecastPeriod}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{rec.problem}</h4>
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg font-mono border border-slate-100">
                    {rec.supportingData}
                  </p>

                  <div className="text-xs text-purple-900 font-medium">
                    <strong>Recommended SOP:</strong> {rec.recommendedAction}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 text-[11px]">Dept: {rec.department}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dismissAIRecommendation(rec.id)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition"
                      >
                        Dismiss
                      </button>
                      {rec.reviewed ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => reviewAIRecommendation(rec.id, "Approved by Administrator")}
                          className="flex items-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 font-semibold shadow-xs transition"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve & Authorize</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* C. Predictive Hardware Maintenance (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Predictive Hardware Maintenance</h3>
              <p className="text-xs text-slate-500">Degradation pattern & failure risk modeling</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              4 Assets Flagged
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {PREDICTIVE_MAINTENANCE_LIST.map((item) => (
              <div
                key={item.deviceId}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2 hover:border-amber-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-600">{item.deviceId}</span>
                  <Badge variant={item.riskLevel === "HIGH" ? "critical" : "warning"}>
                    {item.riskLevel} RISK
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-slate-900">{item.deviceName}</h4>
                <div className="text-[11px] text-slate-500">{item.location} • {item.category}</div>

                <div className="p-2 rounded-lg bg-white border border-slate-200/80 text-[11px] space-y-1">
                  <div>
                    <span className="text-slate-400 font-medium">Failure Mode: </span>
                    <span className="text-slate-800 font-semibold">{item.failureMode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Est. Horizon: </span>
                    <span className="text-amber-700 font-bold">{item.predictedTimeToFailure}</span>
                  </div>
                </div>

                <div className="text-[11px] text-purple-900 font-medium pt-1">
                  <strong>Action:</strong> {item.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
