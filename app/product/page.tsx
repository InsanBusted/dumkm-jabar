import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Jumbotron from "@/components/Jumbotron/page";
import ProductPage from "@/components/Product/page";
import { getAllProduct } from "@/lib/actions/product-action";

export default async function Product() {
  const data = await getAllProduct();
  // console.log(data);

  return (
    <div className="min-h-screen flex flex-col">
  <Header />
  <main className="flex-grow pt-[5rem]">
    <section className="h-[65vh] xl:h-[60vh]">
      <Jumbotron link="Product" />
    </section>

    <section className="px-4 py-10">
      <ProductPage data={data} />
    </section>
  </main>
  <Footer />
</div>
  );
}
