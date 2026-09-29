import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        subject: {
          include: {
            units: {
              orderBy: { unitNumber: "asc" },
              include: {
                articles: {
                  where: { isPublished: true },
                  select: { id: true, title: true, slug: true, order: true, difficulty: true, readTimeMinutes: true },
                  orderBy: { order: "asc" },
                },
              },
            },
          },
        },
        unit: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count asynchronously
    await prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    });

    // Find siblings in the same subject for Next / Previous buttons
    const allSubjectArticles = await prisma.article.findMany({
      where: { subjectId: article.subjectId, isPublished: true },
      select: { id: true, title: true, slug: true, order: true },
      orderBy: { order: "asc" },
    });

    const currentIndex = allSubjectArticles.findIndex((a) => a.id === article.id);
    const previousArticle = currentIndex > 0 ? allSubjectArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex < allSubjectArticles.length - 1 ? allSubjectArticles[currentIndex + 1] : null;

    return NextResponse.json({
      article,
      navigation: {
        previous: previousArticle,
        next: nextArticle,
      },
    });
  } catch (error) {
    console.error("Fetch Article by Slug Error:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
