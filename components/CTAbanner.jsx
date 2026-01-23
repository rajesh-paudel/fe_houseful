import { Phone } from "lucide-react";
import React from "react";

const CTAbanner = () => {
  return (
    <div className="bg-[#004d4a] py-12 flex flex-col items-center justify-center text-white px-6">
      <h3 className="text-3xl md:text-5xl  mb-8 text-cente font-serif">
        Meet with a real estate agent today
      </h3>
      <button className="flex items-center gap-3 bg-[#c1e837] text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-[#aecf32] transition-all cursor-pointer ">
        <Phone size={20} fill="currentColor" />
        Call 1-833-709-1946
      </button>
    </div>
  );
};

export default CTAbanner;
