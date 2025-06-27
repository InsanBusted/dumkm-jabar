import { PrismaClient } from "@prisma/client";
import { getEmbedding } from "@/lib/embedding";
import { productIndex } from "@/lib/db/pinecone";

const prisma = new PrismaClient();

async function run() {
  const allProduk = await prisma.product.findMany({
    include: {
      umkm: true,
    },
  });

  console.log(`Total produk ditemukan: ${allProduk.length}`);

  for (const product of allProduk) {
    try {
      const combinedText = [
        `Produk: ${product.name}`,
        `Deskripsi: ${product.deskripsi}`,
        `Harga: Rp${product.price}`,
        `UMKM: ${product.umkm?.name || "-"}`,
      ].join("\n");

      const vector = await getEmbedding(combinedText);

      await productIndex.upsert([
        {
          id: product.id,
          values: vector,
          metadata: {
            namaProduk: product.name,
            harga: product.price,
            umkm: product.umkm?.name || "-",
            pageContent: combinedText,
          },
        },
      ]);

      console.log(`✅ Success: ${product.name}`);
    } catch (err) {
      console.error(`❌ Error importing ${product.id}:`, err);
    }
  }

  await prisma.$disconnect();
}

run();

