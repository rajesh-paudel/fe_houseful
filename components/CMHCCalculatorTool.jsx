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
    <div className="mx-auto mb-10 max-w-6xl p-4 sm:p-5 md:p-6">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
        Mortgage CMHC Calculator
      </h2>

      <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-3">
          <Field
            label="Asking price"
            value={priceInput}
            onChange={setPriceInput}
            elevated
          />
          <Field
            label="Down payment"
            value={downPaymentInput}
            onChange={setDownPaymentInput}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Province
            </label>
            <ProvinceDropdown
              value={province}
              options={PROVINCES}
              onChange={setProvince}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-br from-[#d8eaf7] to-[#c5ddf0] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            {!result.valid ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.message}
              </div>
            ) : (
              <>
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
                  value={
                    result.highRatio
                      ? formatPercent(result.premiumRate * 100)
                      : "0.00%"
                  }
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
              </>
            )}
          </div>

          <div className="rounded-[1.4rem] border-2 border-[#2f74a7] bg-gradient-to-r from-[#d8eaf7] to-[#c4dcf0] p-4 shadow-[0_8px_18px_rgba(47,116,167,0.16)]">
            <p className="text-xl font-medium leading-none text-slate-900 sm:text-2xl">
              Total Mortgage
            </p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#0d3f79] sm:text-[2.6rem]">
              {result.valid ? formatCurrency(result.totalMortgage) : "$0"}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-r from-[#d8eaf7] to-[#c5ddf0] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <SummaryRow
              label="Cash needed (down payment + premium tax)"
              value={result.valid ? formatCurrency(result.cashNeeded) : "$0"}
              noBorder
            />
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-slate-500 sm:text-sm">
        Estimate only. CMHC/insurer eligibility rules, debt-service
        qualification, and lender-specific policies can change and may affect
        final results.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, elevated = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 w-full rounded-2xl border-2 bg-white px-4 text-xl text-slate-900 outline-none transition sm:text-2xl ${
          elevated
            ? "border-[#a8c8df] shadow-[0_0_18px_rgba(37,113,185,0.2)] focus:ring-4 focus:ring-[#d9eaf7]"
            : "border-[#b5ccdc] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] focus:ring-4 focus:ring-[#d9eaf7]"
        }`}
      />
    </div>
  );
}

function SummaryRow({ label, value, noBorder = false }) {
  return (
    <div
      className={`mb-1 flex items-start justify-between gap-3 pb-1.5 ${
        noBorder ? "" : "border-b border-[#b7cfe2]"
      } last:mb-0 last:border-b-0 last:pb-0`}
    >
      <span className="text-base text-slate-800 sm:text-xl">{label}</span>
      <span className="text-right text-base font-semibold text-slate-900 sm:text-xl">
        {value}
      </span>
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
        className="flex h-14 w-full items-center justify-between rounded-2xl border-2 border-[#b5ccdc] bg-white px-4 text-left text-lg text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:ring-4 focus:ring-[#d9eaf7]"
      >
        <span>{selected.name}</span>
        <span className="text-slate-500">v</span>
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-2xl border border-[#b5ccdc] bg-white shadow-lg">
          {options.map((item) => (
            <button
              type="button"
              key={item.code}
              onMouseDown={(event) => {
                event.preventDefault();
                onChange(item.code);
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-slate-800 hover:bg-slate-100"
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
