"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import {
  ShieldAlert,
  Users,
  BookOpen,
  FileText,
  FileQuestion,
  GraduationCap,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  Code2,
  Trash2,
  Lock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "article_creator" | "resource_uploader" | "users">("overview");

  // New Article Form State
  const [newArticle, setNewArticle] = useState({
    title: "",
    slug: "",
    summary: "",
    difficulty: "BEGINNER",
    readTimeMinutes: 7,
    subjectId: "",
    conceptContent: "",
    codeSnippet: "",
    keyPoints: "",
    quizQuestion: "",
    quizOptions: "",
    quizAnswerIndex: 0,
  });
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [articleMessage, setArticleMessage] = useState<string | null>(null);

  // New Resource Form State
  const [newResource, setNewResource] = useState({
    title: "",
    type: "PDF_NOTES",
    url: "",
    fileSize: "4.5 MB",
    subjectId: "",
    description: "",
  });
  const [resourceMessage, setResourceMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [statsRes, usersRes, subRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/users"),
          fetch("/api/subjects"),
        ]);

        if (statsRes.ok) {
          const s = await statsRes.json();
          setStats(s);
        }
        if (usersRes.ok) {
          const u = await usersRes.json();
          setUsers(u.users || []);
        }
        if (subRes.ok) {
          const subs = await subRes.json();
          setSubjectsList(subs.subjects || []);
          if (subs.subjects?.length > 0) {
            setNewArticle((prev) => ({ ...prev, subjectId: subs.subjects[0].id }));
            setNewResource((prev) => ({ ...prev, subjectId: subs.subjects[0].id }));
          }
        }
      } catch (err) {
        console.error("Admin Load Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isAdmin) {
      loadAdminData();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleMessage(null);

    const formattedCode = newArticle.codeSnippet
      ? JSON.stringify([
          {
            language: "cpp",
            title: "C++ Implementation",
            code: newArticle.codeSnippet,
            explanation: "Core algorithm snippet.",
          },
        ])
      : undefined;

    const formattedKeyPoints = newArticle.keyPoints
      ? JSON.stringify(newArticle.keyPoints.split("\n").filter((p) => p.trim()))
      : undefined;

    const formattedQuiz = newArticle.quizQuestion
      ? JSON.stringify([
          {
            question: newArticle.quizQuestion,
            options: newArticle.quizOptions
              ? newArticle.quizOptions.split(",").map((o) => o.trim())
              : ["Option A", "Option B", "Option C", "Option D"],
            answerIndex: Number(newArticle.quizAnswerIndex),
            explanation: "Correct based on theoretical definition.",
          },
        ])
      : undefined;

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newArticle.title,
          slug:
            newArticle.slug ||
            newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          summary: newArticle.summary,
          difficulty: newArticle.difficulty,
          readTimeMinutes: Number(newArticle.readTimeMinutes),
          subjectId: newArticle.subjectId,
          conceptContent: newArticle.conceptContent,
          codeExamples: formattedCode,
          keyPoints: formattedKeyPoints,
          practiceQuiz: formattedQuiz,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setArticleMessage(`Error: ${data.error}`);
      } else {
        setArticleMessage("Article created and published successfully!");
        setNewArticle({
          title: "",
          slug: "",
          summary: "",
          difficulty: "BEGINNER",
          readTimeMinutes: 7,
          subjectId: subjectsList[0]?.id || "",
          conceptContent: "",
          codeSnippet: "",
          keyPoints: "",
          quizQuestion: "",
          quizOptions: "",
          quizAnswerIndex: 0,
        });
      }
    } catch (err) {
      setArticleMessage("Network error creating article.");
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setResourceMessage(null);

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResource),
      });

      const data = await res.json();
      if (!res.ok) {
        setResourceMessage(`Error: ${data.error}`);
      } else {
        setResourceMessage("Resource uploaded and mapped successfully!");
        setNewResource({
          title: "",
          type: "PDF_NOTES",
          url: "",
          fileSize: "4.5 MB",
          subjectId: subjectsList[0]?.id || "",
          description: "",
        });
      }
    } catch (err) {
      setResourceMessage("Network error creating resource.");
    }
  };

  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === "ADMIN" ? "STUDENT" : "ADMIN";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: nextRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
        );
      }
    } catch (err) {
      console.error("Toggle Role Error:", err);
    }
  };

  // If not admin, show clear authorization gateway with 1-click admin login trigger
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center space-y-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
          <Lock className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-white">Admin Privileges Required</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          This portal is restricted to Department Faculty and System Administrators. Please sign in with an Administrator account.
        </p>

        <button
          onClick={() =>
            signIn("credentials", {
              callbackUrl: "/admin",
              email: "admin@cse.ac.in",
              password: "Engineering@2026",
            })
          }
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/20 transition"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Switch to HOD Admin Account (1-Click)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
          Faculty & Administrator Control Center
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          CSE Platform Admin Studio
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Manage 4-year academic curricula, author GFG-style technical articles, upload handwritten notes and PYQs, and manage student accounts.
        </p>

        {/* Tab Navigation */}
        <div className="pt-4 flex flex-wrap gap-2 border-t border-slate-800">
          {[
            { id: "overview", label: "Overview & Analytics", icon: Activity },
            { id: "article_creator", label: "Author GFG Article", icon: BookOpen },
            { id: "resource_uploader", label: "Upload Notes / PYQs", icon: FileText },
            { id: "users", label: `Manage Students (${users.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview & Metrics */}
      {activeTab === "overview" && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Students</span>
              <p className="text-2xl font-black text-white mt-1">{stats.stats.totalUsers}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-bold text-blue-400 uppercase">Subjects</span>
              <p className="text-2xl font-black text-white mt-1">{stats.stats.totalSubjects}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-bold text-emerald-400 uppercase">GFG Articles</span>
              <p className="text-2xl font-black text-white mt-1">{stats.stats.totalArticles}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-bold text-indigo-400 uppercase">Notes & Videos</span>
              <p className="text-2xl font-black text-white mt-1">{stats.stats.totalResources}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="text-xs font-bold text-amber-400 uppercase">PYQ Papers</span>
              <p className="text-2xl font-black text-white mt-1">{stats.stats.totalPYQs}</p>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              System Audit Logs
            </h3>
            <div className="space-y-2">
              {stats.recentLogs?.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-purple-400">{log.action}</span>
                    <p className="text-slate-400 mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: GFG Article Authoring Studio */}
      {activeTab === "article_creator" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-400" /> Technical Article Authoring Studio
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create structured concept tutorials with syntax-highlighted code blocks, key takeaways, and practice quiz questions.
              </p>
            </div>
          </div>

          {articleMessage && (
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-xs text-emerald-300">
              {articleMessage}
            </div>
          )}

          <form onSubmit={handleCreateArticle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AVL Tree Rotations and Self-Balancing Guide"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Subject
                </label>
                <select
                  value={newArticle.subjectId}
                  onChange={(e) => setNewArticle({ ...newArticle, subjectId: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Summary / Overview
                </label>
                <input
                  type="text"
                  required
                  placeholder="Concise 1-2 sentence topic summary"
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Difficulty
                  </label>
                  <select
                    value={newArticle.difficulty}
                    onChange={(e) => setNewArticle({ ...newArticle, difficulty: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100"
                  >
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="ADVANCED">ADVANCED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Read Time (Mins)
                  </label>
                  <input
                    type="number"
                    value={newArticle.readTimeMinutes}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, readTimeMinutes: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Detailed Concept Theory Content
              </label>
              <textarea
                rows={5}
                required
                placeholder="Explain the theoretical foundations, operations, and Big-O complexities..."
                value={newArticle.conceptContent}
                onChange={(e) => setNewArticle({ ...newArticle, conceptContent: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                C++ / Code Implementation Snippet
              </label>
              <textarea
                rows={4}
                placeholder="// Insert working C++/Python/Java code snippet..."
                value={newArticle.codeSnippet}
                onChange={(e) => setNewArticle({ ...newArticle, codeSnippet: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Key Exam Takeaways (One per line)
              </label>
              <textarea
                rows={2}
                placeholder="Time complexity is O(log N)&#10;Balance factor must be -1, 0, or +1"
                value={newArticle.keyPoints}
                onChange={(e) => setNewArticle({ ...newArticle, keyPoints: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition"
            >
              <Plus className="h-4 w-4" />
              <span>Publish Technical Article</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Resource Uploader */}
      {activeTab === "resource_uploader" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-400" /> Upload Study Material & Notes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Map handwritten PDF notes, YouTube lectures, or lab manuals to any subject.
            </p>
          </div>

          {resourceMessage && (
            <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 text-xs text-indigo-300">
              {resourceMessage}
            </div>
          )}

          <form onSubmit={handleCreateResource} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3 Complete Handwritten Notes"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject
                </label>
                <select
                  value={newResource.subjectId}
                  onChange={(e) => setNewResource({ ...newResource, subjectId: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Resource Type
                </label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100"
                >
                  <option value="PDF_NOTES">Handwritten PDF Notes</option>
                  <option value="LECTURE_VIDEO">Curated Video Lecture URL</option>
                  <option value="LAB_MANUAL">Lab Manual & Code</option>
                  <option value="REFERENCE_BOOK">Reference Book Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  File URL or Video Link
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition"
            >
              <Save className="h-4 w-4" />
              <span>Save & Publish Resource</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Student User Management */}
      {activeTab === "users" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white">Registered Students & Faculty</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase">
                <tr>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Year / Sem</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-950/40">
                    <td className="py-3 px-3 font-semibold text-white">{u.name}</td>
                    <td className="py-3 px-3">{u.email}</td>
                    <td className="py-3 px-3">
                      Year {u.currentYear} • Sem {u.currentSemester}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          u.role === "ADMIN"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleUserRole(u.id, u.role)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                      >
                        Toggle Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
