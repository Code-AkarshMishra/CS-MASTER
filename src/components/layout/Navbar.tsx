"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  GraduationCap,
  Search,
  BookOpen,
  Layers,
  FileText,
  FileQuestion,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Flame,
  Bookmark,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setYearsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Subjects", href: "/subjects" },
    { name: "Reading Hub (GFG)", href: "/learn" },
    { name: "PYQs Bank", href: "/pyqs" },
    { name: "Notes & Lectures", href: "/resources" },
  ];

  const yearLinks = [
    { name: "1st Year (Sem 1 & 2)", href: "/years/1", desc: "Physics, Chem, Math, Basic C" },
    { name: "2nd Year (Sem 3 & 4)", href: "/years/2", desc: "DSA, OS, COA, Discrete Math, Python" },
    { name: "3rd Year (Sem 5 & 6)", href: "/years/3", desc: "DBMS, DAA, OOP, Compiler, Networks" },
    { name: "4th Year (Sem 7 & 8)", href: "/years/4", desc: "Distributed Systems, AI/ML, Projects" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                CSE ENGINE
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                4-YEAR HUB
              </span>
            </div>
          </Link>

          {/* Academic Years Selector (Desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setYearsDropdownOpen(!yearsDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
            >
              <span>Academic Years</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${yearsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {yearsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl z-50">
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Select Year & Curriculum
                </div>
                {yearLinks.map((yr) => (
                  <Link
                    key={yr.href}
                    href={yr.href}
                    onClick={() => setYearsDropdownOpen(false)}
                    className="flex flex-col px-3 py-2 rounded-lg hover:bg-slate-800/80 transition-colors group"
                  >
                    <span className="text-sm font-medium text-slate-200 group-hover:text-blue-400">
                      {yr.name}
                    </span>
                    <span className="text-xs text-slate-400 line-clamp-1">{yr.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Search & Auth Profile */}
        <div className="flex items-center gap-3">
          {/* Global Search Button Trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-global-search"))}
            className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
          >
            <Search className="h-4 w-4 text-blue-400" />
            <span className="hidden sm:inline">Search curriculum...</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              Ctrl K
            </kbd>
          </button>

          {/* User Status / Profile */}
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-blue-500/40 p-0.5 hover:ring-2 hover:ring-blue-500/30 transition"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-xs text-white">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl z-50">
                  <div className="border-b border-slate-800 px-3 py-2.5">
                    <p className="text-sm font-semibold text-slate-100 truncate">{session.user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {(session.user as any).role || "STUDENT"}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                        <Flame className="h-3 w-3 fill-amber-400" /> Day {(session.user as any).streakDays || 14}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition"
                    >
                      <LayoutDashboard className="h-4 w-4 text-blue-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition"
                    >
                      <User className="h-4 w-4 text-indigo-400" />
                      My Profile
                    </Link>
                    <Link
                      href="/bookmarks"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition"
                    >
                      <Bookmark className="h-4 w-4 text-amber-400" />
                      Saved Resources
                    </Link>
                    {(session.user as any)?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-purple-300 rounded-lg hover:bg-purple-950/40 transition"
                      >
                        <ShieldAlert className="h-4 w-4 text-purple-400" />
                        Admin Studio
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Join Free
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-900/98 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {yearLinks.map((yr) => (
              <Link
                key={yr.href}
                href={yr.href}
                className="p-2 rounded-lg bg-slate-800/50 text-xs font-medium text-slate-200 hover:bg-blue-600/20 hover:text-blue-400"
              >
                {yr.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {!session?.user && (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-slate-800 text-slate-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full text-center py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white"
              >
                Create Free Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
