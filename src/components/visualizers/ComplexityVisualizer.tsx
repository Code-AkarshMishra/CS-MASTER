"use client";

import React, { useState } from "react";
import { TrendingUp, Minus, Plus } from "lucide-react";

interface ComplexityRow {
  name: string;
  label: string;
  color: string;
  compute: (n: number) => number;
  notation: string;
  example: string;
}

const COMPLEXITIES: ComplexityRow[] = [
  { name: "O(1)", label: "Constant", color: "#10b981", compute: () => 1, notation: "O(1)", example: "Array index access, Hash lookup" },
  { name: "O(log n)", label: "Logarithmic", color: "#3b82f6", compute: (n) => Math.log2(n), notation: "O(log n)", example: "Binary Search, BST lookup" },
  { name: "O(n)", label: "Linear", color: "#f59e0b", compute: (n) => n, notation: "O(n)", example: "Linear search, Array traversal" },
  { name: "O(n log n)", label: "Linearithmic", color: "#8b5cf6", compute: (n) => n * Math.log2(n), notation: "O(n log n)", example: "Merge Sort, Heap Sort" },
  { name: "O(n²)", label: "Quadratic", color: "#f97316", compute: (n) => n * n, notation: "O(n²)", example: "Bubble Sort, Nested loops" },
  { name: "O(2ⁿ)", label: "Exponential", color: "#ef4444", compute: (n) => Math.pow(2, Math.min(n, 20)), notation: "O(2ⁿ)", example: "Recursive Fibonacci, Subset generation" },
];

export default function ComplexityVisualizer() {
  const [n, setN] = useState(10);
  const [activeComplexities, setActiveComplexities] = useState<Set<string>>(
    new Set(["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"])
  );

  const toggleComplexity = (name: string) => {
    const next = new Set(activeComplexities);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setActiveComplexities(next);
  };

  const CHART_HEIGHT = 220;
  const CHART_WIDTH = 500;
  const POINTS = 30;
  const maxN = n * 2;

  // Generate points for each complexity
  const generatePath = (compute: (n: number) => number) => {
    const values = Array.from({ length: POINTS }, (_, i) => compute((i + 1) * (maxN / POINTS)));
    const maxVal = Math.max(...values.filter(isFinite), 1);
    const points = values
      .map((v, i) => {
        const x = ((i + 1) / POINTS) * CHART_WIDTH;
        const y = CHART_HEIGHT - (Math.min(v, maxVal) / maxVal) * (CHART_HEIGHT - 20);
        return `${x},${y}`;
      })
      .join(" ");
    return { points, maxVal };
  };

  const getOpsAtN = (compute: (n: number) => number): string => {
    const v = compute(n);
    if (!isFinite(v)) return "∞";
    if (v > 1e12) return ">1 Trillion";
    if (v > 1e9) return `${(v / 1e9).toFixed(1)}B`;
    if (v > 1e6) return `${(v / 1e6).toFixed(1)}M`;
    if (v > 1000) return `${(v / 1000).toFixed(1)}K`;
    return v.toFixed(1);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
            Interactive
          </span>
          <h3 className="text-xl font-black text-white mt-1">Time Complexity Comparator</h3>
          <p className="text-xs text-slate-400">See how algorithms scale as input size grows.</p>
        </div>

        {/* N Slider */}
        <div className="flex items-center gap-3 bg-slate-950/70 px-4 py-3 rounded-xl border border-slate-800">
          <label className="text-xs font-bold text-slate-300">Input Size n =</label>
          <button onClick={() => setN(Math.max(1, n - 1))} className="h-6 w-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center">
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="range" min={1} max={50} value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="accent-indigo-500 w-32"
          />
          <button onClick={() => setN(Math.min(50, n + 1))} className="h-6 w-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center">
            <Plus className="h-3 w-3" />
          </button>
          <span className="text-xl font-mono font-black text-indigo-400 min-w-[3rem]">{n}</span>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-2">
        {COMPLEXITIES.map((c) => (
          <button
            key={c.name}
            onClick={() => toggleComplexity(c.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              activeComplexities.has(c.name)
                ? "text-white shadow-md border-transparent"
                : "bg-transparent text-slate-500 border-slate-700 hover:text-slate-300"
            }`}
            style={activeComplexities.has(c.name) ? { backgroundColor: c.color + "cc", borderColor: c.color } : {}}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${CHART_WIDTH + 20} ${CHART_HEIGHT + 20}`} className="w-full min-w-[340px]" style={{ height: "240px" }}>
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={0} y1={CHART_HEIGHT * (1 - t) + 10}
              x2={CHART_WIDTH} y2={CHART_HEIGHT * (1 - t) + 10}
              stroke="#1e293b" strokeWidth={1}
            />
          ))}
          {/* Complexity Polylines */}
          {COMPLEXITIES.filter((c) => activeComplexities.has(c.name)).map((c) => {
            const { points } = generatePath(c.compute);
            return (
              <polyline
                key={c.name}
                points={points}
                fill="none"
                stroke={c.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 3px ${c.color}88)` }}
              />
            );
          })}
          {/* Current N Marker Line */}
          <line
            x1={(n / (maxN)) * CHART_WIDTH} y1={10}
            x2={(n / (maxN)) * CHART_WIDTH} y2={CHART_HEIGHT + 10}
            stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 3"
          />
          <text x={(n / (maxN)) * CHART_WIDTH + 4} y={20} fill="#94a3b8" fontSize={10} fontFamily="monospace">n={n}</text>
        </svg>
      </div>

      {/* Operations at n Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-900 text-slate-400">
              <th className="px-3 py-2 text-left">Complexity</th>
              <th className="px-3 py-2 text-left">Class</th>
              <th className="px-3 py-2 text-center">Ops at n={n}</th>
              <th className="px-3 py-2 text-left hidden sm:table-cell">Example Algorithms</th>
            </tr>
          </thead>
          <tbody>
            {COMPLEXITIES.map((c) => {
              const isActive = activeComplexities.has(c.name);
              const ops = getOpsAtN(c.compute);
              return (
                <tr key={c.name} className={`border-t border-slate-800 ${!isActive ? "opacity-40" : ""}`}>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: c.color }} />
                      <span className="font-mono font-bold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-slate-400">{c.label}</td>
                  <td className="px-3 py-2 text-center font-mono font-bold" style={{ color: c.color }}>
                    {ops}
                  </td>
                  <td className="px-3 py-2 text-slate-500 hidden sm:table-cell">{c.example}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-300">
        <TrendingUp className="h-3.5 w-3.5 inline mr-1.5 text-indigo-400" />
        <strong>Key Insight:</strong> All algorithms are fast for small n. The difference explodes at large n — choose algorithms by their worst-case growth rate, not by their behavior at n=5.
      </div>
    </div>
  );
}
