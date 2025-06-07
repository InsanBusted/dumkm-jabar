import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { updateUmkmStatus } from "@/lib/actions/umkmActions";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    include: { kategori: true, location: true },
  });

  if (!umkm) return notFound();

  const umkmId = umkm.id;

  async function onSubmit(formData: FormData) {
    "use server";

    const status = formData.get("status") as "PENDING" | "APPROVED" | "REJECTED";
    if (!status) throw new Error("Status wajib diisi");

    await updateUmkmStatus(umkmId, status);
  }

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
          <p><span className="font-semibold">Owner:</span> {umkm.ownerName}</p>
          <p><span className="font-semibold">Kategori:</span> {umkm.kategori.name}</p>
          <p><span className="font-semibold">Wilayah:</span> {umkm.location.name}</p>
          <p><span className="font-semibold">Kontak:</span> {umkm.contact}</p>
          <p className="text-gray-800">{umkm.description}</p>
          <p className="text-sm text-gray-500">
            Status: <span className="font-semibold">{umkm.status}</span>
          </p>

          {/* Form Update Status */}
          <form action={onSubmit} className="mt-4 flex flex-col gap-3 max-w-sm">
            <Label htmlFor="status">Ubah Status UMKM</Label>
            <Select name="status" defaultValue={umkm.status}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="APPROVED">APPROVED</SelectItem>
                  <SelectItem value="REJECTED">REJECTED</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white cursor-pointer"
            >
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
