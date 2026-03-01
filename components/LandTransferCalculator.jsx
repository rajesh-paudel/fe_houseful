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
    <div className="mx-auto mb-10 max-w-6xl p-4 sm:p-5 md:p-6">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
        Land Transfer Tax Calculator
      </h2>

      <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Purchase Price
            </label>
            <input
              type="number"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-[#b5ccdc] bg-white px-4 text-xl text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:ring-4 focus:ring-[#d9eaf7] sm:text-2xl"
            />
          </div>

          <div className="rounded-[1.3rem] border border-[#a8c8df] bg-gradient-to-br from-[#dcedf9] via-[#cae1f3] to-[#bed9ef] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Location
            </label>
            <LocationSearch
              cities={ONTARIO_CITIES}
              value={city}
              onSelect={setCity}
            />
          </div>

          <label className="inline-flex w-fit items-center gap-2 rounded-full border border-[#9fbed6] bg-gradient-to-b from-[#b8d4ea] to-[#9fc2de] px-3 py-1 text-xs font-medium text-[#1f4f78] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <input
              type="checkbox"
              checked={firstTime}
              onChange={(e) => setFirstTime(e.target.checked)}
              className="h-4 w-4 rounded border-[#7ea6c6] text-[#1f5f94] focus:ring-[#9fc2de]"
            />
            I&apos;m a first-time home buyer
          </label>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-br from-[#d8eaf7] to-[#c5ddf0] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
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
          </div>

          <div className="rounded-[1.4rem] border-2 border-[#2f74a7] bg-gradient-to-r from-[#d8eaf7] to-[#c4dcf0] p-4 shadow-[0_8px_18px_rgba(47,116,167,0.16)]">
            <p className="text-xl font-medium leading-none text-slate-900 sm:text-2xl">
              Total Land Transfer Tax
            </p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#0d3f79] sm:text-[2.6rem]">
              {formatCurrency(result.totalTax)}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-slate-500 sm:text-sm">
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
        className="h-14 w-full rounded-2xl border-2 border-[#b5ccdc] bg-white px-4 text-lg text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:ring-4 focus:ring-[#d9eaf7]"
      />

      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border border-[#b5ccdc] bg-white shadow-lg">
          {filtered.map((city) => (
            <div
              key={city}
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(city);
                onSelect(city);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-100"
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
    <div className="mb-1 flex items-start justify-between gap-3 border-b border-[#b7cfe2] pb-1.5 last:mb-0 last:border-b-0 last:pb-0">
      <span className="text-base text-slate-800 sm:text-xl">{label}</span>
      <span className="text-right text-base font-semibold text-slate-900 sm:text-xl">
        {formatCurrency(value)}
      </span>
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
