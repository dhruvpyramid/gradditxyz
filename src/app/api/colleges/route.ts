import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "score";

    const where: any = {};

    if (state && state !== "all") {
      where.state = state;
    }

    if (category && category !== "all") {
      where.category = category;
    }

    const orderBy: any = {};
    if (sortBy === "score") {
      orderBy.score = "desc";
    } else if (sortBy === "name") {
      orderBy.name = "asc";
    } else if (sortBy === "latest") {
      orderBy.createdAt = "desc";
    }

    const colleges = await prisma.college.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        email: true,
        website: true,
        twitter: true,
        description: true,
        category: true,
        city: true,
        state: true,
        score: true,
        voteCount: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ colleges }, { status: 200 });
  } catch (error) {
    console.error("Get colleges error:", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
