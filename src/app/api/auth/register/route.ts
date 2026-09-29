import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { validateRegistrationEmail } from "@/lib/disposableEmailBlocker";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    
    // 1. Rate limiting check (Max 5 registration requests per minute per IP)
    const rateCheck = checkRateLimit(`register_${ip}`, 5, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: `Too many registration attempts. Please retry in ${rateCheck.resetTime} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Zod Schema Validation
    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues?.[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }

    const { name, email, password, currentYear, currentSemester, specialization } = parseResult.data;
    const cleanEmail = email.trim().toLowerCase();

    // 3. Strict Server-side Disposable/Temp Email Domain Validation
    const emailValidation = validateRegistrationEmail(cleanEmail);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.reason },
        { status: 400 }
      );
    }

    // 4. Duplicate Account Check
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    // 5. Secure Password Hashing
    const passwordHash = await bcrypt.hash(password, 12);

    // 6. Create User Record
    const newUser = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        role: "STUDENT",
        currentYear: currentYear || 1,
        currentSemester: currentSemester || 1,
        specialization: specialization || null,
        emailVerifiedAt: new Date(), // verified upon valid registration flow
        image: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        currentYear: true,
        currentSemester: true,
        specialization: true,
        createdAt: true,
      },
    });

    // 7. Audit Log
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: "USER_REGISTER",
        details: `User registered successfully with verified email: ${cleanEmail}`,
        ipAddress: ip,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful! You can now log in with your credentials.",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
