import Navbar from "@/app/(dashboard)/Navbar";
import Footer from "@/components/Footer/page";
import ProductDetailPage from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };


const Page = async ({ params }: Props) => {
  return (
    <div>
      <Navbar />
      <main>
        <section className="min-h-screen pt-10">
          <ProductDetailPage params={params} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
