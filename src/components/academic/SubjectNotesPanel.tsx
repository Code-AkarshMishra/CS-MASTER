"use client";

import React, { useState, lazy, Suspense } from "react";
import Link from "next/link";
import {
  BookOpen, Lightbulb, AlertTriangle, HelpCircle, Code2, CheckCircle2,
  Layers, Zap, Target, ChevronDown, ChevronRight, ExternalLink, Sparkles,
} from "lucide-react";
import { COMPLETE_SYLLABUS_DATA, type TopicContent, type UnitData } from "@/lib/curriculumData";
import CodeBlock from "@/components/gfg/CodeBlock";

// Lazy-load heavy visualizers
const DsaVisualizer = lazy(() => import("@/components/visualizers/DsaVisualizer"));
const SortingVisualizer = lazy(() => import("@/components/visualizers/SortingVisualizer"));
const ComplexityVisualizer = lazy(() => import("@/components/visualizers/ComplexityVisualizer"));
const GraphVisualizer = lazy(() => import("@/components/visualizers/GraphVisualizer"));
const OsVisualizer = lazy(() => import("@/components/visualizers/OsVisualizer"));
const DbmsVisualizer = lazy(() => import("@/components/visualizers/DbmsVisualizer"));
const NetworkVisualizer = lazy(() => import("@/components/visualizers/NetworkVisualizer"));

const VisualizerLoader = () => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 flex flex-col items-center justify-center gap-3">
    <div className="animate-spin text-2xl text-blue-400">◓</div>
    <p className="text-xs text-slate-400">Loading Interactive Visualizer...</p>
  </div>
);

function getVisualizer(type?: string) {
  if (!type) return null;
  return (
    <Suspense fallback={<VisualizerLoader />}>
      {type === "dsa" && <DsaVisualizer />}
      {type === "sorting" && <SortingVisualizer />}
      {type === "complexity" && <ComplexityVisualizer />}
      {type === "recursion" && <DsaVisualizer />}
      {type === "graph" && <GraphVisualizer />}
      {type === "os" && <OsVisualizer />}
      {type === "dbms" && <DbmsVisualizer />}
      {type === "network" && <NetworkVisualizer />}
    </Suspense>
  );
}

interface TopicCardProps {
  topicName: string;
  topic: TopicContent;
  isExpanded: boolean;
  onToggle: () => void;
}

function TopicCard({ topicName, topic, isExpanded, onToggle }: TopicCardProps) {
  const [activeSection, setActiveSection] = useState<string>("concept");

  const sections = [
    { id: "concept", label: "Concept", icon: BookOpen },
    { id: "visual", label: "Visual/Diagram", icon: Layers },
    { id: "code", label: "Code & Implementation", icon: Code2 },
    { id: "keypoints", label: "Key Points", icon: Lightbulb },
    { id: "solved", label: "Solved Problem", icon: Target },
    { id: "questions", label: "Imp. Questions", icon: HelpCircle },
    { id: "viva", label: "Viva Q&A", icon: Zap },
    { id: "revision", label: "Quick Revision", icon: CheckCircle2 },
  ].filter((s) => {
    if (s.id === "code" && !topic.codeSnippet) return false;
    if (s.id === "solved" && !topic.solvedProblem) return false;
    if (s.id === "visual" && !topic.diagramAscii && !topic.associatedVisualizer) return false;
    return true;
  });

  const difficultyBadge = topic.subtopics.length > 4 ? "INTERMEDIATE" : "BEGINNER";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg transition-all">
      {/* Topic Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-900/80 transition group"
      >
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition">
              {topic.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                difficultyBadge === "INTERMEDIATE"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}>
                {difficultyBadge}
              </span>
              <span className="text-[11px] text-slate-500">
                {topic.subtopics.length} subtopics
              </span>
              {topic.associatedVisualizer && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" /> Interactive
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="shrink-0 text-slate-500">
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-800">
          {/* Subtopics quick list */}
          <div className="px-6 py-4 bg-slate-950/50 flex flex-wrap gap-2">
            {topic.subtopics.map((sub, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                {i + 1}. {sub}
              </span>
            ))}
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap gap-1.5 px-6 py-3 border-t border-slate-800 bg-slate-950/40">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                    activeSection === sec.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="px-6 py-6 space-y-4">
            {/* === CONCEPT === */}
            {activeSection === "concept" && (
              <div className="space-y-5">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300 space-y-3 whitespace-pre-line">
                  {topic.conceptExplanation}
                </div>

                {/* Real Life Example */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Real-Life Example</span>
                  </div>
                  <p className="text-sm text-slate-300">{topic.realLifeExample}</p>
                </div>

                {/* Technical Example */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Technical Context</span>
                  </div>
                  <p className="text-sm text-slate-300">{topic.technicalExample}</p>
                </div>

                {/* Formulas */}
                {topic.formulas && topic.formulas.length > 0 && (
                  <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Formulas & Equations</span>
                    </div>
                    <div className="space-y-2">
                      {topic.formulas.map((f, i) => (
                        <div key={i} className="font-mono text-sm text-purple-300 bg-purple-950/40 px-3 py-2 rounded-lg border border-purple-500/20">
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Advantages & Limitations */}
                {(topic.advantages || topic.limitations) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topic.advantages && (
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Advantages</div>
                        <ul className="space-y-1.5">
                          {topic.advantages.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {topic.limitations && (
                      <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                        <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Limitations</div>
                        <ul className="space-y-1.5">
                          {topic.limitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Applications */}
                {topic.applications && (
                  <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Real-World Applications</div>
                    <div className="flex flex-wrap gap-2">
                      {topic.applications.map((app, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* === VISUAL / DIAGRAM / INTERACTIVE === */}
            {activeSection === "visual" && (
              <div className="space-y-5">
                {topic.diagramAscii && (
                  <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4">
                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-indigo-400">
                      <Layers className="h-4 w-4" />
                      <span>Structural Diagram / ASCII Visualization</span>
                    </div>
                    <pre className="overflow-x-auto font-mono text-xs text-indigo-300 leading-relaxed">
                      {topic.diagramAscii}
                    </pre>
                  </div>
                )}
                {topic.associatedVisualizer && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        Interactive {topic.associatedVisualizer.toUpperCase()} Visualizer
                      </span>
                    </div>
                    {getVisualizer(topic.associatedVisualizer)}
                  </div>
                )}
              </div>
            )}

            {/* === CODE === */}
            {activeSection === "code" && topic.codeSnippet && (
              <div className="space-y-3">
                <CodeBlock
                  snippets={[
                    {
                      language: topic.codeSnippet.language,
                      title: topic.codeSnippet.title,
                      code: topic.codeSnippet.code,
                      explanation: topic.codeSnippet.explanation,
                    },
                  ]}
                />
              </div>
            )}

            {/* === KEY POINTS === */}
            {activeSection === "keypoints" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Key Points & Exam Takeaways</span>
                  </div>
                  <ul className="space-y-2.5">
                    {topic.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* === SOLVED PROBLEM === */}
            {activeSection === "solved" && topic.solvedProblem && (
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Problem Statement</div>
                  <div className="font-mono text-sm text-white whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                    {topic.solvedProblem.problemStatement}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step-by-Step Solution:</div>
                  {topic.solvedProblem.stepByStepSolution.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-slate-300 font-mono">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Final Answer:</div>
                  <div className="font-mono text-sm text-emerald-300 font-bold">{topic.solvedProblem.finalAnswer}</div>
                </div>
              </div>
            )}

            {/* === IMPORTANT QUESTIONS === */}
            {activeSection === "questions" && (
              <div className="space-y-4">
                {topic.importantQuestions.map((q, i) => (
                  <div key={i} className="rounded-xl border border-slate-700 bg-slate-950/60 p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-black text-white bg-blue-600 h-5 w-5 rounded-full flex items-center justify-center shrink-0">Q{i + 1}</span>
                        <p className="text-sm font-semibold text-white">{q.question}</p>
                      </div>
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                        {q.marks} Marks
                      </span>
                    </div>
                    <div className="border-t border-slate-800 pt-3">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Answer Summary:</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{q.answerSummary}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === VIVA === */}
            {activeSection === "viva" && (
              <div className="space-y-3">
                {topic.vivaQuestions.map((v, i) => (
                  <div key={i} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0 mt-0.5">Q{i + 1}</span>
                      <p className="text-sm font-semibold text-white">{v.question}</p>
                    </div>
                    <div className="flex items-start gap-2 pl-9">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 mt-0.5">A</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{v.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === QUICK REVISION === */}
            {activeSection === "revision" && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400">⚡ Quick Revision Points (Last-Minute Study)</span>
                </div>
                <ul className="space-y-2.5">
                  {topic.quickRevisionPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface UnitPanelProps {
  unit: UnitData;
  isOpen: boolean;
  onToggle: () => void;
}

function UnitPanel({ unit, isOpen, onToggle }: UnitPanelProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (name: string) => {
    const next = new Set(expandedTopics);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setExpandedTopics(next);
  };

  const topicCount = Object.keys(unit.topics).length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      {/* Unit Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-900/80 transition group"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0">
            {unit.unitNumber}
          </div>
          <div>
            <h2 className="text-base font-bold text-white group-hover:text-blue-300 transition">
              {unit.title}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-400">{topicCount} Topics</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{unit.hours} Hours</span>
              {unit.description && (
                <>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-500 line-clamp-1 hidden sm:block max-w-xs">{unit.description}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-slate-500 shrink-0">
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </button>

      {/* Topics List */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-4">
          {Object.entries(unit.topics).map(([topicName, topic]) => (
            <TopicCard
              key={topicName}
              topicName={topicName}
              topic={topic}
              isExpanded={expandedTopics.has(topicName)}
              onToggle={() => toggleTopic(topicName)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SubjectNotesPanelProps {
  subjectCode: string;
}

export default function SubjectNotesPanel({ subjectCode }: SubjectNotesPanelProps) {
  const syllabusData = COMPLETE_SYLLABUS_DATA[subjectCode];
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set([1]));
  const [activeVisualizer, setActiveVisualizer] = useState(false);

  const toggleUnit = (unitNum: number) => {
    const next = new Set(openUnits);
    if (next.has(unitNum)) next.delete(unitNum);
    else next.add(unitNum);
    setOpenUnits(next);
  };

  if (!syllabusData) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center space-y-4">
        <Layers className="mx-auto h-10 w-10 text-slate-600" />
        <h4 className="text-sm font-bold text-slate-300">Detailed Interactive Notes</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Comprehensive interactive notes for this subject are currently being authored by our faculty team.
          Core syllabus structure is visible in the Overview tab above.
        </p>
        <a
          href="https://www.geeksforgeeks.org/computer-science-portal-for-geeks/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Study on GeeksForGeeks
        </a>
      </div>
    );
  }

  const totalTopics = syllabusData.units.reduce((acc, u) => acc + Object.keys(u.topics).length, 0);

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Units", value: syllabusData.units.length, color: "text-blue-400" },
          { label: "Topics Covered", value: totalTopics, color: "text-emerald-400" },
          { label: "Total Hours", value: `${syllabusData.units.reduce((a, u) => a + u.hours, 0)}h`, color: "text-amber-400" },
          { label: "Credits", value: syllabusData.credits, color: "text-purple-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <div className={`text-xl font-black ${color}`}>{value}</div>
            <div className="text-[11px] text-slate-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Subject Default Visualizer Quick Launch */}
      {syllabusData.defaultVisualizer && (
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-bold text-purple-300">Interactive Lab Available</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Launch the interactive simulator for this subject to explore concepts visually.
              </p>
            </div>
            <button
              onClick={() => setActiveVisualizer(!activeVisualizer)}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-xs font-bold text-white transition shrink-0 shadow-md"
            >
              {activeVisualizer ? "Close Lab" : "Open Interactive Lab"}
            </button>
          </div>
          {activeVisualizer && (
            <div className="mt-4">
              {getVisualizer(syllabusData.defaultVisualizer)}
            </div>
          )}
        </div>
      )}

      {/* Expand/Collapse All */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-400" />
          Unit-by-Unit Interactive Notes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setOpenUnits(new Set(syllabusData.units.map((u) => u.unitNumber)))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition border border-slate-700"
          >
            Expand All
          </button>
          <button
            onClick={() => setOpenUnits(new Set())}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 transition border border-slate-700"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Units */}
      <div className="space-y-4">
        {syllabusData.units.map((unit) => (
          <UnitPanel
            key={unit.unitNumber}
            unit={unit}
            isOpen={openUnits.has(unit.unitNumber)}
            onToggle={() => toggleUnit(unit.unitNumber)}
          />
        ))}
      </div>

      {/* Reference Books */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h4 className="text-sm font-bold text-white mb-3">📚 Textbooks & Reference Books</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2">Prescribed Textbooks</div>
            <ul className="space-y-1.5">
              {syllabusData.textbooks.map((book, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                  <span>{book}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Reference Books</div>
            <ul className="space-y-1.5">
              {syllabusData.referenceBooks.map((book, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                  <span>{book}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
