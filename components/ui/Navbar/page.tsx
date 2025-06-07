"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [umkmSlug, setUmkmSlug] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUmkmSlug() {
      try {
        const res = await fetch("/api/umkm-slug");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setUmkmSlug(data.slug);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUmkmSlug(null);
      }
    }

    fetchUmkmSlug();
  }, []);

  const rawLinks = [
    { title: "Home", path: "/" },
    { title: "Tentang", path: "/tentang" },
    { title: "Umkm", path: "/umkm" },
    umkmSlug && { title: "Kelola Umkm", path: `/kelola-umkm/${umkmSlug}` },
    { title: "Daftar", path: "/daftar" },
  ].filter(Boolean) as { title: string; path: string }[];

  return (
    <nav className="w-full top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {rawLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[1.3rem] px-2 py-1 rounded transition-all ${
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
        <MobileNav links={rawLinks} onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Nav;
