import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const weekStartDate = searchParams.get("weekStartDate");

    if (!weekStartDate) {
      // Get current week's leaderboard
      const now = new Date();
      const first = now.getDate() - now.getDay(); // First day of week
      const monday = new Date(now.setDate(first));
      monday.setHours(0, 0, 0, 0);

      const leaderboard = await prisma.leaderboardEntry.findMany({
        where: {
          weekStartDate: {
            gte: monday,
            lt: new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              photo: true,
            },
          },
        },
        orderBy: { rank: "asc" },
      });

      return NextResponse.json(
        {
          success: true,
          data: leaderboard.map((entry: any) => ({
            rank: entry.rank,
            userId: entry.user.id,
            username: entry.user.username,
            photo: entry.user.photo,
            totalXP: entry.totalXP,
          })),
        },
        { status: 200 }
      );
    } else {
      // Get specific week's leaderboard
      const date = new Date(weekStartDate);
      const weekEnd = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

      const leaderboard = await prisma.leaderboardEntry.findMany({
        where: {
          weekStartDate: {
            gte: date,
            lt: weekEnd,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              photo: true,
            },
          },
        },
        orderBy: { rank: "asc" },
      });

      return NextResponse.json(
        {
          success: true,
          data: leaderboard.map((entry: any) => ({
            rank: entry.rank,
            userId: entry.user.id,
            username: entry.user.username,
            photo: entry.user.photo,
            totalXP: entry.totalXP,
          })),
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
