"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href={"/"}
            className="text-3xl font-bold font-serif text-[#004d4d] flex items-center gap-2"
          >
            houseful
          </Link>
        </div>

        <h2 className="text-2xl font-serif text-center text-gray-800 mb-8">
          Log in to continue your home search
        </h2>

        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="signed-in"
              className="w-4 h-4 rounded border-gray-300 cursor-pointer"
            />
            <label htmlFor="signed-in" className="text-sm text-gray-700 ">
              Keep me signed in
            </label>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-[#004d4d] text-white py-3 rounded-full font-bold hover:bg-[#003a3a] transition-colors mt-4">
            Sign in
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-gray-600 underline">
            Forgot password?
          </a>
        </div>

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

        <p className="text-center text-sm text-gray-700 mt-8">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-red-600 font-semibold underline cursor-pointer "
          >
            Sign up
          </Link>
        </p>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t border-gray-200 pt-6">
          <Link href="#" className="text-sm text-gray-600 underline">
            Help
          </Link>
          <Link href="#" className="text-sm text-gray-600 underline">
            Unlock account?
          </Link>
        </div>

        <p className="mt-6 text-[10px] text-gray-500 text-center leading-relaxed">
          By clicking "Continue" you consent to the receipt of marketing and
          promotional messages from Houseful, including information and updates
          about properties of interest and the services and features of
          Houseful, RBC companies and of third parties we select that may
          benefit you. You may unsubscribe at any time. By joining Houseful, you
          agree to our
          <br />
          <Link href="#" className="underline">
            Terms of Use, including its Privacy section.
          </Link>
        </p>
      </div>
    </div>
  );
}
