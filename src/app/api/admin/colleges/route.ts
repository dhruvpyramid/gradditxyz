import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple admin check - you should implement proper authentication
async function isAdmin(email: string): Promise<boolean> {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  return !!admin;
}

export async function POST(req: NextRequest) {
  try {
    const adminEmail = req.headers.get("x-admin-email");

    if (!adminEmail || !(await isAdmin(adminEmail))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, email, website, twitter, description, category, city, state } = await req.json();

    if (!name || !category || !city || !state) {
      return NextResponse.json(
        { error: "Name, category, city, and state are required" },
        { status: 400 }
      );
    }

    // Check if college already exists
    const existingCollege = await prisma.college.findUnique({
      where: { name },
    });

    if (existingCollege) {
      return NextResponse.json(
        { error: "College already exists" },
        { status: 400 }
      );
    }

    const college = await prisma.college.create({
      data: {
        name,
        email,
        website,
        twitter,
        description,
        category,
        city,
        state,
      },
    });

    return NextResponse.json(
      { success: true, college },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create college error:", error);
    return NextResponse.json(
      { error: "Failed to create college" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminEmail = req.headers.get("x-admin-email");

    if (!adminEmail || !(await isAdmin(adminEmail))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("id");

    if (!collegeId) {
      return NextResponse.json(
        { error: "College ID is required" },
        { status: 400 }
      );
    }

    await prisma.college.delete({
      where: { id: parseInt(collegeId) },
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete college error:", error);
    return NextResponse.json(
      { error: "Failed to delete college" },
      { status: 500 }
    );
  }
}
