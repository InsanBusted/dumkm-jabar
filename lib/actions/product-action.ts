"use server";

import prisma from "../db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { createProductSchema } from "../validation/formProduct";

export async function addProductAction(formData: FormData) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { success: false, error: "User belum login" };
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return { success: false, error: "Email user tidak ditemukan" };
  }

  // Cari user di DB
  const dbUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!dbUser) {
    return { success: false, error: "User tidak ditemukan di database" };
  }

  // Cari UMKM milik user, ambil yang pertama
  const userUmkm = await prisma.umkm.findFirst({
    where: { userId: dbUser.id },
  });
  if (!userUmkm) {
    return { success: false, error: "UMKM milik user tidak ditemukan" };
  }

  // Ambil data dari form, price di-convert ke number dulu
  const rawData = {
    name: formData.get("name")?.toString() || "",
    deskripsi: formData.get("deskripsi")?.toString() || "",
    price: Number(formData.get("price")?.toString() || 0),
    imageUrl: formData.get("imageUrl")?.toString() || undefined,
    umkmId: userUmkm.id,
  };

  // Validasi data
  const validated = createProductSchema.safeParse(rawData);
  if (!validated.success) {
    const errors = validated.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  // Simpan product ke DB
  try {
    await prisma.product.create({
      data: validated.data,
    });
    return { success: true };
  } catch (error) {
    console.error("DB error:", error);
    return {
      success: false,
      error: "Gagal menambahkan produk, silakan hubungi admin.",
    };
  }
}

export async function getProduct() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return [];
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return [];
  }

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!dbUser) {
    return [];
  }

  const userUmkm = await prisma.umkm.findFirst({
    where: { userId: dbUser.id },
  });
  if (!userUmkm) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      umkmId: userUmkm.id,
    },
    include: {
      umkm: true, 
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
