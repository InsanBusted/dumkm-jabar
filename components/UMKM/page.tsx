"use client";

import { DataUmkm } from "@/app/type/DataUmkm";
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
  data: DataUmkm[];
};

export default function UmkmPage({ data }: Props) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative py-5 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center xl:text-left flex items-center gap-3">
        Daftar Nama UMKM
      </h1>

      <div className="max-w-md mx-auto xl:mx-0">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black"
        >
          <input
            type="text"
            placeholder="Cari nama kamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-r-full cursor-pointer flex items-center justify-center"
          >
            <Search className="w-4 h-6 xl:w-full m-auto" />
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-start gap-6 mt-3">
        {filtered.map((item) => (
          <div key={item.id}>
            <Link href={`/umkm/${item.slug}`}>
              <Card className="group w-[250px] text-black border border-gray-300 shadow-lg rounded-2xl transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl hover:border-transparent">
                <CardHeader className="flex flex-col items-start gap-2 px-4 pt-2">
                  <div className="relative w-full h-50 rounded-2xl overflow-hidden">
                    <Image
                      src={item.imageUrl || "/bakso.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-sm text-gray-700 mt-2 font-semibold">
                    {item.lokasi?.name} |{" "}
                    <Link
                      href={`https://wa.me/${item.contact}`}
                      target="_blank"
                      rel="noopener norefferer"
                      className="text-blue-600 hover:text-black"
                    >
                      Hubungi
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
