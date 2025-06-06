import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().min(1, { message: "Nama UMKM wajib diisi" }),
  ownerName: z.string().min(1, { message: "Nama pemilik wajib diisi" }),
  category: z.string().min(1, { message: "Kategori wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  location: z.string().min(1, { message: "Lokasi wajib diisi" }),
  contact: z.string().min(1, { message: "Kontak wajib diisi" }),
  imageUrl: z.string().url().optional(),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;

export const updateFormSchema = createFormSchema.extend({
  id: z.string().min(1),
});

export const deleteFormSchema = z.object({
  id: z.string().min(1),
});
