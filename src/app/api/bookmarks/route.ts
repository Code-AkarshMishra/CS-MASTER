import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        subject: {
          include: { semester: true },
        },
        article: {
          include: { subject: true },
        },
        resource: {
          include: { subject: true },
        },
        pyq: {
          include: { subject: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error("Fetch Bookmarks Error:", error);
    return NextResponse.json({ error: "Failed to fetch bookmarks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { itemType, subjectId, articleId, resourceId, pyqId } = body;

    // Check if already bookmarked -> toggle behavior
    const existing = await prisma.bookmark.findFirst({
      where: {
        userId,
        itemType,
        subjectId: subjectId || null,
        articleId: articleId || null,
        resourceId: resourceId || null,
        pyqId: pyqId || null,
      },
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      return NextResponse.json({ bookmarked: false, message: "Bookmark removed" });
    }

    const newBookmark = await prisma.bookmark.create({
      data: {
        userId,
        itemType,
        subjectId: subjectId || null,
        articleId: articleId || null,
        resourceId: resourceId || null,
        pyqId: pyqId || null,
      },
    });

    return NextResponse.json({ bookmarked: true, bookmark: newBookmark, message: "Bookmarked successfully" });
  } catch (error) {
    console.error("Toggle Bookmark Error:", error);
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 });
  }
}
