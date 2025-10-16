import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OWNER_EMAIL = "dhruvstar00754@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { isAdmin: false },
        { status: 200 }
      );
    }

    // Owner bypass (works even if DB is down)
    if (email.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      return NextResponse.json({ isAdmin: true }, { status: 200 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    return NextResponse.json({ isAdmin: !!admin }, { status: 200 });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { isAdmin: false },
      { status: 200 }
    );
  }
}
