import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserLearningProgress, completeLesson } from "@/utils/learning";
import { addXP, checkAndAwardBadges, updateStreak, XP_REWARDS } from "@/utils/gamification";
import { NextRequest, NextResponse } from "next/server";

// GET all sections with user progress
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = await getUserLearningProgress(user.id);

    return NextResponse.json(
      { success: true, data: progress },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
