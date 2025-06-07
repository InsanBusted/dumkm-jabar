export type DataUmkm = {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  description: string;
  locationId: string;
  kategoriId: string;
  contact: string;
  imageUrl?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED"; // pastikan enum ini sesuai dengan definisi enum Status kamu di Prisma
  createdAt: Date;
  updatedAt: Date;
  lokasi?: {
    id: string;
    name: string;
    // properti lain dari model Wilayah jika ada
  };
  kategori?: {
    id: string;
    name: string;
    // properti lain dari model Kategori jika ada
  };
};
