import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { resourceCreateSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const type = searchParams.get("type");
    const semester = searchParams.get("semester");
    const year = searchParams.get("year");

    const whereClause: any = {};

    if (subjectId) whereClause.subjectId = subjectId;
    if (type) whereClause.type = type;
    if (semester) whereClause.subject = { semester: { semesterNumber: parseInt(semester) } };
    if (year) whereClause.subject = { semester: { academicYear: { yearNumber: parseInt(year) } } };

    const resources = await prisma.resource.findMany({
      where: whereClause,
      include: {
        subject: {
          select: { code: true, title: true, slug: true },
        },
        unit: {
          select: { unitNumber: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Fetch Resources Error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = resourceCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues?.[0]?.message || "Invalid resource data" }, { status: 400 });
    }

    const resource = await prisma.resource.create({
      data: parseResult.data,
    });

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    console.error("Create Resource Error:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
