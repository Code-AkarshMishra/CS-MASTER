import React from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, Sparkles, Heart, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 pt-12 pb-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                CSE ENGINE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The official complete 4-Year B.Tech Computer Science & Engineering learning platform. Built for university curriculum mastery, high CGPA, and top-tier tech placements.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Code2 className="h-3.5 w-3.5 text-blue-400" /> 8 Semesters
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-indigo-400" /> 60+ Subjects
              </span>
            </div>
          </div>

          {/* 4-Year Curriculum Roadmaps */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Academic Curriculum
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/years/1" className="hover:text-blue-400 transition">
                  1st Year (Sem 1 & Sem 2)
                </Link>
              </li>
              <li>
                <Link href="/years/2" className="hover:text-blue-400 transition">
                  2nd Year (Sem 3 & Sem 4)
                </Link>
              </li>
              <li>
                <Link href="/years/3" className="hover:text-blue-400 transition">
                  3rd Year (Sem 5 & Sem 6)
                </Link>
              </li>
              <li>
                <Link href="/years/4" className="hover:text-blue-400 transition">
                  4th Year (Sem 7 & Sem 8)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Learning Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Learning Systems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition">
                  GFG-Style Concept Articles
                </Link>
              </li>
              <li>
                <Link href="/pyqs" className="hover:text-blue-400 transition">
                  Previous Year Papers (PYQs)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-400 transition">
                  Faculty Handwritten Notes
                </Link>
              </li>
              <li>
                <Link href="/resources?type=LAB_MANUAL" className="hover:text-blue-400 transition">
                  Lab Manuals & Code Repository
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Verification Notice */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Security & Verification
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 mb-3">
              Protected by server-side disposable email firewall, cryptographic bcrypt hashing, and Google OAuth 2.0 verification.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-semibold">● Production System Live</span>
              <p className="mt-0.5 text-slate-500">Curriculum generated from official university syllabus.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CSE Engine Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Engineered with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for CSE Students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
