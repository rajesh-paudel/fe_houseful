import React from "react";

export default function GoSeeThisHome({ cityName = "Calgary" }) {
  return (
    <div className="w-full max-w-[400px] bg-[#f7f7f7] rounded-xl p-6 border border-gray-100 shadow-sm font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-[32px] font-serif font-semibold text-[#1a1a1a] leading-tight">
          Go see this home
        </h2>
        <p className="text-lg text-gray-700 mt-1">
          with a {cityName} <span className="font-bold">Buyer's</span> agent
        </p>
      </div>

      {/* Form Fields */}
      <form className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-[60px] px-4 rounded-lg border border-gray-300 bg-white text-lg outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[60px] px-4 rounded-lg border border-gray-300 bg-white text-lg outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full h-[60px] px-4 rounded-lg border border-gray-300 bg-white text-lg outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>

        {/* Marketing Consent */}
        <div className="flex items-start gap-3 mt-4 px-1">
          <input
            type="checkbox"
            id="marketing"
            className="mt-1.5 h-6 w-6 rounded border-gray-300 text-[#004d4d] focus:ring-[#004d4d] cursor-pointer"
          />
          <label
            htmlFor="marketing"
            className="text-sm text-gray-700 leading-snug cursor-pointer"
          >
            I would like to receive marketing and promotional messages by phone,
            text message, and email from Houseful.
          </label>
        </div>

        {/* Primary Action */}
        <button
          type="submit"
          className="w-full bg-[#004d4d] hover:bg-[#003d3d] text-white text-lg font-bold py-4 rounded-full mt-4 transition-colors duration-200"
        >
          Contact agent
        </button>
      </form>

      {/* Alternative Action */}
      <div className="text-center mt-6">
        <p className="text-base text-gray-800">
          Not a good time?{" "}
          <button className="font-bold underline">Schedule a call</button>
        </p>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Houseful will call you within the next business hour to match you with
          a Houseful™ network agent. By submitting this information, I
          acknowledge that I have read and agreed to the{" "}
          <button className="underline font-medium">
            Terms of use, including its Privacy section
          </button>
          .
        </p>
      </div>
    </div>
  );
}
