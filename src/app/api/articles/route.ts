import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { articleCreateSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const search = searchParams.get("q");

    const whereClause: any = { isPublished: true };

    if (subjectId) {
      whereClause.subjectId = subjectId;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        subject: {
          select: { code: true, title: true, slug: true },
        },
        unit: {
          select: { unitNumber: true, title: true },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = articleCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues?.[0]?.message || "Invalid article data" }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: parseResult.data,
    });

    return NextResponse.json({ article: newArticle }, { status: 201 });
  } catch (error) {
    console.error("Create Article Error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
