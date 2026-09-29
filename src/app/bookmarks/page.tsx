"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Bookmark,
  BookOpen,
  FileText,
  FileQuestion,
  GraduationCap,
  ArrowRight,
  Trash2,
  FolderOpen,
} from "lucide-react";

export default function BookmarksPage() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks");
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (err) {
      console.error("Fetch Bookmarks Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (bookmark: any) => {
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: bookmark.itemType,
          subjectId: bookmark.subjectId,
          articleId: bookmark.articleId,
          resourceId: bookmark.resourceId,
          pyqId: bookmark.pyqId,
        }),
      });
      fetchBookmarks();
    } catch (err) {
      console.error("Remove Bookmark Error:", err);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
          Student Repository
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          My Saved Bookmarks & Resources
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Quickly access your bookmarked subjects, GFG reading tutorials, handwritten notes, and examination papers.
        </p>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((b) => {
              const isSubject = b.itemType === "SUBJECT" && b.subject;
              const isArticle = b.itemType === "ARTICLE" && b.article;
              const isResource = b.itemType === "RESOURCE" && b.resource;

              return (
                <div
                  key={b.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20">
                        {b.itemType}
                      </span>
                      <button
                        onClick={() => handleRemoveBookmark(b)}
                        className="p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {isSubject && (
                      <>
                        <h4 className="text-base font-bold text-white line-clamp-1">
                          {b.subject.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {b.subject.description}
                        </p>
                      </>
                    )}

                    {isArticle && (
                      <>
                        <h4 className="text-base font-bold text-white line-clamp-1">
                          {b.article.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {b.article.summary}
                        </p>
                      </>
                    )}

                    {isResource && (
                      <>
                        <h4 className="text-base font-bold text-white line-clamp-1">
                          {b.resource.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {b.resource.description}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    {isSubject && (
                      <Link
                        href={`/subjects/${b.subject.code}`}
                        className="flex items-center justify-between text-xs font-bold text-blue-400 hover:text-blue-300"
                      >
                        <span>Open Subject</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}

                    {isArticle && (
                      <Link
                        href={`/learn/${b.article.slug}`}
                        className="flex items-center justify-between text-xs font-bold text-emerald-400 hover:text-emerald-300"
                      >
                        <span>Open Article</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}

                    {isResource && (
                      <a
                        href={b.resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs font-bold text-indigo-400 hover:text-indigo-300"
                      >
                        <span>Download Resource</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-3">
            <Bookmark className="mx-auto h-10 w-10 text-slate-600" />
            <h3 className="text-base font-bold text-slate-300">No bookmarks saved yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click the bookmark icon on any subject, reading tutorial, or note to save it here for fast revision.
            </p>
            <div className="pt-2">
              <Link
                href="/subjects"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white"
              >
                Browse Curriculum
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
