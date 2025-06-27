import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { BadgeCheck, Phone, MapPin, User, Tag, Info } from "lucide-react"; // pastikan sudah terinstal

export default async function UmkmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    include: { kategori: true, location: true },
  });

  if (!umkm) return notFound();

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="w-[90vw] md:w-[80vw] mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl text-center md:text-start font-bold mb-6 border-b pb-2">
          {umkm.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Gambar UMKM */}
          {umkm.imageUrl && (
            <div className="w-full md:w-1/4">
              <Image
                src={umkm.imageUrl}
                alt={umkm.name}
                width={500}
                height={350}
                className="rounded-xl object-cover shadow-md w-full h-auto"
              />
            </div>
          )}

          {/* Informasi Detail */}
          <div className="flex-1 space-y-4 text-gray-700">
            <p className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Owner:</span> {umkm.ownerName}
            </p>

            <p className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold">Kategori:</span>{" "}
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                {umkm.kategori.name}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Wilayah:</span>{" "}
              {umkm.location.name}
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold">Kontak:</span>{" "}
              <a
                href={`https://wa.me/${umkm.contact}`}
                target="_blank"
                className="text-indigo-700 underline"
              >
                {umkm.contact}
              </a>
            </p>

            <p className="flex items-start gap-2">
              <Info className="w-5 h-5 mt-1 text-gray-600" />
              <span className="text-gray-800">Deskripsi:</span>{" "}
              {umkm.description}
            </p>

            <p className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded ${
                  umkm.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : umkm.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {umkm.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
}
