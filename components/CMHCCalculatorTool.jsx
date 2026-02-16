"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

const PREMIUM_TAX_BY_PROVINCE = {
  ON: 0.08,
  QC: 0.09975,
  SK: 0.06,
  MB: 0.07,
};

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

function formatPercent(value, digits = 2) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(digits)}%`;
}

function getMinimumDownPayment(price) {
  if (price <= 500000) return price * 0.05;
  if (price < 1500000) return 25000 + (price - 500000) * 0.1;
  return price * 0.2;
}

function getCmhcRateByDownPercent(downPercent) {
  if (downPercent < 5) return null;
  if (downPercent < 10) return 0.04;
  if (downPercent < 15) return 0.031;
  if (downPercent < 20) return 0.028;
  return 0;
}

export default function CMHCCalculatorTool() {
  const [priceInput, setPriceInput] = useState("750000");
  const [downPaymentInput, setDownPaymentInput] = useState("150000");
  const [province, setProvince] = useState("ON");

  const result = useMemo(() => {
    const price = parseInput(priceInput);
    const downPayment = parseInput(downPaymentInput);

    if (price <= 0) {
      return {
        valid: false,
        message: "Enter an asking price greater than 0.",
      };
    }

    if (downPayment < 0) {
      return {
        valid: false,
        message: "Down payment cannot be negative.",
      };
    }

    if (downPayment >= price) {
      return {
        valid: false,
        message: "Down payment must be less than the asking price.",
      };
    }

    const minDownPayment = getMinimumDownPayment(price);
    const downPercent = (downPayment / price) * 100;

    if (downPayment < minDownPayment) {
      return {
        valid: false,
        message: `Minimum down payment is ${formatCurrency(minDownPayment)} (${formatPercent(
          (minDownPayment / price) * 100,
        )}).`,
      };
    }

    const highRatio = downPercent < 20;

    if (highRatio && price >= 1500000) {
      return {
        valid: false,
        message:
          "Insured mortgages are generally unavailable at $1.5M and above. Increase down payment to at least 20%.",
      };
    }

    const baseMortgage = price - downPayment;
    const premiumRate = getCmhcRateByDownPercent(downPercent) || 0;
    const cmhcInsurance = highRatio ? baseMortgage * premiumRate : 0;
    const totalMortgage = baseMortgage + cmhcInsurance;
    const premiumTaxRate = PREMIUM_TAX_BY_PROVINCE[province] || 0;
    const premiumTax = cmhcInsurance * premiumTaxRate;
    const cashNeeded = downPayment + premiumTax;

    return {
      valid: true,
      message: "",
      price,
      downPayment,
      downPercent,
      minDownPayment,
      premiumRate,
      cmhcInsurance,
      totalMortgage,
      premiumTax,
      premiumTaxRate,
      cashNeeded,
      highRatio,
    };
  }, [priceInput, downPaymentInput, province]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">Mortgage CMHC Calculator</h2>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-800">Asking price</p>
          <input
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className="h-12 border border-slate-300 px-3 text-base text-slate-900 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center py-4 border-b border-slate-200">
          <p className="text-sm text-slate-800">Down payment</p>
          <input
            type="number"
            value={downPaymentInput}
            onChange={(e) => setDownPaymentInput(e.target.value)}
            className="h-12 border border-slate-300 px-3 text-base text-slate-900 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center py-4 border-b border-slate-200">
          <p className="text-sm text-slate-800">Province</p>
          <ProvinceDropdown
            value={province}
            options={PROVINCES}
            onChange={setProvince}
          />
        </div>

        {!result.valid ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {result.message}
          </div>
        ) : (
          <div className="mt-5 bg-gray-50 rounded-xl p-3">
            <SummaryRow
              label="Down payment percent"
              value={formatPercent(result.downPercent)}
            />
            <SummaryRow
              label="CMHC insurance"
              value={formatCurrency(result.cmhcInsurance)}
            />
            <SummaryRow
              label="Premium rate"
              value={result.highRatio ? formatPercent(result.premiumRate * 100) : "0.00%"}
            />
            <SummaryRow
              label="Insurance premium tax"
              value={`${formatCurrency(result.premiumTax)} (${formatPercent(
                result.premiumTaxRate * 100,
              )})`}
            />
            <SummaryRow
              label="Minimum down payment"
              value={formatCurrency(result.minDownPayment)}
            />
            <SummaryRow
              label="Total mortgage"
              value={formatCurrency(result.totalMortgage)}
              highlight
            />
            <SummaryRow
              label="Cash needed (down payment + premium tax)"
              value={formatCurrency(result.cashNeeded)}
            />
          </div>
        )}

        <p className="mt-5 text-xs text-slate-500">
          Estimate only. CMHC/insurer eligibility rules, debt-service qualification, and
          lender-specific policies can change and may affect final results.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[220px_1fr] items-center px-2 py-2 border-b border-slate-200 last:border-b-0 ${
        highlight ? "bg-[#e8f5fb]" : ""
      }`}
    >
      <span className="text-sm text-slate-700">{label}</span>
      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function ProvinceDropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selected = options.find((item) => item.code === value) || options[0];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full h-12 border border-slate-300 px-3 text-left text-base text-slate-900 rounded-xl bg-white flex items-center justify-between"
      >
        <span>{selected.name}</span>
        <span className="text-slate-500">▼</span>
      </button>

      {open ? (
        <div className="absolute top-full left-0 mt-1 z-20 w-full border border-slate-300 rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((item) => (
            <button
              type="button"
              key={item.code}
              onMouseDown={(event) => {
                event.preventDefault();
                onChange(item.code);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100"
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
