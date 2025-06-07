import prisma from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";

type EditUmkmData = {
  name?: string;
  ownerName?: string;
  description?: string;
  locationId?: string;
  kategoriId?: string;
  contact?: string;
  imageUrl?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
};

export async function editUmkmAction(umkmId: string, data: EditUmkmData) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const isAdmin = user.publicMetadata.role === "ADMIN";

  if (!isAdmin) {
    // Non-admin tidak boleh update status
    delete data.status;
  }

  const updated = await prisma.umkm.update({
    where: { id: umkmId },
    data,
  });

  return updated;
}
