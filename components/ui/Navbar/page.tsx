"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const links = [
  { title: "Home", path: "/" },
  { title: "Tentang", path: "/tentang" },
  { title: "Umkm", path: "/umkm" },
  { title: "Daftar", path: "/daftar" },
];

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[1.3rem] px-2 py-1 rounded ${
                  isActive
                    ? "text-lokerlo font-semibold"
                    : "hover:bg-white hover:text-lokerlo font-semibold"
                }`}
              >
                {link.title}
              </Link>
            );
          })}

          {/* Auth Section */}
          <SignedOut>
            <Button className="font-semibold text-white">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileNav links={links} onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Nav;
