"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ChevronRight, Info } from "lucide-react";

type OSTab = "scheduling" | "paging" | "deadlock";

// ---- CPU Scheduling ----
interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

const DEFAULT_PROCESSES: Process[] = [
  { id: "P1", arrival: 0, burst: 6, priority: 3 },
  { id: "P2", arrival: 1, burst: 4, priority: 1 },
  { id: "P3", arrival: 2, burst: 8, priority: 2 },
  { id: "P4", arrival: 3, burst: 2, priority: 4 },
];

type SchedAlgo = "FCFS" | "SJF" | "RR" | "Priority";

interface GanttSlot { pid: string; start: number; end: number; }

function computeFCFS(procs: Process[]): GanttSlot[] {
  const sorted = [...procs].sort((a, b) => a.arrival - b.arrival);
  const gantt: GanttSlot[] = [];
  let time = 0;
  for (const p of sorted) {
    if (time < p.arrival) time = p.arrival;
    gantt.push({ pid: p.id, start: time, end: time + p.burst });
    time += p.burst;
  }
  return gantt;
}

function computeSJF(procs: Process[]): GanttSlot[] {
  const remaining = procs.map((p) => ({ ...p, rem: p.burst }));
  const gantt: GanttSlot[] = [];
  let time = 0;
  const done = new Set<string>();
  while (done.size < procs.length) {
    const ready = remaining.filter((p) => p.arrival <= time && !done.has(p.id));
    if (ready.length === 0) { time++; continue; }
    ready.sort((a, b) => a.burst - b.burst);
    const p = ready[0];
    gantt.push({ pid: p.id, start: time, end: time + p.burst });
    time += p.burst;
    done.add(p.id);
  }
  return gantt;
}

function computeRR(procs: Process[], quantum = 2): GanttSlot[] {
  const remaining = procs.map((p) => ({ ...p, rem: p.burst }));
  const gantt: GanttSlot[] = [];
  let time = 0;
  let queue: typeof remaining = [];
  const arrived = new Set<string>();
  while (true) {
    remaining.filter((p) => p.arrival <= time && !arrived.has(p.id) && p.rem > 0).forEach((p) => {
      arrived.add(p.id);
      queue.push(p);
    });
    if (queue.length === 0) {
      if (remaining.every((p) => p.rem <= 0)) break;
      time++;
      continue;
    }
    const p = queue.shift()!;
    const exec = Math.min(quantum, p.rem);
    gantt.push({ pid: p.id, start: time, end: time + exec });
    time += exec;
    p.rem -= exec;
    remaining.filter((r) => r.arrival <= time && !arrived.has(r.id) && r.rem > 0).forEach((r) => {
      arrived.add(r.id);
      queue.push(r);
    });
    if (p.rem > 0) queue.push(p);
  }
  return gantt;
}

const PROCESS_COLORS: Record<string, string> = {
  P1: "#3b82f6", P2: "#10b981", P3: "#f59e0b", P4: "#8b5cf6",
  P5: "#ef4444", P6: "#06b6d4", IDLE: "#374151",
};

// ---- Page Replacement ----
const PAGE_ALGOS = ["FIFO", "LRU", "Optimal"] as const;
type PageAlgo = typeof PAGE_ALGOS[number];
const DEFAULT_REFERENCE_STRING = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3];
const DEFAULT_FRAMES = 3;

function simulatePaging(refStr: number[], numFrames: number, algo: PageAlgo) {
  const frames: (number | null)[] = Array(numFrames).fill(null);
  const history: { frames: (number | null)[]; fault: boolean; replaced: number | null }[] = [];

  for (let i = 0; i < refStr.length; i++) {
    const page = refStr[i];
    if (frames.includes(page)) {
      history.push({ frames: [...frames], fault: false, replaced: null });
      continue;
    }
    let replaceIdx = frames.indexOf(null);
    if (replaceIdx === -1) {
      if (algo === "FIFO") {
        replaceIdx = i % numFrames; // Simplified
        // Proper FIFO: track insertion order
        replaceIdx = 0;
        const inserted: number[] = [];
        history.forEach((h) => {
          if (h.fault && h.replaced !== null) inserted.push(h.replaced);
        });
        const framesCopy = [...frames];
        const oldestPage = framesCopy.find((f) => !inserted.slice(-(numFrames)).includes(f!)) ?? frames[0];
        replaceIdx = frames.indexOf(oldestPage);
        if (replaceIdx === -1) replaceIdx = 0;
      } else if (algo === "LRU") {
        let lruIdx = 0, oldest = Infinity;
        for (let fi = 0; fi < numFrames; fi++) {
          const lastUsed = refStr.slice(0, i).lastIndexOf(frames[fi]!);
          if (lastUsed < oldest) { oldest = lastUsed; lruIdx = fi; }
        }
        replaceIdx = lruIdx;
      } else { // Optimal
        let farthest = -1, replaceFrame = 0;
        for (let fi = 0; fi < numFrames; fi++) {
          const nextUse = refStr.slice(i + 1).indexOf(frames[fi]!);
          if (nextUse === -1) { replaceFrame = fi; break; }
          if (nextUse > farthest) { farthest = nextUse; replaceFrame = fi; }
        }
        replaceIdx = replaceFrame;
      }
    }
    const replaced = frames[replaceIdx];
    frames[replaceIdx] = page;
    history.push({ frames: [...frames], fault: true, replaced });
  }
  return history;
}

export default function OsVisualizer() {
  const [tab, setTab] = useState<OSTab>("scheduling");

  // Scheduling state
  const [processes, setProcesses] = useState<Process[]>(DEFAULT_PROCESSES);
  const [schedAlgo, setSchedAlgo] = useState<SchedAlgo>("FCFS");
  const [quantum, setQuantum] = useState(2);
  const [gantt, setGantt] = useState<GanttSlot[]>([]);
  const [simulated, setSimulated] = useState(false);

  // Paging state
  const [refString, setRefString] = useState(DEFAULT_REFERENCE_STRING.join(","));
  const [numFrames, setNumFrames] = useState(DEFAULT_FRAMES);
  const [pageAlgo, setPageAlgo] = useState<PageAlgo>("FIFO");
  const [pageHistory, setPageHistory] = useState<ReturnType<typeof simulatePaging>>([]);
  const [pageSimulated, setPageSimulated] = useState(false);

  const runScheduling = () => {
    let result: GanttSlot[] = [];
    if (schedAlgo === "FCFS") result = computeFCFS(processes);
    else if (schedAlgo === "SJF") result = computeSJF(processes);
    else if (schedAlgo === "RR") result = computeRR(processes, quantum);
    else if (schedAlgo === "Priority") result = computeSJF(processes); // simplified
    setGantt(result);
    setSimulated(true);
  };

  const runPaging = () => {
    const pages = refString.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
    const history = simulatePaging(pages, numFrames, pageAlgo);
    setPageHistory(history);
    setPageSimulated(true);
  };

  const totalTime = gantt.length > 0 ? gantt[gantt.length - 1].end : 0;
  const pageFaults = pageHistory.filter((h) => h.fault).length;
  const pageHits = pageHistory.length - pageFaults;

  // Compute TAT and WT
  const statsMap: Record<string, { at: number; bt: number; ct: number; tat: number; wt: number }> = {};
  for (const p of processes) {
    const slots = gantt.filter((g) => g.pid === p.id);
    if (slots.length === 0) continue;
    const ct = Math.max(...slots.map((s) => s.end));
    const tat = ct - p.arrival;
    statsMap[p.id] = { at: p.arrival, bt: p.burst, ct, tat, wt: tat - p.burst };
  }
  const avgWT = Object.values(statsMap).length > 0
    ? (Object.values(statsMap).reduce((acc, s) => acc + s.wt, 0) / Object.values(statsMap).length).toFixed(2)
    : "—";
  const avgTAT = Object.values(statsMap).length > 0
    ? (Object.values(statsMap).reduce((acc, s) => acc + s.tat, 0) / Object.values(statsMap).length).toFixed(2)
    : "—";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header + Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            OS Simulator
          </span>
          <h3 className="text-xl font-black text-white mt-1">Operating System Interactive Lab</h3>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {[
            { id: "scheduling" as OSTab, label: "CPU Scheduling" },
            { id: "paging" as OSTab, label: "Page Replacement" },
            { id: "deadlock" as OSTab, label: "Deadlock" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                tab === t.id ? "bg-cyan-700 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CPU SCHEDULING ===== */}
      {tab === "scheduling" && (
        <div className="space-y-5">
          {/* Algorithm selector */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Algorithm:</span>
            {(["FCFS", "SJF", "RR", "Priority"] as SchedAlgo[]).map((a) => (
              <button
                key={a}
                onClick={() => { setSchedAlgo(a); setSimulated(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  schedAlgo === a
                    ? "bg-cyan-600 text-white border-cyan-500 shadow-md"
                    : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"
                }`}
              >
                {a}
              </button>
            ))}
            {schedAlgo === "RR" && (
              <div className="flex items-center gap-2 ml-2">
                <label className="text-xs text-slate-400">Quantum:</label>
                <input
                  type="number" min={1} max={5} value={quantum}
                  onChange={(e) => setQuantum(Number(e.target.value))}
                  className="w-14 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Process Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-slate-400">
                  <th className="px-3 py-2">Process</th>
                  <th className="px-3 py-2">Arrival Time</th>
                  <th className="px-3 py-2">Burst Time</th>
                  <th className="px-3 py-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p) => (
                  <tr key={p.id} className="border-t border-slate-800">
                    <td className="px-3 py-2 text-center font-bold" style={{ color: PROCESS_COLORS[p.id] }}>{p.id}</td>
                    <td className="px-3 py-2 text-center font-mono">{p.arrival}</td>
                    <td className="px-3 py-2 text-center font-mono">{p.burst}</td>
                    <td className="px-3 py-2 text-center font-mono text-slate-400">{p.priority ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={runScheduling}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition shadow-md"
          >
            <Play className="h-3.5 w-3.5" /> Run {schedAlgo} Scheduler
          </button>

          {/* Gantt Chart */}
          {simulated && gantt.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Gantt Chart</h4>
              <div className="overflow-x-auto">
                <div className="flex items-end gap-0 min-w-[400px] h-14 rounded-xl overflow-hidden border border-slate-700">
                  {gantt.map((slot, i) => {
                    const width = ((slot.end - slot.start) / totalTime) * 100;
                    const color = PROCESS_COLORS[slot.pid] || "#64748b";
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center text-white font-bold text-xs h-full relative"
                        style={{ width: `${width}%`, backgroundColor: color, minWidth: "28px" }}
                        title={`${slot.pid}: ${slot.start}ms - ${slot.end}ms`}
                      >
                        <span className="font-black text-[11px]">{slot.pid}</span>
                        <span className="text-[9px] opacity-80">{slot.end - slot.start}ms</span>
                      </div>
                    );
                  })}
                </div>
                {/* Timeline */}
                <div className="flex relative mt-1 min-w-[400px]">
                  {gantt.map((slot, i) => {
                    const left = (slot.start / totalTime) * 100;
                    return (
                      <div
                        key={i}
                        className="absolute text-[10px] font-mono text-slate-400"
                        style={{ left: `${left}%` }}
                      >
                        {slot.start}
                      </div>
                    );
                  })}
                  <div className="absolute text-[10px] font-mono text-slate-400 right-0">{totalTime}</div>
                </div>
              </div>

              {/* Stats Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400">
                      <th className="px-3 py-2">Process</th>
                      <th className="px-3 py-2">AT</th>
                      <th className="px-3 py-2">BT</th>
                      <th className="px-3 py-2">CT</th>
                      <th className="px-3 py-2 text-amber-400">TAT</th>
                      <th className="px-3 py-2 text-rose-400">WT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(statsMap).map(([pid, s]) => (
                      <tr key={pid} className="border-t border-slate-800">
                        <td className="px-3 py-2 text-center font-bold" style={{ color: PROCESS_COLORS[pid] }}>{pid}</td>
                        <td className="px-3 py-2 text-center font-mono">{s.at}</td>
                        <td className="px-3 py-2 text-center font-mono">{s.bt}</td>
                        <td className="px-3 py-2 text-center font-mono">{s.ct}</td>
                        <td className="px-3 py-2 text-center font-mono text-amber-400 font-bold">{s.tat}</td>
                        <td className="px-3 py-2 text-center font-mono text-rose-400 font-bold">{s.wt}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-700 bg-slate-900/60 font-bold">
                      <td colSpan={4} className="px-3 py-2 text-right text-slate-400">Average:</td>
                      <td className="px-3 py-2 text-center text-amber-400 font-mono">{avgTAT}</td>
                      <td className="px-3 py-2 text-center text-rose-400 font-mono">{avgWT}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== PAGE REPLACEMENT ===== */}
      {tab === "paging" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Reference String (comma-separated):</label>
              <input
                value={refString}
                onChange={(e) => { setRefString(e.target.value); setPageSimulated(false); }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Number of Frames:</label>
              <input
                type="number" min={1} max={6} value={numFrames}
                onChange={(e) => { setNumFrames(Number(e.target.value)); setPageSimulated(false); }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Algorithm:</label>
              <select
                value={pageAlgo}
                onChange={(e) => { setPageAlgo(e.target.value as PageAlgo); setPageSimulated(false); }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {PAGE_ALGOS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={runPaging}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition shadow-md"
          >
            <Play className="h-3.5 w-3.5" /> Simulate {pageAlgo} Page Replacement
          </button>

          {pageSimulated && pageHistory.length > 0 && (
            <div className="space-y-3">
              {/* Summary Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  Page Faults: {pageFaults}
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  Page Hits: {pageHits}
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold">
                  Hit Ratio: {((pageHits / pageHistory.length) * 100).toFixed(1)}%
                </div>
              </div>

              {/* Step-by-step Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400">
                      <th className="px-3 py-2">Step</th>
                      <th className="px-3 py-2">Page Ref</th>
                      {Array.from({ length: numFrames }, (_, i) => (
                        <th key={i} className="px-3 py-2">Frame {i}</th>
                      ))}
                      <th className="px-3 py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refString.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n)).map((page, i) => {
                      const h = pageHistory[i];
                      if (!h) return null;
                      return (
                        <tr key={i} className={`border-t border-slate-800 ${h.fault ? "bg-rose-500/5" : "bg-emerald-500/5"}`}>
                          <td className="px-3 py-1.5 text-center text-slate-500 font-mono">{i + 1}</td>
                          <td className="px-3 py-1.5 text-center font-mono font-black text-white">{page}</td>
                          {h.frames.map((f, fi) => (
                            <td key={fi} className="px-3 py-1.5 text-center font-mono">
                              <span className={`px-2 py-0.5 rounded ${f === page ? "bg-cyan-500/20 text-cyan-300 font-bold" : "text-slate-300"}`}>
                                {f !== null ? f : "—"}
                              </span>
                            </td>
                          ))}
                          <td className="px-3 py-1.5 text-center font-bold">
                            {h.fault ? (
                              <span className="text-rose-400 text-[11px]">FAULT</span>
                            ) : (
                              <span className="text-emerald-400 text-[11px]">HIT</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== DEADLOCK ===== */}
      {tab === "deadlock" && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white">Deadlock: Resource Allocation Graph (RAG)</h4>
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center space-y-6 min-h-[280px]">
            {/* Visual RAG showing deadlock cycle */}
            <div className="text-xs text-slate-400 text-center">Circular Wait — All 4 Coffman conditions satisfied → Deadlock!</div>
            <svg viewBox="0 0 400 240" className="w-full max-w-sm">
              {/* Resource Rectangles */}
              <rect x="155" y="10" width="90" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
              <text x="200" y="35" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Resource R1</text>
              <rect x="155" y="190" width="90" height="40" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
              <text x="200" y="215" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Resource R2</text>

              {/* Process Circles */}
              <circle cx="60" cy="120" r="32" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
              <text x="60" y="125" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">P1</text>
              <circle cx="340" cy="120" r="32" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
              <text x="340" y="125" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">P2</text>

              {/* P1 holds R2 (allocation arrow) */}
              <defs>
                <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 Z" fill="#3b82f6"/>
                </marker>
                <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 Z" fill="#10b981"/>
                </marker>
                <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 Z" fill="#f59e0b"/>
                </marker>
                <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 Z" fill="#8b5cf6"/>
                </marker>
              </defs>
              {/* P1 allocated R1 */}
              <line x1="155" y1="30" x2="92" y2="100" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen)" strokeDasharray="5,3"/>
              <text x="100" y="65" fill="#34d399" fontSize="9">Allocated</text>

              {/* P1 requests R2 */}
              <line x1="60" y1="152" x2="155" y2="200" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen)"/>
              <text x="80" y="192" fill="#34d399" fontSize="9">Requests</text>

              {/* P2 allocated R2 */}
              <line x1="245" y1="210" x2="308" y2="150" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)" strokeDasharray="5,3"/>
              <text x="278" y="200" fill="#fbbf24" fontSize="9">Allocated</text>

              {/* P2 requests R1 */}
              <line x1="340" y1="88" x2="245" y2="30" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)"/>
              <text x="278" y="50" fill="#fbbf24" fontSize="9">Requests</text>

              {/* Deadlock label */}
              <text x="200" y="130" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">⚠ DEADLOCK</text>
              <text x="200" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9">Circular Wait Detected</text>
            </svg>

            <div className="w-full grid grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-300">
                <div className="font-bold mb-1">Coffman Conditions (All Must Hold):</div>
                <ul className="space-y-0.5 text-rose-200/80">
                  <li>1. Mutual Exclusion</li>
                  <li>2. Hold and Wait</li>
                  <li>3. No Preemption</li>
                  <li>4. Circular Wait ← Detected!</li>
                </ul>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-300">
                <div className="font-bold mb-1">Prevention Strategies:</div>
                <ul className="space-y-0.5 text-emerald-200/80">
                  <li>✓ Resource Ordering (No CW)</li>
                  <li>✓ Request All at Start (No HW)</li>
                  <li>✓ Allow Preemption</li>
                  <li>✓ Banker's Algorithm (Avoidance)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
