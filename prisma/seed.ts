import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Seeding database with initial data...");

  // Clean existing data
  await prisma.leaderboardEntry.deleteMany({});
  await prisma.progressReport.deleteMany({});
  await prisma.quizAnswer.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  // await prisma.quizOption.deleteMany({}); // Model removed in schema update
  await prisma.quizQuestion.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.note.deleteMany({});
  await prisma.lessonCompletion.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.streak.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.section.deleteMany({});
  // Challenges removed - model requires userId relationship
  // await prisma.challenge.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Sections
  const section1 = await prisma.section.create({
    data: {
      title: "UX Fundamentals",
      description: "Learn the basics of user experience design",
      icon: "🎯",
      order: 1,
    },
  });

  const section2 = await prisma.section.create({
    data: {
      title: "UI Design Essentials",
      description: "Master user interface design principles",
      icon: "🎨",
      order: 2,
    },
  });

  const section3 = await prisma.section.create({
    data: {
      title: "Advanced Interaction Design",
      description: "Create engaging interactive experiences",
      icon: "✨",
      order: 3,
    },
  });

  // Create Units and Lessons for Section 1
  const unit1 = await prisma.unit.create({
    data: {
      sectionId: section1.id,
      title: "Design Thinking Fundamentals",
      description: "Introduction to design thinking methodology",
      icon: "🧠",
      order: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      unitId: unit1.id,
      title: "What is Design Thinking?",
      description: "Understand the core principles of design thinking",
      order: 1,
    },
  });

  // Create a sample user
  const user = await prisma.user.create({
    data: {
      email: "demo@uxfriends.com",
      username: "demouser",
      password: "hashed_password_here", // In real app, this should be hashed
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("📊 Created:");
  console.log("   - 3 Sections");
  console.log("   - 1 Unit");
  console.log("   - 1 Lesson");
  console.log("   - 1 Sample User");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
