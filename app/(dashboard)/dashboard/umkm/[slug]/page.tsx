import Navbar from "@/app/(dashboard)/Navbar";
import UmkmDetailPage from "./changeStatus";
import ProductPage from "@/components/Product/page";
import prisma from "@/lib/db/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!umkm) return <div>UMKM tidak ditemukan</div>;

  const products = await prisma.product.findMany({
    where: { umkmId: umkm.id },
    include: { umkm: true },
  });
  return (
    <div>
      <Navbar />
      <main>
        <section>
          <UmkmDetailPage params={params} />
        </section>
        <section>
          <ProductPage data={products} />
        </section>
      </main>
    </div>
  );
}
