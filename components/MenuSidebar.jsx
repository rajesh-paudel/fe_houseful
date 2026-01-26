"use client";
import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// --- Reusable NavItem Component ---
const NavItem = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = !!children;

  return (
    <div>
      <div
        className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer py-2"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <span>{title}</span>
        {hasChildren && (
          <ChevronDown
            size={20}
            className={`transition-transform ${
              isExpanded ? "rotate-180 duration-700" : "duration-300"
            }`}
          />
        )}
      </div>

      {/* ALWAYS MOUNTED */}
      <div
        className={`overflow-hidden  ease-linear transition-[max-height]
          ${isExpanded ? "max-h-[1000px] duration-700" : "max-h-0 duration-300"}
        `}
      >
        <ul className="mt-2 ml-4 space-y-4 text-[15px] text-gray-700">
          {children}
        </ul>
      </div>
    </div>
  );
};

// --- Main Sidebar Component ---
const MenuSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-50 transform transition-transform duration-500 ease-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-end p-4 pl-6 sticky top-0 bg-white z-10 ">
          {/* <div className="flex gap-3">
            <Link
              href={"/login"}
              onClick={onClose}
              className="px-5 py-2 border border-gray-800 rounded-full font-semibold text-sm hover:bg-gray-50 text-gray-800"
            >
              Log in
            </Link>
            <Link
              href={"/signup"}
              onClick={onClose}
              className="px-5 py-2 bg-[#004d4d] text-white rounded-full font-semibold text-sm"
            >
              Sign up
            </Link>
          </div> */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full "
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="px-6 flex flex-col space-y-2 ml-2">
          <Link
            href={"/"}
            onClick={onClose}
            className="font-semibold text-gray-800 py-2 "
          >
            Home
          </Link>

          {/* Buy Section */}
          <NavItem title="Buy">
            <li className="font-bold">Home for sale</li>
            <li className="hover:text-teal-700 cursor-pointer">
              Homes for sale near me
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Calgary homes for sale
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Calgary open houses
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Features in the city
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Contact an agent
            </li>
            <li className="font-bold">Home values</li>
            <li className="hover:text-teal-700 cursor-pointer">
              Calgary recently sold
            </li>
            <li className="font-bold">Buying resources</li>
            <li className="hover:text-teal-700 cursor-pointer">
              How much home can i afford
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Homebuying checklist
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Tips for first-time home buyers
            </li>
          </NavItem>

          {/* Sell Section */}
          <NavItem title="Sell">
            <li className="font-bold">Home values</li>
            <li className="hover:text-teal-700 cursor-pointer">
              Calgary recently sold
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Recently sold near me
            </li>
            <li className="font-bold">Selling resources</li>
            <li className="hover:text-teal-700 cursor-pointer">
              Home selling how-to
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              How to stage a home
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              How to do an open house
            </li>
          </NavItem>

          {/* Mortgage Section */}
          {/* <NavItem title="Mortgage">
            <li className="font-bold">Mortgage</li>
            <li className="hover:text-teal-700 cursor-pointer">
              Get pre-qualified
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Get pre-approved
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Pre-approval vs Pre-qualification
            </li>
            <li className="font-bold">Mortgage resources</li>
            <li className="hover:text-teal-700 cursor-pointer">
              How to choose a lender
            </li>
            <li className="hover:text-teal-700 cursor-pointer">
              Mortgage tips
            </li>
          </NavItem> */}

          <div className="font-semibold text-gray-800 py-2  border-gray-100">
            Agents
          </div>
          <div className="font-semibold text-gray-800 py-2">Resources</div>
        </nav>
      </aside>
    </>
  );
};

export default MenuSidebar;
