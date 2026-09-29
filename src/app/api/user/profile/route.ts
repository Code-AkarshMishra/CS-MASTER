import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        currentYear: true,
        currentSemester: true,
        specialization: true,
        bio: true,
        streakDays: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            bookmarks: true,
            progress: true,
          },
        },
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { name, currentYear, currentSemester, specialization, bio, oldPassword, newPassword } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (currentYear) updateData.currentYear = parseInt(currentYear);
    if (currentSemester) updateData.currentSemester = parseInt(currentSemester);
    if (specialization !== undefined) updateData.specialization = specialization;
    if (bio !== undefined) updateData.bio = bio;

    if (newPassword) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user?.passwordHash) {
        return NextResponse.json({ error: "Cannot change password for OAuth account" }, { status: 400 });
      }

      if (!oldPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      updateData.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        currentYear: true,
        currentSemester: true,
        specialization: true,
        bio: true,
      },
    });

    return NextResponse.json({ user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
