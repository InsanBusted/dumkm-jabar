import Navbar from "@/app/(dashboard)/Navbar";
import UmkmDetailPage from "./changeStatus";
import Product from "@/components/Home/Product/page";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div>
      <Navbar />
      <main>
        <section>
          <UmkmDetailPage params={params} />
        </section>
        <section>
          <Product />
        </section>
      </main>
    </div>
  );
}
