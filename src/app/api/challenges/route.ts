import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  try {
    // Get today's challenges (static daily tasks)
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      take: 5, // Get today's 5 daily challenges
    });

    return NextResponse.json(
      { success: true, data: challenges },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


