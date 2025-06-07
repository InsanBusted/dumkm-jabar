"use server";

import { createFormSchema } from "@/lib/validation/formDaftar";
import prisma from "../db/prisma";
import slugify from "slugify";
import { currentUser } from "@clerk/nextjs/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitUmkm(prevState: any, formData: FormData) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { success: false, error: "User belum login" };
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return { success: false, error: "Email user tidak ditemukan" };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!dbUser) {
    return { success: false, error: "User tidak ditemukan di database" };
  }

  const rawData = {
    name: formData.get("name")?.toString() || "",
    ownerName: formData.get("ownerName")?.toString() || "",
    kategori: formData.get("kategori")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    contact: formData.get("contact")?.toString() || "",
    imageUrl: formData.get("imageUrl")?.toString() || "",
  };

  const validated = createFormSchema.safeParse(rawData);
  if (!validated.success) {
    const errors = validated.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  try {
    const wilayah = await prisma.wilayah.findUnique({
      where: { id: validated.data.location },
    });
    if (!wilayah) {
      return { success: false, error: "Wilayah tidak ditemukan" };
    }

    const kategori = await prisma.kategori.findUnique({
      where: { id: validated.data.kategori },
    });
    if (!kategori) {
      return { success: false, error: "Kategori tidak ditemukan" };
    }

    // Cek apakah user sudah punya UMKM
    const existingUmkmForUser = await prisma.umkm.findFirst({
      where: { userId: dbUser.id },
    });
    if (existingUmkmForUser) {
      return {
        success: false,
        error: "User hanya bisa mendaftarkan 1 UMKM.",
      };
    }

    const slug = slugify(validated.data.name, { lower: true, strict: true });

    const existingSlug = await prisma.umkm.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      return {
        success: false,
        error: "Nama UMKM sudah digunakan, mohon gunakan nama lain.",
      };
    }

    await prisma.umkm.create({
      data: {
        name: validated.data.name,
        slug,
        ownerName: validated.data.ownerName,
        description: validated.data.description,
        locationId: wilayah.id,
        kategoriId: kategori.id,
        contact: validated.data.contact,
        imageUrl: validated.data.imageUrl || null,
        userId: dbUser.id,
        status: "PENDING",
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
