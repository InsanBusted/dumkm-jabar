// components/DetailUmkm/DetailUmkm.tsx
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Umkm, Kategori, Wilayah } from "@prisma/client";

type UmkmWithRelations = Umkm & {
  kategori: Kategori;
  location: Wilayah;
};

export default function DetailUmkm({ umkm }: { umkm: UmkmWithRelations }) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Disetujui",
          color: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
        };
      case "REJECTED":
        return {
          label: "Ditolak",
          color: "bg-red-100 text-red-800 hover:bg-red-200",
          icon: <XCircle className="w-4 h-4 mr-1" />,
        };
      case "PENDING":
      default:
        return {
          label: "Menunggu Disetujui",
          color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          icon: <Clock className="w-4 h-4 mr-1" />,
        };
    }
  };

  const statusInfo = getStatusInfo(umkm.status);

  return (
    <div className="p-6 w-full max-w-5xl mx-auto animate-fadeIn pt-[10rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        {umkm.name}
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8 border border-gray-200">
        {umkm.imageUrl && (
          <div className="flex-shrink-0 w-full md:w-[400px] h-[250px] relative overflow-hidden rounded-xl border">
            <Image
              src={umkm.imageUrl}
              alt={umkm.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Pemilik:</span> {umkm.ownerName}
            </p>
            <p>
              <span className="font-semibold">Kategori:</span>{" "}
              {umkm.kategori.name}
            </p>
            <p>
              <span className="font-semibold">Wilayah:</span>{" "}
              {umkm.location.name}
            </p>
            <p>
              <span className="font-semibold">Kontak:</span> {umkm.contact}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1 text-gray-800">
              Deskripsi UMKM:
            </h2>
            <p className="text-gray-700 text-sm">{umkm.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <Badge
              className={cn(
                "flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold",
                statusInfo.color
              )}
            >
              {statusInfo.icon}
              {statusInfo.label}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
