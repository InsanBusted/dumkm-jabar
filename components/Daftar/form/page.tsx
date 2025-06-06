"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addUmkm } from "@/lib/actions/addUmkm";

// Schema validasi Zod
const createFormSchema = z.object({
  name: z.string().min(1, "Nama UMKM wajib diisi"),
  ownerName: z.string().min(1, "Nama pemilik wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  location: z.string().min(1, "Lokasi wajib dipilih"),
  contact: z.string().min(1, "Kontak wajib diisi"),
  imageUrl: z.string().url("Harus berupa URL yang valid").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof createFormSchema>;

const FormDaftar = () => {
  const [kabupatenList, setKabupatenList] = useState<
    { id: string; name: string }[]
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      category: "",
      description: "",
      location: "",
      contact: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    const fetchWilayah = async () => {
      try {
        const res = await fetch("/api/wilayah"); 
        const data = await res.json();
        setKabupatenList(data);
      } catch (error) {
        console.error("Gagal mengambil data wilayah:", error);
      }
    };
    fetchWilayah();
  }, []);

  const onSubmit = async (values: FormValues) => {
    const result = await addUmkm(values);
    if (result.success) {
      alert("UMKM berhasil didaftarkan!");
      form.reset();
    } else {
      alert(`Gagal: ${result.message}`);
    }
  };

  return (
    <div className="w-[80vw] m-auto p-6 bg-white rounded-xl shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama UMKM</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Warung Makan Bu Tini" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pemilik</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Tini Suprihatin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Kuliner, Fashion, dll." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea placeholder="Deskripsikan UMKM Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi (Kabupaten/Kota)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi di Jawa Barat..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kabupatenList.map((kab) => (
                      <SelectItem key={kab.id} value={kab.name}>
                        {kab.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kontak</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: 081234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Gambar (Opsional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/foto.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Daftar UMKM
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormDaftar;
