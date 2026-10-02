"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  FileText,
  FileQuestion,
  Bookmark,
  Video,
  Download,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import PdfViewerModal from "@/components/resources/PdfViewerModal";
import dynamic from "next/dynamic";

const SubjectNotesPanel = dynamic(
  () => import("@/components/academic/SubjectNotesPanel"),
  {
    ssr: false,
    loading: () => (
      <div className="py-16 text-center space-y-3">
        <div className="inline-block animate-spin text-2xl text-blue-400">◓</div>
        <p className="text-xs text-slate-400">Loading interactive curriculum notes...</p>
      </div>
    ),
  }
);

export default function SubjectDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [bookmarked, setBookmarked] = useState(false);
  const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: "",
    title: "",
  });

  useEffect(() => {
    async function loadSubject() {
      setLoading(true);
      try {
        const res = await fetch(`/api/subjects/${encodeURIComponent(resolvedParams.code)}`);
        if (res.ok) {
          const data = await res.json();
          setSubject(data.subject);
        }
      } catch (err) {
        console.error("Failed to load subject details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSubject();
  }, [resolvedParams.code]);

  const handleToggleBookmark = async () => {
    if (!subject) return;
    const newState = !bookmarked;
    setBookmarked(newState);
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: "SUBJECT", subjectId: subject.id }),
      });
    } catch (err) {
      console.error("Bookmark Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
        <div className="inline-block animate-spin text-2xl text-blue-400">◓</div>
        <p className="text-sm text-slate-400">Loading comprehensive subject curriculum...</p>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center space-y-4">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h2 className="text-xl font-bold text-white">Subject Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested subject code &ldquo;{resolvedParams.code}&rdquo; does not exist in the curriculum.
        </p>
        <Link
          href="/subjects"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
        >
          Browse All Subjects
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview & Syllabus", icon: Layers },
    { id: "interactive", label: "📖 Interactive Notes", icon: Sparkles },
    { id: "reading", label: `GFG Reading (${subject.articles?.length || 0})`, icon: BookOpen },
    { id: "notes", label: `PDF Notes (${subject.resources?.filter((r: any) => r.type === "PDF_NOTES").length || 0})`, icon: FileText },
    { id: "lectures", label: "Video Lectures", icon: Video },
    { id: "pyqs", label: `PYQs Bank (${subject.pyqs?.length || 0})`, icon: FileQuestion },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/years/${subject.semester?.academicYear?.yearNumber || 1}`} className="hover:text-blue-400 transition">
          Year {subject.semester?.academicYear?.yearNumber}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-200">{subject.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {subject.code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                {subject.semester?.title}
              </span>
              {subject.specializationStream && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Specialization: {subject.specializationStream}
                </span>
              )}
              {subject.isLab && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Practical / Laboratory
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {subject.title}
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Action & Schemes Widget */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition shadow-sm ${
                bookmarked
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                  : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-400" : ""}`} />
              <span>{bookmarked ? "Saved in Bookmarks" : "Bookmark Course"}</span>
            </button>

            {/* Scheme mini card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs space-y-1.5 min-w-[200px]">
              <div className="flex justify-between text-slate-400">
                <span>Total Credits:</span>
                <b className="text-white font-bold">{subject.credits} Credits</b>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Teaching Scheme:</span>
                <b className="text-white">L:{subject.lectureHours} T:{subject.tutorialHours} P:{subject.practicalHours}</b>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Evaluation Marks:</span>
                <b className="text-white">CIE: {subject.internalMarks} | ESE: {subject.externalMarks}</b>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-800 pt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Sections */}
      {/* 1. Overview & Units Syllabus */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" /> Official Syllabus & Units Structure
            </h3>

            {subject.units && subject.units.length > 0 ? (
              <div className="space-y-4">
                {subject.units.map((unit: any) => {
                  let topicList: string[] = [];
                  try {
                    topicList = JSON.parse(unit.topics);
                  } catch (e) {
                    topicList = unit.topics ? unit.topics.split("\n") : [];
                  }

                  return (
                    <div
                      key={unit.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            Unit {unit.unitNumber}
                          </span>
                          <h4 className="text-base font-bold text-slate-100 mt-1">
                            {unit.title}
                          </h4>
                          {unit.description && (
                            <p className="text-xs text-slate-400 mt-1">{unit.description}</p>
                          )}
                        </div>
                      </div>

                      {topicList.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                            Key Syllabus Topics:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {topicList.map((t: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/70 p-2 rounded-lg border border-slate-800"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span className="line-clamp-1">{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center space-y-2">
                <Layers className="mx-auto h-8 w-8 text-slate-600" />
                <p className="text-sm font-semibold text-slate-300">
                  Comprehensive syllabus module mappings available in Lecture Notes and GFG Reading sections.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Notes Tab */}
      {activeTab === "interactive" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Interactive Notes, Visualizers & Study Guide
            </h3>
            <span className="text-xs text-slate-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-lg text-purple-300 font-medium">
              ✨ With Animations & Simulators
            </span>
          </div>
          <SubjectNotesPanel subjectCode={subject.code} />
        </div>
      )}

      {/* 2. GFG-Style Reading Material Tab */}
      {activeTab === "reading" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-400" /> GFG-Style Concept Articles & Interactive Code
            </h3>
            <span className="text-xs text-slate-400">
              {subject.articles?.length || 0} Articles Available
            </span>
          </div>

          {subject.articles && subject.articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.articles.map((art: any) => (
                <Link
                  key={art.id}
                  href={`/learn/${art.slug}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/40 hover:bg-slate-900 transition flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        {art.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ⏱️ {art.readTimeMinutes} min read
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                    <span>Start Interactive Reading</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
              <BookOpen className="mx-auto h-10 w-10 text-slate-600" />
              <h4 className="text-sm font-bold text-slate-300">Technical Articles in Preparation</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Admin faculty are currently authoring new GFG-style tutorials for this subject. In the meantime, please check the PDF Notes section.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. PDF Notes & Resources Tab */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-400" /> Faculty Hand-Written Notes & Lab Manuals
            </h3>
          </div>

          {subject.resources && subject.resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.resources.map((res: any) => (
                <div
                  key={res.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                        {res.type}
                      </span>
                      {res.fileSize && (
                        <span className="text-xs text-slate-400">{res.fileSize}</span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{res.title}</h4>
                    {res.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">{res.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() =>
                        setPdfModal({
                          isOpen: true,
                          url: res.url,
                          title: res.title,
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View In-App Reader</span>
                    </button>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title="Download File"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
              <FileText className="mx-auto h-10 w-10 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                PDF Notes for this subject are being processed and will be available shortly.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Video Lectures Tab */}
      {activeTab === "lectures" && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="h-5 w-5 text-red-400" /> Curated University & NPTEL Video Lectures
          </h3>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/09_LlHjoEiY"
                title="Lecture series"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="pt-2">
              <h4 className="text-base font-bold text-white">
                Module Lecture Series: {subject.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Curated high-yield video lectures covering key theoretical theorems and university exam numerical problems.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. PYQs Bank Tab */}
      {activeTab === "pyqs" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileQuestion className="h-5 w-5 text-amber-400" /> University Previous Year Questions (PYQs)
            </h3>
          </div>

          {subject.pyqs && subject.pyqs.length > 0 ? (
            <div className="space-y-3">
              {subject.pyqs.map((pyq: any) => (
                <div
                  key={pyq.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                        {pyq.examYear} {pyq.examType}
                      </span>
                      {pyq.isImportant && (
                        <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                          ★ HIGH FREQUENCY
                        </span>
                      )}
                      <span className="text-xs text-slate-400">{pyq.totalMarks} Marks • 3 Hours</span>
                    </div>
                    {pyq.keyTopicsCovered && (
                      <p className="text-xs text-slate-300 font-medium">
                        Topics: <span className="text-slate-400 font-normal">{pyq.keyTopicsCovered}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setPdfModal({
                          isOpen: true,
                          url: pyq.questionPdfUrl,
                          title: `${subject.title} - ${pyq.examYear} ${pyq.examType} PYQ`,
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                    >
                      <FileQuestion className="h-3.5 w-3.5" />
                      <span>Question Paper</span>
                    </button>
                    {pyq.solutionPdfUrl && (
                      <button
                        onClick={() =>
                          setPdfModal({
                            isOpen: true,
                            url: pyq.solutionPdfUrl,
                            title: `${subject.title} - ${pyq.examYear} Solution Key`,
                          })
                        }
                        className="px-3.5 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-bold text-emerald-300 transition flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Solved Key</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
              <FileQuestion className="mx-auto h-10 w-10 text-slate-600" />
              <p className="text-sm font-semibold text-slate-300">
                Examination question papers for {subject.title} are being compiled.
              </p>
            </div>
          )}
        </div>
      )}

      {/* In-app PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModal.isOpen}
        url={pdfModal.url}
        title={pdfModal.title}
        onClose={() => setPdfModal({ isOpen: false, url: "", title: "" })}
      />
    </div>
  );
}
