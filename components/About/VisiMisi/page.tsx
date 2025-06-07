import Image from "next/image";

const VisiMisi = () => {
  return (
    <section className="w-[80vw] m-auto bg-white">
      <div className="w-full p-8 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Visi & Misi Kami
          </h1>
          <p className="text-black leading-relaxed text-justify mb-4">
            <strong>Visi kami</strong> adalah membangun sebuah ekosistem digital yang adil, inklusif, dan berkelanjutan, yang dapat memberikan kesempatan yang sama bagi seluruh pelaku ekonomi kreatif di Indonesia. Kami berkomitmen untuk mendukung transformasi digital UMKM agar mampu bersaing secara nasional maupun global, sekaligus memperkuat peran UMKM dalam mendorong pertumbuhan ekonomi yang merata.
          </p>
          <p className="text-black leading-relaxed text-justify mb-4">
            <strong>Misi kami</strong> meliputi:
          </p>
          <ul className="list-disc list-inside text-black mb-4">
            <li>Memberikan akses pasar digital yang luas dan terpercaya bagi pelaku UMKM.</li>
            <li>Menyediakan platform yang mudah digunakan dengan fitur pendukung seperti manajemen produk, pembayaran, dan logistik yang terintegrasi.</li>
            <li>Mengedukasi pelaku UMKM mengenai pemanfaatan teknologi digital dan strategi pemasaran modern.</li>
            <li>Mendorong kolaborasi sinergis antara pemerintah, pelaku usaha, komunitas, dan pemangku kepentingan lainnya untuk menciptakan ekosistem yang berkelanjutan.</li>
          </ul>
          <p className="text-black leading-relaxed text-justify">
            Kami juga menjunjung tinggi nilai-nilai transparansi, kepercayaan, dan inovasi dalam setiap layanan yang kami berikan. Melalui platform ini, kami berharap dapat memperkuat pondasi UMKM Indonesia sehingga dapat tumbuh menjadi penggerak ekonomi yang mandiri, kreatif, dan mampu memberikan dampak positif bagi masyarakat luas.
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

export default VisiMisi;
