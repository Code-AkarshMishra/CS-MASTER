"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileQuestion,
  Filter,
  Download,
  Check,
  Sparkles,
  BookOpen,
} from "lucide-react";
import PdfViewerModal from "@/components/resources/PdfViewerModal";

export default function PYQsBankPage() {
  const [pyqs, setPyqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [onlyImportant, setOnlyImportant] = useState(false);
  const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  useEffect(() => {
    async function loadPYQs() {
      setLoading(true);
      try {
        let url = `/api/pyqs?`;
        if (selectedYear !== "all") url += `year=${selectedYear}&`;
        if (selectedType !== "all") url += `type=${selectedType}&`;
        if (onlyImportant) url += `important=true&`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setPyqs(data.pyqs || []);
        }
      } catch (err) {
        console.error("Load PYQs Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPYQs();
  }, [selectedYear, selectedType, onlyImportant]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
          University Examination Repository
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Previous Year Questions (PYQs) Bank
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Official past semester examination question papers (2021-2025) with high-scoring model answers and important recurring question indicators.
        </p>
      </div>

      {/* Filter Ribbon */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Filter className="h-4 w-4 text-amber-400" />
          <span>Filter Question Papers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Exam Years</option>
            <option value="2024">2024 Examination</option>
            <option value="2023">2023 Examination</option>
            <option value="2022">2022 Examination</option>
            <option value="2021">2021 Examination</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="all">All Exam Types</option>
            <option value="END_SEM">End Semester Examination (60 Marks)</option>
            <option value="MID_SEM">Mid Semester Internal Test (30 Marks)</option>
          </select>

          <button
            onClick={() => setOnlyImportant(!onlyImportant)}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold transition ${
              onlyImportant
                ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                : "bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>High Frequency Questions Only</span>
          </button>
        </div>
      </div>

      {/* PYQ List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Available Papers ({pyqs.length})
          </h3>
        </div>

        {loading ? (
          <div className="space-y-3 py-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : pyqs.length > 0 ? (
          <div className="space-y-3">
            {pyqs.map((pyq) => (
              <div
                key={pyq.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg hover:border-slate-700 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {pyq.subject?.code}
                    </span>
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                      {pyq.examYear} {pyq.examType}
                    </span>
                    {pyq.isImportant && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                        ★ FREQUENTLY REPEATED
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {pyq.subject?.title}
                  </h4>

                  {pyq.keyTopicsCovered && (
                    <p className="text-xs text-slate-400">
                      <b className="text-slate-300">Topics Covered:</b> {pyq.keyTopicsCovered}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setPdfModal({
                        isOpen: true,
                        url: pyq.questionPdfUrl,
                        title: `${pyq.subject?.title} (${pyq.examYear} ${pyq.examType})`,
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                  >
                    <FileQuestion className="h-3.5 w-3.5" />
                    <span>View Question Paper</span>
                  </button>

                  {pyq.solutionPdfUrl && (
                    <button
                      onClick={() =>
                        setPdfModal({
                          isOpen: true,
                          url: pyq.solutionPdfUrl,
                          title: `${pyq.subject?.title} (${pyq.examYear} Solution Key)`,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Solution Key</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
            <FileQuestion className="mx-auto h-10 w-10 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No question papers match the selected criteria.</p>
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
