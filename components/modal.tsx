"use client";

import React, { useEffect } from "react";
import CloseBtn from "./icons/closeBtn";

export default function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  // Close modal on Escape key press
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (typeof onClose === "function") onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock page scroll while modal is open
  useEffect(() => {
    if (!open) return;

    const { overflow, paddingRight } = document.body.style;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center z-50 transition-colors
        ${open ? "visible bg-black/40" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-white rounded-xl shadow-2xl border border-slate-200
          p-6 md:p-8 transition-all w-full mx-3 md:mx-0 md:max-w-2xl
          ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}
          flex flex-col
          max-h-[85vh] overflow-hidden
        `}
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 6px 0 rgba(60, 60, 60, 0.08)",
        }}
      >
        <div className="flex justify-between mb-3 md:mt-2 mt-0.5">
          <div className="font-serif text-lg md:text-xl text-slate-900 -mt-3 md:-mt-6">
            {title}
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 min-h-5 min-w-5 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition"
            aria-label="Close"
          >
            <CloseBtn className="cursor-pointer min-h-5 min-w-5" />
          </button>
        </div>
        {/* <hr className="border-slate-200 mb-3" /> */}
        <div className="text-slate-700 leading-8 border-b pb-4 text-base flex-1 overflow-auto">
          {children}
        </div>
        <div className="mt-4 flex justify-end -mb-2 -mr-2 md:-mr-4 md:-mb-4">
          <button
            className="text-xs border  px-2 py-1 rounded-xl text-white bg-[#5d636e] hover:bg-[#434a54] transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
