"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { validateRegistrationEmail } from "@/lib/disposableEmailBlocker";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const check = validateRegistrationEmail(email);
    if (!check.isValid) {
      setError(check.reason || "Invalid email.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg mb-2">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Reset Password</h1>
          <p className="text-xs text-slate-400">
            Enter your verified academic email to receive reset instructions
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-center space-y-3">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an account exists for <b className="text-emerald-300">{email}</b>, we have sent a secure password reset token.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline"
                >
                  <span>Return to Sign In</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-lg transition"
              >
                <span>Send Password Reset Email</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center pt-2 text-xs text-slate-400">
                Remember your password?{" "}
                <Link href="/login" className="font-semibold text-blue-400 hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
