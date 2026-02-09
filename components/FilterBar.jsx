"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const BED_OPTIONS = [1, 2, 3, 4, 5];
const BATH_OPTIONS = [1, 2, 3, 4, 5];

const SORT_MAP = {
  newest: "Newest",
  oldest: "Oldest",
  price_asc: "Lowest Price",
  price_desc: "Highest Price",
};

const HOME_TYPES = [
  "Detached",
  "Office",
  "Condo Townhouse",
  "Condo Apartment",
  "Multiplex",
];

const LISTING_TYPE_MAP = {
  sale: "For Sale",
  lease: "For Lease",
};

const PRICE_OPTIONS = [
  { value: "500000", label: "0-500k" },
  { value: "600000", label: "Under 600k" },
  { value: "700000", label: "Under 700k" },
  { value: "800000", label: "Under 800k" },
  { value: "900000", label: "Under 900k" },
  { value: "1000000", label: "Under 1M" },
  { value: "1500000", label: "Under 1.5M" },
];

function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortKey = searchParams.get("sort") || "newest";
  const sortLabel = SORT_MAP[sortKey];
  const listingType = searchParams.get("listingType") || "sale";
  const get = (key) => searchParams.get(key);

  const set = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, String(value));

    params.set("page", "1"); // reset pagination
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    ["beds", "baths", "homeType", "priceMax"].forEach((k) => params.delete(k));
    params.set("listingType", "sale");
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    beds: Number(get("beds")) || null,
    baths: Number(get("baths")) || null,
    homeType: get("homeType"),
    priceMax: get("priceMax"),
    listingType,
    sortKey,
    sortLabel: SORT_MAP[sortKey],
    set,
    clearAll,
  };
}

export default function FilterBar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [homeTypeDropdown, setHomeTypeDropdown] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpenSort(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const {
    beds,
    baths,
    homeType,
    priceMax,
    listingType,
    sortKey,
    sortLabel,
    set,
    clearAll,
  } = useUrlFilters();

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-16 lg:top-26 z-40 bg-white border-b w-full py-3 ">
        <div className="max-w-7xl px-4 md:px-8 mx-auto flex items-center justify-between gap-2">
          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <DesktopDropdown
                label="Listing"
                value={LISTING_TYPE_MAP[listingType] || "For Sale"}
              >
                {(close) =>
                  Object.entries(LISTING_TYPE_MAP).map(([key, label]) => (
                    <DropdownItem
                      key={key}
                      active={listingType === key}
                      onClick={() => {
                        set("listingType", key);
                        close();
                      }}
                    >
                      {label}
                    </DropdownItem>
                  ))
                }
              </DesktopDropdown>

              <DesktopDropdown
                label="Price"
                value={
                  PRICE_OPTIONS.find((o) => o.value === priceMax)?.label ||
                  "Any"
                }
              >
                {(close) =>
                  PRICE_OPTIONS.map((opt) => (
                    <DropdownItem
                      key={opt.value}
                      active={priceMax === opt.value}
                      onClick={() => {
                        set("priceMax", opt.value);
                        close();
                      }}
                    >
                      {opt.label}
                    </DropdownItem>
                  ))
                }
              </DesktopDropdown>

              <DesktopDropdown label="Beds" value={beds ? `${beds}+` : "Any"}>
                {(close) =>
                  BED_OPTIONS.map((b) => (
                    <DropdownItem
                      key={b}
                      active={beds === b}
                      onClick={() => {
                        set("beds", b);
                        close();
                      }}
                    >
                      {b}+
                    </DropdownItem>
                  ))
                }
              </DesktopDropdown>

              <DesktopDropdown
                label="Baths"
                value={baths ? `${baths}+` : "Any"}
              >
                {(close) =>
                  BATH_OPTIONS.map((b) => (
                    <DropdownItem
                      key={b}
                      active={baths === b}
                      onClick={() => {
                        set("baths", b);
                        close();
                      }}
                    >
                      {b}+
                    </DropdownItem>
                  ))
                }
              </DesktopDropdown>

              <DesktopDropdown label="Home" value={homeType || "Any"}>
                {(close) =>
                  HOME_TYPES.map((type) => (
                    <DropdownItem
                      key={type}
                      active={homeType === type}
                      onClick={() => {
                        set("homeType", type);
                        close();
                      }}
                    >
                      {type}
                    </DropdownItem>
                  ))
                }
              </DesktopDropdown>

              <button
                onClick={clearAll}
                className="text-sm underline font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setPanelOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-semibold"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Sort */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setOpenSort((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              {sortLabel}
              {openSort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSort && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg p-2 z-50">
                {Object.entries(SORT_MAP).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      set("sort", key);
                      setOpenSort(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                      sortKey === key
                        ? "bg-[#38003c] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {label}
                    {sortKey === key && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-over */}
      <div
        className="fixed inset-0 z-50"
        style={{ pointerEvents: panelOpen ? "auto" : "none" }}
      >
        <div
          className={`fixed inset-0 bg-black transition-opacity ${
            panelOpen ? "opacity-30" : "opacity-0"
          }`}
          onClick={() => setPanelOpen(false)}
        />

        <div
          className={`relative bg-white w-72 p-6 h-full transform transition-transform ${
            panelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setPanelOpen(false)}
            className="absolute top-4 right-4"
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <h3 className="font-medium mb-2">Listing</h3>
          <DesktopDropdown
            label="Listing"
            value={LISTING_TYPE_MAP[listingType] || "For Sale"}
            isMobile={true}
          >
            {(close) =>
              Object.entries(LISTING_TYPE_MAP).map(([key, label]) => (
                <DropdownItem
                  key={key}
                  active={listingType === key}
                  onClick={() => {
                    set("listingType", key);
                    close();
                  }}
                >
                  {label}
                </DropdownItem>
              ))
            }
          </DesktopDropdown>

          <h3 className="font-medium mt-4 mb-2">Price</h3>
          <DesktopDropdown
            label="Price"
            value={
              PRICE_OPTIONS.find((o) => o.value === priceMax)?.label || "Any"
            }
            isMobile={true}
          >
            {(close) =>
              PRICE_OPTIONS.map((opt) => (
                <DropdownItem
                  key={opt.value}
                  active={priceMax === opt.value}
                  onClick={() => {
                    set("priceMax", opt.value);
                    close();
                  }}
                >
                  {opt.label}
                </DropdownItem>
              ))
            }
          </DesktopDropdown>

          <FilterGroup
            title="Beds"
            options={BED_OPTIONS}
            value={beds}
            onChange={(v) => set("beds", v)}
          />

          <FilterGroup
            title="Baths"
            options={BATH_OPTIONS}
            value={baths}
            onChange={(v) => set("baths", v)}
          />
          <h3 className="font-medium mb-2">Home</h3>
          <DesktopDropdown
            label="Home"
            value={homeType || "Any"}
            isMobile={true}
          >
            {(close) =>
              HOME_TYPES.map((type) => (
                <DropdownItem
                  key={type}
                  active={homeType === type}
                  onClick={() => {
                    set("homeType", type);
                    close();
                  }}
                >
                  {type}
                </DropdownItem>
              ))
            }
          </DesktopDropdown>
          <div className="mt-6">
            <button
              onClick={clearAll}
              className="w-full py-2 rounded-lg bg-gray-100 font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopDropdown({ label, value, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm"
      >
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold">{value}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute mt-2 bg-white border rounded-xl shadow-lg p-2 z-50">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
        active ? "bg-[#38003c] text-white" : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div className="mb-5">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-2 rounded-lg border text-sm ${
              value === o ? "bg-[#38003c] text-white" : "hover:bg-gray-100"
            }`}
          >
            {o}+
          </button>
        ))}
      </div>
    </div>
  );
}
