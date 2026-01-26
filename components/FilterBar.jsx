"use client";
import React, { useState } from "react";
import {
  Check,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRef, useEffect } from "react";

const FilterBar = ({ properties, filters, setFilters, sortBy, setSortBy }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [homeTypeDropdown, setHomeTypeDropdown] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const homeTypes = Array.from(
    new Set(properties.map((p) => p.propertyType)),
  ).sort();
  const bedOptions = [1, 2, 3, 4, 5];
  const bathOptions = [1, 2, 3, 4, 5];
  const sortOptions = [
    "Newest",
    "Oldest",
    "Highest Price",
    "Lowest Price",
    "Highest price / sq. ft.",
    "Lowest price / sq. ft.",
  ];

  const clearAll = () =>
    setFilters({ beds: null, baths: null, homeType: null });

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-16 z-46 bg-white border-b border-gray-200 w-full py-3 px-4 md:px-8">
        <div className="max-w-8xl mx-auto flex items-center justify-between gap-2">
          {/* Filters Button */}
          <div className="flex items-center gap-3">
            {/* Desktop inline filters */}
            <div className="hidden md:flex items-center gap-3">
              {/* Beds dropdown */}
              <DesktopDropdown
                label="Beds"
                value={filters.beds ? `${filters.beds}+` : "Any"}
              >
                {(close) =>
                  bedOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setFilters((f) => ({ ...f, beds: b }));
                        close(); // ✅ closes dropdown
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        filters.beds === b
                          ? "bg-[#38003c] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b}+
                    </button>
                  ))
                }
              </DesktopDropdown>

              {/* Baths dropdown */}
              <DesktopDropdown
                label="Baths"
                value={filters.baths ? `${filters.baths}+` : "Any"}
              >
                {(close) =>
                  bathOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setFilters((f) => ({ ...f, baths: b }));
                        close();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        filters.baths === b
                          ? "bg-[#38003c] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b}+
                    </button>
                  ))
                }
              </DesktopDropdown>
              {/* Home type dropdown */}
              <DesktopDropdown label="Home" value={filters.homeType || "Any"}>
                {(close) =>
                  homeTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilters((f) => ({ ...f, homeType: type }));
                        close();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        filters.homeType === type
                          ? "bg-[#38003c] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))
                }
              </DesktopDropdown>

              <button
                onClick={clearAll}
                className=" px-4 py-2 w-full  rounded-lg text-sm font-medium cursor-pointer underline"
              >
                Clear All
              </button>
            </div>

            {/* Mobile filters button */}
            <button
              onClick={() => setPanelOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
          {/* Sort */}
          <div className="relative inline-block">
            <button
              onClick={() => setOpenSort((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 transition text-sm font-medium"
            >
              {sortBy}{" "}
              {openSort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSort && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 p-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setOpenSort(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                      sortBy === option
                        ? "bg-[#38003c] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {option} {sortBy === option && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-over Panel */}
      <div
        className="fixed inset-0 z-48"
        aria-hidden={!panelOpen}
        style={{ pointerEvents: panelOpen ? "auto" : "none" }}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${
            panelOpen ? "opacity-30" : "opacity-0"
          }`}
          onClick={() => setPanelOpen(false)}
        ></div>

        {/* Panel */}
        <div
          className={`relative bg-white w-72 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
            ${panelOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          style={{ top: 64, height: "100vh" }}
        >
          {/* Close Button */}
          <button
            onClick={() => setPanelOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 z-50"
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Beds */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Beds</h3>
            <div className="flex flex-wrap gap-2">
              {bedOptions.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters((f) => ({ ...f, beds: b }))}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    filters.beds === b
                      ? "bg-[#38003c] text-white border-[#38003c]"
                      : "hover:bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {b}+
                </button>
              ))}
            </div>
          </div>

          {/* Baths */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Baths</h3>
            <div className="flex flex-wrap gap-2">
              {bathOptions.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters((f) => ({ ...f, baths: b }))}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    filters.baths === b
                      ? "bg-[#38003c] text-white border-[#38003c]"
                      : "hover:bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {b}+
                </button>
              ))}
            </div>
          </div>

          {/* Home Type Dropdown */}
          <div className="mb-4 relative">
            <h3 className="font-medium mb-2">Home Type</h3>
            <button
              onClick={() => setHomeTypeDropdown((prev) => !prev)}
              className="flex justify-between items-center w-full px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              {filters.homeType || "Select Home Type"}
              {homeTypeDropdown ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {homeTypeDropdown && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {homeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilters((f) => ({ ...f, homeType: type }));
                      setHomeTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                      filters.homeType === type
                        ? "bg-[#38003c] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={clearAll}
            className="mt-4 px-4 py-2 w-full bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterBar;

const DesktopDropdown = ({ label, value, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-50"
      >
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold">{value}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 min-w-[160px] bg-white border rounded-xl shadow-lg z-50 p-2">
          {typeof children === "function"
            ? children(() => setOpen(false))
            : children}
        </div>
      )}
    </div>
  );
};
const DropdownItem = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
      active ? "bg-[#38003c] text-white" : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    {children}
  </button>
);
