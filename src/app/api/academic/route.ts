import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const years = await prisma.academicYear.findMany({
      include: {
        semesters: {
          include: {
            _count: {
              select: { subjects: true },
            },
          },
          orderBy: { semesterNumber: "asc" },
        },
      },
      orderBy: { yearNumber: "asc" },
    });

    return NextResponse.json({ years });
  } catch (error) {
    console.error("Fetch Academic Structure Error:", error);
    return NextResponse.json({ error: "Failed to fetch academic structure" }, { status: 500 });
  }
}
