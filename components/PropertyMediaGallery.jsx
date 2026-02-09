"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

export default function PropertyMediaGallery({ images = [] }) {
  // Filter out invalid image paths
  const validImages = useMemo(
    () => images.filter((src) => typeof src === "string" && src.length > 0),
    [images],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const total = validImages.length;

  // Navigation handlers
  const goPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Fallback if no images are provided
  if (total === 0) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-100 flex flex-col items-center justify-center text-gray-400 rounded-lg border border-dashed border-gray-300">
        <Home size={48} strokeWidth={1} />
        <p className="mt-2 font-medium">No Photos Available</p>
      </div>
    );
  }

  const mainImage = validImages[activeIndex];
  const getImageByOffset = (offset) =>
    validImages[(activeIndex + offset) % total];

  return (
    <div className="relative">
      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </>
      )}

      {/* MOBILE: Single sliding main image */}
      <div className="md:hidden h-[320px] sm:h-[420px] bg-gray-200 overflow-hidden">
        <img
          src={mainImage}
          alt="Property Main"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* DESKTOP/TABLET: Main + 2x2 grid */}
      <div className="hidden md:grid grid-cols-4 gap-2 h-[500px] lg:h-[600px]">
        <div className="col-span-2 relative overflow-hidden bg-gray-200">
          <img
            src={mainImage}
            alt="Property Main"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative bg-gray-100 overflow-hidden">
              {getImageByOffset(i + 1) ? (
                <img
                  src={getImageByOffset(i + 1)}
                  alt={`Property thumbnail ${i}`}
                  className="w-full h-full object-cover hover:opacity-90 cursor-pointer transition-opacity"
                  onClick={() => setActiveIndex((activeIndex + i + 1) % total)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Home size={32} strokeWidth={1} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
