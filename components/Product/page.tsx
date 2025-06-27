"use client";

import { DataProduct } from "@/app/type/DataProduct";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search, Store, Tag, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  data: DataProduct[];
};

export default function ProductPage({ data }: Props) {
  const [search, setSearch] = useState("");
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="w-[80vw] mx-auto pt-[3rem]">
      <div className="relative py-5 px-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center xl:text-left flex items-center gap-3">
          Produk-Produk UMKM
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto xl:mx-0">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black"
          >
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-r-full cursor-pointer"
            >
              <Search />
            </button>
          </form>
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap justify-start gap-6 mt-6">
          {filtered.map((item) => (
            <Link key={item.id} href={`/product/${item.slug}`}>
              <Card className="group w-[250px] text-black border border-gray-200 shadow-md rounded-2xl hover:shadow-lg hover:translate-y-[-3px] transition">
                <CardHeader className="px-4 pt-4">
                  <div className="relative w-full h-[150px] rounded-lg overflow-hidden bg-gray-100">
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
                </CardHeader>
                <CardContent className="px-4">
                  <CardTitle className="text-lg font-semibold mt-2">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {item.deskripsi}
                  </CardDescription>
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-green-700">
                    <Tag className="w-4 h-4" />
                    {formatRupiah(item.price)}
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    <a
                      href={`https://wa.me/${item.umkm?.contact}?text=Halo%20saya%20tertarik%20dengan%20product%20kamu`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Hubungi
                    </a>
                  </div>
                </CardContent>
                <CardFooter className="px-4 pb-4 mt-2 text-sm text-gray-600 flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  {item.umkm.name || "Unknown UMKM"}
                </CardFooter>
              </Card>
            </Link>
          ))}

          {/* Fallback Card if No Products */}
          {filtered.length === 0 && (
            <Card className="w-full md:w-[300px] text-center mx-auto mt-6 border-dashed border-2 border-gray-300 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Belum Ada Produk</CardTitle>
                <CardDescription className="text-gray-500">
                  UMKM ini belum menambahkan produk apapun.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
