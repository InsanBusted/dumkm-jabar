import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import About from "@/components/Home/About/page";
import CardHome from "@/components/Home/Card/page";
import Hero from "@/components/Home/Hero/page";
import Product from "@/components/Home/Product/page";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
<<<<<<< Updated upstream
        <div className="h-[110vh] xl:h-[70vh]">
          <Hero />
        </div>
        <div className="xl:h-[30vh]">
          <CardHome />
        </div>
        <div className="h-[160vh] xl:h-[80vh]">
=======
        <div className="h-[150vh] xl:h-[90vh]">
          <Hero />
        </div>
        <div className="h-[150vh] xl:h-[40vh]">
          <CardHome />
        </div>
        <div className="h-[150vh] xl:h-[90vh]">
>>>>>>> Stashed changes
          <About />
        </div>
        <div className="h-[150vh] xl:h-[90vh]">
          <Product />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
