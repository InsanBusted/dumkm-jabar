"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import z from "zod";
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
import { useActionState, useRef, useState } from "react";
import supabase from "@/lib/db/supabase/client";
import { createFormSchema } from "@/lib/validation/formDaftar";
import { submitUmkm } from "@/lib/actions/addUmkm"; // Pastikan ini server action-mu

type FormValues = z.infer<typeof createFormSchema>;

type FormDaftarProps = {
  wilayah: { id: string; name: string }[];
  kategori: { id: string; name: string }[];
};

const FormDaftar = ({ wilayah, kategori }: FormDaftarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriSearchQuery, setKategoriSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Gunakan useActionState untuk submit form dengan server action
  const [state, formAction] = useActionState(submitUmkm, {
    success: false,
    error: "",
  });

  const filteredKategori = kategori.filter((item) =>
    item.name.toLowerCase().includes(kategoriSearchQuery.toLowerCase())
  );

  const filteredWilayah = wilayah.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      kategori: "",
      description: "",
      location: "",
      contact: "",
      imageUrl: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("dumkm")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = await supabase.storage
        .from("dumkm")
        .getPublicUrl(data.path);

      form.setValue("imageUrl", publicData.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama UMKM</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Warung Makan Bu Tini"
                    {...field}
                    disabled={uploading || state.success}
                  />
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
                  <Input
                    placeholder="Contoh: Tini Suprihatin"
                    {...field}
                    disabled={uploading || state.success}
                  />
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
                  <Textarea
                    placeholder="Deskripsikan UMKM Anda"
                    {...field}
                    disabled={uploading || state.success}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input hidden */}
          <input
            type="hidden"
            name="kategori"
            value={form.getValues("kategori")}
          />

          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={uploading || state.success}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="px-2 py-2">
                      <Input
                        placeholder="Cari kategori..."
                        onChange={(e) => setKategoriSearchQuery(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredKategori.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input hidden */}
          <input
            type="hidden"
            name="location"
            value={form.getValues("location")}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi (Kabupaten/Kota)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={uploading || state.success}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi di Jawa Barat..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="px-2 py-2">
                      <Input
                        placeholder="Cari lokasi..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredWilayah.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
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
                  <Input
                    placeholder="Contoh: 081234567890"
                    {...field}
                    disabled={uploading || state.success}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* hidden url image */}
          <input type="hidden" {...form.register("imageUrl")} />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Gambar (Opsional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={uploading || state.success}
                    className="cursor-pointer"
                  />
                </FormControl>
                {uploading && (
                  <p className="text-sm text-gray-500 mt-1">Mengunggah...</p>
                )}
                {field.value && (
                  <p className="text-sm text-green-600 mt-1">
                    Gambar berhasil diunggah!
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={uploading || state.success}
          >
            Daftar UMKM
          </Button>

          {state.error && (
            <p className="text-red-600 text-sm mt-2">{state.error}</p>
          )}

          {state.success && (
            <p className="text-green-600 text-center mt-4 font-semibold">
              UMKM berhasil didaftarkan!
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FormDaftar;
