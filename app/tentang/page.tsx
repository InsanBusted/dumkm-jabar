import Detail from "@/components/About/Detail/page";
import VisiMisi from "@/components/About/VisiMisi/page";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import HeaderGuest from "@/components/HeaderGuest/page";
import Jumbotron from "@/components/Jumbotron/page";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Tentang = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SignedIn>
        <Header />
      </SignedIn>
      <SignedOut>
        <HeaderGuest />
      </SignedOut>

      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="tentang" />
        </section>
        <section className="h-[65vh] xl:h-[70vh]">
          <Detail />
        </section>
        <section className="h-[65vh] xl:h-[70vh]">
          <VisiMisi />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tentang;
