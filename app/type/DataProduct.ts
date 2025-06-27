export type DataProduct = {
  id: string;
  name: string;
  slug: string;
  deskripsi: string;
  price: number;
  imageUrl?: string;
  umkm: {
    id: string;
    name: string;
  };
  umkmId: string;
  createdAt: Date;
};
