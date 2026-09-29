"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { AlertCircle, BookOpen } from "lucide-react";
import ArticleReader from "@/components/gfg/ArticleReader";

export default function SingleArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [articleData, setArticleData] = useState<any>(null);
  const [navigation, setNavigation] = useState<any>({ previous: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles/${encodeURIComponent(resolvedParams.slug)}`);
        if (res.ok) {
          const data = await res.json();
          setArticleData(data.article);
          setNavigation(data.navigation || { previous: null, next: null });
        }
      } catch (err) {
        console.error("Load Article Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center space-y-4">
        <div className="inline-block animate-spin text-2xl text-emerald-400">◓</div>
        <p className="text-sm text-slate-400">Loading interactive technical article...</p>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center space-y-4">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h2 className="text-xl font-bold text-white">Article Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested technical tutorial &ldquo;{resolvedParams.slug}&rdquo; could not be found.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
        >
          Return to Reading Hub
        </Link>
      </div>
    );
  }

  return <ArticleReader article={articleData} navigation={navigation} />;
}
