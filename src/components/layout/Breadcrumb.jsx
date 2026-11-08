import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

export const Breadcrumb = ({ title, subtitle, actions }) => {
  const location = useLocation();
  const currentItem = NAV_ITEMS.find((item) => item.path === location.pathname);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80 mb-6">
      <div>
        {/* Trail */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
          <Link to="/" className="hover:text-slate-700 flex items-center gap-1 transition">
            <Home className="h-3.5 w-3.5" />
            <span>Vasudha District</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-semibold">{currentItem ? currentItem.label : title}</span>
        </div>

        {/* Page Title & Subtitle */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
          {title || (currentItem ? currentItem.label : "Command Centre")}
        </h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Action Buttons Slot */}
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
};

