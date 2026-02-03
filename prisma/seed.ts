import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Seeding database with initial data...");

  // Clean existing data
  await prisma.leaderboardEntry.deleteMany({});
  await prisma.progressReport.deleteMany({});
  await prisma.quizAnswer.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  await prisma.quizOption.deleteMany({});
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
  await prisma.challenge.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Sections
  const section1 = await prisma.section.create({
    data: {
      title: "UX Fundamentals",icon: "🎯",
      order: 1,
    },
  });

  const section2 = await prisma.section.create({
    data: {
      title: "UI Design Essentials",icon: "🎨",
      order: 2,
    },
  });

  const section3 = await prisma.section.create({
    data: {
      title: "Advanced Interaction Design",icon: "✨",
      order: 3,
    },
  });

  // Section 1 Units
  const unit1_1 = await prisma.unit.create({
    data: {
      title: "Understanding Users",sectionId: section1.id,
      order: 1,
    },
  });

  const unit1_2 = await prisma.unit.create({
    data: {
      title: "User Research Methods",sectionId: section1.id,
      order: 2,
    },
  });

  const unit1_3 = await prisma.unit.create({
    data: {
      title: "Information Architecture",sectionId: section1.id,
      order: 3,
    },
  });

  // Lessons for Unit 1_1
  const lessons1_1 = [
    {
      title: "What is UX?",content:
        "UX design is the process of creating meaningful experiences for users. It involves understanding user needs, designing solutions, and measuring success.",
      order: 1,
      duration: 15,
    },
    {
      title: "Creating User Personas",content:
        "Personas are fictional characters representing key user segments. They help teams understand and empathize with actual users.",
      order: 2,
      duration: 20,
    },
    {
      title: "Empathy in Design",content:
        "Empathy is the foundation of great UX. Understanding user emotions, needs, and pain points is essential.",
      order: 3,
      duration: 18,
    },
  ];

  for (const lesson of lessons1_1) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        unitId: unit1_1.id,
      },
    });
  }

  // Lessons for Unit 1_2
  const lessons1_2 = [
    {
      title: "User Interviews",content:
        "Interviews are a primary research method for understanding user needs, motivations, and pain points.",
      order: 1,
      duration: 25,
    },
    {
      title: "Surveys and Questionnaires",content:
        "Surveys help you collect data from a large number of users quickly and efficiently.",
      order: 2,
      duration: 20,
    },
    {
      title: "Usability Testing",content:
        "Usability testing reveals how users interact with your designs and where they face challenges.",
      order: 3,
      duration: 30,
    },
  ];

  for (const lesson of lessons1_2) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        unitId: unit1_2.id,
      },
    });
  }

  // Lessons for Unit 1_3
  const lessons1_3 = [
    {
      title: "Site Maps and Wireframes",content:
        "Sitemaps and wireframes help organize content and plan user flows before visual design.",
      order: 1,
      duration: 22,
    },
    {
      title: "User Flows",content:
        "User flows show how users navigate through your application to accomplish their goals.",
      order: 2,
      duration: 20,
    },
    {
      title: "Navigation Design",content:
        "Good navigation helps users find what they need without confusion or frustration.",
      order: 3,
      duration: 18,
    },
  ];

  for (const lesson of lessons1_3) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        unitId: unit1_3.id,
      },
    });
  }

  // Section 2 Units
  const unit2_1 = await prisma.unit.create({
    data: {
      title: "Design Systems",sectionId: section2.id,
      order: 1,
    },
  });

  const unit2_2 = await prisma.unit.create({
    data: {
      title: "Typography and Color",sectionId: section2.id,
      order: 2,
    },
  });

  // Lessons for Unit 2_1
  const lessons2_1 = [
    {
      title: "Components and Patterns",content:
        "Design systems contain reusable components and patterns that maintain consistency across products.",
      order: 1,
      duration: 25,
    },
    {
      title: "Design Tokens",content:
        "Design tokens are the smallest, atomic elements of a design system. They include colors, spacing, typography, and more.",
      order: 2,
      duration: 20,
    },
  ];

  for (const lesson of lessons2_1) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        unitId: unit2_1.id,
      },
    });
  }

  // Lessons for Unit 2_2
  const lessons2_2 = [
    {
      title: "Typography Basics",content:
        "Good typography improves readability, establishes hierarchy, and creates visual harmony in design.",
      order: 1,
      duration: 18,
    },
    {
      title: "Color Theory",content:
        "Color theory helps designers choose palettes that evoke emotions and communicate meaning.",
      order: 2,
      duration: 22,
    },
  ];

  for (const lesson of lessons2_2) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        unitId: unit2_2.id,
      },
    });
  }

  // Create Challenges
  const challenges = [
    {
      title: "Redesign a Product Card",icon: "🎴",
      xpReward: 30,
    },
    {
      title: "Improve Signup Form",icon: "📝",
      xpReward: 30,
    },
    {
      title: "Choose Color Palette",icon: "🎨",
      xpReward: 30,
    },
    {
      title: "Design Navigation",icon: "🧭",
      xpReward: 30,
    },
    {
      title: "Create Wireframes",icon: "📐",
      xpReward: 30,
    },
  ];

  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: challenge,
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log("📊 Created:");
  console.log("   - 3 Sections");
  console.log("   - 5 Units");
  console.log("   - 11 Lessons");
  console.log("   - 5 Daily Challenges");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


