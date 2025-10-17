import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OWNER_EMAIL = "dhruvstar00754@gmail.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const adminEmail = req.headers.get("x-admin-email");
    const { userEmail } = await req.json();

    // Check if requester is owner
    if (!adminEmail || adminEmail.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Reset lastVoteAt to allow immediate voting
    const user = await prisma.user.update({
      where: { email: userEmail },
      data: {
        lastVoteAt: null,
        voteCount: 0,
      },
      select: {
        email: true,
        voteCount: true,
        lastVoteAt: true,
      },
    });

    return NextResponse.json(
      { 
        success: true,
        message: "Vote limit reset successfully",
        user 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset votes error:", error);
    return NextResponse.json(
      { error: "Failed to reset vote limit" },
      { status: 500 }
    );
  }
}
