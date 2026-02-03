import { prisma } from "@/lib/prisma";

// XP Reward constants
export const XP_REWARDS = {
  LESSON: 10,
  UNIT: 50,
  SECTION: 100,
  CHALLENGE: 30,
  WEEKLY_WIN: 70,
  DAILY_STREAK: 5,
  LONG_STREAK: 15,
};

// Calculate level from XP
export const calculateLevel = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 600) return 3;
  if (xp < 1000) return 4;
  if (xp < 1500) return 5;
  return Math.floor((xp / 100) * 0.5) + 1;
};

// Calculate total XP for user
export const calculateTotalXP = async (userId: string): Promise<number> => {
  const history = await prisma.xPHistory.findMany({
    where: { userId },
  });

  return history.reduce((sum, entry) => sum + entry.amount, 0);
};

// Add XP to user
export const addXP = async (
  userId: string,
  data: {
    amount: number;
    reason: string;
    activityId?: string;
  }
): Promise<void> => {
  await prisma.xPHistory.create({
    data: {
      userId,
      amount: data.amount,
      reason: data.reason,
      activityId: data.activityId,
    },
  });
};

// Update streak
export const updateStreak = async (userId: string): Promise<number> => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const streak = await prisma.streak.findUnique({
    where: { userId },
  });

  if (!streak) {
    const newStreak = await prisma.streak.create({
      data: {
        userId,
        currentStreak: 1,
        lastActivityDate: today,
      },
    });
    return newStreak.currentStreak;
  }

  const lastActivity = new Date(streak.lastActivityDate);
  const lastActivityDate = new Date(
    lastActivity.getFullYear(),
    lastActivity.getMonth(),
    lastActivity.getDate()
  );

  if (lastActivityDate.getTime() === today.getTime()) {
    return streak.currentStreak;
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const newCount =
    lastActivityDate.getTime() === yesterday.getTime()
      ? streak.currentStreak + 1
      : 1;

  const updated = await prisma.streak.update({
    where: { userId },
    data: {
      currentStreak: newCount,
      lastActivityDate: today,
    },
  });

  return updated.currentStreak;
};

// Check and award badges
export const checkAndAwardBadges = async (userId: string): Promise<void> => {
  const totalXP = await calculateTotalXP(userId);
  const streak = await prisma.streak.findUnique({
    where: { userId },
  });

  const existingBadges = await prisma.badge.findMany({
    where: { userId },
  });

  const existingBadgeNames = existingBadges.map((b) => b.name);

  if (totalXP >= 100 && !existingBadgeNames.includes("Bronze")) {
    await prisma.badge.create({
      data: {
        userId,
        name: "Bronze",
        icon: "",
      },
    });
  }

  if (totalXP >= 500 && !existingBadgeNames.includes("Silver")) {
    await prisma.badge.create({
      data: {
        userId,
        name: "Silver",
        icon: "",
      },
    });
  }

  if (totalXP >= 1000 && !existingBadgeNames.includes("Gold")) {
    await prisma.badge.create({
      data: {
        userId,
        name: "Gold",
        icon: "",
      },
    });
  }

  if (streak && streak.currentStreak >= 7 && !existingBadgeNames.includes("Fire")) {
    await prisma.badge.create({
      data: {
        userId,
        name: "Fire",
        icon: "",
      },
    });
  }
};
