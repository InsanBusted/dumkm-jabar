import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import CardHome from "@/components/Home/Card/page";
import Jumbotron from "@/components/Jumbotron/page";

const Umkm = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="UMKM" />
        </section>
        <section className="xl:h-[50vh]">
          <CardHome />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Umkm;
