// components/product/Product.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Utensils, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getProduct,
  addProductAction,
  updateProductAction,
} from "@/lib/actions/product-action";
import ProductForm from "./FormProduct";
import ProductCard from "@/components/Product/ProductCard";

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
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    (FormValues & { id: string }) | null
  >(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("deskripsi", data.deskripsi);
    formData.append("price", data.price.toString());
    formData.append("imageUrl", data.imageUrl);

    const res = await addProductAction(formData);
    if (res.success) {
      setOpen(false);
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
      <div className="relative bg-black rounded-2xl shadow-lg py-5 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center xl:text-left flex items-center gap-3">
            <Utensils className="w-8 h-8" /> Produk UMKM
          </h1>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Tambah Produk
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tambah Produk</AlertDialogTitle>
                <AlertDialogDescription>
                  Isi data produk di bawah ini
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ProductForm
                onSubmit={onSubmit}
                onCancel={() => setOpen(false)}
              />
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit Produk</AlertDialogTitle>
                <AlertDialogDescription>
                  Ubah data produk di bawah ini
                </AlertDialogDescription>
              </AlertDialogHeader>
              {editingProduct && (
                <ProductForm
                  initialData={editingProduct}
                  onSubmit={async (data) => {
                    const formData = new FormData();
                    formData.append("name", data.name);
                    formData.append("deskripsi", data.deskripsi);
                    formData.append("price", data.price.toString());
                    formData.append("imageUrl", data.imageUrl);

                    const res = await updateProductAction(
                      editingProduct.id,
                      formData
                    );
                    if (res.success) {
                      setEditOpen(false);
                      router.refresh();
                    } else {
                      alert(res.error);
                    }
                  }}
                  onCancel={() => setEditOpen(false)}
                />
              )}
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-7">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              product={item}
              onEdit={() => {
                setEditingProduct({
                  id: item.id,
                  name: item.name,
                  deskripsi: item.deskripsi,
                  price: item.price,
                  imageUrl: item.imageUrl ? item.imageUrl : "",
                });
                setEditOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
