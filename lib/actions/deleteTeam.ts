"use server";

import prisma from "../db/prisma";

export async function deleteUmkm(id: string) {
  try {
    await prisma.umkm.delete({
      where: { id },
    });

    return { success: true };
  } catch (err) {
    console.error("Gagal menghapus UMKM:", err);
    return { success: false, error: "Gagal menghapus data UMKM." };
  }
}
