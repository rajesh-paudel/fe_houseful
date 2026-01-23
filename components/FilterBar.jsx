"use client";
import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const FilterBar = () => {
  const filterOptions = ["Price", "Home type", "Beds", "Baths"];

  return (
    <div className="  sticky top-16 z-30 bg-white border-b border-gray-200 w-full py-3 px-12 ">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Main Filters Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Listing Status Toggle */}
          <div className="h-8 w-[1px] bg-gray-300 mx-2 hidden md:block" />

          <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50">
            For sale: All <ChevronDown size={16} />
          </button>

          {/* Dynamic Filter Dropdowns */}
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50"
            >
              {filter} <ChevronDown size={16} />
            </button>
          ))}

          <button className="text-sm  text-gray-900  ml-2 pb-0.5 border-b border-gray-900 cursor-pointer">
            Clear all
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-gray-500">Newest</span>
            <ChevronDown size={14} />
          </div>
          <button className="bg-[#004d4d] text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            Map view
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
