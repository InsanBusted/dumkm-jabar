import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import About from "@/components/Home/About/page";
import CardHome from "@/components/Home/Card/page";
import Hero from "@/components/Home/Hero/page";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div className="h-[150vh] xl:h-[70vh]">
          <Hero />
        </div>
        <div className="h-[150vh] xl:h-[30vh]">
          <CardHome />
        </div>
        <div className="h-[100vh]">
          <About />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
