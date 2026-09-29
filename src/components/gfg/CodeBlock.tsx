"use client";

import React, { useState } from "react";
import { Check, Copy, Play, Terminal, Code2 } from "lucide-react";

interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation?: string;
}

interface CodeBlockProps {
  snippets: CodeSnippet[];
}

export default function CodeBlock({ snippets }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!snippets || snippets.length === 0) return null;
  const currentSnippet = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setSimulatedOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      if (currentSnippet.language === "cpp" || currentSnippet.language === "c") {
        setSimulatedOutput(
          `[Execution Success: 0.04s]\n10 -> 20 -> 30 -> NULL\nProgram exited with code 0.`
        );
      } else if (currentSnippet.language === "python") {
        setSimulatedOutput(
          `[Python 3.12 Engine]\n100 -> 200 -> 300 -> None\nProcess finished with exit code 0.`
        );
      } else {
        setSimulatedOutput(`Execution result successfully evaluated without errors.`);
      }
    }, 600);
  };

  return (
    <div className="my-6 rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-xl">
      {/* Top Header & Language Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-blue-400" />
          <div className="flex space-x-1">
            {snippets.map((snip, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  setSimulatedOutput(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === index
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {snip.language.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Copy & Run */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition disabled:opacity-50"
          >
            <Play className={`h-3 w-3 fill-emerald-400 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="relative overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200 bg-[#0d1117]">
        <pre className="overflow-x-auto whitespace-pre">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>

      {/* Simulated Output Terminal */}
      {simulatedOutput && (
        <div className="border-t border-slate-800 bg-black/80 p-3 font-mono text-xs text-emerald-400">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">
              Simulated Output
            </span>
          </div>
          <pre className="whitespace-pre-wrap">{simulatedOutput}</pre>
        </div>
      )}

      {/* Explanation Footer */}
      {currentSnippet.explanation && (
        <div className="border-t border-slate-800/80 bg-slate-900/50 px-4 py-2 text-xs text-slate-400 italic">
          💡 <span className="font-semibold text-slate-300">Explanation:</span> {currentSnippet.explanation}
        </div>
      )}
    </div>
  );
}
