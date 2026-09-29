import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [
      totalUsers,
      totalSubjects,
      totalArticles,
      totalResources,
      totalPYQs,
      recentUsers,
      recentLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.subject.count(),
      prisma.article.count(),
      prisma.resource.count(),
      prisma.pYQ.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, role: true, currentYear: true, currentSemester: true, createdAt: true },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalSubjects,
        totalArticles,
        totalResources,
        totalPYQs,
      },
      recentUsers,
      recentLogs,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
