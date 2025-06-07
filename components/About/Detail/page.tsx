import Image from "next/image";

const Detail = () => {
  return (
    <section className="w-[80vw] m-auto bg-white pt-[5rem]">
      <div className="w-full rounded-2xl shadow-lg p-8 bg-black mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tentang Kami
          </h1>
          <p className="text-white leading-relaxed text-justify mb-4">
            Kami adalah platform digital inovatif yang secara khusus dirancang untuk mendukung pertumbuhan dan perkembangan UMKM (Usaha Mikro, Kecil, dan Menengah) di seluruh Indonesia. Dengan jaringan lebih dari 2000 UMKM terdaftar dan ribuan produk berkualitas dari berbagai daerah, kami hadir sebagai jembatan strategis yang menghubungkan pelaku usaha lokal dengan konsumen digital modern. Kami percaya bahwa UMKM adalah tulang punggung perekonomian Indonesia yang membutuhkan akses pasar yang lebih luas dan kemudahan dalam menjalankan usaha mereka.
          </p>
        </div>

        {/* Gambar Kanan */}
        <div className="flex-1 flex justify-center py-8">
          <Image
            src="/about.jpeg"
            alt="Tentang Kami"
            width={250}
            height={250}
            className="max-w-xs w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Detail;
