import { createFormSchema } from "@/lib/validation/formDaftar";
import { z } from "zod";
import prisma from "../db/prisma";

export const addUmkm = async (data: z.infer<typeof createFormSchema>) => {
  try {
    // Cari lokasi di tabel Wilayah
    const wilayah = await prisma.wilayah.findFirst({
      where: { name: data.location },
    });

    if (!wilayah) {
      throw new Error("Wilayah tidak ditemukan");
    }

    // Simpan UMKM baru
    const newUmkm = await prisma.umkm.create({
      data: {
        name: data.name,
        ownerName: data.ownerName,
        category: data.category,
        description: data.description,
        locationId: wilayah.id,
        contact: data.contact,
        imageUrl: data.imageUrl,
      },
    });

    return { success: true, umkm: newUmkm };
  } catch (error) {
    console.error("Gagal menambahkan UMKM:", error);
    return { success: false, message: error.message };
  }
};
