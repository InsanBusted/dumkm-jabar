import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TypingText from "@/components/ui/TypingText";
import HeaderGuest from "@/components/HeaderGuest/page";
import FooterGuest from "@/components/FooterGuest/page";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/dumkm-jabar");

  return (
    <>
      <HeaderGuest />
      <main className="flex h-screen flex-col items-center justify-center gap-6 px-6 text-center pt-[10rem] pb-[7rem]">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/store.svg"
            alt="Logo Etalase Digital UMKM Jawa Barat"
            width={300}
            height={300}
          />
          <span className="font-extrabold tracking-tight text-4xl lg:text-5xl text-lokerlo">
            Etalase Digital UMKM Jawa Barat
          </span>
        </div>

        <TypingText />

        <Button size="lg" asChild>
          <Link href="/sign-in">Masuk Aplikasi</Link>
        </Button>
      </main>
      <FooterGuest />
    </>
  );
}
