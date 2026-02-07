"use client";

import {
  Menu,
  X,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCommunitiesOpen, setIsMobileCommunitiesOpen] = useState(false);

  const communities = [
    "Toronto",
    "Richmond Hill",
    "Markham",
    "Bradford",
    "Vaughan",
    "Aurora",
    "Oakville",
    "Barrie",
    "Whitby",
  ];

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SELLERS", href: "#selling" },
    { name: "BUYERS", href: "#buying" },
    { name: "SEARCH", href: "#listings" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "#contact" },
    { name: "OPEN HOUSES", href: "#open-houses" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileCommunitiesOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white text-black border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex shrink-0">
              <img
                src="/homeReality.svg"
                className="h-9 w-auto md:h-11 lg:h-12 object-contain"
                alt="Jasin Buyn Realtor"
              />
            </Link>

            <div className="hidden lg:flex flex-col items-end gap-2 ml-4">
              {/* Top Row */}
              <div className="flex items-center gap-3 xl:gap-4 text-sm font-bold tracking-wider text-gray-900">
                <Link
                  href="tel:647-409-4848"
                  className="hover:text-blue-600 transition-colors"
                >
                  647-471-9000
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="mailto:jasin.buyn@gmail.com"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5" /> jason@jasonbyun.com
                </Link>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                  <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                </div>
                <span className="text-gray-300">|</span>
                <User className="w-5 h-5 cursor-pointer hover:text-blue-600" />
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Bottom Row Navigation */}
              <nav className="flex items-center gap-4 xl:gap-6 pl-3">
                <Link
                  href="/"
                  className="text-sm font-bold tracking-widest text-gray-800 hover:text-blue-600"
                >
                  HOME
                </Link>

                {/* COMMUNITIES DROPDOWN */}
                <div className="relative group py-2">
                  <button className="flex items-center gap-1 text-sm font-bold tracking-widest text-gray-800 group-hover:text-blue-600 transition-colors">
                    COMMUNITIES{" "}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu  */}
                  <div className="absolute top-full left-0 w-40 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                    <div className="flex flex-col py-2">
                      {communities.map((city) => (
                        <Link
                          key={city}
                          href={`${city}`}
                          className="px-6 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors border-b last:border-0 border-gray-50"
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-bold tracking-widest text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <button
              className="lg:hidden p-2 text-black"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[60] h-full w-72 md:w-80 bg-white text-black shadow-2xl transform transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <span className="font-bold tracking-widest text-lg">MENU</span>
          <button onClick={closeMenu} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-4 overflow-y-auto h-[calc(100%-80px)]">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-sm font-bold tracking-widest"
          >
            HOME
          </Link>

          {/* Mobile Communities Accordion */}
          <div>
            <button
              onClick={() =>
                setIsMobileCommunitiesOpen(!isMobileCommunitiesOpen)
              }
              className="flex items-center justify-between w-full text-sm font-bold tracking-widest py-2"
            >
              COMMUNITIES{" "}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isMobileCommunitiesOpen && "rotate-180",
                )}
              />
            </button>
            {isMobileCommunitiesOpen && (
              <div className="flex flex-col pl-4 mt-2 gap-3 border-l-2 border-gray-100">
                {communities.map((city) => (
                  <Link
                    key={city.name}
                    href={city.href}
                    onClick={closeMenu}
                    className="text-sm text-gray-600 py-1"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-bold tracking-widest border-b border-gray-50 pb-2"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <Link
              href="tel:647-409-4848"
              className="text-md font-bold text-blue-600"
            >
              647-409-4848
            </Link>
            <Link
              href="mailto:jasin.buyn@gmail.com"
              className="text-xs text-gray-500"
            >
              jasin.buyn@gmail.com
            </Link>
          </div>
        </nav>
      </aside>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      <div className=" h-16 lg:h-26 "></div>
    </>
  );
};

export default Header;
