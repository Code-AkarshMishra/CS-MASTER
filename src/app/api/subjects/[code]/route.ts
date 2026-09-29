import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const cleanCode = decodeURIComponent(code).toUpperCase();

    const subject = await prisma.subject.findFirst({
      where: {
        OR: [
          { code: cleanCode },
          { slug: cleanCode.toLowerCase() },
        ],
      },
      include: {
        semester: {
          include: { academicYear: true },
        },
        units: {
          orderBy: { unitNumber: "asc" },
          include: {
            articles: {
              where: { isPublished: true },
              orderBy: { order: "asc" },
            },
            resources: {
              orderBy: { createdAt: "desc" },
            },
          },
        },
        articles: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
        resources: {
          orderBy: { createdAt: "desc" },
        },
        pyqs: {
          orderBy: [{ examYear: "desc" }, { examType: "asc" }],
        },
      },
    });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    return NextResponse.json({ subject });
  } catch (error) {
    console.error("Fetch Subject Details Error:", error);
    return NextResponse.json({ error: "Failed to fetch subject details" }, { status: 500 });
  }
}
