"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  Layers,
  BookOpen,
  Sparkles,
} from "lucide-react";
import SubjectCard from "@/components/academic/SubjectCard";

export default function SubjectsDirectoryPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSem, setSelectedSem] = useState<string>("all");
  const [selectedSpec, setSelectedSpec] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      setLoading(true);
      try {
        let url = `/api/subjects?`;
        if (selectedYear !== "all") url += `year=${selectedYear}&`;
        if (selectedSem !== "all") url += `semester=${selectedSem}&`;
        if (selectedSpec !== "all") url += `specialization=${selectedSpec}&`;
        if (searchQuery.trim()) url += `q=${encodeURIComponent(searchQuery.trim())}&`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSubjects(data.subjects || []);
        }
      } catch (err) {
        console.error("Fetch Subjects Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, [selectedYear, selectedSem, selectedSpec, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Official 4-Year B.Tech CSE Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          All Computer Science Subjects & Syllabus
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Browse all core theory courses, engineering practicals, specialized electives (ML, Big Data, IoT, SE), and open electives across 8 semesters.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 space-y-4 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Filter className="h-4 w-4 text-blue-400" />
          <span>Curriculum Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search code or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Academic Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSem("all");
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Academic Years (1 to 4)</option>
            <option value="1">1st Year (Sem 1 & 2)</option>
            <option value="2">2nd Year (Sem 3 & 4)</option>
            <option value="3">3rd Year (Sem 5 & 6)</option>
            <option value="4">4th Year (Sem 7 & 8)</option>
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Semesters (1 to 8)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>

          {/* Specialization Stream */}
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Streams & Specializations</option>
            <option value="ML">Machine Learning (ML)</option>
            <option value="BD">Big Data Analytics (BD)</option>
            <option value="SE">Software Engineering (SE)</option>
            <option value="IOT">Internet of Things (IoT)</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Showing {subjects.length} Subjects Found
        </span>
      </div>

      {/* Subjects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-60 rounded-2xl bg-slate-800/40 animate-pulse" />
          ))}
        </div>
      ) : subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <SubjectCard key={sub.id} subject={sub} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
          <BookOpen className="mx-auto h-10 w-10 text-slate-600" />
          <h3 className="text-base font-bold text-slate-300">No matching subjects</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No subjects matched your selected filter criteria. Try resetting the filters above.
          </p>
        </div>
      )}
    </div>
  );
}
