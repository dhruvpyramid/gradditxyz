import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Calculate vote weight based on user's college/state and target college
function calculateWeight(
  userCollege: string,
  userState: string,
  targetCollegeName: string,
  targetState: string
): number {
  // Same college: 1.5x weight
  if (userCollege.toLowerCase() === targetCollegeName.toLowerCase()) {
    return 1.5;
  }
  // Same state: 1.2x weight
  if (userState === targetState) {
    return 1.2;
  }
  // Different state: 1.0x weight
  return 1.0;
}

// Anti-manipulation: Check for suspicious voting patterns
async function checkSuspiciousActivity(userId: string, ipAddress: string): Promise<{ suspicious: boolean; reason?: string }> {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  // Check votes from same IP in last hour
  const recentVotesFromIP = await prisma.vote.count({
    where: {
      ipAddress,
      createdAt: {
        gte: oneHourAgo,
      },
    },
  });

  if (recentVotesFromIP >= 5) {
    return { suspicious: true, reason: "Too many votes from this IP address in the last hour" };
  }

  // Check if user is voting too quickly
  const userRecentVotes = await prisma.vote.findMany({
    where: {
      userId,
      createdAt: {
        gte: oneHourAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
  });

  if (userRecentVotes.length >= 2) {
    const timeDiff = userRecentVotes[0].createdAt.getTime() - userRecentVotes[1].createdAt.getTime();
    if (timeDiff < 10000) { // Less than 10 seconds between votes
      return { suspicious: true, reason: "Voting too quickly" };
    }
  }

  return { suspicious: false };
}

export async function POST(req: NextRequest) {
  try {
    const { email, collegeId, voteType } = await req.json();

    if (!email || !collegeId || (voteType !== 1 && voteType !== -1)) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { error: `You are blocked from voting. Reason: ${user.blockReason}` },
        { status: 403 }
      );
    }

    // Check vote limit (5 votes max)
    if (user.voteCount >= 5) {
      return NextResponse.json(
        { error: "You have reached the maximum vote limit (5 votes)" },
        { status: 403 }
      );
    }

    // Get college
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    // Check if user already voted for this college
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_collegeId: {
          userId: user.id,
          collegeId,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted for this college" },
        { status: 400 }
      );
    }

    // Get IP address
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

    // Check for suspicious activity
    const suspiciousCheck = await checkSuspiciousActivity(user.id, ipAddress);
    if (suspiciousCheck.suspicious) {
      // Block user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isBlocked: true,
          blockReason: suspiciousCheck.reason,
        },
      });

      return NextResponse.json(
        { error: `Suspicious activity detected: ${suspiciousCheck.reason}. Your account has been blocked.` },
        { status: 403 }
      );
    }

    // Calculate vote weight
    const weight = calculateWeight(
      user.collegeName,
      user.state,
      college.name,
      college.state
    );

    // Create vote and update college score in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create vote
      const vote = await tx.vote.create({
        data: {
          userId: user.id,
          collegeId,
          voteType,
          weight,
          ipAddress,
        },
      });

      // Update college score
      const scoreChange = weight * voteType;
      const updatedCollege = await tx.college.update({
        where: { id: collegeId },
        data: {
          score: {
            increment: scoreChange,
          },
          voteCount: {
            increment: 1,
          },
        },
      });

      // Update user vote count
      await tx.user.update({
        where: { id: user.id },
        data: {
          voteCount: {
            increment: 1,
          },
          lastVoteAt: new Date(),
        },
      });

      return { vote, college: updatedCollege };
    });

    return NextResponse.json(
      { 
        success: true, 
        vote: result.vote,
        college: result.college,
        remainingVotes: 5 - (user.voteCount + 1)
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Failed to submit vote" },
      { status: 500 }
    );
  }
}
