import prisma from "../db/prisma";

export const getWilayah = async () => {
  try {
    const data = await prisma.wilayah.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal mengambil data wilayah:", error);
    return [];
  }
};
