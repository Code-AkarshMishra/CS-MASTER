"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, ChevronRight, Info } from "lucide-react";

type SortAlgo = "bubble" | "selection" | "insertion" | "merge" | "quick";

const SORT_COLORS = {
  default: "#4a5568",
  comparing: "#f59e0b",
  swapping: "#ef4444",
  sorted: "#10b981",
  pivot: "#8b5cf6",
};

export default function SortingVisualizer() {
  const [algo, setAlgo] = useState<SortAlgo>("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(80);
  const [bars, setBars] = useState<{ value: number; color: string }[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [log, setLog] = useState<string>("Press Play to start sorting animation.");
  const stopRef = useRef(false);

  const generateArray = () => {
    stopRef.current = true;
    setIsSorting(false);
    setComparisons(0);
    setSwaps(0);
    const newBars = Array.from({ length: arraySize }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      color: SORT_COLORS.default,
    }));
    setBars(newBars);
    setLog("New random array generated. Press Play to sort.");
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const sleep = (ms: number) =>
    new Promise((res) => setTimeout(res, ms));

  const delay = () => 300 - speed * 2.5;

  // Bubble Sort
  const bubbleSort = async (arr: { value: number; color: string }[]) => {
    let cmps = 0, sws = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        arr[j].color = SORT_COLORS.comparing;
        arr[j + 1].color = SORT_COLORS.comparing;
        setBars([...arr]);
        cmps++;
        setComparisons(cmps);
        await sleep(delay());

        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          sws++;
          setSwaps(sws);
          arr[j].color = SORT_COLORS.swapping;
          arr[j + 1].color = SORT_COLORS.swapping;
          setBars([...arr]);
          await sleep(delay() * 0.6);
        }
        arr[j].color = SORT_COLORS.default;
        arr[j + 1].color = SORT_COLORS.default;
      }
      arr[n - 1 - i].color = SORT_COLORS.sorted;
      setBars([...arr]);
    }
    arr[0].color = SORT_COLORS.sorted;
    setBars([...arr]);
  };

  // Selection Sort
  const selectionSort = async (arr: { value: number; color: string }[]) => {
    let cmps = 0, sws = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arr[i].color = SORT_COLORS.pivot;
      setBars([...arr]);
      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return;
        arr[j].color = SORT_COLORS.comparing;
        setBars([...arr]);
        cmps++;
        setComparisons(cmps);
        await sleep(delay());
        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].color = SORT_COLORS.default;
          minIdx = j;
          arr[minIdx].color = SORT_COLORS.pivot;
        } else {
          arr[j].color = SORT_COLORS.default;
        }
        setBars([...arr]);
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        sws++;
        setSwaps(sws);
        arr[minIdx].color = SORT_COLORS.default;
      }
      arr[i].color = SORT_COLORS.sorted;
      setBars([...arr]);
    }
    arr[arr.length - 1].color = SORT_COLORS.sorted;
    setBars([...arr]);
  };

  // Insertion Sort
  const insertionSort = async (arr: { value: number; color: string }[]) => {
    let cmps = 0, sws = 0;
    const n = arr.length;
    arr[0].color = SORT_COLORS.sorted;
    for (let i = 1; i < n; i++) {
      if (stopRef.current) return;
      const key = arr[i].value;
      let j = i - 1;
      arr[i].color = SORT_COLORS.comparing;
      setBars([...arr]);
      await sleep(delay());
      while (j >= 0 && arr[j].value > key) {
        if (stopRef.current) return;
        cmps++;
        setComparisons(cmps);
        arr[j + 1].value = arr[j].value;
        arr[j + 1].color = SORT_COLORS.swapping;
        arr[j].color = SORT_COLORS.swapping;
        setBars([...arr]);
        await sleep(delay() * 0.7);
        arr[j + 1].color = SORT_COLORS.sorted;
        arr[j].color = SORT_COLORS.default;
        sws++;
        setSwaps(sws);
        j--;
      }
      arr[j + 1].value = key;
      arr[j + 1].color = SORT_COLORS.sorted;
      setBars([...arr]);
    }
  };

  const startSort = async () => {
    if (isSorting) return;
    stopRef.current = false;
    setIsSorting(true);
    setComparisons(0);
    setSwaps(0);
    setLog(`Running ${algo.charAt(0).toUpperCase() + algo.slice(1)} Sort...`);

    const arr = bars.map((b) => ({ ...b }));

    try {
      if (algo === "bubble") await bubbleSort(arr);
      else if (algo === "selection") await selectionSort(arr);
      else if (algo === "insertion") await insertionSort(arr);
    } catch (_) {}

    if (!stopRef.current) {
      const algoNames: Record<SortAlgo, string> = {
        bubble: "Bubble",
        selection: "Selection",
        insertion: "Insertion",
        merge: "Merge",
        quick: "Quick",
      };
      setLog(
        `✅ ${algoNames[algo]} Sort completed! ${comparisons + 1} comparisons, ${swaps + 1} swaps.`
      );
    }
    setIsSorting(false);
  };

  const complexityTable: Record<SortAlgo, { best: string; avg: string; worst: string; space: string; stable: string }> = {
    bubble:    { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✅ Stable" },
    selection: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "❌ Unstable" },
    insertion: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "✅ Stable" },
    merge:     { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "✅ Stable" },
    quick:     { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "❌ Unstable" },
  };

  const cx = complexityTable[algo];
  const maxVal = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
            Animated
          </span>
          <h3 className="text-xl font-black text-white mt-1">Sorting Algorithm Visualizer</h3>
          <p className="text-xs text-slate-400">Watch each comparison and swap happen in real-time.</p>
        </div>

        {/* Algorithm Selector */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {(["bubble", "selection", "insertion"] as SortAlgo[]).map((a) => (
            <button
              key={a}
              onClick={() => { if (!isSorting) setAlgo(a); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                algo === a ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
          {(["merge", "quick"] as SortAlgo[]).map((a) => (
            <button
              key={a}
              onClick={() => {
                if (!isSorting) {
                  setAlgo(a);
                  setLog(`${a.charAt(0).toUpperCase() + a.slice(1)} Sort simulation coming in full version. Showing array structure.`);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                algo === a ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Array Size:</label>
          <input
            type="range" min={8} max={50} value={arraySize}
            onChange={(e) => { if (!isSorting) setArraySize(Number(e.target.value)); }}
            className="accent-amber-500 w-24"
          />
          <span className="text-xs font-mono text-amber-400 font-bold w-6">{arraySize}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Speed:</label>
          <input
            type="range" min={1} max={100} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="accent-amber-500 w-24"
          />
          <span className="text-xs font-mono text-amber-400 font-bold">{speed}%</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => { stopRef.current = true; setIsSorting(false); generateArray(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition border border-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            onClick={startSort}
            disabled={isSorting || algo === "merge" || algo === "quick"}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="h-3.5 w-3.5" />
            {isSorting ? "Sorting..." : "▶ Start Sort"}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[11px] font-medium">
        {[
          { color: "#4a5568", label: "Unsorted" },
          { color: "#f59e0b", label: "Comparing" },
          { color: "#ef4444", label: "Swapping" },
          { color: "#10b981", label: "Sorted" },
          { color: "#8b5cf6", label: "Pivot / Min" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm shadow" style={{ backgroundColor: item.color }} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bars Canvas */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-end justify-center gap-0.5 h-56 overflow-hidden">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-100"
            style={{
              height: `${(bar.value / maxVal) * 100}%`,
              backgroundColor: bar.color,
              minWidth: "2px",
              maxWidth: "40px",
            }}
          />
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
          <div className="text-slate-400">Comparisons</div>
          <div className="text-amber-400 font-mono font-black text-lg">{comparisons}</div>
        </div>
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
          <div className="text-slate-400">Swaps</div>
          <div className="text-rose-400 font-mono font-black text-lg">{swaps}</div>
        </div>
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
          <div className="text-slate-400">Best Case</div>
          <div className="text-emerald-400 font-mono font-bold">{cx.best}</div>
        </div>
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3">
          <div className="text-slate-400">Worst Case</div>
          <div className="text-rose-400 font-mono font-bold">{cx.worst}</div>
        </div>
      </div>

      {/* Complexity Reference Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs rounded-xl overflow-hidden border border-slate-800">
          <thead>
            <tr className="bg-slate-900 text-slate-400">
              <th className="px-3 py-2 text-left">Algorithm</th>
              <th className="px-3 py-2">Best</th>
              <th className="px-3 py-2">Average</th>
              <th className="px-3 py-2">Worst</th>
              <th className="px-3 py-2">Space</th>
              <th className="px-3 py-2">Stability</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(complexityTable) as [SortAlgo, typeof cx][]).map(([name, row]) => (
              <tr
                key={name}
                className={`border-t border-slate-800 transition ${algo === name ? "bg-amber-500/10" : "bg-slate-950/40 hover:bg-slate-900/60"}`}
              >
                <td className={`px-3 py-2 font-bold capitalize ${algo === name ? "text-amber-400" : "text-slate-300"}`}>
                  {algo === name && <ChevronRight className="h-3 w-3 inline mr-1" />}
                  {name}
                </td>
                <td className="px-3 py-2 text-center font-mono text-emerald-400">{row.best}</td>
                <td className="px-3 py-2 text-center font-mono text-amber-400">{row.avg}</td>
                <td className="px-3 py-2 text-center font-mono text-rose-400">{row.worst}</td>
                <td className="px-3 py-2 text-center font-mono text-blue-400">{row.space}</td>
                <td className="px-3 py-2 text-center">{row.stable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Log */}
      <div className="flex items-center gap-2 bg-slate-950/60 rounded-xl border border-amber-500/20 px-4 py-2.5">
        <Info className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="text-xs font-medium text-slate-300">{log}</span>
      </div>
    </div>
  );
}
