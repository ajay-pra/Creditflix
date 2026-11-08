import React from "react";

export const Badge = ({ children, variant = "info", size = "sm" }) => {
  const variantStyles = {
    critical: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20",
    danger: "bg-red-50 text-red-700 border-red-200 ring-red-500/20",
    warning: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20",
    healthy: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20",
    info: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20",
    purple: "bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20",
    neutral: "bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20",
  };

  const sizeStyles = {
    xs: "px-1.5 py-0.5 text-[10px]",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ring-1 ${variantStyles[variant] || variantStyles.info} ${sizeStyles[size] || sizeStyles.sm}`}
    >
      {children}
    </span>
  );
};

