// app/product/[slug]/page.tsx
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import {
  ShoppingCart,
  Info,
  BadgeDollarSign,
  Building2,
  Phone,
  ImageOff,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { umkm: true },
  });

  if (!product) return notFound();

  const otherProducts = await prisma.product.findMany({
    where: {
      NOT: { slug }, // Jangan tampilkan produk yang sedang dibuka
    },
    include: { umkm: true },
    take: 6, // Ambil 6 produk lainnya
  });
  return (
    <main className="bg-gray-50 min-h-screen py-10">
  {/* Detail Produk */}
  <section className="w-[95vw] xl:w-[80vw] mx-auto bg-white p-8 rounded-2xl shadow-md mb-16">
    <h1 className="text-3xl font-bold mb-8 border-b pb-4 flex items-center justify-center md:justify-start gap-3">
      <ShoppingCart className="text-blue-600 w-6 h-6" />
      {product.name}
    </h1>

    <div className="flex flex-col ms-auto md:flex-row gap-10">
      {/* Gambar Produk */}
      {product.imageUrl && (
        <div className="md:w-1/4 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-xl object-cover shadow"
          />
        </div>
      )}

      {/* Informasi Produk */}
      <div className="flex-1 space-y-6 text-gray-700">
        <div>
          <p className="flex items-center gap-2 text-lg font-medium">
            <Info className="w-5 h-5 text-gray-500" />
            Deskripsi:
          </p>
          <p className="text-gray-800">{product.deskripsi}</p>
        </div>

        <p className="flex items-center gap-2 text-lg font-medium">
          <BadgeDollarSign className="w-5 h-5 text-green-600" />
          Harga:
          <span className="text-green-700 font-bold text-xl">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </p>

        <p className="flex items-center gap-2 text-lg font-medium">
          <Building2 className="w-5 h-5 text-indigo-600" />
          UMKM:
          <span className="text-indigo-700 font-semibold">
            {product.umkm.name}
          </span>
        </p>

        <a
          href={`https://wa.me/${product.umkm.contact}`}
          target="_blank"
          className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-lg shadow hover:bg-green-200 transition text-sm font-medium"
        >
          <Phone className="w-4 h-4" />
          Hubungi UMKM via WhatsApp
        </a>
      </div>
    </div>
  </section>

  {/* Produk Lainnya */}
  <section className="w-[95vw] xl:w-[80vw] mx-auto pb-20">
    <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2 text-center md:text-start">
      Produk Lainnya
    </h2>

    <div className="flex flex-wrap justify-center gap-8">
      {otherProducts.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.slug}`}
          className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%]"
        >
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:ring-2 hover:ring-gray-800 hover:-translate-y-1">
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageOff className="w-6 h-6" />
                  <span className="ml-2 text-sm">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-green-600 font-bold text-sm mt-1">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {item.umkm?.name}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
</main>

  );
}
