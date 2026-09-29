"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  FileQuestion,
  Bookmark,
  ArrowRight,
  Code2,
  Atom,
  Binary,
  Zap,
  Compass,
  Leaf,
  FlaskConical,
  Sigma,
  Wrench,
  Network,
  Terminal,
  Layers,
  Cpu,
  Server,
  Scale,
  Building2,
  Database,
  Activity,
  Globe,
  Bot,
  Lock,
  Share2,
  Boxes,
  Briefcase,
  Rocket,
  CheckCircle,
} from "lucide-react";

const ICON_MAP: { [key: string]: any } = {
  Atom,
  Binary,
  Zap,
  Compass,
  Leaf,
  FlaskConical,
  Sigma,
  Code: Code2,
  Wrench,
  FileText,
  Network,
  Terminal,
  Layers,
  Calculator: Binary,
  Cpu,
  CircuitBoard: Cpu,
  TerminalSquare: Terminal,
  Code2,
  MessageSquare: BookOpen,
  BarChart3: Activity,
  Boxes,
  Radio: Activity,
  BrainCircuit: Bot,
  Database,
  FileCheck2: FileText,
  Microchip: Cpu,
  Server,
  Users: Briefcase,
  Scale,
  Building2,
  Table: Database,
  GitMerge: Network,
  Box: Boxes,
  Activity,
  ShoppingCart: Briefcase,
  Image: Layers,
  Briefcase,
  BookOpen,
  Award: CheckCircle,
  Globe,
  Bot,
  Lock,
  Sparkles: BookOpen,
  FolderGit2: Layers,
  Presentation: Briefcase,
  Share2,
  Link2: Globe,
  Dna: Leaf,
  FolderKanban: Layers,
  Rocket,
};

interface SubjectCardProps {
  subject: any;
  onBookmarkToggle?: (subjectId: string) => void;
  isBookmarked?: boolean;
}

export default function SubjectCard({
  subject,
  onBookmarkToggle,
  isBookmarked = false,
}: SubjectCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const IconComponent = ICON_MAP[subject.iconName || "BookOpen"] || BookOpen;

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onBookmarkToggle) {
      onBookmarkToggle(subject.id);
    } else {
      try {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemType: "SUBJECT", subjectId: subject.id }),
        });
      } catch (err) {
        console.error("Bookmark Error:", err);
      }
    }
  };

  const specColors: { [key: string]: string } = {
    BD: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    SE: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    IOT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ML: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg hover:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Header Badges & Bookmark */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">
              {subject.code}
            </span>

            {subject.isLab && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                PRACTICAL / LAB
              </span>
            )}

            {subject.specializationStream && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  specColors[subject.specializationStream] ||
                  "bg-purple-500/15 text-purple-400 border-purple-500/20"
                }`}
              >
                SPECIALIZATION ({subject.specializationStream})
              </span>
            )}

            {subject.electiveCategory && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                {subject.electiveCategory}
              </span>
            )}
          </div>

          <button
            onClick={handleBookmark}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition"
            title="Bookmark subject"
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
          </button>
        </div>

        {/* Title and Icon */}
        <Link href={`/subjects/${subject.code}`} className="block group-hover:text-blue-400 transition">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                {subject.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {subject.description}
              </p>
            </div>
          </div>
        </Link>

        {/* Evaluation Scheme & Credit Breakdown */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-950/60 p-2.5 text-center text-xs border border-slate-800/60">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Credits</span>
            <span className="font-semibold text-slate-200">{subject.credits} C</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">L - T - P</span>
            <span className="font-semibold text-slate-200">
              {subject.lectureHours}-{subject.tutorialHours}-{subject.practicalHours}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">CIE / ESE</span>
            <span className="font-semibold text-slate-200">
              {subject.internalMarks}/{subject.externalMarks}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link
            href={`/subjects/${subject.code}?tab=notes`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 text-xs flex items-center gap-1 transition"
            title="Study Notes"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Notes</span>
          </Link>
          <Link
            href={`/subjects/${subject.code}?tab=pyqs`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 text-xs flex items-center gap-1 transition"
            title="PYQs"
          >
            <FileQuestion className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">PYQs</span>
          </Link>
          <Link
            href={`/subjects/${subject.code}?tab=reading`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 text-xs flex items-center gap-1 transition"
            title="GFG Reading Material"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">Articles</span>
          </Link>
        </div>

        <Link
          href={`/subjects/${subject.code}`}
          className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
        >
          <span>Open</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
