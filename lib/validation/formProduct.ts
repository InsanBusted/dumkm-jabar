import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi produk wajib diisi"),
  price: z.number().min(0, "Harga produk harus bernilai positif"),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional(),
  umkmId: z.string().uuid("ID UMKM harus berupa UUID"),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.extend({
  id: z.string().uuid("ID produk harus berupa UUID"),
});

export const deleteProductSchema = z.object({
  id: z.string().uuid("ID produk harus berupa UUID"),
});
