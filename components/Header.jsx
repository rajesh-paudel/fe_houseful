"use client";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Listings", href: "#listings" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="font-semibold text-gray-900 text-sm">JB</span>
            </div>
            <div>
              <p className="text-gray-900 font-medium text-sm">Jason Byun</p>
              <p className="text-gray-500 text-[10px] tracking-wider uppercase">
                Real Estate
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="tel:+16475551234"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900"
            >
              <Phone className="w-3 h-3" />
              <span>(647) 555-1234</span>
            </Link>
            <Button variant="default" size="sm">
              Book Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-gray-500 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="default" size="sm" className="mt-2 w-full">
                Book Call
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
