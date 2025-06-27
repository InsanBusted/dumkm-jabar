import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-[80vw] m-auto bg-white pt-[8rem] xl:pt-[10rem] ">
      <div className="w-full  rounded-2xl shadow-lg py-5 px-8 bg-black mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Etalase Digital UMKM Jawa Barat
          </h1>
          <p className="mt-4 text-white">
            Platform digital untuk mendukung pertumbuhan UMKM di Jawa Barat
            melalui teknologi.
          </p>
          <Button className="mt-3 bg-white text-black cursor-pointer hover:text-white py-5">
            <Link href="/umkm">Cari Umkm</Link>
          </Button>
        </div>

        {/* Gambar Kanan */}
        <div className="flex-1 flex justify-center py-[3rem]">
          <Image
            src="/hero.jpeg"
            alt="Hero Image"
            width={300}
            height={300}
            className="max-w-xs w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
