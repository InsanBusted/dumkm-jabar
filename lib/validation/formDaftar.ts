import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().min(1, "Nama UMKM wajib diisi"),
  ownerName: z.string().min(1, "Nama pemilik wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib diisi"), // ini id UUID kategori
  description: z.string().min(1, "Deskripsi wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"), // ini id UUID wilayah
  contact: z.string().min(1, "Kontak wajib diisi"),
  imageUrl: z.string().optional(),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;

export const updateFormSchema = createFormSchema.extend({
  id: z.string().min(1),
});

export const deleteFormSchema = z.object({
  id: z.string().min(1),
});
