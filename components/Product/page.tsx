"use client";

import { DataProduct } from "@/app/type/DataProduct";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search } from "lucide-react";
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
  return (
    <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
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
        <div className="flex flex-wrap justify-start gap-6 mt-3">
          {filtered.map((item, index) => (
            <div key={item.id}>
              <Link href={`/product/${item.slug}`}>
                <Card
                  key={index}
                  className="group w-[250px] text-black border border-gray-300 shadow-lg rounded-2xl
                 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl hover:border-transparent"
                >
                  <CardHeader className="flex flex-col items-start gap-2 px-4 pt-2">
                    {/* Gambar */}
                    <div className="relative w-full h-50 rounded-2xl overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-50 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold leading-tight">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {item.deskripsi}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-sm text-gray-700 mt-2 font-semibold">
                      {item.name} | {item.umkmId}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

