"use client";
import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { PROPERTIES } from "@/utils/data";
import { useState, useEffect } from "react";
import Link from "next/link";
const NewestHomes = () => {
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
  }, [PROPERTIES]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset =
        direction === "left" ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const filteredProperies = PROPERTIES.filter((prop) => prop.city == "Toronto");

  return (
    <section id="listings" className="py-20 bg-white w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        {/* Title Section */}
        <div className="mb-14 space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="h-[1px] w-8 bg-amber-600/40"></span>
            <p className="text-center text-amber-600 font-bold tracking-[0.3em] text-[11px] uppercase">
              Discover Our
            </p>
            <span className="h-[1px] w-8 bg-amber-600/40"></span>
          </div>

          <h2 className="text-center text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
            Featured{" "}
            <span className="italic font-light text-slate-700">Listings</span>
          </h2>

          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
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
            {filteredProperies?.map((property) => (
              <div
                key={property.id}
                className="
    
    w-[85%]
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

        {/* Bottom Action Button */}
        <div className="mt-4 flex justify-center">
          <Link
            href={"/Toronto"}
            className="px-8 py-3 rounded-full  bg-yellow-500 hover:bg-yellow-300 text-white font-bold cursor-pointer   transition-colors duration-300"
          >
            Explore all homes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewestHomes;
