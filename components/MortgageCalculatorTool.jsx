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
    if (downPayment < 0) fieldErrors.downPayment = "Down payment cannot be negative.";
    if (downPayment >= price && price > 0) {
      fieldErrors.downPayment = "Down payment must be less than home price.";
    }
    if (interestRate < 0) fieldErrors.interestRate = "Interest rate cannot be negative.";
    if (amortization <= 0) fieldErrors.amortization = "Amortization must be greater than 0.";
    if (amortization > 30) fieldErrors.amortization = "Max amortization is 30 years.";

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
    const monthlyPayment = paymentForLoan(totalLoan, monthlyRate, totalPayments);

    const firstMonthInterest = totalLoan * monthlyRate;
    const firstMonthPrincipal = Math.max(0, monthlyPayment - firstMonthInterest);
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
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold">Mortgage Calculator</h2>
        <button
          type="button"
          onClick={resetDefaults}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field
            label="Home Price"
            value={priceInput}
            onChange={setPriceInput}
            error={mortgageData.fieldErrors?.price}
          />

          <div>
            <Field
              label="Down Payment"
              value={downPaymentInput}
              onChange={setDownPaymentInput}
              error={mortgageData.fieldErrors?.downPayment}
            />
            <div className="flex gap-2 mt-2">
              <PresetButton label="5%" onClick={() => applyDownPreset(5)} />
              <PresetButton label="10%" onClick={() => applyDownPreset(10)} />
              <PresetButton label="20%" onClick={() => applyDownPreset(20)} />
            </div>
          </div>

          <Field
            label="Interest Rate (%)"
            value={interestRateInput}
            onChange={setInterestRateInput}
            step="0.01"
            error={mortgageData.fieldErrors?.interestRate}
          />

          <Field
            label="Amortization (Years)"
            value={amortizationInput}
            onChange={setAmortizationInput}
            error={mortgageData.fieldErrors?.amortization}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Province</label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full h-12 px-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {PROVINCES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          {!mortgageData.valid ? (
            <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {mortgageData.message}
            </p>
          ) : null}

          <ResultRow
            label="Down payment"
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
              mortgageData.valid ? formatCurrency(mortgageData.minDownPayment) : "$0"
            }
          />
          <ResultRow
            label="Base mortgage"
            value={mortgageData.valid ? formatCurrency(mortgageData.baseMortgage) : "$0"}
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
            value={mortgageData.valid ? formatCurrency(mortgageData.totalLoan) : "$0"}
            bold
          />

          <div className="mt-5 border-t pt-4">
            <p className="text-sm text-gray-500 mb-1">Estimated Monthly Payment</p>
            <p className="text-3xl font-bold text-black">
              {mortgageData.valid ? formatCurrency(mortgageData.monthlyPayment) : "$0"}
            </p>
            {mortgageData.valid ? (
              <p className="text-xs text-gray-500 mt-2">
                First payment split: Principal {formatCurrency(mortgageData.firstMonthPrincipal)}
                {" | "}Interest {formatCurrency(mortgageData.firstMonthInterest)}
              </p>
            ) : null}
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <ResultRow
              label="Total interest (amortization)"
              value={
                mortgageData.valid ? formatCurrency(mortgageData.totalInterest) : "$0"
              }
            />
            <ResultRow
              label="Cash needed now (down + premium tax)"
              value={mortgageData.valid ? formatCurrency(mortgageData.cashNeeded) : "$0"}
              bold
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Estimate only. Qualification, insurer policy, and lender terms can change
        actual outcomes.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, error, step = "1" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 px-3 border rounded-xl focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-200"
            : "border-slate-300 focus:ring-slate-300"
        }`}
      />
      {error ? <p className="text-xs text-red-600 mt-1">{error}</p> : null}
    </div>
  );
}

function PresetButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2.5 py-1 text-xs border border-slate-300 rounded-md hover:bg-slate-50"
    >
      {label}
    </button>
  );
}

function ResultRow({ label, value, bold = false }) {
  return (
    <div className="flex justify-between gap-3 mb-2">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className={`text-sm text-right ${bold ? "font-semibold text-black" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}
