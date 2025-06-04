import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  StoreIcon,
  PackageCheckIcon,
  MapPinIcon,
} from "lucide-react";

const data = [
  {
    title: "100+ UMKM",
    content: "UMKM Sudah Terdaftar",
    icon: StoreIcon,
  },
  {
    title: "100+ Produk UMKM",
    content: "Produk UMKM yang telah dipasarkan",
    icon: PackageCheckIcon,
  },
  {
    title: "20+ Kabupaten/Kota",
    content: "Telah Bergabung di Platform",
    icon: MapPinIcon,
  },
];

const CardHome = () => {
  return (
    <div className="w-[90vw] max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="group cursor-pointer bg-black text-white border border-gray-800 shadow-lg rounded-2xl transition-all duration-300 transform hover:translate-y-[-4px] hover:bg-white hover:text-black hover:shadow-xl hover:border-transparent"
            >
              <CardHeader className="flex flex-col items-start gap-3">
                <Icon className="h-10 w-10 transition-colors duration-300 group-hover:text-black" />
                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                <CardDescription className="text-gray-400 transition-colors duration-300 group-hover:text-gray-700">
                  {item.content}
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CardHome;
