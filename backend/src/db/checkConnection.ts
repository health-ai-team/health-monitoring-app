import prisma from "./prisma";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection failed:", (error as Error).message);
    return false;
  }
}
