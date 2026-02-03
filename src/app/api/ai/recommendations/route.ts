import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPersonalizedRecommendations } from "@/lib/ai";
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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const recommendations = await getPersonalizedRecommendations(user.id);

    return NextResponse.json(
      { success: true, data: recommendations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


