"use client";
import { Navigation, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
const Hero = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  // Close the dropdown if the user clicks outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative h-96 flex flex-col items-center justify-center text-white text-center px-4 ">
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.webp')",
        }}
      />

      <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
        Find, finance and own your home
      </h1>

      {/* Search Bar */}
      <div
        className="w-full max-w-xl  bg-white rounded-full"
        ref={containerRef}
      >
        <div className="w-full relative bg-white rounded-full">
          <div className="absolute left-5 top-4 text-gray-800">
            <Search className="w-5 h-5" />
          </div>
          <input
            onFocus={() => setIsExpanded(true)}
            type="text"
            placeholder="Search by address, city, neighbourhood or postal code"
            className="w-full py-3 pl-14 pr-6 rounded-full text-black text-lg focus:outline-none shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
