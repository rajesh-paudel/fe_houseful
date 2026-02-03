"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROPERTIES } from "@/utils/data";
import nProgress from "nprogress";

const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const cities = Array.from(new Set(PROPERTIES?.map((p) => p.city))).sort();

  const suggestions =
    query.trim() === ""
      ? []
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
    <section className="relative min-h-[75vh] flex items-center justify-center px-4 mt-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.webp')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center text-white">
        <h1 className="font-serif font-semibold text-4xl md:text-6xl leading-tight">
          Find a place <br className="hidden sm:block" />
          you’ll love to call home
        </h1>

        <p className="mt-4 text-base md:text-lg text-white/80">
          Buy, sell, and discover properties in the neighborhoods that fit your
          life.
        </p>

        {/* Search */}
        <div
          ref={containerRef}
          className={`relative mx-auto mt-10 w-full max-w-2xl bg-white shadow-2xl transition-all ${
            isExpanded && suggestions.length > 0
              ? "rounded-2xl"
              : "rounded-full"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by city or neighborhood"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full h-14 pl-14 pr-6 text-base text-gray-900 rounded-full focus:outline-none"
            />
          </div>

          {isExpanded && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border shadow-lg overflow-hidden z-50">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="w-full px-5 py-3 text-left text-gray-800 hover:bg-gray-100 transition"
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
