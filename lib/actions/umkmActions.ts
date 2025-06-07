"use server";

import prisma from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function updateUmkmStatus(
  umkmId: string,
  status: "PENDING" | "APPROVED" | "REJECTED"
) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) throw new Error("Email user tidak ditemukan");

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    throw new Error("Forbidden: you don't have permission");
  }

  const updatedUmkm = await prisma.umkm.update({
    where: { id: umkmId },
    data: { status },
  });

  return updatedUmkm;
}
