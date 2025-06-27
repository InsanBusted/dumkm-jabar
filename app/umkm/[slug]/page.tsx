import Footer from "@/components/Footer/page";
import UmkmDetailPage from "./UmkmDetail";
import ProductPage from "@/components/Product/page";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderUtama from "@/components/HeaderUtama";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
  const { slug } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    select: { id: true, contact: true },
  });

  if (!umkm) return <div>UMKM tidak ditemukan</div>;

  const products = await prisma.product.findMany({
    where: { umkmId: umkm.id },
    include: { umkm: true },
  });

  return (
    <div>
      <HeaderUtama />
      <main className="pt-[5rem] pb-[5rem]">
        <section>
          <UmkmDetailPage params={params} />
        </section>

        <section>
          <ProductPage data={products} />
        </section>
        {/* Tombol Kembali */}
        <section className="w-[80vw] mx-auto mt-4 mb-[-1rem]">
          <Link href="/umkm">
            <Button variant="outline" className="text-sm cursor-pointer">
              ← Kembali ke daftar UMKM
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default page;
