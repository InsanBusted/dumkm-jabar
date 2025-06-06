"use server";

import { DataUmkm } from "@/app/type/DataUmkm";
import prisma from "../db/prisma";

export async function getAllUmkm(): Promise<DataUmkm[]> {
  try {
    const umkmList = await prisma.umkm.findMany({
      include: {
        location: true,
        kategori: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return umkmList.map((umkm) => ({
      id: umkm.id,
      name: umkm.name,
      slug: umkm.slug,
      ownerName: umkm.ownerName,
      description: umkm.description,
      locationId: umkm.locationId,
      kategoriId: umkm.kategoriId,
      contact: umkm.contact,
      imageUrl: umkm.imageUrl,
      status: umkm.status,
      createdAt: umkm.createdAt,
      updatedAt: umkm.updatedAt,
      lokasi: {
        id: umkm.location.id,
        name: umkm.location.name, // pastikan `name` ada di model `Wilayah`
      },
      kategori: {
        id: umkm.kategori.id,
        name: umkm.kategori.name, // pastikan `name` ada di model `Kategori`
      },
    }));
  } catch (error) {
    console.error("Gagal mengambil data UMKM:", error);
    return [];
  }
}

export async function getUmkm(slug: string) {
  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    include: { kategori: true, location: true },
  });

  if (!umkm) throw new Error("UMKM not found");

  return umkm;
}
