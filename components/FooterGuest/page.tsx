import Link from "next/link";

const FooterGuest = () => {
  return (
    <div className=" w-[80vw] m-auto pb-[3rem]">
      <div className="w-full bg-black text-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1 - Brand */}
          <div>
            <h1 className="text-xl font-bold mb-2">
              Etalase Digital UMKM Jawa Barat
            </h1>
            <p className="text-sm text-gray-300">
              Ayo daftarkan UMKM Anda sekarang dan manfaatkan kemudahan akses
              pendataan, dan pengelolaan umkm digital dalam satu platform resmi
              Jawa Barat!
            </p>
          </div>

          {/* Section 2 - Navigation Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Navigasi</h2>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:underline">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:underline">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="hover:underline">
                  Umkm
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3 - Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Kontak</h2>
            <p className="text-sm text-gray-300">Citayam, Depok, Indonesia</p>
            <p className="text-sm text-gray-300">Email: info@bustech.site</p>
            <p className="text-sm text-gray-300">WhatsApp: +62 896-3554-6721</p>
          </div>
        </div>

        <hr className="my-4 border-gray-600" />

        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Busted Technology. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterGuest;
