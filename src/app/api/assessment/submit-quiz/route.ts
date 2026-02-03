import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addXP, checkAndAwardBadges, XP_REWARDS } from "@/utils/gamification";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


// Submit quiz attempt
export async function POST(req: NextRequest) {
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

    const { quizId, answers } = await req.json();

    if (!quizId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Calculate score
    let correctAnswers = 0;
    const evaluatedAnswers = answers.map((answer: any, index: number) => {
      const question = quiz.questions[index];
      let isCorrect = false;

      // Check if answer matches the correct answer
      if (question && question.correct) {
        isCorrect = question.correct === answer.selectedOption;
      }

      if (isCorrect) correctAnswers++;

      return {
        questionId: question?.id,
        answer: answer.selectedOption,
        isCorrect,
      };
    });

    const score = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );
    const passed = score >= 70;

    // Create quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        total: quiz.questions.length,
        answers: {
          create: evaluatedAnswers.map((ans: any) => ({
            questionId: ans.questionId,
            answer: ans.answer,
            isCorrect: ans.isCorrect,
          })),
        },
      },
    });

    // Award XP if passed
    if (passed) {
      const xpAmount = quiz.lessonId ? XP_REWARDS.LESSON : XP_REWARDS.CHALLENGE;

      await addXP(user.id, {
        amount: xpAmount,
        reason: "unit",
        activityId: quizId,
      });

      await checkAndAwardBadges(user.id);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          attemptId: attempt.id,
          score,
          passed,
          message: passed
            ? `Great! You passed with ${score}% 🎉`
            : `You need 70% to pass. Try again!`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




