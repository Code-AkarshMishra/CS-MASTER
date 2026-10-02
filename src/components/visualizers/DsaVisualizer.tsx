"use client";

import React, { useState } from "react";
import {
  Layers,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function DsaVisualizer() {
  const [activeTab, setActiveTab] = useState<"array" | "stack" | "queue" | "linkedlist" | "bst">("stack");
  const [inputValue, setInputValue] = useState<string>("42");

  // Array State
  const [arrayData, setArrayData] = useState<number[]>([15, 23, 8, 42, 16, 4]);
  const [arraySearchIdx, setArraySearchIdx] = useState<number | null>(null);
  const [arrayActionMessage, setActionMessage] = useState<string>("Ready. Try inserting, deleting, or searching.");

  // Stack State
  const [stackData, setStackData] = useState<number[]>([10, 20, 30, 40]);
  const [stackLimit] = useState<number>(8);
  const [stackMessage, setStackMessage] = useState<string>("Stack initialized with 4 elements (LIFO).");

  // Queue State
  const [queueData, setQueueData] = useState<number[]>([100, 200, 300]);
  const [queueLimit] = useState<number>(7);
  const [queueMessage, setQueueMessage] = useState<string>("Queue initialized (FIFO).");

  // Linked List State
  const [linkedListData, setLinkedListData] = useState<number[]>([5, 12, 19, 31]);
  const [llMessage, setLlMessage] = useState<string>("Singly Linked List with pointer chains.");

  // BST State
  interface BSTNode {
    val: number;
    left?: BSTNode | null;
    right?: BSTNode | null;
  }
  const [bstRoot, setBstRoot] = useState<BSTNode>({
    val: 50,
    left: { val: 30, left: { val: 20 }, right: { val: 40 } },
    right: { val: 70, left: { val: 60 }, right: { val: 80 } },
  });
  const [bstMessage, setBstMessage] = useState<string>("Binary Search Tree: Left < Root < Right.");

  // Array Operations
  const handleArrayInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    if (arrayData.length >= 10) {
      setActionMessage("Array is full (Max 10 elements in demo).");
      return;
    }
    setArrayData([...arrayData, val]);
    setActionMessage(`Inserted ${val} at index ${arrayData.length} in O(1) amortized time.`);
  };

  const handleArrayDelete = (idx: number) => {
    const deletedVal = arrayData[idx];
    const newArr = arrayData.filter((_, i) => i !== idx);
    setArrayData(newArr);
    setActionMessage(`Deleted element ${deletedVal} at index ${idx}. Remaining shifted in O(n) time.`);
  };

  const handleArraySearch = () => {
    const target = parseInt(inputValue);
    if (isNaN(target)) return;
    const idx = arrayData.indexOf(target);
    if (idx !== -1) {
      setArraySearchIdx(idx);
      setActionMessage(`Found ${target} at index ${idx}!`);
      setTimeout(() => setArraySearchIdx(null), 3000);
    } else {
      setActionMessage(`${target} not found in array (Linear scan O(n)).`);
    }
  };

  // Stack Operations
  const handleStackPush = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    if (stackData.length >= stackLimit) {
      setStackMessage("⚠️ Stack Overflow! Maximum capacity reached.");
      return;
    }
    setStackData([...stackData, val]);
    setStackMessage(`Pushed ${val} onto top of Stack. Time: O(1).`);
  };

  const handleStackPop = () => {
    if (stackData.length === 0) {
      setStackMessage("⚠️ Stack Underflow! Cannot pop from empty stack.");
      return;
    }
    const popped = stackData[stackData.length - 1];
    setStackData(stackData.slice(0, -1));
    setStackMessage(`Popped ${popped} from top of Stack. Time: O(1).`);
  };

  // Queue Operations
  const handleQueueEnqueue = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    if (queueData.length >= queueLimit) {
      setQueueMessage("⚠️ Queue Overflow! Queue is full.");
      return;
    }
    setQueueData([...queueData, val]);
    setQueueMessage(`Enqueued ${val} at Rear. Time: O(1).`);
  };

  const handleQueueDequeue = () => {
    if (queueData.length === 0) {
      setQueueMessage("⚠️ Queue Underflow! Queue is empty.");
      return;
    }
    const dequeued = queueData[0];
    setQueueData(queueData.slice(1));
    setQueueMessage(`Dequeued ${dequeued} from Front. Time: O(1).`);
  };

  // Linked List Operations
  const handleLLInsertHead = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setLinkedListData([val, ...linkedListData]);
    setLlMessage(`Inserted ${val} at Head. New node points to old head. Time: O(1).`);
  };

  const handleLLInsertTail = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setLinkedListData([...linkedListData, val]);
    setLlMessage(`Inserted ${val} at Tail. Traversed to end. Time: O(n).`);
  };

  const handleLLDeleteHead = () => {
    if (linkedListData.length === 0) {
      setLlMessage("List is already empty.");
      return;
    }
    const val = linkedListData[0];
    setLinkedListData(linkedListData.slice(1));
    setLlMessage(`Deleted Head node (${val}). Head updated to next node. Time: O(1).`);
  };

  // BST Helper
  const insertBSTNode = (node: BSTNode | null | undefined, val: number): BSTNode => {
    if (!node) return { val };
    if (val < node.val) {
      return { ...node, left: insertBSTNode(node.left, val) };
    } else {
      return { ...node, right: insertBSTNode(node.right, val) };
    }
  };

  const handleBSTInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setBstRoot((prev) => insertBSTNode(prev, val));
    setBstMessage(`Inserted ${val} into BST according to binary ordering rule. Time: O(h).`);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6 shadow-2xl backdrop-blur-md">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              Interactive Lab
            </span>
            <span className="text-xs font-medium text-slate-400">Data Structures Visualizer</span>
          </div>
          <h3 className="text-xl font-black text-white mt-1">
            Live Memory & Data Structure Simulation
          </h3>
        </div>

        {/* Structure Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {[
            { id: "stack", label: "Stack (LIFO)" },
            { id: "queue", label: "Queue (FIFO)" },
            { id: "array", label: "Array (Contiguous)" },
            { id: "linkedlist", label: "Linked List (Pointers)" },
            { id: "bst", label: "Binary Tree (BST)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-300">Element Value:</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-mono font-bold text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Dynamic Action Buttons based on Active Tab */}
        {activeTab === "stack" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleStackPush}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Push(val)
            </button>
            <button
              onClick={handleStackPop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Trash2 className="h-3.5 w-3.5" /> Pop()
            </button>
            <button
              onClick={() => {
                setStackData([]);
                setStackMessage("Stack cleared.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        )}

        {activeTab === "queue" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleQueueEnqueue}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Enqueue(val)
            </button>
            <button
              onClick={handleQueueDequeue}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Trash2 className="h-3.5 w-3.5" /> Dequeue()
            </button>
            <button
              onClick={() => {
                setQueueData([]);
                setQueueMessage("Queue cleared.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        )}

        {activeTab === "array" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleArrayInsert}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Append(val)
            </button>
            <button
              onClick={handleArraySearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Search className="h-3.5 w-3.5" /> Linear Search
            </button>
            <button
              onClick={() => {
                setArrayData([10, 20, 30, 40, 50]);
                setActionMessage("Array reset to default sequence.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        )}

        {activeTab === "linkedlist" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleLLInsertHead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Insert Head
            </button>
            <button
              onClick={handleLLInsertTail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Insert Tail
            </button>
            <button
              onClick={handleLLDeleteHead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete Head
            </button>
            <button
              onClick={() => {
                setLinkedListData([10, 20, 30]);
                setLlMessage("Linked List reset.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        )}

        {activeTab === "bst" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBSTInsert}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Insert in BST
            </button>
            <button
              onClick={() => {
                setBstRoot({
                  val: 50,
                  left: { val: 30, left: { val: 20 }, right: { val: 40 } },
                  right: { val: 70, left: { val: 60 }, right: { val: 80 } },
                });
                setBstMessage("BST reset to balanced default.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        )}
      </div>

      {/* Visual Canvas Area */}
      <div className="min-h-[280px] rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* TAB 1: STACK VISUALIZATION */}
        {activeTab === "stack" && (
          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Stack Bottom (Index 0)</span>
              <span className="font-mono text-emerald-400 font-bold">TOP Pointer = Index {stackData.length - 1}</span>
            </div>

            <div className="flex flex-col-reverse items-center gap-2 border-b-4 border-l-4 border-r-4 border-emerald-500/40 rounded-b-2xl p-4 bg-slate-900/40 min-h-[220px] justify-start">
              {stackData.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-10">Stack is currently Empty (Underflow State)</div>
              ) : (
                stackData.map((item, idx) => {
                  const isTop = idx === stackData.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`w-full py-3 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm transition-all duration-300 transform ${
                        isTop
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-105 border border-emerald-400"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      <span className="text-xs text-emerald-200">Slot [{idx}]</span>
                      <span className="text-base font-black">{item}</span>
                      {isTop && (
                        <span className="text-[10px] uppercase font-black tracking-wider bg-white text-emerald-800 px-2 py-0.5 rounded">
                          TOP
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              {stackMessage}
            </div>
          </div>
        )}

        {/* TAB 2: QUEUE VISUALIZATION */}
        {activeTab === "queue" && (
          <div className="w-full max-w-xl space-y-4">
            <div className="flex justify-between text-xs text-slate-400">
              <span className="text-rose-400 font-bold">FRONT (Deletions Occur Here)</span>
              <span className="text-blue-400 font-bold">REAR (Insertions Occur Here)</span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto p-4 bg-slate-900/40 rounded-2xl border-t-2 border-b-2 border-blue-500/40 min-h-[140px] justify-center">
              {queueData.length === 0 ? (
                <div className="text-slate-500 text-xs py-8">Queue is Empty (Underflow State)</div>
              ) : (
                queueData.map((item, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueData.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`min-w-[80px] py-4 rounded-xl flex flex-col items-center justify-center font-mono font-bold transition-all ${
                        isFront
                          ? "bg-gradient-to-b from-rose-600 to-pink-600 text-white shadow-lg border border-rose-400"
                          : isRear
                          ? "bg-gradient-to-b from-blue-600 to-cyan-600 text-white shadow-lg border border-blue-400"
                          : "bg-slate-800 text-slate-200 border border-slate-700"
                      }`}
                    >
                      <span className="text-[10px] text-slate-300">[{idx}]</span>
                      <span className="text-lg font-black">{item}</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider mt-1 opacity-90">
                        {isFront ? "FRONT" : isRear ? "REAR" : "BODY"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-center text-xs font-semibold text-blue-400 bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
              {queueMessage}
            </div>
          </div>
        )}

        {/* TAB 3: ARRAY VISUALIZATION */}
        {activeTab === "array" && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="text-xs text-slate-400 text-center">
              Contiguous Sequential Memory Array: <span className="font-mono text-indigo-400">Address = Base + (i * sizeof(int))</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-slate-900/40 rounded-2xl border border-slate-800 min-h-[130px]">
              {arrayData.map((item, idx) => {
                const isMatched = arraySearchIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`relative p-3 rounded-xl flex flex-col items-center min-w-[70px] border transition-all duration-300 ${
                      isMatched
                        ? "bg-amber-500 text-slate-950 font-black scale-110 shadow-lg shadow-amber-500/30 border-white animate-bounce"
                        : "bg-slate-800/90 text-slate-100 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-400">Idx: {idx}</span>
                    <span className="text-base font-black font-mono my-1">{item}</span>
                    <span className="text-[9px] font-mono text-slate-500">0x{1000 + idx * 4}</span>
                    <button
                      onClick={() => handleArrayDelete(idx)}
                      className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center text-[10px] shadow"
                      title="Delete Element"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-xs font-semibold text-indigo-300 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
              {arrayActionMessage}
            </div>
          </div>
        )}

        {/* TAB 4: LINKED LIST VISUALIZATION */}
        {activeTab === "linkedlist" && (
          <div className="w-full max-w-3xl space-y-4">
            <div className="text-xs text-slate-400 text-center">
              Dynamic Node Memory Pointers: Each node stores <code className="text-teal-400 font-mono">[ Data | Next Pointer ]</code>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto p-4 bg-slate-900/40 rounded-2xl border border-teal-500/30 min-h-[140px]">
              <div className="px-2.5 py-1 rounded bg-teal-500/20 border border-teal-500/40 text-teal-400 text-xs font-bold font-mono">
                HEAD
              </div>
              <ArrowRight className="h-4 w-4 text-teal-400 shrink-0" />

              {linkedListData.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-700 shadow-md">
                    <div className="bg-slate-800 px-3 py-2 font-mono font-bold text-sm text-white">
                      {item}
                    </div>
                    <div className="bg-teal-900/60 px-2 py-2 font-mono text-[10px] text-teal-300 border-l border-slate-700 flex items-center">
                      *next
                    </div>
                  </div>
                  {idx < linkedListData.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-teal-400 shrink-0" />
                  ) : (
                    <>
                      <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-500 text-xs font-mono font-bold">
                        NULL
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center text-xs font-semibold text-teal-400 bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
              {llMessage}
            </div>
          </div>
        )}

        {/* TAB 5: BST VISUALIZATION */}
        {activeTab === "bst" && (
          <div className="w-full max-w-xl space-y-4 text-center">
            <div className="text-xs text-slate-400">
              Binary Search Tree (BST) Recursive Hierarchy
            </div>

            <div className="p-6 bg-slate-900/40 rounded-2xl border border-purple-500/30 flex flex-col items-center space-y-4">
              {/* Level 0: Root */}
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 border-2 border-purple-300 text-white font-mono font-bold flex items-center justify-center shadow-lg text-sm">
                  {bstRoot.val}
                </div>
              </div>

              {/* Level 1: Left & Right Children */}
              <div className="flex justify-center gap-24 w-full">
                {bstRoot.left && (
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-purple-400 text-purple-300 font-mono font-bold flex items-center justify-center shadow text-xs">
                    {bstRoot.left.val}
                  </div>
                )}
                {bstRoot.right && (
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-purple-400 text-purple-300 font-mono font-bold flex items-center justify-center shadow text-xs">
                    {bstRoot.right.val}
                  </div>
                )}
              </div>

              {/* Level 2: Grandchildren */}
              <div className="flex justify-center gap-10 w-full">
                {bstRoot.left?.left && (
                  <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-600 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                    {bstRoot.left.left.val}
                  </div>
                )}
                {bstRoot.left?.right && (
                  <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-600 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                    {bstRoot.left.right.val}
                  </div>
                )}
                {bstRoot.right?.left && (
                  <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-600 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                    {bstRoot.right.left.val}
                  </div>
                )}
                {bstRoot.right?.right && (
                  <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-600 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                    {bstRoot.right.right.val}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-xs font-semibold text-purple-400 bg-purple-500/10 p-2 rounded-lg border border-purple-500/20">
              {bstMessage}
            </div>
          </div>
        )}
      </div>

      {/* Educational Complexity Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-slate-400 block font-medium">Access / Search:</span>
          <span className="text-emerald-400 font-mono font-bold">
            {activeTab === "array" ? "O(1) Access / O(n) Search" : activeTab === "stack" || activeTab === "queue" ? "O(n) Search" : activeTab === "bst" ? "O(log n) Avg" : "O(n) Search"}
          </span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-slate-400 block font-medium">Insertion:</span>
          <span className="text-blue-400 font-mono font-bold">
            {activeTab === "stack" ? "O(1) Push" : activeTab === "queue" ? "O(1) Enqueue" : activeTab === "linkedlist" ? "O(1) at Head" : activeTab === "bst" ? "O(log n) Avg" : "O(n) Shifting"}
          </span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <span className="text-slate-400 block font-medium">Deletion:</span>
          <span className="text-rose-400 font-mono font-bold">
            {activeTab === "stack" ? "O(1) Pop" : activeTab === "queue" ? "O(1) Dequeue" : activeTab === "linkedlist" ? "O(1) at Head" : activeTab === "bst" ? "O(log n) Avg" : "O(n) Shifting"}
          </span>
        </div>
      </div>
    </div>
  );
}
