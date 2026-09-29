"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Layers,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SubjectCard from "@/components/academic/SubjectCard";

export default function YearDetailPage({
  params,
}: {
  params: Promise<{ yearId: string }>;
}) {
  const resolvedParams = use(params);
  const yearNumber = parseInt(resolvedParams.yearId) || 1;

  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSem, setActiveSem] = useState<number>(yearNumber * 2 - 1);

  const sem1 = yearNumber * 2 - 1;
  const sem2 = yearNumber * 2;

  useEffect(() => {
    async function loadYearSubjects() {
      setLoading(true);
      try {
        const res = await fetch(`/api/subjects?year=${yearNumber}`);
        if (res.ok) {
          const data = await res.json();
          setSubjects(data.subjects || []);
        }
      } catch (err) {
        console.error("Failed to load year subjects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadYearSubjects();
  }, [yearNumber]);

  const filteredSubjects = subjects.filter(
    (s) => s.semester?.semesterNumber === activeSem
  );

  const yearTitles: { [key: number]: { title: string; desc: string; credits: string } } = {
    1: {
      title: "1st Year B.Tech CSE (Foundation & Engineering Sciences)",
      desc: "Fundamental sciences, Physics & Chemistry labs, Engineering Mathematics, Engineering Graphics, and Problem Solving in C.",
      credits: "40.0 Total Credits (19.5 + 20.5)",
    },
    2: {
      title: "2nd Year B.Tech CSE (Core Computer Science & Architecture)",
      desc: "Data Structures & Algorithms, Computer Organization, Operating Systems, Discrete Mathematics, Python, and Specialization streams.",
      credits: "45.0 Total Credits (24.0 + 21.0)",
    },
    3: {
      title: "3rd Year B.Tech CSE (Advanced Systems, Algorithms & AI)",
      desc: "Database Management Systems, DAA, Compiler Design, Computer Networks, Object Oriented Programming, and Departmental Electives.",
      credits: "44.0 Total Credits (23.0 + 21.0)",
    },
    4: {
      title: "4th Year B.Tech CSE (Specialized Electives & Major Capstone)",
      desc: "Distributed Systems, Soft Computing, Blockchain Architecture, Major Projects II & III, and Industry Internship.",
      credits: "32.0 Total Credits (17.0 + 15.0)",
    },
  };

  const currentYearMeta = yearTitles[yearNumber] || yearTitles[1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/subjects" className="hover:text-blue-400 transition">
          Curriculum
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-200">Year {yearNumber}</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
            Academic Year {yearNumber}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {currentYearMeta.credits}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {currentYearMeta.title}
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {currentYearMeta.desc}
        </p>

        {/* Semester Tabs */}
        <div className="pt-4 flex gap-3 border-t border-slate-800">
          <button
            onClick={() => setActiveSem(sem1)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSem === sem1
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Semester {sem1} Scheme</span>
          </button>

          <button
            onClick={() => setActiveSem(sem2)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSem === sem2
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Semester {sem2} Scheme</span>
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Semester {activeSem} Subjects ({filteredSubjects.length} Courses)
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-60 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((sub) => (
              <SubjectCard key={sub.id} subject={sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
