"use client";

import { useAuth } from "@clerk/nextjs";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import HeaderGuest from "@/components/HeaderGuest/page";
import CardHome from "@/components/Home/Card/page";
import Jumbotron from "@/components/Jumbotron/page";
import FooterGuest from "@/components/FooterGuest/page";

const Umkm = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {isSignedIn ? <Header /> : <HeaderGuest />}
      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="UMKM" />
        </section>
        <section className="xl:h-[50vh]">
          <CardHome />
        </section>
      </main>
      {isSignedIn ? <Footer /> : <FooterGuest />}
    </div>
  );
};

export default Umkm;
