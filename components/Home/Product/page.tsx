"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllProduct } from "@/lib/actions/product-action";

import { Store, Utensils, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  deskripsi: string;
  imageUrl: string | null;
  slug: string;
  umkm: {
    name: string;
    contact: string;
  };
};

const Product = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProduct();
      setProducts(result);
    };
    fetchData();
  }, []);

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* Search Bar */}
        <div className="max-w-md mx-auto xl:mx-0 mb-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-white bg-white"
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
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Scrollable Product Cards */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-7">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="min-w-[250px] bg-white flex-shrink-0 shadow-md"
            >
              <CardHeader>
                <Image
                  src={item.imageUrl || "/placeholder.jpg"} // fallback jika null
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-xl"
                />
              </CardHeader>

              <CardContent className="px-3 pb-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold text-black">
                    {item.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-md text-gray-600 mt-1">
                  {item.deskripsi}
                </CardDescription>
                <div className="mt-3 text-sm text-gray-500">
                  <Link
                    href={`https://wa.me/${item.umkm?.contact}?text=Halo%20saya%20tertarik%20dengan%20product%20kamu`}
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Hubungi
                  </Link>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm text-gray-700 font-medium">
                  <Store className="w-4 h-4 text-black" />
                  {item.umkm?.name ?? "-"}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Card terakhir: Lihat lebih banyak */}
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
