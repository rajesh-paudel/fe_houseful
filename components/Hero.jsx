"use client";

import { Search, MapPin } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { cityToSlug } from "@/lib/slug";

const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
    router.push(`/${cityToSlug(city)}`);
  };

  const looksLikeListingInput = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (/\d/.test(trimmed)) return true;
    return /^[A-Za-z0-9-]{6,}$/.test(trimmed);
  };

  const handleSearch = async () => {
    const raw = query.trim();
    if (!raw || isSearching) return;

    const exactCity = cities.find(
      (city) => city.toLowerCase() === raw.toLowerCase(),
    );
    if (exactCity) {
      handleSelect(exactCity);
      return;
    }

    const firstPartialCity = cities.find((city) =>
      city.toLowerCase().includes(raw.toLowerCase()),
    );

    const shouldLookupListingFirst = looksLikeListingInput(raw);

    if (!shouldLookupListingFirst && firstPartialCity) {
      handleSelect(firstPartialCity);
      return;
    }

    try {
      setIsSearching(true);
      const res = await fetch(`/api/property-lookup?q=${encodeURIComponent(raw)}`);
      const data = await res.json();

      if (res.ok && data?.found && data?.city && data?.listingKey) {
        setIsExpanded(false);
        nProgress.start();
        router.push(`/${cityToSlug(data.city)}/${data.listingKey}`);
        return;
      }
    } catch {
      // Swallow lookup errors and fallback to city-based behavior.
    } finally {
      setIsSearching(false);
    }

    if (firstPartialCity) {
      handleSelect(firstPartialCity);
      return;
    }

    if (!looksLikeListingInput(raw)) {
      setIsExpanded(false);
      nProgress.start();
      router.push(`/${cityToSlug(raw)}`);
    }
  };

  const quickCities = ["Toronto", "Richmond Hill", "Markham", "Bradford"];

  return (
    <section className="relative min-h-[68vh] sm:min-h-[74vh] md:min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
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
      <div className="relative z-10 max-w-3xl w-full text-center text-white space-y-5 sm:space-y-6 md:space-y-7 py-8 sm:py-10">
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <h1 className="font-serif font-bold text-[clamp(1rem,5vw,3.9rem)] tracking-tight leading-tight whitespace-nowrap">
            Elevated Living Starts Here
          </h1>
        </div>

        {/* SEARCH BAR CONTAINER */}
        <div
          ref={containerRef}
          className="relative max-w-xl mx-auto w-full group"
        >
          <div
            className={cn(
              "relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl",
              isExpanded && suggestions.length > 0
                ? "rounded-t-3xl"
                : "rounded-full",
            )}
          >
            <Search className="absolute left-4 sm:left-6 w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
            <input
              type="text"
              placeholder="Search by MLS® Number or Address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-full h-14 sm:h-16 bg-transparent pl-12 sm:pl-16 pr-4 sm:pr-8 text-white placeholder:text-white/60 focus:outline-none text-base sm:text-lg"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute hidden sm:block right-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base transition-all"
            >
              {isSearching ? "SEARCHING..." : "SEARCH"}
            </button>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              aria-label="Search"
              className="absolute sm:hidden right-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-3 py-2 rounded-full font-bold text-xs transition-all"
            >
              GO
            </button>
          </div>

          {/* AUTOCOMPLETE SUGGESTIONS */}
          {isExpanded && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white rounded-b-2xl sm:rounded-b-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="w-full px-5 sm:px-8 py-3 sm:py-4 text-left text-gray-900 hover:bg-blue-50 transition flex items-center gap-3 border-b border-gray-100 last:border-0"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* QUICK LINKS / TRENDING */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4 animate-in fade-in duration-1000 delay-300">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-widest text-white/60">
            Trending:
          </span>
          {quickCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className="text-xs sm:text-sm font-medium border border-white/30 hover:bg-white hover:text-black px-3 sm:px-4 py-1.5 rounded-full transition-all"
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
