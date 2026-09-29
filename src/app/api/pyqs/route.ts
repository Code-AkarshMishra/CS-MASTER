import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pyqCreateSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");
    const examYear = searchParams.get("year");
    const examType = searchParams.get("type");
    const isImportant = searchParams.get("important");

    const whereClause: any = {};

    if (subjectId) whereClause.subjectId = subjectId;
    if (examYear) whereClause.examYear = parseInt(examYear);
    if (examType) whereClause.examType = examType;
    if (isImportant === "true") whereClause.isImportant = true;

    const pyqs = await prisma.pYQ.findMany({
      where: whereClause,
      include: {
        subject: {
          select: { code: true, title: true, slug: true, semesterId: true },
        },
      },
      orderBy: [{ examYear: "desc" }, { examType: "asc" }],
    });

    return NextResponse.json({ pyqs });
  } catch (error) {
    console.error("Fetch PYQs Error:", error);
    return NextResponse.json({ error: "Failed to fetch PYQs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = pyqCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues?.[0]?.message || "Invalid PYQ data" }, { status: 400 });
    }

    const pyq = await prisma.pYQ.create({
      data: parseResult.data,
    });

    return NextResponse.json({ pyq }, { status: 201 });
  } catch (error) {
    console.error("Create PYQ Error:", error);
    return NextResponse.json({ error: "Failed to create PYQ" }, { status: 500 });
  }
}
