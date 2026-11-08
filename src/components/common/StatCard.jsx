import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendDirection = "up", // 'up' | 'down' | 'neutral'
  status = "normal", // 'normal' | 'healthy' | 'warning' | 'critical' | 'purple'
  onClick,
  badge
}) => {
  const statusColors = {
    normal: "border-slate-200 bg-white hover:border-slate-300",
    healthy: "border-emerald-200 bg-emerald-50/20 hover:border-emerald-300",
    warning: "border-amber-200 bg-amber-50/20 hover:border-amber-300",
    critical: "border-rose-200 bg-rose-50/20 hover:border-rose-300",
    purple: "border-purple-200 bg-purple-50/20 hover:border-purple-300",
    blue: "border-blue-200 bg-blue-50/20 hover:border-blue-300"
  };

  const iconBgColors = {
    normal: "bg-slate-100 text-slate-700",
    healthy: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    critical: "bg-rose-100 text-rose-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700"
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 shadow-sm transition-all duration-200 ${statusColors[status] || statusColors.normal} ${
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
            {badge && <span>{badge}</span>}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
            {subtext && <span className="text-xs text-slate-500 font-medium">{subtext}</span>}
          </div>
        </div>
        {Icon && (
          <div className={`rounded-lg p-2.5 ${iconBgColors[status] || iconBgColors.normal}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {trendDirection === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />}
          {trendDirection === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" />}
          {trendDirection === "neutral" && <Minus className="h-3.5 w-3.5 text-slate-400" />}
          <span
            className={
              trendDirection === "up"
                ? "font-medium text-emerald-700"
                : trendDirection === "down"
                ? "font-medium text-rose-700"
                : "font-medium text-slate-500"
            }
          >
            {trend}
          </span>
          <span className="text-slate-400">vs prev cycle</span>
        </div>
      )}
    </div>
  );
};

