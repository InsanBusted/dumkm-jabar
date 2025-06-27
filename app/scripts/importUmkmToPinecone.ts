import { PrismaClient } from "@prisma/client";
import { getEmbedding } from "@/lib/embedding";
import { umkmIndex } from "@/lib/db/pinecone";

const prisma = new PrismaClient();

async function run() {
  const allUmkm = await prisma.umkm.findMany({
    include: {
      kategori: true,
      location: true,
    },
  });

  console.log(`Total UMKM ditemukan: ${allUmkm.length}`);

  for (const umkm of allUmkm) {
    try {
      const combinedText = [
        `UMKM: ${umkm.name}`,
        `Pemilik: ${umkm.ownerName}`,
        `Deskripsi: ${umkm.description}`,
        `Kategori: ${umkm.kategori?.name || "-"}`,
        `Wilayah: ${umkm.location?.name || "-"}`,
        `Kontak: ${umkm.contact}`,
      ].join("\n");

      const vector = await getEmbedding(combinedText);

      await umkmIndex.upsert([
        {
          id: umkm.id,
          values: vector,
          metadata: {
            namaUMKM: umkm.name,
            pemilik: umkm.ownerName,
            lokasi: umkm.location?.name || "-",
            kategori: umkm.kategori?.name || "-",
            pageContent: combinedText,
          },
        },
      ]);

      console.log(`✅ Success: ${umkm.name}`);
    } catch (err) {
      console.error(`❌ Error importing ${umkm.id}:`, err);
    }
  }

  await prisma.$disconnect();
}

run();
