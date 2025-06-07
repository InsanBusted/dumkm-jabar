import DetailUmkm from "@/components/DetailUmkm/DetailUmkm";
import Product from "@/components/DetailUmkm/Product/page";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import prisma from "@/lib/db/prisma";

export async function generateStaticParams() {
  const umkms = await prisma.umkm.findMany({
    select: { slug: true },
    where: { status: "APPROVED" },
  });

  return umkms.map((umkm) => ({
    slug: umkm.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const umkm = await prisma.umkm.findUnique({
    where: { slug: resolvedParams.slug },
  });

  return {
    title: umkm?.name || "UMKM",
    description: umkm?.description || "Detail UMKM",
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <div>
      <Header />
      <main>
        <section>
          <DetailUmkm params={params} />
        </section>
        <section className="h-[80vh]">
          <Product />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
