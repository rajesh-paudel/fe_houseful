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
  sale: "For Sale",
  lease: "For Lease",
};

const PRICE_VALUES = [
  25000, 50000, 75000, 100000, 125000, 150000, 200000, 250000, 300000, 400000,
  500000, 600000, 700000, 800000, 900000, 1000000, 1250000, 1500000, 1750000,
  2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000,
];
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const PRICE_OPTIONS = PRICE_VALUES.map((value) => ({
  value: String(value),
  label: moneyFormatter.format(value),
}));

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

  const setPrice = (key, value) => {
    const currentMin = get("minPrice");
    const currentMax = get("maxPrice") || get("priceMax");
    const nextValue = value ? String(value) : null;
    const nextMin =
      key === "minPrice"
        ? nextValue
          ? Number(nextValue)
          : null
        : currentMin
          ? Number(currentMin)
          : null;
    const nextMax =
      key === "maxPrice"
        ? nextValue
          ? Number(nextValue)
          : null
        : currentMax
          ? Number(currentMax)
          : null;

    const updates = { [key]: nextValue };
    if (nextMin && nextMax && nextMin > nextMax) {
      if (key === "minPrice") updates.maxPrice = null;
      if (key === "maxPrice") updates.minPrice = null;
    }
    setMany(updates);
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
    setPrice,
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
    setPrice,
    clearAll,
  } = useUrlFilters(onNavigate);
  const minPriceNum = minPrice ? Number(minPrice) : null;
  const maxPriceNum = maxPrice ? Number(maxPrice) : null;
  const minPriceOptions = PRICE_OPTIONS.filter(
    (opt) => !maxPriceNum || Number(opt.value) <= maxPriceNum,
  );
  const maxPriceOptions = PRICE_OPTIONS.filter(
    (opt) => !minPriceNum || Number(opt.value) >= minPriceNum,
  );

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-16 lg:top-26 z-40 bg-white border-b w-full py-3 ">
        <div className="w-full px-2 md:px-4 flex items-center justify-between gap-2">
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

              <PricePopover
                minPrice={minPrice}
                maxPrice={maxPrice}
                minPriceOptions={minPriceOptions}
                maxPriceOptions={maxPriceOptions}
                setPrice={setPrice}
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

              <button
                onClick={clearAll}
                className="text-sm underline font-medium text-red-600 inline-flex items-center gap-1 cursor-pointer"
              >
                <X size={12} /> Clear all
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
          <PriceValueDropdown
            label="Min Price"
            value={
              PRICE_OPTIONS.find((o) => o.value === minPrice)?.label || null
            }
            noneLabel="No Min"
            options={minPriceOptions}
            onSelect={(value) => setPrice("minPrice", value)}
          />

          <h3 className="font-medium mt-4 mb-2">Max Price</h3>
          <PriceValueDropdown
            label="Max Price"
            value={
              PRICE_OPTIONS.find((o) => o.value === maxPrice)?.label || null
            }
            noneLabel="No Max"
            options={maxPriceOptions}
            onSelect={(value) => setPrice("maxPrice", value)}
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
          <div className="mt-6">
            <button
              onClick={clearAll}
              className="w-full py-2 rounded-lg bg-red-50 text-red-600 font-medium inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <X size={12} />
              Clear all
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
        <span className="text-gray-600">{label}</span>
        {value && <span className="font-semibold">{value}</span>}
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
  minPriceOptions,
  maxPriceOptions,
  setPrice,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const minLabel = PRICE_OPTIONS.find((opt) => opt.value === minPrice)?.label;
  const maxLabel = PRICE_OPTIONS.find((opt) => opt.value === maxPrice)?.label;
  const priceSummary =
    minLabel && maxLabel
      ? `${minLabel} - ${maxLabel}`
      : minLabel
        ? `From ${minLabel}`
        : maxLabel
          ? `Up to ${maxLabel}`
          : null;

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
        className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm"
      >
        <span className="text-gray-600">Price</span>
        {priceSummary && <span className="font-semibold">{priceSummary}</span>}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-[360px] bg-white border rounded-xl shadow-lg p-4 z-50">
          <div className="grid grid-cols-2 gap-3">
            <PriceValueDropdown
              label="Min Price"
              value={minLabel}
              noneLabel="No Min"
              options={minPriceOptions}
              onSelect={(value) => setPrice("minPrice", value)}
            />
            <PriceValueDropdown
              label="Max Price"
              value={maxLabel}
              noneLabel="No Max"
              options={maxPriceOptions}
              onSelect={(value) => setPrice("maxPrice", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PriceValueDropdown({ label, value, noneLabel, options, onSelect }) {
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
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border rounded-lg px-2 py-2 text-sm bg-white flex items-center justify-between"
      >
        <span className={`truncate ${value ? "" : "text-gray-500"}`}>
          {value || label}
        </span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg p-1 z-50 max-h-56 overflow-auto">
          <DropdownItem
            active={value === noneLabel}
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
          >
            {noneLabel}
          </DropdownItem>
          {options.map((opt) => (
            <DropdownItem
              key={opt.value}
              active={value === opt.label}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </DropdownItem>
          ))}
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

