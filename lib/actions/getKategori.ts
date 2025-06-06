import prisma from "../db/prisma";

export const getKategori = async () => {
  try {
    const data = await prisma.kategori.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal mengambil data kategori:", error);
    return [];
  }
};
