"use client";

import { useMemo, useState } from "react";

const PREMIUM_TAX_BY_PROVINCE = {
  ON: 0.08,
  QC: 0.09975,
  SK: 0.06,
  MB: 0.07,
};

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

function getInsuranceRateByDownPercent(downPercent) {
  if (downPercent < 5) return null;
  if (downPercent < 10) return 0.04;
  if (downPercent < 15) return 0.031;
  if (downPercent < 20) return 0.028;
  return 0;
}

function periodicRateFromCanadianNominal(annualRatePercent, periodsPerYear) {
  const nominal = annualRatePercent / 100;
  const effectiveAnnual = (1 + nominal / 2) ** 2 - 1;
  return (1 + effectiveAnnual) ** (1 / periodsPerYear) - 1;
}

function paymentForLoan(principal, ratePerPeriod, periods) {
  if (principal <= 0 || periods <= 0) return 0;
  if (ratePerPeriod === 0) return principal / periods;
  const growth = (1 + ratePerPeriod) ** periods;
  return (principal * ratePerPeriod * growth) / (growth - 1);
}

export default function MortgageCalculatorTool() {
  const [priceInput, setPriceInput] = useState("750000");
  const [downPaymentInput, setDownPaymentInput] = useState("150000");
  const [interestRateInput, setInterestRateInput] = useState("5");
  const [amortizationInput, setAmortizationInput] = useState("25");
  const [province, setProvince] = useState("ON");

  const price = parseInput(priceInput);

  const mortgageData = useMemo(() => {
    const downPayment = parseInput(downPaymentInput);
    const interestRate = parseInput(interestRateInput);
    const amortization = parseInput(amortizationInput);
    const fieldErrors = {};

    if (price <= 0) fieldErrors.price = "Enter a home price greater than 0.";
    if (downPayment < 0)
      fieldErrors.downPayment = "Down payment cannot be negative.";
    if (downPayment >= price && price > 0) {
      fieldErrors.downPayment = "Down payment must be less than home price.";
    }
    if (interestRate < 0)
      fieldErrors.interestRate = "Interest rate cannot be negative.";
    if (amortization <= 0)
      fieldErrors.amortization = "Amortization must be greater than 0.";
    if (amortization > 30)
      fieldErrors.amortization = "Max amortization is 30 years.";

    if (Object.keys(fieldErrors).length > 0) {
      return {
        valid: false,
        message: "Please fix highlighted fields.",
        fieldErrors,
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
        fieldErrors: {
          downPayment: "Entered down payment is below required minimum.",
        },
      };
    }

    const highRatio = downPercent < 20;
    if (highRatio && price >= 1500000) {
      return {
        valid: false,
        message:
          "Insured mortgages are generally unavailable at $1.5M and above unless down payment is at least 20%.",
        fieldErrors: {
          downPayment: "Increase down payment to at least 20% for this price.",
        },
      };
    }

    const baseMortgage = price - downPayment;
    const insuranceRate = getInsuranceRateByDownPercent(downPercent) || 0;
    const insuranceAmount = highRatio ? baseMortgage * insuranceRate : 0;
    const totalLoan = baseMortgage + insuranceAmount;

    const monthlyRate = periodicRateFromCanadianNominal(interestRate, 12);
    const totalPayments = amortization * 12;
    const monthlyPayment = paymentForLoan(
      totalLoan,
      monthlyRate,
      totalPayments,
    );

    const firstMonthInterest = totalLoan * monthlyRate;
    const firstMonthPrincipal = Math.max(
      0,
      monthlyPayment - firstMonthInterest,
    );
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = Math.max(0, totalPaid - totalLoan);
    const premiumTaxRate = PREMIUM_TAX_BY_PROVINCE[province] || 0;
    const premiumTax = insuranceAmount * premiumTaxRate;
    const cashNeeded = downPayment + premiumTax;

    return {
      valid: true,
      message: "",
      fieldErrors: {},
      price,
      downPayment,
      minDownPayment,
      downPercent,
      insuranceRate,
      insuranceAmount,
      baseMortgage,
      totalLoan,
      monthlyPayment,
      firstMonthInterest,
      firstMonthPrincipal,
      totalInterest,
      premiumTax,
      premiumTaxRate,
      cashNeeded,
    };
  }, [amortizationInput, downPaymentInput, interestRateInput, price, province]);

  const applyDownPreset = (percent) => {
    if (price <= 0) return;
    const presetValue = Math.round(price * (percent / 100));
    setDownPaymentInput(String(presetValue));
  };

  const resetDefaults = () => {
    setPriceInput("750000");
    setDownPaymentInput("150000");
    setInterestRateInput("5");
    setAmortizationInput("25");
    setProvince("ON");
  };

  return (
    <div className="mx-auto max-w-6xl p-4 mb-10  sm:p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Mortgage Calculator
        </h2>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-full border border-[#2b6ca3] bg-gradient-to-b from-[#2f79b8] to-[#1f5f94] px-4 py-1.5 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:brightness-105"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-3">
          <Field
            label="Home Price"
            value={priceInput}
            onChange={setPriceInput}
            error={mortgageData.fieldErrors?.price}
          />

          <div className="rounded-[1.3rem] border border-[#a8c8df] bg-gradient-to-br from-[#dcedf9] via-[#cae1f3] to-[#bed9ef] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <Field
              label="Down Payment"
              value={downPaymentInput}
              onChange={setDownPaymentInput}
              error={mortgageData.fieldErrors?.downPayment}
            />
            <div className="mt-2.5 flex gap-2">
              <PresetButton label="5%" onClick={() => applyDownPreset(5)} />
              <PresetButton label="10%" onClick={() => applyDownPreset(10)} />
              <PresetButton label="20%" onClick={() => applyDownPreset(20)} />
            </div>

            <div className="mt-3">
              <Field
                label="Interest Rate (%)"
                value={interestRateInput}
                onChange={setInterestRateInput}
                step="0.01"
                error={mortgageData.fieldErrors?.interestRate}
                elevated
              />
            </div>

            <div className="mt-3">
              <Field
                label="Amortization (Years)"
                value={amortizationInput}
                onChange={setAmortizationInput}
                error={mortgageData.fieldErrors?.amortization}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Province
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 border-[#b5ccdc] bg-white px-4 text-lg text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:ring-4 focus:ring-[#d9eaf7]"
            >
              {PROVINCES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-br from-[#d8eaf7] to-[#c5ddf0] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            {!mortgageData.valid ? (
              <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {mortgageData.message}
              </p>
            ) : null}

            <ResultRow
              label="Down Payment"
              value={
                mortgageData.valid
                  ? `${formatCurrency(mortgageData.downPayment)} (${formatPercent(
                      mortgageData.downPercent,
                    )})`
                  : "$0"
              }
            />
            <ResultRow
              label="Minimum down payment"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.minDownPayment)
                  : "$0"
              }
            />
            <ResultRow
              label="Base mortgage"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.baseMortgage)
                  : "$0"
              }
            />
            <ResultRow
              label="Insurance premium"
              value={
                mortgageData.valid
                  ? `${formatCurrency(mortgageData.insuranceAmount)} (${formatPercent(
                      mortgageData.insuranceRate * 100,
                    )})`
                  : "$0"
              }
            />
            <ResultRow
              label="Premium tax"
              value={
                mortgageData.valid
                  ? `${formatCurrency(mortgageData.premiumTax)} (${formatPercent(
                      mortgageData.premiumTaxRate * 100,
                    )})`
                  : "$0"
              }
            />
            <ResultRow
              label="Total mortgage"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.totalLoan)
                  : "$0"
              }
              bold
            />
          </div>

          <div className="rounded-[1.4rem] border-2 border-[#2f74a7] bg-gradient-to-r from-[#d8eaf7] to-[#c4dcf0] p-4 shadow-[0_8px_18px_rgba(47,116,167,0.16)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-medium leading-none text-slate-900 sm:text-2xl">
                  Estimated Monthly Payment
                </p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#0d3f79] sm:text-[2.6rem]">
                  {mortgageData.valid
                    ? formatCurrency(mortgageData.monthlyPayment)
                    : "$0"}
                </p>
              </div>
              <PaymentSplitRing
                principal={
                  mortgageData.valid ? mortgageData.firstMonthPrincipal : 0
                }
                interest={
                  mortgageData.valid ? mortgageData.firstMonthInterest : 0
                }
              />
            </div>

            {mortgageData.valid ? (
              <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-700 sm:text-base">
                <span>First payment split:</span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-4 rounded-full bg-emerald-500" />
                  Principal {formatCurrency(mortgageData.firstMonthPrincipal)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-4 rounded-full bg-red-500" />
                  Interest {formatCurrency(mortgageData.firstMonthInterest)}
                </span>
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-r from-[#d8eaf7] to-[#c5ddf0] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <ResultRow
              label="Total interest (amortization)"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.totalInterest)
                  : "$0"
              }
            />
            <ResultRow
              label="Cash needed now (down + premium tax)"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.cashNeeded)
                  : "$0"
              }
              bold
            />
          </div>

          <div className="rounded-[1.4rem] border border-[#c7dded] bg-gradient-to-r from-[#c7e0f4] to-[#b5d4eb] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <ResultRow
              label="Cash needed now"
              value={
                mortgageData.valid
                  ? formatCurrency(mortgageData.cashNeeded)
                  : "$0"
              }
              bold
            />
          </div>
        </div>
      </div>

      <p className="mt-10 text-xs text-slate-500 sm:text-sm text-center">
        Estimate only. Qualification, insurer policy, and lender terms can
        change actual outcomes.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  step = "1",
  elevated = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className={`h-14 w-full rounded-2xl border-2 bg-white px-4 text-xl text-slate-900 outline-none transition sm:text-2xl ${
          error
            ? "border-red-300 focus:ring-4 focus:ring-red-200"
            : `border-[#b5ccdc] focus:ring-4 focus:ring-[#d9eaf7] ${
                elevated
                  ? "shadow-[0_0_22px_rgba(37,113,185,0.45)]"
                  : "shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
              }`
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function PresetButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[#9fbed6] bg-gradient-to-b from-[#b8d4ea] to-[#9fc2de] px-3.5 py-1 text-xs font-medium text-[#1f4f78] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:brightness-105"
    >
      {label}
    </button>
  );
}

function ResultRow({ label, value, bold = false }) {
  return (
    <div className="mb-1 flex items-start justify-between gap-3 border-b border-[#b7cfe2] pb-1.5 last:mb-0 last:border-b-0 last:pb-0">
      <span className="text-base text-slate-800 sm:text-xl">{label}</span>
      <span
        className={`text-right text-base sm:text-xl ${
          bold ? "font-bold text-slate-900" : "font-semibold text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function PaymentSplitRing({ principal, interest }) {
  const total = principal + interest;
  const principalPct = total > 0 ? (principal / total) * 100 : 0;
  const interestPct = Math.max(0, 100 - principalPct);

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/40">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border border-white/70"
        style={{
          background: `conic-gradient(#ef4444 0 ${interestPct}%, #22c55e ${interestPct}% 100%)`,
        }}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#d5e7f6] text-base font-semibold text-slate-900">
          Total
        </div>
      </div>
    </div>
  );
}
