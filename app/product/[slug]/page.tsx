import Footer from "@/components/Footer/page";
import ProductDetailPage from "./ProductDetail";
import HeaderUtama from "@/components/HeaderUtama";

type Props = { params: Promise<{ slug: string }> };

const Page = async ({ params }: Props) => {
  return (
    <div>
      <HeaderUtama />
      <main className="pt-[5rem]">
        <section className="min-h-screen pt-10">
          <ProductDetailPage params={params} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
