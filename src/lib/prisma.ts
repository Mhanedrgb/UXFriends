import PrismaPkg from "@prisma/client";

const PrismaClientCtor: any = (PrismaPkg as any).PrismaClient ?? (PrismaPkg as any).default ?? PrismaPkg;

const prismaClientSingleton = () => new PrismaClientCtor();

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientSingleton };

const prisma: PrismaClientSingleton = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
export default prisma;
