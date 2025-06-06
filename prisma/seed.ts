import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const wilayahJabar = [
    { name: "Kota Bandung" },
    { name: "Kota Bekasi" },
    { name: "Kota Bogor" },
    { name: "Kota Cimahi" },
    { name: "Kota Cirebon" },
    { name: "Kota Depok" },
    { name: "Kota Sukabumi" },
    { name: "Kota Tasikmalaya" },
    { name: "Kabupaten Bandung" },
    { name: "Kabupaten Bandung Barat" },
    { name: "Kabupaten Bekasi" },
    { name: "Kabupaten Bogor" },
    { name: "Kabupaten Ciamis" },
    { name: "Kabupaten Cianjur" },
    { name: "Kabupaten Cirebon" },
    { name: "Kabupaten Garut" },
    { name: "Kabupaten Indramayu" },
    { name: "Kabupaten Karawang" },
    { name: "Kabupaten Kuningan" },
    { name: "Kabupaten Majalengka" },
    { name: "Kabupaten Pangandaran" },
    { name: "Kabupaten Purwakarta" },
    { name: "Kabupaten Subang" },
    { name: "Kabupaten Sukabumi" },
    { name: "Kabupaten Sumedang" },
    { name: "Kabupaten Tasikmalaya" },
  ]

  for (const wilayah of wilayahJabar) {
    await prisma.wilayah.create({
      data: wilayah,
    })
  }

  console.log('✅ Data wilayah Jawa Barat berhasil di-seed.')
}

main()
  .catch((e) => {
    console.error('❌ Gagal melakukan seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
