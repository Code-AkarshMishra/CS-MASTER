"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  GraduationCap,
  BookOpen,
  FileText,
  FileQuestion,
  Sparkles,
  Flame,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  ChevronRight,
  Award,
  Calendar,
  Layers,
  Search,
} from "lucide-react";
import SubjectCard from "@/components/academic/SubjectCard";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [currentSem, setCurrentSem] = useState<number>(3);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completedArticles: 3,
    savedBookmarks: 4,
    streak: 14,
    totalCredits: 24.0,
  });

  useEffect(() => {
    if (session?.user && (session.user as any).currentSemester) {
      setCurrentSem((session.user as any).currentSemester);
    }
  }, [session]);

  useEffect(() => {
    async function loadSubjects() {
      setLoading(true);
      try {
        const res = await fetch(`/api/subjects?semester=${currentSem}`);
        if (res.ok) {
          const data = await res.json();
          setSubjects(data.subjects || []);
        }
      } catch (err) {
        console.error("Failed to load dashboard subjects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSubjects();
  }, [currentSem]);

  const userName = session?.user?.name || "Shivam Yadav";
  const userRole = (session?.user as any)?.role || "STUDENT";
  const userSpec = (session?.user as any)?.specialization || "Machine Learning (ML)";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Profile & Welcome Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl shadow-xl shadow-blue-500/20">
              {userName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Welcome back, {userName}!
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {userRole}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                B.Tech Computer Science & Engineering • Specialization:{" "}
                <b className="text-slate-200">{userSpec}</b>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-950/70 border border-slate-800 px-4 py-2 text-xs">
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Streak</span>
                <span className="font-extrabold text-amber-400">{stats.streak} Days</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-950/70 border border-slate-800 px-4 py-2 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Topics Mastered</span>
                <span className="font-extrabold text-slate-100">{stats.completedArticles} Completed</span>
              </div>
            </div>

            <Link
              href="/bookmarks"
              className="flex items-center gap-2 rounded-2xl bg-slate-950/70 border border-slate-800 px-4 py-2 text-xs hover:border-blue-500/40 transition"
            >
              <Bookmark className="h-4 w-4 text-indigo-400 fill-indigo-400/20" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Saved Items</span>
                <span className="font-extrabold text-indigo-300">View Bookmarks</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Continue Learning Prompt Banner */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              Continue Where You Left Off
            </span>
            <h4 className="text-sm font-bold text-slate-100 mt-0.5">
              Singly Linked List: Implementation, Insertion, and Deletion
            </h4>
            <p className="text-xs text-slate-400">Data Structures & Algorithms (UCS3011) • Unit 1</p>
          </div>
        </div>

        <Link
          href="/learn/singly-linked-list-insertion-deletion"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition shadow-md shadow-blue-500/20 shrink-0"
        >
          <span>Resume Reading</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Semester Selection Ribbon */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" /> Current Academic Semester
            </h2>
            <p className="text-xs text-slate-400">
              Browse syllabus, handwritten notes, lectures, and PYQs for all subjects
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <Search className="h-3.5 w-3.5 text-blue-400" />
            <span>Search all 4 years</span>
          </button>
        </div>

        {/* 8-Semester Pills Switcher */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
            const isSelected = currentSem === sem;
            const yearNum = Math.ceil(sem / 2);
            return (
              <button
                key={sem}
                onClick={() => setCurrentSem(sem)}
                className={`py-3 px-2 rounded-xl text-center border transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/25 font-bold"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <span className="text-[10px] block opacity-80 uppercase">Y{yearNum}</span>
                <span className="text-xs font-extrabold">Sem {sem}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subjects Grid for Selected Semester */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Semester {currentSem} Subjects ({subjects.length} Enrolled Courses)
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            Evaluation Scheme Verified
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-60 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((sub) => (
              <SubjectCard key={sub.id} subject={sub} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Access Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
            <FileText className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">Faculty Notes & Lectures</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Access chapter-wise PDF handwritten notes, PPTs, and curated YouTube lecture playlists.
          </p>
          <Link
            href={`/resources?semester=${currentSem}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-1"
          >
            <span>Browse Sem {currentSem} Notes</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400">
            <FileQuestion className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">Previous Year Papers (PYQs)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            University mid-sem and end-semester examination papers with solution keys from 2021 to 2025.
          </p>
          <Link
            href={`/pyqs?semester=${currentSem}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-1"
          >
            <span>Browse Sem {currentSem} PYQs</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">GFG-Style Concept Articles</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            In-depth technical articles with code playgrounds, complexity analysis, and practice quizzes.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-1"
          >
            <span>Explore Technical Articles</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
