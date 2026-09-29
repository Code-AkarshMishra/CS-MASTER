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

    const progressList = await prisma.progress.findMany({
      where: { userId },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
            subjectId: true,
          },
        },
      },
    });

    return NextResponse.json({ progress: progressList });
  } catch (error) {
    console.error("Fetch Progress Error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
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
    const { articleId, isCompleted } = body;

    if (!articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
      update: {
        isCompleted: isCompleted !== undefined ? isCompleted : true,
        lastReadAt: new Date(),
      },
      create: {
        userId,
        articleId,
        isCompleted: isCompleted !== undefined ? isCompleted : true,
      },
    });

    return NextResponse.json({ progress, success: true });
  } catch (error) {
    console.error("Update Progress Error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
