"use client";

import { usePathname } from "next/navigation";
import Nav from "../ui/Navbar/page";
import SilentUserInit from "../SilentUserInit";

const ClientHeader = () => {
  const pathname = usePathname();

  if (pathname.includes("/sign-in")) return null;

  return (
    <div className="fixed w-full z-50 bg-white text-black shadow-lg">
      <header className="flex items-center justify-between py-[15px] w-[80%] m-auto">
        <div>
          <h1 className="font-bold text-[2rem] ">
            DUMKM <span className="hidden md:inline xl:inline">JABAR</span>
          </h1>
        </div>
        <div className="z-50">
          <Nav />
          <SilentUserInit />
        </div>
      </header>
    </div>
  );
};

export default ClientHeader;
