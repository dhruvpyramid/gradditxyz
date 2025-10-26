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

    // Update user to mark onboarding as complete
    const user = await prisma.user.update({
      where: { hashedUserId: privyUserId },
      data: {
        hasSeenOnboarding: true,
      },
    });

    return NextResponse.json({
      success: true,
      hasSeenOnboarding: user.hasSeenOnboarding,
    });
  } catch (error) {
    console.error("Complete onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
