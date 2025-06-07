"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/sign-in") return null;
  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-bold">DUMKM JAWA BARAT</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </div>
      </div>
    </>
  );
}
