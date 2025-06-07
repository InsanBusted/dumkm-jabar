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
import { useActionState, useRef, useState, useEffect } from "react";
import supabase from "@/lib/db/supabase/client";
import { createFormSchema } from "@/lib/validation/formDaftar";
import { submitUmkm } from "@/lib/actions/addUmkm";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2 } from "lucide-react";

type FormValues = z.infer<typeof createFormSchema>;

type FormDaftarProps = {
  wilayah: { id: string; name: string }[];
  kategori: { id: string; name: string }[];
};

const FormDaftar = ({ wilayah, kategori }: FormDaftarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriSearchQuery, setKategoriSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const [state, formAction] = useActionState(submitUmkm, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      setAlertTitle("Berhasil");
      setAlertDescription("UMKM berhasil didaftarkan!");
      setAlertOpen(true);
    } else if (state.error) {
      setAlertTitle("Gagal Mendaftarkan UMKM");
      setAlertDescription(state.error);
      setAlertOpen(true);
    }
    setIsSubmitting(false);
  }, [state.success, state.error]);

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

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await formAction(formData);
  };

  return (
    <>
      <div className="w-full p-6 bg-white rounded-xl shadow-md">
        <Form {...form}>
          <form action={handleSubmit} className="space-y-4">
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
                          onChange={(e) =>
                            setKategoriSearchQuery(e.target.value)
                          }
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
                      required
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
              className="w-full cursor-pointer"
              disabled={uploading || isSubmitting || state.success}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Mendaftarkan...
                </span>
              ) : (
                "Daftar UMKM"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FormDaftar;
