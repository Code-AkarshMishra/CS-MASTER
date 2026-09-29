"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
  FileQuestion,
  CheckCircle2,
  ArrowRight,
  Code2,
  Brain,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Zap,
  Award,
  Search,
  Users,
} from "lucide-react";
import SubjectCard from "@/components/academic/SubjectCard";

export default function LandingPage() {
  const [activeYear, setActiveYear] = useState(1);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurriculum() {
      setLoading(true);
      try {
        const res = await fetch(`/api/subjects?year=${activeYear}`);
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
    fetchCurriculum();
  }, [activeYear]);

  const yearsInfo = [
    {
      year: 1,
      title: "1st Year: Engineering Foundations",
      semesters: "Semester 1 & Semester 2",
      credits: "40.0 Credits",
      highlights: ["Physics & Chemistry Labs", "Mathematics I & II", "Programming for Problem Solving (C)", "Engineering Graphics"],
    },
    {
      year: 2,
      title: "2nd Year: Core Computer Science",
      semesters: "Semester 3 & Semester 4",
      credits: "45.0 Credits",
      highlights: ["Data Structures & Algorithms", "Operating Systems", "COA", "Python Programming", "Discrete Mathematics"],
    },
    {
      year: 3,
      title: "3rd Year: Advanced Systems & AI",
      semesters: "Semester 5 & Semester 6",
      credits: "44.0 Credits",
      highlights: ["DBMS", "Design & Analysis of Algorithms", "Compiler Design", "Computer Networks", "Big Data & ML"],
    },
    {
      year: 4,
      title: "4th Year: Specialization & Capstone",
      semesters: "Semester 7 & Semester 8",
      credits: "32.0 Credits",
      highlights: ["Distributed Systems", "Cloud & Soft Computing", "Blockchain Architecture", "Major Project II & III", "Internship"],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-indigo-600/15 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[300px] bg-cyan-600/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold text-blue-300 shadow-inner backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>Official University B.Tech Computer Science Curriculum</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Master 4 Years of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Computer Science
            </span>{" "}
            in One Platform.
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Directly mapped to the university syllabus. Comprehensive lecture notes, interactive GFG-style technical articles, solved PYQs, video lectures, and complete 8-semester course roadmaps.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <Terminal className="h-4 w-4 text-blue-400" />
              <span>Explore Student Dashboard</span>
            </Link>
          </div>

          {/* Feature Badges Counter */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">4 Years</p>
              <p className="text-xs text-slate-400 mt-0.5">8 Full Semesters</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">60+ Subjects</p>
              <p className="text-xs text-slate-400 mt-0.5">Theory & Practicals</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100% Verified</p>
              <p className="text-xs text-slate-400 mt-0.5">Official University PDF</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">5+ Years</p>
              <p className="text-xs text-slate-400 mt-0.5">University PYQs Bank</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Year Interactive Curriculum Explorer */}
      <section className="w-full py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Complete Academic Scheme
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Explore Year-by-Year Syllabus & Subjects
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Select any academic year below to view exact course codes, credits, lecture breakdown (L-T-P), and syllabus modules straight from the evaluation scheme.
            </p>
          </div>

          {/* Year Switcher Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {yearsInfo.map((y) => {
              const isSelected = activeYear === y.year;
              return (
                <button
                  key={y.year}
                  onClick={() => setActiveYear(y.year)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-950/40 shadow-lg shadow-blue-500/15 ring-1 ring-blue-500"
                      : "border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isSelected ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      Year {y.year}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{y.credits}</span>
                  </div>
                  <h3
                    className={`text-sm font-bold mt-2 ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {y.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{y.semesters}</p>
                </button>
              );
            })}
          </div>

          {/* Active Year Highlights Banner */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Year {activeYear} Focus Topics
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {yearsInfo[activeYear - 1].highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/years/${activeYear}`}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-4 py-2.5 rounded-xl border border-blue-500/20 shrink-0"
            >
              <span>View Full Year {activeYear} Scheme</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Subject Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-64 rounded-2xl bg-slate-800/40 animate-pulse" />
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
      </section>

      {/* GFG-Style Technical Reading Showcase */}
      <section className="w-full py-20 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Interactive Learning System
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                GFG-Style Concept Articles & Interactive Code Studio
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Learn every data structure, algorithm, operating system theorem, and database concept with high clarity. Equipped with syntax-highlighted code blocks in C++, Python, and Java, real-time code simulation, architectural ASCII diagrams, and self-check practice quizzes.
              </p>

              <div className="space-y-3">
                {[
                  "Theory with Big-O Time & Space Complexity tables",
                  "Multi-language code snippets with 1-click copy & output terminal",
                  "Common mistakes and examiner pitfalls warning callouts",
                  "Self-check multiple-choice quizzes with instant explanation",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/learn/singly-linked-list-insertion-deletion"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Try Interactive Linked List Article</span>
                </Link>
              </div>
            </div>

            {/* Interactive Code Preview Box */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    dsa_singly_linked_list.cpp
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  C++ 20 Compliant
                </span>
              </div>

              <pre className="font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto p-3 rounded-xl bg-slate-950">
{`struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// O(1) Head Insertion
void insertAtHead(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}`}
              </pre>

              <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-950/30 p-3 text-xs text-slate-300 flex items-start gap-2.5">
                <Brain className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <b className="text-blue-300">Algorithmic Insight:</b> Notice how inserting at the head updates the pointer references in constant $O(1)$ time without shifting elements in memory.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Verification Guarantee */}
      <section className="w-full py-16 bg-slate-900/80 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            <ShieldCheck className="h-4 w-4" /> Academic Security & Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Legitimate Student Identity & Protected Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Our platform strictly prohibits temporary, disposable, and burner email generators with a real-time domain firewall, safeguarding authentic engineering students.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 text-xs font-bold text-white transition"
            >
              Create Verified Student Account
            </Link>
            <Link
              href="/login"
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-6 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 transition"
            >
              Sign In Existing Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
