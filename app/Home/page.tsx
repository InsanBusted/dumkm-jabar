import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div className="h-[100vh]">Home page</div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
