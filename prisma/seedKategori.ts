import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const kategoriUMKM = [
    { name: "Kuliner" },
    { name: "Fashion" },
    { name: "Kriya & Kerajinan" },
    { name: "Pertanian" },
    { name: "Peternakan" },
    { name: "Perikanan" },
    { name: "Jasa Kebersihan" },
    { name: "Salon & Kecantikan" },
    { name: "Laundry" },
    { name: "Toko Kelontong" },
    { name: "Elektronik & Servis" },
    { name: "Percetakan" },
    { name: "Fotografi" },
    { name: "Event Organizer" },
    { name: "Bengkel Motor/Mobil" },
    { name: "Mebel & Furnitur" },
    { name: "Tanaman Hias" },
    { name: "Minuman Herbal" },
    { name: "Produk Daur Ulang" },
    { name: "UMKM Digital (Produk IT)" },
  ];

  for (const kategori of kategoriUMKM) {
    await prisma.kategori.create({
      data: kategori,
    });
  }

  console.log("✅ Kategori UMKM berhasil di-seed.");
}

main()
  .catch((e) => {
    console.error("❌ Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
