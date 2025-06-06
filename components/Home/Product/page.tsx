"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Store } from "lucide-react";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import Image from "next/image";

const data = [
  {
    image: "/risol-mayo.jpg",
    title: "Risol Mayo",
    description: "Sangat lumer dan nikmat",
    name: "Bustech",
  },
  {
    image: "/chicken-katsu.jpg",
    title: "Chicken Katsu",
    description: "Gurih dan mantap",
    name: "Bustech",
  },
  {
    image: "/risol-mayo.jpg",
    title: "Risol Mayo",
    description: "Sangat lumer dan nikmat",
    name: "Bustech",
  },
  {
    image: "/chicken-katsu.jpg",
    title: "Chicken Katsu",
    description: "Gurih dan mantap",
    name: "Bustech",
  },
  {
    image: "/risol-mayo.jpg",
    title: "Risol Mayo",
    description: "Sangat lumer dan nikmat",
    name: "Bustech",
  },
  {
    image: "/risol-mayo.jpg",
    title: "Risol Mayo",
    description: "Sangat lumer dan nikmat",
    name: "Bustech",
  },
  {
    image: "/risol-mayo.jpg",
    title: "Risol Mayo",
    description: "Sangat lumer dan nikmat",
    name: "Bustech",
  },
];

const Product = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="w-[80vw] max-w-7xl mx-auto bg-white pt-[3rem]">
      <div className="relative bg-black rounded-2xl shadow-lg py-5 px-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center xl:text-left flex items-center gap-3">
          <Utensils className="w-8 h-8" />
          Produk UMKM
        </h1>

        {/* Navigation Buttons */}
        <button
          onClick={() => scroll(-300)}
          title="Scroll kiri"
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 cursor-pointer bg-black text-white p-2 rounded-full hover:bg-gray-200 hover:text-black transition shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll(300)}
          title="Scroll kanan"
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer bg-black text-white p-2 rounded-full hover:bg-gray-200 hover:text-black transition shadow"
        >
          <ChevronRight />
        </button>

        {/* Scrollable Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-7"
        >
          {data.map((item, index) => {

            return (
              <Card
                key={index}
                className="min-w-[220px] bg-white flex-shrink-0 shadow-md"
              >
                <CardHeader>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </CardHeader>

                <CardContent className="px-3 pb-4">
                  {/* Judul dengan ikon */}
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold text-black">
                      {item.title}
                    </CardTitle>
                  </div>

                  {/* Deskripsi */}
                  <CardDescription className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </CardDescription>

                  {/* Nama UMKM dengan ikon branding */}
                  <div className="flex items-center gap-1 mt-3 text-xs text-gray-700 font-medium">
                    <Store className="w-4 h-4 text-black" />
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;
