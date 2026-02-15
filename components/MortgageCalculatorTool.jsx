"use client";

import React, { useMemo, useState } from "react";

const PAYMENT_FREQUENCIES = [
  { key: "monthly", label: "Monthly", perYear: 12, accelerated: false },
  { key: "biweekly", label: "Bi-weekly", perYear: 26, accelerated: false },
  { key: "weekly", label: "Weekly", perYear: 52, accelerated: false },
  {
    key: "accelerated-biweekly",
    label: "Accelerated Bi-weekly",
    perYear: 26,
    accelerated: true,
  },
  {
    key: "accelerated-weekly",
    label: "Accelerated Weekly",
    perYear: 52,
    accelerated: true,
  },
];

const AMORTIZATION_OPTIONS = [10, 15, 20, 25, 30];
const TERM_OPTIONS = [1, 2, 3, 4, 5, 7, 10];

const toCurrency = (value) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const toPercent = (value, digits = 2) =>
  `${(Number.isFinite(value) ? value : 0).toFixed(digits)}%`;

const getMinimumDownPayment = (price) => {
  if (price <= 500000) return price * 0.05;
  if (price < 1500000) return 25000 + (price - 500000) * 0.1;
  return price * 0.2;
};

// Typical high-ratio insurance premium bands used by major Canadian insurers.
const getInsurancePremiumRate = (loanToValuePercent) => {
  if (loanToValuePercent <= 65) return 0.006;
  if (loanToValuePercent <= 75) return 0.017;
  if (loanToValuePercent <= 80) return 0.024;
  if (loanToValuePercent <= 85) return 0.028;
  if (loanToValuePercent <= 90) return 0.031;
  if (loanToValuePercent <= 95) return 0.04;
  return null;
};

const periodicRateFromCanadianNominal = (annualRatePercent, periodsPerYear) => {
  const nominal = annualRatePercent / 100;
  const effectiveAnnual = (1 + nominal / 2) ** 2 - 1;
  return (1 + effectiveAnnual) ** (1 / periodsPerYear) - 1;
};

const paymentForLoan = (principal, ratePerPeriod, periods) => {
  if (principal <= 0 || periods <= 0) return 0;
  if (ratePerPeriod === 0) return principal / periods;
  const growth = (1 + ratePerPeriod) ** periods;
  return (principal * ratePerPeriod * growth) / (growth - 1);
};

const remainingBalance = (
  principal,
  ratePerPeriod,
  totalPeriods,
  elapsedPeriods,
  payment,
) => {
  if (elapsedPeriods <= 0) return principal;
  if (elapsedPeriods >= totalPeriods) return 0;
  if (ratePerPeriod === 0) return Math.max(0, principal - payment * elapsedPeriods);
  const growthElapsed = (1 + ratePerPeriod) ** elapsedPeriods;
  return Math.max(
    0,
    principal * growthElapsed - payment * ((growthElapsed - 1) / ratePerPeriod),
  );
};

const simulateAmortization = (
  principal,
  ratePerPeriod,
  payment,
  maxPeriods,
  termPeriods,
) => {
  let balance = principal;
  let totalPaid = 0;
  let totalInterest = 0;
  let periodsPaid = 0;
  let termBalance = principal;

  for (let i = 1; i <= maxPeriods; i += 1) {
    if (balance <= 0) break;
    const interestPortion = balance * ratePerPeriod;
    const principalPortion = payment - interestPortion;
    if (principalPortion <= 0) break;

    balance = Math.max(0, balance - principalPortion);
    totalPaid += payment;
    totalInterest += interestPortion;
    periodsPaid = i;

    if (i === termPeriods) {
      termBalance = balance;
    }
  }

  if (termPeriods > periodsPaid) {
    termBalance = 0;
  }

  return {
    periodsPaid,
    totalPaid,
    totalInterest,
    termBalance,
  };
};

export default function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState(850000);
  const [downPayment, setDownPayment] = useState(170000);
  const [interestRate, setInterestRate] = useState(4.89);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [termYears, setTermYears] = useState(5);
  const [frequencyKey, setFrequencyKey] = useState("monthly");
  const [propertyTaxYearly, setPropertyTaxYearly] = useState(4800);
  const [heatingMonthly, setHeatingMonthly] = useState(150);
  const [condoFeeMonthly, setCondoFeeMonthly] = useState(0);

  const selectedFrequency =
    PAYMENT_FREQUENCIES.find((f) => f.key === frequencyKey) ||
    PAYMENT_FREQUENCIES[0];

  const result = useMemo(() => {
    const price = Number(homePrice) || 0;
    const down = Number(downPayment) || 0;
    const rate = Number(interestRate) || 0;
    const amort = Number(amortizationYears) || 25;
    const term = Number(termYears) || 5;
    const propertyTax = Number(propertyTaxYearly) || 0;
    const heating = Number(heatingMonthly) || 0;
    const condoFee = Number(condoFeeMonthly) || 0;

    if (price <= 0) {
      return {
        valid: false,
        message: "Enter a home price greater than 0.",
      };
    }

    if (down < 0 || down >= price) {
      return {
        valid: false,
        message: "Down payment must be at least 0 and less than the home price.",
      };
    }

    const downPercent = (down / price) * 100;
    const minDownPayment = getMinimumDownPayment(price);
    const minDownPercent = (minDownPayment / price) * 100;
    const highRatio = downPercent < 20;

    if (down < minDownPayment) {
      return {
        valid: false,
        message: `Minimum down payment needed is ${toCurrency(minDownPayment)} (${toPercent(minDownPercent)}).`,
      };
    }

    if (highRatio && price >= 1500000) {
      return {
        valid: false,
        message:
          "High-ratio insurance is generally unavailable for homes at or above $1.5M. Increase down payment to 20%+.",
      };
    }

    const baseMortgage = price - down;
    const loanToValue = (baseMortgage / price) * 100;
    const insuranceRate = highRatio ? getInsurancePremiumRate(loanToValue) : 0;
    const insurancePremium = highRatio ? baseMortgage * (insuranceRate || 0) : 0;
    const totalLoan = baseMortgage + insurancePremium;

    const perYear = selectedFrequency.perYear;
    const ratePerPayment = periodicRateFromCanadianNominal(rate, perYear);
    const totalPayments = amort * perYear;
    const basePayment = paymentForLoan(totalLoan, ratePerPayment, totalPayments);
    const payment = selectedFrequency.accelerated
      ? paymentForLoan(
          totalLoan,
          periodicRateFromCanadianNominal(rate, 12),
          amort * 12,
        ) / (selectedFrequency.key.includes("weekly") ? 4 : 2)
      : basePayment;

    const monthlyEquivalent = (payment * perYear) / 12;
    const monthlyCarryingCost =
      monthlyEquivalent + propertyTax / 12 + heating + condoFee;

    const termPayments = Math.min(totalPayments, Math.round(term * perYear));
    const principalAfterTermFormula = remainingBalance(
      totalLoan,
      ratePerPayment,
      totalPayments,
      termPayments,
      payment,
    );
    const schedule = simulateAmortization(
      totalLoan,
      ratePerPayment,
      payment,
      totalPayments,
      termPayments,
    );
    const principalAfterTerm = Math.min(
      principalAfterTermFormula,
      schedule.termBalance,
    );

    const stressRate = Math.max(5.25, rate + 2);
    const stressRatePerMonth = periodicRateFromCanadianNominal(stressRate, 12);
    const stressMonthlyPayment = paymentForLoan(
      totalLoan,
      stressRatePerMonth,
      amort * 12,
    );

    return {
      valid: true,
      price,
      down,
      downPercent,
      minDownPayment,
      minDownPercent,
      baseMortgage,
      insuranceRate: insuranceRate || 0,
      insurancePremium,
      totalLoan,
      payment,
      monthlyEquivalent,
      monthlyCarryingCost,
      totalInterest: schedule.totalInterest,
      principalAfterTerm,
      payoffPeriods: schedule.periodsPaid,
      stressRate,
      stressMonthlyPayment,
      highRatio,
    };
  }, [
    amortizationYears,
    condoFeeMonthly,
    downPayment,
    frequencyKey,
    heatingMonthly,
    homePrice,
    interestRate,
    propertyTaxYearly,
    selectedFrequency.accelerated,
    selectedFrequency.key,
    selectedFrequency.perYear,
    termYears,
  ]);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      <div className="min-h-screen bg-black/35 px-4 py-10 md:py-14">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Canada Mortgage Calculator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">Inputs</h2>
              <div className="space-y-4">
                <Field
                  label="Home Price (CAD)"
                  type="number"
                  value={homePrice}
                  onChange={(v) => setHomePrice(v)}
                />
                <Field
                  label="Down Payment (CAD)"
                  type="number"
                  value={downPayment}
                  onChange={(v) => setDownPayment(v)}
                />
                <Field
                  label="Interest Rate (%)"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(v) => setInterestRate(v)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Amortization"
                    value={amortizationYears}
                    onChange={(v) => setAmortizationYears(Number(v))}
                    options={AMORTIZATION_OPTIONS.map((y) => ({
                      value: y,
                      label: `${y} years`,
                    }))}
                  />
                  <SelectField
                    label="Term"
                    value={termYears}
                    onChange={(v) => setTermYears(Number(v))}
                    options={TERM_OPTIONS.map((y) => ({
                      value: y,
                      label: `${y} years`,
                    }))}
                  />
                </div>

                <SelectField
                  label="Payment Frequency"
                  value={frequencyKey}
                  onChange={(v) => setFrequencyKey(v)}
                  options={PAYMENT_FREQUENCIES.map((f) => ({
                    value: f.key,
                    label: f.label,
                  }))}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field
                    label="Property Tax (yearly)"
                    type="number"
                    value={propertyTaxYearly}
                    onChange={(v) => setPropertyTaxYearly(v)}
                  />
                  <Field
                    label="Heating (monthly)"
                    type="number"
                    value={heatingMonthly}
                    onChange={(v) => setHeatingMonthly(v)}
                  />
                  <Field
                    label="Condo Fee (monthly)"
                    type="number"
                    value={condoFeeMonthly}
                    onChange={(v) => setCondoFeeMonthly(v)}
                  />
                </div>
              </div>
            </section>

            <section className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">Results</h2>
              {!result.valid ? (
                <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                  {result.message}
                </p>
              ) : (
                <div className="space-y-3">
                  <ResultRow label="Home Price" value={toCurrency(result.price)} />
                  <ResultRow
                    label="Down Payment"
                    value={`${toCurrency(result.down)} (${toPercent(result.downPercent)})`}
                  />
                  <ResultRow
                    label="Minimum Down Needed"
                    value={`${toCurrency(result.minDownPayment)} (${toPercent(result.minDownPercent)})`}
                  />
                  <ResultRow
                    label="Base Mortgage"
                    value={toCurrency(result.baseMortgage)}
                  />
                  <ResultRow
                    label="Default Insurance"
                    value={
                      result.highRatio
                        ? `${toCurrency(result.insurancePremium)} (${toPercent(
                            result.insuranceRate * 100,
                          )})`
                        : "Not required"
                    }
                  />
                  <ResultRow
                    label="Total Mortgage (with insurance)"
                    value={toCurrency(result.totalLoan)}
                    bold
                  />
                  <ResultRow
                    label="Payment Amount"
                    value={toCurrency(result.payment)}
                    bold
                  />
                  <ResultRow
                    label="Monthly Mortgage Equivalent"
                    value={toCurrency(result.monthlyEquivalent)}
                  />
                  <ResultRow
                    label="Estimated Monthly Carrying Cost"
                    value={toCurrency(result.monthlyCarryingCost)}
                    bold
                  />
                  <ResultRow
                    label={`Balance After ${termYears}-Year Term`}
                    value={toCurrency(result.principalAfterTerm)}
                  />
                  <ResultRow
                    label="Total Interest (projected)"
                    value={toCurrency(result.totalInterest)}
                  />
                  <ResultRow
                    label="Estimated Payoff Time"
                    value={`${(result.payoffPeriods / selectedFrequency.perYear).toFixed(1)} years`}
                  />
                  <ResultRow
                    label={`Stress Test (${toPercent(result.stressRate)}) Monthly`}
                    value={toCurrency(result.stressMonthlyPayment)}
                  />
                </div>
              )}
            </section>
          </div>

          <p className="mt-6 text-xs md:text-sm text-white/90 text-center">
            Estimates for planning only. Actual lender qualification, insurer rules,
            provincial taxes, and closing costs may differ.
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({ label, onChange, ...inputProps }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <input
        {...inputProps}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-[#004d4d]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 rounded-lg border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-[#004d4d]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultRow({ label, value, bold = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 last:border-b-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-sm text-right ${bold ? "font-bold text-slate-900" : "text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}
