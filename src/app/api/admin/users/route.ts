import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OWNER_EMAIL = "dhruvstar00754@gmail.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const adminEmail = req.headers.get("x-admin-email");

    // Check if requester is owner
    if (!adminEmail || adminEmail.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        collegeName: true,
        city: true,
        state: true,
        voteCount: true,
        lastVoteAt: true,
        isBlocked: true,
        blockReason: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
