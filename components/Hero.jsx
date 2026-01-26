"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROPERTIES } from "@/utils/data";
import nProgress from "nprogress";
const Hero = ({ properties }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef(null);

  // Get unique cities from properties
  const cities = Array.from(new Set(PROPERTIES?.map((p) => p.city))).sort();
  const suggestions =
    query.trim() === ""
      ? [] // Show nothing if query is empty (or change to 'cities' to show all)
      : cities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase()),
        );
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

  const handleSelect = (city) => {
    setQuery(city);
    setIsExpanded(false);
    nProgress.start();
    router.push(`/${city}`);
  };

  return (
    <section className="relative h-96 flex flex-col items-center justify-center text-white text-center px-4 ">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.webp')" }}
      />

      <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
        Find, finance and own your home
      </h1>

      {/* Search Bar */}
      <div
        className={`w-full max-w-xl bg-white rounded-full relative shadow-xl ${isExpanded && suggestions.length > 0 ? "rounded-b-none rounded-t-3xl" : ""}`}
        ref={containerRef}
      >
        <div className="relative">
          <div className="absolute left-5 top-4 text-gray-800">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="w-full py-3 pl-14 pr-6 rounded-full text-black text-lg focus:outline-none"
          />

          {/* Suggestions Dropdown */}
          {isExpanded && suggestions.length > 0 && (
            <div className="absolute  w-full bg-white border  shadow-lg z-50">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900 rounded-lg"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
