"use client";

import { useState, useMemo, useRef, useEffect } from "react";

import {
  calculateOntarioRebate,
  calculateTorontoRebate,
  calculateTorontoTax,
  calculateOntarioTax,
} from "@/lib/tax/ontatio";

const ONTARIO_CITIES = [
  "Toronto",
  "Ottawa",
  "Mississauga",
  "Brampton",
  "Hamilton",
  "London",
  "Markham",
  "Vaughan",
  "Kitchener",
];

export default function LandTransferCalculator({ defaultPrice = 500000 }) {
  const [priceInput, setPriceInput] = useState(String(defaultPrice));
  const [city, setCity] = useState("Toronto");
  const [firstTime, setFirstTime] = useState(false);

  const result = useMemo(() => {
    const price = parseInput(priceInput);

    if (price <= 0) {
      return {
        valid: false,
        message: "Enter a purchase price greater than 0.",
        provincialTax: 0,
        municipalTax: 0,
        provincialRebate: 0,
        municipalRebate: 0,
        totalRebate: 0,
        totalTax: 0,
      };
    }

    const provincialTax = calculateOntarioTax(price, {
      isSingleFamilyResidential: true,
    });
    const municipalTax =
      city === "Toronto"
        ? calculateTorontoTax(price, { isSingleFamilyResidential: true })
        : 0;

    const provincialRebate = calculateOntarioRebate(provincialTax, firstTime);
    const municipalRebate =
      city === "Toronto" ? calculateTorontoRebate(municipalTax, firstTime) : 0;
    const totalRebate = provincialRebate + municipalRebate;

    return {
      valid: true,
      message: "",
      provincialTax,
      municipalTax,
      provincialRebate,
      municipalRebate,
      totalRebate,
      totalTax: provincialTax + municipalTax - totalRebate,
    };
  }, [priceInput, city, firstTime]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        Land Transfer Tax Calculator
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm mb-1">Purchase Price</label>
          <input
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm mb-1">Location</label>
          <LocationSearch
            cities={ONTARIO_CITIES}
            value={city}
            onSelect={setCity}
          />
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={firstTime}
          onChange={(e) => setFirstTime(e.target.checked)}
        />
        <span>I&apos;m a first-time home buyer</span>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-3">
        {!result.valid ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {result.message}
          </p>
        ) : null}

        <Row label="Provincial tax" value={result.provincialTax} />
        <Row label="Municipal tax" value={result.municipalTax} />
        <Row label="Provincial rebate" value={-result.provincialRebate} />
        <Row label="Municipal rebate" value={-result.municipalRebate} />
        <Row label="Total rebate" value={-result.totalRebate} />

        <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
          <span>Total Land Transfer Tax</span>
          <span>{formatCurrency(result.totalTax)}</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Estimate only. Ontario and Toronto eligibility requirements can affect
        rebates.
      </p>
    </div>
  );
}

function LocationSearch({ cities, value, onSelect }) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filtered = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full border p-3 rounded-xl"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-10 bg-white border rounded-xl mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
          {filtered.map((city) => (
            <div
              key={city}
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(city);
                onSelect(city);
                setOpen(false);
              }}
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );
}

function parseInput(value) {
  if (value === "" || value == null) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}
