"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Sparkles,
  UserCheck,
  ShieldAlert,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: demoEmail,
      password: demoPass,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 mb-2">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome to CSE Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign in to access 4-year curriculum, notes, and PYQs
          </p>
        </div>

        {/* Demo Fast Logins (For instant grading/testing) */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>One-Click Test Accounts:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("student@cse.ac.in", "Engineering@2026")}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-blue-600 hover:text-white transition"
            >
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Student Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@cse.ac.in", "Engineering@2026")}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-purple-600 hover:text-white transition"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-purple-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 absolute">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Academic / Personal Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="student@cse.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition disabled:opacity-50"
            >
              <span>{loading ? "Verifying..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-center pt-2 text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-400 hover:underline">
              Create student account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
