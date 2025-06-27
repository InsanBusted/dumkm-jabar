"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Utensils, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "@/lib/db/supabase/client";
import { addProductAction, getProduct } from "@/lib/actions/product-action";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type FormValues = {
  name: string;
  deskripsi: string;
  price: number;
  imageUrl: string;
};

type ProductProps = {
  products: Awaited<ReturnType<typeof getProduct>>;
};

const Product = ({ products }: ProductProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      deskripsi: "",
      price: 0,
      imageUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");

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
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // NOTE: addProductAction di server harus menerima FormData dari client
      // Di sini kita buat FormData manual karena kita punya data object
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("deskripsi", data.deskripsi);
      formData.append("price", data.price.toString());
      formData.append("imageUrl", data.imageUrl);

      const res = await addProductAction(formData);

      if (!res.success) {
        setSubmitError(res.error || "Gagal menambahkan produk");
      } else {
        setSubmitSuccess(true);
        reset();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Terjadi kesalahan saat menambahkan produk");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeMoreClick = () => {
    router.push("/product");
  };

  return (
    <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
      <div className="relative bg-black rounded-2xl shadow-lg py-5 px-6">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center xl:text-left flex items-center gap-3">
            <Utensils className="w-8 h-8" />
            Produk UMKM
          </h1>

          {/* Tambah Produk */}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah Produk
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tambah Produk</AlertDialogTitle>
                <AlertDialogDescription>
                  Isi data produk di bawah ini
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Produk</Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Nama Produk wajib diisi",
                    })}
                    disabled={uploading || isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    {...register("deskripsi", {
                      required: "Deskripsi wajib diisi",
                    })}
                    disabled={uploading || isSubmitting}
                  />
                  {errors.deskripsi && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.deskripsi.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="price">Harga</Label>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    step={100}
                    {...register("price", {
                      required: "Harga wajib diisi",
                      valueAsNumber: true,
                      min: { value: 0, message: "Harga minimal 0" },
                    })}
                    disabled={uploading || isSubmitting}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="image">Gambar Produk</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading || isSubmitting}
                    className="cursor-pointer"
                    required
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-1">Mengunggah...</p>
                  )}
                  {uploadError && (
                    <p className="text-sm text-red-600 mt-1">{uploadError}</p>
                  )}
                  {imageUrl && !uploading && (
                    <p className="text-sm text-green-600 mt-1">
                      Gambar berhasil diunggah!
                    </p>
                  )}
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    type="button"
                    disabled={isSubmitting || uploading}
                  >
                    Batal
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || uploading || !imageUrl // pastikan gambar sudah diupload
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" />
                        Menambahkan...
                      </span>
                    ) : (
                      "Tambah"
                    )}
                  </Button>
                </AlertDialogFooter>

                {submitError && (
                  <p className="text-sm text-red-600 mt-2">{submitError}</p>
                )}
                {submitSuccess && (
                  <p className="text-sm text-green-600 mt-2">
                    Produk berhasil ditambahkan!
                  </p>
                )}
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Product Cards */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-7">
          {products.map((item, index) => (
            <Card
              key={index}
              className="min-w-[250px] bg-white flex-shrink-0 cursor-pointer"
              onClick={handleSeeMoreClick}
            >
              <div className="relative w-full h-50 rounded-2xl overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-50 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>
              <CardHeader className="p-3">
                <CardTitle className="text-lg font-semibold">
                  {item.name}
                </CardTitle>

                <CardDescription className="text-sm text-gray-600">
                  {item.deskripsi}
                </CardDescription>

                <p className="text-base font-semibold text-black">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <div className="mt-3 text-sm text-gray-500">
                  <p>UMKM: {item.umkm?.name}</p>
                  <Link
                    href={`https://wa.me/${item.umkm?.contact}?text=Halo%20saya%20tertarik%20dengan%20product%20kamu`}
                    target="_blank"
                    className="text-green-600 hover:underline"
                  >
                    Hubungi
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
