"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Info } from "lucide-react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

type GraphAlgo = "bfs" | "dfs" | "dijkstra" | "mst-kruskal";

const DEFAULT_NODES: GraphNode[] = [
  { id: "A", x: 200, y: 60, label: "A" },
  { id: "B", x: 100, y: 160, label: "B" },
  { id: "C", x: 300, y: 160, label: "C" },
  { id: "D", x: 60, y: 260, label: "D" },
  { id: "E", x: 200, y: 260, label: "E" },
  { id: "F", x: 340, y: 260, label: "F" },
];

const DEFAULT_EDGES: GraphEdge[] = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "D", weight: 5 },
  { from: "B", to: "E", weight: 6 },
  { from: "C", to: "E", weight: 1 },
  { from: "C", to: "F", weight: 7 },
  { from: "E", to: "D", weight: 3 },
  { from: "E", to: "F", weight: 4 },
];

const NODE_R = 24;

function buildAdjacency(nodes: GraphNode[], edges: GraphEdge[]) {
  const adj: Record<string, { to: string; weight: number }[]> = {};
  for (const n of nodes) adj[n.id] = [];
  for (const e of edges) {
    adj[e.from].push({ to: e.to, weight: e.weight ?? 1 });
    adj[e.to].push({ to: e.from, weight: e.weight ?? 1 });
  }
  return adj;
}

function bfsTraversal(start: string, adj: Record<string, { to: string }[]>): string[] {
  const visited = new Set<string>();
  const queue = [start];
  const order: string[] = [];
  visited.add(start);
  while (queue.length) {
    const cur = queue.shift()!;
    order.push(cur);
    for (const { to } of adj[cur]) {
      if (!visited.has(to)) {
        visited.add(to);
        queue.push(to);
      }
    }
  }
  return order;
}

function dfsTraversal(start: string, adj: Record<string, { to: string }[]>): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  function dfs(u: string) {
    visited.add(u);
    order.push(u);
    for (const { to } of adj[u]) {
      if (!visited.has(to)) dfs(to);
    }
  }
  dfs(start);
  return order;
}

function dijkstra(start: string, nodes: GraphNode[], edges: GraphEdge[]): Record<string, number> {
  const dist: Record<string, number> = {};
  const visited = new Set<string>();
  for (const n of nodes) dist[n.id] = Infinity;
  dist[start] = 0;
  const adj = buildAdjacency(nodes, edges);

  for (let i = 0; i < nodes.length; i++) {
    const u = Object.entries(dist)
      .filter(([k]) => !visited.has(k))
      .sort(([, a], [, b]) => a - b)[0]?.[0];
    if (!u) break;
    visited.add(u);
    for (const { to, weight } of adj[u]) {
      if (!visited.has(to) && dist[u] + weight < dist[to]) {
        dist[to] = dist[u] + weight;
      }
    }
  }
  return dist;
}

const NODE_COLORS = {
  default: "#1e293b",
  visited: "#3b82f6",
  current: "#f59e0b",
  start: "#10b981",
  finished: "#6d28d9",
};

export default function GraphVisualizer() {
  const [algo, setAlgo] = useState<GraphAlgo>("bfs");
  const [traversalOrder, setTraversalOrder] = useState<string[]>([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [dijkstraResult, setDijkstraResult] = useState<Record<string, number>>({});
  const [log, setLog] = useState("Select an algorithm and press Start to visualize.");
  const [running, setRunning] = useState(false);

  const adj = buildAdjacency(DEFAULT_NODES, DEFAULT_EDGES);

  const getNodeColor = (id: string) => {
    if (algo === "dijkstra") {
      if (id === "A") return NODE_COLORS.start;
      return NODE_COLORS.default;
    }
    const idx = traversalOrder.indexOf(id);
    if (idx === -1) return NODE_COLORS.default;
    if (idx === stepIdx) return NODE_COLORS.current;
    if (idx < stepIdx) return NODE_COLORS.visited;
    return NODE_COLORS.default;
  };

  const runAlgorithm = async () => {
    setRunning(true);
    setStepIdx(-1);
    setDijkstraResult({});

    if (algo === "bfs") {
      const order = bfsTraversal("A", adj);
      setTraversalOrder(order);
      setLog(`BFS from A: ${order.join(" → ")}`);
      for (let i = 0; i < order.length; i++) {
        setStepIdx(i);
        await new Promise((r) => setTimeout(r, 700));
      }
    } else if (algo === "dfs") {
      const order = dfsTraversal("A", adj);
      setTraversalOrder(order);
      setLog(`DFS from A: ${order.join(" → ")}`);
      for (let i = 0; i < order.length; i++) {
        setStepIdx(i);
        await new Promise((r) => setTimeout(r, 700));
      }
    } else if (algo === "dijkstra") {
      const result = dijkstra("A", DEFAULT_NODES, DEFAULT_EDGES);
      setDijkstraResult(result);
      setLog(`Dijkstra from A: ${Object.entries(result).map(([k, v]) => `${k}=${v}`).join(", ")}`);
      setTraversalOrder([]);
    } else if (algo === "mst-kruskal") {
      setLog("Kruskal MST: Sorts edges by weight, adds edge if no cycle (Union-Find).");
    }
    setRunning(false);
  };

  const reset = () => {
    setTraversalOrder([]);
    setStepIdx(-1);
    setDijkstraResult({});
    setLog("Select an algorithm and press Start.");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
            Graph Lab
          </span>
          <h3 className="text-xl font-black text-white mt-1">Graph Traversal & Shortest Path Visualizer</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {[
            { id: "bfs", label: "BFS (Queue)" },
            { id: "dfs", label: "DFS (Stack)" },
            { id: "dijkstra", label: "Dijkstra" },
            { id: "mst-kruskal", label: "Kruskal MST" },
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => { if (!running) { setAlgo(a.id as GraphAlgo); reset(); } }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                algo === a.id ? "bg-rose-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* SVG Graph Canvas */}
        <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 420 340" className="w-full" style={{ height: "340px" }}>
            {/* Edges */}
            {DEFAULT_EDGES.map((edge, i) => {
              const from = DEFAULT_NODES.find((n) => n.id === edge.from)!;
              const to = DEFAULT_NODES.find((n) => n.id === edge.to)!;
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              const isInMST = algo === "mst-kruskal" && [
                { from: "A", to: "C" },
                { from: "C", to: "E" },
                { from: "E", to: "D" },
                { from: "A", to: "B" },
                { from: "E", to: "F" },
              ].some((e) => (e.from === edge.from && e.to === edge.to) || (e.from === edge.to && e.to === edge.from));

              return (
                <g key={i}>
                  <line
                    x1={from.x} y1={from.y}
                    x2={to.x} y2={to.y}
                    stroke={isInMST ? "#10b981" : "#334155"}
                    strokeWidth={isInMST ? 3 : 1.5}
                  />
                  {edge.weight && (
                    <g>
                      <circle cx={mx} cy={my} r={10} fill="#0f172a" />
                      <text x={mx} y={my + 4} textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {DEFAULT_NODES.map((node) => {
              const color = getNodeColor(node.id);
              const dijDist = dijkstraResult[node.id];
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x} cy={node.y} r={NODE_R}
                    fill={color}
                    stroke={color === NODE_COLORS.default ? "#475569" : color}
                    strokeWidth={2.5}
                    style={{ filter: color !== NODE_COLORS.default ? `drop-shadow(0 0 8px ${color}88)` : "none" }}
                  />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    {node.label}
                  </text>
                  {algo === "dijkstra" && dijDist !== undefined && dijDist !== Infinity && (
                    <text x={node.x} y={node.y - 30} textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                      d={dijDist}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={runAlgorithm}
              disabled={running}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5" />
              {running ? "Running..." : `Run ${algo.toUpperCase()}`}
            </button>
            <button
              onClick={reset}
              disabled={running}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Traversal Order */}
          {traversalOrder.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Traversal Order:</div>
              <div className="flex flex-wrap gap-1.5">
                {traversalOrder.map((id, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black text-white transition-all`}
                    style={{
                      backgroundColor: i <= stepIdx
                        ? (i === stepIdx ? NODE_COLORS.current : NODE_COLORS.visited)
                        : "#334155",
                    }}
                  >
                    {id}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dijkstra Results Table */}
          {algo === "dijkstra" && Object.keys(dijkstraResult).length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shortest Distances from A:</div>
              <div className="space-y-1">
                {Object.entries(dijkstraResult).sort().map(([node, dist]) => (
                  <div key={node} className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">A → {node}</span>
                    <span className="font-mono font-black text-emerald-400">{dist === Infinity ? "∞" : dist}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="space-y-1.5 text-[11px]">
            {[
              { color: NODE_COLORS.start, label: "Start Node" },
              { color: NODE_COLORS.current, label: "Currently Visiting" },
              { color: NODE_COLORS.visited, label: "Visited" },
              { color: NODE_COLORS.default, label: "Unvisited" },
              { color: "#10b981", label: "MST Edge" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-slate-400">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complexity Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-900 text-slate-400">
              <th className="px-3 py-2 text-left">Algorithm</th>
              <th className="px-3 py-2">Data Structure</th>
              <th className="px-3 py-2">Time (Adj List)</th>
              <th className="px-3 py-2">Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              { algo: "BFS", ds: "Queue (FIFO)", time: "O(V + E)", use: "Shortest path (unweighted), Level-order" },
              { algo: "DFS", ds: "Stack / Recursion", time: "O(V + E)", use: "Cycle detection, Topological sort" },
              { algo: "Dijkstra", ds: "Min-Heap (Priority Queue)", time: "O((V + E) log V)", use: "Shortest path (weighted, non-negative)" },
              { algo: "Kruskal MST", ds: "Disjoint Set Union", time: "O(E log E)", use: "Minimum Spanning Tree (sparse graphs)" },
              { algo: "Prim's MST", ds: "Min-Heap", time: "O(E log V)", use: "Minimum Spanning Tree (dense graphs)" },
            ].map((row) => (
              <tr key={row.algo} className={`border-t border-slate-800 ${algo === row.algo.toLowerCase().split(" ")[0] ? "bg-rose-500/10" : ""}`}>
                <td className="px-3 py-2 font-bold text-white">{row.algo}</td>
                <td className="px-3 py-2 text-center font-mono text-slate-400">{row.ds}</td>
                <td className="px-3 py-2 text-center font-mono text-rose-400 font-bold">{row.time}</td>
                <td className="px-3 py-2 text-slate-400">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log */}
      <div className="flex items-center gap-2 bg-slate-950/60 rounded-xl border border-rose-500/20 px-4 py-2.5">
        <Info className="h-4 w-4 text-rose-400 shrink-0" />
        <span className="text-xs font-medium text-slate-300">{log}</span>
      </div>
    </div>
  );
}
