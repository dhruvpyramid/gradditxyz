export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";
import { prisma } from "@/lib/prisma";

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
);

export async function POST(req: NextRequest) {
  try {
    const authToken = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the user with Privy
    const verifiedClaims = await privy.verifyAuthToken(authToken);
    const privyUserId = verifiedClaims.userId;

    if (!privyUserId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { collegeName, city, state } = await req.json();

    if (!collegeName || !city || !state) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get user's email from Privy
    const privyUser = await privy.getUserById(privyUserId);
    const email = privyUser.email?.address;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 }
      );
    }

    // Update user profile
    const user = await prisma.user.update({
      where: { hashedUserId: privyUserId },
      data: {
        collegeName,
        college: collegeName, // Also store in college field for backward compatibility
        city,
        state,
        profileCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        collegeName: user.collegeName,
        city: user.city,
        state: user.state,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    console.error("Complete profile error:", error);
    return NextResponse.json(
      { error: "Failed to complete profile" },
      { status: 500 }
    );
  }
}
