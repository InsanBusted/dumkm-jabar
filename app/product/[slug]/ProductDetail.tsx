// app/product/[slug]/page.tsx
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { umkm: true },
  });

  if (!product) return notFound();
  return (
    <div>
      <main>
        <section className="min-h-screen pt-10 p-6 w-[80vw] mx-auto">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <div className="flex flex-col md:flex-row gap-8">
            {product.imageUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded shadow object-cover"
                />
              </div>
            )}
            <div className="flex-grow">
              <p className="text-gray-600">{product.deskripsi}</p>
              <p className="text-gray-600">Harga: {product.price}</p>
              <p className="text-gray-600">UMKM: {product.umkm}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
