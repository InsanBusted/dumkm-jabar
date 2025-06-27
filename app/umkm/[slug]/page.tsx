import Navbar from "@/app/(dashboard)/Navbar";
import Footer from "@/components/Footer/page";
import UmkmDetailPage from "./UmkmDetail";
import ProductPage from "@/components/Product/page";
import prisma from "@/lib/db/prisma";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
    const { slug } = await params;

  const umkm = await prisma.umkm.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!umkm) return <div>UMKM tidak ditemukan</div>;

  const products = await prisma.product.findMany({
    where: { umkmId: umkm.id },
  });
  return (
    <div>
      <Navbar />
      <main>
        <section className="h-[95vh] xl:h-[50vh]">
          <UmkmDetailPage params={params} />
        </section>
        <section className="h-[95vh] xl:h-[80vh]">
          <ProductPage data={products} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
