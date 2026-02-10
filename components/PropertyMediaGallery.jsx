"use client";

import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

export default function PropertyMediaGallery({ images = [] }) {
  const validImages = useMemo(
    () => images.filter((src) => typeof src === "string" && src.length > 0),
    [images],
  );

  const total = validImages.length;
  const scrollerRef = useRef(null);

  if (total === 0) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-50 flex flex-col items-center justify-center text-gray-400 rounded-xl border border-dashed border-gray-300">
        <Home size={48} strokeWidth={1} />
        <p className="mt-2 font-medium">No Photos Available</p>
      </div>
    );
  }

  const mainImage = validImages[0];
  const restImages = validImages.slice(1);

  const scroll = (direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative ">
      {/* Navigation Controls */}
      {total > 1 && (
        <>
          <button
            onClick={() => scroll("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full  hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full  hidden md:block"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Main Scroller Container */}
      <div
        ref={scrollerRef}
        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex h-[400px] sm:h-[500px] md:h-[600px] w-max gap-1">
          {/* Column 1: The Big Featured Image */}
          <div className="relative h-full aspect-[4/5] md:aspect-[4/3] snap-start bg-gray-200 overflow-hidden">
            <img
              src={mainImage}
              alt="Property main"
              className="absolute inset-0 w-full h-full object-cover "
            />
          </div>

          {Array.from({ length: Math.ceil(restImages.length / 2) }).map(
            (_, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col h-full gap-1 snap-start"
              >
                {restImages
                  .slice(colIndex * 2, colIndex * 2 + 2)
                  .map((src, i) => (
                    <div
                      key={i}
                      className="relative h-1/2 aspect-[4/3] md:aspect-video bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Property ${colIndex * 2 + i + 2}`}
                        className="absolute inset-0 w-full h-full object-cover "
                      />
                    </div>
                  ))}

                {/* Fallback if a column only has 1 image (odd number of total images) */}
                {restImages.slice(colIndex * 2, colIndex * 2 + 2).length ===
                  1 && (
                  <div className="h-1/2 aspect-[4/3] md:aspect-video bg-gray-50 flex items-center justify-center">
                    <Home className="text-gray-200" size={32} />
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Mobile Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full md:hidden">
        Swipe to see all photos
      </div>
    </div>
  );
}
