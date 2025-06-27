export type DataProduct = {
  id: string;
  name: string;
  slug: string;
  deskripsi: string;
  price: number;
  imageUrl?: string | null;
  umkmId: string;
  umkm: { name: string; contact: string };
  createdAt: Date;
};
