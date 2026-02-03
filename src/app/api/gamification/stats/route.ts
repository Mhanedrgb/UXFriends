import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateTotalXP, calculateLevel } from "@/utils/gamification";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        badges: true,
        streak: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalXP = await calculateTotalXP(user.id);
    const currentLevel = calculateLevel(totalXP);

    return NextResponse.json(
      {
        success: true,
        data: {
          userId: user.id,
          totalXP,
          currentLevel,
          badges: user.badges,
          streakCount: user.streak?.currentStreak || 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




