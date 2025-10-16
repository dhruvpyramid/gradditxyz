import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { isAdmin: false },
        { status: 200 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    return NextResponse.json(
      { isAdmin: !!admin },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { isAdmin: false },
      { status: 200 }
    );
  }
}
