import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // pastikan kamu punya helper cn, atau bisa ganti dengan template literal biasa


export default async function DetailUmkm({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    include: { kategori: true, location: true },
  });

  if (!umkm) {
    return (
      <div className="text-center mt-10 text-lg animate-fadeIn">
        UMKM dengan slug <strong>{slug}</strong> tidak ditemukan.
      </div>
    );
  }

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
      <h1 className="text-3xl font-bold mb-6 text-center text-primary transition-all duration-500 ease-in-out">
        {umkm.name}
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8 border border-gray-200 transform transition duration-500 ease-in-out hover:scale-[1.01]">
        {/* Gambar */}
        {umkm.imageUrl && (
          <div className="flex-shrink-0 w-full md:w-[400px] h-[250px] relative overflow-hidden rounded-xl border transition-transform duration-500 hover:scale-105">
            <Image
              src={umkm.imageUrl}
              alt={umkm.name}
              fill
              className="object-cover transition-opacity duration-500"
            />
          </div>
        )}

        {/* Informasi */}
        <div className="flex-1 space-y-4 transition-opacity duration-500">
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
                "flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300",
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
