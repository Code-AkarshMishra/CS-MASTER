import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const semesterNumber = searchParams.get("semester");
    const yearNumber = searchParams.get("year");
    const specialization = searchParams.get("specialization");
    const search = searchParams.get("q");

    const whereClause: any = {};

    if (semesterNumber) {
      whereClause.semester = { semesterNumber: parseInt(semesterNumber) };
    } else if (yearNumber) {
      whereClause.semester = { academicYear: { yearNumber: parseInt(yearNumber) } };
    }

    if (specialization) {
      whereClause.specializationStream = specialization;
    }

    if (search) {
      whereClause.OR = [
        { code: { contains: search } },
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const subjects = await prisma.subject.findMany({
      where: whereClause,
      include: {
        semester: {
          include: { academicYear: true },
        },
        _count: {
          select: {
            units: true,
            articles: true,
            resources: true,
            pyqs: true,
          },
        },
      },
      orderBy: [{ semesterId: "asc" }, { code: "asc" }],
    });

    return NextResponse.json({ subjects });
  } catch (error) {
    console.error("Fetch Subjects Error:", error);
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}
