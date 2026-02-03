import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { completeLesson } from "@/utils/learning";
import { addXP, checkAndAwardBadges, updateStreak, XP_REWARDS } from "@/utils/gamification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
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

    // Complete lesson
    const completed = await completeLesson(user.id, lessonId);

    if (!completed) {
      return NextResponse.json(
        { error: "Could not complete lesson" },
        { status: 400 }
      );
    }

    // Award XP
    await addXP(user.id, {
      amount: XP_REWARDS.LESSON,
      reason: "lesson",
      activityId: lessonId,
    });

    // Update streak
    await updateStreak(user.id);

    // Check for badges
    await checkAndAwardBadges(user.id);

    return NextResponse.json(
      { success: true, message: `Completed lesson! Earned ${XP_REWARDS.LESSON} XP` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET lesson details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
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

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        unit: {
          include: { section: true },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const completion = await prisma.lessonCompletion.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...lesson,
          isCompleted: !!completion,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
