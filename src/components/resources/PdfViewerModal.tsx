"use client";

import React, { useState } from "react";
import { X, Download, Maximize2, Minimize2, FileText } from "lucide-react";

interface PdfViewerModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewerModal({
  url,
  title,
  isOpen,
  onClose,
}: PdfViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div
        className={`w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? "h-screen w-screen rounded-none" : "max-w-5xl h-[88vh]"
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5 truncate">
            <FileText className="h-5 w-5 text-indigo-400 shrink-0" />
            <span className="text-sm font-bold text-slate-200 truncate">{title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe PDF View */}
        <div className="flex-1 bg-slate-950">
          <iframe
            src={`${url}#toolbar=1&navpanes=0`}
            className="w-full h-full border-none"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
