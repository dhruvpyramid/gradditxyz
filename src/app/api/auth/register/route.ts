import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Allow this specific non-.edu.in email in addition to .edu.in addresses
const OWNER_EMAIL = "dhruvstar00754@gmail.com";

// Helper function to extract college name from email domain
function extractCollegeFromEmail(email: string): string {
  const domain = email.split("@")[1].replace(".edu.in", "");
  // Convert domain to readable format (e.g., "iitd" -> "IIT Delhi")
  return domain.toUpperCase();
}

// Helper function to verify college name matches email domain
function verifyCollegeMatch(email: string, collegeName: string): boolean {
  const domain = email.split("@")[1].toLowerCase();
  const collegeSlug = collegeName.toLowerCase().replace(/\s+/g, "");
  
  // Check if domain contains college name or vice versa
  return domain.includes(collegeSlug) || collegeSlug.includes(domain.replace(".edu.in", ""));
}

export async function POST(req: NextRequest) {
  try {
    const { email, collegeName, city, state } = await req.json();

    const isOwner = email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
    if (!email || (!email.endsWith(".edu.in") && !isOwner)) {
      return NextResponse.json(
        { error: "Must use a valid .edu.in email address" },
        { status: 400 }
      );
    }

    if (!collegeName || !city || !state) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify college name matches email domain
    // Skip college-domain matching for owner email
    if (!isOwner && !verifyCollegeMatch(email, collegeName)) {
      return NextResponse.json(
        { error: "College name does not match your email domain. Please provide the correct college name." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: true, userId: existingUser.id, hashedUserId: existingUser.hashedUserId },
        { status: 200 }
      );
    }

    // Create hashed user ID for anonymity
    const secret = crypto.randomBytes(32).toString("hex");
    const hashedUserId = crypto
      .createHash("sha256")
      .update(email + secret)
      .digest("hex");

    // Get IP address
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

    // Extract college domain for storage (owner uses provided value)
    const college = isOwner ? collegeName.toUpperCase() : extractCollegeFromEmail(email);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        emailVerified: true,
        hashedUserId,
        college,
        collegeName,
        city,
        state,
        ipAddress,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        userId: user.id,
        hashedUserId: user.hashedUserId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
