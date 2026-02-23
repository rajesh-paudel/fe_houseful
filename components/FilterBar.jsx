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
  "Condo Apartment",
  "Condo Townhouse",
  "Att/Row/Townhouse",
  "Detached",
  "Semi-Detached ",
  "Link",
];

const LISTING_TYPE_MAP = {
  sale: "Sale",
  lease: "Lease",
};

const PRICE_MIN = 200000;
const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const formatPrice = (value) => moneyFormatter.format(value);

const toPriceValue = (value, fallback) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return fallback;
  return Math.max(PRICE_MIN, Math.min(PRICE_MAX, num));
};

const summarizePriceRange = (min, max) => {
  const minNum = toPriceValue(min, PRICE_MIN);
  const maxNum = toPriceValue(max, PRICE_MAX);
  if (minNum === PRICE_MIN && maxNum === PRICE_MAX) return null;
  return `${formatPrice(minNum)} - ${formatPrice(maxNum)}`;
};

function useUrlFilters(onNavigate) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const get = (key) => searchParams.get(key);
  const legacyPriceMax = get("priceMax");
  const initial = {
    sortKey: get("sort") || "newest",
    listingType: get("listingType") || "sale",
    beds: Number(get("beds")) || null,
    baths: Number(get("baths")) || null,
    homeType: get("homeType"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice") || legacyPriceMax,
  };
  const [local, setLocal] = useState(initial);

  useEffect(() => {
    setLocal({
      sortKey: get("sort") || "newest",
      listingType: get("listingType") || "sale",
      beds: Number(get("beds")) || null,
      baths: Number(get("baths")) || null,
      homeType: get("homeType"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice") || get("priceMax"),
    });
  }, [searchParams.toString()]);
  const push = (url, options) => {
    if (onNavigate) onNavigate(url, options);
    else router.push(url, options);
  };

  const setMany = (updates) => {
    setLocal((prev) => ({ ...prev, ...updates }));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete("priceMax");

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, String(value));
    });

    params.set("page", "1"); // reset pagination
    push(`?${params.toString()}`, { scroll: false });
  };
  const set = (key, value) => setMany({ [key]: value });

  const setPriceRange = (minValue, maxValue) => {
    const min = toPriceValue(minValue, PRICE_MIN);
    const max = toPriceValue(maxValue, PRICE_MAX);
    const normalizedMin = Math.min(min, max);
    const normalizedMax = Math.max(min, max);
    setMany({
      minPrice: normalizedMin <= PRICE_MIN ? null : String(normalizedMin),
      maxPrice: normalizedMax >= PRICE_MAX ? null : String(normalizedMax),
    });
  };

  const clearAll = () => {
    setLocal((prev) => ({
      ...prev,
      beds: null,
      baths: null,
      homeType: null,
      minPrice: null,
      maxPrice: null,
      listingType: "sale",
    }));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const params = new URLSearchParams(searchParams.toString());
    ["beds", "baths", "homeType", "minPrice", "maxPrice", "priceMax"].forEach(
      (k) => params.delete(k),
    );
    params.set("listingType", "sale");
    params.set("page", "1");
    push(`?${params.toString()}`, { scroll: false });
  };

  return {
    beds: local.beds,
    baths: local.baths,
    homeType: local.homeType,
    minPrice: local.minPrice,
    maxPrice: local.maxPrice,
    listingType: local.listingType,
    sortKey: local.sortKey,
    sortLabel: SORT_MAP[local.sortKey],
    set,
    setPriceRange,
    clearAll,
  };
}

export default function FilterBar({ onNavigate }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [openSort, setOpenSort] = useState(false);
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
    minPrice,
    maxPrice,
    listingType,
    sortKey,
    sortLabel,
    set,
    setPriceRange,
    clearAll,
  } = useUrlFilters(onNavigate);
  const hasActiveFilters = Boolean(
    listingType !== "sale" ||
      beds ||
      baths ||
      homeType ||
      minPrice ||
      maxPrice,
  );

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 z-40 -mt-px bg-white border-b border-gray-200 w-full py-3 ">
        <div className="w-full px-2 md:px-4 flex items-center justify-between gap-2">
          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <DesktopDropdown
                label="Listing"
                value={LISTING_TYPE_MAP[listingType] || "Sale"}
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

              <PricePopover
                minPrice={minPrice}
                maxPrice={maxPrice}
                setPriceRange={setPriceRange}
              />

              <DesktopDropdown label="Beds" value={beds ? `${beds}+` : null}>
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

              <DesktopDropdown label="Baths" value={baths ? `${baths}+` : null}>
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

              <DesktopDropdown label="Home" value={homeType || null}>
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

              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="text-sm underline font-medium text-red-600 inline-flex items-center gap-1 cursor-pointer"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>

            {/* Mobile */}
            <button
              onClick={() => setPanelOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-800 transition-colors rounded-full text-sm font-semibold cursor-pointer"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Sort */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setOpenSort((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
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
            value={LISTING_TYPE_MAP[listingType] || "Sale"}
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
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCommit={setPriceRange}
          />

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
            value={homeType || null}
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
          {hasActiveFilters && (
            <div className="mt-6">
              <button
                onClick={clearAll}
                className="w-full py-2 rounded-lg bg-red-50 text-red-600 font-medium inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <X size={12} />
                Clear all
              </button>
            </div>
          )}
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
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-800 transition-colors rounded-full text-sm cursor-pointer"
      >
        <span className="text-gray-700">{label}</span>
        {value && <span className="font-semibold">: {value}</span>}
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

function PricePopover({
  minPrice,
  maxPrice,
  setPriceRange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const priceSummary = summarizePriceRange(minPrice, maxPrice);

  useEffect(() => {
    const handler = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-800 transition-colors rounded-full text-sm cursor-pointer"
      >
        <span className="text-gray-700">Price</span>
        {priceSummary && <span className="font-semibold">: {priceSummary}</span>}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-[360px] bg-white border rounded-xl shadow-lg p-4 z-50">
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCommit={setPriceRange}
          />
        </div>
      )}
    </div>
  );
}

function PriceRangeSlider({ minPrice, maxPrice, onCommit }) {
  const [minDraft, setMinDraft] = useState(toPriceValue(minPrice, PRICE_MIN));
  const [maxDraft, setMaxDraft] = useState(toPriceValue(maxPrice, PRICE_MAX));

  useEffect(() => {
    setMinDraft(toPriceValue(minPrice, PRICE_MIN));
    setMaxDraft(toPriceValue(maxPrice, PRICE_MAX));
  }, [minPrice, maxPrice]);

  const toPercent = (value) =>
    ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const minPercent = toPercent(minDraft);
  const maxPercent = toPercent(maxDraft);

  const commit = (nextMin, nextMax) => {
    onCommit(nextMin, nextMax);
  };

  const handleMin = (value) => {
    const raw = Number(value);
    const next = Math.min(raw, maxDraft - PRICE_STEP);
    setMinDraft(next);
  };

  const handleMax = (value) => {
    const raw = Number(value);
    const next = Math.max(raw, minDraft + PRICE_STEP);
    setMaxDraft(next);
  };

  const trackStyle = {
    background: `linear-gradient(to right, #e5e7eb ${minPercent}%, #1d4ed8 ${minPercent}%, #1d4ed8 ${maxPercent}%, #e5e7eb ${maxPercent}%)`,
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-800">
        <span>{formatPrice(minDraft)}</span>
        <span>{formatPrice(maxDraft)}</span>
      </div>

      <div className="relative h-7">
        <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-full rounded-full" style={trackStyle} />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={minDraft}
          onChange={(e) => handleMin(e.target.value)}
          onMouseUp={() => commit(minDraft, maxDraft)}
          onTouchEnd={() => commit(minDraft, maxDraft)}
          className="price-range-input absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={maxDraft}
          onChange={(e) => handleMax(e.target.value)}
          onMouseUp={() => commit(minDraft, maxDraft)}
          onTouchEnd={() => commit(minDraft, maxDraft)}
          className="price-range-input absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-500">Min: {formatPrice(PRICE_MIN)}</span>
        <button
          onClick={() => {
            setMinDraft(PRICE_MIN);
            setMaxDraft(PRICE_MAX);
            commit(PRICE_MIN, PRICE_MAX);
          }}
          className="text-xs font-semibold text-blue-700 hover:text-blue-800"
        >
          Reset
        </button>
        <span className="text-xs text-gray-500">Max: {formatPrice(PRICE_MAX)}</span>
      </div>
      <style jsx>{`
        .price-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          background: #1d4ed8;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          pointer-events: auto;
          margin-top: -6px;
        }
        .price-range-input::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
        }
        .price-range-input::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 999px;
          background: #1d4ed8;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          pointer-events: auto;
        }
        .price-range-input::-moz-range-track {
          height: 4px;
          background: transparent;
        }
      `}</style>
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

