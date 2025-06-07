import { SignedIn, SignedOut } from "@clerk/nextjs";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import HeaderGuest from "@/components/HeaderGuest/page";
import CardHome from "@/components/Home/Card/page";
import Jumbotron from "@/components/Jumbotron/page";
import FooterGuest from "@/components/FooterGuest/page";
import UmkmPage from "@/components/UMKM/page";
import { getAllUmkm } from "@/lib/actions/getAllUmkm";

const Umkm = async () => {
    const data = await getAllUmkm();
  const approved = data.filter((umkm) => umkm.status === "APPROVED");

  return (
    <div className="min-h-screen flex flex-col">
        <SignedIn><Header /></SignedIn>
        <SignedOut><HeaderGuest /></SignedOut>
      <main>
        <section className="h-[65vh] xl:h-[60vh]">
          <Jumbotron link="UMKM" />
        </section>
        <section className="xl:h-[40vh]">
          <CardHome />
        </section>
        <section className="w-[80vw] mx-auto bg-white pt-[3rem]">
      <UmkmPage data={approved} />
    </section>
      </main>
       <SignedIn><Footer /></SignedIn>
        <SignedOut><FooterGuest /></SignedOut>
    </div>
  );
};

export default Umkm;
