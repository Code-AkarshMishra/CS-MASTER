"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  FileText,
  FileQuestion,
  X,
  Sparkles,
  ArrowRight,
  GraduationCap,
  FolderOpen,
} from "lucide-react";

export default function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    subjects: any[];
    articles: any[];
    resources: any[];
    pyqs: any[];
  }>({ subjects: [], articles: [], resources: [], pyqs: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ subjects: [], articles: [], resources: [], pyqs: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ subjects: [], articles: [], resources: [], pyqs: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || { subjects: [], articles: [], resources: [], pyqs: [] });
        }
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalHits =
    results.subjects.length +
    results.articles.length +
    results.resources.length +
    results.pyqs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 backdrop-blur-md pt-20 px-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="h-5 w-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search subjects (e.g. DSA, DBMS), topics, PDF notes, PYQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-400 hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-10 text-xs text-slate-400">
              <span className="inline-block animate-spin mr-2">◓</span> Searching 4-Year database...
            </div>
          )}

          {!loading && query.length >= 2 && totalHits === 0 && (
            <div className="py-12 text-center">
              <FolderOpen className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-300">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for subject codes like UCS3011, or keywords like &ldquo;Trees&rdquo;, &ldquo;Dijkstra&rdquo;, &ldquo;Operating System&rdquo;.</p>
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="py-6 px-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Popular Quick Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structures",
                  "Operating System",
                  "Database Management",
                  "Compiler Design",
                  "Dijkstra",
                  "Big Data",
                  "Machine Learning",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subjects Matches */}
          {results.subjects.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-blue-400">
                <GraduationCap className="h-3.5 w-3.5" /> Subjects ({results.subjects.length})
              </div>
              <div className="space-y-1 mt-1">
                {results.subjects.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/subjects/${sub.code}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                          {sub.code}
                        </span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          {sub.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {sub.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matches (GFG style) */}
          {results.articles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <BookOpen className="h-3.5 w-3.5" /> GFG Reading Articles ({results.articles.length})
              </div>
              <div className="space-y-1 mt-1">
                {results.articles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/learn/${art.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 transition group"
                  >
                    <div>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-emerald-300">
                        {art.title}
                      </span>
                      <p className="text-xs text-slate-400 line-clamp-1">{art.summary}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Read
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Resources & PYQs */}
          {results.resources.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <FileText className="h-3.5 w-3.5" /> Notes & Lectures ({results.resources.length})
              </div>
              <div className="space-y-1 mt-1">
                {results.resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 transition group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-300">{res.title}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                        {res.type}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {results.pyqs.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                <FileQuestion className="h-3.5 w-3.5" /> University PYQs ({results.pyqs.length})
              </div>
              <div className="space-y-1 mt-1">
                {results.pyqs.map((pyq) => (
                  <Link
                    key={pyq.id}
                    href={`/subjects/${pyq.subject?.code}?tab=pyqs`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 transition group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-200">
                        {pyq.subject?.title} ({pyq.examYear} {pyq.examType})
                      </span>
                      <p className="text-[11px] text-slate-400">{pyq.keyTopicsCovered}</p>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                      View PYQ
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-500 flex justify-between">
          <span>Navigate with <b>↑</b> <b>↓</b> keys</span>
          <span>Press <b>ESC</b> to close</span>
        </div>
      </div>
    </div>
  );
}
