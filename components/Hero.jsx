"use client";

import { Search, MapPin } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";

const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const cities = [
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

  const quickCities = ["Toronto", "Richmond Hill", "Markham", "Bradford"];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 ">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 max-w-4xl w-full text-center text-white space-y-8 py-5">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <h1 className="font-serif font-bold text-5xl md:text-7xl tracking-tight leading-[1.1]">
            Elevated Living <br />
            Starts Here
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/90 font-light tracking-wide">
            Discover luxury properties and vibrant communities across the
            Greater Toronto Area.
          </p>
        </div>

        {/* SEARCH BAR CONTAINER */}
        <div
          ref={containerRef}
          className="relative max-w-2xl mx-auto w-full group"
        >
          <div
            className={cn(
              "relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl",
              isExpanded && suggestions.length > 0
                ? "rounded-t-3xl"
                : "rounded-full",
            )}
          >
            <Search className="absolute left-6 w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Enter city, neighborhood, or MLS#"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full h-16 bg-transparent pl-16 pr-8 text-white placeholder:text-white/60 focus:outline-none text-lg"
            />
            <button
              onClick={() => query && handleSelect(query)}
              className="absolute hidden sm:block right-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              SEARCH
            </button>
          </div>

          {/* AUTOCOMPLETE SUGGESTIONS */}
          {isExpanded && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white rounded-b-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="w-full px-8 py-4 text-left text-gray-900 hover:bg-blue-50 transition flex items-center gap-3 border-b border-gray-100 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* QUICK LINKS / TRENDING */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4 animate-in fade-in duration-1000 delay-300">
          <span className="text-sm font-semibold uppercase tracking-widest text-white/60">
            Trending:
          </span>
          {quickCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className="text-sm font-medium border border-white/30 hover:bg-white hover:text-black px-4 py-1.5 rounded-full transition-all"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple utility for merging classes if you don't have it
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default Hero;
