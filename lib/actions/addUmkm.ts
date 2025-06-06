"use server";

import { createFormSchema } from "@/lib/validation/formDaftar";
import prisma from "../db/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitUmkm(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name")?.toString() || "",
    ownerName: formData.get("ownerName")?.toString() || "",
    kategori: formData.get("kategori")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    contact: formData.get("contact")?.toString() || "",
    imageUrl: formData.get("imageUrl")?.toString() || "",
  };

  // Validasi data
  const validated = createFormSchema.safeParse(rawData);
  if (!validated.success) {
    const errors = validated.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  try {
    // Cari wilayah berdasarkan id (UUID)
    const wilayah = await prisma.wilayah.findUnique({
      where: { id: validated.data.location },
    });

    if (!wilayah) {
      return { success: false, error: "Wilayah tidak ditemukan" };
    }

    // Cari kategori berdasarkan id (UUID)
    const kategori = await prisma.kategori.findUnique({
      where: { id: validated.data.kategori },
    });

    if (!kategori) {
      return { success: false, error: "Kategori tidak ditemukan" };
    }

    // Buat data UMKM baru
    await prisma.umkm.create({
      data: {
        name: validated.data.name,
        ownerName: validated.data.ownerName,
        description: validated.data.description,
        locationId: wilayah.id,
        kategoriId: kategori.id,
        contact: validated.data.contact,
        imageUrl: validated.data.imageUrl,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("DB error:", error);
    return {
      success: false,
      error: "Gagal menambahkan UMKM, silakan hubungi admin.",
    };
  }
}
