import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import Jumbotron from "@/components/Jumbotron/page";
import ProductPage from "@/components/Product/page";
import { getAllProduct } from "@/lib/actions/product-action";

export default async function Product() {
  const data = await getAllProduct();
  console.log(data);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/* Jumbotron Section */}
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="Product" />
        </section>

        {/* Product List Section */}
        <section className="min-h-screen xl:h-[80vh] px-4">
          <ProductPage data={data} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
