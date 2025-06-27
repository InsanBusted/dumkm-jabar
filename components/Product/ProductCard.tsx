"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Pencil } from "lucide-react";
import { deleteProductAction } from "@/lib/actions/product-action";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    deskripsi: string;
    price: number;
    imageUrl: string | null;
    umkm?: {
      name: string;
      contact: string;
    };
  };
  onEdit: () => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    setDeleting(true);
    const res = await deleteProductAction(product.id);
    setDeleting(false);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Gagal menghapus produk");
    }
  };

  return (
    <Card
      className="min-w-[250px] bg-white flex-shrink-0 cursor-pointer"
      onClick={() => router.push("/product")}
    >
      <div className="relative w-full h-50 rounded-2xl overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
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
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>

        <CardDescription className="text-sm text-gray-600">
          {product.deskripsi}
        </CardDescription>

        <p className="text-base font-semibold text-black">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <div className="mt-3 text-sm text-gray-500">
          <p>UMKM: {product.umkm?.name}</p>
          <Link
            href={`https://wa.me/${product.umkm?.contact}?text=Halo%20saya%20tertarik%20dengan%20product%20kamu`}
            target="_blank"
            className="text-green-600 hover:underline"
          >
            Hubungi
          </Link>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={deleting}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Trash2 className="w-4 h-4 mr-1" />{" "}
            {deleting ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
