import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get top leaderboard entries sorted by rank
    const leaderboard = await prisma.leaderboardEntry.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            photo: true,
          },
        },
      },
      orderBy: { rank: 'asc' },
      take: 100,
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("[Leaderboard API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
