"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <nav
      className={`
      flex items-center h-16 justify-between px-8 py-4 w-full z-50 transition-colors
      ${
        isHome
          ? "absolute top-0 text-white bg-transparent"
          : "sticky top-0 text-slate-900 bg-white border-b border-gray-300"
      }
    `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link
          href={"/"}
          className="font-bold text-2xl tracking-tight flex items-center gap-1"
        >
          <span className="text-4xl font-serif font-medium"> houseful</span>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4 ">
        {/* navigation links  */}
        <div className="hidden md:flex items-center gap-3 font-medium text-sm">
          <div className="relative inline-block group">
            <div className=" cursor-pointer flex items-end justify-center rounded-full py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all   ">
              <span> Buy</span>

              <ChevronDown className="w-4 h-4 " />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2  top-full pt-2 hidden group-hover:block w-[700px] z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-3 gap-8">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 pl-2">
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
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 pl-2">
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
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 pl-2">
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
            <div className="absolute left-1/2 -translate-x-1/2  top-full pt-2 hidden group-hover:block  w-lg z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 gap-4 ">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 pl-2">
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
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 pl-2">
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
          <div className="group relative cursor-pointer flex items-end justify-center rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  ">
            Mortgage
            <ChevronDown className="w-4 h-4" />
          </div>
          <a
            href="#"
            className=" rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  "
          >
            Agents
          </a>
          <a
            href="#"
            className=" rounded-full  py-1.5 px-4 hover:bg-emerald-50 hover:text-black  transition-all  "
          >
            Resources
          </a>
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline font-medium rounded-full py-1 px-3 hover:bg-emerald-50 hover:text-black  cursor-pointer ">
            1-833-709-1946
          </span>
          <Link
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
