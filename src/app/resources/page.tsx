"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Video,
  Download,
  Filter,
  Layers,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import PdfViewerModal from "@/components/resources/PdfViewerModal";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      try {
        let url = `/api/resources?`;
        if (selectedType !== "all") url += `type=${selectedType}&`;
        if (selectedYear !== "all") url += `year=${selectedYear}&`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setResources(data.resources || []);
        }
      } catch (err) {
        console.error("Load Resources Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, [selectedType, selectedYear]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
          Study Materials & Digital Library
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Faculty Notes, PPTs & Video Lectures
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive handwritten unit notes, lab manuals with code outputs, reference book guides, and curated NPTEL/university video lecture playlists.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Filter className="h-4 w-4 text-indigo-400" />
          <span>Filter Resources</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Resource Types</option>
            <option value="PDF_NOTES">Handwritten Faculty PDF Notes</option>
            <option value="LECTURE_VIDEO">Curated Video Lectures</option>
            <option value="LAB_MANUAL">Lab Manuals & Practical Code</option>
            <option value="REFERENCE_BOOK">Reference Books & Guides</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Academic Years (1 to 4)</option>
            <option value="1">1st Year Resources</option>
            <option value="2">2nd Year Resources</option>
            <option value="3">3rd Year Resources</option>
            <option value="4">4th Year Resources</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Available Resources ({resources.length})
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {res.subject?.code}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      {res.type}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white line-clamp-2">{res.title}</h4>

                  {res.description && (
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {res.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  {res.type === "LECTURE_VIDEO" ? (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition"
                    >
                      <Video className="h-4 w-4" />
                      <span>Watch Video Lecture</span>
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setPdfModal({
                            isOpen: true,
                            url: res.url,
                            title: res.title,
                          })
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition"
                      >
                        <FileText className="h-4 w-4" />
                        <span>View Document</span>
                      </button>
                      <a
                        href={res.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                        title="Download Document"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
            <FolderOpen className="mx-auto h-10 w-10 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No resources found for the filter.</p>
          </div>
        )}
      </div>

      <PdfViewerModal
        isOpen={pdfModal.isOpen}
        url={pdfModal.url}
        title={pdfModal.title}
        onClose={() => setPdfModal({ isOpen: false, url: "", title: "" })}
      />
    </div>
  );
}
