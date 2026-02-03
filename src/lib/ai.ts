import { OpenAI } from "openai";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate progress report
export const generateProgressReport = async (
  userId: string,
  reportType: "weekly" | "monthly"
) => {
  try {
    // Get user's recent learning data
    const userHistory = await prisma.xPHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const completedLessons = await prisma.lessonCompletion.count({
      where: { userId },
    });

    const badges = await prisma.badge.findMany({
      where: { userId },
    });

    const streak = await prisma.streak.findUnique({
      where: { userId },
    });

    // Create prompt for AI
    const prompt = `
    Analyze the following UX/UI learning progress and provide a comprehensive report:
    
    Report Type: ${reportType}
    Completed Lessons: ${completedLessons}
    Badges Earned: ${badges.length} (${badges.map((b: any) => b.name).join(", ")})
    Current Streak: ${streak?.currentStreak || 0} days
    Recent Activities: ${userHistory.map((h: any) => `${h.reason} (+${h.amount}XP)`).join(", ")}
    
    Please provide:
    1. Strengths: What the user is doing well
    2. Weaknesses: Areas for improvement
    3. Recommendations: Personalized suggestions for better learning
    
    Format the response as JSON with keys: strengths, weaknesses, recommendations
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content);

    // Save report
    const report = await prisma.progressReport.create({
      data: {
        userId,
        summary: parsed.strengths ? `${parsed.strengths} | Weaknesses: ${parsed.weaknesses}` : parsed.summary || "Report generated",
        recommendations: parsed.recommendations || "Keep practicing!",
      },
    });

    return report;
  } catch (error) {
    console.error("Error generating progress report:", error);
    throw error;
  }
};

// Generate dynamic quiz
export const generateDynamicQuiz = async (topic: string, difficulty: string) => {
  try {
    const prompt = `
    Generate a quiz about "${topic}" at ${difficulty} level for a UX/UI design learner.
    
    Create 5 multiple choice questions in JSON format:
    {
      "questions": [
        {
          "question": "Question text?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0
        }
      ]
    }
    
    Make it educational and relevant to UX/UI design.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content);

    return parsed.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

// Get personalized recommendations
export const getPersonalizedRecommendations = async (userId: string) => {
  try {
    const completedSections = await prisma.lessonCompletion.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            unit: {
              include: {
                section: true,
              },
            },
          },
        },
      },
    });

    const sections = [
      ...new Set(
        completedSections.map((c: any) => c.lesson.unit.section.title)
      ),
    ];

    const prompt = `
    A UX/UI design student has completed the following sections: ${sections.join(", ")}
    
    Based on their learning path, provide personalized recommendations for:
    1. Next topics to explore
    2. Project ideas
    3. Skills to focus on
    4. Resources to study
    
    Be specific and actionable. Format as a JSON object with these keys.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "{}";
    return JSON.parse(content);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
};
