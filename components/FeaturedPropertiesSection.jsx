"use client";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { cityToSlug } from "@/lib/slug";

const FeaturedPropertiesSection = ({
  properties = [],
  cityName = "Toronto",
  citySlug,
  sectionId,
}) => {
  const scrollRef = useRef(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Function to check if scrolling is possible
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // Show left arrow if we have scrolled more than 5px
      setShowLeftArrow(scrollLeft > 5);

      // Show right arrow only if the content is wider than the container
      // AND we haven't reached the end (with 5px buffer)
      setShowRightArrow(
        scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 5,
      );
    }
  };

  // Check on mount
  useEffect(() => {
    checkScroll();
    // Re-check on window resize
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [properties]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!properties?.length) return null;

  const targetCitySlug = citySlug || cityToSlug(cityName);

  return (
    <section
      id={sectionId}
      className="pt-12 md:pt-16 bg-white w-full overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        {/* Title Row */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 tracking-tight">
            {cityName} Listings
          </h2>
          <Link
            href={`/${targetCitySlug}`} scroll={true}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            }
            className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700 hover:text-amber-700 transition-colors whitespace-nowrap"
          >
            See all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-gray-700 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto gap-5 scrollbar-hide snap-x snap-proximity pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {properties?.map((property) => (
              <div
                key={property.ListingKey || property.id}
                className="
    
    w-[80%]
    sm:w-[70%]
    md:w-[320px]
    lg:w-[360px]
    snap-start
  "
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-100 p-2 rounded-full hidden md:flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-gray-700 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;

