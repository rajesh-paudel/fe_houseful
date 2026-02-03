"use client";

import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Buying", href: "#" },
    { name: "Selling", href: "#" },
    { name: "Listings", href: "#listings" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 w-32">
              <img
                src="/homeReality.svg"
                className="object-contain w-full "
                alt="home reality"
              ></img>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-500
                  after:transition-all hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="tel:+16475551234"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Phone className="w-4 h-4" />
                <span>(647) 555-1234</span>
              </Link>
              <Button size="sm">Book Call</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={closeMenu}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b">
          <span className="font-semibold text-gray-900">Menu</span>
          <button onClick={closeMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-base font-medium text-gray-700 hover:text-gray-900"
            >
              {link.name}
            </a>
          ))}

          <Button className="mt-6 w-full">Book Call</Button>
        </nav>
      </aside>
    </>
  );
};

export default Header;
