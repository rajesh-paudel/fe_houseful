"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Grid, Home, X } from "lucide-react";

export default function PropertyMediaGallery({ images = [] }) {
  const validImages = useMemo(
    () => images.filter((src) => typeof src === "string" && src.length > 0),
    [images],
  );

  const total = validImages.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [brokenIndices, setBrokenIndices] = useState(new Set());

  if (total === 0) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-50 flex flex-col items-center justify-center text-gray-400 rounded-xl border border-dashed border-gray-300">
        <Home size={48} strokeWidth={1} />
        <p className="mt-2 font-medium">No Photos Available</p>
      </div>
    );
  }

  const gridImages = validImages.slice(0, 5);

  const openModal = (index = 0) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const markBroken = (index) => {
    setBrokenIndices((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, total]);

  const previewIndices =
    total > 0
      ? [
          (activeIndex - 1 + total) % total,
          activeIndex,
          (activeIndex + 1) % total,
        ]
      : [];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-2 h-[340px] sm:h-[420px] md:h-[520px]">
        <button
          type="button"
          onClick={() => openModal(0)}
          className="relative col-span-1 row-span-1 rounded-xl overflow-hidden bg-gray-100"
          aria-label="Open image 1"
        >
          {gridImages[0] && !brokenIndices.has(0) ? (
            <img
              src={gridImages[0]}
              alt="Property main"
              onError={() => markBroken(0)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-300">
              <Home size={36} />
            </div>
          )}
        </button>

        <div className="hidden sm:flex flex-col gap-2">
          {[gridImages[1], gridImages[2]].map((src, i) => (
            <button
              key={`col2-${i}`}
              type="button"
              onClick={() => openModal(i + 1)}
              className="relative flex-1 rounded-xl overflow-hidden bg-gray-100"
              aria-label={`Open image ${i + 2}`}
            >
              {src && !brokenIndices.has(i + 1) ? (
                <img
                  src={src}
                  alt={`Property ${i + 2}`}
                  onError={() => markBroken(i + 1)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-300">
                  <Home size={28} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex flex-col gap-2">
          {[gridImages[3], gridImages[4]].map((src, i) => (
            <button
              key={`col3-${i}`}
              type="button"
              onClick={() => openModal(i + 3)}
              className="relative flex-1 rounded-xl overflow-hidden bg-gray-100"
              aria-label={`Open image ${i + 4}`}
            >
              {src && !brokenIndices.has(i + 3) ? (
                <img
                  src={src}
                  alt={`Property ${i + 4}`}
                  onError={() => markBroken(i + 3)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-300">
                  <Home size={28} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => openModal(0)}
        className="absolute bottom-3 right-3 bg-white text-gray-800 text-xs sm:text-sm px-4 py-2 rounded-full backdrop-blur-md hover:bg-gray-200 transition-colors flex items-center justify-between cursor-pointer gap-2 border border-gray-400"
      >
        <Grid className="w-4 h-4" />
        View all images
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative max-w-6xl mx-auto h-full px-4 py-6 flex flex-col">
            <div className="flex items-center justify-between text-white mb-4">
              <div className="text-sm tracking-widest">
                {activeIndex + 1} / {total}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close gallery"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 md:left-2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              {validImages[activeIndex] && !brokenIndices.has(activeIndex) ? (
                <img
                  src={validImages[activeIndex]}
                  alt={`Property ${activeIndex + 1}`}
                  onError={() => markBroken(activeIndex)}
                  className="max-h-[65vh] w-full object-contain rounded-xl bg-black/20"
                />
              ) : (
                <div className="h-[65vh] w-full flex items-center justify-center rounded-xl bg-white/5 text-white/70">
                  <Home size={52} />
                </div>
              )}

              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 md:right-2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex justify-center gap-2">
                {previewIndices.map((i, slotIndex) => (
                  <button
                    key={`thumb-${i}-${slotIndex}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border ${
                      i === activeIndex
                        ? "border-white"
                        : "border-white/20 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    {validImages[i] && !brokenIndices.has(i) ? (
                      <img
                        src={validImages[i]}
                        alt={`Thumbnail ${i + 1}`}
                        onError={() => markBroken(i)}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white/60">
                        <Home size={20} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
