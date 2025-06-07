import Navbar from "@/app/(dashboard)/Navbar";
import Footer from "@/components/Footer/page";
import UmkmDetailPage from "./UmkmDetail";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
  return (
    <div>
      <Navbar />
      <main>
        <section>
          <UmkmDetailPage params={params} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default page;
