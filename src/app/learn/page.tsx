"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  Code2,
  CheckCircle2,
} from "lucide-react";

export default function LearnHubPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        let url = `/api/articles`;
        if (search.trim()) url += `?q=${encodeURIComponent(search.trim())}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setArticles(data.articles || []);
        }
      } catch (err) {
        console.error("Load Articles Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            GFG-Style Engineering Reading System
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Computer Science Engineering Reading Hub
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive, original technical reading guides with interactive code blocks, complexity tables, architecture diagrams, common mistakes, and practice quizzes.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Linked List, Dijkstra, Mutex)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Available Concept Tutorials ({articles.length})
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/learn/${art.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/40 hover:bg-slate-900 hover:shadow-2xl transition flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {art.subject?.code}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" />
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Start Reading</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
            <BookOpen className="mx-auto h-10 w-10 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No articles found matching query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
