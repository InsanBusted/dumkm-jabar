/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "../db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { createProductSchema } from "../validation/formProduct";
// import { DataProduct } from "@/app/type/DataProduct";
import slugify from "slugify";

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

  const slug = slugify(validated.data.name, { lower: true, strict: true });

  const existingSlug = await prisma.product.findUnique({
    where: { slug },
  });
  if (existingSlug) {
    return {
      success: false,
      error: "Nama Produk sudah digunakan, mohon gunakan nama lain.",
    };
  }
  // Simpan product ke DB
  try {
    await prisma.product.create({
      data: {
        ...validated.data,
        slug,
      },
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

export async function getAllProduct() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        umkm: true,
      },
    });


    return products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      deskripsi: product.deskripsi,
      price: product.price,
      imageUrl: product.imageUrl ?? "",
      umkm: product.umkm.name,
      createdAt: product.createdAt,
    }));
  } catch (error) {
    console.error("Prisma Error:", JSON.stringify(error, null, 2));
    return [];
  }
}

export async function updateProductAction(id: string, data: FormData) {
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.get("name") as string,
        deskripsi: data.get("deskripsi") as string,
        price: parseFloat(data.get("price") as string),
        imageUrl: data.get("imageUrl") as string,
      },
    });

    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: "Gagal update produk" };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return { success: false, error: "Email tidak ditemukan" };
    }

    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      return { success: false, error: "User tidak ditemukan" };
    }

    const userUmkm = await prisma.umkm.findFirst({
      where: { userId: dbUser.id },
    });
    if (!userUmkm) {
      return { success: false, error: "UMKM tidak ditemukan" };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product || product.umkmId !== userUmkm.id) {
      return {
        success: false,
        error: "Produk tidak ditemukan atau bukan milik Anda",
      };
    }

    await prisma.product.delete({ where: { id: productId } });

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return { success: false, error: "Terjadi kesalahan server" };
  }
}
