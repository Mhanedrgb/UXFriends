import PrismaPkg from "@prisma/client";

const RawPrismaClient: any = (PrismaPkg as any).PrismaClient ?? (PrismaPkg as any).default ?? PrismaPkg;
const prisma = (globalThis as any).__prismaClient ?? new RawPrismaClient();

if (process.env.NODE_ENV !== "production") (globalThis as any).__prismaClient = prisma;

export default prisma;
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
