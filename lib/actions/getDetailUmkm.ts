import prisma from "../db/prisma";


export async function getUmkmSlugByUserId(userId: string): Promise<string | null> {
  const umkm = await prisma.umkm.findFirst({
    where: { userId },
    select: { slug: true },
  });
  return umkm?.slug ?? null;
}