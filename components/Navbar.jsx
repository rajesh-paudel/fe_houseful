"use client";
import React from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MenuSidebar from "./MenuSidebar";
const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onlyLogo =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav
      className={`
      flex items-center h-16 justify-start   lg:justify-between px-4 md:px-8 py-4 w-full z-50 transition-colors
      ${
        isHome
          ? "absolute top-0 text-white bg-transparent py-12"
          : "sticky top-0 text-slate-900 bg-white border-b border-gray-300"
      }
    `}
    >
      {!onlyLogo && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="py-4 mr-2 lg:hidden"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Sidebar Component */}
      <MenuSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link
          href={"/"}
          className="font-bold text-2xl tracking-tight flex items-center gap-1"
        >
          <span className="text-4xl font-serif font-medium"> houseful</span>
        </Link>
      </div>

      {!onlyLogo && (
        <div className={` hidden lg:flex items-center justify-center  `}>
          {/* navigation links  */}
          <div className="hidden md:flex items-center gap-1 font-medium text-sm">
            <div className="relative inline-block group">
              <div className=" cursor-pointer flex items-end justify-center rounded-full py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all   ">
                <span> Buy</span>

                <ChevronDown className="w-4 h-4 " />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2  top-full pt-2 hidden group-hover:block w-xl z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-3 gap-3">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Home for sale
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2 "
                    >
                      Homes for sale near me
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Calgary homes for sale
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Calgary open houses
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Features in the city
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2 "
                    >
                      Contact an agent
                    </Link>
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Home values
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Calgary recently sold
                    </Link>
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Buying resources
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      How much home can I afford
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Homebuying checklist
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Tips for first-time homebuyers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative  group">
              <div className=" cursor-pointer  flex items-end justify-center rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  ">
                <span> Sell</span>

                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2  top-full pt-2 hidden group-hover:block  w-md z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-3 ">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Home values
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Calgary recently sold
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Recently sold near me
                    </Link>
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Selling resources
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Home selling how-to
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      How to stage a home
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      How to do an open house
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="relative  group">
              <div className=" cursor-pointer  flex items-end justify-center rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  ">
                <span> Mortgage</span>

                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2  top-full pt-2 hidden group-hover:block  w-lg z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-3 ">
                 
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Mortgage
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Get pre-qualified
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Get pre-approved
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Pre-qualified vs Pre-approved
                    </Link>
                  </div>

                
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg  pl-2">
                      Mortgage resources
                    </h3>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Home to choose a lender
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:bg-emerald-50 rounded-xl px-2 py-2"
                    >
                      Mortgage tips
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
            <a
              href="#"
              className=" rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  "
            >
              Agents
            </a>
            <Link
              href="/blog"
              className=" rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  "
            >
              Resources
            </Link>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline font-medium rounded-full py-1 px-3 hover:bg-emerald-50 hover:text-black  cursor-pointer ">
              1-833-709-1946
            </span>
            {/* <Link
              href="/login"
              className={`px-4 py-1.5 rounded-full border   transition-all  hover:bg-emerald-50 hover:text-black cursor-pointer  ${
                isHome
                  ? "border-white"
                  : "sticky top-0 text-slate-900  bg-white border-b border-gray-700"
              } `}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-1.5 rounded-full bg-white border border-gray-700  text-black font-semibold  transition-all  hover:bg-emerald-50 hover:text-black cursor-pointer  "
            >
              Sign up
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
