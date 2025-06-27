"use client";

import { TypeAnimation } from "react-type-animation";

export default function TypingText() {
  return (
    <div className="h-[100vh] xl:h-[20vh]">
      <p className="max-w-4xl text-gray-700 text-lg sm:text-xl leading-relaxed font-medium tracking-wide text-justify h-[35vh]">
        <TypeAnimation
          sequence={[
            // ketik seluruh paragraf sekaligus
            `Ayo daftarkan UMKM Anda sekarang dan manfaatkan kemudahan akses  pendataan, dan pengelolaan umkm digital dalam satu platform resmi Jawa Barat! Tingkatkan kemampuan usaha Anda, raih peluang baru, dan jadilah bagian dari transformasi digital UMKM di era modern ini. Bergabunglah bersama ribuan pelaku UMKM lain yang sudah lebih maju bersama kami!`,
            2000, // delay setelah selesai ketik
            () => {}, // optional callback, bisa kosong
            // hapus seluruh teks (jumlah karakter paragraf)
            -250,
            1000, // delay sebelum ulang
          ]}
          speed={40}
          repeat={Infinity}
          cursor={true}
          wrapper="span"
        />
      </p>
    </div>
  );
}
