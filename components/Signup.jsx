"use client";

import React, { useState, useMemo } from "react";
import { Eye, EyeOff, Check, Circle } from "lucide-react";
import Link from "next/link";
export default function SignupComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordValidation = useMemo(() => {
    const p = formData.password;
    return {
      minLength: p.length >= 8,
      hasLower: /[a-z]/.test(p),
      hasUpper: /[A-Z]/.test(p),
      hasNumber: /[0-9]/.test(p),
      hasSymbol: /[^A-Za-z0-9]/.test(p),
      notInUsername:
        formData.email && !p.includes(formData.email.split("@")[0]),
    };
  }, [formData.password, formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allValid = Object.values(passwordValidation).every(Boolean);

    if (allValid && formData.firstName && formData.email) {
      console.log("Form Data Ready to Send:", formData);
    } else {
      alert("Please ensure all password requirements are met.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-[#004d4d] flex items-center gap-2 font-serif">
            houseful
          </h1>
        </div>

        <h2 className="text-2xl font-serif text-center text-gray-800 mb-8">
          Sign up to customize your home search
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Last name
              </label>
              <span className="text-xs text-gray-500">Optional</span>
            </div>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-1 focus:ring-teal-600 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded focus:ring-1 focus:ring-teal-600 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password Requirements List */}
          <div className="py-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Password requirements:
            </p>
            <ul className="space-y-1">
              <RequirementItem
                label="At least 8 characters"
                isMet={passwordValidation.minLength}
              />
              <RequirementItem
                label="A lowercase letter"
                isMet={passwordValidation.hasLower}
              />
              <RequirementItem
                label="An uppercase letter"
                isMet={passwordValidation.hasUpper}
              />
              <RequirementItem
                label="A number"
                isMet={passwordValidation.hasNumber}
              />
              <RequirementItem
                label="A symbol"
                isMet={passwordValidation.hasSymbol}
              />
              <RequirementItem
                label="No parts of your username"
                isMet={passwordValidation.notInUsername}
              />
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#004d4d] text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity mt-6 cursor-pointer"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-6 space-y-4">
          <p className="text-sm text-gray-800">
            Already have an account?{" "}
            <a href="#" className="text-red-600 font-semibold underline">
              Log in
            </a>
          </p>
          {/* Divider */}
          <div className="relative my-8 text-center">
            <hr className="border-gray-300" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400 uppercase">
              OR
            </span>
          </div>
          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-800 py-2.5 rounded-full hover:bg-gray-50 transition-all cursor-pointer  ">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>
          <p className="mt-6 text-[10px] text-gray-500 text-center leading-relaxed">
            By clicking "Continue" you consent to the receipt of marketing and
            promotional messages from Houseful, including information and
            updates about properties of interest and the services and features
            of Houseful, RBC companies and of third parties we select that may
            benefit you. You may unsubscribe at any time. By joining Houseful,
            you agree to our
            <br />
            <Link href="#" className="underline">
              Terms of Use, including its Privacy section.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper component for requirement bullets
function RequirementItem({ label, isMet }) {
  return (
    <li
      className={`flex items-center text-xs transition-colors ${isMet ? "text-green-600" : "text-gray-500"}`}
    >
      {isMet ? (
        <Check size={12} className="mr-2" />
      ) : (
        <Circle size={4} fill="currentColor" className="mr-2 ml-1" />
      )}
      {label}
    </li>
  );
}
