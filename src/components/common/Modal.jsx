import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  size = "md"
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Resolve width class based on size or custom maxWidth
  let widthClass = maxWidth;
  if (!widthClass) {
    switch (size) {
      case "sm":
        widthClass = "max-w-md";
        break;
      case "lg":
        widthClass = "max-w-3xl";
        break;
      case "xl":
        widthClass = "max-w-4xl";
        break;
      case "2xl":
        widthClass = "max-w-5xl";
        break;
      case "full":
        widthClass = "max-w-6xl";
        break;
      default:
        widthClass = "max-w-2xl";
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div
        className={`relative w-full ${widthClass} rounded-2xl bg-white shadow-2xl border border-slate-200 transition-all z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150`}
      >
        {/* Header - only if title provided */}
        {title ? (
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition"
              title="Close Dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            title="Close Dialog"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
