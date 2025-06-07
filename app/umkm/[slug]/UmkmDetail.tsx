import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Image from "next/image";

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
    <div className="p-6 w-[80vw] mx-auto">
      <h1 className="text-2xl font-bold mb-4">{umkm.name}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Gambar di kiri */}
        {umkm.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={umkm.imageUrl}
              alt={umkm.name}
              width={400}
              height={300}
              className="rounded shadow object-cover"
            />
          </div>
        )}

        {/* Detail di kanan */}
        <div className="flex-1 space-y-4">
          <p>
            <span className="font-semibold">Owner:</span> {umkm.ownerName}
          </p>
          <p>
            <span className="font-semibold">Kategori:</span>{" "}
            {umkm.kategori.name}
          </p>
          <p>
            <span className="font-semibold">Wilayah:</span> {umkm.location.name}
          </p>
          <p>
            <span className="font-semibold">Kontak:</span> {umkm.contact}
          </p>
          <p className="text-gray-800">{umkm.description}</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-semibold">{umkm.status}</span>
          </p>
         
        </div>
      </div>
    </div>
  );
}
