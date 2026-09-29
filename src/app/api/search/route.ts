import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();
    const type = searchParams.get("type"); // all, subjects, articles, resources, pyqs
    const semester = searchParams.get("semester");

    if (!query || query.length < 2) {
      return NextResponse.json({
        results: {
          subjects: [],
          articles: [],
          resources: [],
          pyqs: [],
        },
      });
    }

    const searchQuery = query;

    const [subjects, articles, resources, pyqs] = await Promise.all([
      // Subjects match
      type === "all" || !type || type === "subjects"
        ? prisma.subject.findMany({
            where: {
              OR: [
                { code: { contains: searchQuery } },
                { title: { contains: searchQuery } },
                { description: { contains: searchQuery } },
                { department: { contains: searchQuery } },
              ],
            },
            include: { semester: true },
            take: 10,
          })
        : [],

      // Articles match
      type === "all" || !type || type === "articles"
        ? prisma.article.findMany({
            where: {
              isPublished: true,
              OR: [
                { title: { contains: searchQuery } },
                { summary: { contains: searchQuery } },
                { tags: { contains: searchQuery } },
                { conceptContent: { contains: searchQuery } },
              ],
            },
            include: {
              subject: { select: { code: true, title: true, slug: true } },
              unit: { select: { unitNumber: true, title: true } },
            },
            take: 10,
          })
        : [],

      // Resources match
      type === "all" || !type || type === "resources"
        ? prisma.resource.findMany({
            where: {
              OR: [
                { title: { contains: searchQuery } },
                { description: { contains: searchQuery } },
                { tags: { contains: searchQuery } },
              ],
            },
            include: {
              subject: { select: { code: true, title: true, slug: true } },
            },
            take: 10,
          })
        : [],

      // PYQs match
      type === "all" || !type || type === "pyqs"
        ? prisma.pYQ.findMany({
            where: {
              OR: [
                { keyTopicsCovered: { contains: searchQuery } },
                { subject: { title: { contains: searchQuery } } },
                { subject: { code: { contains: searchQuery } } },
              ],
            },
            include: {
              subject: { select: { code: true, title: true, slug: true } },
            },
            take: 10,
          })
        : [],
    ]);

    return NextResponse.json({
      results: {
        subjects,
        articles,
        resources,
        pyqs,
      },
      totalMatches: subjects.length + articles.length + resources.length + pyqs.length,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to perform global search" }, { status: 500 });
  }
}
