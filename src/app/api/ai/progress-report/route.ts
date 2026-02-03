import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  generateProgressReport,
  getPersonalizedRecommendations,
  generateDynamicQuiz,
} from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

// Generate progress report
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

    const { type } = await req.json();

    if (!type || !["weekly", "monthly"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid report type" },
        { status: 400 }
      );
    }

    const report = await generateProgressReport(user.id, type);

    return NextResponse.json(
      { success: true, data: report },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
