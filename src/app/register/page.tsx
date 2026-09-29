"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { validateRegistrationEmail } from "@/lib/disposableEmailBlocker";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentYear, setCurrentYear] = useState(1);
  const [currentSemester, setCurrentSemester] = useState(1);
  const [specialization, setSpecialization] = useState("ML");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Real-time email validation
  const emailCheck = email ? validateRegistrationEmail(email) : { isValid: true };

  // Password strength check
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasUpper && hasNumber && hasSpecial;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!emailCheck.isValid) {
      setError(emailCheck.reason || "Invalid email.");
      return;
    }

    if (!isPasswordStrong) {
      setError("Please ensure your password meets all complexity requirements.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          currentYear,
          currentSemester,
          specialization,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account.");
      } else {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-2">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create Student Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Join the verified 4-Year B.Tech CSE learning ecosystem
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Shivam Yadav"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Academic Email Address (No Disposable/Burner Mails)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="student@university.ac.in or gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                    !emailCheck.isValid
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-blue-500"
                  }`}
                />
              </div>
              {!emailCheck.isValid && (
                <p className="mt-1 text-[11px] text-red-400">
                  ⚠️ {emailCheck.reason}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Academic Year
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => {
                    const yr = parseInt(e.target.value);
                    setCurrentYear(yr);
                    setCurrentSemester(yr * 2 - 1);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  <option value={1}>1st Year (Sem 1 & 2)</option>
                  <option value={2}>2nd Year (Sem 3 & 4)</option>
                  <option value={3}>3rd Year (Sem 5 & 6)</option>
                  <option value={4}>4th Year (Sem 7 & 8)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Semester
                </label>
                <select
                  value={currentSemester}
                  onChange={(e) => setCurrentSemester(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Specialization Stream
              </label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="ML">Machine Learning (ML)</option>
                <option value="BD">Big Data Analytics (BD)</option>
                <option value="SE">Software Engineering (SE)</option>
                <option value="IOT">Internet of Things (IoT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Password complexity indicators */}
              {password && (
                <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
                  <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="h-3 w-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${hasUpper ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Number (0-9)
                  </span>
                  <span className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-400" : "text-slate-500"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Special Symbol (!@#$)
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !emailCheck.isValid}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition disabled:opacity-50"
            >
              <span>{loading ? "Creating Verified Account..." : "Create Free Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
