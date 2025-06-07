"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Store } from "lucide-react";
import { Utensils } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
];

const Product = () => {
  const router = useRouter();

  const handleSeeMoreClick = () => {
    router.push("/product");
  };

  return (
    <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
      <div className="relative bg-black rounded-2xl shadow-lg py-5 px-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center xl:text-left flex items-center gap-3">
          <Utensils className="w-8 h-8" />
          Produk UMKM
        </h1>

        {/* Scrollable Product Cards */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-7">
          {data.map((item, index) => {
            return (
              <Card
                key={index}
                className="min-w-[250px] bg-white flex-shrink-0 shadow-md"
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
                    <CardTitle className="text-lg font-semibold text-black">
                      {item.title}
                    </CardTitle>
                  </div>

                  {/* Deskripsi */}
                  <CardDescription className="text-md text-gray-600 mt-1">
                    {item.description}
                  </CardDescription>

                  {/* Nama UMKM dengan ikon branding */}
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-700 font-medium">
                    <Store className="w-4 h-4 text-black" />
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Card Terakhir: Lihat lebih banyak produk */}
          <Card
            onClick={handleSeeMoreClick}
            className="min-w-[250px] bg-white flex-shrink-0 shadow-md cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 rounded-xl"></div>
            <CardContent className="px-3 pb-4 relative z-20 flex flex-col justify-center items-center h-full text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Lihat lebih banyak produk
              </h2>
              <p className="text-gray-600 text-sm">
                Klik untuk melihat seluruh produk UMKM kami
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Product;
