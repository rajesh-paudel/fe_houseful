import React from "react";

export default function GoSeeThisHome() {
  return (
    <div className="w-full bg-[#f7f7f7] rounded-xl p-2 md:p-5 border border-gray-100 shadow-sm font-sans">
      {/* Agent Row */}
      <div className="flex items-center gap-3 mb-3 p-2 bg-transparent rounded-xl">
        <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border border-gray-200">
          <img
            src="/profile.png"
            alt="Json Byun"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#1a1a1a] leading-tight">
            Jason Byun
          </h2>
          <p className="text-sm md:text-base text-gray-700 font-medium">
            647-471-9000
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-2.5">
        <div>
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:ring-2 focus:ring-[#004d4d] transition-all placeholder:text-gray-500"
          />
        </div>
        <div>
          <textarea
            rows={4}
            defaultValue="Please send me additional information about this property . Thank you"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-[#004d4d] transition-all resize-none text-gray-700"
          />
        </div>

        {/* Marketing Consent */}
        <div className="flex items-start gap-2 mt-2 px-1">
          <input
            type="checkbox"
            id="marketing"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#004d4d] focus:ring-[#004d4d] cursor-pointer"
          />
          <label
            htmlFor="marketing"
            className="text-xs text-gray-700 leading-snug cursor-pointer"
          >
            I would like to book a tour of this property. I consent to recieve
            marketing and promotional messages by phone, text message, and email
            from Jason Byun.
          </label>
        </div>

        {/* Primary Action */}
        <button
          type="submit"
          className="w-full bg-[#004d4d] hover:bg-[#003d3d] text-white text-base font-bold py-3 rounded-full mt-2 transition-colors duration-200"
        >
          Contact agent
        </button>
      </form>

      {/* Alternative Action */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-800">
          Not a good time?{" "}
          <button className="font-bold underline">Schedule a call</button>
        </p>
      </div>
    </div>
  );
}
