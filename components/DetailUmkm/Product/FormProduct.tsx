"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase/client";

type FormValues = {
  name: string;
  deskripsi: string;
  price: number;
  imageUrl: string;
  id?: string;
};

type ProductFormProps = {
  initialData?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel?: () => void;
};

const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: initialData ?? {
      name: "",
      deskripsi: "",
      price: 0,
      imageUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("dumkm")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = await supabase.storage
        .from("dumkm")
        .getPublicUrl(data.path);

      setValue("imageUrl", publicData.publicUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setUploadError("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nama Produk</Label>
        <Input id="name" {...register("name", { required: "Wajib diisi" })} disabled={uploading || isSubmitting} />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea id="deskripsi" {...register("deskripsi", { required: "Wajib diisi" })} disabled={uploading || isSubmitting} />
        {errors.deskripsi && <p className="text-red-600 text-sm">{errors.deskripsi.message}</p>}
      </div>

      <div>
        <Label htmlFor="price">Harga</Label>
        <Input id="price" type="number" {...register("price", { required: true, valueAsNumber: true })} disabled={uploading || isSubmitting} />
      </div>

      <div>
        <Label htmlFor="image">Gambar Produk</Label>
        <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading || isSubmitting} />
        {uploading && <p>Mengunggah gambar...</p>}
        {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}
        {imageUrl && !uploading && <p className="text-green-600 text-sm">Gambar diunggah</p>}
      </div>

      <AlertDialogFooter>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting || uploading}>
            Batal
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || uploading || !imageUrl}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
            </span>
          ) : (
            "Simpan"
          )}
        </Button>
      </AlertDialogFooter>
    </form>
  );
};

export default ProductForm;