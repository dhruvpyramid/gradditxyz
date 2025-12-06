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
    let verifiedClaims;
    try {
      verifiedClaims = await privy.verifyAuthToken(authToken);
    } catch (error) {
      console.error("Privy token verification failed:", error);
      return NextResponse.json(
        { error: "Session expired. Please login again." },
        { status: 401 }
      );
    }
    const privyUserId = verifiedClaims.userId;

    if (!privyUserId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { collegeName, city, state, email: fallbackEmail } = await req.json();

    const email =
      (verifiedClaims as any)?.email?.address ||
      (verifiedClaims as any)?.email ||
      fallbackEmail;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 }
      );
    }

    if (!collegeName || !city || !state) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Upsert user profile using the verified email. If the user doesn't exist yet, create it now
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        collegeName,
        college: collegeName,
        city,
        state,
        profileCompleted: true,
      },
      create: {
        email,
        emailVerified: true,
        hashedUserId: privyUserId,
        collegeName,
        college: collegeName,
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
