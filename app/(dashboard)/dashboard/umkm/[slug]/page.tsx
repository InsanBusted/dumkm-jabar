import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export default async function UmkmDetailPage({ params }: Props) {
  const umkm = await prisma.umkm.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      kategori: true,
      location: true,
    },
  });

  if (!umkm) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{umkm.name}</h1>
      <p className="text-gray-600 mb-2">Owner: {umkm.ownerName}</p>
      <p className="text-gray-600 mb-2">Kategori: {umkm.kategori.name}</p>
      <p className="text-gray-600 mb-2">Wilayah: {umkm.location.name}</p>
      <p className="text-gray-600 mb-2">Kontak: {umkm.contact}</p>
      <p className="text-gray-800 mt-4">{umkm.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        Status: <span className="font-semibold">{umkm.status}</span>
      </p>

      {umkm.imageUrl && (
        <div className="mt-6">
          <Image
            src={umkm.imageUrl}
            alt={umkm.name}
            width={100}
            height={100}
            className="max-w-md rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
