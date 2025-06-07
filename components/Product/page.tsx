import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search } from "lucide-react";
import Image from "next/image";

const data = [
  {
    title: "Bakso Acikiwir",
    address: "Depok",
    content: "Kuahnya sangat gurih dan baksonya empuk",
    name: "Bustech",
    image: "/bakso.jpg",
  },
  {
    title: "Gondes",
    address: "Depok",
    content: "Ayamnya besar dan minumannya juga banyak",
    name: "Bustech",
    image: "/bakso.jpg",
  },
  {
    title: "Dimsum Mentai",
    address: "Depok",
    content: "Saos mentainya kane banget bikin nagih euyy",
    name: "Bustech",
    image: "/bakso.jpg",
  },
];

const ProductPage = () => {
  return (
    <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
      <div className="relative py-5 px-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center xl:text-left flex items-center gap-3">
          Produk-Produk UMKM
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto xl:mx-0">
          <form className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black">
            <input
              type="text"
              placeholder="Cari produk..."
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
          {data.map((item, index) => (
            <Card
              key={index}
              className="group w-[250px] text-black border border-gray-300 shadow-lg rounded-2xl
                 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-xl hover:border-transparent"
            >
              <CardHeader className="flex flex-col items-start gap-2 px-4 pt-2">
                {/* Gambar */}
                <div className="relative w-full h-50 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl font-bold leading-tight">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {item.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-gray-700 mt-2 font-semibold">
                  {item.name} | {item.address}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
