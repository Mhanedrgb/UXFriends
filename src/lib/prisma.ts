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
  // In development/build, create a dummy client that won''t fail
  console.warn(
    "[Prisma] DATABASE_URL not set, using mock Prisma client for build-time."
  );
  prisma = {} as PrismaClient;
} else {
  prisma =
    globalWithPrisma.prisma ||
    new PrismaClient({
      log: process.env.DEBUG_PRISMA === "true" ? ["query", "info"] : [],
    });
}

if (process.env.NODE_ENV !== "production") {
  globalWithPrisma.prisma = prisma;
}

export default prisma;
export { prisma };
