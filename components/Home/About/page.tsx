import Image from "next/image";

const About = () => {
  return (
    <section className="w-[80vw] m-auto bg-white pt-[5rem]">
      <div className="w-full rounded-2xl shadow-lg py-5 px-8 bg-black mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tentang Kami
          </h1>
          <p className="text-white leading-relaxed text-justify">
            Kami adalah platform yang mendukung UMKM di seluruh Indonesia untuk
            berkembang dan menjangkau pasar yang lebih luas. Dengan lebih dari
            2000+ UMKM dan ribuan produk, kami hadir sebagai jembatan antara
            pelaku usaha lokal dan konsumen digital. Visi kami adalah
            menciptakan ekosistem yang adil, inklusif, dan berkelanjutan untuk
            semua pelaku ekonomi kreatif di Indonesia.
          </p>
          <br />
          <p className="text-white leading-relaxed text-justify">
            Visi kami adalah menciptakan ekosistem digital yang adil, inklusif,
            dan berkelanjutan untuk seluruh pelaku ekonomi kreatif. Melalui
            platform ini, kami mendorong kolaborasi antara pemerintah, pelaku
            usaha, dan masyarakat untuk membangun masa depan UMKM yang lebih
            kuat dan mandiri.
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

export default About;
