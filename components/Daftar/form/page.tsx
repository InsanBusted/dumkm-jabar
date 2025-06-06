import { getWilayah } from "@/lib/actions/getWilayah";
import { getKategori } from "@/lib/actions/getKategori";
import FormDaftar from "./formClient";
import Image from "next/image";

export default async function FormDaftarPage() {
  const wilayah = await getWilayah();
  const kategori = await getKategori();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Kiri */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Daftarkan UMKM Anda</h2>
          <p className="text-gray-700 mb-6">
            Dengan mendaftarkan UMKM Anda, Anda mendapatkan:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Akses ke pelatihan dan mentoring bisnis</li>
            <li>Kesempatan promosi melalui program pemerintah</li>
            <li>Dukungan pemasaran dan pendampingan digital</li>
          </ul>
          {/* Gambar */}
          <div className="relative w-full max-w-xs h-64 hidden md:block">
            <Image
              src="/store.svg"
              alt="UMKM Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Kanan */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <FormDaftar wilayah={wilayah} kategori={kategori} />
        </div>
      </div>
    </div>
  );
}
