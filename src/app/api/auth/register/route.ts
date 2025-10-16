import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

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

    if (!email || !email.endsWith(".edu.in")) {
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
    if (!verifyCollegeMatch(email, collegeName)) {
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
        { error: "User already exists" },
        { status: 400 }
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

    // Extract college domain for storage
    const college = extractCollegeFromEmail(email);

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
