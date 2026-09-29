import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalSearchModal from "@/components/search/GlobalSearchModal";

export const metadata: Metadata = {
  title: "CSE Engine - 4-Year B.Tech Computer Science Learning & Resource Hub",
  description: "Comprehensive 4-Year Computer Science Engineering platform with syllabus, notes, lectures, PYQs, and interactive technical reading articles.",
  keywords: ["Computer Science Engineering", "B.Tech CSE", "CSE Syllabus", "Data Structures", "Operating Systems", "CSE Notes", "PYQs", "GFG style learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
          <GlobalSearchModal />
        </AuthProvider>
      </body>
    </html>
  );
}
