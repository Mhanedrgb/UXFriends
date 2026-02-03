import { prisma } from "@/lib/prisma";

// Check if section is unlocked
export const isSectionUnlocked = async (
  userId: string,
  sectionId: string
): Promise<boolean> => {
  const section = await prisma.section.findUnique({
    where: { id: sectionId },
  });

  if (!section) return false;

  // First section is always unlocked
  if (section.order === 1) return true;

  // Check if all units in the previous section are completed
  const previousSection = await prisma.section.findFirst({
    where: { order: section.order - 1 },
    include: { units: { include: { lessons: true } } },
  });

  if (!previousSection) return false;

  for (const unit of previousSection.units) {
    const completedLessons = await prisma.lessonCompletion.count({
      where: {
        userId,
        lessonId: {
          in: unit.lessons.map((l) => l.id),
        },
      },
    });

    if (completedLessons !== unit.lessons.length) {
      return false;
    }
  }

  return true;
};

// Check if unit is unlocked
export const isUnitUnlocked = async (
  userId: string,
  unitId: string
): Promise<boolean> => {
  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
  });

  if (!unit) return false;

  // Check if section is unlocked first
  const sectionUnlocked = await isSectionUnlocked(userId, unit.sectionId);
  if (!sectionUnlocked) return false;

  // First unit in section is always unlocked (if section is unlocked)
  const firstUnitInSection = await prisma.unit.findFirst({
    where: { sectionId: unit.sectionId },
    orderBy: { order: "asc" },
  });

  if (firstUnitInSection?.id === unit.id) return true;

  // Check if all lessons in previous unit are completed
  const previousUnit = await prisma.unit.findFirst({
    where: {
      sectionId: unit.sectionId,
      order: unit.order - 1,
    },
    include: { lessons: true },
  });

  if (!previousUnit) return false;

  const completedLessons = await prisma.lessonCompletion.count({
    where: {
      userId,
      lessonId: {
        in: previousUnit.lessons.map((l) => l.id),
      },
    },
  });

  return completedLessons === previousUnit.lessons.length;
};

// Check if lesson is unlocked
export const isLessonUnlocked = async (
  userId: string,
  lessonId: string
): Promise<boolean> => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { unit: true },
  });

  if (!lesson) return false;

  // Check if unit is unlocked first
  const unitUnlocked = await isUnitUnlocked(userId, lesson.unitId);
  if (!unitUnlocked) return false;

  // First lesson in unit is always unlocked (if unit is unlocked)
  const firstLessonInUnit = await prisma.lesson.findFirst({
    where: { unitId: lesson.unitId },
    orderBy: { order: "asc" },
  });

  if (firstLessonInUnit?.id === lesson.id) return true;

  // Check if previous lesson is completed
  const previousLesson = await prisma.lesson.findFirst({
    where: {
      unitId: lesson.unitId,
      order: lesson.order - 1,
    },
  });

  if (!previousLesson) return false;

  const completion = await prisma.lessonCompletion.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId: previousLesson.id,
      },
    },
  });

  return !!completion;
};

// Complete a lesson
export const completeLesson = async (
  userId: string,
  lessonId: string
): Promise<boolean> => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) return false;

  // Check if lesson is unlocked
  const unlocked = await isLessonUnlocked(userId, lessonId);
  if (!unlocked) return false;

  // Check if already completed
  const existing = await prisma.lessonCompletion.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });

  if (existing) return true;

  // Mark as complete
  await prisma.lessonCompletion.create({
    data: {
      userId,
      lessonId,
    },
  });

  return true;
};

// Get user's learning progress
export const getUserLearningProgress = async (userId: string) => {
  const sections = await prisma.section.findMany({
    include: {
      units: {
        include: {
          lessons: true,
        },
      },
    },
    orderBy: { order: "asc" },
  });

  const progressData = await Promise.all(
    sections.map(async (section) => {
      const isUnlocked = await isSectionUnlocked(userId, section.id);

      const unitProgress = await Promise.all(
        section.units.map(async (unit) => {
          const unitUnlocked = await isUnitUnlocked(userId, unit.id);

          const completedLessons = await prisma.lessonCompletion.count({
            where: {
              userId,
              lessonId: {
                in: unit.lessons.map((l) => l.id),
              },
            },
          });

          const lessonProgress = await Promise.all(
            unit.lessons.map(async (lesson) => {
              const lessonUnlocked = await isLessonUnlocked(userId, lesson.id);
              const completed = await prisma.lessonCompletion.findUnique({
                where: {
                  userId_lessonId: {
                    userId,
                    lessonId: lesson.id,
                  },
                },
              });

              return {
                ...lesson,
                isUnlocked: lessonUnlocked,
                isCompleted: !!completed,
              };
            })
          );

          return {
            ...unit,
            isUnlocked: unitUnlocked,
            lessons: lessonProgress,
            completionPercentage: Math.round(
              (completedLessons / unit.lessons.length) * 100
            ),
          };
        })
      );

      const totalLessons = section.units.reduce(
        (sum, u) => sum + u.lessons.length,
        0
      );
      const completedLessons = await prisma.lessonCompletion.count({
        where: {
          userId,
          lesson: {
            unit: {
              sectionId: section.id,
            },
          },
        },
      });

      return {
        ...section,
        isUnlocked,
        units: unitProgress,
        completionPercentage: totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
      };
    })
  );

  return progressData;
};
