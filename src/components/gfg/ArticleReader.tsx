"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  AlertTriangle,
  Lightbulb,
  Check,
  ChevronRight,
  Layers,
  HelpCircle,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

interface ArticleReaderProps {
  article: any;
  navigation: {
    previous: any;
    next: any;
  };
}

export default function ArticleReader({ article, navigation }: ArticleReaderProps) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [index: number]: number }>({});
  const [revealedExplanations, setRevealedExplanations] = useState<{ [index: number]: boolean }>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Parse JSON data safely
  let codeSnippets = [];
  try {
    codeSnippets = article.codeExamples ? JSON.parse(article.codeExamples) : [];
  } catch (e) {
    codeSnippets = [];
  }

  let keyPointsList: string[] = [];
  try {
    keyPointsList = article.keyPoints ? JSON.parse(article.keyPoints) : [];
  } catch (e) {
    keyPointsList = [];
  }

  let commonMistakesList: string[] = [];
  try {
    commonMistakesList = article.commonMistakes ? JSON.parse(article.commonMistakes) : [];
  } catch (e) {
    commonMistakesList = [];
  }

  let quizList: any[] = [];
  try {
    quizList = article.practiceQuiz ? JSON.parse(article.practiceQuiz) : [];
  } catch (e) {
    quizList = [];
  }

  const handleToggleComplete = async () => {
    const newState = !completed;
    setCompleted(newState);
    if (newState) {
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
      });

      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleId: article.id, isCompleted: true }),
        });
      } catch (err) {
        console.error("Progress update failed:", err);
      }
    }
  };

  const handleToggleBookmark = async () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: "ARTICLE", articleId: article.id }),
      });
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleExplanation = (qIdx: number) => {
    setRevealedExplanations((prev) => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  const difficultyColors = {
    BEGINNER: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    INTERMEDIATE: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    ADVANCED: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/subjects" className="hover:text-blue-400 transition">
          Subjects
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/subjects/${article.subject?.code}`}
          className="font-medium text-slate-300 hover:text-blue-400 transition"
        >
          {article.subject?.title} ({article.subject?.code})
        </Link>
        {article.unit && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-400">{article.unit.title}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Content (8 or 9 cols) */}
        <article className="lg:col-span-8 xl:col-span-9 space-y-8">
          {/* Article Header */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md border ${
                  difficultyColors[article.difficulty as keyof typeof difficultyColors] ||
                  difficultyColors.BEGINNER
                }`}
              >
                {article.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                {article.readTimeMinutes} min read
              </span>
              <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                {article.subject?.code}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4">
              {article.title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed mb-6 font-normal">
              {article.summary}
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-800/80">
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  completed
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <CheckCircle2 className={`h-4 w-4 ${completed ? "text-white" : "text-slate-400"}`} />
                <span>{completed ? "Completed!" : "Mark as Completed"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleBookmark}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition ${
                    bookmarked
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? "fill-amber-400" : ""}`} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? "Copied Link" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Concept Explanation Body */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="h-5 w-5 text-blue-400" /> Concept Deep Dive & Theory
            </h2>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {article.conceptContent}
            </div>

            {/* Visual ASCII / Architecture Diagram */}
            {article.diagramAscii && (
              <div className="my-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Layers className="h-4 w-4" /> Architectural Diagram & Data Flow
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Structural Model</span>
                </div>
                <pre className="overflow-x-auto font-mono text-xs text-blue-300 leading-tight py-2">
                  {article.diagramAscii}
                </pre>
              </div>
            )}
          </div>

          {/* Interactive Multi-Language Code Block */}
          {codeSnippets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-emerald-400" /> Implementation & Code Walkthrough
              </h2>
              <CodeBlock snippets={codeSnippets} />
            </div>
          )}

          {/* Key Points & Takeaways */}
          {keyPointsList.length > 0 && (
            <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6">
              <h3 className="text-base font-bold text-blue-400 flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-blue-400" /> Key Takeaways & Exam Points
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {keyPointsList.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes & Pitfalls */}
          {commonMistakesList.length > 0 && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-6">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" /> Common Mistakes & Pitfalls to Avoid
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {commonMistakesList.map((cm, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Self-Check Practice Quiz */}
          {quizList.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-400" /> Practice Quiz & Self-Check
              </h3>

              <div className="space-y-6">
                {quizList.map((quiz, qIdx) => {
                  const selected = quizAnswers[qIdx];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === quiz.answerIndex;

                  return (
                    <div
                      key={qIdx}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-4"
                    >
                      <p className="text-sm font-semibold text-slate-200">
                        {qIdx + 1}. {quiz.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {quiz.options.map((opt: string, optIdx: number) => {
                          const isOptionSelected = selected === optIdx;
                          let optionStyle =
                            "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white";

                          if (isAnswered) {
                            if (optIdx === quiz.answerIndex) {
                              optionStyle =
                                "border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-semibold";
                            } else if (isOptionSelected) {
                              optionStyle =
                                "border-rose-500/50 bg-rose-950/40 text-rose-300 line-through";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuiz(qIdx, optIdx)}
                              className={`p-3 text-left text-xs rounded-lg border transition flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && optIdx === quiz.answerIndex && (
                                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="pt-2">
                          <button
                            onClick={() => toggleExplanation(qIdx)}
                            className="text-xs font-semibold text-blue-400 hover:underline"
                          >
                            {revealedExplanations[qIdx]
                              ? "Hide Explanation"
                              : "View Explanation"}
                          </button>
                          {revealedExplanations[qIdx] && (
                            <p className="mt-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                              💡 <b>Explanation:</b> {quiz.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prev / Next Navigation Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
            {navigation.previous ? (
              <Link
                href={`/learn/${navigation.previous.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition w-full sm:w-auto"
              >
                <ArrowLeft className="h-5 w-5 text-blue-400" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Previous Topic
                  </span>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {navigation.previous.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <Link
                href={`/learn/${navigation.next.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition w-full sm:w-auto text-right"
              >
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Next Topic
                  </span>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {navigation.next.title}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-400" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>

        {/* Sidebar Navigation: Units & Topic Outline (3-4 cols) */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-400" /> Curriculum Roadmap
            </h4>

            {article.subject?.units && (
              <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                {article.subject.units.map((unit: any) => (
                  <div key={unit.id} className="space-y-1.5">
                    <div className="text-xs font-bold text-slate-300">
                      Unit {unit.unitNumber}: {unit.title}
                    </div>

                    <div className="space-y-1 pl-2 border-l border-slate-800">
                      {unit.articles?.map((art: any) => {
                        const isCurrent = art.id === article.id;
                        return (
                          <Link
                            key={art.id}
                            href={`/learn/${art.slug}`}
                            className={`block text-xs py-1.5 px-2 rounded-lg transition ${
                              isCurrent
                                ? "bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                            }`}
                          >
                            {art.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href={`/subjects/${article.subject?.code}`}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl border border-blue-500/20 transition"
              >
                Back to Subject Page
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
