import Navbar from "@/app/(dashboard)/Navbar";
import DetailUmkm from "@/components/DetailUmkm";
import Footer from "@/components/Footer/page";
import Product from "@/components/Home/Product/page";

type Props = { params: { slug: string } };

const page = async ({ params }: Props) => {
  return (
    <div>
      <Navbar />
      <main>
        <section>
          <DetailUmkm params={params}  />
        </section>
        <section className="h-[80vh]">
          <Product />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
