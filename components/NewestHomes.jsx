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
    <section className="py-20 bg-white w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        {/* Title Section */}
        <div className=" mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Featured Properties
          </h2>
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
            className="px-8 py-3 rounded-full  bg-green-300 hover:bg-green-200 text-slate-700 font-bold cursor-pointer   transition-colors duration-300"
          >
            Explore all homes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewestHomes;
