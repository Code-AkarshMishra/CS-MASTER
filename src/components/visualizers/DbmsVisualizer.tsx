"use client";

import React, { useState } from "react";
import { Database, Table2, Key, GitBranch } from "lucide-react";

type DbmsTab = "erd" | "normalization" | "sql" | "transactions";

// ============================================================
// DBMS INTERACTIVE VISUALIZER
// ============================================================
export default function DbmsVisualizer() {
  const [tab, setTab] = useState<DbmsTab>("erd");

  // SQL Playground state
  const [sqlQuery, setSqlQuery] = useState(
    `SELECT s.name, d.dept_name, s.cgpa
FROM Students s
INNER JOIN Departments d 
  ON s.dept_id = d.dept_id
WHERE s.cgpa > 8.0
ORDER BY s.cgpa DESC;`
  );

  // Sample DB tables
  const students = [
    { id: 101, name: "Aarav Shah", dept_id: 1, cgpa: 9.2 },
    { id: 102, name: "Priya Nair", dept_id: 2, cgpa: 8.7 },
    { id: 103, name: "Rahul Mehta", dept_id: 1, cgpa: 7.4 },
    { id: 104, name: "Sneha Rao", dept_id: 3, cgpa: 9.5 },
    { id: 105, name: "Arjun Das", dept_id: 2, cgpa: 8.1 },
  ];
  const departments = [
    { dept_id: 1, dept_name: "Computer Science", hod: "Dr. Kapoor" },
    { dept_id: 2, dept_name: "Electronics", hod: "Dr. Verma" },
    { dept_id: 3, dept_name: "Information Technology", hod: "Dr. Singh" },
  ];

  // Simulate the SQL query result (INNER JOIN WHERE cgpa > 8.0)
  const queryResult = students
    .filter((s) => s.cgpa > 8.0)
    .map((s) => {
      const dept = departments.find((d) => d.dept_id === s.dept_id);
      return { name: s.name, dept_name: dept?.dept_name ?? "—", cgpa: s.cgpa };
    })
    .sort((a, b) => b.cgpa - a.cgpa);

  // Normalization State
  const [normalForm, setNormalForm] = useState<"unnormalized" | "1NF" | "2NF" | "3NF">("unnormalized");

  const tables = {
    unnormalized: {
      title: "Unnormalized Table (Issues: Redundancy, Anomalies)",
      columns: ["StudentID", "StudentName", "CourseID", "CourseName", "InstructorName", "InstructorDept"],
      rows: [
        ["101", "Aarav", "CS301", "Data Structures", "Dr. Mehta", "CSE"],
        ["101", "Aarav", "CS302", "DBMS", "Dr. Sharma", "CSE"],
        ["102", "Priya", "CS301", "Data Structures", "Dr. Mehta", "CSE"],
        ["102", "Priya", "CS303", "Networks", "Dr. Patel", "ECE"],
      ],
      issue: "🚨 If we delete Student 102's CS303 enrollment, Dr. Patel's details are lost (Deletion Anomaly).",
    },
    "1NF": {
      title: "1NF — Atomic Values, No Repeating Groups",
      columns: ["StudentID", "StudentName", "CourseID", "CourseName", "Instructor"],
      rows: [
        ["101", "Aarav", "CS301", "Data Structures", "Dr. Mehta"],
        ["101", "Aarav", "CS302", "DBMS", "Dr. Sharma"],
        ["102", "Priya", "CS301", "Data Structures", "Dr. Mehta"],
        ["102", "Priya", "CS303", "Networks", "Dr. Patel"],
      ],
      issue: "⚠️ Partial Dependency: StudentName depends only on StudentID (not full key {StudentID, CourseID}). Violates 2NF.",
    },
    "2NF": {
      title: "2NF — No Partial Dependencies",
      columns: ["Table 1: Students (StudentID→Name)  |  Table 2: Enrollment (StudentID, CourseID→Instructor)"],
      rows: [
        ["Students: (101, Aarav), (102, Priya)"],
        ["Courses:  (CS301, Data Structures, Dr. Mehta), (CS302, DBMS, Dr. Sharma)"],
        ["Enrollment: (101, CS301), (101, CS302), (102, CS301), (102, CS303)"],
      ],
      issue: "⚠️ Transitive Dependency: CourseID → Instructor → InstructorDept. Still violates 3NF.",
    },
    "3NF": {
      title: "3NF — No Transitive Dependencies (Fully Normalized)",
      columns: ["Relation"],
      rows: [
        ["Students(StudentID [PK], StudentName)"],
        ["Courses(CourseID [PK], CourseName, InstructorID [FK])"],
        ["Instructors(InstructorID [PK], InstructorName, Department)"],
        ["Enrollment(StudentID [FK], CourseID [FK]) — Composite PK"],
      ],
      issue: "✅ All attributes depend only on the Primary Key. Fully 3NF compliant. No anomalies.",
    },
  };

  const currentTable = tables[normalForm];

  // 2PL Transaction state
  const [txnStep, setTxnStep] = useState(0);
  const txnSteps = [
    { t1: "BEGIN; Lock-S(A)", t2: "—", desc: "T1 acquires a Shared Lock on Account A." },
    { t1: "READ(A) = 1000", t2: "BEGIN; Lock-S(B)", desc: "T1 reads A. T2 acquires Shared Lock on B." },
    { t1: "Lock-X(A)", t2: "READ(B) = 500", desc: "T1 upgrades to Exclusive Lock on A for write." },
    { t1: "WRITE(A) = 800", t2: "Lock-X(A) → WAIT", desc: "T2 tries X-Lock on A. BLOCKED — T1 holds it!" },
    { t1: "Unlock(A); COMMIT", t2: "Lock-X(A) → GRANTED", desc: "T1 commits. T2 gets the lock." },
    { t1: "—", t2: "WRITE(A) = 1300; COMMIT", desc: "T2 completes. Serial order: T1 → T2." },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2.5 py-0.5 rounded border border-violet-500/20">
            DBMS Lab
          </span>
          <h3 className="text-xl font-black text-white mt-1">Database Management Interactive Studio</h3>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 flex-wrap">
          {[
            { id: "erd" as DbmsTab, label: "ER Diagram", icon: GitBranch },
            { id: "normalization" as DbmsTab, label: "Normalization", icon: Table2 },
            { id: "sql" as DbmsTab, label: "SQL Playground", icon: Database },
            { id: "transactions" as DbmsTab, label: "2PL Transactions", icon: Key },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                tab === id ? "bg-violet-700 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="h-3 w-3" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== ER DIAGRAM ===== */}
      {tab === "erd" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">Visual Entity-Relationship Diagram for a University Database System.</p>
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 overflow-x-auto">
            <svg viewBox="0 0 600 320" className="w-full min-w-[400px]" style={{ height: "340px" }}>
              {/* Student Entity */}
              <rect x="10" y="120" width="130" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"/>
              <text x="75" y="145" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">STUDENT</text>
              <line x1="10" y1="155" x2="140" y2="155" stroke="#8b5cf6" strokeWidth="1"/>
              <text x="75" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">student_id (PK)</text>
              <text x="75" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10">name, cgpa</text>

              {/* Department Entity */}
              <rect x="460" y="120" width="130" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
              <text x="525" y="145" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">DEPARTMENT</text>
              <line x1="460" y1="155" x2="590" y2="155" stroke="#3b82f6" strokeWidth="1"/>
              <text x="525" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">dept_id (PK)</text>
              <text x="525" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10">dept_name, hod</text>

              {/* Course Entity */}
              <rect x="235" y="220" width="130" height="80" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2"/>
              <text x="300" y="245" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">COURSE</text>
              <line x1="235" y1="255" x2="365" y2="255" stroke="#10b981" strokeWidth="1"/>
              <text x="300" y="272" textAnchor="middle" fill="#94a3b8" fontSize="10">course_id (PK)</text>
              <text x="300" y="286" textAnchor="middle" fill="#94a3b8" fontSize="10">course_name, credits</text>

              {/* Enrolls-In Diamond */}
              <polygon points="300,100 260,130 300,160 340,130" fill="#1e293b" stroke="#f59e0b" strokeWidth="2"/>
              <text x="300" y="133" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Enrolls In</text>

              {/* Belongs-To Diamond */}
              <polygon points="300,30 260,60 300,90 340,60" fill="#1e293b" stroke="#ef4444" strokeWidth="2"/>
              <text x="300" y="63" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Belongs To</text>

              {/* Lines: Student -- EnrollsIn */}
              <line x1="140" y1="155" x2="260" y2="130" stroke="#f59e0b" strokeWidth="1.5"/>
              {/* Lines: EnrollsIn -- Course */}
              <line x1="300" y1="160" x2="300" y2="220" stroke="#f59e0b" strokeWidth="1.5"/>
              {/* Lines: Department -- BelongsTo */}
              <line x1="460" y1="140" x2="340" y2="60" stroke="#ef4444" strokeWidth="1.5"/>
              {/* Lines: BelongsTo -- Student (via department_id FK) */}
              <line x1="260" y1="60" x2="75" y2="120" stroke="#ef4444" strokeWidth="1.5"/>

              {/* Cardinality Labels */}
              <text x="175" y="145" fill="#f59e0b" fontSize="9">Many (N)</text>
              <text x="295" y="205" fill="#f59e0b" fontSize="9">Many (M)</text>
              <text x="395" y="105" fill="#ef4444" fontSize="9">Many (N)</text>
              <text x="120" y="90" fill="#ef4444" fontSize="9">1</text>

              {/* FK Notation */}
              <text x="300" y="315" textAnchor="middle" fill="#64748b" fontSize="9">
                student.dept_id → departments.dept_id (FK) | enrollment(student_id FK, course_id FK)
              </text>
            </svg>
          </div>

          {/* ER Table Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { entity: "Student", pk: "student_id", attrs: "name, cgpa, dept_id (FK)", color: "#8b5cf6" },
              { entity: "Course", pk: "course_id", attrs: "course_name, credits", color: "#10b981" },
              { entity: "Department", pk: "dept_id", attrs: "dept_name, hod", color: "#3b82f6" },
            ].map((e) => (
              <div key={e.entity} className="bg-slate-950/60 rounded-xl border border-slate-800 p-3 space-y-1">
                <div className="font-bold" style={{ color: e.color }}>{e.entity}</div>
                <div><span className="text-slate-500">PK: </span><span className="font-mono text-amber-400">{e.pk}</span></div>
                <div className="text-slate-400">{e.attrs}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== NORMALIZATION ===== */}
      {tab === "normalization" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["unnormalized", "1NF", "2NF", "3NF"] as const).map((form) => (
              <button
                key={form}
                onClick={() => setNormalForm(form)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  normalForm === form
                    ? "bg-violet-600 text-white border-violet-500 shadow-md"
                    : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"
                }`}
              >
                {form === "unnormalized" ? "Unnormalized" : form}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-violet-500/30 bg-slate-950/60 p-4 space-y-3">
            <h4 className="text-sm font-bold text-violet-300">{currentTable.title}</h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                {normalForm !== "2NF" && normalForm !== "3NF" && (
                  <thead>
                    <tr className="bg-slate-900 text-slate-400">
                      {currentTable.columns.map((col, i) => (
                        <th key={i} className="px-3 py-2 text-left">{col}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {currentTable.rows.map((row, i) => (
                    <tr key={i} className="border-t border-slate-800">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 text-slate-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`rounded-xl p-3 text-xs font-medium border ${
              normalForm === "3NF"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-amber-500/10 border-amber-500/30 text-amber-300"
            }`}>
              {currentTable.issue}
            </div>
          </div>
        </div>
      )}

      {/* ===== SQL PLAYGROUND ===== */}
      {tab === "sql" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sample Tables */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sample Database Tables</h4>
              <div className="overflow-x-auto">
                <div className="text-[11px] font-mono font-bold text-blue-400 mb-1 px-1">Students Table</div>
                <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400">
                      <th className="px-2 py-1.5">ID</th><th className="px-2 py-1.5">Name</th>
                      <th className="px-2 py-1.5">dept_id</th><th className="px-2 py-1.5">cgpa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-t border-slate-800">
                        <td className="px-2 py-1.5 text-center font-mono">{s.id}</td>
                        <td className="px-2 py-1.5">{s.name}</td>
                        <td className="px-2 py-1.5 text-center font-mono">{s.dept_id}</td>
                        <td className="px-2 py-1.5 text-center font-mono text-cyan-400">{s.cgpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto">
                <div className="text-[11px] font-mono font-bold text-purple-400 mb-1 px-1">Departments Table</div>
                <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400">
                      <th className="px-2 py-1.5">dept_id</th><th className="px-2 py-1.5">dept_name</th><th className="px-2 py-1.5">hod</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((d) => (
                      <tr key={d.dept_id} className="border-t border-slate-800">
                        <td className="px-2 py-1.5 text-center font-mono">{d.dept_id}</td>
                        <td className="px-2 py-1.5">{d.dept_name}</td>
                        <td className="px-2 py-1.5 text-slate-400">{d.hod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Query Editor & Results */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">SQL Query Editor</h4>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="w-full h-40 rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs font-mono text-green-300 focus:border-violet-500 focus:outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
                <div className="text-[11px] text-slate-500">
                  ℹ️ This playground simulates a pre-defined INNER JOIN with WHERE cgpa &gt; 8.0.
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Query Result</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-emerald-500/30 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-emerald-900/30 text-emerald-300">
                        <th className="px-3 py-2">name</th><th className="px-3 py-2">dept_name</th><th className="px-3 py-2">cgpa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.map((r, i) => (
                        <tr key={i} className="border-t border-emerald-900/30">
                          <td className="px-3 py-1.5 font-medium">{r.name}</td>
                          <td className="px-3 py-1.5 text-slate-400">{r.dept_name}</td>
                          <td className="px-3 py-1.5 text-center font-mono font-bold text-cyan-400">{r.cgpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {queryResult.length} row(s) returned.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 2PL TRANSACTIONS ===== */}
      {tab === "transactions" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Two-Phase Locking (2PL) Protocol step-by-step demonstration.
            Lock types: <span className="text-blue-400 font-mono">S (Shared/Read)</span> and{" "}
            <span className="text-red-400 font-mono">X (Exclusive/Write)</span>.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setTxnStep(Math.max(0, txnStep - 1))}
              disabled={txnStep === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-40 transition border border-slate-700"
            >
              ← Prev
            </button>
            <span className="text-xs font-mono text-slate-400 flex items-center">
              Step {txnStep + 1} / {txnSteps.length}
            </span>
            <button
              onClick={() => setTxnStep(Math.min(txnSteps.length - 1, txnStep + 1))}
              disabled={txnStep === txnSteps.length - 1}
              className="px-3 py-1.5 rounded-lg bg-violet-700 hover:bg-violet-600 text-xs font-bold text-white disabled:opacity-40 transition"
            >
              Next →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-slate-400">
                  <th className="px-3 py-2">Step</th>
                  <th className="px-3 py-2 text-blue-400">Transaction T1</th>
                  <th className="px-3 py-2 text-amber-400">Transaction T2</th>
                  <th className="px-3 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {txnSteps.map((step, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-800 transition ${
                      i === txnStep ? "bg-violet-500/10 border-l-2 border-violet-400" : i < txnStep ? "opacity-60" : "opacity-30"
                    }`}
                  >
                    <td className="px-3 py-2 text-center font-mono font-bold text-slate-500">{i + 1}</td>
                    <td className={`px-3 py-2 font-mono ${step.t1 === "—" ? "text-slate-600" : "text-blue-300"}`}>{step.t1}</td>
                    <td className={`px-3 py-2 font-mono ${step.t2 === "—" ? "text-slate-600" : step.t2.includes("WAIT") ? "text-rose-400" : "text-amber-300"}`}>{step.t2}</td>
                    <td className="px-3 py-2 text-slate-400">{step.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-blue-200">
              <div className="font-bold mb-2 text-blue-400">Growing Phase (Acquire Locks)</div>
              <div className="space-y-1 text-blue-200/80">
                <div>• Lock-S = Shared Read Lock</div>
                <div>• Lock-X = Exclusive Write Lock</div>
                <div>• Multiple S-locks on same item: ✅ OK</div>
                <div>• S + X on same item: ❌ Conflict</div>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-200">
              <div className="font-bold mb-2 text-amber-400">Shrinking Phase (Release Locks)</div>
              <div className="space-y-1 text-amber-200/80">
                <div>• Once released: no new lock requests</div>
                <div>• Strict 2PL: hold X-locks till COMMIT</div>
                <div>• Guarantees Conflict Serializability</div>
                <div>• Can still deadlock → Timeout/Detection</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
