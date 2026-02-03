import { PrismaClient } from "@prisma/client";

const globalWithPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

let prisma: PrismaClient;

if (
  process.env.DATABASE_URL === undefined ||
  process.env.DATABASE_URL === ""
) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  console.warn(
    "[Prisma] DATABASE_URL not set, using mock Prisma client for build-time."
  );
  prisma = {} as PrismaClient;
} else {
  try {
    prisma =
      globalWithPrisma.prisma ||
      new PrismaClient({
        log: process.env.DEBUG_PRISMA === "true" ? ["query", "info"] : [],
      });
  } catch (error) {
    console.warn("[Prisma] Client initialization error (may be expected during build):", error instanceof Error ? error.message : error);
    prisma = {} as PrismaClient;
  }
}

if (process.env.NODE_ENV !== "production") {
  globalWithPrisma.prisma = prisma;
}

export default prisma;
export { prisma };
