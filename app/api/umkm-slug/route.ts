import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();

//   console.log("UserId dari Clerk:", userId);

  if (!userId) return NextResponse.json({ slug: null });

  const umkm = await prisma.umkm.findFirst({
    where: { userId },
  });

//   console.log("UMKM dari DB:", umkm);

  return NextResponse.json({ slug: umkm?.slug ?? null });
}
