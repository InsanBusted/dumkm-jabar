import FormDaftar from "@/components/Daftar/form/page";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";

const Daftar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="h-[100vh]">
          <FormDaftar />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Daftar;
