"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  GraduationCap,
  Lock,
  Flame,
  CheckCircle2,
  AlertCircle,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [currentYear, setCurrentYear] = useState(1);
  const [currentSemester, setCurrentSemester] = useState(1);
  const [specialization, setSpecialization] = useState("ML");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setProfile(data.user);
            setName(data.user.name || "");
            setCurrentYear(data.user.currentYear || 1);
            setCurrentSemester(data.user.currentSemester || 1);
            setSpecialization(data.user.specialization || "ML");
            setBio(data.user.bio || "");
          }
        }
      } catch (err) {
        console.error("Load Profile Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          currentYear,
          currentSemester,
          specialization,
          bio,
          oldPassword: oldPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.error || "Failed to update profile", isError: true });
      } else {
        setMessage({ text: "Profile updated successfully!", isError: false });
        setOldPassword("");
        setNewPassword("");
        await update({ name, currentYear, currentSemester, specialization });
      }
    } catch (err) {
      setMessage({ text: "Network error updating profile.", isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl shadow-xl shadow-blue-500/20">
            {profile?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{profile?.name}</h1>
            <p className="text-xs text-slate-400">{profile?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                {profile?.role || "STUDENT"}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <Flame className="h-3 w-3 fill-amber-400" /> {profile?.streakDays || 14} Day Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
        {message && (
          <div
            className={`flex items-start gap-3 rounded-xl p-3.5 text-xs ${
              message.isError
                ? "border border-red-500/30 bg-red-950/40 text-red-300"
                : "border border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
            }`}
          >
            {message.isError ? (
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Academic Year
              </label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
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
              Bio / Academic Objective
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. 2nd Year CSE undergrad focused on AI/ML and distributed systems."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Change Section */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Lock className="h-4 w-4 text-indigo-400" /> Change Password (Optional)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving Changes..." : "Save Profile Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
